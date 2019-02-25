import { Component, OnInit, Self } from "@angular/core";
import {
  FormGroup,
  FormControl,
  NgControl,
  ControlValueAccessor,
  AbstractControl,
  Validator,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-name-frm",
  template: `
    <fieldset [formGroup]="frm">
      <h4>Fieldset name</h4>
      <label>Name</label><input formControlName="name" (blur)="onTouch()" />

      <label>Surname</label><input type="text" formControlName="surname" (blur)="onTouch()" />
    </fieldset>
  `,
  styles: []
})
export class NameFrmComponent implements ControlValueAccessor, Validator, OnInit {
  onTouch = () => {};
  //onTouch: () => {};
  // onChange: (_: any) => {};
  frm = new FormGroup({
    name: new FormControl(""),
    surname: new FormControl("")
  });
  constructor(@Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;
    // console.log("CTRLDIR", controlDir);
  }
  writeValue(val: IAddress): void {
    // console.log("val", val, " model -> view");
    val && this.frm.patchValue(val, { emitEvent: false });
  }

  registerOnChange(fnChange: (val: IAddress) => void): void {
    // console.log("ADESSO", fnChange);
    this.frm.valueChanges.subscribe(fromView => {
      // console.log("valFromView", fromView, " call fnChange view -> model");
      fnChange(fromView);
    });
  }

  //onTouch: Function;
  registerOnTouched(fn: any): void {
    // ribellione any by Aly
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log("set Disable -> ", isDisabled);
    if (isDisabled) this.frm.disable();
    else this.frm.enable();
  }

  validate(ctrl: AbstractControl) {
    return null;
  }

  ngOnInit() {
    const control = this.controlDir.control;
    //let validators = control.validator ? [control.validator, Validators.required] : Validators.required;
    //control.setValidators(validators);
    //control.updateValueAndValidity();
  }
}
