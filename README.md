# Streak Javascript Coding Challenge

We do a lot of functional-style asynchronous Javascript programming here at Streak. The intention of this challenge is to see if you can write this type of JS code.

The way the challenge is structured is to implement various utility functions that are already defined. These utility functions range from very easy to very difficult. The scaffolding + tests are already setup so your only responsibility is to implement the function bodies.

If any of the definitions are unclear as to behavior of the uility function then look at the unit tests to see how the utiitity function should be used and the precise behavior expected.

## Functions to be Implemented (easiest first, hardest at the bottom)

## delay(fn, time)


Takes in two parameters ```fn (a function)``` and ```time (number of milliseconds)```. 

Returns a function ```retFn``` that when called will call the passed in ```fn``` function after ```time``` has elapsed.

## debounce(fn, time)

Takes in two parameters ```fn (a function)``` and ```time (number of milliseconds)```. 

Returns a function ```retFn``` that delays invoking ```fn``` until after ```time``` has elapsed from the *last* time ```retFn``` was invoked.

## throttle(fn, time)

Takes in two parameters ```fn (a function)``` and ```time (number of milliseconds)```. 

Returns a function ```retFn``` that invokes ```fn``` at most once every ```time``` milliseconds. More specifically when ```retFn``` is invoked then ```fn``` is invoked immediately, except if there's been less than ```time``` milliseconds elapsed from the last time ```retFn``` was called, in which case, do nothing.

## rateLimit(fn, time)

Takes in two parameters ```fn (a function)``` and ```time (number of milliseconds)```. 

Returns a function ```retFn``` that upholds the following two invariants:

1) For every call to ```retFn``` there is a call to ```fn``` that is invoked as soon as possible
2) There must be _at least_ ```time``` milliseconds between calls to ```fn```. You can think of this behavior as being similar to ```throttle``` except where throttle "throws away" calls to ```retFn``` that come in too fast, ```rateLimit``` will queue them up and execute them in order at the soonest possible moment.

## multiRateLimit(fn, time, numInWindow)

Takes in three parameters ```fn (a function)``` and ```time (number of milliseconds)```. 

Returns a function ```retFn``` that implements a more generalized version of rate limiting above. When invoked ```retFn``` upholds the following two invariants: 
1) For every call to ```retFn``` there is a call to ```fn``` that happens as soon as possible
2) Within any window of ```time``` milliseconds there is *at most* ```numInWindow``` calls to ```fn```.

## multiRateLimitWithPromises(fn, time, numInWindow)

Takes in three parameters ```fn (a function)``` and ```time (number of milliseconds)```. 

Returns a function ```retFn``` that implements a more generalized version of multi rate limiting above. When invoked ```retFn``` upholds the following invariants:

1) parameters used when calling ```retFn``` will be passed to the corresponding call to ```fn```
2) ```retFn``` returns a promise when invoked that will resolve to the value that the corresponding call to ```fn``` returns
3) For every call to ```retFn``` there is a call to ```fn``` that happens as soon as possible
4) Within any window of ```time``` milliseconds there is at most ```numInWindow``` promises returned by ```retFn``` that will be instantiated or be in a pending state for any amount of time in that window. *This last point is extremely important* as this makes the function have very different semantics than all previous functions. In other functions we don't care 
how long a function is "active" for and it's just the number of times a function is called that we care about. However with this multiRateLimitWithPromise we now care how long a function takes, i.e. ```fn``` may return a promise and we care when that promise resolves. Think of rate limiting the number of ajax requests. So if you kind of graphed it out if you had time extend along the X-axis then a function being active with be a "bar" along that X-axis. The idea is that if you take a sliding window of time ms (100 in this case) and moved it along the X-axis you'd never have more than "numInWindow" bars inside that window.

# How to take the challenge

You need to have the latest versions of babel (https://babeljs.io/), npm (https://www.npmjs.com/), and node (https://nodejs.org/en/) installed.

1. clone repo to your local machine
2. run ```npm i``` to install dependencies
3. implement the function bodies and test with ```npm test```
4. commit your changes and push to github as your own repo (don't fork because that will show up on THIS repo under the "forks" list)
5. email us with a link to your repo and some information on how long it took to complete the exercise

# Tips

* there's a large jump in complexity and difficulty from ```throttle``` to ```rateLimit```
* ```multiRateLimitWithPromises``` is also a lot more difficult than regular ```multiRateLimit```
* you don't have to implement all the functions if you don't want to, completing a harder function will count as also completing all the easier functions. So if you want to implement only ```multiRateLimitWithPromises``` and you do it successfully that counts as completing all the questions.
* testing uses jest (https://jestjs.io/) under the hood, so while developing if you just want to run one function you can do ```npm test delay``` or ```npm test multiRateLimit``` and it will only run that test file
* there's a VS Code launch.json file included that should be properly configured so you should be able to use VS Code's built in debugger
* if you use VS Code's built in debugger and want to debug just one test, then start the debugger while the X.test.js file is active and choose ```jest current file``` config.
* don't spend a ton of time on this. *Really* experienced people who have seen these problems before may be able to finish the entire challenge in under 30 minutes. If you're spending 3+ hours completing this challenge that's probably an indication you're not a good fit for what we're looking for right now
* the unit tests are quote thorough and cover some tricky cases, if you're confused about some behavior look at what the unit tests are expecting