import { ReactNode } from "react";
import { Grid, Box } from "@mui/material";
import { gridSize } from "@/app/const/style";

export const FilterColumns = ({
  children,
  name,
  onClick,
}: {
  children: ReactNode;
  name: string;
  onClick?: () => void;
}) => {
  return (
    <Grid
      size={gridSize}
      sx={{ border: "1px solid", borderColor: "primary.light" }}
      onClick={onClick}
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
