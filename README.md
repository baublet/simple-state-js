SimpleStore.js

SimpleStore.js is a dead simple state manager for JavaScript and Node. It's
intended to be isomorphic, discreet, and there for you in a pinch when more
robust state managers like Redux are too much for the project.

The best part? It's only 3.9kb (< 1.3kb gzipped). So you can safely include it
in almost any context without exploding page sizes.

# API

SimpleStore.js exports a function that returns a state manager. That's it. That
manager controls its own watchers, the store, and all of the other pageantry you
may expect in such a tool.

```js
import createStore from "simple-state-js"

const myState = createStore()

// Optional, if you're in the browser. Once you set it, you can use your state
// manager anywhere. Just use document.appState.get/set/watch, etc.
document.appState = myState



// To set a node
myState.set('myKey', "Hello, sir!")



// To get that node
console.log(myState.get('myKey'))   // -> Hello, sir!



// To watch a node for changes
myState.watch('myKey', (newState, oldState) => {
    console.log(newState)
})



myState.set('myKey', "Foo bar.")    // -> Foo bar.
```

SimpleStore.js relies on `fast-deep-equal` to compare objects that are passed in
as key values to decide when to update the state and watchers. Therefore, if your
state key is a fairly large object and you need to fully replace it (e.g., from
an API request), you can safely do so without having to worry about everything
updating.

## Watchers

Watchers are stored by a key and value so that they can be removed or replaced.

```js
myState.set('myKey', 'Foo bar!')

myState.watch('myKey', newState => {
    console.log('Watcher is on!')
}, 'myWatcher')

myState.set('myKey', "Hello world")     // -> Watcher is on!

myState.unwatch('myKey', 'myWatcher')

myState.set('myKey', "Foo bar!")        // -> (Outputs nothing)
```

## Multiple State Objects

Although it's not recommended, you can setup multiple state objects.

```js
    const firstStore = createStore({ a: 1 }),
          secondStore = creteStore({ a: 2 })
    
    console.log(firstStore.get('a'))        // -> 1
    console.log(secondStore.get('a'))       // -> 2
```

## Contributing

Find bugs? Want to add a new feature? I accept pull requests that live up to
SimpleStore.js' values:

- Simple -- features must not add unnecessary complexity and bloat
- Discreet -- use outside dependencies sparingly, and only slim, well-designed ones
- Isomorphic -- nothing will be accepted that is not isomorphic
- Small -- This module will never be more than 1.5kb gzipped and uglified
  - To measure the change to the end file size of your branch, use the [Clojure Compiler on default settings](http://closure-compiler.appspot.com/home)

### Testing

```
    git clone https://github.com/baublet/simple-state-js.git
    npm install
    npm test
```