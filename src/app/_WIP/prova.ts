import { FormGroup, FormControl, FormArray, ControlValueAccessor, AbstractControl } from "@angular/forms";
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

class Cxxx {
  constructor(public a: any, public b: boolean, public s: string, public n: number) {}
}
interface IXXX extends Cxxx {
  a: { [p: string]: number[] };
}
function test() {
  const x = new Cxxx({ pippo: [4, 5, 6] }, true, "abc", 123);
  var tot = totPippo(x); //16 OK YESSS!!
  console.log(x, "x TOT->", tot);
  const y = new Cxxx({ pippo: "ciao" }, true, "abc", 123);
  var tot = totPippo(y); //ERROR RUNTIME
  console.log(x, "y TOT->", tot);
}

function totPippo(x: IXXX) {
  return x.a["pippo"].reduce((a, b) => a + b);
}

test();
