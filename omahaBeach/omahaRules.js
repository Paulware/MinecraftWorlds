exports.omahaRules = function () {
  //Instantiations;
  var shooter;
  var projectile;
  var bow;
  var bowName;
  var stack;
  var name;
  var player;
  var inhand;
  var i;
  events.entityShootBow( function (event) {
    shooter=event.getEntity();
    projectile=event.getProjectile();
    bow=event.getBow();
    bowName=(bow.getItemMeta() == null) ? null : bow.getItemMeta().getDisplayName();
    fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,bowName);
    projectile.setMetadata ("name", fd );
    console.log ("Bow [" + bowName + "] fired by " + shooter);
  });
  events.playerMove( function (event) {
  });
  events.inventoryClick( function (event) {
    console.log ("An inventory item was selected?");
    stack=event.getCurrentItem();
    console.log ("got current item");
    name=(stack.getItemMeta() == null) ? null : stack.getItemMeta().getDisplayName();
    console.log ("An item was selected" + name);
  });
  events.playerInteract( function (event) {
    player=event.player;
    inhand=player.getItemInHand();
    name=(inhand.getItemMeta() == null) ? null : inhand.getItemMeta().getDisplayName();
    if ((name) == "flamethrower"){
      projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.FIREBALL);
      player.launchProjectile(projectile.getClass());
    }
    else if ((name) == "minigun"){
      i=0;
      var test= setInterval (function () {
        i=i+1;
        projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.ARROW);
        player.launchProjectile(projectile.getClass());
        if (!(i <100)) {
          clearInterval (test);
        }
      }, 100);
    }
    else {
      console.log ("in hand: [" + name + "]");
    }
  });
  events.projectileHit( function (event) {
    projectile=event.getEntity();
    if (projectile.getMetadata("name").length > 0){
      name=(projectile.getMetadata == null)?null:(projectile.getMetadata("name").length == 0)?null:projectile.getMetadata("name")[0].value();
      if ((name) == "bazooka"){
        console.log ("Create explosion yo");
        server.worlds[0].createExplosion (projectile.location,4);
      }
      else {
        console.log ("projectile " + name + " landed yo");
      }
    }
    console.log (projectile.getType() + " just hit something yo");
    if ((projectile.getType()) != (org.bukkit.entity.EntityType.ARROW)){
      console.log ("Non-arrow hit something [" + projectile.getType + "]");
    }
  });
};
