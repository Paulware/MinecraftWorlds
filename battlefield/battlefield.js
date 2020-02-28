exports.battlefieldJoin  = function (player) {
  //Instantiations;
  var objective;
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp " + player.name + " 456 54 -1203");
  player.removeMetadata ("_team_", __plugin );
  fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,0);
  if (player != null) {
    if (player.setMetadata != null ) {
      player.setMetadata ("_score_", fd );
    }
  }
  battlefield();
  if (player != null) {
    objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
    objective.getScore(player).setScore(0);
    player.setScoreboard (exports.board);
  }
};

exports.battlefield = function () {
  //Instantiations;
  var objective;
  var players;
  var x;
  var y;
  var z;
  var block;
  var blockType;
  var value;
  var command;
  var player;
  var attacker;
  var score;
  var canBreak;
  var team;
  var color;
  var _player;
  var loc;
  if (((exports.gameStarted) == (null))){
    exports.gameStarted=1;
    exports.redScore=0;
    exports.blueScore=0;
    var manager = org.bukkit.Bukkit.getScoreboardManager();
    exports.board = manager.getNewScoreboard();
    var objective = exports.board.registerNewObjective("objective1", "HEALTH", "Scoreboard");
    objective.setDisplaySlot(org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
    objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
    objective.setDisplayName("Battlefield Red Team: 0  Blue Team: 0");
    // Update scoreboard for all players
    players=server.getOnlinePlayers();
    for (var playerIndex=0; playerIndex<players.length;playerIndex++) {
      score=(players[playerIndex]== null)? null : (players[playerIndex].getMetadata == null)?null:(players[playerIndex].getMetadata("_score_").length == 0)?null:players[playerIndex].getMetadata("_score_")[0].value();
      objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
      objective.getScore(players[playerIndex]).setScore(score);
      players[playerIndex].setScoreboard (exports.board);
    };
    exports.beacons=[];
    exports.beacons.push ( new org.bukkit.Location(server.worlds[0], 552, 102, -1115))
    exports.beacons.push ( new org.bukkit.Location(server.worlds[0], 573, 75, -1259))
    exports.beacons.push ( new org.bukkit.Location(server.worlds[0], 455, 64, -1306))
    exports.beacons.push ( new org.bukkit.Location(server.worlds[0], 353, 103, -1162))
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamemode survival @a");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "weather clear");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule doWeatherCycle false");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule keepInventory true");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule commandBlockOutput false");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "time set day");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule doDaylightCycle false");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "setworldspawn 456 54 -1203");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "spawnpoint @a 456 54 -1203");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp @a 456 54 -1203");
    for (var i=0; i<exports.beacons.length;i++) {
      x=exports.beacons[i].x;
      y=exports.beacons[i].y;
      z=exports.beacons[i].z;
      block=server.worlds[0].getBlockAt (new org.bukkit.Location(server.worlds[0], x, y, z));
      block.setType(org.bukkit.Material.AIR);
      block=server.worlds[0].getBlockAt (new org.bukkit.Location(server.worlds[0], x+1, y, z));
      block.setType(org.bukkit.Material.BLUE_STAINED_GLASS);
      block=server.worlds[0].getBlockAt (new org.bukkit.Location(server.worlds[0], x-1, y, z));
      block.setType(org.bukkit.Material.RED_STAINED_GLASS);
    };
    players = server.getOnlinePlayers();
    for (var playersIndex=0; playersIndex<players.length; playersIndex++) {
      players[playersIndex].getInventory().clear();
    }
    var yo= setInterval (function () {
      for (var i=0; i<exports.beacons.length;i++) {
        x=exports.beacons[i].x;
        y=exports.beacons[i].y;
        z=exports.beacons[i].z;
        block=server.worlds[0].getBlockAt (new org.bukkit.Location(server.worlds[0], x, y, z));
        blockType=(block==null)?null:block.getType();
        if (((blockType) == (org.bukkit.Material.BLUE_STAINED_GLASS))){
          (function () {
            var value = ( exports.blueScore==null)?0:exports.blueScore;
            exports.blueScore= value+1;
          })();
        }
        else if (((blockType) == (org.bukkit.Material.RED_STAINED_GLASS))){
          (function () {
            var value = ( exports.redScore==null)?0:exports.redScore;
            exports.redScore= value+1;
          })();
        }
        if (((exports.redScore) >= 100)){
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a " + "Red Team Wins! yo");
          exports.gameStarted=null;
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kick @a \"Red Team Wins! yo\"");
        }
        else if (((exports.blueScore) >= 100)){
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a " + "Blue Team Wins! yo");
          exports.gameStarted=null;
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kick @a \"Blue Team Wins! yo\"");
        }
      };
      objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
      objective.setDisplayName("Battlefield Red Team:" + exports.redScore + "  Blue Team: " + exports.blueScore);
      // Update scoreboard for all players
      players=server.getOnlinePlayers();
      for (var playerIndex=0; playerIndex<players.length;playerIndex++) {
        score=(players[playerIndex]== null)? null : (players[playerIndex].getMetadata == null)?null:(players[playerIndex].getMetadata("_score_").length == 0)?null:players[playerIndex].getMetadata("_score_")[0].value();
        objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
        objective.getScore(players[playerIndex]).setScore(score);
        players[playerIndex].setScoreboard (exports.board);
      };
      if (!(exports.gameStarted != null)) {
        clearInterval (yo);
      }
    }, 10000);
    events.playerCommandPreprocess( function (event) {
      command=(event.getMessage== null) ? null : event.getMessage();
      player=(event.getPlayer== null) ? null : event.getPlayer();
      console.log ("Player entered the command: [" + command + "]");
      if (((command) == "map")){
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "give " + player.name + " map 1" );
      }
    });
    events.playerDeath( function (event) {
      player=(event.getPlayer== null) ? null : event.getPlayer();
      attacker=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_attacker_").length == 0)?null:player.getMetadata("_attacker_")[0].value();
      score=(attacker== null)? null : (attacker.getMetadata == null)?null:(attacker.getMetadata("_score_").length == 0)?null:attacker.getMetadata("_score_")[0].value();
      (function () {
        var value = ( score==null)?0:score;
        score= value+1;
      })();
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,score);
      if (attacker != null) {
        if (attacker.setMetadata != null ) {
          attacker.setMetadata ("_score_", fd );
        }
      }
      if (player != null) {
        objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
        objective.getScore(attacker).setScore(score);
        attacker.setScoreboard (exports.board);
      }
    });
    events.blockBreak( function (event) {
      block=(event.getBlock== null) ? null : event.getBlock();
      blockType=(block==null)?null:block.getType();
      canBreak=[org.bukkit.Material.OAK_LOG, org.bukkit.Material.SAND];
      if ((canBreak.indexOf ( blockType) >= 0)){
        console.log ("Broken block: " + blockType);
      }
      else {
        console.log ("Can not break: [" + blockType + "]");
        event.cancelled = true;
      }
    });
    events.entityDamage( function (event) {
      cancelFriendlyDamage(event);
    });
    events.playerInteract( function (event) {
      m1Garand(event);
      minigun(event);
      team=getTeamSign (event, ["Red","Blue"], 1) ;
      player=(event.getPlayer== null) ? null : event.getPlayer();
      if (((team) == ("Red"))){
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
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp " + player.name + " 437 90 -1135");
      }
      else if (((team) == ("Blue"))){
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
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp " + player.name + " 508 66 -1262");
      }
    });
    events.projectileLaunch( function (event) {
      tagProjectile(event);
      m1Garand (event);
    });
    events.projectileHit( function (event) {
      team=((event.getEntity== null) ? null : event.getEntity()== null)? null : ((event.getEntity== null) ? null : event.getEntity().getMetadata == null)?null:((event.getEntity== null) ? null : event.getEntity().getMetadata("_team_").length == 0)?null:(event.getEntity== null) ? null : event.getEntity().getMetadata("_team_")[0].value();
      loc=event.entity.location;
      console.log ("Projectile has team: [" + team + "]" );
      if (friendlyNearby ( team, loc, 4)){
        console.log ("Explosion too close to friendly forces" );
      }
      else {
        if (locationNear (loc, exports.beacons, 6)){
          console.log ("explosion  too close to beacon");
        }
        else {
          explodeSnowballs(event);
        }
      }
    });
  }
};
