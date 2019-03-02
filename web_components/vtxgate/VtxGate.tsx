import * as React                                          from 'react';
import { VtxGateStatuses }                                 from './VtxGateStatuses';
import { Gate }                                            from '@components/gate/Gate';
import { FullPageLoader }                                  from '@web_components/loaders/FullPageLoader';
import { VtxStatus }                                       from 'ethvtx/lib/state/vtxconfig';
import { VtxAuthorizingPath, VtxIdlePath, VtxLoadingPath, VtxErrorPath, VtxLoadedPath, VtxUnauthorizedPath, VtxWrongNetPath } from './VtxGatePaths';

export interface IVtxGateProps {
    vtx_status?: VtxStatus;
}

export interface IVtxGateState {
}

/**
 * Renders errors or loaders depending on ethvtx status.
 */
export class VtxGate extends React.Component<IVtxGateProps, IVtxGateState> {

    render(): React.ReactNode {

        return (
            <Gate status={this.props.vtx_status} statuses={VtxGateStatuses}>
                <VtxLoadingPath>
                    <FullPageLoader/>
                </VtxLoadingPath>

                <VtxAuthorizingPath>
                    <p>Vtx Authorizing</p>
                </VtxAuthorizingPath>

                <VtxIdlePath>
                    <FullPageLoader/>
                </VtxIdlePath>

                <VtxErrorPath>
                    <p>Vtx Error</p>
                </VtxErrorPath>

                <VtxLoadedPath>
                    {this.props.children}
                </VtxLoadedPath>

                <VtxUnauthorizedPath>
                    <p>Vtx Unauthorized</p>
                </VtxUnauthorizedPath>

                <VtxWrongNetPath>
                    <p>Vtx Wrong Net</p>
                </VtxWrongNetPath>
            </Gate>
        );

    }
}
