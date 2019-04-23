/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';

import Offices from '../src/components/Offices/Office';

test('Office component renders', () => {
    const component= renderer.create(
		<Offices />
	);
	
	const office= component.toJSON();
	
	console.log(office);
	
	expect(office.state.offices).toBe({});
	
});
