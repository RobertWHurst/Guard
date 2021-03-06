[![Circle CI](https://circleci.com/gh/RobertWHurst/Guard/tree/master.png?style=badge)](https://circleci.com/gh/RobertWHurst/Guard/tree/master)

Guard
=====

Guard is a simple type checker function that aims to make it easier to check 
the types of arguments or values in a function. When a guard finds an invalid
value it throws an error. The error thrown has a modified stack trace that
originates from where guard was called to make for easier debugging.

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

# Docs

## guard()

```
guard(string:key, *:val, string:type) => undefined
```
The guard function accepts a key, the name of your argument, a value, the
argument itself, and a type. The supported types are `object`, `string`,
`boolean`, `number`, `array`, `regexp`, `date`, `function`, `null`, and
`undefined`.
