// Copyright 2002-2013, University of Colorado Boulder

/**
 * Control panel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Vector2 = require( 'DOT/Vector2' );
  var BarMagnetNode = require ( 'EXAMPLE_SIM/example/view/BarMagnetNode' );

  // strings
  var flipPolarityString = require( 'string!EXAMPLE_SIM/flipPolarity' );
  var moveMagnetString = require( 'string!EXAMPLE_SIM/moveMagnet' );
  var addMagnetString = require( 'string!EXAMPLE_SIM/addMagnet' );

  /**
   * Control panel constructor
   * @param {BarMagnetModel} model the entire model for the bar magnet screen
   * @param {Object} [options] scenery options for rendering the control panel, see the constructor for options.
   * @param {int} simWidth, simHeight: the ranges in which we can place the random magnets
   * @param {ExampleScreenView} exampleScreenView: we add children to this Screen so it actually updates the simulation.
   * @param {ModelViewTransform2} modelViewTransform: the transformation parameters that the BarMagnetNode constructor needs.
   * @constructor
   */
  function ControlPanel( model, options, simWidth, simHeight, exampleScreenView, modelViewTransform ) {

    // Demonstrate a common pattern for specifying options and providing default values.
    options = _.extend( {
        xMargin: 10,
        yMargin: 10,
        stroke: 'orange',
        lineWidth: 3
      },
      options );

    // 'Flip Polarity' button
    var flipButton = new TextPushButton( flipPolarityString, {
      font: new PhetFont( 16 ),
      baseColor: 'yellow',
      xMargin: 10,
      listener: function() {
        model.barMagnet[0].orientation = model.barMagnet[0].orientation + Math.PI;
      }
    } );

	// 'Move Bar Magnet' button
	var moveMagnetButton = new TextPushButton( moveMagnetString , {
		font: new PhetFont( 12 ),
		baseColor: 'orange',
		xMargin: 10,
		listener: function() {
			/**
			  * Since the model coordinates are only half the simulation screen
			  * size values, we need to go to negative magnet coordinates to get access
			  * to the whole screen. Also since Math.random() returns a value
			  * from 0 - 1, it works out that we can just subtract 0.5 and multiply
			  * it by the size of the simulation to get the whole screen.
			  */
			var xPos = (Math.random() - 0.5) * simWidth;
			var yPos = (Math.random() - 0.5) * simHeight;
			model.barMagnet[0].location = new Vector2( xPos, yPos ) ;
		}
	} );

	// 'Add Bar Magnet' button
	var addMagnetButton = new TextPushButton( addMagnetString, {
		font: new PhetFont( 12 ),
		baseColor: 'green',
		xMargin: 10,
		listener: function() {
			var pos = model.addBarMagnet();
			var xPos = (Math.random() - 0.5) * simWidth;
			var yPos = (Math.random() - 0.5) * simHeight;
			exampleScreenView.insertChild(0, new BarMagnetNode( model.barMagnet[pos], modelViewTransform, xPos, yPos ) );
		}
	} );

    // 'Reset All' button, resets the sim to its initial state
    var resetAllButton = new ResetAllButton( {
		listener: function() {
			var len = exampleScreenView.getChildren().length - 2;
			for( var i = 0; i < len; i++ ) {
				exampleScreenView.removeChildAt( 0 );
			}
			model.reset();
		}
	} );

    // The contents of the control panel
    var content = new VBox( { align: 'center', spacing: 10, children: [ flipButton, moveMagnetButton, addMagnetButton, resetAllButton ] } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, ControlPanel );
} );