
/**
 * Interface for selectors
 * @interface
 * @extends {Interface}
 * @implements {IEventHandler}
 * @implements {IList}
 */
function ISelector() {}

ISelector.prototype=new Interface();
ISelector.prototype.$include(IEventHandler);

/**
 * get the currently selected indices
 * @return {Array.<integer>}   array containing the selected indices
 */
ISelector.prototype.getSelection=Interface.IfcFunc(function getSelection() {
  throw new InterfaceError("not implemented");
});

/**
 * set the currently selected indices
 * @param {Array.<integer>} indices  array containing indices to select
 */
ISelector.prototype.setSelection=Interface.IfcFunc(function setSelection(indices) {
  throw new InterfaceError("not implemented");
});

/**
 * change the mode the selector uses to interpret data
 * @optional
 * @param {string} mode mode name
 */
ISelector.prototype.setMode=Interface.IfcFunc(function setMode(mode) {
},true);

/**
 * get the dom node which contains the
 * @return {JQueryDOMNode} dom node representing the selector
 */
ISelector.prototype.getDom=Interface.IfcFunc(function getDom() {
  throw new InterfaceError("not implemented");
});

/**
 * set the selector into readonly or read/write mode
 * @param {boolean} readOnly if true readonly is enabled otherwise writing is allowed
 */
ISelector.prototype.setReadOnly=Interface.IfcFunc(function setReadOnly(readOnly) {
  throw new InterfaceError("not implemented");
});

/**
 * determine if the selector is in a valid state
 * @return {Boolean} true if the selector is in a valid state, false otherwise
 */
ISelector.prototype.hasValidState=Interface.IfcFunc(function hasValidState() {
  throw new InterfaceError("not implemented");
});
