import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJob } from 'app/shared/model/job.model';
import { JobService } from './job.service';

@Component({
  templateUrl: './job-delete-dialog.component.html'
})
export class JobDeleteDialogComponent {
  job: IJob;

  constructor(protected jobService: JobService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.jobService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'jobListModification',
        content: 'Deleted an job'
      });
      this.activeModal.dismiss(true);
    });
  }
}
