'use strict';

angular.module('gsnClientApp')
  .service('SettingsService', function () {

  		this.intervalOptions = [
	  		{name:"1hour" , value: 3600000},
	  		{name:"10min", value: 600000},
	  		{name:"1min", value: 60000},
	  		{name:"5sec", value: 5000},
	  		{name:"1sec", value: 1000},
	  		{name:"disable", value: -1},
  		];


  		this.numberOfValuesToFetchOptions = [
  			{name: "All data", value: "ALL"},
  			{name: "Only", value:  "SPECIFIED" }
  		];

  		this.aggregationOptions = [
  			{name: "No aggregation", value: -1},
  			{name: "AVG", value: "avg"},
  			{name: "MAX", value: "max"},
  			{name: "MIN", value: "min"}
  		];

  		this.aggregationUnitOptions = [
  			{name: "Hours", value: 3600000},
  			{name: "Minutes", value: 60000},
  			{name: "Seconds", value: 1000},
  			{name: "Milli Seconds", value: 1}
  		];

  		this.timeFormatOptions = [
  				{name:"ISO 8601", value:"iso"},
  				{name:"UNIX", value:"unix"}
  		];

		this.refreshInterval = 	this.intervalOptions[2] ; // default value
		this.numberOfValuesToFetch = this.numberOfValuesToFetchOptions[0];
		this.aggregation = this.aggregationOptions[0];

		this.aggregationUnit = this.aggregationUnitOptions[0];

		this.timeFormat = this.timeFormatOptions[0];

		this.setTimeFormat = function(newTimeFormat) {
				this.timeFormat = newTimeFormat;
		};

		this.setRefreshInterval = function(newRefreshInterval) {
				this.refreshInterval = newRefreshInterval;
		};


		this.setNumberOfValuesOfFetch = function(newNumberOfValuesToFetch) {
			this.numberOfValuesToFetch = newNumberOfValuesToFetch;
		};

		this.setAggregation = function(newAggregation) {
			this.aggregation = newAggregation;
		};

		this.setAggregationUnit = function(newAggregationUnit) {
			this.aggregationUnit = newAggregationUnit;
		};
  });
