import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-signup-screen',
    templateUrl: './signup-screen.component.html'
})

export class SignupScreenComponent implements OnInit {

    signupForm: FormGroup;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.signupForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            ]),
            password: new FormControl(null, Validators.required),
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        
        if (this.signupForm.valid) {
          const { email, password, firstName, lastName } = this.signupForm.value;
          
            const user = new User(email, password, firstName, lastName);
            this.authService.signUp(user).subscribe(this.authService.login, catchError(this.handleError));
            console.log(user);
          
          
        }
    }

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