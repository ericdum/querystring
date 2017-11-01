qs = require("./index");
expect = require("expect.js");

describe("querystring", function(){
  it("normal: ?a=1&b=2", function(){
    expect(qs("a=1&b=2")).to.be.eql({
      a:1,
      b:2
    });
    expect(qs.parse("a=1&b=2")).to.be.eql({
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
  it("array encoded: ?a=1&b%5B%5D=1&b%5B%5D=2&c=3", function(){
      expect(qs("a=1&b%5B%5D=1&b%5B%5D=2&c=3")).to.be.eql({
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
    it("array with single value encoded: ?a=1&b%5B%5D=1&c=3", function(){
        expect(qs("a=1&b%5B%5D=1&c=3")).to.be.eql({
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
  it("object of number key encoded: ?a=1&b%5B1%5D=1&c%5B3%5D=2&c=3", function(){
      expect(qs("a=1&b%5B1%5D=1&c%5B3%5D=2&c=3")).to.be.eql({
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
  it("object with single key encoded: ?a=1&b%5Beric%5D=dum&c%5Bstive%5D=jobs&c=3", function(){
      expect(qs("a=1&b%5Beric%5D=dum&c%5Bstive%5D=jobs&c=3")).to.be.eql({
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
    it("object with multiple key encoded: ?a=1&b%5Beric%5D=dum&b%5Bstive%5D=jobs&c=3", function(){
        expect(qs("a=1&b%5Beric%5D=dum&b%5Bstive%5D=jobs&c=3")).to.be.eql({
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
    it("array in object encoded: ?a=1&b%5Beric%5D%5B%5D=dum&b%5Bstive%5D%5B%5D=jobs&b%5Bstive%5D%5B%5D=fans&c=3", function(){
        expect(qs("a=1&b%5Beric%5D%5B%5D=dum&b%5Bstive%5D%5B%5D=jobs&b%5Bstive%5D%5B%5D=fans&c=3")).to.be.eql({
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
    it("x.y%5Bc%5D%5B$d%5D=3m&x.y%5Ba%5D%5B%5D=c&x.y%5Bb%5D%5B%5D=1&x2.y2%5Bc%5D%5B$d%5D=3m&x.y3%5Bc%5D%5B$d%5D=3m&x.y3%5Ba%5D=c&x.y3%5Bb%5D%5B%5D=1 encoded", function(){
        expect(qs("x.y%5Bc%5D%5B$d%5D=3m&x.y%5Ba%5D%5B%5D=c&x.y%5Bb%5D%5B%5D=1&x2.y2%5Bc%5D%5B$d%5D=3m&x.y3%5Bc%5D%5B$d%5D=3m&x.y3%5Ba%5D=c&x.y3%5Bb%5D%5B%5D=1")).to.be.eql({
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
  it("escape: ?a=1&b=2", function(){
    expect(qs.stringify({
      a:'中',
      b:'文'
    })).to.be.eql("a=%E4%B8%AD&b=%E6%96%87");
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
  it("remove empty value", function(){
    expect(qs.stringify({
      "xxx":{
        "yyy":[],
      },
      "zzz": {},
      "www": '',
      z:0,
      x:1,
      y:2
    })).to.be.eql("z=0&x=1&y=2");
  })
});
