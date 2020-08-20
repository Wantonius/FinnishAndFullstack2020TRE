import {Component,OnInit} from '@angular/core';
import {ShoppingItem} from '../models/shoppingitem.model';
import {ShoppingService} from '../services/shoppingservice.service';

@Component({
	selector:"shopping-list",
	templateUrl:"./shoppinglist.component.html"
})
export class ShoppingList {
	shoppinglist:ShoppingItem[] = [];
	
	constructor(private _shoppingservice:ShoppingService) {}
	
	ngOnInit() {
		this.getList();
	}
	
	getList() {
		this.shoppinglist = this._shoppingservice.getList();
	}
	
	
	removeFromList(idx) {
		this._shoppingservice.removeFromList(this.shoppinglist[idx].id);
	}

}