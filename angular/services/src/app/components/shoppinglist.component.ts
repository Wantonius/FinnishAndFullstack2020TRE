import {Component,OnInit} from '@angular/core';
import {ShoppingItem} from '../models/shoppingitem.model';
import {ShoppingService} from '../services/shoppingservice.service';

@Component({
	selector:"shopping-list",
	templateUrl:"./shoppinglist.component.html"
})
export class ShoppingList {
	item:ShoppingItem = new ShoppingItem("",0,0,0);
	shoppinglist:ShoppingItem[] = [];
	
	constructor(private _shoppingservice:ShoppingService) {}
	
	ngOnInit() {
		this.getList();
	}
	
	getList() {
		this.shoppinglist = this._shoppingservice.getList();
	}
	
	addToList() {
		this._shoppingservice.addToList(this.item);
		this.item = new ShoppingItem("",0,0,0);
		this.getList();
	}
	
	removeFromList(idx) {
		this._shoppingservice.removeFromList(this.shoppinglist[idx].id);
	}

}