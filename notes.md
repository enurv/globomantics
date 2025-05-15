# Personal Notes
## Hooks
Hooks have two rules
1. They have to be called at the top level. You cannot call them inside some conditional etc. You must make sure they are called whenever a component function is rendered.
2. Only call hooks inside component functions. You musn't call hooks outside of the component function. Onlt exception would be custom hooks. Custom hooks can call hooks inside of it.