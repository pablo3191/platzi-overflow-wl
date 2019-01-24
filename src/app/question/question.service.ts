import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import 'rxjs/add/operator/toPromise';

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
    getQuestions(): Promise<void | Question[]> {
        return this.http.get(this.questionUrl)
            .toPromise()
            .then(response => response as Question[])
            .catch(this.handleError);
    }

    handleError() {

    }
}