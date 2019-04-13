import * as React                          from 'react';
import { VtxGateStatuses, VtxStatusNames } from './VtxGateStatuses';
import { IGateProps }                      from '@components/gate/Gate';
import { FullPageLoader }                  from '@web_components/loaders/FullPageLoader';
import {
    VtxAuthorizingPath,
    VtxIdlePath,
    VtxLoadingPath,
    VtxErrorPath,
    VtxLoadedPath,
    VtxUnauthorizedPath,
    VtxWrongNetPath
}                                          from './VtxGatePaths';
import dynamic                             from 'next/dynamic';

const Gate: React.ComponentType<IGateProps> = dynamic<IGateProps>(async () => import('@components/gate/Gate'), {
    loading: (): React.ReactElement => null
});

export interface IVtxGateProps {
    vtx_status?: string;
}

export interface IVtxGateState {
}

/**
 * Renders errors or loaders depending on ethvtx status.
 */
export class VtxGate extends React.Component<IVtxGateProps, IVtxGateState> {

    render(): React.ReactNode {

        return (
            <Gate status={VtxStatusNames.indexOf(this.props.vtx_status)} statuses={VtxGateStatuses}>
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
