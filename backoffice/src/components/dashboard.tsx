import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Pusher from 'pusher-js';
import { useAuth } from '../context/AuthContext';

// Icônes MUI
import DashboardIcon from '@mui/icons-material/SpaceDashboard';
import GroupIcon from '@mui/icons-material/Groups2';
import WoodIcon from '@mui/icons-material/Handyman';
import CategoryIcon from '@mui/icons-material/Style';
import MessageIcon from '@mui/icons-material/MarkEmailRead';
import StarIcon from '@mui/icons-material/AutoAwesome';
import LogoutIcon from '@mui/icons-material/PowerSettingsNew';
import MenuIcon from '@mui/icons-material/MenuOpen';
import ChevronLeftIcon from '@mui/icons-material/West';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Echo from 'laravel-echo';
// Pages
import UsersPage from '../pages/UsersPage';
import ProjectsPage from '../pages/ProjectsPage';
import CategoriesPage from '../pages/CategoriesPage';
import ContactPage from '../pages/ContactPage';
import ReviewsPage from '../pages/ReviewsPage';
import DashboardHome from '../pages/DashboardHome';
import Devis from '../pages/Devis';

// --- INTERFACES TYPESCRIPT ---
interface PusherData {
  title: string;    // Ajouté : correspond à notifyApp
  message: string;
  type: string;     // Ajouté : correspond à notifyApp
}

interface NotificationItem {
  id: number;
  title: string;    // Ajouté
  message: string;
  time: string;
}

