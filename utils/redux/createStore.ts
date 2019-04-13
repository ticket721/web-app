import { createStore, applyMiddleware, Reducer, Store, compose } from 'redux';
import createSagaMiddleware                                     from 'redux-saga';
import { State }                                                from 'ethvtx/lib/state';
import { configureVtx, getInitialState, getReducers, getSagas } from 'ethvtx';
import '../misc/window';
import { Saga }                                                 from '@redux-saga/types';
import { AppState, InitialAppState } from './app_state';
import { LocalSettingsReducer }      from './local_settings/reducers';
import { AppReducer }            from './app/reducers';
import { LocalSettingsSaga }     from './local_settings/sagas';
import { AppSaga }               from './app/sagas';
import { RemoteSettingsReducer } from './remote_settings/reducers';
import { RemoteSettingsSaga }    from './remote_settings/sagas';
import { VtxContract }           from 'ethvtx/lib/contracts/VtxContract';
import { LWManager }             from './LWManager';
import { LWTXReducer }           from './lwtransactions/reducers';
import { StrapiCacheSaga }       from './strapi_cache/sagas';
import { StrapiCacheReducer }    from './strapi_cache/reducers';

/**
 * Configures the store, merges reducers and sagas
 */
export function configureStore(): Store<State> {

    const initial_state: AppState = configureVtx(getInitialState<AppState>(InitialAppState), {
        confirmation_threshold: 2,
        poll_timer: 300
    });
    const reducers: Reducer<AppState> = getReducers({
        local_settings: LocalSettingsReducer,
        remote_settings: RemoteSettingsReducer,
        app: AppReducer,
        lwtx: LWTXReducer,
        strapi_cache: StrapiCacheReducer
    });
    const sagaMiddleware = createSagaMiddleware();
    const composer = global.window && global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

    const store: Store<AppState> = createStore(
        reducers,
        initial_state,
        composer(applyMiddleware(sagaMiddleware))
    );

    const saga: Saga = getSagas(store, [
        LocalSettingsSaga,
        RemoteSettingsSaga,
        AppSaga,
        StrapiCacheSaga
    ]);

    (store as any).runSagaTask = (): void => {
        (store as any).sagaTask = sagaMiddleware.run(saga);
    };

    (store as any).runSagaTask();

    VtxContract.init(store);
    LWManager.init(store);

    return store;
}
