import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AlertList, Alert, AlertType} from '../alerts/alerts.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  alerts: AlertList;
  authenticationError: string;
  loading: boolean;

  constructor(private _loginService: LoginService, private _router: Router) {
    this.alerts = new AlertList();
  }

  ngOnInit() {
    this.loading = false;
  }

  logUserIn() {
    this.loading = true;
    console.log('username : ',this.username , 'password :',  this.password);
    this._loginService.logIn(this.username, this.password)
      .subscribe(
        (data) => {
          this._router.navigate(['/']);
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          console.log('Murali : ', error.status);
          if (error.status === 401) {
            this.authenticationError = 'Invalid user name and password combination murali.';
          } else {
            this.alerts.addAlert(Alert.fromResponse(error));
          }
        }
      );
  }
}
