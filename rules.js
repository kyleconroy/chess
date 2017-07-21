// pieceControllerSet must be defined by the gameController when creating Rules singleton, not the best approach,
// but there were lots of arguments on the internet about dependency injection and singltons in js, and i just wanted something to work. will address later

// tells you it's the other team's turn if you try to move from an empty square
var Rules = function () {
  var instance = {
    moveIsIllegal: function(startPosition, endPosition, board){
      var layOut = board.layOut,
        team = board.teamAt(startPosition),
        pieceController = this.retrieveControllerForPosition( startPosition ),
        illegal = false
      ;
      if ( !Board.classMethods.inBounds(endPosition) ){
        alert('stay on the board, fool')
        illegal = true
      } else if( board.positionIsOccupiedByTeamMate(endPosition, team ) ){
        alert("what, are you trying to capture your own piece?")
        illegal = true
      } else if( !pieceController.positionViable( {startPosition: startPosition, endPosition: endPosition, board: board} ) ) {
        alert("that's not how that piece moves")
        illegal = true
      } else if( this.kingCheck( {startPosition: startPosition, endPosition: endPosition, board: board})){
        alert("check yo king fool")
        illegal = true
      }
      return illegal
    },
    retrieveControllerForPosition: function(position){
      var  positionString = layOut[position],
        stringLength = positionString.length,
        pieceType = positionString.substring(5, stringLength)
      ;
      if( pieceType === "Pawn" ){ pieceType = positionString.charAt(0).toUpperCase() + positionString.slice(1) }
      pieceController = this.pieceControllerSet[pieceType]
      return pieceController
    },
    kingCheck: function(args){
      // debugger
      var startPosition     = args["startPosition"],
          endPosition       = args["endPosition"]
          board             = args["board"],
          teamString        = board.teamAt(startPosition),
          kingPosition      = board.kingPosition(teamString),
          danger            = false,
          opposingTeamString = "";
      if( teamString === "white" ){
        opposingTeamString = "black"
      } else {
        opposingTeamString = "white"
      };
      var enemyPositions = board.positionsOccupiedByTeam(opposingTeamString);
      for(var i = 0; i < enemyPositions.length; i++){
        var enemyPosition = enemyPositions[i],
          pieceController = this.retrieveControllerForPosition( enemyPosition );
          if( pieceController.positionViable({startPosition: enemyPosition, endPosition: kingPosition, board: board} ) ){
          danger = true
            
          }
        // ;
        // console.log(pieceController)
        // debugger
        // if( pieceController.positionViable( {startPosition: enemyPosition, endPosition: kingPosition, board: board} ) ){
        // }

      };

      // var activeOpposingTeamPieces = opposingTeam.activePieces;
      // for (var i = 0; i < activeOpposingTeamPieces.length; i++){
      //   if( isAttackedBy({piece: activeOpposingTeamPieces[i], position: kingPosition}) ){ danger = true }
      // }

      console.log("danger is: " + danger)



      // danger = board.isAttacked({position: position, piece: pieceCopy, tiles: tilesCopy});
      return danger
      // pretend king has all movement abilities. stretch outward with them until hittting block, see if that block has the ability that was used to get to the king,
      // maybe iterate across movements testing each individualy
    },
    // castling  these can both refer to the previous board states to answer the question, so knowing about board states doesn't become a pieces job
    // en passant  these can both refer to the previous board states to answer the question, so knowing about board states doesn't become a pieces job 
    // stalemate
  }

  function createInstance() {
      var object = new Object("I am the instance");
      return object;
  }
  return {
    getInstance: function(controllerSet) {
      if (!instance) {
        instance = createInstance(controllerSet);
      }
      return instance;
    },
  };
}();
