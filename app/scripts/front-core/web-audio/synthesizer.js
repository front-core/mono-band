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
 * @param {string} note - 音名（A4, A#4, B4 ...）
 * @param {number} octave - オクターブ番号（0, 1, 2 ...）
 * @return {number}
 */
FrontCore.WebAudio.Synthesizer.getHertz = function(note, octave) {
  // TODO: A4 からの距離を計算
  var distance; 

  // A4 = 440;
  var hertz = 440 * Math.pow(1.0595, distance);
  
  return hertz;
};

/**
 * 指定した音名のノート番号を返します。
 * @param {string} note - 音名（A4, A#4, B4 ...）
 * @param {number} octave - オクターブ番号（0, 1, 2 ...）
 * @return {number}
 */
FrontCore.WebAudio.Synthesizer.getNoteNumber = function(note, octave) {
  var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  // C -1 =  0  C 4 = 60
  // C#-1 =  1  C#4 = 61
  // D -1 =  2  D 4 = 62
  // D#-1 =  3  D#4 = 63
  // E -1 =  4  E 4 = 64
  // F -1 =  5  F 4 = 65
  // F#-1 =  6  F#4 = 66
  // G -1 =  7  G 4 = 67
  // G#-1 =  8  G#4 = 68
  // A -1 =  9  A 4 = 69
  // A#-1 = 10  A#4 = 70
  // B -1 = 11  B 4 = 71
  // C  0 = 12  C 5 = 72

  var noteNumber = notes[note] + (12 * (octave + 1));

  return noteNumber;
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

