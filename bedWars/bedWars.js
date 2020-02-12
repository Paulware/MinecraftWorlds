exports.getWinningTeam = function () {
  //Instantiations;
  var teams;
  var msg;
  if (((exports.destroyedBeds()) > 0)){
    teams=exports.countTeams();
    if (((teams.length) == 1)){
      console.log ("got a winning team of : " + teams[0]);
      msg="Team " + teams[0] + " have won!";
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tellraw @a [\""+ msg + "\"]");
    }
    else {
      console.log ("winning teams: " + teams);
    }
  }
};

exports.countTeams = function () {
  //Instantiations;
  var players;
  var teams;
  var teamColor;
  players=server.getOnlinePlayers();
  teams=[];
  for (var i=0; i<parseInt(players.length); i++) {
    if (((players[i].gameMode) == (org.bukkit.GameMode.SURVIVAL))){
      if (players[i].getMetadata("_teamcolor_").length > 0){
        if (((players[i].health) > 0)){
          teamColor=players[i].getMetadata("_teamcolor_")[0].value();
          if (((teams.indexOf(teamColor)) == -1)){
            console.log ("Adding " + teamColor + " to list" );
            teams.push(teamColor);
          }
        }
      }
    }
  }
  return teams;
};

exports.bedWarRespawn  = function (player) {
  //Instantiations;
  var teamColor;
  var location;
  var block;
  var inventory;
  var color;
  if (player.getMetadata("_turndirection_").length > 0){
    player.removeMetadata ("_turndirection_", __plugin );
  }
  teamColor=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_teamcolor_").length == 0)?null:player.getMetadata("_teamcolor_")[0].value();
  if (teamColor != null){
    location=new org.bukkit.Location(server.worlds[0], locations[teamColor].x, locations[teamColor].y, locations[teamColor].z);
    block=server.worlds[0].getBlockAt (location);
    if ((block.getType().toString().indexOf ( 'BED') > -1)){
      player.setGameMode(org.bukkit.GameMode.SURVIVAL);
      inventory=player.inventory;
      inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1));
      inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ARROW,16));
      inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOWBALL,16));
      inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.WHITE_WOOL,32));
      eval ( "color = org.bukkit.Color." + teamColor);
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
      (function() {
        if (player != null ) {
           player.sendMessage ("Sorry " + teamColor + " bed is destroyed. you are now a spectactor");
        }
       })();
      player.setGameMode(org.bukkit.GameMode.SPECTATOR);
    }
    setTimeout (function () {
      (function() {
        if (player != null ) {
           player.sendMessage ("Teleport to base " + location);
        }
       })();
      location = new org.bukkit.Location (server.worlds[0], parseInt(location.x), parseInt(location.y)+5, parseInt(location.z));
      setTimeout (function () {
        player.teleport(location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      },2000);
    },100);
  }
  else {
    setTimeout (function () {
      location=new org.bukkit.Location(server.worlds[0], locations["LOBBY"].x, locations["LOBBY"].y, locations["LOBBY"].z);
      setTimeout (function () {
        player.teleport(location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      },2000);
      (function() {
        if (player != null ) {
           player.sendMessage ("Teleport to lobby ");
        }
       })();
    },100);
  }
};

exports.destroyedBeds = function () {
  //Instantiations;
  var teams;
  var count;
  var location;
  var block;
  teams=['BLUE', 'RED', 'ORANGE','WHITE'];
  count=0;
  for (var i=0; i<4; i++) {
    location=new org.bukkit.Location(server.worlds[0], locations[teams[i]].x, locations[teams[i]].y, locations[teams[i]].z);
    block=server.worlds[0].getBlockAt (location);
    if (((block.getType().toString().indexOf ( 'BED')) == -1)){
      count=count+1;
    }
  }
  return count;
};

exports.locations={  "LOBBY":{  x:-5,y:119,z:11},"BLUE":{  x:38,y:62,z:-80},"RED":{  x:-38,y:62,z:-80},"ORANGE":{  x:80,y:62,z:38},"WHITE":{  x:-38,y:62,z:80}};
exports.restoreBed = function (color) {
  //Instantiations;
  var colors;
  var beds;
  var location;
  colors=['BLUE','RED','ORANGE','WHITE'];
  beds=[org.bukkit.Material.BLUE_BED,org.bukkit.Material.RED_BED,org.bukkit.Material.ORANGE_BED,org.bukkit.Material.WHITE_BED];
  for (var i=0; i<4; i++) {
    if (((color) == (null)) || ((color) == (colors[i]))){
      location=new org.bukkit.Location(server.worlds[0], locations[colors[i]].x, locations[colors[i]].y, locations[colors[i]].z);
      server.worlds[0].getBlockAt (location).setType(beds[i]);
      location = new org.bukkit.Location (server.worlds[0], parseInt(location.x), parseInt(location.y), parseInt(location.z)+1);
      server.worlds[0].getBlockAt (location).setType(beds[i]);
    }
  }
};

