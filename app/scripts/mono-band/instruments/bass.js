'use strict';

/**
 * @fileoverview MonoBand のベースギタークラスを定義します。
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * 新しい Bass クラスのインスタンスを生成します。
 * @constructor
 * @extends {FrontCore.EventDispatcher}
 */
MonoBand.Instruments.Bass = function() {
  FrontCore.EventDispatcher.call(this);

};
MonoBand.Instruments.Bass.prototype = Object.create(FrontCore.EventDispatcher.prototype);
MonoBand.Instruments.Bass.prototype.constructor = MonoBand.Instruments.Bass;