import React                   from 'react';
import dynamic                 from 'next/dynamic';
import {
    StrapiCoinbaseContext,
    StrapiCoinbaseConsumer,
    StrapiCoinbaseProvider
}                              from '@components/context/StrapiCoinbase';
import { EventsOverviewProps } from '../web_views/events_overview';

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

const EventsOverview: React.ComponentType<EventsOverviewProps> = dynamic<EventsOverviewProps>(async () => import('@web_views/events_overview'), {
    loading: (): React.ReactElement => null,
    ssr: false
});

interface IEventsProps {
}

export default class extends React.Component<IEventsProps> {

    render(): React.ReactNode {
        return (
            <AppGate>
                <ProviderGate>
                    <AuthGate>
                        <LocalWalletGate>
                            <VtxGate>
                                <StrapiCoinbaseProvider>
                                    <StrapiCoinbaseConsumer>
                                        {(ctx: StrapiCoinbaseContext): React.ReactNode =>
                                            <EventsOverview coinbase={ctx.coinbase}/>
                                        }

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
