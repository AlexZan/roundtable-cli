/**
 * Panel selection and auto-detection logic
 */

import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import type {
  Panel,
  PanelMetadata,
  PanelLoaderOptions,
  PanelSelectionContext,
  PanelDetectionResult,
  PanelValidationResult
} from './types.js';

/**
 * In-memory cache for loaded panels
 */
const panelCache = new Map<string, Panel>();

/**
 * Default options for panel loader
 */
const DEFAULT_OPTIONS: Required<PanelLoaderOptions> = {
  panelsDir: '.roundtable/panels',
  validate: true,
  cache: true
};

/**
 * Validates a panel object against required schema
 *
 * @param panel - The panel to validate
 * @returns Validation result with errors and warnings
 */
export function validatePanel(panel: any): PanelValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check that panel is an object
  if (!panel || typeof panel !== 'object') {
    return {
      valid: false,
      errors: ['Panel must be an object'],
      warnings: []
    };
  }

  // Required fields
  const requiredFields: Array<keyof Panel> = [
    'id',
    'name',
    'description',
    'version',
    'skillIds'
  ];

  for (const field of requiredFields) {
    if (!panel[field]) {
      errors.push(`Missing required field: ${field}`);
    } else if (field === 'skillIds') {
      if (!Array.isArray(panel[field])) {
        errors.push(`Field 'skillIds' must be an array`);
      } else if (panel[field].length === 0) {
        errors.push(`Field 'skillIds' cannot be empty`);
      }
    } else if (typeof panel[field] !== 'string') {
      errors.push(`Field '${field}' must be a string`);
    } else if (panel[field].trim() === '') {
      errors.push(`Field '${field}' cannot be empty`);
    }
  }

  // Validate ID format (lowercase, hyphens only)
  if (panel.id && typeof panel.id === 'string') {
    if (!/^[a-z0-9-]+$/.test(panel.id)) {
      errors.push(
        `Panel ID '${panel.id}' must contain only lowercase letters, numbers, and hyphens`
      );
    }
  }

  // Validate version format (semver)
  if (panel.version && typeof panel.version === 'string') {
    if (!/^\d+\.\d+\.\d+$/.test(panel.version)) {
      errors.push(
        `Version '${panel.version}' must follow semantic versioning (e.g., '1.0.0')`
      );
    }
  }

  // Validate skillIds array
  if (panel.skillIds && Array.isArray(panel.skillIds)) {
    const nonStrings = panel.skillIds.filter((id: any) => typeof id !== 'string');
    if (nonStrings.length > 0) {
      errors.push(`All skillIds must be strings`);
    }

    if (panel.skillIds.length < 2) {
      warnings.push(
        `Panel has only ${panel.skillIds.length} skill(s). Panels work best with 3-5 skills.`
      );
    }

    if (panel.skillIds.length > 5) {
      warnings.push(
        `Panel has ${panel.skillIds.length} skills. Consider reducing to 3-5 for optimal debate dynamics.`
      );
    }
  }

  // Validate optional array fields
  const arrayFields: Array<keyof Panel> = ['keywords', 'tags'];
  for (const field of arrayFields) {
    if (panel[field] !== undefined) {
      if (!Array.isArray(panel[field])) {
        errors.push(`Field '${field}' must be an array`);
      } else {
        const nonStrings = (panel[field] as any[]).filter(
          (item) => typeof item !== 'string'
        );
        if (nonStrings.length > 0) {
          errors.push(`Field '${field}' must contain only strings`);
        }
      }
    }
  }

  // Validate agentCount if present
  if (panel.agentCount !== undefined) {
    if (typeof panel.agentCount !== 'number') {
      errors.push(`Field 'agentCount' must be a number`);
    } else if (panel.agentCount < 1) {
      errors.push(`Field 'agentCount' must be at least 1`);
    } else if (panel.agentCount !== panel.skillIds.length) {
      warnings.push(
        `agentCount (${panel.agentCount}) differs from skillIds length (${panel.skillIds.length}). ` +
          `This may cause unexpected behavior.`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Loads a single panel from a YAML file
 *
 * @param filePath - Path to the panel YAML file
 * @param options - Loader options
 * @returns The loaded panel
 * @throws Error if file cannot be read or panel is invalid
 */
export async function loadPanel(
  filePath: string,
  options: PanelLoaderOptions = {}
): Promise<Panel> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // Check cache first
  if (opts.cache && panelCache.has(filePath)) {
    return panelCache.get(filePath)!;
  }

  try {
    // Read file
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Parse YAML
    const data = yaml.load(fileContent);

    // Validate structure
    if (opts.validate) {
      const validation = validatePanel(data);
      if (!validation.valid) {
        throw new Error(
          `Invalid panel in ${filePath}:\n${validation.errors.join('\n')}`
        );
      }

      // Log warnings if any
      if (validation.warnings.length > 0) {
        console.warn(
          `Warnings for panel ${filePath}:\n${validation.warnings.join('\n')}`
        );
      }
    }

    const panel = data as Panel;

    // Cache if enabled
    if (opts.cache) {
      panelCache.set(filePath, panel);
    }

    return panel;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new Error(`Panel file not found: ${filePath}`);
    }
    throw error;
  }
}

/**
 * Loads a panel by ID from the panels directory
 *
 * @param panelId - The panel ID (e.g., 'full-stack-web')
 * @param options - Loader options
 * @returns The loaded panel
 * @throws Error if panel cannot be found or loaded
 */
export async function loadPanelById(
  panelId: string,
  options: PanelLoaderOptions = {}
): Promise<Panel> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const filePath = path.join(opts.panelsDir, `${panelId}.yaml`);
  return loadPanel(filePath, options);
}

