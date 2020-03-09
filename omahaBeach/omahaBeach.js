exports.omahaBeach = function () {
  //Instantiations;
  var players;
  var player;
  var team;
  var color;
  var _player;
  var block;
  var blockType;
  var meta;
  var stack;
  var inhand;
  var name;
  var i;
  var projectile;
  var shooter;
  var loc;
  var bow;
  var bowName;
  var gameOver;
  var barbTime;
  var elapsedTime;
  if (((exports.gameStarted) == (null))){
    exports.gameStarted=1;
    exports.kings=[null,null,null,null];
    exports.kingsDead=[false,false,false,false];
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamemode survival @a");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "weather clear");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "time set day");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule doWeatherCycle false");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule keepInventory true");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule commandBlockOutput false");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule doDaylightCycle false");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "setworldspawn -1203 137 -106");
    players = server.getOnlinePlayers();
    for (var playersIndex=0; playersIndex<players.length; playersIndex++) {
      players[playersIndex].removeMetadata ("_team_", __plugin );
    }
    players = server.getOnlinePlayers();
    for (var playersIndex=0; playersIndex<players.length; playersIndex++) {
      players[playersIndex].getInventory().clear();
    }
    events.entityDamage( function (event) {
      cancelFriendlyDamage(event);
    });
    events.playerRespawn( function (event) {
      player=(event.getPlayer== null) ? null : event.getPlayer();
      team=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_team_").length == 0)?null:player.getMetadata("_team_")[0].value();
      console.log (player.name + " respawn on team: [" + team + "]");
      if (((team) == "Attacker")){
        if (((exports.kings[0] == null ) ? false : exports.kings[0].isDead()) || ((exports.kings[0] == null ) ? false : (exports.kings[0].getGameMode().toString() == "SPECTATOR"))){
          (function() {
            if (player != null ) {
               player.sendMessage ("The king is dead, you are now a spectator.");
            }
           })();
          player.setGameMode(org.bukkit.GameMode.SPECTATOR);
          setTimeout (function () {
            player.teleport(new org.bukkit.Location(server.worlds[0], -1224, 100, -412), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
        }
        else {
          color = org.bukkit.Color.RED;
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
          setTimeout (function () {
            player.teleport(exports.kings[0].location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
        }
      }
      else if (((team) == "Defender")){
        if (((exports.kings[1] == null ) ? false : exports.kings[1].isDead()) || ((exports.kings[1] == null ) ? false : (exports.kings[1].getGameMode().toString() == "SPECTATOR"))){
          (function() {
            if (player != null ) {
               player.sendMessage ("The king is dead, you are now a spectator.");
            }
           })();
          player.setGameMode(org.bukkit.GameMode.SPECTATOR);
          setTimeout (function () {
            player.teleport(new org.bukkit.Location(server.worlds[0], -1224, 100, -412), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
        }
        else {
          color = org.bukkit.Color.BLUE;
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
          setTimeout (function () {
            player.teleport(exports.kings[1].location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
        }
      }
      else if (((team) == "Airforce")){
        if (((exports.kings[2] == null ) ? false : exports.kings[2].isDead()) || ((exports.kings[2] == null ) ? false : (exports.kings[2].getGameMode().toString() == "SPECTATOR"))){
          (function() {
            if (player != null ) {
               player.sendMessage ("The king is dead, you are now a spectator");
            }
           })();
          player.setGameMode(org.bukkit.GameMode.SPECTATOR);
        }
        color = org.bukkit.Color.RED;
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
        player.getInventory().setItem (2,new org.bukkit.inventory.ItemStack (org.bukkit.Material.LEGACY_ELYTRA,1) );
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], -1231, 63, -616), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
      else if (((team) == "Artillery")){
        if (((exports.kings[3] == null ) ? false : exports.kings[3].isDead()) || ((exports.kings[3] == null ) ? false : (exports.kings[3].getGameMode().toString() == "SPECTATOR"))){
          (function() {
            if (player != null ) {
               player.sendMessage ("The Artillery king is dead, you are now a spectator");
            }
           })();
          player.setGameMode(org.bukkit.GameMode.SPECTATOR);
        }
        color = org.bukkit.Color.BLUE;
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
        setTimeout (function () {
          player.teleport(exports.kings[3].location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
      else {
        console.log ("Player must select a team");
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], -1203, 137, -106), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
    });
    events.blockBreak( function (event) {
      event.cancelled = true;
    });
    events.playerInteract( function (event) {
      player=(event.getPlayer== null) ? null : event.getPlayer();
      block=(event.getClickedBlock== null) ? null : event.getClickedBlock();
      blockType=(block==null)?null:block.getType();
      if (((blockType) == (org.bukkit.Material.OAK_SIGN))){
        team=(block==null)?null: (block.state.getLine == null)?null:block.state.getLine(1);
        fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,team);
        if (player != null) {
          if (player.setMetadata != null ) {
            player.setMetadata ("_team_", fd );
          }
        }
        (function() {   var h=20;
          if (player.setHealth != null) {
            if (h<0) {
               h = 0;
            }
            player.setHealth(h);  }
         })();
        console.log (player.name + " has selected " + team);
        if (((team) == "Attacker")){
          if (exports.kingsDead[0]){
            player.setGameMode(org.bukkit.GameMode.SPECTATOR);
          }
          else {
            if (((exports.kings[0]) == (null))){
              player.getInventory().setItem (1,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1);  var m = s.getItemMeta();  m.setDisplayName ("minigun");  s.setItemMeta(m);  return s; })() );
              exports.kings[0]=player;
              (function() {
                if (player != null ) {
                   player.sendMessage ("You are now king attacker");
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
              if (((player) != (exports.kings[0]))){
                setTimeout (function () {
                  player.teleport(exports.kings[0].location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
                },2000);
                color = org.bukkit.Color.RED;
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
        }
        else if (((team) == "Defender")){
          if (exports.kingsDead[1]){
            player.setGameMode(org.bukkit.GameMode.SPECTATOR);
          }
          else {
            if (((exports.kings[1]) == (null))){
              var player = player;
              var items = require ('items');
              player.equipment.helmet = items.diamondHelmet(1);
              player.equipment.boots = items.diamondBoots(1);
              player.equipment.chestplate = items.diamondChestplate(1);
              player.equipment.leggings = items.diamondLeggings(1);
              player.getInventory().setItem (1,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1);  var m = s.getItemMeta();  m.setDisplayName ("minigun");  s.setItemMeta(m);  return s; })() );
              exports.kings[1]=player;
              (function() {
                if (player != null ) {
                   player.sendMessage ("You are now king defender");
                }
               })();
              setTimeout (function () {
                player.teleport(new org.bukkit.Location(server.worlds[0], -1224, 85, -411), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
              },2000);
            }
            else {
              if (((player) != (exports.kings[1]))){
                setTimeout (function () {
                  player.teleport(exports.kings[1].location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
                },2000);
                color = org.bukkit.Color.BLUE;
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
        }
        else if (((team) == "Airforce")){
          if (exports.kingsDead[2]){
            player.setGameMode(org.bukkit.GameMode.SPECTATOR);
          }
          else {
            if (((exports.kings[2]) == (null))){
              var player = player;
              var items = require ('items');
              player.equipment.helmet = items.diamondHelmet(1);
              player.equipment.boots = items.diamondBoots(1);
              player.equipment.chestplate = items.diamondChestplate(1);
              player.equipment.leggings = items.diamondLeggings(1);
              exports.kings[2]=player;
              player.getInventory().setItem (1,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1);  var m = s.getItemMeta();  m.setDisplayName ("minigun");  s.setItemMeta(m);  return s; })() );
              (function() {
                if (player != null ) {
                   player.sendMessage ("You are now king of airforce");
                }
               })();
            }
            else {
              color = org.bukkit.Color.RED;
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
            player.getInventory().setItem (2,new org.bukkit.inventory.ItemStack (org.bukkit.Material.LEGACY_ELYTRA,1) );
            setTimeout (function () {
              player.teleport(new org.bukkit.Location(server.worlds[0], -1231, 63, -616), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
            },2000);
          }
        }
        else if (((team) == "Artillery")){
          if (exports.kingsDead[3]){
            player.setGameMode(org.bukkit.GameMode.SPECTATOR);
          }
          else {
            if (((exports.kings[3]) == (null))){
              var player = player;
              var items = require ('items');
              player.equipment.helmet = items.diamondHelmet(1);
              player.equipment.boots = items.diamondBoots(1);
              player.equipment.chestplate = items.diamondChestplate(1);
              player.equipment.leggings = items.diamondLeggings(1);
              exports.kings[3]=player;
              (function() {
                if (player != null ) {
                   player.sendMessage ("You are now king of the airtillery");
                }
               })();
            }
            else {
              color = org.bukkit.Color.BLUE;
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
              player.teleport(new org.bukkit.Location(server.worlds[0], -1248, 86, -380), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
            },2000);
          }
        }
      }
      (function (event) {var _player;var _inhand;var _stack;var _fireAgain;var _projectile;var _shooter;var _team;var _fd;
      if (event instanceof org.bukkit.event.player.PlayerInteractEvent){
      _player=(event.getPlayer== null) ? null : event.getPlayer();
      _inhand=(_player== null) ? null :(_player.getItemInHand == null)?null:_player.getItemInHand();
      _stack=(_inhand== null) ? null : (_inhand.getItemMeta == null) ? null : (_inhand.getItemMeta() == null)?null:_inhand.getItemMeta().getDisplayName();
      if (_stack == "M1-Garand"){
      _fireAgain=(_player== null)? null : (_player.getMetadata == null)?null:(_player.getMetadata("_fireagain_").length == 0)?null:_player.getMetadata("_fireagain_")[0].value();
      if ((new Date().getTime()) > _fireAgain){
      _projectile=server.worlds[0].spawnEntity(_player.location,org.bukkit.entity.EntityType.ARROW);_player.launchProjectile(_projectile.getClass());_fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,(new Date().getTime()) + 1000);
      if (_player != null) {
      if (_player.setMetadata != null ) {
      _player.setMetadata ("_fireagain_", _fd );
      }}}}
      }else if (event instanceof org.bukkit.event.entity.ProjectileLaunchEvent){
      _projectile=(event.getEntity== null) ? null : event.getEntity();_shooter=(_projectile == null) ? null : (_projectile.getShooter == null) ? null : _projectile.getShooter();_team=(_shooter== null)? null :(_shooter.getMetadata == null)?null:(_shooter.getMetadata("_team_").length == 0)?null:_shooter.getMetadata("_team_")[0].value();_fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,_team);
      if (_projectile != null) {if (_projectile.setMetadata != null ) {_projectile.setMetadata ("_team_", _fd );
      }}_fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,_shooter);if (_projectile != null) {if (_projectile.setMetadata != null ) {_projectile.setMetadata ("_owner_", _fd );}}
      _inhand=(_shooter== null) ? null : ( _shooter.getItemInHand == null) ? null : _shooter.getItemInHand();_stack=(_inhand== null) ? null : (_inhand.getItemMeta == null) ? null : (_inhand.getItemMeta() == null)?null:_inhand.getItemMeta().getDisplayName();
      if (stack == "M1-Garand"){(function() {var _vector = _projectile.getVelocity().normalize().multiply(7);if (!isNaN(_vector.x)){_projectile.setVelocity(_vector);}})();
      }}}());inhand=(player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand();
      name=(inhand== null) ? null : (inhand.getItemMeta == null) ? null : (inhand.getItemMeta() == null)?null:inhand.getItemMeta().getDisplayName();
      if (((name) == "minigun")){
        i=0;
        var test= setInterval (function () {
          i=i+1;
          projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.ARROW);
          player.launchProjectile(projectile.getClass());
          if (!(i <10)) {
            clearInterval (test);
          }
        }, 200);
      }
      else if (((name) == "flamethrower")){
        projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.WITHER_SKULL);
        player.launchProjectile(projectile.getClass());
      }
    });
    events.projectileLaunch( function (event) {
      projectile=(event.getEntity== null) ? null : event.getEntity();
      tagProjectile(event);
      (function (event) {var _player;var _inhand;var _stack;var _fireAgain;var _projectile;var _shooter;var _team;var _fd;
      if (event instanceof org.bukkit.event.player.PlayerInteractEvent){
      _player=(event.getPlayer== null) ? null : event.getPlayer();
      _inhand=(_player== null) ? null :(_player.getItemInHand == null)?null:_player.getItemInHand();
      _stack=(_inhand== null) ? null : (_inhand.getItemMeta == null) ? null : (_inhand.getItemMeta() == null)?null:_inhand.getItemMeta().getDisplayName();
      if (_stack == "M1-Garand"){
      _fireAgain=(_player== null)? null : (_player.getMetadata == null)?null:(_player.getMetadata("_fireagain_").length == 0)?null:_player.getMetadata("_fireagain_")[0].value();
      if ((new Date().getTime()) > _fireAgain){
      _projectile=server.worlds[0].spawnEntity(_player.location,org.bukkit.entity.EntityType.ARROW);_player.launchProjectile(_projectile.getClass());_fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,(new Date().getTime()) + 1000);
      if (_player != null) {
      if (_player.setMetadata != null ) {
      _player.setMetadata ("_fireagain_", _fd );
      }}}}
      }else if (event instanceof org.bukkit.event.entity.ProjectileLaunchEvent){
      _projectile=(event.getEntity== null) ? null : event.getEntity();_shooter=(_projectile == null) ? null : (_projectile.getShooter == null) ? null : _projectile.getShooter();_team=(_shooter== null)? null :(_shooter.getMetadata == null)?null:(_shooter.getMetadata("_team_").length == 0)?null:_shooter.getMetadata("_team_")[0].value();_fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,_team);
      if (_projectile != null) {if (_projectile.setMetadata != null ) {_projectile.setMetadata ("_team_", _fd );
      }}_fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,_shooter);if (_projectile != null) {if (_projectile.setMetadata != null ) {_projectile.setMetadata ("_owner_", _fd );}}
      _inhand=(_shooter== null) ? null : ( _shooter.getItemInHand == null) ? null : _shooter.getItemInHand();_stack=(_inhand== null) ? null : (_inhand.getItemMeta == null) ? null : (_inhand.getItemMeta() == null)?null:_inhand.getItemMeta().getDisplayName();
      if (stack == "M1-Garand"){(function() {var _vector = _projectile.getVelocity().normalize().multiply(7);if (!isNaN(_vector.x)){_projectile.setVelocity(_vector);}})();
      }}}());if (projectile.getShooter != null){
        shooter=projectile.getShooter();
        inhand=(player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand();
        name=(inhand== null) ? null : (inhand.getItemMeta == null) ? null : (inhand.getItemMeta() == null)?null:inhand.getItemMeta().getDisplayName();
        console.log ("In hand: " + name );
        if (((name) == "bazooka")){
          (function() {
            var vector = projectile.getVelocity().normalize().multiply(7);
            if (!isNaN(vector.x)) {
               projectile.setVelocity (vector);
            }
           })();
        }
      }
    });
    events.projectileHit( function (event) {
      projectile=(event.getEntity== null) ? null : event.getEntity();
      team=(projectile== null)? null : (projectile.getMetadata == null)?null:(projectile.getMetadata("_team_").length == 0)?null:projectile.getMetadata("_team_")[0].value();
      loc=projectile.location;
      if (function () { var _near;var _players;var _distance;_near=false;
      _players=server.getOnlinePlayers();
      for (var _i=0; _i<_players.length;_i++) {
      _distance=loc.distance(_players[_i].location);
      if(_distance <= 4){if ((team== ((_players[_i]== null)? null : (_players[_i].getMetadata == null)?null:(_players[_i].getMetadata("_team_").length == 0)?null:_players[_i].getMetadata("_team_")[0].value()))){_near=true;break;}}}
      return _near;}()){
        console.log ("Explosion too close to fiendly");
      }
      else {
        if (function(){var _found;var _block;var _loc;_found=false;
        for (var x=-4; x<parseInt(4*2); x++){for (var y=-4; y<parseInt(4*2); y++) {for (var z=-4; z<parseInt(4*2); z++) {
        _loc=(function() { var _x = loc.x + x;var _y = loc.y + y;var _z = loc.z + z;var _locBlockInRadius = new org.bukkit.Location(server.worlds[0],_x,_y,_z);return _locBlockInRadius; })();
        _block=server.worlds[0].getBlockAt (_loc);
        if ((((_block==null)?null:_block.getType()) == (org.bukkit.Material.CHEST))){
        _found=true;break;}}if (_found){break;}}if (_found){break;}}
        return _found;}()
        ){
          console.log ("Explosion too close to a chest");
        }
        else {
          if (function(){var _found;var _block;var _loc;_found=false;
          for (var x=-4; x<parseInt(4*2); x++){for (var y=-4; y<parseInt(4*2); y++) {for (var z=-4; z<parseInt(4*2); z++) {
          _loc=(function() { var _x = loc.x + x;var _y = loc.y + y;var _z = loc.z + z;var _locBlockInRadius = new org.bukkit.Location(server.worlds[0],_x,_y,_z);return _locBlockInRadius; })();
          _block=server.worlds[0].getBlockAt (_loc);
          if ((((_block==null)?null:_block.getType()) == (org.bukkit.Material.COMMAND_BLOCK))){
          _found=true;break;}}if (_found){break;}}if (_found){break;}}
          return _found;}()
          ){
            console.log ("Explosion too close to a command block");
          }
          else {
            if (((projectile.getType()) == (org.bukkit.entity.EntityType.SNOWBALL))){
              server.worlds[0].createExplosion (projectile.location,3);
            }
            if (projectile.getMetadata("_name_").length > 0){
              name=(projectile== null)? null : (projectile.getMetadata == null)?null:(projectile.getMetadata("_name_").length == 0)?null:projectile.getMetadata("_name_")[0].value();
              if (((name) == "bazooka")){
                server.worlds[0].createExplosion (projectile.location,3);
              }
            }
          }
        }
      }
    });
    events.entityShootBow( function (event) {
      shooter=(event.getEntity== null) ? null : event.getEntity();
      projectile=(event.getProjectile== null) ? null : event.getProjectile();
      bow=(event.getBow== null) ? null : event.getBow();
      bowName=(bow== null) ? null : (bow.getItemMeta == null) ? null : (bow.getItemMeta() == null)?null:bow.getItemMeta().getDisplayName();
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,bowName);
      if (projectile != null) {
        if (projectile.setMetadata != null ) {
          projectile.setMetadata ("_name_", fd );
        }
      }
      console.log ("Bow [" + bowName + "] fired by " + shooter);
    });
    events.playerDeath( function (event) {
      player=(event.getEntity== null) ? null : event.getEntity();
      gameOver=false;
      if (((player) == (exports.kings[0]))){
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"King Attacker has died\"");
        exports.kingsDead[0] = true;
        if (exports.kingsDead[2]){
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a Defenders Win!");
          gameOver=true;
        }
      }
      else if (((player) == (exports.kings[1]))){
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"King Defender has died\"");
        exports.kingsDead[1] = true;
        if (exports.kingsDead[3]){
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a Attackers Win!");
          gameOver=true;
        }
      }
      else if (((player) == (exports.kings[2]))){
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"King Airforce has died\"");
        exports.kingsDead[2] = true;
        if (exports.kingsDead[0]){
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a Defenders Win!");
          gameOver=true;
        }
      }
      else if (((player) == (exports.kings[3]))){
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"King Artillery has died\"");
        exports.kingsDead[3] = true;
        if (exports.kingsDead[1]){
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a Attackers Win!");
          gameOver=true;
        }
      }
      if (gameOver){
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a GAME OVER!");
        setTimeout (function () {
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @a");
        },5000);
      }
    });
    events.playerQuit( function (event) {
      player=(event.getPlayer== null) ? null : event.getPlayer();
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a " + player.name + " has quit the game");
      if (((player) == (exports.kings[0]))){
        exports.kingsDead[0]=true;
      }
      else if (((player) == (exports.kings[1]))){
        exports.kingsDead[1]=true;
      }
      else if (((player) == (exports.kings[2]))){
        exports.kingsDead[2]=true;
      }
      else if (((player) == (exports.kings[3]))){
        exports.kingsDead[3]=true;
      }
    });
    events.playerMove( function (event) {
      player=(event.getPlayer== null) ? null : event.getPlayer();
      blockType=(server.worlds[0].getBlockAt (player.location)==null)?null:server.worlds[0].getBlockAt (player.location).getType();
      if (((blockType) == (org.bukkit.Material.COBWEB))){
        if (player.getMetadata("_barbtime_").length > 0){
          barbTime=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_barbtime_").length == 0)?null:player.getMetadata("_barbtime_")[0].value();
          elapsedTime=(new Date().getTime()) - (barbTime);
          if (((elapsedTime) > 500)){
            (function() {
              if (player != null ) {
                 player.sendMessage ("Ouch! Mind the barbed wire!");
              }
             })();
            (function() {   var h=(player.getHealth()) - 1;
              if (player.setHealth != null) {
                if (h<0) {
                   h = 0;
                }
                player.setHealth(h);  }
             })();
            fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,new Date().getTime());
            if (player != null) {
              if (player.setMetadata != null ) {
                player.setMetadata ("_barbtime_", fd );
              }
            }
          }
        }
        else {
          fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,new Date().getTime());
          if (player != null) {
            if (player.setMetadata != null ) {
              player.setMetadata ("_barbtime_", fd );
            }
          }
        }
      }
    });
  }
};

exports.omahaBeachJoin = function (player) {
  setTimeout (function () {
    player.teleport(new org.bukkit.Location(server.worlds[0], -1203, 137, -106), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
  },2000);
  (function() {   var h=20;
    if (player.setHealth != null) {
      if (h<0) {
         h = 0;
      }
      player.setHealth(h);  }
   })();
  player.setGameMode(org.bukkit.GameMode.SURVIVAL);
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "spawnpoint " + player.name + " -1203 137 -106");
  player.getInventory().clear();
  omahaBeach();
};
