import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: []
})
export class TitlesComponent implements OnInit {
  titles: any
  titleName: any;

  constructor(
    private userService: UsersService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getTitles();
  }

  async getTitles() {
    try {
      let rs: any = await this.userService.getTitles();
      this.titles = rs.rows;
    } catch (error) {
      this.alertService.error();
    }
  }

  async add() {
    try {
      let rs: any = await this.userService.saveTitles(this.titleName);
      if (rs.ok) {
        this.alertService.success();
        this.titleName = null;
        this.getTitles();
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
          let rs: any = await this.userService.deleteTitles(t.title_id)
          if (rs.ok) {
            this.alertService.success();
            this.getTitles();
          }
        }).catch((error) => { })
    } catch (error) {

    }
  }
}
