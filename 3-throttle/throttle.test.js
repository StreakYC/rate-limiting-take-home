import lolex from 'lolex';

import throttle from './throttle';


const clock = lolex.install();

it('returns a function', () => {
    const testFn = jest.fn();
    const wrapped = throttle(testFn, 100);        
    expect(typeof wrapped).toBe("function");
});

it('executes right away', () => {
    const testFn = jest.fn();
    const wrapped = throttle(testFn, 100);

    wrapped();
    expect(testFn).toHaveBeenCalled();
    clock.tick(101);

    wrapped();
    expect(testFn).toHaveBeenCalledTimes(2);
});

it('will throttle multiple calls', () => {
    const testFn = jest.fn();

    const wrapped = throttle(testFn, 100);
    wrapped();
    clock.tick(50);
    wrapped();
    clock.tick(60); //put time to 110
    wrapped();
    expect(testFn).toHaveBeenCalledTimes(2);
});

it('can throttle different functions', () => {
    const testFn1 = jest.fn();
    const testFn2 = jest.fn();

    //construction
    const wrapped1 = throttle(testFn1, 100);
    const wrapped2 = throttle(testFn2, 200);

    wrapped1();
    wrapped2();
    expect(testFn1).toHaveBeenCalledTimes(1);
    expect(testFn2).toHaveBeenCalledTimes(1);

    clock.tick(50); //time is now at 50
    wrapped1();
    wrapped2();
    expect(testFn1).toHaveBeenCalledTimes(1);
    expect(testFn2).toHaveBeenCalledTimes(1);

    clock.tick(51); //time is now at 101
    wrapped1();
    wrapped2();
    expect(testFn1).toHaveBeenCalledTimes(2);
    expect(testFn2).toHaveBeenCalledTimes(1);

    clock.tick(51); //time is now at 152
    wrapped1();
    wrapped2();
    expect(testFn1).toHaveBeenCalledTimes(2);
    expect(testFn2).toHaveBeenCalledTimes(1);

    clock.tick(50); //time is now at 202
    wrapped1();
    wrapped2();
    expect(testFn1).toHaveBeenCalledTimes(3);
    expect(testFn2).toHaveBeenCalledTimes(2);

    clock.tick(50); //time is now at 252
    wrapped1();
    wrapped2();
    expect(testFn1).toHaveBeenCalledTimes(3);
    expect(testFn2).toHaveBeenCalledTimes(2);

});

it('can handle re-entrant behavior', () => {
    let numTimesRun = 0;

    let wrapped;
    let testFn = jest.fn(() => {
        if(numTimesRun < 2){
            numTimesRun++;
            wrapped();
            numTimesRun++;
        }
    });

    wrapped = throttle(testFn, 100);
    wrapped();
    expect(testFn).toHaveBeenCalledTimes(1);

});
