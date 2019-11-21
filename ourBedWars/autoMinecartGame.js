exports.getTurnedRail  = function (turnDirection,direction) {
  //Instantiations;
  var slope;
  console.log ("Compute slope [turnDirection,direction] :[" + turnDirection + "," + direction + "]");
  if ((turnDirection) == (direction)){
    if ((turnDirection) == (org.bukkit.block.BlockFace.EAST)){
      slope=org.bukkit.block.data.Rail.Shape.EAST_WEST;
    }
    else if ((turnDirection) == (org.bukkit.block.BlockFace.WEST)){
      slope=org.bukkit.block.data.Rail.Shape.EAST_WEST;
    }
    else {
      slope=org.bukkit.block.data.Rail.Shape.NORTH_SOUTH;
    }
  }
  else {
    if ((direction) == (org.bukkit.block.BlockFace.NORTH)){
      if ((turnDirection) == (org.bukkit.block.BlockFace.EAST)){
        slope=org.bukkit.block.data.Rail.Shape.SOUTH_EAST;
      }
      else if ((turnDirection) == (org.bukkit.block.BlockFace.WEST)){
        slope=org.bukkit.block.data.Rail.Shape.SOUTH_WEST;
      }
      else {
        slope=org.bukkit.block.data.Rail.Shape.NORTH_SOUTH;
      }
    }
    else if ((direction) == (org.bukkit.block.BlockFace.SOUTH)){
      if ((turnDirection) == (org.bukkit.block.BlockFace.EAST)){
        slope=org.bukkit.block.data.Rail.Shape.NORTH_EAST;
      }
      else if ((turnDirection) == (org.bukkit.block.BlockFace.WEST)){
        slope=org.bukkit.block.data.Rail.Shape.NORTH_WEST;
      }
      else {
        slope=org.bukkit.block.data.Rail.Shape.NORTH_SOUTH;
      }
    }
    else if ((direction) == (org.bukkit.block.BlockFace.EAST)){
      if ((turnDirection) == (org.bukkit.block.BlockFace.SOUTH)){
        slope=org.bukkit.block.data.Rail.Shape.SOUTH_WEST;
      }
      else if ((turnDirection) == (org.bukkit.block.BlockFace.NORTH)){
        slope=org.bukkit.block.data.Rail.Shape.NORTH_WEST;
      }
      else {
        slope=org.bukkit.block.data.Rail.Shape.EAST_WEST;
      }
    }
    else if ((direction) == (org.bukkit.block.BlockFace.WEST)){
      if ((turnDirection) == (org.bukkit.block.BlockFace.SOUTH)){
        slope=org.bukkit.block.data.Rail.Shape.SOUTH_EAST;
      }
      else if ((turnDirection) == (org.bukkit.block.BlockFace.NORTH)){
        slope=org.bukkit.block.data.Rail.Shape.NORTH_EAST;
      }
      else {
        slope=org.bukkit.block.data.Rail.Shape.EAST_WEST;
      }
    }
  }
  console.log ("Got a slope of " + slope);
  return slope;
};

exports.addDirection  = function (direction,location) {
  l=location;
  if ((direction) == (org.bukkit.block.BlockFace.EAST)){
    l=new org.bukkit.Location(server.worlds[0], parseInt(location.x) + 1, parseInt(location.y), parseInt(location.z));
    console.log ("Adding 1 x");
  }
  else if ((direction) == (org.bukkit.block.BlockFace.WEST)){
    l=new org.bukkit.Location(server.worlds[0], parseInt(location.x) - 1, parseInt(location.y), parseInt(location.z));
    console.log ("Subtracting 1 x");
  }
  else if ((direction) == (org.bukkit.block.BlockFace.SOUTH)){
    l=new org.bukkit.Location(server.worlds[0], parseInt(location.x) , parseInt(location.y), parseInt(location.z)+1);
    console.log ("Adding 1 z");
  }
  else if ((direction) == (org.bukkit.block.BlockFace.NORTH)){
    l=new org.bukkit.Location(server.worlds[0], parseInt(location.x) , parseInt(location.y), parseInt(location.z)-1);
    console.log ("Subtracting 1 z");
  }
  return l;
};

