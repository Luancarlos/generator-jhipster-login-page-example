import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Job } from 'app/shared/model/job.model';
import { JobService } from './job.service';
import { JobComponent } from './job.component';
import { JobDetailComponent } from './job-detail.component';
import { JobUpdateComponent } from './job-update.component';
import { IJob } from 'app/shared/model/job.model';

@Injectable({ providedIn: 'root' })
export class JobResolve implements Resolve<IJob> {
  constructor(private service: JobService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJob> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((job: HttpResponse<Job>) => job.body));
    }
    return of(new Job());
  }
}

export const jobRoute: Routes = [
  {
    path: '',
    component: JobComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'loginPageExampleApp.job.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: JobDetailComponent,
    resolve: {
      job: JobResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'loginPageExampleApp.job.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: JobUpdateComponent,
    resolve: {
      job: JobResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'loginPageExampleApp.job.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: JobUpdateComponent,
    resolve: {
      job: JobResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'loginPageExampleApp.job.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
