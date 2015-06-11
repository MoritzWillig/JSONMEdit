
JSONEditorHelper={
  /**
   * default values for json objects
   * use getTypeDefault to get a default json object!
   * @type {Object}
   */
  _typeDefaults:{
    string:"",
    number:0,
    boolean:true,
    object:{},
    array:[],
    null:null
  },

  /**
   * returns the json type name for a variable
   * @param  {*} value a json object to get the type from
   * @return {string}       the json type name
   */
  getJSONType:function getJSONType(value) {
    switch (typeof value) {
      case "string":
        return "string";
      case "number":
        return "number";
      case "object":
        if (value==null) {
          return "null";
        }
        if (Array.isArray(value)) {
          return "array";
        } else {
          return "object";
        }
      case "boolean":
        return "boolean";
      default:
        throw new Error("non json type");
    }
  },

  /**
   * returns if the type is passed by value or reference
   * @param  {string}  type json type name
   * @return {Boolean}      true if the type is passed by reference, false otherwise
   */
  byReference:function byReference(type) {
    return ((type=="object") || (type=="array"));
  },

  /**
   * returns a copy of a default value for an json type
   * @param  {string} type json type to get the value of
   * @return {*}      copy of the default value of the requested type
   */
  getTypeDefault:function getTypeDefault(type) {
    var value;
    if (this.byReference(type)) {
      switch (type) {
        case "object":
          value={};
          var defaultVal=this._typeDefaults[type];
          for (var i in defaultVal[type]) {
            value[i]=defaultVal[i];
          }
          break;
        case "array":
          value=this._typeDefaults[type].slice();
          break;
        default:
          throw new Error("unknown type");
      }
    } else {
      value=this._typeDefaults[type];
    }

    return value;
  }
}


/**
 * Editor for arbitrary json objects
 * @class
 * @implements {IEditor}
 * @mixes {EventHandler}
 * @param {*} value initial value
 * @param {string} classPrefix css class prefix for dom elements
 */
function JSONDynamicNode(value,classPrefix) {
  EventHandler.apply(this,[this]);

  if (classPrefix===undefined) {
    this._classPrefix="";
  } else {
    this._classPrefix=classPrefix;
  }

  this._type="string";

  this.dom={};
  this.dom._types=this._createTypeSelector();
  this.dom._editor=this._getEditor(this.type);
  this.dom.wrapper=this._createWrapper();

  this.setValue(value);
}

JSONDynamicNode.prototype=new IEditor();
ClassHelper.$merge(JSONDynamicNode,EventHandler);

/**
 * type of the json value
 * @private
 * @type {string}
 */
JSONDynamicNode.prototype._type=undefined;

/**
 * dom node of the editor
 * @private
 * @type {JQueryDOMNode}
 */
JSONDynamicNode.prototype.dom=undefined;

/**
 * last set value
 * @private
 * @type {*}
 */
JSONDynamicNode.prototype._value=undefined;

/**
 * set the value to be displayed in the editor
 * @param {*} value data to be displayed
 */
JSONDynamicNode.prototype.setValue=function setValue(value) {
  this._undefined=(value===undefined);

  //reset editor
  this.dom._editor.getDom().detach();

  if (this._undefined) {
    //default to string editor if no value is given
    this._setType("string");
    this.dom._editor=this._getEditor(this._type);
    this.setReadOnly(true);
  } else {
    var self=this;

    //set new value
    this._value=value;
    this._setType(JSONEditorHelper.getJSONType(this._value));

    //insert new editor
    /*
      FIXME the old editor was updating value on change - add onChange to editorInterface or correct getValue
      --some old code--
        var listener=(function (nodeName) {
          return function(value) {
            self._value[nodeName]=value;
          };
        })(i);

        var node=new JSONDynamicNode(val);
        node.onChange.register(listener);
    */
    this.dom._editor=this._getEditor(this._type);

    this.dom.wrapper.dom.nodes.append(this.dom._editor.getDom());
    this.dom._editor.setValue(this._value);

    this.setReadOnly(false);
  }

  this.trigger(this);
}

/**
 * get the value currently represented in the editor or undefined if not in a valid state
 * @return {*|undefined} value value represented in the editor
 */
JSONDynamicNode.prototype.getValue=function getValue() {
  if (this._undefined) {
    return undefined;
  } else {
    return this.dom._editor.getValue();
  }
}

/**
 * determine if the editor is in a valid state
 * @return {Boolean} true if the editor is in a valid state, false otherwise
 */
JSONDynamicNode.prototype.hasValidState=function hasValidState() {
  return (!this._undefined);
}

/**
 * create a wrapper for the sub editors
 * @private
 * @return {JQueryDOMNode}       wrapper representing the editor gui
 */
JSONDynamicNode.prototype._createWrapper=function _createWrapper() {
  var dom={
    nodes:$("<div>",{
      css:{
        "padding-left":"20px"
      }
    })
  };

  dom.frame=$("<span>", {
    html:[
      this.dom._types.dom.frame,
      dom.nodes
    ],
    class:this._classPrefix+"JSONDynamicNode",
  });

  return {
    dom:dom,
    addDom:function(dom) {
      dom.nodes.append(dom);
    }
  };
}

