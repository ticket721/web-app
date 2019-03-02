import * as React             from 'react';
import { Grid, Box }          from 'grommet';
import { FullDiv }            from '../../components/html/FullDiv';
import InjectedProviderChoice from './InjectedProviderChoice';
import T721ProviderChoice     from './T721ProviderChoice';

export interface IProviderSelectionViewProps {
    t?: any;
}

export interface IProviderSelectionViewState {

}

/**
 * Provider selection buttons
 */
export class ProviderSelectionView extends React.Component<IProviderSelectionViewProps, IProviderSelectionViewState> {
    render(): React.ReactNode {
        return <FullDiv style={{padding: '2%'}}>
            <Grid

                fill={true}
                rows={['xxsmall', 'auto']}
                columns={['auto', '1/3', '1/3', 'auto']}
                gap='small'
                areas={[
                    {name: 'title', start: [1, 0], end: [2, 0]},
                    {name: 'injected_provider_choice', start: [1, 1], end: [1, 1]},
                    {name: 't721_provider_choice', start: [2, 1], end: [2, 1]},
                ]}
            >
                <Box gridArea='title'>
                    <h1 style={{fontWeight: 100, textAlign: 'center', margin: 0}}>{this.props.t('title')}</h1>
                </Box>
                <Box style={{padding: '5%'}} gridArea='injected_provider_choice'>
                    <InjectedProviderChoice/>
                </Box>
                <Box style={{padding: '5%'}} gridArea='t721_provider_choice'>
                    <T721ProviderChoice/>
                </Box>
            </Grid>
        </FullDiv>;
    }
}
