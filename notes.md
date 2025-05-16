# Personal Notes
## Hooks
Hooks have two rules
1. They have to be called at the top level. You cannot call them inside some conditional etc. You must make sure they are called whenever a component function is rendered.
2. Only call hooks inside component functions. You musn't call hooks outside of the component function. Onlt exception would be custom hooks. Custom hooks can call hooks inside of it.

# Rendering
Rendering is not the same thing with browser update. It means calling the component function. Everytime a state of a component changes, it gets re-rendered. Re-rendering does not mean all of the ui of a component gets rebuilt by the browser. Reconciliation will update only the what is changed.

# Effects
Function given as a parameter to useEffect will be called after the rest of the component function is executed. Returned method could from the effect could be used as ngDestroy if it does not have any dependency but it gets called each time before the effect gets executed if it has dependencies.