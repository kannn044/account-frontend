import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  userTypeId: any;
  errorMessage: string = null;
  isError = false;

  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  doLogin() {
    console.log(this.userTypeId);
    if (this.username && this.password) {
      this.loginService.doCustomerLogin(this.username, this.password)
        .subscribe((data: any) => {
          if (data.ok) {
            sessionStorage.setItem('token', data.token);

            if (data.type === "2") {
              this.route.navigate(['/sm']);
            } else {
              this.route.navigate(['/customers']);
            }

          } else {
            this.isError = true;
            this.errorMessage = data.error;
          }
        }, error => {
          this.isError = true;
          this.errorMessage = 'เกิดปัญหาในการเชื่อมต่อ';
        });
    } else {
      this.isError = true;
      this.errorMessage = 'กรุณาระบุชื่อผู้ใช้งาน หรือ รหัสผ่าน'
    }

  }

}
