//FIXME move to classes

/**
 * @requires IEventHandler
 */

/**
 * Create an observer pattern subject to notify functions if the handler is triggered
 * @class
 * @implements {IEventHandler}
 * @param {object} owner object to set caller to if events are dispatched
 */
function EventHandler(owner) {
  this._listeners=[];
  this._internal=[];
  this._owner=owner;
  this._locked=false;
}

EventHandler.prototype=new IEventHandler();

/**
 * get the index of a listener in the listeners list
 * @private
 * @param  {function} listener listener to search in list
 * @return {integer}          index of the listener in the list or -1 if not found
 */
EventHandler.prototype._idx=function _idx(listener) {
  return this._listeners.indexOf(listener);
}

/**
 * register a listener to the EventHandler
 * @param  {function} listener listener to be registered
 * @throws {Error} If the listener is already registered
 */
EventHandler.prototype.register=function register(listener) {
  if (this.isRegistered(listener)) {
    throw new Error("listener is already registered");
  }

  this._listeners.push(listener);
}

/**
 * unregister a listener from the EventHandler
 * @param  {function} listener listener to unregister
 * @throws {Error} If the listener was not registered
 */
EventHandler.prototype.unregister=function unregister(listener) {
  var idx={};
  if (!this.isRegistered(listener,idx)) {
    throw new Error("listener is not registered");
  }

  this._listeners.splice(idx.idx,1);
}

/**
 * check if a listener is currently registered
 * @param  {function}  listener listener to check for
 * @return {Boolean}   true if the listener is registered, false otherwise
 */
EventHandler.prototype.isRegistered=function isRegistered(listener,_idx) {
  var idx=this._idx(listener);
  if (_idx) { _idx.idx=idx; }

  return (idx!=-1);
}

/**
 * remove all listeners from the EventHandler
 */
EventHandler.prototype.clear=function clear() {
  this._listeners.length=0;
}

/**
 * recive an array of internal handlers which are not affected by other EventHandler operations
 * @return {Array.<function>} list representing internal handlers
 */
EventHandler.prototype.getInternalHandlers=function getInternalHandlers() {
  return this._internal;
}

/**
 * notify all registered listeners
 * @param {...*} data data to be passed to the listeners
 */
EventHandler.prototype.notify=function notify() {
  if (this._locked) { return; }

  for (var i in this._internal) {
    var l=this._internal[i];

    l.apply(this._owner,arguments);
  }

  for (var i in this._listeners) {
    var l=this._listeners[i];

    l.apply(this._owner,arguments);
  }
}

/**
 * block the EventHandler from notifing registered handler
 * @param {boolean} locked true to lock the handler, false to unlock the handler
 */
EventHandler.prototype.setLocked=function setLocked(locked) {
  this._locked=locked;
}