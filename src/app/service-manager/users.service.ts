import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) {

  }

  getUsers() {
    const _url = `${this.url}/users`;
    return this.http.get(_url).toPromise();
  }

  getTitles() {
    const _url = `${this.url}/users/titles`;
    return this.http.get(_url).toPromise();
  }

  getPositions() {
    const _url = `${this.url}/users/positions`;
    return this.http.get(_url).toPromise();
  }

  getPeoples() {
    const _url = `${this.url}/users/peoples`;
    return this.http.get(_url).toPromise();
  }

  getPeoplesSalary(date: any) {
    const _url = `${this.url}/users/salary?date=${date}`;
    return this.http.get(_url).toPromise();
  }

  getPeoplesSalarySearch(date: any, query: any) {
    const _url = `${this.url}/users/salary/search?date=${date}&query=${query}`;
    return this.http.get(_url).toPromise();
  }

  saveUsers(data: any) {
    const _url = `${this.url}/users`;
    return this.http.post(_url, {
      people_id: data.peopleId,
      username: data.username,
      password: data.password,
      type: data.type
    }).toPromise();
  }

  saveTitles(titleName: any) {
    const _url = `${this.url}/users/titles`;
    return this.http.post(_url, {
      title_name: titleName
    }).toPromise();
  }

  savePositions(positionName: any) {
    const _url = `${this.url}/users/positions`;
    return this.http.post(_url, {
      position_name: positionName
    }).toPromise();
  }

  savePeoples(fname: any, lname: any, position_id: any, title_id: any) {
    const _url = `${this.url}/users/people`;
    return this.http.post(_url, {
      fname: fname,
      lname: lname,
      position_id: position_id,
      title_id: title_id
    }).toPromise();
  }

  updateUsers(data: any) {
    const _url = `${this.url}/users`;
    return this.http.put(_url, {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      password: data.password,
      type: data.type,
      user_id: data.user_id
    }).toPromise();
  }

  deleteUser(userId: any) {
    const _url = `${this.url}/users/delete`;
    return this.http.put(_url, { user_id: userId }).toPromise();
  }

  deleteTitles(Id: any) {
    const _url = `${this.url}/users/delete/titles/${Id}`;
    return this.http.delete(_url).toPromise();
  }

  deletePositions(Id: any) {
    const _url = `${this.url}/users/delete/positions/${Id}`;
    return this.http.delete(_url).toPromise();
  }

  deletePeoples(Id: any) {
    const _url = `${this.url}/users/delete/peoples/${Id}`;
    return this.http.delete(_url).toPromise();
  }

  search(query: any) {
    const _url = `${this.url}/users/search?query=${query}`;
    return this.http.get(_url).toPromise();
  }

  searchPosition(query: any) {
    const _url = `${this.url}/users/search/position?query=${query}`;
    return this.http.get(_url).toPromise();
  }

  searchInfo(query: any) {
    const _url = `${this.url}/users/search/info?query=${query}`;
    return this.http.get(_url).toPromise();
  }

  removeSalary(date: any) {
    const _url = `${this.url}/users/delete/salary?date=${date}`;
    return this.http.delete(_url).toPromise();
  }
}
