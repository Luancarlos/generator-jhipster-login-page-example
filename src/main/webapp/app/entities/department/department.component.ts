import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from './department.service';
import { DepartmentDeleteDialogComponent } from './department-delete-dialog.component';

@Component({
  selector: 'jhi-department',
  templateUrl: './department.component.html'
})
export class DepartmentComponent implements OnInit, OnDestroy {
  departments: IDepartment[];
  eventSubscriber: Subscription;

  constructor(protected departmentService: DepartmentService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.departmentService.query().subscribe((res: HttpResponse<IDepartment[]>) => {
      this.departments = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInDepartments();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDepartment) {
    return item.id;
  }

  registerChangeInDepartments() {
    this.eventSubscriber = this.eventManager.subscribe('departmentListModification', () => this.loadAll());
  }

  delete(department: IDepartment) {
    const modalRef = this.modalService.open(DepartmentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.department = department;
  }
}
