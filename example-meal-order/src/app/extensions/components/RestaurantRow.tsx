import React from 'react';
import {
  Heading,
  Button,
  Text,
  TableRow,
  TableCell,
  Image,
  Stack,
  Tile,
  Box,
  Link,
} from '@hubspot/ui-extensions';
import { RestaurantRowProps } from '../types';
import { Rating } from './Rating';

const timeRange = (minutes: number) => `${minutes - 5}-${minutes + 5} min`;

export const RestaurantRow = ({ restaurant, onClick }: RestaurantRowProps) => {
  const { name, category, deliveryCost, deliveryInMinutes, rating, image } =
    restaurant;

  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" distance="xs">
          <Image src={image} width={80} />
          <Box>
            <Heading>{name}</Heading>
            <Text variant="microcopy">{category}</Text>
            <Rating value={rating} />
          </Box>
        </Stack>
      </TableCell>
      <TableCell>
        <Text>{timeRange(deliveryInMinutes)}</Text>
      </TableCell>
      <TableCell>
        <Text>${deliveryCost} delivery</Text>
      </TableCell>
      <TableCell>
        <Button onClick={onClick}>Menu</Button>
      </TableCell>
    </TableRow>
  );
};
