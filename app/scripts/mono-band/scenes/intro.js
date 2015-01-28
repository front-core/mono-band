/* global PIXI:false, TweenLite: false, FrontCore:false, MonoBand:false */

'use strict';

/**
 * @fileoverview Intro sene.
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * Creates a new intro MonoBand.Scenes.
 * @constructor
 * @extends {FrontCore.Scene}
 */
MonoBand.Scenes.Intro = function(stage) {
  FrontCore.Scene.call(this, stage);

  /**
   * Asset loader.
   * @type {PIXI.AssetLoader}
   * @private
   */
  this._assetLoader;

  /**
   * Whether all the assets have loaded.
   * @type {boolean}
   * @private
   */
  this._isAssetLoaded;

  /**
   * Logo sprite elements.
   * @type {PIXI.Sprite}
   * @private
   */
  this._logo;

  /**
   * Start button elements.
   * @type {PIXI.DisplayObjectContainer}
   * @private
   */
  this._startButton;
};
MonoBand.Scenes.Intro.prototype = Object.create(FrontCore.Scene.prototype);
MonoBand.Scenes.Intro.prototype.constructor = MonoBand.Scenes.Intro;


/**
 * Show scene elements.
 */
MonoBand.Scenes.Intro.prototype.show = function() {
  if(!this._isAssetLoaded) {
    this._assetLoader = new PIXI.AssetLoader([
      'images/logo-middle-light@2x.png'
    ]);

    // TODO: Implement helper for scoped handler.
    var _this = this;
    this._assetLoader.on('onComplete', function(event) {
      _this.handleAssetLoaderComplete.apply(_this, [event]);
    });

    this._assetLoader.load();
  } else {
    this.handleAssetLoaderComplete(null);
  }
};


MonoBand.Scenes.Intro.prototype.handleAssetLoaderComplete = function(event) {
  console.debug(event);

  this._isAssetLoaded = true;

  // Create logo sprite.
  this._logo = new PIXI.Sprite(PIXI.Texture.fromImage('images/logo-middle-light@2x.png'));
  this._logo.anchor.x = 0.5;
  this._logo.anchor.y = 0.5;
  this._logo.position.x = window.innerWidth / 2;
  this._logo.position.y = window.innerHeight / 2;
  this._logo.scale.set(0, 0);
  this.stage.addChild(this._logo);

  // Calculate logo scale(fit to window size).
  var innerRadius = Math.min(window.innerWidth, window.innerHeight);
  var toScale = Math.min(
    innerRadius / this._logo.texture.width * this._logo.texture.baseTexture.resolution,
    innerRadius / this._logo.texture.height * this._logo.texture.baseTexture.resolution
  );

  // Create start button.
  this._startButton = this.createButton_('TOUCH to START');
  this._startButton.position.x = Math.round(window.innerWidth / 2);
  this._startButton.alpha = 0;
  this.stage.addChild(this._startButton);

  var _this = this;

  this._startButton.tap = this._startButton.click = function(){
    _this.sceneManager.gotoScene('menu');
  };

  // Play animation & dispatch show completed event.
  TweenLite.fromTo(this._logo, 1, {rotation: 0}, {rotation: (360 * 2 + 45) * Math.PI/180});
  TweenLite.fromTo(this._logo.scale, 1, {x: 0, y: 0}, {x: toScale, y: toScale,
    onComplete: function() {
      TweenLite.fromTo(this._startButton, 0.4, {alpha: 0}, {alpha: 1});
      TweenLite.fromTo(this._startButton.position, 0.4, {y: window.innerHeight}, {y: Math.round(window.innerHeight - 100 / window.devicePixelRatio)});

      this.dispatchShowCompleteEvent();
    },
    onCompleteScope: this
  });
};


/**
 * Create simple button.
 * @param {string} text Label text.
 * @return {PIXI.DisplayObjectContainer} Button display object.
 * @private
 */
MonoBand.Scenes.Intro.prototype.createButton_ = function(text) {
  var button = new PIXI.DisplayObjectContainer();

  var background = new PIXI.Graphics();
  background.beginFill(0x222222);
  background.drawRect(0, 0, 200 * window.devicePixelRatio, 50 * window.devicePixelRatio);
  background.position.set(-100 * window.devicePixelRatio, -25 * window.devicePixelRatio);

  var label = new PIXI.Text(text, {
    font: 'bold ' + 20 * window.devicePixelRatio + 'px Arial ',
    fill: '#FFFFFF'
  });
  label.anchor.set(0.5, 0.4);

  button.addChild(background);
  button.addChild(label);

  button.hitArea = new PIXI.Rectangle(
  -100 * window.devicePixelRatio, -25 * window.devicePixelRatio,
   200 * window.devicePixelRatio, 50 * window.devicePixelRatio);
  button.interactive = true;
  button.buttonMode = true;

  label.anchor.set(0.5, 0.5);
  button.scale.set(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);

  return button;
};


/**
 * Hide scene elements.
 */
MonoBand.Scenes.Intro.prototype.hide = function() {
  TweenLite.to(this._logo, 0.8, {rotation: 0});
  TweenLite.to(this._logo.scale, 0.8, {x: 0, y: 0,
    onComplete: function() {
      this.stage.removeChild(this._logo);
      this.stage.removeChild(this._startButton);

      this.dispatchHideCompleteEvent();
    },
    onCompleteScope: this
  });

  TweenLite.to(this._startButton, 0.4, {alpha: 0});
  TweenLite.to(this._startButton.position, 0.4, {y: window.innerHeight});
};


/**
 * Update scene elements layout.
 */
MonoBand.Scenes.Intro.prototype.updateLayout = function() {
  if(this._logo) {
    var innerRadius = Math.min(window.innerWidth, window.innerHeight);
    var toScale = Math.min(
      innerRadius / this._logo.texture.width * this._logo.texture.baseTexture.resolution,
      innerRadius / this._logo.texture.height * this._logo.texture.baseTexture.resolution
    );
    this._logo.scale.set(toScale, toScale);

    this._logo.position.x = window.innerWidth / 2;
    this._logo.position.y = window.innerHeight / 2;
  }

  if(this._startButton) {
    this._startButton.position.x = Math.round(window.innerWidth / 2);
    this._startButton.position.y = Math.round(window.innerHeight - 100 / window.devicePixelRatio);
  }
};
