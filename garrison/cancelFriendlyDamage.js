
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
    else {
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,attacker);
      if (target != null) {
        if (target.setMetadata != null ) {
          target.setMetadata ("_attacker_", fd );
        }
      }
    }
  }
};

exports.cancelYo = function (event) {
  (function () {
    var _target;var _team1;var _attacker;var _team2;var _owner;var _fd;
    _target=(event.getEntity== null) ? null : event.getEntity();
    _team1=(_target== null)? null : (_target.getMetadata == null)?null:(_target.getMetadata("_team_").length == 0)?null:_target.getMetadata("_team_")[0].value();
    _attacker=(event.getDamager== null) ? null : event.getDamager();
    _team2=(_attacker== null)? null : (_attacker.getMetadata == null)?null:(_attacker.getMetadata("_team_").length == 0)?null:_attacker.getMetadata("_team_")[0].value();
    _owner=(_attacker== null)? null : (_attacker.getMetadata == null)?null:(_attacker.getMetadata("_owner_").length == 0)?null:_attacker.getMetadata("_owner_")[0].value();
    if ((_team1 != null) && (_team2 != null)) {
       if (_team1 == _team2 ){
          if (_attacker != null ) {
             _attacker.sendMessage ("Ouch! we are on the same team yo");
          }
          if (_owner != null ) {
             _owner.sendMessage ("Stop! we are friends yo");
          }
          event.cancelled = true;
       } else {
         _fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,_attacker);
         if (_target != null) {
            if (_target.setMetadata != null ) {
               _target.setMetadata ("_attacker_", _fd );
            }
         }
       }
    }
  }());

};
