'use strict';

/**
 * @fileoverview Web Audio API を使った Syntehsizer クラスを定義します。
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */

//------------------------------------------------------------------------------
//
//  Class & Properties
//
//------------------------------------------------------------------------------

 /**
 * 新しい SelectInstrument クラスのインスタンスを生成します。
 * @constructor
 * @extends {FrontCore.EventDispatcher}
 */
FrontCore.WebAudio.Synthesizer = function() {

  this.audioContext = new window.webkitAudioContext();

  this.oscillator = null;

  this.gain = null;

};
FrontCore.WebAudio.Synthesizer.prototype = Object.create(FrontCore.EventDispatcher.prototype);
FrontCore.WebAudio.Synthesizer.prototype.constructor = FrontCore.WebAudio.Synthesizer;

//------------------------------------------------------------------------------
//
//  Class methods
//
//------------------------------------------------------------------------------

/**
 * 指定した音名の周波数を返します。
 * @param {string} note - オクターブ番号付きの音名（A4, A#4, B4）
 * @return {number}
 */
FrontCore.WebAudio.Synthesizer.getHertz = function(note) {
  // TODO: A4 からの距離を計算
  var distance; 

  // A4 = 440;
  var hertz = 440 * Math.pow(1.0595, distance);
  
  return hertz;
};

/**
 * 指定したコードを構成する音名の配列を返します。
 */
FrontCore.WebAudio.Synthesizer.getChordNotes = function(chrod) {

};


/**
 * 指定したスケールを構成する音名の配列を返します。
 */
FrontCore.WebAudio.Synthesizer.getScaleNotes = function(scale) {

};

//------------------------------------------------------------------------------
//
//  Methods 
//
//------------------------------------------------------------------------------

FrontCore.WebAudio.Synthesizer.prototype.play = function(frequency, volume) {
  if(typeof frequency === 'undefined') { frequency = 440; }
  if(typeof volume === 'undefined') { volume = 1; }

  this.oscillator = this.audioContext.createOscillator();
  this.gain = this.audioContext.createGain();

  //this.oscillator.type = 'triangle';
  this.oscillator.frequency.value = frequency;
  this.gain.gain.value = volume;

  this.gain.connect(this.audioContext.destination);
  this.oscillator.connect(this.gain);

  this.oscillator.start(0);
};

FrontCore.WebAudio.Synthesizer.prototype.stop = function() {
  this.oscillator.stop(0);
};

