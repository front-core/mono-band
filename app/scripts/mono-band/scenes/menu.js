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
MonoBand.Scenes.Menu = function(stage) {
  FrontCore.Scene.call(this, stage);

};
MonoBand.Scenes.Menu.prototype = Object.create(FrontCore.Scene.prototype);
MonoBand.Scenes.Menu.prototype.constructor = MonoBand.Scenes.Menu;

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
