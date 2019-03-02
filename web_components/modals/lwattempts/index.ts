import { AppState, TxAttempt }        from '@utils/redux/app_state';
import { ILWAttemptProps, LWAttempt } from './LWAttempt';
import { connect }                    from 'react-redux';
import { Dispatch }                   from 'redux';
import { LWTXSetStatus }              from '@utils/redux/lwtransactions/actions';
import { I18N }                       from '@utils/misc/i18n';

const mapStateToProps = (state: AppState): ILWAttemptProps => ({
    attempts: state.lwtx.attempts.filter((tx: TxAttempt) => tx.validate === null),
    coinbase: state.vtxconfig.coinbase
});

const mapDispatchToProps = (dispatch: Dispatch): ILWAttemptProps => ({
    setStatus: (tx_id: number, status: boolean): any => dispatch(LWTXSetStatus(tx_id, status))
});

export default I18N.withNamespaces(['lwmodals'])(connect(mapStateToProps, mapDispatchToProps)(LWAttempt));
