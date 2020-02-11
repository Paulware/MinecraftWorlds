exports.defendMe  = function (player, target) {
  //Instantiations;
  var entities;
  var entity;
  console.log ("All entities defend " + player.name + " from : " + target);
  if (onSameTeam(target,player)){
    console.log ("Cannot defend, on same team");
  }
  else {
    if (target instanceof org.bukkit.entity.LivingEntity){
      if (! (player.getMetadata("_entities_").length > 0)){
        console.log (player.name + "controls no entities to defend him");
      }
      else {
        entities=player.getMetadata("_entities_")[0].value();
        console.log ("defendMe, focus " + entities.length + " on new target:" + target);
        for (var i=0; i<parseInt(entities.length); i++) {
          entity=entities[i];
          if (isAvailable(entity)){
            if (target instanceof org.bukkit.entity.LivingEntity){
              if (entity.setTarget != null){
                entity.setTarget (target);
              }
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
  var name;
  var players;
  var player;
  var inventory;
  var teamColor;
  var entities;
  var creature;
  var location;
  var reason;
  var target;
  var attacker;
  var item;
  var block;
  var myRide;
  var projectile;
  var exploders;
  var shooter;
  if (((exports.gameStarted) == (null))){
    name=exports.gameStarted = 1;
    exports.kingAttacker = null
    exports.kingDefender = null
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamerule commandBlockOutput false");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "time set day");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "weather clear");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @a");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamemode survival @a");
    server.worlds[0].setSpawnLocation(new org.bukkit.Location(server.worlds[0], -586, 69, 547));
    players=server.getOnlinePlayers();
    for (var i=0; i<parseInt(players.length); i++) {
      player=players[i];
      player.removeMetadata ("_teamcolor_", __plugin );
      player.removeMetadata ("_myride_", __plugin );
      if (player.getMetadata("_entities_").length > 0){
        player.removeMetadata ("_entities_", __plugin );
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
      teamColor=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_teamcolor_").length == 0)?null:player.getMetadata("_teamcolor_")[0].value();
      console.log ("Respawn with teamColor: " + teamColor);
      handleRespawn (player, teamColor);
    });
    events.playerMove( function (event) {
      player=event.player;
      defendMyArea (player);
      entities=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_entities_").length == 0)?null:player.getMetadata("_entities_")[0].value();
      if (entities != null){
        assembleEntities (player.location,entities);
        checkDespawns(player);
      }
      name=((player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand== null) ? "" : ((player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand().getItemMeta == null ) ? "" : (player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand().getItemMeta().getDisplayName();
      if (name=="invisibility"){
        player.addPotionEffect(new org.bukkit.potion.PotionEffect (org.bukkit.potion.PotionEffectType.INVISIBILITY,1200, 1));
      }
    });
    events.playerDeath( function (event) {
      player=event.getEntity();
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
          // Change Arrow damage to 5 hearts
          if ((attacker instanceof org.bukkit.entity.Arrow) || (attacker instanceof org.bukkit.entity.Snowball)){
            console.log ("Increasing damage to 5 hearts");
            event.setDamage(10)
          }
          if (attacker.getShooter != null){
            attacker=attacker.getShooter();
          }
          if (onSameTeam(target,attacker)){
            console.log ("Damaged by same team how is this possible?");
            event.cancelled = true;
          }
          else if (target instanceof org.bukkit.entity.Player){
            if (attacker instanceof org.bukkit.entity.LivingEntity){
              console.log (attacker + " entity damage triggering...");
              defendMe (target,attacker);
            }
            else {
              console.log ("Getting attacked by a non-living entity, I need to find the shooter");
            }
          }
        }
      }
    });
    events.entityTarget( function (event) {
      target=event.target;
      attacker=event.entity;
      if (attacker.getShooter != null){
        attacker=attacker.getShooter();
      }
      if (onSameTeam(target,attacker)){
        event.cancelled = true;
      }
    });
    events.playerItemConsume( function (event) {
      player=event.player;
      item=event.getItem().getType();
      if (((item) == (org.bukkit.Material.POTION))){
        name=event.getItem().getItemMeta().getDisplayName();
        if (name=="up"){
          setTimeout (function () {
            player.teleport(player.location.add(0,70,0), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
          },2000);
          player.getInventory().setItem (0,new org.bukkit.inventory.ItemStack (org.bukkit.Material.LEGACY_ELYTRA,1) );
          player.getInventory().setItem (1,new org.bukkit.inventory.ItemStack (org.bukkit.Material.FIREWORK_ROCKET,16) );
          player.getInventory().setItem (2,new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOWBALL,32) );
          player.addPotionEffect(new org.bukkit.potion.PotionEffect (org.bukkit.potion.PotionEffectType.SLOW_FALLING,2400, 1));
        }
        else if (name=="heal"){
          player.addPotionEffect(new org.bukkit.potion.PotionEffect (org.bukkit.potion.PotionEffectType.REGENERATION,400, 1));
        }
        else {
          player=event.player;
          console.log (player.name + " consumed " + name );
          controlCritter (name,player);
        }
      }
    });
    events.potionSplash( function (event) {
      name=event.getPotion().getItem().getItemMeta().getDisplayName();
      location=event.getEntity().location;
      entities=event.getAffectedEntities();
      console.log ("[" + name + "] splashed " + entities.length + " entities");
      player=event.getEntity().getShooter();
      if (name=="control"){
        splashControl(entities,player);
      }
      else if (name=="landmine"){
        createLandmine(location);
      }
      else if (name=="destroy"){
        for (var i=0; i<parseInt(entities.length); i++) {
          if (! (entities[i] instanceof org.bukkit.entity.Player)){
            entities[i].setHealth(0)
          }
        }
      }
      else if (name=="ride"){
        splashRide(entities,player);
      }
      else {
        console.log ("Wile critter created :" + name );
          //Instantiations;
          var name;
          var players;
          var player;
          var inventory;
          var teamColor;
          var entities;
          var creature;
          var location;
          var reason;
          var target;
          var attacker;
          var item;
        // spawn eval ("org.bukkit.entity.EntityType." + name.toUpperCase())
        var location = location;
        var entity = server.worlds[0].spawnEntity(location,eval ("org.bukkit.entity.EntityType." + name.toUpperCase()));
      }
    });
    events.vehicleExit( function (event) {
      console.log ("A Vehicle was exited yo");
    });
    events.playerInteract( function (event) {
      player=event.player;
      block=event.getClickedBlock();
      myRide=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_myride_").length == 0)?null:player.getMetadata("_myride_")[0].value();
      if (block != null){
        teamSelection (block, player);
      }
      if (myRide != null){
        handleMyRide (myRide,player);
      }
      name=((player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand== null) ? "" : ((player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand().getItemMeta == null ) ? "" : (player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand().getItemMeta().getDisplayName();
      if (name == "teleport"){
        block=player.getTargetBlock(null,200);
        setTimeout (function () {
          player.teleport(block.location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
      else if (name == "fire"){
        block=player.getTargetBlock(null,200);
        block.setType(org.bukkit.Material.FIRE);
      }
    });
    events.blockBreak( function (event) {
      block=event.block;
      if ((((block==null)?null:block.getType()) == (org.bukkit.Material.OAK_SIGN))){
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
          console.log ("Cancelling projectile " + target + " and " + shooter + " are on same team.");
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
        server.worlds[0].createExplosion (event.entity.location,1.5);
      }
    });
  }
};

exports.controlMobJoin = function (player) {
  setTimeout (function () {
    player.teleport(.add (-586, 70, 547), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
  },2000);
  (function() {   var h=20;
    if (player.setHealth != null) {
      if (h<0) {
         h = 0;
      }
      player.setHealth(h);  }
   })();
  controlMob();
};

exports.handleRespawn  = function (player,teamColor) {
  //Instantiations;
  var startLocation;
  var king;
  var color;
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
      setTimeout (function () {
        player.teleport(new org.bukkit.Location(server.worlds[0], -586, 69, 547), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      },2000);
    },100);
  }
  else if (king.isDead ()){
    (function() {
      if (player != null ) {
         player.sendMessage ("Sorry your king is dead, you are now a spectator");
      }
     })();
    player.setGameMode(org.bukkit.GameMode.SPECTATOR);
  }
  else {
    setTimeout (function () {
      setTimeout (function () {
        player.teleport(king.location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      },2000);
    },100);
  }
};

exports.defendMyArea  = function (player) {
  //Instantiations;
  var entities;
  entities=server.worlds[0].getNearbyEntities (player.location,5,5,5);
  for (var i=0; i<parseInt(entities.length); i++) {
    if (isEnemy(player,entities[i]) ){
      console.log ("Found bad guy near me.." + entities[i]);
      defendMe (player,entities[i]);
      break;
    }
  }
};

exports.assembleEntities = function (location,entities) {
  //Instantiations;
  var entity;
  var xOffset;
  var zOffset;
  var vector;
  for (var i=0; i<parseInt(entities.length); i++) {
    entity=entities[i];
    if (isAvailable(entity)){
      xOffset=(entity== null)? null : (entity.getMetadata == null)?null:(entity.getMetadata("_xoffset_").length == 0)?null:entity.getMetadata("_xoffset_")[0].value();
      zOffset=(entity== null)? null : (entity.getMetadata == null)?null:(entity.getMetadata("_zoffset_").length == 0)?null:entity.getMetadata("_zoffset_")[0].value();
      loc=new org.bukkit.Location(server.worlds[0], location.x + xOffset, 4, location.z+zOffset);
      vector=loc.toVector().subtract(entity.location.toVector());
      vector=vector.multiply (0.1);
      entity.setVelocity(vector);
    }
  }
};

exports.isEnemy  = function (player,entity) {
  //Instantiations;
  var enemy;
  var teamColor;
  var entityColor;
  enemy=false;
  if (entity instanceof org.bukkit.entity.LivingEntity){
    if (!entity.isDead()){
      teamColor=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_teamcolor_").length == 0)?null:player.getMetadata("_teamcolor_")[0].value();
      entityColor=(entity== null)? null : (entity.getMetadata == null)?null:(entity.getMetadata("_teamcolor_").length == 0)?null:entity.getMetadata("_teamcolor_")[0].value();
      if (((teamColor) != (entityColor))){
        enemy=true;
      }
    }
  }
  return enemy;
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
      if (entity != null) {
        if (entity.setMetadata != null ) {
          entity.setMetadata ("_despawntimeout_", fd );
        }
      }
    }
    modEntity (entity);
    if (player.getMetadata("_entities_").length > 0){
      entities=player.getMetadata("_entities_")[0].value();
    }
    else {
      entities=[];
    }
    entity.setTarget(null)
    entities.push (entity)
    fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,entities);
    if (player != null) {
      if (player.setMetadata != null ) {
        player.setMetadata ("_entities_", fd );
      }
    }
    entities=player.getMetadata("_entities_")[0].value();
    showEntities(player);
    console.log ("addControlCritter, " + player.name + " controls " + entities.length + " entities under his control");
  }
};

exports.onSameTeam = function (entity1,entity2)  {
  //Instantiations;
  var onTheTeam;
  var team1;
  var team2;
  onTheTeam=false;
  team1=(entity1== null)? null : (entity1.getMetadata == null)?null:(entity1.getMetadata("_teamcolor_").length == 0)?null:entity1.getMetadata("_teamcolor_")[0].value();
  team2=(entity2== null)? null : (entity2.getMetadata == null)?null:(entity2.getMetadata("_teamcolor_").length == 0)?null:entity2.getMetadata("_teamcolor_")[0].value();
  if (team1 != null){
    onTheTeam=((team1) == (team2));
  }
  return onTheTeam;
};

exports.assignTeamColor  = function (player,entity) {
  //Instantiations;
  var teamColor;
  var xOffset;
  var zOffset;
  teamColor=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_teamcolor_").length == 0)?null:player.getMetadata("_teamcolor_")[0].value();
  console.log ("Setting entities teamColor to : " + teamColor);
  fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,teamColor);
  if (entity != null) {
    if (entity.setMetadata != null ) {
      entity.setMetadata ("_teamcolor_", fd );
    }
  }
  xOffset=parseInt (Math.random () * (8-(-8))) + (-8);
  console.log ("Set xOffset to:" + xOffset);
  fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,xOffset);
  if (entity != null) {
    if (entity.setMetadata != null ) {
      entity.setMetadata ("_xoffset_", fd );
    }
  }
  console.log ("Set xOffset to:" + xOffset);
  zOffset=parseInt (Math.random () * (10-(-10))) + (-10);
  fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,zOffset);
  if (entity != null) {
    if (entity.setMetadata != null ) {
      entity.setMetadata ("_zoffset_", fd );
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
    entity.addPotionEffect(new org.bukkit.potion.PotionEffect (org.bukkit.potion.PotionEffectType.FIRE_RESISTANCE,72000, 1));
    if (name == "wither"){
      entity.setAI(false)
    }
    addControlCritter (entity,player)
  }
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
  entities=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_entities_").length == 0)?null:player.getMetadata("_entities_")[0].value();
  if (entities != null){
    console.log (player.name + " has " + entities.length + " entities ");
    for (var i=0; i<parseInt(entities.length); i++) {
      entity=entities[i];
      health=entity.health;
      name=entity.toString();
      timeout="No timeout";
      if (name=="CraftEndermite"){
        despawnTimeout=(entity== null)? null : (entity.getMetadata == null)?null:(entity.getMetadata("_despawntimeout_").length == 0)?null:entity.getMetadata("_despawntimeout_")[0].value();
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
        if (player != null) {
          if (player.setMetadata != null ) {
            player.setMetadata ("_entities_", fd );
          }
        }
        break;
      }
    }
  }
};

exports.splashControl = function (entities,player) {
  console.log (entities.length + " entities were splashed");
  for (var i=0; i<parseInt(entities.length); i++) {
    if (! (onSameTeam(player,entities[i]))){
      addControlCritter(entities[i],player);
      entities[i].setTarget(null)
    }
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
  state.setCommand("summon tnt ~-3 ~7 ~ {fuse:0}");
  state.update();
  location=location.add (2,0,0);
  server.worlds[0].getBlockAt (location).setType (org.bukkit.Material.COMMAND_BLOCK);
  block = server.worlds[0].getBlockAt (location);
  state = block.getState();
  state.setCommand("say \"fill all air\"");
  state.update();
};

exports.splashRide  = function (entities,player) {
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
      if (player != null) {
        if (player.setMetadata != null ) {
          player.setMetadata ("_myride_", fd );
        }
      }
      if (! (onSameTeam(player,entities[i]))){
        addControlCritter (entities[i],player)
      }
      console.log ("ride done");
      break;
    }
  }
};

exports.handleMyRide  = function (myRide,player) {
  //Instantiations;
  var block;
  var targetLocation;
  var vector;
  function finalVecAdjust (v){return (v<-180) ? v+360 : (v>180 ) ? v-360 : v; };
  var yaw;
  var diff;
  var name;
  var projectile;
  var entities;
  var loc;
  var pitch;
  block=player.getTargetBlock(null,200);
  // Y ok for shooting in the air
  targetLocation=new org.bukkit.Location(server.worlds[0], block.location.x, block.location.y, block.location.z);
  console.log ("I am riding, looking at: " + block.location + " targetting: " + targetLocation);
  vector=targetLocation.toVector().subtract(player.location.toVector());
  yaw=finalVecAdjust((vector.getX==null) ? 0 : (vector.getZ==null) ? 0 : ((vector.getX()!= 0) ? ((vector.getX()<0) ? 1.5*Math.PI : 0.5*Math.PI) - Math.atan(vector.getZ()/vector.getX()) : (vector.getZ()<0) ? Math.PI : 0) * (-1*180/Math.PI));
  diff=Math.abs ( yaw - myRide.getLocation().getYaw());
  console.log ("yaw:" + yaw + " current Yaw:" + myRide.getLocation().getYaw() + " diff:" + diff);
  if (((diff) < 10)){
    name=((player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand== null) ? "" : ((player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand().getItemMeta == null ) ? "" : (player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand().getItemMeta().getDisplayName();
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
      entities=server.worlds[0].getNearbyEntities (block.location,5,5,5);
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
      console.log ("Nothing in hand, proceed to " + targetLocation + " from " + myRide.location);
      vector=targetLocation.toVector().subtract(myRide.location.toVector());
      loc=player.location;
      vector=vector.normalize().multiply (2.0);
      loc=loc.add (vector.normalize());
      // Keep vehicle on ground (y=4)
      loc=new org.bukkit.Location(server.worlds[0], loc.x, 4, loc.z);
      pitch=player.location.getPitch();
      teleportRide (myRide,player,loc,pitch,yaw);
      console.log ("Done, set AI false");
    }
  }
  else {
    console.log ("set rotation " + yaw);
    // Allow Rotation
    myRide.setAI(false)
    myRide.setRotation(yaw, player.location.getPitch())
  }
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

exports.getAttackerGear = function (inventory) {
  //Instantiations;
  var eggs;
  var stack;
  var meta;
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ENDERMITE_SPAWN_EGG,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.BOW,16));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ARROW,64));
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,10);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('iron_golem');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,10);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('up');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,32);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('ride');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,5);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('wither');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,5);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('destroy');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,16);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('control');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.VEX_SPAWN_EGG,16));
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
  stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,1);
  meta = stack.getItemMeta()
  meta.setDisplayName ("skull");
  stack.setItemMeta(meta);
  inventory.addItem (stack);
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.RAVAGER_SPAWN_EGG,16));
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,10);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('ride');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,32);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('snowman');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,10);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('iron_golem');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,10);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('heal');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,10);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('up');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,10);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('destroy');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,16);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('control');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ARROW,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.BOW,1));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ENDERMITE_SPAWN_EGG,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.CAVE_SPIDER_SPAWN_EGG,64));
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,5);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('wither');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.HUSK_SPAWN_EGG,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ZOMBIE_SPAWN_EGG,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.WOLF_SPAWN_EGG,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.VINDICATOR_SPAWN_EGG,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.PILLAGER_SPAWN_EGG,64));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOWBALL,256));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.VEX_SPAWN_EGG,16));
  inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ELYTRA,1));
  var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,10);
  var meta = newItems.getItemMeta();
  meta.setDisplayName('ride');
  newItems.setItemMeta(meta);
  inventory.addItem(newItems);
  stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,1);
  meta = stack.getItemMeta()
  meta.setDisplayName ("fire");
  stack.setItemMeta(meta);
  inventory.addItem (stack);
  stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,1);
  meta = stack.getItemMeta()
  meta.setDisplayName ("arrow");
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
  stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,1);
  meta = stack.getItemMeta()
  meta.setDisplayName ("teleport");
  stack.setItemMeta(meta);
  inventory.addItem (stack);
};

