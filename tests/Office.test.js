import React from 'react';
import renderer from 'react-test-renderer';

import Office from '../client/src/components/Offices/Office';

test('Office component renders', () => {
	var poop= <button>Poop</button>;
    const component= renderer.create(
		<button>Poop</button>
	);
});