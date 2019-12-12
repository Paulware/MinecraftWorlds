exports.airWars = function () {
  //Instantiations;
  var player;
  var item;
  var name;
  var location;
  var entity;
  var TeleportCause;
  events.playerItemConsume( function (event) {
    player=event.player;
    item=event.getItem();
    if ((item.getType()) == (org.bukkit.Material.POTION)){
      name=(item== null) ? "" : (item.getItemMeta() == null ) ? "" : item.getItemMeta().getDisplayName();
      if ((name) == "up"){
        player.teleport(player.location.add (0,70,0), org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN);
        player.getInventory().setItem (0,new org.bukkit.inventory.ItemStack (org.bukkit.Material.FIREWORK_ROCKET,16) );
        player.getInventory().setItem (1,new org.bukkit.inventory.ItemStack (org.bukkit.Material.SNOWBALL,32) );
      }
      console.log ("Consumed item with name:[" + name + "]" );
    }
  });
};
