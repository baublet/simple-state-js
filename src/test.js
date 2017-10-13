import createStore from "../lib/simple.store.js"

test('creates a store', () => {
    const store = createStore()
    expect(typeof store).toBe("object");
})

test('gets and sets properly', () => {
    const store = createStore()
    expect(store.get('myKey')).toBe(undefined)
    store.set('myKey', 'Test')
    expect(store.get('myKey')).toBe('Test')
    store.set('myKey', 'Foo')
    expect(store.get('myKey')).toBe('Foo')
})

test('creates a store with default state', () => {
    const store = createStore({ myKey: 'Test' })
    expect(store.get('myKey')).toBe('Test')
})

test('allows watchers to be set and used', () => {
    const store = createStore({ myKey: 'Test' })
    store.watch('myKey', newState => {
        expect(newState).toBe('Foo')
    })
    store.set('myKey', 'Foo')
})

test('watchers are not called if state is unchanged', done => {
    const store = createStore({ myKey: 'Test' })
    store.watch('myKey', newState => {
        expect(false).toBe(true)
    })
    store.set('myKey', 'Test')
    done()
})

test('watchers can be unwatched', () => {
    const store = createStore({ myKey: 'Test' })
    store.watch('myKey', () => {})
    expect(store._watchers['myKey'].length).toBe(1)
    store.watch('myKey', newState => {
        expect(false).toBe(true)
    }, 'myWatcher')
    expect(store._watchers['myKey'].length).toBe(2)
    store.unwatch('myKey', 'myWatcher')
    expect(store._watchers['myKey'].length).toBe(1)
    expect(store._watchers['myKey'][0][0]).toBe(false)
})

test('watchers can be fully unwatched', () => {
    const store = createStore({ myKey: 'Test' })
    store.watch('myKey', () => {})
    store.watch('myKey', () => {})
    store.watch('myKey', () => {})
    expect(store._watchers['myKey'].length).toBe(3)
    store.unwatch('myKey')
    expect(store._watchers['myKey'].length).toBe(0)
})

test('basic counter', () => {
    let counterValue = 0
    const store = createStore({ counter: counterValue })
    store.watch('counter', newValue => counterValue = newValue)
    expect(store.get('counter')).toBe(counterValue)
    store.set('counter', store.get('counter') + 1)
    expect(store.get('counter')).toBe(counterValue)
    store.set('counter', store.get('counter') - 1)
    expect(store.get('counter')).toBe(counterValue)
})