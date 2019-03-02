import { AppState }               from '@utils/redux/app_state';
import { AppGate, IAppGateProps } from './AppGate';
import { connect }                from 'react-redux';

const mapStateToProps = (state: AppState): IAppGateProps => ({
    app_status: state.app.status
});

export default connect(mapStateToProps)(AppGate);
