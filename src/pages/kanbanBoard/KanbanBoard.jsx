import { DndContext, DragOverlay } from "@dnd-kit/core";
import { closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { cardSx, cardContentSx, stack1Sx, stack2Props, avatarSx } from "./CardTask.jsx";
import { useState, useCallback } from "react";
import { Container, Stack, Card, CardContent, Typography, Box, Avatar, IconButton } from "@mui/material";
import { kanbanBoardList } from "../../assets/KanbanInitialData.js";
import Column from "./Column";
import { workTypeIconMap, PriorityIconMap } from "./KanbanIconMap.jsx";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";

function findTask(key, boardList) {
    for (let i = 0; i < boardList.length; i++) {
        for (let j = 0; j < boardList[i].tasks.length; j++) {
            if (boardList[i].tasks[j].id === key) {
                return boardList[i].tasks[j];
            }
        }
    }
    return null;
}

const DragOverlayCard = ({ value, boardList }) => {
    const task = findTask(value, boardList);
    if (!task) return null;
    return (
        <Card
            sx={{
                ...cardSx,
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                transform: "scale(1.02)",
                transition: "transform 0.1s ease-out",
            }}
        >
            <CardContent sx={cardContentSx}>
                <Stack sx={stack1Sx}>
                    <Stack {...stack2Props}>
                        <Typography sx={{ fontSize: "0.8rem" }}>{task.title}</Typography>

                        <IconButton disabled size="small" sx={{ color: "text.secondary", p: 0 }}>
                            <EditIcon sx={{ fontSize: 10 }} />
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }} />

                        <IconButton disabled size="small" sx={{ color: "text.secondary" }}>
                            <MoreHorizIcon />
                        </IconButton>
                    </Stack>
                    <Box sx={{ flexGrow: 1 }} />

                    <Stack {...stack2Props}>
                        <Box> {workTypeIconMap(task.workType)}</Box>
                        <Typography sx={{ fontSize: "0.8rem" }}>{task.projectId}</Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box> {PriorityIconMap(task.priority)} </Box>
                        <Avatar sx={avatarSx} src={task.author.photoUrl} />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default function KanbanBoard() {
    const [kanboardList, setKanboardList] = useState(kanbanBoardList);
    const [previewBoard, setPreviewBoard] = useState(kanboardList); // For live preview
    const [activeTaskId, setActiveTaskId] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const updatePreviewBoard = useCallback(
        (activeId, over) => {
            let nextBoard = JSON.parse(JSON.stringify(kanboardList));

            const activeItem = findTask(activeId, nextBoard);
            if (!activeItem) return kanboardList;

            const sourceColumn = nextBoard.find((col) => col.tasks.some((t) => t.id === activeId));
            if (!sourceColumn) return kanboardList;

            const sourceColumnIndex = nextBoard.findIndex((col) => col.id === sourceColumn.id);
            const activeIndex = sourceColumn.tasks.findIndex((t) => t.id === activeId);

            nextBoard[sourceColumnIndex].tasks.splice(activeIndex, 1);

            const overType = over.data.current?.type;
            let targetColumnIndex = -1;
            let overIndex = -1;

            if (overType === "taskType1") {
                const targetColumnId = over.data.current.columnId;
                targetColumnIndex = nextBoard.findIndex((col) => col.id === targetColumnId);

                overIndex = over.data.current.sortable?.index ?? 0;
            } else if (overType === "columnType1") {
                const targetColumnId = over.id;
                targetColumnIndex = nextBoard.findIndex((col) => col.id === targetColumnId);
                // Dropping on the column itself means inserting at the end
                overIndex = nextBoard[targetColumnIndex].tasks.length;
            }

            if (targetColumnIndex >= 0) {
                // Mark as preview
                const taskToInsert = { ...activeItem, isPreview: true };
                const targetTasks = nextBoard[targetColumnIndex].tasks;

                // Insert the preview task
                targetTasks.splice(overIndex, 0, taskToInsert);

                return nextBoard;
            }

            return nextBoard;
        },
        [kanboardList]
    );
    const handleDragEnd = useCallback(
        (event) => {
            const { active, over } = event;
            const activeId = active.id;
            const overId = over?.id;

            if (!overId) {
                setActiveTaskId(null);
                setIsDragging(false);
                setPreviewBoard(kanboardList);
                return;
            }

            const activeType = active.data.current?.type;
            const overType = over.data.current?.type;
            const overAccepts = over.data.current?.accepts;

            if (overAccepts?.includes(activeType) || overType === "taskType1") {
                console.log("Valid drop! Committing reorder...");

                setKanboardList((prev) => {
                    const sourceColumn = prev.find((col) => col.tasks.some((t) => t.id === activeId));
                    if (!sourceColumn) return prev;

                    let targetColumn = sourceColumn;
                    let newTasks = sourceColumn.tasks;
                    let activeIndex = sourceColumn.tasks.findIndex((t) => t.id === activeId);

                    if (overType === "taskType1") {
                        targetColumn = prev.find((col) => col.id === over.data.current.columnId);

                        if (targetColumn.id === sourceColumn.id) {
                            const overIndex = over.data.current.sortable?.index ?? 0;
                            newTasks = arrayMove(sourceColumn.tasks, activeIndex, overIndex);
                        } else {
                            const overIndex = over.data.current.sortable?.index ?? targetColumn.tasks.length; // Simplified index calculation
                            const taskToMove = sourceColumn.tasks.find((t) => t.id === activeId);

                            newTasks = [...targetColumn.tasks.slice(0, overIndex), taskToMove, ...targetColumn.tasks.slice(overIndex)];
                        }
                    } else if (overType === "columnType1") {
                        targetColumn = prev.find((col) => col.id === over.id);
                        if (targetColumn.id === sourceColumn.id) return prev;

                        const taskToMove = sourceColumn.tasks.find((t) => t.id === activeId);
                        newTasks = [...targetColumn.tasks, taskToMove];
                    }

                    return prev.map((col) => {
                        if (col.id === sourceColumn.id) {
                            return { ...col, tasks: sourceColumn.id === targetColumn.id ? newTasks : sourceColumn.tasks.filter((t) => t.id !== activeId) };
                        }

                        if (col.id === targetColumn.id) return { ...col, tasks: newTasks };
                        return col;
                    });
                });
            } else {
                console.log("Invalid drop.");
            }

            setActiveTaskId(null);
            setIsDragging(false);
            setPreviewBoard(kanboardList);
        },
        [kanboardList]
    );

    return (
        <>
            <DndContext
                collisionDetection={closestCorners}
                onDragStart={({ active }) => {
                    setIsDragging(true);
                    setActiveTaskId(active.id);
                    setPreviewBoard(kanboardList); // Init preview as original
                }}
                onDragOver={({ active, over }) => {
                    if (!over || !active.id) return; // WHEN NO DROPPABLE AVAILABLE

                    setPreviewBoard(updatePreviewBoard(active.id, over));
                }}
                onDragEnd={handleDragEnd}
            >
                <Container sx={{ background: "transparent" }}>
                    <Stack direction="row" spacing={2}>
                        {previewBoard.map((column) => (
                            <Column column={column} activeTaskId={activeTaskId} isDragging={isDragging} key={column.id} />
                        ))}
                    </Stack>
                </Container>
                <DragOverlay>{activeTaskId ? <DragOverlayCard value={activeTaskId} boardList={kanboardList} /> : null}</DragOverlay>
            </DndContext>
        </>
    );
}
