import { useRouter } from 'next/router';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Giris() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [sifreGoster, setSifreGoster] = useState(false);
  const [hatalar, setHatalar] = useState({});
  const [yukleniyor, setYukleniyor] = useState(false);
  const [sunucuHata, setSunucuHata] = useState('');
  const [basarili, setBasarili] = useState(false);

  const dogrula = () => {
    const h = {};
    if(!email || !email.includes('@')) h.email = 'Geçerli bir e-posta gir.';
    if(!sifre || sifre.length < 6) h.sifre = 'Şifre en az 6 karakter olmalı.';
    setHatalar(h);
    return Object.keys(h).length === 0;
  };

  const girisYap = async () => {
    if(!dogrula()) return;
    setYukleniyor(true);
    setSunucuHata('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: sifre,
      });

      if(error) throw error;

      if(data.user) {
        const { data: profil } = await supabase
          .from('profiller')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if(profil) {
          localStorage.setItem('tip', profil.tip_no);
          localStorage.setItem('tipAd', profil.tip_ad);
          localStorage.setItem('kanat', profil.kanat);
        }

        setBasarili(true);
        setTimeout(()=> router.push('/panel'), 1500);
      }
    } catch(e) {
      setSunucuHata(e.message === 'Invalid login credentials'
        ? 'E-posta veya şifre hatalı.'
        : e.message || 'Bir hata oluştu.');
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div style={{fontFamily:'sans-serif',background:'#fff',minHeight:'100vh'}}>

      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 32px',borderBottom:'0.5px solid #e5e7eb'}}>
        <div onClick={()=>router.push('/')} style={{display:'flex',alignItems:'center',gap:'8px',cursor:'pointer'}}>
          <div style={{width:'32px',height:'32px',borderRadius:'8px',background:'#378ADD',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'#E6F1FB',fontSize:'16px',fontWeight:'500'}}>M</span>
          </div>
          <span style={{fontSize:'16px',fontWeight:'500',color:'#111'}}>MindType</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <span style={{fontSize:'13px',color:'#6b7280'}}>Hesabın yok mu?</span>
          <button onClick={()=>router.push('/kayit')} style={{fontSize:'13px',fontWeight:'500',padding:'7px 16px',borderRadius:'8px',background:'#378ADD',color:'#042C53',border:'none',cursor:'pointer'}}>Kayıt ol</button>
        </div>
      </nav>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'calc(100vh - 65px)'}}>

        <div style={{background:'#E6F1FB',padding:'48px 40px',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
          <div>
            <div style={{display:'inline-block',fontSize:'11px',fontWeight:'500',padding:'4px 12px',borderRadius:'20px',background:'#B5D4F4',color:'#0C447C',marginBottom:'20px'}}>Kişilik temelli öğrenme</div>
            <h2 style={{fontSize:'24px',fontWeight:'500',color:'#0C447C',lineHeight:'1.3',marginBottom:'12px'}}>Tekrar hoş geldin.</h2>
            <p style={{fontSize:'13px',color:'#185FA5',lineHeight:'1.7',marginBottom:'28px'}}>Sistem seni hâlâ hatırlıyor. Notlarını yükle, mizacına göre öğrenmeye devam et.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
              {[
                {tip:'Tip 5 · Gözlemci',not:'Son not: Calculus — Türev kavramı',aktif:true},
                {tip:'Tip 7 · Meraklı',not:'Son not: İngilizce — Present Perfect',aktif:false},
                {tip:'Tip 1 · Reformcu',not:'Son not: Kimya — Mol hesabı',aktif:false},
              ].map((k,i)=>(
                <div key={i} style={{background:'#fff',borderRadius:'8px',padding:'12px 14px',display:'flex',alignItems:'center',gap:'10px',opacity:k.aktif?1:0.5}}>
                  <div style={{width:'8px',height:'8px',borderRadius:'50%',background:k.aktif?'#378ADD':'#B5D4F4',flexShrink:0}}></div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:'12px',fontWeight:'500',color:'#111'}}>{k.tip}</div>
                    <div style={{fontSize:'11px',color:'#6b7280'}}>{k.not}</div>
                  </div>
                  {k.aktif && <span style={{fontSize:'14px',color:'#378ADD'}}>→</span>}
                </div>
              ))}
            </div>
          </div>
          <div style={{fontSize:'11px',color:'#185FA5',lineHeight:'1.6',paddingTop:'20px',borderTop:'0.5px solid #B5D4F4'}}>
            Binlerce öğrenci mizacına göre öğreniyor. Sen de katıl.
          </div>
        </div>

        <div style={{padding:'48px 40px',display:'flex',flexDirection:'column',justifyContent:'center'}}>

          {basarili && (
            <div style={{background:'#EAF3DE',border:'0.5px solid #97C459',borderRadius:'8px',padding:'10px 14px',fontSize:'12px',color:'#27500A',marginBottom:'14px',display:'flex',alignItems:'center',gap:'8px'}}>
              ✓ Giriş başarılı, yönlendiriliyorsun...
            </div>
          )}

          {sunucuHata && (
            <div style={{background:'#FBEAF0',border:'0.5px solid #E24B4A',borderRadius:'8px',padding:'10px 14px',fontSize:'12px',color:'#A32D2D',marginBottom:'14px'}}>
              ⚠️ {sunucuHata}
            </div>
          )}

          <h2 style={{fontSize:'22px',fontWeight:'500',color:'#111',marginBottom:'6px'}}>Giriş yap</h2>
          <p style={{fontSize:'13px',color:'#6b7280',marginBottom:'24px'}}>Hesabına erişmek için e-posta ve şifreni gir.</p>

          <div style={{marginBottom:'16px'}}>
            <label style={{fontSize:'12px',fontWeight:'500',color:'#6b7280',marginBottom:'5px',display:'block'}}>E-posta adresi</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
              placeholder="ornek@email.com"
              onKeyDown={e=>e.key==='Enter'&&girisYap()}
              style={{width:'100%',padding:'9px 12px',borderRadius:'8px',border:`0.5px solid ${hatalar.email?'#E24B4A':'#d1d5db'}`,fontSize:'13px',color:'#111',outline:'none',boxSizing:'border-box'}}/>
            {hatalar.email && <div style={{fontSize:'11px',color:'#A32D2D',marginTop:'4px'}}>{hatalar.email}</div>}
          </div>

          <div style={{marginBottom:'8px'}}>
            <label style={{fontSize:'12px',fontWeight:'500',color:'#6b7280',marginBottom:'5px',display:'block'}}>Şifre</label>
            <div style={{position:'relative'}}>
              <input type={sifreGoster?'text':'password'} value={sifre} onChange={e=>setSifre(e.target.value)}
                placeholder="••••••••"
                onKeyDown={e=>e.key==='Enter'&&girisYap()}
                style={{width:'100%',padding:'9px 36px 9px 12px',borderRadius:'8px',border:`0.5px solid ${hatalar.sifre?'#E24B4A':'#d1d5db'}`,fontSize:'13px',color:'#111',outline:'none',boxSizing:'border-box'}}/>
              <button onClick={()=>setSifreGoster(!sifreGoster)} style={{position:'absolute',right:'10px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',fontSize:'14px',color:'#9ca3af'}}>
                {sifreGoster?'🙈':'👁'}
              </button>
            </div>
            {hatalar.sifre && <div style={{fontSize:'11px',color:'#A32D2D',marginTop:'4px'}}>{hatalar.sifre}</div>}
          </div>

          <div style={{textAlign:'right',marginBottom:'20px'}}>
            <span style={{fontSize:'12px',color:'#185FA5',cursor:'pointer'}}>Şifremi unuttum</span>
          </div>

          <button onClick={girisYap} disabled={yukleniyor}
            style={{width:'100%',fontSize:'14px',fontWeight:'500',padding:'11px',borderRadius:'8px',background:yukleniyor?'#B5D4F4':'#378ADD',color:'#042C53',border:'none',cursor:yukleniyor?'not-allowed':'pointer',marginBottom:'16px'}}>
            {yukleniyor ? '⏳ Giriş yapılıyor...' : 'Giriş yap'}
          </button>

          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
            <div style={{flex:1,height:'0.5px',background:'#e5e7eb'}}></div>
            <span style={{fontSize:'11px',color:'#9ca3af'}}>veya</span>
            <div style={{flex:1,height:'0.5px',background:'#e5e7eb'}}></div>
          </div>

          <button
            onClick={async()=>{
              const {error} = await supabase.auth.signInWithOAuth({provider:'google'});
              if(error) setSunucuHata(error.message);
            }}
            style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',fontSize:'13px',padding:'10px',borderRadius:'8px',border:'0.5px solid #d1d5db',background:'transparent',cursor:'pointer',color:'#111',marginBottom:'20px'}}>
            <span style={{fontSize:'16px'}}>G</span> Google ile giriş yap
          </button>

          <div style={{textAlign:'center',fontSize:'12px',color:'#6b7280'}}>
            Hesabın yok mu? <span onClick={()=>router.push('/kayit')} style={{color:'#185FA5',cursor:'pointer'}}>Ücretsiz kayıt ol</span>
          </div>
        </div>
      </div>
    </div>
  );
}