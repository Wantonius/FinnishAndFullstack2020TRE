import {Component,Input,Output,EventEmitter} from '@angular/core';

@Component({
	selector:"apple",
	templateUrl:"./apple.component.html"
})
export class Apple {
	@Input() color:string;
	@Output() colorEvent = new EventEmitter();
	
	appleEmits(){
		this.colorEvent.emit(this.color);
	} 
}