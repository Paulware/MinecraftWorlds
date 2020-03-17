exports.garrisonJoin  = function (player) {
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "deop " + player.name);
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamemode survival " + player.name);
  player.getInventory().clear();
  player.removeMetadata ("_team_", __plugin );
  garrison();
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp " + player.name + " -1203 138 -106");
};

exports.garrison  = function () {
  //Instantiations;
  var player;
  var block;
  var blockType;
  var team;
  var meta;
  var stack;
  var color;
  var _player;
  var projectile;
  var shooter;
  var bow;
  var bowName;
  var name;
  var inhand;
  var i ;
  var i;
  if (((exports.gameStarted) == (null))){
    exports.gameStarted=true;
    exports.kingAttacker=null;
    exports.kingDefender=null;
    exports.kingAirforce=null;
    exports.kingArtillery=null;
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule doweathercycle false");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule dodaylightcycle false");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "weather clear");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "time set day");
    events.blockBreak( function (event) {
      event.cancelled = true;
    });
    events.playerInteract( function (event) {
      player=(event.getPlayer()== null) ? null : event.getPlayer()();
      block=(event.getClickedBlock()== null) ? null : event.getClickedBlock()();
      blockType=(block==null)?null:block.getType();
      if (((blockType) == (org.bukkit.Material.OAK_SIGN))){
        team=(block==null)?null: (block.state.getLine == null)?null:block.state.getLine(1);
        fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,team);
        if (player != null) {
          if (player.setMetadata != null ) {
            player.setMetadata ("_team_", fd );
          }
        }
        console.log (player.name+"had selected"+team);
        if (((team) == "Attacker")){
          if (((exports.kingAttacker) == (null))){
            player.getInventory().setItem (0,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1);  var m = s.getItemMeta();  m.setDisplayName ("minigun");  s.setItemMeta(m);  return s; })() );
            exports.kingAttacker=player;
            (function() {
              if (player != null ) {
                 player.sendMessage ("You are own king Attacker");
              }
             })();
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
            if (((player) != (exports.kingAttacker))){
              setTimeout (function () {
                player.teleport(exports.kingAttacker, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
              },2000);
              color = org.bukkit.Color.GREEN;
              _player = player;
              var items = require ('items');
              var helmet = items.leatherHelmet(1);
              var helmetMeta = helmet.itemMeta;
              helmetMeta.color = color;
              helmet.itemMeta = helmetMeta;
              _player.equipment.helmet = helmet;
              var boots = items.leatherBoots(1);
              var bootsMeta = boots.itemMeta;
              bootsMeta.color = color;
              boots.itemMeta = bootsMeta;
              _player.equipment.boots = boots;
              var chest = items.leatherChestplate(1);
              var chestMeta = chest.itemMeta;
              chestMeta.color = color;
              chest.itemMeta = chestMeta;
              _player.equipment.chestplate = chest;
              var legs = items.leatherLeggings(1);
              var legsMeta = legs.itemMeta;
              legsMeta.color = color;
              legs.itemMeta = legsMeta;
              _player.equipment.leggings = legs;
            }
          }
        }
        else if (((team) == "Defender")){
          if (((exports.kingDefender) == (null))){
            player.getInventory().setItem (0,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1);  var m = s.getItemMeta();  m.setDisplayName ("minigun");  s.setItemMeta(m);  return s; })() );
            exports.kingDefender=player;
            (function() {
              if (player != null ) {
                 player.sendMessage ("You are own king Defender");
              }
             })();
            setTimeout (function () {
              player.teleport(new org.bukkit.Location(server.worlds[0], -1224, 100, -412), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
            },2000);
            var player = player;
            var items = require ('items');
            player.equipment.helmet = items.diamondHelmet(1);
            player.equipment.boots = items.diamondBoots(1);
            player.equipment.chestplate = items.diamondChestplate(1);
            player.equipment.leggings = items.diamondLeggings(1);
          }
          else {
            if (((player) != (exports.kingDefender))){
              setTimeout (function () {
                player.teleport(exports.kingDefender, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
              },2000);
              color = org.bukkit.Color.GRAY;
              _player = player;
              var items = require ('items');
              var helmet = items.leatherHelmet(1);
              var helmetMeta = helmet.itemMeta;
              helmetMeta.color = color;
              helmet.itemMeta = helmetMeta;
              _player.equipment.helmet = helmet;
              var boots = items.leatherBoots(1);
              var bootsMeta = boots.itemMeta;
              bootsMeta.color = color;
              boots.itemMeta = bootsMeta;
              _player.equipment.boots = boots;
              var chest = items.leatherChestplate(1);
              var chestMeta = chest.itemMeta;
              chestMeta.color = color;
              chest.itemMeta = chestMeta;
              _player.equipment.chestplate = chest;
              var legs = items.leatherLeggings(1);
              var legsMeta = legs.itemMeta;
              legsMeta.color = color;
              legs.itemMeta = legsMeta;
              _player.equipment.leggings = legs;
            }
          }
        }
        else if (((team) == "Airforce")){
          if (((exports.kingAirforce) == (null))){
            player.getInventory().setItem (1,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1);  var m = s.getItemMeta();  m.setDisplayName ("minigun");  s.setItemMeta(m);  return s; })() );
            exports.kingAirforce=player;
            (function() {
              if (player != null ) {
                 player.sendMessage ("You are own king Airforce");
              }
             })();
            setTimeout (function () {
              player.teleport(new org.bukkit.Location(server.worlds[0], -1231, 63, -616), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
            },2000);
            var player = player;
            var items = require ('items');
            player.equipment.helmet = items.diamondHelmet(1);
            player.equipment.boots = items.diamondBoots(1);
            player.equipment.chestplate = items.diamondChestplate(1);
            player.equipment.leggings = items.diamondLeggings(1);
          }
          else {
            if (((player) != (exports.kingAirforce))){
              color = org.bukkit.Color.GREEN;
              _player = player;
              var items = require ('items');
              var helmet = items.leatherHelmet(1);
              var helmetMeta = helmet.itemMeta;
              helmetMeta.color = color;
              helmet.itemMeta = helmetMeta;
              _player.equipment.helmet = helmet;
              var boots = items.leatherBoots(1);
              var bootsMeta = boots.itemMeta;
              bootsMeta.color = color;
              boots.itemMeta = bootsMeta;
              _player.equipment.boots = boots;
              var chest = items.leatherChestplate(1);
              var chestMeta = chest.itemMeta;
              chestMeta.color = color;
              chest.itemMeta = chestMeta;
              _player.equipment.chestplate = chest;
              var legs = items.leatherLeggings(1);
              var legsMeta = legs.itemMeta;
              legsMeta.color = color;
              legs.itemMeta = legsMeta;
              _player.equipment.leggings = legs;
            }
            setTimeout (function () {
              player.teleport(exports.kingAirforce, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
            },2000);
            player.getInventory().setItem (2,new org.bukkit.inventory.ItemStack (org.bukkit.Material.LEGACY_ELYTRA,1) );
          }
        }
        else if (((team) == "Artillery")){
          if (((exports.kingArtilly) == (null))){
            var player = player;
            var items = require ('items');
            player.equipment.helmet = items.diamondHelmet(1);
            player.equipment.boots = items.diamondBoots(1);
            player.equipment.chestplate = items.diamondChestplate(1);
            player.equipment.leggings = items.diamondLeggings(1);
            exports.kingArtillery=player;
            (function() {
              if (player != null ) {
                 player.sendMessage ("You are own king Artillery");
              }
             })();
          }
          else {
            if (((player) != (exports.kingArtillery))){
              color = org.bukkit.Color.GRAY;
              _player = player;
              var items = require ('items');
              var helmet = items.leatherHelmet(1);
              var helmetMeta = helmet.itemMeta;
              helmetMeta.color = color;
              helmet.itemMeta = helmetMeta;
              _player.equipment.helmet = helmet;
              var boots = items.leatherBoots(1);
              var bootsMeta = boots.itemMeta;
              bootsMeta.color = color;
              boots.itemMeta = bootsMeta;
              _player.equipment.boots = boots;
              var chest = items.leatherChestplate(1);
              var chestMeta = chest.itemMeta;
              chestMeta.color = color;
              chest.itemMeta = chestMeta;
              _player.equipment.chestplate = chest;
              var legs = items.leatherLeggings(1);
              var legsMeta = legs.itemMeta;
              legsMeta.color = color;
              legs.itemMeta = legsMeta;
              _player.equipment.leggings = legs;
            }
            setTimeout (function () {
              player.teleport(new org.bukkit.Location(server.worlds[0], -1219, 137, -91), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
            },2000);
          }
        }
      }
    });
    events.playerRespawn( function (event) {
      player=(event.getPlayer()== null) ? null : event.getPlayer()();
      team=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_team_").length == 0)?null:player.getMetadata("_team_")[0].value();
      console.log (player.name+"respawn on team: {'team'}");
      if (((team) == "Attacker")){
        if (((exports.kingAttacker == null ) ? false : exports.kingAttacker.isDead()) || ((exports.kingAttacker == null ) ? false : (exports.kingAttacker.getGameMode().toString() == "SPECTATOR"))){
          (function() {
            if (player != null ) {
               player.sendMessage ("Your king is dead you are now spectator");
            }
           })();
          player.setGameMode(org.bukkit.GameMode.SPECTATOR);
          setTimeout (function () {
            player.teleport(new org.bukkit.Location(server.worlds[0], -1224, 85, -411), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
        }
        else {
          setTimeout (function () {
            player.teleport(exports.kingAttacker.location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
        }
      }
      else if (((team) == "Deffender")){
        if (((exports.kingDeffender == null ) ? false : exports.kingDeffender.isDead()) || ((exports.kingDeffender == null ) ? false : (exports.kingDeffender.getGameMode().toString() == "SPECTATOR"))){
          (function() {
            if (player != null ) {
               player.sendMessage ("Your king is dead you are now spectator");
            }
           })();
          player.setGameMode(org.bukkit.GameMode.SPECTATOR);
          setTimeout (function () {
            player.teleport(new org.bukkit.Location(server.worlds[0], -1224, 100, -412), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
        }
        else {
          setTimeout (function () {
            player.teleport(exports.kingDeffender.location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
        }
      }
      else if (((team) == "Airforce")){
        if (((exports.kingAirforce == null ) ? false : exports.kingAirforce.isDead()) || ((exports.kingAirforce == null ) ? false : (exports.kingAirforce.getGameMode().toString() == "SPECTATOR"))){
          (function() {
            if (player != null ) {
               player.sendMessage ("Your king is dead you are now spectator");
            }
           })();
          player.setGameMode(org.bukkit.GameMode.SPECTATOR);
        }
        else {
          player.getInventory().setItem (0,new org.bukkit.inventory.ItemStack (org.bukkit.Material.LEGACY_ELYTRA,1) );
          setTimeout (function () {
            player.teleport(new org.bukkit.Location(server.worlds[0], -1231, 63, -616), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
        }
      }
      else if (((team) == "Artillery")){
        if (((exports.kingArtillery == null ) ? false : exports.kingArtillery.isDead()) || ((exports.kingArtillery == null ) ? false : (exports.kingArtillery.getGameMode().toString() == "SPECTATOR"))){
          (function() {
            if (player != null ) {
               player.sendMessage ("Your king is dead you are now spectator");
            }
           })();
          player.setGameMode(org.bukkit.GameMode.SPECTATOR);
        }
        else {
          setTimeout (function () {
            player.teleport(exports.kingArtillery.location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
        }
      }
      else {
        console.log ("player must join team");
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], -1203, 138, -106), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
    });
    events.projectileHit( function (event) {
      projectile=(event.getEntity()== null) ? null : event.getEntity()();
      if (((projectile.getType()) == (org.bukkit.entity.EntityType.SNOWBALL))){
        server.worlds[0].createExplosion (projectile.location,2);
      }
    });
    events.playerDeath( function (event) {
      player=(event.getEntity()== null) ? null : event.getEntity()();
      if (((player) == (exports.kingAttacker))){
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"King Attacker has died\"");
      }
      else if (((player) == (exports.kingDefender))){
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"King Defender has died\"");
      }
    });
    events.entityShootBow( function (event) {
      shooter=(event.getEntity()== null) ? null : event.getEntity()();
      projectile=(event.getProjectile()== null) ? null : event.getProjectile()();
      bow=(event.getBow()== null) ? null : event.getBow()();
      bowName=(bow== null) ? null : (bow.getItemMeta == null) ? null : (bow.getItemMeta() == null)?null:bow.getItemMeta().getDisplayName();
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,bowName);
      if (projectile != null) {
        if (projectile.setMetadata != null ) {
          projectile.setMetadata ("_key_", fd );
        }
      }
      console.log ("Bow [" + bowName + "] fired by" + shooter);
    });
    events.projectileHit( function (event) {
      projectile=(event.getEntity()== null) ? null : event.getEntity()();
      if (((projectile.getType()) == (org.bukkit.entity.EntityType.SNOWBALL))){
        server.worlds[0].createExplosion (projectile.location,2);
      }
      if (projectile.getMetadata("_name_").length > 0){
        name=(projectile== null)? null : (projectile.getMetadata == null)?null:(projectile.getMetadata("_name_").length == 0)?null:projectile.getMetadata("_name_")[0].value();
        if (((name) == "bazooka")){
          server.worlds[0].createExplosion (projectile.location,4);
        }
      }
      inhand=(player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand();
      name=(inhand== null) ? null : (inhand.getItemMeta == null) ? null : (inhand.getItemMeta() == null)?null:inhand.getItemMeta().getDisplayName();
      if (((name) == "minigun")){
        i =0;
        var test= setInterval (function () {
          i=i+1;
          if (((player) == (exports.kingAttacker)) || ((player) == (exports.kingDefender))){
            projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.TRIDENT);
            player.launchProjectile(projectile.getClass());
          }
          else {
            projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.ARROW);
            player.launchProjectile(projectile.getClass());
          }
          if (!(i > 50)) {
            clearInterval (test);
          }
        }, 100);
      }
      else if (((name) == "flamethrower")){
        projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.FIREBALL);
        player.launchProjectile(projectile.getClass());
      }
    });
  }
};
