import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  users: any;

  constructor(
    private userService: UsersService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    try {
      let rs: any = await this.userService.getUsers();
      this.users = rs.rows;
    } catch (error) {
      this.alertService.error();
    }
  }
}
