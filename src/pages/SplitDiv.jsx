import { useRef, useState } from "react";
import getRandomColor from "../utils/getRandomColor";
import { cn } from "../utils/cn";
import Button from "../components/Button";

const SplitDiv = ({
  id,
  partition,
  updatePartition,
  className,
  width = 100,
  height = 100,
}) => {
  const containerRef = useRef(null);
  const isResizing = useRef(false);
  const [showPercentage, setShowPercentage] = useState(false);

  const [dividerPosition, setDividerPosition] = useState(50); // Initial position as percentage
  // console.log("parttion from split div: ", partition);
  const handleMouseMove = (e) => {
    // console.log("mouse move triggering...");
    if (!isResizing.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let newPosition;

    if (partition?.split === "vertical") {
      // Horizontal resizing
      newPosition = ((e.clientX - rect.left) / rect.width) * 100;

      const isAroundHalf = newPosition > 45 && newPosition < 55;
      const isAroundQuarter = newPosition > 20 && newPosition < 30;
      const isAroundThreeQuarters = newPosition > 70 && newPosition < 80;

      if (isAroundHalf) {
        newPosition = 50;
      }
      if (isAroundQuarter) {
        newPosition = 25;
      }
      if (isAroundThreeQuarters) {
        newPosition = 75;
      }
    } else if (partition?.split === "horizontal") {
      // Vertical resizing
      newPosition = ((e.clientY - rect.top) / rect.height) * 100;
      const isAroundHalf = newPosition > 45 && newPosition < 55;
      const isAroundQuarter = newPosition > 20 && newPosition < 30;
      const isAroundThreeQuarters = newPosition > 70 && newPosition < 80;

      if (isAroundHalf) {
        newPosition = 50;
      }
      if (isAroundQuarter) {
        newPosition = 25;
      }
      if (isAroundThreeQuarters) {
        newPosition = 75;
      }

      // console.log("movementY", e.movementY);
    }

    setDividerPosition(Math.min(90, Math.max(10, newPosition))); // Limit between 10% and 90%
  };

  const handleMouseDown = () => {
    isResizing.current = true;
    setShowPercentage(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    setShowPercentage(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleSplit = (type) => {
    const newChildren = [
      {
        id: `${id}-1`,
        children: [],
        bgColor: partition?.bgColor || getRandomColor(),
      },
      { id: `${id}-2`, children: [], bgColor: getRandomColor() },
    ];
    updatePartition(id, newChildren, type);
  };

  const handleRemove = () => updatePartition(id, null);

  // Render child components based on the split type
  if (id && partition?.children && partition?.children.length > 0) {
    return (
      <div
        ref={containerRef}
        className="flex flex-1 w-full h-full grow"
        style={{
          flexDirection: partition?.split === "vertical" ? "row" : "column",
        }}
      >
        {partition?.children[0].id && (
          <SplitDiv
            id={partition?.children[0].id}
            partition={partition?.children[0]}
            updatePartition={updatePartition}
            className={partition?.children?.length === 1 && "grow"}
            width={partition?.split === "vertical" ? dividerPosition : 100} // The value is in percentage
            height={partition?.split === "horizontal" ? dividerPosition : 100} // The value is in percentage
          />
        )}
        {partition?.children.length === 2 && (
          <div
            className={cn(
              "relative flex transition-[width] bg-black hover:bg-gray-800",
              partition?.split === "vertical"
                ? "w-[5px] hover:w-3 cursor-col-resize justify-center"
                : "h-[5px] hover:h-3 cursor-row-resize items-center",
              !id && "hidden",
              showPercentage && partition?.split === "vertical" && "w-3",
              showPercentage && partition?.split === "horizontal" && "h-3" // These two lines always keeps the width/heigh of the devider while dragging for better ux
            )}
            onMouseDown={handleMouseDown}
            // onDrag={() => console.log("drag")}
            style={{
              zIndex: 1,
            }}
            // onClick={() => console.log("id from divider: ", id)}
          >
            {showPercentage && (
              <p
                className={cn(
                  "absolute z-20 px-1 font-bold bg-white rounded-md shadow-2xl select-none ",
                  partition?.split === "vertical" ? "top-[48%] " : "left-[48%] "
                )}
              >
                {parseInt(dividerPosition)}%
              </p>
            )}
          </div>
        )}

        {partition?.children[1]?.id && (
          <SplitDiv
            id={partition?.children[1]?.id}
            partition={partition?.children[1]}
            updatePartition={updatePartition}
            className={partition?.children?.length === 1 && "grow"}
            width={
              partition?.split === "vertical" ? 100 - dividerPosition : 100
            }
            height={
              partition?.split === "horizontal" ? 100 - dividerPosition : 100
            }
          />
        )}
      </div>
    );
  }

  // console.log("id:", id, ", width", width, ", height: ", height);

  // Default UI with split buttons
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      style={{
        backgroundColor: partition?.bgColor || getRandomColor(),
        width: `${width}%`,
        height: `${height}%`,
      }}
    >
      <div className="flex overflow-hidden border-2 rounded-md shadow-xl">
        <Button onClick={() => handleSplit("vertical")}>V</Button>
        <Button variant="secondary" onClick={() => handleSplit("horizontal")}>
          H
        </Button>
        {id !== "root" && (
          <Button variant="danger" onClick={handleRemove}>
            -
          </Button>
        )}
      </div>
    </div>
  );
};
export default SplitDiv;
