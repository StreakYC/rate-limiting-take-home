import lolex from 'lolex';

import multiRateLimit from './multiRateLimitWithPromises';

function expectPromise(obj){
    expect(obj instanceof Promise).toBeTruthy();
}


const clock = lolex.install();

it('returns a function', () => {
    const testFn = jest.fn();
    const wrapped = multiRateLimit(testFn, 100, 2);
    expect(typeof wrapped).toBe("function");
});

it('wrapped returns a promise', () => {
    const testFn = jest.fn();
    const wrapped = multiRateLimit(testFn, 100, 2);
    const returnValue = wrapped();

    expectPromise(returnValue);
});

it('rate limits and preserves values', async (done) => {

    const testFn = jest.fn((resolveTo, timeToWait) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(resolveTo);
            }, timeToWait);
        });
    });

    const wrapped = multiRateLimit(testFn, 100, 2);

    wrapped('a', 50);
    wrapped('b', 55);
    wrapped('c', 125);
    wrapped('d', 5);
    wrapped('e', 7);
    wrapped('f', 165);

    expect(testFn).toHaveBeenCalledTimes(2);
    expectPromise(testFn.mock.results[0].value);
    expectPromise(testFn.mock.results[1].value);

    clock.tick(50); //time is at 50
    expect(await testFn.mock.results[0].value).toBe('a');
    clock.tick(5); //time is at 55
    expect(await testFn.mock.results[1].value).toBe('b');
    expect(testFn).toHaveBeenCalledTimes(2);

    clock.tick(45); //time is at 100
    expect(testFn).toHaveBeenCalledTimes(2);

    clock.tick(50); //time is at 150
    expect(testFn).toHaveBeenCalledTimes(3); //result of 3rd call ('c') should be available at time 275

    clock.tick(5); //time is at 155
    expect(testFn).toHaveBeenCalledTimes(4); //result of 4th call ('d') should be available at 160
    
    clock.tick(5); //time is 160
    expect(await testFn.mock.results[3].value).toBe('d');

    clock.tick(100); //time is 260
    expect(testFn).toHaveBeenCalledTimes(5); //result of 5th call ('e') should be available at 267

    clock.tick(7); //time is 267
    expect(await testFn.mock.results[4].value).toBe('e');

    clock.tick(8); //time is 275
    expect(await testFn.mock.results[2].value).toBe('c');

    clock.tick(92); //time is 367
    expect(testFn).toHaveBeenCalledTimes(6); //result of 6th call ('f') should be available at 367+165 = 532

    clock.tick(165); //time is 532
    expect(await testFn.mock.results[5].value).toBe('f');

    done();
});
