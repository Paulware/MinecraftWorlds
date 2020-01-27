exports.towerDefense = function () {
  //Instantiations;
  var objective;
  var players;
  var player;
  var block;
  var line;
  var color;
  var meta;
  var stack;
  var inhand;
  var projectile;
  var item;
  var inventory;
  var blockType;
  var materialDropped;
  var value;
  var score;
  var team;
  var shooter;
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp @a 50 9 -914");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "spawnpoint @a 50 9 -914");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamemode survival @a");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "op " + self.name );
  exports.usa=0;
  exports.canada=0;
  var manager = org.bukkit.Bukkit.getScoreboardManager();
  exports.board = manager.getNewScoreboard();
  var objective = exports.board.registerNewObjective("objective1", "HEALTH", "Scoreboard");
  objective.setDisplaySlot(org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
  objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
  objective.setDisplayName("USA: " + exports.usa + " CANADA:" + exports.canada);
  players = server.getOnlinePlayers();
  for (var playersIndex=0; playersIndex<players.length; playersIndex++) {
    players[playersIndex].removeMetadata ("score", __plugin );
  }
  objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
  players = server.getOnlinePlayers();
  for (var playersIndex=0; playersIndex<players.length; playersIndex++) {
    objective.getScore(players[playersIndex]).setScore(0);
    players[playersIndex].setScoreboard (exports.board);
  }
  events.playerInteract( function (event) {
    player=event.getPlayer();
    block=event.getClickedBlock();
    line=(block==null)?null: (block.state.getLine == null)?null:block.state.getLine(1);
    if ((line) == "USA"){
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,"USA");
      player.setMetadata ("team", fd );
      color = org.bukkit.Color.BLUE;
      var player = player;
      var items = require ('items');
      var helmet = items.leatherHelmet(1);
      var helmetMeta = helmet.itemMeta;
      helmetMeta.color = color;
      helmet.itemMeta = helmetMeta;
      player.equipment.helmet = helmet;
      var boots = items.leatherBoots(1);
      var bootsMeta = boots.itemMeta;
      bootsMeta.color = color;
      boots.itemMeta = bootsMeta;
      player.equipment.boots = boots;
      var chest = items.leatherChestplate(1);
      var chestMeta = chest.itemMeta;
      chestMeta.color = color;
      chest.itemMeta = chestMeta;
      player.equipment.chestplate = chest;
      var legs = items.leatherLeggings(1);
      var legsMeta = legs.itemMeta;
      legsMeta.color = color;
      legs.itemMeta = legsMeta;
      player.equipment.leggings = legs;
      line=(block==null)?null: (block.state.getLine == null)?null:block.state.getLine(2);
      if ((line) == "Sniper"){
        player.getInventory().setItem (0,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,1);  var m = s.getItemMeta();  m.setDisplayName ("M1-Garand");  s.setItemMeta(m);  return s; })() );
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], 94, 21, -931), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
      else if ((line) == "Knight"){
        player.getInventory().setItem (0,new org.bukkit.inventory.ItemStack (org.bukkit.Material.DIAMOND_SWORD,1) );
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], 84, 12, -917), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
      else {
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], 84, 12, -917), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
    }
    else if ((line) == "Canada"){
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,"Canada");
      player.setMetadata ("team", fd );
      color = org.bukkit.Color.RED;
      var player = player;
      var items = require ('items');
      var helmet = items.leatherHelmet(1);
      var helmetMeta = helmet.itemMeta;
      helmetMeta.color = color;
      helmet.itemMeta = helmetMeta;
      player.equipment.helmet = helmet;
      var boots = items.leatherBoots(1);
      var bootsMeta = boots.itemMeta;
      bootsMeta.color = color;
      boots.itemMeta = bootsMeta;
      player.equipment.boots = boots;
      var chest = items.leatherChestplate(1);
      var chestMeta = chest.itemMeta;
      chestMeta.color = color;
      chest.itemMeta = chestMeta;
      player.equipment.chestplate = chest;
      var legs = items.leatherLeggings(1);
      var legsMeta = legs.itemMeta;
      legsMeta.color = color;
      legs.itemMeta = legsMeta;
      player.equipment.leggings = legs;
      line=(block==null)?null: (block.state.getLine == null)?null:block.state.getLine(2);
      if ((line) == "Sniper"){
        player.getInventory().setItem (0,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,1);  var m = s.getItemMeta();  m.setDisplayName ("M1-Garand");  s.setItemMeta(m);  return s; })() );
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], 16, 21, -903), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
      else if ((line) == "Knight"){
        player.getInventory().setItem (0,new org.bukkit.inventory.ItemStack (org.bukkit.Material.DIAMOND_SWORD,1) );
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], 25, 12, -915), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
      else {
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], 25, 12, -915), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
    }
    inhand=(player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand();
    stack=(inhand== null) ? null : (inhand.getItemMeta == null) ? null : (inhand.getItemMeta() == null)?null:inhand.getItemMeta().getDisplayName();
    if ((stack) == "M1-Garand"){
      projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.ARROW);
      player.launchProjectile(projectile.getClass());
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
        if ((inventory.location.x) == -6 && (inventory.location.z) == -919){
          (function () {
            var value = ( exports.canada==null)?0:exports.canada;
            exports.canada= value+1;
          })();
        }
        else {
          console.log (inventory.location);
          (function () {
            var value = ( exports.usa==null)?0:exports.usa;
            exports.usa= value+1;
          })();
        }
        objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
        objective.setDisplayName("USA: " + exports.usa + " CANADA:" + exports.canada);
        console.log ("Emerald was dropped in hopper success");
        score=(exports.lastDropper.getMetadata == null)?null:(exports.lastDropper.getMetadata("score").length == 0)?null:exports.lastDropper.getMetadata("score")[0].value();
        (function () {
          var value = ( score==null)?0:score;
          score= value+1;
        })();
        console.log ("New score: " + score );
        fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,score);
        exports.lastDropper.setMetadata ("score", fd );
        objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
        objective.getScore(exports.lastDropper).setScore(score);
        exports.lastDropper.setScoreboard (exports.board);
        if ((exports.usa) == 1){
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"USA Wins!\"");
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @a");
        }
        else if ((exports.canada) == 1){
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"Canada Wins!\"");
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @a");
        }
      }
    }
  });
  events.playerRespawn( function (event) {
    player=event.getPlayer();
    team=(player.getMetadata == null)?null:(player.getMetadata("team").length == 0)?null:player.getMetadata("team")[0].value();
    if ((team) == "USA"){
      setTimeout (function () {
        player.teleport(new org.bukkit.Location(server.worlds[0], 16, 21, -903), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      },2000);
    }
    else if ((team) == "Canada"){
      setTimeout (function () {
        player.teleport(new org.bukkit.Location(server.worlds[0], 25, 12, -915), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      },2000);
    }
  });
  events.playerJoin( function (event) {
    player=event.getPlayer();
    player.removeMetadata ("score", __plugin );
    setTimeout (function () {
      player.teleport(new org.bukkit.Location(server.worlds[0], 50, 10, -914), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
    },2000);
  });
  events.playerDropItem( function (event) {
    player=event.getPlayer();
    exports.lastDropper=player;
    console.log ("Player: " + player + " dropped an item");
  });
  events.projectileLaunch( function (event) {
    projectile=event.getEntity();
    shooter=(projectile == null) ? null : (projectile.getShooter == null) ? null : projectile.getShooter();
    inhand=(shooter== null) ? null : ( shooter.getItemInHand == null) ? null : shooter.getItemInHand();
    stack=(inhand== null) ? null : (inhand.getItemMeta == null) ? null : (inhand.getItemMeta() == null)?null:inhand.getItemMeta().getDisplayName();
    if ((stack) == "M1-Garand"){
      (function() {
        var vector = projectile.getVelocity().normalize().multiply(7);
        if (!isNaN(vector.x)) {
           projectile.setVelocity (vector);
        }
       })();
    }
  });
  events.blockBreak( function (event) {
    event.cancelled = true;
  });
};
