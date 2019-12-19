import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  authenticationError: boolean;
  password: string;
  rememberMe: boolean;
  username: string;

  constructor(
    private accountService: AccountService,
    private eventManager: JhiEventManager,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.rememberMe = true;
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.loginService
      .login({
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          this.router.navigate(['/painel']);
          this.eventManager.broadcast({
            name: 'authenticationSuccess',
            content: 'Sending Authentication Success'
          });
        },
        error => {
          console.error('deu error', error);
          this.authenticationError = true;
        }
      );
  }

  requestResetPassword() {
    this.router.navigate(['/account/reset', 'request']);
  }
}
