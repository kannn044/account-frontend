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
  userName: any;
  passWord: any;
  cpassWord: any;
  isActive = false;
  isUpdate = false;

  peoples: any;
  peopleId: any;

  constructor(
    private userService: UsersService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getPeople();
  }

  async getUsers() {
    try {
      let rs: any = await this.userService.getUsers();
      this.users = rs.rows;
    } catch (error) {
      this.alertService.error();
    }
  }

  async getPeople() {
    try {
      let rs: any = await this.userService.getPeoples();
      this.peoples = rs.rows;
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
    await this.clearData();
  }

  async clearData() {
    this.peopleId = null;
    this.userName = null;
    this.passWord = null;
    this.cpassWord = null;
    this.isActive = false;
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
              username: this.userName,
              password: this.passWord,
              type: this.isActive ? '2' : '1'
            }
            let rs: any = await this.userService.updateUsers(data);
            if (rs.ok) {
              this.alertService.success();
              this.getUsers();
              this.clearData();
              this.adduser = false;
            } else {
              this.alertService.error('Username ซ้ำ');
            }
          }
        } else {
          if (this.passWord !== this.cpassWord) {
            this.alertService.error('ยืนยัน Password ไม่ถูกต้อง !')
          } else {
            const data = {
              peopleId: this.peopleId,
              username: this.userName,
              password: this.passWord,
              type: this.isActive ? '2' : '1'
            }
            let rs: any = await this.userService.saveUsers(data);
            if (rs.ok) {
              this.alertService.success();
              this.getUsers();
              this.clearData();
              this.adduser = false;
            } else {
              this.alertService.error('Username ซ้ำ');
            }
          }
        }
      }).catch(() => { });
  }

  async updateUser(u) {
    this.isUpdate = true;
    this.userId = u.user_id;
    this.peopleId = u.people_id;
    this.userName = u.username;
    this.isActive = u.type === '1' ? false : true;
    this.adduser = true;
  }

  async removeUser(u) {
    this.alertService.confirm('คุณแน่ใจหรือไม่ ?')
      .then(async () => {
        let rs = await this.userService.deleteUser(u.user_id);
        if (rs) {
          this.alertService.success();
          this.getUsers();
        }
      }).catch(() => { })
  }

  async close(){
    this.adduser = false;
    await this.clearData();
  }
}
