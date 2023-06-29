import React, { useCallback, useState } from 'react';
import {
  Heading,
  Stack,
  Table,
  TableBody,
  Divider,
  Box,
  Link,
} from '@hubspot/ui-extensions';
import { RestaurantMenuProps } from '../types';
import { MenuItemDetails } from './MenuItemDetails';
import { MenuItemRow } from './MenuItemRow';

export const RestaurantMenu = ({
  restaurant,
  onBackClick,
  onAddClick,
}: RestaurantMenuProps) => {
  const [selected, setSelected] = useState<number>();
  const handleCancelClick = useCallback(() => {
    setSelected(undefined);
  }, []);
  const handleBackClick = selected ? handleCancelClick : onBackClick;
  const selectedMenuItem = restaurant.menu.items.find(
    (item) => item.id === selected
  );

  return (
    <Stack align="stretch">
      <Box>
        <Link preventDefault={true} onClick={handleBackClick}>
          {'< Back'}
        </Link>
      </Box>
      <Heading>{restaurant.name}</Heading>
      <Divider />
      {selectedMenuItem ? (
        <MenuItemDetails
          restaurantId={restaurant.id}
          item={selectedMenuItem}
          menu={restaurant.menu}
          onCancelClick={handleCancelClick}
          onAddClick={onAddClick}
        />
      ) : (
        <Table>
          <TableBody>
            {restaurant.menu.items.map((item) => (
              <MenuItemRow
                key={item.id}
                item={item}
                onClick={() => setSelected(item.id)}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </Stack>
  );
};
