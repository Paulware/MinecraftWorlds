exports.towerDefense = function () {
  //Instantiations;
  var objective;
  var players;
  var player;
  var block;
  var line;
  var item;
  var inventory;
  var blockType;
  var materialDropped;
  var score;
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp @a 50 9 -914");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "spawnpoint @a 50 9 -914");
  exports.usa=0;
  exports.canada=0;
  var manager = org.bukkit.Bukkit.getScoreboardManager();
  exports.board = manager.getNewScoreboard();
  var objective = exports.board.registerNewObjective("objective1", "HEALTH", "Scoreboard");
  objective.setDisplaySlot(org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
  objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
  objective.setDisplayName("USA: " + exports.usa + " CANADA:" + exports.canada);
  objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
  objective.getScore(self).setScore(0);
  self.setScoreboard (exports.board);
  players = server.getOnlinePlayers();
  for (var playersIndex=0; playersIndex<players.length; playersIndex++) {
    players[playersIndex].removeMetadata ("score", __plugin );
  }
  events.playerDropItem( function (event) {
    player=event.getPlayer();
    exports.lastDropper=player;
    console.log ("Player: " + player + " dropped an item");
  });
  events.playerInteract( function (event) {
    player=event.getPlayer();
    block=event.getClickedBlock();
    line=(block==null)?null: (block.state.getLine == null)?null:block.state.getLine(1);
    if ((line) == "USA"){
      exports.teamUSA.addPlayer (player);
      console.log ("Added " + player.name + " to team USA");
    }
    else if ((line) == "Canada"){
      exports.teamCanada.addPlayer (player);
      console.log ("Added " + player.name + " to team Canada");
    }
  });
  events.inventoryPickupItem( function (event) {
    item=event.getItem();
    inventory=event.getInventory();
    block=server.worlds[0].getBlockAt (inventory.location);
    blockType=(block==null)?null:block.getType();
    if ((blockType) == (org.bukkit.Material.HOPPER)){
      materialDropped=(item.getItemStack() == null ) ? null : (item.getItemStack().getType == null) ? null : item.getItemStack().getType();
      if ((materialDropped) == (org.bukkit.Material.EMERALD)){
        exports.usa=exports.usa + 1;
        if ((exports.usa) == 10){
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a Game Over USA has won!");
        }
        objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
        objective.setDisplayName("USA: " + exports.usa + " CANADA:" + exports.canada);
        console.log ("Emerald was dropped in hopper success");
        if (exports.lastDropper.getMetadata("score").length > 0){
          score=(exports.lastDropper.getMetadata == null)?null:(exports.lastDropper.getMetadata("score").length == 0)?null:exports.lastDropper.getMetadata("score")[0].value();
        }
        else {
          score=0;
        }
        score=score+1;
        console.log ("New score: " + score );
        fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,score);
        exports.lastDropper.setMetadata ("score", fd );
        objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
        objective.getScore(exports.lastDropper).setScore(score);
        exports.lastDropper.setScoreboard (exports.board);
      }
    }
  });
  events.playerRespawn( function (event) {
    player=event.getPlayer();
    if (player.getMetadata("score").length > 0){
      score=(player.getMetadata == null)?null:(player.getMetadata("score").length == 0)?null:player.getMetadata("score")[0].value();
    }
    else {
      score=0;
    }
    objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
    objective.getScore(player).setScore(score);
    player.setScoreboard (exports.board);
  });
  events.playerJoin( function (event) {
    player=event.getPlayer();
    player.removeMetadata ("score", __plugin );
    objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
    objective.setDisplayName("USA: " + exports.usa + " CANADA:" + exports.canada);
    objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
    objective.getScore(self).setScore(0);
    self.setScoreboard (exports.board);
  });
};
