import { FormGroup, FormControl, ControlValueAccessor } from "@angular/forms";
import { validateConfig } from "@angular/router/src/config";
import { map } from "rxjs/operators";
import { Component } from "@angular/core";
import { APIDataService } from "../_DAL/apidata.service";

type TOFIX = any;
interface IInd {
  via: string;
  citta: string;
}

interface IAddr {
  street: string;
  city: string;
}

interface IAddr2 {
  street: string;
  city2: string;
}
@Component({
  providers: [{ provide: "APIDataService", useClass: APIDataService }]
})
class IndirizzoPocoFurbo implements ControlValueAccessor {
  frm = new FormGroup(
    {
      street: new FormControl("", { updateOn: "change" }),
      city: new FormControl("")
    },
    { updateOn: "blur" }
  );
  writeValue(val: IInd) {
    //model -> view
    const addr: IAddr = {
      street: val.via,
      city: val.citta
    };
    val && this.frm.patchValue(addr, { emitEvent: false });
  }

  registerOnChange(fn: (val: TOFIX) => void) {
    //view -> modelù
    const viewToModel: (v: IAddr) => IInd = v => ({
      citta: v.city,
      via: v.street
    });

    this.frm.valueChanges.pipe(map(viewToModel)).subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.frm.valueChanges.subscribe(fn);
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
}
