exports.defendMe  = function (player, target) {
  //Instantiations;
  var entities;
  var entity;
  if (!onSameTeam(target,player)){
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
  }
};

exports.critterCount=0

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
  var teamColor;
  var creature;
  var location;
  var reason;
  var target;
  var attacker;
  var lockTarget;
  var item;
  var name;
  var potions;
  var entity;
  var TeleportCause;
  var stack;
  var entities;
  var count;
  var block;
  var myRide;
  var blockType;
  var team;
  var targetLocation;
  var vector;
  var yaw;
  var diff;
  var projectile;
  var speed;
  var x;
  var z;
  var exploders;
  var shooter;
  exports.kingAttacker = null
  exports.kingDefender = null
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "time set day");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "weather clear");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @a");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamemode survival @a");
  server.worlds[0].setSpawnLocation(new org.bukkit.Location(server.worlds[0], -586, 69, 547));
  players=server.getOnlinePlayers();
  for (var i=0; i<parseInt(players.length); i++) {
    player=players[i];
    player.removeMetadata ("teamcolor", __plugin );
    player.removeMetadata ("myride", __plugin );
    if (player.getMetadata("entities").length > 0){
      player.removeMetadata ("entities", __plugin );
    }
  }
  var clearWeather= setInterval (function () {
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "weather clear");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "time set day");
    if (!(true)) {
      clearInterval (clearWeather);
    }
  }, 120000);
  events.playerRespawn( function (event) {
    player=event.player;
    inventory=player.getInventory();
    player.getInventory().clear();
    teamColor=(!(player instanceof org.bukkit.entity.LivingEntity))?null:(player.getMetadata == null)?null:(player.getMetadata("teamcolor").length == 0)?null:player.getMetadata("teamcolor")[0].value();
    console.log ("Respawn with teamColor: " + teamColor);
    handleRespawn (player, teamColor);
  });
  events.playerDeath( function (event) {
    player=event.getEntity();
    console.log (player.name + " has died yo");
    if (player == exports.kingAttacker){
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"Attacker king has died, Castle Defenders Win!\"");
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @a");
    }
    else if (player == exports.kingDefender){
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say @a \"Attacker king has died, Castle Defenders Win!\"");
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @a");
    }
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
      if (attacker != null){
        if (target instanceof org.bukkit.entity.Player){
          console.log ("Player could be damaged yo " + attacker);
        }
        else {
          console.log ("Entity will be damaged by " + attacker);
        }
      }
      lockTarget=(!(attacker instanceof org.bukkit.entity.LivingEntity))?null:(attacker.getMetadata == null)?null:(attacker.getMetadata("locktarget").length == 0)?null:attacker.getMetadata("locktarget")[0].value();
      if (onSameTeam(target,attacker)){
        console.log ("Damaged by same team how is this possible?");
        if (lockTarget != null){
          if (lockTarget.health > 0){
            console.log ("Reset to target:" + lockTarget);
            attacker.setTarget(lockTarget)
          }
          else {
            console.log (lockTarget + " is dead" );
          }
        }
        else {
          console.log ("Same team, cancel the event");
        }
        event.cancelled = true;
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
          if (target.health > 0){
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
      potions=["wither","giant"];
      if (potions.indexOf ( name ) > -1){
        player=event.player;
        console.log (player.name + " consumed " + name );
        controlCritter (name,player);
      }
      else if (name=="up"){
        player.teleport(player.location.add(0,70,0), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        stack=new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOWBALL,32);
        player.inventory.addItem(stack)
        player.addPotionEffect(new org.bukkit.potion.PotionEffect (org.bukkit.potion.PotionEffectType.SLOW_FALLING,2400, 1));
      }
      else if (name=="heal"){
        player.addPotionEffect(new org.bukkit.potion.PotionEffect (org.bukkit.potion.PotionEffectType.REGENERATION,400, 1));
      }
      else {
        console.log ("This potion is not recognized [" + name + "]");
      }
    }
  });
  events.potionSplash( function (event) {
    name=event.getPotion().getItem().getItemMeta().getDisplayName();
    location=event.getEntity().location;
    console.log ("This potion was splashed: [" + name + "]" );
    entities=event.getAffectedEntities();
    player=event.getEntity().getShooter();
    if (name=="control"){
      console.log (entities.length + " entities were splashed");
      for (var i=0; i<parseInt(entities.length); i++) {
        if (! (onSameTeam(player,entities[i]))){
          addControlCritter (entities[i],player)
        }
      }
    }
    else if (name=="landmine"){
      createLandmine(location);
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
    else if (name=="ride"){
      for (var i=0; i<parseInt(entities.length); i++) {
        if (entities[i] != player){
          console.log (entities[i].toString + " ridden by:" + player.name);
          entities[i].setAI (true)
          entities[i].setPassenger(player)
          if (entities[i].setOwner != null){
            entities[i].setOwner (player)
          }
          console.log ("set myRide");
          fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,entities[i]);
          player.setMetadata ("myride", fd );
          if (! (onSameTeam(player,entities[i]))){
            addControlCritter (entities[i],player)
          }
          console.log ("ride done");
          break;
        }
      }
    }
    else {
      controlCritter (name,player);
    }
  });
  events.vehicleExit( function (event) {
    console.log ("A Vehicle was exited yo");
  });
  events.playerInteract( function (event) {
    block=event.getClickedBlock();
    if (block != null){
      player=event.player;
      myRide=(!(player instanceof org.bukkit.entity.LivingEntity))?null:(player.getMetadata == null)?null:(player.getMetadata("myride").length == 0)?null:player.getMetadata("myride")[0].value();
      blockType=block.getType();
      if (blockType.toString() == "OAK_SIGN"){
        team=block.state.getLine(1);
        if (team=="Seige Attack"){
          console.log ("Attack the castle yo");
          player.teleport(new org.bukkit.Location(server.worlds[0], -816, 4, 551), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,"attacker");
          player.setMetadata ("teamcolor", fd );
          if (exports.kingAttacker == null){
            kingMaker (player, true);
          }
        }
        else if (team=="Castle Defense"){
          console.log ("Defend the castle king");
          fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,"defender");
          player.setMetadata ("teamcolor", fd );
          if (exports.kingDefender == null){
            kingMaker (player, false);
          }
          else {
            player.teleport(new org.bukkit.Location(server.worlds[0], -586, 4, 533), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          }
        }
      }
    }
    if (myRide != null){
      console.log ("I am riding here!");
      block=player.getTargetBlock(null,200);
      // Keep y on ground (no flying)
      targetLocation=new org.bukkit.Location(server.worlds[0], block.x, player.location.y, block.z);
      vector=targetLocation.toVector().subtract(player.location.toVector());
      yaw=vectorToYaw (vector);
      diff=Math.abs ( yaw - myRide.getLocation().getYaw());
      console.log ("yaw:" + yaw + " current Yaw:" + myRide.getLocation().getYaw() + " diff:" + diff);
      if ((diff) < 10){
        name=(player.getItemInHand== null) ? "" : (player.getItemInHand().getItemMeta() == null ) ? "" : player.getItemInHand().getItemMeta().getDisplayName();
        if (name=="skull"){
          console.log ("shoot a skull yo");
          projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.WITHER_SKULL);
          myRide.launchProjectile(projectile.getClass())
        }
        else if (name=="arrow"){
          projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.ARROW);
          myRide.launchProjectile(projectile.getClass())
        }
        else if (name=="bullet"){
          entities=server.worlds[0].getNearbyEntities (block.location,10,10,10);
          console.log ("Shoot a shulker bullet yo");
          projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.SHULKER_BULLET);
          if (entities.length > 0){
            projectile.setTarget(entities[0]);
            myRide.launchProjectile(projectile.getClass())
          }
          else {
            console.log ("Could not find an entity for the shulker bullet yo");
          }
        }
        else if (name=="fireball"){
          projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.FIREBALL);
          myRide.launchProjectile(projectile.getClass())
        }
        else if (name=="trident"){
          projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.TRIDENT);
          myRide.launchProjectile(projectile.getClass())
        }
        else {
          // Allow Movement
          myRide.setAI(true)
          speed=vector.length();
          vector=vector.multiply (0.6 / speed);
          myRide.setVelocity(vector);
        }
      }
      else {
        // Allow Rotation
        myRide.setAI(false)
        myRide.setRotation(yaw, player.location.getPitch())
      }
      if (false){
        myRide.getLocation().setYaw (yaw)
        myRide.getHandle().yaw = player.getLocation().getYaw()
      }
    }
    name=(player.getItemInHand== null) ? "" : (player.getItemInHand().getItemMeta() == null ) ? "" : player.getItemInHand().getItemMeta().getDisplayName();
    if (name == "teleport"){
      block=player.getTargetBlock(null,200);
      player.teleport(block.location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
    }
  });
  events.playerMove( function (event) {
    player=event.player;
    entities=(!(player instanceof org.bukkit.entity.LivingEntity))?null:(player.getMetadata == null)?null:(player.getMetadata("entities").length == 0)?null:player.getMetadata("entities")[0].value();
    if (entities != null){
      for (var i=0; i<parseInt(entities.length); i++) {
        if (false){
          location=player.location;
          x=parseInt (Math.random () * (5-3)) + 3;
          location = new org.bukkit.Location (server.worlds[0], parseInt(location.x)+x, parseInt(location.y), parseInt(location.z));
          z=parseInt (Math.random () * (5-3)) + 3;
          location = new org.bukkit.Location (server.worlds[0], parseInt(location.x), parseInt(location.y), parseInt(location.z)+z);
          entity=entities[i];
          block=server.worlds[0].getBlockAt (location);
          if (entity.getTarget != null){
            target=entity.getTarget();
            if (target == null){
              vector=player.location.add (5,0,5).toVector().subtract(entity.location.toVector());
              entity.setVelocity(vector);
            }
          }
        }
      }
      checkDespawns(player);
    }
    name=(player.getItemInHand== null) ? "" : (player.getItemInHand().getItemMeta() == null ) ? "" : player.getItemInHand().getItemMeta().getDisplayName();
    if (name=="invisibility"){
      player.addPotionEffect(new org.bukkit.potion.PotionEffect (org.bukkit.potion.PotionEffectType.INVISIBILITY,1200, 1));
    }
  });
  events.blockBreak( function (event) {
    block=event.block;
    if ((block.getType()) == (org.bukkit.Material.OAK_SIGN)){
      event.cancelled = true;
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
      console.log ("projectile: [" + projectile + "]");
      console.log ("exploders: [" + exploders + "]");
      server.worlds[0].createExplosion (event.entity.location,1.5);
    }
  });
};

