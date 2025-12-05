import React from "react";
import {
  MenuItem,
  FormControl,
  Select,
  OutlinedInput,
  InputLabel,
} from "@mui/material";

const listItem = ["one", "two", "three", "four"];
const selectedNames = (firstname, secondName) => {
  return String({ firstname, secondName });
};

export default function inlineMultiSelect() {
  return (
    <>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          multiple
          displayEmpty
          value={selectedNames("one", "two")}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em> Placeholder</em>;
            }
            return selected.join(" , ");
          }}
        ></Select>
      </FormControl>
    </>
  );
}
