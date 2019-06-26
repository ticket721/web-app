import { StrapiUpload }          from '@utils/strapi/strapiupload';
import * as React                from 'react';
import { Card, Tag, Typography } from 'antd';
import * as GeoPattern           from 'geopattern';
import moment                    from 'moment';
import { Textfit }               from 'react-textfit';

export interface StaticTicketPreviewProps {
    image: StrapiUpload;
    event_address: string;
    name: string;
    strapi_url: string;
    infos: string[];
    event_begin: string;
    on_click?: () => {};
    id?: number;
}

type MergedStaticTicketPreviewProps = StaticTicketPreviewProps;

interface StaticTicketPreviewState {
    hover: boolean;
}

export default class StaticTicketPreview extends React.Component<MergedStaticTicketPreviewProps, StaticTicketPreviewState> {

    state: StaticTicketPreviewState = {
        hover: false
    };

    enter = (): void => {
        this.setState({
            hover: true
        });
    }

    leave = (): void => {
        this.setState({
            hover: false
        });
    }

    render(): React.ReactNode {

        const pattern = GeoPattern.generate(this.props.event_address).toDataUrl();
        const date = this.props.event_begin ? moment(this.props.event_begin).format('DD MMM YYYY') : null;
        const tags = this.props.infos ?
            this.props.infos.map((info: string, idx: number): React.ReactNode =>
                <Tag key={idx}>{info}</Tag>)
            :
            [<Tag key={0}>???</Tag>];

        return <div
            onMouseEnter={this.enter}
            onMouseLeave={this.leave}
            onClick={this.props.on_click}
            id='ticket_preview'
        >  <style>{`
            #ticket_preview .ant-card-body {
                padding: 12px;
            }
            `}</style>
            <Card
                style={{
                    height: 194,
                    width: 500,
                    background: 'linear-gradient(to right, #353550, #232323)',
                    border: '0px',
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                    borderBottomRightRadius: 18,
                    borderTopRightRadius: 6,
                    boxShadow: '0 9px 19px rgba(0,0,0,0.30)'
                }}
                hoverable={true}
            >
                <style>{`
                    #ticket_preview_${this.props.event_address} .ant-card {
                        background-image: ${pattern};
                        border: none; 
                    }
                `}</style>
                <div
                    id={`ticket_preview_${this.props.event_address}`}
                    style={{
                        float: 'left'
                    }}
                >
                    <Card
                        style={{
                            height: 170,
                            width: 170,
                            borderRadius: 6,
                            padding: 15
                        }}
                        cover={
                            this.props.image
                                ?
                                <img alt='icon' src={this.props.strapi_url + this.props.image.url} style={{width: 140, height: 140}}/>
                                :
                                null
                        }
                    />
                </div>
                <div id='crans' style={{width: 2, height: 194, marginTop: -12, background: 'linear-gradient(#f0f2f5 60%, rgba(255,255,255,0) 0%)', backgroundSize: '2px 21px', float: 'left', marginLeft: 12}}/>
                <div
                    style={{
                        height: 170,
                        width: 265,
                        marginLeft: 24,
                        float: 'left',
                    }}
                >
                    <Tag style={{color: '#202020'}} color='#f0f2f5' key={0}>🎫 {this.props.id !== null ? this.props.id : '???'}</Tag>
                    {tags}
                    <div style={{height: '70%', marginTop: '5%'}}>
                        <div className='parent' style={{width: 265, textAlign: 'center', height: '50%', paddingTop: '6.25%'}}>
                            <Textfit
                                mode='single'
                                max={30}
                                forceSingleModeWidth={true}
                                style={{
                                    color: '#ffffff',
                                    fontWeigth: 300
                                }}
                            >
                                {this.props.name}
                            </Textfit>
                        </div>
                        <div style={{height: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            {
                                date
                                    ?
                                    <Typography.Text style={{fontSize: 40, color: '#ffffff', fontWeight: 100}}>{date}</Typography.Text>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </Card>
        </div>;
    }
}
