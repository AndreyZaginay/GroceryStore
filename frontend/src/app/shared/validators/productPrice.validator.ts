import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
  
export const productPriceValidator: ValidatorFn = ( control: AbstractControl ): ValidationErrors | null => {
    return control.value <= 0 ? { productPrice: { value: control.value } } : null;
};  