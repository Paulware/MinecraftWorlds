exports.starPusher = function () {
  //Instantiations;
  var clearLocations;
  var blockType;
  var location;
  var block;
  var data;
  var loc;
  var sign;
  var blockFace;
  var directions;
  var pistonLocation;
  var redstoneLocation;
  var _data;
  var _block;
  var diamondLocation;
  clearLocations=[];
  var myTask= setInterval (function () {
    if (((clearLocations.length) > 0)){
      blockType=(server.worlds[0].getBlockAt (clearLocations[0])==null)?null:server.worlds[0].getBlockAt (clearLocations[0]).getType();
      if (((blockType) != (org.bukkit.Material.DIAMOND_BLOCK))){
        server.worlds[0].getBlockAt (clearLocations[0]).setType (org.bukkit.Material.AIR);
        clearLocations.splice (0,1)
      }
    }
    if (!(true)) {
      clearInterval (myTask);
    }
  }, 500);
  events.playerInteract( function (event) {
    block=(event.getClickedBlock== null) ? null : event.getClickedBlock();
    blockType=(block==null)?null:block.getType();
    if (((blockType) == (org.bukkit.Material.DIAMOND_BLOCK))){
      blockFace=(event.getBlockFace== null) ? null : event.getBlockFace();
      console.log ("blockFace: " + blockFace);
      directions=[org.bukkit.block.BlockFace.EAST, org.bukkit.block.BlockFace.WEST, org.bukkit.block.BlockFace.NORTH, org.bukkit.block.BlockFace.SOUTH];
      if ((directions.indexOf ( blockFace) >= 0)){
        pistonLocation=(function() {
          var _location = new org.bukkit.Location(server.worlds[0], block.location.x, block.location.y, block.location.z);
          if ((blockFace) == org.bukkit.block.BlockFace.NORTH ) {
             _location.add (0,0,-1);
          }else if ((blockFace) == org.bukkit.block.BlockFace.SOUTH ) {
             _location.add (0,0,1);
          }else if ((blockFace) == org.bukkit.block.BlockFace.EAST ) {
             _location.add (1,0,0);
          }else if ((blockFace) == org.bukkit.block.BlockFace.WEST ) {
             _location.add (-1,0,0);
          }
          return _location;
         })();
        redstoneLocation=(function() {
          var _location = new org.bukkit.Location(server.worlds[0], pistonLocation.x, pistonLocation.y, pistonLocation.z);
          if ((blockFace) == org.bukkit.block.BlockFace.NORTH ) {
             _location.add (0,0,-1);
          }else if ((blockFace) == org.bukkit.block.BlockFace.SOUTH ) {
             _location.add (0,0,1);
          }else if ((blockFace) == org.bukkit.block.BlockFace.EAST ) {
             _location.add (1,0,0);
          }else if ((blockFace) == org.bukkit.block.BlockFace.WEST ) {
             _location.add (-1,0,0);
          }
          return _location;
         })();
        blockType=(server.worlds[0].getBlockAt (redstoneLocation)==null)?null:server.worlds[0].getBlockAt (redstoneLocation).getType();
        if (((blockType) == (org.bukkit.Material.AIR))){
          console.log ("blockType at redstoneLocation: " + blockType);
          clearLocations.push (pistonLocation)
          clearLocations.push (redstoneLocation)
          server.worlds[0].getBlockAt (pistonLocation).setType (org.bukkit.Material.PISTON);
          _block = server.worlds[0].getBlockAt (pistonLocation)
          _data = _block.getBlockData();
          _data.setFacing((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
          (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
          (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
          (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
          (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
          (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null)
          _block.setBlockData(_data)
          server.worlds[0].getBlockAt (redstoneLocation).setType (org.bukkit.Material.REDSTONE_BLOCK);
        }
        else {
          diamondLocation=(function() {
            var _location = new org.bukkit.Location(server.worlds[0], block.location.x, block.location.y, block.location.z);
            if (((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
          (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
          (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
          (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
          (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
          (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null) == org.bukkit.block.BlockFace.NORTH ) {
               _location.add (0,0,-1);
            }else if (((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
          (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
          (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
          (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
          (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
          (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null) == org.bukkit.block.BlockFace.SOUTH ) {
               _location.add (0,0,1);
            }else if (((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
          (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
          (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
          (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
          (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
          (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null) == org.bukkit.block.BlockFace.EAST ) {
               _location.add (1,0,0);
            }else if (((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
          (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
          (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
          (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
          (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
          (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null) == org.bukkit.block.BlockFace.WEST ) {
               _location.add (-1,0,0);
            }
            return _location;
           })();
          server.worlds[0].getBlockAt (diamondLocation).setType (org.bukkit.Material.DIAMOND_BLOCK);
          server.worlds[0].getBlockAt (block.location).setType (org.bukkit.Material.AIR);
        }
      }
    }
  });
};
