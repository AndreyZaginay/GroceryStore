import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
  
export const confirmPasswordValidator: ValidatorFn = ( control: AbstractControl ): ValidationErrors | null => {
    return control.value === control.parent?.value.password ? null : { confirmPassError: { value: control.value } };
};  