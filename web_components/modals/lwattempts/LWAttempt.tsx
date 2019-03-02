import { TxAttempt }                                                           from '@utils/redux/app_state';
import * as React                                                              from 'react';
import { Modal, Pagination, Icon, Row, Col, List, Avatar, Typography, Button } from 'antd';
import BigNumber                                                               from 'bignumber.js';
import { Markdown }                                                            from 'grommet';
import * as GeoPattern from 'geopattern';

export interface ILWAttemptProps {
    attempts?: TxAttempt[];
    setStatus?: (tx_id: number, status: boolean) => any;
    t?: any;
    coinbase?: string;
}

export interface ILWAttemptState {
    tx_idx: number;
}

/**
 * Renders the modal for a transaction attempt. Summarizes the transaction and waits for user input.
 */
export class LWAttempt extends React.Component<ILWAttemptProps, ILWAttemptState> {

    state: ILWAttemptState = {
        tx_idx: 0
    };

    private readonly handleCancel = (): void => {
        this.props.setStatus(this.props.attempts[this.state.tx_idx].id, false);
    }

    private readonly handleOk = (): void => {
        this.props.setStatus(this.props.attempts[this.state.tx_idx].id, true);
    }

    private readonly handleChange = (new_page: number): void => {
        this.setState({
            tx_idx: new_page - 1
        });
    }

    render(): React.ReactNode {
        const visible: boolean = this.props.attempts.length > 0;

        const error: boolean = visible && this.props.attempts[this.state.tx_idx].error !== null;

        const color: string = !error ? 'green' : 'red';
        const icon: string = !error ? 'check-circle' : 'exclamation-circle';
        const max = this.props.attempts.length;

        let data = [];

        if (visible) {
            const tx = this.props.attempts[this.state.tx_idx].tx;
            const json = tx.toJSON();
            const from = '0x' + Buffer.from(tx.from).toString('hex');

            data = [
                {
                    title: this.props.t('lwattempts_from'),
                    data: <Typography.Text strong={true}>{from}</Typography.Text>,
                    icon: 'arrow-left'
                },
                {
                    title: this.props.t('lwattempts_to'),
                    data: <Typography.Text strong={true}>{json[3]}</Typography.Text>,
                    icon: 'arrow-right'
                },
                {
                    title: this.props.t('lwattempts_value'),
                    data: <Typography.Text strong={true}>
                        {json[4] === '0x' ? '0' : `${(new BigNumber(json[4])).div(new BigNumber('1000000000000000000')).toString()} Ξ`}
                    </Typography.Text>,
                    icon: 'dollar'
                },
                {
                    title: this.props.t('lwattempts_nonce'),
                    data: <Typography.Text strong={true}>
                        {json[0] === '0x' ? '0' : `${new BigNumber(json[0]).toString()}`}
                    </Typography.Text>,
                    icon: 'pushpin'
                },
                {
                    title: this.props.t('lwattempts_gas_price'),
                    data: <Typography.Text strong={true}>{`${new BigNumber(json[1]).toString()} WΞI`}</Typography.Text>,
                    icon: 'check'
                },
                {
                    title: this.props.t('lwattempts_gas_limit'),
                    data: <Typography.Text strong={true}>{`${new BigNumber(json[2]).toString()} WΞI`}</Typography.Text>,
                    icon: 'dashboard'
                }
            ];
            if (json[5] !== '0x') {
                data.push({
                    title: this.props.t('lwattempts_data'),
                    data: <Markdown style={{wordBreak: 'break-word'}}>{json[5]}</Markdown>,
                    icon: 'build'
                });
            }
        } else {
            return null;
        }

        const render_func = (item: any): React.ReactNode => (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar style={{backgroundColor: '#505050', verticalAlign: 'middle'}} size={32} icon={item.icon}/>}
                    title={item.title}
                    description={<div style={{textAlign: 'center'}}>{item.data}</div>}
                />
            </List.Item>
        );

        const pattern = GeoPattern.generate(this.props.coinbase).toDataUrl();

        return (
            <div>
                <style>{`
                        .ant-modal-header {
                            background-image: ${pattern};
                        }
                        .ant-modal-title {
                            color: white;
                        }
                        .ant-modal-close {
                            color: white;
                        }
                    `}</style>
                <Modal
                    visible={visible}
                    title={`${this.props.t('lwattempts_tx')} #${this.state.tx_idx + 1}`}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key='back' onClick={this.handleCancel}>{this.props.t('lwattempts_cancel_button')}</Button>,
                        <Button key='submit' type='primary' disabled={error} onClick={this.handleOk}>
                            {this.props.t('lwattempts_ok_button')}
                        </Button>,
                    ]}
                >
                    <Row>
                        <Col span={8}/>
                        <Col span={8} style={{textAlign: 'center'}}>
                            <Icon type={icon} style={{color, fontSize: '30px'}}/>
                        </Col>
                        <Col span={8}/>
                    </Row>
                    <Row style={{padding: '15px', marginTop: '20px', marginBottom: '20px'}}>
                        {error ?
                            <div style={{textAlign: 'center'}}>
                                <Typography.Text type='danger'>{this.props.attempts[this.state.tx_idx].error}</Typography.Text>
                            </div>
                            : null}
                        <List
                            itemLayout='horizontal'
                            dataSource={data}
                            renderItem={render_func}
                        />
                    </Row>
                    <Row>
                        <Col span={8}/>
                        <Col span={8} style={{textAlign: 'center'}}>
                            <Pagination current={this.state.tx_idx + 1} total={max * 10} onChange={this.handleChange}/>
                        </Col>
                        <Col span={8}/>
                    </Row>
                </Modal>
            </div>
        );

    }
}
