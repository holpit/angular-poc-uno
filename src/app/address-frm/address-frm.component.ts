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
  selector: "app-address-frm",
  template: `
    <fieldset [formGroup]="frm">
      <h4>Fieldset indirizzo</h4>
      <label>Via</label><input formControlName="via" (blur)="onTouch()" /> <label>CAP</label
      ><input type="number" formControlName="cap" /> <label>Città</label
      ><input formControlName="citta" (blur)="onTouch()" /> <label>Prov</label><input formControlName="prov" />
    </fieldset>
  `,
  styles: []
})
export class AddressFrmComponent implements ControlValueAccessor, Validator, OnInit {
  onTouch = () => {};
  //onTouch: () => {};
  // onChange: (_: any) => {};
  frm = new FormGroup({
    via: new FormControl(""),
    cap: new FormControl(0),
    citta: new FormControl(""),
    prov: new FormControl("")
  });
  constructor(@Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;
    console.log("CTRLDIR", controlDir);
  }
  writeValue(val: IAddress): void {
    console.log("val", val, " model -> view");
    val && this.frm.patchValue(val, { emitEvent: false });
  }

  registerOnChange(fnChange: (val: IAddress) => void): void {
    console.log("ADESSO", fnChange);
    this.frm.valueChanges.subscribe(fromView => {
      console.log("valFromView", fromView, " call fnChange view -> model");
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
