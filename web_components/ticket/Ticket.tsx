import * as React                                                             from 'react';
import { Card, Tag }                                                          from 'antd';
import * as GeoPattern                                                        from 'geopattern';
import { StrapiEvent }                                                        from '@utils/strapi/event';
import { StrapiTicket }                                                       from '@utils/strapi/ticket';
import { Typography }                                                         from 'antd';
import { TicketDetailsPopover, TicketEventPopover, TicketMarketplacePopover } from './TicketPopovers';
import { StrapiMinter }                                                       from '@utils/strapi/minter';
import { StrapiMarketer }                                                     from '@utils/strapi/marketer';
import moment from 'moment';
import { Textfit } from 'react-textfit';

export interface IInputTicketProps {
    ticket: StrapiTicket;
    event: StrapiEvent;
    strapi_url: string;
    ticket_infos: string[];
    contract_plugins: {
        minter: StrapiMinter;
        marketer: StrapiMarketer;
    };
}

interface ITicketState {
    hovered: boolean;
    real_hover: boolean;
}

export default class Ticket extends React.Component<IInputTicketProps, ITicketState> {

    state: ITicketState = {
        hovered: false,
        real_hover: false
    };

    on_mouse = (enter: boolean): void => {
        if (enter === false) {
            this.setState({
                real_hover: false
            });
            setTimeout(() => {
                if (this.state.real_hover === false && this.state.hovered === true) {
                    this.setState({
                        hovered: false
                    });
                }
            }, 300);
        } else {
            this.setState({
                real_hover: true
            });
            setTimeout(() => {
                if (this.state.real_hover === true && this.state.hovered === false) {
                    this.setState({
                        hovered: true,
                    });
                }
            }, 500);
        }
    }

    on_click = (): void => {
        if (this.state.hovered === false) {
            this.setState({
                hovered: true
            });
        }
    }

    render(): React.ReactNode {

        const pattern = GeoPattern.generate(this.props.event.address.address).toDataUrl();

        const tags = [<Tag style={{color: '#202020'}} color='#f0f2f5' key={0}>🎫 {this.props.ticket.ticket_id}</Tag> as React.ReactNode].concat(
            this.props.ticket_infos
                ?
                this.props.ticket_infos.map((info: string, idx: number): React.ReactNode => <Tag style={{color: '#202020'}} color='#f0f2f5' key={idx + 1}>{info}</Tag>)
                :
                []
        );

        const date = this.props.event.start ? moment(this.props.event.start).format('DD MMM YYYY') : null;

        return <div
            id='ticket'
            onMouseEnter={this.on_mouse.bind(this, true)}
            onMouseLeave={this.on_mouse.bind(this, false)}
            onClick={this.on_click}
            style={{position: 'relative'}}
        >  <style>{`
            #ticket .ant-card-body {
                padding: 12px;
            }
            `}</style>
            <div style={{position: 'absolute', zIndex: 1000, marginTop: -62}}>
                <TicketEventPopover
                    event_address={this.props.event.address.address}
                    hover={this.state.hovered}
                    on_enter={this.on_mouse.bind(this, true)}
                    on_leave={this.on_mouse.bind(this, false)}
                    pattern={pattern}
                />
                <TicketMarketplacePopover
                    event_address={this.props.event.address.address}
                    hover={this.state.hovered}
                    on_enter={this.on_mouse.bind(this, true)}
                    on_leave={this.on_mouse.bind(this, false)}
                    marketer={this.props.contract_plugins.marketer}
                />
                <TicketDetailsPopover
                    ticket_id={this.props.ticket.ticket_id}
                    hover={this.state.hovered}
                    on_enter={this.on_mouse.bind(this, true)}
                    on_leave={this.on_mouse.bind(this, false)}
                />
            </div>
            <Card
                onMouseEnter={this.on_mouse.bind(this, true)}
                onMouseLeave={this.on_mouse.bind(this, false)}
                style={{
                    height: 194,
                    width: 500,
                    background: 'linear-gradient(to right, #353550, #232323)',
                    border: '0px',
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                    borderBottomRightRadius: 18,
                    borderTopRightRadius: 6,
                    boxShadow: this.state.real_hover || this.state.hovered ? '0 18px 19px rgba(0, 0, 0, 0.30)' : '0 9px 19px rgba(0,0,0,0.30)'
                }}
                hoverable={true}
            >
                <style>{`
                    #ticket_body_${this.props.event.address.address} .ant-card {
                        background-image: ${pattern};
                        border: none; 
                    }
                `}</style>
                <div
                    id={`ticket_body_${this.props.event.address.address}`}
                    style={{
                        float: 'left'
                    }}
                >
                    <Card
                        style={{
                            height: 170,
                            width: 170,
                            borderRadius: 7,
                            padding: 15
                        }}
                        cover={
                            this.props.event.image
                                ?
                                <img alt='icon' src={this.props.strapi_url + this.props.event.image.url} style={{width: 140, height: 140}}/>
                                :
                                null
                        }
                    />
                </div>
                <div id='crans' style={{width: 2, height: 194, marginTop: -12, background: 'linear-gradient(#f0f2f5 60%, rgba(255,255,255,0) 0%)', backgroundSize: '2px 21px', float: 'left', marginLeft: 12}}/>
                <div
                    style={{
                        height: 170,
                        width: 265,
                        marginLeft: 24,
                        float: 'left',
                    }}
                >
                    {tags}
                    <div style={{height: '70%', marginTop: '5%'}}>
                        <div className='parent' style={{width: 265, textAlign: 'center', height: '50%', paddingTop: '6.25%'}}>
                            <Textfit
                                mode='single'
                                max={30}
                                forceSingleModeWidth={true}
                                style={{
                                    color: '#ffffff',
                                    fontWeigth: 300
                                }}
                            >
                                {this.props.event.name}
                            </Textfit>
                        </div>
                        <div style={{height: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            {
                                date
                                    ?
                                    <Typography.Text style={{fontSize: 40, color: '#ffffff', fontWeight: 100}}>{date}</Typography.Text>
                                    :
                                    null
                            }
                        </div>
                    </div>

                </div>
            </Card>
        </div>;
    }
}
