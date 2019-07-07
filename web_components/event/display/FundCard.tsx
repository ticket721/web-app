import * as React                            from 'react';
import { Button, Card, Divider, Typography } from 'antd';
import { theme }                             from '../../../utils/theme';
import { VtxContract }                       from 'ethvtx/lib/contracts/VtxContract';
import currencies                            from '@utils/currencies';
import { FullPageLoader }                    from '../../loaders/FullPageLoader';
import { AppState }                          from '../../../utils/redux/app_state';
import { connect }                           from 'react-redux';
import TxProgress                            from '../../tx/TxProgress';
import { Tx }                                from 'ethvtx/lib/state/txs';
import { getTransactionById }                from 'ethvtx/lib/txs/helpers/getters';

export interface FundCardProps {
    balance: string;
    contract: VtxContract;
    t: any;
}

interface FundCardRState {
    coinbase: string;
    getTx: (tx_id: number) => Tx;
}

type MergedFundCardProps = FundCardProps & FundCardRState;

interface FundCardState {
    tx_id: number;
}

class FundCard extends React.Component<MergedFundCardProps, FundCardState> {

    state: FundCardState = {
        tx_id: null
    };

    withdraw = (): void => {
        if (this.props.contract && this.props.coinbase && this.props.balance) {
            this.setState({
                tx_id: this.props.contract.fn.withdraw(this.props.balance, {
                    from: this.props.coinbase
                })
            });
        }
    }

    clear = (): void => {
        this.setState({
            tx_id: null
        });
    }

    render(): React.ReactNode {
        if (this.props.balance) {
            return <Card
                style={{width: '100%', height: '100%'}}
                title={this.props.t('fund_title')}
                size={'small'}
            >
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography.Text style={{fontSize: 64, color: theme.dark2}}>
                        {currencies.ether.toFixed(this.props.balance)} {currencies.ether.symbol({})}
                    </Typography.Text>
                </div>
                <Divider/>
                <div style={{textAlign: 'center', marginBottom: 12}}>
                    <Button type='primary' size='large' onClick={this.withdraw}>{this.props.t('fund_withdraw')}</Button>
                </div>
                {
                    this.state.tx_id !== null

                        ?
                        <div style={{marginBottom: 12}}>
                            <Divider/>
                            <TxProgress
                                scope='fund_withdrawal'
                                t={this.props.t}
                                tx={this.props.getTx(this.state.tx_id)}
                                end_call={this.clear}
                            />
                        </div>

                        :
                        null
                }
            </Card>;
        } else {
            return <Card
                style={{width: '100%', height: '100%'}}
                title={this.props.t('fund_title')}
                size={'small'}
            >
                <FullPageLoader/>
            </Card>;
        }
    }
}

const mapStateToProps = (state: AppState): FundCardRState => ({
    coinbase: state.vtxconfig.coinbase,
    getTx: (tx_id: number): Tx => getTransactionById(state, tx_id)
});

export default connect(mapStateToProps)(FundCard) as React.ComponentType<FundCardProps>;
