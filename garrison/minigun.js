exports.minigun = function (event) {
  //Instantiations;
  var player;
  var inhand;
  var name;
  var i;
  var projectile;
  player=(event.getPlayer== null) ? null : event.getPlayer();
  inhand=(player== null) ? null : ( player.getItemInHand == null) ? null : player.getItemInHand();
  name=(inhand== null) ? null : (inhand.getItemMeta == null) ? null : (inhand.getItemMeta() == null)?null:inhand.getItemMeta().getDisplayName();
  if (((name) == "minigun")){
    i=0;
    var test= setInterval (function () {
      i=i+1;
      projectile=server.worlds[0].spawnEntity(player.location,org.bukkit.entity.EntityType.ARROW);
      player.launchProjectile(projectile.getClass());
      if (!(i<10)) {
        clearInterval (test);
      }
    }, 200);
  }
};
