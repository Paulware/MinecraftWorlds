exports.getTeamSign  = function (event, teams,line) {
  //Instantiations;
  var player;
  var block;
  var blockType;
  player=(event.getPlayer== null) ? null : event.getPlayer();
  block=(event.getClickedBlock== null) ? null : event.getClickedBlock();
  blockType=(block==null)?null:block.getType();
  team="";
  if (((blockType) == (org.bukkit.Material.OAK_SIGN))){
    team=(block==null)?null: (block.state.getLine == null)?null:block.state.getLine(line);
    if ((teams.indexOf ( team) >= 0)){
      fd = new org.bukkit.metadata.FixedMetadataValue (__plugin,team);
      if (player != null) {
        if (player.setMetadata != null ) {
          player.setMetadata ("_team_", fd );
        }
      }
    }
  }
  return team;
};
