import * as React from 'react';
import { FullDiv }  from '../html/FullDiv';

export interface IAppPathProps {}

/**
 * Generates a path with the given name, the result can then be used inside the Gate
 *
 * @param name
 */
export const createPath = (name: string): React.FunctionComponent<IAppPathProps> => {
    const path: React.FunctionComponent<IAppPathProps> = ({children}: {children: React.ReactChild}): React.ReactElement =>
        (<FullDiv>
            {children}
        </FullDiv>);

    path.displayName = name;

    return path;
};
