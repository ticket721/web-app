import { LocalWallet, LocalWalletStatus } from '@utils/redux/app_state';
import * as React                         from 'react';
import { LWUnlockForm }                   from './LWUnlockForm';
import { Wallet, fromV3 }                 from 'ethereumjs-wallet';
import { LWManager }                      from '../../../utils/redux/LWManager';

export interface ILWUnlockProps {
    lw?: LocalWallet;
    unlocked?: (wallet: Wallet, period: number) => any;
    unlocking?: () => any;
    t?: any;
    coinbase?: string;
}

export interface ILWUnlockState {
}

/**
 * Renders the modal to unlock the local wallet with the wallet password.
 */
export class LWUnlock extends React.Component<ILWUnlockProps, ILWUnlockState> {

    formRef: any;

    handleCancel = (): void => {
        this.props.unlocking();
    }

    handleCreate = (): void => {
        const form = this.formRef.props.form;
        this.formRef.setMsg(null);

        form.validateFields((err: Error, values: any) => {

            if (err) {
                return;
            }

            this.formRef.load();

            setTimeout(() => {

                const password: string = values.password;

                form.resetFields();

                try {
                    const decrypted_wallet = LWManager.unlock(this.props.lw.private_key, password);
                    this.props.unlocked(decrypted_wallet, Date.now() + (3 * 60 * 1000));
                    this.formRef.load();
                } catch (e) {
                    this.formRef.setMsg(this.props.t('lwunlock_invalid_password'));
                    this.formRef.load();
                }
            }, 200);

        });

    }

    saveFormRef = (formRef: any): void => {
        this.formRef = formRef;
    }

    render(): React.ReactNode {

        const visible: boolean = this.props.lw.status === LocalWalletStatus.Unlocking;

        return (
            <LWUnlockForm
                wrappedComponentRef={this.saveFormRef}
                visible={visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
                t={this.props.t}
                coinbase={this.props.coinbase}
            />
        );
    }
}
