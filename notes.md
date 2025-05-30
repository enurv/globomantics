# Personal Notes

## State

Use useState for data that changes over time and needs to trigger a re-render.

## Hooks

Hooks have two rules

1. They have to be called at the top level. You cannot call them inside some conditional etc. You must make sure they are called whenever a component function is rendered.
2. Only call hooks inside component functions. You musn't call hooks outside of the component function. Onlt exception would be custom hooks. Custom hooks can call hooks inside of it.

## Rendering

Rendering is not the same thing with browser update. It means calling the component function. Everytime a state of a component changes, it gets re-rendered. Re-rendering does not mean all of the ui of a component gets rebuilt by the browser. Reconciliation will update only the what is changed.

## Effects

Function given as a parameter to useEffect will be called after the rest of the component function is executed during mounting. Returned method from the effect could be used as ngDestroy if it does not have any dependency but it gets called each time before the effect gets executed if it has dependencies.

useEffect is for automatic, lifecycle-driven effects (like fetching data).
User actions (like posting data) are handled by functions called in response to events, not in useEffect.

## Use (New feature)

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

## Memo

useMemo hook can be used to memoize the result of performance heavy functions with their dependency listed like useEffect. It will get run on first render and when the dependencies changes. You shouldn't use useMemo for every operation because of the overhead of the hook.

```
const result = useMemo(() => {
    return timeConsumingCalculation(houses);
}, [houses])
```

When to use:
When you want to avoid expensive recalculations or to keep the same reference for objects/functions between renders unless dependencies change. Use useMemo for derived values or objects/functions that you want to keep the same reference unless dependencies change, especially to optimize performance or prevent unnecessary re-renders.

## Ref

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

## Callback

useCallback prevents children to re-render each time parent is re-rendered by memoizing the reference of some methods that is given as a prop. It works like an effect. It gets created first when the component mounted and gets re-created if any of it's dependencies change. setState calls does not have to be wrapped with useCallBack because React make sure to keep their reference.

You only need useCallback if you want to memoize a function that is passed to children or used as a dependency elsewhere. For internal helper functions  it’s fine to define them normally.

## Custom Hooks

A custom hook is a function which can accept any parameter and return anything you want. When a custom hook is reused, state for each call is isolated. (not singleton). They can be use to abstract business or state management logic from components.

## Context

useContext defines the data api. Component that holds the state and and manages it returning context provider is similar to service instance. useContext is like injecting the service. Creating a wrapper hook around useContext is for dealing with default values and reduce repetitive code. Components that are usıng a context will be re-rendered when context values are changed.

### Context optimization

### Example 1: Non-Optimized Context Value

```tsx
const [current, setCurrent] = useState(navValues.home);

<navigationContext.Provider value={{ current, setCurrent }}>
  {children}
</navigationContext.Provider>;
```

**How it works:**

- On every render, `{ current, setCurrent }` creates a new object.
- Even if `current` and `setCurrent` haven't changed, the object reference is new.
- All context consumers re-render on every parent render, even if the value is the same.

---

### Example 2: Optimized (Stable) Context Value

```tsx
const navigate = useCallback(
  (navTo: string) => setNav({ current: navTo, navigate }),
  []
);
const [nav, setNav] = useState({ current: navValues.home, navigate });

<navigationContext.Provider value={nav}>{children}</navigationContext.Provider>;
```

**How it works:**

- The entire context value (`nav`) is stored in state.
- The reference to `nav` only changes when you call `setNav` (i.e., when navigation changes).
- On unrelated parent renders, the reference to `nav` stays the same.
- Context consumers only re-render when navigation actually changes.

---

### Step-by-Step Comparison

| Step | Non-Optimized Version (`{ current, setCurrent }`) | Optimized Version (`{ current, navigate }` in state)       |
| ---- | ------------------------------------------------- | ---------------------------------------------------------- |
| 1    | Parent renders                                    | Parent renders                                             |
| 2    | New object `{ current, setCurrent }` is created   | `nav` object reference stays the same unless changed       |
| 3    | Context value reference changes                   | Context value reference only changes if navigation changes |
| 4    | All consumers re-render, even if nothing changed  | Consumers re-render **only** if navigation changes         |

---

**Summary:**

- If you pass a new object as context value on every render, all consumers will re-render every time.
- If you keep the context value reference stable (by storing it in state or memoizing it), consumers only re-render when necessary.
- This improves performance and avoids unnecessary updates.

### Alternative Approach

```
function App() {
  const [current, setCurrent] = useState(navValues.home);

  // Memoize the navigation function
  const navigate = useCallback(
    (navTo: string) => setCurrent(navTo),
    []
  );

  // Memoize the context value object
  const contextValue = useMemo(
    () => ({
      current,
      navigate,
    }),
    [current, navigate]
  );

  return (
    <navigationContext.Provider value={contextValue}>
      <ErrorBoundary fallback="Something went wrong">
        <Banner>"Providing houses all over the world"</Banner>
        <ComponentPicker currentNavLocation={current} />
      </ErrorBoundary>
    </navigationContext.Provider>
  );
}

export default App;
```

Read more at https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions

## Forms
### Text Area

textarea input normally works like

```
<textarea>
  Some text
</textarea>
```
but in jsx it works similar to input

`<textarea value={state} onChange={change} />`

### Select

select input normally works like

```
<select>
  <option value="option1">1</option>
  <option selected value="option2">2</option>
</select>
```

but in jsx it works similar to input
```
<select value={state} onChange={change}>
  <option value="option1">1</option>
  <option value="option2">2</option>
</select>
```

### File

File input is uncontrolled and needs to be defined with useRef()

```
const Form = () => {
  const inputEl = useRef(null);
  const submit = (e) => {
    e.preventDefault();
    const selectedFile = inputEl.current.files[0].name;
    //process selectedFile
  }

  return (
    <form onSubmit={submit}>
      <input ref={inputEl} type="file" />
      <input type="submit" value="Submit" />
    </form>
  );
}
```

## Transition

When you use useTransition it gives you two outputs. One is pending state and the other is a method that takes an action. When you run an action (addBid in this case) while it is executing React will set isPending to true. This hook will run the action in the backgorund keeping the UI from freezing. It can be used whenever changing state is likely to take some time. It will improve the responsiveness of your application. Async action are only supported after React 19.

```
const [isPending, startTransition] = useTransition();

const onBidSubmitClick = () => { 
  startTransition(async () => await addBid(newBid));
  setNewBid(emptyBid);
};
```