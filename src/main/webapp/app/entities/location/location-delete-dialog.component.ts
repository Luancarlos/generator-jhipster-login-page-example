import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from './location.service';

@Component({
  templateUrl: './location-delete-dialog.component.html'
})
export class LocationDeleteDialogComponent {
  location: ILocation;

  constructor(protected locationService: LocationService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.locationService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'locationListModification',
        content: 'Deleted an location'
      });
      this.activeModal.dismiss(true);
    });
  }
}
