import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NextUIProvider, Container } from '@nextui-org/react';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <NextUIProvider>
      <Container lg gap={2} css={{ mt: '$10' }}>
        <App />
      </Container>
    </NextUIProvider>
  </StrictMode>
);
