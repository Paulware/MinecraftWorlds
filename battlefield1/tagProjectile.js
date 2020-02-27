exports.tagProjectile  = function (event) {
  //Instantiations;
  var projectile;
  var shooter;
  var team;
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
};
