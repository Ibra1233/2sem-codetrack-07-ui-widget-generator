// ES Module version using Tweakpane's ESM build
import { Pane } from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js';

/**
 * Widget Generator for creating customizable notice widgets
 */
class WidgetGenerator {
  // Default configuration for the widget
  static defaultParams = {
    type: 'note',
    title: 'Important Notice',
    body: 'This is an important message that requires your attention. Please read carefully.',
    showIcon: true,
    primaryActionEnabled: true,
    primaryActionLabel: 'Read more',
    primaryActionUrl: '#',
    primaryActionNewTab: false,
    dismissible: false,
    borderRadius: 8,
    borderWidth: 2,
  };

  // Type configurations with icons and colors
  static typeConfig = {
    note: { icon: '📝', border: '#0969da', background: '#dbeafe' },
    warning: { icon: '⚠️', border: '#fb8500', background: '#fff3cd' },
    hint: { icon: '💡', border: '#1a7f37', background: '#d1e7dd' },
    question: { icon: '❓', border: '#8250df', background: '#e9d5ff' },
  };

  constructor() {
    this.params = { ...WidgetGenerator.defaultParams };
    this.pane = null;
    this.init();
  }

  /**
   * Initialize the widget generator
   */
  init() {
    this.setupTweakpane();
    this.render();
  }

  /**
   * Set up the Tweakpane controls
   */
  setupTweakpane() {
    try {
      this.pane = new Pane({
        container: document.getElementById('tweakpane-container'),
        title: 'Widget Controls',
      });

      this.createContentControls();
      this.createColorControls();
      this.createActionControls();
      this.createStyleControls();
      this.createUtilityControls();
    } catch (error) {
      console.error('Error setting up Tweakpane:', error);
    }
  }

  /**
   * Create content-related controls
   */
  createContentControls() {
    const folder = this.pane.addFolder({ title: 'Content' });

    folder.addBinding(this.params, 'type', {
      options: {
        Note: 'note',
        Warning: 'warning',
        Hint: 'hint',
        Question: 'question',
      },
    }).on('change', () => this.render());

    folder.addBinding(this.params, 'title')
      .on('change', () => this.render());

    folder.addBinding(this.params, 'body', {
      multiline: true,
      rows: 3,
    }).on('change', () => this.render());
  }

  /**
   * Create color controls for each type
   */
  createColorControls() {
    const folder = this.pane.addFolder({ title: 'Colors', expanded: false });

    // Note colors
    const noteFolder = folder.addFolder({ title: 'Note Colors' });
    noteFolder.addBinding(WidgetGenerator.typeConfig.note, 'border', {
      label: 'Border',
      view: 'color',
    }).on('change', () => this.render());

    noteFolder.addBinding(WidgetGenerator.typeConfig.note, 'background', {
      label: 'Background',
      view: 'color',
    }).on('change', () => this.render());

    // Warning colors
    const warningFolder = folder.addFolder({ title: 'Warning Colors' });
    warningFolder.addBinding(WidgetGenerator.typeConfig.warning, 'border', {
      label: 'Border',
      view: 'color',
    }).on('change', () => this.render());

    warningFolder.addBinding(WidgetGenerator.typeConfig.warning, 'background', {
      label: 'Background',
      view: 'color',
    }).on('change', () => this.render());

    // Hint colors
    const hintFolder = folder.addFolder({ title: 'Hint Colors' });
    hintFolder.addBinding(WidgetGenerator.typeConfig.hint, 'border', {
      label: 'Border',
      view: 'color',
    }).on('change', () => this.render());

    hintFolder.addBinding(WidgetGenerator.typeConfig.hint, 'background', {
      label: 'Background',
      view: 'color',
    }).on('change', () => this.render());

    // Question colors
    const questionFolder = folder.addFolder({ title: 'Question Colors' });
    questionFolder.addBinding(WidgetGenerator.typeConfig.question, 'border', {
      label: 'Border',
      view: 'color',
    }).on('change', () => this.render());

    questionFolder.addBinding(WidgetGenerator.typeConfig.question, 'background', {
      label: 'Background',
      view: 'color',
    }).on('change', () => this.render());
  }

