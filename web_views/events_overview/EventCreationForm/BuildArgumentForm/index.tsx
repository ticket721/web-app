import * as React            from 'react';
import { UintInput }         from './UintInput';
import { extras, overrides } from './overrides';
import { DateInput }         from './DateInput';
import { PriceInput }        from './PriceInput';
import { DynamicsInput }     from './DynamicsInput';
import { Bytes32Input }      from './Bytes32Input';
import { NamespacesConsumer } from 'react-i18next';

interface Argument {
    name: string;
    type: string;
}

// Props

export interface BuildArgumentFormProps {
    arguments: Argument[];
    argument_values: any;
    name: string;
    plugin_type: string;
    on_change: (field: string, value: any) => void;
}

export default class BuildArgumentForm extends React.Component<BuildArgumentFormProps> {

    render(): React.ReactNode {
        const form: React.ReactNode[] = [];

        let argument_list = this.props.arguments;

        if (extras[this.props.name]) {
            argument_list = argument_list.concat(Object.keys(extras[this.props.name]).map((name: string): any =>
                ({
                    name,
                    type: extras[this.props.name][name]
                })));
        }

        for (const argument of argument_list) {
            let type = argument.type;
            if (overrides[this.props.name] && overrides[this.props.name][argument.name]) {
                type = overrides[this.props.name][argument.name];
            }
            if (typeof type === 'string') {
                switch (type) {
                    case 'bytes32':

                        form.push(
                            <NamespacesConsumer ns={[this.props.plugin_type]} key={argument.name}>
                                {(t: any): React.ReactNode =>
                                    <Bytes32Input
                                        t={t}
                                        name={argument.name}
                                        plugin_name={this.props.name}
                                        value={this.props.argument_values[argument.name]}
                                        on_change={this.props.on_change}
                                    />
                                }
                            </NamespacesConsumer>
                        );

                        break;

                    case 'uint256':

                        form.push(
                            <NamespacesConsumer ns={[this.props.plugin_type]} key={argument.name}>
                                {(t: any): React.ReactNode =>
                                    <UintInput
                                        plugin_name={this.props.name}
                                        name={argument.name}
                                        value={this.props.argument_values[argument.name]}
                                        on_change={this.props.on_change}
                                        t={t}
                                    />
                                }
                            </NamespacesConsumer>
                        );

                        break;

                    case 'date':

                        form.push(
                            <NamespacesConsumer ns={[this.props.plugin_type]} key={argument.name}>
                                {(t: any): React.ReactNode =>
                                    <DateInput
                                        t={t}
                                        plugin_name={this.props.name}
                                        name={argument.name}
                                        value={this.props.argument_values[argument.name]}
                                        on_change={this.props.on_change}
                                    />
                                }
                            </NamespacesConsumer>
                        );

                        break;

                    case 'price':

                        form.push(
                            <NamespacesConsumer ns={[this.props.plugin_type]} key={argument.name}>
                                {(t: any): React.ReactNode =>
                                    <PriceInput
                                        plugin_name={this.props.name}
                                        name={argument.name}
                                        value={this.props.argument_values[argument.name]}
                                        on_change={this.props.on_change}
                                        t={t}
                                    />
                                }
                            </NamespacesConsumer>
                        );

                        break;

                    default:

                }
            } else if (typeof type === 'object' && (type as any).type) {
                const complex_type: any = type;
                switch (complex_type.type) {
                    case 'dynamics':

                        form.push(
                            <NamespacesConsumer ns={[this.props.plugin_type]} key={argument.name}>
                                {(t: any): React.ReactNode =>
                                    <DynamicsInput
                                        plugin_type={this.props.plugin_type}
                                        plugin_name={this.props.name}
                                        fields={complex_type.fields}
                                        name={argument.name}
                                        value={this.props.argument_values}
                                        on_change={this.props.on_change}
                                        dispatcher={complex_type.dispatcher}
                                        recover={complex_type.recover}
                                        t={t}
                                    />
                                }
                            </NamespacesConsumer>
                        );

                        break;

                }
            }
        }

        return <div>
            {form}
        </div>;
    }

}
