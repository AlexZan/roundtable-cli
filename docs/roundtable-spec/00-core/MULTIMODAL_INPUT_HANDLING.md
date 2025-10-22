# Multimodal Input Handling

## Overview

Roundtable V1.2+ supports multimodal inputs beyond text, allowing panels to analyze images, audio, documents, and other modalities directly. This capability is based on the **TEAL (Tokenize and Embed ALL)** approach from "Tokenize and Embed ALL for Multi-modal Large Language Models" research, which demonstrates that unified tokenization across modalities enables frozen LLMs to handle diverse input types.

**Key principle:** All modalities are converted to token sequences and processed through the same deliberation architecture.

**Research foundation:** TEAL study showed that:
- Off-the-shelf tokenizers (BEiT-V2 for images, Whisper for audio) work effectively
- Tokenizer quality is critical to performance
- Unified token representation enables multi-modal reasoning
- No architectural changes needed for frozen LLMs

---

## 1. Supported Modalities

### 1.1 Text (Native - V1.0)

**Description:** Natural language input from users, existing documents, specifications

**Tokenization:** Standard LLM tokenizer (GPT, Claude, etc.)

**Token cost:** ~1 token per word (varies by tokenizer)

**Use cases:**
- User prompts and requirements
- Existing documentation
- Specification text
- Deliberation responses

**Example:**
```
User: "I want to build a real-time collaborative editor"
Tokens: ~8-10 tokens
```

### 1.2 Images (V1.2)

**Description:** Visual content including UI mockups, diagrams, screenshots, photos

**Tokenization:** Vision models with specialized image tokenizers
- **BEiT-V2:** Image tokenization via discrete visual tokens
- **CLIP:** Image-text embedding alignment
- Native vision-capable models (GPT-4V, Claude 3, Gemini Pro Vision)

**Token cost:** ~2,000-3,000 tokens per image (depending on resolution and detail level)

**Use cases:**
- UI/UX wireframes and mockups
- System architecture diagrams
- Database schema diagrams
- Competitor product screenshots
- User interface designs
- Threat modeling diagrams
- Data flow diagrams

**Supported formats:** JPG, PNG, GIF, WebP, SVG (rasterized)

**Example:**
```
User uploads: 3 wireframe options for dashboard (PNG files)
Token cost: 3 × 2,500 = 7,500 tokens
Analysis: UX and Product panels analyze visual hierarchy, information density, accessibility
```

### 1.3 Audio (V1.3)

**Description:** Audio recordings of interviews, meetings, demos, presentations

**Tokenization:**
- **Whisper:** Audio → transcript + temporal embeddings
- Speech-to-text with speaker diarization
- Maintains temporal context and tone

**Token cost:** ~500 tokens per minute of audio (transcript + embeddings)

**Use cases:**
- User interview recordings
- Stakeholder meeting audio
- Product demo narrations
- Customer feedback sessions
- Expert interviews
- Competitive analysis calls

**Supported formats:** MP3, WAV, M4A, FLAC, OGG

**Example:**
```
User uploads: 5 user interviews (30 minutes each)
Token cost: 5 × 30 × 500 = 75,000 tokens
Analysis: Product panel synthesizes themes, UX panel identifies pain points
```

### 1.4 Documents (V1.3)

**Description:** Structured documents with text, layout, and formatting

**Tokenization:**
- **PDF:** Document understanding models extract text + layout + tables
- **Presentations:** Slide-by-slide content extraction
- **Spreadsheets:** Table structure preserved as structured data

**Token cost:** ~1-2 tokens per word of extracted text + layout tokens

**Use cases:**
- Requirements documents (PDF)
- Research papers
- Competitive analysis reports
- Stakeholder presentations
- Data models (spreadsheets)
- Existing specifications
- Technical documentation

**Supported formats:** PDF, PPTX, DOCX, XLSX, CSV

**Example:**
```
User uploads: Requirements document (20-page PDF)
Token cost: ~15,000-20,000 tokens (text + layout understanding)
Analysis: Product panel extracts requirements, Architecture panel identifies constraints
```

---

## 2. Tokenization Architecture

