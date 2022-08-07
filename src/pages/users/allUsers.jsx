import React, { useState, useEffect } from "react";
import MainLayout from "./../../layout/MainLayout";
import UsersTable from "./../../components/usersTable";
import AxiosServices from "./../../networks/AxiosService";
import ApiServices from "./../../networks/ApiServices";
import { toast } from "react-toastify";
import RestrictComponent from "./../../components/common/RestrictComponent";
import EbModal from "../../components/common/Modal/index";
import Pagination from "../../components/common/Pagination/index";

const AllUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOPen, setIsOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({
    itemId: null,
    itemPos: null,
  });
  const [pagination, setPagination] = useState({
    totalPage: 0,
    page: 0,
    limit: 10,
  });

  const [err, setErr] = useState();

  async function getUsers(currentPage, query = {}) {
    try {
      let response = await AxiosServices.get(ApiServices.users, {
        limit: pagination.limit,
        page: currentPage === 0 ? 0 : currentPage,
        ...query,
      });
      let users = response.data.data;
      setUsers(users);
      let data = response.data;
      let total = data.total || null;
      let limit = data.limit;
      let page = data.page;
      setPagination({
        total,
        limit,
        page,
        totalPage: (total && Math.ceil(total / limit)) || 0,
      });
      setLoading(false);
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setErr(data.message);
      setLoading(false);
    }
  }

  const deleteItem = async (userId, pos) => {
    try {
      let response = await AxiosServices.remove(
        `${ApiServices.users}/${userId}`
      );
      let data = response.data;
      toast.success(data.message);
      let usersList = [...users];
      usersList.splice(pos, 1);
      setUsers(usersList);
      setLoading(false);
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setErr(data.message);
      setLoading(false);
    }
  };

  const handleModalClose = (type) => {
    if (type === "save") {
      deleteItem(deletedItem.itemId, deletedItem.itemPos);
    }
    setIsOpen(false);
  };

  const handleDelete = async (catId, pos) => {
    setDeletedItem({
      itemId: catId,
      itemPos: pos,
    });
    setIsOpen(true);
  };

  const search = {
    admin: { isAdmin: true, role: "admin" },
    moderator: { isAdmin: true, role: "moderator" },
    customers: { isAdmin: false },
  };
  const handleSelectChange = (event) => {
    let { value } = event.target;
    getUsers(null, search[value]);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <MainLayout>
      <RestrictComponent>
        <h2 className="text-center mt-2">All users</h2>
        <div className="row">
          <div className="offset-sm-10 col-sm-2">
            <select
              onChange={handleSelectChange}
              className="custom-select my-1 mr-sm-2"
            >
              <option defaultValue="">...</option>
              <option defaultValue="admin">Admin</option>
              <option defaultValue="moderator">Moderator</option>
              <option defaultValue="customers">Customers</option>
            </select>
          </div>
        </div>
        <UsersTable
          key={users.length}
          users={users}
          onDelete={handleDelete}
          loading={loading}
        />
        <EbModal
          title="Delete User"
          message="Permanently deleting this user"
          isOPen={isOPen}
          saveText="Delete"
          cancelText="Cancel"
          handleClose={handleModalClose}
        />

        <Pagination
          pagination={pagination}
          getData={getUsers}
          setPagination={setPagination}
        />
      </RestrictComponent>
    </MainLayout>
  );
};

export default AllUsers;
