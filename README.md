# query-string-object [![Build Status](https://travis-ci.org/ericdum/querystring.svg?branch=master)](https://travis-ci.org/ericdum/querystring)

support object or array like php does: `?a[]=1&a[]=2 -> a=[1,2]` 

## Usage

install in shell

```shell
npm install query-string-object
```

in js file

```javascript
qs = require('query-string-object')
qs('xx=yy&zz..') // just like what is pass to the native qs.parse
qs.stringify({
  fInt: 1,
  fString: 'string',
  fObject: {
    anobject: {a:1, b:2},
    anything: 'thing'
  },
  fArray: [1,2,"string"]
}) 
// fInt=1&fString=string&fObject[anobject][a]=1&fObject[anobject][b]=2&fObject[anything]=thing&fArray[]=1&fArray[]=2&fArray[]=string
```

## Tests

```shell
npm install
npm test
```

## Expects

### a=1&b=2

output

```
{
  a:1,
  b:2 
}
```

### a=1&b[]=1&b[]=2&c=3

output

```
({
  a: 1,
  b: [1, 2],
  c: 3
});
```

### a=1&b[]=1&c=3

output

```
({
  a: 1,
  b: [1],
  c: 3
});
```

### a=1&b[1]=1&c[3]=2&c=3

output

```
({
  a: 1,
  b: {
    1: 1
  },
  c: {
    3: 2
  }
});
```

### a=1&b[eric]=dum&c[stive]=jobs&c=3

```
output
({
  a: 1,
  b: {
    eric: "dum"
  },
  c: {
    stive: "jobs"
  }
});
```

### a=1&b[eric]=dum&b[stive]=jobs&c=3

output

```
({
  a: 1,
  b: {
    eric: "dum",
    stive: "jobs"
  },
  c: 3
});
```

### a=1&b[eric][]=dum&b[stive][]=jobs&b[stive][]=fans&c=3

output

```
({
  a: 1,
  b: {
    eric: ["dum"],
    stive: ["jobs", "fans"]
  },
  c: 3
});
```
