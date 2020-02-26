exports.cancelFriendlyDamage  = function (event) {
  //Instantiations;
  var target;
  var team1;
  var attacker;
  var team2;
  var owner;
  target=(event.getEntity== null) ? null : event.getEntity();
  team1=(target== null)? null : (target.getMetadata == null)?null:(target.getMetadata("_team_").length == 0)?null:target.getMetadata("_team_")[0].value();
  attacker=(event.getDamager== null) ? null : event.getDamager();
  console.log (target + " was damaged by: " + attacker );
  team2=(attacker== null)? null : (attacker.getMetadata == null)?null:(attacker.getMetadata("_team_").length == 0)?null:attacker.getMetadata("_team_")[0].value();
  owner=(attacker== null)? null : (attacker.getMetadata == null)?null:(attacker.getMetadata("_owner_").length == 0)?null:attacker.getMetadata("_owner_")[0].value();
  if (((team1) == (null)) || ((team2) == (null))){
    console.log ("Got a null team");
  }
  else {
    if (((team1) == (team2))){
      (function() {
        if (attacker != null ) {
           attacker.sendMessage ("Ouch! we are on the same team yo");
        }
       })();
      (function() {
        if (owner != null ) {
           owner.sendMessage ("Stop! we are friends");
        }
       })();
      event.cancelled = true;
    }
  }
};
