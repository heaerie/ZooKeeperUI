import { Component, OnInit } from '@angular/core';
import { BASE_PATH } from './autogenerated/variables';
import { LoginService } from './services/login.service';
import { AlertList, Alert, AlertType} from './components/alerts/alerts.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //title = 'SWIFT Scalable Resilient Distributed Custodian';       <a class="navbar-brand" href="#">{{title}}</a>
  isLoggedIn: boolean;
  alerts: AlertList;

  constructor(private _loginService: LoginService) {
    this.isLoggedIn = false;
    this.alerts = new AlertList();
  }

  ngOnInit() {
    this._loginService.loggedInObservable.subscribe(
      loggedIn => this.isLoggedIn = loggedIn,
      error => this.alerts.addAlert(Alert.fromResponse(error))
    );
  }

  logOut() {
    this._loginService.logOut();
  }
}
