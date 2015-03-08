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

  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  this._audioContext = new window.AudioContext();

//   this._oscillator = null;

  this._gain = null;

  this._audios = {};

  this._samples = [];

};
FrontCore.WebAudio.Synthesizer.prototype = Object.create(FrontCore.EventDispatcher.prototype);
FrontCore.WebAudio.Synthesizer.prototype.constructor = FrontCore.WebAudio.Synthesizer;

//------------------------------------------------------------------------------
//
//  Constants
//
//------------------------------------------------------------------------------

/** @constant {Array.<string>} */
// FrontCore.WebAudio.Synthesizer.NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

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
  // A4(69) からの距離
  var noteNumber = FrontCore.WebAudio.Synthesizer.getNoteNumber(note, octave);
  var distance = noteNumber - 69;

  // A4(440) を基準に周波数を計算;
  var hertz = 440 * Math.pow(2, distance / 12);
  
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

  var noteIndex = notes.indexOf(note.toUpperCase());

  if(noteIndex < 0) {
    throw new Error('\'' + note + '\' is unknown note.');
  }

  var noteNumber = noteIndex + (12 * (octave + 1));

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

FrontCore.WebAudio.Synthesizer.prototype.noteOn = function(note, octave, velocity) {
  if(typeof velocity === 'undefined') { velocity = 1; }
  
  this._gain = this._audioContext.createGain();
  this._gain.gain.value = velocity;
  this._gain.connect(this._audioContext.destination);

  var noteNumber = FrontCore.WebAudio.Synthesizer.getNoteNumber(note, octave);
  
  if(this._audios[noteNumber]) {
     this._audios[noteNumber].stop(0);
   }

//   this._audios[noteNumber] = this._audioContext.createOscillator();
//   //this._oscillator.type = 'triangle';
//   this._audios[noteNumber].frequency.value = FrontCore.WebAudio.Synthesizer.getHertz(note, octave);

  this._audios[noteNumber] = this._audioContext.createBufferSource();
  // TODO: 複数のサンプルから、ノート番号の一番近いサンプルを使う
  this._audios[noteNumber].buffer = this._samples[0].soundBuffer;
  this._audios[noteNumber].playbackRate.value = Math.pow(2, (noteNumber - this._samples[0].noteNumber)/12);
  this._audios[noteNumber].loop = false;

  this._audios[noteNumber].connect(this._gain);

  this._audios[noteNumber].start(0);
};

FrontCore.WebAudio.Synthesizer.prototype.noteOff = function(note, octave) {
  var noteNumber = FrontCore.WebAudio.Synthesizer.getNoteNumber(note, octave);
  
  if(this._audios[noteNumber]) {
    this._audios[noteNumber].stop(0);
  }
};

FrontCore.WebAudio.Synthesizer.prototype.loadPatch = function() {
  this._samples = [];

  // TODO: URL は loadPatch のパラメーターで
  var url = 'audios/sample/guitar/HMLeadMulti-D3.wav';
  // TODO: ノート番号はファイル名から判定（A4, C3, ...）
  var noteNumber = 50;

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  request.onload = function(event) { 
    this._audioContext.decodeAudioData(request.response, function(buffer) {

      this._samples.push({
        noteNumber: noteNumber,
        soundBuffer: buffer
      });
    }.bind(this), function(error) {
      console.error(error);
    });
  }.bind(this);
  request.send();
}
