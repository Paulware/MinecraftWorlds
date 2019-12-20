exports.startGame = function () {
  //Instantiations;
  var player;
  var block;
  var blockType;
  var line;
  setTimeout (function () {
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @a");
  },500);
  events.blockBreak( function (event) {
    event.cancelled = true;
  });
  events.playerRespawn( function (event) {
    player=event.player;
    setTimeout (function () {
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp " + player.name + " -1219 137 -91");
    },200);
  });
  events.playerInteract( function (event) {
    block=event.getClickedBlock();
    blockType=block.getType();
    if ((blockType) == (org.bukkit.Material.OAK_SIGN)){
      line=block.state.getLine(1);
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,line);
      event.player.setMetadata ("team", fd );
      event.player.sendMessage ("You have selected team: " + line);
    }
  });
};

exports.startGame()
