exports.towerDefense = function () {
  //Instantiations;
  var player;
  var block;
  var line;
  var inhand;
  var stack;
  var fireAgain;
  var projectile;
  var shooter;
  var team;
  events.playerInteract( function (event) {
    if (event instanceof org.bukkit.event.player.PlayerInteractEvent){
      console.log ("this is a player interact event");
    }
    else {
      console.log ("this is an " + event + " type event" );
    }
    player=(event.getPlayer== null) ? null : event.getPlayer();
    block=(event.getClickedBlock== null) ? null : event.getClickedBlock();
    line=(block==null)?null: (block.state.getLine == null)?null:block.state.getLine(1);
    inhand=(player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand();
    stack=(inhand== null) ? null : (inhand.getItemMeta == null) ? null : (inhand.getItemMeta() == null)?null:inhand.getItemMeta().getDisplayName();
    if (((stack) == "M1-Garand")){
      fireAgain=(player== null)? null : (player.getMetadata == null)?null:(player.getMetadata("_fireagain_").length == 0)?null:player.getMetadata("_fireagain_")[0].value();
      if (((new Date().getTime()) > (fireAgain))){
        projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.ARROW);
        player.launchProjectile(projectile.getClass());
        fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,(new Date().getTime()) + 1000);
        if (player != null) {
          if (player.setMetadata != null ) {
            player.setMetadata ("_fireagain_", fd );
          }
        }
      }
    }
    events.projectileLaunch( function (event) {
      projectile=(event.getEntity== null) ? null : event.getEntity();
      shooter=(projectile == null) ? null : (projectile.getShooter == null) ? null : projectile.getShooter();
      team=(shooter== null)? null : (shooter.getMetadata == null)?null:(shooter.getMetadata("_team_").length == 0)?null:shooter.getMetadata("_team_")[0].value();
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,team);
      if (projectile != null) {
        if (projectile.setMetadata != null ) {
          projectile.setMetadata ("_team_", fd );
        }
      }
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,shooter);
      if (projectile != null) {
        if (projectile.setMetadata != null ) {
          projectile.setMetadata ("_owner_", fd );
        }
      }
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
  });
};

exports.towerDefenseJoin = function (player) {
  player.setWalkSpeed (0.2)
  player.getInventory().clear();
  player.removeMetadata ("_score_", __plugin );
  player.removeMetadata ("_team_", __plugin );
  setTimeout (function () {
    player.teleport(new org.bukkit.Location(server.worlds[0], 50, 10, -914), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
  },2000);
  player.setGameMode(org.bukkit.GameMode.SURVIVAL);
  towerDefense();
};
