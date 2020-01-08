exports.scanBlocks  = function (name,x,y,z) {
  var block;
  var location = self.location;
  var filename = "scriptcraft/plugins/" + name + ".js";
  var fileWriter = new java.io.FileWriter (filename);
  var writer = new java.io.BufferedWriter (fileWriter, 1024); 
  writer.write ("exports." + name + " = function (location) {\n");
  writer.write ("  if (location == undefined) {\n" );
  writer.write ("    location = self.location\n" );
  writer.write ("  }\n" );
  writer.write ("  var loc;\n" );
  for (var i=0; i<parseInt(x); i++) {
    for (var j=0; j<parseInt(y); j++) {
      for (var k=0; k<parseInt(z); k++) {
        loc=new org.bukkit.Location (server.worlds[0], parseInt(location.x)+i, parseInt(location.y)+j, parseInt(location.z)+k);
        block=server.worlds[0].getBlockAt (loc);
        if ((block.type != "AIR") && (block.type != "GRASS_BLOCK") && (block.type != "VOID_AIR") &&
            (block.type != "DIRT") && (block.type != "BEDROCK") && (block.type != "GRASS_PATH")) { 
          writer.write ("  loc = new org.bukkit.Location (server.worlds[0],parseInt(location.x)+" + i + ",parseInt(location.y)+" + j + ",parseInt(location.z)+" + k + ");\n");
          writer.write ("  server.worlds[0].getBlockAt(loc).setType (org.bukkit.Material." + block.type + ");\n" );
        }
      }
      // - z 
      for (var k=0; k<parseInt(z); k++) {
        loc=new org.bukkit.Location (server.worlds[0], parseInt(location.x)+i, parseInt(location.y)+j, parseInt(location.z)-k);
        block=server.worlds[0].getBlockAt (loc);
        if ((block.type != "AIR") && (block.type != "GRASS_BLOCK") && (block.type != "VOID_AIR") &&
            (block.type != "DIRT") && (block.type != "BEDROCK") && (block.type != "GRASS_PATH")) { 
          writer.write ("  loc = new org.bukkit.Location (server.worlds[0],parseInt(location.x)+" + i + ",parseInt(location.y)+" + j + ",parseInt(location.z)-" + k + ");\n");
          writer.write ("  server.worlds[0].getBlockAt(loc).setType (org.bukkit.Material." + block.type + ");\n" );
        }
      }
    }
    // -y (limited to 3) 
    for (var j=0; j<3; j++) {
      for (var k=0; k<parseInt(z); k++) {
        loc=new org.bukkit.Location (server.worlds[0], parseInt(location.x)+i, parseInt(location.y)-j, parseInt(location.z)+k);
        block=server.worlds[0].getBlockAt (loc);
        if ((block.type != "AIR") && (block.type != "GRASS_BLOCK") && (block.type != "VOID_AIR") &&
            (block.type != "DIRT") && (block.type != "BEDROCK") && (block.type != "GRASS_PATH")) { 
          writer.write ("  loc = new org.bukkit.Location (server.worlds[0],parseInt(location.x)+" + i + ",parseInt(location.y)-" + j + ",parseInt(location.z)+" + k + ");\n");
          writer.write ("  server.worlds[0].getBlockAt(loc).setType (org.bukkit.Material." + block.type + ");\n" );
        }
      }
      // - z 
      for (var k=0; k<parseInt(z); k++) {
        loc=new org.bukkit.Location (server.worlds[0], parseInt(location.x)+i, parseInt(location.y)-j, parseInt(location.z)-k);
        block=server.worlds[0].getBlockAt (loc);
        if ((block.type != "AIR") && (block.type != "GRASS_BLOCK") && (block.type != "VOID_AIR") &&
            (block.type != "DIRT") && (block.type != "BEDROCK") && (block.type != "GRASS_PATH")) { 
          writer.write ("  loc = new org.bukkit.Location (server.worlds[0],parseInt(location.x)+" + i + ",parseInt(location.y)-" + j + ",parseInt(location.z)-" + k + ");\n");
          writer.write ("  server.worlds[0].getBlockAt(loc).setType (org.bukkit.Material." + block.type + ");\n" );
        }
      }
    }
  }
  // -x
  for (var i=0; i<parseInt(x); i++) {
    for (var j=0; j<parseInt(y); j++) {
      for (var k=0; k<parseInt(z); k++) {
        loc=new org.bukkit.Location (server.worlds[0], parseInt(location.x)-i, parseInt(location.y)+j, parseInt(location.z)+k);
        block=server.worlds[0].getBlockAt (loc);
        if ((block.type != "AIR") && (block.type != "GRASS_BLOCK") && (block.type != "VOID_AIR") &&
            (block.type != "DIRT") && (block.type != "BEDROCK") && (block.type != "GRASS_PATH")) { 
          writer.write ("  loc = new org.bukkit.Location (server.worlds[0],parseInt(location.x)-" + i + ",parseInt(location.y)+" + j + ",parseInt(location.z)+" + k + ");\n");
          writer.write ("  server.worlds[0].getBlockAt(loc).setType (org.bukkit.Material." + block.type + ");\n" );
        }
      }
      // - z 
      for (var k=0; k<parseInt(z); k++) {
        loc=new org.bukkit.Location (server.worlds[0], parseInt(location.x)-i, parseInt(location.y)+j, parseInt(location.z)-k);
        block=server.worlds[0].getBlockAt (loc);
        if ((block.type != "AIR") && (block.type != "GRASS_BLOCK") && (block.type != "VOID_AIR") &&
            (block.type != "DIRT") && (block.type != "BEDROCK") && (block.type != "GRASS_PATH")) { 
          writer.write ("  loc = new org.bukkit.Location (server.worlds[0],parseInt(location.x)-" + i + ",parseInt(location.y)+" + j + ",parseInt(location.z)-" + k + ");\n");
          writer.write ("  server.worlds[0].getBlockAt(loc).setType (org.bukkit.Material." + block.type + ");\n" );
        }
      }
    }
    // - y (limited to 3)
    for (var j=0; j<3; j++) {
      for (var k=0; k<parseInt(z); k++) {
        loc=new org.bukkit.Location (server.worlds[0], parseInt(location.x)-i, parseInt(location.y)-j, parseInt(location.z)+k);
        block=server.worlds[0].getBlockAt (loc);
        if ((block.type != "AIR") && (block.type != "GRASS_BLOCK") && (block.type != "VOID_AIR") &&
            (block.type != "DIRT") && (block.type != "BEDROCK") && (block.type != "GRASS_PATH")) { 
          writer.write ("  loc = new org.bukkit.Location (server.worlds[0],parseInt(location.x)-" + i + ",parseInt(location.y)-" + j + ",parseInt(location.z)+" + k + ");\n");
          writer.write ("  server.worlds[0].getBlockAt(loc).setType (org.bukkit.Material." + block.type + ");\n" );
        }
      }
      // - z 
      for (var k=0; k<parseInt(z); k++) {
        loc=new org.bukkit.Location (server.worlds[0], parseInt(location.x)-i, parseInt(location.y)-j, parseInt(location.z)-k);
        block=server.worlds[0].getBlockAt (loc);
        if ((block.type != "AIR") && (block.type != "GRASS_BLOCK") && (block.type != "VOID_AIR") &&
            (block.type != "DIRT") && (block.type != "BEDROCK") && (block.type != "GRASS_PATH")) { 
          writer.write ("  loc = new org.bukkit.Location (server.worlds[0],parseInt(location.x)-" + i + ",parseInt(location.y)-" + j + ",parseInt(location.z)-" + k + ");\n");
          writer.write ("  server.worlds[0].getBlockAt(loc).setType (org.bukkit.Material." + block.type + ");\n" );
        }
      }
    }	
  }
  writer.write ("}\n");
  writer.flush();
  writer.close();
  self.sendMessage (filename + " created, to test:  /reload, /js " + name + "(self.location)");  
};
