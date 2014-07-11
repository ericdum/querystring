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
    query[key] = numberfy(query[key]);
    var value = query[key];
    if( matches = key.match(/^([\w\[\]]+)(\[\w*\])$/) ){
      if( matches[2].match(/^\[\s*\]$/) ) {
        if( value instanceof Array ) query[matches[1]] = value
        else query[matches[1]] = [value]
      } else {
        if( !(query[matches[1]] instanceof Object) ) query[matches[1]] = {};
        matches[2] = matches[2].replace(/[\[\] ]/g, "");
        query[matches[1]][matches[2]] = value
      }
      delete query[key]
      dirty = true
    }
  }
  return dirty ? parse(query) : query
}

function numberfy( string ) {
  if( typeof value == "string" && value.match(/^\s*(?:0x)?[\d.]+\s*$/) ){
    return parseFloat(value);
  }
  return string;
}
