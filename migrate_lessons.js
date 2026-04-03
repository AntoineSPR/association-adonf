const axios = require('axios');
const fs = require('fs');
(async () => {
  try {
    const httpsAgent = new require('https').Agent({ rejectUnauthorized: false });
    const loginRes = await axios.post('https://localhost:7168/user/login', {
      email: 'antoine.simper+admin@gmail.com',
      password: 'Password123!'
    }, { httpsAgent });
    const token = loginRes.data.token;
    
    const lessonsRaw = [
      {
        title: 'Guitare',
        slug: 'guitare',
        imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80',
        description: 'Apprenez la guitare électrique, folk ou classique, du débutant au confirmé.',
        sections: [ { title: 'Programme', description: 'Étude des accords, rythmiques, arpèges, improvisation. Répertoire varié (Rock, Pop, Blues, Variété...).' } ]
      },
      {
        title: 'Batterie',
        slug: 'batterie',
        imageUrl: 'https://picsum.photos/1000',
        description: 'Découvrez le rythme et la percussion avec nos cours de batterie adaptés à tout âge.',
        sections: [
          { title: 'PROGRAMME DES COURS', description: '- Pour les plus jeunes et en vue d’une inscription... \n- Apprentissage ludique...\n- Cours de quarante cinq minutes pour les 5 à 7 ans.' },
          { title: 'LES HORAIRES', description: '- Lundi : 17h15 et 18h00\n\nL\'ouverture d\\'un créneau horaire dépend...' }
        ]
      },
      { title: 'Basse', slug: 'basse', imageUrl: 'https://picsum.photos/1000?blur' },
      { title: 'Chant', slug: 'chant', imageUrl: 'https://picsum.photos/1000?greyscale' },
      { title: 'Clavier', slug: 'clavier', imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80' },
      { title: 'Jeu en groupe', slug: 'jeu-en-groupe', imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80' },
      { title: 'Danse Hip Hop', slug: 'danse-hip-hop', imageUrl: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80' },
      { title: 'Éveil Musical', slug: 'eveil-musical', imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80' },
      { title: 'Petits Rockers', slug: 'petits-rockers', imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80' }
    ];
    const items = lessonsRaw.map((l, i) => ({ id: i.toString(), ...l }));
    await axios.put('https://localhost:7168/api/PageContent/lessons', { content: { items: items } }, { httpsAgent, headers: { Authorization: 'Bearer ' + token } });
    console.log('Successfully saved lessons to DB');
  } catch (err) {
    console.error('Failed to migrate', err.response?.data || err.message);
  }
})();
