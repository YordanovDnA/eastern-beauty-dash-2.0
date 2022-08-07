import React from "react";
import { PropTypes } from "prop-types";

const TextAreaInput = (props) => {
  const { title, placeholder, textarea, setTextArea, value, name } = props;

  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="name">
          <strong>{title}</strong>
        </label>
        <textarea
          onChange={setTextArea}
          name={name ? name :  title.toLowerCase()}
          value={value}
          placeholder={placeholder}
          cols="30"
          rows="10"
          className="form-control"
        />
      </div>
    </React.Fragment>
  );
};

TextAreaInput.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  textarea: PropTypes.string,
  setTextArea: PropTypes.func,
};

export default TextAreaInput;
