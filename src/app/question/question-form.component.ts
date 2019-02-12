import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from './question.model';
import { User } from '../auth/user.model';

import icons from './icons';

@Component({
    selector: 'app-question-form',
    templateUrl: './question-form.component.html',
    styles: [`
        i {
            font-size: 48px;
        }

        small {
            display: block;
        }
    `]
})

export class QuestionFormComponent {
    icons: Object[] = icons;

    getIconVersion(icon: any) {
        let version = '';

        if (icon.versions.font.includes('plain-wordmark')) {
            version = 'plain-wordmark';
        } else {
            version = icon.versions.font[0];
        }

        return version;
    }

    onSubmit(form: NgForm) {
        const u = new User('test@test.com','1234','test', 'test');
        const q = new Question(
            form.value.title,
            form.value.description,
            u,
            new Date(),
            form.value.icon
        );

        console.log(q);
    }
}