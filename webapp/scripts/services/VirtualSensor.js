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

       		var sensor = {size:{y: 1}};
       		sensor.name = currentSensor.attr("name");
          sensor.description = currentSensor.attr("description");

       		sensor.fields = {};
          sensor.visible = true;

            currentSensor.children().each( function (){ // iterate over virtual-sensor fields
            	var currentField = $(this);

            	var field = {};
              
              if(typeof currentField.attr("command") === "undefined"){
            	   field["type"] = currentField.attr("type");
            	   field["description"] = currentField.attr("description");
            	   field["category"] = currentField.attr("category");
            	   field["value"] = currentField.text();
                 field["command"] = currentField.attr("command");

                 if(field["type"] === "binary:image/jpeg" || field["type"] === "binary:image/png" || field["type"] === "binary:image/svg+xml"){
                  sensor.size.y = 3;
                  sensor.size.x = 3;
                  }

            	   sensor.fields[currentField.attr("name")] = field;
              }
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


