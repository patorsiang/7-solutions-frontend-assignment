"use client";

import {
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  MouseEvent as ReactMouseEvent,
} from "react";
import { Grid, Stack } from "@mui/material";
import { gridSize, SlackStyle } from "@/app/const/style";
import { CustomizedButton } from "./CustomizedButton";
import { FilterColumns } from "./FilterColumns";
import Items from "../const/items.json";

type Item = {
  type: string;
  name: string;
};

type Data = Array<Item>;

export default function FilterColumnsLayout() {
  const initialItems = useMemo(() => Items, []);
  const [unselectedItems, setUnselectedItems] = useState<Data>(initialItems);
  const [selectedItems, setSelectedItems] = useState<Data>([]);

  // Store timeout IDs to allow cancellation
  const timeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  const defaultTimeout = 5000;

  const handleMutateItems = (
    addFunction: Dispatch<SetStateAction<Data>>,
    removeFunction: Dispatch<SetStateAction<Data>>,
    item: Item,
    timeout: number = defaultTimeout
  ) => {
    // Always cancel any previously scheduled timeout
    const existingTimeout = timeoutsRef.current.get(item.name);
    if (existingTimeout) {
      console.log("canceling existing timeout for", item.name);
      clearTimeout(existingTimeout);
      timeoutsRef.current.delete(item.name);
    }

    if (timeout === 0) {
      // Move immediately
      addFunction((prev) => [...prev, item]);
      removeFunction((prev) => prev.filter((i) => i.name !== item.name));
      return;
    }

    // Move after delay
    const timeoutId = setTimeout(() => {
      addFunction((prev) => [...prev, item]);
      removeFunction((prev) => prev.filter((i) => i.name !== item.name));
      timeoutsRef.current.delete(item.name);
    }, timeout);

    timeoutsRef.current.set(item.name, timeoutId);
  };

  const handleSelectItem = (item: Item) => {
    handleMutateItems(setSelectedItems, setUnselectedItems, item, 0);
    handleMutateItems(setUnselectedItems, setSelectedItems, item);
  };

  const handleUnselectItem = (
    e: ReactMouseEvent<HTMLButtonElement>,
    item: Item
  ) => {
    e.stopPropagation();
    handleMutateItems(setUnselectedItems, setSelectedItems, item, 0);
  };

  const handleSelectedTypeBackToUnselected = (type: string) => {
    const itemsToMove = selectedItems.filter((item) => item.type === type);
    itemsToMove.forEach((item, idx) => {
      handleMutateItems(
        setUnselectedItems,
        setSelectedItems,
        item,
        idx * (defaultTimeout / itemsToMove.length)
      );
    });
  };

  return (
    <Grid container spacing={4} p={2}>
      <Grid size={gridSize}>
        <Stack sx={{ ...SlackStyle }}>
          {unselectedItems.map((item) => (
            <CustomizedButton
              key={item.name}
              onClick={() => {
                handleSelectItem(item);
              }}
            >
              {item.name}
            </CustomizedButton>
          ))}
        </Stack>
      </Grid>
      <FilterColumns
        name="Fruits"
        onClick={() => handleSelectedTypeBackToUnselected("Fruit")}
      >
        <Stack sx={{ ...SlackStyle }}>
          {selectedItems
            .filter((item) => item.type == "Fruit")
            .map((item) => (
              <CustomizedButton
                key={item.name}
                onClick={(e) => handleUnselectItem(e, item)}
              >
                {item.name}
              </CustomizedButton>
            ))}
        </Stack>
      </FilterColumns>
      <FilterColumns
        name="Vegetables"
        onClick={() => handleSelectedTypeBackToUnselected("Vegetable")}
      >
        <Stack sx={{ ...SlackStyle }}>
          {selectedItems
            .filter((item) => item.type == "Vegetable")
            .map((item) => (
              <CustomizedButton
                key={item.name}
                onClick={(e) => handleUnselectItem(e, item)}
              >
                {item.name}
              </CustomizedButton>
            ))}
        </Stack>
      </FilterColumns>
    </Grid>
  );
}
