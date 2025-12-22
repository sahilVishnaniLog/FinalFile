import { Box, Paper, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import KanbanBoardlist, { UserData } from "../assets/KanbanInitialData.js";
import { PriorityIconMap } from "./kanbanBoard/KanbanIconMap.jsx";
import { MaterialReactTable } from "material-react-table";

// const columns = [
//   {
//     field: "projectID-taskTitle",
//     headerName: "Work",
//     flex: 2,
//     width: 250,
//     editable: true,
//   },

//   {
//     field: "asignedTo",
//     headerName: "Assignee",
//     flex: 1,
//     width: 100,
//     editable: true,
//   },
//   {
//     field: "author",
//     headerName: "Reporter",
//     flex: 1,
//     width: 100,
//     editable: true,
//   },
//   {
//     field: "task_priority",
//     headerName: "Priority",
//     flex: 1,
//     width: 100,
//     editable: true,
//   },
//   {
//     field: "columnOrder",
//     headerName: "Status",
//     flex: 1,
//     width: 100,
//     editable: true,
//   },
//   {
//     field: "resolution",
//     headerName: "Resolution",
//     flex: 1,
//     width: 100,
//     editable: true,
//   },
//   {
//     field: "dateOfCreation",
//     headerName: "Created",
//     flex: 1,
//     width: 100,
//     editable: true,
//   },
//   {
//     field: "lastEditedDate",
//     headerName: "Updated",
//     flex: 1,
//     width: 100,
//     editable: true,
//   },
//   {
//     field: "dueDate", // field name should m
//     headerName: "Due Date",
//     flex: 2,
//     width: 100,
//     editable: true,
//   },
// ];

// const rows = [
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: "MBA-1 Task-1",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
//   {
//     id: 1,
//     projectID_taskTitle: " MBA-1 Task-1,",
//     assingedTo: UserData[0].uid,
//     author: "name of the author",
//     taskPriority: "Low",
//     columnOrder: "To Do",
//     resolution: "Unresolved",
//     dateOfCreation: "2023-01-01",
//     lastEditedDate: "2023-01-01",
//     dueDate: "2023-01-01",
//   },
// ];
// self invoking function to populate the rows for the DataGRid componets4

// (function (taskData) {
//   taskData.forEach((task) => {
//     rows.push(task);
//   });
// })();

const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "age", header: "Age" },
  { accessorKey: "address.street", header: "Street" },
  { accessorKey: "address.city", header: "City" },
  { accessorKey: "address.state", header: "State" },
  { accessorKey: "address.zip", header: "Zip" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "friends", header: "Friends" },
  { accessorKey: "family", header: "Family" },
  { accessorKey: "isActive", header: "Active" },
  { accessorKey: "registered", header: "Registered" },
  { accessorKey: "latitude", header: "Latitude" },
  { accessorKey: "longitude", header: "Longitude" },
];
const data = [
  {
    name: "John",
    age: 30,
    address: {
      street: "123 Main",
      city: "New York",
      state: "NY",
      zip: "12345",
    },
    phone: "(123) 456-7890",
    email: "7N8Dg@example.com",
    friends: ["Alice", "Bob"],
    family: ["Jane", "Jim"],
    isActive: true,
    registered: "2023-01-01",
    latitude: 40.7128,
    longitude: -74.006,
  },
];

export default function List() {
  return (
    <>
      {" "}
      <Box sx={{ height: "94%", width: "94%" }}>
        <Paper
          sx={{ padding: 2, width: "100%", height: "100%", margin: "auto" }}
        >
          {/* <DataGrid
            rows={rows}
            columns={columns}
            intialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            chekcboxSelection
            disableRowSelectionOnClick={true}
          />
          <Divider /> */}
          <MaterialReactTable columns={columns} data={data} />
        </Paper>
      </Box>
    </>
  );
}
