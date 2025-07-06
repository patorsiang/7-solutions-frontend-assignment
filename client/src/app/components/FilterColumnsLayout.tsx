"use client";

import { useMemo, useState, Dispatch, SetStateAction } from "react";
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

  const handleMutateItems = (
    addFunction: Dispatch<SetStateAction<Data>>,
    removeFunction: Dispatch<SetStateAction<Data>>,
    item: Item
  ) => {
    addFunction((prev) => [...prev, item]);
    removeFunction((prev) => prev.filter((i) => i.name !== item.name));
  };

  const handleSelectItem = (item: Item) => {
    handleMutateItems(setSelectedItems, setUnselectedItems, item);
  };

  const handleUnselectItem = (item: Item) => {
    handleMutateItems(setUnselectedItems, setSelectedItems, item);
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
      <FilterColumns name="Fruits">
        <Stack sx={{ ...SlackStyle }}>
          {selectedItems
            .filter((item) => item.type == "Fruit")
            .map((item) => (
              <CustomizedButton
                key={item.name}
                onClick={() => handleUnselectItem(item)}
              >
                {item.name}
              </CustomizedButton>
            ))}
        </Stack>
      </FilterColumns>
      <FilterColumns name="Vegetables">
        <Stack sx={{ ...SlackStyle }}>
          {selectedItems
            .filter((item) => item.type == "Vegetable")
            .map((item) => (
              <CustomizedButton
                key={item.name}
                onClick={() => handleUnselectItem(item)}
              >
                {item.name}
              </CustomizedButton>
            ))}
        </Stack>
      </FilterColumns>
    </Grid>
  );
}
