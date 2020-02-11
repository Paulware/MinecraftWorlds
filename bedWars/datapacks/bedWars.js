exports.countTeams = function () {
  //Instantiations;
  var players;
  var teams;
  var teamColor;
  players=server.getOnlinePlayers();
  teams=[];
  for (var i=0; i<parseInt(players.length); i++) {
    if ((players[i].gameMode) == (org.bukkit.GameMode.SURVIVAL)){
      if (players[i].getMetadata("teamcolor").length > 0){
        if ((players[i].health) > 0){
          teamColor=players[i].getMetadata("teamcolor")[0].value();
          if ((teams.indexOf(teamColor)) == -1){
            console.log ("Adding " + teamColor + " to list" );
            teams.push(teamColor);
          }
        }
      }
    }
  }
  return teams;
};

exports.getWinningTeam = function () {
  //Instantiations;
  var teams;
  var msg;
  if ((exports.destroyedBeds()) > 0){
    teams=exports.countTeams();
    if ((teams.length) == 1){
      console.log ("got a winning team of : " + teams[0]);
      msg="Team " + teams[0] + " have won!";
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tellraw @a [\""+ msg + "\"]");
    }
    else {
      console.log ("winning teams: " + teams);
    }
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
    if ((block.getType().toString().indexOf ( 'BED')) == -1){
      count=count+1;
    }
  }
  return count;
};

exports.restoreBed = function (color) {
  //Instantiations;
  var colors;
  var beds;
  var location;
  colors=['BLUE','RED','ORANGE','WHITE'];
  beds=[org.bukkit.Material.BLUE_BED,org.bukkit.Material.RED_BED,org.bukkit.Material.ORANGE_BED,org.bukkit.Material.WHITE_BED];
  for (var i=0; i<4; i++) {
    if ((color) == (null) || (color) == (colors[i])){
      location=new org.bukkit.Location(server.worlds[0], locations[colors[i]].x, locations[colors[i]].y, locations[colors[i]].z);
      server.worlds[0].getBlockAt (location).setType(beds[i]);
      location = new org.bukkit.Location (server.worlds[0], parseInt(location.x), parseInt(location.y), parseInt(location.z)+1);
      server.worlds[0].getBlockAt (location).setType(beds[i]);
    }
  }
};

exports.cancelWorldSave = function () {
  events.worldSave( function (event) {
    console.log ("Got a world save event, cancelling it.");
    event.cancelled = true;
  });
};

exports.locations={  "LOBBY":{  x:-5,y:119,z:11},"BLUE":{  x:38,y:62,z:-80},"RED":{  x:-38,y:62,z:-80},"ORANGE":{  x:80,y:62,z:38},"WHITE":{  x:-38,y:62,z:80}};
exports.cancelWorldSave();

exports.bedWarRules = function () {
  //Instantiations;
  var block;
  var destroyBlocks;
  var blockList;
  var found;
  var teamColor;
  server.worlds[0].setSpawnLocation(new org.bukkit.Location(server.worlds[0], -4, 117, 12));
  events.playerDeath( function (event) {
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "clear " + event.entity.name);
    getWinningTeam();
  });
  events.projectileHit( function (event) {
    console.log ("Got a Projectile hit event yo");
    console.log (event.entity.location);
    event.entity.world.createExplosion (event.entity.location,1);
  });
  events.blockBreak( function (event) {
    block=event.block.getType().toString();
    console.log ("Block broken: " + block);
    if ((block.indexOf ( 'BED')) > -1){
      org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tellraw @a [\"" + block + " Destroyed\"]");
    }
    else if ((block.indexOf ( 'WOOL')) == -1){
      event.cancelled = true;
    }
  });
  events.blockExplode( function (event) {
    destroyBlocks=['AIR','WHITE_WOOL','BED','null'];
    blockList=event.blockList();
    console.log ("blocklist.length " + blockList.length);
    found=false;
    for (var i=0; i<parseInt(blockList.length); i++) {
      block=blockList[i].getType().toString();
      for (var j=0; j<parseInt(destroyBlocks.length); j++) {
        if ((block.indexOf (destroyBlocks[j])) > -1){
          found=true;
          break;
        }
      }
      if (found){
        break;
      }
    }
    if (found){
      for (var i=0; i<parseInt(blockList.length); i++) {
        block=blockList[i].getType().toString();
        if ((block.indexOf ( 'BED')) > -1){
          org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "tellraw @a [\"" + block + " Exploded\"]");
        }
        else {
          console.log ("Not cancelling the explode event on a " + block + " block");
        }
      }
    }
    else {
      console.log ("Cancelling explode event due to " + block);
      event.cancelled = true;
    }
  });
  events.playerInteract( function (event) {
    block=event.getClickedBlock();
    if ((block) != (null)){
      if ((block.getType()) == "OAK_SIGN"){
        teamColor=(block.state.getLine(1)).toUpperCase();
        fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,teamColor);
        event.player.setMetadata ("teamcolor", fd );
        console.log ("Players teamColor set to: " + teamColor);
        event.player.setHealth (0.0);
      }
    }
  });
  events.playerRespawn( function (event) {
    bedWarRespawn (event.player);
  });
  var test= setInterval (function () {
    if ((server.worlds[0].getTime()) > 5000){
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
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kill @a");
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "deop @a");
  if ((self.name) != "CONSOLE"){
    self.removeMetadata ("teamcolor", __plugin );
    org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "op " + self.name);
  }
};

exports.bedWarRespawn  = function (player) {
  //Instantiations;
  var teamColor;
  var location;
  var block;
  var color;
  var entity;
  var TeleportCause;
  if (player.getMetadata("teamcolor").length > 0){
    teamColor=player.getMetadata("teamcolor")[0].value();
    location=new org.bukkit.Location(server.worlds[0], locations[teamColor].x, locations[teamColor].y, locations[teamColor].z);
    block=server.worlds[0].getBlockAt (location);
    if ((block.getType().toString().indexOf ( 'BED') > -1)){
      player.setGameMode(org.bukkit.GameMode.SURVIVAL);
      player.inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.CROSSBOW,1));
      player.inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.ARROW,16));
      player.inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOWBALL,16));
      player.inventory.addItem (new org.bukkit.inventory.ItemStack (org.bukkit.Material.WHITE_WOOL,32));
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
      player.sendMessage ("Sorry " + teamColor + " bed is destroyed. You are now a spectator");
      player.setGameMode(org.bukkit.GameMode.SPECTATOR);
    }
    setTimeout (function () {
      player.sendMessage ("Teleport to base " + location);
      location = new org.bukkit.Location (server.worlds[0], parseInt(location.x), parseInt(location.y)+5, parseInt(location.z));
      entity = player;
      entity.teleport(location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
    },100);
  }
  else {
    setTimeout (function () {
      location=new org.bukkit.Location(server.worlds[0], locations["LOBBY"].x, locations["LOBBY"].y, locations["LOBBY"].z);
      entity = player;
      entity.teleport(location, org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
      player.sendMessage ("Teleport to lobby");
    },100);
  }
};
