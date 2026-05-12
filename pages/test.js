import { useRouter } from 'next/router';
import { useState } from 'react';

const sorular = [
  {id:1, soru:'Bir işi yaparken kurallara ve doğruya uymak senin için ne kadar önemli? Neden?'},
  {id:2, soru:'Başkalarının sana ihtiyaç duyması seni nasıl hissettiriyor?'},
  {id:3, soru:'Başarı senin için ne anlam ifade ediyor? Hedeflerine nasıl ulaşırsın?'},
  {id:4, soru:'Kendini diğerlerinden farklı hissettiğin anlar oluyor mu? Bu seni nasıl etkiliyor?'},
  {id:5, soru:'Bir konuyu öğrenirken ne kadar derine inmek istersin?'},
  {id:6, soru:'Güvende hissetmek için ne yaparsın? Belirsizlik seni nasıl etkiler?'},
  {id:7, soru:'Yeni deneyimler ve macera senin için ne ifade ediyor?'},
  {id:8, soru:'Kontrolü elinde tutmak senin için ne kadar önemli?'},
  {id:9, soru:'Çatışmalardan kaçınır mısın? Huzur senin için ne anlama geliyor?'},
];

const tipler = [
  {no:1, ad:'Reformcu', kanat:'1w9'},
  {no:2, ad:'Yardımsever', kanat:'2w1'},
  {no:3, ad:'Başarı odaklı', kanat:'3w2'},
  {no:4, ad:'Bireyci', kanat:'4w3'},
  {no:5, ad:'Gözlemci', kanat:'5w4'},
  {no:6, ad:'Sadık', kanat:'6w5'},
  {no:7, ad:'Meraklı', kanat:'7w6'},
  {no:8, ad:'Meydan okuyan', kanat:'8w7'},
  {no:9, ad:'Barışçıl', kanat:'9w8'},
];

