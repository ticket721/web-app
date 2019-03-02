import Tx         from 'ethereumjs-tx';
import { Action } from 'redux';

export const LWTXActions = {
    AddAttempt: '[LWTX] ADD_ATTEMPT',
    SetStatus: '[LWTX] SET_STATUS'
};

export interface ILWTXAddAttempt extends Action<string> {
    tx: Tx;
    error: string;
    id: number;
}

/**
 * A New Transaction attempt is created.
 *
 * @param tx
 * @param error
 * @param id
 * @constructor
 */
export const LWTXAddAttempt = (tx: Tx, error: string, id: number): ILWTXAddAttempt => ({
    type: LWTXActions.AddAttempt,
    tx,
    error,
    id
});

export interface ILWTXSetStatus extends Action<string> {
    id: number;
    status: boolean;
}

/**
 * Resolves a previously created transaction attempt
 *
 * @param id
 * @param status
 * @constructor
 */
export const LWTXSetStatus = (id: number, status: boolean): ILWTXSetStatus => ({
    type: LWTXActions.SetStatus,
    id,
    status
});

export type LWTXTypes = ILWTXAddAttempt | ILWTXSetStatus;
