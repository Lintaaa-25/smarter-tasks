import { useEffect, useState } from "react";
import MemberList from "./MemberList";
import NewMember from "./NewMember";

const Members = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
    }
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-medium tracking-tight">Members</h2>
          {user && (
            <p className="text-sm text-gray-600">{user.name} ({user.email})</p>
          )}
        </div>
        <NewMember />
      </div>
      <MemberList />
    </>
  );
};

export default Members;
