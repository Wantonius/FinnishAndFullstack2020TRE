import {Component} from '@angular/core';
import {ShoppingService} from '../services/shoppingservice.service';
import {ShoppingItem} from '../models/shoppingitem.model';
@Component({
	selector:"shopping-form",
	templateUrl:"./shoppingform.component.html"
})
export class ShoppingForm {
	item:ShoppingItem = new ShoppingItem("",0,0,0);
	
	constructor(private _shoppingservice:ShoppingService) {}
	
	addToList() {
		this._shoppingservice.addToList(this.item);
		this.item = new ShoppingItem("",0,0,0);
	}
}