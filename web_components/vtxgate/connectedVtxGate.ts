import { AppState }               from '@utils/redux/app_state';
import { VtxGate, IVtxGateProps } from './VtxGate';
import { connect }                from 'react-redux';

const mapStateToProps = (state: AppState): IVtxGateProps => ({
    vtx_status: state.vtxconfig.status
});

export default connect(mapStateToProps)(VtxGate);
