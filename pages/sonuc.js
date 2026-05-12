import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const tipMetinleri = {
  1:{giris:'Bu konu belirli kurallara ve mantıksal bir sıraya dayanır. Her adımın doğru yapılması gerekir.',renk:'#185FA5',bg:'#E6F1FB'},
  2:{giris:'Bu konu aslında hepimizin hayatına dokunuyor. Öğrendiklerini gerçek insanlara nasıl uygulayabileceğini düşün.',renk:'#993556',bg:'#FBEAF0'},
  3:{giris:'Hızlı özet: Bu konuda bilmen gereken en önemli 3 şey var. Hepsini 5 dakikada öğrenebilirsin.',renk:'#854F0B',bg:'#FAEEDA'},
  4:{giris:'Her konu aslında daha derin bir soruyu taşır. Bu konuya bakarken sadece bilgiyi değil, arkasındaki anlamı da gör.',renk:'#3B6D11',bg:'#EAF3DE'},
  5:{giris:'Bu konunun mekanizmasını anlamak için önce temel bileşenlere bakalım. Her parça bir bütünün parçasıdır.',renk:'#534AB7',bg:'#EEEDFE'},
  6:{giris:'Bu bilgi güvenilir kaynaklara dayanıyor. Adım adım ilerleyerek sağlam bir temel oluşturacağız.',renk:'#185FA5',bg:'#E6F1FB'},
  7:{giris:'Dur bir saniye — bu konu düşündüğünden çok daha ilginç bağlantılar taşıyor. Hazır mısın?',renk:'#0F6E56',bg:'#E1F5EE'},
  8:{giris:'Direkt söyleyelim: Bu konuyu öğrenmek sana güç verir. İşte bilmen gerekenler.',renk:'#712B13',bg:'#FAECE7'},
  9:{giris:'Her şey birbirine bağlı. Bu konuyu büyük resmin bir parçası olarak düşün, kendiliğinden yerine oturur.',renk:'#5F5E5A',bg:'#F1EFE8'},
};

const slaylar = [
  {baslik:'Giriş', icerik:'Konuya genel bakış ve temel kavramlar.'},
  {baslik:'Temel kavramlar', icerik:'Ana bileşenler ve aralarındaki ilişkiler.'},
  {baslik:'Nasıl çalışır?', icerik:'Süreç ve mekanizma detayları.'},
  {baslik:'Örnekler', icerik:'Gerçek hayattan uygulama örnekleri.'},
  {baslik:'Özet', icerik:'Öğrendiklerinin kısa özeti ve hatırlatıcı noktalar.'},
];

