import { StrapiAddress }          from '@utils/strapi/address';
import * as React                 from 'react';
import { Card, Tabs, Typography } from 'antd';
import TicketListFetcher          from './TicketListFetcher';
import { TabGetter }              from './TabGetter';
import { HandleGetter }           from './misc/HandleGetter';
import { I18N, I18NProps }        from '../../utils/misc/i18n';

const TabPane = Tabs.TabPane;

// Props

export interface AccountTabsProps {
    queried_address: string;
    address: StrapiAddress;
    coinbase: string;
}

type MergedAccountTabsProps = AccountTabsProps & I18NProps;

class AccountTabs extends React.Component<MergedAccountTabsProps> {
    render(): React.ReactNode {

        const handle = HandleGetter(this.props.address, this.props.queried_address, this.props.coinbase)[0];

        const address = this.props.address
            ?
            this.props.address.address
            :
            null;

        const panes: React.ReactNode[] = ([
            <TabPane tab={this.props.t('account_tabs_tickets')} key='tickets'>
                <TicketListFetcher address={this.props.address}/>
            </TabPane>
        ] as React.ReactNode[]).concat(TabGetter(this.props.address, this.props.queried_address, this.props.coinbase, this.props.t));

        return <div style={{width: '96%', marginTop: -32, marginLeft: '2%', marginBottom: 16}}>
            <div style={{marginLeft: 48}}>
                <Typography.Text style={{fontSize: 42}}>
                    {
                        handle
                    }
                </Typography.Text>
                {
                    address
                        ?
                        <div style={{marginTop: -16}}>
                            <br/>
                            <Typography.Text style={{fontSize: 21, color: '#aaaaaa', marginLeft: 32}}>
                                {
                                    address
                                }
                            </Typography.Text>
                        </div>
                        :
                        null
                }
            </div>
            <style>{`
               
                #tab_pane > .ant-card {
                    border: 0px;
                }
                
                #tab_pane > .ant-card > .ant-card-body {
                    padding: 0px;
                }
            `}</style>
            <div style={{width: '100%', height: '100%', paddingLeft: '1%', paddingRight: '1%', backgroundColor: '#303030', backgroundPosition: '10px 10px', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}} id='tab_pane'>
                <Card
                    style={{width: '100%', height: '100%', marginTop: '2%', boxShadow: '0 0 0 0 black'}}
                >
                    <Tabs defaultActiveKey='tickets'>
                        {
                            panes
                        }
                    </Tabs>
                </Card>
            </div>
        </div>;
    }
}

export default I18N.withNamespaces(['account'])(AccountTabs);
