'use strict';

/**
 * @fileoverview PlayBass シーンを定義します。
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * 新しい PlayBass クラスのインスタンスを生成します。
 * @constructor
 * @extends {FrontCore.Scene}
 */
MonoBand.Scenes.PlayBass = function() {
  FrontCore.Scene.call(this, new PIXI.DisplayObjectContainer());

  this._title;

  this._backButton;

  this._showTimeline;

};
MonoBand.Scenes.PlayBass.prototype = Object.create(FrontCore.Scene.prototype);
MonoBand.Scenes.PlayBass.prototype.constructor = MonoBand.Scenes.PlayBass;


/**
 * シーンで表示するデータおよび表示要素を初期化します。
 */
MonoBand.Scenes.PlayBass.prototype.load = function() {
  if(!this.isLoaded()) {
    this._assetLoader = new PIXI.AssetLoader([
      FrontCore.PIXI.getSuffixedImageUrl('images/back-button.png')
    ]);

    this._assetLoader.on('onComplete', function() {
      this._backButton = FrontCore.PIXI.getTextureButton(FrontCore.PIXI.getTexture('images/back-button.png'));
      this._backButton.anchor.x = 0.5;
      this._backButton.anchor.y = 0.5;
      this._backButton.alpha = 0;
      this._backButton.click = this._backButton.tap = function() {
        this.sceneManager.gotoScene('selectInstrument');
      }.bind(this);

      this.container.addChild(this._backButton);


      this._showTimeline = new TimelineLite({ 
        paused: true,
        onComplete: function() {
          this.dispatchShowCompleteEvent();
        }, onCompleteScope: this,
        onReverseComplete: function() {
            this.dispatchHideCompleteEvent();
          }, onReverseCompleteScope: this
        });
        
      this._showTimeline.add(TweenLite.fromTo(this._backButton, 0.3, { 
        alpha: 0,
        x: window.innerWidth / 2,
        y: window.innerHeight - 25
      }, { 
        alpha: 1,
        x: window.innerWidth / 2,
        y: window.innerHeight - 50
      }));


      // 遅延テスト
      setTimeout(function() {
        this.dispatchLoadCompleteEvent();
      }.bind(this), 1000);
    }.bind(this));

    this._assetLoader.load();
  }
};


/**
 * シーンの表示要素を表示します。
 */
MonoBand.Scenes.PlayBass.prototype.show = function() {
  this._showTimeline.play();
};


/**
 * シーンの表示要素を非表示します。
 */
MonoBand.Scenes.PlayBass.prototype.hide = function() {
  this._showTimeline.reverse();
};


/**
 * シーンの表示要素のレイアウトを更新します。
 */
MonoBand.Scenes.PlayBass.prototype.updateLayout = function() {
  this._backButton.x = window.innerWidth / 2;
  this._backButton.y = window.innerHeight - 50;
};
