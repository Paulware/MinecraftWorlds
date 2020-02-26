exports.battlefieldJoin  = function (player) {
  //Instantiations;
  var objective;
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp " + player.name + " 456 54 -1203");
  player.removeMetadata ("_team_", __plugin );
  battlefield();
  objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
  objective.getScore(player).setScore(0);
  player.setScoreboard (exports.board);
};

exports.battlefield = function () {
  //Instantiations;
  var objective;
  var x;
  var y;
  var z;
  var block;
  var blockType;
  var value;
  var player;
  var team;
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
        objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
        objective.setDisplayName("Battlefield Red Team:" + exports.redScore + "  Blue Team: " + exports.blueScore);
      };
      if (!(exports.gameStarted != null)) {
        clearInterval (yo);
      }
    }, 10000);
    events.blockBreak( function (event) {
      event.cancelled = true;
    });
    events.entityDamage( function (event) {
      cancelFriendlyDamage(event);
    });
    events.playerInteract( function (event) {
      player=(event.getPlayer== null) ? null : event.getPlayer();
      m1Garand(event);
      team=getTeamSign (event, ["Red","Blue"], 1) ;
      if (((team) == ("Red"))){
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp " + player.name + " 437 90 -1135");
      }
      else if (((team) == ("Blue"))){
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp " + player.name + " 508 66 -1262");
      }
      else {
        console.log ("Unknown team selected: " + team );
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
