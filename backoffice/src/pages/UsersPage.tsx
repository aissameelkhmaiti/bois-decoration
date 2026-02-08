import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchUsers, deleteUser } from '../redux/usersSlice';
import AddUserModal from '../components/users/AddUserModal';
import EditUserModal from '../components/users/EditUserModal';
import DeleteUserModal from '../components/users/DeleteModel'; // Correction du nom de l'import
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Person from '@mui/icons-material/Person';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.users);

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter((user: User) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      dispatch(deleteUser(selectedUser.id));
      setDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
      <td className="px-6 py-4"><div className="h-6 bg-gray-100 rounded-full w-16"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
      <td className="px-6 py-4"><div className="flex justify-center gap-2"><div className="h-8 w-8 bg-gray-100 rounded-full"></div><div className="h-8 w-8 bg-gray-100 rounded-full"></div></div></td>
    </tr>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <motion.div whileHover={{ rotate: 15 }} className="p-2 bg-[#A66D3B]/10 rounded-lg">
          <Person className="text-[#A66D3B]" sx={{ fontSize: 32 }} />
        </motion.div>
        <h1 className="text-3xl font-bold text-[#A66D3B]">Gestion des Utilisateurs</h1>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:w-[350px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="text-[#8d6e63]" fontSize="small" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un utilisateur..."
            className="w-full bg-white border border-[#d7ccc8] text-sm rounded-xl focus:ring-4 focus:ring-[#A66D3B]/10 focus:border-[#A66D3B] block pl-10 p-3 outline-none transition-all shadow-sm"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-[#A66D3B] border-2 border-[#A66D3B] hover:bg-transparent text-white hover:text-[#A66D3B] px-6 py-3 rounded-xl font-bold transition-all shadow-md"
        >
          <AddIcon fontSize="small" /> Ajouter un utilisateur
        </motion.button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#fdfaf9] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[#A66D3B] font-bold text-xs uppercase tracking-widest">Nom</th>
                <th className="px-6 py-4 text-[#A66D3B] font-bold text-xs uppercase tracking-widest">Rôle</th>
                <th className="px-6 py-4 text-[#A66D3B] font-bold text-xs uppercase tracking-widest">Email</th>
                <th className="px-6 py-4 text-[#A66D3B] font-bold text-xs uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredUsers.map((row: User, index: number) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.03 }}
                      className="hover:bg-[#fdfaf9]/50 transition-colors group"
                    >
                      <td className="px-6 py-4 text-gray-800 font-medium">
                        <div className="flex items-center gap-3">

                          {row.avatar ? (
                            <img
                              src={`http://localhost:8000/storage/${row.avatar}`}
                              alt={row.name}
                              className="w-8 h-8 rounded-full object-cover border border-gray-200"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[#A66D3B]/10 flex items-center justify-center text-[#A66D3B] text-xs font-bold uppercase">
                              {row.name.charAt(0)}
                            </div>
                          )}

                          <span>{row.name}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border ${row.role === 'Admin' ? 'bg-red-50 text-red-700 border-red-100' :
                            row.role === 'Editor' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                              'bg-gray-50 text-gray-700 border-gray-200'
                          }`}>
                          {row.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{row.email}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-1">
                          <button onClick={() => handleEdit(row)} className="p-2.5 text-[#8d6e63] hover:text-[#A66D3B] hover:bg-[#A66D3B]/10 rounded-xl transition-all">
                            <EditIcon fontSize="small" />
                          </button>
                          <button onClick={() => handleDeleteClick(row)} className="p-2.5 text-[#d32f2f] hover:text-white hover:bg-red-500 rounded-xl transition-all">
                            <DeleteIcon fontSize="small" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddUserModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <EditUserModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />

      <DeleteUserModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleConfirmDelete}
        userName={selectedUser?.name}
      />
    </motion.div>
  );
};

export default UsersPage;