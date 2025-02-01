"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import UserList from "@/components/UserList";
import UserTable from "@/components/UserTable";

export default function Home() {
  const [userList, setUserList] = useState([]);
  const [addedUser, setAddedUser] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/people`);
        // console.log(res);
        if (res.status === 200) {
          setUserList(res.data);
        }
      } catch (err) {}
    };
    fetchUserList();
  }, []);

  const addUsers = (user) => {
    setAddedUser((prev) => [...prev, user]);
  };

  return (
    <div>
      <h1 className="mt-[5vh] pl-[5vw] text-2xl mb-4">Posk_UXdesigner_sr001</h1>
      <div className="flex">
        <UserList userList={userList} addUsers={addUsers} addedUser={addedUser} />
        <UserTable addedUser={addedUser} />
      </div>
    </div>
  );
}
