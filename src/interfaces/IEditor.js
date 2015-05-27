
/**
 * interface for editors
 * @param {*} value initial value
 */
function IEditor(value) {}

IEditor.prototype=new Interface();
IEditor.prototype.$include(IEventHandler);

/**
 * set the value to be displayed in the editor
 * @param {*} value data to be displayed
 */
IEditor.prototype.setValue=function setValue(value) {
  throw new InterfaceError("not implemented");
}

/**
 * gives the value currently represented by the editor
 * @return {*} value value represented by the editor
 */
IEditor.prototype.getValue=function getValue() {
  throw new InterfaceError("not implemented");
}

/**
 * if present, changes the mode the editor uses to interpret data
 * @param {string} data mode name
 */
IEditor.prototype.setMode=function setMode(data) {
  //if the editor has only 1 mode this can be ignored
};

/**
 * returns the dom node which represents the editor
 * @return {JQuery DOM Node} dom node representing the editor
 */
IEditor.prototype.getDom=function getDom() {
  throw new InterfaceError("not implemented");
}

/**
 * sets editor into readonly or read/write mode
 * @param {boolean} readOnly if true readonly is enabled otherwise writing is allowed
 */
IEditor.prototype.setReadOnly=function setReadOnly(readOnly) {
  throw new InterfaceError("not implemented");
}

/**
 * determines if the editor is in a valid state
 * @return {Boolean} true if the editor is in a valid state, false otherwise
 */
IEditor.prototype.hasInterfaceError=function hasInterfaceError() {
  throw new InterfaceError("not implemented");
}