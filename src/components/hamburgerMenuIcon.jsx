import React from "react";
import PropTypes from "prop-types";

export default function HamburgerMenuIcon(props) {
  const width = `${props.width || 36}px`,
    height = `${props.height || 30}px`,
    halfHeight = `${parseInt(height.replace("px", "")) / 2}px`,
    isOpen = props.isOpen || false,
    strokeWidth = props.strokeWidth || 2,
    halfStrokeWidth = `-${strokeWidth / 2}px`,
    animationDuration = props.animationDuration || "0.4";

  const getTransformValue = (isOpen, defaultPos, rotateVal) =>
    `translate3d(0,${isOpen ? halfHeight : defaultPos},0) rotate(${
      isOpen ? `${rotateVal}deg` : "0"
    })`;

  const styles = {
    container: {
      width,
      height,
      borderRadius: "50px",
      position: "relative",
      transform: `rotate(${props.rotate || 0}deg)`,
    },
    lineBase: {
      display: "block",
      height: `${strokeWidth}px`,
      width: "100%",
      background: props.color || "#000",
      transitionTimingFunction: "ease",
      transitionDuration: `${animationDuration}s`,
      borderRadius: `${props.borderRadius || 0}px`,
      transformOrigin: "center",
      position: "absolute",
    },
    firstLine: {
      transform: getTransformValue(isOpen, 0, 45),
      marginTop: halfStrokeWidth,
      height: 3,
    },
    secondLine: {
      transitionTimingFunction: "ease-out",
      transitionDuration: `${animationDuration / 4}s`,
      opacity: isOpen ? "0" : "1",
      top: halfHeight,
      marginTop: halfStrokeWidth,
      height: 3,
    },
    thirdLine: {
      transform: getTransformValue(isOpen, height, -45),
      marginTop: halfStrokeWidth,
      height: 3,
    },
  };

  return (
    <div
      style={styles.container}
      className={props.className}
      onClick={props.menuClicked}
    >
      <span style={Object.assign({}, styles.lineBase, styles.firstLine)}></span>
      <span
        style={Object.assign({}, styles.lineBase, styles.secondLine)}
      ></span>
      <span style={Object.assign({}, styles.lineBase, styles.thirdLine)}></span>
    </div>
  );
}

HamburgerMenuIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  menuClicked: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  strokeWidth: PropTypes.number,
  rotate: PropTypes.number,
  color: PropTypes.string,
  borderRadius: PropTypes.number,
  animationDuration: PropTypes.number,
  className: PropTypes.string,
};
