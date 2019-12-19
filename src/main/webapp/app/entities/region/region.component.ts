import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRegion } from 'app/shared/model/region.model';
import { RegionService } from './region.service';
import { RegionDeleteDialogComponent } from './region-delete-dialog.component';

@Component({
  selector: 'jhi-region',
  templateUrl: './region.component.html'
})
export class RegionComponent implements OnInit, OnDestroy {
  regions: IRegion[];
  eventSubscriber: Subscription;

  constructor(protected regionService: RegionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.regionService.query().subscribe((res: HttpResponse<IRegion[]>) => {
      this.regions = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInRegions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRegion) {
    return item.id;
  }

  registerChangeInRegions() {
    this.eventSubscriber = this.eventManager.subscribe('regionListModification', () => this.loadAll());
  }

  delete(region: IRegion) {
    const modalRef = this.modalService.open(RegionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.region = region;
  }
}
