exports.m1Garand  = function (event) {
  //Instantiations;
  var player;
  var inhand;
  var stack;
  var fireAgain;
  var projectile;
  var shooter;
  var team;
  if (event instanceof org.bukkit.event.player.PlayerInteractEvent){
    player=(event.getPlayer== null) ? null : event.getPlayer();
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
  }
  else if (event instanceof org.bukkit.event.entity.ProjectileLaunchEvent){
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
  }
  else {
  undefined}
};
