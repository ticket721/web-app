import * as React           from 'react';
import { Card, Typography } from 'antd';
import { I18NProps }        from '@utils/misc/i18n';

export interface DescriptionCardProps {
    description: string;
}

type MergedDescriptionCardProps = DescriptionCardProps & I18NProps;

export default class DescriptionCard extends React.Component<MergedDescriptionCardProps> {
    render(): React.ReactNode {
        if (this.props.description) {
            return <Card
                style={{width: '100%', height: '100%'}}
                title={this.props.t('description_title')}
                size={'small'}
            >
                <Typography.Text style={{fontSize: 18}}>
                    {this.props.description}
                </Typography.Text>
            </Card>;
        } else {
            return <Card
                style={{width: '100%', height: '100%'}}
                title={this.props.t('description_title')}
                size={'small'}
            >
                <div style={{textAlign: 'center'}}>
                <Typography.Text style={{fontSize: 18}}>
                    {this.props.t('no_defined_description')}
                </Typography.Text>
                </div>
            </Card>;
        }
    }
}
