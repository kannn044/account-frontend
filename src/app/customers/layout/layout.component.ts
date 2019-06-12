import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  collapsible = true;
  collapse = true;

  constructor(
    @Inject('HOME_URL') private homeUrl: string,
  ) { }

  ngOnInit() {
  }

  logout(){
    sessionStorage.removeItem('token');
    location.href = this.homeUrl;
  }

}
