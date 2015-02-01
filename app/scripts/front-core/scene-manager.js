/* global FrontCore:false */

'use strict';

/**
 * @fileoverview Manage multiple scene objects.
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * Creates a new scene manager.
 * @param {!(PIXI.Stage|Object)} stage PixiJS(or other renderer) stage object.
 * @constructor
 * @extends {FrontCore.EventDispatcher}
 */
FrontCore.SceneManager = function(stage) {
  FrontCore.EventDispatcher.call(this);

  /**
   * Display area of scenes.
   * @type {!(PIXI.Stage|Object)}
   * @private
   */
  this._stage = stage;
  
  /**
   * Scenes that should be managed.
   * @type {Object.<string, FrontCore.Scene>} 
   * @private
   */
  this._scenes = {};

  /**
   * Current activated scene.
   * @type {?FrontCore.Scene}
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


/**
 * Scene switch modes.
 * @enum {string}
 */
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


/**
 * Returns the scene object.
 * @param {string} name Name of scene.
 * @return {FrontCore.Scene}
 */
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
    this._currentScene.addEventListener(FrontCore.Scene.EventType.HIDE_COMPLETE, function(event) {
      this._stage.removeChild(event.target.container);
      console.debug(event);
    }.bind(this));

    this._currentScene.hide();
  }

  // TODO: シーン切り替えタイプの実装
  
  // 次のシーンがローディング済みの場合
  // 1. シリアル: prev scene hide -> next scene show
  // 2. パラレル: prev scene hide >< next scene show

  // 次のシーンがまだローディングされて無い場合
  // 1. シリアル: prev scene hide -> next scene load -> next scene show
  // 2. パラレル: next scene load -> prev scene hide >< next scene show
  
  this._currentScene = this._scenes[name];

  this._currentScene.addEventListener(FrontCore.Scene.EventType.SHOW_COMPLETE, function(event) {
    console.debug(event);

    this.dispatchEvent(FrontCore.SceneManager.EventType.SCENE_CHANGED);
  }.bind(this));

  if(this._currentScene.isLoaded()) {
    this._stage.addChild(this._currentScene.container);
    this._currentScene.show();
  } else {
    this._currentScene.addEventListener(FrontCore.Scene.EventType.LOAD_COMPLETE, function(event) {
      console.debug(event);

      this._stage.addChild(this._currentScene.container);
      this._currentScene.show();
    }.bind(this));

    // TODO: 規定のローディング表示
    this._currentScene.load();
  }
};