### 2.1 Unified Token Representation

**Core principle:** All modalities → token sequences → same deliberation engine

```
┌─────────────────────────────────────────────────────────┐
│  INPUT MODALITIES                                       │
├─────────────────────────────────────────────────────────┤
│  Text    │  Images   │  Audio    │  Documents          │
│  (native)│ (BEiT-V2) │ (Whisper) │  (LayoutLM)         │
└────┬──────────┬──────────┬──────────┬────────────────────┘
     │          │          │          │
     └──────────┴──────────┴──────────┴────> Token Streams
                     │
          ┌──────────▼──────────┐
          │  Embedding Layer    │
          │  (Unified space)    │
          └──────────┬──────────┘
                     │
          ┌──────────▼──────────┐
          │   Panel Agents      │
          │ (Process tokens)    │
          └──────────┬──────────┘
                     │
          ┌──────────▼──────────┐
          │   Deliberation      │
          │     Engine          │
          └─────────────────────┘
```

### 2.2 Tokenizer Selection by Modality

```yaml
modality_tokenizers:

  text:
    method: "native_llm_tokenizer"
    models: ["gpt-4", "claude-3", "gemini-pro"]
    token_ratio: ~1 token per word
    quality: "excellent (native)"

  images:
    method: "vision_model_tokenization"
    preferred_tokenizers:
      - name: "GPT-4 Vision"
        token_cost: ~2000-3000 per image
        quality: "excellent"
        notes: "Native integration"

      - name: "Claude 3 Vision"
        token_cost: ~2500 per image
        quality: "excellent"
        notes: "Strong diagram understanding"

      - name: "Gemini Pro Vision"
        token_cost: ~2000 per image
        quality: "good"
        notes: "Good for UI analysis"

    fallback: "Describe image in text (manual process)"

  audio:
    method: "whisper_transcription"
    model: "Whisper Large V3"
    token_cost: ~500 tokens per minute
    quality: "excellent for transcription"
    includes:
      - transcript_text
      - speaker_diarization
      - temporal_markers
    notes: "TEAL research validates Whisper effectiveness"

  documents:
    method: "document_understanding"
    pdf:
      model: "LayoutLM or equivalent"
      extracts: ["text", "tables", "figures", "layout"]
      token_cost: ~1.5x text-only

    spreadsheets:
      model: "Table understanding"
      extracts: ["cell_values", "formulas", "structure"]
      token_cost: ~1.2x text-only
```

### 2.3 Token Quality vs Cost Tradeoff

```
High Quality (Expensive):
  - Full-resolution images → 3000 tokens
  - Complete audio transcription with timestamps → 500 tokens/min
  - Rich document layout understanding → 1.5x text

Medium Quality (Balanced):
  - Compressed images → 2000 tokens
  - Transcript only → 400 tokens/min
  - Text extraction without layout → 1.0x text

Low Quality (Cheap):
  - Image thumbnails → 1000 tokens
  - Summary transcription → 200 tokens/min
  - Text-only extraction → 1.0x text
```

**User control:** Allow users to choose quality-cost tradeoff

---

## 3. Modality-Aware Panel Routing

### 3.1 Panel Capability Declaration

Panels declare which modalities they can process:

```yaml
panel:
  name: "UX Design Expert"
  id: "ux-design-visual-analysis"

  modalities:
    text: required
    image: required    # This panel REQUIRES image input for best analysis
    audio: optional    # Can process user interviews if provided
    document: optional

  capabilities_by_modality:
    image:
      - "Visual hierarchy analysis"
      - "Color contrast and accessibility (WCAG)"
      - "Information density measurement"
      - "Whitespace and balance assessment"
      - "Side-by-side mockup comparison"

    audio:
      - "User interview theme synthesis"
      - "Pain point identification from tone"
      - "Feature request extraction"

    text:
      - "Requirements analysis"
      - "User story review"
```

### 3.2 Routing Logic

