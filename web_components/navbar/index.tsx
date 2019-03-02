import { AppState, AppStatus, WalletProviderType } from '@utils/redux/app_state';
import { INavBarProps, NavBar }                    from './NavBar';
import { connect }                                 from 'react-redux';
import { I18N }                                    from '@utils/misc/i18n';
import { VtxStatus }                               from 'ethvtx/lib/state/vtxconfig';
import { Dispatch }                                from 'redux';
import { SetWalletProvider }                       from '../../utils/redux/app/actions';
import { getAccount }                              from 'ethvtx/lib/getters';

const mapStateToProps = (state: AppState): INavBarProps => ({
    disabled: !(state.app.status === AppStatus.Ready && state.app.provider !== WalletProviderType.None && state.vtxconfig.status === VtxStatus.Loaded),
    provider: state.app.provider,
    account: getAccount(state, '@coinbase')
});

const mapDispatchToProps = (dispatch: Dispatch): INavBarProps => ({
    logout: (): any => dispatch(SetWalletProvider(WalletProviderType.None))
});

export default I18N.withNamespaces(['navbar'])(connect(mapStateToProps, mapDispatchToProps)(NavBar));