exports.teamSelection  = function (block, player) {
  //Instantiations;
  var team;
  if ((((block==null)?null:block.getType()) == (org.bukkit.Material.OAK_SIGN))){
    team=(block==null)?null: (block.state.getLine == null)?null:block.state.getLine(1);
    if (team=="Seige Attack"){
      console.log ("Attack the castle yo");
      setTimeout (function () {
        player.teleport(new org.bukkit.Location(server.worlds[0], -816, 4, 551), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      },2000);
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,"attacker");
      if (player != null) {
        if (player.setMetadata != null ) {
          player.setMetadata ("_teamcolor_", fd );
        }
      }
      if (exports.kingAttacker == null){
        kingMaker (player, true);
      }
    }
    else if (team=="Castle Defense"){
      console.log ("Defend the castle king");
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,"defender");
      if (player != null) {
        if (player.setMetadata != null ) {
          player.setMetadata ("_teamcolor_", fd );
        }
      }
      if (exports.kingDefender == null){
        kingMaker (player, false);
      }
      else {
        setTimeout (function () {
          player.teleport(new org.bukkit.Location(server.worlds[0], -586, 4, 533), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        },2000);
      }
    }
    else {
      console.log ("\nERR!\nUnknown team: " + team + "\n");
    }
  }
};

