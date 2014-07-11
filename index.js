native_qs = require("querystring");

module.exports = function(query) {
  if( ! query ) return {};
  if( typeof query == 'string' ) {
    if( ! query.match(/\[\w*\]/) ) return native_qs.parse(query);
    query = native_qs.parse(query);
  }
  return parse( query )
}

function parse( query ){
  var dirty = false;
  for( var key in query ) {
    var value = query[key];
    if( matches = key.match(/^([\w\[\]]+)(\[\w*\])$/) ){
      var parent = matches[1];
      var child = matches[2];
      if( child.match(/^\[\s*\]$/) ) {
        if( value instanceof Array ) query[parent] = value
        else query[parent] = [value]
      } else {
        if( !(query[parent] instanceof Object) ) query[parent] = {};
        child = child.replace(/[\[\] ]/g, "");
        query[parent][child] = value
      }
      delete query[key]
      dirty = true
    }
  }
  return dirty ? parse(query) : query
}
