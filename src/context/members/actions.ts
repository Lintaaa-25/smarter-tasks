import { API_ENDPOINT } from '../../config/constants';

export const addMember = async (dispatch: any, args: any) => {
  try {
    const token = localStorage.getItem("authToken") ?? "";
    const response = await fetch(`${API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(args),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = data.errors?.[0]?.message || 'Failed to create member';
      return { ok: false, error };
    }

    dispatch({ type: 'ADD_MEMBER_SUCCESS', payload: data });
    return { ok: true };
  } catch (error) {
    console.error('Create member failed:', error);
    return { ok: false, error: 'Server error' };
  }
};

export const fetchMembers = async (dispatch: React.Dispatch<any>) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_MEMBERS_REQUEST" });

    const response = await fetch(`${API_ENDPOINT}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });

    const data = await response.json();
    dispatch({ type: "FETCH_MEMBERS_SUCCESS", payload: data });
  } catch (error) {
    console.error('Fetch members failed:', error);
    dispatch({ type: "FETCH_MEMBERS_FAILURE", payload: 'Unable to load members' });
  }
};

export const deleteMember = async (dispatch: any, id: number) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    const response = await fetch(`${API_ENDPOINT}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete member');
    }

    dispatch({ type: 'DELETE_MEMBER_SUCCESS', payload: id });
  } catch (error) {
    console.error('Delete member failed:', error);
  }
};
