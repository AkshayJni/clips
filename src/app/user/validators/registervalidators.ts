import { ValidationErrors, AbstractControl, ValidatorFn } from "@angular/forms";

export class Registervalidators {
    static match(controlName: string, matchingControlName: string) : ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const control = group.get(controlName);
            const matchinControl = group.get(matchingControlName);

            if (!control || !matchinControl) {
                console.error('Form controls cannot be found in group');
                return { controlNotFound: false }
            }

            const error = control.value === matchinControl.value ? null : { noMatch: true };
            matchinControl.setErrors(error);
            return error;
        };
    }
}
