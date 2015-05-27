
function InterfaceError(message) {
  Error.prototype.constructor.apply(this,arguments);
  this.name="InterfaceError";
  this.message=message;
}

InterfaceError.prototype=Error.prototype;


function Interface() {
  //tripple underscore: _ for class internal, __ for browsers, ...
  Object.defineProperty(this,"___interfaces",{
    enumerable:false,
    value:[this]
  });
}

/**
 * copies an interface into this interface
 * @param  {Interface} interface interface to include
 */
Object.defineProperty(Interface.prototype,"$include",{
  configurable:false,
  enumerable:false,
  value:function $include(interface) {
    if (!(interface instanceof Interface.constructor)) {
      throw new Error("trying to include a non interface object");
    }

    for (var i in interface.prototype) {
      //test if the attribute already exists
      if (i in this) {
        throw new Error("attribute aleady exists");
      }

      this[i]=interface.prototype[i];
    }

    /* we do not need to remove duplicates. because, on other than
     * empty interfaces, we would throw an error for duplicate attributes
     * in the code above.
     * TODO: check for empty interfaces
     */
    Array.prototype.push.apply(this.___interfaces,interface.___interfaces);
  }
});

/**
 * checks if an interface is included into the current interface
 * @param  {Interface} interface interface to check
 */
Object.defineProperty(Interface.prototype,"$includes",{
  configurable:false,
  enumerable:false,
  value:function $includes(interface) {
    return (this.___interfaces.indexOf(interface.prototype)!=-1);
  }
});

/**
 * test if every method of an interface was implemented in another interface
 * @param  {Interface} interfaceUUT interface to test
 * @param  {Interface}  interface interface to compare to
 * @return {Array}              array containing all methods that are missing
 */
Object.defineProperty(Interface,"$test",{
  configurable:false,
  enumerable:false,
  value:function $test(interfaceUUT, interface) {
    var notImplemented=[];

    for (var i in interface) {
      if (interfaceUUTInst[i]!==interface[i]) {
        //check if the method is optional -> body is empty -> no error
        try {
          interface[i]();
        } catch(e) {
          notImplemented.push(i);
        }
      }
    }

    return notImplemented;
  }
});
