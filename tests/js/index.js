
testIEditor=function(name,genInstance,values) {

  QUnit.module(name,{
    beforeEach:function(assert) {
      //create editor
      this.editor=genInstance();
    },
    afterEach:function(assert) {
    }
  });

  /* test that the IEditor interface is implemented
   */
  QUnit.test("interface",function(assert) {
    var missing=Interface.$test(this.editor,IEditor);
    assert.deepEqual(
      missing,
      [],
      "IEditor interface is not implemented (missing: "+missing.join(", ")+")");
  });

  /* test if getDom works
   */
  QUnit.test("getDom", function (assert) {
    //modify gui & append to document
    var dom=this.editor.getDom();

    assert.notEqual(dom,undefined);
  });

  QUnit.test("get value undefined", function (assert) {
    var value=this.editor.getValue();

    //should be undefined, because we did not set a value
    assert.equal(value,undefined,"got an result in an error state");
  });

  QUnit.test("get value set undefined", function (assert) {
    //set a valid value first
    this.editor.setValue(values.simple.value);
    //set to undefined after
    this.editor.setValue(undefined);

    var value=this.editor.getValue();

    //should be undefined, because we did not set a value
    assert.equal(value,undefined,"got an result in an error state");
  });

  for (var i in values) {
    var val=values[i];
    (function(val) {
      QUnit.test("set get value test_"+i, function (assert) {
        this.editor.setValue(val.value);
        var value=this.editor.getValue();

        assert.deepEqual(value,val.result,"recived a modified value from the editor");
      });
    })(val);

  }

}

var test_obj={
  name:"list1",
  items:[
    100.5,
    123.3,
    433.3,
    [
      32E2,
      "test",
      {
        "4":true
      }
    ]
  ],
  filepath:null
};

/*
//operates with json strings
testIEditor("JSONEditor"        ,function() { return new JSONEditor();         },{
  simple:default_obj,
  complex:test_obj
});
*/
//operates with json objects
testIEditor("JSONArrayEditor"   ,function() { return new JSONArrayEditor();   },{
  simple:{
    value:[],
    result:[]
  },
  complex:{
    value:[1,undefined,"test",3.3,null],
    result:[1,undefined,"test",3.3,null]
  }
});

testIEditor("JSONObjectEditor"  ,function() { return new JSONObjectEditor();   },{
  simple:{
    value:{},
    result:{}
  },
  complex:{
    value:test_obj,
    result:test_obj
  }
});

testIEditor("JSONNullEditor"  ,function() { return new JSONNullEditor();   },{
  simple:{
    value:null,
    result:null
  },
  error:{
    value:"433io",
    result:undefined
  }
});

testIEditor("JSONNumberEditor"  ,function() { return new JSONNumberEditor();   },{
  simple:{
    value:0,
    result:0
  },
  complex:{
    value:45,
    result:45
  },
  error:{
    value:"433io",
    result:undefined
  }
});

testIEditor("SimpleStringEditor",function() { return new SimpleStringEditor(); },{
  simple:{
    value:"",
    result:""
  },
  complex:{
    value:"123 QWERwe_.$",
    result:"123 QWERwe_.$"
  }
});
//operates with multiple json object types
testIEditor("JSONDynamicNode"      ,function() { return new JSONDynamicNode();       },{
  simple:{
    value:{},
    result:{}
  },

  simple_obj:{
    value:{},
    result:{}
  },
  complex_obj:{
    value:test_obj,
    result:test_obj
  },

  simple_arr:{
    value:[],
    result:[]
  },
  complex_arr:{
    value:[test_obj,"string",[1,2,3,"4"],null],
    result:[test_obj,"string",[1,2,3,"4"],null]
  },

  simple_num:{
    value:0,
    result:0
  },
  complex_num:{
    value:123.321E2,
    result:123.321E2
  },

  simple_str:{
    value:"",
    result:""
  },
  complex_str:{
    value:"test1 test2 \n test3",
    result:"test1 test2 \n test3"
  },

  simple_null:{
    value:null,
    result:null
  }
});