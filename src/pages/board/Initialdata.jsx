
export const workTypeIconMap = (workType) => {
  switch (workType) {
    case "Request":
      return {
        color: "#498563",
        icon: <SquarePlus size={16} strokeWidth={1} />,
      };
    case "Task":
      return { color: <ShieldCheck size={16} strokeWidth={1} /> };
    case "Story":
      return { color: "#498563", icon: <Bookmark size={16} strokeWidth={1} /> };
    case "Feature":
      return {
        color: "#498563",
        icon: <Proportions size={16} strokeWidth={1} />,
      };
    case "Bug":
      return { color: "#498563", icon: <Bug size={16} strokeWidth={0.75} /> };
  }
};

export const PriorityIconMap = (priority) => {
  switch (priority) {
    case "Highest":
      return <ChevronsUp color="#f15b50" size={16} strokeWidth={2.5} />;
    case "High":
      return <ChevronUp color="#f15b50" size={16} strokeWidth={2.5} />;
    case "Medium":
      return <EqualApproximately color="#e06c00" size={16} strokeWidth={2.5} />;
    case "Low":
      return <ChevronDown color="#4688ec" size={16} strokeWidth={2.5} />;
    case "Lowest":
      return <ChevronsDown color="#4688ec" size={16} strokeWidth={2.5} />;
    default:
      return <> </>;
  }
};
