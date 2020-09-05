import { ISubscriber } from '../observation';

let $currentCollector: ISubscriber | null = null;
const collectors: ISubscriber[] = [];
const collectingStatus: boolean[] = [];

export let collecting = false;

// todo: layer based collection pause/resume?
export function pauseSubscription() {
  collecting = false;
}

export function resumeSubscription() {
  collecting = true;
}

export function getCurrentSubscriber(): ISubscriber | null {
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
  collecting = true;
}

export function exitSubscriber(subscriber: ISubscriber): void {
  if ($currentCollector == null || $currentCollector !== subscriber) {
    throw new Error('${subscriber.id} is not currently collecting');
  }

  collectors.pop();
  $currentCollector = collectors.length > 0 ? collectors[collectors.length - 1] : null;
  collecting = $currentCollector != null;
}

export const DepCollectorSwitcher = Object.freeze({
  getCurrentSubscriber,
  enterSubscriber,
  exitSubscriber,
  pauseSubscription,
  resumeSubscription,
});
