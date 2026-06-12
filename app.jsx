/* ════════════════════════════════════════════
   StayManager Pro — Application Logic (React/JSX)
   Compiled in-browser by Babel Standalone.
   ════════════════════════════════════════════ */

const { useState, useEffect, useCallback, useRef, useMemo } = React;

/* ══════════ SVG ICONS ══════════ */
const ICONS = {
  home: <><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></>,
  calendar: <><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></>,
  list: <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></>,
  login: <><path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></>,
  logout: <><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></>,
  chart: <><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></>,
  clock: <><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></>,
  cog: <><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></>,
  plus: <><path d="M12 4v16m8-8H4"/></>,
  x: <><path d="M6 18L18 6M6 6l12 12"/></>,
  edit: <><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></>,
  trash: <><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></>,
  users: <><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></>,
  upload: <><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></>,
  check: <><path d="M5 13l4 4L19 7"/></>,
  eye: <><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></>,
  eyeOff: <><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></>,
  db: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
  sun: <><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></>,
  moon: <><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></>,
  search: <><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></>,
  lock: <><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></>,
  money: <><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></>,
  chevL: <><path d="M15 19l-7-7 7-7"/></>,
  chevR: <><path d="M9 5l7 7-7 7"/></>,
  pass: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M15 8h2M15 12h2M9 14s.5-2 3-2h1"/></>,
  warn: <><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></>,
  refresh: <><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></>,
  cloud: <><path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></>,
  tag: <><path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></>,
  history: <><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/><path d="M3.05 11A9 9 0 016 4.5"/></>,
  key: <><path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></>,
  building: <><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></>,
  link: <><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></>,
  shield: <><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></>,
};

