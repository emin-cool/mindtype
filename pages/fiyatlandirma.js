import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Fiyatlandirma() {
  const router = useRouter();
  const [periyot, setPeriyot] = useState('aylik');

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
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <button onClick={()=>router.push('/nasil-calisir')} style={{fontSize:'13px',color:'#6b7280',padding:'6px 12px',borderRadius:'8px',border:'none',background:'transparent',cursor:'pointer'}}>Nasıl çalışır</button>
          <button style={{fontSize:'13px',color:'#185FA5',padding:'6px 12px',borderRadius:'8px',border:'none',background:'#E6F1FB',cursor:'pointer'}}>Fiyatlandırma</button>
          <button onClick={()=>router.push('/giris')} style={{fontSize:'13px',fontWeight:'500',padding:'7px 16px',borderRadius:'8px',background:'transparent',color:'#111',border:'0.5px solid #d1d5db',cursor:'pointer'}}>Giriş yap</button>
          <button onClick={()=>router.push('/kayit')} style={{fontSize:'13px',fontWeight:'500',padding:'7px 16px',borderRadius:'8px',background:'#378ADD',color:'#042C53',border:'none',cursor:'pointer'}}>Kayıt ol</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{textAlign:'center',padding:'48px 32px 40px'}}>
        <div style={{display:'inline-block',fontSize:'11px',fontWeight:'500',padding:'4px 12px',borderRadius:'20px',background:'#E6F1FB',color:'#0C447C',marginBottom:'16px'}}>Şeffaf fiyatlandırma</div>
        <h1 style={{fontSize:'30px',fontWeight:'500',color:'#111',marginBottom:'10px'}}>Sana uygun planı seç</h1>
        <p style={{fontSize:'14px',color:'#6b7280',lineHeight:'1.7',maxWidth:'400px',margin:'0 auto 20px'}}>Ücretsiz başla, ihtiyacın büyüdükçe geliştir. Kredi kartı gerekmez.</p>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
          <button onClick={()=>setPeriyot('aylik')} style={{fontSize:'12px',padding:'6px 16px',borderRadius:'20px',border:'0.5px solid #d1d5db',cursor:'pointer',background:periyot==='aylik'?'#378ADD':'transparent',color:periyot==='aylik'?'#042C53':'#6b7280'}}>Aylık</button>
          <button onClick={()=>setPeriyot('yillik')} style={{fontSize:'12px',padding:'6px 16px',borderRadius:'20px',border:'0.5px solid #d1d5db',cursor:'pointer',background:periyot==='yillik'?'#378ADD':'transparent',color:periyot==='yillik'?'#042C53':'#6b7280'}}>Yıllık</button>
          <span style={{fontSize:'11px',color:'#27500A',background:'#EAF3DE',padding:'3px 10px',borderRadius:'10px'}}>Yıllıkta %20 kazan</span>
        </div>
      </div>

      {/* KARTLAR */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',padding:'0 32px 48px'}}>

        {/* Ücretsiz */}
        <div style={{background:'#fff',border:'0.5px solid #e5e7eb',borderRadius:'12px',padding:'24px',display:'flex',flexDirection:'column'}}>
          <span style={{display:'inline-block',fontSize:'10px',fontWeight:'500',padding:'3px 10px',borderRadius:'10px',background:'#E6F1FB',color:'#0C447C',marginBottom:'14px',alignSelf:'flex-start'}}>Ücretsiz</span>
          <p style={{fontSize:'18px',fontWeight:'500',color:'#111',marginBottom:'4px'}}>Başlangıç</p>
          <p style={{fontSize:'12px',color:'#6b7280',lineHeight:'1.5',marginBottom:'20px'}}>Platformu keşfet, mizacını öğren, ilk notlarını dönüştür.</p>
          <div style={{marginBottom:'20px'}}>
            <span style={{fontSize:'32px',fontWeight:'500',color:'#111'}}>₺0</span>
            <div style={{fontSize:'12px',color:'#6b7280',marginTop:'4px'}}>Sonsuza kadar ücretsiz</div>
          </div>
          <div style={{height:'0.5px',background:'#e5e7eb',marginBottom:'16px'}}></div>
          <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'24px',flex:1}}>
            {[
              {var:true,text:'Kişilik testi ve profil kartı'},
              {var:true,text:'Ayda 3 not dönüşümü'},
              {var:true,text:'Metin formatı çıktısı'},
              {var:false,text:'Ses anlatımı'},
              {var:false,text:'Slayt üretimi'},
              {var:false,text:'İlerleme takibi'},
            ].map((f,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'12px',color:f.var?'#111':'#9ca3af'}}>
                <span style={{color:f.var?'#3B6D11':'#d1d5db',fontSize:'14px'}}>{f.var?'✓':'✕'}</span>
                {f.text}
              </div>
            ))}
          </div>
          <button onClick={()=>router.push('/kayit')} style={{width:'100%',fontSize:'13px',fontWeight:'500',padding:'10px',borderRadius:'8px',cursor:'pointer',border:'0.5px solid #d1d5db',background:'transparent',color:'#111'}}>Ücretsiz başla</button>
        </div>

        {/* Pro */}
        <div style={{background:'#fff',border:'2px solid #378ADD',borderRadius:'12px',padding:'24px',display:'flex',flexDirection:'column'}}>
          <span style={{display:'inline-block',fontSize:'10px',fontWeight:'500',padding:'3px 10px',borderRadius:'10px',background:'#378ADD',color:'#042C53',marginBottom:'14px',alignSelf:'flex-start'}}>En çok tercih edilen</span>
          <p style={{fontSize:'18px',fontWeight:'500',color:'#111',marginBottom:'4px'}}>Pro</p>
          <p style={{fontSize:'12px',color:'#6b7280',lineHeight:'1.5',marginBottom:'20px'}}>Sınırsız not, tüm formatlar ve sürekli gelişen kişisel profil.</p>
          <div style={{marginBottom:'20px'}}>
            {periyot==='yillik' && <span style={{fontSize:'13px',color:'#9ca3af',textDecoration:'line-through',marginRight:'6px'}}>₺149</span>}
            <span style={{fontSize:'32px',fontWeight:'500',color:'#111'}}>{periyot==='yillik'?'₺119':'₺149'}</span>
            <div style={{fontSize:'12px',color:'#6b7280',marginTop:'4px'}}>{periyot==='yillik'?'aylık · yıllık faturalandırma':'aylık'}</div>
          </div>
          <div style={{height:'0.5px',background:'#e5e7eb',marginBottom:'16px'}}></div>
          <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'24px',flex:1}}>
            {[
              'Kişilik testi ve profil kartı',
              'Sınırsız not dönüşümü',
              'Metin, ses ve slayt formatı',
              'İlerleme takibi ve analitik',
              'Profil zamanla gelişir',
              'Öncelikli destek',
            ].map((f,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'12px',color:'#111'}}>
                <span style={{color:'#3B6D11',fontSize:'14px'}}>✓</span>{f}
              </div>
            ))}
          </div>
          <button onClick={()=>router.push('/kayit')} style={{width:'100%',fontSize:'13px',fontWeight:'500',padding:'10px',borderRadius:'8px',cursor:'pointer',border:'none',background:'#378ADD',color:'#042C53'}}>Pro ile başla</button>
        </div>

        {/* Kurumsal */}
        <div style={{background:'#fff',border:'0.5px solid #e5e7eb',borderRadius:'12px',padding:'24px',display:'flex',flexDirection:'column'}}>
          <span style={{display:'inline-block',fontSize:'10px',fontWeight:'500',padding:'3px 10px',borderRadius:'10px',background:'#E6F1FB',color:'#0C447C',marginBottom:'14px',alignSelf:'flex-start'}}>Kurumsal</span>
          <p style={{fontSize:'18px',fontWeight:'500',color:'#111',marginBottom:'4px'}}>Kurum</p>
          <p style={{fontSize:'12px',color:'#6b7280',lineHeight:'1.5',marginBottom:'20px'}}>Okullar, dershaneler ve şirketler için tüm özellikler dahil.</p>
          <div style={{marginBottom:'20px'}}>
            <span style={{fontSize:'24px',fontWeight:'500',color:'#111'}}>Özel fiyat</span>
            <div style={{fontSize:'12px',color:'#6b7280',marginTop:'4px'}}>Öğrenci sayısına göre</div>
          </div>
          <div style={{height:'0.5px',background:'#e5e7eb',marginBottom:'16px'}}></div>
          <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'24px',flex:1}}>
            {[
              "Pro'daki her şey dahil",
              'Yönetici paneli',
              'Toplu not dağıtımı',
              'Tüm öğrenci profillerini gör',
              'Sınıf bazlı analitik',
              'Öncelikli teknik destek',
            ].map((f,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'12px',color:'#111'}}>
                <span style={{color:'#3B6D11',fontSize:'14px'}}>✓</span>{f}
              </div>
            ))}
          </div>
          <button style={{width:'100%',fontSize:'13px',fontWeight:'500',padding:'10px',borderRadius:'8px',cursor:'pointer',border:'0.5px solid #378ADD',background:'transparent',color:'#185FA5'}}>Bize ulaş</button>
        </div>
      </div>

      {/* SSS */}
      <div style={{padding:'0 32px 48px'}}>
        <h2 style={{fontSize:'18px',fontWeight:'500',color:'#111',marginBottom:'20px',textAlign:'center'}}>Sık sorulan sorular</h2>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
          {[
            {s:'Ücretsiz plandan Pro\'ya geçince ne olur?',c:'Mevcut notların ve profilin korunur. Anında sınırsız not ve ses/slayt özelliklerine erişim kazanırsın.'},
            {s:'İstediğim zaman iptal edebilir miyim?',c:'Evet. İptal ettiğinde dönem sonuna kadar Pro özelliklerini kullanmaya devam edersin.'},
            {s:'Kurumsal fiyatlandırma nasıl belirlenir?',c:'Öğrenci sayısına ve ihtiyaçlara göre özel teklif hazırlanır. Bize ulaş butonundan form doldurabilirsin.'},
            {s:'Ses üretimi için ek ücret var mı?',c:'Hayır. Pro planında ses anlatımı dahildir, ek ücret alınmaz.'},
          ].map((q,i)=>(
            <div key={i} style={{background:'#f9fafb',borderRadius:'8px',padding:'16px'}}>
              <p style={{fontSize:'13px',fontWeight:'500',color:'#111',marginBottom:'6px'}}>{q.s}</p>
              <p style={{fontSize:'12px',color:'#6b7280',lineHeight:'1.6'}}>{q.c}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{margin:'0 32px 48px',background:'#E6F1FB',borderRadius:'12px',padding:'32px',textAlign:'center'}}>
        <p style={{fontSize:'20px',fontWeight:'500',color:'#0C447C',marginBottom:'8px'}}>Hâlâ kararsız mısın?</p>
        <p style={{fontSize:'13px',color:'#185FA5',marginBottom:'20px'}}>Ücretsiz başla, farkı kendin gör.</p>
        <button onClick={()=>router.push('/kayit')} style={{fontSize:'14px',fontWeight:'500',padding:'10px 24px',borderRadius:'8px',background:'#378ADD',color:'#042C53',border:'none',cursor:'pointer'}}>Ücretsiz başla</button>
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