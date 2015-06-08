
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

Interface.IfcFunc=function IfcFunc(func,optional) {
  if (optional==undefined) { optional=false; }

  Object.defineProperty(func,"___ifcFunc",{
    enumerable:false,
    value:{optional:optional}
  });

  return func;
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
        throw new Error("attribute already exists");
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
 * checks if a property was introduces by an interface
 * @param  {string} name name of the property
 * @return {Boolean}      true if an interface introduced the property, false otherwise
 */
Object.defineProperty(Interface.prototype,"$fromInterface",{
  configurable:false,
  enumerable:false,
  value:function $fromInterface(name) {
    //interface functions are required to be passed throught IfcFunc
    return ((this[name]) && (this[name].___ifcFunc));

    /*
    for (var i in this.___interfaces) {
      var ifc=this.___interfaces[i];



      for (var i in ifc) {
        if (i==name) {
          return true;
        }
      }
    }
    return false;
    */
  }
})

/**
 * test if every method of an interface was implemented in another interface
 * @param  {Interface} interfaceUUTInst interface to test
 * @param  {Interface}  interface interface to compare to
 * @return {Array}              array containing all methods that are missing
 */
Object.defineProperty(Interface,"$test",{
  configurable:false,
  enumerable:false,
  value:function $test(interfaceUUTInst, interface) {
    var notImplemented=[];

    for (var i in interface.prototype) {
      //check if the method was overwritten
      if (interfaceUUTInst[i]===interface.prototype[i]) {
        //check if the method is optional -> body is empty -> no error
        try {
          interface.prototype[i]();
        } catch(e) {
          if (e instanceof InterfaceError) {
            notImplemented.push(i);
          } else {
            throw new Error("caught an error which was no instance of InterfaceError");
          }
        }
      }
    }

    return notImplemented;
  }
});


function ClassHelper() {}

Object.defineProperty(ClassHelper,"$merge",{
  configurable:false,
  enumerable:false,
  value:function $merge(to,from,overwrite) {
    if (overwrite==undefined) {
      overwrite=false;
    }

    for (var i in from.prototype) {
      //test if the attribute already exists
      if (i in to.prototype) {
        //check if the function is
        if ((!to.prototype.$fromInterface(i)) && (!overwrite)) {
          throw new Error("attribute already exists: "+i);
        }
      }

      to.prototype[i]=from.prototype[i];
    }
  }
});