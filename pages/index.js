import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div style={{fontFamily:'sans-serif',background:'#fff',minHeight:'100vh'}}>
      
      {/* NAVİGASYON */}
      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',borderBottom:'0.5px solid #e5e7eb'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <div style={{width:'32px',height:'32px',borderRadius:'8px',background:'#378ADD',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'#E6F1FB',fontSize:'16px',fontWeight:'500'}}>M</span>
          </div>
          <span style={{fontSize:'16px',fontWeight:'500',color:'#111'}}>MindType</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <button onClick={()=>router.push('/nasil-calisir')} style={{fontSize:'13px',color:'#6b7280',padding:'6px 12px',borderRadius:'8px',border:'none',background:'transparent',cursor:'pointer'}}>Nasıl çalışır</button>
          <button onClick={()=>router.push('/fiyatlandirma')} style={{fontSize:'13px',color:'#6b7280',padding:'6px 12px',borderRadius:'8px',border:'none',background:'transparent',cursor:'pointer'}}>Fiyatlandırma</button>
          <button onClick={()=>router.push('/giris')} style={{fontSize:'13px',fontWeight:'500',padding:'7px 16px',borderRadius:'8px',background:'transparent',color:'#111',border:'0.5px solid #d1d5db',cursor:'pointer'}}>Giriş yap</button>
          <button onClick={()=>router.push('/kayit')} style={{fontSize:'13px',fontWeight:'500',padding:'7px 16px',borderRadius:'8px',background:'#378ADD',color:'#042C53',border:'none',cursor:'pointer'}}>Kayıt ol</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{textAlign:'center',padding:'64px 32px 48px'}}>
        <div style={{display:'inline-block',fontSize:'11px',fontWeight:'500',padding:'4px 12px',borderRadius:'20px',background:'#E6F1FB',color:'#0C447C',marginBottom:'20px'}}>
          Kişilik temelli öğrenme platformu
        </div>
        <h1 style={{fontSize:'36px',fontWeight:'500',color:'#111',lineHeight:'1.25',marginBottom:'14px',maxWidth:'520px',margin:'0 auto 14px'}}>
          Her zihin farklı öğrenir
        </h1>
        <p style={{fontSize:'15px',color:'#6b7280',lineHeight:'1.7',maxWidth:'440px',margin:'0 auto 28px'}}>
          Ders notunu yükle, sistemimiz seni tanıyarak içeriği senin için yeniden düzenlesin. Metin, ses veya slayt olarak çalış.
        </p>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
          <button onClick={()=>router.push('/kayit')} style={{fontSize:'14px',fontWeight:'500',padding:'10px 24px',borderRadius:'8px',background:'#378ADD',color:'#042C53',border:'none',cursor:'pointer'}}>
            Ücretsiz başla
          </button>
          <button onClick={()=>router.push('/nasil-calisir')} style={{fontSize:'14px',fontWeight:'500',padding:'10px 24px',borderRadius:'8px',background:'transparent',color:'#111',border:'0.5px solid #d1d5db',cursor:'pointer'}}>
            Nasıl çalışır
          </button>
        </div>
      </section>

      {/* ÖZELLİK KARTLARI */}
      <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'12px',padding:'0 32px 48px'}}>
        {[
          {icon:'🔍', baslik:'Kişilik testi', aciklama:'9 açık uçlu soru, yapay zeka mizacını belirler'},
          {icon:'⚡', baslik:'Akıllı dönüşüm', aciklama:'Notun tipine göre yeniden yazılır'},
          {icon:'🎧', baslik:'Çoklu format', aciklama:'Metin, ses anlatımı veya slayt'},
          {icon:'📈', baslik:'Sürekli gelişim', aciklama:'Her notla sistem seni daha iyi tanır'},
        ].map((k,i)=>(
          <div key={i} style={{background:'#fff',border:'0.5px solid #e5e7eb',borderRadius:'12px',padding:'20px'}}>
            <div style={{fontSize:'24px',marginBottom:'10px'}}>{k.icon}</div>
            <p style={{fontSize:'14px',fontWeight:'500',color:'#111',marginBottom:'6px'}}>{k.baslik}</p>
            <p style={{fontSize:'12px',color:'#6b7280',lineHeight:'1.6'}}>{k.aciklama}</p>
          </div>
        ))}
      </section>

      {/* NASIL ÇALIŞIR */}
      <section style={{padding:'0 32px 48px'}}>
        <h2 style={{fontSize:'18px',fontWeight:'500',color:'#111',marginBottom:'20px',textAlign:'center'}}>Nasıl çalışır?</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'10px'}}>
          {[
            {no:'1', baslik:'Testi çöz', aciklama:'Kendi cümlerinle cevapla'},
            {no:'2', baslik:'Notunu yükle', aciklama:'PDF, Word veya metin'},
            {no:'3', baslik:'Dönüştür', aciklama:'Tipine göre yeniden düzenlenir'},
            {no:'4', baslik:'Çalış', aciklama:'Metin, ses veya slayt'},
          ].map((s,i)=>(
            <div key={i} style={{background:'#f9fafb',borderRadius:'12px',padding:'16px',textAlign:'center'}}>
              <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#378ADD',color:'#042C53',fontSize:'12px',fontWeight:'500',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px'}}>{s.no}</div>
              <p style={{fontSize:'13px',fontWeight:'500',color:'#111',marginBottom:'4px'}}>{s.baslik}</p>
              <p style={{fontSize:'11px',color:'#6b7280',lineHeight:'1.5'}}>{s.aciklama}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div style={{margin:'0 32px 48px',background:'#E6F1FB',borderRadius:'12px',padding:'32px',textAlign:'center'}}>
        <p style={{fontSize:'20px',fontWeight:'500',color:'#0C447C',marginBottom:'8px'}}>Hemen başla, ücretsiz dene</p>
        <p style={{fontSize:'13px',color:'#185FA5',marginBottom:'20px'}}>Ayda 3 not dönüşümü ücretsiz. Kredi kartı gerekmez.</p>
        <button onClick={()=>router.push('/kayit')} style={{fontSize:'14px',fontWeight:'500',padding:'10px 24px',borderRadius:'8px',background:'#378ADD',color:'#042C53',border:'none',cursor:'pointer'}}>
          Ücretsiz hesap oluştur
        </button>
      </div>

      {/* FOOTER */}
      <footer style={{padding:'16px 32px',borderTop:'0.5px solid #e5e7eb',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:'12px',color:'#9ca3af'}}>© 2025 MindType</span>
        <div style={{display:'flex',gap:'16px'}}>
          {['Gizlilik','Kullanım şartları','İletişim'].map(l=>(
            <span key={l} style={{fontSize:'12px',color:'#9ca3af',cursor:'pointer'}}>{l}</span>
          ))}
        </div>
      </footer>

    </div>
  );
}