exports.omahaRules = function () {
  //Instantiations;
  var players;
  var message;
  var player;
  var team;
  var color;
  var block;
  var blockType;
  var meta;
  var stack;
  var inhand;
  var name;
  var i;
  var projectile;
  var shooter;
  var bow;
  var bowName;
  var count;
  exports.kingAttacker=null;
  exports.kingDefender=null;
  exports.kingAirforce=null;
  exports.kingArtillery=null;
  exports.kingsDead=[false,false,false,false];
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamemode survival @a");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule doweathercycle false");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule dodaylightcycle false");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "spawnpoint @a -1219 137 -91");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "deop @a");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "weather clear");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "time set day");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp @a -1219 137 -91");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "op " + self.name);
  players = server.getOnlinePlayers();
  for (var playersIndex=0; playersIndex<players.length; playersIndex++) {
    players[playersIndex].removeMetadata ("team", __plugin );
  }
  players = server.getOnlinePlayers();
  for (var playersIndex=0; playersIndex<players.length; playersIndex++) {
    players[playersIndex].getInventory().clear();
  }
  events.playerCommandPreprocess( function (event) {
    message=event.getMessage();
    console.log ("Got a player chat message yo: [" + message + "]");
  });
  events.playerRespawn( function (event) {
    player=event.getPlayer();
    team=(player.getMetadata == null)?null:(player.getMetadata("team").length == 0)?null:player.getMetadata("team")[0].value();
    console.log (player.name + " respawn on team: [" + team + "]");
    if ((team) == "Attacker"){
      if (((exports.kingAttacker == null ) ? false : exports.kingAttacker.isDead()) || ((exports.kingAttacker == null ) ? false : (exports.kingAttacker.getGameMode().toString() == "SPECTATOR"))){
        player.sendMessage ("The king is dead, you are now a spectator.");
        player.setGameMode(org.bukkit.GameMode.SPECTATOR);
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], -1224, 100, -412), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
      else {
        color = org.bukkit.Color.RED;
        var player = player;
        var items = require ('items');
        var helmet = items.leatherHelmet(1);
        var helmetMeta = helmet.itemMeta;
        helmetMeta.color = color;
        helmet.itemMeta = helmetMeta;
        player.equipment.helmet = helmet;
        var boots = items.leatherBoots(1);
        var bootsMeta = boots.itemMeta;
        bootsMeta.color = color;
        boots.itemMeta = bootsMeta;
        player.equipment.boots = boots;
        var chest = items.leatherChestplate(1);
        var chestMeta = chest.itemMeta;
        chestMeta.color = color;
        chest.itemMeta = chestMeta;
        player.equipment.chestplate = chest;
        var legs = items.leatherLeggings(1);
        var legsMeta = legs.itemMeta;
        legsMeta.color = color;
        legs.itemMeta = legsMeta;
        player.equipment.leggings = legs;
        setTimeout (function () {
          player.teleport(exports.kingAttacker.location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
    }
    else if ((team) == "Defender"){
      if (((exports.kingDefender == null ) ? false : exports.kingDefender.isDead()) || ((exports.kingDefender == null ) ? false : (exports.kingDefender.getGameMode().toString() == "SPECTATOR"))){
        player.sendMessage ("The king is dead, you are now a spectator.");
        player.setGameMode(org.bukkit.GameMode.SPECTATOR);
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], -1224, 100, -412), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
      else {
        color = org.bukkit.Color.BLUE;
        var player = player;
        var items = require ('items');
        var helmet = items.leatherHelmet(1);
        var helmetMeta = helmet.itemMeta;
        helmetMeta.color = color;
        helmet.itemMeta = helmetMeta;
        player.equipment.helmet = helmet;
        var boots = items.leatherBoots(1);
        var bootsMeta = boots.itemMeta;
        bootsMeta.color = color;
        boots.itemMeta = bootsMeta;
        player.equipment.boots = boots;
        var chest = items.leatherChestplate(1);
        var chestMeta = chest.itemMeta;
        chestMeta.color = color;
        chest.itemMeta = chestMeta;
        player.equipment.chestplate = chest;
        var legs = items.leatherLeggings(1);
        var legsMeta = legs.itemMeta;
        legsMeta.color = color;
        legs.itemMeta = legsMeta;
        player.equipment.leggings = legs;
        setTimeout (function () {
          player.teleport(exports.kingDefender.location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
    }
    else if ((team) == "Airforce"){
      if (((exports.kingAirforce == null ) ? false : exports.kingAirforce.isDead()) || ((exports.kingAirforce == null ) ? false : (exports.kingAirforce.getGameMode().toString() == "SPECTATOR"))){
        player.sendMessage ("The king is dead, you are now a spectator");
        player.setGameMode(org.bukkit.GameMode.SPECTATOR);
      }
      color = org.bukkit.Color.RED;
      var player = player;
      var items = require ('items');
      var helmet = items.leatherHelmet(1);
      var helmetMeta = helmet.itemMeta;
      helmetMeta.color = color;
      helmet.itemMeta = helmetMeta;
      player.equipment.helmet = helmet;
      var boots = items.leatherBoots(1);
      var bootsMeta = boots.itemMeta;
      bootsMeta.color = color;
      boots.itemMeta = bootsMeta;
      player.equipment.boots = boots;
      var chest = items.leatherChestplate(1);
      var chestMeta = chest.itemMeta;
      chestMeta.color = color;
      chest.itemMeta = chestMeta;
      player.equipment.chestplate = chest;
      var legs = items.leatherLeggings(1);
      var legsMeta = legs.itemMeta;
      legsMeta.color = color;
      legs.itemMeta = legsMeta;
      player.equipment.leggings = legs;
      player.getInventory().setItem (2,new org.bukkit.inventory.ItemStack (org.bukkit.Material.LEGACY_ELYTRA,1) );
      setTimeout (function () {
        player.teleport(new org.bukkit.Location(server.worlds[0], -1231, 63, -616), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      },2000);
    }
    else if ((team) == "Artillery"){
      if (((exports.kingArtillery == null ) ? false : exports.kingArtillery.isDead()) || ((exports.kingArtillery == null ) ? false : (exports.kingArtillery.getGameMode().toString() == "SPECTATOR"))){
        player.sendMessage ("The Artillery king is dead, you are now a spectator");
        player.setGameMode(org.bukkit.GameMode.SPECTATOR);
      }
      color = org.bukkit.Color.BLUE;
      var player = player;
      var items = require ('items');
      var helmet = items.leatherHelmet(1);
      var helmetMeta = helmet.itemMeta;
      helmetMeta.color = color;
      helmet.itemMeta = helmetMeta;
      player.equipment.helmet = helmet;
      var boots = items.leatherBoots(1);
      var bootsMeta = boots.itemMeta;
      bootsMeta.color = color;
      boots.itemMeta = bootsMeta;
      player.equipment.boots = boots;
      var chest = items.leatherChestplate(1);
      var chestMeta = chest.itemMeta;
      chestMeta.color = color;
      chest.itemMeta = chestMeta;
      player.equipment.chestplate = chest;
      var legs = items.leatherLeggings(1);
      var legsMeta = legs.itemMeta;
      legsMeta.color = color;
      legs.itemMeta = legsMeta;
      player.equipment.leggings = legs;
      setTimeout (function () {
        player.teleport(exports.kingArtillery.location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      },2000);
    }
    else {
      console.log ("Player must select a team");
      setTimeout (function () {
        player.teleport(new org.bukkit.Location(server.worlds[0], -1219, 137, -91), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      },2000);
    }
  });
  events.blockBreak( function (event) {
    player=event.getPlayer();
    if ((player.name) != "Paulware"){
      event.cancelled = true;
    }
  });
  events.playerInteract( function (event) {
    player=event.getPlayer();
    block=event.getClickedBlock();
    blockType=(block==null)?null:block.getType();
    if ((blockType) == (org.bukkit.Material.OAK_SIGN)){
      team=block.state.getLine(1);
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,team);
      player.setMetadata ("team", fd );
      player.setHealth(20);
      console.log (player.name + " has selected " + team);
      if ((team) == "Attacker"){
        if ((exports.kingAttacker) == (null)){
          player.getInventory().setItem (0,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1);  var m = s.getItemMeta();  m.setDisplayName ("minigun");  s.setItemMeta(m);  return s; })() );
          exports.kingAttacker=player;
          player.sendMessage ("You are now king attacker");
          setTimeout (function () {
            player.teleport(new org.bukkit.Location(server.worlds[0], -1223, 63, -505), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
          var player = player;
          var items = require ('items');
          player.equipment.helmet = items.diamondHelmet(1);
          player.equipment.boots = items.diamondBoots(1);
          player.equipment.chestplate = items.diamondChestplate(1);
          player.equipment.leggings = items.diamondLeggings(1);
        }
        else {
          if ((player) != (exports.kingAttacker)){
            setTimeout (function () {
              player.teleport(exports.kingAttacker.location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
            },2000);
            color = org.bukkit.Color.RED;
            var player = player;
            var items = require ('items');
            var helmet = items.leatherHelmet(1);
            var helmetMeta = helmet.itemMeta;
            helmetMeta.color = color;
            helmet.itemMeta = helmetMeta;
            player.equipment.helmet = helmet;
            var boots = items.leatherBoots(1);
            var bootsMeta = boots.itemMeta;
            bootsMeta.color = color;
            boots.itemMeta = bootsMeta;
            player.equipment.boots = boots;
            var chest = items.leatherChestplate(1);
            var chestMeta = chest.itemMeta;
            chestMeta.color = color;
            chest.itemMeta = chestMeta;
            player.equipment.chestplate = chest;
            var legs = items.leatherLeggings(1);
            var legsMeta = legs.itemMeta;
            legsMeta.color = color;
            legs.itemMeta = legsMeta;
            player.equipment.leggings = legs;
          }
        }
      }
      else if ((team) == "Defender"){
        if ((exports.kingDefender) == (null)){
          var player = player;
          var items = require ('items');
          player.equipment.helmet = items.diamondHelmet(1);
          player.equipment.boots = items.diamondBoots(1);
          player.equipment.chestplate = items.diamondChestplate(1);
          player.equipment.leggings = items.diamondLeggings(1);
          player.getInventory().setItem (1,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1);  var m = s.getItemMeta();  m.setDisplayName ("minigun");  s.setItemMeta(m);  return s; })() );
          exports.kingDefender=player;
          player.sendMessage ("You are now king defender");
          setTimeout (function () {
            player.teleport(new org.bukkit.Location(server.worlds[0], -1224, 85, -411), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
        }
        else {
          if ((player) != (exports.kingDefender)){
            setTimeout (function () {
              player.teleport(exports.kingDefender.location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
            },2000);
            color = org.bukkit.Color.BLUE;
            var player = player;
            var items = require ('items');
            var helmet = items.leatherHelmet(1);
            var helmetMeta = helmet.itemMeta;
            helmetMeta.color = color;
            helmet.itemMeta = helmetMeta;
            player.equipment.helmet = helmet;
            var boots = items.leatherBoots(1);
            var bootsMeta = boots.itemMeta;
            bootsMeta.color = color;
            boots.itemMeta = bootsMeta;
            player.equipment.boots = boots;
            var chest = items.leatherChestplate(1);
            var chestMeta = chest.itemMeta;
            chestMeta.color = color;
            chest.itemMeta = chestMeta;
            player.equipment.chestplate = chest;
            var legs = items.leatherLeggings(1);
            var legsMeta = legs.itemMeta;
            legsMeta.color = color;
            legs.itemMeta = legsMeta;
            player.equipment.leggings = legs;
          }
        }
      }
      else if ((team) == "Airforce"){
        if ((exports.kingAirforce) == (null)){
          var player = player;
          var items = require ('items');
          player.equipment.helmet = items.diamondHelmet(1);
          player.equipment.boots = items.diamondBoots(1);
          player.equipment.chestplate = items.diamondChestplate(1);
          player.equipment.leggings = items.diamondLeggings(1);
          exports.kingAirforce=player;
          player.getInventory().setItem (1,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1);  var m = s.getItemMeta();  m.setDisplayName ("minigun");  s.setItemMeta(m);  return s; })() );
          player.sendMessage ("You are now king of airforce");
        }
        else {
          color = org.bukkit.Color.RED;
          var player = player;
          var items = require ('items');
          var helmet = items.leatherHelmet(1);
          var helmetMeta = helmet.itemMeta;
          helmetMeta.color = color;
          helmet.itemMeta = helmetMeta;
          player.equipment.helmet = helmet;
          var boots = items.leatherBoots(1);
          var bootsMeta = boots.itemMeta;
          bootsMeta.color = color;
          boots.itemMeta = bootsMeta;
          player.equipment.boots = boots;
          var chest = items.leatherChestplate(1);
          var chestMeta = chest.itemMeta;
          chestMeta.color = color;
          chest.itemMeta = chestMeta;
          player.equipment.chestplate = chest;
          var legs = items.leatherLeggings(1);
          var legsMeta = legs.itemMeta;
          legsMeta.color = color;
          legs.itemMeta = legsMeta;
          player.equipment.leggings = legs;
        }
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], -1231, 63, -616), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
        player.getInventory().setItem (2,new org.bukkit.inventory.ItemStack (org.bukkit.Material.LEGACY_ELYTRA,1) );
      }
      else if ((team) == "Artillery"){
        if ((exports.kingArtillery) == (null)){
          var player = player;
          var items = require ('items');
          player.equipment.helmet = items.diamondHelmet(1);
          player.equipment.boots = items.diamondBoots(1);
          player.equipment.chestplate = items.diamondChestplate(1);
          player.equipment.leggings = items.diamondLeggings(1);
          exports.kingArtillery=player;
          player.sendMessage ("You are now king of the airtillery");
        }
        else {
          color = org.bukkit.Color.BLUE;
          var player = player;
          var items = require ('items');
          var helmet = items.leatherHelmet(1);
          var helmetMeta = helmet.itemMeta;
          helmetMeta.color = color;
          helmet.itemMeta = helmetMeta;
          player.equipment.helmet = helmet;
          var boots = items.leatherBoots(1);
          var bootsMeta = boots.itemMeta;
          bootsMeta.color = color;
          boots.itemMeta = bootsMeta;
          player.equipment.boots = boots;
          var chest = items.leatherChestplate(1);
          var chestMeta = chest.itemMeta;
          chestMeta.color = color;
          chest.itemMeta = chestMeta;
          player.equipment.chestplate = chest;
          var legs = items.leatherLeggings(1);
          var legsMeta = legs.itemMeta;
          legsMeta.color = color;
          legs.itemMeta = legsMeta;
          player.equipment.leggings = legs;
        }
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], -1248, 86, -380), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
    }
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
      projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.WITHER_SKULL);
      player.launchProjectile(projectile.getClass());
    }
    else {
      console.log ("in hand: [" + name + "]");
    }
  });
  events.projectileHit( function (event) {
    projectile=event.getEntity();
    if ((projectile.getType()) == (org.bukkit.entity.EntityType.SNOWBALL)){
      server.worlds[0].createExplosion (projectile.location,3);
    }
    if (projectile.getMetadata("name").length > 0){
      name=(projectile.getMetadata == null)?null:(projectile.getMetadata("name").length == 0)?null:projectile.getMetadata("name")[0].value();
      if ((name) == "bazooka"){
        server.worlds[0].createExplosion (projectile.location,3);
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
      exports.kingsDead[0]=true;
    }
    else if ((player) == (exports.kingDefender)){
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"King Defender has died\"");
      exports.kingsDead[1]=true;
    }
    else if ((player) == (exports.kingArtillery)){
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"King Defender has died\"");
      exports.kingsDead[2]=true;
    }
    else if ((player) == (exports.kingAirforce)){
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"King Defender has died\"");
      exports.kingsDead[3]=true;
    }
    count=0;
    if ((exports.kingAttacker) == (null)){
      return ;
    }
    else if (exports.kingsDead[0]){
      count=count+1;
    }
    if ((exports.kingDefender) == (null)){
      return ;
    }
    else if (exports.kingsDead[1]){
      count=count+1;
    }
    if ((exports.kingArtillery) == (null)){
      return ;
    }
    else if (exports.kingsDead[2]){
      count=count+1;
    }
    if ((exports.kingAirforce) == (null)){
      return ;
    }
    else if (exports.kingsDead[3]){
      count=count+1;
    }
    if ((count) == 1){
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a game over");
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @a");
      if (!exports.kingsDead[0]){
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a Attackers Win!");
      }
      else if (!exports.kingsDead[1]){
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a Defenders Win!");
      }
      else if (!exports.kingsDead[2]){
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a Artillery Wins!");
      }
      else {
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a Airforce Wins!");
      }
    }
  });
  events.playerJoin( function (event) {
    player=event.getPlayer();
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamemode survival " + player.name);
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "deop " + player.name);
    player.removeMetadata ("team", __plugin );
    player.getInventory().clear();
    setTimeout (function () {
      player.teleport(new org.bukkit.Location(server.worlds[0], -1219, 137, -91), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
    },2000);
  });
  events.playerQuit( function (event) {
    player=event.getPlayer();
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a " + player.name + " has quit the game");
  });
};
