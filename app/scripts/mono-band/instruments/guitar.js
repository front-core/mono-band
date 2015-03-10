'use strict';

/**
 * @fileoverview MonoBand のギター楽器クラスを定義します。
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */

//------------------------------------------------------------------------------
//
//  Class & Properties
//
//------------------------------------------------------------------------------

/**
 * 新しい Guitar クラスのインスタンスを生成します。
 * @constructor
 * @extends {FrontCore.EventDispatcher}
 */
MonoBand.Instruments.Guitar = function() {
  FrontCore.EventDispatcher.call(this);

  var AudioContext = window.AudioContext || window.webkitAudioContext;

  this._leadSamplayer = new FrontCore.WebAudio.SamplePlayer(new AudioContext());
  this._chugSamplayer = new FrontCore.WebAudio.SamplePlayer(new AudioContext());
  this._powerChordSamplayer = new FrontCore.WebAudio.SamplePlayer(new AudioContext());
  
  // TODO: 普通のコードは単一音の Samplayer を組み合わせて鳴らす
  //this._chordSamplayer
};
MonoBand.Instruments.Guitar.prototype = Object.create(FrontCore.EventDispatcher.prototype);
MonoBand.Instruments.Guitar.prototype.constructor = MonoBand.Instruments.Guitar;

//------------------------------------------------------------------------------
//
//  Methods 
//
//------------------------------------------------------------------------------

MonoBand.Instruments.Guitar.prototype.load = function() {
  this._leadSamplayer.loadSamples([
    'audios/sample/guitar/HMLeadMulti-B2.wav',
    'audios/sample/guitar/HMLeadMulti-B3.wav',
    'audios/sample/guitar/HMLeadMulti-B4.wav',
    'audios/sample/guitar/HMLeadMulti-B5.wav',
    'audios/sample/guitar/HMLeadMulti-D2.wav',
    'audios/sample/guitar/HMLeadMulti-D3.wav',
    'audios/sample/guitar/HMLeadMulti-D4.wav',
    'audios/sample/guitar/HMLeadMulti-D5.wav',
    'audios/sample/guitar/HMLeadMulti-D6.wav',
    'audios/sample/guitar/HMLeadMulti-F2.wav',
    'audios/sample/guitar/HMLeadMulti-F3.wav',
    'audios/sample/guitar/HMLeadMulti-F4.wav',
    'audios/sample/guitar/HMLeadMulti-F5.wav',
    'audios/sample/guitar/HMLeadMulti-G#2.wav',
    'audios/sample/guitar/HMLeadMulti-G#3.wav',
    'audios/sample/guitar/HMLeadMulti-G#4.wav',
    'audios/sample/guitar/HMLeadMulti-G#5.wav'
  ]);

  this._chugSamplayer.loadSamples([
    'audios/sample/guitar/HMRhyB Chug-A3.wav',
    'audios/sample/guitar/HMRhyB Chug-B3.wav',
    'audios/sample/guitar/HMRhyB Chug-C3.wav',
    'audios/sample/guitar/HMRhyB Chug-D3.wav',
    'audios/sample/guitar/HMRhyB Chug-E3.wav',
    'audios/sample/guitar/HMRhyB Chug-F3.wav',
    'audios/sample/guitar/HMRhyB Chug-G3.wav'
  ]);

  this._powerChordSamplayer.loadSamples([
    'audios/sample/guitar/HMRhyB Powerchord-A3.wav',
    'audios/sample/guitar/HMRhyB Powerchord-B3.wav',
    'audios/sample/guitar/HMRhyB Powerchord-C3.wav',
    'audios/sample/guitar/HMRhyB Powerchord-D3.wav',
    'audios/sample/guitar/HMRhyB Powerchord-E3.wav',
    'audios/sample/guitar/HMRhyB Powerchord-F3.wav',
    'audios/sample/guitar/HMRhyB Powerchord-G3.wav'
  ]);

  // TODO: すべての Samplayer がロード完了したら
  this.dispatchEvent(MonoBand.Instruments.EventType.LOAD_COMPLETE);
};