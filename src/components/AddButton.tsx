import React from "react";

interface addButtonProps {
  addHouse: () => void;
};

const AddButton = ({ addHouse }: addButtonProps) => {
  return (
    <button className="btn btn-primary" onClick={addHouse}>
      Add
    </button>
  );
}

export default React.memo(AddButton);