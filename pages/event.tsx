import React              from 'react';
import dynamic            from 'next/dynamic';
import {
    StrapiCoinbaseContext,
    StrapiCoinbaseConsumer,
    StrapiCoinbaseProvider
}                         from '@components/context/StrapiCoinbase';
import { EventViewProps } from '../web_views/event_view';
import { isValidAddress } from 'ethereumjs-util';
import { InvalidAddress } from '../web_views/message/invalid_address';

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

const EventView: React.ComponentType<EventViewProps> = dynamic<any>(async () => import('@web_views/event_view'), {
    loading: (): React.ReactElement => null,
    ssr: false
});

interface IEventProps {
    address: string;
}

export default class extends React.Component<IEventProps> {

    static getInitialProps(arg: any): any {
        return {address: arg.query.address};
    }

    render(): React.ReactNode {
        return (
            <AppGate>
                <ProviderGate>
                    <AuthGate>
                        <LocalWalletGate>
                            <VtxGate>
                                <StrapiCoinbaseProvider>
                                    <StrapiCoinbaseConsumer>
                                        {(ctx: StrapiCoinbaseContext): React.ReactNode => {

                                            if (this.props.address && isValidAddress(this.props.address)) {
                                                return <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        paddingLeft: '5%',
                                                        paddingRight: '5%',
                                                        marginTop: '2%',
                                                        marginBottom: '2%'
                                                    }}
                                                >
                                                    <EventView
                                                        coinbase={ctx.coinbase}
                                                        address={this.props.address}
                                                    />
                                                </div>;
                                            } else {
                                                return <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        paddingLeft: '5%',
                                                        paddingRight: '5%',
                                                        marginTop: '2%',
                                                        marginBottom: '2%',
                                                    }}
                                                >
                                                    <InvalidAddress address={this.props.address}/>
                                                </div>;
                                            }

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
