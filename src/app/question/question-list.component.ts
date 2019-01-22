import { Component } from '@angular/core';
import { Question } from './question.model';

const q = new Question(
    '¿Como empezar con AWS?',
    'Pregunta',
    new Date(),
    'devicon-vim-plain');

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
    `]
})

export class QuestionListComponent {
    questions: Question[] = new Array(10).fill(q)

}