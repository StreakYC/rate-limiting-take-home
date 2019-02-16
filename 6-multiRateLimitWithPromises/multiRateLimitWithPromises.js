/*

Takes in three parameters ```fn (a function)``` and ```time (number of milliseconds)```. 

Returns a function ```retFn``` that implements a more generalized version of multi rate 
limiting above. When invoked ```retFn``` upholds the following invariants:

1) parameters used when calling ```retFn``` will be passed to the 
    corresponding call to ```fn```

2) ```retFn``` returns a promise when invoked that will resolve to the value that the corresponding call to ```fn``` returns

3) For every call to ```retFn``` there is a call to ```fn``` that happens as 
    soon as possible

4) Within any window of ```time``` milliseconds there is at most ```numInWindow``` 
    promises returned by ```retFn``` that will be instantiated or be in a pending state 
    for any amount of time in that window. *This last point is extremely important* as 
    this makes the function have very different semantics than all previous functions. 
    In other functions we don't care how long a function is "active" for and it's just 
    the number of times a function is called that we care about. However with this 
    multiRateLimitWithPromise we now care how long a function takes, i.e. ```fn``` may 
    return a promise and we care when that promise resolves. Think of rate 
    limiting the number of ajax requests. So if you kind of graphed it out if 
    you had time extend along the X-axis then a function being active with be a 
    "bar" along that X-axis. The idea is that if you take a sliding window of 
    time ms (100 in this case) and moved it along the X-axis you'd never have more 
    than "numInWindow" bars inside that window.

*/

export default function multiRateLimitWithPromises(fn, time, numInWindow) {
    
}