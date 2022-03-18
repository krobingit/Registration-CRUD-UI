import axios from "../Axios/axios";

class RegisterService {
  async createUser(data) {
    const response = await axios.post("/api/registration", data);
    return response.data;
  }
  async updateUser(data) {
    const { userId, ...payload } = data;
    const response = await axios.put(
      `/api/registration/users/${userId}`,
      payload
    );
    return response.data;
  }
  async deleteUser(data) {
    const { userId } = data;
    const response = await axios.delete(`/api/registration/users/${userId}`);
    return response;
  }
  async fetchUsers() {
    const response = await axios.get("/api/registration/users");
    return response.data;
  }
  async fetchUser(userId) {
    const response = await axios.get(`/api/registration/users/${userId}`);
    return response.data;
  }
}

export default new RegisterService();
