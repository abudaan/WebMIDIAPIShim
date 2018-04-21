(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
'use strict';

var _midi_access = require('./midi/midi_access');

var _util = require('./util/util');

var _midi_input = require('./midi/midi_input');

var Input = _interopRequireWildcard(_midi_input);

var _midi_output = require('./midi/midi_output');

var Output = _interopRequireWildcard(_midi_output);

var _midimessage_event = require('./midi/midimessage_event');

var _midimessage_event2 = _interopRequireDefault(_midimessage_event);

var _midiconnection_event = require('./midi/midiconnection_event');

var _midiconnection_event2 = _interopRequireDefault(_midiconnection_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import MIDIInput from './midi/midi_input';
// import MIDIOutput from './midi/midi_output';
var midiAccess = void 0;

var init = function init() {
    if (!navigator.requestMIDIAccess) {
        // Add some functionality to older browsers
        (0, _util.polyfill)();

        navigator.requestMIDIAccess = function () {
            // Singleton-ish, no need to create multiple instances of MIDIAccess
            if (midiAccess === undefined) {
                midiAccess = (0, _midi_access.createMIDIAccess)();
                // Add global vars that mimic WebMIDI API native globals
                var scope = (0, _util.getScope)();
                scope.MIDIInput = Input;
                scope.MIDIOutput = Output;
                scope.MIDIMessageEvent = _midimessage_event2.default;
                scope.MIDIConnectionEvent = _midiconnection_event2.default;
            }
            return midiAccess;
        };
        if ((0, _util.getDevice)().nodejs === true) {
            navigator.close = function () {
                // For Nodejs applications we need to add a method that closes all MIDI input ports,
                // otherwise Nodejs will wait for MIDI input forever.
                (0, _midi_access.closeAllMIDIInputs)();
            };
        }
    }
};

init();

},{"./midi/midi_access":3,"./midi/midi_input":4,"./midi/midi_output":5,"./midi/midiconnection_event":6,"./midi/midimessage_event":7,"./util/util":10}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Creates a MIDIAccess instance:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - Creates MIDIInput and MIDIOutput instances for the initially connected MIDI devices.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - Keeps track of newly connected devices and creates the necessary instances of MIDIInput and MIDIOutput.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - Keeps track of disconnected devices and removes them from the inputs and/or outputs map.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - Creates a unique id for every device and stores these ids by the name of the device:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         so when a device gets disconnected and reconnected again, it will still have the same id. This
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         is in line with the behavior of the native MIDIAccess object.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

exports.createMIDIAccess = createMIDIAccess;
exports.dispatchEvent = dispatchEvent;
exports.closeAllMIDIInputs = closeAllMIDIInputs;
exports.getMIDIDeviceId = getMIDIDeviceId;

var _midi_input = require('./midi_input');

var _midi_input2 = _interopRequireDefault(_midi_input);

var _midi_output = require('./midi_output');

var _midi_output2 = _interopRequireDefault(_midi_output);

var _midiconnection_event = require('./midiconnection_event');

var _midiconnection_event2 = _interopRequireDefault(_midiconnection_event);

var _jazz_instance = require('../util/jazz_instance');

var _util = require('../util/util');

var _store = require('../util/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var midiAccess = void 0;
var jazzInstance = void 0;
var midiInputs = new _store2.default();
var midiOutputs = new _store2.default();
var midiInputIds = new _store2.default();
var midiOutputIds = new _store2.default();
var listeners = new _store2.default();

var MIDIAccess = function () {
    function MIDIAccess(midiInputs, midiOutputs) {
        _classCallCheck(this, MIDIAccess);

        this.sysexEnabled = true;
        this.inputs = midiInputs;
        this.outputs = midiOutputs;
    }

    _createClass(MIDIAccess, [{
        key: 'addEventListener',
        value: function addEventListener(type, listener) {
            if (type !== 'statechange') {
                return;
            }
            if (listeners.has(listener) === false) {
                listeners.add(listener);
            }
        }
    }, {
        key: 'removeEventListener',
        value: function removeEventListener(type, listener) {
            if (type !== 'statechange') {
                return;
            }
            if (listeners.has(listener) === true) {
                listeners.delete(listener);
            }
        }
    }]);

    return MIDIAccess;
}();

function createMIDIAccess() {
    return new Promise(function (resolve, reject) {
        if (typeof midiAccess !== 'undefined') {
            resolve(midiAccess);
            return;
        }

        if ((0, _util.getDevice)().browser === 'ie9') {
            reject({ message: 'WebMIDIAPIShim supports Internet Explorer 10 and above.' });
            return;
        }

        (0, _jazz_instance.createJazzInstance)(function (instance) {
            if (typeof instance === 'undefined' || instance === null) {
                reject({ message: 'No access to MIDI devices: your browser does not support the WebMIDI API and the Jazz plugin is not installed.' });
                return;
            }

            jazzInstance = instance;

            createMIDIPorts(function () {
                setupListeners();
                midiAccess = new MIDIAccess(midiInputs, midiOutputs);
                resolve(midiAccess);
            });
        });
    });
}

// create MIDIInput and MIDIOutput instances for all initially connected MIDI devices
function createMIDIPorts(callback) {
    var inputs = jazzInstance.MidiInList();
    var outputs = jazzInstance.MidiOutList();
    var numInputs = inputs.length;
    var numOutputs = outputs.length;

    loopCreateMIDIPort(0, numInputs, 'input', inputs, function () {
        loopCreateMIDIPort(0, numOutputs, 'output', outputs, callback);
    });
}

function loopCreateMIDIPort(index, max, type, list, callback) {
    if (index < max) {
        var name = list[index++];
        createMIDIPort(type, name, function () {
            loopCreateMIDIPort(index, max, type, list, callback);
        });
    } else {
        callback();
    }
}

function createMIDIPort(type, name, callback) {
    (0, _jazz_instance.getJazzInstance)(type, function (instance) {
        var port = void 0;
        var info = [name, '', ''];
        if (type === 'input') {
            if (instance.Support('MidiInInfo')) {
                info = instance.MidiInInfo(name);
            }
            port = new _midi_input2.default(info, instance);
            midiInputs.set(port.id, port);
        } else if (type === 'output') {
            if (instance.Support('MidiOutInfo')) {
                info = instance.MidiOutInfo(name);
            }
            port = new _midi_output2.default(info, instance);
            midiOutputs.set(port.id, port);
        }
        callback(port);
    });
}

// lookup function: Jazz gives us the name of the connected/disconnected MIDI devices but we have stored them by id
function getPortByName(ports, name) {
    var port = void 0;
    var values = ports.values();
    for (var i = 0; i < values.length; i += 1) {
        port = values[i];
        if (port.name === name) {
            break;
        }
    }
    return port;
}

// keep track of connected/disconnected MIDI devices
function setupListeners() {
    jazzInstance.OnDisconnectMidiIn(function (name) {
        var port = getPortByName(midiInputs, name);
        if (port !== undefined) {
            port.state = 'disconnected';
            port.close();
            port._jazzInstance.inputInUse = false;
            midiInputs.delete(port.id);
            dispatchEvent(port);
        }
    });

    jazzInstance.OnDisconnectMidiOut(function (name) {
        var port = getPortByName(midiOutputs, name);
        if (port !== undefined) {
            port.state = 'disconnected';
            port.close();
            port._jazzInstance.outputInUse = false;
            midiOutputs.delete(port.id);
            dispatchEvent(port);
        }
    });

    jazzInstance.OnConnectMidiIn(function (name) {
        createMIDIPort('input', name, function (port) {
            dispatchEvent(port);
        });
    });

    jazzInstance.OnConnectMidiOut(function (name) {
        createMIDIPort('output', name, function (port) {
            dispatchEvent(port);
        });
    });
}

// when a device gets connected/disconnected both the port and MIDIAccess dispatch a MIDIConnectionEvent
// therefor we call the ports dispatchEvent function here as well
function dispatchEvent(port) {
    port.dispatchEvent(new _midiconnection_event2.default(port, port));

    var evt = new _midiconnection_event2.default(midiAccess, port);

    if (typeof midiAccess.onstatechange === 'function') {
        midiAccess.onstatechange(evt);
    }
    listeners.forEach(function (listener) {
        return listener(evt);
    });
}

function closeAllMIDIInputs() {
    midiInputs.forEach(function (input) {
        // input.close();
        input._jazzInstance.MidiInClose();
    });
}

// check if we have already created a unique id for this device, if so: reuse it, if not: create a new id and store it
function getMIDIDeviceId(name, type) {
    var id = void 0;
    if (type === 'input') {
        id = midiInputIds.get(name);
        if (id === undefined) {
            id = (0, _util.generateUUID)();
            midiInputIds.set(name, id);
        }
    } else if (type === 'output') {
        id = midiOutputIds.get(name);
        if (id === undefined) {
            id = (0, _util.generateUUID)();
            midiOutputIds.set(name, id);
        }
    }
    return id;
}

},{"../util/jazz_instance":8,"../util/store":9,"../util/util":10,"./midi_input":4,"./midi_output":5,"./midiconnection_event":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       MIDIInput is a wrapper around an input of a Jazz instance
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _midimessage_event = require('./midimessage_event');

var _midimessage_event2 = _interopRequireDefault(_midimessage_event);

var _midiconnection_event = require('./midiconnection_event');

var _midiconnection_event2 = _interopRequireDefault(_midiconnection_event);

var _midi_access = require('./midi_access');

var _util = require('../util/util');

var _store = require('../util/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var midiProc = void 0;
var nodejs = (0, _util.getDevice)().nodejs;

var MIDIInput = function () {
    function MIDIInput(info, instance) {
        _classCallCheck(this, MIDIInput);

        this.id = (0, _midi_access.getMIDIDeviceId)(info[0], 'input');
        this.name = info[0];
        this.manufacturer = info[1];
        this.version = info[2];
        this.type = 'input';
        this.state = 'connected';
        this.connection = 'pending';

        this.onstatechange = null;
        this._onmidimessage = null;
        // because we need to implicitly open the device when an onmidimessage handler gets added
        // we define a setter that opens the device if the set value is a function
        Object.defineProperty(this, 'onmidimessage', {
            set: function set(value) {
                this._onmidimessage = value;
                if (typeof value === 'function') {
                    this.open();
                }
            }
        });

        this._listeners = new _store2.default().set('midimessage', new _store2.default()).set('statechange', new _store2.default());
        this._inLongSysexMessage = false;
        this._sysexBuffer = new Uint8Array();

        this._jazzInstance = instance;
        this._jazzInstance.inputInUse = true;

        // on Linux opening and closing Jazz instances causes the plugin to crash a lot so we open
        // the device here and don't close it when close() is called, see below
        if ((0, _util.getDevice)().platform === 'linux') {
            this._jazzInstance.MidiInOpen(this.name, midiProc.bind(this));
        }
    }

    _createClass(MIDIInput, [{
        key: 'addEventListener',
        value: function addEventListener(type, listener) {
            var listeners = this._listeners.get(type);
            if (typeof listeners === 'undefined') {
                return;
            }

            if (listeners.has(listener) === false) {
                listeners.add(listener);
            }
        }
    }, {
        key: 'removeEventListener',
        value: function removeEventListener(type, listener) {
            var listeners = this._listeners.get(type);
            if (typeof listeners === 'undefined') {
                return;
            }

            if (listeners.has(listener) === true) {
                listeners.delete(listener);
            }
        }
    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent(evt) {
            var listeners = this._listeners.get(evt.type);
            listeners.forEach(function (listener) {
                listener(evt);
            });

            if (evt.type === 'midimessage') {
                if (this._onmidimessage !== null) {
                    this._onmidimessage(evt);
                }
            } else if (evt.type === 'statechange') {
                if (this.onstatechange !== null) {
                    this.onstatechange(evt);
                }
            }
        }
    }, {
        key: 'open',
        value: function open() {
            if (this.connection === 'open') {
                return;
            }
            if ((0, _util.getDevice)().platform !== 'linux') {
                this._jazzInstance.MidiInOpen(this.name, midiProc.bind(this));
            }
            this.connection = 'open';
            (0, _midi_access.dispatchEvent)(this); // dispatch MIDIConnectionEvent via MIDIAccess
        }
    }, {
        key: 'close',
        value: function close() {
            if (this.connection === 'closed') {
                return;
            }
            if ((0, _util.getDevice)().platform !== 'linux') {
                this._jazzInstance.MidiInClose();
            }
            this.connection = 'closed';
            (0, _midi_access.dispatchEvent)(this); // dispatch MIDIConnectionEvent via MIDIAccess
            this._onmidimessage = null;
            this.onstatechange = null;
            this._listeners.get('midimessage').clear();
            this._listeners.get('statechange').clear();
        }
    }, {
        key: '_appendToSysexBuffer',
        value: function _appendToSysexBuffer(data) {
            var oldLength = this._sysexBuffer.length;
            var tmpBuffer = new Uint8Array(oldLength + data.length);
            tmpBuffer.set(this._sysexBuffer);
            tmpBuffer.set(data, oldLength);
            this._sysexBuffer = tmpBuffer;
        }
    }, {
        key: '_bufferLongSysex',
        value: function _bufferLongSysex(data, initialOffset) {
            var j = initialOffset;
            while (j < data.length) {
                if (data[j] == 0xF7) {
                    // end of sysex!
                    j += 1;
                    this._appendToSysexBuffer(data.slice(initialOffset, j));
                    return j;
                }
                j += 1;
            }
            // didn't reach the end; just tack it on.
            this._appendToSysexBuffer(data.slice(initialOffset, j));
            this._inLongSysexMessage = true;
            return j;
        }
    }]);

    return MIDIInput;
}();

exports.default = MIDIInput;


midiProc = function midiProc(timestamp, data) {
    var length = 0;
    var i = void 0;
    var isSysexMessage = false;

    // Jazz sometimes passes us multiple messages at once, so we need to parse them out and pass them one at a time.

    for (i = 0; i < data.length; i += length) {
        var isValidMessage = true;
        if (this._inLongSysexMessage) {
            i = this._bufferLongSysex(data, i);
            if (data[i - 1] != 0xf7) {
                // ran off the end without hitting the end of the sysex message
                return;
            }
            isSysexMessage = true;
        } else {
            isSysexMessage = false;
            switch (data[i] & 0xF0) {
                case 0x00:
                    // Chew up spurious 0x00 bytes.  Fixes a Windows problem.
                    length = 1;
                    isValidMessage = false;
                    break;

                case 0x80: // note off
                case 0x90: // note on
                case 0xA0: // polyphonic aftertouch
                case 0xB0: // control change
                case 0xE0:
                    // channel mode
                    length = 3;
                    break;

                case 0xC0: // program change
                case 0xD0:
                    // channel aftertouch
                    length = 2;
                    break;

                case 0xF0:
                    switch (data[i]) {
                        case 0xf0:
                            // letiable-length sysex.
                            i = this._bufferLongSysex(data, i);
                            if (data[i - 1] != 0xf7) {
                                // ran off the end without hitting the end of the sysex message
                                return;
                            }
                            isSysexMessage = true;
                            break;

                        case 0xF1: // MTC quarter frame
                        case 0xF3:
                            // song select
                            length = 2;
                            break;

                        case 0xF2:
                            // song position pointer
                            length = 3;
                            break;

                        default:
                            length = 1;
                            break;
                    }
                    break;
            }
        }
        if (!isValidMessage) {
            continue;
        }

        var evt = {};
        evt.receivedTime = parseFloat(timestamp.toString()) + this._jazzInstance._perfTimeZero;

        if (isSysexMessage || this._inLongSysexMessage) {
            evt.data = new Uint8Array(this._sysexBuffer);
            this._sysexBuffer = new Uint8Array(0);
            this._inLongSysexMessage = false;
        } else {
            evt.data = new Uint8Array(data.slice(i, length + i));
        }

        if (nodejs) {
            if (this._onmidimessage) {
                this._onmidimessage(evt);
            }
        } else {
            var e = new _midimessage_event2.default(this, evt.data, evt.receivedTime);
            this.dispatchEvent(e);
        }
    }
};

},{"../util/store":9,"../util/util":10,"./midi_access":3,"./midiconnection_event":6,"./midimessage_event":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       MIDIOutput is a wrapper around an output of a Jazz instance
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _util = require('../util/util');

var _store = require('../util/store');

var _store2 = _interopRequireDefault(_store);

var _midi_access = require('./midi_access');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MIDIOutput = function () {
    function MIDIOutput(info, instance) {
        _classCallCheck(this, MIDIOutput);

        this.id = (0, _midi_access.getMIDIDeviceId)(info[0], 'output');
        this.name = info[0];
        this.manufacturer = info[1];
        this.version = info[2];
        this.type = 'output';
        this.state = 'connected';
        this.connection = 'pending';
        this.onmidimessage = null;
        this.onstatechange = null;

        this._listeners = new _store2.default();
        this._inLongSysexMessage = false;
        this._sysexBuffer = new Uint8Array();

        this._jazzInstance = instance;
        this._jazzInstance.outputInUse = true;
        if ((0, _util.getDevice)().platform === 'linux') {
            this._jazzInstance.MidiOutOpen(this.name);
        }
    }

    _createClass(MIDIOutput, [{
        key: 'open',
        value: function open() {
            if (this.connection === 'open') {
                return;
            }
            if ((0, _util.getDevice)().platform !== 'linux') {
                this._jazzInstance.MidiOutOpen(this.name);
            }
            this.connection = 'open';
            (0, _midi_access.dispatchEvent)(this); // dispatch MIDIConnectionEvent via MIDIAccess
        }
    }, {
        key: 'close',
        value: function close() {
            if (this.connection === 'closed') {
                return;
            }
            if ((0, _util.getDevice)().platform !== 'linux') {
                this._jazzInstance.MidiOutClose();
            }
            this.connection = 'closed';
            (0, _midi_access.dispatchEvent)(this); // dispatch MIDIConnectionEvent via MIDIAccess
            this.onstatechange = null;
            this._listeners.clear();
        }
    }, {
        key: 'send',
        value: function send(data, timestamp) {
            var _this = this;

            var delayBeforeSend = 0;

            if (data.length === 0) {
                return false;
            }

            if (timestamp) {
                delayBeforeSend = Math.floor(timestamp - performance.now());
            }

            if (timestamp && delayBeforeSend > 1) {
                setTimeout(function () {
                    _this._jazzInstance.MidiOutLong(data);
                }, delayBeforeSend);
            } else {
                this._jazzInstance.MidiOutLong(data);
            }
            return true;
        }
    }, {
        key: 'clear',
        value: function clear() {
            // to be implemented
        }
    }, {
        key: 'addEventListener',
        value: function addEventListener(type, listener) {
            if (type !== 'statechange') {
                return;
            }

            if (this._listeners.has(listener) === false) {
                this._listeners.add(listener);
            }
        }
    }, {
        key: 'removeEventListener',
        value: function removeEventListener(type, listener) {
            if (type !== 'statechange') {
                return;
            }

            if (this._listeners.has(listener) === true) {
                this._listeners.delete(listener);
            }
        }
    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent(evt) {
            this._listeners.forEach(function (listener) {
                listener(evt);
            });

            if (this.onstatechange !== null) {
                this.onstatechange(evt);
            }
        }
    }]);

    return MIDIOutput;
}();

exports.default = MIDIOutput;

},{"../util/store":9,"../util/util":10,"./midi_access":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MIDIConnectionEvent = function MIDIConnectionEvent(midiAccess, port) {
    _classCallCheck(this, MIDIConnectionEvent);

    this.bubbles = false;
    this.cancelBubble = false;
    this.cancelable = false;
    this.currentTarget = midiAccess;
    this.defaultPrevented = false;
    this.eventPhase = 0;
    this.path = [];
    this.port = port;
    this.returnValue = true;
    this.srcElement = midiAccess;
    this.target = midiAccess;
    this.timeStamp = Date.now();
    this.type = 'statechange';
};

exports.default = MIDIConnectionEvent;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MIDIMessageEvent = function MIDIMessageEvent(port, data, receivedTime) {
    _classCallCheck(this, MIDIMessageEvent);

    this.bubbles = false;
    this.cancelBubble = false;
    this.cancelable = false;
    this.currentTarget = port;
    this.data = data;
    this.defaultPrevented = false;
    this.eventPhase = 0;
    this.path = [];
    this.receivedTime = receivedTime;
    this.returnValue = true;
    this.srcElement = port;
    this.target = port;
    this.timeStamp = Date.now();
    this.type = 'midimessage';
};

exports.default = MIDIMessageEvent;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createJazzInstance = createJazzInstance;
exports.getJazzInstance = getJazzInstance;

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-underscore-dangle: 0 */

/*
  Creates instances of the Jazz plugin if necessary. Initially the MIDIAccess creates one main Jazz instance that is used
  to query all initially connected devices, and to track the devices that are being connected or disconnected at runtime.

  For every MIDIInput and MIDIOutput that is created, MIDIAccess queries the getJazzInstance() method for a Jazz instance
  that still have an available input or output. Because Jazz only allows one input and one output per instance, we
  need to create new instances if more than one MIDI input or output device gets connected.

  Note that an existing Jazz instance doesn't get deleted when both its input and output device are disconnected; instead it
  will be reused if a new device gets connected.
*/

var jazzPluginInitTime = (0, _util.getDevice)().browser === 'firefox' ? 200 : 100; // 200 ms timeout for Firefox v.55

var jazzInstanceNumber = 0;
var jazzInstances = new _store2.default();

function createJazzInstance(callback) {
    var id = 'jazz_' + jazzInstanceNumber + '_' + Date.now();
    jazzInstanceNumber += 1;
    var objRef = void 0;
    var activeX = void 0;

    if ((0, _util.getDevice)().nodejs === true) {
        // jazzMidi is added to the global variable navigator in the node environment
        objRef = new navigator.jazzMidi.MIDI();
    } else {
        /*
            generate this html:
             <object id="Jazz1" classid="CLSID:1ACE1618-1C7D-4561-AEE1-34842AA85E90" class="hidden">
                <object id="Jazz2" type="audio/x-jazz" class="hidden">
                    <p style="visibility:visible;">This page requires <a href=http://jazz-soft.net>Jazz-Plugin</a> ...</p>
                </object>
            </object>
        */

        activeX = document.createElement('object');
        activeX.id = id + 'ie';
        activeX.classid = 'CLSID:1ACE1618-1C7D-4561-AEE1-34842AA85E90';

        objRef = document.createElement('object');
        objRef.id = id;
        objRef.type = 'audio/x-jazz';

        activeX.appendChild(objRef);

        var p = document.createElement('p');
        p.appendChild(document.createTextNode('This page requires the '));

        var a = document.createElement('a');
        a.appendChild(document.createTextNode('Jazz plugin'));
        a.href = 'http://jazz-soft.net/';

        p.appendChild(a);
        p.appendChild(document.createTextNode('.'));

        objRef.appendChild(p);

        var insertionPoint = document.getElementById('MIDIPlugin');
        if (!insertionPoint) {
            // Create hidden element
            insertionPoint = document.createElement('div');
            insertionPoint.id = 'MIDIPlugin';
            insertionPoint.style.position = 'absolute';
            insertionPoint.style.visibility = 'hidden';
            insertionPoint.style.left = '-9999px';
            insertionPoint.style.top = '-9999px';
            document.body.appendChild(insertionPoint);
        }
        insertionPoint.appendChild(activeX);
    }

    setTimeout(function () {
        var instance = null;
        if (objRef.isJazz === true) {
            instance = objRef;
        } else if (activeX.isJazz === true) {
            instance = activeX;
        }
        if (instance !== null) {
            instance._perfTimeZero = performance.now();
            jazzInstances.set(jazzInstanceNumber, instance);
        }
        callback(instance);
    }, jazzPluginInitTime);
}

function getJazzInstance(type, callback) {
    var key = type === 'input' ? 'inputInUse' : 'outputInUse';
    var instance = null;

    var values = jazzInstances.values();
    for (var i = 0; i < values.length; i += 1) {
        var inst = values[i];
        if (inst[key] !== true) {
            instance = inst;
            break;
        }
    }

    if (instance === null) {
        createJazzInstance(callback);
    } else {
        callback(instance);
    }
}

},{"./store":9,"./util":10}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// es5 implementation of both Map and Set

var idIndex = 0;

var Store = function () {
    function Store() {
        _classCallCheck(this, Store);

        this.store = {};
        this.keys = [];
    }

    _createClass(Store, [{
        key: "add",
        value: function add(obj) {
            var id = "" + new Date().getTime() + idIndex;
            idIndex += 1;
            this.keys.push(id);
            this.store[id] = obj;
        }
    }, {
        key: "set",
        value: function set(id, obj) {
            this.keys.push(id);
            this.store[id] = obj;
            return this;
        }
    }, {
        key: "get",
        value: function get(id) {
            return this.store[id];
        }
    }, {
        key: "has",
        value: function has(id) {
            return this.keys.indexOf(id) !== -1;
        }
    }, {
        key: "delete",
        value: function _delete(id) {
            delete this.store[id];
            var index = this.keys.indexOf(id);
            if (index > -1) {
                this.keys.splice(index, 1);
            }
            return this;
        }
    }, {
        key: "values",
        value: function values() {
            var elements = [];
            var l = this.keys.length;
            for (var i = 0; i < l; i += 1) {
                var element = this.store[this.keys[i]];
                elements.push(element);
            }
            return elements;
        }
    }, {
        key: "forEach",
        value: function forEach(cb) {
            var l = this.keys.length;
            for (var i = 0; i < l; i += 1) {
                var element = this.store[this.keys[i]];
                cb(element);
            }
        }
    }, {
        key: "clear",
        value: function clear() {
            this.keys = [];
            this.store = {};
        }
    }]);

    return Store;
}();

exports.default = Store;

},{}],10:[function(require,module,exports){
(function (process,global){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getScope = getScope;
exports.getDevice = getDevice;
exports.generateUUID = generateUUID;
exports.polyfill = polyfill;
var Scope = void 0;
var device = null;

// check if we are in a browser or in Nodejs
function getScope() {
    if (typeof Scope !== 'undefined') {
        return Scope;
    }
    Scope = null;
    if (typeof window !== 'undefined') {
        Scope = window;
    } else if (typeof global !== 'undefined') {
        Scope = global;
    }
    // console.log('scope', scope);
    return Scope;
}

// check on what type of device we are running, note that in this context
// a device is a computer not a MIDI device
function getDevice() {
    var scope = getScope();
    if (device !== null) {
        return device;
    }

    var platform = 'undetected';
    var browser = 'undetected';

    if (scope.navigator.node === true) {
        device = {
            platform: process.platform,
            nodejs: true,
            mobile: platform === 'ios' || platform === 'android'
        };
        return device;
    }

    var ua = scope.navigator.userAgent;

    if (ua.match(/(iPad|iPhone|iPod)/g)) {
        platform = 'ios';
    } else if (ua.indexOf('Android') !== -1) {
        platform = 'android';
    } else if (ua.indexOf('Linux') !== -1) {
        platform = 'linux';
    } else if (ua.indexOf('Macintosh') !== -1) {
        platform = 'osx';
    } else if (ua.indexOf('Windows') !== -1) {
        platform = 'windows';
    }

    if (ua.indexOf('Chrome') !== -1) {
        // chrome, chromium and canary
        browser = 'chrome';

        if (ua.indexOf('OPR') !== -1) {
            browser = 'opera';
        } else if (ua.indexOf('Chromium') !== -1) {
            browser = 'chromium';
        }
    } else if (ua.indexOf('Safari') !== -1) {
        browser = 'safari';
    } else if (ua.indexOf('Firefox') !== -1) {
        browser = 'firefox';
    } else if (ua.indexOf('Trident') !== -1) {
        browser = 'ie';
        if (ua.indexOf('MSIE 9') !== -1) {
            browser = 'ie9';
        }
    }

    if (platform === 'ios') {
        if (ua.indexOf('CriOS') !== -1) {
            browser = 'chrome';
        }
    }

    device = {
        platform: platform,
        browser: browser,
        mobile: platform === 'ios' || platform === 'android',
        nodejs: false
    };
    return device;
}

// polyfill for window.performance.now()
var polyfillPerformance = function polyfillPerformance() {
    var scope = getScope();
    if (typeof scope.performance === 'undefined') {
        scope.performance = {};
    }
    Date.now = Date.now || function () {
        return new Date().getTime();
    };

    if (typeof scope.performance.now === 'undefined') {
        var nowOffset = Date.now();
        if (typeof scope.performance.timing !== 'undefined' && typeof scope.performance.timing.navigationStart !== 'undefined') {
            nowOffset = scope.performance.timing.navigationStart;
        }
        scope.performance.now = function now() {
            return Date.now() - nowOffset;
        };
    }
};

// generates UUID for MIDI devices
function generateUUID() {
    var d = new Date().getTime();
    var uuid = new Array(64).join('x'); // 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    uuid = uuid.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : r & 0x3 | 0x8).toString(16).toUpperCase();
    });
    return uuid;
}

// a very simple implementation of a Promise for Internet Explorer and Nodejs
var polyfillPromise = function polyfillPromise() {
    var scope = getScope();
    if (typeof scope.Promise !== 'function') {
        scope.Promise = function promise(executor) {
            this.executor = executor;
        };

        scope.Promise.prototype.then = function then(resolve, reject) {
            if (typeof resolve !== 'function') {
                resolve = function resolve() {};
            }
            if (typeof reject !== 'function') {
                reject = function reject() {};
            }
            this.executor(resolve, reject);
        };
    }
};

function polyfill() {
    var d = getDevice();
    // console.log(device);
    if (d.browser === 'ie' || d.nodejs === true) {
        polyfillPromise();
    }
    polyfillPerformance();
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL21pZGkvbWlkaV9hY2Nlc3MuanMiLCJzcmMvbWlkaS9taWRpX2lucHV0LmpzIiwic3JjL21pZGkvbWlkaV9vdXRwdXQuanMiLCJzcmMvbWlkaS9taWRpY29ubmVjdGlvbl9ldmVudC5qcyIsInNyYy9taWRpL21pZGltZXNzYWdlX2V2ZW50LmpzIiwic3JjL3V0aWwvamF6el9pbnN0YW5jZS5qcyIsInNyYy91dGlsL3N0b3JlLmpzIiwic3JjL3V0aWwvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LE1BQU0sR0FBTixHQUFZLENBQVosR0FBaUIsSUFBSSxHQUFKLEdBQVUsR0FBNUIsRUFBa0MsUUFBbEMsQ0FBMkMsRUFBM0MsRUFBK0MsV0FBL0MsRUFBUDtBQUNILEtBSk0sQ0FBUDtBQUtBLFdBQU8sSUFBUDtBQUNIOztBQUdEO0FBQ0EsSUFBTSxrQkFBa0IsU0FBbEIsZUFBa0IsR0FBTTtBQUMxQixRQUFNLFFBQVEsVUFBZDtBQUNBLFFBQUksT0FBTyxNQUFNLE9BQWIsS0FBeUIsVUFBN0IsRUFBeUM7QUFDckMsY0FBTSxPQUFOLEdBQWdCLFNBQVMsT0FBVCxDQUFpQixRQUFqQixFQUEyQjtBQUN2QyxpQkFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0gsU0FGRDs7QUFJQSxjQUFNLE9BQU4sQ0FBYyxTQUFkLENBQXdCLElBQXhCLEdBQStCLFNBQVMsSUFBVCxDQUFjLE9BQWQsRUFBdUIsTUFBdkIsRUFBK0I7QUFDMUQsZ0JBQUksT0FBTyxPQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQy9CLDBCQUFVLG1CQUFNLENBQUcsQ0FBbkI7QUFDSDtBQUNELGdCQUFJLE9BQU8sTUFBUCxLQUFrQixVQUF0QixFQUFrQztBQUM5Qix5QkFBUyxrQkFBTSxDQUFHLENBQWxCO0FBQ0g7QUFDRCxpQkFBSyxRQUFMLENBQWMsT0FBZCxFQUF1QixNQUF2QjtBQUNILFNBUkQ7QUFTSDtBQUNKLENBakJEOztBQW9CTyxTQUFTLFFBQVQsR0FBb0I7QUFDdkIsUUFBTSxJQUFJLFdBQVY7QUFDQTtBQUNBLFFBQUksRUFBRSxPQUFGLEtBQWMsSUFBZCxJQUFzQixFQUFFLE1BQUYsS0FBYSxJQUF2QyxFQUE2QztBQUN6QztBQUNIO0FBQ0Q7QUFDSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiaW1wb3J0IHsgY3JlYXRlTUlESUFjY2VzcywgY2xvc2VBbGxNSURJSW5wdXRzIH0gZnJvbSAnLi9taWRpL21pZGlfYWNjZXNzJztcbmltcG9ydCB7IHBvbHlmaWxsLCBnZXREZXZpY2UsIGdldFNjb3BlIH0gZnJvbSAnLi91dGlsL3V0aWwnO1xuLy8gaW1wb3J0IE1JRElJbnB1dCBmcm9tICcuL21pZGkvbWlkaV9pbnB1dCc7XG4vLyBpbXBvcnQgTUlESU91dHB1dCBmcm9tICcuL21pZGkvbWlkaV9vdXRwdXQnO1xuaW1wb3J0ICogYXMgSW5wdXQgZnJvbSAnLi9taWRpL21pZGlfaW5wdXQnO1xuaW1wb3J0ICogYXMgT3V0cHV0IGZyb20gJy4vbWlkaS9taWRpX291dHB1dCc7XG5pbXBvcnQgTUlESU1lc3NhZ2VFdmVudCBmcm9tICcuL21pZGkvbWlkaW1lc3NhZ2VfZXZlbnQnO1xuaW1wb3J0IE1JRElDb25uZWN0aW9uRXZlbnQgZnJvbSAnLi9taWRpL21pZGljb25uZWN0aW9uX2V2ZW50JztcblxubGV0IG1pZGlBY2Nlc3M7XG5cbmNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgaWYgKCFuYXZpZ2F0b3IucmVxdWVzdE1JRElBY2Nlc3MpIHtcbiAgICAgICAgLy8gQWRkIHNvbWUgZnVuY3Rpb25hbGl0eSB0byBvbGRlciBicm93c2Vyc1xuICAgICAgICBwb2x5ZmlsbCgpO1xuXG4gICAgICAgIG5hdmlnYXRvci5yZXF1ZXN0TUlESUFjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIFNpbmdsZXRvbi1pc2gsIG5vIG5lZWQgdG8gY3JlYXRlIG11bHRpcGxlIGluc3RhbmNlcyBvZiBNSURJQWNjZXNzXG4gICAgICAgICAgICBpZiAobWlkaUFjY2VzcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbWlkaUFjY2VzcyA9IGNyZWF0ZU1JRElBY2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAvLyBBZGQgZ2xvYmFsIHZhcnMgdGhhdCBtaW1pYyBXZWJNSURJIEFQSSBuYXRpdmUgZ2xvYmFsc1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjb3BlID0gZ2V0U2NvcGUoKTtcbiAgICAgICAgICAgICAgICBzY29wZS5NSURJSW5wdXQgPSBJbnB1dDtcbiAgICAgICAgICAgICAgICBzY29wZS5NSURJT3V0cHV0ID0gT3V0cHV0O1xuICAgICAgICAgICAgICAgIHNjb3BlLk1JRElNZXNzYWdlRXZlbnQgPSBNSURJTWVzc2FnZUV2ZW50O1xuICAgICAgICAgICAgICAgIHNjb3BlLk1JRElDb25uZWN0aW9uRXZlbnQgPSBNSURJQ29ubmVjdGlvbkV2ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1pZGlBY2Nlc3M7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChnZXREZXZpY2UoKS5ub2RlanMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIG5hdmlnYXRvci5jbG9zZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBGb3IgTm9kZWpzIGFwcGxpY2F0aW9ucyB3ZSBuZWVkIHRvIGFkZCBhIG1ldGhvZCB0aGF0IGNsb3NlcyBhbGwgTUlESSBpbnB1dCBwb3J0cyxcbiAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2UgTm9kZWpzIHdpbGwgd2FpdCBmb3IgTUlESSBpbnB1dCBmb3JldmVyLlxuICAgICAgICAgICAgICAgIGNsb3NlQWxsTUlESUlucHV0cygpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmluaXQoKTtcbiIsIi8qXG4gIENyZWF0ZXMgYSBNSURJQWNjZXNzIGluc3RhbmNlOlxuICAtIENyZWF0ZXMgTUlESUlucHV0IGFuZCBNSURJT3V0cHV0IGluc3RhbmNlcyBmb3IgdGhlIGluaXRpYWxseSBjb25uZWN0ZWQgTUlESSBkZXZpY2VzLlxuICAtIEtlZXBzIHRyYWNrIG9mIG5ld2x5IGNvbm5lY3RlZCBkZXZpY2VzIGFuZCBjcmVhdGVzIHRoZSBuZWNlc3NhcnkgaW5zdGFuY2VzIG9mIE1JRElJbnB1dCBhbmQgTUlESU91dHB1dC5cbiAgLSBLZWVwcyB0cmFjayBvZiBkaXNjb25uZWN0ZWQgZGV2aWNlcyBhbmQgcmVtb3ZlcyB0aGVtIGZyb20gdGhlIGlucHV0cyBhbmQvb3Igb3V0cHV0cyBtYXAuXG4gIC0gQ3JlYXRlcyBhIHVuaXF1ZSBpZCBmb3IgZXZlcnkgZGV2aWNlIGFuZCBzdG9yZXMgdGhlc2UgaWRzIGJ5IHRoZSBuYW1lIG9mIHRoZSBkZXZpY2U6XG4gICAgc28gd2hlbiBhIGRldmljZSBnZXRzIGRpc2Nvbm5lY3RlZCBhbmQgcmVjb25uZWN0ZWQgYWdhaW4sIGl0IHdpbGwgc3RpbGwgaGF2ZSB0aGUgc2FtZSBpZC4gVGhpc1xuICAgIGlzIGluIGxpbmUgd2l0aCB0aGUgYmVoYXZpb3Igb2YgdGhlIG5hdGl2ZSBNSURJQWNjZXNzIG9iamVjdC5cblxuKi9cblxuaW1wb3J0IE1JRElJbnB1dCBmcm9tICcuL21pZGlfaW5wdXQnO1xuaW1wb3J0IE1JRElPdXRwdXQgZnJvbSAnLi9taWRpX291dHB1dCc7XG5pbXBvcnQgTUlESUNvbm5lY3Rpb25FdmVudCBmcm9tICcuL21pZGljb25uZWN0aW9uX2V2ZW50JztcbmltcG9ydCB7IGNyZWF0ZUphenpJbnN0YW5jZSwgZ2V0SmF6ekluc3RhbmNlIH0gZnJvbSAnLi4vdXRpbC9qYXp6X2luc3RhbmNlJztcbmltcG9ydCB7IGdldERldmljZSwgZ2VuZXJhdGVVVUlEIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCBTdG9yZSBmcm9tICcuLi91dGlsL3N0b3JlJztcblxubGV0IG1pZGlBY2Nlc3M7XG5sZXQgamF6ekluc3RhbmNlO1xuY29uc3QgbWlkaUlucHV0cyA9IG5ldyBTdG9yZSgpO1xuY29uc3QgbWlkaU91dHB1dHMgPSBuZXcgU3RvcmUoKTtcbmNvbnN0IG1pZGlJbnB1dElkcyA9IG5ldyBTdG9yZSgpO1xuY29uc3QgbWlkaU91dHB1dElkcyA9IG5ldyBTdG9yZSgpO1xuY29uc3QgbGlzdGVuZXJzID0gbmV3IFN0b3JlKCk7XG5cbmNsYXNzIE1JRElBY2Nlc3Mge1xuICAgIGNvbnN0cnVjdG9yKG1pZGlJbnB1dHMsIG1pZGlPdXRwdXRzKSB7XG4gICAgICAgIHRoaXMuc3lzZXhFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbnB1dHMgPSBtaWRpSW5wdXRzO1xuICAgICAgICB0aGlzLm91dHB1dHMgPSBtaWRpT3V0cHV0cztcbiAgICB9XG5cbiAgICBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICh0eXBlICE9PSAnc3RhdGVjaGFuZ2UnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3RlbmVycy5oYXMobGlzdGVuZXIpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgbGlzdGVuZXJzLmFkZChsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICh0eXBlICE9PSAnc3RhdGVjaGFuZ2UnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3RlbmVycy5oYXMobGlzdGVuZXIpID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMuZGVsZXRlKGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTUlESUFjY2VzcygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBtaWRpQWNjZXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmVzb2x2ZShtaWRpQWNjZXNzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChnZXREZXZpY2UoKS5icm93c2VyID09PSAnaWU5Jykge1xuICAgICAgICAgICAgcmVqZWN0KHsgbWVzc2FnZTogJ1dlYk1JRElBUElTaGltIHN1cHBvcnRzIEludGVybmV0IEV4cGxvcmVyIDEwIGFuZCBhYm92ZS4nIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY3JlYXRlSmF6ekluc3RhbmNlKChpbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnN0YW5jZSA9PT0gJ3VuZGVmaW5lZCcgfHwgaW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoeyBtZXNzYWdlOiAnTm8gYWNjZXNzIHRvIE1JREkgZGV2aWNlczogeW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIFdlYk1JREkgQVBJIGFuZCB0aGUgSmF6eiBwbHVnaW4gaXMgbm90IGluc3RhbGxlZC4nIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgamF6ekluc3RhbmNlID0gaW5zdGFuY2U7XG5cbiAgICAgICAgICAgIGNyZWF0ZU1JRElQb3J0cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dXBMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgICAgICBtaWRpQWNjZXNzID0gbmV3IE1JRElBY2Nlc3MobWlkaUlucHV0cywgbWlkaU91dHB1dHMpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUobWlkaUFjY2Vzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSkpO1xufVxuXG5cbi8vIGNyZWF0ZSBNSURJSW5wdXQgYW5kIE1JRElPdXRwdXQgaW5zdGFuY2VzIGZvciBhbGwgaW5pdGlhbGx5IGNvbm5lY3RlZCBNSURJIGRldmljZXNcbmZ1bmN0aW9uIGNyZWF0ZU1JRElQb3J0cyhjYWxsYmFjaykge1xuICAgIGNvbnN0IGlucHV0cyA9IGphenpJbnN0YW5jZS5NaWRpSW5MaXN0KCk7XG4gICAgY29uc3Qgb3V0cHV0cyA9IGphenpJbnN0YW5jZS5NaWRpT3V0TGlzdCgpO1xuICAgIGNvbnN0IG51bUlucHV0cyA9IGlucHV0cy5sZW5ndGg7XG4gICAgY29uc3QgbnVtT3V0cHV0cyA9IG91dHB1dHMubGVuZ3RoO1xuXG4gICAgbG9vcENyZWF0ZU1JRElQb3J0KDAsIG51bUlucHV0cywgJ2lucHV0JywgaW5wdXRzLCAoKSA9PiB7XG4gICAgICAgIGxvb3BDcmVhdGVNSURJUG9ydCgwLCBudW1PdXRwdXRzLCAnb3V0cHV0Jywgb3V0cHV0cywgY2FsbGJhY2spO1xuICAgIH0pO1xufVxuXG5cbmZ1bmN0aW9uIGxvb3BDcmVhdGVNSURJUG9ydChpbmRleCwgbWF4LCB0eXBlLCBsaXN0LCBjYWxsYmFjaykge1xuICAgIGlmIChpbmRleCA8IG1heCkge1xuICAgICAgICBjb25zdCBuYW1lID0gbGlzdFtpbmRleCsrXTtcbiAgICAgICAgY3JlYXRlTUlESVBvcnQodHlwZSwgbmFtZSwgKCkgPT4ge1xuICAgICAgICAgICAgbG9vcENyZWF0ZU1JRElQb3J0KGluZGV4LCBtYXgsIHR5cGUsIGxpc3QsIGNhbGxiYWNrKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gY3JlYXRlTUlESVBvcnQodHlwZSwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICBnZXRKYXp6SW5zdGFuY2UodHlwZSwgKGluc3RhbmNlKSA9PiB7XG4gICAgICAgIGxldCBwb3J0O1xuICAgICAgICBsZXQgaW5mbyA9IFtuYW1lLCAnJywgJyddO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2lucHV0Jykge1xuICAgICAgICAgICAgaWYgKGluc3RhbmNlLlN1cHBvcnQoJ01pZGlJbkluZm8nKSkge1xuICAgICAgICAgICAgICAgIGluZm8gPSBpbnN0YW5jZS5NaWRpSW5JbmZvKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9ydCA9IG5ldyBNSURJSW5wdXQoaW5mbywgaW5zdGFuY2UpO1xuICAgICAgICAgICAgbWlkaUlucHV0cy5zZXQocG9ydC5pZCwgcG9ydCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ291dHB1dCcpIHtcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5TdXBwb3J0KCdNaWRpT3V0SW5mbycpKSB7XG4gICAgICAgICAgICAgICAgaW5mbyA9IGluc3RhbmNlLk1pZGlPdXRJbmZvKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9ydCA9IG5ldyBNSURJT3V0cHV0KGluZm8sIGluc3RhbmNlKTtcbiAgICAgICAgICAgIG1pZGlPdXRwdXRzLnNldChwb3J0LmlkLCBwb3J0KTtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjayhwb3J0KTtcbiAgICB9KTtcbn1cblxuXG4vLyBsb29rdXAgZnVuY3Rpb246IEphenogZ2l2ZXMgdXMgdGhlIG5hbWUgb2YgdGhlIGNvbm5lY3RlZC9kaXNjb25uZWN0ZWQgTUlESSBkZXZpY2VzIGJ1dCB3ZSBoYXZlIHN0b3JlZCB0aGVtIGJ5IGlkXG5mdW5jdGlvbiBnZXRQb3J0QnlOYW1lKHBvcnRzLCBuYW1lKSB7XG4gICAgbGV0IHBvcnQ7XG4gICAgY29uc3QgdmFsdWVzID0gcG9ydHMudmFsdWVzKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgcG9ydCA9IHZhbHVlc1tpXTtcbiAgICAgICAgaWYgKHBvcnQubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBvcnQ7XG59XG5cblxuLy8ga2VlcCB0cmFjayBvZiBjb25uZWN0ZWQvZGlzY29ubmVjdGVkIE1JREkgZGV2aWNlc1xuZnVuY3Rpb24gc2V0dXBMaXN0ZW5lcnMoKSB7XG4gICAgamF6ekluc3RhbmNlLk9uRGlzY29ubmVjdE1pZGlJbigobmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBwb3J0ID0gZ2V0UG9ydEJ5TmFtZShtaWRpSW5wdXRzLCBuYW1lKTtcbiAgICAgICAgaWYgKHBvcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcG9ydC5zdGF0ZSA9ICdkaXNjb25uZWN0ZWQnO1xuICAgICAgICAgICAgcG9ydC5jbG9zZSgpO1xuICAgICAgICAgICAgcG9ydC5famF6ekluc3RhbmNlLmlucHV0SW5Vc2UgPSBmYWxzZTtcbiAgICAgICAgICAgIG1pZGlJbnB1dHMuZGVsZXRlKHBvcnQuaWQpO1xuICAgICAgICAgICAgZGlzcGF0Y2hFdmVudChwb3J0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgamF6ekluc3RhbmNlLk9uRGlzY29ubmVjdE1pZGlPdXQoKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgcG9ydCA9IGdldFBvcnRCeU5hbWUobWlkaU91dHB1dHMsIG5hbWUpO1xuICAgICAgICBpZiAocG9ydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwb3J0LnN0YXRlID0gJ2Rpc2Nvbm5lY3RlZCc7XG4gICAgICAgICAgICBwb3J0LmNsb3NlKCk7XG4gICAgICAgICAgICBwb3J0Ll9qYXp6SW5zdGFuY2Uub3V0cHV0SW5Vc2UgPSBmYWxzZTtcbiAgICAgICAgICAgIG1pZGlPdXRwdXRzLmRlbGV0ZShwb3J0LmlkKTtcbiAgICAgICAgICAgIGRpc3BhdGNoRXZlbnQocG9ydCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGphenpJbnN0YW5jZS5PbkNvbm5lY3RNaWRpSW4oKG5hbWUpID0+IHtcbiAgICAgICAgY3JlYXRlTUlESVBvcnQoJ2lucHV0JywgbmFtZSwgKHBvcnQpID0+IHtcbiAgICAgICAgICAgIGRpc3BhdGNoRXZlbnQocG9ydCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgamF6ekluc3RhbmNlLk9uQ29ubmVjdE1pZGlPdXQoKG5hbWUpID0+IHtcbiAgICAgICAgY3JlYXRlTUlESVBvcnQoJ291dHB1dCcsIG5hbWUsIChwb3J0KSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaEV2ZW50KHBvcnQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuXG4vLyB3aGVuIGEgZGV2aWNlIGdldHMgY29ubmVjdGVkL2Rpc2Nvbm5lY3RlZCBib3RoIHRoZSBwb3J0IGFuZCBNSURJQWNjZXNzIGRpc3BhdGNoIGEgTUlESUNvbm5lY3Rpb25FdmVudFxuLy8gdGhlcmVmb3Igd2UgY2FsbCB0aGUgcG9ydHMgZGlzcGF0Y2hFdmVudCBmdW5jdGlvbiBoZXJlIGFzIHdlbGxcbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEV2ZW50KHBvcnQpIHtcbiAgICBwb3J0LmRpc3BhdGNoRXZlbnQobmV3IE1JRElDb25uZWN0aW9uRXZlbnQocG9ydCwgcG9ydCkpO1xuXG4gICAgY29uc3QgZXZ0ID0gbmV3IE1JRElDb25uZWN0aW9uRXZlbnQobWlkaUFjY2VzcywgcG9ydCk7XG5cbiAgICBpZiAodHlwZW9mIG1pZGlBY2Nlc3Mub25zdGF0ZWNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBtaWRpQWNjZXNzLm9uc3RhdGVjaGFuZ2UoZXZ0KTtcbiAgICB9XG4gICAgbGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIoZXZ0KSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlQWxsTUlESUlucHV0cygpIHtcbiAgICBtaWRpSW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICAgIC8vIGlucHV0LmNsb3NlKCk7XG4gICAgICAgIGlucHV0Ll9qYXp6SW5zdGFuY2UuTWlkaUluQ2xvc2UoKTtcbiAgICB9KTtcbn1cblxuXG4vLyBjaGVjayBpZiB3ZSBoYXZlIGFscmVhZHkgY3JlYXRlZCBhIHVuaXF1ZSBpZCBmb3IgdGhpcyBkZXZpY2UsIGlmIHNvOiByZXVzZSBpdCwgaWYgbm90OiBjcmVhdGUgYSBuZXcgaWQgYW5kIHN0b3JlIGl0XG5leHBvcnQgZnVuY3Rpb24gZ2V0TUlESURldmljZUlkKG5hbWUsIHR5cGUpIHtcbiAgICBsZXQgaWQ7XG4gICAgaWYgKHR5cGUgPT09ICdpbnB1dCcpIHtcbiAgICAgICAgaWQgPSBtaWRpSW5wdXRJZHMuZ2V0KG5hbWUpO1xuICAgICAgICBpZiAoaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgIG1pZGlJbnB1dElkcy5zZXQobmFtZSwgaWQpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb3V0cHV0Jykge1xuICAgICAgICBpZCA9IG1pZGlPdXRwdXRJZHMuZ2V0KG5hbWUpO1xuICAgICAgICBpZiAoaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgIG1pZGlPdXRwdXRJZHMuc2V0KG5hbWUsIGlkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaWQ7XG59XG5cbiIsIi8qXG4gIE1JRElJbnB1dCBpcyBhIHdyYXBwZXIgYXJvdW5kIGFuIGlucHV0IG9mIGEgSmF6eiBpbnN0YW5jZVxuKi9cblxuaW1wb3J0IE1JRElNZXNzYWdlRXZlbnQgZnJvbSAnLi9taWRpbWVzc2FnZV9ldmVudCc7XG5pbXBvcnQgTUlESUNvbm5lY3Rpb25FdmVudCBmcm9tICcuL21pZGljb25uZWN0aW9uX2V2ZW50JztcbmltcG9ydCB7IGRpc3BhdGNoRXZlbnQsIGdldE1JRElEZXZpY2VJZCB9IGZyb20gJy4vbWlkaV9hY2Nlc3MnO1xuaW1wb3J0IHsgZ2V0RGV2aWNlIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCBTdG9yZSBmcm9tICcuLi91dGlsL3N0b3JlJztcblxubGV0IG1pZGlQcm9jO1xuY29uc3Qgbm9kZWpzID0gZ2V0RGV2aWNlKCkubm9kZWpzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNSURJSW5wdXQge1xuICAgIGNvbnN0cnVjdG9yKGluZm8sIGluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuaWQgPSBnZXRNSURJRGV2aWNlSWQoaW5mb1swXSwgJ2lucHV0Jyk7XG4gICAgICAgIHRoaXMubmFtZSA9IGluZm9bMF07XG4gICAgICAgIHRoaXMubWFudWZhY3R1cmVyID0gaW5mb1sxXTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gaW5mb1syXTtcbiAgICAgICAgdGhpcy50eXBlID0gJ2lucHV0JztcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdjb25uZWN0ZWQnO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSAncGVuZGluZyc7XG5cbiAgICAgICAgdGhpcy5vbnN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb25taWRpbWVzc2FnZSA9IG51bGw7XG4gICAgICAgIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byBpbXBsaWNpdGx5IG9wZW4gdGhlIGRldmljZSB3aGVuIGFuIG9ubWlkaW1lc3NhZ2UgaGFuZGxlciBnZXRzIGFkZGVkXG4gICAgICAgIC8vIHdlIGRlZmluZSBhIHNldHRlciB0aGF0IG9wZW5zIHRoZSBkZXZpY2UgaWYgdGhlIHNldCB2YWx1ZSBpcyBhIGZ1bmN0aW9uXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnb25taWRpbWVzc2FnZScsIHtcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29ubWlkaW1lc3NhZ2UgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IG5ldyBTdG9yZSgpLnNldCgnbWlkaW1lc3NhZ2UnLCBuZXcgU3RvcmUoKSkuc2V0KCdzdGF0ZWNoYW5nZScsIG5ldyBTdG9yZSgpKTtcbiAgICAgICAgdGhpcy5faW5Mb25nU3lzZXhNZXNzYWdlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3N5c2V4QnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoKTtcblxuICAgICAgICB0aGlzLl9qYXp6SW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgICAgdGhpcy5famF6ekluc3RhbmNlLmlucHV0SW5Vc2UgPSB0cnVlO1xuXG4gICAgICAgIC8vIG9uIExpbnV4IG9wZW5pbmcgYW5kIGNsb3NpbmcgSmF6eiBpbnN0YW5jZXMgY2F1c2VzIHRoZSBwbHVnaW4gdG8gY3Jhc2ggYSBsb3Qgc28gd2Ugb3BlblxuICAgICAgICAvLyB0aGUgZGV2aWNlIGhlcmUgYW5kIGRvbid0IGNsb3NlIGl0IHdoZW4gY2xvc2UoKSBpcyBjYWxsZWQsIHNlZSBiZWxvd1xuICAgICAgICBpZiAoZ2V0RGV2aWNlKCkucGxhdGZvcm0gPT09ICdsaW51eCcpIHtcbiAgICAgICAgICAgIHRoaXMuX2phenpJbnN0YW5jZS5NaWRpSW5PcGVuKHRoaXMubmFtZSwgbWlkaVByb2MuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycy5nZXQodHlwZSk7XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3RlbmVycy5oYXMobGlzdGVuZXIpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgbGlzdGVuZXJzLmFkZChsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycy5nZXQodHlwZSk7XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3RlbmVycy5oYXMobGlzdGVuZXIpID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMuZGVsZXRlKGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc3BhdGNoRXZlbnQoZXZ0KSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycy5nZXQoZXZ0LnR5cGUpO1xuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICAgICAgICAgIGxpc3RlbmVyKGV2dCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChldnQudHlwZSA9PT0gJ21pZGltZXNzYWdlJykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX29ubWlkaW1lc3NhZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbm1pZGltZXNzYWdlKGV2dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZ0LnR5cGUgPT09ICdzdGF0ZWNoYW5nZScpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9uc3RhdGVjaGFuZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uc3RhdGVjaGFuZ2UoZXZ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW4oKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb24gPT09ICdvcGVuJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnZXREZXZpY2UoKS5wbGF0Zm9ybSAhPT0gJ2xpbnV4Jykge1xuICAgICAgICAgICAgdGhpcy5famF6ekluc3RhbmNlLk1pZGlJbk9wZW4odGhpcy5uYW1lLCBtaWRpUHJvYy5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSAnb3Blbic7XG4gICAgICAgIGRpc3BhdGNoRXZlbnQodGhpcyk7IC8vIGRpc3BhdGNoIE1JRElDb25uZWN0aW9uRXZlbnQgdmlhIE1JRElBY2Nlc3NcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbiA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2V0RGV2aWNlKCkucGxhdGZvcm0gIT09ICdsaW51eCcpIHtcbiAgICAgICAgICAgIHRoaXMuX2phenpJbnN0YW5jZS5NaWRpSW5DbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9ICdjbG9zZWQnO1xuICAgICAgICBkaXNwYXRjaEV2ZW50KHRoaXMpOyAvLyBkaXNwYXRjaCBNSURJQ29ubmVjdGlvbkV2ZW50IHZpYSBNSURJQWNjZXNzXG4gICAgICAgIHRoaXMuX29ubWlkaW1lc3NhZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLm9uc3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnMuZ2V0KCdtaWRpbWVzc2FnZScpLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuX2xpc3RlbmVycy5nZXQoJ3N0YXRlY2hhbmdlJykuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBfYXBwZW5kVG9TeXNleEJ1ZmZlcihkYXRhKSB7XG4gICAgICAgIGNvbnN0IG9sZExlbmd0aCA9IHRoaXMuX3N5c2V4QnVmZmVyLmxlbmd0aDtcbiAgICAgICAgY29uc3QgdG1wQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkob2xkTGVuZ3RoICsgZGF0YS5sZW5ndGgpO1xuICAgICAgICB0bXBCdWZmZXIuc2V0KHRoaXMuX3N5c2V4QnVmZmVyKTtcbiAgICAgICAgdG1wQnVmZmVyLnNldChkYXRhLCBvbGRMZW5ndGgpO1xuICAgICAgICB0aGlzLl9zeXNleEJ1ZmZlciA9IHRtcEJ1ZmZlcjtcbiAgICB9XG5cbiAgICBfYnVmZmVyTG9uZ1N5c2V4KGRhdGEsIGluaXRpYWxPZmZzZXQpIHtcbiAgICAgICAgbGV0IGogPSBpbml0aWFsT2Zmc2V0O1xuICAgICAgICB3aGlsZSAoaiA8IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVtqXSA9PSAweEY3KSB7XG4gICAgICAgICAgICAgICAgLy8gZW5kIG9mIHN5c2V4IVxuICAgICAgICAgICAgICAgIGogKz0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcHBlbmRUb1N5c2V4QnVmZmVyKGRhdGEuc2xpY2UoaW5pdGlhbE9mZnNldCwgaikpO1xuICAgICAgICAgICAgICAgIHJldHVybiBqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaiArPSAxO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRpZG4ndCByZWFjaCB0aGUgZW5kOyBqdXN0IHRhY2sgaXQgb24uXG4gICAgICAgIHRoaXMuX2FwcGVuZFRvU3lzZXhCdWZmZXIoZGF0YS5zbGljZShpbml0aWFsT2Zmc2V0LCBqKSk7XG4gICAgICAgIHRoaXMuX2luTG9uZ1N5c2V4TWVzc2FnZSA9IHRydWU7XG4gICAgICAgIHJldHVybiBqO1xuICAgIH1cbn1cblxuXG5taWRpUHJvYyA9IGZ1bmN0aW9uICh0aW1lc3RhbXAsIGRhdGEpIHtcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBsZXQgaTtcbiAgICBsZXQgaXNTeXNleE1lc3NhZ2UgPSBmYWxzZTtcblxuICAgIC8vIEphenogc29tZXRpbWVzIHBhc3NlcyB1cyBtdWx0aXBsZSBtZXNzYWdlcyBhdCBvbmNlLCBzbyB3ZSBuZWVkIHRvIHBhcnNlIHRoZW0gb3V0IGFuZCBwYXNzIHRoZW0gb25lIGF0IGEgdGltZS5cblxuICAgIGZvciAoaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSBsZW5ndGgpIHtcbiAgICAgICAgbGV0IGlzVmFsaWRNZXNzYWdlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuX2luTG9uZ1N5c2V4TWVzc2FnZSkge1xuICAgICAgICAgICAgaSA9IHRoaXMuX2J1ZmZlckxvbmdTeXNleChkYXRhLCBpKTtcbiAgICAgICAgICAgIGlmIChkYXRhW2kgLSAxXSAhPSAweGY3KSB7XG4gICAgICAgICAgICAgICAgLy8gcmFuIG9mZiB0aGUgZW5kIHdpdGhvdXQgaGl0dGluZyB0aGUgZW5kIG9mIHRoZSBzeXNleCBtZXNzYWdlXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXNTeXNleE1lc3NhZ2UgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNTeXNleE1lc3NhZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YVtpXSAmIDB4RjApIHtcbiAgICAgICAgICAgIGNhc2UgMHgwMDogLy8gQ2hldyB1cCBzcHVyaW91cyAweDAwIGJ5dGVzLiAgRml4ZXMgYSBXaW5kb3dzIHByb2JsZW0uXG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gMTtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkTWVzc2FnZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDB4ODA6IC8vIG5vdGUgb2ZmXG4gICAgICAgICAgICBjYXNlIDB4OTA6IC8vIG5vdGUgb25cbiAgICAgICAgICAgIGNhc2UgMHhBMDogLy8gcG9seXBob25pYyBhZnRlcnRvdWNoXG4gICAgICAgICAgICBjYXNlIDB4QjA6IC8vIGNvbnRyb2wgY2hhbmdlXG4gICAgICAgICAgICBjYXNlIDB4RTA6IC8vIGNoYW5uZWwgbW9kZVxuICAgICAgICAgICAgICAgIGxlbmd0aCA9IDM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMHhDMDogLy8gcHJvZ3JhbSBjaGFuZ2VcbiAgICAgICAgICAgIGNhc2UgMHhEMDogLy8gY2hhbm5lbCBhZnRlcnRvdWNoXG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAweEYwOlxuICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YVtpXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMHhmMDogLy8gbGV0aWFibGUtbGVuZ3RoIHN5c2V4LlxuICAgICAgICAgICAgICAgICAgICBpID0gdGhpcy5fYnVmZmVyTG9uZ1N5c2V4KGRhdGEsIGkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtpIC0gMV0gIT0gMHhmNykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmFuIG9mZiB0aGUgZW5kIHdpdGhvdXQgaGl0dGluZyB0aGUgZW5kIG9mIHRoZSBzeXNleCBtZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaXNTeXNleE1lc3NhZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgMHhGMTogLy8gTVRDIHF1YXJ0ZXIgZnJhbWVcbiAgICAgICAgICAgICAgICBjYXNlIDB4RjM6IC8vIHNvbmcgc2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAweEYyOiAvLyBzb25nIHBvc2l0aW9uIHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gMztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1ZhbGlkTWVzc2FnZSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBldnQgPSB7fTtcbiAgICAgICAgZXZ0LnJlY2VpdmVkVGltZSA9IHBhcnNlRmxvYXQodGltZXN0YW1wLnRvU3RyaW5nKCkpICsgdGhpcy5famF6ekluc3RhbmNlLl9wZXJmVGltZVplcm87XG5cbiAgICAgICAgaWYgKGlzU3lzZXhNZXNzYWdlIHx8IHRoaXMuX2luTG9uZ1N5c2V4TWVzc2FnZSkge1xuICAgICAgICAgICAgZXZ0LmRhdGEgPSBuZXcgVWludDhBcnJheSh0aGlzLl9zeXNleEJ1ZmZlcik7XG4gICAgICAgICAgICB0aGlzLl9zeXNleEJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KDApO1xuICAgICAgICAgICAgdGhpcy5faW5Mb25nU3lzZXhNZXNzYWdlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldnQuZGF0YSA9IG5ldyBVaW50OEFycmF5KGRhdGEuc2xpY2UoaSwgbGVuZ3RoICsgaSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGVqcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX29ubWlkaW1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbm1pZGltZXNzYWdlKGV2dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBlID0gbmV3IE1JRElNZXNzYWdlRXZlbnQodGhpcywgZXZ0LmRhdGEsIGV2dC5yZWNlaXZlZFRpbWUpO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGUpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qXG4gIE1JRElPdXRwdXQgaXMgYSB3cmFwcGVyIGFyb3VuZCBhbiBvdXRwdXQgb2YgYSBKYXp6IGluc3RhbmNlXG4qL1xuaW1wb3J0IHsgZ2V0RGV2aWNlIH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCBTdG9yZSBmcm9tICcuLi91dGlsL3N0b3JlJztcbmltcG9ydCB7IGRpc3BhdGNoRXZlbnQsIGdldE1JRElEZXZpY2VJZCB9IGZyb20gJy4vbWlkaV9hY2Nlc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNSURJT3V0cHV0IHtcbiAgICBjb25zdHJ1Y3RvcihpbmZvLCBpbnN0YW5jZSkge1xuICAgICAgICB0aGlzLmlkID0gZ2V0TUlESURldmljZUlkKGluZm9bMF0sICdvdXRwdXQnKTtcbiAgICAgICAgdGhpcy5uYW1lID0gaW5mb1swXTtcbiAgICAgICAgdGhpcy5tYW51ZmFjdHVyZXIgPSBpbmZvWzFdO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSBpbmZvWzJdO1xuICAgICAgICB0aGlzLnR5cGUgPSAnb3V0cHV0JztcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdjb25uZWN0ZWQnO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSAncGVuZGluZyc7XG4gICAgICAgIHRoaXMub25taWRpbWVzc2FnZSA9IG51bGw7XG4gICAgICAgIHRoaXMub25zdGF0ZWNoYW5nZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gbmV3IFN0b3JlKCk7XG4gICAgICAgIHRoaXMuX2luTG9uZ1N5c2V4TWVzc2FnZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zeXNleEJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KCk7XG5cbiAgICAgICAgdGhpcy5famF6ekluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICAgIHRoaXMuX2phenpJbnN0YW5jZS5vdXRwdXRJblVzZSA9IHRydWU7XG4gICAgICAgIGlmIChnZXREZXZpY2UoKS5wbGF0Zm9ybSA9PT0gJ2xpbnV4Jykge1xuICAgICAgICAgICAgdGhpcy5famF6ekluc3RhbmNlLk1pZGlPdXRPcGVuKHRoaXMubmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuKCkge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uID09PSAnb3BlbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2V0RGV2aWNlKCkucGxhdGZvcm0gIT09ICdsaW51eCcpIHtcbiAgICAgICAgICAgIHRoaXMuX2phenpJbnN0YW5jZS5NaWRpT3V0T3Blbih0aGlzLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9ICdvcGVuJztcbiAgICAgICAgZGlzcGF0Y2hFdmVudCh0aGlzKTsgLy8gZGlzcGF0Y2ggTUlESUNvbm5lY3Rpb25FdmVudCB2aWEgTUlESUFjY2Vzc1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uID09PSAnY2xvc2VkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnZXREZXZpY2UoKS5wbGF0Zm9ybSAhPT0gJ2xpbnV4Jykge1xuICAgICAgICAgICAgdGhpcy5famF6ekluc3RhbmNlLk1pZGlPdXRDbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9ICdjbG9zZWQnO1xuICAgICAgICBkaXNwYXRjaEV2ZW50KHRoaXMpOyAvLyBkaXNwYXRjaCBNSURJQ29ubmVjdGlvbkV2ZW50IHZpYSBNSURJQWNjZXNzXG4gICAgICAgIHRoaXMub25zdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xpc3RlbmVycy5jbGVhcigpO1xuICAgIH1cblxuICAgIHNlbmQoZGF0YSwgdGltZXN0YW1wKSB7XG4gICAgICAgIGxldCBkZWxheUJlZm9yZVNlbmQgPSAwO1xuXG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRpbWVzdGFtcCkge1xuICAgICAgICAgICAgZGVsYXlCZWZvcmVTZW5kID0gTWF0aC5mbG9vcih0aW1lc3RhbXAgLSBwZXJmb3JtYW5jZS5ub3coKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGltZXN0YW1wICYmIChkZWxheUJlZm9yZVNlbmQgPiAxKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5famF6ekluc3RhbmNlLk1pZGlPdXRMb25nKGRhdGEpO1xuICAgICAgICAgICAgfSwgZGVsYXlCZWZvcmVTZW5kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2phenpJbnN0YW5jZS5NaWRpT3V0TG9uZyhkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgLy8gdG8gYmUgaW1wbGVtZW50ZWRcbiAgICB9XG5cbiAgICBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICh0eXBlICE9PSAnc3RhdGVjaGFuZ2UnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbGlzdGVuZXJzLmhhcyhsaXN0ZW5lcikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMuYWRkKGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKHR5cGUgIT09ICdzdGF0ZWNoYW5nZScpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5lcnMuaGFzKGxpc3RlbmVyKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLmRlbGV0ZShsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwYXRjaEV2ZW50KGV2dCkge1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICAgICAgICAgIGxpc3RlbmVyKGV2dCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLm9uc3RhdGVjaGFuZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMub25zdGF0ZWNoYW5nZShldnQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTUlESUNvbm5lY3Rpb25FdmVudCB7XG4gICAgY29uc3RydWN0b3IobWlkaUFjY2VzcywgcG9ydCkge1xuICAgICAgICB0aGlzLmJ1YmJsZXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYW5jZWxCdWJibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYW5jZWxhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY3VycmVudFRhcmdldCA9IG1pZGlBY2Nlc3M7XG4gICAgICAgIHRoaXMuZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV2ZW50UGhhc2UgPSAwO1xuICAgICAgICB0aGlzLnBhdGggPSBbXTtcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydDtcbiAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc3JjRWxlbWVudCA9IG1pZGlBY2Nlc3M7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gbWlkaUFjY2VzcztcbiAgICAgICAgdGhpcy50aW1lU3RhbXAgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLnR5cGUgPSAnc3RhdGVjaGFuZ2UnO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1JRElNZXNzYWdlRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHBvcnQsIGRhdGEsIHJlY2VpdmVkVGltZSkge1xuICAgICAgICB0aGlzLmJ1YmJsZXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYW5jZWxCdWJibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYW5jZWxhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY3VycmVudFRhcmdldCA9IHBvcnQ7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV2ZW50UGhhc2UgPSAwO1xuICAgICAgICB0aGlzLnBhdGggPSBbXTtcbiAgICAgICAgdGhpcy5yZWNlaXZlZFRpbWUgPSByZWNlaXZlZFRpbWU7XG4gICAgICAgIHRoaXMucmV0dXJuVmFsdWUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNyY0VsZW1lbnQgPSBwb3J0O1xuICAgICAgICB0aGlzLnRhcmdldCA9IHBvcnQ7XG4gICAgICAgIHRoaXMudGltZVN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy50eXBlID0gJ21pZGltZXNzYWdlJztcbiAgICB9XG59XG4iLCIvKiBlc2xpbnQgbm8tdW5kZXJzY29yZS1kYW5nbGU6IDAgKi9cblxuLypcbiAgQ3JlYXRlcyBpbnN0YW5jZXMgb2YgdGhlIEphenogcGx1Z2luIGlmIG5lY2Vzc2FyeS4gSW5pdGlhbGx5IHRoZSBNSURJQWNjZXNzIGNyZWF0ZXMgb25lIG1haW4gSmF6eiBpbnN0YW5jZSB0aGF0IGlzIHVzZWRcbiAgdG8gcXVlcnkgYWxsIGluaXRpYWxseSBjb25uZWN0ZWQgZGV2aWNlcywgYW5kIHRvIHRyYWNrIHRoZSBkZXZpY2VzIHRoYXQgYXJlIGJlaW5nIGNvbm5lY3RlZCBvciBkaXNjb25uZWN0ZWQgYXQgcnVudGltZS5cblxuICBGb3IgZXZlcnkgTUlESUlucHV0IGFuZCBNSURJT3V0cHV0IHRoYXQgaXMgY3JlYXRlZCwgTUlESUFjY2VzcyBxdWVyaWVzIHRoZSBnZXRKYXp6SW5zdGFuY2UoKSBtZXRob2QgZm9yIGEgSmF6eiBpbnN0YW5jZVxuICB0aGF0IHN0aWxsIGhhdmUgYW4gYXZhaWxhYmxlIGlucHV0IG9yIG91dHB1dC4gQmVjYXVzZSBKYXp6IG9ubHkgYWxsb3dzIG9uZSBpbnB1dCBhbmQgb25lIG91dHB1dCBwZXIgaW5zdGFuY2UsIHdlXG4gIG5lZWQgdG8gY3JlYXRlIG5ldyBpbnN0YW5jZXMgaWYgbW9yZSB0aGFuIG9uZSBNSURJIGlucHV0IG9yIG91dHB1dCBkZXZpY2UgZ2V0cyBjb25uZWN0ZWQuXG5cbiAgTm90ZSB0aGF0IGFuIGV4aXN0aW5nIEphenogaW5zdGFuY2UgZG9lc24ndCBnZXQgZGVsZXRlZCB3aGVuIGJvdGggaXRzIGlucHV0IGFuZCBvdXRwdXQgZGV2aWNlIGFyZSBkaXNjb25uZWN0ZWQ7IGluc3RlYWQgaXRcbiAgd2lsbCBiZSByZXVzZWQgaWYgYSBuZXcgZGV2aWNlIGdldHMgY29ubmVjdGVkLlxuKi9cblxuaW1wb3J0IFN0b3JlIGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IHsgZ2V0RGV2aWNlIH0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgamF6elBsdWdpbkluaXRUaW1lID0gZ2V0RGV2aWNlKCkuYnJvd3NlciA9PT0gJ2ZpcmVmb3gnID8gMjAwIDogMTAwOyAvLyAyMDAgbXMgdGltZW91dCBmb3IgRmlyZWZveCB2LjU1XG5cbmxldCBqYXp6SW5zdGFuY2VOdW1iZXIgPSAwO1xuY29uc3QgamF6ekluc3RhbmNlcyA9IG5ldyBTdG9yZSgpO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVKYXp6SW5zdGFuY2UoY2FsbGJhY2spIHtcbiAgICBjb25zdCBpZCA9IGBqYXp6XyR7amF6ekluc3RhbmNlTnVtYmVyfV8ke0RhdGUubm93KCl9YDtcbiAgICBqYXp6SW5zdGFuY2VOdW1iZXIgKz0gMTtcbiAgICBsZXQgb2JqUmVmO1xuICAgIGxldCBhY3RpdmVYO1xuXG4gICAgaWYgKGdldERldmljZSgpLm5vZGVqcyA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBqYXp6TWlkaSBpcyBhZGRlZCB0byB0aGUgZ2xvYmFsIHZhcmlhYmxlIG5hdmlnYXRvciBpbiB0aGUgbm9kZSBlbnZpcm9ubWVudFxuICAgICAgICBvYmpSZWYgPSBuZXcgbmF2aWdhdG9yLmphenpNaWRpLk1JREkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvKlxuICAgICAgICAgICAgZ2VuZXJhdGUgdGhpcyBodG1sOlxuXG4gICAgICAgICAgICA8b2JqZWN0IGlkPVwiSmF6ejFcIiBjbGFzc2lkPVwiQ0xTSUQ6MUFDRTE2MTgtMUM3RC00NTYxLUFFRTEtMzQ4NDJBQTg1RTkwXCIgY2xhc3M9XCJoaWRkZW5cIj5cbiAgICAgICAgICAgICAgICA8b2JqZWN0IGlkPVwiSmF6ejJcIiB0eXBlPVwiYXVkaW8veC1qYXp6XCIgY2xhc3M9XCJoaWRkZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9XCJ2aXNpYmlsaXR5OnZpc2libGU7XCI+VGhpcyBwYWdlIHJlcXVpcmVzIDxhIGhyZWY9aHR0cDovL2phenotc29mdC5uZXQ+SmF6ei1QbHVnaW48L2E+IC4uLjwvcD5cbiAgICAgICAgICAgICAgICA8L29iamVjdD5cbiAgICAgICAgICAgIDwvb2JqZWN0PlxuICAgICAgICAqL1xuXG4gICAgICAgIGFjdGl2ZVggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcbiAgICAgICAgYWN0aXZlWC5pZCA9IGAke2lkfWllYDtcbiAgICAgICAgYWN0aXZlWC5jbGFzc2lkID0gJ0NMU0lEOjFBQ0UxNjE4LTFDN0QtNDU2MS1BRUUxLTM0ODQyQUE4NUU5MCc7XG5cbiAgICAgICAgb2JqUmVmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2JqZWN0Jyk7XG4gICAgICAgIG9ialJlZi5pZCA9IGlkO1xuICAgICAgICBvYmpSZWYudHlwZSA9ICdhdWRpby94LWphenonO1xuXG4gICAgICAgIGFjdGl2ZVguYXBwZW5kQ2hpbGQob2JqUmVmKTtcblxuICAgICAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBwLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdUaGlzIHBhZ2UgcmVxdWlyZXMgdGhlICcpKTtcblxuICAgICAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBhLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdKYXp6IHBsdWdpbicpKTtcbiAgICAgICAgYS5ocmVmID0gJ2h0dHA6Ly9qYXp6LXNvZnQubmV0Lyc7XG5cbiAgICAgICAgcC5hcHBlbmRDaGlsZChhKTtcbiAgICAgICAgcC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnLicpKTtcblxuICAgICAgICBvYmpSZWYuYXBwZW5kQ2hpbGQocCk7XG5cbiAgICAgICAgbGV0IGluc2VydGlvblBvaW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ01JRElQbHVnaW4nKTtcbiAgICAgICAgaWYgKCFpbnNlcnRpb25Qb2ludCkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGhpZGRlbiBlbGVtZW50XG4gICAgICAgICAgICBpbnNlcnRpb25Qb2ludCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaW5zZXJ0aW9uUG9pbnQuaWQgPSAnTUlESVBsdWdpbic7XG4gICAgICAgICAgICBpbnNlcnRpb25Qb2ludC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgICBpbnNlcnRpb25Qb2ludC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICBpbnNlcnRpb25Qb2ludC5zdHlsZS5sZWZ0ID0gJy05OTk5cHgnO1xuICAgICAgICAgICAgaW5zZXJ0aW9uUG9pbnQuc3R5bGUudG9wID0gJy05OTk5cHgnO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbnNlcnRpb25Qb2ludCk7XG4gICAgICAgIH1cbiAgICAgICAgaW5zZXJ0aW9uUG9pbnQuYXBwZW5kQ2hpbGQoYWN0aXZlWCk7XG4gICAgfVxuXG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbGV0IGluc3RhbmNlID0gbnVsbDtcbiAgICAgICAgaWYgKG9ialJlZi5pc0phenogPT09IHRydWUpIHtcbiAgICAgICAgICAgIGluc3RhbmNlID0gb2JqUmVmO1xuICAgICAgICB9IGVsc2UgaWYgKGFjdGl2ZVguaXNKYXp6ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpbnN0YW5jZSA9IGFjdGl2ZVg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluc3RhbmNlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5fcGVyZlRpbWVaZXJvID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgICAgICBqYXp6SW5zdGFuY2VzLnNldChqYXp6SW5zdGFuY2VOdW1iZXIsIGluc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjayhpbnN0YW5jZSk7XG4gICAgfSwgamF6elBsdWdpbkluaXRUaW1lKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SmF6ekluc3RhbmNlKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgY29uc3Qga2V5ID0gdHlwZSA9PT0gJ2lucHV0JyA/ICdpbnB1dEluVXNlJyA6ICdvdXRwdXRJblVzZSc7XG4gICAgbGV0IGluc3RhbmNlID0gbnVsbDtcblxuICAgIGNvbnN0IHZhbHVlcyA9IGphenpJbnN0YW5jZXMudmFsdWVzKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaW5zdCA9IHZhbHVlc1tpXTtcbiAgICAgICAgaWYgKGluc3Rba2V5XSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgaW5zdGFuY2UgPSBpbnN0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgY3JlYXRlSmF6ekluc3RhbmNlKGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayhpbnN0YW5jZSk7XG4gICAgfVxufVxuIiwiLy8gZXM1IGltcGxlbWVudGF0aW9uIG9mIGJvdGggTWFwIGFuZCBTZXRcblxubGV0IGlkSW5kZXggPSAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RvcmUgPSB7fTtcbiAgICAgICAgdGhpcy5rZXlzID0gW107XG4gICAgfVxuICAgIGFkZChvYmopIHtcbiAgICAgICAgY29uc3QgaWQgPSBgJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX0ke2lkSW5kZXh9YDtcbiAgICAgICAgaWRJbmRleCArPSAxO1xuICAgICAgICB0aGlzLmtleXMucHVzaChpZCk7XG4gICAgICAgIHRoaXMuc3RvcmVbaWRdID0gb2JqO1xuICAgIH1cbiAgICBzZXQoaWQsIG9iaikge1xuICAgICAgICB0aGlzLmtleXMucHVzaChpZCk7XG4gICAgICAgIHRoaXMuc3RvcmVbaWRdID0gb2JqO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0KGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlW2lkXTtcbiAgICB9XG4gICAgaGFzKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleXMuaW5kZXhPZihpZCkgIT09IC0xO1xuICAgIH1cbiAgICBkZWxldGUoaWQpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuc3RvcmVbaWRdO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMua2V5cy5pbmRleE9mKGlkKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMua2V5cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gW107XG4gICAgICAgIGNvbnN0IGwgPSB0aGlzLmtleXMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuc3RvcmVbdGhpcy5rZXlzW2ldXTtcbiAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xuICAgIH1cbiAgICBmb3JFYWNoKGNiKSB7XG4gICAgICAgIGNvbnN0IGwgPSB0aGlzLmtleXMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuc3RvcmVbdGhpcy5rZXlzW2ldXTtcbiAgICAgICAgICAgIGNiKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmtleXMgPSBbXTtcbiAgICAgICAgdGhpcy5zdG9yZSA9IHt9O1xuICAgIH1cbn1cbiIsImxldCBTY29wZTtcbmxldCBkZXZpY2UgPSBudWxsO1xuXG4vLyBjaGVjayBpZiB3ZSBhcmUgaW4gYSBicm93c2VyIG9yIGluIE5vZGVqc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNjb3BlKCkge1xuICAgIGlmICh0eXBlb2YgU2NvcGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBTY29wZTtcbiAgICB9XG4gICAgU2NvcGUgPSBudWxsO1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBTY29wZSA9IHdpbmRvdztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIFNjb3BlID0gZ2xvYmFsO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZygnc2NvcGUnLCBzY29wZSk7XG4gICAgcmV0dXJuIFNjb3BlO1xufVxuXG5cbi8vIGNoZWNrIG9uIHdoYXQgdHlwZSBvZiBkZXZpY2Ugd2UgYXJlIHJ1bm5pbmcsIG5vdGUgdGhhdCBpbiB0aGlzIGNvbnRleHRcbi8vIGEgZGV2aWNlIGlzIGEgY29tcHV0ZXIgbm90IGEgTUlESSBkZXZpY2VcbmV4cG9ydCBmdW5jdGlvbiBnZXREZXZpY2UoKSB7XG4gICAgY29uc3Qgc2NvcGUgPSBnZXRTY29wZSgpO1xuICAgIGlmIChkZXZpY2UgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGRldmljZTtcbiAgICB9XG5cbiAgICBsZXQgcGxhdGZvcm0gPSAndW5kZXRlY3RlZCc7XG4gICAgbGV0IGJyb3dzZXIgPSAndW5kZXRlY3RlZCc7XG5cbiAgICBpZiAoc2NvcGUubmF2aWdhdG9yLm5vZGUgPT09IHRydWUpIHtcbiAgICAgICAgZGV2aWNlID0ge1xuICAgICAgICAgICAgcGxhdGZvcm06IHByb2Nlc3MucGxhdGZvcm0sXG4gICAgICAgICAgICBub2RlanM6IHRydWUsXG4gICAgICAgICAgICBtb2JpbGU6IHBsYXRmb3JtID09PSAnaW9zJyB8fCBwbGF0Zm9ybSA9PT0gJ2FuZHJvaWQnLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZGV2aWNlO1xuICAgIH1cblxuICAgIGNvbnN0IHVhID0gc2NvcGUubmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICAgIGlmICh1YS5tYXRjaCgvKGlQYWR8aVBob25lfGlQb2QpL2cpKSB7XG4gICAgICAgIHBsYXRmb3JtID0gJ2lvcyc7XG4gICAgfSBlbHNlIGlmICh1YS5pbmRleE9mKCdBbmRyb2lkJykgIT09IC0xKSB7XG4gICAgICAgIHBsYXRmb3JtID0gJ2FuZHJvaWQnO1xuICAgIH0gZWxzZSBpZiAodWEuaW5kZXhPZignTGludXgnKSAhPT0gLTEpIHtcbiAgICAgICAgcGxhdGZvcm0gPSAnbGludXgnO1xuICAgIH0gZWxzZSBpZiAodWEuaW5kZXhPZignTWFjaW50b3NoJykgIT09IC0xKSB7XG4gICAgICAgIHBsYXRmb3JtID0gJ29zeCc7XG4gICAgfSBlbHNlIGlmICh1YS5pbmRleE9mKCdXaW5kb3dzJykgIT09IC0xKSB7XG4gICAgICAgIHBsYXRmb3JtID0gJ3dpbmRvd3MnO1xuICAgIH1cblxuICAgIGlmICh1YS5pbmRleE9mKCdDaHJvbWUnKSAhPT0gLTEpIHtcbiAgICAgICAgLy8gY2hyb21lLCBjaHJvbWl1bSBhbmQgY2FuYXJ5XG4gICAgICAgIGJyb3dzZXIgPSAnY2hyb21lJztcblxuICAgICAgICBpZiAodWEuaW5kZXhPZignT1BSJykgIT09IC0xKSB7XG4gICAgICAgICAgICBicm93c2VyID0gJ29wZXJhJztcbiAgICAgICAgfSBlbHNlIGlmICh1YS5pbmRleE9mKCdDaHJvbWl1bScpICE9PSAtMSkge1xuICAgICAgICAgICAgYnJvd3NlciA9ICdjaHJvbWl1bSc7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHVhLmluZGV4T2YoJ1NhZmFyaScpICE9PSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ3NhZmFyaSc7XG4gICAgfSBlbHNlIGlmICh1YS5pbmRleE9mKCdGaXJlZm94JykgIT09IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnZmlyZWZveCc7XG4gICAgfSBlbHNlIGlmICh1YS5pbmRleE9mKCdUcmlkZW50JykgIT09IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnaWUnO1xuICAgICAgICBpZiAodWEuaW5kZXhPZignTVNJRSA5JykgIT09IC0xKSB7XG4gICAgICAgICAgICBicm93c2VyID0gJ2llOSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGxhdGZvcm0gPT09ICdpb3MnKSB7XG4gICAgICAgIGlmICh1YS5pbmRleE9mKCdDcmlPUycpICE9PSAtMSkge1xuICAgICAgICAgICAgYnJvd3NlciA9ICdjaHJvbWUnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGV2aWNlID0ge1xuICAgICAgICBwbGF0Zm9ybSxcbiAgICAgICAgYnJvd3NlcixcbiAgICAgICAgbW9iaWxlOiBwbGF0Zm9ybSA9PT0gJ2lvcycgfHwgcGxhdGZvcm0gPT09ICdhbmRyb2lkJyxcbiAgICAgICAgbm9kZWpzOiBmYWxzZSxcbiAgICB9O1xuICAgIHJldHVybiBkZXZpY2U7XG59XG5cblxuLy8gcG9seWZpbGwgZm9yIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuY29uc3QgcG9seWZpbGxQZXJmb3JtYW5jZSA9ICgpID0+IHtcbiAgICBjb25zdCBzY29wZSA9IGdldFNjb3BlKCk7XG4gICAgaWYgKHR5cGVvZiBzY29wZS5wZXJmb3JtYW5jZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc2NvcGUucGVyZm9ybWFuY2UgPSB7fTtcbiAgICB9XG4gICAgRGF0ZS5ub3cgPSBEYXRlLm5vdyB8fCAoKCkgPT4gbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuXG4gICAgaWYgKHR5cGVvZiBzY29wZS5wZXJmb3JtYW5jZS5ub3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGxldCBub3dPZmZzZXQgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2Ygc2NvcGUucGVyZm9ybWFuY2UudGltaW5nICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgdHlwZW9mIHNjb3BlLnBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnQgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICkge1xuICAgICAgICAgICAgbm93T2Zmc2V0ID0gc2NvcGUucGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydDtcbiAgICAgICAgfVxuICAgICAgICBzY29wZS5wZXJmb3JtYW5jZS5ub3cgPSBmdW5jdGlvbiBub3coKSB7XG4gICAgICAgICAgICByZXR1cm4gRGF0ZS5ub3coKSAtIG5vd09mZnNldDtcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8vIGdlbmVyYXRlcyBVVUlEIGZvciBNSURJIGRldmljZXNcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQoKSB7XG4gICAgbGV0IGQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBsZXQgdXVpZCA9IG5ldyBBcnJheSg2NCkuam9pbigneCcpOy8vICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnO1xuICAgIHV1aWQgPSB1dWlkLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcbiAgICAgICAgY29uc3QgciA9IChkICsgTWF0aC5yYW5kb20oKSAqIDE2KSAlIDE2IHwgMDtcbiAgICAgICAgZCA9IE1hdGguZmxvb3IoZCAvIDE2KTtcbiAgICAgICAgcmV0dXJuIChjID09PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdXVpZDtcbn1cblxuXG4vLyBhIHZlcnkgc2ltcGxlIGltcGxlbWVudGF0aW9uIG9mIGEgUHJvbWlzZSBmb3IgSW50ZXJuZXQgRXhwbG9yZXIgYW5kIE5vZGVqc1xuY29uc3QgcG9seWZpbGxQcm9taXNlID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjb3BlID0gZ2V0U2NvcGUoKTtcbiAgICBpZiAodHlwZW9mIHNjb3BlLlByb21pc2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgc2NvcGUuUHJvbWlzZSA9IGZ1bmN0aW9uIHByb21pc2UoZXhlY3V0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuZXhlY3V0b3IgPSBleGVjdXRvcjtcbiAgICAgICAgfTtcblxuICAgICAgICBzY29wZS5Qcm9taXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gdGhlbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzb2x2ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJlc29sdmUgPSAoKSA9PiB7IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlamVjdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJlamVjdCA9ICgpID0+IHsgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHBvbHlmaWxsKCkge1xuICAgIGNvbnN0IGQgPSBnZXREZXZpY2UoKTtcbiAgICAvLyBjb25zb2xlLmxvZyhkZXZpY2UpO1xuICAgIGlmIChkLmJyb3dzZXIgPT09ICdpZScgfHwgZC5ub2RlanMgPT09IHRydWUpIHtcbiAgICAgICAgcG9seWZpbGxQcm9taXNlKCk7XG4gICAgfVxuICAgIHBvbHlmaWxsUGVyZm9ybWFuY2UoKTtcbn1cblxuIl19
