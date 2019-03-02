import * as React                   from 'react';
import { FullDiv }                  from '../../components/html/FullDiv';
import { Box, Grid }                from 'grommet';
import { RegisterViewForm } from './RegisterViewForm';
import t721_auth_logo from '@static/images/auth/t721_auth_logo.png';

export interface IRegisterViewProps {
    switch?: () => void;
}

export interface IRegisterViewState {

}

/**
 * Register Form
 */
export class RegisterView extends React.Component<IRegisterViewProps, IRegisterViewState> {
    render(): React.ReactNode {
        return <FullDiv style={{padding: '2%'}}>
            <Grid

                fill={true}
                rows={['1/4', '1/2', '1/4']}
                columns={['1/3', '1/3', '1/3']}
                gap='small'
                areas={[
                    {name: 'logo', start: [1, 0], end: [1, 0]},
                    {name: 'form', start: [1, 1], end: [1, 1]}
                ]}
            >
                <Box alignContent='center' alignSelf='center' align='center' gridArea='logo'>
                    <img
                        src={t721_auth_logo}
                        style={{
                            height: 'auto',
                            width: '60%'
                        }}
                    />
                </Box>
                <Box align='center' alignContent='center' alignSelf='center' gridArea='form'>
                    <RegisterViewForm switch={this.props.switch}/>
                </Box>
            </Grid>
        </FullDiv>;
    }
}
