import { StrapiAddress }       from '../../utils/strapi/address';
import { StrapiTicket }        from '../../utils/strapi/ticket';
import * as React              from 'react';
import Ticket                  from '../../web_components/ticket';
import { StrapiEvent }         from '../../utils/strapi/event';
import EventCard               from '../../web_components/event/card';
import { Typography }          from 'antd';
import { StrapiEventContract } from '../../utils/strapi/eventcontract';
import { I18N, I18NProps }     from '../../utils/misc/i18n';
import TicketInformations      from './TicketInformations';
import TicketActivity          from './TicketActivity';

export interface TicketLayoutProps {
    coinbase: StrapiAddress;
    ticket: StrapiTicket;
    event: StrapiEvent;
    event_contract: StrapiEventContract;
    coinbase_string: string;
}

type MergedTicketLayoutProps = TicketLayoutProps & I18NProps;

class TicketLayout extends React.Component<MergedTicketLayoutProps> {

    render(): React.ReactNode {
        return <div style={{width: '100%', height: '100%'}}>
            <div style={{width: '60%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', float: 'left'}}>
                <Ticket
                    ticket={this.props.ticket}
                    coinbase={this.props.coinbase_string}
                    show_marketplace_link={true}
                    always_hovered={true}
                />
            </div>
            <div style={{position: 'fixed', marginLeft: '60%', marginTop: '-50%', height: '300%', width: '100%', backgroundColor: '#ffffff', boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', zIndex: 0}}/>
            <div style={{width: '40%', float: 'left', overflow: 'scroll', height: '100%', zIndex: 1}}>
                <div style={{width: '100%', zIndex: 2, padding: '2%'}}>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                        <Typography.Text style={{position: 'relative', fontSize: 32, zIndex: 3, marginRight: 12}}>{this.props.t('ticket_page_event_title')}</Typography.Text>
                    </div>
                    <EventCard event={this.props.event} event_contract={this.props.event_contract}/>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 24}}>
                        <Typography.Text style={{position: 'relative', fontSize: 32, zIndex: 3, marginRight: 12}}>{this.props.t('ticket_page_info_title')}</Typography.Text>
                    </div>
                    <TicketInformations ticket={this.props.ticket}/>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 24}}>
                        <Typography.Text style={{position: 'relative', fontSize: 32, zIndex: 3, marginRight: 12}}>{this.props.t('ticket_page_activity_title')}</Typography.Text>
                    </div>
                    <TicketActivity ticket={this.props.ticket}/>
                </div>
            </div>
        </div>;
    }
}

export default I18N.withNamespaces(['tickets'])(TicketLayout);
