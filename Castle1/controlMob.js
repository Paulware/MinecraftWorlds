exports.dropChest = function () {
  //Instantiations;
  var location;
  var block;
  var data;
  var loc;
  var sign;
  var state;
  var inventory;
  var stack;
  var eggs;
  console.log ("populateChest");
  location=self.location.add(1,0,1);
  server.worlds[0].getBlockAt (location).setType (org.bukkit.Material.CHEST);
  block=server.worlds[0].getBlockAt (location);
  state=block.getState();
  inventory=state.getBlockInventory();
  stack=new org.bukkit.inventory.ItemStack (org.bukkit.Material.BOW,1);
  inventory.addItem(stack)
  stack=new org.bukkit.inventory.ItemStack (org.bukkit.Material.ARROW,16);
  inventory.addItem(stack)
  stack=new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOWBALL,5);
  inventory.addItem(stack)
  stack=new org.bukkit.inventory.ItemStack (org.bukkit.Material.ENCHANTED_GOLDEN_APPLE,2);
  inventory.addItem(stack)
  // Add SPLASH_POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,5);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('destroy');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  inventory.addItem(stack)
  // Add SPLASH_POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,5);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('control');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  inventory.addItem(stack)
  // Add POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,5);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('wither');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  inventory.addItem(stack)
  eggs=[org.bukkit.Material.BLAZE_SPAWN_EGG, org.bukkit.Material.ENDERMAN_SPAWN_EGG, org.bukkit.Material.ENDERMITE_SPAWN_EGG, org.bukkit.Material.WOLF_SPAWN_EGG, org.bukkit.Material.CREEPER_SPAWN_EGG, org.bukkit.Material.GHAST_SPAWN_EGG, org.bukkit.Material.HUSK_SPAWN_EGG, org.bukkit.Material.VEX_SPAWN_EGG, org.bukkit.Material.LLAMA_SPAWN_EGG, org.bukkit.Material.SHULKER_SPAWN_EGG, org.bukkit.Material.ZOMBIE_PIGMAN_SPAWN_EGG, org.bukkit.Material.ZOMBIE_SPAWN_EGG, org.bukkit.Material.RAVAGER_SPAWN_EGG, org.bukkit.Material.POLAR_BEAR_SPAWN_EGG, org.bukkit.Material.ZOMBIE_VILLAGER_SPAWN_EGG, org.bukkit.Material.PILLAGER_SPAWN_EGG, org.bukkit.Material.VINDICATOR_SPAWN_EGG, org.bukkit.Material.CAVE_SPIDER_SPAWN_EGG, org.bukkit.Material.SKELETON_HORSE_SPAWN_EGG];
  for (var i=0; i<parseInt(eggs.length); i++) {
    stack=new org.bukkit.inventory.ItemStack (eggs[i],1);
    inventory.addItem(stack)
  }
};

exports.defendMe  = function (player, target) {
  //Instantiations;
  var entities;
  var entity;
  if (! (player.getMetadata("entities").length > 0)){
    console.log (player.name + "controls no entities to defend him");
  }
  else {
    entities=player.getMetadata("entities")[0].value();
    console.log ("defendMe, focus " + entities.length + " on new target:" + target);
    for (var i=0; i<parseInt(entities.length); i++) {
      entity=entities[i];
      if (target instanceof org.bukkit.entity.LivingEntity){
        if (entity.setTarget != null){
          entity.setTarget (target);
        }
        if (entity.setAI != null){
          entity.setAI(true)
        }
      }
    }
  }
};

exports.nearestPlayer  = function (location) {
  //Instantiations;
  var player;
  var players;
  var minDistance;
  var playerLocation;
  var distance;
  player=null;
  players=server.getOnlinePlayers();
  minDistance=100000;
  for (var i=0; i<parseInt(players.length); i++) {
    playerLocation=players[i].location;
    distance=location.distance(playerLocation);
    if (distance<minDistance){
      minDistance=distance;
      player=players[i];
    }
  }
  return player;
};

