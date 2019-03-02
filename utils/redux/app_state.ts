import { State } from 'ethvtx/lib/state';
import Strapi    from 'strapi-sdk-javascript';
import Tx        from 'ethereumjs-tx';

export interface TxAttempt {
    tx: Tx;
    error: string;
    id: number;
    validate: boolean;
}

export interface LWTransactionsSection {
    attempts: TxAttempt[];
}

export interface ClientInformations {
    browser: string;
    device: string;
}

export interface LocalSettingsSection {
    device: ClientInformations;
    theme: string;
}

export enum AppModuleReady {
    App = 0,
    LocalSettings,
    RemoteSettings
}

export interface AppReady {
    local_settings: boolean;
    remote_settings: boolean;
    app: boolean;
}

export enum AppStatus {
    Loading = 0,
    Ready,

    CannotReachServer,
    MissingStrapiUrl,
    RxDbCreateError,
    InvalidRemoteConfigs
}

export interface AppConfig {
    strapi_endpoint: string;
}

export enum WalletProviderType {
    None = 0,
    InjectedProvider,
    T721Provider
}

export enum AuthStatus {
    None = 0,

    AuthStarted,
    AuthInvalidIdentifierOrPassword,

    RegisterStarted,
    RegisterEmailAlreadyInUse
}

export enum LocalWalletStatus {
    None = 0,
    NotCreated,
    Locked,
    Unlocked,
    Unlocking,
    Using
}

export interface LocalWallet {
    private_key: any;
    status: LocalWalletStatus;
    period: number;
    address: string;
}

export interface AppSection {
    ready: AppReady;
    status: AppStatus;
    provider: WalletProviderType;
    strapi: Strapi;
    config: AppConfig;
    token: string;
    t721_wallet: LocalWallet;
    auth_process_status: AuthStatus;
}

export interface ContractInformations {
    abi: any;
    runtime_binary: string;
    address: string;
}

export interface ContractsStore {
    [key: string]: ContractInformations;
}

export interface RemoteSettingsSection {
    node_host: string;
    node_port: number;
    node_connection_protocol: string;
    contracts: ContractsStore;
}

export interface AppState extends State {
    local_settings: LocalSettingsSection;
    remote_settings: RemoteSettingsSection;
    app: AppSection;
    lwtx: LWTransactionsSection;
}

export const InitialAppState: AppState = {
    lwtx: {
        attempts: []
    },
    local_settings: {
        device: null,
        theme: null
    },
    remote_settings: {
        node_host: null,
        node_port: null,
        node_connection_protocol: null,
        contracts: {}
    },
    app: {
        t721_wallet: {
            private_key: undefined,
            status: LocalWalletStatus.None,
            period: null,
            address: null
        },
        auth_process_status: AuthStatus.None,
        ready: {
            local_settings: false,
            remote_settings: false,
            app: false
        },
        provider: null,
        status: AppStatus.Loading,
        strapi: null,
        config: {
            strapi_endpoint: null
        },
        token: undefined
    }
};
