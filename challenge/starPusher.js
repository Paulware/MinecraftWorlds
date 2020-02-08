exports.challengeReset1 = function () {
  //Instantiations;
  var diamonds;
  var list;
  var y;
  var x;
  var z;
  var location;
  var block;
  var data;
  var loc;
  var sign;
  var upLocation;
  diamonds=[[-1313,-142], [-1312,-143], [-1311,-144], [-1310,-145]];
  list=[[-1310,-146], [-1309,-146], [-1308,-146], [-1308,-145], [-1309,-145], [-1310,-145], [-1311,-145], [-1309,-144], [-1310,-144], [-1311,-144], [-1312,-144], [-1310,-143], [-1311,-143], [-1312,-143], [-1313,-143], [-1311,-142], [-1312,-142], [-1313,-142], [-1314,-142], [-1312,-141], [-1313,-141], [-1314,-141], [-1314,-140], [-1313,-140], [-1312,-140]];
  y=82;
  for (var i=0; i<list.length;i++) {
    x=list[i][0];
    z=list[i][1];
    location=new org.bukkit.Location(server.worlds[0], x, y, z);
    server.worlds[0].getBlockAt (location).setType (org.bukkit.Material.AIR);
    upLocation=(function() {
      var _location = new org.bukkit.Location(server.worlds[0], location.x, location.y, location.z);
      if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.NORTH ) {
         _location.add (0,0,-1);
      }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.SOUTH ) {
         _location.add (0,0,1);
      }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.EAST ) {
         _location.add (1,0,0);
      }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.WEST ) {
         _location.add (-1,0,0);
      }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.UP ) {
         _location.add (0,1,0);
      }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.DOWN ) {
         _location.add (0,-1,0);
      }
      return _location;
     })();
    server.worlds[0].getBlockAt (upLocation).setType (org.bukkit.Material.AIR);
  };
  for (var i=0; i<diamonds.length;i++) {
    x=diamonds[i][0];
    z=diamonds[i][1];
    location=new org.bukkit.Location(server.worlds[0], x, y, z);
    server.worlds[0].getBlockAt (location).setType (org.bukkit.Material.DIAMOND_BLOCK);
    upLocation=(function() {
      var _location = new org.bukkit.Location(server.worlds[0], location.x, location.y, location.z);
      if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.NORTH ) {
         _location.add (0,0,-1);
      }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.SOUTH ) {
         _location.add (0,0,1);
      }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.EAST ) {
         _location.add (1,0,0);
      }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.WEST ) {
         _location.add (-1,0,0);
      }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.UP ) {
         _location.add (0,1,0);
      }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.DOWN ) {
         _location.add (0,-1,0);
      }
      return _location;
     })();
    server.worlds[0].getBlockAt (upLocation).setType (org.bukkit.Material.DIAMOND_BLOCK);
  };
};

