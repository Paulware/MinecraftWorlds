exports.starPusher = function () {
  //Instantiations;
  var clearLocations;
  var block;
  var blockFace;
  var pistonLocation;
  var location;
  var data;
  var loc;
  var sign;
  var _data;
  var _block;
  var redstoneLocation;
  clearLocations=[];
  events.playerInteract( function (event) { 
    block=(event.getClickedBlock== null) ? null : event.getClickedBlock();
    blockFace=(event.getBlockFace== null) ? null : event.getBlockFace();
    console.log ("blockFace: " + blockFace);
    if (((blockFace) == ( org.bukkit.block.BlockFace.EAST)) || ((blockFace) == (org.bukkit.block.BlockFace.WEST)) || ((blockFace) == (org.bukkit.block.BlockFace.NORTH)) || ((blockFace) == (org.bukkit.block.BlockFace.SOUTH))){
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
      clearLocations.push (pistonLocation)
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
      clearLocations.push (redstoneLocation)
      server.worlds[0].getBlockAt (redstoneLocation).setType (org.bukkit.Material.REDSTONE_BLOCK);
      setTimeout (function () {
        console.log ("Number of locations to clear: " + clearLocations.length);
        for (var i = 0; i<clearLocations.length; i++) {
        server.worlds[0].getBlockAt (clearLocations[i]).setType (org.bukkit.Material.AIR);
        }
        clearLocations = []
      },500);
    }
  });
};
