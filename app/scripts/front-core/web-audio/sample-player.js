'use strict';

/**
 * @fileoverview Web Audio API を使った Sample Player クラスを定義します。
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */

//------------------------------------------------------------------------------
//
//  Class & Properties
//
//------------------------------------------------------------------------------

 /**
 * 新しい SamplePlayer クラスのインスタンスを生成します。
 * @constructor
 * @extends {FrontCore.EventDispatcher}
 */
FrontCore.WebAudio.SamplePlayer = function(audioContext, destination) {

  this.audioContext = audioContext;

  this.destination = null;

  if(destination) {
    this.destination = destination;
  } else {
    this.destination = this.audioContext.destination;
  }

  this.samples = [];

  this._audios = [];
};
FrontCore.WebAudio.SamplePlayer.prototype = Object.create(FrontCore.EventDispatcher.prototype);
FrontCore.WebAudio.SamplePlayer.prototype.constructor = FrontCore.WebAudio.SamplePlayer;

//------------------------------------------------------------------------------
//
//  Methods 
//
//------------------------------------------------------------------------------

FrontCore.WebAudio.SamplePlayer.prototype.noteOn = function(note, octave, velocity) {
  if(typeof velocity === 'undefined') { velocity = 1; }
  
  var gain = this.audioContext.createGain();
  gain.gain.value = velocity;
  gain.connect(this.destination);

  var noteNumber = FrontCore.WebAudio.getNoteNumber(note, octave);
  
  if(this._audios[noteNumber]) {
     this._audios[noteNumber].stop(0);
   }

  this._audios[noteNumber] = this.audioContext.createBufferSource();

  // 複数のサンプルから、ノート番号の一番近いサンプルを探す
  var targetSample;
  var sampleDistance = 12;
  for(var i = 0; i < this.samples.length; i++) {
    var sample = this.samples[i];
    var distance = Math.abs(noteNumber - sample.noteNumber);

    if(sampleDistance > distance) {
      sampleDistance = distance;
      targetSample = sample;
    }
  }
  
  this._audios[noteNumber].buffer = targetSample.soundBuffer;
  this._audios[noteNumber].playbackRate.value = Math.pow(2, (noteNumber - targetSample.noteNumber)/12);
  this._audios[noteNumber].loop = false;

  this._audios[noteNumber].connect(gain);

  this._audios[noteNumber].start(0);
};


FrontCore.WebAudio.SamplePlayer.prototype.noteOff = function(note, octave) {
  var noteNumber = FrontCore.WebAudio.getNoteNumber(note, octave);
  
  // TODO: 音が自然に止まるようにする
  if(this._audios[noteNumber]) {
    this._audios[noteNumber].stop(0);
  }
};


FrontCore.WebAudio.SamplePlayer.prototype.loadSamples = function(sampleURLs) {
  this.samples = [];

  for(var i = 0; i < sampleURLs.length; i++) {

    var request = new XMLHttpRequest();
    request.open('GET', encodeURIComponent(sampleURLs[i]), true);
    request.responseType = 'arraybuffer';

    request.onload = function(event) { 
      this.audioContext.decodeAudioData(event.target.response, function(buffer) {

        var responseURL = decodeURIComponent(event.target.responseURL);

        var urlMatch = responseURL.match(/.*[-_]([A-G][#]?)(\d)\.wav/);
        if(!urlMatch || urlMatch.length < 3) {
          throw new Error('\'' + responseURL + '\' is not valid sample url.');
        }

        var noteNumber = FrontCore.WebAudio.getNoteNumber(urlMatch[1], urlMatch[2]);

        this.samples.push({
          noteNumber: noteNumber,
          soundBuffer: buffer
        });
      }.bind(this), function(error) {
        console.error(error);
      });
    }.bind(this);

    request.send();
  }
};
