exports.defendMe  = function (player, target) {
  //Instantiations;
  var entities;
  var entity;
  if (target instanceof org.bukkit.entity.LivingEntity){
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
            fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,target);
            entity.setMetadata ("locktarget", fd );
            entity.setTarget (target);
          }
        }
      }
      showEntities(player);
    }
  }
};

exports.dropChest = function () {
  //Instantiations;
  var location;
  var block;
  var data;
  var loc;
  var sign;
  var state;
  var inventory;
  var eggs;
  var stack;
  console.log ("populateChest");
  location=self.location.add(1,0,1);
  server.worlds[0].getBlockAt (location).setType (org.bukkit.Material.CHEST);
  block=server.worlds[0].getBlockAt (location);
  state=block.getState();
  inventory=state.getBlockInventory();
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ENDERMITE_SPAWN_EGG,16));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ARROW,16));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOWBALL,5));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.VEX_SPAWN_EGG,16));
  // Add POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,10);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('up');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  // Add SPLASH_POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,5);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('destroy');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  // Add SPLASH_POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,5);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('control');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  // Add POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,5);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('wither');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  eggs=[org.bukkit.Material.ELYTRA, org.bukkit.Material.BLAZE_SPAWN_EGG, org.bukkit.Material.ENDERMAN_SPAWN_EGG, org.bukkit.Material.BOW, org.bukkit.Material.WOLF_SPAWN_EGG, org.bukkit.Material.CREEPER_SPAWN_EGG, org.bukkit.Material.GHAST_SPAWN_EGG, org.bukkit.Material.HUSK_SPAWN_EGG, org.bukkit.Material.ENCHANTED_GOLDEN_APPLE, org.bukkit.Material.LLAMA_SPAWN_EGG, org.bukkit.Material.SHULKER_SPAWN_EGG, org.bukkit.Material.ZOMBIE_PIGMAN_SPAWN_EGG, org.bukkit.Material.ZOMBIE_SPAWN_EGG, org.bukkit.Material.RAVAGER_SPAWN_EGG, org.bukkit.Material.POLAR_BEAR_SPAWN_EGG, org.bukkit.Material.ZOMBIE_VILLAGER_SPAWN_EGG, org.bukkit.Material.PILLAGER_SPAWN_EGG, org.bukkit.Material.VINDICATOR_SPAWN_EGG, org.bukkit.Material.CAVE_SPIDER_SPAWN_EGG, org.bukkit.Material.SKELETON_HORSE_SPAWN_EGG];
  for (var i=0; i<parseInt(eggs.length); i++) {
    stack=new org.bukkit.inventory.ItemStack (eggs[i],1);
    inventory.addItem(stack)
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
  var lockTarget;
  var health;
  var item;
  var name;
  var potions;
  var entity;
  var TeleportCause;
  var stack;
  var entities;
  var count;
  var x;
  var z;
  var block;
  var projectile;
  var exploders;
  var shooter;
  players=server.getOnlinePlayers();
  for (var i=0; i<parseInt(players.length); i++) {
    player=players[i];
    if (player.getMetadata("entities").length > 0){
      player.removeMetadata ("entities", __plugin );
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,"Blue");
      player.setMetadata ("teamcolor", fd );
    }
  }
  events.playerRespawn( function (event) {
    inventory=event.player.getInventory();
    inventory.clear()
    // Add SPLASH_POTION to inventory
    var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,5);
    var meta = newItems.getItemMeta();
    meta.setDisplayName('control');
    newItems.setItemMeta(meta);
    inventory.addItem(newItems);
    inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ENCHANTED_GOLDEN_APPLE,2));
    inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ELYTRA,1));
    inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOWBALL,32));
    inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ENDERMITE_SPAWN_EGG,16));
    inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.BOW,1));
    inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ARROW,64));
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
      attacker=event.getDamager();
      lockTarget=(!(attacker instanceof org.bukkit.entity.LivingEntity))?null:(attacker.getMetadata == null)?null:(attacker.getMetadata("locktarget").length == 0)?null:attacker.getMetadata("locktarget")[0].value();
      if (onSameTeam(target,attacker)){
        if (lockTarget != null){
          if (lockTarget.health > 0){
            console.log ("Reset to target:" + lockTarget);
            attacker.setTarget(lockTarget)
          }
          else {
            console.log (lockTarget + " is dead" );
            event.cancelled = true;
          }
        }
        else {
          console.log ("Same team, cancel the event");
          event.cancelled = true;
        }
      }
      else if (target instanceof org.bukkit.entity.Player){
        console.log ("Entity damage triggering...");
        defendMe (target,attacker);
      }
    }
  });
  events.entityTarget( function (event) {
    target=event.target;
    attacker=event.entity;
    if (onSameTeam(target,attacker)){
      if (lockTarget != null){
        attacker.setTarget(lockTarget)
      }
      event.cancelled = true;
    }
    else {
      // Not sure why this occasionally is true
      if (target != null){
        attacker=event.entity;
        lockTarget=(!(attacker instanceof org.bukkit.entity.LivingEntity))?null:(attacker.getMetadata == null)?null:(attacker.getMetadata("locktarget").length == 0)?null:attacker.getMetadata("locktarget")[0].value();
        if ((lockTarget != target) && (lockTarget != null)){
          health=1;
          if (target.getHealth == null){
            console.log ("Cannot get health of this entity " + target);
          }
          else {
            health=target.getHealth();
          }
          if (target.getHealth() > 0){
            console.log ("Order violation go back to " + lockTarget);
            attacker.setTarget(lockTarget)
          }
        }
      }
    }
  });
  events.playerItemConsume( function (event) {
    item=event.getItem().getType();
    if ((item) == (org.bukkit.Material.POTION)){
      name=event.getItem().getItemMeta().getDisplayName();
      potions=["wither","up"];
      if (potions.indexOf ( name ) > -1){
        player=event.player;
        if (name=="wither"){
          console.log (player.name + " consumed " + name );
          controlCritter (name,player);
        }
        else if (name=="up"){
          entity = player;
          entity.teleport(player.location.add(0,70,0), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          stack=new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOWBALL,32);
          player.inventory.addItem(stack)
          player.addPotionEffect(new org.bukkit.potion.PotionEffect (org.bukkit.potion.PotionEffectType.SLOW_FALLING,2400, 1));
        }
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
    if (name=="control"){
      console.log (entities.length + " entities were splashed");
      for (var i=0; i<parseInt(entities.length); i++) {
        if (! (onSameTeam(player,entities[i]))){
          addControlCritter (entities[i],player)
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
    else {
      controlCritter (name,player);
    }
  });
  events.playerMove( function (event) {
    player=event.player;
    entities=[];
    if (player.getMetadata("entities").length > 0){
      entities=player.getMetadata("entities")[0].value();
      for (var i=0; i<parseInt(entities.length); i++) {
        location=player.location;
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
    projectile=event.getEntity().toString();
    exploders=["CraftSnowball","CraftLlamaSpit"];
    shooter=event.entity.getShooter();
    target=event.getHitEntity();
    if (target != null){
      if (onSameTeam (target,shooter)){
        console.log (target + " and " + shooter + " are on same team?");
        event.cancelled = true;
      }
      else {
        // If player is target attack shooter, if player is shooter, attack target
        if (target instanceof org.bukkit.entity.Player){
          console.log ("projectile:[" + projectile + "] shot by " + shooter);
          defendMe (target,shooter);
        }
        else if (shooter instanceof org.bukkit.entity.Player){
          defendMe (shooter,target);
        }
      }
    }
    if (exploders.indexOf (projectile) > -1){
      server.worlds[0].createExplosion (event.entity.location,1.5);
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
    entity.setCustomName ('name')
    fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,"Blue");
    entity.setMetadata ("teamcolor", fd );
    modEntity (entity);
    if (player.getMetadata("entities").length > 0){
      entities=player.getMetadata("entities")[0].value();
    }
    else {
      entities=[];
    }
    entity.setTarget(null)
    entities.push (entity)
    fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,entities);
    player.setMetadata ("entities", fd );
    entities=player.getMetadata("entities")[0].value();
    showEntities(player);
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

exports.onSameTeam = function (entity1,entity2)  {
  //Instantiations;
  var onTheTeam;
  var team1;
  var team2;
  onTheTeam=false;
  team1=(!(entity1 instanceof org.bukkit.entity.LivingEntity))?null:(entity1.getMetadata == null)?null:(entity1.getMetadata("teamcolor").length == 0)?null:entity1.getMetadata("teamcolor")[0].value();
  team2=(!(entity2 instanceof org.bukkit.entity.LivingEntity))?null:(entity2.getMetadata == null)?null:(entity2.getMetadata("teamcolor").length == 0)?null:entity2.getMetadata("teamcolor")[0].value();
  if (team1 != null){
    onTheTeam=(team1) == (team2);
  }
  return onTheTeam;
};

exports.showEntities  = function (player) {
  //Instantiations;
  var entities;
  var health;
  entities=(!(player instanceof org.bukkit.entity.LivingEntity))?null:(player.getMetadata == null)?null:(player.getMetadata("entities").length == 0)?null:player.getMetadata("entities")[0].value();
  if (entities != null){
    console.log (player.name + " has " + entities.length + " entities ");
    for (var i=0; i<parseInt(entities.length); i++) {
      health=entities[i].health;
      if (health == 0){
        console.log ("DEAD entities[" + i + "]:" + entities[i] + " delete the dead entity");
        entities.splice(i,1)
        fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,entities);
        player.setMetadata ("entities", fd );
        break;
      }
      else {
        console.log ("H:" + health + " entities[" + i + "]:" + entities[i]);
      }
    }
  }
};
