import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-peoples',
  templateUrl: './peoples.component.html',
  styleUrls: []
})
export class PeoplesComponent implements OnInit {
  peoples: any;
  fname: any;
  lname: any;
  query: any;

  constructor(
    private userService: UsersService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getPeoples();
  }

  async getPeoples() {
    try {
      let rs: any = await this.userService.getPeoples();
      this.peoples = rs.rows;
    } catch (error) {
      this.alertService.error();
    }
  }

  async add() {
    try {
      let rs: any = await this.userService.savePeoples(this.fname, this.lname);
      if (rs.ok) {
        this.alertService.success();
        this.fname = null;
        this.lname = null;
        this.getPeoples();
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error();
    }
  }

  async remove(t) {
    try {
      this.alertService.confirm('คุณแน่ใจหรือไม่ ?')
        .then(async () => {
          let rs: any = await this.userService.deletePeoples(t.people_id)
          if (rs.ok) {
            this.alertService.success();
            this.getPeoples();
          }
        }).catch((error) => { })
    } catch (error) {

    }
  }

  async search() {
    try {
      let rs: any = await this.userService.search(this.query);
      console.log(rs);
      
      if (rs.ok) {
        this.peoples = rs.rows;
      }
    } catch (error) {

    }
  }
}
