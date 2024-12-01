import { useState } from "react";

const SplitDiv = ({ id }) => {
  const [split, setSplit] = useState(null);

  const handleVerticalSplit = () => setSplit("vertical");
  const handleHorizontalSplit = () => setSplit("horizontal");

  // Render based on the split state
  if (split === "vertical") {
    return (
      <div className="flex h-full w-full">
        <SplitDiv id={`${id}-1`} />
        <SplitDiv id={`${id}-2`} />
      </div>
    );
  }

  if (split === "horizontal") {
    return (
      <div className="h-full w-full">
        <div className="h-1/2 w-full">
          <SplitDiv id={`${id}-1`} />
        </div>
        <div className="h-1/2 w-full">
          <SplitDiv id={`${id}-2`} />
        </div>
      </div>
    );
  }

  // Default state with buttons
  return (
    <div className="flex items-center justify-center h-full w-full border border-gray-300 relative">
      <div className="space-x-4">
        <button
          onClick={handleVerticalSplit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          V
        </button>
        <button
          onClick={handleHorizontalSplit}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          H
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <SplitDiv id="root" />
    </div>
  );
};

export default App;
