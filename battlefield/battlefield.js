exports.teamBeacon  = function (location) {
  //Instantiations;
  var block;
  var data;
  var sign;
  var _data;
  var _block;
  server.worlds[0].getBlockAt ((function() { var x = location.x + -1;var y = location.y + -1;var z = location.z + 1;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x + 0;var y = location.y + -1;var z = location.z + 1;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x + 1;var y = location.y + -1;var z = location.z + 1;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x + -1;var y = location.y + -1;var z = location.z + -1;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x + 0;var y = location.y + -1;var z = location.z + -1;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x + 1;var y = location.y + -1;var z = location.z + -1;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x + -1;var y = location.y + -1;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x + 1;var y = location.y + -1;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x + 0;var y = location.y + -1;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt (location).setType (org.bukkit.Material.BEACON);
  server.worlds[0].getBlockAt ((function() { var x = location.x + 1;var y = location.y + 0;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.IRON_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x + -1;var y = location.y + 0;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.IRON_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x + 2;var y = location.y + 0;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.IRON_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x + 3;var y = location.y + 0;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.IRON_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x + 3;var y = location.y + 1;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.OAK_BUTTON);
  server.worlds[0].getBlockAt ((function() { var x = location.x + -2;var y = location.y + 0;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.IRON_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x + -3;var y = location.y + 0;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.IRON_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x + -3;var y = location.y + 1;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.OAK_BUTTON);
  server.worlds[0].getBlockAt ((function() { var x = location.x + 2;var y = location.y + 1;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.PISTON);
  server.worlds[0].getBlockAt ((function() { var x = location.x + 1;var y = location.y + 1;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.BLUE_STAINED_GLASS);
  _block = server.worlds[0].getBlockAt ((function() { var x = location.x + 2;var y = location.y + 1;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })())
  _data = _block.getBlockData();
  _data.setFacing(org.bukkit.block.BlockFace.WEST)
  _block.setBlockData(_data)
  server.worlds[0].getBlockAt ((function() { var x = location.x + -2;var y = location.y + 1;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.PISTON);
  _block = server.worlds[0].getBlockAt ((function() { var x = location.x + -2;var y = location.y + 1;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })())
  _data = _block.getBlockData();
  _data.setFacing(org.bukkit.block.BlockFace.EAST)
  _block.setBlockData(_data)
  server.worlds[0].getBlockAt ((function() { var x = location.x + -1;var y = location.y + 1;var z = location.z + 0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);return loc; })()).setType (org.bukkit.Material.RED_STAINED_GLASS);
};

exports.nearFriendly  = function ( player, location, radius) {
  //Instantiations;
  var near;
  var players;
  var distance;
  near=false;
  players=server.getOnlinePlayers();
  for (var i=0; i<players.length;i++) {
    if (((player) != (players[i]))){
      distance=location.distance(players[i].location);
      if (((distance) <= (radius))){
        near=true;
        break;}
    }
  };
  return near;
};

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
  var beacons;
  var x;
  var y;
  var z;
  var block;
  var blockType;
  var value;
  var player;
  var team;
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
    beacons=[[552,102,-1115],[573,75,-1259],[455,64,-1306],[353,103,-1162]];
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
    var yo= setInterval (function () {
      for (var i=0; i<beacons.length;i++) {
        x=beacons[i][0];
        y=beacons[i][1];
        z=beacons[i][2];
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
      m1Garand (event);
    });
  }
};
