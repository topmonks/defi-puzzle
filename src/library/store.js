// import { EventEmitter } from 'fbemitter';

/**
 *
 * @param {Function} callback
 * @param {Object} initialState
 */
export default function createStore(initialState = {}, callback = () => {}) {
    let _state = initialState;

    const _handlers = new Map();
    const _context = references => {
        Object.keys(references).forEach(name => {
            // if (_context[name]) console.warn('Context override alert.');
            _context[name] = references[name];
        });
    };

    const update = updates =>
        (window.__debug && console.log('update', updates)) ||
        new Promise(resolve => {
            _state = { ..._state, ...updates };
            callback(_state);
            resolve(_state);
            if (window.__debug) window.__state = _state;
        });

    const dispatch = (actionName, payload = null) =>
        (window.__debug && console.log(actionName, payload)) ||
        new Promise(resolve => {
            // console.log('action', actionName, payload);

            if (_handlers.has(actionName) === false) {
                console.warn(`Not handler action "${actionName}"`, payload);
                return void 0;
            }

            const updates = _handlers.get(actionName)({
                payload,
                context: _context,
                dispatch,
                currentState: _state,
                update: updates => update(updates).then(resolve),
            });

            if (updates?.then) updates.then(update).then(resolve);
            else if (updates) update(updates).then(resolve);
            else if (updates === true) resolve(_state);
        });

    return {
        getState() {
            return _state;
        },

        // add getContext / setContext methods if needed

        /**
         * Dispatch main method
         *   called like dispatch('ActionHandlerName', payload);
         *
         * @param {String} actionName
         * @param {Object} payload
         */
        dispatch,

        useHandlers({ ...handlers }) {
            for (const name in handlers) {
                const handler = handlers[name];
                // not allows now to use more handlers for same action
                if (_handlers.has(name)) {
                    console.warn(`Handler "${name}" override alert`);
                }
                _handlers.set(name, handler);
            }
        },
    };
}
