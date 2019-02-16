import lolex from 'lolex';

import rateLimit from './rateLimit';

const clock = lolex.install();

it('returns a function', () => {
    const testFn = jest.fn();
    const wrapped = rateLimit(testFn, 100);        
    expect(typeof wrapped).toBe("function");
});

it('executes right away', () => {
    const testFn = jest.fn();
    const wrapped = rateLimit(testFn, 100);

    wrapped();
    expect(testFn).toHaveBeenCalled();
    clock.tick(101);

    wrapped();
    expect(testFn).toHaveBeenCalledTimes(2);
});

it('will rateLimit multiple calls', () => {
    const testFn = jest.fn();

    const wrapped = rateLimit(testFn, 100);
    wrapped();
    clock.tick(50); // put time to 50
    wrapped();
    clock.tick(60); //put time to 110
    wrapped();
    expect(testFn).toHaveBeenCalledTimes(2);
    clock.tick(101) //put time to 211
    expect(testFn).toHaveBeenCalledTimes(3);
});

it('can rateLimit different functions', () => {
    const testFn1 = jest.fn();
    const testFn2 = jest.fn();

    //construction
    const wrapped1 = rateLimit(testFn1, 100);
    const wrapped2 = rateLimit(testFn2, 200);

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


    clock.tick(50); //time is now at 302
    expect(testFn1).toHaveBeenCalledTimes(4);
    expect(testFn2).toHaveBeenCalledTimes(2);

    clock.tick(100); //time is now at 402
    expect(testFn1).toHaveBeenCalledTimes(5);
    expect(testFn2).toHaveBeenCalledTimes(3);

    clock.tick(100); //time is now at 502
    expect(testFn1).toHaveBeenCalledTimes(6);
    expect(testFn2).toHaveBeenCalledTimes(3);

    clock.tick(100); //time is now at 602
    expect(testFn1).toHaveBeenCalledTimes(6);
    expect(testFn2).toHaveBeenCalledTimes(4);

    clock.tick(200); //time is now at 802
    expect(testFn1).toHaveBeenCalledTimes(6);
    expect(testFn2).toHaveBeenCalledTimes(5);

    clock.tick(200); //time is now at 802
    expect(testFn1).toHaveBeenCalledTimes(6);
    expect(testFn2).toHaveBeenCalledTimes(6);

    clock.tick(300); //time is now at 1102
    wrapped1();
    wrapped2();
    expect(testFn1).toHaveBeenCalledTimes(7);
    expect(testFn2).toHaveBeenCalledTimes(7);
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

    wrapped = rateLimit(testFn, 100);
    wrapped();
    expect(testFn).toHaveBeenCalledTimes(1);
    clock.tick(100);
    expect(testFn).toHaveBeenCalledTimes(2);

});