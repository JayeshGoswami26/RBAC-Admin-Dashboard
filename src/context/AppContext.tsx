import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { User, Role } from '../types/types';

interface AppContextType {
  users: User[];
  roles: Role[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Omit<Role, 'id'>) => void;
  updateRole: (role: Role) => void;
  deleteRole: (id: string) => void;
}

const initialUsers: User[] = [
  {
    id: '1',
    name: 'Jayesh Puri Goswami',
    email: 'admin@rbac.com',
    role: 'Admin',
    status: 'active',
  }
];

const initialRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: [
      { id: '1', name: 'users_create', description: 'Create users', module: 'users' },
      { id: '2', name: 'users_read', description: 'Read users', module: 'users' },
      { id: '3', name: 'users_update', description: 'Update users', module: 'users' },
      { id: '4', name: 'users_delete', description: 'Delete users', module: 'users' },
      { id: '5', name: 'content_create', description: 'Create content', module: 'content' },
      { id: '6', name: 'content_read', description: 'Read content', module: 'content' },
      { id: '7', name: 'content_update', description: 'Update content', module: 'content' },
      { id: '8', name: 'content_delete', description: 'Delete content', module: 'content' },
      { id: '9', name: 'settings_read', description: 'Read settings', module: 'settings' },
      { id: '10', name: 'settings_update', description: 'Update settings', module: 'settings' },
    ],
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useLocalStorage<User[]>('users', initialUsers);
  const [roles, setRoles] = useLocalStorage<Role[]>('roles', initialRoles);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: Date.now().toString() };
    setUsers([...users, newUser]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const addRole = (role: Omit<Role, 'id'>) => {
    const newRole = { ...role, id: Date.now().toString() };
    setRoles([...roles, newRole]);
  };

  const updateRole = (updatedRole: Role) => {
    setRoles(roles.map(role => role.id === updatedRole.id ? updatedRole : role));
  };

  const deleteRole = (id: string) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  return (
    <AppContext.Provider value={{
      users,
      roles,
      isSidebarOpen,
      setIsSidebarOpen,
      addUser,
      updateUser,
      deleteUser,
      addRole,
      updateRole,
      deleteRole,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}