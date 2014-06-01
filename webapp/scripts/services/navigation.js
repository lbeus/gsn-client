'use strict';

angular.module('gsnClientApp')
  .service('NavigationService', function () {
		

  		this.pages = [{pageName:"Home", url:"home", active:true},
					  {pageName:"Data", url:"data", active:false},
					  {pageName:"Map", url:"map", active:false},
					  {pageName:"Passive heating", url:"passiveHeating", active:false},
					  {pageName:"Relay managment", url:"relay", active:false},
					  {pageName:"IP Camera", url:"ipcamera", active:false}];

		this.pagesMapping = {
			"/" : 0 ,
			"/home" : 0,
			"/data" : 1,
			"/map" : 2,
			"/passiveHeating" : 3,
			"/relay" : 4,
			"/ipcamera" : 5
		};

		this.pageChanged = function(page){

			if(this.pagesMapping[page] !== undefined ) {

				this.pages.forEach( function (entry) {
					entry.active = false;
				});

				this.pages[this.pagesMapping[page]].active = true;
			}
		};
  });

