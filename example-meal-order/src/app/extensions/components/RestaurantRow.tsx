import React from 'react';
import {
  Heading,
  Button,
  Text,
  TableRow,
  TableCell,
  Image,
  Stack,
  Box,
} from '@hubspot/ui-extensions';
import { RestaurantRowProps } from '../types';
import { Rating } from './Rating';
import { formatPrice } from '../utils';

const timeRange = (minutes: number) => `${minutes - 5}-${minutes + 5} min`;

export const RestaurantRow = ({ restaurant, onClick }: RestaurantRowProps) => {
  const { name, category, deliveryCost, deliveryInMinutes, rating, image } =
    restaurant;

  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" distance="xs">
          <Image src={image} width={66} />
          <Box>
            <Stack distance="flush">
              <Heading>{name}</Heading>
              <Text variant="microcopy">{category}</Text>
              <Rating value={rating} />
            </Stack>
          </Box>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack align="center">
          <Text>{timeRange(deliveryInMinutes)}</Text>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack align="center">
          <Text>{formatPrice(deliveryCost)} delivery</Text>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack align="end">
          <Button onClick={onClick}>Menu</Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
