"use client";
import { MdAccountCircle } from "react-icons/md";
import { LuCirclePlus } from "react-icons/lu";

const DisplayUsers = ({ users, addUsers, addedUser }) => {
  const handleUser = (user, isUserAlreadySelected) => {
    if (isUserAlreadySelected) {
      return;
    }
    addUsers({ id: user.id, name: user.name });
  };

  return (
    <div>
      {users?.map((user, index) => {
        const isUserAlreadySelected =
          addedUser.filter((selectedUser) => selectedUser.id === user.id)
            .length > 0
            ? true
            : false;

        return (
          <div
            key={user.id}
            // className="hover:bg-gray-300"
            className={` ${
              isUserAlreadySelected
                ? "bg-gray-400"
                : "cursor-pointer hover:bg-blue-100"
            }`}
            onClick={() => handleUser(user, isUserAlreadySelected)}
          >
            <div className="text-base w-[80%] mx-auto flex justify-between items-center px-2 py-2">
              <div className="flex items-center gap-3">
                <MdAccountCircle className="text-xl" />
                {user.name}
              </div>
              <LuCirclePlus />
            </div>
            {index !== users.length - 1 && (
              <div className="w-[90%] h-[1px] mx-auto bg-black"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayUsers;