```python
def route_to_panels(user_input):
    """
    Route input to appropriate panels based on modalities present
    """
    modalities_present = detect_modalities(user_input)
    # e.g., {"text": True, "image": True, "audio": False}

    panels_to_activate = []

    for panel in available_panels:
        # Check if panel can handle the input modalities
        can_handle = True

        for modality in panel.modalities.required:
            if modality not in modalities_present:
                # Panel requires a modality not present in input
                can_handle = False
                break

        if can_handle:
            # Check if panel has preferred modalities present
            has_preferred = False
            for modality in panel.modalities.preferred:
                if modality in modalities_present:
                    has_preferred = True
                    break

            if has_preferred or len(panel.modalities.preferred) == 0:
                panels_to_activate.append(panel)

    return panels_to_activate

# Example
user_input = {
    "text": "Which dashboard design should we use?",
    "images": ["option-a.png", "option-b.png", "option-c.png"]
}

# Routes to:
# - UX Panel (image: required) ✓
# - Product Panel (image: preferred) ✓
# - Accessibility Panel (image: required) ✓
# NOT Architecture Panel (no image capability)
```

### 3.3 Graceful Degradation

If required modality not available:

```yaml
degradation_strategy:

  scenario: "UX panel requires image, but only text provided"

  options:
    1_request_modality:
      action: "Ask user to provide mockup image"
      message: "UX analysis works best with visual mockups. Can you provide images?"

    2_text_based_fallback:
      action: "Proceed with text-only analysis"
      message: "⚠️ Limited analysis: UX panel works best with images"
      note: "Analysis based on description only, less accurate"

    3_skip_panel:
      action: "Exclude UX panel from this deliberation"
      message: "Skipping UX visual analysis (no images provided)"
      note: "Add UX panel later if images become available"
```

---

## 4. Use Cases and Examples

### 4.1 UI/UX Design Review

**Scenario:** User wants feedback on 3 dashboard wireframe options

```
USER INPUT:
├── Text: "Which dashboard layout should we use for our analytics app?"
├── Image 1: dashboard-option-a.png (minimalist)
├── Image 2: dashboard-option-b.png (dense)
└── Image 3: dashboard-option-c.png (cards)

TOKEN BUDGET:
├── Text: ~15 tokens
├── Image 1: ~2,500 tokens
├── Image 2: ~2,500 tokens
├── Image 3: ~2,500 tokens
└── Total Input: ~7,515 tokens

PANELS ACTIVATED:
├── UX Panel (image: required) → Visual hierarchy analysis
├── Product Panel (image: preferred) → Feature discoverability
├── Accessibility Panel (image: required) → WCAG compliance check
└── Data Panel (text: only) → Skipped (no data-specific analysis needed)

UX PANEL ANALYSIS (vision-capable):
  Option A (Minimalist):
    - Visual hierarchy score: 8.5/10
    - Information density: 0.8 items/100px² (low - good for focus)
    - Whitespace: 45% (excellent breathing room)
    - Contrast ratios: 4.8:1 primary text (WCAG AA ✓)

  Option B (Dense):
    - Visual hierarchy score: 6.2/10 (cluttered)
    - Information density: 2.1 items/100px² (high - overwhelming)
    - Whitespace: 15% (insufficient)
    - Contrast ratios: Variable (some elements fail AA)

  Option C (Cards):
    - Visual hierarchy score: 7.8/10
    - Information density: 1.2 items/100px² (optimal range)
    - Whitespace: 35% (good)
    - Contrast ratios: 5.2:1 (WCAG AAA ✓)

  Recommendation: Option C (cards) - best balance of density and clarity

PRODUCT PANEL ANALYSIS (vision-capable):
  Feature Discoverability (how easily users find key features):
    Option A: "Export" button hidden in menu (poor)
    Option B: All features visible but overwhelming (medium)
    Option C: Key features prominent, secondary in dropdowns (excellent)

  Recommendation: Option C for feature prioritization

ACCESSIBILITY PANEL ANALYSIS (vision-capable):
  WCAG AA Compliance:
    Option A: ⚠️ Secondary text fails (3.2:1 contrast)
    Option B: ❌ Multiple elements fail
    Option C: ✅ All elements pass

  Touch Target Sizes:
    Option A: 48×48px minimum ✓
    Option B: Some buttons 36×36px ❌
    Option C: 52×52px minimum ✓

  Recommendation: Option C only compliant choice

CONSENSUS:
  Decision: Option C (card-based layout)
  Confidence: HIGH (0.88)
  Rationale:
    - UX: Best visual hierarchy and whitespace
    - Product: Excellent feature discoverability
    - Accessibility: Only WCAG-compliant option

  Token efficiency: 7,515 input + ~3,000 deliberation = 10,515 total
  vs. text-only description: Would need ~2,000 tokens to describe all
      three mockups, but analysis would be far less accurate

RESULT: User gets objective, measurable analysis of visual designs
```

