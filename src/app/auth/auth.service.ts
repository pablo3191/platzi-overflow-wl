import { Injectable } from '@angular/core';
import urljoin from 'url-join';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
    usersUrl: string;
    currentUser?: User;


    constructor(private http: HttpClient) {
        this.usersUrl = urljoin(environment.apiUrl, 'auth');
        if (this.isLoggedIn()) {
            const { userId, email, firstName, lastName } = JSON.parse(localStorage.getItem('user'));
            this.currentUser = new User(email, null, firstName, lastName, userId );
        }
    }

    signIn(user: User): Observable<any>  {
        const body = JSON.stringify(user);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(urljoin(this.usersUrl, 'signin'), body, { headers })
            .pipe(
                map( (res: any) => {
                        const json = res.json(); 
                        this.login(json);
                        return json;
                    }),
                    catchError((error: Response) => Observable.throw(error.json()))
                );
    }

    login = ({ token, userId, firstName, lastName, email }) => {
        this.currentUser = new User(email, null, firstName, lastName);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ userId, firstName, lastName, email }));

    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null
    }

}