exports.starPusher = function () {
  //Instantiations;
  var clearLocations;
  var blockType;
  var location;
  var block;
  var data;
  var loc;
  var sign;
  var underBlock;
  var underType;
  var blockLocation;
  var blockFace;
  var directions;
  var pistonLocation;
  var redstoneLocation;
  var newLocation;
  var _data;
  var _block;
  var diamondLocation;
  var aboveDiamond;
  var aboveOld;
  clearLocations=[];
  var myTask= setInterval (function () {
    if (((clearLocations.length) > 0)){
      blockType=(server.worlds[0].getBlockAt (clearLocations[0])==null)?null:server.worlds[0].getBlockAt (clearLocations[0]).getType();
      if (((blockType) != (org.bukkit.Material.DIAMOND_BLOCK))){
        server.worlds[0].getBlockAt (clearLocations[0]).setType (org.bukkit.Material.AIR);
        clearLocations.splice (0,1);
      }
    }
    if (!(true)) {
      clearInterval (myTask);
    }
  }, 200);
  events.playerInteract( function (event) {
    block=(event.getClickedBlock== null) ? null : event.getClickedBlock();
    blockType=(block==null)?null:block.getType();
    if (((blockType) == (org.bukkit.Material.DIAMOND_BLOCK))){
      underBlock=server.worlds[0].getBlockAt ((function() {
        var _location = new org.bukkit.Location(server.worlds[0], block.location.x, block.location.y, block.location.z);
        if ((org.bukkit.block.BlockFace.DOWN) == org.bukkit.block.BlockFace.NORTH ) {
           _location.add (0,0,-1);
        }else if ((org.bukkit.block.BlockFace.DOWN) == org.bukkit.block.BlockFace.SOUTH ) {
           _location.add (0,0,1);
        }else if ((org.bukkit.block.BlockFace.DOWN) == org.bukkit.block.BlockFace.EAST ) {
           _location.add (1,0,0);
        }else if ((org.bukkit.block.BlockFace.DOWN) == org.bukkit.block.BlockFace.WEST ) {
           _location.add (-1,0,0);
        }else if ((org.bukkit.block.BlockFace.DOWN) == org.bukkit.block.BlockFace.UP ) {
           _location.add (0,1,0);
        }else if ((org.bukkit.block.BlockFace.DOWN) == org.bukkit.block.BlockFace.DOWN ) {
           _location.add (0,-1,0);
        }
        return _location;
       })());
      underType=(underBlock==null)?null:underBlock.getType();
      blockLocation=block.location;
      if (((underType) == (org.bukkit.Material.DIAMOND_BLOCK))){
        blockLocation=underBlock.location;
      }
      blockFace=(event.getBlockFace== null) ? null : event.getBlockFace();
      console.log ("blockFace: " + blockFace);
      directions=[org.bukkit.block.BlockFace.EAST, org.bukkit.block.BlockFace.WEST, org.bukkit.block.BlockFace.NORTH, org.bukkit.block.BlockFace.SOUTH];
      if ((directions.indexOf ( blockFace) >= 0)){
        pistonLocation=(function() {
          var _location = new org.bukkit.Location(server.worlds[0], blockLocation.x, blockLocation.y, blockLocation.z);
          if ((blockFace) == org.bukkit.block.BlockFace.NORTH ) {
             _location.add (0,0,-1);
          }else if ((blockFace) == org.bukkit.block.BlockFace.SOUTH ) {
             _location.add (0,0,1);
          }else if ((blockFace) == org.bukkit.block.BlockFace.EAST ) {
             _location.add (1,0,0);
          }else if ((blockFace) == org.bukkit.block.BlockFace.WEST ) {
             _location.add (-1,0,0);
          }else if ((blockFace) == org.bukkit.block.BlockFace.UP ) {
             _location.add (0,1,0);
          }else if ((blockFace) == org.bukkit.block.BlockFace.DOWN ) {
             _location.add (0,-1,0);
          }
          return _location;
         })();
        redstoneLocation=(function() {
          var _location = new org.bukkit.Location(server.worlds[0], pistonLocation.x, pistonLocation.y, pistonLocation.z);
          if ((blockFace) == org.bukkit.block.BlockFace.NORTH ) {
             _location.add (0,0,-1);
          }else if ((blockFace) == org.bukkit.block.BlockFace.SOUTH ) {
             _location.add (0,0,1);
          }else if ((blockFace) == org.bukkit.block.BlockFace.EAST ) {
             _location.add (1,0,0);
          }else if ((blockFace) == org.bukkit.block.BlockFace.WEST ) {
             _location.add (-1,0,0);
          }else if ((blockFace) == org.bukkit.block.BlockFace.UP ) {
             _location.add (0,1,0);
          }else if ((blockFace) == org.bukkit.block.BlockFace.DOWN ) {
             _location.add (0,-1,0);
          }
          return _location;
         })();
        newLocation=(function() {
          var _location = new org.bukkit.Location(server.worlds[0], blockLocation.x, blockLocation.y, blockLocation.z);
          if (((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
        (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
        (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
        (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
        (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
        (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null) == org.bukkit.block.BlockFace.NORTH ) {
             _location.add (0,0,-1);
          }else if (((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
        (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
        (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
        (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
        (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
        (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null) == org.bukkit.block.BlockFace.SOUTH ) {
             _location.add (0,0,1);
          }else if (((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
        (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
        (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
        (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
        (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
        (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null) == org.bukkit.block.BlockFace.EAST ) {
             _location.add (1,0,0);
          }else if (((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
        (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
        (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
        (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
        (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
        (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null) == org.bukkit.block.BlockFace.WEST ) {
             _location.add (-1,0,0);
          }else if (((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
        (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
        (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
        (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
        (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
        (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null) == org.bukkit.block.BlockFace.UP ) {
             _location.add (0,1,0);
          }else if (((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
        (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
        (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
        (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
        (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
        (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null) == org.bukkit.block.BlockFace.DOWN ) {
             _location.add (0,-1,0);
          }
          return _location;
         })();
        blockType=(server.worlds[0].getBlockAt (newLocation)==null)?null:server.worlds[0].getBlockAt (newLocation).getType();
        console.log ( 'blockType of newLocation:' + blockType + ' location: ' + newLocation );
        if (((blockType) == (org.bukkit.Material.AIR))){
          blockType=(server.worlds[0].getBlockAt (redstoneLocation)==null)?null:server.worlds[0].getBlockAt (redstoneLocation).getType();
          if (((blockType) == (org.bukkit.Material.AIR))){
            console.log ("blockType at redstoneLocation: " + blockType);
            clearLocations.push (pistonLocation)
            clearLocations.push (redstoneLocation)
            server.worlds[0].getBlockAt (pistonLocation).setType (org.bukkit.Material.PISTON);
            _block = server.worlds[0].getBlockAt (pistonLocation)
            _data = _block.getBlockData();
            _data.setFacing((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
            (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
            (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
            (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
            (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
            (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null)
            _block.setBlockData(_data)
            server.worlds[0].getBlockAt (redstoneLocation).setType (org.bukkit.Material.REDSTONE_BLOCK);
          }
          else {
            diamondLocation=(function() {
              var _location = new org.bukkit.Location(server.worlds[0], blockLocation.x, blockLocation.y, blockLocation.z);
              if (((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
            (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
            (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
            (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
            (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
            (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null) == org.bukkit.block.BlockFace.NORTH ) {
                 _location.add (0,0,-1);
              }else if (((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
            (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
            (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
            (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
            (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
            (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null) == org.bukkit.block.BlockFace.SOUTH ) {
                 _location.add (0,0,1);
              }else if (((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
            (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
            (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
            (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
            (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
            (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null) == org.bukkit.block.BlockFace.EAST ) {
                 _location.add (1,0,0);
              }else if (((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
            (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
            (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
            (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
            (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
            (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null) == org.bukkit.block.BlockFace.WEST ) {
                 _location.add (-1,0,0);
              }else if (((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
            (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
            (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
            (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
            (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
            (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null) == org.bukkit.block.BlockFace.UP ) {
                 _location.add (0,1,0);
              }else if (((blockFace== org.bukkit.block.BlockFace.NORTH)? org.bukkit.block.BlockFace.SOUTH :
            (blockFace== org.bukkit.block.BlockFace.SOUTH)? org.bukkit.block.BlockFace.NORTH :
            (blockFace== org.bukkit.block.BlockFace.EAST)? org.bukkit.block.BlockFace.WEST :
            (blockFace== org.bukkit.block.BlockFace.WEST)? org.bukkit.block.BlockFace.EAST :
            (blockFace== org.bukkit.block.BlockFace.UP)? org.bukkit.block.BlockFace.DOWN :
            (blockFace== org.bukkit.block.BlockFace.DOWN)? org.bukkit.block.BlockFace.UP : null) == org.bukkit.block.BlockFace.DOWN ) {
                 _location.add (0,-1,0);
              }
              return _location;
             })();
            server.worlds[0].getBlockAt (diamondLocation).setType (org.bukkit.Material.DIAMOND_BLOCK);
            server.worlds[0].getBlockAt (blockLocation).setType (org.bukkit.Material.AIR);
            aboveDiamond=(function() {
              var _location = new org.bukkit.Location(server.worlds[0], diamondLocation.x, diamondLocation.y, diamondLocation.z);
              if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.NORTH ) {
                 _location.add (0,0,-1);
              }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.SOUTH ) {
                 _location.add (0,0,1);
              }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.EAST ) {
                 _location.add (1,0,0);
              }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.WEST ) {
                 _location.add (-1,0,0);
              }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.UP ) {
                 _location.add (0,1,0);
              }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.DOWN ) {
                 _location.add (0,-1,0);
              }
              return _location;
             })();
            server.worlds[0].getBlockAt (aboveDiamond).setType (org.bukkit.Material.DIAMOND_BLOCK);
            aboveOld=(function() {
              var _location = new org.bukkit.Location(server.worlds[0], blockLocation.x, blockLocation.y, blockLocation.z);
              if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.NORTH ) {
                 _location.add (0,0,-1);
              }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.SOUTH ) {
                 _location.add (0,0,1);
              }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.EAST ) {
                 _location.add (1,0,0);
              }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.WEST ) {
                 _location.add (-1,0,0);
              }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.UP ) {
                 _location.add (0,1,0);
              }else if ((org.bukkit.block.BlockFace.UP) == org.bukkit.block.BlockFace.DOWN ) {
                 _location.add (0,-1,0);
              }
              return _location;
             })();
            server.worlds[0].getBlockAt (aboveOld).setType (org.bukkit.Material.AIR);
          }
        }
        else {
          console.log ("Blocked by: " + blockType);
        }
      }
    }
  });
};
