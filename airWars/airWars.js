exports.airWars = function () {
  //Instantiations;
  var player;
  var item;
  var name;
  events.playerItemConsume( function (event) {
    player=event.player;
    item=event.getItem().getType();
    if ((item) == (org.bukkit.Material.POTION)){
      name=(item== null) ? "" : (item.getItemMeta() == null ) ? "" : item.getItemMeta().getDisplayName();
      console.log ("Consumed item with name:[" + name + "]" );
    }
  });
};
