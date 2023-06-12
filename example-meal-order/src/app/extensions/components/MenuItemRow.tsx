import React from 'react';
import {
  Heading,
  Button,
  Text,
  TableRow,
  TableCell,
  Stack,
} from '@hubspot/ui-extensions';
import { MenuItemRowProps } from '../types';
import { formatPrice } from '../utils';

export const MenuItemRow = ({ item, onClick }: MenuItemRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <Heading>{item.name}</Heading>
        <Text variant="microcopy">{item.description}</Text>
      </TableCell>
      <TableCell>
        <Stack align="end">
          <Button onClick={onClick}>{formatPrice(item.price)}</Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