const Ic = ({ n, sz=16, style={}, cls='' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={sz} height={sz} fill="none" viewBox="0 0 24 24"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    style={{display:'inline-flex',flexShrink:0,...style}} className={cls}>
    {ICONS[n] || <path d="M12 12h.01"/>}
  </svg>
);

/* ══════════ UTILS ══════════ */
const toDay = () => new Date().toISOString().split('T')[0];
const fmt = d => d ? new Date(d+'T12:00:00').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) : '—';
const $$ = v => `$${parseFloat(v||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const ini = n => n ? n.trim().split(/\s+/).map(p=>p[0]).join('').toUpperCase().slice(0,2) : '?';
const uid = () => `R${Date.now().toString(36).toUpperCase().slice(-6)}`;
const MNS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DSH = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const nightsBetween = (ci,co) => (!ci||!co) ? 0 : Math.max(0, Math.round((new Date(co)-new Date(ci))/86400000));

const STATUS = {
  pending:{l:'Pending',c:'bgw'},
  confirmed:{l:'Confirmed',c:'bgi'},
  checkedin:{l:'Checked In',c:'bgs'},
  checkedout:{l:'Checked Out',c:'bgn'},
  cancelled:{l:'Cancelled',c:'bge'},
};
const EVT_BG = s=>({confirmed:'rgba(29,78,216,.14)',checkedin:'rgba(21,128,61,.14)',pending:'rgba(180,83,9,.14)',checkedout:'rgba(107,114,128,.10)'}[s]||'rgba(107,114,128,.10)');
const EVT_TX = s=>({confirmed:'#1E40AF',checkedin:'#15803D',pending:'#B45309',checkedout:'var(--txt3)'}[s]||'var(--txt3)');
const EVT_BDR = s=>({confirmed:'#3B82F6',checkedin:'#22C55E',pending:'#F59E0B',checkedout:'#9CA3AF'}[s]||'#9CA3AF');

/* ══════════ SEED DATA ══════════ */
const makeDays = n => { const d=new Date(); d.setDate(d.getDate()+n); return d.toISOString().split('T')[0]; };
const seedRes = () => [
  {id:'R001',name:'James Hartley',checkIn:makeDays(-1),checkInTime:'14:00',checkOut:makeDays(2),checkOutTime:'12:00',guests:2,deposit:300,total:850,discount:0,discType:'pct',notes:'Honeymoon — sea view requested',status:'checkedin',room:'Suite 101',passport:'',createdAt:makeDays(-2)},
  {id:'R002',name:'Lena Müller',checkIn:toDay(),checkInTime:'15:00',checkOut:makeDays(6),checkOutTime:'11:00',guests:4,deposit:500,total:1920,discount:0,discType:'pct',notes:'Late checkout requested',status:'confirmed',room:'Chalet A',passport:'',createdAt:makeDays(-1)},
  {id:'R003',name:'Ahmad Al-Rashid',checkIn:makeDays(1),checkInTime:'13:00',checkOut:makeDays(5),checkOutTime:'12:00',guests:1,deposit:150,total:380,discount:0,discType:'pct',notes:'',status:'pending',room:'Room 203',passport:'',createdAt:toDay()},
  {id:'R004',name:'Sophie Martin',checkIn:makeDays(-30),checkInTime:'16:00',checkOut:makeDays(-26),checkOutTime:'11:00',guests:2,deposit:200,total:440,discount:0,discType:'pct',notes:'Early bird',status:'checkedout',room:'Room 102',passport:'',createdAt:makeDays(-32)},
  {id:'R005',name:'Carlos Rivera',checkIn:makeDays(3),checkInTime:'14:00',checkOut:makeDays(8),checkOutTime:'11:00',guests:3,deposit:400,total:1000,discount:100,discType:'fixed',notes:'Pool view preferred',status:'confirmed',room:'Airbnb Loft',passport:'',createdAt:toDay()},
];
const seedRooms = () => [
  {id:'rm1',name:'Suite 101',type:'hotel',price:220,capacity:2,specs:'King bed · Jacuzzi · Sea view · WiFi',status:'occupied'},
  {id:'rm2',name:'Room 102',type:'hotel',price:110,capacity:2,specs:'Queen bed · City view · WiFi',status:'available'},
  {id:'rm3',name:'Room 203',type:'hotel',price:95,capacity:1,specs:'Single bed · Garden view',status:'available'},
  {id:'rm4',name:'Chalet A',type:'chalet',price:320,capacity:6,specs:'3 bedrooms · Private pool · BBQ',status:'occupied'},
  {id:'rm5',name:'Airbnb Loft',type:'airbnb',price:200,capacity:4,specs:'2 bedrooms · Kitchen · Rooftop',status:'available'},
];
const seedUsers = () => [
  {id:'u1',name:'Miguel',email:'miguel@staymanager.com',role:'admin',password:'D0022b0c0cf53@$'},
  {id:'u2',name:'Front Desk',email:'desk@staymanager.com',role:'staff',password:'desk123'},
];

/* ══════════ LOCAL STORAGE ══════════ */
const useLS = (k, seed) => {
  const [v,sv] = useState(()=>{try{const s=localStorage.getItem(k);return s?JSON.parse(s):seed();}catch{return seed();}});
  const set = useCallback(val=>{sv(val);localStorage.setItem(k,JSON.stringify(val));},[k]);
  return [v,set];
};

/* ══════════ GOOGLE SHEETS API ══════════ */
const SheetsAPI = {
  async call(url, action, payload={}) {
    if (!url) return { success: false, error: 'No URL configured' };
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action, ...payload }),
      });
      return JSON.parse(await res.text());
    } catch(e) {
      try {
        const params = new URLSearchParams({ action, ...Object.fromEntries(
          Object.entries(payload).map(([k,v])=>[k,typeof v==='object'?JSON.stringify(v):v])
        )});
        const res2 = await fetch(`${url}?${params}`);
        return JSON.parse(await res2.text());
      } catch(e2) { return { success: false, error: e2.message }; }
    }
  },
  ping: (url) => SheetsAPI.call(url,'ping'),
  getReservations: (url) => SheetsAPI.call(url,'getReservations'),
  getRooms: (url) => SheetsAPI.call(url,'getRooms'),
  getUsers: (url) => SheetsAPI.call(url,'getUsers'),
  saveReservation: (url,r) => SheetsAPI.call(url,'addReservation',{reservation:r}),
  updateReservation: (url,r) => SheetsAPI.call(url,'updateReservation',{reservation:r}),
  deleteReservation: (url,id) => SheetsAPI.call(url,'deleteReservation',{id}),
  saveRoom: (url,r) => SheetsAPI.call(url,'addRoom',{room:r}),
  updateRoom: (url,r) => SheetsAPI.call(url,'updateRoom',{room:r}),
  deleteRoom: (url,id) => SheetsAPI.call(url,'deleteRoom',{id}),
  saveUser: (url,u) => SheetsAPI.call(url,'addUser',{user:u}),
  updateUser: (url,u) => SheetsAPI.call(url,'updateUser',{user:u}),
  deleteUser: (url,id) => SheetsAPI.call(url,'deleteUser',{id}),
};

/* ══════════ APP CONTEXT ══════════ */
const AppCtx = React.createContext({});

/* ══════════ ADMIN GATE ══════════ */
const AdminGate = ({ onOk, onClose }) => {
  const [pw,setPw]=useState(''); const [show,setShow]=useState(false); const [err,setErr]=useState('');
  const go=e=>{e.preventDefault(); if(pw==='D0022b0c0cf53@$'||pw==='admin123') onOk(); else setErr('Incorrect admin password.');};
  return (
    <div className="ov">
      <div className="mo" style={{maxWidth:380}}>
        <div className="mo-h"><span className="mo-t" style={{display:'flex',alignItems:'center',gap:8}}><Ic n="shield" sz={18}/>Admin Verification</span><button className="ib" onClick={onClose}><Ic n="x"/></button></div>
        <form className="mo-b" onSubmit={go}>
          <p style={{fontSize:13,color:'var(--txt2)',marginBottom:16,lineHeight:1.65}}>Enter the administrator password to modify this user account.</p>
          {err && <div className="al al-e"><Ic n="warn"/><span>{err}</span></div>}
          <div className="fg"><label>Admin Password</label>
            <div style={{position:'relative'}}>
              <input type={show?'text':'password'} value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" autoFocus style={{paddingRight:38}}/>
              <button type="button" onClick={()=>setShow(!show)} style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'var(--txt3)',display:'flex'}}><Ic n={show?'eyeOff':'eye'} sz={15}/></button>
            </div>
          </div>
          <button type="submit" className="btn bp" style={{width:'100%',justifyContent:'center',padding:'10px'}}>Verify &amp; Continue</button>
        </form>
      </div>
    </div>
  );
};

/* ══════════ LOGIN ══════════ */
const Login = ({ users }) => {
  const [em,setEm]=useState(''); const [pw,setPw]=useState(''); const [show,setShow]=useState(false); const [err,setErr]=useState('');
  const { setCurrentUser } = React.useContext(AppCtx);
  const go=e=>{
    e.preventDefault();
    const u=users.find(u=>u.email===em&&u.password===pw);
    if(u) setCurrentUser(u); else setErr('Invalid email or password.');
  };
  return (
    <div className="lw">
      <div className="lw-photo">
        <div className="lw-photo-caption">
          <h2>Welcome Back</h2>
          <p>Your property at a glance — sign in to continue</p>
        </div>
      </div>
      <div className="lw-form-side">
        <div className="lb">
          <div className="ll">
            <div className="ll-icon"><Ic n="building" sz={26} style={{color:'#fff'}}/></div>
            <h1>StayManager</h1>
            <p>Professional Hospitality Management</p>
          </div>
          {err && <div className="al al-e" style={{marginBottom:14}}><Ic n="warn"/><span>{err}</span></div>}
          <form onSubmit={go}>
            <div className="fg"><label>Email Address</label><input type="email" value={em} onChange={e=>setEm(e.target.value)} placeholder="your@email.com" required/></div>
            <div className="fg"><label>Password</label>
              <div style={{position:'relative'}}>
                <input type={show?'text':'password'} value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" required style={{paddingRight:38}}/>
                <button type="button" onClick={()=>setShow(!show)} style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,.4)',display:'flex'}}><Ic n={show?'eyeOff':'eye'} sz={15}/></button>
              </div>
            </div>
            <button type="submit" className="btn bp" style={{width:'100%',justifyContent:'center',padding:'11px',marginTop:4,fontSize:14}}>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

/* ══════════ RESERVATION FORM ══════════ */
const ResForm = ({ allRes, rooms, onSave, onClose, initial }) => {
  const blank = {id:uid(),name:'',checkIn:toDay(),checkInTime:'14:00',checkOut:'',checkOutTime:'12:00',guests:1,deposit:0,total:0,discount:0,discType:'pct',notes:'',status:'pending',room:'',passport:'',createdAt:toDay()};
  const [f,setF] = useState(initial ? {...blank,...initial} : blank);
  const [img,setImg] = useState(initial?.passport||'');
  const [discType,setDiscType] = useState(initial?.discType||'pct');
  const [manualTotal,setManualTotal] = useState(false);
  const [conflict,setConflict] = useState(null);
  const [saving,setSaving] = useState(false);
  const fr = useRef();

  const s = (k,v) => setF(p=>({...p,[k]:v}));
  const nights = nightsBetween(f.checkIn, f.checkOut);
  const selRoom = rooms.find(r=>r.name===f.room);
  const basePrice = selRoom ? selRoom.price * nights : 0;
  const discAmt = discType==='pct'
    ? Math.round(basePrice*(f.discount||0)/100*100)/100
    : Math.min(+(f.discount||0), basePrice);
  const calcTotal = Math.max(0, Math.round((basePrice-discAmt)*100)/100);

  useEffect(()=>{
    if(!manualTotal && selRoom && nights>0) s('total', calcTotal);
  }, [f.room, f.checkIn, f.checkOut, f.discount, discType, manualTotal]);

  useEffect(()=>{
    if(!f.room||!f.checkIn||!f.checkOut||f.checkIn>=f.checkOut){setConflict(null);return;}
    const clash=(allRes||[]).find(r=>{
      if(r.id===f.id) return false;
      if(r.room!==f.room) return false;
      if(r.status==='cancelled'||r.status==='checkedout') return false;
      return f.checkIn<r.checkOut && f.checkOut>r.checkIn;
    });
    setConflict(clash||null);
  },[f.room,f.checkIn,f.checkOut,allRes]);

  const hf = e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=ev=>{setImg(ev.target.result);s('passport',ev.target.result);};r.readAsDataURL(file);};

  const save = async ()=>{
    if(!f.name) return alert('Guest name is required.');
    if(!f.checkIn||!f.checkOut) return alert('Check-in and check-out dates are required.');
    if(f.checkIn>=f.checkOut) return alert('Check-out must be after check-in.');
    if(conflict) return alert(`Room conflict: ${f.room} is already booked by ${conflict.name} (${conflict.checkIn} → ${conflict.checkOut}).`);
    setSaving(true);
    onSave({...f, passport:img, discType});
    setSaving(false);
  };

  return (
    <div className="ov">
      <div className="mo">
        <div className="mo-h">
          <span className="mo-t">{initial?'Edit Reservation':'New Reservation'}</span>
          <button className="ib" onClick={onClose}><Ic n="x"/></button>
        </div>
        <div className="mo-b">
          {conflict && (
            <div className="al al-e">
              <Ic n="warn" sz={16}/>
              <div><strong>Room already reserved!</strong><br/>
                <span style={{fontSize:12}}><strong>{f.room}</strong> is booked by <strong>{conflict.name}</strong> from {fmt(conflict.checkIn)} to {fmt(conflict.checkOut)}. Choose different dates or another room.</span>
              </div>
            </div>
          )}
          <div className="fg2">
            <div className="fg ff"><label>Guest Full Name *</label><input value={f.name} onChange={e=>s('name',e.target.value)} placeholder="Full name"/></div>
            <div className="fg">
              <label>Room / Unit</label>
              <select value={f.room} onChange={e=>{s('room',e.target.value);setManualTotal(false);}}>
                <option value="">Select a room…</option>
                {rooms.map(r=><option key={r.id} value={r.name}>{r.name} · {r.type} · ${r.price}/night · cap {r.capacity}</option>)}
              </select>
              {selRoom && <p style={{fontSize:11,color:'var(--txt3)',marginTop:3}}>{selRoom.specs}</p>}
            </div>
            <div className="fg">
              <label>Number of Guests</label>
              <input type="number" min={1} max={selRoom?.capacity||99} value={f.guests} onChange={e=>s('guests',+e.target.value)}/>
              {selRoom && f.guests > selRoom.capacity && <p style={{fontSize:11,color:'var(--er)',marginTop:3}}>⚠ Exceeds room capacity ({selRoom.capacity})</p>}
            </div>
            <div className="fg"><label>Check-in Date *</label><input type="date" value={f.checkIn} onChange={e=>{s('checkIn',e.target.value);setManualTotal(false);}}/></div>
            <div className="fg"><label>Check-in Time</label><input type="time" value={f.checkInTime} onChange={e=>s('checkInTime',e.target.value)}/></div>
            <div className="fg"><label>Check-out Date *</label><input type="date" value={f.checkOut} onChange={e=>{s('checkOut',e.target.value);setManualTotal(false);}}/></div>
            <div className="fg"><label>Check-out Time</label><input type="time" value={f.checkOutTime} onChange={e=>s('checkOutTime',e.target.value)}/></div>

            {selRoom && nights > 0 && (
              <div className="fg ff">
                <div className="pbox">
                  <div className="pbox-grid">
                    <div><div className="pbox-label">Rate / Night</div><div className="pbox-val">${selRoom.price}</div></div>
                    <div><div className="pbox-label">Nights</div><div className="pbox-val">{nights}</div></div>
                    <div><div className="pbox-label">Base Total</div><div className="pbox-val">${basePrice.toFixed(2)}</div></div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',marginBottom:10}}>
                    <span style={{fontSize:12,fontWeight:500,color:'var(--txt2)'}}>Discount:</span>
                    <div className="disc-toggle">
                      <button type="button" onClick={()=>{setDiscType('pct');setManualTotal(false);}} style={{background:discType==='pct'?'var(--gold)':'var(--surf)',color:discType==='pct'?'var(--navy)':'var(--txt2)'}}>%</button>
                      <button type="button" onClick={()=>{setDiscType('fixed');setManualTotal(false);}} style={{background:discType==='fixed'?'var(--gold)':'var(--surf)',color:discType==='fixed'?'var(--navy)':'var(--txt2)'}}>$</button>
                    </div>
                    <input type="number" min={0} max={discType==='pct'?100:basePrice} step={discType==='pct'?1:0.01} value={f.discount||0}
                      onChange={e=>{s('discount',+e.target.value);setManualTotal(false);}} style={{width:110,flexShrink:0}} placeholder={discType==='pct'?'0 %':'0.00'}/>
                    {(f.discount||0)>0 && <span style={{fontSize:12,color:'var(--ok)',fontWeight:500}}>− ${discAmt.toFixed(2)}{discType==='pct'?` (${f.discount}%)`:''}</span>}
                  </div>
                  <div className="price-total">
                    <span style={{fontSize:13,color:'var(--txt2)'}}>Calculated total</span>
                    <span style={{fontFamily:'var(--fd)',fontSize:24,fontWeight:700,color:'var(--gold-dk)'}}>${calcTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="fg">
              <label>Deposit ($)</label>
              <input type="number" min={0} step={0.01} value={f.deposit} onChange={e=>s('deposit',+e.target.value)}/>
            </div>
            <div className="fg">
              <label>Total Payment ($){manualTotal && <span style={{fontSize:10.5,color:'var(--wn)',marginLeft:6}}>⚠ Manual override</span>}</label>
              <input type="number" min={0} step={0.01} value={f.total} onChange={e=>{s('total',+e.target.value);setManualTotal(true);}} style={{borderColor:manualTotal?'var(--wn)':''}}/>
            </div>
            <div className="fg">
              <label>Status</label>
              <select value={f.status} onChange={e=>s('status',e.target.value)}>
                {Object.entries(STATUS).map(([k,v])=><option key={k} value={k}>{v.l}</option>)}
              </select>
            </div>
            <div className="fg ff"><label>Notes</label><textarea value={f.notes} onChange={e=>s('notes',e.target.value)} placeholder="Special requests, preferences…"/></div>
          </div>
          <div className="dv_"/>
          <p style={{fontSize:12.5,fontWeight:500,color:'var(--txt2)',marginBottom:9,display:'flex',alignItems:'center',gap:7}}><Ic n="pass" sz={14}/>Passport / ID Document</p>
          <input type="file" ref={fr} accept="image/*" onChange={hf}/>
          <div className="up-area" onClick={()=>fr.current.click()}>
            {img ? <img src={img} alt="Passport"/> : <>
              <Ic n="upload" sz={26} style={{margin:'0 auto 8px',display:'block',color:'var(--txt3)'}}/>
              <p style={{fontSize:13,color:'var(--txt3)'}}>Click to upload passport or ID scan</p>
              <p style={{fontSize:11,color:'var(--txt3)',marginTop:3}}>JPG, PNG</p>
            </>}
          </div>
          {img && <button className="btn bg_ btn-sm" style={{marginTop:7}} onClick={()=>{setImg('');s('passport','');}}>Remove photo</button>}
        </div>
        <div className="mo-f">
          <button className="btn bg_" onClick={onClose}>Cancel</button>
          <button className="btn bp" onClick={save} disabled={saving||!!conflict}>
            {saving?'Saving…':<><Ic n="check" sz={14}/>Save Reservation</>}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ══════════ DASHBOARD ══════════ */
const Dashboard = ({ res, rooms, onNewRes }) => {
  const t = toDay(), now = new Date();
  const inH = res.filter(r=>r.status==='checkedin');
  const arr = res.filter(r=>r.checkIn===t && !['checkedin','checkedout','cancelled'].includes(r.status));
  const dep = res.filter(r=>r.checkOut===t && r.status==='checkedin');
  const mRev = res.filter(r=>{const d=new Date(r.checkOut||'2000-01-01');return r.status==='checkedout'&&d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();}).reduce((s,r)=>s+(+r.total||0),0);
  const avail = rooms.filter(r=>r.status==='available').length;
  const occPct = rooms.length ? Math.round(((rooms.length-avail)/rooms.length)*100) : 0;
  const upcoming = res.filter(r=>r.checkIn>t&&r.status!=='cancelled').sort((a,b)=>a.checkIn.localeCompare(b.checkIn)).slice(0,6);
  const C = 2*Math.PI*34;
  const d7 = Array.from({length:7},(_,i)=>makeDays(i));
  const rmEvts = rm => res.filter(r=>r.room===rm.name&&!['cancelled','checkedout'].includes(r.status));

  return (
    <div>
      {/* ── WELCOME BANNER ── */}
      <div className="dash-welcome">
        <div className="dw-text" style={{position:'relative',zIndex:1}}>
          <h2>Good {now.getHours()<12?'Morning':now.getHours()<18?'Afternoon':'Evening'} 👋</h2>
          <p>Here's what's happening at your property today,&nbsp;{MNS[now.getMonth()]} {now.getDate()}, {now.getFullYear()}</p>
          <button className="btn bp" style={{marginTop:14,fontSize:13}} onClick={onNewRes}><Ic n="plus" sz={14}/>New Reservation</button>
        </div>
        <div className="dw-stats">
          <div className="dw-stat"><div className="dw-stat-n">{inH.length}</div><div className="dw-stat-l">In-House</div></div>
          <div style={{width:1,background:'rgba(255,255,255,.1)',alignSelf:'stretch'}}/>
          <div className="dw-stat"><div className="dw-stat-n">{arr.length}</div><div className="dw-stat-l">Arriving</div></div>
          <div style={{width:1,background:'rgba(255,255,255,.1)',alignSelf:'stretch'}}/>
          <div className="dw-stat"><div className="dw-stat-n">{dep.length}</div><div className="dw-stat-l">Departing</div></div>
          <div style={{width:1,background:'rgba(255,255,255,.1)',alignSelf:'stretch'}}/>
          <div className="dw-stat"><div className="dw-stat-n" style={{fontSize:22}}>{occPct}%</div><div className="dw-stat-l">Occupancy</div></div>
        </div>
      </div>

      {/* ── HERO STATS ── */}
      <div className="hero">
        <div className="hc" style={{color:'#16A34A'}}>
          <div className="hc-icon" style={{background:'rgba(22,163,74,.12)'}}><Ic n="users" sz={19} style={{color:'#16A34A'}}/></div>
          <div className="hc-n">{inH.length}</div><div className="hc-l">In House</div>
          <div className="hc-sub" style={{color:'#16A34A'}}>{inH.reduce((s,r)=>s+(+r.guests||0),0)} guests total</div>
        </div>
        <div className="hc" style={{color:'#2563EB'}}>
          <div className="hc-icon" style={{background:'rgba(37,99,235,.12)'}}><Ic n="login" sz={19} style={{color:'#2563EB'}}/></div>
          <div className="hc-n">{arr.length}</div><div className="hc-l">Arriving Today</div>
          <div className="hc-sub" style={{color:'#2563EB'}}>expected check-ins</div>
        </div>
        <div className="hc" style={{color:'#DC2626'}}>
          <div className="hc-icon" style={{background:'rgba(220,38,38,.12)'}}><Ic n="logout" sz={19} style={{color:'#DC2626'}}/></div>
          <div className="hc-n">{dep.length}</div><div className="hc-l">Departing Today</div>
          <div className="hc-sub" style={{color:'#DC2626'}}>due checkouts</div>
        </div>
        <div className="hc" style={{color:'var(--gold-dk)'}}>
          <div className="hc-icon" style={{background:'rgba(201,168,76,.14)'}}><Ic n="money" sz={19} style={{color:'var(--gold-dk)'}}/></div>
          <div className="hc-n" style={{fontSize:22}}>{$$(mRev)}</div><div className="hc-l">Monthly Revenue</div>
          <div className="hc-sub" style={{color:'var(--gold-dk)'}}>{MNS[now.getMonth()]} {now.getFullYear()}</div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 290px',gap:16,marginBottom:16}}>
        {/* ── 7-DAY TIMELINE ── */}
        <div className="tl">
          <div className="tl-hdr">
            <span style={{fontFamily:'var(--fd)',fontSize:15,fontWeight:600,color:'var(--txt)'}}>7-Day Room Timeline</span>
            <span style={{fontSize:11.5,color:'var(--txt3)'}}>{fmt(t)} — {fmt(d7[6])}</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'140px repeat(7,1fr)',background:'var(--surf2)',borderBottom:'1px solid var(--brd)'}}>
            <div style={{padding:'7px 12px',borderRight:'1px solid var(--brd)',fontSize:9.5,color:'var(--txt3)',fontWeight:600,textTransform:'uppercase',letterSpacing:.9}}>Room</div>
            {d7.map(ds=>(
              <div key={ds} style={{padding:'7px 4px',textAlign:'center',borderRight:'1px solid var(--brd)',fontSize:9.5,fontWeight:600,color:ds===t?'var(--gold)':'var(--txt3)',textTransform:'uppercase',letterSpacing:.5}}>
                {DSH[new Date(ds+'T12:00:00').getDay()]}<br/>
                <span style={{fontSize:11,fontWeight:700,opacity:.85}}>{new Date(ds+'T12:00:00').getDate()}</span>
              </div>
            ))}
          </div>
          {rooms.map(rm=>{
            const rr=rmEvts(rm);
            return (
              <div key={rm.id} className="tl-row" style={{gridTemplateColumns:'140px repeat(7,1fr)'}}>
                <div className="tl-room">{rm.name}<span>{rm.type} · ${rm.price}/n</span></div>
                {d7.map(ds=>{
                  const ev=rr.find(r=>ds>=r.checkIn&&ds<r.checkOut);
                  const isFirst=ev&&ev.checkIn===ds;
                  return (
                    <div key={ds} className="tl-day" style={{background:ev?EVT_BG(ev.status):'transparent',color:ev?EVT_TX(ev.status):'var(--brd2)',borderRight:'1px solid var(--brd)',fontSize:9.5,fontWeight:700}}>
                      {isFirst ? ini(ev.name) : ev ? '·' : ''}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="card">
            <div className="card-title">Occupancy</div>
            <div style={{display:'flex',alignItems:'center',gap:16}}>
              <div className="occ">
                <svg width="86" height="86" viewBox="0 0 86 86">
                  <circle cx="43" cy="43" r="34" fill="none" stroke="var(--brd)" strokeWidth="8"/>
                  <circle cx="43" cy="43" r="34" fill="none" stroke="var(--gold)" strokeWidth="8"
                    strokeDasharray={`${(occPct/100)*C} ${C}`} strokeLinecap="round"
                    style={{transform:'rotate(-90deg)',transformOrigin:'center',transition:'stroke-dasharray .5s'}}/>
                </svg>
                <div className="occ-v">{occPct}%</div>
              </div>
              <div>
                <p style={{fontSize:13,color:'var(--txt2)'}}>Rooms occupied</p>
                <p style={{fontFamily:'var(--fd)',fontSize:20,fontWeight:700,color:'var(--txt)',marginTop:2}}>{rooms.length-avail}<span style={{fontSize:13,fontWeight:400,color:'var(--txt3)'}}> / {rooms.length}</span></p>
                <p style={{fontSize:12,color:'var(--txt3)',marginTop:3}}>{avail} available</p>
              </div>
            </div>
          </div>
          <div className="card" style={{flex:1}}>
            <div className="card-title">Upcoming Arrivals</div>
            {upcoming.length===0&&<p style={{fontSize:13,color:'var(--txt3)'}}>No upcoming arrivals.</p>}
            {upcoming.map(r=>(
              <div key={r.id} style={{display:'flex',alignItems:'center',gap:9,padding:'8px 0',borderBottom:'1px solid var(--brd)'}}>
                <div className="gr-ava" style={{width:30,height:30,fontSize:10}}>{ini(r.name)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:500,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.name}</div>
                  <div style={{fontSize:11,color:'var(--txt3)'}}>{r.room||'—'}</div>
                </div>
                <div style={{textAlign:'right',flexShrink:0}}>
                  <div style={{fontSize:12,fontWeight:500}}>{fmt(r.checkIn)}</div>
                  <span className={`bdg ${STATUS[r.status]?.c}`} style={{fontSize:10}}>{STATUS[r.status]?.l}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════ SCHEDULE ══════════ */
const Schedule = ({ res, onNew }) => {
  const [view,setView] = useState('month');
  const [cur,setCur] = useState(new Date());
  const t = toDay();

  const nav = d => {
    setCur(prev => {
      const n = new Date(prev.getTime());
      if(view==='month') n.setMonth(n.getMonth()+d);
      else if(view==='week') n.setDate(n.getDate()+7*d);
      else n.setDate(n.getDate()+d);
      return n;
    });
  };

  const goToday = () => setCur(new Date());

  const headerLabel = () => {
    if(view==='month') return `${MNS[cur.getMonth()]} ${cur.getFullYear()}`;
    if(view==='week'){
      const sw=new Date(cur); sw.setDate(cur.getDate()-cur.getDay());
      const ew=new Date(sw); ew.setDate(sw.getDate()+6);
      return `${sw.toLocaleDateString('en-GB',{day:'numeric',month:'short'})} – ${ew.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}`;
    }
    return cur.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  };

  const MonthView = () => {
    const y=cur.getFullYear(), m=cur.getMonth();
    const first=new Date(y,m,1), last=new Date(y,m+1,0);
    const cells=[];
    for(let i=0;i<first.getDay();i++){ const d=new Date(y,m,1-first.getDay()+i); cells.push({date:d,other:true}); }
    for(let d=1;d<=last.getDate();d++) cells.push({date:new Date(y,m,d),other:false});
    while(cells.length<42) { const d=new Date(y,m+1,cells.length-last.getDate()-first.getDay()+1); cells.push({date:d,other:true}); }
    const getEvts = dt => { const ds=dt.toISOString().split('T')[0]; return res.filter(r=>ds>=r.checkIn&&ds<r.checkOut&&r.status!=='cancelled'); };
    return (
      <div className="cal-wrap">
        <div className="cal-grid">
          {DSH.map(d=><div key={d} className="cal-dlbl">{d}</div>)}
          {cells.map((item,i)=>{
            const ds=item.date.toISOString().split('T')[0];
            const evts=getEvts(item.date);
            return (
              <div key={i} className={`cal-cell${ds===t?' tdy':''}${item.other?' om':''}`}>
                <div className="cal-dt">{item.date.getDate()}</div>
                {evts.slice(0,3).map(ev=>(
                  <div key={ev.id} className="cal-ev" style={{background:EVT_BG(ev.status),color:EVT_TX(ev.status)}}>
                    {ev.name.split(' ')[0]} · {ev.room}
                  </div>
                ))}
                {evts.length>3 && <div className="cal-ev" style={{background:'var(--bg2)',color:'var(--txt3)'}}>+{evts.length-3} more</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const WeekView = () => {
    const sw=new Date(cur); sw.setDate(cur.getDate()-cur.getDay());
    const wd=Array.from({length:7},(_,i)=>{ const d=new Date(sw); d.setDate(sw.getDate()+i); return d; });
    const hrs=Array.from({length:24},(_,i)=>i);
    const fh=h=>h===0?'12 AM':h<12?`${h} AM`:h===12?'12 PM':`${h-12} PM`;
    return (
      <div className="wk-wrap">
        <div className="wk-head">
          <div className="wk-hcell" style={{background:'var(--surf2)'}}/>
          {wd.map(d=>{ const ds=d.toISOString().split('T')[0]; return (
            <div key={ds} className={`wk-hcell${ds===t?' tdy':''}`}>
              {DSH[d.getDay()]}<br/><span style={{fontSize:14,fontWeight:700}}>{d.getDate()}</span>
            </div>
          ); })}
        </div>
        <div className="wk-body">
          {hrs.map(h=>(
            <div key={h} className="wk-row">
              <div className="wk-time">{fh(h)}</div>
              {wd.map(d=>{ const ds=d.toISOString().split('T')[0]; const evts=h===12?res.filter(r=>r.status!=='cancelled'&&ds>=r.checkIn&&ds<r.checkOut):[];
                return (
                  <div key={ds} className={`wk-cell${ds===t?' tdy':''}`}>
                    {evts.map(ev=>(
                      <div key={ev.id} style={{fontSize:9.5,background:EVT_BG(ev.status),color:EVT_TX(ev.status),borderRadius:3,padding:'2px 5px',marginBottom:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontWeight:600}}>
                        {ev.name.split(' ')[0]} · {ev.room}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DayView = () => {
    const ds=cur.toISOString().split('T')[0];
    const evts=res.filter(r=>r.status!=='cancelled'&&ds>=r.checkIn&&ds<r.checkOut);
    const fh=h=>h===0?'12 AM':h<12?`${h} AM`:h===12?'12 PM':`${h-12} PM`;
    return (
      <div className="dv-wrap">
        <div className="dv-head">
          <p style={{fontFamily:'var(--fd)',fontSize:16,fontWeight:600,color:ds===t?'var(--gold)':'var(--txt)'}}>{cur.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p>
          <p style={{fontSize:12.5,color:'var(--txt3)',marginTop:3}}>{evts.length} reservation{evts.length!==1?'s':''} active</p>
        </div>
        {evts.length>0 && (
          <div className="dv-events">
            {evts.map(ev=>(
              <div key={ev.id} className="dv-card" style={{background:EVT_BG(ev.status),borderLeftColor:EVT_BDR(ev.status)}}>
                <p style={{fontSize:13,fontWeight:600,color:EVT_TX(ev.status)}}>{ev.name}</p>
                <p style={{fontSize:11,color:EVT_TX(ev.status),opacity:.85,marginTop:2}}>{ev.room}</p>
                <span className={`bdg ${STATUS[ev.status]?.c}`} style={{fontSize:10,marginTop:6,display:'inline-flex'}}>{STATUS[ev.status]?.l}</span>
              </div>
            ))}
          </div>
        )}
        <div className="dv-slots">
          {Array.from({length:24},(_,h)=>(
            <div key={h} className="dv-row"><div className="dv-time">{fh(h)}</div><div className="dv-content"/></div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="sch-nav">
        <div className="tabs" style={{marginBottom:0}}>
          {['month','week','day'].map(v=>(
            <button key={v} type="button" className={`tab${view===v?' on':''}`}
              onClick={()=>setView(v)}>
              {v.charAt(0).toUpperCase()+v.slice(1)}
            </button>
          ))}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <button type="button" className="cal-nav-btn" onClick={()=>nav(-1)}><Ic n="chevL" sz={14}/></button>
          <span className="cal-nav-label">{headerLabel()}</span>
          <button type="button" className="cal-nav-btn" onClick={()=>nav(1)}><Ic n="chevR" sz={14}/></button>
          <button type="button" className="btn bg_ btn-sm" onClick={goToday}>Today</button>
          <button type="button" className="btn bp btn-sm" style={{marginLeft:2}} onClick={onNew}><Ic n="plus" sz={13}/>New</button>
        </div>
      </div>
      {view==='month' && <MonthView key={`m-${cur.getFullYear()}-${cur.getMonth()}`}/>}
      {view==='week' && <WeekView key={`w-${cur.toISOString()}`}/>}
      {view==='day' && <DayView key={`d-${cur.toISOString()}`}/>}
    </div>
  );
};

/* ══════════ RESERVATIONS LIST ══════════ */
const ResList = ({ res, setRes, rooms }) => {
  const [sf,setSF]=useState(false); const [ei,setEI]=useState(null);
  const [q,setQ]=useState(''); const [fs,setFS]=useState('all');
  const [vp,setVP]=useState(null);
  const { sheetsUrl, addSyncLog } = React.useContext(AppCtx);
  const t=toDay();

  const fil=res.filter(r=>{
    const ms=r.name.toLowerCase().includes(q.toLowerCase())||(r.room||'').toLowerCase().includes(q.toLowerCase())||r.id.toLowerCase().includes(q.toLowerCase());
    const ss=fs==='all'||r.status===fs;
    return ms&&ss;
  });

  const save = async (r) => {
    let updated;
    if(ei) updated=res.map(x=>x.id===r.id?r:x);
    else updated=[...res,r];
    setRes(updated);
    setSF(false); setEI(null);
    if(sheetsUrl) {
      try {
        const fn = ei ? SheetsAPI.updateReservation : SheetsAPI.saveReservation;
        const result = await fn(sheetsUrl, r);
        addSyncLog(result.success?'ok':'error', `${ei?'Updated':'Saved'} reservation ${r.id}`, result.error);
      } catch(e) { addSyncLog('error','Sync failed',e.message); }
    }
  };

  const doCI = async r => {
    const updated=res.map(x=>x.id===r.id?{...x,status:'checkedin'}:x);
    setRes(updated);
    if(sheetsUrl){const result=await SheetsAPI.updateReservation(sheetsUrl,{...r,status:'checkedin'});addSyncLog(result.success?'ok':'error',`Checked in ${r.name}`,result.error);}
  };
  const doCO = async r => {
    const updated=res.map(x=>x.id===r.id?{...x,status:'checkedout'}:x);
    setRes(updated);
    if(sheetsUrl){const result=await SheetsAPI.updateReservation(sheetsUrl,{...r,status:'checkedout'});addSyncLog(result.success?'ok':'error',`Checked out ${r.name}`,result.error);}
  };
  const del = async id => {
    if(!confirm('Delete this reservation?')) return;
    setRes(res.filter(r=>r.id!==id));
    if(sheetsUrl){const result=await SheetsAPI.deleteReservation(sheetsUrl,id);addSyncLog(result.success?'ok':'error',`Deleted reservation ${id}`,result.error);}
  };
  const nights=r=>nightsBetween(r.checkIn,r.checkOut);

  return (
    <div>
      <div className="sh_">
        <span className="st_">All Reservations</span>
        <button className="btn bp" onClick={()=>{setEI(null);setSF(true);}}><Ic n="plus" sz={14}/>New Reservation</button>
      </div>
      <div style={{display:'flex',gap:9,marginBottom:16,flexWrap:'wrap'}}>
        <div style={{position:'relative',flex:'1',minWidth:200}}>
          <Ic n="search" sz={14} style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',color:'var(--txt3)'}}/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name, room, ID…" style={{paddingLeft:32}}/>
        </div>
        <select value={fs} onChange={e=>setFS(e.target.value)} style={{width:'auto',minWidth:155}}>
          <option value="all">All Statuses</option>
          {Object.entries(STATUS).map(([k,v])=><option key={k} value={k}>{v.l}</option>)}
        </select>
      </div>
      <div className="tw">
        <table>
          <thead><tr><th>ID</th><th>Guest</th><th>Room</th><th>Check-in</th><th>Check-out</th><th>Nts</th><th>Guests</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {fil.length===0&&<tr><td colSpan={10} className="empty">No reservations found.</td></tr>}
            {fil.map(r=>{
              const isCI=r.checkIn===t&&r.status==='confirmed';
              const isCO=r.checkOut===t&&r.status==='checkedin';
              return (
                <tr key={r.id}>
                  <td><span style={{fontSize:11,color:'var(--txt3)',fontFamily:'monospace'}}>{r.id}</span></td>
                  <td><div style={{display:'flex',alignItems:'center',gap:8}}><div className="gr-ava" style={{width:28,height:28,fontSize:10}}>{ini(r.name)}</div><span style={{fontWeight:500}}>{r.name}</span></div></td>
                  <td style={{fontSize:13,color:'var(--txt2)'}}>{r.room||'—'}</td>
                  <td><div style={{fontSize:13}}>{fmt(r.checkIn)}</div><div style={{fontSize:10.5,color:'var(--txt3)'}}>{r.checkInTime}</div></td>
                  <td><div style={{fontSize:13}}>{fmt(r.checkOut)}</div><div style={{fontSize:10.5,color:'var(--txt3)'}}>{r.checkOutTime}</div></td>
                  <td style={{textAlign:'center'}}>{nights(r)}</td>
                  <td style={{textAlign:'center'}}>{r.guests}</td>
                  <td><div style={{fontWeight:500}}>{$$(r.total)}</div><div style={{fontSize:11,color:'var(--txt3)'}}>Dep: {$$(r.deposit)}</div></td>
                  <td><span className={`bdg ${STATUS[r.status]?.c}`}>{STATUS[r.status]?.l}</span></td>
                  <td style={{verticalAlign:'bottom'}}>
                    <div style={{display:'flex',flexDirection:'column',gap:6,alignItems:'flex-end'}}>
                      {isCI&&<button className="btn bs_ btn-sm" style={{width:'100%',justifyContent:'center'}} onClick={()=>doCI(r)}><Ic n="login" sz={12}/>Check In</button>}
                      {isCO&&<button className="btn bd btn-sm" style={{width:'100%',justifyContent:'center'}} onClick={()=>doCO(r)}><Ic n="logout" sz={12}/>Check Out</button>}
                      <div style={{display:'flex',gap:4}}>
                        {r.passport&&<button className="ib" title="View Passport" onClick={()=>setVP(r.passport)}><Ic n="eye"/></button>}
                        <button className="ib" title="Edit" onClick={()=>{setEI(r);setSF(true);}}><Ic n="edit"/></button>
                        <button className="ib" title="Delete" style={{color:'var(--er)'}} onClick={()=>del(r.id)}><Ic n="trash"/></button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {sf && <ResForm allRes={res} rooms={rooms} onSave={save} onClose={()=>{setSF(false);setEI(null);}} initial={ei}/>}
      {vp && (
        <div className="ov" onClick={()=>setVP(null)}>
          <div style={{background:'var(--surf)',borderRadius:'var(--rlg)',padding:22,maxWidth:480,width:'100%',border:'1px solid var(--brd)'}} onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
              <span style={{fontFamily:'var(--fd)',fontSize:17,fontWeight:600,display:'flex',alignItems:'center',gap:7}}><Ic n="pass"/>Passport / ID</span>
              <button className="ib" onClick={()=>setVP(null)}><Ic n="x"/></button>
            </div>
            <img src={vp} alt="Passport" style={{width:'100%',borderRadius:'var(--rsm)'}}/>
          </div>
        </div>
      )}
    </div>
  );
};

/* ══════════ CHECK IN ══════════ */
const CheckIn = ({ res, setRes }) => {
  const t=toDay();
  const { sheetsUrl, addSyncLog } = React.useContext(AppCtx);
  const arr=res.filter(r=>r.checkIn===t&&!['checkedin','checkedout','cancelled'].includes(r.status));
  const inH=res.filter(r=>r.status==='checkedin');
  const doCI=async r=>{
    setRes(res.map(x=>x.id===r.id?{...x,status:'checkedin'}:x));
    if(sheetsUrl){const result=await SheetsAPI.updateReservation(sheetsUrl,{...r,status:'checkedin'});addSyncLog(result.success?'ok':'error',`Checked in ${r.name}`);}
  };
  return (
    <div>
      <div className="sg" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
        <div className="sc" style={{borderLeft:'4px solid #2563EB'}}>
          <div className="sl">Arriving Today</div>
          <div className="sv">{arr.length}</div>
          <div className="ss">Pending check-in</div>
        </div>
        <div className="sc" style={{borderLeft:'4px solid #16A34A'}}>
          <div className="sl">In House</div>
          <div className="sv">{inH.length}</div>
          <div className="ss">{inH.reduce((s,r)=>s+(+r.guests||0),0)} guests currently</div>
        </div>
        <div className="sc" style={{borderLeft:'4px solid var(--gold)'}}>
          <div className="sl">Total Guests</div>
          <div className="sv">{inH.reduce((s,r)=>s+(+r.guests||0),0)}</div>
          <div className="ss">across {inH.length} rooms</div>
        </div>
      </div>

      {arr.length>0 && (
        <div style={{marginBottom:22}}>
          <div className="sh_"><span className="st_">Arriving Today</span></div>
          {arr.map(r=>(
            <div key={r.id} className="gr">
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div className="gr-ava">{ini(r.name)}</div>
                <div>
                  <p style={{fontWeight:600,fontSize:14}}>{r.name}</p>
                  <p style={{fontSize:12,color:'var(--txt3)'}}>{r.room} · {r.guests} guests · {r.checkInTime}</p>
                  {r.notes&&<p style={{fontSize:11.5,color:'var(--txt2)',marginTop:2}}>{r.notes}</p>}
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:9}}>
                <div style={{textAlign:'right',marginRight:4}}>
                  <div style={{fontWeight:600}}>{$$(r.total)}</div>
                  <div style={{fontSize:11,color:'var(--txt3)'}}>Dep: {$$(r.deposit)}</div>
                </div>
                <button className="btn bs_" onClick={()=>doCI(r)}><Ic n="login" sz={14}/>Check In</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="sh_"><span className="st_">Currently In-House</span></div>
      {inH.length===0&&<div className="card"><p className="empty">No guests currently checked in.</p></div>}
      {inH.map(r=>(
        <div key={r.id} className="gr">
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div className="gr-ava">{ini(r.name)}</div>
            <div>
              <p style={{fontWeight:600,fontSize:14}}>{r.name}</p>
              <p style={{fontSize:12,color:'var(--txt3)'}}>{r.room} · {r.guests} guests</p>
              <p style={{fontSize:11.5,color:'var(--txt2)'}}>Check-out: {fmt(r.checkOut)} at {r.checkOutTime}</p>
            </div>
          </div>
          <span className="bdg bgs">Checked In</span>
        </div>
      ))}
    </div>
  );
};

/* ══════════ CHECK OUT ══════════ */
const CheckOut = ({ res, setRes }) => {
  const t=toDay();
  const { sheetsUrl, addSyncLog } = React.useContext(AppCtx);
  const dep=res.filter(r=>r.checkOut===t&&r.status==='checkedin');
  const upcoming=res.filter(r=>r.checkOut>t&&r.status==='checkedin').sort((a,b)=>a.checkOut.localeCompare(b.checkOut)).slice(0,8);
  const doCO=async r=>{
    setRes(res.map(x=>x.id===r.id?{...x,status:'checkedout'}:x));
    if(sheetsUrl){const result=await SheetsAPI.updateReservation(sheetsUrl,{...r,status:'checkedout'});addSyncLog(result.success?'ok':'error',`Checked out ${r.name}`);}
  };
  return (
    <div>
      <div className="sg" style={{gridTemplateColumns:'repeat(2,1fr)'}}>
        <div className="sc" style={{borderLeft:'4px solid #DC2626'}}>
          <div className="sl">Departing Today</div>
          <div className="sv">{dep.length}</div>
          <div className="ss">Due checkouts</div>
        </div>
        <div className="sc" style={{borderLeft:'4px solid var(--gold)'}}>
          <div className="sl">Upcoming Departures</div>
          <div className="sv">{upcoming.length}</div>
          <div className="ss">Next 8 checkouts</div>
        </div>
      </div>

      {dep.length>0&&(
        <div style={{marginBottom:22}}>
          <div className="sh_"><span className="st_">Departing Today</span></div>
          {dep.map(r=>(
            <div key={r.id} className="gr">
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div className="gr-ava">{ini(r.name)}</div>
                <div>
                  <p style={{fontWeight:600,fontSize:14}}>{r.name}</p>
                  <p style={{fontSize:12,color:'var(--txt3)'}}>{r.room} · {r.checkOutTime}</p>
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:12,color:'var(--txt2)'}}>Balance due</div>
                  <div style={{fontWeight:700,fontSize:15,color:'var(--er)'}}>{$$((r.total||0)-(r.deposit||0))}</div>
                </div>
                <button className="btn bd" onClick={()=>doCO(r)}><Ic n="logout" sz={14}/>Check Out</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="sh_"><span className="st_">Upcoming Departures</span></div>
      {upcoming.length===0&&<div className="card"><p className="empty">No upcoming departures.</p></div>}
      {upcoming.map(r=>(
        <div key={r.id} className="gr">
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div className="gr-ava">{ini(r.name)}</div>
            <div>
              <p style={{fontWeight:600,fontSize:14}}>{r.name}</p>
              <p style={{fontSize:12,color:'var(--txt3)'}}>{r.room} · Departs {fmt(r.checkOut)}</p>
            </div>
          </div>
          <span className="bdg bgs">In House</span>
        </div>
      ))}
    </div>
  );
};

/* ══════════ REPORTS ══════════ */
const Reports = ({ res }) => {
  const now = new Date();
  const t=toDay();
  const done=res.filter(r=>r.status==='checkedout');
  const todayRev=done.filter(r=>r.checkOut===t).reduce((s,r)=>s+(+r.total||0),0);
  const monthRev=done.filter(r=>{const d=new Date(r.checkOut||'2000');return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();}).reduce((s,r)=>s+(+r.total||0),0);
  const yearRev=done.filter(r=>new Date(r.checkOut||'2000').getFullYear()===now.getFullYear()).reduce((s,r)=>s+(+r.total||0),0);

  const months=Array.from({length:12},(_,i)=>({
    month:MNS[i].slice(0,3),
    rev:done.filter(r=>{const d=new Date(r.checkOut||'2000');return d.getMonth()===i&&d.getFullYear()===now.getFullYear();}).reduce((s,r)=>s+(+r.total||0),0)
  }));
  const maxRev=Math.max(...months.map(m=>m.rev),1);

  const statusCount=Object.keys(STATUS).reduce((acc,k)=>({...acc,[k]:res.filter(r=>r.status===k).length}),{});

  return (
    <div>
      <div className="sg" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
        <div className="sc" style={{borderLeft:'4px solid var(--gold)'}}>
          <div className="sl">Today's Revenue</div>
          <div className="sv" style={{fontSize:22}}>{$$(todayRev)}</div>
          <div className="ss">{done.filter(r=>r.checkOut===t).length} checkouts</div>
        </div>
        <div className="sc" style={{borderLeft:'4px solid #16A34A'}}>
          <div className="sl">Monthly Revenue</div>
          <div className="sv" style={{fontSize:22}}>{$$(monthRev)}</div>
          <div className="ss">{MNS[now.getMonth()]} {now.getFullYear()}</div>
        </div>
        <div className="sc" style={{borderLeft:'4px solid #2563EB'}}>
          <div className="sl">Yearly Revenue</div>
          <div className="sv" style={{fontSize:22}}>{$$(yearRev)}</div>
          <div className="ss">{now.getFullYear()} total</div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16}}>
        <div className="card">
          <div className="card-title">Monthly Revenue — {now.getFullYear()}</div>
          <div style={{display:'flex',alignItems:'flex-end',gap:6,height:160,padding:'0 4px'}}>
            {months.map((m,i)=>(
              <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                <div title={$$(m.rev)} className="chart-bar" style={{width:'100%',height:`${Math.max(4,(m.rev/maxRev)*130)}px`,background:i===now.getMonth()?'var(--gold)':'var(--brd2)'}}/>
                <span style={{fontSize:9,color:'var(--txt3)',fontWeight:600}}>{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Booking Status</div>
          {Object.entries(STATUS).map(([k,v])=>(
            <div key={k} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--brd)'}}>
              <span className={`bdg ${v.c}`}>{v.l}</span>
              <span style={{fontFamily:'var(--fd)',fontSize:18,fontWeight:700,color:'var(--txt)'}}>{statusCount[k]||0}</span>
            </div>
          ))}
          <div style={{marginTop:12,paddingTop:12,borderTop:'1px solid var(--brd)',display:'flex',justifyContent:'space-between'}}>
            <span style={{color:'var(--txt2)',fontSize:13}}>Total</span>
            <span style={{fontFamily:'var(--fd)',fontSize:18,fontWeight:700}}>{res.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════ GUEST HISTORY ══════════ */
const GuestHistory = ({ res }) => {
  const [q,setQ]=useState('');
  const past=res.filter(r=>r.status==='checkedout'||r.status==='cancelled');
  const fil=past.filter(r=>r.name.toLowerCase().includes(q.toLowerCase())||(r.room||'').toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <div className="sh_">
        <span className="st_">Guest History</span>
        <span style={{fontSize:13,color:'var(--txt3)'}}>{past.length} past stays</span>
      </div>
      <div style={{position:'relative',marginBottom:16}}>
        <Ic n="search" sz={14} style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',color:'var(--txt3)'}}/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search guest or room…" style={{paddingLeft:32,maxWidth:360}}/>
      </div>
      <div className="tw">
        <table>
          <thead><tr><th>Guest</th><th>Room</th><th>Check-in</th><th>Check-out</th><th>Nights</th><th>Total Paid</th><th>Status</th><th>Notes</th></tr></thead>
          <tbody>
            {fil.length===0&&<tr><td colSpan={8} className="empty">No guest history found.</td></tr>}
            {fil.sort((a,b)=>(b.checkOut||'').localeCompare(a.checkOut||'')).map(r=>(
              <tr key={r.id}>
                <td><div style={{display:'flex',alignItems:'center',gap:8}}><div className="gr-ava" style={{width:28,height:28,fontSize:10}}>{ini(r.name)}</div><span style={{fontWeight:500}}>{r.name}</span></div></td>
                <td style={{fontSize:13}}>{r.room||'—'}</td>
                <td style={{fontSize:13}}>{fmt(r.checkIn)}</td>
                <td style={{fontSize:13}}>{fmt(r.checkOut)}</td>
                <td style={{textAlign:'center'}}>{nightsBetween(r.checkIn,r.checkOut)}</td>
                <td style={{fontWeight:500}}>{$$(r.total)}</td>
                <td><span className={`bdg ${STATUS[r.status]?.c}`}>{STATUS[r.status]?.l}</span></td>
                <td style={{fontSize:12,color:'var(--txt3)',maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.notes||'—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ══════════ SETTINGS ══════════ */
const SettingsPage = ({ users, setUsers, rooms, setRooms }) => {
  const [tab,setTab]=useState('users');
  const { sheetsUrl, setSheetsUrl, syncState, syncLog, addSyncLog } = React.useContext(AppCtx);

  /* ─ USERS PANEL ─ */
  const UsersPanel = () => {
    const [gateUser,setGateUser]=useState(null);
    const [form,setForm]=useState(null);
    const [fw,setFW]=useState({id:'',name:'',email:'',role:'staff',password:''});
    const [showPw,setShowPw]=useState(false);
    const [err,setErr]=useState('');

    const openEdit = u => { setGateUser(u); };
    const afterGate = () => {
      setGateUser(null);
      setFW({...gateUser});
      setForm('edit');
    };
    const openNew = () => { setFW({id:`u${Date.now()}`,name:'',email:'',role:'staff',password:''}); setForm('new'); };

    const save = async () => {
      if(!fw.name||!fw.email) return setErr('Name and email are required.');
      if(!fw.password) return setErr('Password is required.');
      let updated;
      if(form==='edit') updated=users.map(u=>u.id===fw.id?fw:u);
      else { if(users.find(u=>u.email===fw.email)) return setErr('Email already exists.'); updated=[...users,fw]; }
      setUsers(updated); setForm(null); setErr('');
      if(sheetsUrl){
        const fn=form==='edit'?SheetsAPI.updateUser:SheetsAPI.saveUser;
        const r=await fn(sheetsUrl,fw);
        addSyncLog(r.success?'ok':'error',`${form==='edit'?'Updated':'Created'} user ${fw.name}`,r.error);
      }
    };
    const del = async id => {
      if(!confirm('Delete this user?')) return;
      setUsers(users.filter(u=>u.id!==id));
      if(sheetsUrl){const r=await SheetsAPI.deleteUser(sheetsUrl,id);addSyncLog(r.success?'ok':'error',`Deleted user ${id}`,r.error);}
    };

    return (
      <div>
        <div className="sh_">
          <span style={{fontSize:15,fontWeight:600,color:'var(--txt)'}}>Application Users</span>
          <button className="btn bp" onClick={openNew}><Ic n="plus" sz={14}/>Add User</button>
        </div>
        {users.map(u=>(
          <div key={u.id} className="gr">
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div className="gr-ava" style={{width:36,height:36}}>{ini(u.name)}</div>
              <div>
                <p style={{fontWeight:600,fontSize:14}}>{u.name}</p>
                <p style={{fontSize:12,color:'var(--txt3)'}}>{u.email}</p>
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <span className={`bdg ${u.role==='admin'?'bgg':'bgn'}`}>{u.role}</span>
              <button className="ib" onClick={()=>openEdit(u)}><Ic n="edit"/></button>
              <button className="ib" style={{color:'var(--er)'}} onClick={()=>del(u.id)}><Ic n="trash"/></button>
            </div>
          </div>
        ))}

        {gateUser && <AdminGate onOk={afterGate} onClose={()=>setGateUser(null)}/>}

        {form && (
          <div className="ov">
            <div className="mo" style={{maxWidth:440}}>
              <div className="mo-h"><span className="mo-t">{form==='edit'?'Edit User':'New User'}</span><button className="ib" onClick={()=>{setForm(null);setErr('');}}><Ic n="x"/></button></div>
              <div className="mo-b">
                {err&&<div className="al al-e"><Ic n="warn"/><span>{err}</span></div>}
                <div className="fg"><label>Full Name *</label><input value={fw.name} onChange={e=>setFW(p=>({...p,name:e.target.value}))}/></div>
                <div className="fg"><label>Email *</label><input type="email" value={fw.email} onChange={e=>setFW(p=>({...p,email:e.target.value}))}/></div>
                <div className="fg"><label>Role</label>
                  <select value={fw.role} onChange={e=>setFW(p=>({...p,role:e.target.value}))}>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
                <div className="fg"><label>Password *</label>
                  <div style={{position:'relative'}}>
                    <input type={showPw?'text':'password'} value={fw.password} onChange={e=>setFW(p=>({...p,password:e.target.value}))} style={{paddingRight:38}}/>
                    <button type="button" onClick={()=>setShowPw(!showPw)} style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'var(--txt3)',display:'flex'}}><Ic n={showPw?'eyeOff':'eye'} sz={15}/></button>
                  </div>
                </div>
              </div>
              <div className="mo-f">
                <button className="btn bg_" onClick={()=>{setForm(null);setErr('');}}>Cancel</button>
                <button className="btn bp" onClick={save}><Ic n="check" sz={14}/>Save User</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  /* ─ ROOMS PANEL ─ */
  const RoomsPanel = () => {
    const [form,setForm]=useState(null);
    const [fw,setFW]=useState({id:'',name:'',type:'hotel',price:0,capacity:1,specs:'',status:'available'});
    const [err,setErr]=useState('');

    const openNew = () => setFW({id:`rm${Date.now()}`,name:'',type:'hotel',price:0,capacity:1,specs:'',status:'available'}) || setForm('new');
    const openEdit = r => { setFW({...r}); setForm('edit'); };

    const save = async () => {
      if(!fw.name) return setErr('Room name is required.');
      let updated;
      if(form==='edit') updated=rooms.map(r=>r.id===fw.id?fw:r);
      else updated=[...rooms,fw];
      setRooms(updated); setForm(null); setErr('');
      if(sheetsUrl){
        const fn=form==='edit'?SheetsAPI.updateRoom:SheetsAPI.saveRoom;
        const r=await fn(sheetsUrl,fw);
        addSyncLog(r.success?'ok':'error',`${form==='edit'?'Updated':'Created'} room ${fw.name}`,r.error);
      }
    };
    const del = async id => {
      if(!confirm('Delete this room?')) return;
      setRooms(rooms.filter(r=>r.id!==id));
      if(sheetsUrl){const r=await SheetsAPI.deleteRoom(sheetsUrl,id);addSyncLog(r.success?'ok':'error',`Deleted room ${id}`,r.error);}
    };

    const TYPE_COLOR={'hotel':'var(--in)','airbnb':'#7C3AED','chalet':'#B45309'};

    return (
      <div>
        <div className="sh_">
          <span style={{fontSize:15,fontWeight:600,color:'var(--txt)'}}>Rooms &amp; Units</span>
          <button className="btn bp" onClick={openNew}><Ic n="plus" sz={14}/>Add Room</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:12}}>
          {rooms.map(r=>(
            <div key={r.id} className="rc">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                <div>
                  <p style={{fontWeight:600,fontSize:14,color:'var(--txt)'}}>{r.name}</p>
                  <span style={{fontSize:11,padding:'2px 8px',borderRadius:20,background:`${TYPE_COLOR[r.type]||'var(--in)'}22`,color:TYPE_COLOR[r.type]||'var(--in)',fontWeight:600,textTransform:'capitalize'}}>{r.type}</span>
                </div>
                <span className={`bdg ${r.status==='available'?'bgs':'bge'}`}>{r.status}</span>
              </div>
              <p style={{fontSize:13,color:'var(--txt2)',marginBottom:6}}>{r.specs}</p>
              <div style={{display:'flex',gap:14,marginBottom:12}}>
                <div><p style={{fontSize:10,color:'var(--txt3)',fontWeight:600,textTransform:'uppercase',letterSpacing:.8}}>Price/Night</p><p style={{fontSize:16,fontWeight:700,fontFamily:'var(--fd)',color:'var(--gold-dk)'}}>${r.price}</p></div>
                <div><p style={{fontSize:10,color:'var(--txt3)',fontWeight:600,textTransform:'uppercase',letterSpacing:.8}}>Capacity</p><p style={{fontSize:16,fontWeight:700,fontFamily:'var(--fd)'}}>{r.capacity}</p></div>
              </div>
              <div style={{display:'flex',gap:7}}>
                <button className="btn bg_ btn-sm" style={{flex:1,justifyContent:'center'}} onClick={()=>openEdit(r)}><Ic n="edit" sz={13}/>Edit</button>
                <button className="ib" style={{color:'var(--er)'}} onClick={()=>del(r.id)}><Ic n="trash"/></button>
              </div>
            </div>
          ))}
        </div>

        {form && (
          <div className="ov">
            <div className="mo" style={{maxWidth:480}}>
              <div className="mo-h"><span className="mo-t">{form==='edit'?'Edit Room':'New Room'}</span><button className="ib" onClick={()=>{setForm(null);setErr('');}}><Ic n="x"/></button></div>
              <div className="mo-b">
                {err&&<div className="al al-e"><Ic n="warn"/><span>{err}</span></div>}
                <div className="fg2">
                  <div className="fg ff"><label>Room Name *</label><input value={fw.name} onChange={e=>setFW(p=>({...p,name:e.target.value}))}/></div>
                  <div className="fg"><label>Type</label>
                    <select value={fw.type} onChange={e=>setFW(p=>({...p,type:e.target.value}))}>
                      <option value="hotel">Hotel Room</option>
                      <option value="airbnb">Airbnb Unit</option>
                      <option value="chalet">Chalet</option>
                    </select>
                  </div>
                  <div className="fg"><label>Status</label>
                    <select value={fw.status} onChange={e=>setFW(p=>({...p,status:e.target.value}))}>
                      <option value="available">Available</option>
                      <option value="occupied">Occupied</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div className="fg"><label>Price per Night ($)</label><input type="number" min={0} value={fw.price} onChange={e=>setFW(p=>({...p,price:+e.target.value}))}/></div>
                  <div className="fg"><label>Capacity (guests)</label><input type="number" min={1} value={fw.capacity} onChange={e=>setFW(p=>({...p,capacity:+e.target.value}))}/></div>
                  <div className="fg ff"><label>Specifications</label><textarea value={fw.specs} onChange={e=>setFW(p=>({...p,specs:e.target.value}))} placeholder="King bed · WiFi · Sea view…"/></div>
                </div>
              </div>
              <div className="mo-f">
                <button className="btn bg_" onClick={()=>{setForm(null);setErr('');}}>Cancel</button>
                <button className="btn bp" onClick={save}><Ic n="check" sz={14}/>Save Room</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  /* ─ SHEETS PANEL ─ */
  const SheetsPanel = () => {
    const [url,setUrl]=useState(sheetsUrl||'');
    const [testing,setTesting]=useState(false);
    const [testResult,setTestResult]=useState(null);

    const test = async () => {
      if(!url) return;
      setTesting(true); setTestResult(null);
      try {
        const r = await SheetsAPI.ping(url);
        setTestResult(r.success?'ok':'error');
        if(r.success) { setSheetsUrl(url); addSyncLog('ok','Connected to database'); }
        else addSyncLog('error','Connection failed',r.error);
      } catch(e) { setTestResult('error'); addSyncLog('error','Connection error',e.message); }
      setTesting(false);
    };

    return (
      <div>
        <div className="card" style={{marginBottom:16}}>
          <div className="card-title" style={{display:'flex',alignItems:'center',gap:8}}><Ic n="cloud" sz={18}/>Database Connection</div>
          <p style={{fontSize:13,color:'var(--txt2)',marginBottom:16,lineHeight:1.7}}>Connect to Google Sheets to persist all your data across sessions and devices. Follow the README instructions to deploy the Apps Script backend, then paste your Web App URL below.</p>
          <div className="fg"><label>Google Apps Script Web App URL</label>
            <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://script.google.com/macros/s/…/exec"/>
          </div>
          <div style={{display:'flex',gap:9,alignItems:'center'}}>
            <button className="btn bp" onClick={test} disabled={testing||!url}>{testing?<><Ic n="refresh" sz={14} style={{animation:'spin 1s linear infinite'}}/>Testing…</>:<><Ic n="link" sz={14}/>Save &amp; Connect</>}</button>
            {sheetsUrl&&<button className="btn bg_" onClick={()=>{setSheetsUrl('');setUrl('');setTestResult(null);}}>Disconnect</button>}
            {testResult==='ok'&&<span className="al al-s" style={{margin:0,padding:'6px 12px'}}><Ic n="check"/>Connected!</span>}
            {testResult==='error'&&<span className="al al-e" style={{margin:0,padding:'6px 12px'}}><Ic n="warn"/>Connection failed</span>}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Sync Log</div>
          {syncLog.length===0&&<p style={{fontSize:13,color:'var(--txt3)'}}>No sync activity yet.</p>}
          {syncLog.slice(0,20).map((l,i)=>(
            <div key={i} style={{display:'flex',alignItems:'flex-start',gap:10,padding:'8px 0',borderBottom:'1px solid var(--brd)',fontSize:13}}>
              <span style={{width:8,height:8,borderRadius:'50%',background:l.type==='ok'?'var(--ok)':l.type==='error'?'var(--er)':'var(--gold)',flexShrink:0,marginTop:4}}/>
              <div style={{flex:1}}>
                <span style={{color:l.type==='ok'?'var(--ok)':l.type==='error'?'var(--er)':'var(--wn)',fontWeight:500}}>{l.msg}</span>
                {l.detail&&<span style={{color:'var(--txt3)',fontSize:11,display:'block',marginTop:1}}>{l.detail}</span>}
              </div>
              <span style={{fontSize:11,color:'var(--txt3)',flexShrink:0}}>{l.time}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="tabs">
        {[['users','Users'],['rooms','Rooms & Units'],['db','Database']].map(([k,l])=>(
          <button key={k} type="button" className={`tab${tab===k?' on':''}`} onClick={()=>setTab(k)}>{l}</button>
        ))}
      </div>
      {tab==='users' && <UsersPanel/>}
      {tab==='rooms' && <RoomsPanel/>}
      {tab==='db' && <SheetsPanel/>}
    </div>
  );
};

/* ══════════ APP ══════════ */
const App = () => {
  const [res,setResRaw] = useLS('sm_res', seedRes);
  const [rooms,setRoomsRaw] = useLS('sm_rooms', seedRooms);
  const [users,setUsersRaw] = useLS('sm_users', seedUsers);
  const [sheetsUrl,setSheetsUrlRaw] = useLS('sm_sheetsUrl', ()=>'');
  const [theme,setThemeRaw] = useLS('sm_theme', ()=>'light');
  const [currentUser,setCurrentUser] = useState(null);
  const [page,setPage] = useState('dashboard');
  const [syncState,setSyncState] = useState('idle');
  const [syncLog,setSyncLog] = useState([]);
  const [newResOpen,setNewResOpen] = useState(false);

  // Apply theme
  useEffect(()=>{ document.documentElement.setAttribute('data-theme', theme); },[theme]);

  const setRes = v => setResRaw(v);
  const setRooms = v => setRoomsRaw(v);
  const setUsers = v => setUsersRaw(v);
  const setSheetsUrl = v => setSheetsUrlRaw(v);
  const toggleTheme = () => setThemeRaw(theme==='dark'?'light':'dark');

  const addSyncLog = (type, msg, detail='') => {
    const entry = { type, msg, detail, time: new Date().toLocaleTimeString() };
    setSyncLog(prev=>[entry,...prev].slice(0,50));
  };

  const dbConnected = !!sheetsUrl;

  const ctx = { sheetsUrl, setSheetsUrl, syncState, syncLog, addSyncLog, setCurrentUser };

  const NAV = [
    { id:'dashboard', label:'Dashboard', icon:'home' },
    { id:'schedule', label:'Schedule', icon:'calendar' },
    { id:'reservations', label:'Reservations', icon:'list',
      badge: res.filter(r=>r.checkIn===toDay()&&!['checkedin','checkedout','cancelled'].includes(r.status)).length||null },
    { id:'checkin', label:'Check In', icon:'login',
      badge: res.filter(r=>r.checkIn===toDay()&&!['checkedin','checkedout','cancelled'].includes(r.status)).length||null },
    { id:'checkout', label:'Check Out', icon:'logout',
      badge: res.filter(r=>r.checkOut===toDay()&&r.status==='checkedin').length||null },
    { id:'reports', label:'Reports', icon:'chart' },
    { id:'history', label:'Guest History', icon:'history' },
    { id:'settings', label:'Settings', icon:'cog' },
  ];

  const PAGE_TITLES = {
    dashboard:'Dashboard',schedule:'Schedule',reservations:'Reservations',
    checkin:'Check In',checkout:'Check Out',reports:'Reports',history:'Guest History',settings:'Settings'
  };

  if(!currentUser) return (
    <AppCtx.Provider value={ctx}>
      <Login users={users}/>
    </AppCtx.Provider>
  );

  return (
    <AppCtx.Provider value={ctx}>
      {/* ─ SIDEBAR ─ */}
      <aside className="sb">
        <div className="sb-logo">
          <div className="sb-logo-mark">
            <div className="sb-logo-icon"><Ic n="building" sz={18} style={{color:'#fff'}}/></div>
            <h1>StayManager</h1>
          </div>
          <span>Pro Edition</span>
        </div>
        <div className="sb-sec">Main</div>
        <nav className="sb-nav">
          {NAV.slice(0,5).map(n=>(
            <button key={n.id} className={`ni${page===n.id?' on':''}`} onClick={()=>setPage(n.id)}>
              <span className="ni-icon"><Ic n={n.icon} sz={17}/></span>
              {n.label}
              {!!n.badge && <span className="ni-bdg" style={{background:page===n.id?'rgba(201,168,76,.25)':'rgba(255,255,255,.12)',color:page===n.id?'var(--gold)':'rgba(255,255,255,.6)'}}>{n.badge}</span>}
            </button>
          ))}
          <div className="sb-sec" style={{padding:'18px 4px 5px'}}>Analytics &amp; Settings</div>
          {NAV.slice(5).map(n=>(
            <button key={n.id} className={`ni${page===n.id?' on':''}`} onClick={()=>setPage(n.id)}>
              <span className="ni-icon"><Ic n={n.icon} sz={17}/></span>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="sb-footer">
          <div className="sb-user">
            <div className="sb-ava">{ini(currentUser.name)}</div>
            <div className="sb-uinfo">
              <p>{currentUser.name}</p>
              <span>{currentUser.role}</span>
            </div>
          </div>
          <button className="ni" onClick={()=>setCurrentUser(null)} style={{width:'100%'}}>
            <span className="ni-icon"><Ic n="logout" sz={17}/></span>Sign Out
          </button>
        </div>
      </aside>

      {/* ─ MAIN ─ */}
      <div className="main">
        <header className="topbar">
          <span className="tb-title">{PAGE_TITLES[page]}</span>
          <div className="tb-right">
            {/* DB status */}
            <div className="sync-pill" title={dbConnected?`Connected: ${sheetsUrl}`:'Not connected'}>
              <span className={`sync-dot ${dbConnected?'on':'off'}`}/>
              {dbConnected ? 'Database Connected' : 'Local Mode'}
            </div>
            {/* Theme toggle */}
            <button className="ib" onClick={toggleTheme} title="Toggle theme">
              <Ic n={theme==='dark'?'sun':'moon'} sz={16}/>
            </button>
          </div>
        </header>

        <main className="pg">
          {page==='dashboard' && <Dashboard res={res} rooms={rooms} onNewRes={()=>setNewResOpen(true)}/>}
          {page==='schedule' && <Schedule res={res} onNew={()=>setNewResOpen(true)}/>}
          {page==='reservations' && <ResList res={res} setRes={setRes} rooms={rooms}/>}
          {page==='checkin' && <CheckIn res={res} setRes={setRes}/>}
          {page==='checkout' && <CheckOut res={res} setRes={setRes}/>}
          {page==='reports' && <Reports res={res}/>}
          {page==='history' && <GuestHistory res={res}/>}
          {page==='settings' && <SettingsPage users={users} setUsers={setUsers} rooms={rooms} setRooms={setRooms}/>}
        </main>
      </div>

      {/* Global new reservation modal (from dashboard/schedule) */}
      {newResOpen && (
        <ResForm
          allRes={res}
          rooms={rooms}
          onSave={async r=>{
            const updated=[...res,r];
            setRes(updated);
            setNewResOpen(false);
            if(sheetsUrl){
              try{ const result=await SheetsAPI.saveReservation(sheetsUrl,r); addSyncLog(result.success?'ok':'error',`Saved reservation ${r.id}`,result.error); }
              catch(e){ addSyncLog('error','Sync failed',e.message); }
            }
          }}
          onClose={()=>setNewResOpen(false)}
          initial={null}
        />
      )}
    </AppCtx.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
