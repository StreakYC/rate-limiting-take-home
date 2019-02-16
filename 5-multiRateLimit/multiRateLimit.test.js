import lolex from 'lolex';

import multiRateLimit from './multiRateLimit';


const clock = lolex.install();

it('returns a function', () => {
    const testFn = jest.fn();
    const wrapped = multiRateLimit(testFn, 100, 2);
    expect(typeof wrapped).toBe("function");
});

it('executes right away', () => {
    const testFn = jest.fn();
    const wrapped = multiRateLimit(testFn, 100, 2);

    wrapped();
    wrapped();
    expect(testFn).toHaveBeenCalledTimes(2);
    clock.tick(101);

    wrapped();
    wrapped();
    expect(testFn).toHaveBeenCalledTimes(4);
});

it('will rateLimit multiple calls', () => {
    const testFn = jest.fn();

    const wrapped = multiRateLimit(testFn, 100, 2);
    wrapped();
    expect(testFn).toHaveBeenCalledTimes(1);
    clock.tick(50); // put time to 50
    wrapped();
    wrapped(); //should be queued up
    expect(testFn).toHaveBeenCalledTimes(2);
    clock.tick(60); //put time to 110
    wrapped(); //should be queued up
    expect(testFn).toHaveBeenCalledTimes(3);
    clock.tick(50) //put time to 160
    expect(testFn).toHaveBeenCalledTimes(4);


    clock.tick(1005); //put time to 1165
    wrapped();
    expect(testFn).toHaveBeenCalledTimes(5);
});

it('can rateLimit different functions', () => {
    const testFn1 = jest.fn();
    const testFn2 = jest.fn();

    //construction
    const wrapped1 = multiRateLimit(testFn1, 100, 2);
    const wrapped2 = multiRateLimit(testFn2, 200, 2);

    wrapped1();
    wrapped1();
    wrapped1();
    wrapped1();

    wrapped2();
    wrapped2();
    wrapped2();
    wrapped2();

    expect(testFn1).toHaveBeenCalledTimes(2);
    expect(testFn2).toHaveBeenCalledTimes(2);

    clock.tick(101);
    expect(testFn1).toHaveBeenCalledTimes(4);
    expect(testFn2).toHaveBeenCalledTimes(2);

    clock.tick(101);
    expect(testFn1).toHaveBeenCalledTimes(4);
    expect(testFn2).toHaveBeenCalledTimes(4);
    
});

