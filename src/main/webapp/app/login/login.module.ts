import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LOGIN_ROUTE } from './login.route';
import { LoginPageExampleSharedLibsModule } from 'app/shared/shared-libs.module';

@NgModule({
  imports: [LoginPageExampleSharedLibsModule, RouterModule.forChild([LOGIN_ROUTE])],
  declarations: [LoginComponent]
})
export class LoginPageExampleLoginModule {}
