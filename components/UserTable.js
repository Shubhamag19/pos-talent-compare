"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const UserTable = ({ addedUser }) => {
  const [userSkills, setUserSkills] = useState([]);
  const [skillTypes, setSkillTypes] = useState(new Set());
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [displaySkills, setDisplaySkills] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

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

  const handleShowFilterToggle = () => {
    setShowFilters((prev) => !prev);
  };

  const handleCheckboxChange = (skill) => {
    setSelectedSkills((prev) => {
      const newSelectedSkills = prev ? [...prev] : [];
      if (newSelectedSkills.includes(skill)) {
        return newSelectedSkills.filter((s) => s !== skill);
      } else {
        newSelectedSkills.push(skill);
        return newSelectedSkills;
      }
    });
  };

  useEffect(() => {
    if (selectedSkills.length === 0) {
      setDisplaySkills([...skillTypes]);
    } else {
      setDisplaySkills([...selectedSkills]);
    }
  }, [selectedSkills, skillTypes]);

  const handleClearSelection = (e) => {
    setSelectedSkills([]);
    setShowFilters(false);
    e.stopPropagation();
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
      {userSkills.length > 0 ? (
        <div>
          <div className="border border-black w-[300px]">
            <div
              className="bg-gray-200 px-4 py-2 cursor-pointer"
              onClick={handleShowFilterToggle}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p>Select filters</p>
                  <FaFilter className="text-xl" />
                </div>
                <RxCross2 className="text-xl" onClick={handleClearSelection} />
              </div>
            </div>
            {showFilters && (
              <div className="flex flex-col  w-[300px] absolute transform translate-x-[-1px] bg-white border-r border-b border-l border-black">
                {[...skillTypes]?.map((skill) => {
                  return (
                    <div key={skill} className="flex gap-2 items-start">
                      <input
                        type="checkbox"
                        value={skill}
                        checked={selectedSkills?.includes(skill)}
                        onChange={() => handleCheckboxChange(skill)}
                        className="mt-1.5 ml-2"
                      />
                      {skill}
                    </div>
                  );
                })}
              </div>
            )}
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
                {displaySkills?.map((skillType) => {
                  return (
                    <tr key={skillType}>
                      <td>{skillType}</td>
                      {userSkills.map((userSkill) => {
                        const userId = Object.keys(userSkill)[0];
                        const skillObj = Object.values(userSkill)[0].skillObj;
                        return (
                          <td
                            key={userId}
                            className={`h-1 w-1 ${getColor(
                              skillObj[skillType]
                            )}`}
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
      ) : (
        <div className="text-center mt-[15vh]">
          Please select a user to see data
        </div>
      )}
    </div>
  );
};

export default UserTable;
