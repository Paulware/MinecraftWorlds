exports.blockInRadius  = function (location,radius,blockType) {
  var _found;
  var _block;
  var _loc;
  
  found=false;
  for (var x=0; x<parseInt(radius*2); x++) {
    for (var y=0; y<parseInt(radius*2); y++) {
      for (var z=0; z<parseInt(radius*2); z++) {
        _loc=(function() { var _x = location.x + x-radius;var _y = location.y + y-radius;var _z = location.z + z-radius;var loc = new org.bukkit.Location(server.worlds[0],_x,_y,_z);return loc; })();
        _block=server.worlds[0].getBlockAt (loc);
        if ((((_block==null)?null:_block.getType()) == (blockType))){
          _found=true;
          break;
        }
      }
      if (_found){
        break;
      }
    }
    if (_found){
      break;
    }
  }
  return _found;
};
