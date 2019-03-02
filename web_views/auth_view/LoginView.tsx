import * as React                   from 'react';
import { FullDiv }                  from '../../components/html/FullDiv';
import { Box, Grid }                from 'grommet';
import { LoginViewForm } from './LoginViewForm';
import t721_auth_logo from '@static/images/auth/t721_auth_logo.png';

export interface ILoginViewProps {
    switch?: () => void;
}

export interface ILoginViewState {

}

/**
 * Login Form
 */
export class LoginView extends React.Component<ILoginViewProps, ILoginViewState> {
    render(): React.ReactNode {
        return <FullDiv style={{padding: '2%'}}>
            <Grid

                fill={true}
                rows={['1/3', '1/3', '1/3']}
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
                <Box alignContent='center' alignSelf='center' align='center' gridArea='form'>
                    <LoginViewForm switch={this.props.switch}/>
                </Box>
            </Grid>
        </FullDiv>;
    }
}
