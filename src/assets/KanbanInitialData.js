// KanbanInitialData.js
// This file provides initial dummy data for the Kanban board.
// It includes resolved user objects via findUser and can be extended for date-based logic.

export const UserData = [
  {
    uid: "Uid-ofOmar",
    name: "Omar Ali Khan",
    photoUrl:
      "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    role: "Developer",
  },
  {
    uid: "UID-ofJohn",
    name: "John Fethermann",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop",
    role: "Designer",
  },
  {
    uid: "Uid-ofNadia",
    name: "Nadia Sidqui",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500&auto=format&fit=crop",
    role: "Manager",
  },
  {
    uid: "Uid-ofAlice",
    name: "Alice  Copper",
    photoUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop",
    role: "Developer",
  },
  {
    uid: "Uid-ofBob",
    name: "Bob Dylan",
    photoUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop",
    role: "Tester",
  },
];

const findUser = (uid) => {
    return UserData?.find((user) => user.uid === uid);
};

const DummUserDefault = {
    uid: "Uid-ofOmar",
    name: "Omar",
    photoUrl: "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    role: "Developer",
};

// Dummy task data for subtask references (simplified)
const findTask = (taskId) => ({ id: taskId });

// Constants for IDs (using strings for simplicity)
const C1 = "list-complete";
const C2 = "list-in-progress";
const C3 = "list-to-do";
const C4 = "list-misc";

