import { AppState }                                  from '@utils/redux/app_state';
import { ILWUnlockProps, LWUnlock }                  from './LWUnlock';
import { connect }                                   from 'react-redux';
import { Dispatch }                                  from 'redux';
import { UnlockedLocalWallet, UnlockingLocalWallet } from '../../../utils/redux/app/actions';
import { Wallet }                                    from 'ethereumjs-wallet';
import { I18N }                                      from '../../../utils/misc/i18n';

const mapStateToProps = (state: AppState): ILWUnlockProps => ({
    lw: state.app.t721_wallet,
    coinbase: state.vtxconfig.coinbase
});

const mapDispatchToProps = (dispatch: Dispatch): ILWUnlockProps => ({
    unlocked: (wallet: Wallet, period: number): any => dispatch(UnlockedLocalWallet(wallet, period)),
    unlocking: (): any => dispatch(UnlockingLocalWallet())
});

export default I18N.withNamespaces(['lwmodals'])(connect(mapStateToProps, mapDispatchToProps)(LWUnlock));
