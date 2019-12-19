import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from './department.service';

@Component({
  templateUrl: './department-delete-dialog.component.html'
})
export class DepartmentDeleteDialogComponent {
  department: IDepartment;

  constructor(
    protected departmentService: DepartmentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.departmentService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'departmentListModification',
        content: 'Deleted an department'
      });
      this.activeModal.dismiss(true);
    });
  }
}
