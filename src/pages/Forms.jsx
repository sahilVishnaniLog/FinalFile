import React from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Divider,
  CardActions,
  Box,
  Chip,
  Paper,
  Skeleton,
} from "@mui/material";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import BlockIcon from "@mui/icons-material/Block";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { workTypeIconMap } from "./kanbanBoard/KanbanIconMap.jsx";
import AddIcon from "@mui/icons-material/Add";
// TODO we will create a hash map for the color map for each new form created by users

const DummyFormData = {
  form_01: {
    title: "Form Title",
    timeStamp: `last edited : ${new Date().toLocaleDateString()} by you`,
    workType: "Task",
    color: "#7f5f01",
  },
  form_02: {
    title: "Another Form",
    timeStamp: `last edited : ${new Date().toLocaleDateString()} by you`,
    workType: "Bug",
    color: "#206a83",
  },
  form_03: {
    title: "Form 3",
    timeStamp: `last edited : ${new Date().toLocaleDateString()} by you`,
    workType: "Request",
    color: "#216e4e",
  },
};

export default function Forms() {
  // we will you use firebase  firestore to save and fetch forms from
  // or we can embed google form using iframe or
  return (
    <>
      <AppBar
        elevation={0}
        position="static"
        sx={{ backgroundColor: "transparent" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <Button
              varaint="contained"
              sx={{
                backgroundColor: "background.paper",
                color: "text.primary",
              }}
              size="large"
              startIcon={<AddIcon />}
            >
              Create new Form
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {Object.entries(DummyFormData).map(([key, value], index) => {
            return (
              <Card
                sx={{
                  height: "20rem",
                  width: "15rem",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index}
              >
                <CardActions>
                  <Stack
                    spacing={1}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      sx={{
                        height: "11rem",
                        width: "13rem",
                        bgcolor: value.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Paper
                        sx={{
                          height: "9rem",
                          width: "7rem",
                          padding: 1,
                          display: "flex",
                          flexDirection: "column",

                          justifyContent: "space-around",
                        }}
                      >
                        <Skeleton
                          variant="rounded"
                          width="4rem"
                          height="0.5rem"
                        ></Skeleton>
                        <Skeleton
                          variant="rounded"
                          width="3rem"
                          height="0.2rem"
                        ></Skeleton>
                        <Skeleton
                          variant="rounded"
                          width="4rem"
                          height="0.5rem"
                        ></Skeleton>
                        <Skeleton
                          variant="rounded"
                          width="2.5rem"
                          height="0.2rem"
                        ></Skeleton>
                        <Skeleton
                          variant="rounded"
                          width="4rem"
                          height="0.5rem"
                        ></Skeleton>
                        <Skeleton
                          variant="rounded"
                          width="2rem"
                          height="0.2rem"
                        ></Skeleton>
                      </Paper>
                    </Box>
                    <Typography>{value.title}</Typography>
                    <Typography variant="body2">{value.timeStamp}</Typography>

                    <Stack
                      spacing={1}
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Chip
                        icon={workTypeIconMap(value.workType)}
                        label={value.workType}
                      ></Chip>
                      <Box sx={{ flexGrow: 1 }} />

                      <IconButton>
                        <CiLock />
                      </IconButton>
                      <IconButton>
                        <MoreHorizIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </CardActions>
              </Card>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
