"use client";

import { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { LuCirclePlus } from "react-icons/lu";

const UserList = ({ userList, addUsers, addedUser }) => {
  // console.log("userList----");
  // console.log(userList);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    setRecommendedUsers(userList.slice(0, 3));
    setOtherUsers(userList.slice(3));
  }, [userList]);

  const handleUser = (user) => {
    addUsers({ id: user.id, name: user.name });
  };

  return (
    <div>
      <div className="border border-black w-[20vw]">
        <div>
          <p className="border-b border-black py-2 text-center text-xl">
            Most recommended
          </p>
          {recommendedUsers?.map((user, index) => {
            return (
              <div
                key={user.id}
                className="hover:bg-gray-300"
                onClick={() => handleUser(user)}
              >
                <div className="text-base w-[80%] mx-auto flex justify-between items-center px-2 py-2 cursor-pointer ">
                  <div className="flex items-center gap-3">
                    <MdAccountCircle className="text-xl" />
                    {user.name}
                  </div>
                  <LuCirclePlus />
                </div>
                {index !== recommendedUsers.length - 1 && (
                  <div className="w-[90%] h-[1px] mx-auto bg-black"></div>
                )}
              </div>
            );
          })}
          <p className="py-3 bg-green-200 px-5 text-sm">
            Recommendations are based on your skill requirements and candidate's
            performance
          </p>
          <div className="h-20 border-t border-b border-black"></div>
          {otherUsers?.map((user, index) => {
            return (
              <div
                key={user.id}
                className="hover:bg-gray-300"
                onClick={() => handleUser(user)}
              >
                <div className="text-base w-[80%] mx-auto flex justify-between items-center px-2 py-2 cursor-pointer ">
                  <div className="flex items-center gap-3">
                    <MdAccountCircle className="text-xl" />
                    {user.name}
                  </div>
                  <LuCirclePlus />
                </div>
                {index !== recommendedUsers.length - 1 && (
                  <div className="w-[90%] h-[1px] mx-auto bg-black"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserList;
