export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    avatar?: string;
  }
  
  export interface Role {
    id: string;
    name: string;
    description: string;
    permissions: Permission[];
  }
  
  export interface Permission {
    id: string;
    name: string;
    description: string;
    module: string;
  }
  
  export type PermissionAction = 'create' | 'read' | 'update' | 'delete';