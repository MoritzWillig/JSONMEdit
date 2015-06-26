/**
 * tests an implementation of the IList interface for its correct implementation
 * @param  {string} name        name of the test
 * @param  {function} genInstance function which returns a new instance of the implementation
 */
testIList=function(name,genInstance) {
  var fill=function(list) {
    for (var i=0; i<entries.length; i++) {
      list.push(entries[i]);
    }
  };

  typeEntries=[
    null,
    "str",
    123,
    {3:"test","3.1":[]},
    [4,4.1,4.2,{}],
    true
  ];

  entries=[
    "testStr0",
    "testStr1",
    "testStr2",
    "testStr3",
    "testStr4",
    "testStr5",
    "testStr6"
  ];

  testIEventHandler(name+".IEventHandler",genInstance,{
    getItem:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.getItem(0);
      },
      shouldNotify:false,
    },
    setItem:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.setItem(0,entries[1]);
      },
      shouldNotify:true,
    },
    insert:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.insert(1,entries[1]);
      },
      shouldNotify:true,
    },
    delete:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.delete(0);
      },
      shouldNotify:true,
    },
    remove:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.remove(entries[0]);
      },
      shouldNotify:true,
    },
    add:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.add(entries[1]);
      },
      shouldNotify:true,
    },
    push:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.push(entries[1]);
      },
      shouldNotify:true,
    },
    enqueue:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.enqueue(entries[1]);
      },
      shouldNotify:true,
    },
    addArray:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.addArray(entries.slice(1,2));
      },
      shouldNotify:true,
    },
    pushArray:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.pushArray(entries.slice(1,2));
      },
      shouldNotify:true,
    },
    enqueueArray:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.enqueueArray(entries.slice(1,2));
      },
      shouldNotify:true,
    },
    addList:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        var list=new List(entries.slice(1,2));
        instance.addList(list);
      },
      shouldNotify:true,
    },
    pushList:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        var list=new List(entries.slice(1,2));
        instance.pushList(list);
      },
      shouldNotify:true,
    },
    enqueueList:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        var list=new List(entries.slice(1,2));
        instance.enqueueList(list);
      },
      shouldNotify:true,
    },
    pop:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.pop();
      },
      shouldNotify:true,
    },
    dequeue:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.dequeue();
      },
      shouldNotify:true,
    },
    shift:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.shift();
      },
      shouldNotify:true,
    },
    unshift:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.unshift(entries[1]);
      },
      shouldNotify:true,
    },
    move:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        instance.push(entries[1]);
        instance.push(entries[2]);
        reset();
        instance.move(2,0);
      },
      shouldNotify:true,
      //FIXME adjust notify count
    },
    exchange:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        instance.push(entries[1]);
        instance.push(entries[2]);
        reset();
        instance.exchange(0,2);
      },
      shouldNotify:true,
      //FIXME adjust notify count
    },
    indexOf:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.indexOf(entries[0]);
        instance.indexOf(undefined);
      },
      shouldNotify:false,
    },
    getSize:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.getSize();
      },
      shouldNotify:false,
    },
    clear:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.clear();
      },
      shouldNotify:true,
    },
    toArray:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.toArray();
      },
      shouldNotify:false,
    },
    insertRange:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        instance.insertRange(1,entries.slice(1,2));
      },
      shouldNotify:true,
    },
    insertList:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        reset();
        var list=new List(entries.slice(1,2));
        instance.insertList(list);
      },
      shouldNotify:true,
    },
    deleteRange:{
      setup:function(instance,reset) {
        instance.push(entries[0]);
        instance.push(entries[1]);
        instance.push(entries[2]);
        reset();
        instance.deleteRange(0,1);
      },
      shouldNotify:false
      //FIXME adjust notify count
    }
  });

  QUnit.module(name,{
    beforeEach:function(assert) {
      //create list
      this.list=genInstance();
    },
    afterEach:function(assert) {
    }
  });

  /* test that the Ilist interface is implemented
   */
  QUnit.test("interface",function(assert) {
    var missing=Interface.$test(this.list,IList);
    assert.deepEqual(
      missing,
      [],
      "IList interface is not implemented (missing: "+missing.join(", ")+")");
  });

  QUnit.test("getItem valid", function (assert) {
    fill(this.list);

    assert.deepEqual(this.list.getItem(0),entries[0],"got wrong element");
    assert.deepEqual(this.list.getItem(2),entries[2],"got wrong element");
  });

  QUnit.test("getItem throw", function (assert) {
    fill(this.list);

    assert.throws(function() {
      this.list.getItem(-1);
    },Error,"accessed negative index");
    assert.throws(function() {
      this.list.getItem(entries.length);
    },Error,"accessed non existing element");
  });

  QUnit.test("setItem valid", function (assert) {
    fill(this.list);

    this.list.setItem(0,entries[2]);
    assert.deepEqual(this.list.getItem(0),entries[2]);

    this.list.setItem(2,entries[0]);
    assert.deepEqual(this.list.getItem(2),entries[0]);

    var array=this.list.toArray();
    var e=entries.slice();
    e[0]=entries[2];
    e[2]=entries[0];
    assert.deepEqual(array,e);
  });

  QUnit.test("setItem throw", function (assert) {
    fill(this.list);

    assert.throws(function() {
      this.list.setItem(-1,entries[0]);
    },Error,"accessed negative index");
    assert.throws(function() {
      this.list.setItem(entries.length,entries[0]);
    },Error,"accessed non existing element");
  });

  QUnit.test("insert valid", function (assert) {
    fill(this.list);

    this.list.insert(0,entries[2]);
    assert.deepEqual(this.list.getItem(0),entries[2]);

    this.list.insert(2,entries[0]);
    assert.deepEqual(this.list.getItem(2),entries[0]);

    var array=this.list.toArray();
    var e=entries.slice();
    e.splice(0,0,entries[2]);
    e.splice(2,0,entries[0]);
    assert.deepEqual(array,e);
  });

  QUnit.test("insert throw", function (assert) {
    fill(this.list);

    assert.throws(function() {
      this.list.insert(-1,entries[0]);
    },Error,"accessed negative index");
    assert.throws(function() {
      this.list.insert(entries.length+1,entries[0]);
    },Error,"accessed non existing element");
  });

  QUnit.test("delete valid", function (assert) {
    fill(this.list);

    this.list.delete(0);
    assert.notEqual(this.list.getItem(0),entries[0]);

    this.list.delete(2);
    assert.notEqual(this.list.getItem(2),entries[3]);

    var array=this.list.toArray();
    var e=entries.slice();
    e.splice(0,1);
    e.splice(2,1);
    assert.deepEqual(array,e);
  });

  QUnit.test("delete throw", function (assert) {
    fill(this.list);

    assert.throws(function() {
      this.list.delete(-1);
    },Error,"accessed negative index");
    assert.throws(function() {
      this.list.delete(entries.length);
    },Error,"accessed non existing element");
  });

  QUnit.test("remove valid", function (assert) {
    fill(this.list);

    this.list.remove(entries[0]);
    assert.deepEqual(this.list.indexOf(entries[0]),-1);

    this.list.remove(entries[2]);
    assert.deepEqual(this.list.indexOf(entries[2]),-1);

    var array=this.list.toArray();
    var e=entries.slice();
    e.splice(e.indexOf(entries[0]),1);
    e.splice(e.indexOf(entries[2]),1);
    assert.deepEqual(array,e);
  });

  QUnit.test("remove throw", function (assert) {
    fill(this.list);

    assert.throws(function() {
      this.list.remove("NOT EXISTING");
    },Error,"accessed negative index");
  });

  function addTest(name) {
    QUnit.test(name+" valid", function (assert) {
      fill(this.list);

      this.list[name](entries[0]);
      assert.deepEqual(this.list.getItem(entries.length),entries[0]);

      this.list[name](entries[2]);
      assert.deepEqual(this.list.getItem(entries.length+1),entries[2]);

      var array=this.list.toArray();
      var e=entries.slice();
      e.push(entries[0]);
      e.push(entries[2]);
      assert.deepEqual(array,e);
    });
  }

  addTest("add");
  addTest("push");
  addTest("enqueue");

  function addArray(name) {
    QUnit.test(name+" empty valid", function (assert) {
      fill(this.list);

      this.list[name]([]);
      assert.deepEqual(this.list.getSize(),entries.length);

      this.list[name]([]);
      assert.deepEqual(this.list.getSize(),entries.length);

      var array=this.list.toArray();
      var e=entries.slice();
      assert.deepEqual(array,e);
    });

    QUnit.test(name+" filled valid", function (assert) {
      fill(this.list);

      var arr1=entries.slice(3);
      this.list[name](arr1);
      assert.deepEqual(this.list.getSize(),entries.length+arr1.length);
      for (var i=0; i<arr1.length; i++) {
        assert.deepEqual(this.list.getItem(entries.length+i),arr1[i]);
      }

      var arr2=entries.slice(2);
      this.list[name](arr2);
      assert.deepEqual(this.list.getSize(),entries.length+arr1.length+arr2.length);
      for (var i=0; i<arr2.length; i++) {
        assert.deepEqual(this.list.getItem(entries.length+arr1.length+i),arr2[i]);
      }

      var array=this.list.toArray();
      var e=entries.slice();
      e=e.concat(entries.slice(3));
      e=e.concat(entries.slice(2));
      assert.deepEqual(array,e);
    });
  }

  addArray("addArray");
  addArray("pushArray");
  addArray("enqueueArray");

  function addList(name) {
    QUnit.test(name+" empty valid", function (assert) {
      fill(this.list);

      this.list[name](new List([]));
      assert.deepEqual(this.list.getSize(),entries.length);

      this.list[name](new List([]));
      assert.deepEqual(this.list.getSize(),entries.length);

      var array=this.list.toArray();
      var e=entries.slice();
      assert.deepEqual(array,e);
    });

    QUnit.test(name+" filled valid", function (assert) {
      fill(this.list);

      var arr1=entries.slice(3);
      this.list[name](new List(arr1));
      assert.deepEqual(this.list.getSize(),entries.length+arr1.length);
      for (var i=0; i<arr1.length; i++) {
        assert.deepEqual(this.list.getItem(entries.length+i),arr1[i]);
      }

      var arr2=entries.slice(2);
      this.list[name](new List(arr2));
      assert.deepEqual(this.list.getSize(),entries.length+arr1.length+arr2.length);
      for (var i=0; i<arr2.length; i++) {
        assert.deepEqual(this.list.getItem(entries.length+arr1.length+i),arr2[i]);
      }

      var array=this.list.toArray();
      var e=entries.slice();
      e=e.concat(entries.slice(3));
      e=e.concat(entries.slice(2));
      assert.deepEqual(array,e);
    });
  }

  addList("addList");
  addList("pushList");
  addList("enqueueList");

  function pop(name) {
    QUnit.test(name+" valid",function(assert) {
      fill(this.list);

      for (var i=entries.length-1; i>=0; i--) {
        this.list[name]();
        assert.deepEqual(this.list.indexOf(entries[i]),-1);
      }

      assert.deepEqual(this.list.getSize(),0);
      assert.deepEqual(this.list.toArray(),[]);
    });

    QUnit.test(name+" underflow", function(assert) {
      fill(this.list);

      for (var i=entries.length-1; i>=0; i--) {
        this.list[name]();
        assert.deepEqual(this.list.indexOf(entries[i]),-1);
      }

      assert.throws(function() {
        this.list[name]();
      },"testing underflow ("+name+" with zero elements)");
    });
  }

  pop("pop");
  pop("dequeue");

  QUnit.test("shift valid", function(assert) {
    fill(this.list);

    var value=this.list.shift();
    assert.deepEqual(entries[0],value,"checking returned value");
    assert.deepEqual(this.list.indexOf(entries[0]),-1);

    var e=entries.slice();
    e.shift();
    assert.deepEqual(this.list.toArray(),e);
  });

  QUnit.test("shift underflow", function(assert) {
    assert.throws(function() {
      this.list.shift();
    },Error,"testing underflow (shift with zero elements)");
  });

  QUnit.test("unshift valid",function(assert) {
    fill(this.list);

    var arr=entries.slice();
    for (var i=0; i<entries.length; i++) {
      this.list.unshift(entries[i]);
      arr.unshift(entries[i]);
      assert.deepEqual(this.list.indexOf(entries[i]),0);
    }

    assert.deepEqual(this.list.toArray(),arr);
  });

  QUnit.test("move valid",function(assert) {
    fill(this.list);

    this.list.move(0,entries.length-1);
    assert.deepEqual(this.list.getSize(),entries.length);
    assert.deepEqual(this.list.getItem(0),entries[1]);
    assert.deepEqual(this.list.getItem(entries.length-1),entries[0]);

    var e=entries.slice();
    e.splice(entries.length-1, 0, e.splice(0, 1)[0]);
    assert.deepEqual(this.list.toArray(),e);
  });

  QUnit.test("move src invalid",function(assert) {
    fill(this.list);

    assert.throws(function() {
      this.list.move(-1,entries.length-1);
    },Error);
    assert.deepEqual(this.list.getSize(),entries.length);

    var e=entries.slice();
    assert.deepEqual(this.list.toArray(),e);
  });

  QUnit.test("move dest invalid",function(assert) {
    fill(this.list);

    assert.throws(function() {
      this.list.move(0,entries.length);
    },Error);
    assert.deepEqual(this.list.getSize(),entries.length);

    var e=entries.slice();
    assert.deepEqual(this.list.toArray(),e);
  });

  QUnit.test("move src/dest invalid",function(assert) {
    fill(this.list);

    assert.throws(function() {
      this.list.move(-1,entries.length);
    },Error);
    assert.deepEqual(this.list.getSize(),entries.length);

    var e=entries.slice();
    assert.deepEqual(this.list.toArray(),e);
  });

  QUnit.test("exchange valid",function(assert) {
    fill(this.list);

    this.list.exchange(0,entries.length-1);
    assert.deepEqual(this.list.getSize(),entries.length);
    assert.deepEqual(this.list.getItem(0),entries[entries.length-1]);
    assert.deepEqual(this.list.getItem(entries.length-1),entries[0]);

    var e=entries.slice();
    var m=e[0];
    e[0]=e[entries.length-1];
    e[entries.length-1]=m;
    assert.deepEqual(this.list.toArray(),e);
  });

  QUnit.test("exchange src invalid",function(assert) {
    fill(this.list);

    assert.throws(function() {
      this.list.exchange(-1,entries.length-1);
    },Error);
    assert.deepEqual(this.list.getSize(),entries.length);

    var e=entries.slice();
    assert.deepEqual(this.list.toArray(),e);
  });

  QUnit.test("exchange dest invalid",function(assert) {
    fill(this.list);

    assert.throws(function() {
      this.list.exchange(0,entries.length);
    },Error);
    assert.deepEqual(this.list.getSize(),entries.length);

    var e=entries.slice();
    assert.deepEqual(this.list.toArray(),e);
  });

  QUnit.test("exchange src/dest invalid",function(assert) {
    fill(this.list);

    assert.throws(function() {
      this.list.exchange(-1,entries.length);
    },Error);
    assert.deepEqual(this.list.getSize(),entries.length);

    var e=entries.slice();
    assert.deepEqual(this.list.toArray(),e);
  });

  QUnit.test("indexOf found",function(assert) {
    fill(this.list);

    for (var i=0; i<entries.length; i++) {
      assert.deepEqual(this.list.indexOf(entries[i]),i);
    }
  });

  QUnit.test("indexOf found",function(assert) {
    fill(this.list);

    assert.deepEqual(this.list.indexOf("NOT EXISTING"),-1);
  });

  QUnit.test("getSize empty",function(assert) {
    assert.deepEqual(this.list.getSize(),0);
  });

  QUnit.test("getSize found",function(assert) {
    fill(this.list);

    assert.deepEqual(this.list.getSize(),entries.length);
  });

  QUnit.test("clear empty",function(assert) {
    this.list.clear();
    assert.deepEqual(this.list.getSize(),0);
  });

  QUnit.test("clear filled",function(assert) {
    fill(this.list);

    this.list.clear();

    assert.deepEqual(this.list.getSize(),0);
  });

  QUnit.test("toArray empty",function(assert) {
    assert.deepEqual(this.list.toArray(),[]);
  });

  QUnit.test("toArray filled",function(assert) {
    fill(this.list);

    assert.deepEqual(this.list.toArray(),entries);
  });


  QUnit.test("insertArray empty valid", function (assert) {
    fill(this.list);

    this.list.insertArray(0,[]);
    assert.deepEqual(this.list.getSize(),entries.length);

    this.list.insertArray(2,[]);
    assert.deepEqual(this.list.getSize(),entries.length);

    this.list.insertArray(entries.length-1,[]);
    assert.deepEqual(this.list.getSize(),entries.length);

    var e=entries.slice();
    assert.deepEqual(this.list.toArray(),e);
  });

  QUnit.test("insertArray filled valid", function (assert) {
    fill(this.list);

    //insert at begining
    var arr1=entries.slice(3);
    this.list.insertArray(0,arr1);
    assert.deepEqual(this.list.getSize(),entries.length+arr1.length,"testing size");
    for (var i=0; i<arr1.length; i++) {
      assert.deepEqual(this.list.getItem(i),arr1[i],"testing new entry "+i);
    }

    //insert middle
    var arr2=entries.slice(2);
    this.list.insertArray(2,arr2);
    assert.deepEqual(this.list.getSize(),entries.length+arr1.length+arr2.length,"testing size");
    for (var i=0; i<arr2.length; i++) {
      assert.deepEqual(this.list.getItem(2+i),arr2[i],"testing new entry "+i);
    }

    //insert at end
    var arr3=entries.slice(2);
    var size=this.list.getSize();
    this.list.insertArray(size,arr3);
    assert.deepEqual(this.list.getSize(),entries.length+arr1.length+arr2.length+arr3.length,"testing size");
    for (var i=0; i<arr3.length; i++) {
      assert.deepEqual(this.list.getItem(size+i),arr3[i],"testing new entry "+i);
    }

    var array=this.list.toArray();
    var e=entries.slice();
    e.splice.apply(e,[0,0].concat(arr1));
    e.splice.apply(e,[2,0].concat(arr2));
    e.splice.apply(e,[e.length,0].concat(arr3));
    assert.deepEqual(array,e);
  });

  QUnit.test("insertArray index invalid",function(assert) {
    fill(this.list);

    assert.throws(function() {
      this.list.insertArray(-1,[]);
    },Error);

    assert.throws(function() {
      this.list.insertArray(entries.length+1,[]);
    },Error);
  });


  QUnit.test("insertList empty valid", function (assert) {
    fill(this.list);

    this.list.insertList(0,new List([]));
    assert.deepEqual(this.list.getSize(),entries.length);

    this.list.insertList(2,new List([]));
    assert.deepEqual(this.list.getSize(),entries.length);

    this.list.insertList(entries.length-1,new List([]));
    assert.deepEqual(this.list.getSize(),entries.length);

    var e=entries.slice();
    assert.deepEqual(this.list.toArray(),e);
  });

  QUnit.test("insertList filled valid", function (assert) {
    fill(this.list);

    //insert at begining
    var arr1=entries.slice(3);
    this.list.insertList(0,new List(arr1));
    assert.deepEqual(this.list.getSize(),entries.length+arr1.length,"testing size");
    for (var i=0; i<arr1.length; i++) {
      assert.deepEqual(this.list.getItem(i),arr1[i],"testing new entry "+i);
    }

    //insert middle
    var arr2=entries.slice(2);
    this.list.insertList(2,new List(arr2));
    assert.deepEqual(this.list.getSize(),entries.length+arr1.length+arr2.length,"testing size");
    for (var i=0; i<arr2.length; i++) {
      assert.deepEqual(this.list.getItem(2+i),arr2[i],"testing new entry "+i);
    }

    //insert at end
    var arr3=entries.slice(2);
    var size=this.list.getSize();
    this.list.insertList(size,new List(arr3));
    assert.deepEqual(this.list.getSize(),entries.length+arr1.length+arr2.length+arr3.length,"testing size");
    for (var i=0; i<arr3.length; i++) {
      assert.deepEqual(this.list.getItem(size+i),arr3[i],"testing new entry "+i);
    }

    var array=this.list.toArray();
    var e=entries.slice();
    e.splice.apply(e,[0,0].concat(arr1));
    e.splice.apply(e,[2,0].concat(arr2));
    e.splice.apply(e,[e.length,0].concat(arr3));
    assert.deepEqual(array,e);
  });

  QUnit.test("insertList index invalid",function(assert) {
    fill(this.list);

    assert.throws(function() {
      this.list.insertList(-1,new List([]));
    },Error);

    var array=this.list.toArray();
    assert.deepEqual(array,entries);

    assert.throws(function() {
      this.list.insertList(entries.length+1,new List([]));
    },Error);

    array=this.list.toArray();
    assert.deepEqual(array,entries);
  });


  QUnit.test("deleteRange delete zero valid", function (assert) {
    this.list.deleteRange(0,0);
    assert.deepEqual(this.list.getSize(),0);

    fill(this.list);

    this.list.deleteRange(0,0);
    assert.deepEqual(this.list.getSize(),entries.length);

    this.list.deleteRange(3,0);
    assert.deepEqual(this.list.getSize(),entries.length);

    var array=this.list.toArray();
    var e=entries.slice();
    assert.deepEqual(array,e);
  });

  QUnit.test("deleteRange delete valid", function (assert) {
    fill(this.list);

    //delete from begining
    var arr1=entries.slice(2);
    this.list.deleteRange(0,2);
    assert.deepEqual(this.list.getSize(),arr1.length);
    assert.deepEqual(this.list.toArray(),arr1);

    //insert middle
    var arr2=arr1.slice();
    arr2.splice(1,1);
    this.list.deleteRange(1,1);
    assert.deepEqual(this.list.getSize(),arr2.length);
    assert.deepEqual(this.list.toArray(),arr2);

    //insert at end (list now contains 4 items)
    var arr3=arr2.slice();
    arr3.splice(2,2);
    this.list.deleteRange(2,2);
    assert.deepEqual(this.list.getSize(),arr3.length);
    assert.deepEqual(this.list.toArray(),arr3);
  });

  QUnit.test("deleteRange src invalid",function(assert) {
    fill(this.list);

    assert.throws(function() {
      this.list.deleteRange(-1,2);
    },Error);

    assert.throws(function() {
      this.list.deleteRange(entries.length,2);
    },Error);
  });

  QUnit.test("deleteRange count invalid",function(assert) {
    fill(this.list);

    assert.throws(function() {
      this.list.deleteRange(0,-1);
    },Error);
  });

  QUnit.test("deleteRange src/count invalid",function(assert) {
    fill(this.list);

    assert.throws(function() {
      this.list.deleteRange(-1,-1);
    },Error);

    assert.throws(function() {
      this.list.deleteRange(entries.length,-1);
    },Error);

    assert.throws(function() {
      this.list.deleteRange(-1,entries.length+1);
    },Error);

    assert.throws(function() {
      this.list.deleteRange(entries.length,-entries.length-1);
    },Error);
  });

  QUnit.test("deleteRange src&count out of bounds",function(assert) {
    fill(this.list);

    //last index + count
    assert.throws(function() {
      this.list.deleteRange(6,2);
    },Error);

    assert.throws(function() {
      this.list.deleteRange(5,3);
    },Error);
  });

}

testIList("List",function() {
  return new List();
});
