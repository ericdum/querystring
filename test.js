qs = require("./index");
expect = require("expect.js");

describe("querystring", function(){
  it("normal: ?a=1&b=2", function(){
    expect(qs("a=1&b=2")).to.be.eql({
      a:1,
      b:2
    });
  })
  it("array: ?a=1&b[]=1&b[]=2&c=3", function(){
    expect(qs("a=1&b[]=1&b[]=2&c=3")).to.be.eql({
      a:1,
      b:[1,2],
      c:3
    });
  })
  it("array with single value: ?a=1&b[]=1&c=3", function(){
    expect(qs("a=1&b[]=1&c=3")).to.be.eql({
      a:1,
      b:[1],
      c:3
    });
  })
  it("object of number key: ?a=1&b[1]=1&c[3]=2&c=3", function(){
    expect(qs("a=1&b[1]=1&c[3]=2&c=3")).to.be.eql({
      a:1,
      b:{1:1},
      c:{3:2}
    });
  })
  it("object with single key: ?a=1&b[eric]=dum&c[stive]=jobs&c=3", function(){
    expect(qs("a=1&b[eric]=dum&c[stive]=jobs&c=3")).to.be.eql({
      a:1,
      b:{
        eric:"dum"
      },
      c:{
        stive:"jobs"
      }
    });
  })
  it("object with multiple key: ?a=1&b[eric]=dum&b[stive]=jobs&c=3", function(){
    expect(qs("a=1&b[eric]=dum&b[stive]=jobs&c=3")).to.be.eql({
      a:1,
      b:{
        eric:"dum",
        stive:"jobs"
      }, 
      c:3
    });
  })
  it("array in object: ?a=1&b[eric][]=dum&b[stive][]=jobs&b[stive][]=fans&c=3", function(){
    expect(qs("a=1&b[eric][]=dum&b[stive][]=jobs&b[stive][]=fans&c=3")).to.be.eql({
      a:1,
      b:{
        eric:["dum"],
        stive: [
          "jobs",
          "fans"
        ]
      },
      c:3
    });
  })
  it("x.y[c][$d]=3m&x.y[a][]=c&x.y[b][]=1&x2.y2[c][$d]=3m&x.y3[c][$d]=3m&x.y3[a]=c&x.y3[b][]=1", function(){
    expect(qs("x.y[c][$d]=3m&x.y[a][]=c&x.y[b][]=1&x2.y2[c][$d]=3m&x.y3[c][$d]=3m&x.y3[a]=c&x.y3[b][]=1")).to.be.eql({
      'x.y': {
        c: {
          '$d': '3m'
        },
        a: ['c'],
        b: [1]
      },
      'x2.y2': {
        c: {
          '$d': '3m'
        }
      },
      'x.y3': {
        c: {
          '$d': '3m'
        },
        a: 'c',
        b: [1]
      }
    });
  })
});
describe("querystring.stringify", function(){
  it("normal: ?a=1&b=2", function(){
    expect(qs.stringify({
      a:1,
      b:2
    })).to.be.eql("a=1&b=2");
  })
  it("array: ?a=1&b[]=1&b[]=2&c=3", function(){
    expect(qs.stringify( {
      a:1,
      b:[1,2],
      c:3
    })).to.be.eql( "a=1&b[]=1&b[]=2&c=3" );
  })
  it("array with single value: ?a=1&b[]=1&c=3", function(){
    expect(qs.stringify( {
      a:1,
      b:[1],
      c:3
    })).to.be.eql( "a=1&b[]=1&c=3" );
  })
  it("object of number key: ?a=1&b[1]=1&c[3]=2&c=3", function(){
    expect(qs.stringify( {
      a:1,
      b:{1:1},
      c:{3:2}
    })).to.be.eql( "a=1&b[1]=1&c[3]=2" );
  })
  it("object with single key: ?a=1&b[eric]=dum&c[stive]=jobs&c=3", function(){
    expect(qs.stringify( {
      a:1,
      b:{
        eric:"dum"
      },
      c:{
        stive:"jobs"
      }
    })).to.be.eql( "a=1&b[eric]=dum&c[stive]=jobs" );
  })
  it("object with multiple key: ?a=1&b[eric]=dum&b[stive]=jobs&c=3", function(){
    expect(qs.stringify( {
      a:1,
      b:{
        eric:"dum",
        stive:"jobs"
      }, 
      c:3
    })).to.be.eql( "a=1&b[eric]=dum&b[stive]=jobs&c=3" );
  })
  it("array in object: ?a=1&b[eric][]=dum&b[stive][]=jobs&b[stive][]=fans&c=3", function(){
    expect(qs.stringify( {
      a:1,
      b:{
        eric:["dum"],
        stive: [
          "jobs",
          "fans"
        ]
      },
      c:3
    })).to.be.eql( "a=1&b[eric][]=dum&b[stive][]=jobs&b[stive][]=fans&c=3");
  })
  it("x.y[c][$d]=3m&x.y[a][]=c&x.y[b][]=1&x2.y2[c][$d]=3m&x.y3[c][$d]=3m&x.y3[a]=c&x.y3[b][]=1", function(){
    expect(qs.stringify({
      'x.y': {
        c: {
          '$d': '3m'
        },
        a: ['c'],
        b: [1]
      },
      'x2.y2': {
        c: {
          '$d': '3m'
        }
      },
      'x.y3': {
        c: {
          '$d': '3m'
        },
        a: 'c',
        b: [1]
      }
    })).to.be.eql("x.y[c][$d]=3m&x.y[a][]=c&x.y[b][]=1&x2.y2[c][$d]=3m&x.y3[c][$d]=3m&x.y3[a]=c&x.y3[b][]=1");
  })
  //*/
});
