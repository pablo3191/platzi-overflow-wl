import { Component, OnInit } from '@angular/core';
import { Question } from './question.model';
import {QuestionService} from './question.service';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styles: [`
        i {
            font-size: 48px;
        }

        i.help {
            width: 48px !important;
            heigth: 48px !important;
            padding: 0 !important;
            font-size: 48px !important;
        }

        .add-question {
            position: fixed;
            bottom: 30px;
            right: 30px;
            font-size: 40px;
        }

        mat-spinner {
            position: absolute;
            bottom: 45%;
            left: 35%;
        }
    `],
    providers: [QuestionService]
})

export class QuestionListComponent implements OnInit {

    constructor(private questionService: QuestionService) {}
    
    questions: Question[];
    loading = true;

    // ngOnInit() {
    //     this.questionService
    //         .getQuestions()
    //         .then((questions: Question[])=> {
    //             this.questions = questions;
    //         });
    // }


    ngOnInit() {
        this.questionService
            .getQuestions()
            .subscribe(res => {
                this.questions = res;
                this.loading = false;
            });
    }
}