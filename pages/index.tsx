import React           from 'react';
import dynamic         from 'next/dynamic';

const AppGate: React.ComponentType = dynamic<any>(async () => import('@web_components/appgate/AppGate'), {
    loading: (): React.ReactElement => null,
    ssr: false
});

const AuthGate: React.ComponentType = dynamic<any>(async () => import('@web_components/authgate/AuthGate'), {
    loading: (): React.ReactElement => null,
    ssr: false
});

const LocalWalletGate: React.ComponentType = dynamic<any>(async () => import('@web_components/localwalletgate/LocalWalletGate'), {
    loading: (): React.ReactElement => null,
    ssr: false
});

const VtxGate: React.ComponentType = dynamic<any>(async () => import('@web_components/vtxgate/VtxGate'), {
    loading: (): React.ReactElement => null,
    ssr: false
});

const ProviderGate: React.ComponentType = dynamic<any>(async () => import('@web_components/providergate/ProviderGate'), {
    loading: (): React.ReactElement => null,
    ssr: false
});

import { StrapiCoinbaseConsumer, StrapiCoinbaseProvider } from '@components/context/StrapiCoinbase';

export default class extends React.Component {

    render(): React.ReactNode {
        return (
            <AppGate>
                <ProviderGate>
                    <AuthGate>
                        <LocalWalletGate>
                            <VtxGate>
                                <p>Hello</p>
                                <StrapiCoinbaseProvider>
                                    <StrapiCoinbaseConsumer>
                                        {(ctx: any): any => {
                                            console.log(ctx);
                                            return <p>lol</p>;
                                        }}
                                    </StrapiCoinbaseConsumer>
                                </StrapiCoinbaseProvider>
                            </VtxGate>
                        </LocalWalletGate>
                    </AuthGate>
                </ProviderGate>
            </AppGate>
        );
    }
}
