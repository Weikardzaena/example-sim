// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the bar magnet object, which can be dragged to translate.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  // images
  var barMagnetImage = require( 'image!EXAMPLE_SIM/barMagnet.png' );

  /**
   * Constructor for the BarMagnetNode which renders the bar magnet as a scenery node.
   * @param {BarMagnetObj} barMagnetObj - the model of the bar magnet
   * @param {ModelViewTransform2} modelViewTransform - the coordinate transform between model coordinates and view coordinates
   * @constructor
   */
  function BarMagnetNode( barMagnetObj, modelViewTransform ) {

    var barMagnetNode = this;

    // Call the super constructor
    Node.call( barMagnetNode, {

      // Show a cursor hand over the bar magnet
      cursor: 'pointer'
    } );

	// Add the bar magnet image
    barMagnetNode.addChild( new Image( barMagnetImage, { centerX: 0, centerY: 0 } ) );

	// Scale it so it matches the model width and height
    barMagnetNode.scale( modelViewTransform.modelToViewDeltaX( barMagnetObj.size.width ) / barMagnetNode.width,
    modelViewTransform.modelToViewDeltaY( barMagnetObj.size.height ) / barMagnetNode.height );

	// When dragging, move the bar magnet
	barMagnetNode.addInputListener( new SimpleDragHandler(
	{
		// When dragging across it in a mobile device, pick it up
		allowTouchSnag: true,

		// Translate on drag events
		translate: function( args ) {
		  barMagnetObj.location = modelViewTransform.viewToModelPosition( args.position );
		}
	} ) );

	// Register for synchronization with model.
	barMagnetObj.locationProperty.link( function( location ) {
	  barMagnetNode.translation = modelViewTransform.modelToViewPosition( location );
	} );

	// Register for synchronization with model
	barMagnetObj.orientationProperty.link( function( orientation ) {
	  barMagnetNode.rotation = orientation;
	} );
  }

  return inherit( Node, BarMagnetNode );
} );