import template from './page1.html';
import {
  IValidationRules,
  IValidateable,
  BaseValidationRule,
  ValidateInstruction,
} from '@aurelia/validation';
import { IValidationController } from '@aurelia/validation-html';
import { newInstanceForScope } from '@aurelia/kernel';
import { bindable, customElement } from 'aurelia';
import { watch } from '@aurelia/runtime-html';

interface Address {
  name?: string;
  percentage?: number;
}

class Person {
  addresses?: Address[];
  public constructor(public name: string, public age: number) {}
}

@customElement({ name: 'page1', template })
export class Page1 {
  public person: Person;

  public constructor(
    @newInstanceForScope(IValidationController)
    private validationController: IValidationController,
    @IValidationRules private validationRules: IValidationRules
  ) {
    this.person = new Person('', 41);
    this.validationRules
      .on(this.person)
      .ensureObject()
      .satisfies(
        (p) =>
          p.addresses?.reduce((sum, a) => (sum += Number(a.percentage)), 0) ===
          100
      )
      .withMessage('addresses percentage must add up to exactly 100%')
      .ensure('name')
      .required()
      .withMessage('foo bar field is required')
      .ensure('age')
      .required();
    validationController.addObject(this.person);
  }

  @watch<MyApp>((app: MyApp) =>
    app.person.addresses?.reduce((sum, a) => (sum += Number(a.percentage)), 0)
  )
  public async submit() {
    console.log(
      'Bindings in validation controller',
      this.validationController.bindings.size
    );
    await this.validationController.validate();
  }

  toggleAddresses() {
    if (this.person.addresses) {
      this.person.addresses = undefined;
    } else {
      this.person.addresses = [];

      const address: Address = {};

      this.validationRules
        .on(address)
        .ensure('name')
        .required()
        .withMessage('address name is required')
        .ensure('percentage')
        .required()
        .min(0)
        .max(100);

      this.person.addresses.push(address);
    }
  }

  addAddress() {}

  removeAddress() {}

  private controller;
  created(controller) {
    console.log('created');
    // this.controller = controller;
  }
  dispose() {
    console.log('disposed');
//    setTimeout(() => { debugger; this.controller.dispose() }, 500);
  }
}
