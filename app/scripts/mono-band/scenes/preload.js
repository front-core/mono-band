/* global PIXI:false, TweenLite: false, TweenMax: false, FrontCore:false, MonoBand:false */

'use strict';

/**
 * @fileoverview Preload scene.
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * Creates a new Preload scene.
 * @constructor
 * @extends {FrontCore.Scene}
 */
MonoBand.Scenes.Preload = function() {
  FrontCore.Scene.call(this, new PIXI.DisplayObjectContainer());

  this._loadingCircle;

  this._rotationTween;

  this._showTimeline;
};
MonoBand.Scenes.Preload.prototype = Object.create(FrontCore.Scene.prototype);
MonoBand.Scenes.Preload.prototype.constructor = MonoBand.Scenes.Preload;


/**
 * Load scene assets.
 */
MonoBand.Scenes.Preload.prototype.load = function() {
  if(!this.isLoaded()) {
    this._assetLoader = new PIXI.AssetLoader([
      'images/loading-circle@2x.png'
    ]);

    this._assetLoader.on('onComplete', function() {
      this._loadingCircle = new PIXI.Sprite(PIXI.Texture.fromImage('images/loading-circle@2x.png'));
      this._loadingCircle.anchor.x = 0.5;
      this._loadingCircle.anchor.y = 0.5;
      this._loadingCircle.alpha = 0;

      this.container.addChild(this._loadingCircle);

      this._rotationTween = TweenMax.fromTo(this._loadingCircle, 1, { rotation: 0 }, { 
        rotation: (360) * Math.PI/180, 
        repeat: -1, repeatDelay: 0, ease: Linear.easeNone, 
        paused: true
      });

      this._showTimeline = new TimelineLite({ 
        paused: true,
        onComplete: function() {
          this.dispatchShowCompleteEvent();
        }, onCompleteScope: this,
        onReverseComplete: function() {
          this.dispatchHideCompleteEvent();
        }, onReverseCompleteScope: this 
      });

      this._showTimeline.add(TweenLite.fromTo(this._loadingCircle, 0.3, { alpha: 0 }, { alpha: 1, delay: 0.1 }), 0);

      this._showTimeline.add(TweenLite.fromTo(this._loadingCircle, 0.4, {
        x: window.innerWidth / 2, 
        y: window.innerHeight
      }, {
        x: window.innerWidth / 2, 
        y: window.innerHeight / 2
      }), 0);

      this.dispatchLoadCompleteEvent();
    }.bind(this));

    this._assetLoader.load();
  }
};


/**
 * Show scene elements.
 */
MonoBand.Scenes.Preload.prototype.show = function() {
  this._rotationTween.play();
  this._showTimeline.play();
};


/**
 * Hide scene elements.
 */
MonoBand.Scenes.Preload.prototype.hide = function() {
  this._rotationTween.pause();
  this._showTimeline.reverse();
};


/**
 * Update scene elements layout.
 */
MonoBand.Scenes.Preload.prototype.updateLayout = function() {

};
