import React              from 'react';
import App, { Container } from 'next/app';
import { Provider }       from 'react-redux';
import withRedux          from 'next-redux-wrapper';
import withReduxSaga      from 'next-redux-saga';
import { canUseDOM }      from 'exenv';
import { Store }          from 'redux';
import getConfig          from 'next/config';

// @web_components imports
import NavBar             from '@web_components/navbar';

// @utils imports
import { configureStore }   from '@utils/redux/createStore';
import { setupApp }         from '@utils/redux/setupApp';
import { onClient }         from '@utils/misc/onClient';
import {
    AppConfig,
    AppState
}                           from '@utils/redux/app_state';
import { I18N, namespaces } from '@utils/misc/i18n';

// Style imports
import '@utils/styles/default_fonts.css';

// App
class T721App extends App {

    static async getInitialProps({Component, router, ctx}: any): Promise<any> {
        let pageProps: any = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        // Inject env variables into SSR
        pageProps.CONFIG = getConfig().publicRuntimeConfig.env as AppConfig;

        // Fetch correct required namespaces depending on route
        pageProps.namespacesRequired = namespaces[router.route];

        return {pageProps};
    }

    render(): React.ReactNode {
        const {Component, pageProps}: any = this.props;
        let {store}: { store: Store<AppState> } = this.props as any;

        if (canUseDOM) {
            if (global.window.__T721_REDUX_STORE__ === undefined) {
                global.window.__T721_REDUX_STORE__ = store;
                onClient(setupApp)(store, pageProps.CONFIG);
            } else {
                store = global.window.__T721_REDUX_STORE__;
            }
        }

        return <Container>
            <Provider store={store}>
                <NavBar>
                    <Component {...pageProps}/>
                </NavBar>
            </Provider>
        </Container>;
    }
}

export default withRedux(configureStore)(I18N.appWithTranslation(withReduxSaga(T721App)));
