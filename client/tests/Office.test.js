/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';

test('Office component renders', () => {
    const component= renderer.create(
		<button>Poop</button>
	);
});
