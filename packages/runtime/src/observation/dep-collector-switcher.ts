import { IObserverLocator } from './observer-locator';
import { ISubscriber, ICollectionSubscriber } from '../observation';

export interface IDepCollector extends ISubscriber {
  observerLocator?: IObserverLocator;
}

let $currentCollector: IDepCollector | null = null;
const collectors: IDepCollector[] = [];
const collectingStatus: boolean[] = [];

export let collecting = false;

// todo: layer based collection pause/resume?
export function pauseSubscription() {
  collecting = false;
}

export function resumeSubscription() {
  collecting = true;
}

export function getCurrentSubscriber(): IDepCollector | null {
  return $currentCollector;
}

export function enterSubscriber(subscriber: ISubscriber): void {
  if ($currentCollector == null) {
    collectors[0] = $currentCollector = subscriber;
    return;
  }
  if ($currentCollector === subscriber) {
    throw new Error('Already in this subscriber {subscriber.id}');
  }
  collectors.push($currentCollector = subscriber);
}

export function exitSubscriber(subscriber: ISubscriber): void {
  if ($currentCollector == null || $currentCollector !== subscriber) {
    throw new Error('${subscriber.id} is not currently collecting');
  }

  collectors.pop();
  $currentCollector = collectors.length > 0 ? collectors[collectors.length - 1] : null;
}

export const DepCollectorSwitcher = new class {

}();
