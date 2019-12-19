import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from './country.service';

@Component({
  templateUrl: './country-delete-dialog.component.html'
})
export class CountryDeleteDialogComponent {
  country: ICountry;

  constructor(protected countryService: CountryService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.countryService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'countryListModification',
        content: 'Deleted an country'
      });
      this.activeModal.dismiss(true);
    });
  }
}