/**
 * set the value to the default value for an json type
 * @private
 * @param {string} type type to set the default value of
 */
JSONDynamicNode.prototype._setTypeDefault=function _setTypeDefault(type) {
  var defaultValue=JSONEditorHelper.getTypeDefault(type);
  this.setValue(defaultValue);
}

/**
 * create a ui for selecting node types
 * @private
 * @return {JQueryDOMNode} node containing the type selector
 */
JSONDynamicNode.prototype._createTypeSelector=function _createTypeSelector() {
  var self=this;

  var dom={
    stringSel:$("<span>",{
      class:this._classPrefix+"typeSelOpt",
      text:"string",
    }).click(function() {
      self._setTypeDefault("string");
    }),
    numberSel:$("<span>",{
      class:this._classPrefix+"typeSelOpt",
      text:"number"
    }).click(function() {
      self._setTypeDefault("number");
    }),
    booleanSel:$("<span>",{
      class:this._classPrefix+"typeSelOpt",
      text:"bool"
    }).click(function() {
      self._setTypeDefault("boolean");
    }),
    objectSel:$("<span>",{
      class:this._classPrefix+"typeSelOpt",
      text:"object"
    }).click(function() {
      self._setTypeDefault("object");
    }),
    arraySel:$("<span>",{
      class:this._classPrefix+"typeSelOpt",
      text:"array"
    }).click(function() {
      self._setTypeDefault("array");
    }),
    nullSel:$("<span>",{
      class:this._classPrefix+"typeSelOpt",
      text:"null"
    }).click(function() {
      self._setTypeDefault("null");
    })
  };

  dom.frame=$("<span>",{
    html:[
      dom.stringSel,
      dom.numberSel,
      dom.booleanSel,
      dom.objectSel,
      dom.arraySel,
      dom.nullSel
    ]
  });

  return {
    dom:dom
  };
}

/**
 * get the responsible editor for an specific json type
 * @private
 * @param {string} type json type name
 * @return {IEditor} editor capable of handling the given json type
 */
JSONDynamicNode.prototype._getEditor=function _getEditor(type) {
  switch (type) {
    case "string":
      return this._getStringEditor();
    case "number":
      return this._getNumberEditor();
    case "boolean":
      return this._getBooleanEditor();
    case "array":
      return this._getArrayEditor();
    case "object":
      return this._getObjectEditor();
    case "null":
      return this._getNullEditor();
    default:
      return this._getStringEditor();
  }
}

/**
 * get the editor for editing strings
 * @private
 * @return {IEditor} editor capable of handling strings
 */
JSONDynamicNode.prototype._getStringEditor=function _getStringEditor() {
  return new SimpleStringEditor(undefined);
}

/**
 * get the editor for editing numbers
 * @private
 * @return {IEditor} editor capable of handling numbers
 */
JSONDynamicNode.prototype._getNumberEditor=function _getNumberEditor() {
  return new JSONNumberEditor(undefined);
}

/**
 * get the editor for editing booleans
 * @private
 * @return {IEditor} editor capable of handling booleans
 */
JSONDynamicNode.prototype._getBooleanEditor=function _getBooleanEditor() {
  var dom={};
  dom.buttons={
    true:$("<span>",{
      text:"true",
      class:this._classPrefix+"boolEditButton",
      click:function() {
        if (!editor._readOnly) {
          editor.setValue(true);
        }
      }
    }),
    false: $("<span>",{
      text:"false",
      class:this._classPrefix+"boolEditButton",
      click:function() {
        if (!editor._readOnly) {
          editor.setValue(false);
        }
      }
    })
  };

  dom.valField=$("<div>",{
    html:[
      dom.buttons.true,
      dom.buttons.false
    ]
  });

  var self=this;
  var editor={
    _value:true,
    _readOnly:false,
    getDom:function() {
      return dom.valField;
    },
    setReadOnly:function(readOnly) {
      editor._readOnly=readOnly;
    },
    setValue:function(value) {
      editor._value=value;

      if (editor._value) {
        dom.buttons.true.addClass(self._classPrefix+"boolEditButtonActive");
        dom.buttons.false.removeClass(self._classPrefix+"boolEditButtonActive");
      } else {
        dom.buttons.true.removeClass(self._classPrefix+"boolEditButtonActive");
        dom.buttons.false.addClass(self._classPrefix+"boolEditButtonActive");
      }
    },
    getValue:function() {
      return editor._value;
    }
  };
  return editor;
}

/**
 * get the editor for editing arrays
 * @private
 * @return {IEditor} editor capable of handling arrays
 */
JSONDynamicNode.prototype._getArrayEditor=function _getArrayEditor() {
  return new JSONArrayEditor(undefined);
}

/**
 * get the editor for editing objects
 * @private
 * @return {IEditor} editor capable of handling objects
 */
JSONDynamicNode.prototype._getObjectEditor=function _getObjectEditor() {
  return new JSONObjectEditor(undefined);
}

/**
 * get the editor for editing null values
 * @private
 * @return {IEditor} editor capable of handling null values
 */
