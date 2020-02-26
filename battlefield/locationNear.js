exports.locationNear  = function ( location, locations, radius) {
  //Instantiations;
  var near;
  var distance;
  near=false;
  console.log ( 'locations.length: ' + locations.length );
  for (var i=0; i<locations.length;i++) {
    distance=location.distance(locations[i]);
    if (((distance) <= (radius))){
      near=true;
      break;
    } else { 
      console.log ( 'distance: ' + distance + ' > ' + radius );
    }
  };
  return near;
};
