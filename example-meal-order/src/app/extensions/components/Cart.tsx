import {
  EmptyState,
  Heading,
  Stack,
  Table,
  TableBody,
} from '@hubspot/ui-extensions';
import React from 'react';
import { CartProps } from '../types';
import { CartItemRow } from './CartItemRow';

export const Cart = ({ cart, onRemoveClick }: CartProps) => {
  if (!cart.length) {
    return (
      <Stack align="center">
        <EmptyState
          layout="vertical"
          reverseOrder={true}
          title="Nothing in the cart yet"
        >
          Add some food to send to your contact!
        </EmptyState>
      </Stack>
    );
  }

  return (
    <Stack align="stretch">
      <Heading>Cart</Heading>
      <Table>
        <TableBody>
          {cart.map((item) => (
            <CartItemRow
              item={item}
              key={item.id}
              onRemoveClick={() => onRemoveClick(item.id)}
            />
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
};
