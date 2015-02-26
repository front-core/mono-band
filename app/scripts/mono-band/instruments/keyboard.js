'use strict';

/**
 * @fileoverview MonoBand のキーボード楽器クラスを定義します。
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * 新しい Keyboard クラスのインスタンスを生成します。
 * @constructor
 * @extends {FrontCore.EventDispatcher}
 */
MonoBand.Instruments.Keyboard = function() {
  FrontCore.EventDispatcher.call(this);

};
MonoBand.Instruments.Keyboard.prototype = Object.create(FrontCore.EventDispatcher.prototype);
MonoBand.Instruments.Keyboard.prototype.constructor = MonoBand.Instruments.Keyboard;