exports.blockInRadius  = function (location,radius,blockType) {
  //Instantiations;
  var found;
  var bType;
  found=false;
  for (var x=0; x<parseInt(radius*2); x++) {
    for (var y=0; y<parseInt(radius*2); y++) {
      for (var z=0; z<parseInt(radius*2); z++) {
        loc=(function() { var _x = location.x + x-radius;var _y = location.y + y-radius;var _z = location.z + z-radius;var loc = new org.bukkit.Location(server.worlds[0],_x,_y,_z);return loc; })();
        block=server.worlds[0].getBlockAt (loc);
        bType=(block==null)?null:block.getType();
        if (((bType) == (blockType))){
          found=true;
          break;
        }
      }
      if (found){
        break;
      }
    }
    if (found){
      break;
    }
  }
  return found;
};
