import * as React                       from 'react';
import { Card, Icon }                   from 'antd';
import t721_provider_image              from '@static/images/wallet_provider_selection/t721_provider.png';
import { I18N }                         from '../../utils/misc/i18n';
import { AppState, WalletProviderType } from '../../utils/redux/app_state';
import { Dispatch }                     from 'redux';
import { SetWalletProvider }            from '../../utils/redux/app/actions';
import { connect }                      from 'react-redux';

interface IT721ProviderChoiceProps {
    t?: any;
    setWalletProvider?: () => void;
}

class T721ProviderChoice extends React.Component<IT721ProviderChoiceProps> {

    onClick = (): void => {
        this.props.setWalletProvider();
    }

    render(): React.ReactNode {
        return <Card
            style={{ width: '100%'}}
            hoverable={true}
            cover={<img alt='t721' style={{height: '10%'}} src={t721_provider_image} />}
            actions={[ <Icon type='double-right' key={0} /> ]}
            onClick={this.onClick}
        >
            <Card.Meta
                title={this.props.t('t721_title')}
                description={this.props.t('t721_desc')}
            />

        </Card>;
    }
}

const mapStateToProps = (state: AppState): IT721ProviderChoiceProps => ({});
const mapDispatchToProps = (dispatch: Dispatch): IT721ProviderChoiceProps => ({
    setWalletProvider: (): void => { dispatch(SetWalletProvider(WalletProviderType.T721Provider)); }
});

export default I18N.withNamespaces(['provider_selection'])(connect(mapStateToProps, mapDispatchToProps)(T721ProviderChoice));
