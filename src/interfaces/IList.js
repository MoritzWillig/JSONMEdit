//TODO extract to stack (push/pop), set (add,remove), queue (shift,unshift,[enqueue,dequeue])

/**
 * @requires Interface
 * @requires InterfaceError
 * @requires IEventHandler
 */

/**
 * Interface for lists
 * @interface
 * @extends {Interface}
 * @implements {IEventHandler}
 */
function IList() {}

IList.prototype=new Interface();
IList.prototype.$include(IEventHandler);

/**
 * get the item at the index position
 * @param  {integer} index item index
 * @return {*}       value value at index position
 */
IList.prototype.getItem=Interface.IfcFunc(function getItem(index) {
  throw new InterfaceError("not implemented");
});

/**
 * replace the value at the index with another value
 * @param {integer} index item index
 * @param {*} value new item value
 */
IList.prototype.setItem=Interface.IfcFunc(function setItem(index,value) {
  throw new InterfaceError("not implemented");
});

/**
 * insert an item into the list
 * @param  {integer} index  index to insert the item at
 * @param  {*} value value to insert
 */
IList.prototype.insert=Interface.IfcFunc(function insert(index,value) {
  throw new InterfaceError("not implemented");
});

/**
 * delete an item from the list
 * @param  {integer} index index to delete
 * @return {*}        value at index
 */
IList.prototype.delete=Interface.IfcFunc(function _delete(index) {
  throw new InterfaceError("not implemented");
});

/**
 * delete an item in the list
 * @param  {*} value value to remove
 * @return {integer}        removed index
 */
IList.prototype.remove=Interface.IfcFunc(function remove(value) {
  throw new InterfaceError("not implemented");
});

/**
 * add an item at the end of the list
 * @param  {*} value value to insert
 * @return {integer}        index of the inserted value
 */
IList.prototype.add=IList.prototype.push=IList.prototype.enqueue=Interface.IfcFunc(function add(value) {
  throw new InterfaceError("not implemented");
});

/**
 * remove the last item of the list
 * @return {value} removed value
 */
IList.prototype.pop=IList.prototype.dequeue=Interface.IfcFunc(function pop() {
  throw new InterfaceError("not implemented");
});

/**
 * remove the first item from the list
 * @return {*}   removed item
 */
IList.prototype.shift=Interface.IfcFunc(function shift() {
  throw new InterfaceError("not implemented");
});

/**
 * insert a item at the beginning of the list
 * @param {*} value item to add
 * @return {integer} new list length
 */
IList.prototype.unshift=Interface.IfcFunc(function unshift(value) {
  throw new InterfaceError("not implemented");
});

/**
 * move an item to another index
 * @param  {integer} index1  index of the item to move
 * @param  {integer} index2  index to move the item to
 */
IList.prototype.move=Interface.IfcFunc(function move(index1,index2) {
  throw new InterfaceError("not implemented");
});

/**
 * exchange two items
 * @param  {integer} index1  first item to exchange
 * @param  {integer} index2  second item to exchange
 */
IList.prototype.exchange=Interface.IfcFunc(function exchange(index1,index2) {
  throw new InterfaceError("not implemented");
});

/**
 * find an item in the list
 * @param  {*} value  item to search for
 * @return {integer}        item index or -1 if the item is not found
 */
IList.prototype.indexOf=Interface.IfcFunc(function indexOf(value) {
  throw new InterfaceError("not implemented");
});

/**
 * get size number of items in the list
 * @return {integer}   number of items in the list
 */
IList.prototype.getSize=Interface.IfcFunc(function getSize() {
  throw new InterfaceError("not implemented");
});

/**
 * removes every item from the list
 */
IList.prototype.clear=Interface.IfcFunc(function clear() {
  throw new InterfaceError("not implemented");
});

/**
 * convert the list to an array
 * @return {Array.<*>}   array containing the list items
 */
IList.prototype.toArray=Interface.IfcFunc(function toArray() {
  throw new InterfaceError("not implemented");
});

/**
 * insert an array into the list
 * @param  {integer} index   index to start inserting the array
 * @param  {Array.<*>} values  array to insert into the list
 */
IList.prototype.insertRange=Interface.IfcFunc(function insertRange(index,values) {
  throw new InterfaceError("not implemented");
});

/**
 * insert an other list into the current list
 * @param  {integer} index   index to start inserting the list
 * @param  {IList} values  list to insert into this list
 */
IList.prototype.insertList=Interface.IfcFunc(function insertList(index,list) {
  throw new InterfaceError("not implemented");
});

/**
 * delete a range of indices from the list
 * @param  {integer} index start of range
 * @param {integer} count number of elements
 */
IList.prototype.deleteRange=Interface.IfcFunc(function deleteRange(index,count) {
  throw new InterfaceError("not implemented");
});
