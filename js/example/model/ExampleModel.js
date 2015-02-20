// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the 'Example' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BarMagnetObj = require( 'EXAMPLE_SIM/example/model/BarMagnetObj' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ObservableArray = require ( 'AXON/ObservableArray' );
  var Vector2 = require ( 'DOT/Vector2' );

  /**
   * Main constructor for ExampleModel, which manages the bar magnets.
   * @constructor
   */
  function ExampleModel() {

    // model elements
	this.barMagnetArray = new ObservableArray();
  }

  return inherit( Object, ExampleModel, {

    // Resets all model elements
    reset: function() {
		this.barMagnetArray.clear();
		this.createBarMagnetObj( 0, 0 );
    },

	createBarMagnetObj: function() {
		// TODO: add checks here if the arguments are not integers or a Vector2 type.
		if ( arguments.length === 2 )
			var posVector = new Vector2( arguments[0], arguments[1] );
		else if ( arguments.length === 1 )
			var posVector = arguments[0];
		
		var newBarMagnetObj = new BarMagnetObj( posVector, new Dimension2( 262.5, 52.5 ), 0 );
		this.barMagnetArray.push( newBarMagnetObj );
	},

    // Called by the animation loop. Optional, so if your model has no animation, you can omit this.
    step: function() {
      // Handle model animation here.
    }
  } );
} );