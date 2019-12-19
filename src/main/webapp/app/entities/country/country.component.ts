import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from './country.service';
import { CountryDeleteDialogComponent } from './country-delete-dialog.component';

@Component({
  selector: 'jhi-country',
  templateUrl: './country.component.html'
})
export class CountryComponent implements OnInit, OnDestroy {
  countries: ICountry[];
  eventSubscriber: Subscription;

  constructor(protected countryService: CountryService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.countryService.query().subscribe((res: HttpResponse<ICountry[]>) => {
      this.countries = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCountries();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICountry) {
    return item.id;
  }

  registerChangeInCountries() {
    this.eventSubscriber = this.eventManager.subscribe('countryListModification', () => this.loadAll());
  }

  delete(country: ICountry) {
    const modalRef = this.modalService.open(CountryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.country = country;
  }
}
