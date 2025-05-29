import React, { useEffect } from 'react';
import { fetchMembers } from '../../context/members/actions';
import { useMembersDispatch, useMembersState } from '../../context/members/context';
import MemberListItems from './MemberListItems';

const MemberList: React.FC = () => {
  const dispatch = useMembersDispatch();
  const { members, isLoading, isError, errorMessage } = useMembersState();

  useEffect(() => {
    fetchMembers(dispatch);
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="text-red-600">Error: {errorMessage}</div>;

  return (
    <div className="grid gap-4 grid-cols-4 mt-5">
      <MemberListItems members={members} />
    </div>
  );
};

export default MemberList;
