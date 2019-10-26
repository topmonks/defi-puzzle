//
import createStore from './store';

test('It werks', () => {
    const yes = true;
    expect(yes).toBe(true);
});

test('Can be created and has necessary methods', () => {
    const store = createStore();
    expect(typeof store.getState).toBe('function');
    expect(typeof store.dispatch).toBe('function');
    expect(typeof store.useHandlers).toBe('function');
});

test('Uses initial state', () => {
    const store = createStore({ foo: true, bar: false });
    const state = store.getState();
    expect(state.foo).toBe(true);
    expect(state.bar).toBe(false);
});

test('Basic handled action', () => {
    const { useHandlers, dispatch, getState } = createStore({
        count: 0,
    });

    useHandlers({
        HeyHoaw: () => {
            return { say: 'Hello' };
        },
        Increment: ({ currentState: { count } }) => {
            count++;
            return { count };
        },
    });

    dispatch('HeyHoaw');
    expect(getState().say).toBe('Hello');

    dispatch('Increment');
    dispatch('Increment');
    dispatch('Increment');
    expect(getState().count).toBe(3);
});

test('Callback called on state update', () => {
    expect.assertions(3);

    const callback = jest.fn();
    const store = createStore(
        {
            foo: false,
            bar: false,
        },
        callback,
    );

    store.useHandlers({
        UpdateNow: () => {
            return { foo: true };
        },
        UpdateLater: ({ update }) => {
            update({ bar: true });
        },
    });

    store.dispatch('UpdateNow');
    store.dispatch('UpdateLater');

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, { foo: true, bar: false });
    expect(callback).toHaveBeenNthCalledWith(2, { foo: true, bar: true });
});

test('Async handled actions', async () => {
    expect.assertions(4);

    const store = createStore({
        foo: false,
        bar: false,
    });

    store.useHandlers({
        Update: async ({ payload }) => {
            // idk how top fake async calls in jest
            await new Promise(resolve => {
                resolve();
            });

            return payload;
        },
    });

    let state = await store.dispatch('Update', { bar: true });
    expect(state.foo).toBe(false);
    expect(state.bar).toBe(true);

    state = await store.dispatch('Update', { foo: true });
    expect(state.foo).toBe(true);
    expect(state.bar).toBe(true);
});

test('Dispatches in handler', async () => {
    expect.assertions(4);

    const callback = jest.fn();
    const store = createStore({ foo: false }, callback);

    store.useHandlers({
        Action: async ({ dispatch, update }) => {
            await dispatch('Modal', true);
            update({ foo: true });
            await dispatch('Modal', false);
        },
        Modal: ({ payload }) => {
            return { modal: payload };
        },
    });

    await store.dispatch('Action');

    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenNthCalledWith(1, { foo: false, modal: true });
    expect(callback).toHaveBeenNthCalledWith(2, { foo: true, modal: true });
    expect(callback).toHaveBeenNthCalledWith(3, { foo: true, modal: false });
});

test('Context shared between handlers', async () => {
    expect.assertions(1);

    const store = createStore({ foo: false });

    store.useHandlers({
        First: ({ context }) => {
            context({ foo: true });
            return true;
        },
        Second: ({ context }) => {
            expect(context.foo).toBe(true);
            return true;
        },
    });

    await store.dispatch('First');
    await store.dispatch('Second');
});
