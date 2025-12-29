import react, { useState } from "react";

export default function Pages() {
  return (
    <>
      <Box>
        <Stack>
          <Typography sx={{ fontSize: 30 }}> Timer</Typography>
          <TextField value={T}></TextField>
        </Stack>
      </Box>
    </>
  );
}
