'use strict';

/**
 * @fileoverview MonoBand のユーザー情報を管理するクラスを定義します。
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * 新しい User クラスのインスタンスを生成します。
 * @constructor
 * @extends {FrontCore.EventDispatcher}
 */
MonoBand.User = function() {
  FrontCore.EventDispatcher.call(this);

};
MonoBand.User.prototype = Object.create(FrontCore.EventDispatcher.prototype);
MonoBand.User.prototype.constructor = MonoBand.User;