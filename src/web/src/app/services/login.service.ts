import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { take } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API_URL = environment.apiUrl;

  constructor (private http: HttpClient) { }

  authenticate (payload: {username: string, password: string}): Observable<any> {
    return this.http.post(this.API_URL + 'v1/auth', payload).pipe(take(1))
  }
}
