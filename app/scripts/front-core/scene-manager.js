/* global FrontCore:false */

'use strict';

/**
 * @fileoverview Manage multiple scene objects.
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * Creates a new scene manager.
 * @constructor
 * @extends {FrontCore.EventDispatcher}
 */
FrontCore.SceneManager = function() {
  /**
   * Scenes that should be managed.
   * @type {Object.<string, FrontCore.Scene>} 
   * @private
   */
  this._scenes = {};

  /**
   * Current activated scene.
   * @type {FrontCore.Scene}
   * @private
   */
  this._currentScene = null;
};
FrontCore.SceneManager.prototype = Object.create(FrontCore.EventDispatcher.prototype);
FrontCore.SceneManager.prototype.constructor = FrontCore.SceneManager;


/**
 * Event types dispatched by the scene manager.
 * @enum {string}
 */
FrontCore.SceneManager.EventType = {
  /** Dispatched when current scene changed. */
  SCENE_CHANGED: 'sceneChanged'
};


FrontCore.SceneManager.SwitchMode = {
  PARALLEL: 'parallel',
  SERIAL: 'serial'
};


/**
 * Returns the current activated scene.
 * @return {?FrontCore.Scene}
 */
FrontCore.SceneManager.prototype.getCurrentScene = function() {
  return this._currentScene;
};


FrontCore.SceneManager.prototype.getScene = function(name) {
  if(this._scenes[name]) {
    return this._scenes[name];
  } else {
    throw new Error('The Scene \'' + name + '\' is not exists.');
  }
};


/**
 * Add scene to scene manager.
 * @param {string} name Name of scene.
 * @param {FrontCore.Scene} scene The scene object.
 */
FrontCore.SceneManager.prototype.addScene = function(name, scene) {
  if(this._scenes[name]) {
    throw new Error('The Scene \'' + name + '\' already added.');
  } else {
    this._scenes[name] = scene;
    this._scenes[name].sceneManager = this;
  }
};


/**
 * Remove scene from scene manager.
 * @param {string} name Name of scene.
 */
FrontCore.SceneManager.prototype.removeScene = function(name) {
 if(this._scenes[name]) {
    this._scenes[name].sceneManager = null;
    this._scenes[name] = null;
  } else {
    throw new Error('The Scene \'' + name + '\' is not exists.');
  }
};


/**
 * Show scene on the stage.
 * @param {string} name Name of scene.
 */
FrontCore.SceneManager.prototype.gotoScene = function(name, option) {
  if(!this._scenes[name]) {
    throw new Error('The Scene \'' + name + '\' is not exists.');
  }

  if(this._currentScene) {
    this._currentScene.addEventListener(FrontCore.Scene.EventType.HIDE_COMPLETED, function(event) {
      console.debug(event);
    });

    this._currentScene.hide();
  }

  // TODO: シーンの切り替え方法？（hide -> show シリアル or hide/show パラレル）

  this._currentScene = this._scenes[name];

  this._currentScene.addEventListener(FrontCore.Scene.EventType.SHOW_COMPLETED, function(event) {
    console.debug(event);
  });

  this._currentScene.show();
};
