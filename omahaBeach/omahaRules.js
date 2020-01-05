exports.omahaRules = function () {
  //Instantiations;
  var players;
  var message;
  var player;
  var team;
  var block;
  var inhand;
  var name;
  var i;
  var projectile;
  var shooter;
  var bow;
  var bowName;
  var stack;
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamemode survival @a");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "deop @a");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "weather clear");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "time set day");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @a");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "op " + self.name);
  exports.kingAttacker=null;
  exports.kingAirforce=null;
  exports.kingDefender=null;
  players=server.getOnlinePlayers();
  for (var i=0; i<parseInt(players.length); i++) {
    players[i].removeMetadata ("team", __plugin );
  }
  events.playerCommandPreprocess( function (event) {
    message=event.getMessage();
    console.log ("Got a player chat message yo: [" + message + "]");
  });
  events.playerRespawn( function (event) {
    console.log ("Player Respawn");
    player=event.getPlayer();
    console.log (player.name + " respawn");
    team=(player.getMetadata == null)?null:(player.getMetadata("team").length == 0)?null:player.getMetadata("team")[0].value();
    console.log ("team: " + team);
    if ((team) == "Attacker"){
      if (((exports.kingAttacker == null ) ? false : exports.kingAttacker.isDead()) || ((exports.kingAttacker == null ) ? false : (exports.kingAttacker.getGameMode().toString() == "SPECTATOR"))){
        player.sendMessage ("The king is dead, you are now a spectator.");
        player.setGameMode(org.bukkit.GameMode.SPECTATOR);
        teleportPlayer(player,-1224,100,-412);
      }
      else {
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp " + player.name + " " + exports.kingAttacker.location.x + " " + exports.kingAttacker.location.y + " " + exports.kingAttacker.location.z);
      }
    }
    else if ((team) == "Defender"){
      if (((exports.kingDefender == null ) ? false : exports.kingDefender.isDead()) || ((exports.kingDefender == null ) ? false : (exports.kingDefender.getGameMode().toString() == "SPECTATOR"))){
        player.sendMessage ("The king is dead, you are now a spectator.");
        player.setGameMode(org.bukkit.GameMode.SPECTATOR);
        teleportPlayer(player,-1224,100,-412);
      }
      else {
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp " + player.name + " " + exports.kingDefender.location.x + " " + exports.kingDefender.location.y + " " + exports.kingDefender.location.z);
      }
    }
    else if ((team) == "Airforce"){
      if (((exports.kingAirforce == null ) ? false : exports.kingAirforce.isDead()) || ((exports.kingAirforce == null ) ? false : (exports.kingAirforce.getGameMode().toString() == "SPECTATOR"))){
        player.sendMessage ("The king is dead, you are now a spectator");
        player.setGameMode(org.bukkit.GameMode.SPECTATOR);
        teleportPlayer(player,-1231,63,-616);
      }
      else {
        teleportPlayer(player,-1231,63,-616);
      }
    }
    else {
      console.log ("Player must select a team");
      teleportPlayer(player,-1219,137,-91);
    }
  });
  events.blockBreak( function (event) {
    player=event.getPlayer();
    if ((player.name) != "Paulware"){
      event.cancelled = true;
    }
  });
  events.playerInteract( function (event) {
    player=event.player;
    block=event.getClickedBlock();
    omahaSelectTeam (player,block);
    inhand=player.getItemInHand();
    name=(inhand.getItemMeta() == null) ? null : inhand.getItemMeta().getDisplayName();
    if ((name) == "minigun"){
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
    else if ((name) == "flamethrower"){
      projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.FIREBALL);
      player.launchProjectile(projectile.getClass());
    }
    else {
      console.log ("in hand: [" + name + "]");
    }
  });
  events.projectileHit( function (event) {
    projectile=event.getEntity();
    if ((projectile.getType()) == (org.bukkit.entity.EntityType.SNOWBALL)){
      server.worlds[0].createExplosion (projectile.location,1.5);
    }
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
    if ((player) == (exports.kingAttacker)){
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"King Attacker has died\"");
    }
    else if ((player) == (exports.kingDefender)){
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"King Defender has died\"");
    }
  });
  events.playerJoin( function (event) {
    player=event.player;
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamemode survival " + player.name);
    player.sendMessage ("Sorry I have to kill you to make sure you respawn");
    player.removeMetadata ("team", __plugin );
    setTimeout (function () {
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill " + player.name);
    },500);
  });
  events.inventoryClick( function (event) {
    console.log ("An inventory item was selected?");
    stack=event.getCurrentItem();
    console.log ("got current item");
    name=(stack.getItemMeta() == null) ? null : stack.getItemMeta().getDisplayName();
    console.log ("An item was selected" + name);
  });
};

exports.teleportPlayer  = function (player,x,y,z) {
  //Instantiations;
  var location;
  var entity;
  var TeleportCause;
  console.log ("teleport " + player.name + " to : [" + x + "," + y + "," + z + "]");
  setTimeout (function () {
    player.teleport(new org.bukkit.Location(server.worlds[0], x, y, z), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
  },2500);
};

exports.omahaSelectTeam = function (player,block) {
  //Instantiations;
  var blockType;
  var team;
  var meta;
  var stack;
  if ((block) == (null)){
    console.log ("block is null");
  }
  else {
    blockType=block.getType();
    if ((blockType) != (org.bukkit.Material.OAK_SIGN)){
      console.log ("block is not oak sign: " + blockType);
    }
    else {
      team=block.state.getLine(1);
      console.log ("team : [" + team + "]");
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,team);
      player.setMetadata ("team", fd );
      if ((team) == "Attacker"){
        if ((exports.kingAttacker) == (null)){
          player.getInventory().setItem (0,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1);  var m = s.getItemMeta();  m.setDisplayName ("minigun");  s.setItemMeta(m);  return s; })() );
          exports.kingAttacker=player;
          player.sendMessage ("You are now king attacker");
          teleportPlayer(player,-1223,63,-505);
        }
        else {
          if ((player) != (exports.kingAttacker)){
            loc=exports.kingAttacker.location;
            teleportPlayer(player,loc.x, loc.y,loc.z);
          }
        }
      }
      else if ((team) == "Defender"){
        if ((exports.kingDefender) == (null)){
          player.getInventory().setItem (1,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1);  var m = s.getItemMeta();  m.setDisplayName ("minigun");  s.setItemMeta(m);  return s; })() );
          exports.kingDefender=player;
          player.sendMessage ("You are now king defender");
          teleportPlayer(player,-1224,85,-412);
        }
        else {
          if ((player) != (exports.kingDefender)){
            loc=exports.kingDefender.location;
            teleportPlayer(player,loc.x, loc.y,loc.z);
          }
        }
      }
      else if ((team) == "Airforce"){
        if ((exports.kingAirforce) == (null)){
          exports.kingAirforce=player;
          player.getInventory().setItem (1,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1);  var m = s.getItemMeta();  m.setDisplayName ("minigun");  s.setItemMeta(m);  return s; })() );
          player.getInventory().setItem (2,new org.bukkit.inventory.ItemStack (org.bukkit.Material.LEGACY_ELYTRA,1) );
          player.sendMessage ("You are now king of airforce");
          teleportPlayer(player,-1231,63,-616);
        }
        else {
          teleportPlayer(player,-1231,63,-616);
        }
      }
    }
  }
};
