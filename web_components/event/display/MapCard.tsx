import * as React           from 'react';
import { Card, Typography } from 'antd';
import MapComponent         from './MapComponent';
import { I18NProps }        from '@utils/misc/i18n';

export interface MapCardProps {
    location: any;
}

type MergedMapCardProps = MapCardProps & I18NProps;

export default class MapCard extends React.Component<MergedMapCardProps> {
    render(): React.ReactNode {

        if (!this.props.location) {
            return <Card
                style={{width: '100%', height: '100%'}}
                title={this.props.t('location_title')}
                size={'small'}
            >
                <br/>
                <br/>
                <div style={{textAlign: 'center'}}>
                    <Typography.Text style={{fontSize: 18}}>
                        {this.props.t('no_location')}
                    </Typography.Text>
                </div>
            </Card>;
        }
        return <div id='gmaps' style={{width: '100%', height: '100%'}}>
            <style>{`
                #gmaps .ant-card-body {
                    padding: 0px;
                }
                `}</style>
            <Card
                style={{width: '100%', height: '100%'}}
            >
                <MapComponent location={this.props.location}/>
            </Card>
        </div>;
    }
}
