import React from "react";
import { PropTypes } from "prop-types";

const StringInput = (props) => {
  const { title, placeholder, string, setString, value } = props;

  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="name">
          <strong>{title}</strong>
        </label>
        <input
          onChange={setString}
          type="text"
          name={title.toLowerCase()}
          className="form-control"
          aria-describedby="nameHelp"
          placeholder={placeholder}
          value={value}
        />
      </div>
    </React.Fragment>
  );
};

StringInput.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  string: PropTypes.string,
  setString: PropTypes.func,
};

export default StringInput;
