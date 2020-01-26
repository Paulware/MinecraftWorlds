exports.towerDefense = function () {
  //Instantiations;
  var player;
  var block;
  var line;
  var item;
  var inventory;
  var blockType;
  var materialDropped;
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp @a 50 9 -914");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "spawnpoint @a 50 9 -914");
  exports.manager = org.bukkit.Bukkit.getScoreboardManager();
  exports.board = exports.manager.getNewScoreboard();
  exports.teamUSA=exports.board.registerNewTeam("USA");
  exports.teamCanada=exports.board.registerNewTeam("Canada");
  exports.teamUSA.setAllowFriendlyFire (false);
  exports.teamCanada.setAllowFriendlyFire (false);
  events.playerDropItem( function (event) {
    player=event.getPlayer();
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
        console.log ("Emerald was dropped in hopper success");
      }
    }
  });
};
