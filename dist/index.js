const deepEqual = require("deep-equal")

const createStore = module.exports = function (initialState = {})
{
    return {
        // Our actual state object. Do not mutate state directly!!
        _store: initialState,
        
        // Our watchers, with the signature:
        // {
        //  'myKey': [
        //      ['watcherId' || false, watcherFunction],
        //      ...
        //  ]
        // }
        _watchers: {},

        // Returns a copy of the store
        getStore()
        {
            return Object.assign({}, this._store)
        },

        // Gets the value of a piece of state (undefined if the element isn't
        // available)
        get(element)
        {
            if(typeof this._store[element] == "object")
            {
                return Object.assign({}, this._store[element])
            }
            return this._store[element]
        },

        // Set a piece of state
        set(element, value)
        {
            const   oldState = typeof this._store[element] == "object" ?
                                Object.assign({}, this._store[element]) :
                                this._store[element],
                    equal = deepEqual(oldState, value),
                    newState = value

            if(!equal) {
                // Set the new state
                this._store[element] = newState
                
                // Load up watchers, if there are any
                if(this._watchers[element]) {
                    this._watchers[element].forEach(watcher => {
                        const fn = watcher[1]
                        fn(newState, oldState)
                    })
                }
            }
        },

        // Watch a part of your state
        watch(element, fn, id = false)
        {
            if(!this._watchers[element]) {
                this._watchers[element] = []
            }
            this._watchers[element].push([id, fn])
        },

        // De-register a watcher on an element. If you don't pass in an ID, it
        // removes all watchers.
        unwatch(element, id = false)
        {
            this._watchers[element] = id !== false ?
                this._watchers[element].filter(watcher => watcher[0] !== id) :
                this._watchers[element] = []
        }
    }
}

if(document) {
    document.SimpleStore = createStore
}