### 4.2 Architecture Review with System Diagrams

**Scenario:** User provides system architecture diagram for review

```
USER INPUT:
├── Text: "Does this architecture handle 10K concurrent users?"
└── Image: system-architecture-diagram.png

TOKEN BUDGET:
├── Text: ~10 tokens
├── Image: ~2,800 tokens
└── Total Input: ~2,810 tokens

PANELS ACTIVATED:
├── Architecture Panel (image: required)
├── Security Panel (image: preferred)
└── Data Panel (text + derived from diagram)

ARCHITECTURE PANEL ANALYSIS (vision-capable):
  Components Identified:
    - Web tier: 3 application servers (load balanced)
    - Data tier: Single PostgreSQL instance (no replicas)
    - Cache tier: Redis (single instance)
    - Message queue: MISSING

  Data Flow Analysis:
    - User → Load Balancer → App Servers → Single DB
    - No read replicas visible
    - No message broker for async tasks

  Bottlenecks Detected:
    ❌ Single database (SPOF)
    ❌ No read replicas (all reads hit primary)
    ❌ No message queue (async tasks block web tier)
    ⚠️ Redis has no failover

  Concurrent User Capacity Estimate:
    - With current architecture: ~2-3K concurrent users
    - Bottleneck: Database write throughput
    - Recommendation: Add read replicas + message broker

SECURITY PANEL ANALYSIS (vision-capable):
  Attack Surface:
    ❌ External API directly connected to primary database
    → Risk: SQL injection bypasses app tier safeguards
    → Recommendation: Add API gateway with WAF

  Network Segmentation:
    ⚠️ No VPC boundaries shown
    ⚠️ DB should be in private subnet

DATA PANEL ANALYSIS (derived from diagram):
  Data Flow Concerns:
    - All traffic to single DB write primary
    - Read-heavy workloads (analytics dashboard) will block writes
    - Recommendation: Read replicas + analytics replica

CONSENSUS:
  Decision: Architecture NOT ready for 10K concurrent users
  Confidence: HIGH (0.92)

  Required Changes:
    1. Add read replicas (2-3 instances)
    2. Add message broker (RabbitMQ/Kafka) for async tasks
    3. Add API gateway for security layer
    4. Redis clustering with failover
    5. Separate analytics replica

  Estimated Capacity After Changes: 15-20K concurrent users

  Token efficiency: Visual diagram analysis >> text description
  A text description of the architecture would be:
    - Less precise (miss visual details)
    - More verbose (~1,500 tokens to describe)
    - Less confidence in analysis
```

### 4.3 User Research Synthesis from Interviews

**Scenario:** User provides 5 recorded user interviews (30 min each)

