/* global FrontCore:false, PIXI:false */


/**
 * 指定された画像 URL に、端末のピクセル比から解像度サフィックスを付けて返します。
 * 端末ピクセル比が `2` 以上であれば `@2x` の様にサフィックスが付きます。
 * 端末ピクセル比が `1` の場合は何も付けません。
 * @param {string} imageUrl - 画像 URL (既に解像度サフィックスが付いても変換します)
 * @return {string} imageUrl - 解像度サフィックスが付いた画像 URL
 */
FrontCore.PIXI.getSuffixedImageUrl = function(imageUrl) {
  var match = imageUrl.match(/^([^@]+)(@\dx|)\.(png|jpg)$/);

  if(!match) {
    return imageUrl;
  } else {
    if(window.devicePixelRatio > 1) {
      return match[1] + '@' + window.devicePixelRatio + 'x' + '.' + match[3];
    } else {
      return match[1] + '.' + match[3];
    }
  }
};


/**
 * 指定された画像 URL から、端末のピクセル比に対応した Texture オブジェクトを返します。
 * @param {string} imageUrl - 画像 URL
 * @return {PIXI.Texture} imageUrl -  PixiJS Texture オブジェクト
 */
FrontCore.PIXI.getTexture = function(imageUrl) {
  var texture = PIXI.Texture.fromImage(
    FrontCore.PIXI.getSuffixedImageUrl(imageUrl));
    
  texture.baseTexture.resolution = window.devicePixelRatio;

  return texture;
};


FrontCore.PIXI.getTextureButton = function(texture) {
  var button = new PIXI.Sprite(texture);
  button.buttonMode = true;
  button.anchor.x = 0.5;
  button.anchor.y = 0.5;

  button.interactive = true;

  var hitWidth = texture.baseTexture.width / texture.baseTexture.resolution;
  var hitHeight = texture.baseTexture.height / texture.baseTexture.resolution;

  button.hitArea = new PIXI.Rectangle(- hitWidth / 2, - hitHeight / 2, hitWidth, hitHeight);

  button.mousedown = button.touchstart = function(data) {
    TweenLite.to(button.scale, .15, { x: 0.95, y: 0.95 });
    console.debug(button.hitArea);
  };

  button.mouseup = button.touchend = button.mouseupoutside = button.touchendoutside = function(data) {
    TweenLite.to(button.scale, .15, { x: 1, y: 1 });
  };

  button.mouseover = function(data) {
    TweenLite.to(button.scale, .15, { x: 1.05, y: 1.05 });
  };

  button.mouseout = function(data) {
    TweenLite.to(button.scale, .15, { x: 1, y: 1 });
  };

  return button;
};