import NextI18Next from 'next-i18next';

export const I18N = new NextI18Next({
    otherLanguages: ['fr'],
    localeSubpaths: true
});

export const namespaces = {
    '/': ['navbar', 'provider_selection', 'auth', 'local_wallet_creation', 'lwmodals'],
    '/account': ['navbar', 'provider_selection', 'auth', 'local_wallet_creation', 'lwmodals'],
    '/_error': ['navbar']
};