exports.bedWarRules = function () {
  //Instantiations;
  var player;
  var stack;
  var name;
  var loc;
  var location;
  var block;
  var data;
  var sign;
  var blocks;
  var entity;
  var entities;
  var x;
  var y;
  var z;
  var command;
  var breakBlocks;
  var destroyBlocks;
  var blockList;
  var destroyBlock;
  var bedBlock;
  var teamColor;
  var teamColors;
  var minecart;
  var directions = [org.bukkit.block.BlockFace.SOUTH,org.bukkit.block.BlockFace.SOUTH_SOUTH_WEST,org.bukkit.block.BlockFace.SOUTH_WEST,org.bukkit.block.BlockFace.WEST_SOUTH_WEST,org.bukkit.block.BlockFace.WEST,org.bukkit.block.BlockFace.WEST_NORTH_WEST,org.bukkit.block.BlockFace.NORTH_WEST,org.bukkit.block.BlockFace.NORTH_NORTH_WEST,org.bukkit.block.BlockFace.NORTH,org.bukkit.block.BlockFace.NORTH_NORTH_EAST,org.bukkit.block.BlockFace.NORTH_EAST,org.bukkit.block.BlockFace.EAST_NORTH_EAST,org.bukkit.block.BlockFace.EAST,org.bukkit.block.BlockFace.EAST_SOUTH_EAST,org.bukkit.block.BlockFace.SOUTH_EAST,org.bukkit.block.BlockFace.SOUTH_SOUTH_EAST];
  var looking;
  var players;
  if (((exports.gameStarted) == (null))){
    exports.gameStarted=1;
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp @a -4 117 12");
    events.playerMove( function (event) {
      player=event.player;
      stack=(player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand();
      name=(stack== null) ? "" : (stack.getItemMeta == null ) ? "" : (stack.getItemMeta() == null ) ? "" : (stack.getItemMeta().getDisplayName == null ) ? "" : stack.getItemMeta().getDisplayName();
      if (name == "Staff of Dynamite"){
        loc=new org.bukkit.Location(server.worlds[0], player.location.x, player.location.y, player.location.z);
        server.worlds[0].getBlockAt (loc.add(1,-1,0)).setType (org.bukkit.Material.TNT);
        server.worlds[0].getBlockAt (loc.add(2,-1,0)).setType (org.bukkit.Material.REDSTONE_TORCH);
      }
      else if (name == "scaffold"){
        loc=new org.bukkit.Location(server.worlds[0], player.location.x, player.location.y, player.location.z);
        server.worlds[0].getBlockAt (loc.add(0,-1,0)).setType (org.bukkit.Material.OAK_WOOD);
      }
    });
    events.playerDeath( function (event) {
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "clear " + event.entity.name);
      getWinningTeam();
    });
    events.projectileHit( function (event) {
      blocks=["SPLASH_POTION"];
      entity=event.entity.getType().toString();
      console.log ("Got a project hit event for " + entity);
      if (blocks.indexOf (entity) == -1){
        server.worlds[0].createExplosion (event.entity.location,1.5);
      }
      else {
        console.log ("No explosion for: " + entity);
      }
    });
    events.potionSplash( function (event) {
      console.log ("Get name of potion");
      name=event.getPotion().getItemMeta().getDisplayName();
      console.log ("potion name: [" + name + "]");
      entities=event.getAffectedEntities();
      for (var i=0; i<parseInt(entities.length); i++) {
        location=entities[i].location;
        x=parseInt(location.x-3);
        y=parseInt(location.y-3);
        z=parseInt(location.z-3);
        if (((name) == "MakeCage")){
          command="fill " + x + " " + y + " " + z + " " + (x+6) + " " + (y+6) + " " + (z+6) + " oak_fence outline";
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), command);
        }
        else if (((name) == "DestroyCage")){
          y=parseInt(location.y);
          command="fill " + x + " " + y + " " + z + " " + (x+6) + " " + (y+6) + " " + (z+6) + " air";
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), command);
        }
        else {
          entities[i].sendMessage("You were splashed by: [" + name + "]" )
        }
      }
    });
    events.blockBreak( function (event) {
      block=(event.block==null)?null:event.block.getType().toString();
      breakBlocks=["WHITE_WOOL","RED_BED", "BLUE_BED", "ORANGE_BED", "WHITE_BED"];
      console.log ("Block broken: " + block);
      if (breakBlocks.indexOf(block) > -1){
        if (block.indexOf ( "BED" ) > -1){
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tellraw @a [\"" + block + " Destroyed\"]");
        }
        else {
          console.log (block + " broken");
        }
      }
      else {
        console.log ("Cancelling block broken event");
        event.cancelled = true;
      }
    });
    events.blockExplode( function (event) {
      destroyBlocks=['AIR','WHITE_WOOL','WHITE_BED', 'RED_BED','ORANGE_BED','BLUE_BED','RAIL','COBBLESTONE','SAND'];
      blockList=event.blockList();
      console.log ("blocklist.length " + blockList.length);
      destroyBlock=true;
      bedBlock=null;
      for (var i=0; i<parseInt(blockList.length); i++) {
        if (blockList[i] != null){
          block=(blockList[i]==null)?null:blockList[i].getType().toString();
          if (destroyBlocks.indexOf(block) == -1){
            destroyBlock=false;
            break;
          }
          else if (block.indexOf ( 'BED') > -1){
            bedBlock=blockList[i];
          }
        }
      }
      if (destroyBlock){
        if (bedBlock != null){
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tellraw @a [\"" + bedBlock.getType() + " Exploded\"]");
        }
      }
      else if (blockList.length > 0){
        console.log ("Cancelling explode event due to [" + block + "]");
        event.cancelled = true;
      }
      else {
        console.log ("No cancel and no blocks exploded");
      }
    });
    events.playerInteract( function (event) {
      block=event.getClickedBlock();
      if (((block) != (null))){
        if (((block.getType().toString()) == "OAK_SIGN")){
          teamColor=(block.state.getLine(1)).toUpperCase();
          fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,teamColor);
          if (event.player != null) {
            if (event.player.setMetadata != null ) {
              event.player.setMetadata ("_teamcolor_", fd );
            }
          }
          teamColors=["RED","BLUE","ORANGE","WHITE"];
          if (teamColors.indexOf (teamColor) > -1){
            console.log ("Players teamColor set to: " + teamColor);
            setTimeout (function () {
              event.player.setHealth(0);
            },500);
          }
          else {
            console.log ("Ignoring team color: " + teamColor + " teams:" + teamColors.toString());
          }
        }
      }
      if (event.player.getMetadata("_minecart_").length > 0){
        minecart=event.player.getMetadata("_minecart_")[0].value();
        if (! (minecart.isEmpty())){
          looking=directions[parseInt(((event.player).getLocation().getYaw() + 368.0 ) / 22.5) % 16];
          looking=looking.toString();
        }
        console.log ("Player changing direction to " + looking);
        if (["EAST","WEST","NORTH","SOUTH"].indexOf (looking) > -1){
          location=minecart.getLocation();
          fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,looking);
          if (event.player != null) {
            if (event.player.setMetadata != null ) {
              event.player.setMetadata ("_turndirection_", fd );
            }
          }
        }
        else {
          console.log ("Ignoring this direction:" + looking);
        }
      }
    });
    events.playerRespawn( function (event) {
      bedWarRespawn (event.player);
    });
    events.vehicleBlockCollision( function (event) {
      console.log ("Vehicle collision detected, explosion created at" + event.vehicle.location);
      location=event.vehicle.location.add(0,3,0);
      event.vehicle.world.createExplosion (location,5.0)
    });
    var test= setInterval (function () {
      if (((server.worlds[0].getTime()) > 5000)){
        server.worlds[0].setTime(0);
        server.worlds[0].setStorm(false);
      }
      if (!(true)) {
        clearInterval (test);
      }
    }, 500);
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "save -off");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "clear @a");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "gamemode survival @a");
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tp @a -5 119 11");
    players=server.getOnlinePlayers();
    for (var i=0; i<parseInt(players.length); i++) {
      players[i].removeMetadata ("_teamcolor_", __plugin );
    }
    autoMinecartGame();
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "say \"deop @a\"");
  }
};

exports.bedWarsJoin  = function (player) {
  setTimeout (function () {
    player.teleport(new org.bukkit.Location(server.worlds[0], -4, 117, 12), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
  },2000);
  (function() {   var h=20;
    if (player.setHealth != null) {
      if (h<0) {
         h = 0;
      }
      player.setHealth(h);  }
   })();
  bedWarRules()
};
