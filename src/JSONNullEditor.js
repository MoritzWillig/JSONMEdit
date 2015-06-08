
/**
 * string editor
 * @param {*} value initial value
 */
function JSONNullEditor(value,classPrefix) {
  EventHandler.apply(this,[this]);

  if (classPrefix===undefined) {
    this._classPrefix="";
  } else {
    this._classPrefix=classPrefix;
  }

  this._dom=$();

  this.setValue(value);
}

JSONNullEditor.prototype=new IEditor();
ClassHelper.$merge(JSONNullEditor,EventHandler);

/**
 * set the value to be displayed in the editor
 * @param {*} value data to be displayed
 */
JSONNullEditor.prototype.setValue=function setValue(value) {
  this._undefined=(value===undefined);
  if (this._undefined) {
    this.setReadOnly(true);
  } else {
    if (value!==null) {
      this.setValue(undefined);
    } else {
      this.setReadOnly(false);
    }
  }

  this.trigger(this);
}

/**
 * gives the value currently represented by the editor
 * @return {*} value value represented by the editor
 */
JSONNullEditor.prototype.getValue=function getValue() {
  if (!this._undefined) {
    return null;
  } else {
    return undefined;
  }
}

/**
 * returns wether or not the value of the editor is valid
 * @return {Boolean} true if the result is valid. false otherwise
 */
JSONNullEditor.prototype.hasValidState=function hasValidState() {
  return (!this._undefined);
}

/**
 * returns the dom node which represents the editor
 * @return {JQuery DOM Node} dom node representing the editor
 */
JSONNullEditor.prototype.getDom=function getDom() {
  return this._dom;
}

/**
 * sets editor into readonly or read/write mode
 * @param {boolean} readOnly if true readonly is enabled otherwise writing is allowed
 */
JSONNullEditor.prototype.setReadOnly=function setReadOnly(readOnly) {
  //we are always readonly do nothing
}