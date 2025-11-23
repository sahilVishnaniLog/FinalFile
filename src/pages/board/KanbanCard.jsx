import react from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Dialog,
} from "@mui/material";
import { workTypeIconMapm, PriorityIconMap } from "./Initialdata.jsx";
import {
  Bug,
  Bookmark,
  Proportions,
  ShieldCheck,
  SquarePlus,
  ChevronDown,
  ChevronUp,
  ChevronsDown,
  ChevronsUp,
  EqualApproximately,
} from "lucide-react";

export default function Cards({ task }) {
  return (
    <>
      <Card
        key={task.id}
        sx={{
          bgcolor: "board.card",
          padding: "1rem",
          margin: "0rem",
        }}
      >
        <CardActionArea>
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontWeight: "bold" }}> {task.title} </Typography>
            <IconButton
              sx={{
                opacity: 0,
                transtion: "opacity 0.2s ease-in-out",
                "&:hover, &:focus": { opacity: 1 },
              }}
            >
              <Ellipsis size={16} />
            </IconButton>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Chip
                color="board.card"
                icon={workTypeIconMap(task.workType)}
                label={task.Project.title}
              />
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
              {PriorityIconMap(task.priority)}
              <Avatar sx={{ fontWeight: "bold" }} />
            </Box>
          </Stack>
        </CardActionArea>
      </Card>
    </>
  );
}
