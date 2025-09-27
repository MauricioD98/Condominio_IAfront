import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../hooks/usePermissions';
import { 
  Home, 
  Users, 
  Building, 
  DollarSign, 
  Bell, 
  Shield, 
  Waves, 
  Wrench, 
  BarChart3,
  Menu,
  X,
  LogOut
} from 'lucide-react';
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { canAccessModule } = usePermissions();
  const location = useLocation();
  const navigate = useNavigate();

  const allNavigation = [
    { name: 'Inicio', href: '/dashboard', icon: Home, module: 'dashboard' },
    { name: 'Usuarios', href: '/admin/users', icon: Users, module: 'users' },
    { name: 'Unidades', href: '/admin/units', icon: Building, module: 'units' },
    { name: 'Roles', href: '/admin/roles', icon: Shield, module: 'roles' },
    { name: 'Finanzas', href: '/finance', icon: DollarSign, module: 'finance' },
    { name: 'Avisos', href: '/notices', icon: Bell, module: 'notices' },
    { name: 'Seguridad', href: '/security', icon: Shield, module: 'security' },
    { name: 'Eventos', href: '/amenities', icon: Waves, module: 'amenities' },
    { name: 'Mantenimiento', href: '/maintenance', icon: Wrench, module: 'maintenance' },
    { name: 'Reportes', href: '/reports', icon: BarChart3, module: 'reports' },
  ];

  const navigation = allNavigation.filter(item => {
    if (item.module === 'dashboard' || item.module === 'roles') return true;
    return canAccessModule(item.module);
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div className={`fixed inset-0 bg-black bg-opacity-50 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity`} onClick={() => setSidebarOpen(false)} />
        
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-gradient-to-b from-blue-500 to-indigo-600 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4 text-white">
              <h1 className="text-2xl font-bold">Condominio Inteligente</h1>
            </div>
            <nav className="mt-5 px-2 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-2xl transition-colors ${
                      isActive
                        ? 'bg-white text-indigo-600 shadow-lg'
                        : 'text-white hover:bg-white hover:text-indigo-600 hover:shadow-md'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-blue-500 to-indigo-600">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 text-white">
              <h1 className="text-2xl font-bold">Condominio Inteligente</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-2xl transition-colors ${
                      isActive
                        ? 'bg-white text-indigo-600 shadow-lg'
                        : 'text-white hover:bg-white hover:text-indigo-600 hover:shadow-md'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-gray-900">Administrativo</h2>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Bienvenido {user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Salir
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