  /**
   * Create action-related controls
   */
  createActionControls() {
    const folder = this.pane.addFolder({ title: 'Primary Action' });

    folder.addBinding(this.params, 'primaryActionEnabled', { label: 'Enabled' })
      .on('change', () => this.render());

    folder.addBinding(this.params, 'primaryActionLabel', { label: 'Label' })
      .on('change', () => this.render());

    folder.addBinding(this.params, 'primaryActionUrl', { label: 'URL' })
      .on('change', () => this.render());

    folder.addBinding(this.params, 'primaryActionNewTab', { label: 'New Tab' })
      .on('change', () => this.render());
  }

  /**
   * Create style-related controls
   */
  createStyleControls() {
    const folder = this.pane.addFolder({ title: 'Style' });

    folder.addBinding(this.params, 'dismissible', { label: 'Dismissible' })
      .on('change', () => this.render());

    folder.addBinding(this.params, 'showIcon', { label: 'Show Icon' })
      .on('change', () => this.render());

    folder.addBinding(this.params, 'borderRadius', {
      label: 'Radius',
      options: { '0': 0, '4': 4, '6': 6, '8': 8, '12': 12, '16': 16 },
    }).on('change', () => this.render());

    folder.addBinding(this.params, 'borderWidth', {
      label: 'Border (px)',
      min: 0,
      max: 6,
      step: 1,
    }).on('change', () => this.render());
  }

  /**
   * Create utility controls
   */
  createUtilityControls() {
    const folder = this.pane.addFolder({ title: 'Utilities' });

    folder.addButton({ title: 'Reset to Defaults' })
      .on('click', () => this.resetToDefaults());

    folder.addButton({ title: 'Reset Colors' })
      .on('click', () => this.resetColors());
  }

  /**
   * Reset parameters to default values
   */
  resetToDefaults() {
    Object.assign(this.params, WidgetGenerator.defaultParams);
    this.pane?.refresh();
    this.render();
  }

  /**
   * Reset colors to default values
   */
  resetColors() {
    // Reset typeConfig colors to their original values
    const originalConfig = {
      note: { icon: '📝', border: '#0969da', background: '#dbeafe' },
      warning: { icon: '⚠️', border: '#fb8500', background: '#fff3cd' },
      hint: { icon: '💡', border: '#1a7f37', background: '#d1e7dd' },
      question: { icon: '❓', border: '#8250df', background: '#e9d5ff' },
    };

    Object.assign(WidgetGenerator.typeConfig, originalConfig);
    this.pane?.refresh();
    this.render();
  }

  /**
   * Get current colors for the selected type
   * @returns {Object} Current border and background colors
   */
  getCurrentColors() {
    return WidgetGenerator.typeConfig[this.params.type];
  }

