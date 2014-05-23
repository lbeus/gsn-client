'use strict';

angular.module('gsnClientApp')
  .service('VirtualSensorService', function ($http) {

	this.get = function(callback){
        $http.get('/gsn').success(function(data) {
          callback(parseVSensorXML(data));
        });
    };
  });



function parseVSensorXML (xml) {

  	var nodes = $(xml);

  	var sensors = [];

    var GSNinstance = {};

    GSNinstance.info = {
      name : $(nodes).filter(":first").attr("name"),
      author : $(nodes).filter(":first").attr("author"),
      email : $(nodes).filter(":first").attr("email"),
      description : $(nodes).filter(":first").attr("description")
    };
         
    
  	$(nodes).find('virtual-sensor').each( // iterate over virtual-sensors
       function (){
       		var currentSensor = $(this);

       		var sensor = {};
       		sensor.name = currentSensor.attr("name");
          sensor.description = currentSensor.attr("description");

       		sensor.fields = {};
          sensor.visible = true;

            currentSensor.children().each( function (){ // iterate over virtual-sensor fields
            	var currentField = $(this);

            	var field = {};
            	field["type"] = currentField.attr("type");
            	field["description"] = currentField.attr("description");
            	field["category"] = currentField.attr("category");
            	field["value"] = currentField.text();

            	sensor.fields[currentField.attr("name")] = field;
            });

            var keys = Object.keys(sensor.fields);

            sensor.fieldKeys = keys;

            sensor.structureFields = [];
            keys.forEach(function (entry) {
                if (entry !== 'geographical' && entry !== 'latitude' && entry !== 'longitude' )
                  sensor.structureFields.push(entry);
            });

            sensors.push(sensor);
       }
    );

    GSNinstance.sensors = sensors;
  	
	return GSNinstance;
}


