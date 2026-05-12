import { useRouter } from 'next/router';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Kayit() {
  const router = useRouter();
  const [tip, setTip] = useState('bireysel');
  const [form, setForm] = useState({ad:'',soyad:'',email:'',sifre:'',kurumAd:'',kurumTip:'Lise',ogrenciSay:'1-10'});
  const [hatalar, setHatalar] = useState({});
  const [sifreGoster, setSifreGoster] = useState(false);
  const [kvkk, setKvkk] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [basarili, setBasarili] = useState(false);
  const [sunucuHata, setSunucuHata] = useState('');

  const sifreGuc = (s) => {
    let puan = 0;
    if(s.length>=8) puan++;
    if(/[A-Z]/.test(s)) puan++;
    if(/[0-9]/.test(s)) puan++;
    if(/[^A-Za-z0-9]/.test(s)) puan++;
    return puan;
  };

  const gucRenk = ['','#E24B4A','#EF9F27','#378ADD','#3B6D11'];
  const gucEtiket = ['','Çok zayıf','Zayıf','İyi','Güçlü'];
  const guncelle = (alan, deger) => setForm(f=>({...f,[alan]:deger}));

  const dogrula = () => {
    const h = {};
    if(!form.ad) h.ad = 'Ad gerekli.';
    if(!form.soyad) h.soyad = 'Soyad gerekli.';
    if(!form.email || !form.email.includes('@')) h.email = 'Geçerli bir e-posta gir.';
    if(!form.sifre || form.sifre.length < 8) h.sifre = 'Şifre en az 8 karakter olmalı.';
    if(tip==='kurumsal' && !form.kurumAd) h.kurumAd = 'Kurum adı gerekli.';
    if(!kvkk) h.kvkk = 'Devam etmek için kabul etmelisin.';
    setHatalar(h);
    return Object.keys(h).length === 0;
  };

  const kayitOl = async () => {
    if(!dogrula()) return;
    setYukleniyor(true);
    setSunucuHata('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.sifre,
        options: {
          data: {
            ad: form.ad,
            soyad: form.soyad,
            hesap_turu: tip,
            kurum_ad: form.kurumAd || null,
          }
        }
      });

      if(error) throw error;

      if(data.user) {
        await supabase.from('profiller').insert({
          id: data.user.id,
          email: form.email,
          tip_no: 7,
          tip_ad: 'Meraklı',
          kanat: '7w6',
          hesap_turu: tip,
          kurum_ad: form.kurumAd || null,
          plan: 'ucretsiz',
        });

        setBasarili(true);
        setTimeout(()=> router.push('/test'), 1500);
      }
    } catch(e) {
      setSunucuHata(e.message || 'Bir hata oluştu, tekrar dene.');
    } finally {
      setYukleniyor(false);
    }
  };

  const guc = sifreGuc(form.sifre);

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
          <span style={{fontSize:'13px',color:'#6b7280'}}>Zaten hesabın var mı?</span>
          <button onClick={()=>router.push('/giris')} style={{fontSize:'13px',fontWeight:'500',padding:'7px 16px',borderRadius:'8px',background:'transparent',color:'#111',border:'0.5px solid #d1d5db',cursor:'pointer'}}>Giriş yap</button>
        </div>
      </nav>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'calc(100vh - 65px)'}}>

        <div style={{background:'#E6F1FB',padding:'48px 40px',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
          <div>
            <div style={{display:'inline-block',fontSize:'11px',fontWeight:'500',padding:'4px 12px',borderRadius:'20px',background:'#B5D4F4',color:'#0C447C',marginBottom:'20px'}}>Ücretsiz başla</div>
            <h2 style={{fontSize:'24px',fontWeight:'500',color:'#0C447C',lineHeight:'1.3',marginBottom:'12px'}}>Öğrenme şeklini keşfet.</h2>
            <p style={{fontSize:'13px',color:'#185FA5',lineHeight:'1.7',marginBottom:'28px'}}>Hesap oluşturduktan sonra seni tanımak için kısa bir test yapacağız.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {[
                {ikon:'🔍',baslik:'Kişilik testi',aciklama:'9 açık uçlu soru, yapay zeka değerlendirir'},
                {ikon:'⚡',baslik:'Akıllı dönüşüm',aciklama:'Notun mizacına göre yeniden yazılır'},
                {ikon:'🎧',baslik:'Ses ve slayt',aciklama:'Tipine göre ses anlatımı üretilir'},
                {ikon:'📈',baslik:'Sürekli gelişim',aciklama:'Her notla sistem seni daha iyi tanır'},
              ].map((b,i)=>(
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                  <div style={{width:'28px',height:'28px',borderRadius:'8px',background:'#B5D4F4',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'14px'}}>{b.ikon}</div>
                  <div style={{fontSize:'12px',color:'#185FA5',lineHeight:'1.6',paddingTop:'4px'}}><span style={{color:'#0C447C',fontWeight:'500'}}>{b.baslik}</span> — {b.aciklama}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{fontSize:'11px',color:'#185FA5',lineHeight:'1.6',paddingTop:'20px',borderTop:'0.5px solid #B5D4F4'}}>
            Kredi kartı gerekmez · İstediğinde iptal et · Veriler şifreli saklanır
          </div>
        </div>

        <div style={{padding:'32px 40px',display:'flex',flexDirection:'column',justifyContent:'center',overflowY:'auto'}}>

          {basarili && (
            <div style={{background:'#EAF3DE',border:'0.5px solid #97C459',borderRadius:'8px',padding:'10px 14px',fontSize:'12px',color:'#27500A',marginBottom:'14px',display:'flex',alignItems:'center',gap:'8px'}}>
              ✓ Hesap oluşturuldu! Teste yönlendiriliyorsun...
            </div>
          )}

          {sunucuHata && (
            <div style={{background:'#FBEAF0',border:'0.5px solid #E24B4A',borderRadius:'8px',padding:'10px 14px',fontSize:'12px',color:'#A32D2D',marginBottom:'14px'}}>
              ⚠️ {sunucuHata}
            </div>
          )}

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'20px'}}>
            {[
              {id:'bireysel',ikon:'👤',baslik:'Bireysel',aciklama:'Öğrenci veya bireysel kullanım'},
              {id:'kurumsal',ikon:'🏫',baslik:'Kurumsal',aciklama:'Okul, dershane veya kurum'},
            ].map(t=>(
              <button key={t.id} onClick={()=>setTip(t.id)}
                style={{padding:'12px',borderRadius:'8px',border:tip===t.id?'1.5px solid #378ADD':'0.5px solid #d1d5db',background:tip===t.id?'#E6F1FB':'transparent',cursor:'pointer',textAlign:'left'}}>
                <div style={{fontSize:'18px',marginBottom:'6px'}}>{t.ikon}</div>
                <div style={{fontSize:'13px',fontWeight:'500',color:'#111',marginBottom:'2px'}}>{t.baslik}</div>
                <div style={{fontSize:'11px',color:'#6b7280'}}>{t.aciklama}</div>
              </button>
            ))}
          </div>

          <h2 style={{fontSize:'20px',fontWeight:'500',color:'#111',marginBottom:'4px'}}>Hesap oluştur</h2>
          <p style={{fontSize:'13px',color:'#6b7280',marginBottom:'16px'}}>{tip==='kurumsal'?'Kurumunuz için yönetici hesabı.':'Ücretsiz başla, istediğinde Pro\'ya geç.'}</p>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'14px'}}>
            {[{alan:'ad',label:'Ad',ph:'Adın'},{alan:'soyad',label:'Soyad',ph:'Soyadın'}].map(f=>(
              <div key={f.alan}>
                <label style={{fontSize:'12px',fontWeight:'500',color:'#6b7280',marginBottom:'5px',display:'block'}}>{f.label}</label>
                <input value={form[f.alan]} onChange={e=>guncelle(f.alan,e.target.value)} placeholder={f.ph}
                  style={{width:'100%',padding:'9px 12px',borderRadius:'8px',border:`0.5px solid ${hatalar[f.alan]?'#E24B4A':'#d1d5db'}`,fontSize:'13px',color:'#111',outline:'none',boxSizing:'border-box'}}/>
                {hatalar[f.alan] && <div style={{fontSize:'11px',color:'#A32D2D',marginTop:'3px'}}>{hatalar[f.alan]}</div>}
              </div>
            ))}
          </div>

          {tip==='kurumsal' && (
            <div style={{marginBottom:'14px'}}>
              <label style={{fontSize:'12px',fontWeight:'500',color:'#6b7280',marginBottom:'5px',display:'block'}}>Kurum adı</label>
              <input value={form.kurumAd} onChange={e=>guncelle('kurumAd',e.target.value)} placeholder="Okul veya kurum adı"
                style={{width:'100%',padding:'9px 12px',borderRadius:'8px',border:`0.5px solid ${hatalar.kurumAd?'#E24B4A':'#d1d5db'}`,fontSize:'13px',color:'#111',outline:'none',boxSizing:'border-box',marginBottom:'8px'}}/>
              {hatalar.kurumAd && <div style={{fontSize:'11px',color:'#A32D2D',marginTop:'3px'}}>{hatalar.kurumAd}</div>}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
                <div>
                  <label style={{fontSize:'12px',fontWeight:'500',color:'#6b7280',marginBottom:'5px',display:'block'}}>Kurum türü</label>
                  <select value={form.kurumTip} onChange={e=>guncelle('kurumTip',e.target.value)}
                    style={{width:'100%',padding:'9px 12px',borderRadius:'8px',border:'0.5px solid #d1d5db',fontSize:'13px',color:'#111',outline:'none',boxSizing:'border-box'}}>
                    {['Lise','Üniversite','Dershane','Şirket','Diğer'].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{fontSize:'12px',fontWeight:'500',color:'#6b7280',marginBottom:'5px',display:'block'}}>Öğrenci sayısı</label>
                  <select value={form.ogrenciSay} onChange={e=>guncelle('ogrenciSay',e.target.value)}
                    style={{width:'100%',padding:'9px 12px',borderRadius:'8px',border:'0.5px solid #d1d5db',fontSize:'13px',color:'#111',outline:'none',boxSizing:'border-box'}}>
                    {['1-10','11-50','51-200','200+'].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          <div style={{marginBottom:'14px'}}>
            <label style={{fontSize:'12px',fontWeight:'500',color:'#6b7280',marginBottom:'5px',display:'block'}}>E-posta adresi</label>
            <input type="email" value={form.email} onChange={e=>guncelle('email',e.target.value)} placeholder="ornek@email.com"
              style={{width:'100%',padding:'9px 12px',borderRadius:'8px',border:`0.5px solid ${hatalar.email?'#E24B4A':'#d1d5db'}`,fontSize:'13px',color:'#111',outline:'none',boxSizing:'border-box'}}/>
            {hatalar.email && <div style={{fontSize:'11px',color:'#A32D2D',marginTop:'3px'}}>{hatalar.email}</div>}
          </div>

          <div style={{marginBottom:'14px'}}>
            <label style={{fontSize:'12px',fontWeight:'500',color:'#6b7280',marginBottom:'5px',display:'block'}}>Şifre</label>
            <div style={{position:'relative'}}>
              <input type={sifreGoster?'text':'password'} value={form.sifre} onChange={e=>guncelle('sifre',e.target.value)} placeholder="En az 8 karakter"
                style={{width:'100%',padding:'9px 36px 9px 12px',borderRadius:'8px',border:`0.5px solid ${hatalar.sifre?'#E24B4A':'#d1d5db'}`,fontSize:'13px',color:'#111',outline:'none',boxSizing:'border-box'}}/>
              <button onClick={()=>setSifreGoster(!sifreGoster)} style={{position:'absolute',right:'10px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',fontSize:'14px',color:'#9ca3af'}}>
                {sifreGoster?'🙈':'👁'}
              </button>
            </div>
            {form.sifre.length > 0 && (
              <div>
                <div style={{height:'3px',borderRadius:'2px',background:'#f3f4f6',marginTop:'6px',overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${guc*25}%`,background:gucRenk[guc],borderRadius:'2px',transition:'width .2s'}}></div>
                </div>
                <div style={{fontSize:'10px',color:gucRenk[guc],marginTop:'3px'}}>{gucEtiket[guc]}</div>
              </div>
            )}
            {hatalar.sifre && <div style={{fontSize:'11px',color:'#A32D2D',marginTop:'3px'}}>{hatalar.sifre}</div>}
          </div>

          <div style={{display:'flex',alignItems:'flex-start',gap:'8px',marginBottom:'16px'}}>
            <input type="checkbox" id="kvkk" checked={kvkk} onChange={e=>setKvkk(e.target.checked)} style={{marginTop:'2px',flexShrink:0,accentColor:'#378ADD'}}/>
            <label htmlFor="kvkk" style={{fontSize:'11px',color:'#6b7280',lineHeight:'1.5',cursor:'pointer'}}>
              <span style={{color:'#185FA5'}}>Kullanım şartlarını</span> ve <span style={{color:'#185FA5'}}>Gizlilik politikasını</span> okudum, kabul ediyorum.
            </label>
          </div>
          {hatalar.kvkk && <div style={{fontSize:'11px',color:'#A32D2D',marginBottom:'10px'}}>{hatalar.kvkk}</div>}

          <button onClick={kayitOl} disabled={yukleniyor}
            style={{width:'100%',fontSize:'14px',fontWeight:'500',padding:'11px',borderRadius:'8px',background:yukleniyor?'#B5D4F4':'#378ADD',color:'#042C53',border:'none',cursor:yukleniyor?'not-allowed':'pointer',marginBottom:'16px'}}>
            {yukleniyor ? '⏳ Hesap oluşturuluyor...' : 'Hesap oluştur'}
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
            style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',fontSize:'13px',padding:'10px',borderRadius:'8px',border:'0.5px solid #d1d5db',background:'transparent',cursor:'pointer',color:'#111',marginBottom:'16px'}}>
            <span style={{fontSize:'16px'}}>G</span> Google ile kayıt ol
          </button>

          <div style={{textAlign:'center',fontSize:'12px',color:'#6b7280'}}>
            Zaten hesabın var mı? <span onClick={()=>router.push('/giris')} style={{color:'#185FA5',cursor:'pointer'}}>Giriş yap</span>
          </div>
        </div>
      </div>
    </div>
  );
}