```
USER INPUT:
├── Text: "What are the key themes from these user interviews?"
├── Audio 1: interview-user-01.mp3 (30 min)
├── Audio 2: interview-user-02.mp3 (28 min)
├── Audio 3: interview-user-03.mp3 (32 min)
├── Audio 4: interview-user-04.mp3 (29 min)
└── Audio 5: interview-user-05.mp3 (31 min)

TOKEN BUDGET:
├── Text: ~12 tokens
├── Audio (5 × ~30 min × 500 tokens/min): ~75,000 tokens
└── Total Input: ~75,012 tokens

NOTE: This is expensive! Options:
  a) Process all 5 (full context, expensive)
  b) Process sample (2-3 interviews, representative)
  c) User provides summaries (cheaper, less accurate)

USER CHOOSES: Process 3 most recent interviews (User 3, 4, 5)
REVISED TOKEN BUDGET: ~45,000 tokens

PANELS ACTIVATED:
├── Product Panel (audio: preferred)
└── UX Panel (audio: preferred)

PRODUCT PANEL ANALYSIS (audio-capable):
  Themes Identified (with frequency):
    1. Export functionality too slow (18 mentions across 3 interviews)
       - User 3: "I wait 5 minutes for export, then give up"
       - User 4: "Export should be faster, I do this 10x/day"
       - User 5: "Can't export large datasets at all"

    2. Offline mode requested (12 mentions)
       - User 3: "I travel a lot, need offline access"
       - User 4: "Subway has no signal, app unusable"
       - User 5: "Would pay extra for offline mode"

    3. Mobile app lagging (8 mentions)
       - User 4: "Mobile feels slow compared to desktop"
       - User 5: "Loading spinner on every screen"

  Pain Point Severity (derived from tone + frequency):
    - Export slowness: CRITICAL (high frustration + high frequency)
    - Offline mode: HIGH (strong desire + willingness to pay)
    - Mobile lag: MEDIUM (annoying but tolerated)

  Feature Prioritization:
    Priority 1: Fix export performance
    Priority 2: Add offline mode (mobile)
    Priority 3: Mobile performance optimization

UX PANEL ANALYSIS (audio-capable):
  Interaction Patterns Described:
    - Users doing copy-paste workarounds (to avoid slow export)
    - Users switch to desktop mid-task (mobile too slow)
    - Users describe multi-step exports (should be 1-click)

  Emotional Cues:
    - Frustration detected in tone when discussing exports
    - Enthusiasm when describing ideal offline workflow
    - Resignation when talking about mobile performance

  Workflow Insights:
    - Export happens at end of analysis session (10-15x/day for power users)
    - Mobile primarily used during commute (offline context)
    - Current workarounds add 15-20 min/day overhead

CONSENSUS:
  Key Themes (Prioritized):
    1. Export Performance (CRITICAL)
       - Affects daily workflow
       - Causing workarounds
       - High frustration

    2. Offline Mode for Mobile (HIGH)
       - Clear use case (commute)
       - Users willing to pay
       - Differentiator

    3. Mobile Performance (MEDIUM)
       - Annoying but tolerated
       - Workaround: switch to desktop

  Recommendation: Sprint 1 focus on export performance

  Token efficiency: Audio processing expensive but invaluable
  - Manual synthesis would miss tone/emotion cues
  - Frequency counting automated
  - Themes emerge without bias
```

### 4.4 Requirements Document Analysis

**Scenario:** User uploads 20-page requirements PDF

```
USER INPUT:
├── Text: "Review this requirements doc for completeness"
└── Document: product-requirements-v2.pdf (20 pages)

TOKEN BUDGET:
├── Text: ~10 tokens
├── PDF: ~18,000 tokens (document understanding)
└── Total Input: ~18,010 tokens

PANELS ACTIVATED:
├── Product Panel (document: preferred)
├── Architecture Panel (document: optional)
└── Security Panel (document: optional)

PRODUCT PANEL ANALYSIS (document-capable):
  Structure Analysis:
    ✓ Executive summary (page 1)
    ✓ User personas (pages 2-3)
    ✓ Functional requirements (pages 4-12)
    ✓ Non-functional requirements (pages 13-15)
    ❌ Success metrics MISSING
    ❌ Out-of-scope section MISSING

  Requirements Quality:
    Strong: 45 requirements well-specified
    Weak: 12 requirements vague (use "should," "may")
    Missing: No acceptance criteria for 18 requirements

  Gaps Identified:
    - No mobile requirements (is mobile in scope?)
    - No performance benchmarks (SLAs undefined)
    - No internationalization mentioned
    - No accessibility requirements

ARCHITECTURE PANEL ANALYSIS (document-capable):
  Technical Constraints Identified:
    ✓ Must integrate with Salesforce API
    ✓ Must support SSO (SAML 2.0)
    ⚠️ "Must scale" (no specific numbers)
    ❌ No database requirements
    ❌ No hosting constraints

  Risks:
    - "Real-time sync" mentioned but not defined
    - "High availability" without SLA numbers
    - Integration requirements vague

SECURITY PANEL ANALYSIS (document-capable):
  Security Requirements:
    ✓ SAML 2.0 SSO
    ✓ SOC 2 compliance mentioned
    ❌ Data encryption at rest NOT specified
    ❌ Data retention policy MISSING
    ❌ GDPR compliance NOT addressed

CONSENSUS:
  Completeness Score: 65/100 (needs work)

  Critical Gaps to Address:
    1. Define success metrics and KPIs
    2. Specify performance SLAs (latency, throughput)
    3. Add mobile requirements or explicitly exclude
    4. Define "real-time" and "high availability" with numbers
    5. Add data encryption and retention requirements
    6. Address GDPR/privacy requirements
    7. Add acceptance criteria for all requirements

  Recommendation: Iterate on requirements before development

  Token efficiency: Document understanding > manual reading
  - Automated gap detection
  - Cross-references validated
  - Structure analysis instant
```

