import * as React     from 'react';
import { I18N }       from '@utils/misc/i18n';
import { Typography } from 'antd';
import image          from './image.svg';

// Props

export interface InvalidAddressProps {
    address: string;
    t: any;
}

class InvalidAddressContainer extends React.Component<InvalidAddressProps> {
    render(): React.ReactNode {
        return <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div style={{textAlign: 'center'}}>
                <img src={image} style={{width: '50px', marginBottom: '75px'}}/>
                <br/>
                <Typography.Text style={{fontSize: 28, fontWeight: 500}}>{this.props.t('error')}</Typography.Text>
                <Typography.Text
                    style={{
                        fontSize: 28,
                        marginLeft: 24
                    }}
                >
                    {this.props.t('invalid_address').replace('//address//', this.props.address)}
                </Typography.Text>
            </div>

        </div>;
    }
}

export const InvalidAddress = I18N.withNamespaces(['messages'])(InvalidAddressContainer);
