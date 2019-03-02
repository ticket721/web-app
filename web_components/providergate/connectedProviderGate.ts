import { AppState }                         from '@utils/redux/app_state';
import { ProviderGate, IProviderGateProps } from './ProviderGate';
import { connect }                          from 'react-redux';

const mapStateToProps = (state: AppState): IProviderGateProps => ({
    provider_status: state.app.provider
});

export default connect(mapStateToProps)(ProviderGate);
