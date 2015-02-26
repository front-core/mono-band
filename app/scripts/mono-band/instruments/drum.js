'use strict';

/**
 * @fileoverview MonoBand のドラムクラスを定義します。
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * 新しい Drum クラスのインスタンスを生成します。
 * @constructor
 * @extends {FrontCore.EventDispatcher}
 */
MonoBand.Instruments.Drum = function() {
  FrontCore.EventDispatcher.call(this);

};
MonoBand.Instruments.Drum.prototype = Object.create(FrontCore.EventDispatcher.prototype);
MonoBand.Instruments.Drum.prototype.constructor = MonoBand.Instruments.Drum;