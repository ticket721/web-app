import { message, Spin, Typography } from 'antd';
import posed                         from 'react-pose';
import * as React                    from 'react';
import { routes }                    from '../../utils/routing';
import { StrapiMarketer }            from '../../utils/strapi/marketer';
import { MarketerEnabled }           from '../event/misc/MarketerEnabled';

const Popover = posed.div({
    hoverable: true,
    hidden: {
        scale: 0.8,
        opacity: 0,
        transition: {
            delay: 250
        },
        boxShadow: '0px 0px 0px rgba(0,0,0,0.50)',
        y: 25
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 50,
            mass: 0.5,
        },
        boxShadow: '0px 4px 8px rgba(0,0,0,0.50)',
        y: 0
    },
    hover: {
        scale: 1.05
    }
});

export interface ITicketEventPopoverProps {
    event_address: string;
    hover: boolean;
    on_enter: () => void;
    on_leave: () => void;
    pattern: string;
}

export class TicketEventPopover extends React.Component<ITicketEventPopoverProps> {
    render(): React.ReactNode {
        return <Popover
            pose={this.props.hover ? 'visible' : 'hidden'}
            onMouseEnter={this.props.on_enter}
            onMouseLeave={this.props.on_leave}
            style={{borderRadius: 5, float: 'left', marginLeft: 12, background: this.props.pattern, cursor: 'pointer'}}
        >
            <routes.Link route='event' params={{address: this.props.event_address}}>
                <div
                    style={{
                        height: 50,
                        width: 129 - 12,
                        borderRadius: 5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography.Text style={{fontSize: 18, color: '#ffffff'}}>Event</Typography.Text>
                </div>
            </routes.Link>
        </Popover>;

    }
}

export interface ITicketMarketplacePopoverProps {
    marketer: StrapiMarketer;
    event_address: string;
    hover: boolean;
    on_enter: () => void;
    on_leave: () => void;
}

// tslint:disable-next-line:max-classes-per-file
export class TicketMarketplacePopover extends React.Component<ITicketMarketplacePopoverProps> {

    no_marketplace_warning = (): void => {
        message.config({
            top: 10,
            duration: 2,
            maxCount: 3,
        });
        message.warn('Marketplace is not available for this event');

    }

    render(): React.ReactNode {
        const market = this.props.marketer ? MarketerEnabled[this.props.marketer.name] : false;

        return <Popover
            pose={this.props.hover ? 'visible' : 'hidden'}
            onMouseEnter={this.props.on_enter}
            onMouseLeave={this.props.on_leave}
            style={{borderRadius: 5, float: 'left', marginLeft: 12, background: '#303030', cursor: market ? 'pointer' : 'not-allowed'}}
        >
            {this.props.marketer && market
                ?
                <routes.Link route='marketplace' params={{address: this.props.event_address}}>
                    <div
                        style={{
                            height: 50,
                            width: 229 - 12,
                            borderRadius: 5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography.Text
                            style={{
                                fontSize: 18,
                                color: market ? '#ffffff' : '#505050'
                            }}
                        >
                            {this.props.marketer ? 'Marketplace' : <Spin/>}
                        </Typography.Text>
                    </div>
                </routes.Link>
                :
                <div
                    style={{
                        height: 50,
                        width: 229 - 12,
                        borderRadius: 5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={this.no_marketplace_warning}
                >
                    <Typography.Text
                        style={{
                            fontSize: 18,
                            color: market ? '#ffffff' : '#505050'
                        }}
                    >
                        {this.props.marketer ? 'Marketplace' : <Spin/>}
                    </Typography.Text>
                </div>
            }
        </Popover>;

    }
}

export interface ITicketDetailsPopoverProps {
    ticket_id: number;
    hover: boolean;
    on_enter: () => void;
    on_leave: () => void;
}

// tslint:disable-next-line:max-classes-per-file
export class TicketDetailsPopover extends React.Component<ITicketDetailsPopoverProps> {
    render(): React.ReactNode {
        return <Popover
            pose={this.props.hover ? 'visible' : 'hidden'}
            onMouseEnter={this.props.on_enter}
            onMouseLeave={this.props.on_leave}
            style={{borderRadius: 5, float: 'left', marginLeft: 12, background: '#303030', cursor: 'pointer'}}
        >
            <routes.Link route='ticket' params={{address: this.props.ticket_id}}>
                <div
                    style={{
                        height: 50,
                        width: 129 - 12,
                        borderRadius: 5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography.Text style={{fontSize: 18, color: '#ffffff'}}>Details</Typography.Text>
                </div>
            </routes.Link>
        </Popover>;

    }
}
