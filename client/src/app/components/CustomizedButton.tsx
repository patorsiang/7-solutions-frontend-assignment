import { Button, ButtonProps } from "@mui/material";

export const CustomizedButton = (props: ButtonProps) => {
  return (
    <Button
      variant="outlined"
      fullWidth
      onClick={props.onClick}
      sx={{
        borderColor: "primary.light",
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      {props.children}
    </Button>
  );
};
