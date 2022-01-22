import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null) return null;

    const isPositive = Number(control.value) > 0;
    return isPositive ? null : { isNegative: { value: control.value } };
  };
}