---

## 5. Token Budget Guidelines

### 5.1 Cost-Benefit Analysis by Modality

```yaml
modality_roi:

  images:
    cost: "2,000-3,000 tokens per image"
    benefit: "10x more accurate design/architecture analysis"
    use_when:
      - Visual design decisions (UI/UX)
      - Architecture review (system diagrams)
      - Accessibility compliance
      - Competitive analysis (screenshots)
    avoid_when:
      - Design is purely conceptual (no visuals yet)
      - Text description sufficient

  audio:
    cost: "500 tokens per minute (~15K for 30-min interview)"
    benefit: "Captures tone, emotion, implicit themes"
    use_when:
      - User research synthesis
      - Stakeholder interviews
      - Multiple perspectives needed
    avoid_when:
      - User provides written summary
      - Transcript already available
      - Budget constrained

  documents:
    cost: "1.5x text extraction (~15-20K for 20-page PDF)"
    benefit: "Automated structure analysis, gap detection"
    use_when:
      - Complex requirements documents
      - Research paper analysis
      - Competitive analysis reports
    avoid_when:
      - Simple text documents
      - Already in markdown/text format
```

### 5.2 Optimization Strategies

**Strategy 1: Selective Processing**
```
Instead of: Process all 10 mockup variations (30K tokens)
Use: Process top 3 finalist options (9K tokens)
Savings: 21K tokens (70%)
```

**Strategy 2: Progressive Detail**
```
Round 1: Low-res thumbnails (3 × 1K = 3K tokens)
  → Panels identify top 2 candidates
Round 2: Full-res analysis (2 × 3K = 6K tokens)
Total: 9K tokens vs 27K for all full-res
Savings: 18K tokens (67%)
```

**Strategy 3: Targeted Modality Use**
```
Scenario: Architecture review
Instead of: Full system diagram (3K tokens)
Use: Text description if no visual issues expected (500 tokens)
Savings: 2.5K tokens
BUT: Use full diagram if visual analysis critical
```

**Strategy 4: Batch Processing**
```
Scenario: 10 user interviews
Instead of: Process all 10 individually (150K tokens)
Use: Process 3 representative samples (45K tokens)
Savings: 105K tokens (70%)
Validate: If themes unclear, process more
```

### 5.3 Token Budget Templates

```yaml
ui_design_review:
  inputs:
    text: 20 tokens
    images: 3 × 2,500 = 7,500 tokens
  deliberation: 3,000 tokens
  total: ~10,520 tokens
  cost_estimate: "$0.10-0.20 (depending on model)"

architecture_review:
  inputs:
    text: 15 tokens
    diagram: 2,800 tokens
  deliberation: 2,500 tokens
  total: ~5,315 tokens
  cost_estimate: "$0.05-0.10"

user_research_synthesis:
  inputs:
    text: 12 tokens
    audio: 3 × 30min × 500 = 45,000 tokens
  deliberation: 5,000 tokens
  total: ~50,012 tokens
  cost_estimate: "$0.50-1.00 (expensive but valuable)"

requirements_review:
  inputs:
    text: 10 tokens
    pdf: 18,000 tokens
  deliberation: 4,000 tokens
  total: ~22,010 tokens
  cost_estimate: "$0.20-0.40"
```

