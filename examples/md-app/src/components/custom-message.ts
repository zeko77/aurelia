import { bindable, customElement } from '@aurelia/runtime';

@customElement({ name: 'custom-message', template: `<span>Hello \${name}!</span>` })
export class CustomMessage {
    @bindable public name!: string;
}