import {Injectable, EventEmitter} from 'angular2/core'
import {Http, Headers, Response} from 'angular2/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Request {
  private http: Http;
  private varHeaders: any = { headers: new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' }) };

  public constructor(httpService: Http) {
    this.http = httpService;
  }

  // get(path, callback){
  //   this.http.get(path).map((response:Response) => {
  //     // console.log(response);
  //   });
  // }
  get(path) {
    // console.log(path);
    return this.http.get(path, this.varHeaders).map((response: Response) => {
      // console.log(path);
      var r: any = response.json();
      // console.log(r);
      return r;
    });
  }

  post(path, data) {
    return this.http.post(path, JSON.stringify(data), this.varHeaders).map((response: Response) => {
      var r: any = response.json();
      return r;
    });
  }
}
