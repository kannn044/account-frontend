import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.css']
})
export class TechniciansComponent implements OnInit {

  users: any;
  adduser: boolean = false;

  userId: any;
  firstName: any;
  lastName: any;
  userName: any;
  passWord: any;
  cpassWord: any;
  isActive = false;
  isUpdate = false;

  constructor(
    private usersService: UsersService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    try {
      let rs: any = await this.usersService.getUsers();
      this.users = rs.rows;
    } catch (error) {
      this.alertService.error();
    }
  }

  setAdmin() {
    if (this.isActive) {
      this.isActive = false;
    } else {
      this.isActive = true;
    }
  }

  async openModalAddUser() {
    this.adduser = true;
    this.clearData();
  }

  async clearData() {
    this.firstName = null;
    this.lastName = null;
    this.userName = null;
    this.passWord = null;
    this.cpassWord = null;
    this.isActive = false;
    this.adduser = false;
    this.isUpdate = false;
  }

  async addUser() {
    this.alertService.confirm('คุณต้องการบันทึกข้อมูลใช่หรือไม่ ?')
      .then(async () => {
        if (this.isUpdate) {
          if (this.passWord !== this.cpassWord) {
            this.alertService.error('ยืนยัน Password ไม่ถูกต้อง !')
          } else {
            const data = {
              user_id: this.userId,
              first_name: this.firstName,
              last_name: this.lastName,
              username: this.userName,
              password: this.passWord,
              type: this.isActive ? '2' : '1'
            }
            let rs = await this.usersService.updateUsers(data);
            if (rs) {
              this.alertService.success();
              this.getUsers();
              this.clearData();
            }
          }
        } else {
          if (this.passWord !== this.cpassWord) {
            this.alertService.error('ยืนยัน Password ไม่ถูกต้อง !')
          } else {
            const data = {
              first_name: this.firstName,
              last_name: this.lastName,
              username: this.userName,
              password: this.passWord,
              type: this.isActive ? '2' : '1'
            }
            let rs = await this.usersService.saveUsers(data);
            if (rs) {
              this.alertService.success();
              this.getUsers();
              this.clearData();
            }
          }
        }
      }).catch(() => { });
  }

  async updateUser(u) {
    this.adduser = true;
    this.isUpdate = true;

    this.userId = u.id;
    this.firstName = u.first_name;
    this.lastName = u.last_name;
    this.userName = u.username;
    this.isActive = u.type === '1' ? false : true;
  }

  async removeUser(u) {
    this.alertService.confirm('คุณแน่ใจหรือไม่ ?')
      .then(async () => {
        let rs = await this.usersService.deleteUser(u.id);
        if(rs) {
          this.alertService.success();
          this.getUsers();
        }
      }).catch(() => { })
  }
}
