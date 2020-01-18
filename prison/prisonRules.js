exports.prisonRules = function () {
  //Instantiations;
  var player;
  var inhand;
  var name;
  var i;
  var projectile;
  var shooter;
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @e[type=wither]");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "weather clear");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "time set night");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule doWeatherCycle false");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule doDaylightCycle false");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "spawnpoint @a 121 87 -1139");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "deop @a");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp @a 121 87 1139");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "op " + self.name);
  // spawn org.bukkit.entity.EntityType.WITHER
  var location = new org.bukkit.Location(server.worlds[0], 122, 164, 1153);
  var entity = server.worlds[0].spawnEntity(location,org.bukkit.entity.EntityType.WITHER);
  events.playerRespawn( function (event) {
    player=event.getPlayer();
    setTimeout (function () {
      var player = player;
      var items = require ('items');
      player.equipment.helmet = items.diamondHelmet(1);
      player.equipment.boots = items.diamondBoots(1);
      player.equipment.chestplate = items.diamondChestplate(1);
      player.equipment.leggings = items.diamondLeggings(1);
    },3000);
    setTimeout (function () {
      player.teleport(new org.bukkit.Location(server.worlds[0], 121, 87, 1139), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
    },2000);
  });
  events.playerInteract( function (event) {
    player=event.getPlayer();
    inhand=(player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand();
    name=(inhand== null) ? null : (inhand.getItemMeta == null) ? null : (inhand.getItemMeta() == null)?null:inhand.getItemMeta().getDisplayName();
    if ((name) == "minigun"){
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
    else if ((name) == "M1-Garand"){
      console.log ("Handle M1-Garand");
      projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.ARROW);
      player.launchProjectile(projectile.getClass());
    }
    else {
      console.log ("Handle: [" + name + "]");
    }
  });
  events.projectileLaunch( function (event) {
    projectile=event.getEntity();
    shooter=(projectile == null) ? null : (projectile.getShooter == null) ? null : projectile.getShooter();
    inhand=(shooter== null) ? null : ( shooter.getItemInHand == null) ? null : shooter.getItemInHand();
    if ((inhand) == "M1-Garand"){
      (function() {
        var vector = projectile.getVelocity().normalize().multiply(7);
        if (!isNaN(vector.x)) {
           projectile.setVelocity (vector);
        }
       })();
    }
  });
  events.playerJoin( function (event) {
    player=event.getPlayer();
    setTimeout (function () {
      var player = player;
      var items = require ('items');
      player.equipment.helmet = items.diamondHelmet(1);
      player.equipment.boots = items.diamondBoots(1);
      player.equipment.chestplate = items.diamondChestplate(1);
      player.equipment.leggings = items.diamondLeggings(1);
    },3000);
  });
};
