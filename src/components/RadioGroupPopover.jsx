import {
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  FormControl,
  RadioGroup,
  Radio,
  Popover,
  Stack,
} from "@mui/material";

const listContent = ["None", "Assignee", "Subtask"];
export default function RadioGroupPopover({
  anchorEl,
  handleClose,
  setChoosenRadio,
  choosenRadio,
}) {
  const open = Boolean(anchorEl);

  const handleSelectChange = (event) => {
    setChoosenRadio(event.target.value);
  };

  return (
    <Popover
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      disableEnforceFocus
      slotProps={{
        paper: {
          onClick: (event) => event.stopPropagation(),
          sx: {
            pointerEvents: "auto",
            bgcolor: "background.paper", // inheriting the theme
            color: "text.primary",
          },
        },
        background: {
          sx: {
            backgroundColor: "transparent",
          },
        },
      }}
    >
      <FormControl>
        <RadioGroup value={choosenRadio} onChange={handleSelectChange}>
          <List sx={{ p: 0 }}>
            <Stack direction="column" spacing={2}>
              {listContent.map((item, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    control={<Radio value={item} sx={{ display: "none" }} />}
                    label={
                      <ListItem disablePadding key={index}>
                        <ListItemButton sx={{ width: "100%" }}>
                          {item}
                        </ListItemButton>
                      </ListItem>
                    }
                  />
                );
              })}
            </Stack>
          </List>
        </RadioGroup>
      </FormControl>
    </Popover>
  );
}