export default function Test() {
  const router = useRouter();
  const [aktifSoru, setAktifSoru] = useState(0);
  const [cevaplar, setCevaplar] = useState(Array(9).fill(''));
  const [tipSecimi, setTipSecimi] = useState(false);
  const [seciliTip, setSeciliTip] = useState(null);
  const [bitti, setBitti] = useState(false);

  const ileri = () => {
    if(aktifSoru < sorular.length - 1){
      setAktifSoru(aktifSoru + 1);
    } else {
      setTipSecimi(true);
    }
  };

  const geri = () => {
    if(aktifSoru > 0) setAktifSoru(aktifSoru - 1);
  };

  const cevapGuncelle = (deger) => {
    const yeni = [...cevaplar];
    yeni[aktifSoru] = deger;
    setCevaplar(yeni);
  };

  const tamamla = () => {
    if(!seciliTip) return;
    localStorage.setItem('tip', seciliTip.no);
    localStorage.setItem('kanat', seciliTip.kanat);
    localStorage.setItem('tipAd', seciliTip.ad);
    setBitti(true);
    setTimeout(()=> router.push('/profil'), 1500);
  };

  const ilerleme = ((aktifSoru + 1) / sorular.length) * 100;

  return (
    <div style={{fontFamily:'sans-serif',background:'#fff',minHeight:'100vh'}}>

      {/* NAVİGASYON */}
      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',borderBottom:'0.5px solid #e5e7eb',background:'#fff'}}>
        <div onClick={()=>router.push('/')} style={{display:'flex',alignItems:'center',gap:'8px',cursor:'pointer'}}>
          <div style={{width:'32px',height:'32px',borderRadius:'8px',background:'#378ADD',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'#E6F1FB',fontSize:'16px',fontWeight:'500'}}>M</span>
          </div>
          <span style={{fontSize:'16px',fontWeight:'500',color:'#111'}}>MindType</span>
        </div>
        <div style={{fontSize:'13px',color:'#6b7280'}}>
          {tipSecimi ? 'Tip seçimi' : `Soru ${aktifSoru + 1} / ${sorular.length}`}
        </div>
      </nav>

      {/* İLERLEME ÇUBUĞU */}
      <div style={{height:'3px',background:'#f3f4f6'}}>
        <div style={{height:'100%',width:tipSecimi?'100%':`${ilerleme}%`,background:'#378ADD',transition:'width .3s'}}></div>
      </div>

      {/* BİTTİ EKRANI */}
      {bitti && (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'60vh',gap:'16px'}}>
          <div style={{fontSize:'48px'}}>🎉</div>
          <h2 style={{fontSize:'22px',fontWeight:'500',color:'#111'}}>Profil oluşturuluyor!</h2>
          <p style={{fontSize:'14px',color:'#6b7280'}}>Yönlendiriliyorsun...</p>
        </div>
      )}

      {/* TİP SEÇİM EKRANI */}
      {tipSecimi && !bitti && (
        <div style={{maxWidth:'600px',margin:'0 auto',padding:'48px 32px'}}>
          <div style={{textAlign:'center',marginBottom:'32px'}}>
            <div style={{fontSize:'32px',marginBottom:'12px'}}>🎯</div>
            <h2 style={{fontSize:'22px',fontWeight:'500',color:'#111',marginBottom:'8px'}}>
              Cevapların alındı!
            </h2>
            <p style={{fontSize:'14px',color:'#6b7280',lineHeight:'1.7',maxWidth:'400px',margin:'0 auto'}}>
              Kendine en yakın hissettiren öğrenme tipini seç. API bağlandığında bu otomatik belirlenecek.
            </p>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'10px',marginBottom:'24px'}}>
            {tipler.map(t=>(
              <button key={t.no} onClick={()=>setSeciliTip(t)}
                style={{padding:'14px 10px',borderRadius:'10px',border:seciliTip?.no===t.no?'2px solid #378ADD':'0.5px solid #e5e7eb',background:seciliTip?.no===t.no?'#E6F1FB':'#fff',cursor:'pointer',textAlign:'center',transition:'all .15s'}}>
                <div style={{fontSize:'13px',fontWeight:'500',color:seciliTip?.no===t.no?'#185FA5':'#111',marginBottom:'2px'}}>Tip {t.no}</div>
                <div style={{fontSize:'11px',color:'#6b7280'}}>{t.ad}</div>
                <div style={{fontSize:'10px',color:'#9ca3af',marginTop:'2px'}}>{t.kanat}</div>
              </button>
            ))}
          </div>

          <button onClick={tamamla} disabled={!seciliTip}
            style={{width:'100%',fontSize:'14px',fontWeight:'500',padding:'12px',borderRadius:'8px',background:seciliTip?'#378ADD':'#d1d5db',color:seciliTip?'#042C53':'#9ca3af',border:'none',cursor:seciliTip?'pointer':'not-allowed',marginBottom:'12px'}}>
            {seciliTip ? `Tip ${seciliTip.no} · ${seciliTip.ad} olarak devam et →` : 'Bir tip seç'}
          </button>

          <p style={{textAlign:'center',fontSize:'12px',color:'#9ca3af'}}>
            API bağlandığında bu adım otomatik atlanacak
          </p>
        </div>
      )}

      {/* SORU EKRANI */}
      {!tipSecimi && !bitti && (
        <div style={{maxWidth:'600px',margin:'0 auto',padding:'48px 32px'}}>

          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'32px'}}>
            <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'#378ADD',color:'#042C53',fontSize:'16px',fontWeight:'500',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              {aktifSoru + 1}
            </div>
            <div style={{fontSize:'11px',fontWeight:'500',color:'#185FA5',letterSpacing:'.05em'}}>
              SORU {aktifSoru + 1} / {sorular.length}
            </div>
          </div>

          <h2 style={{fontSize:'20px',fontWeight:'500',color:'#111',lineHeight:'1.5',marginBottom:'24px'}}>
            {sorular[aktifSoru].soru}
          </h2>

          <textarea
            value={cevaplar[aktifSoru]}
            onChange={e=>cevapGuncelle(e.target.value)}
            placeholder="Kendi cümlerinle cevapla..."
            rows={6}
            style={{width:'100%',padding:'14px 16px',borderRadius:'12px',border:'0.5px solid #d1d5db',fontSize:'14px',color:'#111',outline:'none',resize:'none',lineHeight:'1.7',boxSizing:'border-box',fontFamily:'sans-serif',marginBottom:'8px'}}
          />

          <div style={{fontSize:'12px',color:'#9ca3af',marginBottom:'32px'}}>
            {cevaplar[aktifSoru].length} karakter
          </div>

          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <button onClick={geri} disabled={aktifSoru===0}
              style={{fontSize:'13px',fontWeight:'500',padding:'10px 20px',borderRadius:'8px',border:'0.5px solid #d1d5db',background:'transparent',color:aktifSoru===0?'#d1d5db':'#111',cursor:aktifSoru===0?'not-allowed':'pointer'}}>
              ← Geri
            </button>

            <div style={{display:'flex',gap:'6px'}}>
              {sorular.map((_,i)=>(
                <div key={i} onClick={()=>setAktifSoru(i)}
                  style={{width:'8px',height:'8px',borderRadius:'50%',background:i===aktifSoru?'#378ADD':cevaplar[i].length>0?'#B5D4F4':'#e5e7eb',cursor:'pointer',transition:'background .2s'}}>
                </div>
              ))}
            </div>

            <button onClick={ileri}
              style={{fontSize:'13px',fontWeight:'500',padding:'10px 20px',borderRadius:'8px',background:'#378ADD',color:'#042C53',border:'none',cursor:'pointer'}}>
              {aktifSoru === sorular.length - 1 ? 'Tamamla ✓' : 'Devam →'}
            </button>
          </div>

          {cevaplar[aktifSoru].length === 0 && (
            <div style={{textAlign:'center',marginTop:'16px'}}>
              <span onClick={ileri} style={{fontSize:'12px',color:'#9ca3af',cursor:'pointer',textDecoration:'underline'}}>
                Bu soruyu atla
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}