import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  token: any = null;

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private url: string
  ) {
    this.token = sessionStorage.getItem('token');
  }

  exportSalary(pIds: any) {
    const peopleIds: any = [];
    pIds.forEach(e => {
      peopleIds.push('pid=' + e);
    });
    const url = `${this.url}/import/export/salary?` + peopleIds.join('&');
    return this.http.get(url).toPromise();
  }

  importSalary(files: File, date: any) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append("file", files, files.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      const url = `${this.url}/import/salary?token=${this.token}&date=${date}`;
      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }
}
