import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  Children,
} from "react";
import { Box, Divider } from "@mui/material";

//Custom Hook

const useResizable = ({
  initialSize,
  minSize = 50,
  maxSize = Infinity,
  orientation = "horizontal",
}) => {
  // State
  const [size, setSize] = useState(initialSize);
  const [isResizing, setIsResizing] = useState(false);

  const startPositionRef = useRef(0);
  const startSizeRef = useRef(0);

  const handleMouseDown = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      setIsResizing(true);

      startPositionRef.current =
        orientation === "horizontal" ? event.clientX : event.clientY;
      startSizeRef.current = size;
    },
    [orientation, size]
  );
  const handleMouseMove = useCallback(
    (event) => {
      // we have to put this if statement cuase we are going to attach the event listener to the document and not just the component itself)
      const currentPosition =
        orientation === "horizontal" ? event.clientX : event.clientY;
      const delta = currentPosition - startPositionRef.current;
      let newSize = startSizeRef.current + delta;

      if (minSize) newSize = Math.max(minSize, newSize);

      if (maxSize) newSize = Math.min(maxSize, newSize);

      setSize(newSize);
    },
    [isResizing, minSize, maxSize, orientation]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none"; // avoid text selection while resizing
      document.body.style.cursor =
        orientation === "horizontal" ? "col-resize" : "row-resize"; // avoid cursor change while resizing
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp, orientation]);

  return {
    size,
    handleMouseDown,
    isResizing,
  };
};

// Base Component
const SplitterBase = ({
  children,
  totalSize,
  initialPrimarySize,
  orientation,
  dividerStyle = {},
  panel1Style = {},
  panel2Style = {},
  minSize,
  maxSize,
}) => {
  const isHorizontal = orientation === "horizontal";
  const [child1, child2] = Children.toArray(children);

  const { size, handleMouseDown, isResizing } = useResizable({
    initialSize: initialPrimarySize,
    minSize,
    orientation,
    maxSize,
  });

  return (
    <>
      <Box
        className="Splitter-Wrapper"
        sx={{
          display: "flex",
          flexDirection: isHorizontal ? "row" : "column",
          height: isHorizontal ? "100%" : totalSize,

          width: isHorizontal ? totalSize : "100%",
          overflow: "hidden",
          ...(!isHorizontal && { width: "100%" }),
          ...(!isHorizontal && { height: "100%" }),
        }}
      >
        <Box
          className="Splitter-panel1"
          sx={{
            ...panel1Style,
            flex: "0  0 auto",
            [isHorizontal ? "width" : "height"]: size,
            overflow: "hidden",
          }}
        >
          {child1}
        </Box>
        <Box
          className="Splitter-divider"
          onMouseDown={handleMouseDown}
          sx={{
            ...dividerStyle,
            cursor: isHorizontal ? "col-resize" : "row-resize",
            flex: "0 0 4px",
            display: "flex",
            backgroundColor: isResizing ? "#1976d2" : "#ccc",
            zIndex: 13000,
            "&:hover": {
              backgroundColor: "#999",
              ...dividerStyle,
            },
            transition: "background-color 0.3s ease",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            className="Splitter-divider-handle"
            sx={{
              width: isHorizontal ? "2px" : "2px",
              height: isHorizontal ? "2px" : "2px",
              bgcolor: "text.tertiary",
              borderRadius: 1,
            }}
          />
        </Box>
        <Box
          className="Splitter-panel2"
          sx={{
            ...panel2Style,
            flex: "1 1 auto",
          }}
        >
          {child2}
        </Box>
      </Box>
    </>
  );
};

// export difintions
export const SplitterX = (props) => {
  return <SplitterBase {...props} orientation="horizontal" />;
};

export const SplitterY = (props) => {
  return <SplitterBase {...props} orientation="vertical" />;
};
