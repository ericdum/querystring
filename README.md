querystring
===========

parse query string as object and array like php does

###Usage

install in shell

```shell
npm install query-string-object
```

in js file

```javascript
qs = require('query-string-object')
qs('xx=yy&zz..') // just like what is pass to the native qs.parse
```

###Expects

####a=1&b=2

output

```
{
  a:1,
  b:2 
}
```

####a=1&b[]=1&b[]=2&c=3

output

```
({
  a: 1,
  b: [1, 2],
  c: 3
});
```

####a=1&b[]=1&c=3

output

```
({
  a: 1,
  b: [1],
  c: 3
});
```

####a=1&b[1]=1&c[3]=2&c=3

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

####a=1&b[eric]=dum&c[stive]=jobs&c=3

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

####a=1&b[eric]=dum&b[stive]=jobs&c=3

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

####a=1&b[eric][]=dum&b[stive][]=jobs&b[stive][]=fans&c=3

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