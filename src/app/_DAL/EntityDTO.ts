export type JSON<T> = { [P in keyof T]: T[P] extends Function ? never : T[P] extends Date ? string : T[P] };

export class Pippo {
  a: number;
  b: string;
  d: Date;
  c: {
    f: boolean;
  };
  doSomething: (x: number) => void;
  constructor(json: JSON<Pippo>) {
    Object.assign(this, json);
  }
}

var x: JSON<Pippo>;

// Esempio di derivazione delle interfacce json api a partire dalle classi
