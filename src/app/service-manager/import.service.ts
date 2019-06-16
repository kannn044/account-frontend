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

  importSalary(files: File) {
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

      const url = `${this.url}/import/salary?token=${this.token}`;
      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }
}
