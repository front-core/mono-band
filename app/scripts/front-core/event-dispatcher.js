/* global FrontCore:false */

'use strict';

/**
 * @fileoverview Event dispatcher and original event type.
 *
 * @author heavymery@gmail.com (Shindeok Kang)
 */


/**
 * Creates a new event dispatcher.
 * @constructor
 */
FrontCore.EventDispatcher = function() {
  this._listeners = {};
};
FrontCore.EventDispatcher.prototype.constructor = FrontCore.EventDispatcher;


/**
 * Add event listener.
 * @param {string} type Event type.
 * @param {function} listener Listener function.
 */
FrontCore.EventDispatcher.prototype.addEventListener = function(type, listener) {
  if (typeof this._listeners[type] === 'undefined') {
    this._listeners[type] = [];
  }

  var listenersOfType = this._listeners[type];

  if (listenersOfType.indexOf(listener) < 0) {
    listenersOfType.push(listener);
  }
};


/**
 * Check event listener has added.
 * @param {string} type Event type.
 * @param {function} listener Listener function.
 */
FrontCore.EventDispatcher.prototype.hasEventListener = function(type, listener) {
  var listenersOfType = this._listeners[type];

  if (typeof listenersOfType !== 'undefined' && listenersOfType.indexOf(listener) > -1) {
    return true;
  } else {
    return false;
  }
};


/**
 * Remove event listener.
 * @param {string} type Event type.
 * @param {function} listener Listener function.
 */
FrontCore.EventDispatcher.prototype.removeEventListener = function(type, listener) {
  var listenersOfType = this._listeners[type];

  if(typeof listenersOfType !== 'undefined') {
    var index = listenersOfType.indexOf(listener);

    if(index > - 1) {
      listenersOfType.splice(index, 1);
    }
  }
};


/**
 * Dispatch new event.
 * @param {string} type Event type.
 * @param {object} data Event data.
 */
FrontCore.EventDispatcher.prototype.dispatchEvent = function(type, data) {
  var listenersOfType = this._listeners[type];

  if(typeof listenersOfType !== 'undefined') {
    for (var i = 0; i < listenersOfType.length; i ++) {
      listenersOfType[i].call(this, new FrontCore.Event(type, this, data));
    }
  }
};


/**
 * Creates a new event data.
 * @param {string} type Event type.
 * @param {object} target Target of event.
 * @param {object} data Data of event.
 * @constructor
 */
FrontCore.Event = function(type, target, data) {
  this.type = type;

  this.target = target;

  this.data = data;

  this.timeStamp = Date.now();
};
