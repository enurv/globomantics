# Personal Notes

## Hooks

Hooks have two rules

1. They have to be called at the top level. You cannot call them inside some conditional etc. You must make sure they are called whenever a component function is rendered.
2. Only call hooks inside component functions. You musn't call hooks outside of the component function. Onlt exception would be custom hooks. Custom hooks can call hooks inside of it.

# Rendering

Rendering is not the same thing with browser update. It means calling the component function. Everytime a state of a component changes, it gets re-rendered. Re-rendering does not mean all of the ui of a component gets rebuilt by the browser. Reconciliation will update only the what is changed.

# Effects

Function given as a parameter to useEffect will be called after the rest of the component function is executed during mounting. Returned method could from the effect could be used as ngDestroy if it does not have any dependency but it gets called each time before the effect gets executed if it has dependencies.

# Use (New feature)

React 19 introduced 19 to work with async operations: use(). It is not a hook and can be used anywhere inside the component. It takes a promise as a parameter and puts the component in a suspended mode while waiting result to be resolved. You can wrap the component with suspended so you can show loading fallback when the component in a suspended state.

App.tsx

```
<Suspense fallback={<h3>Loading...</h3>}>
    <HouseList />
</Suspense>
```

HouseList.tsx

```
const fetchHouses = fetch("https://localhost:4000/house")
  .then(r => r.json());

const HouseList = () => {
  const houseResult = use(fetchHouses);
  const [houses, setHouses] = useState(houseResult);
}
```

There is a problem with this code. Promise is outside of the component function. It will be created just once for the entire lifecycle of the application so when HouseList is rerendered or used elsewehere data will not be reloaded (will act like cached). Moving the creation of the of the proise inside the component will not fix the problem because it creates an infinite loop. When the state changes component will re-render and create a new promise that will change the state. Right now there are external libraries that solves these problems such as Tanstack Query.

# Memo

useMemo hook can be used to memoize the result of performance heavy functions with their dependency listed like useEffect. It will get run on first render and when the dependencies changes. You shouldn't use useMemo for every operation because of the overhead of the hook.

```
const result = useMemo(() => {
    return timeConsumingCalculation(houses);
}, [houses])
```

# Ref

useRef hook is used to persist data between re-renders just like state but changing a ref does not trigger re-render. When a reference type is passed to useRef this hook guarantees the same reference is returned across re-renders. It is mostly used for holding the element ref just like Angular's template reference variables.

```
const TextInputWithFocusButton = () => {
    const inputEl = useRef(null);
    const onButtonClick = () => inputEl.current.focus();
    return (
        <>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    )
}
```
# Callback
useCallback prevents children to re-render each time parent is re-rendered by memoizing the reference of some methods that is given as a prop. It works like an effect. It gets created first when the component mounted and gets re-created if any of it's dependencies change. setState calls does not have to be wrapped with useCallBack because React make sure to keep their reference.

# Custom Hooks
A custim hook is a function which can accept any parameter and return anything you want. Whena custom hook is reused, state for each call is isolated. (not singleton)