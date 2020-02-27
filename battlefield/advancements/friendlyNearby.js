exports.friendlyNearby  = function ( team, location, radius) {
  //Instantiations;
  var near;
  var players;
  var distance;
  near=false;
  players=server.getOnlinePlayers();
  for (var i=0; i<players.length;i++) {
    distance=location.distance(players[i].location);
    if (((distance) <= (radius))){
      if (((team) == ((players[i]== null)? null : (players[i].getMetadata == null)?null:(players[i].getMetadata("_team_").length == 0)?null:players[i].getMetadata("_team_")[0].value()))){
        near=true;
        break;}
    }
  };
  return near;
};
