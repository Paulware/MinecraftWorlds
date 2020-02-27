exports.explodeSnowballs = function (event) {
  //Instantiations;
  var projectile;
  projectile=(event.getEntity== null) ? null : event.getEntity();
  if (((projectile.getType()) == (org.bukkit.entity.EntityType.SNOWBALL))){
    server.worlds[0].createExplosion (projectile.location,3);
  }
};
