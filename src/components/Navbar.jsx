import React from "react";
import logo from "../images/logo.jpeg";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import createOrGetUser from "../utils/index";

import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";

import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  return (
    <div>
      <div>
        <div className="w-full h-[70px] flex navbar pr-3 pt-3">
          {userProfile ? (
            <div className="flex gap-3 md:gap-5">
              {userProfile.image && (
                <Link to="/">
                  <>
                    <img
                      width={45}
                      height={45}
                      className="rounded-full cursor-pointer"
                      src={userProfile.image}
                      alt="profile"
                    />
                  </>
                </Link>
              )}

              <button
                type="button"
                className="px-2 h-[45px] w-[45px] border-red-600 border-2 rounded-full"
                onClick={() => {
                  googleLogout();
                  removeUser();
                }}
              >
                <AiOutlineLogout color="red" fontSize={25} />
              </button>
            </div>
          ) : (
            // <div>{userProfile.userName}</div>
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={(error) => console.log(error)}
            />
          )}
        </div>
        <div className="options-pro-logo-container absolute top-[20px] left-[20px]">
          <img
            src={logo}
            alt="options-pro-logo"
            className="h-[100px] w-[100px] z-100 "
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
