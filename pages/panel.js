import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const gecmisNotlar = [
  {id:1, baslik:'Mitoz Bölünme', ders:'Biyoloji', tarih:'10 May 2025', formatlar:['Metin','Ses','Slayt']},
  {id:2, baslik:'Türev Kavramı', ders:'Matematik', tarih:'8 May 2025', formatlar:['Metin','Slayt']},
  {id:3, baslik:'Fotosentez', ders:'Biyoloji', tarih:'5 May 2025', formatlar:['Metin','Ses']},
];

export default function Panel() {
  const router = useRouter();
  const [surukle, setSurukle] = useState(false);
  const [metin, setMetin] = useState('');
  const [dosyaAd, setDosyaAd] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const [aktifMenu, setAktifMenu] = useState('panel');
  const [kullaniciTip, setKullaniciTip] = useState('7');
  const [kullaniciTipAd, setKullaniciTipAd] = useState('Meraklı');
  const [kullaniciKanat, setKullaniciKanat] = useState('7w6');
  const [seciliFormat, setSeciliFormat] = useState('hepsi');

  useEffect(()=>{
    const tip = localStorage.getItem('tip');
    const tipAd = localStorage.getItem('tipAd');
    const kanat = localStorage.getItem('kanat');
    if(tip) setKullaniciTip(tip);
    if(tipAd) setKullaniciTipAd(tipAd);
    if(kanat) setKullaniciKanat(kanat);
  },[]);

 const donustur = async () => {
  if(!metin && !dosyaAd) return;
  setYukleniyor(true);

  try {
    const yanit = await fetch('/api/donustur', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        hamNot: metin,
        tipNo: kullaniciTip,
        kanat: kullaniciKanat,
      })
    });

    const data = await yanit.json();

    if(data.uyarlanmisNot) {
      localStorage.setItem('hamNot', metin);
      localStorage.setItem('uyarlanmisNot', data.uyarlanmisNot);
      localStorage.setItem('seciliFormat', seciliFormat);
      localStorage.setItem('notBaslik', dosyaAd || metin.slice(0,40)+'...');
      router.push('/sonuc');
    } else {
      alert('Bir hata oluştu: ' + data.hata);
      setYukleniyor(false);
    }
  } catch(e) {
    alert('Bağlantı hatası: ' + e.message);
    setYukleniyor(false);
  }
};
 

  const dosyaSec = (e) => {
    const dosya = e.target.files[0];
    if(dosya){
      setDosyaAd(dosya.name);
      const reader = new FileReader();
      reader.onload = (ev) => setMetin(ev.target.result);
      reader.readAsText(dosya);
    }
  };

  const formatlar = [
    {id:'metin', ikon:'📝', label:'Metin'},
    {id:'ses', ikon:'🎧', label:'Ses'},
    {id:'slayt', ikon:'📊', label:'Slayt'},
    {id:'hepsi', ikon:'✨', label:'Hepsi'},
  ];

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
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
            <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#3B6D11'}}></div>
            <span style={{fontSize:'12px',color:'#6b7280'}}>Ücretsiz plan · 2/3 not</span>
          </div>
          <button onClick={()=>router.push('/fiyatlandirma')} style={{fontSize:'12px',fontWeight:'500',padding:'5px 12px',borderRadius:'20px',background:'#378ADD',color:'#042C53',border:'none',cursor:'pointer'}}>
            Pro'ya geç
          </button>
          <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#E6F1FB',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',cursor:'pointer'}}>👤</div>
        </div>
      </nav>

      <div style={{display:'grid',gridTemplateColumns:'220px 1fr',minHeight:'calc(100vh - 65px)'}}>

        {/* SIDEBAR */}
        <div style={{background:'#fff',borderRight:'0.5px solid #e5e7eb',padding:'24px 16px'}}>
          <div style={{background:'#E6F1FB',borderRadius:'12px',padding:'14px',marginBottom:'20px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
              <div style={{width:'36px',height:'36px',borderRadius:'50%',background:'#378ADD',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>🧠</div>
              <div>
                <div style={{fontSize:'13px',fontWeight:'500',color:'#111'}}>Tip {kullaniciTip} · {kullaniciTipAd}</div>
                <div style={{fontSize:'11px',color:'#185FA5'}}>{kullaniciKanat}</div>
              </div>
            </div>
            <button onClick={()=>router.push('/profil')} style={{fontSize:'11px',color:'#185FA5',background:'transparent',border:'none',cursor:'pointer',padding:0}}>
              Profili düzenle →
            </button>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
            {[
              {id:'panel',ikon:'🏠',label:'Ana panel'},
              {id:'notlar',ikon:'📄',label:'Notlarım'},
              {id:'ilerleme',ikon:'📈',label:'İlerleme'},
              {id:'ayarlar',ikon:'⚙️',label:'Ayarlar'},
            ].map(m=>(
              <button key={m.id} onClick={()=>setAktifMenu(m.id)}
                style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 12px',borderRadius:'8px',border:'none',background:aktifMenu===m.id?'#E6F1FB':'transparent',color:aktifMenu===m.id?'#185FA5':'#6b7280',cursor:'pointer',fontSize:'13px',textAlign:'left',width:'100%'}}>
                <span>{m.ikon}</span>{m.label}
              </button>
            ))}
          </div>

          <div style={{marginTop:'24px',padding:'12px',background:'#f9fafb',borderRadius:'8px'}}>
            <div style={{fontSize:'11px',color:'#6b7280',marginBottom:'6px'}}>Aylık kullanım</div>
            <div style={{height:'6px',background:'#e5e7eb',borderRadius:'3px',overflow:'hidden',marginBottom:'4px'}}>
              <div style={{height:'100%',width:'66%',background:'#378ADD',borderRadius:'3px'}}></div>
            </div>
            <div style={{fontSize:'11px',color:'#6b7280'}}>2 / 3 not kullanıldı</div>
          </div>
        </div>

        {/* ANA İÇERİK */}
        <div style={{padding:'24px 32px'}}>

          <div style={{marginBottom:'24px'}}>
            <h1 style={{fontSize:'22px',fontWeight:'500',color:'#111',marginBottom:'4px'}}>Merhaba 👋</h1>
            <p style={{fontSize:'14px',color:'#6b7280'}}>Tip {kullaniciTip} · {kullaniciTipAd} profiline göre notların hazır. Yeni bir not yükle.</p>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'24px'}}>
            {[
              {etiket:'Toplam not',deger:'3'},
              {etiket:'Ses üretimi',deger:'2'},
              {etiket:'Slayt',deger:'1'},
              {etiket:'Bu ay kalan',deger:'1'},
            ].map((s,i)=>(
              <div key={i} style={{background:'#fff',borderRadius:'10px',padding:'16px',border:'0.5px solid #e5e7eb'}}>
                <div style={{fontSize:'13px',color:'#9ca3af',marginBottom:'6px'}}>{s.etiket}</div>
                <div style={{fontSize:'24px',fontWeight:'500',color:'#111'}}>{s.deger}</div>
              </div>
            ))}
          </div>

          {/* NOT YÜKLEME */}
          <div style={{background:'#fff',borderRadius:'12px',border:'0.5px solid #e5e7eb',padding:'24px',marginBottom:'24px'}}>
            <h2 style={{fontSize:'16px',fontWeight:'500',color:'#111',marginBottom:'16px'}}>Yeni not yükle</h2>

            {/* SÜRÜKLE BIRAK */}
            <div
              onDragOver={e=>{e.preventDefault();setSurukle(true)}}
              onDragLeave={()=>setSurukle(false)}
              onDrop={e=>{
                e.preventDefault();setSurukle(false);
                const f=e.dataTransfer.files[0];
                if(f){
                  setDosyaAd(f.name);
                  const r=new FileReader();
                  r.onload=ev=>setMetin(ev.target.result);
                  r.readAsText(f);
                }
              }}
              style={{border:`1px dashed ${surukle?'#378ADD':'#d1d5db'}`,borderRadius:'10px',padding:'24px',textAlign:'center',background:surukle?'#E6F1FB':'#f9fafb',marginBottom:'16px',transition:'all .2s',cursor:'pointer'}}
              onClick={()=>document.getElementById('dosyaInput').click()}
            >
              {dosyaAd ? (
                <div>
                  <div style={{fontSize:'28px',marginBottom:'8px'}}>✅</div>
                  <div style={{fontSize:'13px',fontWeight:'500',color:'#3B6D11',marginBottom:'4px'}}>{dosyaAd}</div>
                  <div style={{fontSize:'12px',color:'#9ca3af'}}>Dosya yüklendi · Değiştirmek için tıkla</div>
                </div>
              ) : (
                <div>
                  <div style={{fontSize:'28px',marginBottom:'8px'}}>📄</div>
                  <div style={{fontSize:'13px',fontWeight:'500',color:'#111',marginBottom:'4px'}}>PDF, DOCX veya TXT sürükle bırak</div>
                  <div style={{fontSize:'12px',color:'#9ca3af'}}>veya tıkla ve seç</div>
                </div>
              )}
              <input id="dosyaInput" type="file" accept=".pdf,.docx,.txt" onChange={dosyaSec} style={{display:'none'}}/>
            </div>

            {/* METİN ALANI */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontSize:'12px',fontWeight:'500',color:'#6b7280',marginBottom:'8px'}}>Ya da metni buraya yapıştır</div>
              <textarea
                value={metin}
                onChange={e=>setMetin(e.target.value)}
                placeholder="Ders notunu buraya yapıştır..."
                rows={5}
                style={{width:'100%',padding:'12px',borderRadius:'8px',border:`0.5px solid ${metin?'#378ADD':'#d1d5db'}`,fontSize:'13px',color:'#111',outline:'none',resize:'none',lineHeight:'1.7',boxSizing:'border-box',fontFamily:'sans-serif',transition:'border-color .2s'}}
              />
              {metin && (
                <div style={{fontSize:'11px',color:'#6b7280',marginTop:'4px'}}>
                  {metin.length} karakter · {Math.ceil(metin.split(' ').length)} kelime
                </div>
              )}
            </div>

            {/* FORMAT SEÇİMİ */}
            <div style={{marginBottom:'20px'}}>
              <div style={{fontSize:'12px',fontWeight:'500',color:'#6b7280',marginBottom:'8px'}}>Çıktı formatı seç</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'8px'}}>
                {formatlar.map(f=>(
                  <button key={f.id} onClick={()=>setSeciliFormat(f.id)}
                    style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',padding:'12px 8px',borderRadius:'10px',border:seciliFormat===f.id?'2px solid #378ADD':'0.5px solid #e5e7eb',background:seciliFormat===f.id?'#E6F1FB':'#fff',cursor:'pointer',transition:'all .15s'}}>
                    <span style={{fontSize:'20px'}}>{f.ikon}</span>
                    <span style={{fontSize:'12px',fontWeight:seciliFormat===f.id?'500':'400',color:seciliFormat===f.id?'#185FA5':'#6b7280'}}>{f.label}</span>
                  </button>
                ))}
              </div>
              <div style={{fontSize:'11px',color:'#9ca3af',marginTop:'8px'}}>
                {seciliFormat==='hepsi' && '✨ Metin, ses ve slayt formatlarının hepsi üretilecek'}
                {seciliFormat==='metin' && '📝 Sadece metin formatında dönüştürülecek'}
                {seciliFormat==='ses' && '🎧 Ses anlatımı olarak üretilecek — ElevenLabs API gerekli'}
                {seciliFormat==='slayt' && '📊 Slayt formatında hazırlanacak'}
              </div>
            </div>

            {/* DÖNÜŞTÜR BUTONU */}
            <button
              onClick={donustur}
              disabled={!metin && !dosyaAd}
              style={{width:'100%',fontSize:'14px',fontWeight:'500',padding:'14px',borderRadius:'10px',background:(!metin&&!dosyaAd)?'#f3f4f6':'#378ADD',color:(!metin&&!dosyaAd)?'#9ca3af':'#042C53',border:'none',cursor:(!metin&&!dosyaAd)?'not-allowed':'pointer',transition:'all .2s',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}
            >
              {yukleniyor ? (
                <>
                  <span>⏳</span>
                  <span>Tip {kullaniciTip} · {kullaniciTipAd} versiyonu hazırlanıyor...</span>
                </>
              ) : (
                <>
                  <span>⚡</span>
                  <span>
                    {(!metin&&!dosyaAd)
                      ? 'Not yükle veya metin yapıştır'
                      : `Tip ${kullaniciTip} · ${kullaniciTipAd} versiyonuna dönüştür`}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* GEÇMİŞ NOTLAR */}
          <div style={{background:'#fff',borderRadius:'12px',border:'0.5px solid #e5e7eb',padding:'24px'}}>
            <h2 style={{fontSize:'16px',fontWeight:'500',color:'#111',marginBottom:'16px'}}>Geçmiş notlar</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {gecmisNotlar.map(n=>(
                <div key={n.id} onClick={()=>router.push('/sonuc')}
                  style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 16px',borderRadius:'8px',border:'0.5px solid #e5e7eb',cursor:'pointer',background:'#fff',transition:'background .15s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#f9fafb'}
                  onMouseLeave={e=>e.currentTarget.style.background='#fff'}
                >
                  <div style={{width:'36px',height:'36px',borderRadius:'8px',background:'#E6F1FB',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',flexShrink:0}}>📄</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:'13px',fontWeight:'500',color:'#111',marginBottom:'2px'}}>{n.baslik}</div>
                    <div style={{fontSize:'11px',color:'#6b7280'}}>{n.ders} · {n.tarih}</div>
                  </div>
                  <div style={{display:'flex',gap:'4px'}}>
                    {n.formatlar.map(f=>(
                      <span key={f} style={{fontSize:'10px',padding:'2px 8px',borderRadius:'10px',background:'#f3f4f6',color:'#6b7280'}}>{f}</span>
                    ))}
                  </div>
                  <span style={{fontSize:'14px',color:'#9ca3af'}}>→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}