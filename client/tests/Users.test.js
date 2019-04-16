import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/Users/Pages/User';

@Test
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