exports.handleRespawn  = function (player,teamColor) {
  //Instantiations;
  var startLocation;
  var king;
  var color;
  var location;
  var entity;
  var TeleportCause;
  if (teamColor == "defender"){
    startLocation=new org.bukkit.Location(server.worlds[0], -594, 4, 533);
    king=exports.kingDefender;
    color = org.bukkit.Color.YELLOW;
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
  }
  else if (teamColor == "attacker"){
    startLocation=new org.bukkit.Location(server.worlds[0], -816, 4, 551);
    king=exports.kingAttacker;
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
  }
  else {
    king=null;
  }
  if (king == null){
    setTimeout (function () {
      console.log ("Teleport to  [-586,69,547]");
      player.teleport(new org.bukkit.Location(server.worlds[0], -586, 69, 547), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
    },100);
  }
  else if (king.isDead ()){
    player.sendMessage ("Sorry your king is dead, you are now a spectator");
    player.setGameMode(org.bukkit.GameMode.SPECTATOR);
  }
  else {
    setTimeout (function () {
      player.teleport(king.location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
    },100);
  }
};

exports.addControlCritter  = function (entity, player) {
  //Instantiations;
  var name;
  var entities;
  if (entity instanceof org.bukkit.entity.Player){
    console.log ("addControlCritter, cannot control another player yo");
  }
  else {
    entity.setCustomName ('name' + exports.critterCount)
    entity.setCustomNameVisible(true)
    exports.critterCount=exports.critterCount+1
    assignTeamColor (player,entity);
    name=entity.toString();
    if (name=="CraftEndermite"){
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,120000 + (new Date().getTime()));
      entity.setMetadata ("despawntimeout", fd );
    }
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
  var entity;
  var health;
  var name;
  var timeout;
  var despawnTimeout;
  var millis;
  entities=(!(player instanceof org.bukkit.entity.LivingEntity))?null:(player.getMetadata == null)?null:(player.getMetadata("entities").length == 0)?null:player.getMetadata("entities")[0].value();
  if (entities != null){
    console.log (player.name + " has " + entities.length + " entities ");
    for (var i=0; i<parseInt(entities.length); i++) {
      entity=entities[i];
      health=entity.health;
      name=entity.toString();
      timeout="No timeout";
      if (name=="CraftEndermite"){
        despawnTimeout=(!(entity instanceof org.bukkit.entity.LivingEntity))?null:(entity.getMetadata == null)?null:(entity.getMetadata("despawntimeout").length == 0)?null:entity.getMetadata("despawntimeout")[0].value();
        millis=new Date().getTime();
        timeout="Timeout in " +( (despawnTimeout - millis) /1000) + " seconds";
      }
      if (health > 0){
        console.log (timeout + " H:" + health + " entities[" + i + "]:" + entities[i] + " " + entities[i].location);
      }
      else {
        console.log (timeout + " DEAD entities[" + i + "]:" + entities[i] + " delete the dead entity");
        entities.splice(i,1)
        fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,entities);
        player.setMetadata ("entities", fd );
        break;
      }
    }
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
    if (name == "wither"){
      entity.setAI(false)
    }
    addControlCritter (entity,player)
  }
};

exports.createLandmine  = function (location) {
  //Instantiations;
  var block;
  var data;
  var sign;
  var state;
  location=location.add (0,-2,0);
  console.log ("Create landmine at:" + location);
  server.worlds[0].getBlockAt (location).setType (org.bukkit.Material.REPEATING_COMMAND_BLOCK);
  block = server.worlds[0].getBlockAt (location);
  state = block.getState();
  state.setCommand("execute if entity @e[distance=..3] run setblock ~4 ~ ~ redstone_block");
  state.update();
  location=location.add (1,0,0);
  server.worlds[0].getBlockAt (location).setType (org.bukkit.Material.REDSTONE_BLOCK);
  location=location.add (2,0,0);
  server.worlds[0].getBlockAt (location).setType (org.bukkit.Material.COMMAND_BLOCK);
  block = server.worlds[0].getBlockAt (location);
  state = block.getState();
  state.setCommand("summon tnt ~-3 ~5 ~ {fuse:0}");
  state.update();
};

exports.getAttackerGear = function (inventory) {
  //Instantiations;
  var eggs;
  var stack;
  var meta;
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ENDERMITE_SPAWN_EGG,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.BOW,16));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ARROW,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOWBALL,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.VEX_SPAWN_EGG,16));
  // Add POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,10);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('up');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  // Add SPLASH_POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,32);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('ride');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  // Add POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,5);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('wither');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  // Add SPLASH_POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,5);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('destroy');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  // Add SPLASH_POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,16);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('control');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  // Add SPLASH_POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,16);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('heal');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  eggs=[org.bukkit.Material.ELYTRA, org.bukkit.Material.BLAZE_SPAWN_EGG, org.bukkit.Material.ENDERMAN_SPAWN_EGG, org.bukkit.Material.BOW, org.bukkit.Material.WOLF_SPAWN_EGG, org.bukkit.Material.CREEPER_SPAWN_EGG, org.bukkit.Material.GHAST_SPAWN_EGG, org.bukkit.Material.HUSK_SPAWN_EGG, org.bukkit.Material.ENCHANTED_GOLDEN_APPLE, org.bukkit.Material.LLAMA_SPAWN_EGG, org.bukkit.Material.SHULKER_SPAWN_EGG, org.bukkit.Material.ZOMBIE_PIGMAN_SPAWN_EGG, org.bukkit.Material.ZOMBIE_SPAWN_EGG, org.bukkit.Material.RAVAGER_SPAWN_EGG, org.bukkit.Material.POLAR_BEAR_SPAWN_EGG, org.bukkit.Material.ZOMBIE_VILLAGER_SPAWN_EGG, org.bukkit.Material.PILLAGER_SPAWN_EGG, org.bukkit.Material.VINDICATOR_SPAWN_EGG, org.bukkit.Material.CAVE_SPIDER_SPAWN_EGG, org.bukkit.Material.SKELETON_HORSE_SPAWN_EGG];
  for (var i=0; i<parseInt(eggs.length); i++) {
    stack=new org.bukkit.inventory.ItemStack (eggs[i],10);
    inventory.addItem(stack)
  }
  stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,3);
  meta = stack.getItemMeta()
  meta.setDisplayName ("arrow");
  stack.setItemMeta(meta);
  inventory.addItem (stack);
  stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,3);
  meta = stack.getItemMeta()
  meta.setDisplayName ("skull");
  stack.setItemMeta(meta);
  inventory.addItem (stack);
  stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,3);
  meta = stack.getItemMeta()
  meta.setDisplayName ("bullet");
  stack.setItemMeta(meta);
  inventory.addItem (stack);
  stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,3);
  meta = stack.getItemMeta()
  meta.setDisplayName ("fireball");
  stack.setItemMeta(meta);
  inventory.addItem (stack);
  stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,3);
  meta = stack.getItemMeta()
  meta.setDisplayName ("trident");
  stack.setItemMeta(meta);
  inventory.addItem (stack);
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ENCHANTED_GOLDEN_APPLE,2));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ELYTRA,16));
};

