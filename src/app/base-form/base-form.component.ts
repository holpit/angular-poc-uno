import { Self } from "@angular/core";
import { FormGroup, NgControl, ControlValueAccessor } from "@angular/forms";
import { BaseComponent } from "../base-destroy-cmp/base.component";

export abstract class BaseFrmComponent<T> extends BaseComponent implements ControlValueAccessor {
  onTouch = () => {};
  //onTouch: () => {};
  // onChange: (_: any) => {};

  abstract initFrm(): FormGroup;

  frm: FormGroup;
  constructor(@Self() public controlDir: NgControl) {
    super();
    this.frm = this.initFrm();
    controlDir.valueAccessor = this;
    // console.log("CTRLDIR", controlDir);
  }
  writeValue(val: T): void {
    // console.log("val", val, " model -> view");
    val && this.frm.patchValue(val, { emitEvent: false });
  }

  registerOnChange(fnChange: (val: T) => void): void {
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
}
