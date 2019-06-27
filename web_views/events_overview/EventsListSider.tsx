import { StrapiAddress } from '@utils/strapi/address';
import * as React        from 'react';
import {
    Layout, Menu, Icon, Skeleton
}                        from 'antd';
import { theme }         from '../../utils/theme';

const {
    Sider,
}: any = Layout;

// Props

export interface EventsListSiderProps {
    coinbase: StrapiAddress;
    selection: string;
    updateSelection: (key: string) => void;
}

export default class EventsListSider extends React.Component<EventsListSiderProps> {

    constructor(props: EventsListSiderProps) {
        super(props);

    }

    onSelect = ({key}: any): void => {
        this.props.updateSelection(key);
    }

    render(): React.ReactNode {

        if (this.props.coinbase === undefined) {
            return <Sider width={280} style={{ background: theme.white, height: '100%', overflow: 'auto'}}>
                <style>{`
                    .ant-menu-inline {
                        border-right: none;
                    }
                `}</style>
                <Menu
                    mode='inline'
                    style={{ height: '100%' }}
                >
                    <Menu.Item key='loading_0' disabled={true}>
                        <Skeleton active={true} paragraph={{width: [350]}}/>
                    </Menu.Item>
                    <Menu.Item key='loading_1' disabled={true}>
                        <Skeleton active={true} paragraph={{width: [300]}}/>
                    </Menu.Item>
                    <Menu.Item key='loading_2' disabled={true}>
                        <Skeleton active={true} paragraph={{width: [400]}}/>
                    </Menu.Item>
                </Menu>
            </Sider>;

        }

        const create_event = <Menu.Item key='create' style={{backgroundColor: theme.dark2, color: theme.white, marginTop: 24, border: 'none'}}>
            <Icon type='plus' />
            <span>Create event</span>
        </Menu.Item>;

        const events = [];

        events.push(create_event);

        if (this.props.coinbase) {
            let idx = 0;
            for (const event of this.props.coinbase.queuedevents) {
                events.push(<Menu.Item key={idx} style={{marginTop: idx === 0 ? 24 : 0, backgroundColor: theme.queuedevent}}>
                    <Icon style={{color: theme.dark2}} type='form'/>
                    <span style={{color: theme.dark2}}>{event.name}</span>
                </Menu.Item>);
                ++idx;
            }
            for (const event of this.props.coinbase.events) {
                events.push(<Menu.Item key={idx} style={{marginTop: idx === 0 ? 24 : 0, backgroundColor: theme.white}}>
                    <Icon style={{color: theme.dark2}} type='right'/>
                    <span style={{color: theme.dark2}}>{event.name}</span>
                </Menu.Item>);
                ++idx;
            }
        }

        return <Sider width={280} style={{ background: theme.white, height: '100%', overflow: 'auto'}}>
            <style>{`
                    .ant-menu-inline {
                        border-right: none;
                    }
                `}</style>
            <Menu
                mode='inline'
                selectedKeys={this.props.selection ? [this.props.selection] : undefined}
                onSelect={this.onSelect}
                style={{height: '100%'}}
            >
                {events}
            </Menu>
        </Sider>;
    }

}
