/**
 * A node that holds all the manipulatable objects within the active area.
 * This node helps take care of adding and removing user-manipulated ojbects;
 * I.E. bar magnets.
 *
 * @author G. Nikolai Kotula
 * @author John Blanco
 */
 
define( function( require ) {
	 'use strict';

	 // modules
	 var Node = require( 'SCENERY/nodes/Node' );
	 var inherit = require( 'PHET_CORE/inherit' );
	 var BarMagnetNode = require( 'EXAMPLE_SIM/example/view/BarMagnetNode' );
	 
	 /**
	  * It should be noted that the item listener implementation was NOT Nikolai's design.  It was borrowed almost verbatim
	  * from John Blanco's ExploreNode.js file in the area-builder simulation.  Specifically lines 118-139.
	  * Nikolai can take no credit for that method's creation.
	  * @param {ObservableArray} barMagnetArray - The array containing all the bar magnet objects the user can manipulate
	  * @param {ModelViewTransform2} modelViewTransform - The transformation matrix for converting between model coordinates and screen coordinates.
	  * @constructor
	  */
	 function ActiveAreaNode( barMagnetArray, modelViewTransform ) {
		 
		 var activeAreaNode = this;
		 
		 Node.call( activeAreaNode );
		 
		 barMagnetArray.addItemAddedListener( function ( addedMagnetObj ) {
			 
			 // add a new bar magnet node to the representation
			 var barMagnetNode = new BarMagnetNode( addedMagnetObj, modelViewTransform );
			 activeAreaNode.addChild( barMagnetNode );
			 
			 // Add the listener for object removal
			 barMagnetArray.addItemRemovedListener( function removalListener( removedMagnetObj ) {
				 if ( removedMagnetObj === addedMagnetObj ) {
					 activeAreaNode.removeChild( barMagnetNode );
					 barMagnetArray.removeItemRemovedListener( removalListener );
				 }
				 
			 } );
		 } );
	 }
	 
	 return inherit( Node, ActiveAreaNode );
} );