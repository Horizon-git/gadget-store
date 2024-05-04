import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './main.css';
import { store } from './app/store';

import { Root } from './Root';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <Root />
    </Provider>,
  );
} else {
  console.error('Root element with id "root" not found in the document.');
}
