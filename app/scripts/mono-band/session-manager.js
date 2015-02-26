'use strict';

/**
 * @fileoverview MonoBand のセッション（マルチプレイ）を制御するクラスを定義します。
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * 新しい SessionManager クラスのインスタンスを生成します。
 * @constructor
 * @extends {FrontCore.EventDispatcher}
 */
MonoBand.SessionManager = function() {
  FrontCore.EventDispatcher.call(this);

};
MonoBand.SessionManager.prototype = Object.create(FrontCore.EventDispatcher.prototype);
MonoBand.SessionManager.prototype.constructor = MonoBand.SessionManager;