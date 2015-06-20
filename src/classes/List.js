/**
 * @requires ClassHelper
 * @requires IList
 * @requires EventHandler
 * @requires Error
 */

/**
 * Generic list class
 * @class
 * @implements {IList}
 * @mixes {EventHandler}
 * @param {*} [values] initial value
 * @param {string} classPrefix css class prefix for dom elements
 */
function List(values) {
  EventHandler.apply(this,[this]);

  if (values==undefined) {
    values=[];
  } else {
    if (!Array.isArray(values)) {
      throw new Error("given values are not of type array");
    }
  }
  this._values=values;
}

/**
 * @event List#changeDelete
 *
 * @description signals that the item at index is removed and replaced
 * by another value
 *
 * @type {{type ,index ,value}}
 * @property {string} type name of the event
 * @property {integer} index modified index
 * @property {*} value removed value
 */
/**
 * @event List#changeAdd
 *
 * @description signals that a new value is set for the item at index
 *
 * @type {{type ,index ,value}}
 * @property {string} type name of the event
 * @property {integer} index modified index
 * @property {*} value new value
 */
/**
 * @event List#insert
 *
 * @description signals that a new item is inserted at index
 *
 * @type {{type ,index ,value}}
 * @property {string} type name of the event
 * @property {integer} index modified index
 * @property {*} value new value
 */
/**
 * @event List#delete
 *
 * @description signals that a item is deleted at index
 *
 * @type {{type ,index ,value}}
 * @property {string} type name of the event
 * @property {integer} index modified index
 * @property {*} value deleted value
 */
/**
 * @event List#insertRange
 *
 * @description signals that a range of new item is inserted starting at index
 *
 * @type {{type ,index ,value}}
 * @property {string} type name of the event
 * @property {Array.<integer>} index modified index range index[0]=start index, index[1]=end index
 * @property {Array.<*>} value inserted values
 */
/**
 * @event List#deleteRange
 *
 * @description signals that a range of item is deleted starting at index
 *
 * @type {{type ,index ,value}}
 * @property {string} type name of the event
 * @property {Array.<integer>} index modified index range index[0]=start index, index[1]=end index
 * @property {Array.<*>} value deleted values
 */

List.prototype=new IList();
ClassHelper.$merge(List,EventHandler);

/**
 * inserts an item at the given index
 * @param  {integer} index index to insert to value
 * @param  {*} value value to insert
 */
List.prototype._doInsert=function _doInsert(index,value) {
  if ((0>index) || (index>this._values.length)) {
    throw new Error("index out of range");
  }

  this._values.splice(index,0,value);
}

/**
 * delete an item from the given index
 * @param  {integer} index index to delete the item from
 * @return {*}       removed item
 */
List.prototype._doDelete=function _doDelete(index) {
  if ((0>index) || (index>this._values.length)) {
    throw new Error("index out of range");
  }

  return this._values.splice(index,1)[0];
}

/**
 * get the item at the index position
 * @param  {integer} index item index
 * @return {*}       value value at index position
 */
List.prototype.getItem=function getItem(index) {
  if ((0>index) || (index>this._values.length)) {
    throw new Error("index out of range");
  }

  return this._values[index];
}

/**
 * replace the value at the index with another value
 * @param {integer} index item index
 * @param {*} value new item value
 */
List.prototype.setItem=function setItem(index,value) {
  var old=this._values[index];

  this._values[index]=value;

  this.notify("changeDelete",index,old);
  this.notify("changeAdd",index,this._values[index]);
}


/**
 * insert an item into the list
 * @param  {integer} index  index to insert the item at
 * @param  {*} value value to insert
 */
List.prototype.insert=function insert(index,value) {
  this._doInsert(index,value);
  this.notify("insert",index,value);
}

/**
 * delete an item from the list
 * @param  {integer} index index to delete
 * @return {*}        value at index
 */
