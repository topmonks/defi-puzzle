import { EventEmitter } from 'fbemitter';

export default function createStore(callback, initialState = {}) {
    const emitter = new EventEmitter();
    let _state = initialState;

    const _reducers = [];
    const _context = references => {
        Object.keys(references).forEach(name => {
            _context[name] = references[name];
        });
    };

    emitter.addListener('update', callback);

    const updateLater = updates => {
        _state = {
            ..._state,
            ...updates,
        };
        emitter.emit('update');
    };

    /**
     * @param {String} type Action type
     * @param {*} payload action payload
     */
    const dispatch = (type, payload) => {
        setTimeout(() => {
            _state = reducer({ type, payload }, _state);
            emitter.emit('update');
        }, 0); // dispatch has to be asynchronous
    };

    const reducer = (action, currentState) =>
        _reducers.reduce((state, handlers) => {
            const handlerNames = Object.keys(handlers);

            // No changes, dont update
            if (handlerNames.includes(action.type) === false) {
                return state;
            }

            const updates = handlers[action.type]({
                payload: action.payload,
                update: updateLater,
                context: _context,
                currentState: _state,
                dispatch,
            });

            // It's a promise! Update state later...
            if (typeof updates?.then === 'function') {
                updates.then(updateLater);
                return state;
            }

            // Immediately apply state update
            return { ...state, ...updates };
        }, currentState);

    return {
        getState() {
            return _state;
        },

        dispatch,

        useReducer(reducer) {
            _reducers.push(reducer);
        },
    };
}
