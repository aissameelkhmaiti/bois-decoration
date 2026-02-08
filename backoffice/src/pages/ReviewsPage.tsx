 
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

// Données fictives
const reviews = [
  { id: 1, author: 'Karim Bennani', rating: 5, comment: 'Un savoir-faire exceptionnel pour ma table en chêne.', status: 'Approuvé', date: '05/02/2026' },
  { id: 2, author: 'Julie Morel', rating: 3, comment: 'Beau produit mais emballage un peu fragile.', status: 'En attente', date: '02/02/2026' },
  { id: 3, author: 'Yassine Atlas', rating: 5, comment: 'L’Atelier a su transformer mon idée en réalité. Merci !', status: 'Approuvé', date: '20/01/2026' },
];

function ReviewsPage() {
  return (
    <div className="p-6">
      {/* --- HEADER --- */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-[#A66D3B]/10 rounded-lg">
          <RateReviewIcon className="text-[#A66D3B]" sx={{ fontSize: 32 }} />
        </div>
        <h1 className="text-3xl font-bold text-[#A66D3B]">
          Témoignages Clients
        </h1>
      </div>

      {/* --- BARRE D'OUTILS --- */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-[380px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="text-[#8d6e63]" fontSize="small" />
          </span>
          <input
            type="text"
            placeholder="Rechercher un auteur ou un mot-clé..."
            className="w-full bg-white border border-[#d7ccc8] text-sm rounded-xl focus:ring-2 focus:ring-[#A66D3B]/20 focus:border-[#A66D3B] block pl-10 p-3 outline-none transition-all"
          />
        </div>

        
      </div>

      {/* --- TABLEAU DES AVIS --- */}
      <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#fdfaf9] border-b border-gray-100">
              <tr>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase tracking-wider">Client</th>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase tracking-wider text-center">Note</th>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase tracking-wider">Message</th>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase tracking-wider text-center">Statut</th>
                <th className="px-6 py-5 text-[#A66D3B] font-bold text-sm uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reviews.map((rev) => {
                const isApproved = rev.status === 'Approuvé';
                return (
                  <tr key={rev.id} className="hover:bg-[#fdfaf9]/50 transition-colors group">
                    {/* Colonne Client */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#efebe9] flex items-center justify-center text-[#A66D3B] font-bold text-sm">
                          {rev.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm leading-none">{rev.author}</p>
                          <span className="text-[11px] text-gray-400 font-medium">{rev.date}</span>
                        </div>
                      </div>
                    </td>

                    {/* Colonne Note */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            sx={{ fontSize: 16 }} 
                            className={i < rev.rating ? 'text-[#A66D3B]' : 'text-gray-200'} 
                          />
                        ))}
                      </div>
                    </td>

                    {/* Colonne Message */}
                    <td className="px-6 py-4">
                      <p className="text-gray-600 text-sm leading-relaxed max-w-[250px] line-clamp-2">
                        {rev.comment}
                      </p>
                    </td>

                    {/* Colonne Statut */}
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        isApproved 
                          ? 'bg-green-50 text-green-700 border border-green-100' 
                          : 'bg-orange-50 text-orange-700 border border-orange-100'
                      }`}>
                        {isApproved && <CheckCircleIcon sx={{ fontSize: 14 }} />}
                        {rev.status}
                      </span>
                    </td>

                    {/* Colonne Actions */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-1">
                        <button className="p-2 text-[#8d6e63] hover:text-[#A66D3B] hover:bg-white rounded-full transition-all">
                          <EditIcon fontSize="small" />
                        </button>
                        <button className="p-2 text-[#d32f2f] hover:text-[#b71c1c] hover:bg-red-50 rounded-full transition-all">
                          <DeleteIcon fontSize="small" />
                        </button>
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

export default ReviewsPage;