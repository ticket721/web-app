import * as React                       from 'react';
import { Card, Icon }                   from 'antd';
import injected_provider_image          from '@static/images/wallet_provider_selection/injected_provider.png';
import { I18N }                         from '@utils/misc/i18n';
import { AppState, WalletProviderType } from '@utils/redux/app_state';
import { Dispatch }                     from 'redux';
import { SetWalletProvider }            from '@utils/redux/app/actions';
import { connect }                      from 'react-redux';

export interface IInjectedProviderChoiceProps {
    t?: any;
    setWalletProvider?: () => void;
}

export interface IInjectedProviderChoiceState {
    available: boolean;
}

class InjectedProviderChoice extends React.Component<IInjectedProviderChoiceProps, IInjectedProviderChoiceState> {
    constructor(props: IInjectedProviderChoiceProps) {
        super(props);

        this.state = {
            available: (global.window.web3 !== undefined)
        };
    }

    onClick = (): void => {
        this.props.setWalletProvider();
    }

    render(): React.ReactNode {
        if (this.state.available) {
            return <Card
                style={{width: '100%'}}
                hoverable={true}
                cover={<img alt='injected' style={{height: '10%'}} src={injected_provider_image}/>}
                actions={[<Icon type='double-right' key={0}/>]}
                onClick={this.onClick}

            >
                <Card.Meta
                    title={this.props.t('injected_title')}
                    description={this.props.t('injected_desc')}
                />

            </Card>;
        }
        return <Card
            style={{width: '100%'}}
            cover={<img alt='injected' style={{height: '10%'}} src={injected_provider_image}/>}

        >
            <Card.Meta
                title={this.props.t('injected_title')}
                description={this.props.t('injected_desc')}
            />

            <br/>
            <br/>
            <div style={{textAlign: 'center'}}>
                <Icon type='warning' style={{color: 'red', fontSize: '20px'}}/>
                <h4 style={{color: 'red', margin: 0, fontSize: '20px'}}>{this.props.t('injected_unavailable')}</h4>
            </div>

        </Card>;

    }
}

const mapStateToProps = (state: AppState): IInjectedProviderChoiceProps => ({});
const mapDispatchToProps = (dispatch: Dispatch): IInjectedProviderChoiceProps => ({
    setWalletProvider: (): void => {
        dispatch(SetWalletProvider(WalletProviderType.InjectedProvider));
    }
});

export default I18N.withNamespaces(['provider_selection'])(connect(mapStateToProps, mapDispatchToProps)(InjectedProviderChoice));
