import React from "react";

export const Log = ({ name, data, replacer = null, space = 2 }) => {
  return (
    <div className="p-5 mx-auto d-flex justify-content-center">
      {data && (
        <div style={{ overflow: "auto", height: 400 }} className="card bg-dark">
          <div
            style={{ fontWeight: "bold", fontSize: "23px" }}
            className="card-header text-center text-green"
          >
            {name}
          </div>

          <code style={{ padding: "1em" }}>
            <pre className="text-light">
              {JSON.stringify(data, replacer, space)}
            </pre>
          </code>
        </div>
      )}
    </div>
  );
};
