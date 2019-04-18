import React                from 'react';
import dynamic              from 'next/dynamic';
import { AccountViewProps } from '../web_views/account_view';
import { isValidAddress }   from 'ethereumjs-util';
import { InvalidAddress }   from '../web_views/message/invalid_address';

const AppGate: React.ComponentType = dynamic<any>(async () => import('@web_components/appgate/AppGate'), {
    loading: (): React.ReactElement => null,
    ssr: true
});

const AuthGate: React.ComponentType = dynamic<any>(async () => import('@web_components/authgate/AuthGate'), {
    loading: (): React.ReactElement => null,
    ssr: true
});

const LocalWalletGate: React.ComponentType = dynamic<any>(async () => import('@web_components/localwalletgate/LocalWalletGate'), {
    loading: (): React.ReactElement => null,
    ssr: true
});

const VtxGate: React.ComponentType = dynamic<any>(async () => import('@web_components/vtxgate/VtxGate'), {
    loading: (): React.ReactElement => null,
    ssr: true
});

const ProviderGate: React.ComponentType = dynamic<any>(async () => import('@web_components/providergate/ProviderGate'), {
    loading: (): React.ReactElement => null,
    ssr: true
});

const AccountView: React.ComponentType<AccountViewProps> = dynamic<AccountViewProps>(async () => import('@web_views/account_view'), {
    loading: (): React.ReactElement => null
});

export default class extends React.Component<any> {
    static getInitialProps({query}: {query: any; }): any {
        return query;
    }

    render(): React.ReactNode {

        if (this.props.address && !isValidAddress(this.props.address)) {
            return <InvalidAddress address={this.props.address}/>;
        }

        return (
            <AppGate>
                <ProviderGate>
                    <AuthGate>
                        <LocalWalletGate>
                            <VtxGate>
                                <AccountView address={this.props.address}/>
                            </VtxGate>
                        </LocalWalletGate>
                    </AuthGate>
                </ProviderGate>
            </AppGate>
        );
    }
}