exports.controlMob = function () {
  //Instantiations;
  var players;
  var player;
  var inventory;
  var creature;
  var location;
  var reason;
  var target;
  var attacker;
  var item;
  var name;
  var potions;
  var entities;
  var count;
  var x;
  var z;
  var entity;
  var block;
  var TeleportCause;
  var projectile;
  var shooter;
  players=server.getOnlinePlayers();
  for (var i=0; i<parseInt(players.length); i++) {
    player=players[i];
    if (player.getMetadata("entities").length > 0){
      player.removeMetadata ("entities", __plugin );
    }
  }
  events.playerRespawn( function (event) {
    event.player.inventory.addItem ((new org.bukkit.inventory.ItemStack (org.bukkit.Material.BOW,1)));
    event.player.inventory.addItem ((new org.bukkit.inventory.ItemStack (org.bukkit.Material.ARROW,64)));
    inventory=event.player.inventory;
    // Add SPLASH_POTION to inventory
    var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,5);
    var meta = newItems.getItemMeta();
    meta.setDisplayName('control');
    newItems.setItemMeta(meta);
    inventory.addItem(newItems);
  });
  events.creatureSpawn( function (event) {
    creature=event.getEntity();
    location=creature.location;
    if (event.getSpawnReason != null){
      reason=event.getSpawnReason().toString();
      if (reason=="SPAWNER_EGG"){
        console.log ("Egg spawned at" + location);
        player=nearestPlayer (location);
        console.log ("Set " + player.name + " as master");
        addControlCritter (creature,player);
      }
    }
  });
  events.entityDamage( function (event) {
    target=event.getEntity();
    if (event.getDamager != null){
      if (target instanceof org.bukkit.entity.Player){
        attacker=event.getDamager();
        if (oneOfMine(target,attacker)){
          console.log ("My minion attacked me (how is this possible)");
          if (entity.setAI != null){
            entity.setAI(false)
          }
          event.cancelled = true;
        }
        else {
          defendMe (target,attacker)
        }
      }
    }
  });
  events.entityTarget( function (event) {
    target=event.target;
    attacker=event.entity;
    if (oneOfMine(target,attacker)){
      console.log ("Bad minion targetting me, get back!");
      entity.setAI(false)
      event.cancelled = true;
    }
    else if (target instanceof org.bukkit.entity.Player){
      defendMe (target,attacker);
    }
  });
  events.playerItemConsume( function (event) {
    item=event.getItem().getType();
    if ((item) == (org.bukkit.Material.POTION)){
      name=event.getItem().getItemMeta().getDisplayName();
      potions=["wither"];
      if (potion.indexOf ( name ) > -1){
        player=event.player;
        console.log (player.name + " consumed " + name );
        controlCritter (name,player);
      }
      else {
        console.log ("This potion is not recognized [" + name + "]");
      }
    }
  });
  events.potionSplash( function (event) {
    name=event.getPotion().getItem().getItemMeta().getDisplayName();
    console.log ("This potion was splashed: [" + name + "]" );
    entities=event.getAffectedEntities();
    player=event.entity.getShooter();
    if (name == "Behave"){
      for (var i=0; i<parseInt(entities.length); i++) {
        if (! (entities[i] instanceof org.bukkit.entity.Player)){
          entities[i].setAI(false)
        }
      }
    }
    else if (name=="destroy"){
      count=0;
      console.log (entities.length + " entities were splashed");
      for (var i=0; i<parseInt(entities.length); i++) {
        if (! (entities[i] instanceof org.bukkit.entity.Player)){
          entities[i].setHealth(0)
          count=count+1;
        }
      }
      console.log ("This potion was splashed: [" + name + "]" );
    }
    else if (name=="control"){
      count=0;
      console.log (entities.length + " entities were splashed");
      for (var i=0; i<parseInt(entities.length); i++) {
        if (! (oneOfMine(player,entities[i]))){
          addControlCritter (entities[i],player)
          count=count+1;
        }
      }
    }
    else {
      controlCritter (name,player);
    }
  });
  events.playerMove( function (event) {
    player=event.player;
    location=player.location;
    entities=[];
    if (player.getMetadata("entities").length > 0){
      entities=player.getMetadata("entities")[0].value();
      for (var i=0; i<parseInt(entities.length); i++) {
        x=parseInt (Math.random () * (5-3)) + 3;
        location = new org.bukkit.Location (server.worlds[0], parseInt(location.x)+x, parseInt(location.y), parseInt(location.z));
        z=parseInt (Math.random () * (5-3)) + 3;
        location = new org.bukkit.Location (server.worlds[0], parseInt(location.x), parseInt(location.y), parseInt(location.z)+z);
        entity=entities[i];
        block=server.worlds[0].getBlockAt (location);
        if ((block.getType()) == "SOIL"){
          console.log ("Not teleporting player due to soil there");
        }
        else {
          if (entity.getTarget != null){
            target=entity.getTarget();
            if (target == null){
              entity.teleport(location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
            }
          }
        }
      }
    }
  });
  events.projectileHit( function (event) {
    projectile=event.getEntity();
    shooter=event.entity.getShooter();
    target=event.getHitEntity();
    if (target != null){
      if (oneOfMine (target,shooter)){
        console.log ("I hit by my own minions projectile (perhaps bad aim)");
        event.cancelled = true;
      }
      else {
        if (shooter instanceof org.bukkit.entity.Player){
          console.log ("projectile:[" + projectile + "] shot by " + shooter);
          defendMe (shooter,target);
        }
      }
    }
  });
};

