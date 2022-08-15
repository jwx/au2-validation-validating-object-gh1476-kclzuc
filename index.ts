import Aurelia from 'aurelia';
import {
  ValidationHtmlConfiguration,
  ValidationTrigger,
} from '@aurelia/validation-html';
import { MyApp, PersonEditor } from './src/my-app';
import { RouterConfiguration } from '@aurelia/router-lite';

new Aurelia()
  .register(RouterConfiguration)
  .register(
    ValidationHtmlConfiguration.customize((options) => {
      options.DefaultTrigger = ValidationTrigger.changeOrFocusout;
    }),
    PersonEditor
  )
  .app({ host: document.querySelector('my-app'), component: MyApp })
  .start();
