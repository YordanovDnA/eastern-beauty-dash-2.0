import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import FilterResults from "react-filter-search";
import RestrictComponent from "../../../../../components/common/RestrictComponent";

export default function CategoryTable({
  addUrl,
  editUrl,
  subCatUrl,
  lang,
  data = [],
  isMainCategory,
  handleDelete,
  ...props
}) {
  const [search, setSearch] = useState("");
  const history = useNavigate();
  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-center" scope="col">
              <Link to={addUrl} className="btn btn-sm btn-success">
                Add
              </Link>
            </th>
            <th className="text-center" scope="col">
              Name
            </th>
            <th className="text-center" scope="col">
              Description
            </th>
            <th className="text-center" scope="col">
              {/* For main categories */}
              {isMainCategory ? (
                <select
                  onChange={(event) =>
                    history(`/categories/${event.currentTarget.value}`)
                  }
                  className="custom-select my-1 mr-sm-2"
                >
                  <option defaultValue="en" selected={lang === "en"}>
                    English
                  </option>
                  <option defaultValue="bul" selected={lang === "bul"}>
                    Bulgarian
                  </option>
                </select>
              ) : (
                // For subcategories
                <div className="input-group">
                  <input
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                  </div>
                </div>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Categories table */}
          {data.length > 0 &&
            search.length < 1 &&
            data.map((e, index) => (
              <tr key={e._id}>
                <th scope="row">
                  <Link to={`${editUrl}/${e._id}`} className="btn text-info">
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </Link>
                </th>
                <td>
                  <Link to={`${subCatUrl}/${e.lang}/${e._id}`}>{e.name}</Link>
                </td>
                <td>{e.description}</td>
                <td>
                  <RestrictComponent>
                    <button
                      onClick={() => handleDelete(e._id, index)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </RestrictComponent>
                </td>
              </tr>
            ))}

          {/* Categories table - faSearch */}
          {search.length > 0 && (
            <FilterResults
              value={search}
              data={data}
              renderResults={(results) =>
                results.map((e) => (
                  <tr key={e._id}>
                    <th scope="row">
                      <Link
                        to={`${editUrl}/${e._id}`}
                        className="btn text-info"
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </Link>
                    </th>
                    <td>
                      <Link to={`${subCatUrl}/${e.lang}/${e._id}`}>
                        {e.name}
                      </Link>
                    </td>
                    <td>{e.description}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(e.name, e._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              }
            />
          )}
        </tbody>
      </table>
    </>
  );
}
