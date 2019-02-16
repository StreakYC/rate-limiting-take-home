/*

Takes in two parameters ```fn (a function)``` and ```time (number of milliseconds)```. 

Returns a function ```retFn``` that upholds the following two invariants:

1) For every call to ```retFn``` there is a call to ```fn``` that is invoked 
    as soon as possible

2) There must be _at least_ ```time``` milliseconds between calls 
    to ```fn```. You can think of this behavior as being similar to 
    ```throttle``` except where throttle "throws away" calls to ```retFn``` 
    that come in too fast, ```rateLimit``` will queue them up and execute them 
    in order at the soonest possible moment.


*/


export default function rateLimit(fn, time) {
    
}