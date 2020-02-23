exports.teamBeacon  = function (location) {
  //Instantiations;
  var block;
  var data;
  var sign;
  var _data;
  var _block;
  var b;
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + -1,location.y + -1,location.z + 1);  return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + 0,location.y + -1,location.z + 1);  return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + 1,location.y + -1,location.z + 1);  return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + -1,location.y + -1,location.z + -1);  return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + 0,location.y + -1,location.z + -1);  return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + 1,location.y + -1,location.z + -1);  return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + -1,location.y + -1,location.z + 0);  return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + 1,location.y + -1,location.z + 0);  return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + 0,location.y + -1,location.z + 0);  return loc; })()).setType (org.bukkit.Material.DIAMOND_BLOCK);
  server.worlds[0].getBlockAt (location).setType (org.bukkit.Material.BEACON);
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + 1,location.y + 0,location.z + 0);  return loc; })()).setType (org.bukkit.Material.IRON_BLOCK);
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + -1,location.y + 0,location.z + 0);  return loc; })()).setType (org.bukkit.Material.IRON_BLOCK);
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + 2,location.y + 0,location.z + 0);  return loc; })()).setType (org.bukkit.Material.IRON_BLOCK);
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + 3,location.y + 0,location.z + 0);  return loc; })()).setType (org.bukkit.Material.LEVER);
  _block = server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + 3,location.y + 0,location.z + 0);  return loc; })())
  _data = _block.getBlockData();
  _data.setFacing(org.bukkit.block.BlockFace.EAST)
  _block.setBlockData(_data)
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + -2,location.y + 0,location.z + 0);  return loc; })()).setType (org.bukkit.Material.IRON_BLOCK);
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + -3,location.y + 0,location.z + 0);  return loc; })()).setType (org.bukkit.Material.LEVER);
  _block = server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + -3,location.y + 0,location.z + 0);  return loc; })())
  _data = _block.getBlockData();
  _data.setFacing(org.bukkit.block.BlockFace.WEST)
  _block.setBlockData(_data)
  b=new org.bukkit.Location(server.worlds[0], 100, 100, 100);
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + 2,location.y + 1,location.z + 0);  return loc; })()).setType (org.bukkit.Material.PISTON);
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + 1,location.y + 1,location.z + 0);  return loc; })()).setType (org.bukkit.Material.BLUE_STAINED_GLASS);
  _block = server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + 2,location.y + 1,location.z + 0);  return loc; })())
  _data = _block.getBlockData();
  _data.setFacing(org.bukkit.block.BlockFace.WEST)
  _block.setBlockData(_data)
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + -2,location.y + 1,location.z + 0);  return loc; })()).setType (org.bukkit.Material.PISTON);
  _block = server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + -2,location.y + 1,location.z + 0);  return loc; })())
  _data = _block.getBlockData();
  _data.setFacing(org.bukkit.block.BlockFace.EAST)
  _block.setBlockData(_data)
  server.worlds[0].getBlockAt ((function() {   var loc = new org.bukkit.Location(server.worlds[0],location.x + -1,location.y + 1,location.z + 0);  return loc; })()).setType (org.bukkit.Material.RED_STAINED_GLASS);
};

exports.battlefield = function () {
};
