import { useRouter } from 'next/router';
import { useState } from 'react';

const sorular = [
  {id:1, tip:'davranis', soru:'Yeni bir konuyu öğrenirken ilk ne yaparsın? Nasıl başlarsın?'},
  {id:2, tip:'davranis', soru:'En iyi öğrendiğin bir anı anlat. Ne vardı o anda?'},
  {id:3, tip:'davranis', soru:'Bir konuyu anlayamadığında ne hissedersin, ne yaparsın?'},
  {id:4, tip:'davranis', soru:'Öğrendiklerini başkasına anlatman gerekse nasıl anlatırsın?'},
  {id:5, tip:'davranis', soru:'Okurken veya dinlerken ne zaman "anladım" dersin?'},
  {id:6, tip:'davranis', soru:'Sıkılmadan en uzun süre çalışabildiğin ortamı tarif et.'},
  {id:7, tip:'tercih', soru:'Bir konuyu öğrenirken hangisi daha çok işine yarar?',
   secenekler:['Önce genel resmi görüp sonra detaylara inmek','Direkt detaylardan başlayıp büyük resme ulaşmak']},
  {id:8, tip:'tercih', soru:'Hangi anlatım seni daha çok etkiler?',
   secenekler:['Gerçek hayattan bir hikaye ile açıklanan konu','Adım adım sistematik liste']},
  {id:9, tip:'tercih', soru:'Ders notun nasıl sunulsun?',
   secenekler:['Sohbet havasında, sanki biri anlatıyor gibi','Net ve kısa, sadece önemli noktalar']},
  {id:10, tip:'tercih', soru:'Yeni bir kavramı en iyi nasıl öğrenirsin?',
   secenekler:['Bir örnekle karşılaştırınca','Tanımını okuyunca','Kendim uygulayınca']},
];

