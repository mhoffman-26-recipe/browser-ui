const USER_API = '/api/user'

export const fetchUsers = async () => {
    const response = await fetch(USER_API);
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
};

export const deleteUser = async (id: number) => {
    const response = await fetch(USER_API +`/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete user');
    return id;
}

export const addUser = async (name: string) => {
    const response = await fetch(USER_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error('Failed to add user');
    return await response.json();
};

export const updateUser = async (userId: number, name: string) => {
    const response = await fetch(USER_API + `/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json();
};