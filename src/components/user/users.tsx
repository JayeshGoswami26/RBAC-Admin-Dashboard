import React, { useState } from 'react';
import { User, Edit2, Trash2, Search, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { User as UserType } from '../../types/types';
import ConfirmationModal from '../shared/ConfirmationModal';

const UserList: React.FC = () => {
  const { users, roles, deleteUser, addUser, updateUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    userId: string | null;
  }>({ isOpen: false, userId: null });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user: UserType) => {
    setEditingUser(user);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmation({ isOpen: true, userId: id });
  };

  const confirmDelete = () => {
    if (deleteConfirmation.userId) {
      deleteUser(deleteConfirmation.userId);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
      status: formData.get('status') as 'active' | 'inactive',
    };

    if (editingUser) {
      updateUser({ ...userData, id: editingUser.id });
    } else {
      addUser(userData);
    }

    setIsEditing(false);
    setEditingUser(null);
    e.currentTarget.reset();
  };

  return (
    <div className="bg-[#2D2A3E] rounded-xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex-1 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 bg-[#3D3A4E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#8B5CF6] rounded-lg hover:bg-[#7C3AED] transition-colors w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#2D2A3E] rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  name="name"
                  defaultValue={editingUser?.name}
                  className="w-full px-4 py-2 bg-[#3D3A4E] rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  defaultValue={editingUser?.email}
                  className="w-full px-4 py-2 bg-[#3D3A4E] rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  name="role"
                  defaultValue={editingUser?.role}
                  className="w-full px-4 py-2 bg-[#3D3A4E] rounded-lg"
                  required
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.name}>{role.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  defaultValue={editingUser?.status}
                  className="w-full px-4 py-2 bg-[#3D3A4E] rounded-lg"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#3D3A4E] hover:bg-[#4D4A5E] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] transition-colors"
                >
                  {editingUser ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, userId: null })}
        onConfirm={confirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="pb-3">User</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-700">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#3D3A4E] rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className="px-3 py-1 bg-[#3D3A4E] rounded-full text-sm">
                    {user.role}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    user.status === 'active' 
                      ? 'bg-green-900/30 text-green-400'
                      : 'bg-red-900/30 text-red-400'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-2 hover:bg-[#3D3A4E] rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 hover:bg-[#3D3A4E] rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {/* <button className="p-2 hover:bg-[#3D3A4E] rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;