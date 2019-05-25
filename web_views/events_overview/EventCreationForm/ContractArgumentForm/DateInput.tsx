import * as React                 from 'react';
import { DatePicker, Typography } from 'antd';
import moment, { Moment }         from 'moment';

// Props

export interface DateInputProps {
    plugin_name: string;
    name: string;
    value: number;
    on_change: (field: string, value: any) => void;
    t: any;
}

export class DateInput extends React.Component<DateInputProps> {

    private readonly inner_on_change = (val: Moment): void => {
        this.props.on_change(this.props.name, val.valueOf() / 1000);
    }

    private readonly disable_past = (val: Moment): boolean =>
        (val.valueOf() < Date.now())

    render(): React.ReactNode {

        const title = this.props.t(`${this.props.plugin_name}_${this.props.name}`);
        const description = this.props.t(`${this.props.plugin_name}_${this.props.name}_description`);
        const placeholder = this.props.t(`${this.props.plugin_name}_${this.props.name}_placeholder`);

        return <div style={{margin: 30}}>
            <Typography.Text style={{fontSize: 26}}>{title}</Typography.Text>
            <br/>
            <br/>
            <div style={{marginLeft: 30}}>
                <Typography.Text style={{fontSize: 18}}>{description}</Typography.Text>
            </div>
            <br/>
            <DatePicker
                style={{width: '100%', marginLeft: 20, marginTop: 5}}
                showToday={false}
                showTime={{format: 'HH:mm', defaultValue: moment('12:00:00', 'HH:mm')}}
                value={this.props.value ? moment(this.props.value * 1000) : undefined}
                placeholder={placeholder}
                disabledDate={this.disable_past}
                onOk={this.inner_on_change}
                onChange={this.inner_on_change}
            />
        </div>;
    }
}
