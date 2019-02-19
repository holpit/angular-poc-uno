import { Component, OnInit } from '@angular/core';
import { APIDataService } from '../apidata.service';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseComponent } from '../base-destroy-cmp/base.component';

@Component({
  selector: 'app-anagrafica-container',
  templateUrl: 'anagrafica-container.html'
})
export class AnagraficaContainerComponent extends BaseComponent implements OnInit {
  dto: IAnagrafica;
  frm: FormGroup;
  constructor(private svc: APIDataService) {
    super();
    this.frm = new FormGroup({
      residenza: new FormControl(null),
      spedizione: new FormGroup({
        uguaglio: new FormControl(false),
        recapito: new FormControl(null)
      }),
      referente: new FormControl(null),
      XXX: new FormControl(null)
    });
  }

  Load() {
    this.svc
      .getAnagrafica()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.dto = data;
        this.frm.patchValue(data);
      });
  }

  Save() {
    console.log('SEND TO SERVER', this.frm.value);
  }

  ngOnInit() {}
}