exports.kingMaker  = function (player, attacker) {
  //Instantiations;
  var inventory;
  var color;
  var meta;
  var stack;
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
    var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,16);
    var meta = newItems.getItemMeta();
    meta.setDisplayName('control');
    newItems.setItemMeta(meta);
    inventory.addItem(newItems);
    var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,32);
    var meta = newItems.getItemMeta();
    meta.setDisplayName('destroy');
    newItems.setItemMeta(meta);
    inventory.addItem(newItems);
    var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.SPLASH_POTION,64);
    var meta = newItems.getItemMeta();
    meta.setDisplayName('landmine');
    newItems.setItemMeta(meta);
    inventory.addItem(newItems);
    var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,16);
    var meta = newItems.getItemMeta();
    meta.setDisplayName('heal');
    newItems.setItemMeta(meta);
    inventory.addItem(newItems);
    var newItems = new org.bukkit.inventory.ItemStack (org.bukkit.Material.POTION,16);
    var meta = newItems.getItemMeta();
    meta.setDisplayName('up');
    newItems.setItemMeta(meta);
    inventory.addItem(newItems);
    inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.BOW,1));
    inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOWBALL,16));
    inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ARROW,64));
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
    setTimeout (function () {
      player.teleport(new org.bukkit.Location(server.worlds[0], -587, 5, 532), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
    },2000);
    stack = new org.bukkit.inventory.ItemStack (org.bukkit.Material.STICK,1);
    meta = stack.getItemMeta()
    meta.setDisplayName ("teleport");
    stack.setItemMeta(meta);
    inventory.addItem (stack);
  }
};

