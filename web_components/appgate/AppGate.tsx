import * as React                                                                          from 'react';
import { AppGateStatuses }                                                                 from './AppGateStatuses';
import { AppStatus }                                                                       from '@utils/redux/app_state';
import { Gate }                                                                            from '@components/gate/Gate';
import {
    AppCannotReachServerPath,
    AppInvalidRemoteConfigPath,
    AppLoadingPath,
    AppMissingStrapiUrlPath,
    AppReadyPath, AppRxDbCreateErrorPath
} from './AppGatePaths';
import { FullPageLoader }                                                                  from '@web_components/loaders/FullPageLoader';

export interface IAppGateProps {
    app_status?: AppStatus;
}

export interface IAppGateState {
}

/**
 * Used to display loading, error or app depending on current `app_status`.
 */
export class AppGate extends React.Component<IAppGateProps, IAppGateState> {

    render(): React.ReactNode {

        return (
            <Gate status={this.props.app_status} statuses={AppGateStatuses}>
                <AppLoadingPath>
                    <FullPageLoader/>
                </AppLoadingPath>

                <AppReadyPath>
                    {this.props.children}
                </AppReadyPath>

                <AppCannotReachServerPath>
                    <p>CannotReachServer</p>
                </AppCannotReachServerPath>

                <AppRxDbCreateErrorPath>
                    <p>RxDbError</p>
                </AppRxDbCreateErrorPath>

                <AppInvalidRemoteConfigPath>
                    <p>Invalid Remote Config</p>
                </AppInvalidRemoteConfigPath>

                <AppMissingStrapiUrlPath>
                    <p>MissingStrapiUrl</p>
                </AppMissingStrapiUrlPath>
            </Gate>
        );

    }
}
