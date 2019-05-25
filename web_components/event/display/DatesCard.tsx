import * as React                              from 'react';
import { Card, Divider, Progress, Typography } from 'antd';
import { DateRange }                           from 'react-date-range';
import { I18NProps }                           from '@utils/misc/i18n';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export interface DatesCardProps {
    start: string;
    end: string;
    creation: string;
}

type MergedDatesCardProps = DatesCardProps & I18NProps;

export default class DatesCard extends React.Component<MergedDatesCardProps> {

    do_absolutely_nothing_please = (): void => {};

    render(): React.ReactNode {
        if (this.props.start && this.props.end && this.props.creation) {
            const start = new Date(this.props.start);
            const end = new Date(this.props.end);
            const creation = new Date(this.props.creation);
            const now = Date.now();

            let text;
            let progress = 0;

            if (now < start.getTime()) {
                text = 'time_till_event';
                progress = (now - creation.getTime()) / (start.getTime() - creation.getTime()) * 100;
            } else if (now > start.getTime() && now < end.getTime()) {
                text = 'event_in_progress';
                progress = (now - start.getTime()) / (end.getTime() - start.getTime()) * 100;
            } else {
                text = 'event_ended';
                progress = 100;
            }

            return <Card
                style={{width: '100%', height: '100%'}}
                title={this.props.t('dates_title')}
                size={'small'}
            >
                <style>{`
            #range_displayer .rdrDateDisplay {
                background-color: transparent !important;
            }
            
            #range_displayer .rdrCalendarWrapper {
                width: 100%;
            }
            
            #range_displayer .rdrDateDisplay {
                font-size: 16px;
            }
            
            #range_displayer .rdrDateDisplayItem {
                box-shadow: none;
                border: 1px solid #aaaaaa;
                border-radius: 6px;
                cursor: default;
            }
            
            #range_displayer .rdrDateDisplayItemActive {
                font-size: 16px;
                box-shadow: none;
            }
            
            #range_displayer .rdrDateDisplayItem > input {
                cursor: default;
                color: #121212;
            }
            
            #range_displayer .rdrMonth {
                width: 100%;
            }
            `}</style>
                <div style={{width: '96%', marginLeft: '2%', borderRadius: 8, padding: '5%'}} id='range_displayer'>
                    <DateRange
                        dateDisplayFormat={'MMM D, YYYY, HH:mm'}
                        ranges={[{
                            startDate: new Date(this.props.start),
                            endDate: new Date(this.props.end),
                            key: 'event'
                        }]}
                        showPreview={false}
                        onChange={this.do_absolutely_nothing_please}
                    />
                    <br/>
                    <br/>
                    <div style={{textAlign: 'center'}}>
                        <Typography.Text style={{fontSize: 18, fontWeight: 400}}>{this.props.t(text)}</Typography.Text>
                        <br/>
                        <Progress
                            percent={progress}
                            showInfo={false}
                            status={'active'}
                        />
                    </div>
                </div>
                <Divider style={{marginTop: 0}}/>
                <div style={{textAlign: 'center', fontSize: 18}}>
                    <Typography.Text>
                        {this.props.t('dates_warning')}
                    </Typography.Text>
                </div>
            </Card>;
        } else {
            return <Card
                style={{width: '100%', height: '100%'}}
                title={this.props.t('dates_title')}
                size={'small'}
            >
                <div style={{textAlign: 'center'}}>
                    <Typography.Text style={{fontSize: 18, fontWeight: 300}}>
                        {this.props.t('no_defined_dates')}
                    </Typography.Text>
                </div>
            </Card>;
        }
    }
}