exports.teleportRide  = function (vehicle,passenger,location,pitch,yaw) {
  console.log ("Teleport " + passenger.name + "  to : " + location);
  // Allow Rotation
  vehicle.setAI(false)
  passenger.vehicle=null;
  vehicle.setPassenger(null);
  location.setYaw (yaw)
  location.setPitch(pitch)
  setTimeout (function () {
    passenger.teleport(location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
  },2000);
  setTimeout (function () {
    vehicle.teleport(location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
  },2000);
  vehicle.setPassenger(passenger);
};

exports.checkDespawns  = function (player) {
  //Instantiations;
  var entities;
  var entity;
  var name;
  var timeout;
  entities=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_entities_").length == 0)?null:player.getMetadata("_entities_")[0].value();
  if (entities != null){
    for (var i=0; i<parseInt(entities.length); i++) {
      entity=entities[i];
      name=entity.toString();
      if (name=="CraftEndermite"){
        timeout=(entity== null)? null : (entity.getMetadata == null)?null:(entity.getMetadata("_despawntimeout_").length == 0)?null:entity.getMetadata("_despawntimeout_")[0].value();
        if (((new Date().getTime()) > (timeout))){
          entity=server.worlds[0].spawnEntity(entity.location,org.bukkit.entity.EntityType.ENDERMITE);
          entity.setHealth (entities[i].health)
          entity.setCustomName (entities[i].getCustomName())
          fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,(new Date().getTime()) + 120000);
          if (entity != null) {
            if (entity.setMetadata != null ) {
              entity.setMetadata ("_despawntimeout_", fd );
            }
          }
          assignTeamColor (player,entity);
          entities[i] = entity
          console.log ("New endermite spawned");
        }
      }
    }
  }
};

exports.isAvailable  = function (entity) {
  //Instantiations;
  var available;
  var target;
  available=true;
  if (entity.getTarget == null){
    console.log (entity + " available because target.getTarget is null");
  }
  else {
    target=entity.getTarget();
    if (target == null){
      console.log (entity + "available because target is null");
    }
    else {
      if (target.isDead()){
        console.log (entity + " available because target is dead, and should no longer be a target");
      }
      else {
        available=false;
      }
    }
  }
  return available;
};
