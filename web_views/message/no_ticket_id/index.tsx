import * as React     from 'react';
import { I18N }       from '@utils/misc/i18n';
import { Typography } from 'antd';
import image          from './image.svg';

// Props

export interface NoTicketIdProps {
    t: any;
}

class NoTicketIdContainer extends React.Component<NoTicketIdProps> {
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
                <img src={image} style={{width: '75px', marginBottom: '75px'}}/>
                <br/>
                <Typography.Text style={{fontSize: 28, marginLeft: 24}}>{this.props.t('no_ticket_id')}</Typography.Text>
            </div>

        </div>;
    }
}

export const NoTicketId = I18N.withNamespaces(['messages'])(NoTicketIdContainer);
