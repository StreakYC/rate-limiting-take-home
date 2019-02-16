import debounce from './debounce';

beforeEach(() => {
    jest.useFakeTimers();
});

it('returns a function', () => {
    const testFn = jest.fn();
    const wrapped = debounce(testFn, 100);        
    expect(typeof wrapped).toBe("function");
});

it('delays for the specified amount', () => {
    const testFn = jest.fn();
    const wrapped = debounce(testFn, 100);
    wrapped();
    expect(testFn).not.toBeCalled();
    jest.advanceTimersByTime(50);
    expect(testFn).not.toBeCalled();
    jest.advanceTimersByTime(60);
    expect(testFn).toHaveBeenCalled();
});

it('will delay multiple calls', () => {
    const testFn = jest.fn();

    const wrapped = debounce(testFn, 100);
    wrapped(); // expect execution at 100
    jest.advanceTimersByTime(101);
    expect(testFn).toHaveBeenCalledTimes(1);
    
    wrapped();
    jest.advanceTimersByTime(101); //put time to 202
    expect(testFn).toHaveBeenCalledTimes(2);
});

it('will cancel calls properly', () => {
    const testFn = jest.fn();
    const wrapped = debounce(testFn, 100);

    wrapped();
    jest.advanceTimersByTime(50);
    wrapped();
    jest.advanceTimersByTime(51);
    expect(testFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(testFn).toHaveBeenCalledTimes(1);

    wrapped();
    jest.advanceTimersByTime(101);
    expect(testFn).toHaveBeenCalledTimes(2);
});

it('can debounce multiple functions', () => {
    const testFn1 = jest.fn();
    const testFn2 = jest.fn();

    //construction
    const wrapped1 = debounce(testFn1, 100);
    const wrapped2 = debounce(testFn2, 200);

    wrapped1();
    wrapped2();

    jest.advanceTimersByTime(50); //time is now at 50

    wrapped1();
    wrapped2();

    jest.advanceTimersByTime(51); //time is now at 101
    expect(testFn1).not.toHaveBeenCalled();
    expect(testFn2).not.toHaveBeenCalled();

    jest.advanceTimersByTime(51); //time is now at 152
    expect(testFn1).toHaveBeenCalledTimes(1);
    expect(testFn2).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50); //time is now at 202
    expect(testFn1).toHaveBeenCalledTimes(1);
    expect(testFn2).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50); //time isn ow at 252
    expect(testFn1).toHaveBeenCalledTimes(1);
    expect(testFn2).toHaveBeenCalledTimes(1);

});

