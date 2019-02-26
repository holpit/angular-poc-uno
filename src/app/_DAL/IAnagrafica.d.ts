interface IAnagrafica {
  residenza: IAddress;
  spedizione: {
    uguaglio: boolean;
    recapito: IAddress;
  };
  contatti: IContatto[];

  coniuge: INominativo & {
    sposato: boolean;
  };
  referente: {
    name: string;
    surname: string;
  };
  amici: [{ name: string; surname: string }];
}

interface IAddress {
  via: string;
  cap: number;
  citta: string;
  prov: string;
}

interface IContatto {
  tipo: "cell" | "tel";
  numero: string;
}
