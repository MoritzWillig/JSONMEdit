
/**
 * Basic ListBox implementation
 * @class
 * @implements {ISelector}
 * @mixes {EventHandler}
 * @param {*} values initial values
 * @param {string} classPrefix css class prefix for dom elements
 */
function ListBox(values,classPrefix) {
  //FIXME see fixme for collisions below
  //EventHandler.apply(this,[this]);
  List.apply(this);

  this._classPrefix=(classPrefix===undefined)?"":this._classPrefix=classPrefix;

  var self=this;

  this._dom=$("<select>",{
    "class":this._classPrefix+"ListBox"
  }).change(function() {
    self._onSelection();
  });

  /**
   * contains indices of selected select items
   * @private
   * @type {List}
   */
  this.selection=new List();
  this.selection.getInternalHandlers().push(function() {
    self._reflectSelectionHandler.apply(self,arguments);
  });

  //reflection of the item list to dom elements
  this._nodes=new List();
  this._nodes.getInternalHandlers().push(function() {
    self._reflectHandler.apply(self,arguments);
  });

  //react to item changes
  this.getInternalHandlers().push(this._changeHandler);

  this.setReadOnly(false);

  this.setMode("listBox");

  if (values!==undefined) {
    this.addRange(values);
  }
}


ListBox.prototype=new IEditor();
//ClassHelper.$merge(ListBox,EventHandler);
//FIXME List already is a eventhandler, introduce "shared" to interfaces to resolve collisions
ClassHelper.$merge(ListBox,List);

/**
 * refresh the list of selected indices if a node changes selection state
 * @private
 */
ListBox.prototype._onSelection=function(node,event) {
  var selection=[];
  for (var i=0; i<this._nodes.getSize(); i++) {
    if (this._nodes.getItem(i).prop("selected")) {
      selection.push(i);
    }
  }

  this.setSelection(selection);
}

/**
 * get the currently selected indices
 * @return {Array.<integer>}   array containing the selected indices
 */
ListBox.prototype.getSelection=function getSelection() {
  return this.selection.toArray();
}

/**
 * set the currently selected indices
 * @param {Array.<integer>} indices  array containing indices to select
 */
ListBox.prototype.setSelection=function setSelection(indices) {
  this.selection.clear();
  this.selection.insertRange(0,indices);
};

/**
 * called on item changes. performs actions to update internal state
 * @param  {string} type  name of the event
 * @param  {integer|Array.<integer>} index index or index range of the event
 * @param  {*|Array.<*>} value value or value range of the event
 */
ListBox.prototype._changeHandler=function _changeHandler(type,index,value) {
  //forward value changes to dom reflection
  switch(type) {
    case "insert":
      this._nodes.insert(index,this._createItem(value));
      break;
    case "delete":
      //delete node
      this._nodes.delete(index);
      break;
    case "changeDelete":
      //react to changeAdd event
      break;
    case "changeAdd":
      //update node text
      this._nodes.setItem(index,this._createItem(value));
      break;
    case "insertRange":
      var items=[];
      for (var i=index[0]; i!=index[1]+1; i++) {
        var item=this._createItem(value[i-index[0]]);
        items.push(item);
      }
      this._nodes.insertRange(index[0],items);
      break;
    case "deleteRange":
      this._nodes.deleteArray(index[0],index[1]-index[0]+1);
      break;
    default:
      break;
  }
}

/**
 * called on node changes. syncs dom nodes to reflect item state
 * @param  {string} type  name of the event
 * @param  {integer|Array.<integer>} index index or index range of the event
 * @param  {*|Array.<*>} value value or value range of the event
 */
ListBox.prototype._reflectHandler=function _reflectHandler(type,index,value) {
  switch(type) {
    case "delete":
    case "changeDelete":
      //detach node
      value.detach();
      break;
    case "changeAdd":
    case "insert":
      //insert into gui
      if (index!=0) {
        value.insertAfter(this._nodes.getItem(index-1));
      } else {
        this._dom.append(value);
      }
      break;
    case "insertRange":
      //add every node in range
      for (var i=index[0]; i!=index[1]+1; i++) {
        if (i!=0) {
          value.insertAfter(this._nodes.getItem(i-1));
        } else {
          this._dom.append(value[i-index[0]]);
        }
      }
      break;
    case "deleteRange":
      //detach every node in range
      for (var i=index[0]; i!=index[1]+1; i++) {
        value[index[0]].detach();
      }
      break;
    default:
      break;
  }
}

/**
 * called on node changes. syncs dom nodes to reflect item state
 * @param  {string} type  name of the event
 * @param  {integer|Array.<integer>} index index or index range of the event
 * @param  {*|Array.<*>} value value or value range of the event
 */
ListBox.prototype._reflectSelectionHandler=function _reflectSelectionHandler(type,index,value) {
  this.setLocked(true);

  switch(type) {
    case "delete":
    case "changeDelete":
      //unselect node
      $(this._dom.children()[value]).prop("selected",false);

      this.notify("unselect",index,value);
      break;
    case "changeAdd":
    case "insert":
      //insert into gui
      $(this._dom.children()[value]).prop("selected",true);

      this.notify("select",index,value);
      break;
    case "insertRange":
      //select every node in range
      for (var i=0; i<value.length; i++) {
        $(this._dom.children()[value[i]]).prop("selected",true);

        this.notify("select",index,value);
      }
      break;
    case "deleteRange":
      //unselect every node in range
      for (var i=0; i<value.length; i++) {
        $(this._dom.children()[value[i]]).prop("selected",false);

        this.notify("unselect",index,value);
      }
      break;
    default:
      break;
  }

  this.setLocked(false);
}

ListBox.prototype._createItem=function _createItem(text) {
  return $("<option>",{
    class:this._classPrefix+"Option",
    text:text
  });
}

ListBox.prototype.setMode=function setMode(mode) {
  switch(mode) {
  case "listBox":
    this._dom.prop("multiple","true").prop("size",2);
    break;
  case "dropDown":
    this._dom.removeProp("multiple").prop("size",1);
    break;
  case "comboBox":
    throw new Error("not implemented");
    //this._dom.prop("multiple",false).prop("size",1);
    break;
  default:
    throw new Error("unknown mode");
  }
}

/**
 * get the dom node which contains the selector
 * @return {JQueryDOMNode} dom node representing the selector
 */
ListBox.prototype.getDom=function getDom() {
  return this._dom;
}

/**
 * set the selector into readonly or read/write mode
 * @param {boolean} readOnly if true readonly is enabled otherwise writing is allowed
 */
ListBox.prototype.setReadOnly=function setReadOnly(readOnly) {
  this._readOnly=readOnly;

  this._dom.prop("disabled",this._readOnly);
}

/**
 * determine if the selector is in a valid state
 * @return {Boolean} true if the selector is in a valid state, false otherwise
 */
ListBox.prototype.hasValidState=function hasValidState() {
  return true;
}