export default function Test() {
  const router = useRouter();
  const [aktifSoru, setAktifSoru] = useState(0);
  const [cevaplar, setCevaplar] = useState(Array(10).fill(''));
  const [yukleniyor, setYukleniyor] = useState(false);
  const [bitti, setBitti] = useState(false);

  const ileri = async () => {
    if(aktifSoru < sorular.length - 1){
      setAktifSoru(aktifSoru + 1);
    } else {
      setYukleniyor(true);
      try {
        const yanit = await fetch('/api/profil-olustur', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({cevaplar, sorular})
        });
        const data = await yanit.json();
        if(data.profil) {
          localStorage.setItem('ogrenmeStili', JSON.stringify(data.profil));
          localStorage.setItem('profilOzeti', data.profil.ozet);
        }
      } catch(e) {
        console.error(e);
      }
      setBitti(true);
      setTimeout(()=> router.push('/profil'), 1500);
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

  const soru = sorular[aktifSoru];
  const ilerleme = ((aktifSoru + 1) / sorular.length) * 100;

  return (
    <div style={{fontFamily:'sans-serif',background:'#fff',minHeight:'100vh'}}>

      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',borderBottom:'0.5px solid #e5e7eb',background:'#fff'}}>
        <div onClick={()=>router.push('/')} style={{display:'flex',alignItems:'center',gap:'8px',cursor:'pointer'}}>
          <div style={{width:'32px',height:'32px',borderRadius:'8px',background:'#378ADD',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'#E6F1FB',fontSize:'16px',fontWeight:'500'}}>M</span>
          </div>
          <span style={{fontSize:'16px',fontWeight:'500',color:'#111'}}>MindType</span>
        </div>
        <div style={{fontSize:'13px',color:'#6b7280'}}>
          {yukleniyor ? 'Profil oluşturuluyor...' : `Soru ${aktifSoru + 1} / ${sorular.length}`}
        </div>
      </nav>

      <div style={{height:'3px',background:'#f3f4f6'}}>
        <div style={{height:'100%',width:`${ilerleme}%`,background:'#378ADD',transition:'width .3s'}}></div>
      </div>

      {bitti ? (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'60vh',gap:'16px'}}>
          <div style={{fontSize:'48px'}}>🎯</div>
          <h2 style={{fontSize:'22px',fontWeight:'500',color:'#111'}}>Profil oluşturuluyor!</h2>
          <p style={{fontSize:'14px',color:'#6b7280'}}>Cevapların analiz ediliyor, yönlendiriliyorsun...</p>
        </div>
      ) : (
        <div style={{maxWidth:'600px',margin:'0 auto',padding:'48px 32px'}}>

          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'32px'}}>
            <div style={{width:'40px',height:'40px',borderRadius:'50%',background: soru.tip==='tercih'?'#E6F1FB':'#378ADD',color:soru.tip==='tercih'?'#185FA5':'#042C53',fontSize:'16px',fontWeight:'500',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              {aktifSoru + 1}
            </div>
            <div style={{fontSize:'11px',fontWeight:'500',color: soru.tip==='tercih'?'#185FA5':'#378ADD',letterSpacing:'.05em'}}>
              {soru.tip==='tercih' ? 'TERCİH SORUSU' : 'DENEYİM SORUSU'}
            </div>
          </div>

          <h2 style={{fontSize:'20px',fontWeight:'500',color:'#111',lineHeight:'1.5',marginBottom:'24px'}}>
            {soru.soru}
          </h2>

          {soru.tip === 'davranis' ? (
            <textarea
              value={cevaplar[aktifSoru]}
              onChange={e=>cevapGuncelle(e.target.value)}
              placeholder="Kendi cümlerinle yaz..."
              rows={6}
              style={{width:'100%',padding:'14px 16px',borderRadius:'12px',border:'0.5px solid #d1d5db',fontSize:'14px',color:'#111',outline:'none',resize:'none',lineHeight:'1.7',boxSizing:'border-box',fontFamily:'sans-serif',marginBottom:'8px'}}
            />
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'8px'}}>
              {soru.secenekler.map((s,i)=>(
                <button key={i} onClick={()=>cevapGuncelle(s)}
                  style={{padding:'14px 18px',borderRadius:'10px',border:cevaplar[aktifSoru]===s?'2px solid #378ADD':'0.5px solid #e5e7eb',background:cevaplar[aktifSoru]===s?'#E6F1FB':'#fff',cursor:'pointer',textAlign:'left',fontSize:'14px',color:cevaplar[aktifSoru]===s?'#185FA5':'#111',transition:'all .15s'}}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {soru.tip==='davranis' && (
            <div style={{fontSize:'12px',color:'#9ca3af',marginBottom:'32px'}}>
              {cevaplar[aktifSoru].length} karakter
            </div>
          )}

          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'24px'}}>
            <button onClick={geri} disabled={aktifSoru===0}
              style={{fontSize:'13px',fontWeight:'500',padding:'10px 20px',borderRadius:'8px',border:'0.5px solid #d1d5db',background:'transparent',color:aktifSoru===0?'#d1d5db':'#111',cursor:aktifSoru===0?'not-allowed':'pointer'}}>
              ← Geri
            </button>

            <div style={{display:'flex',gap:'6px'}}>
              {sorular.map((_,i)=>(
                <div key={i} onClick={()=>setAktifSoru(i)}
                  style={{width:'8px',height:'8px',borderRadius:'50%',background:i===aktifSoru?'#378ADD':cevaplar[i].length>0?'#B5D4F4':'#e5e7eb',cursor:'pointer'}}>
                </div>
              ))}
            </div>

            <button onClick={ileri}
              style={{fontSize:'13px',fontWeight:'500',padding:'10px 20px',borderRadius:'8px',background:'#378ADD',color:'#042C53',border:'none',cursor:'pointer'}}>
              {aktifSoru === sorular.length - 1 ? 'Tamamla ✓' : 'Devam →'}
            </button>
          </div>

          {cevaplar[aktifSoru].length === 0 && soru.tip==='davranis' && (
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