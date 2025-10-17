import { Pane } from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js';

class WidgetGenerator {
  static defaultParams = {
    label: 'Klik mig',
    width: 160,
    height: 44,
    background: '#0969da',
    color: '#ffffff',
    radius: 8,
    shadow: true,
    uppercase: false,
    href: '',
  };

  constructor() {
    this.params = { ...WidgetGenerator.defaultParams };
    this.pane = null;
    this.init();
  }

  init() {
    this.setupTweakpane();
    this.render();
  }

  setupTweakpane() {
    this.pane = new Pane({
      container: document.getElementById('tweakpane-container'),
      title: 'Knap-indstillinger',
    });

    const content = this.pane.addFolder({ title: 'Indhold' });
    content.addBinding(this.params, 'label', { label: 'Tekst' }).on('change', () => this.render());
    content.addBinding(this.params, 'href', { label: 'Link (valgfrit)' }).on('change', () => this.render());

    const style = this.pane.addFolder({ title: 'Udseende' });
    style.addBinding(this.params, 'width', { label: 'Bredde', min: 80, max: 400 }).on('change', () => this.render());
    style.addBinding(this.params, 'height', { label: 'Højde', min: 24, max: 120 }).on('change', () => this.render());
    style.addBinding(this.params, 'radius', { label: 'Hjørner', min: 0, max: 50 }).on('change', () => this.render());
    style.addBinding(this.params, 'background', { view: 'color', label: 'Baggrund' }).on('change', () => this.render());
    style.addBinding(this.params, 'color', { view: 'color', label: 'Tekstfarve' }).on('change', () => this.render());
    style.addBinding(this.params, 'shadow', { label: 'Skygge' }).on('change', () => this.render());
    style.addBinding(this.params, 'uppercase', { label: 'STORE bogstaver' }).on('change', () => this.render());

    this.pane.addButton({ title: 'Reset' }).on('click', () => {
      Object.assign(this.params, WidgetGenerator.defaultParams);
      this.pane.refresh();
      this.render();
    });
  }

  /** Byg markup **/
  buildHTML() {
    const p = this.params;
    const style = `
      width:${p.width}px;
      height:${p.height}px;
      line-height:${p.height}px;
      border-radius:${p.radius}px;
      background:${p.background};
      color:${p.color};
      text-transform:${p.uppercase ? 'uppercase' : 'none'};
      box-shadow:${p.shadow ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'};
    `.trim();

    if (p.href) {
      return `<a class="my-button" href="${p.href}" style="${style}">${p.label}</a>`;
    }
    return `<button class="my-button" style="${style}">${p.label}</button>`;
  }

  render() {
    const preview = document.querySelector('#widget-preview .section-content');
    const codeBox = document.querySelector('#code-output .code-content');
    const html = this.buildHTML();

    preview.innerHTML = html;
    codeBox.textContent = html.replace(/></g, '>\n<');
  }

  async copyToClipboard() {
    const code = document.querySelector('#code-output .code-content').textContent;
    try {
      await navigator.clipboard.writeText(code);
      this.feedback(true);
    } catch {
      this.feedback(false);
    }
  }

  feedback(success) {
    const btn = document.querySelector('.copy-button');
    btn.textContent = success ? 'Copied!' : 'Failed';
    btn.classList.toggle('copied', success);
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 1500);
  }
}

/** UI interaktioner **/
function setupUI(generator) {
  const toggle = document.getElementById('toggle-code-btn');
  const codeSection = document.getElementById('code-output');
  toggle.addEventListener('click', () => {
    const open = codeSection.classList.toggle('collapsed');
    toggle.textContent = open ? 'Show Code' : 'Hide Code';
  });

  const copy = document.querySelector('.copy-button');
  copy.addEventListener('click', () => generator.copyToClipboard());
}

const generator = new WidgetGenerator();
setupUI(generator);
