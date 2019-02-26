//BASIC TYPES DEFINED IN @angular/forms + rxjs/Observable
type FormGroup = import("@angular/forms").FormGroup;
type FormArray = import("@angular/forms").FormArray;
type FormControl = import("@angular/forms").FormControl;
type AbstractControl = import("@angular/forms").AbstractControl;
type Observable<T> = import("rxjs").Observable<T>;

//OVVERRIDE TYPES WITH STRICT TYPED INTERFACES
interface AbstractControlTyped<T> extends AbstractControl {
  readonly value: T;
  valueChanges: Observable<T>;
  readonly status: "VALID" | "INVALID" | "PENDING" | "DISABLED";
  statusChanges: Observable<"VALID" | "INVALID" | "PENDING" | "DISABLED">;
  get(path: (string | number)[]): AbstractControlTyped<any> | null; //unknow is BETTER?!
  setValue(value: T, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  patchValue(value: Partial<T>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  reset(value?: Partial<T>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
}

type FormControlTyped<T> = AbstractControlTyped<T> & FormControl;

type FormGroupTyped<T> = {
  controls: { [P in keyof T]: AbstractControlTyped<T[P]> };
  registerControl<D = any>(name: string, control: AbstractControlTyped<D>): AbstractControlTyped<D>;
  addControl<D = any>(name: string, control: AbstractControlTyped<D>): void;
  removeControl(name: keyof T): void;
  setControl<P extends keyof T>(name: P, control: AbstractControlTyped<T[P]>): void;
  contains(name: keyof T): true;
  contains(name: string): boolean;
  get<P extends keyof T>(path: P): AbstractControlTyped<T[P]>;
  getRawValue(): T & { [disabledProp in string | number]: any };
} & AbstractControlTyped<T> &
  FormGroup;

//type FormArrayTyped<A extends any[]> = A extends (infer T)[] ? (...T...) : never;
type FormArrayTyped<T> = {
  controls: AbstractControlTyped<T>[];
  at(index: number): AbstractControlTyped<T>;
  push(ctrl: AbstractControlTyped<T>);
  insert(index: number, control: AbstractControlTyped<T>): void;
  setControl(index: number, control: AbstractControlTyped<T>): void;
  setValue(value: T[], options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  patchValue(value: Partial<T>[], options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
} & AbstractControlTyped<T[]> &
  FormArray;
