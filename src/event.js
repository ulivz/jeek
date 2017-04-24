/**
 * EventEmitter
 */

export function Event() {
    this.__openlog__ = arguments && arguments[0] === 'openlog' ? 0 : 1
    this.__maxListeners__ = 5
    this.stack = []
}

// Log
Event.log = {
    repeatRegister: name => {
        console.info(`[Warning] event ${name} has been registered`)
    },
    notFound: name => {
        console.error(`[Error Code 404] event '${name}' is not registered`)
    },
    maxLimit: (name, n)=> {
        console.error(`[Warning] Listeners of event '${name}' goes beyond the maximum limit ${n}`)
    }
}

/**
 * Get event from events stack by event's name
 * @param name
 * @returns {*}
 */
Event.prototype.getEventByName = function (name) {
    return this.stack.find(event => event.name === name)
}

/**
 * Get listener by event's name and listener
 * If the given event is present and the listener is present ...
 * the listener will be returned, otherwise it returns undefined
 * @param name
 * @param listener
 * @returns {T}
 */
Event.prototype.getListener = function (event, listener) {
    return event ? event.listeners.find(l => l === listener) : void 0
}

/**
 *
 * @param n
 * @returns {Event}
 */
Event.prototype.setMaxListeners = function (n) {
    this.__maxListeners__ = n
    return this;
}

/**
 * Base register
 * @param name
 * @param listener
 * @param typeId
 * @returns {Event}
 * @private
 */
Event.prototype._baseRegister = function (name, listener, typeId) {

    let _event = this.getEventByName(name),
        _listener = this.getListener(_event, listener),
        _max = this.__maxListeners__

    if (!_event) {

        this.stack.push({
            name,
            listeners: [listener],
            typeId: typeId
        })

    } else if (!_listener) {

        _event.listeners.push(listener)

        if (_event.listeners.length > _max) {
            Event.log.maxLimit(name, _max)
        }
    }

    return this
}

/**
 * Register or add a listener for the specified event
 * @param name
 * @param listener
 */
Event.prototype.on = function (name, listener) {
    return this._baseRegister(name, listener, 1)
}

/**
 * Register a single listener for the specified event
 * that is, the listener will only trigger once
 * and the listener will be released immediately after the trigger.
 * @param name
 * @param listener
 */
Event.prototype.once = function (name, listener) {
    return this._baseRegister(name, listener, 2)
}

/**
 *
 * @param name
 * @returns {Event}
 */
Event.prototype.emit = function (name) {

    let _event = this.getEventByName(name)

    if (!_event) {

        if (this.__openlog__)
            Event.log.notFound(name);

        if (this.errorCatch)
            this.errorCatch(404);

        return this
    }

    // run listener
    for (let listener of _event.listeners) {
        listener()
    }

    // for Event.prototype.once()
    _event.typeId === 2 ? this.stack.splice(
        this.stack.indexOf(_event), 1
    ) : void 0

    return this

}

/**
 * Removes specified listener for the specified event
 * The listener must be a listener that the event has already registered.
 * @param name
 * @param listener
 * @returns {Event}
 */
Event.prototype.removeListener = function (name, listener) {

    let _event = this.getEventByName(name),
        _listener = this.getListener(_event, listener),
        _catch = this.errorCatch

    // Unregisted event
    if (!_event) {
        if (_catch) this.errorCatch(404)
        return this

        // Unregisted listener
    } else if (!_listener) {
        if (_catch) this.errorCatch(405)
        return this
    }

    _event.listeners.splice(
        _event.listeners.indexOf(_listener), 1
    )

    return this

}


Event.prototype.removeAllListeners = function () {

    console.log(!!arguments)
    console.log(!![])
    console.log(!!{})
    console.log(!!'')
    console.log(!!undefined)
    console.log(!!null)

    if (!arguments) {
        for (let _event of this.stack) {
            _event.listeners = []
        }
        return this;
    }

    Array.prototype.forEach.call(arguments, name => {
        if (typeof name === 'string') {
            let _event = this.getEventByName(name)
            _event.listeners = []
        }
    })

    return this;

}

/**
 * Returns an array of listeners for the specified event.
 * @param name
 * @returns {Array|Event.listeners|*}
 */
Event.prototype.listeners = function (name) {

    let _event = this.getEventByName(name)

    if (!_event) {
        if (this.errorCatch)
            this.errorCatch(500);
        return null;
    }

    return _event.listeners

}

/**
 * Catch Error
 * @param func
 */
Event.prototype.catch = function (func) {
    this.errorCatch = typeof func === 'function' ? func : null
}

console.log('------------')

let event = new Event('nolog')

function init1() {
    console.log('init1')
}

function init2() {
    console.log('init2')
}

function init3() {
    console.log('init2')
}
function init4() {
    console.log('init2')
}
function init5() {
    console.log('init2')
}
function init6() {
    console.log('init2')
}

function init7() {
    console.log('init2')
}

function init8() {
    console.log('init2')
}


event.on('init', init1)
    .on('init', init2)
    .on('init', init3)
    .on('init', init4)
    .on('init', init5)
    .setMaxListeners(5)
    .on('init', init6)
    .on('init', init7)
    .on('init', init8)
    .catch(errCode => {
        console.log(errCode)
    })

console.log(event)

event.emit('init')

console.log(event.listeners('init'))

event.removeAllListeners()

console.log(event.listeners('init'))

// console.log(2 > 3 ? 3 > 4 ? 1 : 2 : 3 )