import React          from 'react';
import AppGate from '@web_components/appgate/connectedAppGate';
import ProviderGate from '@web_components/providergate/connectedProviderGate';
import AuthGate from '@web_components/authgate/connectedAuthGate';
import LocalWalletGate from '@web_components/localwalletgate/connectedLocalWalletGate';
import VtxGate from '@web_components/vtxgate/connectedVtxGate';

export default class extends React.Component {

    render(): React.ReactNode {
        return (
            <AppGate>
                <ProviderGate>
                    <AuthGate>
                        <LocalWalletGate>
                            <VtxGate>
                                <p>account</p>
                            </VtxGate>
                        </LocalWalletGate>
                    </AuthGate>
                </ProviderGate>
            </AppGate>
        );
    }
}
