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

function totPippo(x: IXXX): number {
  return x.a["pippo"].reduce((a, b) => a + b);
}

test();

interface IC<T> extends C {
  setValue<V>(x: V extends T ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  patchValue<V>(x: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
}
abstract class B {
  abstract setValue(x: any, options?: Object): void;
}
class C extends B {
  setValue(x: { [key: string]: any }, options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    console.log("SET VALUE", x);
  }
  patchValue(x: any): void {
    console.log("PATCH", x);
  }
}

var x = new C() as IC<{ a: number; b: boolean }>;
x.setValue({ a: 123, bb: true });
x.patchValue({ bb: false });
