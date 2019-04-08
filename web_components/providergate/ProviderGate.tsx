import * as React               from 'react';
import { WalletProviderType }   from '@utils/redux/app_state';
import { IGateProps }           from '@components/gate/Gate';
import {
    WalletProviderInjectedProviderPath,
    WalletProviderNonePath,
    WalletProviderT721ProviderPath
}                               from './ProviderGatePaths';
import { ProviderGateStatuses } from './ProviderGateStatuses';
import ProviderSelectionView    from '@web_views/provider_selection_view';
import { FullPageLoader }       from '../loaders/FullPageLoader';
import dynamic                  from 'next/dynamic';

const Gate: React.ComponentType<IGateProps> = dynamic<IGateProps>(async () => import('@components/gate/Gate'), {
    loading: (): React.ReactElement => null
});

export interface IProviderGateProps {
    provider_status?: WalletProviderType;
}

export interface IProviderGateState {
}

/**
 * Renders the Provider selection view if no provider selected.
 */
export class ProviderGate extends React.Component<IProviderGateProps, IProviderGateState> {

    render(): React.ReactNode {

        if (this.props.provider_status === null) return <FullPageLoader/>;

        return (
            <Gate status={this.props.provider_status} statuses={ProviderGateStatuses}>

                <WalletProviderNonePath>
                    <ProviderSelectionView/>
                </WalletProviderNonePath>

                <WalletProviderInjectedProviderPath>
                    {this.props.children}
                </WalletProviderInjectedProviderPath>

                <WalletProviderT721ProviderPath>
                    {this.props.children}
                </WalletProviderT721ProviderPath>

            </Gate>
        );

    }
}
