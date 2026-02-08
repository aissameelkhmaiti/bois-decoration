 
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

const messages = [
  { id: 1, sender: 'Jean Martin', subject: 'Demande de devis', date: '12/05/2024', status: 'Nouveau' },
  { id: 2, sender: 'Sophie Bernard', subject: 'Question sur la collection', date: '10/05/2024', status: 'Lu' },
  { id: 3, sender: 'Lucas Petit', subject: 'Partenariat pro', date: '08/05/2024', status: 'Lu' },
];

function ContactPage() {
  return (
    <div className="p-6">
      {/* --- HEADER --- */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-[#A66D3B]/10 rounded-lg">
          <EmailIcon className="text-[#A66D3B]" sx={{ fontSize: 32 }} />
        </div>
        <h1 className="text-3xl font-bold text-[#A66D3B]">
          Messages de Contact
        </h1>
      </div>

      {/* --- BARRE DE RECHERCHE --- */}
      <div className="mb-8">
        <div className="relative w-full max-w-[400px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="text-[#8d6e63]" fontSize="small" />
          </span>
          <input
            type="text"
            placeholder="Rechercher un message ou un expéditeur..."
            className="w-full bg-white border border-[#d7ccc8] text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-[#A66D3B]/20 focus:border-[#A66D3B] block pl-10 p-2.5 outline-none transition-all"
          />
        </div>
      </div>

      {/* --- TABLEAU DES MESSAGES --- */}
      <div className="bg-white rounded-xl shadow-md border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#fdfaf9] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[#A66D3B] font-bold text-sm uppercase tracking-wider">Expéditeur</th>
                <th className="px-6 py-4 text-[#A66D3B] font-bold text-sm uppercase tracking-wider">Sujet</th>
                <th className="px-6 py-4 text-[#A66D3B] font-bold text-sm uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[#A66D3B] font-bold text-sm uppercase tracking-wider text-center">Statut</th>
                <th className="px-6 py-4 text-[#A66D3B] font-bold text-sm uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {messages.map((msg) => {
                const isNew = msg.status === 'Nouveau';
                return (
                  <tr 
                    key={msg.id} 
                    className={`transition-colors duration-150 group ${isNew ? 'bg-[#fffef7] hover:bg-[#fff9e6]' : 'hover:bg-[#fdfaf9]'}`}
                  >
                    <td className={`px-6 py-4 ${isNew ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                      {msg.sender}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {msg.subject}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {msg.date}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center justify-center px-3 py-1 text-xs font-bold rounded-full border ${
                        isNew 
                          ? 'bg-[#A66D3B] text-white border-transparent' 
                          : 'bg-[#efebe9] text-[#A66D3B] border-gray-200'
                      }`}>
                        {msg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-1">
                        
                        {/* Tooltip Voir */}
                        <div className="group/tip relative flex items-center">
                          <button className="p-2 text-[#8d6e63] hover:text-[#A66D3B] hover:bg-white rounded-full transition-all">
                            <VisibilityIcon fontSize="small" />
                          </button>
                          <span className="absolute bottom-full mb-2 hidden group-hover/tip:block bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                            Voir le message
                          </span>
                        </div>

                        {/* Tooltip Lu */}
                        <div className="group/tip relative flex items-center">
                          <button className="p-2 text-[#4caf50] hover:text-[#2e7d32] hover:bg-white rounded-full transition-all">
                            <MarkEmailReadIcon fontSize="small" />
                          </button>
                          <span className="absolute bottom-full mb-2 hidden group-hover/tip:block bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                            Marquer comme lu
                          </span>
                        </div>

                        {/* Tooltip Supprimer */}
                        <div className="group/tip relative flex items-center">
                          <button className="p-2 text-[#d32f2f] hover:text-[#b71c1c] hover:bg-red-50 rounded-full transition-all">
                            <DeleteIcon fontSize="small" />
                          </button>
                          <span className="absolute bottom-full mb-2 hidden group-hover/tip:block bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                            Supprimer
                          </span>
                        </div>

                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;