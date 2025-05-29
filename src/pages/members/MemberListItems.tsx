import React from "react";
import { deleteMember } from "../../context/members/actions";
import { useMembersDispatch } from "../../context/members/context";
import { TrashIcon } from "@heroicons/react/24/outline";

interface Member {
  id: number;
  name: string;
  email: string;
}

interface Props {
  members: Member[];
}

const MemberListItems: React.FC<Props> = ({ members }) => {
  const dispatch = useMembersDispatch();

  const handleDelete = (id: number) => {
    deleteMember(dispatch, id);
  };

  if (members.length === 0) return <p>No members found.</p>;

  return (
    <>
      {members.map((member) => (
        <div key={member.id} className="member relative block p-4 border rounded-lg shadow bg-white">
          <h3 className="text-lg font-semibold">{member.name}</h3>
          <p className="text-sm text-gray-500">{member.email}</p>
          <button
            onClick={() => handleDelete(member.id)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
    </>
  );
};

export default MemberListItems;
