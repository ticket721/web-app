import * as React  from 'react';
import { shallow } from 'enzyme';

import { Test } from './Test';

describe('Test', () => {

    it('renders the Test component', () => {
        const result = shallow(<Test/>).contains(<p>Testing components</p>);
        expect(result).toBeTruthy();
    });

});
