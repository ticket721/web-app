import { StrapiAddress } from '@utils/strapi/address';
import * as React        from 'react';
import {
    Layout, Menu, Icon, Skeleton
} from 'antd';

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
            return <Sider width={250} style={{ background: '#fff', height: '100%', overflow: 'auto'}}>
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

        const create_event = <Menu.Item key='create' style={{backgroundColor: '#202020', color: '#ffffff', marginTop: 24}}>
            <Icon type='plus' />
            <span>Create event</span>
        </Menu.Item>;

        const events = [];

        events.push(create_event);

        if (this.props.coinbase) {
            let idx = 0;
            for (const event of this.props.coinbase.queuedevents) {
                events.push(<Menu.Item key={idx} style={{marginTop: idx === 0 ? 24 : 0, backgroundColor: '#FFFFEE'}}>
                    <Icon type='form'/>
                    <span>{event.name}</span>
                </Menu.Item>);
                ++idx;
            }
            for (const event of this.props.coinbase.events) {
                events.push(<Menu.Item key={idx} style={{marginTop: idx === 0 ? 24 : 0}}>
                    <Icon type='right'/>
                    <span>{event.name}</span>
                </Menu.Item>);
                ++idx;
            }
        }

        return <Sider width={250} style={{ background: '#fff', height: '100%', overflow: 'auto'}}>
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
