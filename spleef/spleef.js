exports.spleef  = function () {
  //Instantiations;
  var player;
  var block;
  if (((exports.gameStarted) == (null))){
    exports.gameStarted=1;
    events.playerRespawn( function (event) {
      player=(event.getPlayer== null) ? null : event.getPlayer();
      player.getInventory().clear();
      player.setGameMode(org.bukkit.GameMode.SURVIVAL);
      player.getInventory().setItem (0,new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOW_BLOCK,16) );
      player.getInventory().setItem (1,new org.bukkit.inventory.ItemStack (org.bukkit.Material.DIAMOND_SHOVEL,1) );
      setTimeout (function () {
        player.teleport(new org.bukkit.Location(server.worlds[0], 95, 15, 98), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
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
  setTimeout (function () {
    player.teleport(new org.bukkit.Location(server.worlds[0], 95, 15, 98), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
  },2000);
  player.setGameMode(org.bukkit.GameMode.SURVIVAL);
  player.getInventory().setItem (0,new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOW_BLOCK,16) );
  player.getInventory().setItem (1,new org.bukkit.inventory.ItemStack (org.bukkit.Material.DIAMOND_SHOVEL,1) );
  player.getInventory().clear();
  spleef();
};
