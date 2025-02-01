"use client";

import { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { LuCirclePlus } from "react-icons/lu";

import DisplayUsers from "./DisplayUsers";

const UserList = ({ userList, addUsers, addedUser }) => {
  // console.log("addedUser----");
  // console.log(addedUser);
  // console.log(addedUser.id);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    setRecommendedUsers(userList.slice(0, 3));
    setOtherUsers(userList.slice(3));
  }, [userList]);

  return (
    <div>
      <div className="border border-black w-[20vw]">
        <div>
          <p className="border-b border-black py-2 text-center text-xl">
            Most recommended
          </p>
          <DisplayUsers
            users={recommendedUsers}
            addUsers={addUsers}
            addedUser={addedUser}
          />
          <p className="py-3 bg-yellow-100 px-5 text-sm">
            Recommendations are based on your skill requirements and candidate's
            performance
          </p>
          <div className="h-20 border-t border-b border-black"></div>
          <DisplayUsers
            users={otherUsers}
            addUsers={addUsers}
            addedUser={addedUser}
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;
