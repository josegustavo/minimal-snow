import { SnowEngine } from './SnowEngine';
import { SnowElement } from './SnowElement';

export { SnowEngine, SnowElement };

// Automatically register the web component if in a browser environment
if (typeof window !== 'undefined' && !customElements.get('snow-effect')) {
    customElements.define('snow-effect', SnowElement);
}