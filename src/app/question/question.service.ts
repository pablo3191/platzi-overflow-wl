import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { Answer } from '../answer/answer.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { getToken } from '@angular/router/src/utils/preactivation';


@Injectable()

export class QuestionService {
    private questionUrl: string;

    constructor(private http: HttpClient) {
        this.questionUrl = urljoin(environment.apiUrl, 'questions');
    }

/**
 * response.json() dejo de existir en el uno de HttpClient, solo dejar responses
 * https://stackoverflow.com/questions/46005430/property-json-does-not-exist-on-type-object
 */
    // getQuestions(): Promise<void | Question[]> {
    //     return this.http.get(this.questionUrl)
    //         .toPromise()
    //         .then(response => response as Question[])
    //         .catch(this.handleError);
    // }

    getQuestions(sort = '-createdAt'): Observable<Question[]> {
        return this.http.get(`${this.questionUrl}?sort=${sort}`)
            .pipe(
                map( res => {
                    return res as Question[]
                }),
                catchError(this.handleError)
            );
    }

    getQuestion(id): Observable<Question[]> {
        const url = urljoin(this.questionUrl, id);
        return this.http.get(url)
            .pipe(
                map( res => {
                    return res as Question[]
                }),
                catchError(this.handleError)
            );
    }

    getToken() {
        const token = localStorage.getItem('token');
        return `?token=${token}`;
    }

    addQuestion(question: Question): Observable<any> {
        const body = JSON.stringify(question);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        
        const token = this.getToken();


        return this.http.post(this.questionUrl + token, body, { headers })
            .pipe(
                map( res => {
                    return res as Question 
                    }),
                    catchError(this.handleError)
                );
    }


    addAnswer(answer: Answer): Observable<any> {
        const a = {
            description: answer.description,
            question: {
                _id: answer.question._id
            }
        };

        const body = JSON.stringify(a);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const id_answer = answer.question._id.toString();
        const url = urljoin(this.questionUrl, id_answer, 'answers');
        const token = this.getToken();
        return this.http.post(url + token, body, { headers })
            .pipe(
                map( res => {
                    return res as Answer 
                    }),
                    catchError(this.handleError)
                );
    }

    // handleError(error: any) {
    //     const errMsg = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server Error';
    //     console.log(errMsg);

    // }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error ocurred: ', error.error.message);
        } else {
            console.error(
                error.error
            );
        }

        return throwError(
            'something bad happened; please try again later.'
        );
    }
}