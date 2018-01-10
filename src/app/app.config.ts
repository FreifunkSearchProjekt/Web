import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppConfig {

  private config: Object = null;

  constructor(private http: HttpClient) {

  }

  /**
   * Use to get the data found in the second file (config file)
   */
  public getConfig(key: any) {
    return this.config[key];
  }

  /**
   * This method:
   *   b) Loads "config.json" to get all variables
   */
  public load() {
    return new Promise((resolve, reject) => {
      this.http.get('/config.json')
      .catch((error: any) => {
        console.error('Error reading configuration file');
        resolve(error);
        return Observable.throw(error.error || 'Server error');
      })
      .subscribe((responseData) => {
        this.config = responseData;
        resolve(true);
      });
    });
  }
}
