import { Component, OnInit, Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public helper: JwtHelperService = new JwtHelperService();
  collapsible: boolean = true;
  fullname: any;

  constructor(
    @Inject('HOME_URL') private homeUrl: string,
  ) {
    const token = sessionStorage.getItem('token');
    const decodedToken = this.helper.decodeToken(token);
    this.fullname = decodedToken.fullname;
  }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('token');
    location.href = this.homeUrl;
  }

}
