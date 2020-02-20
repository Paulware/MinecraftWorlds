exports.spleef  = function () {
  //Instantiations;
  var objective;
  var player;
  var players;
  var score;
  var value;
  var block;
  if (((exports.gameStarted) == (null))){
    exports.gameStarted=1;
    var manager = org.bukkit.Bukkit.getScoreboardManager();
    exports.board = manager.getNewScoreboard();
    var objective = exports.board.registerNewObjective("objective1", "HEALTH", "Scoreboard");
    objective.setDisplaySlot(org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
    objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
    objective.setDisplayName("Welcome to Spleef yo");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "setworldspawn -87 14 132");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "setspawn -87 14 132");
    events.playerDeath( function (event) {
      player=(event.getPlayer== null) ? null : event.getPlayer();
      players=server.getOnlinePlayers();
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
          objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
          objective.getScore(players[i]).setScore(score);
          players[i].setScoreboard (exports.board);
        }
      };
    });
    events.playerRespawn( function (event) {
      player=(event.getPlayer== null) ? null : event.getPlayer();
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "effect give " + player.name + " instant_health 20");
      player.getInventory().clear();
      player.setGameMode(org.bukkit.GameMode.SURVIVAL);
      player.getInventory().setItem (0,new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOW_BLOCK,16) );
      player.getInventory().setItem (1,new org.bukkit.inventory.ItemStack (org.bukkit.Material.DIAMOND_SHOVEL,1) );
      setTimeout (function () {
        player.teleport(new org.bukkit.Location(server.worlds[0], -87, 14, 132), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      },2000);
    });
    events.blockBreak( function (event) {
      block=event.getBlock();
      if ((((block==null)?null:block.getType()) != (org.bukkit.Material.SNOW_BLOCK))){
        event.cancelled = true;
      }
    });
  }
};

exports.spleefJoin = function (player) {
  //Instantiations;
  var objective;
  fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,0);
  if (player != null) {
    if (player.setMetadata != null ) {
      player.setMetadata ("_score_", fd );
    }
  }
  setTimeout (function () {
    player.teleport(new org.bukkit.Location(server.worlds[0], -87, 14, 132), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
  },2000);
  player.setGameMode(org.bukkit.GameMode.SURVIVAL);
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "effect give " + player.name + " instant_health 20");
  player.getInventory().clear();
  player.getInventory().setItem (0,new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOW_BLOCK,16) );
  player.getInventory().setItem (1,new org.bukkit.inventory.ItemStack (org.bukkit.Material.DIAMOND_SHOVEL,1) );
  spleef();
  objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
  objective.getScore(player).setScore(0);
  player.setScoreboard (exports.board);
};
