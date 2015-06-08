
/**
 * string editor
 * @param {*} value initial value
 */
function SimpleStringEditor(value,classPrefix) {
  EventHandler.apply(this,[this]);

  if (classPrefix===undefined) {
    this._classPrefix="";
  } else {
    this._classPrefix=classPrefix;
  }

  this._dom={
    valField:$("<textarea>",{
      class:this._classPrefix+"SimpleStringEditor"
    })
  };

  this.setValue(value);
}

SimpleStringEditor.prototype=new IEditor();
ClassHelper.$merge(SimpleStringEditor,EventHandler);

/**
 * set the value to be displayed in the editor
 * @param {*} value data to be displayed
 */
SimpleStringEditor.prototype.setValue=function setValue(value) {
  this._undefined=(value===undefined);
  if (this._undefined) {
    this.setReadOnly(true);
    this._dom.valField.val("");
  } else {
    this._dom.valField.val(value);
    this.setReadOnly(false);
  }

  this.trigger(this);
}

/**
 * gives the value currently represented by the editor
 * @return {*} value value represented by the editor
 */
SimpleStringEditor.prototype.getValue=function getValue() {
  if (!this._undefined) {
    return this._dom.valField.val();
  } else {
    return undefined;
  }
}

/**
 * returns wether or not the value of the editor is valid
 * @return {Boolean} true if the result is valid. false otherwise
 */
SimpleStringEditor.prototype.hasValidState=function hasValidState() {
  return (!this._undefined);
}

/**
 * returns the dom node which represents the editor
 * @return {JQuery DOM Node} dom node representing the editor
 */
SimpleStringEditor.prototype.getDom=function getDom() {
  return this._dom.valField;
}

/**
 * sets editor into readonly or read/write mode
 * @param {boolean} readOnly if true readonly is enabled otherwise writing is allowed
 */
SimpleStringEditor.prototype.setReadOnly=function setReadOnly(readOnly) {
  if (readOnly) {
    this._dom.valField.prop('readOnly', true);
  } else {
    this._dom.valField.removeProp('readOnly');
  }
}