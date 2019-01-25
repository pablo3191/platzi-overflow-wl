import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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

    getQuestions(): Observable<Question[]> {
        return this.http.get(this.questionUrl)
            .pipe(
                map( res => {
                    return res as Question[]
                })
            );
    }

    getQuestion(id): Observable<Question[]> {
        const url = urljoin(this.questionUrl, id);
        return this.http.get(url)
            .pipe(
                map( res => {
                    return res as Question[]
                })
            );
    }

    handleError(error: any) {
        const errMsg = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server Error';
        console.log(errMsg);

    }
}