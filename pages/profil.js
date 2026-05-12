import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const tipBilgileri = {
  1:{ad:'Reformcu',aciklama:'Sistematik, kurallara dayalı ve mükemmeliyetçi bir öğrenicisin. Adım adım ilerlemek ve hataları düzeltmek sana güven verir.',renk:'#185FA5',bg:'#E6F1FB',format:'Kontrol listesi ve adım adım rehber',stil:'Hata odaklı, sistematik',guc:'Detaylı analiz ve hata tespiti',dikkat:'Mükemmeliyetçilik bazen ilerlemeyi yavaşlatır'},
  2:{ad:'Yardımsever',aciklama:'İlişki ve anlam odaklı öğreniyorsun. Öğrendiklerinin gerçek hayata nasıl yansıdığını görmek seni motive eder.',renk:'#993556',bg:'#FBEAF0',format:'Hikaye anlatımı ve gerçek örnekler',stil:'Anlam odaklı, ilişki temelli',guc:'Empati ve bağlantı kurma',dikkat:'Başkalarına odaklanırken kendini ihmal etme'},
  3:{ad:'Başarı odaklı',aciklama:'Hızlı, verimli ve sonuç odaklı öğreniyorsun. Kısaltmalar, özetler ve sınav odaklı içerik sana en çok yarar.',renk:'#854F0B',bg:'#FAEEDA',format:'Flashcard ve hızlı özet',stil:'Verimli, sonuç odaklı',guc:'Hızlı öğrenme ve uygulama',dikkat:'Derinliği atlama riskine dikkat et'},
  4:{ad:'Bireyci',aciklama:'Derin anlam ve metafor arayan birisin. Felsefi bağlantılar ve özgün anlatım seni en çok etkiler.',renk:'#3B6D11',bg:'#EAF3DE',format:'Ses anlatımı ve metafor haritası',stil:'Derin anlam, metafor odaklı',guc:'Derin analiz ve özgün bağlantılar',dikkat:'Pratik uygulamayı unutma'},
  5:{ad:'Gözlemci',aciklama:'Analitik ve mekanizma odaklısın. Teknik detay, kaynak ve sistematik açıklama sana en uygun öğrenme biçimi.',renk:'#534AB7',bg:'#EEEDFE',format:'Mekanizma şeması ve kaynak listesi',stil:'Analitik, mekanizma odaklı',guc:'Derinlemesine araştırma',dikkat:'Bilgiyi uygulamaya dökmekte zorlanabilirsin'},
  6:{ad:'Sadık',aciklama:'Güvenilirlik ve doğrulama odaklısın. Adım adım rehber ve doğrulanmış bilgi sana güven verir.',renk:'#185FA5',bg:'#E6F1FB',format:'Adım adım rehber ve doğrulama listesi',stil:'Güven odaklı, sistematik',guc:'Güvenilir ve tutarlı çalışma',dikkat:'Aşırı şüphecilik ilerlemeyi engelleyebilir'},
  7:{ad:'Meraklı',aciklama:'Keşifçi ve bağlantı kuran birisin. İlginç sorular, beklenmedik bağlantılar ve merak uyandıran içerik seni motive eder. Kanat 6 etkisiyle güvenilir bilgiye de önem veriyorsun.',renk:'#0F6E56',bg:'#E1F5EE',format:'Merak kartları ve bağlantı haritası',stil:'Keşifçi, bağlantı odaklı',guc:'Hızlı bağlantı kurma ve geniş perspektif',dikkat:'Bir konuda derinleşmeden atlama'},
  8:{ad:'Meydan okuyan',aciklama:'Direkt ve güçlü bir öğrenme tarzın var. Neden öğrenmesi gerektiğine dair güçlü cevaplar ve otoriter bir ton sana hitap eder.',renk:'#712B13',bg:'#FAECE7',format:'Direkt özet ve güçlü anlatım',stil:'Direkt, güç odaklı',guc:'Kararlı ve güçlü uygulama',dikkat:'Başkalarının görüşlerine de yer aç'},
  9:{ad:'Barışçıl',aciklama:'Büyük resim ve denge odaklısın. Baskısız, akıcı ve sakin bir anlatım sana en çok yarar.',renk:'#5F5E5A',bg:'#F1EFE8',format:'Sade özet ve sesli anlatım',stil:'Bütünleştirici, sakin',guc:'Bütünü görme ve sentez yapma',dikkat:'Karar vermekte zorlanabilirsin'},
};

