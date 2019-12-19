import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  templateUrl: './employee-delete-dialog.component.html'
})
export class EmployeeDeleteDialogComponent {
  employee: IEmployee;

  constructor(protected employeeService: EmployeeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.employeeService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'employeeListModification',
        content: 'Deleted an employee'
      });
      this.activeModal.dismiss(true);
    });
  }
}
