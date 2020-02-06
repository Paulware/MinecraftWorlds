exports.towerDefense = function () {
  //Instantiations;
  var objective;
  var players;
  var target;
  var team1;
  var attacker;
  var team2;
  var player;
  var block;
  var line;
  var team;
  var color;
  var items;
  var meta;
  var stack;
  var inhand;
  var projectile;
  var item;
  var owner;
  var inventory;
  var blockType;
  var materialDropped;
  var value;
  var score;
  var shooter;
  players = server.getOnlinePlayers();
  for (var playersIndex=0; playersIndex<players.length; playersIndex++) {
    players[playersIndex].getInventory().clear();
  }
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule keepInventory true");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp @a 50 9 -914");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "spawnpoint @a 50 9 -914");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamemode survival @a");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "op " + self.name );
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "effect give @a instant_health");
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
  players = server.getOnlinePlayers();
  for (var playersIndex=0; playersIndex<players.length; playersIndex++) {
    players[playersIndex].removeMetadata ("team", __plugin );
  }
  objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
  players = server.getOnlinePlayers();
  for (var playersIndex=0; playersIndex<players.length; playersIndex++) {
    objective.getScore(players[playersIndex]).setScore(0);
    players[playersIndex].setScoreboard (exports.board);
  }
  events.entityDamage( function (event) {
    target=(event.getEntity== null) ? null : event.getEntity();
    team1=(target== null)? null : (target.getMetadata == null)?null:(target.getMetadata("team").length == 0)?null:target.getMetadata("team")[0].value();
    attacker=(event.getDamager== null) ? null : event.getDamager();
    team2=(attacker== null)? null : (attacker.getMetadata == null)?null:(attacker.getMetadata("team").length == 0)?null:attacker.getMetadata("team")[0].value();
    if (((team1) == (null)) || ((team2) == (null))){
      console.log ("Got a null team");
    }
    else {
      if (((team1) == (team2))){
        (function() {
          if (attacker != null ) {
             attacker.sendMessage ("Ouch we are on the same team yo");
          }
         })();
        event.cancelled = true;
      }
      else {
        console.log ("Different teams damage[" + team1 + "," + team2 + "]");
      }
    }
  });
  events.playerInteract( function (event) {
    player=(event.getPlayer== null) ? null : event.getPlayer();
    block=(event.getClickedBlock== null) ? null : event.getClickedBlock();
    line=(block==null)?null: (block.state.getLine == null)?null:block.state.getLine(1);
    if (player.getMetadata("team").length > 0){
      if (((line) == "USA") || ((line) == "Canada")){
        team=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("team").length == 0)?null:player.getMetadata("team")[0].value();
        (function() {
          if (player != null ) {
             player.sendMessage ("You already selected team: " + team);
          }
         })();
      }
    }
    else {
      if (((line) == "USA")){
        (function() {   var h=20;
          if (player.setHealth != null) {
            if (h<0) {
               h = 0;
            }
            player.setHealth(h);  }
         })();
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
        player = player;
        items = require ('items');
        player.equipment.helmet = items.diamondHelmet(1);
        line=(block==null)?null: (block.state.getLine == null)?null:block.state.getLine(2);
        if (((line) == "Sniper")){
          player.getInventory().setItem (0,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,1);  var m = s.getItemMeta();  m.setDisplayName ("M1-Garand");  s.setItemMeta(m);  return s; })() );
          setTimeout (function () {
            player.teleport(new org.bukkit.Location(server.worlds[0], 94, 21, -931), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
          player.setWalkSpeed(0.2)
        }
        else if (((line) == "Knight")){
          player.getInventory().setItem (0,new org.bukkit.inventory.ItemStack (org.bukkit.Material.DIAMOND_SWORD,1) );
          setTimeout (function () {
            player.teleport(new org.bukkit.Location(server.worlds[0], 84, 12, -917), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
          player.setWalkSpeed(0.2)
        }
        else {
          player = player;
          items = require ('items');
          player.equipment.boots = items.goldenBoots(1);
          setTimeout (function () {
            player.teleport(new org.bukkit.Location(server.worlds[0], 84, 12, -917), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
          player.setWalkSpeed(0.5)
        }
      }
      else if (((line) == "Canada")){
        (function() {   var h=20;
          if (player.setHealth != null) {
            if (h<0) {
               h = 0;
            }
            player.setHealth(h);  }
         })();
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
        player = player;
        items = require ('items');
        player.equipment.helmet = items.diamondHelmet(1);
        line=(block==null)?null: (block.state.getLine == null)?null:block.state.getLine(2);
        if (((line) == "Sniper")){
          player.getInventory().setItem (0,(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,1);  var m = s.getItemMeta();  m.setDisplayName ("M1-Garand");  s.setItemMeta(m);  return s; })() );
          setTimeout (function () {
            player.teleport(new org.bukkit.Location(server.worlds[0], 16, 21, -903), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
          player.setWalkSpeed (0.2)
        }
        else if (((line) == "Knight")){
          player.getInventory().setItem (0,new org.bukkit.inventory.ItemStack (org.bukkit.Material.DIAMOND_SWORD,1) );
          setTimeout (function () {
            player.teleport(new org.bukkit.Location(server.worlds[0], 25, 12, -915), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
          player.setWalkSpeed (0.2)
        }
        else {
          player = player;
          items = require ('items');
          player.equipment.boots = items.goldenBoots(1);
          setTimeout (function () {
            player.teleport(new org.bukkit.Location(server.worlds[0], 25, 12, -915), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
          player.setWalkSpeed (0.5)
        }
      }
    }
    inhand=(player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand();
    stack=(inhand== null) ? null : (inhand.getItemMeta == null) ? null : (inhand.getItemMeta() == null)?null:inhand.getItemMeta().getDisplayName();
    if (((stack) == "M1-Garand")){
      projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.ARROW);
      player.launchProjectile(projectile.getClass());
    }
  });
  events.inventoryPickupItem( function (event) {
    item=(event.getItem== null) ? null : event.getItem();
    owner=(item== null)? null : (item.getMetadata == null)?null:(item.getMetadata("owner").length == 0)?null:item.getMetadata("owner")[0].value();
    inventory=(event.getInventory== null) ? null : event.getInventory();
    block=server.worlds[0].getBlockAt (inventory.location);
    blockType=(block==null)?null:block.getType();
    if (((blockType) == (org.bukkit.Material.HOPPER))){
      materialDropped=(item.getItemStack() == null ) ? null : (item.getItemStack().getType == null) ? null : item.getItemStack().getType();
      if (((materialDropped) == (org.bukkit.Material.EMERALD))){
        if (((inventory.location.x) == -6) && ((inventory.location.z) == -919)){
          (function () {
            var value = ( exports.canada==null)?0:exports.canada;
            exports.canada= value+1;
          })();
        }
        else {
          (function () {
            var value = ( exports.usa==null)?0:exports.usa;
            exports.usa= value+1;
          })();
        }
        objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
        objective.setDisplayName("USA: " + exports.usa + " CANADA:" + exports.canada);
        score=(owner== null)? null : (owner.getMetadata == null)?null:(owner.getMetadata("score").length == 0)?null:owner.getMetadata("score")[0].value();
        (function () {
          var value = ( score==null)?0:score;
          score= value+1;
        })();
        fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,score);
        owner.setMetadata ("score", fd );
        objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
        objective.getScore(owner).setScore(score);
        owner.setScoreboard (exports.board);
        if (((exports.usa) == 100)){
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"USA Wins!\"");
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @a");
        }
        else if (((exports.canada) == 100)){
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"Canada Wins!\"");
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @a");
        }
        item.remove()
        event.cancelled = true;
      }
    }
  });
  events.playerRespawn( function (event) {
    player=(event.getPlayer== null) ? null : event.getPlayer();
    player = player;
    items = require ('items');
    player.equipment.helmet = items.diamondHelmet(1);
    team=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("team").length == 0)?null:player.getMetadata("team")[0].value();
    if (((team) == "USA")){
      setTimeout (function () {
        player.teleport(new org.bukkit.Location(server.worlds[0], 84, 12, -917), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      },2000);
    }
    else if (((team) == "Canada")){
      setTimeout (function () {
        player.teleport(new org.bukkit.Location(server.worlds[0], 25, 12, -915), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      },2000);
    }
  });
  events.playerJoin( function (event) {
    player=(event.getPlayer== null) ? null : event.getPlayer();
    player.setWalkSpeed (0.2)
    player.getInventory().clear();
    player.removeMetadata ("score", __plugin );
    player.removeMetadata ("team", __plugin );
    setTimeout (function () {
      player.teleport(new org.bukkit.Location(server.worlds[0], 50, 10, -914), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
    },2000);
    player.setGameMode(org.bukkit.GameMode.SURVIVAL);
  });
  events.playerDropItem( function (event) {
    player=(event.getPlayer== null) ? null : event.getPlayer();
    item=(event.getItemDrop== null) ? null : event.getItemDrop();
    fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,player);
    item.setMetadata ("owner", fd );
    console.log ("Player: " + player.name + " dropped an item: " );
  });
  events.projectileLaunch( function (event) {
    projectile=(event.getEntity== null) ? null : event.getEntity();
    shooter=(projectile == null) ? null : (projectile.getShooter == null) ? null : projectile.getShooter();
    team=(shooter== null)? null : (shooter.getMetadata == null)?null:(shooter.getMetadata("team").length == 0)?null:shooter.getMetadata("team")[0].value();
    fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,team);
    projectile.setMetadata ("team", fd );
    inhand=(shooter== null) ? null : ( shooter.getItemInHand == null) ? null : shooter.getItemInHand();
    stack=(inhand== null) ? null : (inhand.getItemMeta == null) ? null : (inhand.getItemMeta() == null)?null:inhand.getItemMeta().getDisplayName();
    if (((stack) == "M1-Garand")){
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