  /**
   * Convert camelCase object to CSS string
   * @param {Object} styles - Object with camelCase CSS properties
   * @returns {string} CSS string
   */
  createCSSString(styles) {
    return Object.entries(styles)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => {
        const kebabKey = key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
        return `${kebabKey}:${value}`;
      })
      .join(';');
  }

  /**
   * Generate the complete widget HTML with inline styles
   * @returns {string} Widget HTML
   */
  generateWidgetHTML() {
    const { type, showIcon, primaryActionEnabled, dismissible } = this.params;
    const config = WidgetGenerator.typeConfig[type];

    const containerStyle = this.createCSSString({
      position: 'relative',
      display: 'block',
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Ubuntu, sans-serif',
      color: '#1f2328',
      lineHeight: '1.45',
      padding: '16px',
      background: config.background,
      border: this.params.borderWidth > 0 ? `${this.params.borderWidth}px solid ${config.border}` : 'none',
      borderRadius: `${this.params.borderRadius}px`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      maxWidth: '600px',
      width: '100%',
      margin: 0,
    });

    const components = [
      dismissible ? this.createDismissButton() : '',
      this.createMainContent(config, showIcon),
    ].filter(Boolean);

    return [
      `<div data-widget="notice" data-type="${type}" style="${containerStyle}">`,
      ...components.map(component => `  ${component}`),
      '</div>',
    ].join('\n');
  }

  /**
   * Create dismiss button HTML
   * @returns {string} Dismiss button HTML
   */
  createDismissButton() {
    const dismissStyle = this.createCSSString({
      position: 'absolute',
      top: '6px',
      right: '6px',
      width: '28px',
      height: '28px',
      border: '1px solid rgba(0,0,0,0.15)',
      background: 'rgba(255,255,255,0.65)',
      backdropFilter: 'blur(4px)',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      lineHeight: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });

    return `<button type="button" data-role="notice-dismiss" aria-label="Dismiss" style="${dismissStyle}" onclick="this.closest('[data-widget=notice]')?.remove()">×</button>`;
  }

  /**
   * Create main content area
   * @param {Object} config - Type configuration
   * @param {boolean} showIcon - Whether to show icon
   * @returns {string} Main content HTML
   */
  createMainContent(config, showIcon) {
    const rowStyle = this.createCSSString({
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
    });

    const iconHTML = showIcon ? this.createIcon(config.icon) : '';
    const contentHTML = this.createContentArea();

    const components = [iconHTML, contentHTML].filter(Boolean);

    return `<div data-role="row" style="${rowStyle}">\n    ${components.join('\n    ')}\n  </div>`;
  }

  /**
   * Create icon element
   * @param {string} icon - Icon emoji
   * @returns {string} Icon HTML
   */
  createIcon(icon) {
    const iconStyle = this.createCSSString({
      fontSize: '20px',
      lineHeight: 1,
      marginTop: '2px',
    });

    return `<div data-role="icon" style="${iconStyle}">\n      ${icon}\n    </div>`;
  }

  /**
   * Create content area with title, body, and actions
   * @returns {string} Content area HTML
   */
  createContentArea() {
    const contentStyle = this.createCSSString({
      flex: 1,
      minWidth: 0,
    });

    const titleHTML = this.createTitle();
    const bodyHTML = this.createBody();
    const actionsHTML = this.createActions();

    const components = [titleHTML, bodyHTML, actionsHTML].filter(Boolean);

    return `<div data-role="content" style="${contentStyle}">\n      ${components.join('\n      ')}\n    </div>`;
  }

  /**
   * Create title element
   * @returns {string} Title HTML
   */
  createTitle() {
    const titleStyle = this.createCSSString({
      margin: '0 0 8px 0',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: 1.3,
    });

    return `<div data-role="title" style="${titleStyle}">\n        ${this.escapeHTML(this.params.title)}\n      </div>`;
  }

  /**
   * Create body element
   * @returns {string} Body HTML
   */
  createBody() {
    const bodyStyle = this.createCSSString({
      margin: '0 0 12px 0',
      fontSize: '14px',
    });

    return `<div data-role="body" style="${bodyStyle}">\n        ${this.escapeHTML(this.params.body)}\n      </div>`;
  }

  /**
   * Create actions area
   * @returns {string} Actions HTML or empty string
   */
  createActions() {
    if (!this.params.primaryActionEnabled) return '';

    const actionsStyle = this.createCSSString({
      margin: 0,
      display: 'flex',
      gap: '8px',
    });

    const buttonHTML = this.createActionButton();

    return `<div data-role="actions" style="${actionsStyle}">\n        ${buttonHTML}\n      </div>`;
  }

  /**
   * Create action button
   * @returns {string} Button HTML
   */
  createActionButton() {
    const config = WidgetGenerator.typeConfig[this.params.type];
    const buttonStyle = this.createCSSString({
      display: 'inline-block',
      fontSize: '14px',
      lineHeight: 1.2,
      textDecoration: 'none',
      padding: '6px 12px',
      border: `1px solid ${config.border}`,
      background: '#ffffff',
      color: config.border,
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 500,
    });

    const url = this.params.primaryActionUrl || '#';
    const target = this.params.primaryActionNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';

    return `<a data-role="action-primary" href="${this.escapeHTML(url)}"${target} style="${buttonStyle}">\n          ${this.escapeHTML(this.params.primaryActionLabel)}\n        </a>`;
  }

  /**
   * Escape HTML characters
   * @param {string} str - String to escape
   * @returns {string} Escaped string
   */
  escapeHTML(str) {
    const escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return String(str).replace(/[&<>"']/g, char => escapeMap[char]);
  }

  /**
   * Generate code for export
   * @returns {string} Widget HTML code
   */
  generateCodeExport() {
    return this.generateWidgetHTML();
  }

  /**
   * Render the widget preview and code output
   */
  render() {
    const preview = document.querySelector('#widget-preview .section-content');
    if (preview) {
      preview.innerHTML = this.generateWidgetHTML();
    }

    const codeOutput = document.querySelector('#code-output .code-content');
    if (codeOutput) {
      codeOutput.textContent = this.generateCodeExport();
    }
  }

  /**
   * Copy widget code to clipboard
   */
  async copyToClipboard() {
    const codeContent = document.querySelector('#code-output .code-content');
    if (!codeContent) return;

    const text = codeContent.textContent;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        this.showCopyFeedback(true);
      } else {
        this.fallbackCopyToClipboard(text);
      }
    } catch (error) {
      this.showCopyFeedback(false);
    }
  }

  /**
   * Fallback copy method for older browsers
   * @param {string} text - Text to copy
   */
  fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      this.showCopyFeedback(true);
    } catch (error) {
      this.showCopyFeedback(false);
    }

    textarea.remove();
  }

  /**
   * Show copy operation feedback
   * @param {boolean} success - Whether copy was successful
   */
  showCopyFeedback(success) {
    const button = document.querySelector('.copy-button');
    if (!button) return;

    const originalText = button.textContent;
    button.textContent = success ? 'Copied!' : 'Failed';
    button.classList.toggle('copied', success);

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 1600);
  }
}

