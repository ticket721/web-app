import * as React                                    from 'react';
import { SignAttempt, TypedData }                    from '@utils/redux/app_state';
import { List, message, Row, Statistic, Typography } from 'antd';
import { I18NProps }                                 from '@utils/misc/i18n';
import moment                                        from 'moment';
import { theme }                                     from '../../../utils/theme';

const Countdown = Statistic.Countdown;

// Props

export interface LWSignAttemptProps {
    attempt: SignAttempt;
    timeout: () => void;
}

type MergedLWSignAttemptProps = LWSignAttemptProps & I18NProps;

export default class ILWSignAttempt extends React.Component<MergedLWSignAttemptProps> {

    render_func = (item: TypedData, idx: number): React.ReactNode => {
        if (idx === this.props.attempt.sign.length - 1) {
            return <List.Item>
                <style>{`
                    #sign_infos_modal .ant-list-split .ant-list-item {
                        border-bottom: 1px solid ${theme.lightergrey};
                    }
                `}
                </style>
                    <List.Item.Meta
                        style={{
                            border: null,
                            padding: 12
                        }}
                        title={
                            <Typography.Text
                                style={{fontSize: 16, fontWeight: 400, color: theme.primary}}
                            >
                                {item.name}
                            </Typography.Text>
                        }
                        description={
                            <div
                                style={{marginLeft: 48}}
                            >
                                <Typography.Text
                                    style={{fontSize: 26, color: theme.dark2}}
                                >
                                    {moment(item.value).format('MMMM Do YYYY, h:mm:ss a')}
                                </Typography.Text>
                            </div>
                        }
                    />
            </List.Item>;
        }
        return <List.Item>
            <List.Item.Meta
                style={{
                    border: null,
                    borderTop: `1px solid ${theme.lightergrey}`,
                    borderBottom: null,
                    padding: 12
                }}
                title={
                    <Typography.Text
                        style={{fontSize: 16, fontWeight: 400, color: theme.primary}}
                    >
                        {item.name}
                    </Typography.Text>
                }
                description={
                    <div
                        style={{marginLeft: 48}}
                    >
                        <Typography.Text
                            style={{fontSize: 26, color: theme.dark2}}
                        >
                            {item.value}
                        </Typography.Text>
                    </div>
                }
            />
        </List.Item>;
    }

    on_timeout = (): void => {
        message.config({
            top: 10,
            duration: 2,
            maxCount: 3,
        });
        message.error(this.props.t('lwattempts_sign_timeout'));

        this.props.timeout();

    }

    render(): React.ReactNode {

        const error: boolean = this.props.attempt.error !== null;

        const time = (2 * 60 * 1000); /* Two Minutes */
        const end = this.props.attempt.sign[this.props.attempt.sign.length - 1].value + time;

        return <div id='sign_infos_modal'>
            <div style={{textAlign: 'center'}} id={`sign_attempt_${this.props.attempt.id}`}>
                <Typography.Text style={{fontSize: 18, color: theme.dark2}}>{this.props.t('lwattempts_sign_title')}</Typography.Text>
                <br/>
                <br/>
                <Countdown title={this.props.t('lwattempts_sign_deadline')} value={end} onFinish={this.on_timeout}/>
            </div>
            <Row style={{padding: '15px', marginTop: '20px', marginBottom: '20px'}}>
                {error ?
                    <div style={{textAlign: 'center'}}>
                        <Typography.Text type='danger' style={{color: theme.danger}}>{this.props.attempt.error}</Typography.Text>
                    </div>
                    : null}
                <List
                    itemLayout='horizontal'
                    dataSource={this.props.attempt.sign}
                    renderItem={this.render_func}
                />
            </Row>
        </div>;
    }
}
