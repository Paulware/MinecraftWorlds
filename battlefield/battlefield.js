exports.teamBeacon  = function (location) {
  //Instantiations;
  var block;
  var data;
  var sign;
  var _data;
  var _block;
  server.worlds[0].getBlockAt ((function() { var x = location.x-1;var y = location.y-1;var z = location.z1;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x0;var y = location.y-1;var z = location.z1;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x1;var y = location.y-1;var z = location.z1;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x-1;var y = location.y-1;var z = location.z-1;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x0;var y = location.y-1;var z = location.z-1;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x1;var y = location.y-1;var z = location.z-1;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x-1;var y = location.y-1;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x1;var y = location.y-1;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x0;var y = location.y-1;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt (location).setType (org.bukkit.Material.BEACON);
  server.worlds[0].getBlockAt ((function() { var x = location.x1;var y = location.y0;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.IRON_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x-1;var y = location.y0;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.IRON_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x2;var y = location.y0;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.IRON_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x3;var y = location.y0;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.IRON_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x3;var y = location.y1;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.OAK_BUTTON);
  server.worlds[0].getBlockAt ((function() { var x = location.x-2;var y = location.y0;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.IRON_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x-3;var y = location.y0;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.IRON_BLOCK);
  server.worlds[0].getBlockAt ((function() { var x = location.x-3;var y = location.y1;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.OAK_BUTTON);
  server.worlds[0].getBlockAt ((function() { var x = location.x2;var y = location.y1;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.PISTON);
  server.worlds[0].getBlockAt ((function() { var x = location.x1;var y = location.y1;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.BLUE_STAINED_GLASS);
  _block = server.worlds[0].getBlockAt ((function() { var x = location.x2;var y = location.y1;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);)
  _data = _block.getBlockData();
  _data.setFacing(org.bukkit.block.BlockFace.WEST)
  _block.setBlockData(_data)
  server.worlds[0].getBlockAt ((function() { var x = location.x-2;var y = location.y1;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.PISTON);
  _block = server.worlds[0].getBlockAt ((function() { var x = location.x-2;var y = location.y1;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);)
  _data = _block.getBlockData();
  _data.setFacing(org.bukkit.block.BlockFace.EAST)
  _block.setBlockData(_data)
  server.worlds[0].getBlockAt ((function() { var x = location.x-1;var y = location.y1;var z = location.z0;var loc = new org.bukkit.Location(server.worlds[0],x,y,z);).setType (org.bukkit.Material.RED_STAINED_GLASS);
};

exports.battlefield = function () {
  //Instantiations;
  var objective;
  var beacons;
  var x;
  var y;
  var z;
  var block;
  var blockType;
  var value;
  exports.redScore=0;
  exports.blueScore=0;
  var manager = org.bukkit.Bukkit.getScoreboardManager();
  exports.board = manager.getNewScoreboard();
  var objective = exports.board.registerNewObjective("objective1", "HEALTH", "Scoreboard");
  objective.setDisplaySlot(org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
  objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
  objective.setDisplayName("Battlefield Red Team: 0  Blue Team: 0");
  objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
  objective.getScore(self).setScore(0);
  self.setScoreboard (exports.board);
  beacons=[[552,101,-1115]];
  var yo= setInterval (function () {
    for (var i=0; i<beacons.length;i++) {
      x=beacons[i][0];
      y=beacons[i][1] + 1;
      z=beacons[i][2];
      block=server.worlds[0].getBlockAt (new org.bukkit.Location(server.worlds[0], x, y, z));
      blockType=(block==null)?null:block.getType();
      if (((blockType) == (org.bukkit.Material.BLUE_STAINED_GLASS))){
        (function () {
          var value = ( exports.blueScore==null)?0:exports.blueScore;
          exports.blueScore= value+1;
        })();
      }
      else if (((blockType) == (org.bukkit.Material.RED_STAINED_GLASS))){
        (function () {
          var value = ( exports.redScore==null)?0:exports.redScore;
          exports.redScore= value+1;
        })();
      }
      objective = exports.board.getObjective (org.bukkit.scoreboard.DisplaySlot.SIDEBAR);
      objective.setDisplayName("Battlefield Red Team:" + exports.redScore + "  Blue Team: " + exports.blueScore);
      console.log (blockType);
    };
    if (!(true)) {
      clearInterval (yo);
    }
  }, 3000);
};
