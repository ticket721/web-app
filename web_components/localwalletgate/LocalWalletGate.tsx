import * as React                                             from 'react';
import { IGateProps }                                         from '@components/gate/Gate';
import { LocalWalletGateStatuses }                            from './LocalWalletGateStatuses';
import { LWCreatedPath, LWNotCreatedPath, LWNotRequiredPath } from './LocalWalletGatePaths';
import { LocalWallet, WalletProviderType }                    from '@utils/redux/app_state';
import LocalWalletCreationView                                from '@web_views/local_wallet_creation_view';
import LWUnlock                                               from '../modals/lwunlock';
import LWAttempts                                             from '../modals/lwattempts';
import { FullPageLoader }                                     from '@web_components/loaders/FullPageLoader';
import dynamic                                                from 'next/dynamic';

const Gate: React.ComponentType<IGateProps> = dynamic<IGateProps>(async () => import('@components/gate/Gate'), {
    loading: (): React.ReactElement => null
});

export interface ILocalWalletGateProps {
    provider?: WalletProviderType;
    wallet?: LocalWallet;
}

export interface ILocalWalletGateState {

}

/**
 * Used to render a creation view if the current provider is T721Provider AND that the stored private key is null (meaning that the user has no encrypted wallet on the server)
 */
export class LocalWalletGate extends React.Component<ILocalWalletGateProps, ILocalWalletGateState> {
    render(): React.ReactNode {

        let status = 0;

        if (this.props.provider !== WalletProviderType.T721Provider) {
            status = 2;
        } else if (this.props.wallet.private_key === undefined) {
            return <FullPageLoader/>;
        } else if (this.props.wallet.private_key !== null) {
            status = 1;
        }

        return <Gate status={status} statuses={LocalWalletGateStatuses}>
            <LWNotCreatedPath>
                <LocalWalletCreationView/>
            </LWNotCreatedPath>
            <LWCreatedPath>
                <div>
                    {this.props.children}
                    <LWUnlock/>
                    <LWAttempts/>
                </div>
            </LWCreatedPath>
            <LWNotRequiredPath>
                {this.props.children}
            </LWNotRequiredPath>
        </Gate>;
    }
}