exports.getKingAttackerGear = function (inventory) {
  //Instantiations;
  var meta;
  var stack;
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.RAVAGER_SPAWN_EGG,16));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.CAVE_SPIDER_SPAWN_EGG,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.HUSK_SPAWN_EGG,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ZOMBIE_SPAWN_EGG,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.WOLF_SPAWN_EGG,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.VINDICATOR_SPAWN_EGG,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.PILLAGER_SPAWN_EGG,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ENDERMITE_SPAWN_EGG,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.BOW,1));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ARROW,256));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOWBALL,256));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.VEX_SPAWN_EGG,16));
  // Add POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,10);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('up');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  // Add SPLASH_POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,10);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('ride');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  // Add SPLASH_POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,10);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('destroy');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  // Add SPLASH_POTION to inventory
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,16);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('control');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,1);
  meta = stack.getItemMeta()
  meta.setDisplayName ("arrow");
  stack.setItemMeta(meta);
  inventory.addItem (stack);
  stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,1);
  meta = stack.getItemMeta()
  meta.setDisplayName ("skull");
  stack.setItemMeta(meta);
  inventory.addItem (stack);
  stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,1);
  meta = stack.getItemMeta()
  meta.setDisplayName ("bullet");
  stack.setItemMeta(meta);
  inventory.addItem (stack);
  stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,1);
  meta = stack.getItemMeta()
  meta.setDisplayName ("fireball");
  stack.setItemMeta(meta);
  inventory.addItem (stack);
  stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,1);
  meta = stack.getItemMeta()
  meta.setDisplayName ("trident");
  stack.setItemMeta(meta);
  inventory.addItem (stack);
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ENCHANTED_GOLDEN_APPLE,10));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ELYTRA,1));
};

