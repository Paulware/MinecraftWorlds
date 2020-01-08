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
  exports.player = self;
  events.projectileHit( function (event) {
    projectile=event.getEntity();
    location=projectile.location;0
    if ((projectile.getType()) == (org.bukkit.entity.EntityType.SNOWBALL)){
      x=parseInt(location.x);
      y=parseInt(location.y) -1;
      inhand=exports.player.getItemInHand();
      name=(inhand.getItemMeta() == null) ? null : inhand.getItemMeta().getDisplayName();
	  console.log ( 'inhand: [' + name + ']')
      if (name== "Sand"){
		y = y + 1;
	  }
	  
      z=parseInt(location.z) -1;
      cmd="fill " + (x+10) + " " + y + " " + z  + " " + (x-10) + " " + y + " " + z + " sand keep";
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), cmd);
    }
  });
};
