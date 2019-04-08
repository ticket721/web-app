import { AppState }                               from '@utils/redux/app_state';
import { ILocalWalletGateProps, LocalWalletGate } from './LocalWalletGate';
import { connect }                                from 'react-redux';

const mapStateToProps = (state: AppState): ILocalWalletGateProps => ({
    provider: state.app.provider,
    wallet: state.app.t721_wallet
});

export default connect(mapStateToProps)(LocalWalletGate);
