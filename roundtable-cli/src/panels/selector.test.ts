/**
 * Unit tests for Panel System
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import {
  validatePanel,
  loadPanel,
  loadPanelById,
  loadAllPanels,
  getAvailablePanels,
  detectPanel,
  clearPanelCache,
  getPanelCacheSize
} from './selector.js';
import type { Panel, PanelSelectionContext } from './types.js';

// Test data directory
const TEST_PANELS_DIR = '.test-panels';

describe('Panel Validator', () => {
  describe('validatePanel', () => {
    it('should validate a complete valid panel', () => {
      const validPanel: Panel = {
        id: 'test-panel',
        name: 'Test Panel',
        description: 'A test panel for validation',
        version: '1.0.0',
        skillIds: ['skill1', 'skill2', 'skill3']
      };

      const result = validatePanel(validPanel);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject panel missing required fields', () => {
      const invalidPanel = {
        id: 'test-panel',
        name: 'Test Panel'
        // Missing: description, version, skillIds
      };

      const result = validatePanel(invalidPanel);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Missing required field: description');
      expect(result.errors).toContain('Missing required field: version');
      expect(result.errors).toContain('Missing required field: skillIds');
    });

    it('should reject panel with invalid ID format', () => {
      const invalidPanel: Panel = {
        id: 'Test_Panel!',
        name: 'Test Panel',
        description: 'Test description',
        version: '1.0.0',
        skillIds: ['skill1']
      };

      const result = validatePanel(invalidPanel);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('lowercase letters'))).toBe(true);
    });

    it('should reject panel with invalid version format', () => {
      const invalidPanel: Panel = {
        id: 'test-panel',
        name: 'Test Panel',
        description: 'Test description',
        version: '1.0',
        skillIds: ['skill1']
      };

      const result = validatePanel(invalidPanel);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('semantic versioning'))).toBe(true);
    });

    it('should reject panel with empty skillIds', () => {
      const invalidPanel: Panel = {
        id: 'test-panel',
        name: 'Test Panel',
        description: 'Test description',
        version: '1.0.0',
        skillIds: []
      };

      const result = validatePanel(invalidPanel);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('cannot be empty'))).toBe(true);
    });

    it('should warn about panel with only 1 skill', () => {
      const panel: Panel = {
        id: 'test-panel',
        name: 'Test Panel',
        description: 'Test description',
        version: '1.0.0',
        skillIds: ['skill1']
      };

      const result = validatePanel(panel);
      expect(result.valid).toBe(true);
      expect(result.warnings.some((w) => w.includes('work best with 3-5 skills'))).toBe(
        true
      );
    });

    it('should warn about panel with too many skills', () => {
      const panel: Panel = {
        id: 'test-panel',
        name: 'Test Panel',
        description: 'Test description',
        version: '1.0.0',
        skillIds: ['s1', 's2', 's3', 's4', 's5', 's6', 's7']
      };

      const result = validatePanel(panel);
      expect(result.valid).toBe(true);
      expect(result.warnings.some((w) => w.includes('reducing to 3-5'))).toBe(true);
    });

    it('should validate optional fields correctly', () => {
      const panelWithOptional: Panel = {
        id: 'test-panel',
        name: 'Test Panel',
        description: 'Test description',
        version: '1.0.0',
        skillIds: ['skill1', 'skill2'],
        keywords: ['web', 'mobile'],
        tags: ['testing', 'example'],
        agentCount: 2,
        author: 'Test Author'
      };

      const result = validatePanel(panelWithOptional);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should warn when agentCount differs from skillIds length', () => {
      const panel: Panel = {
        id: 'test-panel',
        name: 'Test Panel',
        description: 'Test description',
        version: '1.0.0',
        skillIds: ['skill1', 'skill2', 'skill3'],
        agentCount: 5
      };

      const result = validatePanel(panel);
      expect(result.valid).toBe(true);
      expect(result.warnings.some((w) => w.includes('differs from skillIds length'))).toBe(
        true
      );
    });
  });
});

describe('Panel Loader', () => {
  beforeEach(async () => {
    // Clear cache before each test
    clearPanelCache();

    // Create test directory
    await fs.mkdir(TEST_PANELS_DIR, { recursive: true });
  });

  afterEach(async () => {
    // Clean up test directory
    await fs.rm(TEST_PANELS_DIR, { recursive: true, force: true });
  });

  describe('loadPanel', () => {
    it('should load a valid panel from YAML file', async () => {
      const filePath = path.join(TEST_PANELS_DIR, 'test-panel.yaml');
      await fs.writeFile(
        filePath,
        `id: test-panel
name: Test Panel
description: A test panel
version: 1.0.0
skillIds:
  - skill1
  - skill2
  - skill3
`
      );

      const panel = await loadPanel(filePath, { panelsDir: TEST_PANELS_DIR });
      expect(panel.id).toBe('test-panel');
      expect(panel.name).toBe('Test Panel');
      expect(panel.skillIds).toEqual(['skill1', 'skill2', 'skill3']);
    });

    it('should throw error for non-existent file', async () => {
      await expect(
        loadPanel(path.join(TEST_PANELS_DIR, 'non-existent.yaml'))
      ).rejects.toThrow('Panel file not found');
    });

    it('should cache panels when cache is enabled', async () => {
      const filePath = path.join(TEST_PANELS_DIR, 'cached.yaml');
      await fs.writeFile(
        filePath,
        `id: cached-panel
name: Cached Panel
description: A cached panel
version: 1.0.0
skillIds:
  - skill1
  - skill2
`
      );

      expect(getPanelCacheSize()).toBe(0);

      await loadPanel(filePath, { cache: true });
      expect(getPanelCacheSize()).toBe(1);

      await loadPanel(filePath, { cache: true });
      expect(getPanelCacheSize()).toBe(1); // Still 1, loaded from cache
    });
  });

  describe('loadPanelById', () => {
    it('should load panel by ID', async () => {
      await fs.writeFile(
        path.join(TEST_PANELS_DIR, 'web-panel.yaml'),
        `id: web-panel
name: Web Panel
description: Web development panel
version: 1.0.0
skillIds:
  - architecture
  - ux
`
      );

      const panel = await loadPanelById('web-panel', {
        panelsDir: TEST_PANELS_DIR
      });

      expect(panel.id).toBe('web-panel');
      expect(panel.name).toBe('Web Panel');
    });
  });

  describe('loadAllPanels', () => {
    it('should load all panels from directory', async () => {
      await fs.writeFile(
        path.join(TEST_PANELS_DIR, 'panel1.yaml'),
        `id: panel1
name: Panel 1
description: First panel
version: 1.0.0
skillIds:
  - skill1
  - skill2
`
      );

      await fs.writeFile(
        path.join(TEST_PANELS_DIR, 'panel2.yaml'),
        `id: panel2
name: Panel 2
description: Second panel
version: 1.0.0
skillIds:
  - skill3
  - skill4
`
      );

      const panels = await loadAllPanels({ panelsDir: TEST_PANELS_DIR });

      expect(panels.size).toBe(2);
      expect(panels.has('panel1')).toBe(true);
      expect(panels.has('panel2')).toBe(true);
    });

    it('should throw error if panels directory does not exist', async () => {
      await expect(loadAllPanels({ panelsDir: './non-existent-dir' })).rejects.toThrow(
        'Panels directory not found'
      );
    });
  });

  describe('getAvailablePanels', () => {
    it('should return panel metadata', async () => {
      await fs.writeFile(
        path.join(TEST_PANELS_DIR, 'meta-panel.yaml'),
        `id: meta-panel
name: Meta Panel
description: Panel for metadata test
version: 2.0.0
skillIds:
  - skill1
  - skill2
keywords:
  - test
  - metadata
tags:
  - testing
author: Test Author
agentCount: 2
`
      );

      const metadata = await getAvailablePanels({ panelsDir: TEST_PANELS_DIR });

      expect(metadata).toHaveLength(1);
      expect(metadata[0].id).toBe('meta-panel');
      expect(metadata[0].name).toBe('Meta Panel');
      expect(metadata[0].skillIds).toEqual(['skill1', 'skill2']);
      expect(metadata[0].keywords).toEqual(['test', 'metadata']);
    });
  });
});

describe('Panel Detection', () => {
  beforeEach(async () => {
    clearPanelCache();
    await fs.mkdir(TEST_PANELS_DIR, { recursive: true });

    // Create test panels with keywords
    await fs.writeFile(
      path.join(TEST_PANELS_DIR, 'web-panel.yaml'),
      `id: web-panel
name: Web Panel
description: For web apps
version: 1.0.0
skillIds:
  - architecture
  - ux
keywords:
  - web
  - website
  - frontend
  - backend
`
    );

    await fs.writeFile(
      path.join(TEST_PANELS_DIR, 'mobile-panel.yaml'),
      `id: mobile-panel
name: Mobile Panel
description: For mobile apps
version: 1.0.0
skillIds:
  - architecture
  - ux
keywords:
  - mobile
  - ios
  - android
  - app
`
    );

    await fs.writeFile(
      path.join(TEST_PANELS_DIR, 'data-panel.yaml'),
      `id: data-panel
name: Data Panel
description: For data projects
version: 1.0.0
skillIds:
  - architecture
  - data-engineering
keywords:
  - data
  - analytics
  - pipeline
  - etl
`
    );
  });

  afterEach(async () => {
    await fs.rm(TEST_PANELS_DIR, { recursive: true, force: true });
  });

  describe('detectPanel', () => {
    it('should detect web panel from web-related prompt', async () => {
      const context: PanelSelectionContext = {
        prompt: 'Build a web application with frontend and backend'
      };

      const result = await detectPanel(context, { panelsDir: TEST_PANELS_DIR });

      expect(result.panel).toBeDefined();
      expect(result.panel?.id).toBe('web-panel');
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.matchedKeywords.length).toBeGreaterThan(0);
    });

    it('should detect mobile panel from mobile-related prompt', async () => {
      const context: PanelSelectionContext = {
        prompt: 'Create a mobile app for iOS and Android'
      };

      const result = await detectPanel(context, { panelsDir: TEST_PANELS_DIR });

      expect(result.panel).toBeDefined();
      expect(result.panel?.id).toBe('mobile-panel');
      expect(result.matchedKeywords).toContain('mobile');
    });

    it('should detect data panel from data-related prompt', async () => {
      const context: PanelSelectionContext = {
        prompt: 'Design a data pipeline for analytics and ETL processing'
      };

      const result = await detectPanel(context, { panelsDir: TEST_PANELS_DIR });

      expect(result.panel).toBeDefined();
      expect(result.panel?.id).toBe('data-panel');
      expect(result.matchedKeywords.length).toBeGreaterThan(0);
    });

    it('should return alternatives when multiple panels match', async () => {
      const context: PanelSelectionContext = {
        prompt: 'Build something with architecture'
      };

      const result = await detectPanel(context, { panelsDir: TEST_PANELS_DIR });

      // Multiple panels have architecture as a skill, but detection is keyword-based
      expect(result.alternatives).toBeDefined();
    });

    it('should return explicit panel when panelId provided', async () => {
      const context: PanelSelectionContext = {
        prompt: 'Build something',
        panelId: 'mobile-panel'
      };

      const result = await detectPanel(context, { panelsDir: TEST_PANELS_DIR });

      expect(result.panel).toBeDefined();
      expect(result.panel?.id).toBe('mobile-panel');
      expect(result.confidence).toBe(1.0);
    });

    it('should return no match for unrelated prompt', async () => {
      const context: PanelSelectionContext = {
        prompt: 'Build a rocket to Mars with quantum computing'
      };

      const result = await detectPanel(context, { panelsDir: TEST_PANELS_DIR });

      expect(result.panel).toBeUndefined();
      expect(result.confidence).toBe(0);
    });

    it('should consider additional keywords', async () => {
      const context: PanelSelectionContext = {
        prompt: 'Build an application',
        additionalKeywords: ['mobile', 'ios']
      };

      const result = await detectPanel(context, { panelsDir: TEST_PANELS_DIR });

      expect(result.panel).toBeDefined();
      expect(result.panel?.id).toBe('mobile-panel');
    });
  });
});

describe('Real Panels Integration', () => {
  const REAL_PANELS_DIR = '../.roundtable/panels';

  it('should load full-stack-web panel from real directory', async () => {
    const panel = await loadPanelById('full-stack-web', {
      panelsDir: REAL_PANELS_DIR
    });

    expect(panel.id).toBe('full-stack-web');
    expect(panel.name).toContain('Full Stack');
    expect(panel.skillIds).toContain('architecture');
    expect(panel.skillIds).toContain('ux');
    expect(panel.keywords).toBeDefined();
    expect(panel.keywords!.length).toBeGreaterThan(0);
  });

  it('should load all 3 example panels', async () => {
    const panels = await loadAllPanels({ panelsDir: REAL_PANELS_DIR });

    expect(panels.size).toBeGreaterThanOrEqual(3);
    expect(panels.has('full-stack-web')).toBe(true);
    expect(panels.has('data-platform')).toBe(true);
    expect(panels.has('mobile-app')).toBe(true);
  });

  it('should validate all example panels', async () => {
    const panels = await loadAllPanels({ panelsDir: REAL_PANELS_DIR });

    for (const [id, panel] of panels.entries()) {
      const validation = validatePanel(panel);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
      // Optionally log warnings
      if (validation.warnings.length > 0) {
        console.log(`Warnings for ${id}:`, validation.warnings);
      }
    }
  });

  it('should detect full-stack-web panel for web prompt', async () => {
    const context: PanelSelectionContext = {
      prompt: 'Build a web application with React frontend and Node.js backend'
    };

    const result = await detectPanel(context, { panelsDir: REAL_PANELS_DIR });

    expect(result.panel).toBeDefined();
    expect(result.panel?.id).toBe('full-stack-web');
    expect(result.matchedKeywords.length).toBeGreaterThan(0);
  });

  it('should detect data-platform panel for data prompt', async () => {
    const context: PanelSelectionContext = {
      prompt: 'Design a data pipeline with Spark and Kafka for analytics'
    };

    const result = await detectPanel(context, { panelsDir: REAL_PANELS_DIR });

    expect(result.panel).toBeDefined();
    expect(result.panel?.id).toBe('data-platform');
  });

  it('should detect mobile-app panel for mobile prompt', async () => {
    const context: PanelSelectionContext = {
      prompt: 'Create a mobile application for iOS with Swift'
    };

    const result = await detectPanel(context, { panelsDir: REAL_PANELS_DIR });

    expect(result.panel).toBeDefined();
    expect(result.panel?.id).toBe('mobile-app');
  });
});

describe('Cache Management', () => {
  beforeEach(async () => {
    await fs.mkdir(TEST_PANELS_DIR, { recursive: true });
  });

  afterEach(async () => {
    await fs.rm(TEST_PANELS_DIR, { recursive: true, force: true });
  });

  it('should clear cache', async () => {
    const filePath = path.join(TEST_PANELS_DIR, 'cache-test.yaml');
    await fs.writeFile(
      filePath,
      `id: cache-test
name: Cache Test
description: Testing cache
version: 1.0.0
skillIds:
  - skill1
`
    );

    await loadPanel(filePath, { cache: true });
    expect(getPanelCacheSize()).toBeGreaterThan(0);

    clearPanelCache();
    expect(getPanelCacheSize()).toBe(0);
  });
});
