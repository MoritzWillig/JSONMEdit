
/**
 * editor for json numbers
 * @param {*} value initial value
 */
function JSONNumberEditor(value,classPrefix) {
  EventHandler.apply(this,[this]);

  if (classPrefix===undefined) {
    this._classPrefix="";
  } else {
    this._classPrefix=classPrefix;
  }

  var self=this;
  this._dom={
    valField:$("<textarea>",{
      class:this._classPrefix+"JSONNumberEditor",
    }).change(function() {
      self._checkTextarea();
    })
  };

  this.setValue(value);
}

JSONNumberEditor.prototype=new IEditor();
ClassHelper.$merge(JSONNumberEditor,EventHandler);

/**
 * updates the textarea if an invalid value is entered
 */
JSONNumberEditor.prototype._checkTextarea=function _checkTextarea() {
  if (this.getValue()===undefined) {
    this._dom.valField.css("background-color","#a20").css("color","#fff");
  } else {
    this._dom.valField.css("background-color","").css("color","");
  }
}

/**
 * tests if the value is a number
 * @param  {*}  value value to be tested
 * @return {Boolean}       wether or not the value is a number
 */
JSONNumberEditor.prototype._isValid=function _isValid(value) {
  return (typeof value=="number");
}

/**
 * parses a value to a number
 * @param  {*} value value to be parsed
 * @return {number/undefined}       the parsed number or undefined on error
 */
JSONNumberEditor.prototype._parseNumber=function _parseNumber(value) {
  var val;
  try {
    val=JSON.parse(value);
  } catch(e) {}
  return val;
}

/**
 * set the value to be displayed in the editor
 * @param {*} value data to be displayed
 */
JSONNumberEditor.prototype.setValue=function setValue(value) {
  this._undefined=(value===undefined);
  if (this._undefined) {
    this.setReadOnly(true);
    this._dom.valField.val("");
  } else {
    this._dom.valField.val(value);
    this._checkTextarea();
    this.setReadOnly(false);
  }

  this.trigger(this);
}

/**
 * gives the value currently represented by the editor
 * @return {*} value value represented by the editor
 */
JSONNumberEditor.prototype.getValue=function getValue() {
  var val=this._dom.valField.val();
  var num=this._parseNumber(val);
  if ((!this._undefined) && (this._isValid(num))) {
    return num;
  } else {
    return undefined;
  }
}

/**
 * returns wether or not the value of the editor is valid
 * @return {Boolean} true if the result is valid. false otherwise
 */
JSONNumberEditor.prototype.hasValidState=function hasValidState() {
  return (!this._undefined);
}

/**
 * returns the dom node which represents the editor
 * @return {JQuery DOM Node} dom node representing the editor
 */
JSONNumberEditor.prototype.getDom=function getDom() {
  return this._dom.valField;
}

/**
 * sets editor into readonly or read/write mode
 * @param {boolean} readOnly if true readonly is enabled otherwise writing is allowed
 */
JSONNumberEditor.prototype.setReadOnly=function setReadOnly(readOnly) {
  if (readOnly) {
    this._dom.valField.prop('readOnly', true);
  } else {
    this._dom.valField.removeProp('readOnly');
  }
}
