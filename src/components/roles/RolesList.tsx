import React, { useState } from 'react';
import { Shield, Edit2, Trash2, Search, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Role, Permission } from '../../types/types';
import ConfirmationModal from '../shared/ConfirmationModal';
import CustomCheckbox from '../shared/CustomCheckbox';

const RoleList: React.FC = () => {
  const { roles, addRole, updateRole, deleteRole } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    roleId: string | null;
  }>({ isOpen: false, roleId: null });

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmation({ isOpen: true, roleId: id });
  };

  const confirmDelete = () => {
    if (deleteConfirmation.roleId) {
      deleteRole(deleteConfirmation.roleId);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const permissions: Permission[] = [];

    ['users', 'content', 'settings'].forEach(module => {
      ['create', 'read', 'update', 'delete'].forEach(action => {
        const permissionName = `${module}_${action}`;
        if (formData.get(permissionName)) {
          permissions.push({
            id: Date.now().toString(),
            name: permissionName,
            description: `${action} ${module}`,
            module
          });
        }
      });
    });

    const roleData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      permissions
    };

    if (editingRole) {
      updateRole({ ...roleData, id: editingRole.id });
    } else {
      addRole(roleData);
    }

    setIsEditing(false);
    setEditingRole(null);
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
              placeholder="Search roles..."
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
          Add Role
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#2D2A3E] rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {editingRole ? 'Edit Role' : 'Add New Role'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  name="name"
                  defaultValue={editingRole?.name}
                  className="w-full px-4 py-2 bg-[#3D3A4E] rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  name="description"
                  defaultValue={editingRole?.description}
                  className="w-full px-4 py-2 bg-[#3D3A4E] rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Permissions</label>
                {['users', 'content', 'settings'].map(module => (
                  <div key={module} className="mb-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-2 capitalize">{module}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['create', 'read', 'update', 'delete'].map(action => {
                        const permissionName = `${module}_${action}`;
                        const hasPermission = editingRole?.permissions.some(
                          p => p.name === permissionName
                        );
                        return (
                          <CustomCheckbox
                            key={permissionName}
                            id={permissionName}
                            name={permissionName}
                            label={action}
                            checked={hasPermission} // <-- changed this to 'checked' instead of 'defaultChecked'
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingRole(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#3D3A4E] hover:bg-[#4D4A5E] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] transition-colors"
                >
                  {editingRole ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, roleId: null })}
        onConfirm={confirmDelete}
        title="Delete Role"
        message="Are you sure you want to delete this role? This action cannot be undone and may affect users with this role."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRoles.map((role) => (
          <div key={role.id} className="bg-[#3D3A4E] p-4 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2D2A3E] rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <div>
                  <h3 className="font-medium">{role.name}</h3>
                  <p className="text-sm text-gray-400">{role.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(role)}
                  className="p-2 hover:bg-[#2D2A3E] rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(role.id)}
                  className="p-2 hover:bg-[#2D2A3E] rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-400">Permissions</h4>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission) => (
                  <span
                    key={permission.id}
                    className="px-3 py-1 bg-[#2D2A3E] rounded-full text-sm"
                  >
                    {permission.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleList;