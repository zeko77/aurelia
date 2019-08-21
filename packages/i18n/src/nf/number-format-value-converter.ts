import { valueConverter } from '@aurelia/runtime';
import { I18N, I18nService } from '../i18n';
import { Signals, ValueConverters } from '../utils';

@valueConverter(ValueConverters.numberFormatValueConverterName)
export class NumberFormatValueConverter {
  public readonly signals: string[] = [Signals.I18N_SIGNAL];

  constructor(@I18N private readonly i18n: I18nService) { }

  public toView(value: unknown, options?: Intl.NumberFormatOptions, locale?: string) {
    if (typeof value !== 'number') {
      return value;
    }

    return this.i18n.nf(value, options, locale);
  }
}
