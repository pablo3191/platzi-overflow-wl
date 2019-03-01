import { Component, OnInit, Input } from '@angular/core';
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
    
    @Input() sort = '-createdAt';

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
            .getQuestions(this.sort)
            .subscribe(res => {
                this.questions = res;
                this.loading = false;
            });
    }
}