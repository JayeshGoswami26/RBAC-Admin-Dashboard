# RBAC Admin Dashboard

A modern Role-Based Access Control (RBAC) dashboard built with React, TypeScript, and Tailwind CSS. This application provides a user-friendly interface for managing users, roles, and permissions efficiently.

![RBAC Dashboard](https://i.ibb.co/kMpyszD/Screenshot-2024-12-05-094947.png)

## Features

- 🔐 **User Management**
  - Add, edit, and delete users
  - Assign roles to users
  - Manage user status (active/inactive)
  - Search and filter users

- 👥 **Role Management**
  - Create and modify roles
  - Define granular permissions
  - Visual permission management
  - Role-based access control

- 🛡️ **Permission System**
  - Module-based permissions
  - Create, Read, Update, Delete (CRUD) operations
  - Custom permission assignments
  - Hierarchical permission structure

- 💫 **Modern UI/UX**
  - Responsive design
  - Dark theme
  - Animated components
  - Intuitive interface

## Tech Stack

- ⚛️ React 18
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 💾 LocalStorage for data persistence
- 🎯 Vite for development
- 📦 Context API for state management

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── DashboardLayout.tsx
│   ├── roles/
│   │   └── RoleList.tsx
│   ├── shared/
│   │   ├── ConfirmationModal.tsx
│   │   └── CustomCheckbox.tsx
│   └── users/
│       └── UserList.tsx
├── context/
│   └── AppContext.tsx
├── hooks/
│   └── useLocalStorage.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rbac-admin.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Components

#### DashboardLayout
The main layout component that provides the sidebar navigation and responsive design.

#### UserList
Manages the list of users with CRUD operations and search functionality.

#### RoleList
Handles role management with permission configuration and search capabilities.

#### CustomCheckbox
A reusable checkbox component with custom animation and styling.

## Data Structure

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}
```

### Role
```typescript
interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}
```

### Permission
```typescript
interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}
```

## State Management

The application uses React Context API for state management. The `AppContext` provides:

- User management functions
- Role management functions
- Sidebar state
- Data persistence through LocalStorage

## Styling

- Custom dark theme with purple accent colors
- Responsive design with Tailwind CSS
- Custom animations for interactions
- Consistent spacing and typography

## Best Practices

- TypeScript for type safety
- Component composition for reusability
- Custom hooks for shared logic
- Consistent error handling
- Responsive design patterns
- Modern React patterns (hooks, context)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for development tooling