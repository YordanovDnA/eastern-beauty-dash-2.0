import React, { useState } from "react";
import { PropTypes } from "prop-types";

const ListInput = (props) => {
  const { title, inputPlaceholder, list, setList, name } = props;

  //States:
  const [listInput, setListInput] = useState();
  const [selectedInput, setSelectedInput] = useState();

  //On add to the list
  const onAddToList = (event) => {
    event.preventDefault();
    if (typeof listInput === "undefined") {
      alert(
        `Type something in the input to add ${title.toLowerCase()} in the list!`
      );
    } else {
      const value = [...list];
      value.push(listInput);
      setList(name, value);
      setListInput();
      //Clear all the inputs values
      Array.from(document.querySelectorAll("input")).forEach((input) => {
        if (input.name === title.toLowerCase()) {
          input.value = "";
        }
      });
    }
  };

  //On remove from the list
  const onRemoveFromList = (event) => {
    event.preventDefault();
    // Check if item is selected
    if (typeof selectedInput !== "undefined") {
      const newList = [...list];
      newList.splice(selectedInput, 1);
      setList(name, newList);
      setSelectedInput();
    } else if (list.length > 0 && typeof selectedInput === "undefined")
      window.alert("Please select an item to remove it!");
    else window.alert(`The ${title.toLowerCase()} list is empty.`);
  };

  return (
    <React.Fragment>
      <div className="form-group">
        {/* List */}
        <label htmlFor="exampleFormControlSelect2">
          <strong>{title}:</strong>
        </label>
        <hr />
        <select
          multiple
          className="form-control"
          id="exampleFormControlSelect2"
        >
          {list &&
            list.map((element, index) => {
              return (
                <option onClick={() => setSelectedInput(index)} key={index}>
                  {element}
                </option>
              );
            })}
        </select>

        {/* List input */}
        <input
          placeholder={inputPlaceholder}
          onChange={(event) => setListInput(event.currentTarget.value)}
          className="form-control mt-1"
          name={title.toLowerCase()}
          type="text"
        />

        {/* Add to list btn */}
        <input
          className="btn btn-sm btn-success mt-1"
          onClick={(event) => onAddToList(event)}
          type="button"
          defaultValue="Add"
        />
        {/* Remove from the list btn */}
        <input
          className="btn btn-sm btn-danger mt-1 ml-1"
          onClick={(event) => onRemoveFromList(event)}
          type="button"
          defaultValue="Remove"
        />
      </div>
    </React.Fragment>
  );
};

ListInput.propTypes = {
  title: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  list: PropTypes.array,
  setList: PropTypes.func,
};

export default ListInput;
