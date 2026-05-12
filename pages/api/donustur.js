import Anthropic from '@anthropic-ai/sdk';

const tipAyarlari = {
  1:{ad:'Reformcu',tercih:'Sistematik, kurallara dayalı, hata odaklı.'},
  2:{ad:'Yardımsever',tercih:'İlişki ve anlam odaklı. Gerçek hayat bağlantısı şart.'},
  3:{ad:'Başarı odaklı',tercih:'Hızlı, verimli, sınav odaklı.'},
  4:{ad:'Bireyci',tercih:'Derin anlam ve metafor arar.'},
  5:{ad:'Gözlemci',tercih:'Mekanizma ve veri odaklı. Teknik detay ister.'},
  6:{ad:'Sadık',tercih:'Güvenilirlik ve doğrulama ister.'},
  7:{ad:'Meraklı',tercih:'Bağlantı kurar, keşfeder. Merak uyandıran içerik motive eder.'},
  8:{ad:'Meydan okuyan',tercih:'Direkt, güçlü ton.'},
  9:{ad:'Barışçıl',tercih:'Büyük resim, sakin anlatım.'},
};

export default async function handler(req, res) {
  if(req.method !== 'POST'){
    return res.status(405).json({hata:'Method not allowed'});
  }

  const { hamNot, tipNo, kanat } = req.body;

  if(!hamNot || !tipNo){
    return res.status(400).json({hata:'Eksik parametre'});
  }

  const tip = tipAyarlari[tipNo] || tipAyarlari[7];

  try {
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1000,
      system: `Sen bir eğitim içeriği uzmanısın. Öğrencinin kişilik tipine göre ders notlarını yeniden yaz.

Öğrenci profili:
- Tip: ${tipNo} - ${tip.ad}
- Kanat: ${kanat}
- Tercih: ${tip.tercih}

Kurallar:
- Türkçe yaz
- 3 bölüm: Giriş, Temel Kavramlar, Uygulama
- Her bölümün başında başlık kullan
- 300-400 kelime`,

      messages: [{
        role: 'user',
        content: `Bu notu Tip ${tipNo} için yeniden yaz:\n\n${hamNot}`
      }]
    });

    return res.status(200).json({
      uyarlanmisNot: response.content[0].text
    });

  } catch(hata) {
    console.error('API hatası:', hata);
    return res.status(500).json({
      hata: hata.message || 'Bir hata oluştu'
    });
  }
}