exports.startGame = function () {
  //Instantiations;
  var player;
  var block;
  var blockType;
  var team;
  var meta;
  var stack;
  var rpg;
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "weather clear");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "time set day");
  setTimeout (function () {
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @a");
  },500);
  events.blockBreak( function (event) {
    event.cancelled = true;
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
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp " + player.name + " -1219 137 -91");
    },200);
  });
  events.playerInteract( function (event) {
    block=event.getClickedBlock();
    if ((block) != (null)){
      blockType=block.getType();
      player=event.player;
      if ((blockType) == (org.bukkit.Material.OAK_SIGN)){
        team=block.state.getLine(1);
        fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,team);
        player.setMetadata ("team", fd );
        rpg=(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.ARROW,16);  var m = s.getItemMeta();  m.setDisplayName ("M6A3 (Armor Piercing)");  s.setItemMeta(m);  return s; })();
        player.getInventory().setItem (0,rpg );
        stack=new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1);
        player.getInventory().setItem (1,stack );
        if ((team) == "Attacker"){
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp " + player.name + " -1223 64 -505");
        }
        else if ((team) == "Defender"){
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp " + player.name + " -1224 84 -412");
        }
        else {
          player.sendMessage ("You have selected (unsupported) team: [" + line + "]");
        }
      }
    }
  });
};

exports.startGame()
