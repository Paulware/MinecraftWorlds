exports.goPirate = function (player) {
  //Instantiations;
  var location;
  var entity;
  var TeleportCause;
  player.teleport(new org.bukkit.Location(server.worlds[0], -161, 86, -356), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
};

exports.goAirWar = function (side) {
  if (side == 0){
    goPirate(self);
  }
  else if (side == 1){
    goEmpire(self);
  }
};

exports.goEmpire = function (player) {
  //Instantiations;
  var location;
  var entity;
  var TeleportCause;
  player.teleport(new org.bukkit.Location(server.worlds[0], -515, 97, 358), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
};

exports.handleClick = function (event) {
  //Instantiations;
  var inhand;
  var block;
  var list;
  var entities;
  var location;
  var entity;
  var owner;
  inhand=event.player.getItemInHand().getItemMeta().getDisplayName();
  block=event.player.getTargetBlock(null,200);
  if ((inhand) == ("control")){
    list=server.worlds[0].getNearbyEntities (block.location,5,5,5);
    entities=[];
    for (var i=0; i<parseInt(list.length); i++) {
      if (! (list[i] instanceof org.bukkit.entity.Player)){
        fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,event.player);
        list[i].setMetadata ("owner", fd );
        entities.push(list[i])
        event.player.sendMessage ("Controlling: " + list[i]);
      }
    }
    fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,entities);
    event.player.setMetadata ("entities", fd );
    event.player.sendMessage ("Now Controlling " + entities.length + " entities");
  }
  else if ((inhand) == ("attack")){
    location=block.location.add (0,1,0);
    entity = null;
    entities = server.worlds[0].getEntities();
    for (var i = 0; i<entities.length; i++) {
      if (entities[i].location.distance (location) < 4) {
         entity = entities[i];
         break;
      }
    }
    if (entity==null){
      event.player.sendMessage ("Did not find an entity to attack yo");
    }
    else {
      event.player.sendMessage ("Attack: " + entity);
      entities=(!(event.player instanceof org.bukkit.entity.LivingEntity))?null:(event.player.getMetadata == null)?null:(event.player.getMetadata("entities").length == 0)?null:event.player.getMetadata("entities")[0].value();
      if (entities==null){
        event.player.sendMessage ("No entities controlled yet yo");
      }
      else {
        for (var i=0; i<parseInt(entities.length); i++) {
          owner=(!(entities[i] instanceof org.bukkit.entity.LivingEntity))?null:(entities[i].getMetadata == null)?null:(entities[i].getMetadata("owner").length == 0)?null:entities[i].getMetadata("owner")[0].value();
          if (owner == entity){
            event.player.sendMessage ("Do not attack yourself yo");
          }
          else {
            entities[i].setTarget (entity)
            event.player.sendMessage (entities[i] + " attacking " + entity);
          }
        }
      }
    }
  }
};

exports.airWars = function () {
  //Instantiations;
  var meta;
  var stack;
  var player;
  var item;
  var name;
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp @a 1 4 -1996");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamemode survival @a");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "weather clear");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "time set day");
  server.worlds[0].setSpawnLocation(new org.bukkit.Location(server.worlds[0], 1, 5, 1000));
  self.getInventory().clear();
  stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,10);
  meta = stack.getItemMeta()
  meta.setDisplayName ("up");
  stack.setItemMeta(meta);
  self.getInventory().setItem (2,stack );
  events.playerInteract( function (event) {
    handleClick (event);
  });
  events.entityDamage( function (event) {
    event.cancelled = true;
  });
  events.playerRespawn( function (event) {
    stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,1);
    meta = stack.getItemMeta()
    meta.setDisplayName ("attack");
    stack.setItemMeta(meta);
    event.player.getInventory().setItem (0,stack );
    stack=(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,1);  var m = s.getItemMeta();  m.setDisplayName ("control");  s.setItemMeta(m);  return s; })();
    event.player.getInventory().setItem (1,stack );
  });
  events.playerItemConsume( function (event) {
    player=event.player;
    item=event.getItem();
    if ((item.getType()) == (org.bukkit.Material.POTION)){
      name=(item== null) ? "" : (item.getItemMeta == null ) ? "" : item.getItemMeta().getDisplayName();
      console.log ("Consumed item with name:[" + name + "]" );
      if (name == "up"){
        airWarUp(player);
      }
      else if (name == "home"){
        goPirate(player);
      }
    }
  });
};

exports.airWarUp  = function (player) {
  //Instantiations;
  var stack;
  var meta;
  var location;
  var entity;
  var TeleportCause;
  stack=new org.bukkit.inventory.ItemStack (org.bukkit.Material.LEGACY_ELYTRA,1);
  player.getInventory().setItem (8,stack );
  stack=new org.bukkit.inventory.ItemStack (org.bukkit.Material.FIREWORK_ROCKET,16);
  player.getInventory().setItem (7,stack );
  stack=new org.bukkit.inventory.ItemStack (org.bukkit.Material.COMPASS,1);
  player.getInventory().setItem (6,stack );
  stack=(function() {   var s = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,1);  var m = s.getItemMeta();  m.setDisplayName ("home");  s.setItemMeta(m);  return s; })();
  player.getInventory().setItem (5,stack );
  player.addPotionEffect(new org.bukkit.potion.PotionEffect (org.bukkit.potion.PotionEffectType.SLOW_FALLING,200, 1));
  player.sendMessage ("You have been given slow falling for 10 seconds to put on the elytra glider");
  player.teleport(player.location.add (0, 100, 0), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
};
