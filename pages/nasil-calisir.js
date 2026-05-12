import { useRouter } from 'next/router';

export default function NasilCalisir() {
  const router = useRouter();

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
          <button style={{fontSize:'13px',color:'#185FA5',padding:'6px 12px',borderRadius:'8px',border:'none',background:'#E6F1FB',cursor:'pointer'}}>Nasıl çalışır</button>
          <button onClick={()=>router.push('/fiyatlandirma')} style={{fontSize:'13px',color:'#6b7280',padding:'6px 12px',borderRadius:'8px',border:'none',background:'transparent',cursor:'pointer'}}>Fiyatlandırma</button>
          <button onClick={()=>router.push('/giris')} style={{fontSize:'13px',fontWeight:'500',padding:'7px 16px',borderRadius:'8px',background:'transparent',color:'#111',border:'0.5px solid #d1d5db',cursor:'pointer'}}>Giriş yap</button>
          <button onClick={()=>router.push('/kayit')} style={{fontSize:'13px',fontWeight:'500',padding:'7px 16px',borderRadius:'8px',background:'#378ADD',color:'#042C53',border:'none',cursor:'pointer'}}>Kayıt ol</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{textAlign:'center',padding:'48px 32px 40px'}}>
        <div style={{display:'inline-block',fontSize:'11px',fontWeight:'500',padding:'4px 12px',borderRadius:'20px',background:'#E6F1FB',color:'#0C447C',marginBottom:'16px'}}>
          4 adımda kişisel öğrenme
        </div>
        <h1 style={{fontSize:'30px',fontWeight:'500',color:'#111',marginBottom:'10px'}}>Nasıl çalışır?</h1>
        <p style={{fontSize:'14px',color:'#6b7280',lineHeight:'1.7',maxWidth:'420px',margin:'0 auto'}}>
          Testi bir kez çöz, sistemi bir kez kur. Sonrasında her not otomatik olarak sana göre şekillenir.
        </p>
      </div>

      {/* ADIMLAR */}
      <div style={{padding:'0 32px 48px',display:'flex',flexDirection:'column',gap:'32px'}}>

        {/* Adım 1 */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',alignItems:'center',paddingBottom:'32px',borderBottom:'0.5px solid #e5e7eb'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#378ADD',color:'#042C53',fontSize:'13px',fontWeight:'500',display:'flex',alignItems:'center',justifyContent:'center'}}>1</div>
              <span style={{fontSize:'11px',fontWeight:'500',color:'#185FA5',letterSpacing:'.05em'}}>ADIM 1</span>
            </div>
            <h2 style={{fontSize:'18px',fontWeight:'500',color:'#111',marginBottom:'8px'}}>Mizacını keşfet</h2>
            <p style={{fontSize:'13px',color:'#6b7280',lineHeight:'1.7',marginBottom:'14px'}}>9 açık uçlu soruya kendi cümlerinle cevap ver. Yapay zeka yazdıklarını analiz eder, öğrenme tipini belirler.</p>
            {['Çoktan seçmeli değil, sen yazar yapay zeka değerlendirir','9 kişilik tipinden biri ve kanat belirlenir','Profil kartın oluşur, istersen düzeltebilirsin'].map((m,i)=>(
              <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'8px',marginBottom:'6px'}}>
                <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#378ADD',flexShrink:0,marginTop:'6px'}}></div>
                <span style={{fontSize:'12px',color:'#6b7280',lineHeight:'1.5'}}>{m}</span>
              </div>
            ))}
          </div>
          <div style={{background:'#f9fafb',borderRadius:'12px',padding:'20px',display:'flex',flexDirection:'column',gap:'10px'}}>
            <div style={{background:'#fff',border:'0.5px solid #e5e7eb',borderRadius:'8px',padding:'12px 14px'}}>
              <div style={{fontSize:'10px',color:'#185FA5',fontWeight:'500',marginBottom:'4px'}}>Soru 3 / 9</div>
              <div style={{fontSize:'12px',color:'#111',lineHeight:'1.5'}}>Bir konuyu öğrenirken neden öğrendiğini bilmek sana ne kadar önemli geliyor?</div>
            </div>
            <div style={{background:'#fff',border:'0.5px solid #378ADD',borderRadius:'8px',padding:'10px 12px',fontSize:'11px',color:'#6b7280',fontStyle:'italic',lineHeight:'1.5'}}>
              Benim için çok önemli. Anlam görmeden ezberleyemiyorum...
            </div>
            <button style={{alignSelf:'flex-end',fontSize:'12px',fontWeight:'500',padding:'6px 14px',borderRadius:'8px',background:'#378ADD',color:'#042C53',border:'none',cursor:'pointer'}}>Devam →</button>
          </div>
        </div>

        {/* Adım 2 */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',alignItems:'center',paddingBottom:'32px',borderBottom:'0.5px solid #e5e7eb'}}>
          <div style={{background:'#f9fafb',borderRadius:'12px',padding:'20px',display:'flex',flexDirection:'column',gap:'10px'}}>
            <div style={{background:'#fff',border:'0.5px solid #e5e7eb',borderRadius:'8px',padding:'14px',display:'flex',alignItems:'center',gap:'12px'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'#E6F1FB',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px'}}>🧠</div>
              <div>
                <div style={{fontSize:'13px',fontWeight:'500',color:'#111'}}>Tip 4 · Bireyci · Kanat 3</div>
                <div style={{fontSize:'11px',color:'#6b7280'}}>Derin anlam arayan, metafor sever</div>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px'}}>
              <div style={{background:'#fff',border:'0.5px solid #e5e7eb',borderRadius:'8px',padding:'10px',textAlign:'center'}}>
                <div style={{fontSize:'10px',color:'#6b7280',marginBottom:'3px'}}>Tercih edilen format</div>
                <div style={{fontSize:'12px',fontWeight:'500',color:'#185FA5'}}>Ses anlatımı</div>
              </div>
              <div style={{background:'#fff',border:'0.5px solid #e5e7eb',borderRadius:'8px',padding:'10px',textAlign:'center'}}>
                <div style={{fontSize:'10px',color:'#6b7280',marginBottom:'3px'}}>Öğrenme tarzı</div>
                <div style={{fontSize:'12px',fontWeight:'500',color:'#185FA5'}}>Anlam odaklı</div>
              </div>
            </div>
          </div>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#378ADD',color:'#042C53',fontSize:'13px',fontWeight:'500',display:'flex',alignItems:'center',justifyContent:'center'}}>2</div>
              <span style={{fontSize:'11px',fontWeight:'500',color:'#185FA5',letterSpacing:'.05em'}}>ADIM 2</span>
            </div>
            <h2 style={{fontSize:'18px',fontWeight:'500',color:'#111',marginBottom:'8px'}}>Profil kartını gör</h2>
            <p style={{fontSize:'13px',color:'#6b7280',lineHeight:'1.7',marginBottom:'14px'}}>Test bittikten sonra tipini ve öğrenme tercihini gösteren profil kartın oluşur.</p>
            {['Hangi formatta daha iyi öğrendiğin belirlenir','Her not yüklemede profil otomatik kullanılır','Zamanla sistem seni daha iyi tanır'].map((m,i)=>(
              <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'8px',marginBottom:'6px'}}>
                <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#378ADD',flexShrink:0,marginTop:'6px'}}></div>
                <span style={{fontSize:'12px',color:'#6b7280',lineHeight:'1.5'}}>{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Adım 3 */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',alignItems:'center',paddingBottom:'32px',borderBottom:'0.5px solid #e5e7eb'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#378ADD',color:'#042C53',fontSize:'13px',fontWeight:'500',display:'flex',alignItems:'center',justifyContent:'center'}}>3</div>
              <span style={{fontSize:'11px',fontWeight:'500',color:'#185FA5',letterSpacing:'.05em'}}>ADIM 3</span>
            </div>
            <h2 style={{fontSize:'18px',fontWeight:'500',color:'#111',marginBottom:'8px'}}>Notunu yükle</h2>
            <p style={{fontSize:'13px',color:'#6b7280',lineHeight:'1.7',marginBottom:'14px'}}>PDF, Word veya düz metin olarak ders notunu yükle ya da direkt yapıştır.</p>
            {['PDF, DOCX ve TXT desteklenir','Sürükle bırak veya metin yapıştır','Ücretsiz planda ayda 3 not, Proda sınırsız'].map((m,i)=>(
              <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'8px',marginBottom:'6px'}}>
                <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#378ADD',flexShrink:0,marginTop:'6px'}}></div>
                <span style={{fontSize:'12px',color:'#6b7280',lineHeight:'1.5'}}>{m}</span>
              </div>
            ))}
          </div>
          <div style={{background:'#f9fafb',borderRadius:'12px',padding:'20px',display:'flex',flexDirection:'column',gap:'10px'}}>
            <div style={{background:'#fff',border:'1px dashed #d1d5db',borderRadius:'8px',padding:'20px',textAlign:'center'}}>
              <div style={{fontSize:'24px',marginBottom:'6px'}}>📄</div>
              <div style={{fontSize:'11px',color:'#6b7280'}}>PDF, DOCX veya metin sürükle bırak</div>
              <div style={{marginTop:'6px',fontSize:'10px',color:'#9ca3af'}}>veya metin yapıştır</div>
            </div>
            <button style={{fontSize:'12px',fontWeight:'500',padding:'8px',borderRadius:'8px',background:'#378ADD',color:'#042C53',border:'none',cursor:'pointer',width:'100%'}}>Dönüştür</button>
          </div>
        </div>

        {/* Adım 4 */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',alignItems:'center'}}>
          <div style={{background:'#f9fafb',borderRadius:'12px',padding:'20px',display:'flex',flexDirection:'column',gap:'10px'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px'}}>
              {[{e:'📝',l:'Metin'},{e:'🎧',l:'Ses'},{e:'📊',l:'Slayt'}].map((f,i)=>(
                <div key={i} style={{background:'#fff',border:`0.5px solid ${i===0?'#378ADD':'#e5e7eb'}`,borderRadius:'8px',padding:'10px 8px',textAlign:'center'}}>
                  <div style={{fontSize:'18px',marginBottom:'4px'}}>{f.e}</div>
                  <div style={{fontSize:'10px',fontWeight:'500',color:'#111'}}>{f.l}</div>
                </div>
              ))}
            </div>
            <div style={{background:'#fff',border:'0.5px solid #e5e7eb',borderRadius:'8px',padding:'12px 14px'}}>
              <div style={{display:'inline-block',fontSize:'10px',padding:'2px 8px',borderRadius:'10px',background:'#E6F1FB',color:'#0C447C',marginBottom:'6px'}}>Tip 4 · Bireyci versiyonu</div>
              {[90,75,85,60].map((w,i)=>(
                <div key={i} style={{height:'7px',background:'#f3f4f6',borderRadius:'4px',marginBottom:'5px',width:w+'%'}}></div>
              ))}
            </div>
          </div>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#378ADD',color:'#042C53',fontSize:'13px',fontWeight:'500',display:'flex',alignItems:'center',justifyContent:'center'}}>4</div>
              <span style={{fontSize:'11px',fontWeight:'500',color:'#185FA5',letterSpacing:'.05em'}}>ADIM 4</span>
            </div>
            <h2 style={{fontSize:'18px',fontWeight:'500',color:'#111',marginBottom:'8px'}}>Mizacına göre çalış</h2>
            <p style={{fontSize:'13px',color:'#6b7280',lineHeight:'1.7',marginBottom:'14px'}}>Not dönüştürülür, üç formatta sunulur. Her format tipine göre ayrı ayrı uyarlanmıştır.</p>
            {['Metin, ses ve slayt aynı anda üretilir','Her format tipinin öğrenme diline göre uyarlanır','Opsiyonel geri bildirimle sistem seni öğrenir'].map((m,i)=>(
              <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'8px',marginBottom:'6px'}}>
                <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#378ADD',flexShrink:0,marginTop:'6px'}}></div>
                <span style={{fontSize:'12px',color:'#6b7280',lineHeight:'1.5'}}>{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{margin:'0 32px 48px',background:'#E6F1FB',borderRadius:'12px',padding:'32px',textAlign:'center'}}>
        <p style={{fontSize:'20px',fontWeight:'500',color:'#0C447C',marginBottom:'8px'}}>Hazır mısın?</p>
        <p style={{fontSize:'13px',color:'#185FA5',marginBottom:'20px'}}>Testi çöz, ilk notunu yükle — ücretsiz.</p>
        <button onClick={()=>router.push('/kayit')} style={{fontSize:'14px',fontWeight:'500',padding:'10px 24px',borderRadius:'8px',background:'#378ADD',color:'#042C53',border:'none',cursor:'pointer'}}>
          Hemen başla
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