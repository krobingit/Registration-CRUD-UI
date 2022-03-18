import axios from "axios";

const instance= axios.create({baseURL:"https://registration-crud-server.herokuapp.com/"})


export default instance;