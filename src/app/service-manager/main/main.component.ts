import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { AlertService } from '../alert.service';
import { ImportService } from '../import.service';
import { IMyOptions } from 'mydatepicker-th';
import * as _ from "lodash"
import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('htmlPreview') public htmlPreview: any;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  salaryDate: any;

  token: any;
  users: any;
  usersSalary: any;
  file: any;
  fileName: any = null;
  selectedPeoples = [];
  selectedPeoplesSalary = [];
  query: any;
  queryUserSalary: any;

  openUploadSalary: any = false;
  constructor(
    @Inject('API_URL') private url: string,
    private userService: UsersService,
    private alertService: AlertService,
    private importService: ImportService
  ) {
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit() {
    this.getUsers();

    const date = new Date();

    this.salaryDate = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };

    this.getUserSalary();
  }

  async search() {
    try {
      let rs: any = await this.userService.searchInfo(this.query);
      if (rs.ok) {
        this.users = rs.rows;
      }
    } catch (error) {
      this.alertService.error();
    }
  }

  async getUsers() {
    try {
      let rs: any = await this.userService.getUsers();
      this.users = rs.rows;
    } catch (error) {
      this.alertService.error();
    }
  }

  showUploadModal() {
    this.openUploadSalary = true;
  }

  fileChangeEvent(fileInput: any) {
    this.file = <Array<File>>fileInput.target.files;
    this.fileName = this.file[0].name;
  }

  async doUpload() {
    const date = moment(this.salaryDate.jsdate).format('YYYY-MM-DD');
    try {
      this.importService.importSalary(this.file[0], date)
        .then((result: any) => {
          console.log(result)
          if (result.ok) {
            this.alertService.success();
            this.getUserSalary();
            this.fileName = null;
            this.openUploadSalary = false;
          } else {
            this.alertService.error(JSON.stringify(result.error));
          }
        }, (err) => {
          this.alertService.error(JSON.stringify(err));
        });
    } catch (err) {
      this.alertService.error(JSON.stringify(err));
    }
  }

  async exportSalary() {
    if (this.selectedPeoples.length) {
      let peopleIds = [];
      this.selectedPeoples.forEach(v => {
        peopleIds.push('pid=' + v.people_id);
      });
      const url = `${this.url}/import/export/salary?token=${this.token}&` + peopleIds.join('&');
      window.open(url, '_blank');
      this.selectedPeoples = [];
    } else {
      this.alertService.error('กรุณาเลือกบุคลากร')
    }
  }

  async getUserSalary() {
    const _date = moment(this.salaryDate.jsdate).format('YYYY-MM');
    try {
      let rs: any = await this.userService.getPeoplesSalary(_date);
      if (rs.ok) {
        this.usersSalary = rs.rows;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error();
    }
  }

  async removeAll() {
    const _date = moment(this.salaryDate.jsdate).format('YYYY-MM');
    try {
      this.alertService.confirm('คุณแน่ใจหรือไม่ ?')
        .then(async () => {
          let rs: any = await this.userService.removeSalary(_date);
          if (rs.ok) {
            this.alertService.success();
            this.getUserSalary();
          } else {
            this.alertService.error();
          }
        })
    } catch (error) {
      this.alertService.error();
    }
  }

  async searchUserSalary() {
    const _date = moment(this.salaryDate.jsdate).format('YYYY-MM');
    try {
      let rs: any = await this.userService.getPeoplesSalarySearch(_date, this.queryUserSalary);
      if (rs.ok) {
        this.usersSalary = rs.rows;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.error();
    }
  }

  async printSalary() {
    const salary_id = _.join(_.map(this.selectedPeoplesSalary, (v: any) => { return 'id=' + v.salary_id }), '&')
    const token = sessionStorage.getItem('token');
    const url = `${this.url}/report/salary?token=${token}&` + salary_id;
    this.htmlPreview.showReport(url);
  }
}