const T1 = "task-1";
const T2 = "task-2";
const T3 = "task-3";
const T4 = "task-4";
const T5 = "task-5";
const T6 = "task-6";
const T7 = "task-7";
const T8 = "task-8";
const T9 = "task-9";
const T10 = "task-10";
const T11 = "task-11";
const T12 = "task-12";
const T13 = "task-13";

 export const kanbanBoardList = [
    {
        id: C1,
        title: "Complete",
        chipColor: "success",
        tasks: [
            {
                id: T1,
                title: "FLOWCHARTS",
                status: "Ready",
                workType: "Request", // possible values: Request, Task, Story, Feature, Bug
                author: findUser("Uid-ofOmar") || DummUserDefault, // (assignee)
                assignedTo: ["Uid-ofOmar", "UID-ofJohn", "Uid-ofNadia"],
                projectId: "MBA-1",
                contributors: ["Uid-ofOmar", "UID-ofJohn", "Uid-ofNadia"],
                priority: "High", // possible values: 'Highest', 'High', 'Medium', 'Low', 'Lowest'
                dueDate: "2025-11-30",
                subTasks: [
                    {
                        subTask1: findTask(T4).id,
                        subTask2: findTask(T5).id,
                        subTask3: findTask(T6).id,
                    },
                ],
                description: "first test for the card",
            },
            {
                id: T2,
                title: "FLOWCHARTS",
                status: "Dormant",
                workType: "Task",
                author: findUser("UID-ofJohn") || DummUserDefault,
                assignedTo: ["UID-ofJohn", "Uid-ofAlice"],
                projectId: "MBA-1",
                contributors: ["UID-ofJohn", "Uid-ofAlice", "Uid-ofBob"],
                priority: "Medium",
                dueDate: "2025-12-15",
                subTasks: [
                    {
                        subTask1: findTask(T7).id,
                        subTask2: findTask(T8).id,
                    },
                ],
                description: "first test for the card",
            },
            {
                id: T3,
                title: "FLOWCHARTS",
                status: "Active",
                workType: "Story",
                author: findUser("Uid-ofNadia") || DummUserDefault,
                assignedTo: ["Uid-ofNadia"],
                projectId: "MBA-1",
                contributors: ["Uid-ofNadia"],
                priority: "Low",
                dueDate: "2025-11-25",
                subTasks: [],
                description: "first test for the card",
            },

            {
                id: T4,
                title: "FLOWCHARTS",
                status: "Inactive",
                workType: "Bug",
                author: findUser("Uid-ofAlice") || DummUserDefault,
                assignedTo: ["Uid-ofAlice", "Uid-ofOmar"],
                projectId: "MBA-1",
                contributors: ["Uid-ofAlice", "Uid-ofOmar"],
                priority: "Highest",
                dueDate: "2025-11-20",
                subTasks: [
                    {
                        subTask1: findTask(T9).id,
                    },
                ],
                description: "first test for the card",
            },
        ],
    },
    {
        id: C2,
        title: "In Progress",
        chipColor: "error",
        tasks: [
            {
                id: T5,
                title: "FLOWCHARTS",
                status: "Ready",
                workType: "Feature",
                author: findUser("Uid-ofOmar") || DummUserDefault,
                assignedTo: ["Uid-ofOmar", "Uid-ofNadia"],
                projectId: "MBA-1",
                contributors: ["Uid-ofOmar", "Uid-ofNadia", "UID-ofJohn"],
                priority: "High",
                dueDate: "2025-12-10",
                subTasks: [
                    {
                        subTask1: findTask(T10).id,
                        subTask2: findTask(T11).id,
                    },
                ],
                description: "first test for the card",
            },
            {
                id: T6,
                title: "FLOWCHARTS",
                status: "Dormant",
                workType: "Request",
                author: findUser("UID-ofJohn") || DummUserDefault,
                assignedTo: ["UID-ofJohn"],
                projectId: "MBA-1",
                contributors: ["UID-ofJohn"],
                priority: "Medium",
                dueDate: "2025-12-05",
                subTasks: [],
                description: "first test for the card",
            },
            {
                id: T7,
                title: "FLOWCHARTS",
                status: "Active",
                workType: "Task",
                author: findUser("Uid-ofAlice") || DummUserDefault,
                assignedTo: ["Uid-ofAlice", "Uid-ofBob"],
                projectId: "MBA-1",
                contributors: ["Uid-ofAlice", "Uid-ofBob"],
                priority: "Low",
                dueDate: "2025-11-28",
                subTasks: [
                    {
                        subTask1: findTask(T12).id,
                    },
                ],
                description: "first test for the card",
            },
        ],
    },

    {
        id: C3,
        title: "To Do",
        chipColor: "disabled",
        tasks: [
            {
                id: T8,
                title: "FLOWCHARTS",
                status: "Ready",
                workType: "Story",
                author: findUser("Uid-ofNadia") || DummUserDefault,
                assignedTo: ["Uid-ofNadia", "Uid-ofOmar"],
                projectId: "MBA-1",
                contributors: ["Uid-ofNadia", "Uid-ofOmar"],
                priority: "Medium",
                dueDate: "2025-12-20",
                subTasks: [
                    {
                        subTask1: findTask(T1).id,
                    },
                ],
                description: "first test for the card",
            },
            {
                id: T9,
                title: "FLOWCHARTS",
                status: "Inactive",
                workType: "Bug",
                author: findUser("Uid-ofBob") || DummUserDefault,
                assignedTo: ["Uid-ofBob"],
                projectId: "MBA-1",
                contributors: ["Uid-ofBob"],
                priority: "Low",
                dueDate: "2025-11-30",
                subTasks: [],
                description: "first test for the card",
            },
            {
                id: T10,
                title: "FLOWCHARTS",
                status: "Dormant",
                workType: "Feature",
                author: findUser("Uid-ofAlice") || DummUserDefault,
                assignedTo: ["Uid-ofAlice", "UID-ofJohn"],
                projectId: "MBA-1",
                contributors: ["Uid-ofAlice", "UID-ofJohn"],
                priority: "High",
                dueDate: "2025-12-01",
                subTasks: [
                    {
                        subTask1: findTask(T2).id,
                        subTask2: findTask(T3).id,
                    },
                ],
                description: "first test for the card",
            },
        ],
    },
    {
        id: C4,
        title: "Misc",
        chipColor: "disabled",
        tasks: [
            {
                id: T11,
                title: "FLOWCHARTS",
                status: "Active",
                workType: "Task",
                author: findUser("Uid-ofOmar") || DummUserDefault,
                assignedTo: ["Uid-ofOmar"],
                projectId: "MBA-1",
                contributors: ["Uid-ofOmar"],
                priority: "Lowest",
                dueDate: "2025-12-31",
                subTasks: [],
                description: "first test for the card",
            },
            {
                id: T12,
                title: "FLOWCHARTS",
                status: "Ready",
                workType: "Request",
                author: findUser("UID-ofJohn") || DummUserDefault,
                assignedTo: ["UID-ofJohn", "Uid-ofNadia"],
                projectId: "MBA-1",
                contributors: ["UID-ofJohn", "Uid-ofNadia"],
                priority: "Medium",
                dueDate: "2025-11-25",
                subTasks: [
                    {
                        subTask1: findTask(T5).id,
                    },
                ],
                description: "first test for the card",
            },
            {
                id: T13, // Reusing T1 for demo purposes, but in real app, ensure uniqueness
                title: "FLOWCHARTS",
                status: "Inactive",
                workType: "Story",
                author: findUser("Uid-ofBob") || DummUserDefault,
                assignedTo: ["Uid-ofBob"],
                projectId: "MBA-1",
                contributors: ["Uid-ofBob"],
                priority: "High",
                dueDate: "2025-12-15",
                subTasks: [
                    {
                        subTask1: findTask(T6).id,
                        subTask2: findTask(T7).id,
                    },
                ],
                description: "first test for the card",
            },
        ],
    },
];
const flattenedKanban = {
  columns: [
    { id: "C1", title: "Complete", chipColor: "success" },
    { id: "C2", title: "In Progress", chipColor: "error" },
    { id: "C3", title: "To Do", chipColor: "disabled" },
    { id: "C4", title: "Misc", chipColor: "disabled" }
  ],
  tasks: [
    {
      id: "T1",
      columnId: "C1",
      title: "Redux Toolkit Store Setup",
      status: "Ready",
      workType: "Request",
      author: findUser("Uid-ofOmar") || DummUserDefault,
      assignedTo: ["Uid-ofOmar", "UID-ofJohn", "Uid-ofNadia"],
      projectId: "MBA-1",
      contributors: ["Uid-ofOmar", "UID-ofJohn", "Uid-ofNadia"],
      priority: "High",
      dueDate: "2025-11-30",
      subTasks: [{ subTask1: "T4", subTask2: "T5", subTask3: "T6" }],
      description: "Initialize the global state management using RTK."
    },
    {
      id: "T2",
      columnId: "C1",
      title: "Login Page UI Implementation",
      status: "Dormant",
      workType: "Task",
      author: findUser("UID-ofJohn") || DummUserDefault,
      assignedTo: ["UID-ofJohn", "Uid-ofAlice"],
      projectId: "MBA-1",
      contributors: ["UID-ofJohn", "Uid-ofAlice", "Uid-ofBob"],
      priority: "Medium",
      dueDate: "2025-12-15",
      subTasks: [{ subTask1: "T7", subTask2: "T8" }],
      description: "Build the login form using MUI TextField components."
    },
    {
      id: "T3",
      columnId: "C1",
      title: "Signup Form Validation Schema",
      status: "Active",
      workType: "Story",
      author: findUser("Uid-ofNadia") || DummUserDefault,
      assignedTo: ["Uid-ofNadia"],
      projectId: "MBA-1",
      contributors: ["Uid-ofNadia"],
      priority: "Low",
      dueDate: "2025-11-25",
      subTasks: [],
      description: "Implement Yup/Zod validation for the registration flow."
    },
    {
      id: "T4",
      columnId: "C1",
      title: "MUI Custom Theme Overrides",
      status: "Inactive",
      workType: "Bug",
      author: findUser("Uid-ofAlice") || DummUserDefault,
      assignedTo: ["Uid-ofAlice", "Uid-ofOmar"],
      projectId: "MBA-1",
      contributors: ["Uid-ofAlice", "Uid-ofOmar"],
      priority: "Highest",
      dueDate: "2025-11-20",
      subTasks: [{ subTask1: "T9" }],
      description: "Fix primary color contrast issues in dark mode."
    },
    {
      id: "T5",
      columnId: "C2",
      title: "Firebase Auth Integration",
      status: "Ready",
      workType: "Feature",
      author: findUser("Uid-ofOmar") || DummUserDefault,
      assignedTo: ["Uid-ofOmar", "Uid-ofNadia"],
      projectId: "MBA-1",
      contributors: ["Uid-ofOmar", "Uid-ofNadia", "UID-ofJohn"],
      priority: "High",
      dueDate: "2025-12-10",
      subTasks: [{ subTask1: "T10", subTask2: "T11" }],
      description: "Connect the frontend forms to Firebase Authentication SDK."
    },
    {
      id: "T6",
      columnId: "C2",
      title: "Responsive Navigation Sidebar",
      status: "Dormant",
      workType: "Request",
      author: findUser("UID-ofJohn") || DummUserDefault,
      assignedTo: ["UID-ofJohn"],
      projectId: "MBA-1",
      contributors: ["UID-ofJohn"],
      priority: "Medium",
      dueDate: "2025-12-05",
      subTasks: [],
      description: "Create a collapsible drawer for mobile views."
    },
    {
      id: "T7",
      columnId: "C2",
      title: "React Router Protected Routes",
      status: "Active",
      workType: "Task",
      author: findUser("Uid-ofAlice") || DummUserDefault,
      assignedTo: ["Uid-ofAlice", "Uid-ofBob"],
      projectId: "MBA-1",
      contributors: ["Uid-ofAlice", "Uid-ofBob"],
      priority: "Low",
      dueDate: "2025-11-28",
      subTasks: [{ subTask1: "T12" }],
      description: "Redirect unauthenticated users to the login page."
    },
    {
      id: "T8",
      columnId: "C3",
      title: "Axios Interceptor for JWT",
      status: "Ready",
      workType: "Story",
      author: findUser("Uid-ofNadia") || DummUserDefault,
      assignedTo: ["Uid-ofNadia", "Uid-ofOmar"],
      projectId: "MBA-1",
      contributors: ["Uid-ofNadia", "Uid-ofOmar"],
      priority: "Medium",
      dueDate: "2025-12-20",
      subTasks: [{ subTask1: "T1" }],
      description: "Attach bearer tokens automatically to API requests."
    },
    {
      id: "T9",
      columnId: "C3",
      title: "Fix Next.js Hydration Errors",
      status: "Inactive",
      workType: "Bug",
      author: findUser("Uid-ofBob") || DummUserDefault,
      assignedTo: ["Uid-ofBob"],
      projectId: "MBA-1",
      contributors: ["Uid-ofBob"],
      priority: "Low",
      dueDate: "2025-11-30",
      subTasks: [],
      description: "Resolve mismatch between server and client rendered HTML."
    },
    {
      id: "T10",
      columnId: "C3",
      title: "Unit Tests for Auth Hooks",
      status: "Dormant",
      workType: "Feature",
      author: findUser("Uid-ofAlice") || DummUserDefault,
      assignedTo: ["Uid-ofAlice", "UID-ofJohn"],
      projectId: "MBA-1",
      contributors: ["Uid-ofAlice", "UID-ofJohn"],
      priority: "High",
      dueDate: "2025-12-01",
      subTasks: [{ subTask1: "T2", subTask2: "T3" }],
      description: "Write Vitest tests for useAuth and useUser hooks."
    },
    {
      id: "T11",
      columnId: "C4",
      title: "ESLint & Prettier Setup",
      status: "Active",
      workType: "Task",
      author: findUser("Uid-ofOmar") || DummUserDefault,
      assignedTo: ["Uid-ofOmar"],
      projectId: "MBA-1",
      contributors: ["Uid-ofOmar"],
      priority: "Lowest",
      dueDate: "2025-12-31",
      subTasks: [],
      description: "Standardize code formatting across the repository."
    },
    {
      id: "T12",
      columnId: "C4",
      title: "PWA Manifest & Icons",
      status: "Ready",
      workType: "Request",
      author: findUser("UID-ofJohn") || DummUserDefault,
      assignedTo: ["UID-ofJohn", "Uid-ofNadia"],
      projectId: "MBA-1",
      contributors: ["UID-ofJohn", "Uid-ofNadia"],
      priority: "Medium",
      dueDate: "2025-11-25",
      subTasks: [{ subTask1: "T5" }],
      description: "Configure manifest.json for 'Add to Home Screen' support."
    },
    {
      id: "T13",
      columnId: "C4",
      title: "Dark Mode Context Logic",
      status: "Inactive",
      workType: "Story",
      author: findUser("Uid-ofBob") || DummUserDefault,
      assignedTo: ["Uid-ofBob"],
      projectId: "MBA-1",
      contributors: ["Uid-ofBob"],
      priority: "High",
      dueDate: "2025-12-15",
      subTasks: [{ subTask1: "T6", subTask2: "T7" }],
      description: "Manage theme state using React Context API."
    }
  ]
};;

export default kanbanBoardList; // Export the base lists too, without flags
