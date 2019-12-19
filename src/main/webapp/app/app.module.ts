import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { LoginPageExampleSharedModule } from 'app/shared/shared.module';
import { LoginPageExampleCoreModule } from 'app/core/core.module';
import { LoginPageExampleAppRoutingModule } from './app-routing.module';
import { LoginPageExampleEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    LoginPageExampleSharedModule,
    LoginPageExampleCoreModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    LoginPageExampleEntityModule,
    LoginPageExampleAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class LoginPageExampleAppModule {}
