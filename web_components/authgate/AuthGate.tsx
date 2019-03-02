import * as React                                                                  from 'react';
import { Gate }                                                                    from '@components/gate/Gate';
import { AuthGateStatus, AuthGateStatuses }                                        from './AuthGateStatuses';
import { AuthenticatedPath, AuthLoginPath, AuthNotRequiredPath, AuthRegisterPath } from './AuthGatePaths';
import { WalletProviderType }                                                      from '@utils/redux/app_state';
import { LoginView }                                                               from '@web_views/auth_view/LoginView';
import { RegisterView }                                                            from '../../web_views/auth_view/RegisterView';
import { FullPageLoader }                                                                  from '@web_components/loaders/FullPageLoader';

export interface IAuthGateProps {
    provider?: WalletProviderType;
    token?: string;
}

export interface IAuthGateState {
    register: boolean;
}

/**
 * Used to display Login, Register or App depending on `provider` and `token` values
 */
export class AuthGate extends React.Component<IAuthGateProps, IAuthGateState> {

    state: IAuthGateState = {
        register: false
    };

    switchToRegister = (): void => {
        if (!this.state.register) {
            this.setState({
                register: true
            });
        }
    }

    switchToLogin = (): void => {
        if (this.state.register) {
            this.setState({
                register: false
            });
        }
    }

    render(): React.ReactNode {

        let status = null;

        if (this.props.provider !== WalletProviderType.T721Provider) {
            status = AuthGateStatus.AuthNotRequired;
        } else if (this.props.token === undefined) {
            return <FullPageLoader/>;
        } else if (this.props.token === null) {
            status = this.state.register ? AuthGateStatus.AuthRegister : AuthGateStatus.AuthLogin;
        } else {
            status = AuthGateStatus.Authenticated;
        }

        return <Gate status={status} statuses={AuthGateStatuses}>

            <AuthNotRequiredPath>
                {this.props.children}
            </AuthNotRequiredPath>

            <AuthLoginPath>
                <LoginView switch={this.switchToRegister}/>
            </AuthLoginPath>

            <AuthRegisterPath>
                <RegisterView switch={this.switchToLogin}/>
            </AuthRegisterPath>

            <AuthenticatedPath>
                {this.props.children}
            </AuthenticatedPath>
        </Gate>;
    }
}
