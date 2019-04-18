import * as React                                                        from 'react';
import { Layout, Menu, Icon, Popover, Skeleton, Typography, Breadcrumb } from 'antd';
import dynamic                                                           from 'next-server/dynamic';
import Logo                                                              from '@static/images/logos/logo_light.svg';
import VideoCover                                                        from 'react-video-cover';

const DynamicBreadcrumb = dynamic<any>(async () => import('antd').then((antd: any): any => antd.Breadcrumb), {
        ssr: false,
        loading: (): React.ReactElement => <Skeleton active={true} paragraph={{rows: 0, width: 100}}/>
    }
);

import { Account }            from 'ethvtx/lib/state/accounts';
import * as GeoPattern        from 'geopattern';
import Router                 from 'next/router';
import UrlParse               from 'url-parse';
import { onClient }           from '../../utils/misc/onClient';
import Link                   from 'next/link';
import { routes }             from '../../utils/routing';
import { WalletProviderType } from '../../utils/redux/app_state';
import { I18NProps }          from '../../utils/misc/i18n';

const {
    Content, Sider,
}: any = Layout;

export interface NavBarProps {
    logout: () => any;
}

export interface NavBarExternRState {
    disabled: boolean;
    account: Account;
    provider: WalletProviderType;
}

type MergedNavBarProps = NavBarProps & NavBarExternRState & I18NProps;

interface NavBarState {
    dropDownOpen: boolean;
    collapseOpen: boolean;
}

/**
 * Rendersthe sidebar, or the login video if not logged in
 */
export default class NavBar extends React.Component<MergedNavBarProps, NavBarState> {

    state: NavBarState = {
        dropDownOpen: false,
        collapseOpen: true
    };

    constructor(props: NavBarProps) {
        super(props);

    }

    toggleDropdown = (): void => {
        this.setState({
            ...this.state,
            ...{
                dropDownOpen: !this.state.dropDownOpen
            }
        });
    }

    toggleNavbar = (): void => {
        this.setState({
            ...this.state,
            ...{
                collapseOpen: !this.state.collapseOpen
            }
        });
    }

    render(): React.ReactNode {

        let selection = null;
        const pathname = onClient((): string[] => (new UrlParse(Router.pathname)).pathname.split('/').slice(1).map((path_elem: string) => {
            switch (path_elem) {
                case '_error':
                    return 'Error';
                case 'account':
                    selection = 'account';
                    return 'Account';
                case 'events':
                    selection = 'events';
                    return 'Events';
                case 'event':
                    return 'Event';
                default:
                    return path_elem;
            }
        }))();

        let breadcrumb_items = null;

        if (pathname) {
            if (pathname.length === 1 && pathname[0] === '') {
                breadcrumb_items = [
                    <Breadcrumb.Item key='home'>Home</Breadcrumb.Item>
                ];
            } else {

                breadcrumb_items = [];
                for (const path of pathname) {
                    breadcrumb_items.push(
                        <Breadcrumb.Item key={path}>{path}</Breadcrumb.Item>
                    );
                }
            }

        }

        if (this.props.provider === WalletProviderType.None) {
            return <Layout className='ant-layout ant-layout-has-sider' style={{height: '100%'}} id='app_navbar'>
                <style>{`
                #app_navbar .logo {
                    height: 32px;
                    margin: 20px;
                    position: relative;
                    top: 0;
                    z-index: 200;
                }
                #app_navbar .logout {
                    height: 48px;
                    line-height: 48px;
                    background: #242424;
                    position: absolute;
                    bottom: 48px;
                    width: 100%;
                    text-align: center;
                    cursor: pointer;
                }
                #app_navbar .wallet {
                    height: 48px;
                    line-height: 48px;
                    position: absolute;
                    bottom: 96px;
                    width: 100%;
                    text-align: center;
                    cursor: pointer;
                }
                #__next {
                    background-color: #f0f2f5;
                }
                `}</style>
                <Sider
                    collapsible={true}
                    collapsed={this.state.collapseOpen}
                    onCollapse={this.toggleNavbar}
                >
                    <Link href='/'>
                        <div className='logo' style={{cursor: 'pointer'}}>
                            <img style={{maxHeight: 32}} src={Logo}/>
                        </div>
                    </Link>
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                            position: 'relative',
                            top: -72,
                            zIndex: 0
                        }}
                    >
                        <VideoCover
                            videoOptions={{
                                src: 'http://localhost:1337/uploads/5bbc7b75c2e44f5a89ebe9e282be65a6.mp4',
                                autoPlay: true,
                                loop: true,
                                muted: true
                            }}
                        />
                    </div>

