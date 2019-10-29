import * as React from 'react';
import { initializeStore } from './configureStore';
import { Provider } from 'react-redux';

export const withRedux = (
    PageComponent: any,
    { ssr = true } = {},
) => {
    const WithRedux = ({ initialReduxState, ...props }: any) => {
        const store = getOrInitializeStore(initialReduxState);

        return (
            <Provider store={store} >
                <PageComponent {...props} />
            </Provider>
        );
    }

    if (ssr || PageComponent.getInitialProps) {
        WithRedux.getInitialProps = async (context: any) => {
            const reduxStore = getOrInitializeStore();
            context.reduxStore = reduxStore

            const pageProps =
                typeof PageComponent.getInitialProps === 'function'
                    ? await PageComponent.getInitialProps(context)
                    : {}

            return {
                ...pageProps,
                initialReduxState: reduxStore.getState()
            }
        }
    }

    return WithRedux
}

let reduxStore: any;
const getOrInitializeStore = (initialState?: any) => {
    if (typeof window === 'undefined') {
        return initializeStore(initialState)
    }

    if (!reduxStore) {
        reduxStore = initializeStore(initialState)
    }

    return reduxStore
}
