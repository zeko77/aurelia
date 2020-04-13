import { IContainer } from '@aurelia/kernel';
import { CustomMessage } from './custom-message';

export const Components = {
    register(container: IContainer) {
        container
            .register(
                CustomMessage,
            );
    }
}