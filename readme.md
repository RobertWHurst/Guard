[![Circle CI](https://circleci.com/gh/RobertWHurst/Guard/tree/master.png?style=badge)](https://circleci.com/gh/RobertWHurst/Guard/tree/master)

Guard
=====

Guard is a simple type checker that aims to make it easier to check the types
of arguments or values in a function.

```
npm install type-guard
```

```javascript

var guard = require('type-guard');


function hello(name) {
  guard('name', name, 'string');
  console.log('Hello ' + name);
}

hello('Robert');
// Hello Robert

hello(1);
// GuardError: name must be a string
//     at hello (/Users/user/Developer/JS/hello.js:14:3)
//     at Object.<anonymous> (/Users/user/Developer/JS/hello.js:18:1)
//     at Module._compile (module.js:456:26)
//     at Object.Module._extensions..js (module.js:474:10)
//     at Module.load (module.js:356:32)
//     at Function.Module._load (module.js:312:12)
//     at Function.Module.runMain (module.js:497:10)
```
