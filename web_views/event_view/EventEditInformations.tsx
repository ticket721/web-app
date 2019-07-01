import { StrapiEvent }                 from '../../utils/strapi/event';
import * as React                      from 'react';
import EditName                        from '../../web_components/event/display/EditName';
import { Button, message, Typography } from 'antd';
import { I18N, I18NProps } from '../../utils/misc/i18n';
import { theme }           from '../../utils/theme';
import Strapi           from 'strapi-sdk-javascript';
import { AppState }     from '../../utils/redux/app_state';
import { connect }      from 'react-redux';
import { sign }         from '../../utils/misc/Web3TypedSignature';
import { Dispatch }     from 'redux';
import { StrapiHelper } from '../../utils/StrapiHelper';
import EditDescription  from '../../web_components/event/display/EditDescription';
import EditDates        from '../../web_components/event/display/EditDates';
import EditLocation     from '../../web_components/event/display/EditLocation';

export interface EventEditInformationsProps {
    event: StrapiEvent;
    cancel: () => void;
}

interface EventEditInformationsRState {
    strapi: Strapi;
    web3: any;
    coinbase: string;
}

interface EventEditInformationsRDispatch {
    resetEvent: () => void;
    resetCoinbase: (coinbase: string) => void;
}

type MergedEventEditInformationsProps = EventEditInformationsProps & I18NProps & EventEditInformationsRState & EventEditInformationsRDispatch;

interface EventEditInformationsState {
    values: any;
    saving: boolean;
}

class EventEditInformations extends React.Component<MergedEventEditInformationsProps, EventEditInformationsState> {

    state: EventEditInformationsState = {
        values: null,
        saving: false
    };

    set_values = (field: string, value: any): void => {
        this.setState({
            values: {
                ...this.state.values,
                [field]: value
            }
        });
    }

    on_save = (): void => {
        this.setState({
            saving: true
        });

        let start = this.props.event.start ? new Date(this.props.event.start).getTime().toString() : 'none';
        let end = this.props.event.end ? new Date(this.props.event.end).getTime().toString() : 'none';

        if (this.state.values.dates) {

            if (this.state.values.dates.start) {
                start = this.state.values.dates.start.valueOf().toString();
            }

            if (this.state.values.dates.end) {
                end = this.state.values.dates.end.valueOf().toString();
            }

        }

        let location = this.props.event.location ? JSON.stringify(this.props.event.location) : 'none';

        if (this.state.values.location) {
            location = JSON.stringify(this.state.values.location);
        }

        sign(this.props.web3, this.props.coinbase, [
                {
                    type: 'string',
                    name: 'name',
                    value: this.state.values.name || this.props.event.name
                },
                {
                    type: 'string',
                    name: 'description',
                    value: this.state.values.description || this.props.event.description
                },
                {
                    type: 'string',
                    name: 'start',
                    value: start
                },
                {
                    type: 'string',
                    name: 'end',
                    value: end
                },
                {
                    type: 'string',
                    name: 'location',
                    value: location
                }
            ]
        ).then(async (res: any): Promise<void> => {
            try {
                await this.props.strapi.updateEntry('events', this.props.event.id.toString(), {
                    body: res.payload,
                    signature: res.result
                });

                this.setState({
                    saving: false
                });

                message.config({
                    top: 10,
                    duration: 2,
                    maxCount: 3,
                });
                message.success(this.props.t('event_edit_informations_upload_success'));

                this.props.resetEvent();
                this.props.resetCoinbase(this.props.coinbase);
                this.props.cancel();

            } catch (e) {
                this.setState({
                    saving: false
                });
                message.config({
                    top: 10,
                    duration: 2,
                    maxCount: 3,
                });
                message.error(this.props.t('event_edit_informations_upload_error'));
            }
        }).catch((e: Error): void => {
            this.setState({
                saving: false
            });
            message.config({
                top: 10,
                duration: 2,
                maxCount: 3,
            });
            message.error(this.props.t('event_edit_informations_upload_error'));
        });

    }

    render(): React.ReactNode {

        return <div>
            <Typography.Text style={{fontSize: 42, color: theme.primary}}>{this.props.t('event_edit_informations_title')}</Typography.Text>
            <div style={{width: '50%', marginTop: 24}}>
                <EditName
                    event={this.props.event}
                    on_change={this.set_values.bind(this, 'name')}
                />
                <br/>
                <EditDescription
                    event={this.props.event}
                    on_change={this.set_values.bind(this, 'description')}
                />
                <br/>
                <EditDates
                    event={this.props.event}
                    on_change={this.set_values.bind(this, 'dates')}
                />
                <br/>
                <EditLocation
                    event={this.props.event}
                    on_change={this.set_values.bind(this, 'location')}
                />
                <Button type='primary' style={{marginTop: 24}} onClick={this.on_save}>{this.props.t('event_edit_informations_save')}</Button>
            </div>

        </div>;
    }
}

const mapStateToProps = (state: AppState): EventEditInformationsRState => ({
    strapi: state.app.strapi,
    web3: state.vtxconfig.web3,
    coinbase: state.vtxconfig.coinbase
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: EventEditInformationsProps): EventEditInformationsRDispatch => ({
    resetEvent: (): void => {
        StrapiHelper.resetEntry(dispatch, 'events', ownProps.event.id.toString());
    },
    resetCoinbase: (coinbase: string): void => StrapiHelper.resetEntries(dispatch, 'addresses', {address: coinbase.toLowerCase()})
});

export default I18N.withNamespaces(['events'])(
    connect(mapStateToProps, mapDispatchToProps)(
        EventEditInformations
    )
) as React.ComponentType<EventEditInformationsProps>;
