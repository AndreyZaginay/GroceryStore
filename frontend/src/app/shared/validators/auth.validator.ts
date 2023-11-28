import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
  
export const confirmPasswordValidator: ValidatorFn = ( control: AbstractControl ): ValidationErrors | null => {
    return control.value.password === control.value.confirmPassword ? null: { confirmPassError: {value: control.value} };
};