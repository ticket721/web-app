import App, { Container } from 'next/app';
import React from 'react';

export default class T721App extends App {

    static async getInitialProps({ Component, router, ctx }: any): Promise<any> {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return {pageProps};
    }

    render(): React.ReactNode {
        const {Component, pageProps}: any = this.props;
        return <Container>
            <Component {...pageProps} />
        </Container>;
    }
}
