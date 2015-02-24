/* global PIXI:false, TweenLite: false, TweenMax: false, FrontCore:false, MonoBand:false */

'use strict';

/**
 * @fileoverview TopMenu scene.
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * Creates a new menu TopMenu scene.
 * @constructor
 * @extends {FrontCore.Scene}
 */
MonoBand.Scenes.TopMenu = function() {
  FrontCore.Scene.call(this, new PIXI.DisplayObjectContainer());

  this._logo;

  this._slogan;

  this._soloButton;

  this._sessionButton;

};
MonoBand.Scenes.TopMenu.prototype = Object.create(FrontCore.Scene.prototype);
MonoBand.Scenes.TopMenu.prototype.constructor = MonoBand.Scenes.TopMenu;


/**
 * Load scene assets.
 */
MonoBand.Scenes.TopMenu.prototype.load = function() {

  if(!this.isLoaded()) {
    this._assetLoader = new PIXI.AssetLoader([
      'images/logo@2x.png',
      'images/slogan@2x.png',
      'images/solo-button@2x.png',
      'images/session-button@2x.png'
    ]);

    this._assetLoader.on('onComplete', function() {
      this._logo = new PIXI.Sprite(PIXI.Texture.fromImage('images/logo@2x.png'));
      this._logo.anchor.x = 0.5;
      this._logo.anchor.y = 0.5;
      this._logo.alpha = 0;

      this._slogan = new PIXI.Sprite(PIXI.Texture.fromImage('images/slogan@2x.png'));
      this._slogan.anchor.x = 0.5;
      this._slogan.anchor.y = 0.5;
      this._slogan.alpha = 0;

      this._soloButton = new PIXI.Sprite(PIXI.Texture.fromImage('images/solo-button@2x.png'));
      this._soloButton.anchor.x = 0.5;
      this._soloButton.anchor.y = 0.5;
      this._soloButton.alpha = 0;

      this._sessionButton = new PIXI.Sprite(PIXI.Texture.fromImage('images/session-button@2x.png'));
      this._sessionButton.anchor.x = 0.5;
      this._sessionButton.anchor.y = 0.5;
      this._sessionButton.alpha = 0;

      this.container.addChild(this._logo);
      this.container.addChild(this._slogan);
      this.container.addChild(this._soloButton);
      this.container.addChild(this._sessionButton);

      // 遅延テスト
      setTimeout(function() {
        this.dispatchLoadCompleteEvent();
      }.bind(this), 1000);
    }.bind(this));

    this._assetLoader.load();
  }
};


/**
 * Show scene elements.
 */
MonoBand.Scenes.TopMenu.prototype.show = function() {

  var timeline = new TimelineLite({ onComplete: function() {
    this.dispatchShowCompleteEvent();
  }, onCompleteScope: this })

  timeline.add(TweenLite.fromTo(this._logo, 0.4, { 
    alpha: 0,
    x: window.innerWidth / 2,
    y: 0
  }, { 
    alpha: 1,
    x: window.innerWidth / 2,
    y: 100,
  }));

  timeline.add(TweenLite.fromTo(this._slogan, 0.3, { 
    alpha: 0,
    x: 0,
    y: 130
  }, { 
    alpha: 1,
    x: window.innerWidth / 2,
    y: 130
  }));

  timeline.add(TweenLite.fromTo(this._soloButton, 0.3, { 
    alpha: 0,
    x: window.innerWidth / 2,
    y: window.innerHeight
  }, { 
    alpha: 1,
    x: window.innerWidth / 2,
    y: window.innerHeight - 150
  }));

  timeline.add(TweenLite.fromTo(this._sessionButton, 0.3, { 
    alpha: 0,
    x: window.innerWidth / 2,
    y: window.innerHeight
  }, { 
    alpha: 1,
    x: window.innerWidth / 2,
    y: window.innerHeight - 100
  }));

};


/**
 * Hide scene elements.
 */
MonoBand.Scenes.TopMenu.prototype.hide = function() {
  this.dispatchHideCompleteEvent();
};


/**
 * Update scene elements layout.
 */
MonoBand.Scenes.TopMenu.prototype.updateLayout = function() {

};