export default function Profil() {
  const router = useRouter();
  const [tipNo, setTipNo] = useState('7');
  const [kanat, setKanat] = useState('7w6');
  const [tipAd, setTipAd] = useState('Meraklı');
  const [duzenle, setDuzenle] = useState(false);

  useEffect(()=>{
    const tip = localStorage.getItem('tip');
    const k = localStorage.getItem('kanat');
    const ad = localStorage.getItem('tipAd');
    if(tip) setTipNo(tip);
    if(k) setKanat(k);
    if(ad) setTipAd(ad);
  }, []);

  const tip = tipBilgileri[tipNo] || tipBilgileri[7];

  const tipDegistir = (no) => {
    const yeniTip = tipBilgileri[no];
    setTipNo(String(no));
    setTipAd(yeniTip.ad);
    localStorage.setItem('tip', String(no));
    localStorage.setItem('tipAd', yeniTip.ad);
    setDuzenle(false);
  };

  return (
    <div style={{fontFamily:'sans-serif',background:'#fff',minHeight:'100vh'}}>

      {/* NAVİGASYON */}
      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',borderBottom:'0.5px solid #e5e7eb'}}>
        <div onClick={()=>router.push('/')} style={{display:'flex',alignItems:'center',gap:'8px',cursor:'pointer'}}>
          <div style={{width:'32px',height:'32px',borderRadius:'8px',background:'#378ADD',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'#E6F1FB',fontSize:'16px',fontWeight:'500'}}>M</span>
          </div>
          <span style={{fontSize:'16px',fontWeight:'500',color:'#111'}}>MindType</span>
        </div>
        <div style={{fontSize:'13px',color:'#6b7280'}}>Profil kartın hazır</div>
      </nav>

      <div style={{maxWidth:'600px',margin:'0 auto',padding:'48px 32px'}}>

        {/* BAŞLIK */}
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{fontSize:'48px',marginBottom:'12px'}}>🎯</div>
          <h1 style={{fontSize:'24px',fontWeight:'500',color:'#111',marginBottom:'8px'}}>
            Öğrenme profilin hazır!
          </h1>
          <p style={{fontSize:'14px',color:'#6b7280',lineHeight:'1.7'}}>
            Cevaplarına göre belirlenen öğrenme profilin aşağıda. İstersen değiştirebilirsin.
          </p>
        </div>

        {/* PROFİL KARTI */}
        <div style={{background:tip.bg,borderRadius:'16px',padding:'28px',marginBottom:'20px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'20px'}}>
            <div style={{width:'56px',height:'56px',borderRadius:'50%',background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',flexShrink:0}}>
              🧠
            </div>
            <div>
              <div style={{fontSize:'13px',fontWeight:'500',color:tip.renk,marginBottom:'2px'}}>Öğrenme tipin</div>
              <div style={{fontSize:'22px',fontWeight:'500',color:'#111'}}>Tip {tipNo} · {tip.ad}</div>
              <div style={{fontSize:'12px',color:'#6b7280'}}>Kanat {kanat}</div>
            </div>
          </div>

          <p style={{fontSize:'14px',color:'#374151',lineHeight:'1.7',marginBottom:'20px'}}>
            {tip.aciklama}
          </p>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
            {[
              {etiket:'Öğrenme stili',deger:tip.stil},
              {etiket:'Önerilen format',deger:tip.format},
              {etiket:'Güçlü yön',deger:tip.guc},
              {etiket:'Dikkat edilmesi gereken',deger:tip.dikkat},
            ].map((b,i)=>(
              <div key={i} style={{background:'#fff',borderRadius:'8px',padding:'12px'}}>
                <div style={{fontSize:'10px',fontWeight:'500',color:'#9ca3af',marginBottom:'4px',textTransform:'uppercase',letterSpacing:'.05em'}}>{b.etiket}</div>
                <div style={{fontSize:'12px',color:'#111',lineHeight:'1.5'}}>{b.deger}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TİP DEĞİŞTİR */}
        <div style={{background:'#fff',border:'0.5px solid #e5e7eb',borderRadius:'12px',padding:'16px',marginBottom:'24px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px'}}>
            <div style={{fontSize:'13px',fontWeight:'500',color:'#111'}}>Bu profil seni yansıtıyor mu?</div>
            <button onClick={()=>setDuzenle(!duzenle)}
              style={{fontSize:'12px',color:'#185FA5',background:'transparent',border:'none',cursor:'pointer'}}>
              {duzenle ? 'Kapat' : 'Değiştir'}
            </button>
          </div>
          <p style={{fontSize:'12px',color:'#6b7280',lineHeight:'1.6',marginBottom: duzenle?'14px':'0'}}>
            Yanlış hissettiriyorsa aşağıdan manuel seçim yapabilirsin.
          </p>

          {duzenle && (
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px',marginTop:'12px'}}>
              {Object.entries(tipBilgileri).map(([no,t])=>(
                <button key={no} onClick={()=>tipDegistir(Number(no))}
                  style={{padding:'10px 8px',borderRadius:'8px',border:String(no)===String(tipNo)?'2px solid #378ADD':'0.5px solid #e5e7eb',background:String(no)===String(tipNo)?'#E6F1FB':'#fff',cursor:'pointer',textAlign:'center'}}>
                  <div style={{fontSize:'12px',fontWeight:'500',color:String(no)===String(tipNo)?'#185FA5':'#111',marginBottom:'2px'}}>Tip {no}</div>
                  <div style={{fontSize:'10px',color:'#6b7280'}}>{t.ad}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PANELE GEÇ */}
        <button onClick={()=>router.push('/panel')}
          style={{width:'100%',fontSize:'14px',fontWeight:'500',padding:'12px',borderRadius:'8px',background:'#378ADD',color:'#042C53',border:'none',cursor:'pointer',marginBottom:'12px'}}>
          Panele geç — not yüklemeye başla →
        </button>
        <p style={{textAlign:'center',fontSize:'12px',color:'#9ca3af'}}>
          Profilini daha sonra ayarlardan değiştirebilirsin
        </p>
      </div>
    </div>
  );
}