import {
    AppState,
    AppStatus,
    StrapiCacheCallReturnFragment,
    StrapiCacheDataFragment,
    StrapiCacheErrorFragment
}                                                     from './redux/app_state';
import { Dispatch }                                   from 'redux';
import keccak256                                      from 'keccak256';
import { StrapiCacheNewCall, StrapiCacheSetRequired } from './redux/strapi_cache/actions';

export type StrapiData = [number, string[], (StrapiCacheDataFragment | StrapiCacheErrorFragment)[]];
export type StrapiCallFn = (state: AppState, dispatch: Dispatch) => StrapiData;

/**
 * Used as props for the StrapiCall component.
 * Made to be usable in multiple places but still request only once.
 * Data is fetched only if call is rendered.
 * Each one of them returns associated block number for sub components to be able to decide if rendering is required
 */
export class StrapiHelper {

    /**
     * Registers the call on the strapi api on the redux store.
     * The request is refreshed only when block height is also updated.
     *
     * Will call strapi.getEntry(name, id)
     *
     * @param name
     * @param id
     */
    public static getEntry(name: string, id: string): StrapiCallFn {

        return (state: AppState, dispatch: Dispatch): StrapiData => {

            if (state.app.status !== AppStatus.Ready || !state.app.strapi) {
                return [-1, [], []];
            }

            const hash: string = StrapiHelper.getEntry_signature(name, id);

            const call_data = state.strapi_cache.calls[hash];

            if (call_data === undefined) {

                // Create call
                const cb = async (): Promise<StrapiCacheCallReturnFragment[]> => {
                    try {
                        const data = await state.app.strapi.getEntry(name, id);
                        const fragment_hash = StrapiHelper.fragment_signature(name, id);
                        return [{
                            hash: fragment_hash,
                            data: {
                                data
                            }
                        }];
                    } catch (e) {
                        const error_hash = StrapiHelper.error_signature(name, id);
                        return [{
                            hash: error_hash,
                            data: {
                                error: e
                            }
                        }];
                    }
                };

                dispatch(StrapiCacheNewCall(hash, cb));

                return [-1, [], []];

            } else {

                if (call_data.required === false) {
                    dispatch(StrapiCacheSetRequired(hash));
                }

                return [call_data.height, call_data.result, call_data.result.map((fragment_hash: string): (StrapiCacheErrorFragment | StrapiCacheDataFragment) =>
                    state.strapi_cache.fragments[fragment_hash])];

            }

        };

    }

    /**
     * Registers the call on the strapi api on the redux store.
     * The request is refreshed only when block height is also updated.
     *
     * Will call strapi.getEntries(name, args)
     *
     * @param name
     * @param args
     */
    public static getEntries(name: string, args: any): StrapiCallFn {

        return (state: AppState, dispatch: Dispatch): StrapiData => {

            if (state.app.status !== AppStatus.Ready || !state.app.strapi) {
                return [-1, [], []];
            }

            const hash: string = StrapiHelper.getEntries_signature(name, args);

            const call_data = state.strapi_cache.calls[hash];

            if (call_data === undefined) {

                // Create call
                const cb = async (): Promise<StrapiCacheCallReturnFragment[]> => {
                    try {
                        const data = await state.app.strapi.getEntries(name, args);

                        return data.map((fragment: any): StrapiCacheCallReturnFragment => ({
                            hash: StrapiHelper.fragment_signature(name, fragment.id),
                            data: {
                                data: fragment
                            }
                        }));
                    } catch (e) {
                        const error_hash = StrapiHelper.entries_error_signature(name, args);
                        return [{
                            hash: error_hash,
                            data: {
                                error: e
                            }
                        }];
                    }
                };

                dispatch(StrapiCacheNewCall(hash, cb));

                return [-1, [], []];

            } else {

                if (call_data.required === false) {
                    dispatch(StrapiCacheSetRequired(hash));
                }

                return [call_data.height, call_data.result, call_data.result.map((fragment_hash: string): (StrapiCacheErrorFragment | StrapiCacheDataFragment) =>
                    state.strapi_cache.fragments[fragment_hash])];

            }

        };

    }

