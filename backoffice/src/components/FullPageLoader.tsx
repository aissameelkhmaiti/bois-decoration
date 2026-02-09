import { Box, LinearProgress, Typography, keyframes } from '@mui/material';

// Animation de flottement pour le logo
const float = keyframes`
  0% { transform: translateY(0px); opacity: 0.8; }
  50% { transform: translateY(-10px); opacity: 1; }
  100% { transform: translateY(0px); opacity: 0.8; }
`;

const AtelierLoader = () => {
  const brandColor = '#8d5d33'; // Le brun de ton bouton "Nouvelle Catégorie"

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#fdfbf9', // Couleur de fond de ton dashboard
      }}
    >
      {/* Ton Nom de Marque avec la police cursive de ton logo */}
      <Typography
        variant="h3"
        sx={{
          color: brandColor,
          fontFamily: "'Playfair Display', serif", // Ou la police de "L'Atelier"
          fontWeight: 'bold',
          mb: 4,
          animation: `${float} 2s ease-in-out infinite`,
          fontStyle: 'italic'
        }}
      >
        L'Atelier
      </Typography>

      {/* Barre de progression fine et élégante */}
      <Box sx={{ width: '200px', borderRadius: 10, overflow: 'hidden' }}>
        <LinearProgress 
          sx={{
            backgroundColor: 'rgba(141, 93, 51, 0.1)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: brandColor,
            }
          }} 
        />
      </Box>

      <Typography 
        sx={{ 
          mt: 2, 
          color: brandColor, 
          fontSize: '0.75rem', 
          letterSpacing: '2px', 
          opacity: 0.7 
        }}
      >
        PRÉPARATION DE VOTRE ESPACE...
      </Typography>
    </Box>
  );
};

export default AtelierLoader;