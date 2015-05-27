
function IEventHandler() {
}

IEventHandler.prototype=new Interface();

IEventHandler.prototype.register=function register(handler) {
  throw new InterfaceError("not implemented");
}

IEventHandler.prototype.unregister=function unregister(handler) {
  throw new InterfaceError("not implemented");
}

IEventHandler.prototype.clear=function clear() {
  throw new InterfaceError("not implemented");
}

IEventHandler.prototype.contains=function(handler) {
  throw new InterfaceError("not implemented");
}

IEventHandler.prototype.trigger=function() {
  throw new InterfaceError("not implemented");
}
