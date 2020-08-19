import {Component} from '@angular/core';

@Component({
	selector:"contact-list",
	templateUrl:"./contactlist.component.html"
})
export class ContactList {
	contactList = [
	{
		"firstname": "Eleanor",
		"lastname": "Davidson"
	},
	{
		"firstname": "Brady",
		"lastname": "Dudley"
	},
	{
		"firstname": "Shafira",
		"lastname": "Donaldson"
	},
	{
		"firstname": "Imelda",
		"lastname": "Blackburn"
	},
	{
		"firstname": "Maxine",
		"lastname": "Bentley"
	},
	{
		"firstname": "Wade",
		"lastname": "Lewis"
	},
	{
		"firstname": "Arden",
		"lastname": "Waters"
	},
	{
		"firstname": "Kane",
		"lastname": "Skinner"
	},
	{
		"firstname": "Olympia",
		"lastname": "Brewer"
	},
	{
		"firstname": "Hakeem",
		"lastname": "Hardin"
	},
	{
		"firstname": "Isabelle",
		"lastname": "Rosario"
	},
	{
		"firstname": "Patrick",
		"lastname": "Fry"
	},
	{
		"firstname": "Jackson",
		"lastname": "Huffman"
	},
	{
		"firstname": "Jacqueline",
		"lastname": "Blair"
	},
	{
		"firstname": "Lawrence",
		"lastname": "Lowery"
	},
	{
		"firstname": "Buffy",
		"lastname": "Harrington"
	},
	{
		"firstname": "Raja",
		"lastname": "Lloyd"
	},
	{
		"firstname": "Evangeline",
		"lastname": "Raymond"
	},
	{
		"firstname": "Joseph",
		"lastname": "Rhodes"
	},
	{
		"firstname": "Chaney",
		"lastname": "Reyes"
	},
	{
		"firstname": "Macey",
		"lastname": "Ashley"
	},
	{
		"firstname": "Rinah",
		"lastname": "George"
	},
	{
		"firstname": "Joy",
		"lastname": "Chambers"
	},
	{
		"firstname": "Brianna",
		"lastname": "Ruiz"
	},
	{
		"firstname": "Stacy",
		"lastname": "Bartlett"
	},
	{
		"firstname": "Yasir",
		"lastname": "Mcdonald"
	},
	{
		"firstname": "Victoria",
		"lastname": "Sharp"
	},
	{
		"firstname": "Ava",
		"lastname": "Ryan"
	},
	{
		"firstname": "Sopoline",
		"lastname": "Knowles"
	},
	{
		"firstname": "Vernon",
		"lastname": "Holcomb"
	},
	{
		"firstname": "Eugenia",
		"lastname": "Lowery"
	},
	{
		"firstname": "Jerry",
		"lastname": "Shields"
	},
	{
		"firstname": "Marshall",
		"lastname": "Finch"
	},
	{
		"firstname": "Cynthia",
		"lastname": "Richards"
	},
	{
		"firstname": "Lillith",
		"lastname": "Vazquez"
	},
	{
		"firstname": "Steven",
		"lastname": "Pugh"
	},
	{
		"firstname": "Vanna",
		"lastname": "Dotson"
	},
	{
		"firstname": "Sara",
		"lastname": "Quinn"
	},
	{
		"firstname": "Catherine",
		"lastname": "Rutledge"
	},
	{
		"firstname": "Jolene",
		"lastname": "Bean"
	},
	{
		"firstname": "Dorian",
		"lastname": "Morrow"
	},
	{
		"firstname": "Gregory",
		"lastname": "Mann"
	},
	{
		"firstname": "Justine",
		"lastname": "Keith"
	},
	{
		"firstname": "Fulton",
		"lastname": "Howell"
	},
	{
		"firstname": "Tanek",
		"lastname": "Kim"
	},
	{
		"firstname": "Xanthus",
		"lastname": "Baxter"
	},
	{
		"firstname": "Shaine",
		"lastname": "Blackburn"
	},
	{
		"firstname": "Erin",
		"lastname": "Peck"
	},
	{
		"firstname": "Kay",
		"lastname": "Gillespie"
	},
	{
		"firstname": "Rose",
		"lastname": "Sawyer"
	},
	{
		"firstname": "Skyler",
		"lastname": "Gay"
	},
	{
		"firstname": "Ferris",
		"lastname": "Martin"
	},
	{
		"firstname": "Alyssa",
		"lastname": "Mays"
	},
	{
		"firstname": "Giselle",
		"lastname": "Lindsay"
	},
	{
		"firstname": "Astra",
		"lastname": "Poole"
	},
	{
		"firstname": "Lucius",
		"lastname": "Harrison"
	},
	{
		"firstname": "Marshall",
		"lastname": "Garrett"
	},
	{
		"firstname": "Jelani",
		"lastname": "Pierce"
	},
	{
		"firstname": "Dillon",
		"lastname": "York"
	},
	{
		"firstname": "Ferris",
		"lastname": "Fox"
	},
	{
		"firstname": "Simon",
		"lastname": "Oneal"
	},
	{
		"firstname": "Bianca",
		"lastname": "Huber"
	},
	{
		"firstname": "Marvin",
		"lastname": "Stein"
	},
	{
		"firstname": "Camille",
		"lastname": "Kane"
	},
	{
		"firstname": "Shay",
		"lastname": "Gardner"
	},
	{
		"firstname": "Jaden",
		"lastname": "Ayala"
	},
	{
		"firstname": "Blaine",
		"lastname": "Hobbs"
	},
	{
		"firstname": "Brady",
		"lastname": "Perez"
	},
	{
		"firstname": "Laura",
		"lastname": "Pollard"
	},
	{
		"firstname": "Juliet",
		"lastname": "Gilmore"
	},
	{
		"firstname": "Wendy",
		"lastname": "Brennan"
	},
	{
		"firstname": "Murphy",
		"lastname": "Griffin"
	},
	{
		"firstname": "Xantha",
		"lastname": "Petty"
	},
	{
		"firstname": "Athena",
		"lastname": "Hurley"
	},
	{
		"firstname": "Jorden",
		"lastname": "Shepherd"
	},
	{
		"firstname": "Zane",
		"lastname": "Burton"
	},
	{
		"firstname": "Echo",
		"lastname": "Tate"
	},
	{
		"firstname": "Alvin",
		"lastname": "Garrett"
	},
	{
		"firstname": "Ivy",
		"lastname": "Clark"
	},
	{
		"firstname": "Nissim",
		"lastname": "Workman"
	},
	{
		"firstname": "Ivory",
		"lastname": "Cantrell"
	},
	{
		"firstname": "Karen",
		"lastname": "Deleon"
	},
	{
		"firstname": "Ariel",
		"lastname": "Marks"
	},
	{
		"firstname": "Jasmine",
		"lastname": "Russo"
	},
	{
		"firstname": "Whilemina",
		"lastname": "Brock"
	},
	{
		"firstname": "Avram",
		"lastname": "Anderson"
	},
	{
		"firstname": "Lionel",
		"lastname": "Cain"
	},
	{
		"firstname": "Aaron",
		"lastname": "Ryan"
	},
	{
		"firstname": "Nichole",
		"lastname": "Moody"
	},
	{
		"firstname": "Len",
		"lastname": "Stark"
	},
	{
		"firstname": "Caleb",
		"lastname": "Gates"
	},
	{
		"firstname": "Bryar",
		"lastname": "Michael"
	},
	{
		"firstname": "Chiquita",
		"lastname": "Welch"
	},
	{
		"firstname": "Daquan",
		"lastname": "Frederick"
	},
	{
		"firstname": "Quinn",
		"lastname": "Valenzuela"
	},
	{
		"firstname": "Maisie",
		"lastname": "Schwartz"
	},
	{
		"firstname": "Alma",
		"lastname": "Witt"
	},
	{
		"firstname": "Erich",
		"lastname": "Dodson"
	},
	{
		"firstname": "Dalton",
		"lastname": "Mcmahon"
	},
	{
		"firstname": "Brittany",
		"lastname": "Obrien"
	}
]
}