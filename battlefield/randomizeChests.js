exports.randomizeChests = function (goodies) {
  //Instantiations;
  var w;
  var chunks;
  var chunk;
  var blocks;
  var blockType;
  var inventory;
  w=server.worlds[0];
  chunks=w.getLoadedChunks();
  for (var i=0; i<chunks.length;i++) {
    chunk=chunks[i];
    blocks=chunk.getTileEntities();
    for (var j=0; j<blocks.length;j++) {
      blockType=(blocks[j]==null)?null:blocks[j].getType();
      if (((blockType) == (org.bukkit.Material.CHEST))){
        inventory=blocks[j].getBlockInventory();
        inventory.clear()
        for (var k=0; k<goodies.length;k++) {
          if (((parseInt (Math.random () * (100-1)) + 1) > 50)){
            inventory.addItem (goodies[k]);
          }
        };
      }
    };
  };
  console.log ("Updated chests");
};
