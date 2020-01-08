exports.fillSand = function () {
  //Instantiations;
  var projectile;
  var location;
  var x;
  var y;
  var z;
  var cmd;
  var inhand;
  var name;
  var player;
  var block;
  events.projectileHit( function (event) {
    projectile=event.getEntity();
    location=projectile.location;0
    if ((projectile.getType()) == (org.bukkit.entity.EntityType.SNOWBALL)){
      block = server.worlds[0].getBlockAt (location);	  
      x=parseInt(location.x);
      y=parseInt(location.y);
      z=parseInt(location.z)-1;
	  
	  blockType=block.getType();
	  console.log ( 'snowball collided with block: [' + blockType + ']' )
      if (blockType != org.bukkit.Material.AIR){
		 y = y +1;
	  } else {
		 block = server.worlds[0].getBlockAt (location.add (0,-1,0)); // block below
		 blockType = block.getType();
		 if (blockType == org.bukkit.Material.AIR) {
			 y = y - 1;
		 }
			 
	  }

	  /*
	  console.log ( 'exports.player.name: ' + exports.player.name );
      inhand=exports.player.getItemInHand();
      name=(inhand.getItemMeta() == null) ? null : inhand.getItemMeta().getDisplayName();
	  console.log ( 'inhand: [' + name + ']')
      if (name== "Sand"){
		y = y + 1;
	  }
	  */
      cmd="fill " + x + " " + y + " " + z  + " " + (x-10) + " " + y + " " + z + " sand keep";
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), cmd);
    }
  });
};
