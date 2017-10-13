SimpleStore.js

SimpleStore.js is a dead simple state manager for JavaScript and Node. It's
intended to be isomorphic, discreet, and there for you in a pinch when more
robust state managers like Redux are too much for the project.

The best part? It's only 3.9kb (< 2kb gzipped). So you can safely include it in
almost any context without exploding page sizes.

# API

SimpleStore.js exports a function that returns a state manager. That's it. That
manager controls its own watchers, the store, and all of the other pageantry you
may expect in such a tool.

```js
import createStore from "simple-state-js"

const myState = createStore()

// Optional, if you're in the browser
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

SimpleStore.js relies on `node-deep-equal` to compare objects that are passed in
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

```
    const firstStore = createStore({ a: 1 }),
          secondStore = creteStore({ a: 2 })
    
    console.log(firstStore.get('a'))        // -> 1
    console.log(secondStore.get('a'))       // -> 2
```