/**
 * Loads all panels from the panels directory
 *
 * @param options - Loader options
 * @returns Map of panel ID to panel
 */
export async function loadAllPanels(
  options: PanelLoaderOptions = {}
): Promise<Map<string, Panel>> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const panels = new Map<string, Panel>();

  try {
    // Check if directory exists
    await fs.access(opts.panelsDir);

    // Read all files in directory
    const files = await fs.readdir(opts.panelsDir);

    // Filter for .yaml and .yml files
    const yamlFiles = files.filter(
      (file) => file.endsWith('.yaml') || file.endsWith('.yml')
    );

    // Load each panel
    for (const file of yamlFiles) {
      try {
        const filePath = path.join(opts.panelsDir, file);
        const panel = await loadPanel(filePath, options);
        panels.set(panel.id, panel);
      } catch (error: any) {
        console.error(`Failed to load panel ${file}: ${error.message}`);
        // Continue loading other panels
      }
    }

    return panels;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new Error(
        `Panels directory not found: ${opts.panelsDir}\n` +
          'Create it with: mkdir -p .roundtable/panels'
      );
    }
    throw error;
  }
}

/**
 * Gets metadata for all available panels without loading full content
 *
 * @param options - Loader options
 * @returns Array of panel metadata
 */
export async function getAvailablePanels(
  options: PanelLoaderOptions = {}
): Promise<PanelMetadata[]> {
  const panels = await loadAllPanels(options);
  return Array.from(panels.values()).map((panel) => ({
    id: panel.id,
    name: panel.name,
    description: panel.description,
    version: panel.version,
    skillIds: panel.skillIds,
    keywords: panel.keywords,
    agentCount: panel.agentCount,
    tags: panel.tags,
    author: panel.author
  }));
}

/**
 * Auto-detects the best panel for a given context based on keyword matching
 *
 * @param context - Selection context with prompt and optional hints
 * @param options - Loader options
 * @returns Detection result with panel and confidence score
 */
export async function detectPanel(
  context: PanelSelectionContext,
  options: PanelLoaderOptions = {}
): Promise<PanelDetectionResult> {
  const panels = await loadAllPanels(options);

  // If explicit panel ID provided, use that
  if (context.panelId) {
    const panel = panels.get(context.panelId);
    if (panel) {
      return {
        panel,
        confidence: 1.0,
        matchedKeywords: []
      };
    }
  }

  // Extract keywords from prompt (lowercase)
  const promptKeywords = context.prompt
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3); // Filter short words

  // Add additional keywords if provided
  if (context.additionalKeywords) {
    promptKeywords.push(...context.additionalKeywords.map((k) => k.toLowerCase()));
  }

  // Score each panel
  const scored: Array<{
    panel: Panel;
    confidence: number;
    matchedKeywords: string[];
  }> = [];

  for (const [_id, panel] of panels.entries()) {
    if (!panel.keywords || panel.keywords.length === 0) {
      continue;
    }

    const matchedKeywords: string[] = [];
    let matchCount = 0;

    for (const keyword of panel.keywords) {
      const keywordLower = keyword.toLowerCase();
      // Check if any prompt word contains this keyword
      const matches = promptKeywords.some((word) => word.includes(keywordLower));
      if (matches) {
        matchCount++;
        matchedKeywords.push(keyword);
      }
    }

    if (matchCount > 0) {
      // Confidence is ratio of matched keywords to total panel keywords
      const confidence = matchCount / panel.keywords.length;
      scored.push({
        panel,
        confidence,
        matchedKeywords
      });
    }
  }

  // Sort by confidence descending
  scored.sort((a, b) => b.confidence - a.confidence);

  if (scored.length === 0) {
    return {
      confidence: 0,
      matchedKeywords: [],
      alternatives: []
    };
  }

  // Return best match with alternatives
  const [best, ...alternatives] = scored;
  return {
    panel: best.panel,
    confidence: best.confidence,
    matchedKeywords: best.matchedKeywords,
    alternatives: alternatives.slice(0, 3) // Top 3 alternatives
  };
}

/**
 * Clears the panel cache
 */
export function clearPanelCache(): void {
  panelCache.clear();
}

/**
 * Gets the current cache size
 *
 * @returns Number of cached panels
 */
export function getPanelCacheSize(): number {
  return panelCache.size;
}
