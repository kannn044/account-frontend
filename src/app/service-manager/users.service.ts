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

  saveUsers(data: any) {
    const _url = `${this.url}/users`;
    return this.http.post(_url, {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      password: data.password,
      type: data.type
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
    const _url = `${this.url}/users/${userId}`;
    return this.http.delete(_url).toPromise();
  }
}
