import { Tx }                           from 'ethvtx/lib/state/txs';
import * as React                       from 'react';
import { AppState }                     from '@utils/redux/app_state';
import { routes }                       from '@utils/routing';
import { connect }                      from 'react-redux';
import { Button, Progress, Typography } from 'antd';

export interface EventBuyModalTxProgressProps {
    tx: Tx;
    t: any;
}

interface EventBuyModalTxProgressRState {
    current_block: number;
    threshold: number;
}

type MergedEventBuyModalTxProgressProps = EventBuyModalTxProgressProps & EventBuyModalTxProgressRState;

class EventBuyModalTxProgress extends React.Component<MergedEventBuyModalTxProgressProps> {

    status_builder = (): any => {

        if (this.props.tx) {
            switch (this.props.tx.status) {

                case 'Unknown':
                    return {
                        progress: 10,
                        message: 'buy_modal_tx_progress_wait_for_confirmations'
                    };
                case 'Confirming':
                    let progress = 0;
                    if (this.props.tx.infos.blockNumber !== null && this.props.current_block !== null) {
                        progress = ((this.props.current_block - this.props.tx.infos.blockNumber) / this.props.threshold) * 90;
                        if (progress > 90) {
                            progress = 90;
                        }
                        if (progress < 0) {
                            progress = 0;
                        }
                    }
                    return {
                        progress: 10 + progress,
                        message: 'buy_modal_tx_progress_wait_for_confirmations'
                    };
                case 'Confirmed':
                    return {
                        progress: 100,
                        message: 'buy_modal_tx_progress_confirmed'
                    };
                case 'Error':
                    return {
                        progress: 100,
                        message: 'buy_modal_tx_progress_error',
                        error: true
                    };

            }
        } else {
            return {
                progress: 10,
                message: 'buy_modal_tx_progress_wait_for_broadcast'
            };
        }
    }

    render(): React.ReactNode {

        const status = this.status_builder();

        return <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{textAlign: 'center'}}>
                <Typography.Text style={{fontSize: 22}}>{this.props.t(status.message)}</Typography.Text>
                <br/>
                <br/>
                <Progress type='circle' percent={status.progress} status={status.error ? 'exception' : 'active'} strokeLinecap='square'/>
                <br/>
                <br/>
                {
                    status.progress === 100
                        ?
                        <routes.Link route='account'>
                            <Button>
                                {this.props.t('buy_modal_go_to_my_tickets_button')}
                            </Button>
                        </routes.Link>
                        :
                        <Button
                            disabled={true}
                            loading={true}
                        >
                            {this.props.t('buy_modal_waiting_for_ticket_button')}
                        </Button>
                }
            </div>
        </div>;
    }
}

const mapStateToProps = (state: AppState): EventBuyModalTxProgressRState => ({
    current_block: state.blocks.current_height,
    threshold: state.vtxconfig.confirmation_threshold
});

export default connect(mapStateToProps)(EventBuyModalTxProgress);
