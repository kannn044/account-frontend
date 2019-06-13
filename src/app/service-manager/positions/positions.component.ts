import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: []
})
export class PositionsComponent implements OnInit {
  positions: any
  positionName: any;
  query: any;

  constructor(
    private userService: UsersService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getPositions();
  }

  async getPositions() {
    try {
      let rs: any = await this.userService.getPositions();
      this.positions = rs.rows;
    } catch (error) {
      this.alertService.error();
    }
  }

  async add() {
    try {
      let rs: any = await this.userService.savePositions(this.positionName);
      if (rs.ok) {
        this.alertService.success();
        this.positionName = null;
        this.getPositions();
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
          let rs: any = await this.userService.deletePositions(t.position_id)
          if (rs.ok) {
            this.alertService.success();
            this.getPositions();
          }
        }).catch((error) => { })
    } catch (error) {

    }
  }

  async search() {
    try {
      let rs: any = await this.userService.searchPosition(this.query);
      console.log(rs);

      if (rs.ok) {
        this.positions = rs.rows;
      }
    } catch (error) {

    }
  }
}
