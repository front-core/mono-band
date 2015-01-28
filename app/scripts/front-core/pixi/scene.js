/* global FrontCore:false, PIXI:false */

'use strict';

/**
 * @fileoverview Abstract scene object.
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * Creates a new scene.
 * @constructor
 * @extends {PIXI.DisplayObjectContainer}
 */
FrontCore.PIXI.Scene = function() {
  PIXI.DisplayObjectContainer.call(this);

  /**
   * Scene manager object.
   * @type {?FrontCore.sceneManager}
   * @protected
   */
  this.sceneManager = false;
};
FrontCore.PIXI.Scene.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
FrontCore.PIXI.Scene.prototype.constructor = FrontCore.PIXI.Scene;

PIXI.EventTarget.mixin(PIXI.AssetLoader.prototype);


/**
 * Event types dispatched by the scene object.
 * @enum {string}
 */
FrontCore.PIXI.Scene.EventType = {
  LOAD_COMPLETE: 'hideComplete',
  /** Dispatched when show scene elements completed. */
  SHOW_COMPLETE: 'showComplete',
  /** Dispatched when hide scene elements completed. */
  HIDE_COMPLETE: 'hideComplete'
};


/**
 * Load scene assets.
 */
FrontCore.PIXI.Scene.prototype.load = function() {
  throw new Error('The type FrontCore.PIXI.Scene must implement the \'load\' method.');
};


/**
 * Dispatch a load complete event.
 * @protected
 */
FrontCore.PIXI.Scene.prototype.dispatchLoadCompleteEvent = function() {
  this.emit(FrontCore.PIXI.Scene.EventType.LOAD_COMPLETE);
};


/**
 * Show scene elements.
 */
FrontCore.PIXI.Scene.prototype.show = function() {
  throw new Error('The type FrontCore.PIXI.Scene must implement the \'show\' method.');
};


/**
 * Dispatch a show complete event.
 * @protected
 */
FrontCore.PIXI.Scene.prototype.dispatchShowCompleteEvent = function() {
  this.emit(FrontCore.PIXI.Scene.EventType.SHOW_COMPLETE);
};


/**
 * Hide scene elements.
 */
FrontCore.PIXI.Scene.prototype.hide = function() {
  throw new Error('The type FrontCore.PIXI.Scene must implement the \'hide\' method.');
};


/**
 * Dispatch a hide complete event.
 * @protected
 */
FrontCore.PIXI.Scene.prototype.dispatchHideCompleteEvent = function() {
  this.emit(FrontCore.PIXI.Scene.EventType.HIDE_COMPLETE);
};


/**
 * Update scene elements layout.
 * (when screen size or oriention changed)
 */
FrontCore.PIXI.Scene.prototype.updateLayout = function() {
  throw new Error('The type FrontCore.PIXI.Scene must implement the \'updateLayout\' method.');
};