List.prototype.delete=function _delete(index) {
  var value=this._doDelete(index);
  this.notify("delete",index,value);

  return value;
}

/**
 * delete an item in the list
 * @param  {*} value value to remove
 * @return {integer}        removed index
 */
List.prototype.remove=function remove(value) {
  var index=this.indexOf(value);

  if (index==-1) {
    throw new Error("value does not exist");
  }

  this.delete(index);

  return index;
}

/**
 * add an item at the end of the list
 * @param  {*} value value to insert
 * @return {integer}        index of the inserted value
 */
List.prototype.add=List.prototype.push=List.prototype.enqueue=function add(value) {
  var index=this._values.length;

  this.insert(index,value);
}

/**
 * remove the last item of the list
 * @return {value} removed value
 */
List.prototype.pop=List.prototype.dequeue=function pop() {
  if (this._values.length==0) {
    throw new Error("list underflow");
  }

  var item=this._values.pop();
  this.notify("delete",this._values.length-1,item);

  return item;
}

/**
 * remove the first item from the list
 * @return {*} removed item value
 */
List.prototype.shift=function shift() {
  if (this._values.length==0) {
    throw new Error("list underflow");
  }

  var item=this._values.shift();
  this.notify("delete",0,item);

  return item;
};

/**
 * insert a item at the beginning of the list
 * @param {*} value item to add
 * @return {*}   new list length
 */
List.prototype.unshift=function unshift(value) {
  this._values.unshift(value);
  this.notify("insert",0,value);

  return this.getSize();
};


/**
 * remove the first item from the list
 * @return {*}   removed item
 */
List.prototype.shift=function shift() {
  var item=this._values.shift();
  this.notify("delete",0,item);

  return item;
};

/**
 * move an item to another index
 * @param  {integer} index1  index of the item to move
 * @param  {integer} index2  index to move the item to
 */
List.prototype.move=function move(index1,index2) {
  var item=this.delete(index1);

  if (index1<index2) {
    index2--;
  }

  this.insert(index2,item);
}

/**
 * exchange two items
 * @param  {integer} index1  first item to exchange
 * @param  {integer} index2  second item to exchange
 */
List.prototype.exchange=function exchange(index1,index2) {
  var item1=this.getItem(index1);

  this.setItem(index1,this.getItem(index2));
  this.setItem(index2,item1);
}

/**
 * find an item in the list
 * @param  {*} value  item to search for
 * @return {integer}        item index or -1 if the item is not found
 */
List.prototype.indexOf=function indexOf(value) {
  return this._values.indexOf(value);
}

/**
 * get size number of items in the list
 * @return {integer}   number of items in the list
 */
List.prototype.getSize=function getSize() {
  return this._values.length;
};

/**
 * removes every item from the list
 */
List.prototype.clear=function clear() {
  this.deleteRange(0,this.getSize()-1);
};

/**
 * convert the list to an array
 * @return {Array.<*>}   array containing the list items
 */
List.prototype.toArray=function toArray() {
  return this._values.slice();
};

/**
 * insert an array into the list
 * @param  {integer} index   index to start inserting the array
 * @param  {Array.<*>} values  array to insert into the list
 */
List.prototype.insertRange=function insertRange(index,values) {
  this._values.splice.apply(this._values,[index,0].concat(values));
  this.notify("insertRange",index,values);
};

/**
 * insert an other list into the current list
 * @param  {integer} index   index to start inserting the list
 * @param  {IList} values  list to insert into this list
 */
List.prototype.insertList=function insertList(index,list) {
  var values=list._values;
  this._values.splice.apply(this._values,[index,0].concat(values));
  this.notify("insertRange",[index,index+values.length],values);
};

/**
 * delete a range of indices from the list
 * @param  {integer} index start of range
 * @param {integer} count number of elements
 */
List.prototype.deleteRange=function deleteRange(index,count) {
  var del=this._values.splice(index,count);
  this.notify("deleteRange",[index,index+count],del);
};
