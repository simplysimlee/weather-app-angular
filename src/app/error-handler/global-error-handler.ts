import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
   
    /**
     * handleError implements ErrorHandler, which is a built-in Angular interface that allows us to handle errors in our application.
     * @param error 
     */
    handleError(error:unknown) {
        //to be replaced with a toast message
        alert('An error occurred:');
        console.log('An error occurred:', error);
    }
}