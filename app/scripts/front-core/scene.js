/* global FrontCore:false */

'use strict';

/**
 * @fileoverview Abstract scene object.
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * Creates a new scene.
 * @param {!(PIXI.DisplayObjectContainer|Object)} container Display objects container of scene.
 * @constructor
 * @extends {FrontCore.EventDispatcher}
 */
FrontCore.Scene = function(container) {
  FrontCore.EventDispatcher.call(this);

  /**
   * Wether scene is loaded or not.
   * @type {boolean}
   * @private
   */
  this._loaded = false;

  /**
   * The container of display objects.
   * @type {!(PIXI.DisplayObjectContainer|Object)}
   * @protected
   */
  this.container = container;

  /**
   * Scene manager object.
   * @type {?FrontCore.sceneManager}
   * @protected
   */
  this.sceneManager = false;
};
FrontCore.Scene.prototype = Object.create(FrontCore.EventDispatcher.prototype);
FrontCore.Scene.prototype.constructor = FrontCore.Scene;


/**
 * Event types dispatched by the scene object.
 * @enum {string}
 */
FrontCore.Scene.EventType = {
  /** Dispatched when scene assets load completed. */
  LOAD_COMPLETE: 'loadComplete',
  /** Dispatched when show scene elements completed. */
  SHOW_COMPLETE: 'showComplete',
  /** Dispatched when hide scene elements completed. */
  HIDE_COMPLETE: 'hideComplete'
};


/**
 * Wether scene is loaded or not.
 * @return {boolean}
 */
FrontCore.Scene.prototype.isLoaded = function() {
  return this._loaded;
};


/**
 * Load scene assets.
 * また基本的な表示要素はあらけじめ container に配置しておく
 */
FrontCore.Scene.prototype.load = function() {
  throw new Error('The type FrontCore.Scene must implement the \'load\' method.');
};


/**
 * Dispatch a show complete event.
 * @protected
 */
FrontCore.Scene.prototype.dispatchLoadCompleteEvent = function() {
  this._loaded = true;
  this.dispatchEvent(FrontCore.Scene.EventType.LOAD_COMPLETE);
};


/**
 * Show scene elements.
 */
FrontCore.Scene.prototype.show = function() {
  throw new Error('The type FrontCore.Scene must implement the \'show\' method.');
};


/**
 * Dispatch a show complete event.
 * @protected
 */
FrontCore.Scene.prototype.dispatchShowCompleteEvent = function() {
  this.dispatchEvent(FrontCore.Scene.EventType.SHOW_COMPLETE);
};


/**
 * Hide scene elements.
 */
FrontCore.Scene.prototype.hide = function() {
  throw new Error('The type FrontCore.Scene must implement the \'hide\' method.');
};


/**
 * Dispatch a hide complete event.
 * @protected
 */
FrontCore.Scene.prototype.dispatchHideCompleteEvent = function() {
  this.dispatchEvent(FrontCore.Scene.EventType.HIDE_COMPLETE);
};


/**
 * Update scene elements layout.
 * (when screen size or oriention changed)
 */
FrontCore.Scene.prototype.updateLayout = function() {
  throw new Error('The type FrontCore.Scene must implement the \'updateLayout\' method.');
};