export default function DashboardLayout() {
  const [open, setOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // --- ÉTATS NOTIFICATIONS ---
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const COLORS = {
    woodDark: '#2D2926',
    woodGold: '#A66D3B',
    woodLight: '#C4936A',
    background: '#F8F5F2',
  };

  // --- LOGIQUE PUSHER ---
 // --- LOGIQUE LARAVEL ECHO (PRIVATE CHANNEL) ---
useEffect(() => {
  const token = localStorage.getItem('token');
  
  if (!token) return;

  const echo = new Echo({
    broadcaster: 'pusher',
    key: '01c02b56ace89f22c528',
    cluster: 'eu',
    forceTLS: true,
    authEndpoint: 'http://localhost:8000/broadcasting/auth',
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  });

  // Utilisation de .private pour correspondre à ton PrivateChannel Laravel
  echo.private('admin-notifications')
    .listen('.app.notification', (data: PusherData) => { // .app.notification correspond au broadcastAs()
      console.log("Notification reçue :", data);
      
      const newNotif: NotificationItem = {
        id: Date.now(),
        title: data.title,
        message: data.message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setNotifications(prev => [newNotif, ...prev]);
      setUnreadCount(prev => prev + 1);
    })
    .error((error: any) => {
      console.error("Erreur de connexion Echo :", error);
    });

  // Nettoyage à la destruction du composant
  return () => {
    echo.private('admin-notifications').stopListening('.app.notification');
    echo.disconnect();
  };
}, []);

  const menuItems = [
    { text: "Vue d'ensemble", icon: <DashboardIcon fontSize="small" />, path: '' },
    { text: 'Clients', icon: <GroupIcon fontSize="small" />, path: 'users' },
    { text: 'Réalisations', icon: <WoodIcon fontSize="small" />, path: 'projects' },
    { text: 'Demandes', icon: <DescriptionIcon fontSize="small" />, path: 'devis' },
    { text: 'Collections', icon: <CategoryIcon fontSize="small" />, path: 'categories' },
    { text: 'Messages', icon: <MessageIcon fontSize="small" />, path: 'contact' },
    { text: 'Témoignages', icon: <StarIcon fontSize="small" />, path: 'reviews' },
  ];

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: COLORS.background }}>

      {/* --- SIDEBAR --- */}
      <motion.aside
        initial={false}
        animate={{ width: open ? 280 : 80 }}
        className="fixed inset-y-0 left-0 z-50 flex flex-col border-r-4 shadow-2xl"
        style={{ backgroundColor: COLORS.woodDark, borderColor: COLORS.woodGold }}
      >
        <div className="flex items-center justify-between h-16 px-4 overflow-hidden">
          <AnimatePresence mode="wait">
            {open && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-2xl font-bold italic whitespace-nowrap"
                style={{ color: COLORS.woodGold, fontFamily: "'Dancing Script', cursive" }}
              >
                L'Atelier
              </motion.span>
            )}
          </AnimatePresence>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
            className={`p-1 rounded-full hover:bg-white/10 text-white transition-all ${!open && 'mx-auto'}`}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon className="rotate-180" />}
          </motion.button>
        </div>

        <hr className="border-white/10 mb-4" />

        <nav className="flex-1 px-3 space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === `/dashboard/${item.path}` || (item.path === '' && location.pathname === '/dashboard');
            return (
              <motion.button
                key={item.text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/dashboard/${item.path}`)}
                className={`w-full flex items-center h-12 px-3 rounded-xl transition-all group relative
                  ${isActive ? 'bg-[#A66D3B]/20 text-white shadow-inner' : 'text-white/60 hover:bg-white/5 hover:text-white'}
                `}
              >
                {isActive && (
                  <motion.div layoutId="activeTab" className="absolute left-0 w-1 h-6 bg-[#A66D3B] rounded-r-full" />
                )}
                <div className={`${isActive ? 'text-[#A66D3B]' : 'text-inherit'} transition-colors`}>
                  {item.icon}
                </div>
                {open && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`ml-4 text-sm font-medium whitespace-nowrap ${isActive ? 'font-bold text-white' : ''}`}
                  >
                    {item.text}
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </nav>
      </motion.aside>

      {/* --- MAIN CONTENT --- */}
      <motion.div animate={{ marginLeft: open ? 280 : 80 }} className="flex flex-col flex-1 transition-all">

        {/* --- TOPBAR --- */}
        <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-md border-b border-black/5 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <span className="text-xl uppercase tracking-widest font-bold text-[#A66D3B]">
              {location.pathname.split('/').pop()?.toUpperCase() || 'DASHBOARD'}
            </span>
          </div>

          <div className="flex items-center gap-4">

            {/* --- NOTIFICATIONS --- */}
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setNotifMenuOpen(!notifMenuOpen);
                  setUserMenuOpen(false);
                  setUnreadCount(0);
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative text-gray-600"
              >
                <NotificationsIcon />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </motion.button>

              <AnimatePresence>
                {notifMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                      <span className="font-bold text-gray-800">Notifications</span>
                      {notifications.length > 0 && (
                        <button onClick={() => setNotifications([])} className="text-xs text-red-500 hover:underline">Effacer</button>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-400 text-sm italic">Aucune notification</div>
                      ) : (
                        notifications.map((n) => (
                          <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <div className="font-bold text-xs text-[#A66D3B] mb-1">{n.title}</div>
                            <p className="text-sm text-gray-800 font-medium leading-tight">{n.message}</p>
                            <span className="text-[10px] text-gray-400 uppercase font-semibold">{n.time}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setNotifMenuOpen(false);
                }}
              >
                <span className="hidden sm:block text-sm font-semibold text-[#2D2926]">
                  {user?.name || 'Utilisateur'}
                </span>
                <div className="w-10 h-10 rounded-full border-2 p-0.5" style={{ borderColor: COLORS.woodGold }}>
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={user?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=A66D3B&color=fff`}
                    alt="avatar"
                  />
                </div>
              </motion.div>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 overflow-hidden"
                  >
                    <button
                      onClick={() => { navigate('/dashboard/profile'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-3 text-sm flex items-center gap-2 hover:bg-[#A66D3B] hover:text-white transition-colors"
                    >
                      <AccountCircleIcon fontSize="small" /> Mon Profil
                    </button>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm flex items-center gap-2 text-[#d32f2f] hover:bg-[#A66D3B] hover:text-white transition-colors"
                    >
                      <LogoutIcon fontSize="small" /> Déconnexion
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* --- PAGE CONTENT --- */}
        <main className="p-4 md:p-8">
          <motion.div
            layout
            className="bg-white rounded-[32px] min-h-[calc(100vh-140px)] p-4 md:p-8 shadow-sm border border-black/5 overflow-hidden"
          >
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="devis" element={<Devis />} />
            </Routes>
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
}