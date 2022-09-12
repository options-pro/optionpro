// import axios from "axios";
import jwt_decode from "jwt-decode";

const createOrGetUser = async (response, addUser) => {
  const decoded = jwt_decode(response.credential);
  console.log(decoded);

  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    userName: name,
    image: picture,
  };

  addUser(user);
  // console.log(response.credential)
};

export default createOrGetUser;
