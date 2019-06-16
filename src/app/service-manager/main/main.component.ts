import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { AlertService } from '../alert.service';
import { ImportService } from '../import.service';
import { IMyOptions } from 'mydatepicker-th';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  salaryDate: any;

  users: any;
  file: any;
  fileName: any;

  openUploadSalary: any = false;
  constructor(
    private userService: UsersService,
    private alertService: AlertService,
    private importService: ImportService
  ) { }

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
    try {
      this.importService.importSalary(this.file[0])
        .then((result: any) => {
          console.log(result)
          if (result.ok) {
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
}
