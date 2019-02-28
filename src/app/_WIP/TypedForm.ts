//BASIC TYPES DEFINED IN @angular/forms + rxjs/Observable
import { FormGroup, FormArray, FormControl, AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
//TODO: PER RISOLVERE DEVO FARE DIRETTAMETNE interface ngxxxTyped<T> extends ngxxx {<T> COPIANDO SPECIFICO + BASE<T>}
//TODO: DEVO FARE COPIA-INCOLLA A TUTTI I LIVELLI DEI METODI COMUNI IN BASE<T> PERCHE' NON FUNZIONA type BASE & SPEC E NON ESISTE interface extends multiple
//OVVERRIDE TYPES WITH STRICT TYPED INTERFACES + SOME TYPE TRICKS TO COMPOSE
type BaseControlT<T> = {
  readonly value: T;
  valueChanges: Observable<T>;
  readonly status: "VALID" | "INVALID" | "PENDING" | "DISABLED";
  statusChanges: Observable<"VALID" | "INVALID" | "PENDING" | "DISABLED">;
  get(path: (string | number)[]): AbstractControlTyped<any> | null; //unknow is BETTER?!
  setValue<V>(x: V extends T ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  patchValue<V>(x: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  reset<V>(value?: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
};
type AbstractControlT<T> = AbstractControl & BaseControlT<T>;
export interface AbstractControlTyped<T> extends AbstractControlT<T> {}

type FormControlT<T> = FormControl & BaseControlT<T>;
export interface FormControlTyped<T> extends FormControlT<T> {}
/*  controls: { [P in keyof T]: AbstractControlTyped<T[P]> };
  registerControl<D = any>(name: string, control: AbstractControlTyped<D>): AbstractControlTyped<D>;
  addControl<D = any>(name: string, control: AbstractControlTyped<D>): void;
  removeControl(name: keyof T): void;
  removeControl(name: string): void;
  setControl<P extends keyof T>(name: P, control: AbstractControlTyped<T[P]>): void;
  setControl(name: string, control: AbstractControlTyped<any>): void;
  contains(name: keyof T): true;
  contains(name: string): boolean;
  get<P extends keyof T>(path: P): AbstractControlTyped<T[P]>;
  get(path: (string | number)[]): AbstractControlTyped<any> | null;
  getRawValue(): T & { [disabledProp in string | number]: any };
  //setValue<V>(x: V extends T ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  //patchValue<V>(x: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
}*/

type FormGroupT<T> = BaseControlT<T> & FormGroup;
export interface FormGroupTyped<T> extends FormGroupT<T> {
  controls: { [P in keyof T]: AbstractControlTyped<T[P]> };
  registerControl<D = any>(name: string, control: AbstractControlTyped<D>): AbstractControlTyped<D>;
  addControl<D = any>(name: string, control: AbstractControlTyped<D>): void;
  removeControl(name: keyof T): void;
  removeControl(name: string): void;
  setControl<P extends keyof T>(name: P, control: AbstractControlTyped<T[P]>): void;
  setControl(name: string, control: AbstractControlTyped<any>): void;
  contains(name: keyof T): true;
  contains(name: string): boolean;
  get<P extends keyof T>(path: P): AbstractControlTyped<T[P]>;
  get(path: (string | number)[]): AbstractControlTyped<any> | null;
  getRawValue(): T & { [disabledProp in string | number]: any };
  //setValue<V>(x: V extends T ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  //patchValue<V>(x: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
}

//type FormArrayTyped<A extends any[]> = A extends (infer T)[] ? (...T...) : never;
type FormArrayT<T> = FormArray & BaseControlT<T[]>;
export interface FormArrayTyped<T> extends FormArrayT<T> {
  controls: AbstractControlTyped<T>[];
  at(index: number): AbstractControlTyped<T>;
  push(ctrl: AbstractControlTyped<T>): void;
  insert(index: number, control: AbstractControlTyped<T>): void;
  setControl(index: number, control: AbstractControlTyped<T>): void;
  //setValue(value: T[], options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  //patchValue(value: Partial<T>[], options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
}
