import { Component, OnInit, ViewChild, AfterViewInit, forwardRef } from "@angular/core";
import {
  NgControl,
  ControlContainer,
  FormControl,
  FormControlDirective,
  FormGroupDirective,
  FormGroup
} from "@angular/forms";
import { BaseComponent } from "../base-destroy-cmp/base.component";

@Component({
  selector: "app-nominativo-fld",
  template: `
    <fieldset [formGroup]="acaso">
      <h4>Fieldset nominativo</h4>
      <label>Nome</label>
      <input [formControl]="fldNome" #nome="ngForm" />
      <label>Cognome</label>
      <input [formControl]="fldCognome" #cognome="ngForm" />
    </fieldset>
  `
  //providers: [{ provide: ControlContainer, useFactory: forwardRef(()=>NominativoFldComponent.parent) }]
  //viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class NominativoFldComponent extends BaseComponent implements AfterViewInit {
  @ViewChild("nome") nome: FormControlDirective;
  @ViewChild("cognome") cognome: FormControlDirective;
  fldNome = new FormControl("");
  fldCognome = new FormControl("");
  acaso = new FormGroup({
    nome: this.fldNome,
    cognome: this.fldCognome
  });

  constructor(public parent: ControlContainer) {
    super();
    //(<FormGroupDirective>this.parent).addControl()
    console.log(this.parent);
    //console.log(this.parent.control);
    //console.info(this.parent.control.constructor);
  }

  ngAfterViewInit() {
    console.log(this.fldNome, this.fldCognome);
    this.parent.formDirective.addControl(this.nome);
    this.parent.formDirective.addControl(this.cognome);
  }

  ngOnInit() {}
}
