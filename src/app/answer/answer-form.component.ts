import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-answer-form',
    templateUrl: './answer-form.component.html'
})

export class AnswerFormComponent {
    onSubmit(form: NgForm) { //metodo con el nombre que comunemtante se utiliza para mandar datos.
        console.log(form.value.description);

    }
}