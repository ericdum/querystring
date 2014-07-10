qs = require("./index");
expect = require("expect.js");

describe("querystring", function(){
  it("normal", function(){
    expect(qs("a=1&b=2")).to.be.eql({a:1,b:2});
  })
  it("normal", function(){
    expect(qs("a=1&b[1]=1&c[3]=2&c=3")).to.be.eql({a:1,b:{1:1},c:{3:2}});
  })
  it("normal", function(){
    expect(qs("a=1&b[eric]=dum&c[stive]=jobs&c=3")).to.be.eql({a:1,b:{eric:"dum"},c:{stive:"jobs"}});
  })
  it("normal", function(){
    expect(qs("a=1&b[][eric]=dum&c[][stive]=jobs&c=3")).to.be.eql({a:1,b:[{eric:"dum"}],c:[{"stive":"jobs"}]});
  })
});
