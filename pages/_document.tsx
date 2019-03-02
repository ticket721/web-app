import Document, { Head, Main, NextScript } from 'next/document';
import React                                from 'react';

export default class T721Document extends Document {

    static async getInitialProps(ctx: any): Promise<any> {
        const initialProps = await Document.getInitialProps(ctx);
        return {...initialProps};
    }

    render(): React.ReactNode {
        return (
            <html>
            <Head>
                <style/>
            </Head>
            <body className='custom_class'>
            <Main/>
            <NextScript/>
            </body>
            </html>
        );
    }
}