/**
 * Set up UI interactions for the application
 * @param {WidgetGenerator} generator - The widget generator instance
 */
function setupUIInteractions(generator) {
  setupCodeToggle(generator);
  setupFloatingControls();
}

/**
 * Set up code section toggle functionality
 * @param {WidgetGenerator} generator - The widget generator instance
 */
function setupCodeToggle(generator) {
  const codeSection = document.getElementById('code-output');
  const toggleButton = document.getElementById('toggle-code-btn');

  if (!codeSection || !toggleButton) return;

  toggleButton.addEventListener('click', () => {
    const isCollapsed = codeSection.classList.toggle('collapsed');
    const isExpanded = !isCollapsed;

    toggleButton.setAttribute('aria-expanded', String(isExpanded));
    codeSection.setAttribute('aria-hidden', String(!isExpanded));
    toggleButton.textContent = isExpanded ? 'Hide Code' : 'Show Code';

    if (isExpanded) {
      generator.render();
    }
  });
}

/**
 * Set up floating controls panel
 */
function setupFloatingControls() {
  const floatingToggle = document.getElementById('floating-controls-toggle');
  const panel = document.getElementById('controls-panel');
  const closeButton = document.getElementById('close-controls');

  if (!floatingToggle || !panel || !closeButton) return;

  const setControlsOpen = (isOpen) => {
    panel.classList.toggle('open', isOpen);
    floatingToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('controls-open', isOpen);
  };

  floatingToggle.addEventListener('click', () => {
    const isCurrentlyOpen = panel.classList.contains('open');
    setControlsOpen(!isCurrentlyOpen);
  });

  closeButton.addEventListener('click', () => {
    setControlsOpen(false);
  });
}

// Initialize the application
const generator = new WidgetGenerator();
setupUIInteractions(generator);

// Set up copy button
const copyButton = document.querySelector('.copy-button');
if (copyButton) {
  copyButton.addEventListener('click', () => generator.copyToClipboard());
}
