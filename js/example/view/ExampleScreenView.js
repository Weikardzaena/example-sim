// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the 'Example' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var ControlPanel = require( 'EXAMPLE_SIM/example/view/ControlPanel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Vector2 = require( 'DOT/Vector2' );
  var ActiveAreaNode = require ( 'EXAMPLE_SIM/example/view/ActiveAreaNode' );

  /**
   * Constructor for the ExampleScreenView, it creates the bar magnet node and control panel node.
   * @param {BarMagnetModel} model - The model for the entire screen
   * @constructor
   */
  function ExampleScreenView( model ) {

	// Screen size macros for convenience
	var simWidth = 786;
	var simHeight = 504;
  
    var exampleScreenView = this;
    ScreenView.call( exampleScreenView, { layoutBounds: new Bounds2( 0, 0, simWidth, simHeight ) } );
	
	// model-view transform
    var modelViewTransform = ModelViewTransform2.createOffsetScaleMapping( new Vector2( exampleScreenView.layoutBounds.width / 2, exampleScreenView.layoutBounds.height / 2 ), 1 );
	
	// layer nodes
	var magnetsLayer = new ActiveAreaNode( model.barMagnetArray, modelViewTransform );

	// initialize first bar magnet object
	model.createBarMagnetObj( 0, 0 );
	
	// add the magnets layer first so the objects are always behind the control panel
	exampleScreenView.addChild( magnetsLayer );
	exampleScreenView.addChild( new ControlPanel( model, { x: 50, y: 50 }, exampleScreenView ) );
  }

  return inherit( ScreenView, ExampleScreenView );
} );