import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopValidators {
    //validation for whitespaces only

    static notOnlyWhitespace(control: FormControl): ValidationErrors {

        //invalid input
        if ((control.value != null) && (control.value.trim().length === 0)) {
            return { 'notOnlyWhitespace': true }
        } else {
            //valid input
            return null;
        }
    }
}
