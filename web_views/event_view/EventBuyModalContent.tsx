import * as React              from 'react';
import { TicketCategory }      from '@utils/event/MinterCategoriesGetter';
import { StrapiEvent }         from '@utils/strapi/event';
import StaticTicketPreview     from '@web_components/event/display/StaticTicketPreview';
import { StrapiAddress }       from '@utils/strapi/address';
import { List, Typography }    from 'antd';
import CurrencyConverter       from '@web_components/event/display/CurrencyConverter';
import EventBuyModalTxProgress from './EventBuyModalTxProgress';
import { Tx }                  from 'ethvtx/lib/state/txs';

// Props

export interface EventBuyModalContentProps {
    t: any;
    address: StrapiAddress;
    event: StrapiEvent;
    category: TicketCategory;
    strapi_url: string;
    price_selection: string;
    tx: Tx;
    tx_id: number;
    ended: boolean;
    sold_out: boolean;
}

const content = [
    {
        title: 'buy_modal_summary_event',
        content: null
    },
    {
        title: 'buy_modal_summary_category',
        content: null
    },
    {
        title: 'buy_modal_summary_price',
        content: null
    }
];

export default class EventBuyModalContent extends React.Component<EventBuyModalContentProps> {

    fill_content = (): any[] => {
        content[0].content = <Typography.Text style={{fontSize: 30}}>{this.props.event.name}</Typography.Text>;

        content[1].content = <Typography.Text style={{textAlign: 'center', fontSize: 30}}>{this.props.category.name}</Typography.Text>;

        content[2].content = CurrencyConverter[this.props.price_selection] ? CurrencyConverter[this.props.price_selection](this.props.category.price[this.props.price_selection], 30) : '???';

        return content;
    }

    render_item = (item: any): React.ReactNode =>
        <List.Item>
            <List.Item.Meta
                title={this.props.t(item.title)}
                description={item.content}
            />
        </List.Item>

    render(): React.ReactNode {

        const filled_content = this.fill_content();

        return <div style={{width: '100%', height: 600}}>
            <div style={{width: '50%', height: '100%', float: 'left', borderRight: '1px solid #e8e8e8'}}>
                <Typography.Text style={{fontSize: 42}}>{this.props.t('buy_modal_first_title')}</Typography.Text>
                <div style={{height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <StaticTicketPreview
                        image={this.props.event.image}
                        event_address={this.props.address.address}
                        name={this.props.event.name}
                        strapi_url={this.props.strapi_url}
                        category={this.props.category}
                        event_begin={this.props.event.start}
                    />
                </div>
            </div>
            {
                this.props.tx_id === null

                    ?
                    this.props.ended || this.props.sold_out

                        ?
                        <div style={{width: '50%', height: '100%', float: 'left', paddingRight: 24, paddingLeft: 24, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography.Text
                                style={{fontSize: 32}}
                            >
                                {this.props.t(`buy_modal_second_title_${this.props.ended ? 'sale_ended' : 'sale_sold_out'}`)}
                            </Typography.Text>
                        </div>

                        :
                        <div style={{width: '50%', height: '100%', float: 'left', paddingRight: 24, paddingLeft: 24}}>
                            <Typography.Text
                                style={{fontSize: 42}}
                            >
                                {this.props.t('buy_modal_second_title')}
                            </Typography.Text>
                            <div style={{height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <List
                                    style={{width: '100%'}}
                                    dataSource={filled_content}
                                    renderItem={this.render_item}
                                />
                            </div>
                        </div>
                    :
                    <EventBuyModalTxProgress t={this.props.t} tx={this.props.tx}/>
            }
        </div>;
    }
}