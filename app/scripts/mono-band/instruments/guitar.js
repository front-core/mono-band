'use strict';

/**
 * @fileoverview MonoBand のギター楽器クラスを定義します。
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * 新しい Guitar クラスのインスタンスを生成します。
 * @constructor
 * @extends {FrontCore.EventDispatcher}
 */
MonoBand.Instruments.Guitar = function() {
  FrontCore.EventDispatcher.call(this);

};
MonoBand.Instruments.Guitar.prototype = Object.create(FrontCore.EventDispatcher.prototype);
MonoBand.Instruments.Guitar.prototype.constructor = MonoBand.Instruments.Guitar;