---

## 6. Model Capability Requirements

### 6.1 Vision-Capable Models

**For image processing, panels require:**

```yaml
vision_capable_models:

  gpt4_vision:
    provider: "OpenAI"
    model: "gpt-4-vision-preview" or "gpt-4-turbo"
    capabilities:
      - image_understanding: excellent
      - diagram_analysis: excellent
      - text_in_images: excellent (OCR)
    token_cost: ~$0.01-0.03 per image
    max_images: 10 per request

  claude3_vision:
    provider: "Anthropic"
    models: ["claude-3-opus", "claude-3-sonnet"]
    capabilities:
      - image_understanding: excellent
      - diagram_analysis: excellent (especially technical)
      - text_in_images: excellent
    token_cost: ~$0.01-0.04 per image
    max_images: 5 per request

  gemini_pro_vision:
    provider: "Google"
    model: "gemini-pro-vision" or "gemini-1.5-pro"
    capabilities:
      - image_understanding: good
      - diagram_analysis: good
      - text_in_images: excellent
    token_cost: ~$0.01-0.02 per image
    max_images: 16 per request
```

**Panel configuration example:**

```yaml
ux_panel:
  agents:
    - model: "gpt-4-vision"
      when: "image_input_present"
    - model: "claude-3-sonnet"
      when: "image_input_present"
    - model: "gpt-4"  # fallback
      when: "text_only"
```

### 6.2 Audio-Capable Processing

**For audio processing:**

```yaml
audio_processing:

  transcription:
    service: "OpenAI Whisper API" or "Whisper Large V3 (local)"
    cost: "$0.006 per minute"
    output: "Transcript + timestamps + speaker labels"

  panel_models:
    - Any text-capable model can process transcripts
    - No special audio-native models needed
    - Transcription happens in preprocessing layer
```

### 6.3 Document Understanding

**For PDF/document processing:**

```yaml
document_processing:

  pdf_extraction:
    services:
      - "GPT-4 with vision" (treat pages as images)
      - "Document AI services" (Google, Azure)
      - "LayoutLM" (open source)

  panel_models:
    - Process extracted text + structure
    - No special document models needed
    - Extraction happens in preprocessing layer
```

---

## 7. Implementation Architecture

### 7.1 Preprocessing Layer

```
User Input (multimodal)
    │
    ├─ Text → Pass through
    │
    ├─ Images → Vision Tokenizer
    │   ├─ Resize/optimize
    │   ├─ Convert to tokens (BEiT-V2 or native)
    │   └─ Embed in unified space
    │
    ├─ Audio → Whisper Transcription
    │   ├─ Transcribe to text
    │   ├─ Add speaker labels
    │   ├─ Add timestamps
    │   └─ Optionally: tone analysis
    │
    └─ Documents → Document Understanding
        ├─ Extract text
        ├─ Extract tables/figures
        ├─ Preserve layout/structure
        └─ Convert to structured format
    │
    ▼
Unified Token Stream → Panels → Deliberation
```

### 7.2 Panel Processing

```python
def panel_process(input_tokens, modalities):
    """
    Panel processes unified token stream with modality awareness
    """
    response = ""

    if "image" in modalities:
        response += analyze_visual_content(input_tokens.image_portion)

    if "audio" in modalities:
        response += analyze_transcript(input_tokens.audio_transcript)

    if "text" in modalities:
        response += analyze_text_requirements(input_tokens.text_portion)

    return response
```

### 7.3 Reference Preservation

**Important:** When panels reference multimodal inputs, preserve artifact links:

```markdown
## UX Analysis

Based on analysis of the three wireframe options:

**Option A** (see: artifacts/wireframe-a.png)
- Visual hierarchy score: 8.5/10
- Information density: optimal

**Option B** (see: artifacts/wireframe-b.png)
- Visual hierarchy score: 6.2/10
- Too cluttered

**Recommendation:** Option A for best user experience
```

---

## 8. Enabling Multimodal Support

