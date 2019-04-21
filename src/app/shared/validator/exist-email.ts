import { AbstractControl, ValidatorFn } from '@angular/forms';

// export function existEmailValidator(control: AbstractControl): {[key: string]: any} | null {
//   const exist = /^admin$/.test(control.value);
//   return exist ? { 'existEmail': {value: control.value}} : null;
// }

export function existEmailValidator(existEmail: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const exist = existEmail.test(control.value);
    return exist ? { 'existEmail': {value: control.value}} : null;
  }
}