export default function Sonuc() {
  const router = useRouter();
  const [aktifSekme, setAktifSekme] = useState('metin');
  const [aktifSlayt, setAktifSlayt] = useState(0);
  const [caliyor, setCaliyor] = useState(false);
  const [geriBildirim, setGeriBildirim] = useState(false);
  const [geriMetin, setGeriMetin] = useState('');
  const [geriGonderildi, setGeriGonderildi] = useState(false);
  const [tipNo, setTipNo] = useState('7');
  const [tipAd, setTipAd] = useState('Meraklı');
  const [kanat, setKanat] = useState('7w6');
  const [hamNot, setHamNot] = useState('');

  useEffect(()=>{
    const tip = localStorage.getItem('tip');
    const ad = localStorage.getItem('tipAd');
    const k = localStorage.getItem('kanat');
    const not = localStorage.getItem('hamNot');
    if(tip) setTipNo(tip);
    if(ad) setTipAd(ad);
    if(k) setKanat(k);
    if(not) setHamNot(not);
  },[]);

  const tipInfo = tipMetinleri[tipNo] || tipMetinleri[7];

  const uyarlanmisMetin = hamNot
    ? `${tipInfo.giris}\n\n${hamNot}`
    : `${tipInfo.giris}\n\nBu alan panelden yüklediğin notla dolacak. Şu an örnek içerik gösteriliyor.\n\nİçerik tipine göre yeniden düzenlenecek, her bölüm mizacına uygun şekilde sunulacak.`;

  const geriGonder = () => {
    if(geriMetin.trim()){
      setGeriGonderildi(true);
    } else {
      setGeriBildirim(true);
    }
  };

  return (
    <div style={{fontFamily:'sans-serif',background:'#f9fafb',minHeight:'100vh'}}>

      {/* NAVİGASYON */}
      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',borderBottom:'0.5px solid #e5e7eb',background:'#fff'}}>
        <div onClick={()=>router.push('/')} style={{display:'flex',alignItems:'center',gap:'8px',cursor:'pointer'}}>
          <div style={{width:'32px',height:'32px',borderRadius:'8px',background:'#378ADD',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'#E6F1FB',fontSize:'16px',fontWeight:'500'}}>M</span>
          </div>
          <span style={{fontSize:'16px',fontWeight:'500',color:'#111'}}>MindType</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <button onClick={()=>router.push('/panel')} style={{fontSize:'13px',color:'#6b7280',padding:'6px 12px',borderRadius:'8px',border:'none',background:'transparent',cursor:'pointer'}}>
            ← Panele dön
          </button>
          <button style={{fontSize:'13px',fontWeight:'500',padding:'7px 16px',borderRadius:'8px',background:'#378ADD',color:'#042C53',border:'none',cursor:'pointer'}}>
            İndir
          </button>
        </div>
      </nav>

      <div style={{maxWidth:'760px',margin:'0 auto',padding:'32px'}}>

        {/* BAŞLIK */}
        <div style={{marginBottom:'24px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
            <div style={{fontSize:'11px',fontWeight:'500',padding:'3px 10px',borderRadius:'10px',background:tipInfo.bg,color:tipInfo.renk}}>
              Tip {tipNo} · {tipAd} versiyonu
            </div>
            <div style={{fontSize:'11px',color:'#9ca3af'}}>Kanat {kanat}</div>
          </div>
          <h1 style={{fontSize:'22px',fontWeight:'500',color:'#111',marginBottom:'4px'}}>
            {hamNot ? 'Notun dönüştürüldü' : 'Örnek içerik'}
          </h1>
          <p style={{fontSize:'13px',color:'#6b7280'}}>
            Mizacına göre uyarlandı · Bugün
          </p>
        </div>

        {/* SEKMELER */}
        <div style={{display:'flex',gap:'4px',marginBottom:'20px',background:'#fff',padding:'4px',borderRadius:'10px',border:'0.5px solid #e5e7eb',width:'fit-content'}}>
          {[
            {id:'metin',ikon:'📝',label:'Metin'},
            {id:'ses',ikon:'🎧',label:'Ses'},
            {id:'slayt',ikon:'📊',label:'Slayt'},
          ].map(s=>(
            <button key={s.id} onClick={()=>setAktifSekme(s.id)}
              style={{display:'flex',alignItems:'center',gap:'6px',padding:'8px 16px',borderRadius:'8px',border:'none',background:aktifSekme===s.id?'#378ADD':'transparent',color:aktifSekme===s.id?'#042C53':'#6b7280',cursor:'pointer',fontSize:'13px',fontWeight:aktifSekme===s.id?'500':'400'}}>
              {s.ikon} {s.label}
            </button>
          ))}
        </div>

        {/* METİN SEKMESİ */}
        {aktifSekme==='metin' && (
          <div style={{background:'#fff',borderRadius:'12px',border:'0.5px solid #e5e7eb',padding:'28px',marginBottom:'16px'}}>
            <div style={{background:tipInfo.bg,borderRadius:'8px',padding:'12px 16px',marginBottom:'20px'}}>
              <div style={{fontSize:'11px',fontWeight:'500',color:tipInfo.renk,marginBottom:'4px'}}>
                Tip {tipNo} · {tipAd} için özelleştirildi
              </div>
              <div style={{fontSize:'13px',color:'#374151',fontStyle:'italic'}}>
                "{tipInfo.giris}"
              </div>
            </div>
            <div style={{fontSize:'14px',color:'#374151',lineHeight:'1.9',whiteSpace:'pre-line'}}>
              {hamNot || 'Panelden bir not yükleyince burada görünecek.'}
            </div>
            <div style={{marginTop:'20px',paddingTop:'16px',borderTop:'0.5px solid #e5e7eb',display:'flex',gap:'8px'}}>
              <button
                onClick={()=>{navigator.clipboard.writeText(uyarlanmisMetin)}}
                style={{fontSize:'12px',padding:'6px 14px',borderRadius:'8px',border:'0.5px solid #d1d5db',background:'transparent',cursor:'pointer',color:'#111'}}>
                📋 Kopyala
              </button>
              <button style={{fontSize:'12px',padding:'6px 14px',borderRadius:'8px',border:'0.5px solid #d1d5db',background:'transparent',cursor:'pointer',color:'#111'}}>
                ⬇️ İndir
              </button>
              <button style={{fontSize:'12px',padding:'6px 14px',borderRadius:'8px',border:'0.5px solid #378ADD',background:'#E6F1FB',cursor:'pointer',color:'#185FA5'}}>
                🔄 Yeniden üret
              </button>
            </div>
          </div>
        )}

        {/* SES SEKMESİ */}
        {aktifSekme==='ses' && (
          <div style={{background:'#fff',borderRadius:'12px',border:'0.5px solid #e5e7eb',padding:'28px',marginBottom:'16px'}}>
            <div style={{textAlign:'center',marginBottom:'24px'}}>
              <div style={{fontSize:'48px',marginBottom:'12px'}}>🎧</div>
              <div style={{fontSize:'14px',fontWeight:'500',color:'#111',marginBottom:'4px'}}>
                Tip {tipNo} · {tipAd} Ses Anlatımı
              </div>
              <div style={{fontSize:'12px',color:'#6b7280'}}>
                API bağlandığında ElevenLabs ile otomatik üretilecek
              </div>
            </div>

            <div style={{background:'#f9fafb',borderRadius:'10px',padding:'16px',marginBottom:'16px'}}>
              <div style={{height:'4px',background:'#e5e7eb',borderRadius:'2px',marginBottom:'12px',overflow:'hidden',cursor:'pointer'}}>
                <div style={{height:'100%',width:'35%',background:'#378ADD',borderRadius:'2px'}}></div>
              </div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <span style={{fontSize:'11px',color:'#9ca3af'}}>1:18</span>
                <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                  <button style={{background:'none',border:'none',fontSize:'18px',cursor:'pointer'}}>⏮</button>
                  <button onClick={()=>setCaliyor(!caliyor)}
                    style={{width:'40px',height:'40px',borderRadius:'50%',background:'#378ADD',border:'none',cursor:'pointer',fontSize:'16px',display:'flex',alignItems:'center',justifyContent:'center',color:'#042C53'}}>
                    {caliyor?'⏸':'▶'}
                  </button>
                  <button style={{background:'none',border:'none',fontSize:'18px',cursor:'pointer'}}>⏭</button>
                </div>
                <span style={{fontSize:'11px',color:'#9ca3af'}}>3:42</span>
              </div>
            </div>

            <div style={{background:'#E6F1FB',borderRadius:'8px',padding:'12px',textAlign:'center',marginBottom:'16px'}}>
              <div style={{fontSize:'12px',color:'#185FA5'}}>
                💡 ElevenLabs API bağlandığında ses otomatik üretilecek. Şu an demo modunda.
              </div>
            </div>

            <div style={{display:'flex',gap:'8px',justifyContent:'center'}}>
              <button style={{fontSize:'12px',padding:'6px 14px',borderRadius:'8px',border:'0.5px solid #d1d5db',background:'transparent',cursor:'pointer',color:'#111'}}>
                ⬇️ İndir MP3
              </button>
              <button style={{fontSize:'12px',padding:'6px 14px',borderRadius:'8px',border:'0.5px solid #378ADD',background:'#E6F1FB',cursor:'pointer',color:'#185FA5'}}>
                🔄 Yeniden üret
              </button>
            </div>
          </div>
        )}

        {/* SLAYT SEKMESİ */}
        {aktifSekme==='slayt' && (
          <div style={{background:'#fff',borderRadius:'12px',border:'0.5px solid #e5e7eb',padding:'28px',marginBottom:'16px'}}>
            <div style={{fontSize:'12px',color:'#9ca3af',marginBottom:'16px',textAlign:'center'}}>
              {aktifSlayt+1} / {slaylar.length}
            </div>
            <div style={{background:tipInfo.bg,borderRadius:'12px',padding:'32px',textAlign:'center',marginBottom:'16px',minHeight:'160px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              <h2 style={{fontSize:'20px',fontWeight:'500',color:tipInfo.renk,marginBottom:'12px'}}>
                {slaylar[aktifSlayt].baslik}
              </h2>
              <p style={{fontSize:'14px',color:'#374151',lineHeight:'1.7',maxWidth:'400px'}}>
                {slaylar[aktifSlayt].icerik}
              </p>
            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <button onClick={()=>setAktifSlayt(Math.max(0,aktifSlayt-1))}
                disabled={aktifSlayt===0}
                style={{fontSize:'13px',padding:'8px 16px',borderRadius:'8px',border:'0.5px solid #d1d5db',background:'transparent',cursor:aktifSlayt===0?'not-allowed':'pointer',color:aktifSlayt===0?'#d1d5db':'#111'}}>
                ← Önceki
              </button>
              <div style={{display:'flex',gap:'6px'}}>
                {slaylar.map((_,i)=>(
                  <div key={i} onClick={()=>setAktifSlayt(i)}
                    style={{width:'8px',height:'8px',borderRadius:'50%',background:i===aktifSlayt?'#378ADD':'#d1d5db',cursor:'pointer'}}>
                  </div>
                ))}
              </div>
              <button onClick={()=>setAktifSlayt(Math.min(slaylar.length-1,aktifSlayt+1))}
                disabled={aktifSlayt===slaylar.length-1}
                style={{fontSize:'13px',padding:'8px 16px',borderRadius:'8px',border:'0.5px solid #d1d5db',background:'transparent',cursor:aktifSlayt===slaylar.length-1?'not-allowed':'pointer',color:aktifSlayt===slaylar.length-1?'#d1d5db':'#111'}}>
                Sonraki →
              </button>
            </div>
          </div>
        )}

        {/* GERİ BİLDİRİM */}
        {!geriGonderildi ? (
          <div style={{background:'#fff',borderRadius:'12px',border:'0.5px solid #e5e7eb',padding:'16px 20px'}}>
            {!geriBildirim ? (
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div>
                  <div style={{fontSize:'13px',fontWeight:'500',color:'#111',marginBottom:'2px'}}>Bu içerik işine yaradı mı?</div>
                  <div style={{fontSize:'12px',color:'#6b7280'}}>Geri bildiriminle sistem seni daha iyi tanır.</div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  {['👍','😐','👎'].map(e=>(
                    <button key={e} onClick={()=>setGeriBildirim(true)}
                      style={{fontSize:'20px',padding:'6px 10px',borderRadius:'8px',border:'0.5px solid #e5e7eb',background:'transparent',cursor:'pointer'}}>
                      {e}
                    </button>
                  ))}
                  <button onClick={()=>setGeriGonderildi(true)}
                    style={{fontSize:'12px',color:'#9ca3af',background:'transparent',border:'none',cursor:'pointer',marginLeft:'4px'}}>
                    Atla
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{fontSize:'13px',fontWeight:'500',color:'#27500A',marginBottom:'8px'}}>
                  Teşekkürler! İstersen detay ekle:
                </div>
                <textarea value={geriMetin} onChange={e=>setGeriMetin(e.target.value)}
                  placeholder="Ne eksikti? Neyi beğendin? (opsiyonel)"
                  rows={2}
                  style={{width:'100%',padding:'8px 12px',borderRadius:'8px',border:'0.5px solid #d1d5db',fontSize:'13px',color:'#111',outline:'none',resize:'none',boxSizing:'border-box',fontFamily:'sans-serif',marginBottom:'8px'}}
                />
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <button onClick={()=>setGeriGonderildi(true)}
                    style={{fontSize:'12px',color:'#9ca3af',background:'transparent',border:'none',cursor:'pointer'}}>
                    Atla
                  </button>
                  <button onClick={geriGonder}
                    style={{fontSize:'12px',padding:'6px 14px',borderRadius:'8px',background:'#3B6D11',color:'#fff',border:'none',cursor:'pointer'}}>
                    Gönder
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{background:'#EAF3DE',border:'0.5px solid #97C459',borderRadius:'12px',padding:'14px 20px',display:'flex',alignItems:'center',gap:'10px'}}>
            <span style={{fontSize:'16px'}}>✓</span>
            <div style={{fontSize:'13px',color:'#27500A'}}>Geri bildirim alındı. Sistem seni daha iyi tanıyacak.</div>
          </div>
        )}
      </div>
    </div>
  );
}