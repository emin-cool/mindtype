import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).json({hata:'Method not allowed'});

  const { cevaplar, sorular } = req.body;

  const soruCevaplar = sorular.map((s,i) => `Soru: ${s.soru}\nCevap: ${cevaplar[i] || 'Cevaplanmadı'}`).join('\n\n');

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 800,
      system: `Sen bir öğrenme stili uzmanısın. Kullanıcının test cevaplarını analiz edip öğrenme profilini çıkaracaksın.

Sadece JSON formatında cevap ver, başka hiçbir şey yazma:
{
  "sunumStili": "hikaye|liste|soruCevap|ozet",
  "hiz": "hizliOzet|derinAnaliz",
  "baglamTercihi": "somutOrnek|soyutKavram|gercekHayat",
  "ton": "sohbet|resmi|merakli",
  "ozet": "Bu kişi nasıl öğrenir - 2 cümle",
  "formatOneri": "Bu kişi için en iyi not formatı - 1 cümle",
  "gucluYon": "Öğrenmedeki en güçlü yönü",
  "dikkat": "Dikkat edilmesi gereken öğrenme engeli"
}`,
      messages: [{
        role: 'user',
        content: `Bu kişinin öğrenme stilini analiz et:\n\n${soruCevaplar}`
      }]
    });

    const jsonMetin = response.content[0].text.trim();
    const profil = JSON.parse(jsonMetin);
    res.status(200).json({profil});

  } catch(hata) {
    console.error(hata);
    res.status(500).json({hata: hata.message});
  }
}