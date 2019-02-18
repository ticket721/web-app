import React from 'react';
import { Test } from '@components/Test';

export default class extends React.Component {
    render(): React.ReactNode {
        return (
            <div>
                Hello Next.js
                <Test/>
            </div>
        );
    }
}
