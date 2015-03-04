'use strict';

/**
 * @fileoverview Web Audio API の良く使う AudioNodes を組み合わせた Player クラスを定義します。
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


 /**
 * 新しい Player クラスのインスタンスを生成します。
 * @constructor
 * @extends {FrontCore.EventDispatcher}
 */
FrontCore.WebAudio.Player = function() {

};
FrontCore.WebAudio.Player.prototype = Object.create(FrontCore.EventDispatcher.prototype);
FrontCore.WebAudio.Player.prototype.constructor = FrontCore.WebAudio.Player;