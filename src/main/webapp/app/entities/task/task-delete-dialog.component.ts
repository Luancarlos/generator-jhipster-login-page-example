import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITask } from 'app/shared/model/task.model';
import { TaskService } from './task.service';

@Component({
  templateUrl: './task-delete-dialog.component.html'
})
export class TaskDeleteDialogComponent {
  task: ITask;

  constructor(protected taskService: TaskService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.taskService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'taskListModification',
        content: 'Deleted an task'
      });
      this.activeModal.dismiss(true);
    });
  }
}
