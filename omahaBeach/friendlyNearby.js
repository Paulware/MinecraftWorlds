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
        break;
      }
    }
  };
  return near;
};

exports.friendlyNearbyYo  = function (team,location,radius) {
  var near;
  near=function () { 
   var _near;
   var _players;
   var _distance;
   _near=false;
   _players=server.getOnlinePlayers();
   for (var _i=0; _i<_players.length;_i++) {
      _distance=location.distance(_players[_i].location);
      if(_distance <= radius){
         if ((team== ((_players[_i]== null)? null : (_players[_i].getMetadata == null)?null:(_players[_i].getMetadata("_team_").length == 0)?null:_players[_i].getMetadata("_team_")[0].value()))){
            _near=true;break;
         }
      }
   }
  return _near;}();
  return near;
};
