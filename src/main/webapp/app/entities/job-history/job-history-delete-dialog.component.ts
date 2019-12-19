import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobHistory } from 'app/shared/model/job-history.model';
import { JobHistoryService } from './job-history.service';

@Component({
  templateUrl: './job-history-delete-dialog.component.html'
})
export class JobHistoryDeleteDialogComponent {
  jobHistory: IJobHistory;

  constructor(
    protected jobHistoryService: JobHistoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.jobHistoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'jobHistoryListModification',
        content: 'Deleted an jobHistory'
      });
      this.activeModal.dismiss(true);
    });
  }
}