### 8.1 Configuration

```yaml
# .roundtable/config.yml

multimodal:
  enabled: true

  image:
    enabled: true
    max_images_per_request: 5
    quality: "high"  # high, medium, low
    models: ["gpt-4-vision", "claude-3-sonnet"]

  audio:
    enabled: true
    transcription_service: "whisper"
    max_duration_minutes: 60

  documents:
    enabled: true
    max_pages: 50
    extract_tables: true
    extract_figures: true
```

### 8.2 Usage

```bash
# Image input
$ roundtable session start --images wireframe-a.png wireframe-b.png wireframe-c.png

# Audio input
$ roundtable session start --audio interview-01.mp3 interview-02.mp3

# Document input
$ roundtable session start --document requirements.pdf

# Mixed input
$ roundtable session start \
    --text "Review my dashboard design" \
    --images dashboard-mockup.png \
    --document requirements.pdf
```

### 8.3 API Usage

```python
from roundtable import Session

session = Session()

# Add multimodal inputs
session.add_text("Which wireframe should we use?")
session.add_image("wireframe-a.png")
session.add_image("wireframe-b.png")
session.add_image("wireframe-c.png")

# Panels automatically route to vision-capable models
result = session.deliberate()

print(result.consensus)
print(result.token_usage)  # Shows breakdown by modality
```

---

## 9. Research Foundation

**Primary source:** "Tokenize and Embed ALL for Multi-modal Large Language Models" (TEAL)

**Key findings applied:**
- Off-the-shelf tokenizers (BEiT-V2, Whisper) work effectively
- Tokenizer quality critical to performance
- Unified token representation enables frozen LLMs to handle multiple modalities
- No architectural changes needed - tokenization handles everything

**Roundtable adaptations:**
- Leverage native vision models (GPT-4V, Claude 3) instead of custom tokenizers
- Preprocessing layer handles tokenization
- Graceful degradation when modalities unavailable
- Token budget awareness and optimization strategies

---

## 10. Token Budget Summary

```
MODALITY COSTS (APPROXIMATE):

Text:       ~1 token/word          (baseline)
Images:     ~2,500 tokens/image    (2.5K× text)
Audio:      ~500 tokens/minute     (varies by length)
Documents:  ~1.5× text extraction  (depends on layout complexity)

EXAMPLE PROJECT TOKEN BUDGET:

UI Design Review Session:
  - Text input: 20 tokens
  - 3 wireframes: 7,500 tokens
  - Panel deliberation: 3,000 tokens
  - Total: ~10,520 tokens
  - Cost: $0.10-0.20

Architecture Review Session:
  - Text input: 15 tokens
  - System diagram: 2,800 tokens
  - Panel deliberation: 2,500 tokens
  - Total: ~5,315 tokens
  - Cost: $0.05-0.10

User Research Session (expensive but valuable):
  - Text input: 12 tokens
  - 3 interviews (30 min each): 45,000 tokens
  - Panel deliberation: 5,000 tokens
  - Total: ~50,012 tokens
  - Cost: $0.50-1.00
```

---

## 11. Future Enhancements

### V2.0: Video Support
- Frame extraction + temporal analysis
- Demo video review
- User testing session recordings

### V2.0: Code Analysis
- Syntax-aware tokenization
- Architecture extraction from codebase
- Security vulnerability scanning

### V2.0: Interactive Mockups
- Figma/Sketch file direct import
- Interactive prototype analysis
- Animation and interaction review

### V2.0: 3D Models
- CAD file analysis (for hardware projects)
- Spatial design review
- Manufacturing feasibility

---

## Status

**Version:** 1.2 (Images), 1.3 (Audio + Documents)
**Status:** Active
**Research basis:** TEAL - Tokenize and Embed ALL
**Integration:** SPEC.md Section 9, EXPERT_PANELS.md, PROJECT_MANAGER_AGENT.md

---

**Remember:** Multimodal support costs more tokens but delivers far more accurate analysis for visual, audio, and document-heavy use cases. Choose modalities based on ROI: when visual/audio analysis is critical, the token cost is justified by accuracy gains.
