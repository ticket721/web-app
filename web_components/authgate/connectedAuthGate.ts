import { AppState }                 from '@utils/redux/app_state';
import { AuthGate, IAuthGateProps } from './AuthGate';
import { connect }                  from 'react-redux';

const mapStateToProps = (state: AppState): IAuthGateProps => ({
    provider: state.app.provider,
    token: state.app.token
});

export default connect(mapStateToProps)(AuthGate);
