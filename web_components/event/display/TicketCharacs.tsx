import * as React                   from 'react';
import { Button, Card, Typography } from 'antd';
import { I18N, I18NProps }          from '@utils/misc/i18n';
import { StrapiMarketer }           from '@utils/strapi/marketer';
import { StrapiApprover }           from '@utils/strapi/approver';
import { FullPageLoader }           from '../../loaders/FullPageLoader';
import { MarketerEnabled }          from '../misc/MarketerEnabled';

export interface TicketCharacsProps {
    marketer: StrapiMarketer;
    approver: StrapiApprover;
}

type MergedTicketCharacsProps = TicketCharacsProps & I18NProps;

const MarketerDisplayer = I18N.withNamespaces(['marketers'])(({t, marketer}: any): React.ReactNode =>
    <div style={{textAlign: 'center'}}>
        <br/>
        <Typography.Text style={{fontSize: 20}}>{t('marketplace_strategy')}</Typography.Text>
        <br/>
        <br/>
        <div style={{marginLeft: 16}}>
            <Typography.Text style={{fontSize: 16}}>{t(`${marketer}_concise_description`)}</Typography.Text>
            {
                MarketerEnabled[marketer] === true
                    ?
                    <div style={{textAlign: 'center'}}>
                        <br/>
                        <Button>
                            {t('go_to_marketplace')}
                        </Button>
                    </div>
                    :
                    null
            }
        </div>
    </div>
);

const ApproverDisplayer = I18N.withNamespaces(['approvers'])(({t, approver}: any): React.ReactNode =>
    <div style={{textAlign: 'center'}}>
        <br/>
        <Typography.Text style={{fontSize: 20}}>{t('transfer_strategy')}</Typography.Text>
        <br/>
        <br/>
        <div style={{marginLeft: 16}}>
            <Typography.Text style={{fontSize: 16}}>{t(`${approver}_concise_description`)}</Typography.Text>
        </div>
    </div>
);

export default class TicketCharacs extends React.Component<MergedTicketCharacsProps> {
    render(): React.ReactNode {

        if (!this.props.marketer || !this.props.approver) {

            return <Card
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >
                <FullPageLoader/>
            </Card>;

        }

        return <Card
            style={{
                width: '100%',
                height: '100%'
            }}
        >
            <Typography.Text style={{fontSize: 22, fontWeight: 500}}>
                {this.props.t('characs_title')}
            </Typography.Text>
            <br/>
            <br/>
            <MarketerDisplayer marketer={this.props.marketer.name}/>
            <br/>
            <br/>
            <ApproverDisplayer approver={this.props.approver.name}/>

        </Card>;
    }
}
