import * as React                   from 'react';
import { AppState }                 from '@utils/redux/app_state';
import { Dispatch }                 from 'redux';
import { connect }                  from 'react-redux';
import { StrapiCallFn, StrapiData } from '@utils/StrapiHelper';
import * as _ from 'lodash-core';

export interface IStrapiCallProps {
    calls?: {[key: string]: StrapiCallFn};
    state?: AppState;
    dispatch?: Dispatch;
}

/**
 * This component was made to be used with a function as children component
 *
 * ```
 *  <StrapiCall
 *
 *      calls={{
 *          ten_tickets: StrapiHelper.getEntries('tickets', {_limit: 10, _sort: 'id'}),
 *          one_ticket : StrapiHelper.getEntry('tickets', '1'),
 *          ticket_count: StrapiHelper.getEntryCount('tickets')
 *       }}
 *
 *  >
 *      {({ten_tickets, one_ticket, ticket_count}: any): React.ReactNode => {
 *              // Do what you want here
 *      }}
 *  </StrapiCall>
 * ```
 *
 */
class StrapiCall extends React.Component<IStrapiCallProps> {

    call_result: {[key: string]: StrapiData} = {};
    render_result: {[key: string]: any[]} = {};

    constructor(props: IStrapiCallProps) {
        super(props);

        for (const key of Object.keys(this.props.calls)) {
            this.call_result[key] = this.props.calls[key](this.props.state, this.props.dispatch);
            this.render_result[key] = this.call_result[key][2];
        }

    }

    static changed(old: StrapiData, data: StrapiData): boolean {
        if (old === undefined) return true;
        if (data[0] > old[0]) return true;
        return !_.isEqual(data[1], old[1]);

    }

    shouldComponentUpdate(nextProps: Readonly<IStrapiCallProps>): boolean {

        let render: boolean = false;

        for (const key of Object.keys(this.props.calls)) {
            const fresh: StrapiData = this.props.calls[key](nextProps.state, nextProps.dispatch);
            if (StrapiCall.changed(this.call_result[key], fresh)) {
                render = true;
                this.call_result[key] = fresh;
                this.render_result[key] = this.call_result[key][2];
            }
        }

        return render;

    }

    render(): React.ReactNode {

        if (typeof this.props.children !== 'function') {
            throw new Error('Children of StrapiCall should be a function');
        }

        return this.props.children(this.render_result);

    }
}

const mapStateToProps = (state: AppState): IStrapiCallProps => ({
    state
});

const mapDispatchToProps = (dispatch: Dispatch): IStrapiCallProps => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(StrapiCall) as React.ComponentClass<IStrapiCallProps>;
