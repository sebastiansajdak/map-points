import responseParser from '../../responseParsers';

const apiResponseParser = (store: any) => (next: any) => (action: any) => {
    if (responseParser[action.type]) {
        next({
            type: action.type,
            payload: responseParser[action.type](action.payload),
        });
    } else {
        next(action);
    }
}

export default apiResponseParser;
