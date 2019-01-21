import { Component } from '@angular/core';
import { Question } from './question.model';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.css']
})

export class QuestionDetailComponent {
    question: Question = new Question(
        'Nueva pregunta',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lacinia mi vitae nisi rutrum lobortis. Nam commodo dui eget tellus auctor, in hendrerit ante feugiat. Nullam luctus porta ipsum, in bibendum dui facilisis non. Nulla vestibulum lacinia ultrices. Nunc ac ultricies nibh. Pellentesque maximus lorem eget bibendum volutpat. Maecenas ullamcorper lacus diam, id sollicitudin nibh sagittis vel. Nulla mattis dui sit amet erat auctor ullamcorper.',
        new Date(),
        'devicon-android-plain'
    );
}