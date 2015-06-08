
/**
 * editor for json arrays
 * @param {*} value initial value
 */
function JSONArrayEditor(value,classPrefix) {
  if (classPrefix===undefined) {
    this._classPrefix="";
  } else {
    this._classPrefix=classPrefix;
  }

  var self=this;
  this._dom={
    root:$("<div>",{}),
    insertLast:$("<button>",{
      class:this._classPrefix+"insElement",
      text:"+",
      click:function() {
        self._addNodeLast();
      }
    }),
    nodes:$("<div>",{
      class:this._classPrefix+"JSONArrayEditor"
    })
  };

  this._dom.root.append(this._dom.nodes);
  this._dom.root.append(this._dom.insertLast);

  this._readOnly=false;

  this._nodes=[];

  this.setValue(value);
}

JSONArrayEditor.prototype=new IEditor();
ClassHelper.$merge(JSONArrayEditor,EventHandler);

/**
 * set the value to be displayed in the editor
 * @param {*} value data to be displayed
 */
JSONArrayEditor.prototype.setValue=function setValue(value) {
  this._undefined=(value===undefined);

  //remove old nodes
  for (var i in this._nodes) {
    var node=this._nodes[i];
    node.wrapper.detach();
  }
  this._nodes.length=0;

  if (this._undefined) {
    this.setReadOnly(true);
  } else {
    if (!Array.isArray(value)) {
      throw new Error("invalid value type");
    }

    //add sub nodes
    for (var i=0; i<value.length; i++) {
      var val=value[i];

      var wrapper=this._createWrapper(val);
      this._nodes.push(wrapper);
      this._dom.nodes.append(wrapper.wrapper);
    }

    this.setReadOnly(false);
  }
}

JSONArrayEditor.prototype._createWrapper=function _createWrapper(value) {
  var node=new JSONDynamicNode(value,this._classPrefix);
  //create node wrapper to insert new elements
  var self=this;
  var wrapperGUI=$("<div>",{
    html:[
      $("<button>",{
        class:this._classPrefix+"insElement",
        text:"+",
        click:function() {
          self._addNode(wrapper,node);
        }
      }),
      $("<button>",{
        class:this._classPrefix+"delElement",
        text:"-",
        click:function() {
          self._removeNode(wrapper);
        }
      }),
      node.getDom()
    ]
  });

  var wrapper={
    wrapper:wrapperGUI,
    node:node
  };
  return wrapper;
}

JSONArrayEditor.prototype._addNodeLast=function _addNodeLast() {
  if (this._readOnly) { return; }

  var idx=this._nodes.length;

  if (idx>0) {
    var before=this._nodes[idx-1];
    var value=before.node.getValue();
    //default to string if the editor output is not valid
    if (value===undefined) { value=""; }
    var type=JSONEditorHelper.getJSONType(value);
  } else {
    type="string";
  }

  var defaultVal=JSONEditorHelper.getTypeDefault(type);
  var wrapper=this._createWrapper(defaultVal);

  this._dom.nodes.append(wrapper.wrapper);
  this._nodes.splice(idx,0,wrapper);
}


JSONArrayEditor.prototype._addNode=function _addNode(wrapper,node) {
  if (this._readOnly) { return; }

  var idx=this._getIndexByWrapper(wrapper);


  if (idx>0) {
    var before=this._nodes[idx-1];
    var value=before.node.getValue();
    if (value===undefined) { value=""; }
    var type=JSONEditorHelper.getJSONType(value);
  } else {
    type="string";
  }

  var defaultVal=JSONEditorHelper.getTypeDefault(type);
  var wrapper=this._createWrapper(defaultVal);

  this._nodes[idx].wrapper.before(wrapper.wrapper);
  this._nodes.splice(idx,0,wrapper);
}

JSONArrayEditor.prototype._removeNode=function _removeNode(wrapper) {
  if (this._readOnly) { return; }

  var idx=this._getIndexByWrapper(wrapper);

  //detach gui
  var node=this._nodes[idx];
  node.wrapper.detach();

  //remove node
  this._nodes.splice(idx,1);
}

JSONArrayEditor.prototype._getIndexByWrapper=function _getIndexByWrapper(wrapper) {
  var idx=this._nodes.indexOf(wrapper);
  if (idx==-1) { throw new Error("invalid wrapper"); }

  return idx;
}

/**
 * gives the value currently represented by the editor
 * @return {*} value value represented by the editor
 */
JSONArrayEditor.prototype.getValue=function getValue() {
  if (this._undefined) {
    return undefined;
  } else {
    var value=[];
    for (var i=0; i<this._nodes.length; i++) {
      var node=this._nodes[i];
      value.push(node.node.getValue());
    }
    return value;
  }
}

/**
 * returns wether or not the value of the editor is valid
 * @return {Boolean} true if the result is valid. false otherwise
 */
JSONArrayEditor.prototype.hasValidState=function hasValidState() {
  return (!this._undefined);
}

/**
 * returns the dom node which represents the editor
 * @return {JQuery DOM Node} dom node representing the editor
 */
JSONArrayEditor.prototype.getDom=function getDom() {
  return this._dom.root;
}

/**
 * sets editor into readonly or read/write mode
 * @param {boolean} readOnly if true readonly is enabled otherwise writing is allowed
 */
JSONArrayEditor.prototype.setReadOnly=function setReadOnly(readOnly) {
  this._readOnly=readOnly;

  for (var i in this._nodes) {
    var node=this._nodes[i];

    node.node.setReadOnly(this._readOnly);
  }
}