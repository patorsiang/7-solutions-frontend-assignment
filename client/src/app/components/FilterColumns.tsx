import { ReactNode } from "react";
import { Grid, Box } from "@mui/material";
import { gridSize } from "@/app/const/style";

export const FilterColumns = ({
  children,
  name,
}: {
  children: ReactNode;
  name: string;
}) => {
  return (
    <Grid
      size={gridSize}
      sx={{ border: "1px solid", borderColor: "primary.light" }}
    >
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          p: 1,
          borderColor: "primary.light",
          bgcolor: "primary.light",
        }}
      >
        {name}
      </Box>
      <Box p={2}>{children}</Box>
    </Grid>
  );
};