exports.addControlCritter  = function (entity, player) {
  //Instantiations;
  var entities;
  if (entity instanceof org.bukkit.entity.Player){
    console.log ("addControlCritter, cannot control another player yo");
  }
  else {
    modEntity (entity);
    if (player.getMetadata("entities").length > 0){
      entities=player.getMetadata("entities")[0].value();
    }
    else {
      entities=[];
    }
    entities.push (entity)
    fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,entities);
    player.setMetadata ("entities", fd );
    for (var i=0; i<parseInt(entities.length); i++) {
      console.log ("entities[" + i + "]:" + entities[i]);
    }
    entities=player.getMetadata("entities")[0].value();
    console.log ("addControlCritter, " + player.name + " controls " + entities.length + " entities under his control");
  }
};

exports.controlCritter = function (name,player) {
  //Instantiations;
  var location;
  var evaluation;
  name=name.toString();
  console.log ("controlCritter (" + name + "," + player.name + ")");
  if (player == null){
    console.log ("Player not found yo");
  }
  else {
    location=player.location;
    location = new org.bukkit.Location (server.worlds[0], parseInt(location.x)+3, parseInt(location.y), parseInt(location.z));
    location = new org.bukkit.Location (server.worlds[0], parseInt(location.x), parseInt(location.y), parseInt(location.z)+3);
    location = new org.bukkit.Location (server.worlds[0], parseInt(location.x), parseInt(location.y)+3, parseInt(location.z));
    evaluation='var creature=org.bukkit.entity.EntityType.' + name.toUpperCase();
    console.log ("eval(" + evaluation + ")");
    eval(evaluation)
    console.log ("Spawn " + creature);
      //Instantiations;
      var name;
      var location;
      var evaluation;
    // spawn creature
    var location = location;
    var entity = server.worlds[0].spawnEntity(location,creature);
    addControlCritter (entity,player)
  }
};

exports.modEntity  = function (entity) {
  //Instantiations;
  var name;
  var modList;
  name=entity.toString();
  console.log ("modEntity [" + name + "]");
  modList=["CraftZombie","CraftVillagerZombie","CraftSkeleton","CraftPigZombie"];
  if (modList.indexOf ( name ) > -1){
    entity.setCustomName ("babyJo");
    var color = org.bukkit.Color.RED
    var helmet = require('items').leatherHelmet(1);
    var helmetMeta = helmet.itemMeta;
    helmetMeta.color = color;
    helmet.itemMeta = helmetMeta;
    entity.equipment.helmet = helmet;
    var boots = require('items').leatherBoots(1);
    var bootsMeta = boots.itemMeta;
    bootsMeta.color = color;
    boots.itemMeta = bootsMeta;
    entity.equipment.boots = boots;
    var chest = require('items').leatherChestplate(1);
    var chestMeta = chest.itemMeta;
    chestMeta.color = color;
    chest.itemMeta = chestMeta;
    entity.equipment.chestplate = chest;
    var legs = require('items').leatherLeggings(1);
    var legsMeta = legs.itemMeta;
    legsMeta.color = color;
    legs.itemMeta = legsMeta;
    entity.equipment.leggings = legs;
    entity.setAI(false);
    if (name == "CraftZombie"){
      entity.baby = true;
    }
  }
  else {
    console.log ("Do not mod: [" + name + "] it is not on the list");
  }
};

exports.oneOfMine = function (player,critter)  {
  //Instantiations;
  var mine;
  var entities;
  var entity;
  mine=false;
  if (player instanceof org.bukkit.entity.Player){
    if (player.getMetadata("entities").length > 0){
      entities=player.getMetadata("entities")[0].value();
      for (var i=0; i<parseInt(entities.length); i++) {
        entity=entities[i];
        if (entity==critter){
          mine=true;
          break;
        }
      }
    }
  }
  return mine;
};
