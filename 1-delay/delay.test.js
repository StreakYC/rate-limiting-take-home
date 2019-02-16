import delay from './delay';

beforeEach(() => {
    jest.useFakeTimers();
});

it('returns a function', () => {

    const testFn = jest.fn();
    const delayed = delay(testFn, 100);        
    expect(typeof delayed).toBe("function");
});

it('delays calls the specified amount', () => {
    const testFn = jest.fn();
    const delayed = delay(testFn, 100);
    delayed();
    expect(testFn).not.toBeCalled();
    jest.advanceTimersByTime(50); //time is at 50
    expect(testFn).not.toBeCalled();
    jest.advanceTimersByTime(60); //time is at 110
    expect(testFn).toHaveBeenCalled(); //execution should have happened at t 1000
});

it('will delay multiple calls', () => {
    const testFn = jest.fn();

    const delayed = delay(testFn, 100);
    delayed(); // expect execution at 100
    jest.advanceTimersByTime(50);
    delayed(); // expect execution at 150
    jest.advanceTimersByTime(60); //put time to 110
    expect(testFn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(50);
    expect(testFn).toHaveBeenCalledTimes(2);
});

it('can delay different functions', () => {
    const testFn1 = jest.fn();
    const testFn2 = jest.fn();

    //construction
    const delayed1 = delay(testFn1, 100);
    const delayed2 = delay(testFn2, 200);

    delayed1();
    delayed2();

    jest.advanceTimersByTime(50); //time is now at 50

    delayed1();
    delayed2();

    jest.advanceTimersByTime(51); //time is now at 101
    expect(testFn1).toHaveBeenCalledTimes(1);
    expect(testFn2).not.toHaveBeenCalled();

    jest.advanceTimersByTime(51); //time is now at 152
    expect(testFn1).toHaveBeenCalledTimes(2);
    expect(testFn2).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50); //time is now at 202
    expect(testFn1).toHaveBeenCalledTimes(2);
    expect(testFn2).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(50); //time isn ow at 252
    expect(testFn1).toHaveBeenCalledTimes(2);
    expect(testFn2).toHaveBeenCalledTimes(2);

});
