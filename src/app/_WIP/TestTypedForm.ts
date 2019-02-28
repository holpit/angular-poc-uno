import { FormGroup, FormControl, FormArray, AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
import { FormGroupTyped, FormArrayTyped, FormControlTyped, AbstractControlTyped } from "./TypedForm";
/*
export interface AbstractControlTyped<T> extends AbstractControl {
  readonly value: T;
  valueChanges: Observable<T>;
  readonly status: "VALID" | "INVALID" | "PENDING" | "DISABLED" | string;
  statusChanges: Observable<"VALID" | "INVALID" | "PENDING" | "DISABLED">;
  get(path: (string | number)[]): AbstractControlTyped<any> | null; //unknow is BETTER?!
  setValue<V>(value: V extends T ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  patchValue<V>(value: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  reset<V>(value?: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
}

export type FormControlTyped<T> = AbstractControlTyped<T> & FormControl;

export type FormGroupTyped<T> = {
  controls: { [P in string]: AbstractControlTyped<P extends keyof T ? T[P] : any> };
  registerControl<D = any>(name: string, control: AbstractControlTyped<D>): AbstractControlTyped<D>;
  addControl<D = any>(name: string, control: AbstractControlTyped<D>): void;
  removeControl(name: keyof T): void;
  setControl<P extends keyof T>(name: P, control: AbstractControlTyped<T[P]>): void;
  contains(name: string): boolean;
  get<P extends keyof T>(path: P): AbstractControlTyped<T[P]>;
  getRawValue(): T & { [disabledProp in string | number]: any };
} & AbstractControlTyped<T> &
  FormGroup;

//type FormArrayTyped<A extends any[]> = A extends (infer T)[] ? (...T...) : never;
export type FormArrayTyped<T> = {
  controls: AbstractControlTyped<T>[];
  at(index: number): AbstractControlTyped<T>;
  push(ctrl: AbstractControlTyped<T>): void;
  insert(index: number, control: AbstractControlTyped<T>): void;
  setControl(index: number, control: AbstractControlTyped<T>): void;
  //setValue(value: T[], options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  //patchValue(value: Partial<T>[], options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
} & AbstractControlTyped<T[]> &
  FormArray;
*/
function testFormGroupTyped() {
  var frm = new FormGroup({
    a: new FormArray([new FormControl(0)]),
    b: new FormControl(true),
    c: new FormGroup({
      s: new FormControl("abc"),
      n: new FormControl(123)
    })
    //d: new FormControl(null)
  }) as FormGroupTyped<{ a: number[]; b: boolean; c: { s: string; n: number } /*; d?: {}*/ }>;

  var x = frm.controls["a"].value; //OK infer number[]
  var y = frm.controls["b"].value; //OK infer boolean
  frm.controls["c"].valueChanges.subscribe(z => console.log(z)); //OK infer {s: string, n:number}
  var c = frm.get("c").value; //OK infer {s: string, n:number}
  var s = frm.get(["c", "s"]).value; //infer any -> unknown is BETTER?!
  var r = frm.getRawValue(); //OK infer T + allow extra props
  var a = r.a; //OK infer number[]
  var d = r.d; //OK infer any
  var ok = frm.contains("a"); //OK infer true maybe TOO MUCH!?
  var ko = frm.contains("d"); //OK infer boolean -> true=enabled, false=disabled
  frm.setValue({ a: [1, 23], bb: true, c: { s: "s", n: 1 } }); // { b: false }, { onlySelf: true, emitEvent: false }); //I would ERROR but strict check doesn't work... :-(
  frm.patchValue({ bb: true }, { onlySelf: true, emitEvent: false }); //I would OK but strict check doesn't work... :-(
  frm.removeControl("d"); //OK method with correct signature :-)
  frm.registerControl("d", new FormControl(null)); //OK method with correct signature :-)
  frm.get("d").disable(); //OK method with correct signature :-)
  frm.removeControl("b"); //OK method with strict signature :-)
  frm.setControl("b", testFormControlTyped()); //OK method with strict signature :-)
  frm.get(["d"]).disable({ emitEvent: false }); //OK method with strict signature :-)
}

function testFormArrayTyped() {
  var arr = new FormArray([
    new FormGroup({
      s: new FormControl("abc"),
      n: new FormControl(123)
    })
  ]) as FormArrayTyped<{ s: string; n: number }>;
  var x = arr.controls[0].value; //infer any ?!? WHY NOT {s: string, n:number}
  var y = arr.at(1).value; //infer {s: string; n:number}
  arr.controls[0].valueChanges.subscribe(z => console.log(z)); //infer {s: string, n:number}
  arr.push(new FormControl(null)); //strict check doesn't work... :-(
  arr.insert(1, new FormGroup({})); //strict check doesn't work... :-(
  arr.setControl(1, new FormGroup({})); //strict check doesn't work... :-(
  arr.removeAt(0); //OK method with correct signature :-)
  var l = arr.length; //OK method with correct signature :-)
  arr.setValue([{ s: "a", n: 1 }, { n: 2 }]); //I would ERROR but strict check doesn't work... :-(
  arr.patchValue([{ s: "a" }, { n: 2 }, {}]); //I would OK but strict check doesn't work... :-(
  return arr;
}

function testFormControlTyped() {
  var ctrl = new FormControl(true) as FormControlTyped<boolean>;
  var x = ctrl.value; //infer any ?!? WHY NOT boolean
  ctrl.valueChanges.subscribe(z => console.log(z)); //infer boolean
  ctrl.setValue("abc"); //I would ERROR but strict check doesn't work... :-(
  ctrl.patchValue(123); //I would OK but strict check doesn't work... :-(
  return ctrl;
}
