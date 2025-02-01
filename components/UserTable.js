"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const UserTable = ({ addedUser }) => {
  const [userSkills, setUserSkills] = useState([]);
  const [skillTypes, setSkillTypes] = useState(new Set());

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        let temp = await Promise.all(
          addedUser?.map(async (user) => {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_URL}/people/${user.id}`
            );
            if (res.status === 200) {
              const userSkillSet = res.data.data.data.skillset;
              const skillObj = {};
              userSkillSet?.forEach((skill) => {
                skill.skills?.forEach((userSkill) => {
                  const skillName = userSkill.name;
                  setSkillTypes((prev) => new Set(prev).add(skillName));
                  const skillScore = userSkill.pos[0].consensus_score;
                  skillObj[skillName] = skillScore;
                });
              });
              return {
                [user.id]: { name: user.name, skillObj },
              };
            }
          })
        );

        setUserSkills(temp);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserSkills();
  }, [addedUser]);

  const getColor = (val) => {
    switch (val) {
      case 0:
        return "bg-green-100";
      case 1:
        return "bg-green-300";
      case 2:
        return "bg-green-500";
      case 3:
        return "bg-green-700";
      case 4:
        return "bg-green-900";
      default:
        return "bg-green-0";
    }
  };

  return (
    <div className="ml-[5vw]">
      <div className="border-b border-black w-[60vw] flex justify-between mb-5">
        <div>
          <button className="border border-black p-1 border-b-0 text-white bg-green-600">
            Compare view
          </button>
          <button className="border border-black p-1 border-b-0">
            Individual view
          </button>
          <button className="border border-black p-1 border-b-0">
            Shortlisted candidates
          </button>
        </div>
        <div>
          <p>{addedUser.length ?? "0"} candidates</p>
        </div>
      </div>
      <div>
        <table
          className="table-auto"
          style={{ borderSpacing: "10px", borderCollapse: "separate" }}
        >
          <thead>
            <tr>
              <th>Skill type</th>
              {userSkills?.map((userSkill) => {
                return (
                  <th key={Object.values(userSkill)[0].name}>
                    {Object.values(userSkill)[0].name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {[...skillTypes]?.map((skillType) => {
              return (
                <tr key={skillType}>
                  <td>{skillType}</td>
                  {userSkills.map((userSkill) => {
                    const userId = Object.keys(userSkill)[0];
                    const skillObj = Object.values(userSkill)[0].skillObj;
                    return (
                      <td
                        key={userId}
                        className={`h-1 w-1 ${getColor(skillObj[skillType])}`}
                      ></td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
