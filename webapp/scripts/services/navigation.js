'use strict';

angular.module('gsnClientApp')
  .service('NavigationService', function () {
		

  		this.pages = [{pageName:"Home", url:"/home", active:true},
					  {pageName:"Data", url:"/data", active:false},
					  {pageName:"Map", url:"/map", active:false}
					  //{pageName:"Passive heating", url:"/passiveHeating", active:false},
					  //{pageName:"Relay managment", url:"/relay", active:false},
					  //{pageName:"Admin pages", url:"/adminMain", active:false}];
					  ];
		/*this.pagesMapping = {
			"/" : 0 ,
			"/home" : 0,
			"/data" : 1,
			"/map" : 2,
			"/passiveHeating" : 3,
			"/relay" : 4,
			"/adminMain" : 5};*/

		this.addPage = function(page){
			this.pages.push(page);
		};

		this.pageChanged = function(page){
			//console.log("pozvan");
			//console.log(this.pages);

			var result = $.grep(this.pages, function(p){ return p.url == page; });

			if(result.length == 1 ) {
				//console.log("usao");

				this.pages.forEach( function (entry) {
					entry.active = false;
				});

				result[0].active = true;
			}
		};
  });

