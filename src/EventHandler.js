
function EventHandler(owner) {
  this._listeners=[];
  this._owner=owner;
}

EventHandler.prototype=new IEventHandler();

EventHandler.prototype._idx=function _idx(listener) {
  return this._listeners.indexOf(listener);
}

EventHandler.prototype.register=function register(listener) {
  if (this.isRegistered(listener)) {
    throw new Error("listener is already registered");
  }

  this._listeners.push(listener);
}

EventHandler.prototype.unregister=function unregister(listener) {
  var idx={};
  if (!this.isRegistered(listener,idx)) {
    throw new Error("listener is not registered");
  }

  this._listeners.splice(idx.idx,1);
}

EventHandler.prototype.isRegistered=function isRegistered(listener,_idx) {
  var idx=this._idx(listener);
  if (_idx) { _idx.idx=idx; }

  return (idx!=-1);
}

EventHandler.prototype.clear=function clear() {
  this._listeners.length=0;
}

EventHandler.prototype.trigger=function trigger() {
  for (var i in this._listeners) {
    var l=this._listeners[i];

    l.apply(this._owner,arguments);
  }
}