exports.addRail = function (location,slope) {
  //Instantiations;
  var block;
  var data;
  var sign;
  console.log ("addRail at :" + location);
  loc=location.add(0,-1,0);
  server.worlds[0].getBlockAt (loc).setType (org.bukkit.Material.COBBLESTONE);
  loc=location.add(0,1,0);
  server.worlds[0].getBlockAt (loc).setType (org.bukkit.Material.RAIL);
  loc=location.add(0,1,0);
  server.worlds[0].getBlockAt (loc).setType (org.bukkit.Material.AIR);
  loc=location.add(0,-1,0);
  block=server.worlds[0].getBlockAt(loc);
  data=block.getBlockData();
  data.setShape(slope)
  block.setBlockData(data)
};

exports.autoMinecartGame = function () {
  //Instantiations;
  var minecart;
  var directions = [org.bukkit.block.BlockFace.SOUTH,org.bukkit.block.BlockFace.SOUTH_SOUTH_WEST,org.bukkit.block.BlockFace.SOUTH_WEST,org.bukkit.block.BlockFace.WEST_SOUTH_WEST,org.bukkit.block.BlockFace.WEST,org.bukkit.block.BlockFace.WEST_NORTH_WEST,org.bukkit.block.BlockFace.NORTH_WEST,org.bukkit.block.BlockFace.NORTH_NORTH_WEST,org.bukkit.block.BlockFace.NORTH,org.bukkit.block.BlockFace.NORTH_NORTH_EAST,org.bukkit.block.BlockFace.NORTH_EAST,org.bukkit.block.BlockFace.EAST_NORTH_EAST,org.bukkit.block.BlockFace.EAST,org.bukkit.block.BlockFace.EAST_SOUTH_EAST,org.bukkit.block.BlockFace.SOUTH_EAST,org.bukkit.block.BlockFace.SOUTH_SOUTH_EAST];
  var looking;
  var location;
  var vehicle;
  var occupant;
  var direction;
  var turnDirection;
  var slope;
  var vector;
  if (self.getMetadata("turndirection").length > 0){
    self.removeMetadata ("turndirection", __plugin );
  }
  events.vehicleMove( function (event) {
    vehicle=event.vehicle;
    if (! (event.vehicle.isEmpty())){
      location=vehicle.location;
      if ((vehicle.toString()) == ("CraftMinecartRideable")){
        occupant=vehicle.getPassenger();
        direction=event.vehicle.getFacing();
        turnDirection=direction;
        console.log ("Move vehicle in facing direction " + direction);
        if (occupant.getMetadata("turndirection").length > 0){
          turnDirection=occupant.getMetadata("turndirection")[0].value();
        }
        slope=getTurnedRail (turnDirection,direction);
        console.log ("Got a turn direction of " + looking + " yo " );
        addRail (location,slope);
      }
      vector=event.vehicle.getVelocity();
      event.vehicle.setVelocity(vector.multiply (1.5));
    }
  });
  events.vehicleExit( function (event) {
    console.log ("minecart exit yo");
    event.vehicle.setVelocity(new org.bukkit.util.Vector(0.0,0.0,0.0));
    if (event.exited.getMetadata("minecart").length > 0){
      event.exited.removeMetadata ("minecart", __plugin );
    }
  });
  events.vehicleEnter( function (event) {
    console.log ("minecart entered yo");
    direction=event.vehicle.getFacing();
    console.log ("Minecart is facing: " + direction);
    fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,event.vehicle);
    event.entered.setMetadata ("minecart", fd );
    console.log ("Player " + event.entered.name + " just entered a minecart yo");
  });
};
