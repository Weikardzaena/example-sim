// Copyright 2002-2013, University of Colorado

/**
 * Scenery display object (scene graph node) for the bar magnet.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';
  var Inheritance = require( 'PHETCOMMON/util/Inheritance' );
  var MathUtil = require( 'PHETCOMMON/math/MathUtil' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  /**
   * @class BarMagnetNode
   * @constructor
   * @param {HTMLImageElement} barMagnetImageElement
   * @param {BarMagnet} barMagnet
   * @param {ModelViewTransform2D} mvt
   */
  function BarMagnetNode( barMagnetImageElement, barMagnet, mvt ) {
    var that = this;
    
    // super constructor
    Node.call( this, {
      cursor: 'pointer'
    } );
    
    // add the centered bar magnet image
    this.addChild( new Image( barMagnetImageElement, {
      centerX: 0,
      centerY: 0
    } ) );
    
    // scale it so it matches the model width and height
    this.scale( mvt.modelToView( barMagnet.width ) / this.width,
                mvt.modelToView( barMagnet.height ) / this.height );

    //When dragging, move the bar magnet
    this.addInputListener( new SimpleDragHandler( {
      //When dragging across it in a mobile device, pick it up
      allowTouchSnag: true,

      //Translate on drag events
      translate: function( args ) {
        barMagnet.location = mvt.viewToModel( args.position );
      }
    } ) );

    // Register for synchronization with model.
    barMagnet.link( 'location', function updateLocation( model, location ) {
      that.translation = mvt.modelToView( location );
    } );
    barMagnet.link( 'orientation', function updateOrientation( model, orientation ) {
      that.rotation = orientation;
    } );
  }

  Inheritance.inheritPrototype( BarMagnetNode, Node ); // prototype chaining

  return BarMagnetNode;
} );
