exports.startGame = function () {
  exports.gameStarted=null;
  org.bukkit.Bukkit.dispatchCommand(org.bukkit.Bukkit.getConsoleSender(), "kick @a Restarting Game Yo");
};