JSONDynamicNode.prototype._getNullEditor=function _getNullEditor() {
  return new JSONNullEditor(undefined);
}

/**
 * change the type selector to the given type
 * @private
 * @param {string} type json type name
 */
JSONDynamicNode.prototype._setType=function _setType(type) {
  var oSelStr=this._type+"Sel";
  var oSelector=this.dom._types.dom[oSelStr];
  oSelector.removeClass(this._classPrefix+"typeSelOptActive");

  this._type=type;

  var selStr=this._type+"Sel";
  var selector=this.dom._types.dom[selStr];
  selector.addClass(this._classPrefix+"typeSelOptActive");
}

/**
 * set the editor into readonly or read/write mode
 * @param {boolean} readOnly if true readonly is enabled otherwise writing is allowed
 */
JSONDynamicNode.prototype.setReadOnly=function setReadOnly(readOnly) {
  this.dom._editor.setReadOnly(readOnly);
}

/**
 * get the dom node which contains the editor
 * @return {JQueryDOMNode} dom node representing the editor
 */
JSONDynamicNode.prototype.getDom=function getDom() {
  return this.dom.wrapper.dom.frame;
}



/**
 * Editor for editing json strings
 * @class
 * @implements {IEditor}
 * @mixes {EventHandler}
 * @param {*} value initial value
 * @param {string} classPrefix css class prefix for dom elements
 */
function JSONEditor(value,classPrefix) {
  if (classPrefix===undefined) {
    this._classPrefix="";
  } else {
    this._classPrefix=classPrefix;
  }

  //setup gui
  var self=this;
  this._dom={
    selectors:[
      $("<span>",{
        text:"json",
        class:this._classPrefix+"typeSelOpt",
        click:function() {
          self.setMode("json");
        }
      }),
      $("<span>",{
        text:"plain",
        class:this._classPrefix+"typeSelOpt",
        click:function() {
          self.setMode("plain");
        }
      })
    ],
    switch:$("<div>",{}),
    root:$("<div>",{
      class:this._classPrefix+"JSONEditor",
    })
  }
  this._dom.switch.append(this._dom.selectors);
  this._dom.root.append(this._dom.switch);

  //setup editor
  this.setMode("json");
  this.setValue(value);
};

JSONEditor.prototype=new IEditor();
ClassHelper.$merge(JSONEditor,EventHandler);

/**
 * displayed the given json structure in the editor
 * @param {string} value json string to be displayed
 */
JSONEditor.prototype.setValue=function setValue(value) {
  if (value===undefined) {
    this._editor.setValue("");
    return;
  }

  var data;

  switch (this._mode) {
    case "json":
      try {
        this.setMode("json");
        data=JSON.parse(value);
        break;
      } catch(e) {
        //can not display json mode -> plain mode
        this.setMode("plain");
      }
    case "plain":
      data=value;
      break;
    default:
      throw new Error("unknown type");
  }

  this._editor.setValue(data);

  this.trigger(this);
}

/**
 * get the value currently represented in the editor or undefined if not in a valid state
 * @return {string|undefined} value value represented in the editor
 */
JSONEditor.prototype.getValue=function getValue() {
  var value;
  var data=this._editor.getValue();
  switch (this._mode) {
    case "json":
      value=JSON.stringify(data,undefined,"  ");
      break;
    case "plain":
      //data is a (user modified) string in json format
      value=data;
      break;
    default:
      throw new Error("unknown mode");
  }
  return value;
}

/**
 * change the mode the editor uses to interpret data
 * accepted modes:
 * json: edits the json structure with json editors
 * plain: displays the json string in a text editor
 * @param {string} mode mode name
 * @throws {Error} If mode is none of the accepted modes
 */
JSONEditor.prototype.setMode=function setMode(mode) {
  if (mode==this._mode) { return; }

  //remove editor
  var value;
  if (this._editor) {
    value=this.getValue();
    this._editor.getDom().detach();
  }

  //reset selectors
  for (var i in this._dom.selectors) {
    this._dom.selectors[i].removeClass(this._classPrefix+"typeSelOptActive");
  }

  //setup new editor
  switch (mode) {
    case "json":
      this._editor=new JSONDynamicNode(undefined,this.classPrefix);
      this._dom.selectors[0].addClass(this._classPrefix+"typeSelOptActive");
      break;
    case "plain":
      this._editor=new SimpleStringEditor(undefined,this.classPrefix);
      this._dom.selectors[1].addClass(this._classPrefix+"typeSelOptActive");
      break;
    default:
      throw new Error("unknown editor mode");
  }
  this._dom.root.append(this._editor.getDom());

  //change mode
  this._mode=mode;

  //reinsert value
  this.setValue(value);
};

/**
 * get the dom node which contains the editor
 * @return {JQueryDOMNode} dom node representing the editor
 */
JSONEditor.prototype.getDom=function getDom() {
  return this._dom.root;
}

/**
 * set the editor into readonly or read/write mode
 * @param {boolean} readOnly if true readonly is enabled otherwise writing is allowed
 */
JSONEditor.prototype.setReadOnly=function setReadOnly(readOnly) {
  this._editor.setReadOnly(readOnly);
}