import { SnowEngine } from './SnowEngine';

export class SnowElement extends HTMLElement {
    private engine: SnowEngine | null = null;

    static get observedAttributes() {
        return ['running', 'count', 'theme'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // We attach the engine to the Shadow Root so styles don't leak
        // We create a container div inside the shadow DOM
        const container = document.createElement('div');
        container.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;";
        this.shadowRoot!.appendChild(container);

        this.engine = new SnowEngine(container, {
            count: this.getNumberAttribute('count', 2000)
        });

        if (this.hasAttribute('running')) {
            this.engine.start();
        }
    }

    disconnectedCallback() {
        this.engine?.destroy();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (!this.engine || oldValue === newValue) return;

        if (name === 'running') {
            if (newValue !== null) this.engine.start();
            else this.engine.stop();
        }

        if (name === 'count') {
            this.engine.updateOptions({ count: parseInt(newValue, 10) });
        }
    }

    // Helper to read attributes
    private getNumberAttribute(name: string, defaultValue: number): number {
        const val = this.getAttribute(name);
        return val ? parseInt(val, 10) : defaultValue;
    }

    // Public API methods for the DOM element
    public start() {
        this.setAttribute('running', '');
    }

    public stop() {
        this.removeAttribute('running');
    }

    public toggle() {
        if (this.hasAttribute('running')) this.stop();
        else this.start();
    }
}