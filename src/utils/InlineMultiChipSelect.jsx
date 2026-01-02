/*NOTE :  this is custom component
=> we will have a drop down menu to select the chips 
=>  every chip selected will be diplayed  in a row flex and if it overflows we will consume next row */ 

import React  , {useState} from 'react' ; 
import { Select, MenuItem , Chip, Avatar, Stack, FormControl , OutlinedInput , Box, FilledInput,  } from '@mui/material' ;   
import { useTheme } from '../theme/ThemeContext.jsx' ; 
export default function InlineMultiChipSelect({
  menuOptions,
  onSelectionChange,
  ...props
}) {
  // EVENT_USER

  const { modeChoice } = useTheme();
  const [isEditing, setEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);

  const roleColorMap = (role, modeChoice) => {
    // FUNCTION
    switch (role) {
      case "Manager":
        return modeChoice === "light" ? "#D32F2F" : "#FF5252";
      case "Designer":
        return modeChoice === "light" ? "#1976D2" : "#448AFF";
      case "Developer":
        return modeChoice === "light" ? "#388E3C" : "#66BB6A";

      case "Tester":
        return modeChoice === "light" ? "#FFEB38" : "#F57C00";
      default:
        return null;
    }
  };
  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);

    if (onSelectionChange) {
      // not empty
      onSelectionChange(newValue);
    }
  };
  const handleDelete = (chipToDelete) => (event) => {
    event.stopPropagation();

    const filteredChips = selectedOption.filter(
      (chip) => chip.uid !== chipToDelete.uid
    );
    setSelectedOption(filteredChips);

    if (onSelectionChange) {
      onSelectionChange(filteredChips);
    }
  };
  return (
    <>
      <Select
        multiple
        value={selectedOption}
        input={
          <FilledInput
            disableUnderline
            sx={{ backgroundColor: "transparent" }}
            id="select-multiple-chip"
            label="Chip"
          />
        }
        onChange={handleChange}
        renderValue={(selected) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              gap: 0.5,
            }}
          >
            {selected.map((value) => (
              <Chip
                key={value.uid}
                label={value.name}
                avatar={<Avatar alt={value.name} src={value.photoUrl} />}
                sx={{
                  justifyContent: "space-between",
                  width: "auto",
                  height: "auto",
                  backgroundColor: roleColorMap(value.role, modeChoice),
                  color: "text.primary",
                }}
                onDelete={handleDelete(value)}
                variant="filled"
              />
            ))}
          </Box>
        )}
      >
        {menuOptions.map((option) => (
          <MenuItem key={option?.uid ?? option?.id} value={option}>
            {option.name ?? option.taskTitle}
          </MenuItem>
        ))}
      </Select>
    </>
  );
} 