                </Sider>
                <Layout>
                    <Content style={{margin: '0 16px', height: '100%'}}>
                        <DynamicBreadcrumb style={{margin: '16px 0'}}>
                            {breadcrumb_items}
                        </DynamicBreadcrumb>
                        <div style={{height: '90%', minHeight: '90%'}}>
                            {this.props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>;

        }

        let account = <div className='wallet'/>;

        if (this.props.account) {
            const pattern = GeoPattern.generate(this.props.account.address).toDataUrl();

            let popover_content = <Skeleton active={true}/>;

            if (this.props.account.balance) {
                popover_content = <div style={{textAlign: 'center'}}>
                    <Typography.Text style={{fontSize: 48}} strong={true}>{this.props.account.balance.div('1000000000000000000').toFormat(3, 6)}
                        <span style={{fontWeight: 100}}>Ξ</span></Typography.Text>
                </div>;
            }

            const popover_title = <Typography.Text style={{color: '#ffffff', fontSize: 18}}>{this.props.account.address}</Typography.Text>;

            account = <routes.Link route={'account'} params={{}}>
                <div>
                    <style>
                        {`
                .ant-popover-title {
                    background-image: ${pattern};
                    color: #202020;
                }
                `}
                    </style>
                    <Popover placement='rightBottom' title={popover_title} content={popover_content}>
                        <div className='wallet' style={{backgroundImage: pattern}}>
                            <Icon type='wallet' style={{verticalAlign: 'middle', fontSize: 16, color: '#ffffff'}}/>
                            {!this.state.collapseOpen ?
                                <span style={{marginLeft: 20, color: '#ffffff'}}>{this.props.t('wallet')}</span> : null}
                        </div>
                    </Popover>
                </div>
            </routes.Link>;

        }

        return (
            <Layout className='ant-layout ant-layout-has-sider' style={{height: '100%'}} id='app_navbar'>
                <style>{`
                #app_navbar .logo {
                    height: 32px;
                    margin: 20px;
                }
                #app_navbar .logout {
                    height: 48px;
                    line-height: 48px;
                    background: #242424;
                    position: absolute;
                    bottom: 48px;
                    width: 100%;
                    text-align: center;
                    cursor: pointer;
                }
                #app_navbar .wallet {
                    height: 48px;
                    line-height: 48px;
                    position: absolute;
                    bottom: 96px;
                    width: 100%;
                    text-align: center;
                    cursor: pointer;
                }
                #__next {
                    background-color: #f0f2f5;
                }
                `}</style>
                <Sider
                    collapsible={true}
                    collapsed={this.state.collapseOpen}
                    onCollapse={this.toggleNavbar}
                >
                    <Link href='/'>
                        <div className='logo' style={{cursor: 'pointer'}}>
                            <img style={{maxHeight: 32}} src={Logo}/>
                        </div>
                    </Link>

                    <Menu theme='dark' defaultSelectedKeys={['events']} mode='inline' style={{position: 'relative'}} selectedKeys={[selection]}>

                        <Menu.Item key='events'>
                            <Link href='/events'>
                                <div>
                                    <Icon type='experiment'/>
                                    <span>{this.props.t('manage_events')}</span>
                                </div>
                            </Link>
                        </Menu.Item>
                    </Menu>
                    {account}
                    <div className='logout' onClick={this.props.logout}>
                        <div>
                            <Icon type='logout' style={{verticalAlign: 'middle', fontSize: 16, color: '#ffffff'}}/>
                            {!this.state.collapseOpen ?
                                <span style={{marginLeft: 20, color: '#ffffff'}}>{this.props.t('logout')}</span> : null}
                        </div>
                    </div>
                </Sider>
                <Layout>
                    <Content style={{margin: '0 16px', height: '100%'}}>
                        <DynamicBreadcrumb style={{margin: '16px 0'}}>
                            {breadcrumb_items}
                        </DynamicBreadcrumb>
                        <div style={{height: '90%', minHeight: '90%'}}>
                            {this.props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
