import { Reducer }                                                 from 'redux';
import { InitialAppState, LWTransactionsSection, TxAttempt }       from '../app_state';
import { ILWTXAddAttempt, ILWTXSetStatus, LWTXActions, LWTXTypes } from './actions';

const LWTXAddAttemptReducer: Reducer<LWTransactionsSection, ILWTXAddAttempt> =
    (state: LWTransactionsSection, action: ILWTXAddAttempt): LWTransactionsSection => ({
        ...state,
        attempts: [
            ...state.attempts,
            {
                tx: action.tx,
                error: action.error,
                id: action.id,
                validate: null
            }
        ]
    });

const LWTXSetStatusReducer: Reducer<LWTransactionsSection, ILWTXSetStatus> =
    (state: LWTransactionsSection, action: ILWTXSetStatus): LWTransactionsSection => ({
        ...state,
        attempts: [
            ...state.attempts.map((tx: TxAttempt) => {
                if (tx.id === action.id) {
                    tx.validate = action.status;
                }
                return tx;
            })
        ]

    });

export const LWTXReducer: Reducer<LWTransactionsSection, LWTXTypes> =
    (state: LWTransactionsSection = InitialAppState.lwtx, action: LWTXTypes): LWTransactionsSection => {

        switch (action.type) {
            case LWTXActions.AddAttempt:
                return LWTXAddAttemptReducer(state, action as ILWTXAddAttempt);
            case LWTXActions.SetStatus:
                return LWTXSetStatusReducer(state, action as ILWTXSetStatus);
            default:
                return state;
        }

    };
