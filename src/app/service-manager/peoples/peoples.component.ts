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
  positions: any;
  titles: any;
  positionId: any;
  titleId: any;
  isUpdate = false;
  adduser = false;

  constructor(
    private userService: UsersService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getPeoples();
    this.getPositions();
    this.getTitles();
  }

  async getPeoples() {
    try {
      let rs: any = await this.userService.getPeoples();
      this.peoples = rs.rows;
    } catch (error) {
      this.alertService.error();
    }
  }

  async getPositions() {
    try {
      let rs: any = await this.userService.getPositions();
      this.positions = rs.rows;
    } catch (error) {
      this.alertService.error();
    }
  }

  async getTitles() {
    try {
      let rs: any = await this.userService.getTitles();
      this.titles = rs.rows;
    } catch (error) {
      this.alertService.error();
    }
  }

  clearData() {
    this.fname = null;
    this.lname = null;
    this.positionId = null;
    this.titleId = null;
    this.query = null;
  }

  async add() {
    try {
      let rs: any = await this.userService.savePeoples(this.fname, this.lname, this.positionId, this.titleId);
      if (rs.ok) {
        this.alertService.success();
        this.getPeoples();
        this.clearData();
        this.adduser = false;
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
            this.clearData();
          }
        }).catch((error) => {
          this.alertService.error();
        })
    } catch (error) {

    }
  }

  async search() {
    try {
      let rs: any = await this.userService.search(this.query);
      if (rs.ok) {
        this.peoples = rs.rows;
      }
    } catch (error) {
      this.alertService.error();
    }
  }

  openModalAddUser() {
    this.adduser = true;
  }

  close() {
    this.adduser = false;
    this.clearData();
  }
}
