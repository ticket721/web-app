import * as React               from 'react';
import { Input, Typography }    from 'antd';
import { SyntheticEvent }       from 'react';
import { from_ascii, to_ascii } from '@utils/misc/ascii';

// Props

export interface Bytes32InputProps {
    plugin_name: string;
    name: string;
    value: string;
    on_change: (field: string, value: any) => void;
    t: any;
}

export class Bytes32Input extends React.Component<Bytes32InputProps> {

    private readonly inner_on_change = (e: SyntheticEvent): void => {

        const value = (e.target as any).value;

        if (value && value !== '') {
            if (value.length <= 32) {
                this.props.on_change(this.props.name, from_ascii(value));
            }
        } else {
            this.props.on_change(this.props.name, null);
        }
    }

    render(): React.ReactNode {

        const title = this.props.t(`${this.props.plugin_name}_${this.props.name}`);
        const description = this.props.t(`${this.props.plugin_name}_${this.props.name}_description`);
        const placeholder = this.props.t(`${this.props.plugin_name}_${this.props.name}_placeholder`);

        return <div style={{margin: 30, width: '50%'}}>
            <Typography.Text style={{fontSize: 26}}>{title}</Typography.Text>
            <br/>
            <br/>
            <Typography.Text style={{fontSize: 18, marginLeft: 30}}>{description}</Typography.Text>
            <br/>
            <Input
                type='text'
                placeholder={placeholder}
                value={to_ascii(this.props.value)}
                style={{marginLeft: 20, marginTop: 5}}
                onChange={this.inner_on_change}
            />
        </div>;
    }
}
