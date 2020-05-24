exports.spleef  = function () {
  //Instantiations;
  var player;
  var objective;
  var players;
  var gameId;
  var block;
  var teamColor;
  var teams;
  var score;
  var value;
  var numTeams;
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kick @a restarting server");
  exports.gameId=null;
  exports.teams=[];
  exports.gameStarted=null;
  events.playerJoin( function (event) {
    player=(event.getPlayer== null) ? null : event.getPlayer();
    if (((exports.gameId) == (null))){
      console.log ("First pass for spleef server");
      exports.gameId=new Date().getTime();
      var manager = org.bukkit.Bukkit.getScoreboardManager();
      exports.board = manager.getNewScoreboard();
      var objective = exports.board.registerNewObjective("objective1", "HEALTH", "Scoreboard");
      objective.setDisplaySlot(org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
      objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
      objective.setDisplayName("Welcome to Spleef yo");
      // Update scoreboard for all players
      players=server.getOnlinePlayers();
      for (var playerIndex=0; playerIndex<players.length;playerIndex++) {
        score=(players[playerIndex]== null)? null : (players[playerIndex].getMetadata == null)?null:(players[playerIndex].getMetadata("_score_").length == 0)?null:players[playerIndex].getMetadata("_score_")[0].value();
        objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
        objective.getScore(players[playerIndex]).setScore(score);
        players[playerIndex].setScoreboard (exports.board);
      };
      objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
      players = server.getOnlinePlayers();
      for (var playersIndex=0; playersIndex<players.length; playersIndex++) {
        objective.getScore(players[playersIndex]).setScore(0);
        players[playersIndex].setScoreboard (exports.board);
      }
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "setworldspawn -73 29 80");
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "setspawn -73 29 80");
    }
    gameId=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_gameid_").length == 0)?null:player.getMetadata("_gameid_")[0].value();
    if (((gameId) != (exports.gameId))){
      console.log ("First pass for player in this game " + player.name);
      (function() {
        if (player != null ) {
           player.sendMessage ("Welcome to Spleef!");
        }
       })();
      player.removeMetadata ("_team_", __plugin );
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,exports.gameId);
      if (player != null) {
        if (player.setMetadata != null ) {
          player.setMetadata ("_gameid_", fd );
        }
      }
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,0);
      if (player != null) {
        if (player.setMetadata != null ) {
          player.setMetadata ("_score_", fd );
        }
      }
      if (player != null) {
        objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
        objective.getScore(player).setScore(0);
        player.setScoreboard (exports.board);
      }
      setTimeout (function () {
        player.teleport(new org.bukkit.Location(server.worlds[0], -73, 29, 80), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      },2000);
      player.setGameMode(org.bukkit.GameMode.SURVIVAL);
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "effect give " + player.name + " instant_health 20");
      player.getInventory().clear();
      player.getInventory().setItem (0,new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOW_BLOCK,16) );
      player.getInventory().setItem (1,new org.bukkit.inventory.ItemStack (org.bukkit.Material.DIAMOND_SHOVEL,1) );
    }
  });
  events.playerInteract( function (event) {
    player=(event.getPlayer== null) ? null : event.getPlayer();
    block=(event.getClickedBlock== null) ? null : event.getClickedBlock();
    if ((((block==null)?null:block.getType()) == (org.bukkit.Material.OAK_SIGN))){
      teamColor=(block==null)?null: (block.state.getLine == null)?null:block.state.getLine(1);
      if ((["ORANGE", "RED", "BLUE", "WHITE"].indexOf ( teamColor) >= 0)){
        if ((((player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_team_").length == 0)?null:player.getMetadata("_team_")[0].value()) == (null))){
          fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,teamColor);
          if (player != null) {
            if (player.setMetadata != null ) {
              player.setMetadata ("_team_", fd );
            }
          }
        }
        else {
          teamColor=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_team_").length == 0)?null:player.getMetadata("_team_")[0].value();
        }
      }
      if (((teamColor) == ("ORANGE"))){
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], -93, 16, 123), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
      else if (((teamColor) == ("BLUE"))){
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], -93, 16, 137), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
      else if (((teamColor) == ("WHITE"))){
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], -78, 16, 139), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
      else if (((teamColor) == ("RED"))){
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], -78, 16, 123), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
      if (! ((exports.teams.indexOf ( teamColor) >= 0))){
        exports.teams.push(teamColor)
        if ((len(exports.teams) > 1)){
          exports.gameStarted=true;
        }
      }
    }
  });
  events.playerDeath( function (event) {
    player=(event.getPlayer== null) ? null : event.getPlayer();
    players=server.getOnlinePlayers();
    teams=[];
    for (var i=0; i<players.length;i++) {
      (function() {
        if (players[i] != null ) {
           players[i].sendMessage (players[i].name + " died");
        }
       })();
      if (((players[i]) != (player))){
        score=(players[i]== null)? null : (players[i].getMetadata == null)?null:(players[i].getMetadata("_score_").length == 0)?null:players[i].getMetadata("_score_")[0].value();
        (function () {
          var value = ( score==null)?0:score;
          score= value+1;
        })();
        fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,score);
        if (players[i] != null) {
          if (players[i].setMetadata != null ) {
            players[i].setMetadata ("_score_", fd );
          }
        }
        if (player != null) {
          objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
          objective.getScore(players[i]).setScore(score);
          players[i].setScoreboard (exports.board);
        }
        teamColor=(players[i]== null)? null : (players[i].getMetadata == null)?null:(players[i].getMetadata("_team_").length == 0)?null:players[i].getMetadata("_team_")[0].value();
        if (! ((teams.indexOf ( teamColor) >= 0))){
          teams.push (teamColor)
        }
      }
    };
    numTeams=len(teams);
    if (((numTeams) == 1)){
      if (exports.gameStarted){
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a " + "Team " + teams[0] + " has won!" );
        org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kick @a game over " + teams[0] + " wins!");
      }
    }
  });
  events.playerRespawn( function (event) {
    player=(event.getPlayer== null) ? null : event.getPlayer();
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "effect give " + player.name + " instant_health 20");
    player.getInventory().clear();
    player.setGameMode(org.bukkit.GameMode.SURVIVAL);
    player.getInventory().setItem (0,new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOW_BLOCK,16) );
    player.getInventory().setItem (1,new org.bukkit.inventory.ItemStack (org.bukkit.Material.DIAMOND_SHOVEL,1) );
    teamColor=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_team_").length == 0)?null:player.getMetadata("_team_")[0].value();
    if (((teamColor) == (null))){
      setTimeout (function () {
        player.teleport(new org.bukkit.Location(server.worlds[0], -73, 29, 80), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      },2000);
    }
    else {
      if (((teamColor) == ("ORANGE"))){
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], -93, 16, 123), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
      else if (((teamColor) == ("BLUE"))){
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], -93, 16, 137), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
      else if (((teamColor) == ("WHITE"))){
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], -78, 16, 139), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
      else if (((teamColor) == ("RED"))){
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], -78, 16, 123), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
    }
  });
  events.blockBreak( function (event) {
    block=event.getBlock();
    if ((((block==null)?null:block.getType()) != (org.bukkit.Material.SNOW_BLOCK))){
      event.cancelled = true;
    }
  });
};
