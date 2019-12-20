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
  });
  events.playerJoin( function (event) {
    player=event.player;
    player.sendMessage ("Sorry I have to kill you to make sure you go to the lobby (chop...chop)" );
    setTimeout (function () {
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill " + player.name);
    },2500);
  });
  events.playerJoin( function (event) {
    setTimeout (function () {
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill " + event.player);
    },500);
  });
  events.playerRespawn( function (event) {
    player=event.player;
    setTimeout (function () {
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp " + player.name + " 22 95 -258");
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
