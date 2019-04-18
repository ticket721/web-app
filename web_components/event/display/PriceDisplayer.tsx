import * as React                   from 'react';
import { TicketPrices }             from '@utils/event/MinterCategoriesGetter';
import { Card, Select, Typography } from 'antd';
import { FullPageLoader }           from '../../loaders/FullPageLoader';
import CurrencyConverter            from './CurrencyConverter';
import { I18NProps }                from '@utils/misc/i18n';

const Option = Select.Option;

export interface PriceDisplayerProps {
    price: TicketPrices;
    selection: string;
    set_selection: (curr: string) => void;
}

type MergedPriceDisplayerProps = PriceDisplayerProps & I18NProps;

export default class PriceDisplayer extends React.Component<MergedPriceDisplayerProps> {

    render(): React.ReactNode {

        const options = this.props.price
            ?
            Object.keys(this.props.price).map((key: string, idx: number): React.ReactNode => <Option key={key} value={key}>
                {key}
            </Option>)
            :
            [];

        if (this.props.price) {
            return <Card
                style={{width: '100%', height: '100%'}}
            >
                <Typography.Text style={{fontSize: 22, fontWeight: 500}}>
                    {this.props.t('prices_title')}
                </Typography.Text>
                <div style={{width: '100%', textAlign: 'center'}}>
                    <br/>
                    <Typography.Text style={{fontSize: 18}}>
                        {this.props.t('select_currency')}
                    </Typography.Text>
                    <br/>
                    <br/>
                    <Select
                        defaultValue={this.props.selection}
                        showSearch={true}
                        style={{width: '80%'}}
                        placeholder={this.props.t('select_currency')}
                        optionFilterProp='children'
                        onChange={this.props.set_selection}
                    >
                        {options}
                    </Select>
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                    {CurrencyConverter[this.props.selection] ? CurrencyConverter[this.props.selection](this.props.price[this.props.selection]) : '???'}
                </div>
                <br/>
                <br/>
                <div style={{textAlign: 'center'}}>
                    <Typography.Text style={{fontSize: 18}}>{this.props.t('click_to_buy')}</Typography.Text>
                </div>
                <br/>

            </Card>;
        } else {
            return <Card
                style={{width: '100%', height: '100%'}}
            >
                <FullPageLoader/>
            </Card>;
        }

    }
}
