'use strict';

// TODO: ドキュメント日本語で

/**
 * @fileoverview Web Audio Synthesizer implementation.
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


 /**
 * Creates a new synthesizer.
 * @constructor
 * @extends {FrontCore.EventDispatcher}
 */
FrontCore.WebSynthesizer = function() {

};
FrontCore.WebSynthesizer.prototype = Object.create(FrontCore.EventDispatcher.prototype);
FrontCore.WebSynthesizer.prototype.constructor = FrontCore.WebSynthesizer;


/**
 * Hertz of basic music notes.
 * @enum {string}
 */
FrontCore.WebSynthesizer.Hertz = {

};


/**
 * Whole music chords.
 * @enum {string}
 */
FrontCore.WebSynthesizer.Chord = {

};


/**
 * Whole music scale.
 * @enum {string}
 */
FrontCore.WebSynthesizer.Scale = {

};
