import { IObserverLocator } from './observer-locator';
import { ISubscriber } from '../observation';

export interface IDepCollector extends ISubscriber {
  observerLocator?: IObserverLocator;
}

const toStringTag = Object.prototype.toString;
let currentCollector: IDepCollector | null = null;
const collectors: IDepCollector[] = [];

export const DepCollectorSwitcher = new class {

  get current(): IDepCollector | null {
    return currentCollector;
  }

  peek(): IDepCollector | null {
    return currentCollector;
  }

  enter(collector: IDepCollector): void {
    if (collectors.indexOf(collector) > -1) {
      throw new Error('Already has observer ${observer.id} in the stack');
    }
    if (collector === null) {
      throw new Error('Null was given to SwitchObserver.enter');
    }
    collectors.push(collector);
    currentCollector = collector;
  }

  exit(collector: IDepCollector): void {
    if (currentCollector !== collector) {
      throw new Error('${collector.id} is not currently collecting');
    }

    collectors.pop();
    currentCollector = collectors.length > 0 ? collectors[collectors.length - 1] : null;
  }
}
