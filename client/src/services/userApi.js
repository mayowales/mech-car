import axios from "axios";

const getAllMech = () => {
  return axios
    .get("/api/user/allMechanic")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const getOneUser = (userId) => {
  return axios
    .get(`/api/user/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const updateUser = (userId, updateProps) => {
  console.log("hello:", userId);
  return axios
    .put(`/api/user/${userId}`, updateProps)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const deleteOneUser = (userId) => {
  return axios
    .delete(`/api/user/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export { getAllMech, getOneUser, updateUser, deleteOneUser };
