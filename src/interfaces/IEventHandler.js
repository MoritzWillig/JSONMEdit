
function IEventHandler() {
}

IEventHandler.prototype=new Interface();

IEventHandler.prototype.register=Interface.IfcFunc(function register(handler) {
  throw new InterfaceError("not implemented");
});

IEventHandler.prototype.unregister=Interface.IfcFunc(function unregister(handler) {
  throw new InterfaceError("not implemented");
});

IEventHandler.prototype.clear=Interface.IfcFunc(function clear() {
  throw new InterfaceError("not implemented");
});

IEventHandler.prototype.isRegistered=Interface.IfcFunc(function(handler) {
  throw new InterfaceError("not implemented");
});

IEventHandler.prototype.trigger=Interface.IfcFunc(function() {
  throw new InterfaceError("not implemented");
});
