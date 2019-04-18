import { EventCreationData, EventCreationSetData } from './EventCreationData';
import * as React                                  from 'react';
import { DatePicker, Typography }                  from 'antd';
import { RangePickerProps }                        from 'antd/lib/date-picker/interface';
import moment, { Moment }                          from 'moment';

const RangePicker: React.ComponentType<RangePickerProps> = DatePicker.RangePicker;

export interface EventCreationDatesProps {
    form_data: EventCreationData;
    set_data: EventCreationSetData;
    t: any;
}

export default class EventCreationDates extends React.Component<EventCreationDatesProps> {

    on_change = (times: Moment[]): void => {
        this.props.set_data('dates', {
            start: times[0].valueOf(),
            end: times[1].valueOf()
        });
    }

    render(): React.ReactNode {
        return <div>
            <br/>
            <Typography.Text style={{fontSize: 32}}>{this.props.t('dates_title')}</Typography.Text>
            <br/>
            <br/>
            <div style={{marginLeft: 10}}>
                <Typography.Text style={{fontSize: 18}}>{this.props.t('dates_description')}</Typography.Text>
                <br/>
                <br/>
                <RangePicker
                    showTime={{format: 'HH:mm', defaultValue: [moment('12:00', 'HH:mm'), moment('14:00', 'HH:mm')]}}
                    format='YYYY/MM/DD HH:mm'
                    onChange={this.on_change}
                    style={{width: '50%'}}
                />
            </div>
        </div>;
    }
}