    /**
     * Registers the call on the strapi api on the redux store.
     * The request is refreshed only when block height is also updated.
     *
     * Will call strapi.getEntryCount(name, args)
     *
     * @param name
     * @param args
     */
    public static getEntryCount(name: string, args: any): StrapiCallFn {

        return (state: AppState, dispatch: Dispatch): StrapiData => {

            if (state.app.status !== AppStatus.Ready || !state.app.strapi) {
                return [-1, [], []];
            }

            const hash: string = StrapiHelper.getEntryCount_signature(name, args);

            const call_data = state.strapi_cache.calls[hash];

            if (call_data === undefined) {

                // Create call
                const cb = async (): Promise<StrapiCacheCallReturnFragment[]> => {
                    try {
                        const data = await state.app.strapi.getEntryCount(name, args);

                        const fragment_hash = StrapiHelper.fragment_signature(name, 'size');
                        return [{
                            hash: fragment_hash,
                            data: {
                                data
                            }
                        }];
                    } catch (e) {
                        const error_hash = StrapiHelper.entrycount_error_signature(name, args);
                        return [{
                            hash: error_hash,
                            data: {
                                error: e
                            }
                        }];
                    }
                };

                dispatch(StrapiCacheNewCall(hash, cb));

                return [-1, [], []];

            } else {

                if (call_data.required === false) {
                    dispatch(StrapiCacheSetRequired(hash));
                }

                return [call_data.height, call_data.result, call_data.result.map((fragment_hash: string): (StrapiCacheErrorFragment | StrapiCacheDataFragment) =>
                    state.strapi_cache.fragments[fragment_hash])];

            }

        };

    }

    /**
     * Registers the call on the strapi api on the redux store.
     * The request is refreshed only when block height is also updated.
     *
     * The output_converter is expected to properly hash data for it to be stored succesfully inside the store
     *
     * Will call strapi.request(method, path, requestConfig)
     *
     * @param method
     * @param path
     * @param requestConfig
     * @param output_converter
     */
    public static request(method: string, path: string, requestConfig: any, output_converter: (raw: any) => StrapiCacheCallReturnFragment[]): any {
        return (state: AppState, dispatch: Dispatch): StrapiData => {

            if (state.app.status !== AppStatus.Ready || !state.app.strapi) {
                return [-1, [], []];
            }

            const hash: string = StrapiHelper.request_signature(name, path, requestConfig);

            const call_data = state.strapi_cache.calls[hash];

            if (call_data === undefined) {

                const cb = async (): Promise<StrapiCacheCallReturnFragment[]> => {
                    try {
                        const data = await state.app.strapi.request(method, path, requestConfig);
                        return output_converter(data);
                    } catch (e) {
                        const error_hash = StrapiHelper.request_error_signature(name, path, requestConfig);
                        return [{
                            hash: error_hash,
                            data: {
                                error: e
                            }
                        }];
                    }
                };

                dispatch(StrapiCacheNewCall(hash, cb));

                return [-1, [], []];

            } else {

                if (call_data.required === false) {
                    dispatch(StrapiCacheSetRequired(hash));
                }

                return [call_data.height, call_data.result, call_data.result.map((fragment_hash: string): (StrapiCacheErrorFragment | StrapiCacheDataFragment) =>
                    state.strapi_cache.fragments[fragment_hash])];

            }

        };

    }

    /**
     *  Signature generators
     */

    private static getEntryCount_signature(name: string, args: any): string {
        let data = `getEntryCount:${name}`;
        for (const key of Object.keys(args).sort()) {
            data += `${key}:${args[key]}:`;
        }
        return keccak256(data).toString('hex').toLowerCase();
    }

    private static getEntry_signature(name: string, id: string): string {
        return keccak256(`getEntry:${name}:${id}`).toString('hex').toLowerCase();
    }

    private static fragment_signature(name: string, id: string): string {
        return keccak256(`fragment:${name}:${id}`).toString('hex').toLowerCase();
    }

    private static request_error_signature(name: string, path: string, args: any): string {
        let data = `error:${name}:${path}`;
        for (const key of Object.keys(args).sort()) {
            data += `${key}:${args[key]}:`;
        }
        return keccak256(data).toString('hex').toLowerCase();
    }

    private static entrycount_error_signature(name: string, args: any): string {
        let data = `error:getEntryCount:${name}:`;
        for (const key of Object.keys(args).sort()) {
            data += `${key}:${args[key]}:`;
        }
        return keccak256(data).toString('hex').toLowerCase();
    }

    private static entries_error_signature(name: string, args: any): string {
        let data = `error:getEntries:${name}:`;
        for (const key of Object.keys(args).sort()) {
            data += `${key}:${args[key]}:`;
        }
        return keccak256(data).toString('hex').toLowerCase();
    }

    private static error_signature(name: string, id: string): string {
        return keccak256(`error:getEntry:${name}:${id}`).toString('hex').toLowerCase();
    }

    private static request_signature(name: string, path: string, args: any): string {
        let data = `getEntries:${name}:${path}:`;
        for (const key of Object.keys(args).sort()) {
            data += `${key}:${args[key]}:`;
        }
        return keccak256(data).toString('hex').toLowerCase();
    }

    private static getEntries_signature(name: string, args: any): string {
        let data = `getEntries:${name}:`;
        for (const key of Object.keys(args).sort()) {
            data += `${key}:${args[key]}:`;
        }
        return keccak256(data).toString('hex').toLowerCase();
    }
}
