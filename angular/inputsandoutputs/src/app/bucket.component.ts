import {Component} from '@angular/core';

@Component({
	selector:"bucket",
	templateUrl:"./bucket.component.html"
})
export class Bucket {
	message:string = "";
	
	transmitMessage(message) {
		this.message = "The apple has color "+message;
	}
}