import { AppState }                                  from '@utils/redux/app_state';
import { ILWUnlockProps }                            from './LWUnlock';
import { connect }                                   from 'react-redux';
import { Dispatch }                                  from 'redux';
import { UnlockedLocalWallet, UnlockingLocalWallet } from '@utils/redux/app/actions';
import { Wallet }                                    from 'ethereumjs-wallet';
import { I18N }                                      from '@utils/misc/i18n';
import dynamic                                       from 'next/dynamic';
import * as React                                    from 'react';

const LWUnlock = dynamic<ILWUnlockProps>(async () => import('./LWUnlock'), {
    loading: (): React.ReactElement => null
});

const mapStateToProps = (state: AppState): ILWUnlockProps => ({
    lw: state.app.t721_wallet,
    coinbase: state.vtxconfig.coinbase
});

const mapDispatchToProps = (dispatch: Dispatch): ILWUnlockProps => ({
    unlocked: (wallet: Wallet, period: number): any => dispatch(UnlockedLocalWallet(wallet, period)),
    unlocking: (): any => dispatch(UnlockingLocalWallet())
});

export default I18N.withNamespaces(['lwmodals'])(connect(mapStateToProps, mapDispatchToProps)(LWUnlock));