exports.dropChest = function (player) {
  //Instantiations;
  var location;
  var block;
  var data;
  var loc;
  var sign;
  var state;
  var inventory;
  location=player.location.add(1,0,1);
  server.worlds[0].getBlockAt (location).setType (org.bukkit.Material.CHEST);
  block=server.worlds[0].getBlockAt (location);
  state=block.getState();
  inventory=state.getBlockInventory();
  getAttackerGear (inventory);
};

exports.kingMaker  = function (player, attacker) {
  //Instantiations;
  var inventory;
  var color;
  var location;
  var entity;
  var TeleportCause;
  inventory=player.inventory;
  if (attacker){
    color = org.bukkit.Color.AQUA;
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
    exports.kingAttacker = player
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say \"" + player.name + " is now King Attacker \"");
    getKingAttackerGear (player.inventory);
    dropChest(player);
  }
  else {
    // Add SPLASH_POTION to inventory
    var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,32);
    var meta = newItems.getItemMeta();
    meta.setDisplayName('destroy');
    newItems.setItemMeta(meta);
    inventory.addItem(newItems);
    // Add SPLASH_POTION to inventory
    var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,64);
    var meta = newItems.getItemMeta();
    meta.setDisplayName('landmine');
    newItems.setItemMeta(meta);
    inventory.addItem(newItems);
    // Add POTION to inventory
    var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,16);
    var meta = newItems.getItemMeta();
    meta.setDisplayName('heal');
    newItems.setItemMeta(meta);
    inventory.addItem(newItems);
    // Add POTION to inventory
    var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,16);
    var meta = newItems.getItemMeta();
    meta.setDisplayName('up');
    newItems.setItemMeta(meta);
    inventory.addItem(newItems);
    inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ELYTRA,16));
    color = org.bukkit.Color.WHITE;
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
    exports.kingDefender = player
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say \"" + player.name + " is now King Defender \"");
    console.log ("Give king attacker a bunch of gear yo");
    player.teleport(new org.bukkit.Location(server.worlds[0], -587, 5, 532), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
  }
};

