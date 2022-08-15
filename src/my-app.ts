import template from './my-app.html';
import { customElement } from 'aurelia';
import { Page1 } from './page1/page1';
import { Page2 } from './page2/page2';

@customElement({ name: 'my-app', template })
export class MyApp {
  static routes = [
    {
      component: Page1,
      path: '',
      id: 'home',
      title: 'Page1',
    },
    {
      component: Page2,
      path: 'page2',
      title: 'Page2',
    },
  ];
}
