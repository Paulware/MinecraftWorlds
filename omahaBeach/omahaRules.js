exports.omahaRules = function () {
  //Instantiations;
  var player;
  var shooter;
  var projectile;
  var bow;
  var bowName;
  var team;
  var stack;
  var name;
  var inhand;
  var block;
  var blockType;
  var meta;
  var i;
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "weather clear");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "time set day");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @a");
  exports.kingAttacker=null;
  exports.kingDefender=null;
  events.blockBreak( function (event) {
    player=event.getPlayer();
    if ((player.name) != "Paulware"){
      event.cancelled = true;
    }
  });
  events.entityShootBow( function (event) {
    shooter=event.getEntity();
    projectile=event.getProjectile();
    bow=event.getBow();
    bowName=(bow.getItemMeta() == null) ? null : bow.getItemMeta().getDisplayName();
    fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,bowName);
    projectile.setMetadata ("name", fd );
    console.log ("Bow [" + bowName + "] fired by " + shooter);
  });
  events.playerDeath( function (event) {
    player=event.getEntity();
    team=(player.getMetadata == null)?null:(player.getMetadata("team").length == 0)?null:player.getMetadata("team")[0].value();
    if ((team) == "Attacker" || (team) == "Airforce"){
      if (exports.kingAttacker.isDead()){
        player.sendMessage ("The king is dead, you are now a spectator");
        player.setGameMode(org.bukkit.GameMode.SPECTATOR);
      }
      else {
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp " + player.name + " " + exports.kingAttacker.location.x + " " + exports.kingAttacker.location.y + " " + exports.kingAttacker.location.z);
      }
    }
    else if ((team) == "Defender"){
      if (exports.kingDefender.isDead()){
        player.sendMessage ("The king is dead, you are now a spectator");
        player.setGameMode(org.bukkit.GameMode.SPECTATOR);
      }
      else {
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp " + player.name + " " + exports.kingDefender.location.x + " " + exports.kingAttacker.location.y + " " + exports.kingAttacker.location.z);
      }
    }
    if ((player) == (exports.kingAttacker)){
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"King Attacker has died\"");
    }
    else if ((player) == (exports.kingDefender)){
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"King Defender has died\"");
    }
  });
  events.playerJoin( function (event) {
    player=event.player;
    value.sendMessage ("Sorry I have to kill you to make sure you respawn");
    setTimeout (function () {
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill " + player.name);
    },2500);
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
    block=event.getClickedBlock();
    if ((block) != (null)){
      blockType=block.getType();
      if ((blockType) == (org.bukkit.Material.OAK_SIGN)){
        team=block.state.getLine(1);
        fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,team);
        player.setMetadata ("team", fd );
        if ((team) == "Attacker"){
          if ((exports.kingAttacker) == (null)){
            player.getInventory().setItem (0,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1);  var m = s.getItemMeta();  m.setDisplayName ("minigun");  s.setItemMeta(m);  return s; })() );
            exports.kingAttacker=player;
            player.sendMessage ("You are now king attacker");
          }
        }
        else if ((team) == "Defender"){
          if ((exports.kingDefender) == (null)){
            player.getInventory().setItem (0,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1);  var m = s.getItemMeta();  m.setDisplayName ("minigun");  s.setItemMeta(m);  return s; })() );
            exports.kingDefender=player;
            player.sendMessage ("You are now king defender");
          }
        }
        else if ((team) == "Airforce"){
          if ((exports.kingAttacker) == (null)){
            exports.kingAttacker=player;
            player.getInventory().setItem (0,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1);  var m = s.getItemMeta();  m.setDisplayName ("minigun");  s.setItemMeta(m);  return s; })() );
            player.getInventory().setItem (1,new org.bukkit.inventory.ItemStack (org.bukkit.Material.LEGACY_ELYTRA,1) );
            player.sendMessage ("You are now king attacker");
          }
        }
      }
    }
    if ((name) == "flamethrower"){
      projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.FIREBALL);
      player.launchProjectile(projectile.getClass());
    }
    else if ((name) == "minigun"){
      i=0;
      var test= setInterval (function () {
        i=i+1;
        if ((player) == (exports.kingAttacker) || (player) == (exports.kingDefender)){
          projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.TRIDENT);
          player.launchProjectile(projectile.getClass());
        }
        else {
          projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.ARROW);
          player.launchProjectile(projectile.getClass());
        }
        if (!(i <50)) {
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
