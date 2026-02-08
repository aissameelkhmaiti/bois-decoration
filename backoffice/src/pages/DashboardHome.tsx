// import React from 'react';
// import AddIcon from '@mui/icons-material/Add';
// import SearchIcon from '@mui/icons-material/Search';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/ChatBubbleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Données fictives
const reviews = [
  { id: 1, author: 'Amine Slimani', rating: 5, comment: 'Excellent travail sur ma table basse, je recommande !', date: '01/02/2026' },
  { id: 2, author: 'Sarah K.', rating: 4, comment: 'Très belles finitions, livraison un peu longue.', date: '28/01/2026' },
  { id: 3, author: 'Marc Dubois', rating: 5, comment: 'La collection cuir est tout simplement sublime.', date: '15/01/2026' },
];

const stats = [
  { label: 'Total Avis', value: '128', icon: <MessageIcon />, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Note Moyenne', value: '4.8/5', icon: <StarIcon />, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Nouveaux Clients', value: '+12', icon: <PeopleIcon />, color: 'text-emerald-600', bg: 'bg-emerald-50' },

];

function DashboardHome() {
  return (
    <div className="p-6">
      {/* --- HEADER --- */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-[#A66D3B]/10 rounded-lg">
          <TrendingUpIcon className="text-[#A66D3B]" sx={{ fontSize: 32 }} />
        </div>
        <h1 className="text-3xl font-bold text-[#A66D3B]">Statistiques</h1>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl p-2 bg-[#4a3621]/10 rounded-lg text-[#A66D3B]`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- BARRE D'OUTILS --- */}


        

      {/* --- TABLEAU DES AVIS --- */}
      <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#fdfaf9] border-b border-gray-100">
              <tr>
                <th className="px-6 py-5 text-[#4a3621] font-bold text-sm uppercase tracking-wider">Client</th>
                <th className="px-6 py-5 text-[#4a3621] font-bold text-sm uppercase tracking-wider text-center">Note</th>
                <th className="px-6 py-5 text-[#4a3621] font-bold text-sm uppercase tracking-wider">Commentaire</th>
                <th className="px-6 py-5 text-[#4a3621] font-bold text-sm uppercase tracking-wider text-center">Date</th>
              
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-[#fdfaf9]/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#d7ccc8] flex items-center justify-center text-[#4a3621] font-bold text-sm">
                        {rev.author.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-800">{rev.author}</span>
                    </div>
                  </td>
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
                  <td className="px-6 py-4">
                    <p className="text-gray-600 italic text-sm line-clamp-2 max-w-[300px]">
                      "{rev.comment}"
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-500 text-sm italic font-medium">
                    {rev.date}
                  </td>
                   
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;