exports.checkDespawns  = function (player) {
  //Instantiations;
  var entities;
  var entity;
  var name;
  var timeout;
  entities=(!(player instanceof org.bukkit.entity.LivingEntity))?null:(player.getMetadata == null)?null:(player.getMetadata("entities").length == 0)?null:player.getMetadata("entities")[0].value();
  if (entities != null){
    for (var i=0; i<parseInt(entities.length); i++) {
      entity=entities[i];
      name=entity.toString();
      if (name=="CraftEndermite"){
        timeout=(!(entity instanceof org.bukkit.entity.LivingEntity))?null:(entity.getMetadata == null)?null:(entity.getMetadata("despawntimeout").length == 0)?null:entity.getMetadata("despawntimeout")[0].value();
        if ((new Date().getTime()) > (timeout)){
          entity=server.worlds[0].spawnEntity(entity.location,org.bukkit.entity.EntityType.ENDERMITE);
          entity.setHealth (entities[i].health)
          entity.setCustomName (entities[i].getCustomName())
          fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,(new Date().getTime()) + 120000);
          entity.setMetadata ("despawntimeout", fd );
          assignTeamColor (player,entity);
          entities[i] = entity
          console.log ("New endermite spawned");
        }
      }
    }
  }
};

exports.assignTeamColor  = function (player,entity) {
  //Instantiations;
  var teamColor;
  teamColor=(!(player instanceof org.bukkit.entity.LivingEntity))?null:(player.getMetadata == null)?null:(player.getMetadata("teamcolor").length == 0)?null:player.getMetadata("teamcolor")[0].value();
  console.log ("Setting entities teamColor to : " + teamColor);
  fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,teamColor);
  entity.setMetadata ("teamcolor", fd );
};
