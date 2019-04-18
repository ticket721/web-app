import { StrapiAddress }                    from '@utils/strapi/address';
import * as React                           from 'react';
import { StrapiTicket }                     from '@utils/strapi/ticket';
import { Button, List, Select, Typography } from 'antd';
import Ticket                               from '@web_components/ticket';
import { StrapiEvent }                      from '@utils/strapi/event';
import FilterForm, { FilterOptions }        from './FilterForm';
import LoadingTicket                        from '@web_components/ticket/LoadingTicket';
import { NoTickets }                        from '../message/no_tickets';
import { I18N, I18NProps }                  from '../../utils/misc/i18n';

const Option = Select.Option;

// Props

export interface TicketListProps {
    address: StrapiAddress;
    tickets: StrapiTicket[];
    ticket_count: number;
    filter_setter: (field: string, value: any) => void;
    entry_setter: (entry: number) => void;
    page_size_setter: (page_size: number) => void;
    options: FilterOptions;
    linked_events: StrapiEvent[];
    page_size: number;
}

export interface TicketListState {
    filter: boolean;
}

type MergedTicketListProps = TicketListProps & I18NProps;

class TicketList extends React.Component<MergedTicketListProps, TicketListState> {

    state: TicketListState = {
        filter: false
    };

    set_event = (event: number[]): void => {
        this.props.filter_setter('event', event);
    }

    toggle_filter = (): void => {
        this.setState({
            filter: !this.state.filter
        });
    }

    set_page = (page: number, pageSize: number): void => {
        this.props.entry_setter((page - 1) * pageSize);
    }

    render_item = (ticket: any): React.ReactNode => {
        if (ticket.loader) {
            return <List.Item style={{marginTop: 16, height: 250}}>
                <div style={{height: 250, display: 'flex', alignItem: 'center', justifyContent: 'center'}}>
                    <LoadingTicket/>
                </div>
            </List.Item>;
        }
        return <List.Item style={{marginTop: 16, height: 250}}>
            <div style={{height: 250, display: 'flex', alignItem: 'center', justifyContent: 'center'}}>
                <Ticket ticket={ticket.data}/>
            </div>
        </List.Item>;

    }

    gen_loaders = (count: number): any => {
        const ret = [];
        for (let idx = 0; idx < count; ++idx) {
            ret.push({
                loader: true,
                placeholder: false,
                data: null
            });
        }

        return ret;
    }

    gen_placeholders = (count: number): any => {
        const ret = [];
        for (let idx = 0; idx < count; ++idx) {
            ret.push({
                loader: false,
                placeholder: true,
                data: null
            });
        }

        return ret;
    }

    on_page_size_change = (value: string): void => {
        this.props.page_size_setter(parseInt(value));
    }

    render(): React.ReactNode {
        if (this.props.address === undefined || this.props.address.tickets.length === 0) {
            return <div style={{margin: 100}}>
                <NoTickets/>
            </div>;
        }

        const tickets = this.props.tickets
            ?
            this.props.tickets.map((ticket: StrapiTicket): any => ({loader: false, placeholder: false, data: ticket}))
            :
            this.gen_loaders(this.props.page_size);

        const events = this.props.linked_events || [];

        return <div>
            <Button onClick={this.toggle_filter} style={{marginLeft: 24}} icon={'filter'} type='primary'>
                {this.props.t('list_filter')}
            </Button>
            <div style={{float: 'right', marginRight: 24}}>
                <Select defaultValue='12' onChange={this.on_page_size_change}>
                    <Option key='6' value={6}>6</Option>
                    <Option key='12' value={12}>12</Option>
                    <Option key='24' value={24}>24</Option>
                </Select>
                <Typography.Text style={{marginLeft: 12}}>/ {this.props.t('list_page')}</Typography.Text>
            </div>
            <style>{`
            #filter_container {
                transition: all 0.3s ease-in-out;
                -webkit-transition: all 0.3s ease-in-out;
                -o-transition: all 0.3s ease-in-out;
                -moz-transition: all 0.3s ease-in-out;
            }
            `}</style>
            <div
                id='filter_container'
                style={{
                    height: this.state.filter ? '150px' : '0px',
                    overflow: 'hidden',
                    marginTop: 12,
                    marginBottom: this.state.filter ? 12 : 0,
                    backgroundColor: '#f0f2f5',
                    boxShadow: 'inset 0 1px 2px 1px rgba(0,0,0,0.16)'
                }}
            >
                <div style={{padding: 12}}>
                    <FilterForm
                        options={this.props.options}

                        events={events}
                        set_event={this.set_event}
                    />
                </div>
            </div>
            <div style={{margin: 24, marginTop: 24}}>
                <div style={{textAlign: 'center'}}>
                    <Typography.Text style={{fontSize: 16, color: '#aaaaaa'}}>
                        {this.props.ticket_count} {this.props.t('list_results')}
                    </Typography.Text>
                </div>
                <List
                    grid={{
                        gutter: 32, xs: 1, sm: 1, md: 1, lg: 1, xl: 2, xxl: 3
                    }}
                    dataSource={tickets}
                    renderItem={this.render_item}
                    pagination={{
                        pageSize: this.props.page_size,
                        total: this.props.ticket_count,
                        onChange: this.set_page
                    }}
                />
            </div>
        </div>;
    }
}

export default I18N.withNamespaces(['account'])(TicketList);