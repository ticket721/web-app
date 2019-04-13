import { I18N }                          from '@utils/misc/i18n';
import { ILocalWalletCreationViewProps } from './LocalWalletCreationView';
import dynamic                           from 'next/dynamic';
import * as React                        from 'react';

const LocalWalletCreationView: React.ComponentType<ILocalWalletCreationViewProps> = dynamic<ILocalWalletCreationViewProps>(async () => import('./LocalWalletCreationView'), {
    loading: (): React.ReactElement => null
});

export default I18N.withNamespaces(['local_wallet_creation'])(LocalWalletCreationView);
