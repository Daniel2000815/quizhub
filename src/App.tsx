import React from 'react';
import { Popover, Button, Text } from '@nextui-org/react';

export default function App() {
  const [hola, setA] = React.useState<string>('hola');
  return (
    <Popover>
      <Popover.Trigger>
        <Button auto flat>
          {hola}
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Text css={{ p: '$10' }}>This is the content of the popover.</Text>
      </Popover.Content>
    </Popover>
  );
}
