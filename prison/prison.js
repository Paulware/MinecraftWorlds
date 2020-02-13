exports.prison = function () {
  //Instantiations;
  var player;
  var inhand;
  var name;
  var i;
  var projectile;
  var shooter;
  if (((exports.gameStarted) == (null))){
    exports.gameStarted=1;
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamemode survival @a");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @e[type=wither]");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "weather clear");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "time set night");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule keepInventory true");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule doWeatherCycle false");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule doDaylightCycle false");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "spawnpoint @a 10 65 1160");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "deop @a");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp @a 10 65 1160");
    players = server.getOnlinePlayers();
    for (var playersIndex=0; playersIndex<players.length; playersIndex++) {
      players[playersIndex].getInventory().clear();
    }
    // spawn org.bukkit.entity.EntityType.WITHER
    var location = new org.bukkit.Location(server.worlds[0], 122, 164, 1153);
    var entity = server.worlds[0].spawnEntity(location,org.bukkit.entity.EntityType.WITHER);
    events.playerRespawn( function (event) {
      player=(event.getPlayer()== null) ? null : event.getPlayer()();
      var player = player;
      var items = require ('items');
      player.equipment.helmet = items.diamondHelmet(1);
      player.equipment.boots = items.diamondBoots(1);
      player.equipment.chestplate = items.diamondChestplate(1);
      player.equipment.leggings = items.diamondLeggings(1);
      setTimeout (function () {
        player.teleport(new org.bukkit.Location(server.worlds[0], 10, 65, 1160), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      },2000);
    });
    events.playerInteract( function (event) {
      player=(event.getPlayer()== null) ? null : event.getPlayer()();
      inhand=(player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand();
      name=(inhand== null) ? null : (inhand.getItemMeta == null) ? null : (inhand.getItemMeta() == null)?null:inhand.getItemMeta().getDisplayName();
      if (((name) == "minigun")){
        console.log ("Handle minigun");
        i=0;
        var test= setInterval (function () {
          i=i+1;
          projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.ARROW);
          player.launchProjectile(projectile.getClass());
          if (!(i<20)) {
            clearInterval (test);
          }
        }, 150);
      }
      else if (((name) == "M1-Garand")){
        console.log ("Handle M1-Garand");
        projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.ARROW);
        player.launchProjectile(projectile.getClass());
      }
      else {
        console.log ("Handle: [" + name + "]");
      }
    });
    events.projectileLaunch( function (event) {
      projectile=(event.getEntity()== null) ? null : event.getEntity()();
      shooter=(projectile == null) ? null : (projectile.getShooter == null) ? null : projectile.getShooter();
      inhand=(shooter== null) ? null : ( shooter.getItemInHand == null) ? null : shooter.getItemInHand();
      if (((inhand) == "M1-Garand")){
        (function() {
          var vector = projectile.getVelocity().normalize().multiply(7);
          if (!isNaN(vector.x)) {
             projectile.setVelocity (vector);
          }
         })();
      }
    });
  }
};

exports.prisonJoin = function (player) {
  setTimeout (function () {
    player.teleport(new org.bukkit.Location(server.worlds[0], 10, 65, 1160), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
  },2000);
  prison();
};