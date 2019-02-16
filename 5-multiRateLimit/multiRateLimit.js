/*

Takes in three parameters ```fn (a function)``` and ```time (number of milliseconds)```. 

Returns a function ```retFn``` that implements a more generalized 
version of rate limiting above. When invoked ```retFn``` upholds 
the following two invariants: 

1) For every call to ```retFn``` there is a call to ```fn``` that happens as soon as possible

2) Within any window of ```time``` milliseconds there is *at most* 
    ```numInWindow``` calls to ```fn```.

*/

export default function multiRateLimit(fn, time, numInWindow) {

    

}