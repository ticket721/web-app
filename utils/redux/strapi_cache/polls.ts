import { VtxPollCb }                                from 'ethvtx/lib/state';
import { AppState, StrapiCacheCallReturnFragment }  from '../app_state';
import { Dispatch }                                 from 'redux';
import { StrapiCacheSetData, StrapiCacheSetHeight } from './actions';

const fetch_height = async (state: AppState): Promise<number> => {

    if (!state.app.strapi) return 0;

    const entry: { id: number; height: number; } = await state.app.strapi.getEntry('heights', '1') as any;
    return entry.height as number;
};

const height_fetcher_poll: VtxPollCb = async (state: AppState, emit: Dispatch, new_block: boolean): Promise<void> => {

    try {

        const height = await fetch_height(state);

        if (height > state.strapi_cache.height) {
            emit(StrapiCacheSetHeight(height));
        }

    } catch (e) {
        // TODO Critical error management
    }

};

export const height_fetcher = {
    interval: 10,
    poll: height_fetcher_poll
};

const data_fetcher_poll: VtxPollCb = async (state: AppState, emit: Dispatch, new_block: boolean): Promise<void> => {

    const current_height = state.strapi_cache.height;

    for (const call of Object.keys(state.strapi_cache.calls)) {
        if (state.strapi_cache.calls[call].height < current_height && state.strapi_cache.calls[call].required) {
            const payload = await state.strapi_cache.calls[call].call();
            const result = payload.map((fragment: StrapiCacheCallReturnFragment): string => fragment.hash);

            emit(StrapiCacheSetData(result, payload, call, current_height));
        }
    }

};

export const data_fetcher = {
    interval: 3,
    poll: data_fetcher_poll
};
