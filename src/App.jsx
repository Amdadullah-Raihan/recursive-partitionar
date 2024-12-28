import { useState } from "react";
import getRandomColor from "./utils/getRandomColor";
import SplitDiv from "./pages/SplitDiv";

const App = () => {
  const [partitions, setPartitions] = useState({
    id: "root",
    children: [],
    bgColor: getRandomColor(),
  });

  // We should delete the parent while deleting the last child

  // Function for adding/removing a partition
  const updatePartition = (id, newChildren, splitType = null) => {
    // console.log("Node to be updated or deleted:", id);

    const update = (partition) => {
      if (!partition) return null;

      // console.log("Processing partition:", partition);

      // If the partition ID matches
      if (partition.id === id) {
        if (newChildren === null) {
          // Handle removal
          // console.log("Deleting partition:", partition);
          return null; // Remove the partition entirely
        } else {
          // Update partition with new children
          return { ...partition, children: newChildren, split: splitType };
        }
      }

      // Process children recursively
      if (partition.children?.length > 0) {
        const updatedChildren = partition.children.map(update).filter(Boolean); // Filter out null values (deleted children)

        // console.log("Updated children for partition:", updatedChildren);

        // If all children are deleted, remove this partition as well
        if (updatedChildren.length === 0) {
          // console.log("No children left. Removing partition:", partition);
          return null;
        }

        // Otherwise, return the partition with updated children
        return { ...partition, children: updatedChildren };
      }

      return partition; // Return the partition if no changes
    };

    const updatedPartitions = update(partitions);

    setPartitions(
      updatedPartitions || {
        id: "root",
        children: [],
        bgColor: getRandomColor(),
      }
    );
  };

  // console.log("partitions: ", partitions);

  return (
    <div className="w-full h-screen overflow-hidden select-none ">
      <SplitDiv
        id={partitions.id}
        partition={partitions}
        updatePartition={updatePartition}
      />
    </div>
  );
};

export default App;
