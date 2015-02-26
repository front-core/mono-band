/* global MonoBand:true */

'use strict';

/**
 * @fileoverview MonoBand の名前空間を定義します。
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * MonoBand のコアクラスとグローバル関数が含まれます。
 * @namespace
 */
var MonoBand = MonoBand || {};

/**
 * MonoBand の各シーンクラスが含まれます。
 * @namespace
 */
MonoBand.Scenes = {
  // Preload: 'ローディング画面',

  // TopMenu: 'アプリ起動時に表示されるトップのメニュー画面',

  // SelectInstrument: '楽器パートを選ぶ画面',
  // SelectKey: 'キーを選ぶ画面',
  // SelectTempo: 'テンポを選ぶ画面（ビードも？）',

  // PlayGuitar: 'ギター演奏画面',
  // PlayBass: 'ベース演奏画面',
  // PlayKeyboard: 'キーボード演奏画面',
  // PlayDrum: 'ドラム演奏画面',

  // NameInput: '名前入力画面（セッションの参加者表示とかランキング？とかの表示に使う名前）',

  // SessionMenu: 'セッションの作成/参加メニュー画面',
  // SessionCode: '作成したセッションのコードを表示、または入力する画面',
  // SessionLobby: 'セッションの参加者を待機する画面（作成した人がスタートできる）'
  // ...
};

/**
 * 楽曲モジュールの名前空間
 * @namespace
 */
MonoBand.Instruments = {};
