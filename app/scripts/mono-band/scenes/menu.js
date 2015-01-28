/* global PIXI:false, TweenLite: false, FrontCore:false, MonoBand:false */

'use strict';

/**
 * @fileoverview Menu senes.
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * Creates a new menu MonoBand.Scenes.
 * @constructor
 * @extends {FrontCore.Scene}
 */
MonoBand.Scenes.Menu = function() {
  FrontCore.Scene.call(this, new PIXI.DisplayObjectContainer());

};
MonoBand.Scenes.Menu.prototype = Object.create(FrontCore.Scene.prototype);
MonoBand.Scenes.Menu.prototype.constructor = MonoBand.Scenes.Menu;


/**
 * Load scene assets.
 */
MonoBand.Scenes.Menu.prototype.load = function() {
  this.dispatchLoadCompleteEvent();
};


/**
 * Show scene elements.
 */
MonoBand.Scenes.Menu.prototype.show = function() {
  this.dispatchShowCompleteEvent();
};


/**
 * Hide scene elements.
 */
MonoBand.Scenes.Menu.prototype.hide = function() {
  this.dispatchHideCompleteEvent();
};


/**
 * Update scene elements layout.
 */
MonoBand.Scenes.Menu.prototype.updateLayout = function() {

};
