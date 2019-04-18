import * as React             from 'react';
import { Typography }         from 'antd';
import image                  from './image.svg';
import { NamespacesConsumer } from 'react-i18next';

// Props

export interface GatesErrorsProps {
    message: string;
}

export class GatesErrors extends React.Component<GatesErrorsProps> {
    render(): React.ReactNode {
        return <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div style={{textAlign: 'center'}}>
                <img src={image} style={{width: '50px', marginBottom: '75px'}}/>
                <br/>
                <NamespacesConsumer
                    ns={['messages']}
                >
                    {(t: any): React.ReactNode =>
                        <div>
                            <Typography.Text style={{fontSize: 28, fontWeight: 500}}>{t('error')}</Typography.Text>
                            <Typography.Text
                                style={{fontSize: 28, marginLeft: 24}}
                            >
                                {t(this.props.message)}
                            </Typography.Text>
                        </div>

                    }
                </NamespacesConsumer>
            </div>

        </div>;
    }
}
