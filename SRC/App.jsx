import React, { useState, useEffect } from 'react'

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-font-smoothing:antialiased}
body{font-family:'Geist',-apple-system,sans-serif;background:#F8FAFC;color:#111318;font-size:14px;line-height:1.5}
:root{
  --charcoal:#111318;--graphite:#1E232B;
  --blue:#3B82F6;--blue-dim:#EFF6FF;--blue-mid:#DBEAFE;
  --white:#F8FAFC;--surface:#FFFFFF;
  --border:#E2E8F0;--border-mid:#CBD5E1;
  --text:#111318;--text-2:#475569;--text-3:#94A3B8;
  --emerald:#10B981;--emerald-bg:#ECFDF5;
  --amber:#F59E0B;--amber-bg:#FFFBEB;
  --red:#EF4444;--red-bg:#FEF2F2;
  --r:8px;--rl:12px;
  --s1:0 1px 2px rgba(0,0,0,.05);
  --s2:0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.04);
  --s3:0 4px 6px -1px rgba(0,0,0,.07),0 2px 4px rgba(0,0,0,.04);
  --s4:0 10px 15px -3px rgba(0,0,0,.08),0 4px 6px rgba(0,0,0,.03);
  --sb-w:220px;--sb-col:56px;
}
.mono{font-family:'Geist Mono',monospace}
.layout{display:flex;min-height:100vh}
.sidebar{width:var(--sb-w);flex-shrink:0;background:var(--charcoal);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:50;transition:width .22s cubic-bezier(.4,0,.2,1);overflow:hidden}
.sidebar.col{width:var(--sb-col)}
.main{margin-left:var(--sb-w);flex:1;min-height:100vh;transition:margin-left .22s cubic-bezier(.4,0,.2,1)}
.main.col{margin-left:var(--sb-col)}
.page{padding:28px 32px;max-width:1080px}
.sb-logo{padding:0 14px;height:52px;border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:10px;flex-shrink:0;overflow:hidden;position:relative}
.sb-mark{width:28px;height:28px;border-radius:6px;background:var(--blue);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sb-name{font-size:15px;font-weight:600;color:#fff;letter-spacing:-.3px;white-space:nowrap;transition:opacity .15s}
.sidebar.col .sb-name{opacity:0;pointer-events:none}
.sb-badge{font-size:9px;font-family:'Geist Mono',monospace;font-weight:500;background:rgba(59,130,246,.18);color:var(--blue);padding:2px 6px;border-radius:20px;letter-spacing:.5px;white-space:nowrap;transition:opacity .15s}
.sidebar.col .sb-badge{opacity:0}
.sb-toggle{width:26px;height:26px;border-radius:6px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.4);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;transition:background .12s,color .12s;flex-shrink:0;margin-left:auto}
.sb-toggle:hover{background:rgba(255,255,255,.1);color:rgba(255,255,255,.8)}
.sb-group{padding:12px 8px 4px;overflow:hidden}
.sb-group-label{font-size:10px;font-family:'Geist Mono',monospace;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.22);padding:0 8px;margin-bottom:3px;white-space:nowrap;transition:opacity .15s}
.sidebar.col .sb-group-label{opacity:0}
.sb-item{display:flex;align-items:center;gap:9px;padding:7px 8px;border-radius:7px;cursor:pointer;transition:background .12s;color:rgba(255,255,255,.45);font-size:13px;font-weight:400;margin-bottom:1px;border:none;background:transparent;width:100%;text-align:left;white-space:nowrap;overflow:hidden;position:relative}
.sb-item:hover{background:rgba(255,255,255,.06);color:rgba(255,255,255,.75)}
.sb-item.on{background:rgba(59,130,246,.14);color:#fff;font-weight:500}
.sb-item.on .sb-ic{color:var(--blue)}
.sb-ic{font-size:14px;width:18px;text-align:center;flex-shrink:0}
.sb-lbl{transition:opacity .15s}
.sidebar.col .sb-lbl{opacity:0}
.sb-ct{margin-left:auto;font-size:10px;font-family:'Geist Mono',monospace;background:rgba(255,255,255,.07);color:rgba(255,255,255,.35);padding:1px 6px;border-radius:20px;flex-shrink:0;transition:opacity .15s}
.sidebar.col .sb-ct{opacity:0}
.sb-item::after{content:attr(data-tip);position:absolute;left:calc(var(--sb-col) + 2px);top:50%;transform:translateY(-50%);background:var(--graphite);color:#fff;font-size:12px;font-weight:500;padding:4px 10px;border-radius:6px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .1s;border:1px solid rgba(255,255,255,.08);box-shadow:var(--s3)}
.sidebar.col .sb-item:hover::after{opacity:1}
.sb-foot{margin-top:auto;padding:12px 8px;border-top:1px solid rgba(255,255,255,.06);flex-shrink:0}
.sb-user{display:flex;align-items:center;gap:9px;padding:7px 8px;overflow:hidden}
.sb-av{width:28px;height:28px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,var(--blue),#6366F1);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff}
.sb-uname{font-size:12.5px;font-weight:500;color:rgba(255,255,255,.65);white-space:nowrap;transition:opacity .15s}
.sb-urole{font-size:11px;color:rgba(255,255,255,.28);white-space:nowrap;transition:opacity .15s}
.sidebar.col .sb-uname,.sidebar.col .sb-urole{opacity:0}
.topbar{height:52px;border-bottom:1px solid var(--border);background:var(--surface);display:flex;align-items:center;padding:0 28px;gap:10px;position:sticky;top:0;z-index:40;box-shadow:var(--s1)}
.tb-t{font-size:13.5px;font-weight:600}.tb-sep{color:var(--border-mid)}.tb-s{font-size:13px;color:var(--text-3)}.tb-r{margin-left:auto;display:flex;gap:8px;align-items:center}
.mode-bar{background:var(--graphite);padding:8px 28px;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(255,255,255,.06)}
.mode-label{font-size:11px;font-family:'Geist Mono',monospace;color:rgba(255,255,255,.35);letter-spacing:1px;text-transform:uppercase}
.mode-pill{display:flex;background:rgba(255,255,255,.07);border-radius:8px;padding:3px;gap:2px}
.mode-opt{padding:5px 16px;border-radius:6px;font-size:12.5px;font-weight:500;cursor:pointer;border:none;background:transparent;color:rgba(255,255,255,.4);transition:all .15s;font-family:'Geist',sans-serif}
.mode-opt.on{background:var(--blue);color:#fff}
.mode-opt:hover:not(.on){color:rgba(255,255,255,.75)}
.mode-hint{font-size:11.5px;color:rgba(255,255,255,.25);margin-left:auto;font-style:italic}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:7px 15px;border-radius:var(--r);font-size:13px;font-weight:500;cursor:pointer;transition:all .12s;border:1px solid transparent;font-family:'Geist',sans-serif;white-space:nowrap}
.btn-p{background:var(--blue);color:#fff;border-color:var(--blue)}.btn-p:hover{background:#2563EB}
.btn-s{background:var(--surface);color:var(--text-2);border-color:var(--border);box-shadow:var(--s1)}.btn-s:hover{border-color:var(--border-mid);color:var(--text)}
.btn-g{background:transparent;color:var(--text-3);border-color:transparent}.btn-g:hover{background:var(--white);color:var(--text-2)}
.btn-sm{padding:5px 11px;font-size:12px}.btn-lg{padding:10px 22px;font-size:14px}
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--rl);box-shadow:var(--s2)}
.card-h{padding:16px 20px 0;display:flex;align-items:center;justify-content:space-between}
.card-b{padding:16px 20px}
.card-t{font-size:14px;font-weight:600}.card-st{font-size:12px;color:var(--text-3);margin-top:1px}
.sg{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:22px}
.sc{background:var(--surface);border:1px solid var(--border);border-radius:var(--rl);padding:16px 18px;box-shadow:var(--s2)}
.sc-l{font-size:11.5px;color:var(--text-3);font-weight:500;margin-bottom:7px}
.sc-v{font-size:22px;font-weight:700;letter-spacing:-.5px}
.sc-d{font-size:11.5px;margin-top:3px;font-weight:500}
.up{color:var(--emerald)}.warn{color:var(--amber)}
.badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:20px;font-size:11.5px;font-weight:500;line-height:1.6}
.b-blue{background:var(--blue-dim);color:#1D4ED8}.b-green{background:var(--emerald-bg);color:#065F46}.b-amber{background:var(--amber-bg);color:#92400E}.b-red{background:var(--red-bg);color:#B91C1C}.b-neutral{background:#F1F5F9;color:var(--text-2)}
.field{display:flex;flex-direction:column;gap:5px}
.lbl{font-size:12.5px;font-weight:500;color:var(--text-2)}
.inp{height:36px;padding:0 12px;border-radius:var(--r);border:1px solid var(--border);background:var(--surface);font-family:'Geist',sans-serif;font-size:13px;color:var(--text);outline:none;transition:border-color .12s,box-shadow .12s;box-shadow:var(--s1);width:100%}
.inp:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(59,130,246,.1)}
.inp::placeholder{color:var(--text-3)}
.inp-wrap{position:relative}
.inp-sym{position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:13px;color:var(--text-3);pointer-events:none}
.inp-wrap .inp{padding-left:26px}
.sel{height:36px;padding:0 28px 0 12px;border-radius:var(--r);border:1px solid var(--border);background:var(--surface) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2394A3B8' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 8px center;appearance:none;font-family:'Geist',sans-serif;font-size:13px;color:var(--text);outline:none;cursor:pointer;box-shadow:var(--s1)}
.tw{border:1px solid var(--border);border-radius:var(--rl);overflow:hidden;background:var(--surface);box-shadow:var(--s2)}
table{width:100%;border-collapse:collapse}
th{padding:9px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--text-3);background:#F8FAFC;border-bottom:1px solid var(--border);text-transform:uppercase;letter-spacing:.5px;white-space:nowrap}
td{padding:12px 16px;border-bottom:1px solid var(--border);font-size:13px;color:var(--text-2)}
tr:last-child td{border-bottom:none}
tr:hover td{background:#FAFBFC}
.td-m{color:var(--text);font-weight:500}
.filter-bar{display:flex;gap:7px;align-items:center;flex-wrap:wrap}
.chip{padding:5px 13px;border-radius:20px;font-size:12.5px;font-weight:500;cursor:pointer;border:1px solid var(--border);background:var(--surface);color:var(--text-2);transition:all .12s;box-shadow:var(--s1)}
.chip.on{background:var(--blue-dim);color:#1D4ED8;border-color:#BFDBFE}
.chip:hover:not(.on){border-color:var(--border-mid);color:var(--text)}
.lg{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:13px}
.lc{background:var(--surface);border:1px solid var(--border);border-radius:var(--rl);box-shadow:var(--s2);cursor:pointer;transition:box-shadow .15s,border-color .15s;overflow:hidden}
.lc:hover{box-shadow:var(--s3);border-color:var(--border-mid)}
.lc-thumb{height:120px;position:relative;overflow:hidden;background:linear-gradient(135deg,#1E232B 0%,#111318 100%);display:flex;align-items:center;justify-content:center}
.lc-grid{position:absolute;inset:0;opacity:.09;background-image:linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px);background-size:28px 28px}
.lc-inner{position:relative;z-index:1;text-align:center}
.lc-fmt{font-size:9.5px;font-family:'Geist Mono',monospace;font-weight:500;color:rgba(255,255,255,.3);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:3px}
.lc-city{font-size:20px;font-weight:700;color:rgba(255,255,255,.85);letter-spacing:-.5px}
.lc-tbadge{position:absolute;top:9px;right:9px;z-index:2}
.lc-body{padding:12px 14px}
.lc-title{font-size:13.5px;font-weight:600;color:var(--text);margin-bottom:2px}
.lc-meta{font-size:12px;color:var(--text-3)}
.lc-foot{padding:9px 14px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;background:#FAFBFC}
.lc-bid-l{font-size:10.5px;color:var(--text-3);margin-bottom:1px}
.lc-bid-v{font-size:15px;font-weight:700;font-family:'Geist Mono',monospace;letter-spacing:-.5px}
.lc-timer{font-family:'Geist Mono',monospace;font-size:12.5px;font-weight:500;padding:3px 9px;border-radius:6px;background:var(--white);border:1px solid var(--border)}
.lc-timer.u{background:var(--amber-bg);border-color:#FCD34D;color:#92400E}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.dot{width:6px;height:6px;border-radius:50%;background:var(--emerald);display:inline-block;animation:pulse 2s infinite}
.mo{position:fixed;inset:0;background:rgba(10,15,25,.5);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px)}
.md{background:var(--surface);border:1px solid var(--border);border-radius:16px;width:100%;max-width:530px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px -10px rgba(0,0,0,.2)}
.md-h{padding:19px 22px;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;justify-content:space-between}
.md-b{padding:19px 22px;display:flex;flex-direction:column;gap:16px}
.ig{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ic{padding:9px 13px;border:1px solid var(--border);border-radius:var(--r);background:var(--white)}
.ic-l{font-size:10.5px;color:var(--text-3);margin-bottom:2px;font-weight:500}
.ic-v{font-size:13px;font-weight:600}
.br{display:flex;justify-content:space-between;align-items:center;padding:8px 13px;border-radius:var(--r);border:1px solid var(--border);margin-bottom:5px;background:var(--white)}
.br.you{border-color:#BFDBFE;background:var(--blue-dim)}
.pt{background:#F1F5F9;border-radius:4px;height:5px;overflow:hidden}
.pf{height:100%;border-radius:4px;background:var(--blue);transition:width .4s}
.pf.g{background:var(--emerald)}
.step-c{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;flex-shrink:0}
.step-done{background:var(--blue);color:#fff}.step-cur{background:var(--surface);color:var(--blue);border:2px solid var(--blue)}.step-fut{background:var(--white);color:var(--text-3);border:1.5px solid var(--border)}
.step-line{flex:1;height:1px;background:var(--border)}.step-line.done{background:var(--blue)}
.bc{display:flex;gap:8px;align-items:flex-end;height:88px}
.bc-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px}
.bc-bar{width:100%;border-radius:4px 4px 0 0}
.bc-l{font-size:10px;color:var(--text-3);font-family:'Geist Mono',monospace;white-space:nowrap}
.mc{border-radius:var(--rl);border:1px solid var(--border);background:#EFF6FF;position:relative;overflow:hidden;box-shadow:var(--s2);background-image:linear-gradient(rgba(59,130,246,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.04) 1px,transparent 1px);background-size:40px 40px}
.mroad-h{position:absolute;height:2px;background:rgba(255,255,255,.8);left:0;right:0}
.mroad-v{position:absolute;width:2px;background:rgba(255,255,255,.8);top:0;bottom:0}
.mpin{position:absolute;transform:translate(-50%,-100%);cursor:pointer;display:flex;flex-direction:column;align-items:center}
.mph{background:var(--blue);border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(59,130,246,.35);transition:transform .15s}
.mph.sm{width:24px;height:24px}.mph.lg{width:32px;height:32px}.mph.dark{background:var(--charcoal)}
.mpin:hover .mph{transform:rotate(-45deg) scale(1.1)}
.mp-price{transform:rotate(45deg);font-size:8.5px;font-family:'Geist Mono',monospace;font-weight:600;color:#fff}
.ml{margin-top:4px;background:var(--surface);border:1px solid var(--border);border-radius:5px;padding:2px 7px;font-size:10px;font-weight:500;color:var(--text);box-shadow:var(--s1);white-space:nowrap}
.hr{border:none;border-top:1px solid var(--border)}
@keyframes scaleIn{from{transform:scale(0.7);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes checkDraw{from{stroke-dashoffset:30}to{stroke-dashoffset:0}}
.s-ring{animation:scaleIn .35s cubic-bezier(.34,1.56,.64,1) both}
.s-check{stroke-dasharray:30;animation:checkDraw .4s .25s ease both}
@keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.fi{animation:fi .22s ease both}
.fi1{animation-delay:.04s}.fi2{animation-delay:.08s}.fi3{animation-delay:.12s}.fi4{animation-delay:.16s}
`

const LS = [
  {id:1,title:'Old Street Roundabout',city:'London',area:'EC1',format:'Digital 48-sheet',dims:'6×3m',impr:'124K',dates:'1–7 Mar',reserve:480,bid:650,instant:1200,end:Date.now()+18000000,bids:7,cat:'Digital',hot:true,x:'51%',y:'38%'},
  {id:2,title:'Waterloo Station Concourse',city:'London',area:'SE1',format:'Digital 96-sheet',dims:'12×4m',impr:'310K',dates:'3–10 Mar',reserve:1200,bid:1850,instant:3500,end:Date.now()+7200000,bids:14,cat:'Digital',hot:true,x:'43%',y:'56%'},
  {id:3,title:'Shoreditch High Street',city:'London',area:'E1',format:'Static 48-sheet',dims:'6×3m',impr:'68K',dates:'28 Feb–6 Mar',reserve:220,bid:320,instant:600,end:Date.now()+64800000,bids:3,cat:'Static',hot:false,x:'60%',y:'31%'},
  {id:4,title:'Victoria Coach Station',city:'London',area:'SW1',format:'Digital D6',dims:'1.2×1.8m',impr:'89K',dates:'5–12 Mar',reserve:180,bid:220,instant:450,end:Date.now()+28800000,bids:5,cat:'Transport',hot:false,x:'37%',y:'62%'},
  {id:5,title:'Canary Wharf DLR',city:'London',area:'E14',format:'Digital 6-sheet',dims:'1.2×1.8m',impr:'210K',dates:'10–17 Mar',reserve:320,bid:480,instant:900,end:Date.now()+111600000,bids:9,cat:'Transport',hot:false,x:'74%',y:'44%'},
  {id:6,title:'Brick Lane Wall',city:'London',area:'E2',format:'Painted Wall',dims:'8×5m',impr:'41K',dates:'1–14 Mar',reserve:700,bid:700,instant:null,end:Date.now()+151200000,bids:0,cat:'Static',hot:false,x:'64%',y:'28%'},
]
const fmt = n => n!=null?`£${Number(n).toLocaleString()}`:'—'

function useTimer(end){
  const [t,setT]=useState(Math.max(0,end-Date.now()))
  useEffect(()=>{const i=setInterval(()=>setT(Math.max(0,end-Date.now())),1000);return()=>clearInterval(i)},[end])
  const h=Math.floor(t/3600000),m=Math.floor((t%3600000)/60000),s=Math.floor((t%60000)/1000)
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}
function TC({end}){return <span>{useTimer(end)}</span>}

const NAV={'Marketplace':[{id:'browse',ic:'⊞',label:'Browse Listings',ct:'6'},{id:'map',ic:'⊙',label:'Map View'},{id:'watch',ic:'◇',label:'Watchlist',ct:'2'}],'Buyer':[{id:'b-bids',ic:'↑',label:'My Bids',ct:'3'},{id:'b-campaigns',ic:'▷',label:'Campaigns'},{id:'b-creative',ic:'□',label:'Creatives'}],'Seller':[{id:'s-listings',ic:'≡',label:'My Inventory',ct:'4'},{id:'s-upload',ic:'+',label:'New Listing'},{id:'s-revenue',ic:'∿',label:'Revenue'}]}

function Sidebar({page,go,col,setCol}){
  return(
    <div className={`sidebar ${col?'col':''}`}>
      <div className="sb-logo">
        <div className="sb-mark"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="4" width="12" height="7" rx="1.5" fill="white" fillOpacity=".9"/><rect x="3" y="2" width="8" height="5" rx="1" fill="white" fillOpacity=".4"/></svg></div>
        <span className="sb-name">ClearBoard</span>
        <span className="sb-badge">BETA</span>
        <button className="sb-toggle" onClick={()=>setCol(c=>!c)} title={col?'Expand':'Collapse'}>{col?'→':'←'}</button>
      </div>
      {Object.entries(NAV).map(([sec,items])=>(
        <div className="sb-group" key={sec}>
          <div className="sb-group-label">{sec}</div>
          {items.map(it=>(
            <button key={it.id} className={`sb-item ${page===it.id?'on':''}`} onClick={()=>go(it.id)} data-tip={it.label}>
              <span className="sb-ic">{it.ic}</span>
              <span className="sb-lbl">{it.label}</span>
              {it.ct&&<span className="sb-ct">{it.ct}</span>}
            </button>
          ))}
        </div>
      ))}
      <div className="sb-foot">
        <div className="sb-user">
          <div className="sb-av">AC</div>
          <div><div className="sb-uname">AcmeBrand Co</div><div className="sb-urole">Pro Account</div></div>
        </div>
      </div>
    </div>
  )
}

function ModeBar({mode,setMode,go}){
  function sw(m){setMode(m);go(m==='buyer'?'browse':'s-listings')}
  return(
    <div className="mode-bar">
      <span className="mode-label">Prototype view</span>
      <div className="mode-pill">
        <button className={`mode-opt ${mode==='buyer'?'on':''}`} onClick={()=>sw('buyer')}>Buyer</button>
        <button className={`mode-opt ${mode==='seller'?'on':''}`} onClick={()=>sw('seller')}>Seller</button>
      </div>
      <span className="mode-hint">Switch to preview the other journey</span>
    </div>
  )
}

function LCard({l,onClick}){
  const t=useTimer(l.end);const urgent=l.end-Date.now()<14400000
  return(
    <div className="lc" onClick={()=>onClick(l)}>
      <div className="lc-thumb"><div className="lc-grid"/><div className="lc-inner"><div className="lc-fmt">{l.format}</div><div className="lc-city">{l.area}</div></div><div className="lc-tbadge">{l.hot?<span className="badge b-amber">Hot</span>:<span className="badge b-neutral">{l.cat}</span>}</div></div>
      <div className="lc-body"><div className="lc-title">{l.title}</div><div className="lc-meta">{l.dims} · {l.impr}/day · {l.dates}</div></div>
      <div className="lc-foot"><div><div className="lc-bid-l"><span className="dot" style={{marginRight:5}}/>{l.bids} bids · Current bid</div><div className="lc-bid-v mono">{fmt(l.bid)}</div></div><div className={`lc-timer ${urgent?'u':''}`}>{t}</div></div>
    </div>
  )
}

function Modal({l,onClose}){
  const t=useTimer(l.end)
  const [bidVal,setBidVal]=useState(l.bid+50)
  const [bids,setBids]=useState([{user:'Agency_XYZ',amount:l.bid,time:'2m ago',you:false},{user:'SME_Brand3',amount:l.bid-80,time:'14m ago',you:false},{user:'StartupCo',amount:l.bid-200,time:'31m ago',you:false}])
  const [st,setSt]=useState('idle')
  const [cur,setCur]=useState(l.bid)
  const urgent=l.end-Date.now()<14400000
  function placeBid(){if(bidVal<=cur)return;setCur(bidVal);setBids(p=>[{user:'You',amount:bidVal,time:'Just now',you:true},...p]);setSt('leading')}
  return(
    <div className="mo" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="md fi">
        <div className="md-h">
          <div><div style={{fontWeight:700,fontSize:15.5,color:'var(--text)'}}>{l.title}</div><div style={{fontSize:12,color:'var(--text-3)',marginTop:3}}>{l.format} · {l.dims} · {l.dates} · {l.impr} impressions/day</div></div>
          <button className="btn btn-g btn-sm" onClick={onClose} style={{fontSize:16}}>✕</button>
        </div>
        <div className="md-b">
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
            {[['Current bid',fmt(cur),'var(--text)'],['Reserve',fmt(l.reserve),'var(--text-2)'],['Closes in',t,urgent?'var(--amber)':'var(--text)']].map(([k,v,c])=>(
              <div key={k} style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:8,padding:'9px 13px'}}>
                <div style={{fontSize:10.5,color:'var(--text-3)',marginBottom:3}}>{k}</div>
                <div className="mono" style={{fontSize:14.5,fontWeight:700,color:c}}>{v}</div>
              </div>
            ))}
          </div>
          <div className="ig">
            {[['Format',l.format],['Daily impressions',`${l.impr}/day`],['Dimensions',l.dims],['Total bids',`${bids.length} placed`]].map(([k,v])=>(
              <div key={k} className="ic"><div className="ic-l">{k}</div><div className="ic-v">{v}</div></div>
            ))}
          </div>
          {st==='leading'&&<div style={{background:'var(--emerald-bg)',border:'1px solid #6EE7B7',borderRadius:8,padding:'10px 14px',color:'#065F46',fontSize:13,fontWeight:500}}>✓ You're the highest bidder at {fmt(bidVal)}. You'll be notified when the auction closes.</div>}
          {st==='bought'&&<div style={{background:'var(--blue-dim)',border:'1px solid #93C5FD',borderRadius:10,padding:18,textAlign:'center'}}><div style={{fontSize:17,fontWeight:700,color:'#1D4ED8',marginBottom:6}}>Booking Confirmed</div><div style={{fontSize:13,color:'var(--text-3)',marginBottom:14}}>You've secured {l.title} for {fmt(l.instant)}. An IO contract has been emailed to you.</div><button className="btn btn-s btn-sm" onClick={onClose}>Close</button></div>}
          {st!=='bought'&&(
            <div>
              <div className="lbl" style={{marginBottom:7}}>Your bid — minimum {fmt(cur+50)}</div>
              <div style={{display:'flex',gap:8}}><div className="inp-wrap" style={{flex:1}}><span className="inp-sym">£</span><input className="inp mono" type="number" value={bidVal} onChange={e=>setBidVal(Number(e.target.value))}/></div><button className="btn btn-p" onClick={placeBid}>Place Bid</button></div>
              {l.instant&&<><div style={{display:'flex',gap:8,alignItems:'center',margin:'11px 0'}}><div className="hr" style={{flex:1}}/><span style={{fontSize:11.5,color:'var(--text-3)'}}>or buy immediately</span><div className="hr" style={{flex:1}}/></div><button className="btn btn-s" style={{width:'100%',justifyContent:'center'}} onClick={()=>setSt('bought')}>Buy Now at {fmt(l.instant)}<span style={{color:'var(--text-3)',fontSize:12,fontWeight:400}}> — skip the auction</span></button></>}
            </div>
          )}
          <div>
            <div style={{fontSize:11,fontWeight:600,color:'var(--text-3)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:9}}>Bid History</div>
            {bids.map((b,i)=>(
              <div key={i} className={`br ${b.you?'you':''}`}>
                <div style={{display:'flex',gap:9,alignItems:'center'}}><div style={{width:24,height:24,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',background:b.you?'var(--blue)':'#F1F5F9',fontSize:10,fontWeight:600,color:b.you?'#fff':'var(--text-2)'}}>{b.user[0]}</div><span style={{fontWeight:b.you?600:400,color:b.you?'#1D4ED8':'var(--text-2)',fontSize:13}}>{b.user}</span></div>
                <div style={{display:'flex',gap:11,alignItems:'center'}}><span className="mono" style={{fontWeight:600,fontSize:13}}>{fmt(b.amount)}</span><span style={{fontSize:11.5,color:'var(--text-3)'}}>{b.time}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Browse(){
  const [f,setF]=useState('All');const [q,setQ]=useState('');const [sel,setSel]=useState(null)
  const cats=['All','Digital','Static','Transport']
  const items=LS.filter(l=>(f==='All'||l.cat===f)&&(l.title.toLowerCase().includes(q.toLowerCase())||l.area.toLowerCase().includes(q.toLowerCase())))
  return(<>
    <div className="topbar"><span className="tb-t">Marketplace</span><span className="tb-sep">/</span><span className="tb-s">Live Auctions</span><div className="tb-r"><span style={{fontSize:12.5,color:'var(--text-3)'}}><span className="dot" style={{marginRight:5}}/>{LS.length} listings · London</span></div></div>
    <div className="page fi">
      <div style={{display:'flex',gap:9,marginBottom:18,alignItems:'center',flexWrap:'wrap'}}>
        <input className="inp" placeholder="Search location or postcode..." value={q} onChange={e=>setQ(e.target.value)} style={{width:230}}/>
        <div className="filter-bar">{cats.map(c=><button key={c} className={`chip ${f===c?'on':''}`} onClick={()=>setF(c)}>{c}</button>)}</div>
        <div style={{marginLeft:'auto'}}><select className="sel"><option>Closes soonest</option><option>Bid price ↑</option><option>Impressions ↑</option></select></div>
      </div>
      <div className="lg">{items.map((l,i)=><div key={l.id} className={`fi${Math.min(i+1,4)}`}><LCard l={l} onClick={setSel}/></div>)}{items.length===0&&<div style={{gridColumn:'1/-1',textAlign:'center',padding:60,color:'var(--text-3)'}}>No listings match your filters.</div>}</div>
      {sel&&<Modal l={sel} onClose={()=>setSel(null)}/>}
    </div>
  </>)
}

function MapView(){
  const [hov,setHov]=useState(null);const [sel,setSel]=useState(null);const hovL=LS.find(l=>l.id===hov)
  return(<>
    <div className="topbar"><span className="tb-t">Marketplace</span><span className="tb-sep">/</span><span className="tb-s">Map View</span></div>
    <div style={{padding:24,height:'calc(100vh - 88px)'}}>
      <div className="mc" style={{height:'100%'}}>
        {[30,50,68].map(p=><div key={p} className="mroad-h" style={{top:`${p}%`}}/>)}
        {[25,45,65,78].map(p=><div key={p} className="mroad-v" style={{left:`${p}%`}}/>)}
        {[['City','46%','47%'],['West End','29%','40%'],['East','62%','29%'],['South','41%','58%'],['Docklands','74%','41%']].map(([n,x,y])=>(
          <div key={n} style={{position:'absolute',left:x,top:y,fontSize:10.5,color:'rgba(30,35,43,.3)',fontWeight:600,userSelect:'none'}}>{n}</div>
        ))}
        {LS.map(l=>(
          <div key={l.id} className="mpin" style={{left:l.x,top:l.y}} onMouseEnter={()=>setHov(l.id)} onMouseLeave={()=>setHov(null)} onClick={()=>setSel(l)}>
            <div className={`mph ${l.bids>8?'lg':'sm'} ${l.bids===0?'dark':''}`}><span className="mp-price">{l.bids===0?'NEW':fmt(l.bid).replace('£','')}</span></div>
            {hov===l.id&&<div className="ml">{l.title}</div>}
          </div>
        ))}
        {hovL?(
          <div style={{position:'absolute',bottom:16,left:16,right:16,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:12,padding:'13px 17px',boxShadow:'var(--s4)',display:'flex',alignItems:'center',gap:14}}>
            <div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>{hovL.title}</div><div style={{fontSize:12,color:'var(--text-3)',marginTop:2}}>{hovL.format} · {hovL.dims} · {hovL.impr}/day</div></div>
            <div style={{textAlign:'right'}}><div style={{fontSize:11,color:'var(--text-3)'}}>Current bid</div><div className="mono" style={{fontSize:16,fontWeight:700}}>{fmt(hovL.bid)}</div></div>
            <button className="btn btn-p btn-sm" onClick={()=>setSel(hovL)}>Bid →</button>
          </div>
        ):(
          <div style={{position:'absolute',bottom:16,left:16,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:8,padding:'7px 13px',fontSize:12.5,color:'var(--text-2)',boxShadow:'var(--s2)'}}>Greater London · {LS.length} live sites · Hover a pin for details</div>
        )}
      </div>
      {sel&&<Modal l={sel} onClose={()=>setSel(null)}/>}
    </div>
  </>)
}

function Watchlist(){
  const items=LS.filter(l=>l.id===1||l.id===5);const [sel,setSel]=useState(null)
  return(<><div className="topbar"><span className="tb-t">Marketplace</span><span className="tb-sep">/</span><span className="tb-s">Watchlist</span></div><div className="page fi"><div className="lg">{items.map(l=><LCard key={l.id} l={l} onClick={setSel}/>)}</div>{sel&&<Modal l={sel} onClose={()=>setSel(null)}/>}</div></>)
}

function SListings({go,newListing}){
  const base=[{title:'Old Street Roundabout',status:'live',bids:7,bid:650,end:Date.now()+18000000,views:412},{title:'Shoreditch High St',status:'live',bids:3,bid:320,end:Date.now()+64800000,views:183},{title:'EC1 Car Park Rooftop',status:'sold',bids:12,bid:920,end:null,views:601},{title:'Aldgate Tower',status:'draft',bids:0,bid:null,end:null,views:0}]
  const rows=newListing?[{title:newListing.title||'New Listing',status:'live',bids:0,bid:null,end:Date.now()+172800000,views:0,isNew:true},...base]:base
  return(<>
    <div className="topbar"><span className="tb-t">Seller</span><span className="tb-sep">/</span><span className="tb-s">My Inventory</span><div className="tb-r"><button className="btn btn-p btn-sm" onClick={()=>go('s-upload')}>+ New Listing</button></div></div>
    <div className="page fi">
      <div className="sg fi1">{[['Total Revenue','£1,890','↑ 2 deals this month','up'],['Active Bids','10','across 2 listings','up'],['Sell-through','68%','↑ vs 52% last month','up'],['Avg Uplift','+38%','vs zero baseline','up']].map(([l,v,d,dir])=>(<div key={l} className="sc"><div className="sc-l">{l}</div><div className="sc-v">{v}</div><div className={`sc-d ${dir}`}>{d}</div></div>))}</div>
      <div className="tw fi2">
        <table>
          <thead><tr><th>Listing</th><th>Status</th><th>Views</th><th>Bids</th><th>Current Bid</th><th>Closes In</th><th></th></tr></thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i} style={r.isNew?{background:'#F0FDF4'}:{}}>
                <td className="td-m">{r.isNew&&<span className="badge b-green" style={{marginRight:8,fontSize:10}}>NEW</span>}{r.title}</td>
                <td><span className={`badge ${r.status==='live'?'b-green':r.status==='sold'?'b-blue':'b-neutral'}`}>{r.status==='live'&&<span className="dot" style={{width:5,height:5}}/>} {r.status.toUpperCase()}</span></td>
                <td className="mono">{r.views.toLocaleString()}</td>
                <td className="mono">{r.bids}</td>
                <td className="mono" style={{fontWeight:600,color:r.status==='sold'?'var(--emerald)':'var(--text)'}}>{r.bid?fmt(r.bid):'—'}</td>
                <td className="mono" style={{fontSize:12.5}}>{r.end?<TC end={r.end}/>:'—'}</td>
                <td><button className="btn btn-s btn-sm">{r.status==='draft'?'Edit':'Manage'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>)
}

function SUpload({go,onPublish}){
  const [step,setStep]=useState(1)
  const [pub,setPub]=useState(false)
  const [fm,setFm]=useState({title:'',format:'Digital 48-sheet',dates:'',reserve:'',instant:'',dur:'48 hours'})
  const upd=(k,v)=>setFm(p=>({...p,[k]:v}))
  const labels=['Location & Format','Audience','Pricing','Review']
  useEffect(()=>{
    if(!pub)return
    const t=setTimeout(()=>{onPublish(fm);go('s-listings')},2800)
    return()=>clearTimeout(t)
  },[pub])
  if(pub)return(<>
    <div className="topbar"><span className="tb-t">Seller</span><span className="tb-sep">/</span><span className="tb-s">New Listing</span></div>
    <div className="page" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'calc(100vh - 88px)'}}>
      <div style={{textAlign:'center',maxWidth:420}} className="fi">
        <div style={{display:'flex',justifyContent:'center',marginBottom:24}}>
          <svg width="72" height="72" viewBox="0 0 72 72" className="s-ring">
            <circle cx="36" cy="36" r="34" fill="#ECFDF5" stroke="#10B981" strokeWidth="2"/>
            <polyline points="22,36 31,45 50,26" fill="none" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="s-check"/>
          </svg>
        </div>
        <div style={{fontSize:20,fontWeight:700,letterSpacing:'-.3px',marginBottom:8}}>Auction Published</div>
        <div style={{fontSize:14,color:'var(--text-3)',lineHeight:1.6,marginBottom:20}}><strong style={{color:'var(--text)'}}>{fm.title||'Your listing'}</strong> is now live. Bidding opens immediately and buyers have been notified.</div>
        <div style={{display:'flex',gap:8,alignItems:'center',justifyContent:'center',marginBottom:24}}>
          {[['Format',fm.format||'Digital 48-sheet'],['Duration',fm.dur],['Reserve',fm.reserve?fmt(fm.reserve):'—']].map(([k,v])=>(
            <div key={k} style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:8,padding:'8px 14px',textAlign:'center'}}>
              <div style={{fontSize:10.5,color:'var(--text-3)',marginBottom:2}}>{k}</div>
              <div style={{fontSize:13,fontWeight:600}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8,justifyContent:'center',color:'var(--text-3)',fontSize:13}}>
          <div className="dot" style={{background:'var(--blue)'}}/>Redirecting to your dashboard…
        </div>
      </div>
    </div>
  </>)
  return(<>
    <div className="topbar"><span className="tb-t">Seller</span><span className="tb-sep">/</span><span className="tb-s">New Listing</span></div>
    <div className="page fi" style={{maxWidth:620}}>
      <div style={{display:'flex',alignItems:'center',marginBottom:26}}>
        {labels.map((label,i)=>(
          <React.Fragment key={label}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:5}}>
              <div className={`step-c ${step>i+1?'step-done':step===i+1?'step-cur':'step-fut'}`}>{step>i+1?'✓':i+1}</div>
              <div style={{fontSize:10.5,fontWeight:500,color:step===i+1?'var(--blue)':'var(--text-3)',whiteSpace:'nowrap'}}>{label}</div>
            </div>
            {i<3&&<div className={`step-line ${step>i+1?'done':''}`} style={{marginBottom:14,flex:1}}/>}
          </React.Fragment>
        ))}
      </div>
      <div className="card">
        <div className="card-b" style={{padding:22,display:'flex',flexDirection:'column',gap:14}}>
          {step===1&&<>
            <div className="field"><label className="lbl">Listing title</label><input className="inp" placeholder="e.g. Old Street Roundabout D48" value={fm.title} onChange={e=>upd('title',e.target.value)}/></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:11}}>
              <div className="field"><label className="lbl">Format</label><select className="sel" value={fm.format} onChange={e=>upd('format',e.target.value)}>{['Digital 48-sheet','Digital 96-sheet','Digital D6','Static 48-sheet','Painted Wall','Transport D6'].map(v=><option key={v}>{v}</option>)}</select></div>
              <div className="field"><label className="lbl">Campaign dates</label><input className="inp" placeholder="e.g. 1–7 Mar 2025" value={fm.dates} onChange={e=>upd('dates',e.target.value)}/></div>
            </div>
            <div className="field"><label className="lbl">Full address or postcode</label><input className="inp" placeholder="e.g. Old Street Roundabout, EC1V 9LT"/></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:11}}>
              <div className="field"><label className="lbl">Dimensions</label><input className="inp" placeholder="e.g. 6m × 3m"/></div>
              <div className="field"><label className="lbl">Panel type</label><select className="sel"><option>Roadside</option><option>Retail</option><option>Transport</option><option>Ambient</option></select></div>
            </div>
          </>}
          {step===2&&<>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:11}}>
              <div className="field"><label className="lbl">Daily impressions</label><input className="inp mono" placeholder="e.g. 80,000"/></div>
              <div className="field"><label className="lbl">Weekly reach</label><input className="inp mono" placeholder="e.g. 350,000"/></div>
            </div>
            <div className="field"><label className="lbl">Primary audience</label><select className="sel"><option>General commuters</option><option>ABC1 adults</option><option>18–34 urban</option><option>Business travellers</option></select></div>
            <div className="field"><label className="lbl" style={{marginBottom:7}}>Brand category restrictions</label><div style={{display:'flex',gap:6,flexWrap:'wrap'}}>{['Adult content','Gambling','Alcohol','Tobacco','Political','Competitors'].map(c=><button key={c} className="chip">{c}</button>)}</div></div>
          </>}
          {step===3&&<>
            <div style={{background:'var(--blue-dim)',border:'1px solid var(--blue-mid)',borderRadius:8,padding:'10px 14px',fontSize:13,color:'#1D4ED8'}}>Platform takes <strong>15% commission</strong> on completed sales. Set a reserve price to protect your rate card.</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:11}}>
              <div className="field"><label className="lbl">Reserve price (£)</label><div className="inp-wrap"><span className="inp-sym">£</span><input className="inp mono" placeholder="400" value={fm.reserve} onChange={e=>upd('reserve',e.target.value)}/></div></div>
              <div className="field"><label className="lbl">Min bid increment (£)</label><div className="inp-wrap"><span className="inp-sym">£</span><input className="inp mono" placeholder="50"/></div></div>
              <div className="field"><label className="lbl">Instant buy price (£)</label><div className="inp-wrap"><span className="inp-sym">£</span><input className="inp mono" placeholder="Optional" value={fm.instant} onChange={e=>upd('instant',e.target.value)}/></div></div>
              <div className="field"><label className="lbl">Auction duration</label><select className="sel" value={fm.dur} onChange={e=>upd('dur',e.target.value)}>{['24 hours','48 hours','72 hours','7 days'].map(v=><option key={v}>{v}</option>)}</select></div>
            </div>
          </>}
          {step===4&&<>
            <div style={{fontWeight:600,fontSize:14,marginBottom:4}}>Review before publishing</div>
            <div style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:8,overflow:'hidden'}}>
              {[['Title',fm.title||'Old Street Roundabout D48'],['Format',fm.format],['Dates',fm.dates||'1–7 Mar 2025'],['Reserve Price',fm.reserve?fmt(fm.reserve):'£400'],['Instant Buy',fm.instant?fmt(fm.instant):'Not enabled'],['Duration',fm.dur],['Platform Fee','15% of final sale']].map(([k,v],i,arr)=>(
                <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'10px 15px',borderBottom:i<arr.length-1?'1px solid var(--border)':'none'}}><span style={{color:'var(--text-3)',fontSize:13}}>{k}</span><span style={{fontWeight:600,fontSize:13}}>{v}</span></div>
              ))}
            </div>
          </>}
        </div>
        <div style={{padding:'13px 22px',borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between'}}>
          <button className="btn btn-s" onClick={()=>setStep(s=>Math.max(1,s-1))} style={{visibility:step>1?'visible':'hidden'}}>← Back</button>
          {step<4?<button className="btn btn-p" onClick={()=>setStep(s=>s+1)}>Continue →</button>:<button className="btn btn-p btn-lg" onClick={()=>setPub(true)}>✓ Publish Auction</button>}
        </div>
      </div>
    </div>
  </>)
}

function SRevenue(){
  const bars=[['Oct',.3],['Nov',.5],['Dec',.45],['Jan',.6],['Feb',.75],['Mar ▸',.9]]
  return(<>
    <div className="topbar"><span className="tb-t">Seller</span><span className="tb-sep">/</span><span className="tb-s">Revenue</span></div>
    <div className="page fi">
      <div className="sg">{[['Gross Revenue','£4,760','Last 6 months'],['Net Payout','£4,046','After 15% fee'],['Pending','£650','Awaiting escrow'],['Take Rate','15%','Platform commission']].map(([l,v,s])=>(<div key={l} className="sc"><div className="sc-l">{l}</div><div className="sc-v">{v}</div><div style={{fontSize:12,color:'var(--text-3)',marginTop:3}}>{s}</div></div>))}</div>
      <div className="card fi1" style={{marginBottom:12}}>
        <div className="card-h" style={{padding:'16px 20px'}}><div><div className="card-t">Monthly Revenue</div><div className="card-st">Gross, before platform fees</div></div></div>
        <div className="card-b" style={{paddingTop:8}}><div className="bc">{bars.map(([m,h])=><div key={m} className="bc-col"><div className="bc-bar" style={{height:h*88,background:m.includes('▸')?'var(--blue)':'#EFF6FF',border:`1px solid ${m.includes('▸')?'var(--blue)':'var(--border)'}`}}/><div className="bc-l">{m}</div></div>)}</div></div>
      </div>
      <div className="tw fi2">
        <table>
          <thead><tr><th>Date</th><th>Listing</th><th>Buyer</th><th>Gross</th><th>Fee</th><th>Net</th><th>Status</th></tr></thead>
          <tbody>{[['14 Feb','EC1 Car Park Rooftop','AcmeBrand','£920','£138','£782','paid'],['6 Feb','Old Street Roundabout','Agency_XYZ','£650','£98','£552','pending'],['28 Jan','Shoreditch High St','StartupCo','£320','£48','£272','paid']].map(([date,listing,buyer,gross,fee,net,st],i)=>(
            <tr key={i}><td className="mono" style={{fontSize:12.5}}>{date}</td><td className="td-m">{listing}</td><td>{buyer}</td><td className="mono">{gross}</td><td className="mono" style={{color:'var(--text-3)'}}>{fee}</td><td className="mono" style={{fontWeight:600}}>{net}</td><td><span className={`badge ${st==='paid'?'b-green':'b-amber'}`}>{st.toUpperCase()}</span></td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  </>)
}

function BBids(){
  const bids=[{title:'Old Street Roundabout',status:'leading',bid:650,reserve:480,end:Date.now()+18000000},{title:'Waterloo Station Concourse',status:'outbid',bid:1400,reserve:1200,end:Date.now()+7200000},{title:'Victoria Coach Station',status:'won',bid:440,reserve:180,end:Date.now()-3600000}]
  return(<>
    <div className="topbar"><span className="tb-t">Buyer</span><span className="tb-sep">/</span><span className="tb-s">Auction Activity</span></div>
    <div className="page fi">
      <div className="sg fi1">{[['Leading','1 auction',"You're top bidder",'up'],['Outbid','1 auction','Action needed','warn'],['Won','1 this month','Victoria Coach','up'],['Total Spend','£1,090','Feb 2025','']].map(([l,v,s,d])=>(<div key={l} className="sc"><div className="sc-l">{l}</div><div className="sc-v">{v}</div><div className={`sc-d ${d}`}>{s}</div></div>))}</div>
      <div style={{display:'flex',flexDirection:'column',gap:9}}>
        {bids.map((b,i)=>(
          <div key={i} className={`card fi${i+1}`}>
            <div className="card-b" style={{display:'flex',alignItems:'center',gap:14}}>
              <div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>{b.title}</div><div style={{fontSize:12.5,color:'var(--text-3)',marginTop:2}}>Your bid: <span className="mono" style={{fontWeight:600,color:'var(--text)'}}>{fmt(b.bid)}</span><span style={{margin:'0 6px',color:'var(--border-mid)'}}>·</span>Reserve: <span className="mono">{fmt(b.reserve)}</span></div></div>
              <span className={`badge ${b.status==='leading'?'b-green':b.status==='won'?'b-blue':'b-red'}`}>{b.status==='leading'?'▲ LEADING':b.status==='won'?'✓ WON':'↓ OUTBID'}</span>
              {b.end>Date.now()&&<div style={{minWidth:88,textAlign:'right'}}><div style={{fontSize:11,color:'var(--text-3)',marginBottom:1}}>Closes in</div><div className="mono" style={{fontSize:13,fontWeight:600}}><TC end={b.end}/></div></div>}
              {b.status==='outbid'&&<button className="btn btn-p btn-sm">Rebid →</button>}
              {b.status==='won'&&<button className="btn btn-s btn-sm">View</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </>)
}

function BCampaigns(){
  const camps=[{title:'Victoria Coach Station',status:'active',dates:'20–26 Feb',spend:440,impr:'89K',prog:42},{title:'EC1 Car Park Rooftop',status:'completed',dates:'10–16 Feb',spend:920,impr:'53K',prog:100}]
  return(<>
    <div className="topbar"><span className="tb-t">Buyer</span><span className="tb-sep">/</span><span className="tb-s">My Campaigns</span></div>
    <div className="page fi">
      <div className="sg fi1">{[['Active','1 campaign'],['Total Spend','£1,360'],['Impressions','1.2M'],['Won This Month','2']].map(([l,v])=>(<div key={l} className="sc"><div className="sc-l">{l}</div><div className="sc-v">{v}</div></div>))}</div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {camps.map((c,i)=>(
          <div key={i} className={`card fi${i+1}`}><div className="card-b">
            <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:c.status==='active'?13:0}}>
              <div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>{c.title}</div><div style={{fontSize:12.5,color:'var(--text-3)',marginTop:2}}>{c.dates} · {c.impr}/day impressions</div></div>
              <span className={`badge ${c.status==='active'?'b-green':'b-neutral'}`}>{c.status==='active'&&<span className="dot" style={{width:5,height:5}}/>} {c.status.toUpperCase()}</span>
              <div className="mono" style={{fontWeight:700,fontSize:15}}>{fmt(c.spend)}</div>
              <button className="btn btn-s btn-sm">View</button>
            </div>
            {c.status==='active'&&<><div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'var(--text-3)',marginBottom:6}}><span>Campaign delivery</span><span>Day 3 of 7 · {c.prog}% delivered</span></div><div className="pt"><div className="pf g" style={{width:c.prog+'%'}}/></div></>}
          </div></div>
        ))}
      </div>
    </div>
  </>)
}

function BCreative(){
  return(<>
    <div className="topbar"><span className="tb-t">Buyer</span><span className="tb-sep">/</span><span className="tb-s">Creatives</span><div className="tb-r"><button className="btn btn-p btn-sm">+ Upload Creative</button></div></div>
    <div className="page fi" style={{maxWidth:660}}>
      <div className="card fi1" style={{marginBottom:10}}><div className="card-b" style={{display:'flex',gap:13,alignItems:'center'}}><div style={{width:42,height:42,borderRadius:8,background:'var(--blue-dim)',border:'1px solid var(--blue-mid)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>📄</div><div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>AcmeBrand_Victoria_Feb.pdf</div><div style={{fontSize:12.5,color:'var(--text-3)',marginTop:2}}>2.4 MB · Uploaded 20 Feb · 300 DPI</div></div><span className="badge b-green">✓ APPROVED</span><button className="btn btn-s btn-sm">Download</button></div></div>
      <div className="card fi2" style={{marginBottom:18}}><div className="card-b" style={{display:'flex',gap:13,alignItems:'center'}}><div style={{width:42,height:42,borderRadius:8,background:'var(--amber-bg)',border:'1px solid #FCD34D',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🖼</div><div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>AcmeBrand_OldSt_Mar.png</div><div style={{fontSize:12.5,color:'var(--text-3)',marginTop:2}}>8.1 MB · Uploaded today · Under review</div></div><span className="badge b-amber">⏳ REVIEWING</span><button className="btn btn-g btn-sm" style={{color:'var(--red)'}}>Remove</button></div></div>
      <div className="card fi3"><div className="card-b">
        <div style={{fontWeight:600,fontSize:14,marginBottom:4}}>Upload New Creative</div>
        <div style={{fontSize:13,color:'var(--text-3)',marginBottom:14}}>PDF or PNG/JPG · Min 300 DPI · Max 50 MB</div>
        <div style={{border:'1.5px dashed var(--border-mid)',borderRadius:10,padding:'34px 24px',textAlign:'center',background:'var(--white)',cursor:'pointer'}}>
          <div style={{fontSize:26,marginBottom:9}}>⬆</div>
          <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Drag & drop your artwork here</div>
          <div style={{fontSize:13,color:'var(--text-3)',marginBottom:13}}>or</div>
          <button className="btn btn-s">Choose File</button>
        </div>
        <div style={{marginTop:13,background:'var(--blue-dim)',border:'1px solid var(--blue-mid)',borderRadius:8,padding:'10px 14px',fontSize:12.5,color:'#1D4ED8'}}>Creative review typically takes <strong>4–8 hours</strong>. Pre-approved templates are available for common formats.</div>
      </div></div>
    </div>
  </>)
}

export default function App(){
  const [page,setPage]=useState('browse')
  const [col,setCol]=useState(false)
  const [mode,setMode]=useState('buyer')
  const [newListing,setNewListing]=useState(null)
  function go(p){setPage(p)}
  const pages={
    browse:<Browse/>,map:<MapView/>,watch:<Watchlist/>,
    'b-bids':<BBids/>,'b-campaigns':<BCampaigns/>,'b-creative':<BCreative/>,
    's-listings':<SListings go={go} newListing={newListing}/>,
    's-upload':<SUpload go={go} onPublish={fm=>setNewListing(fm)}/>,
    's-revenue':<SRevenue/>,
  }
  return(<>
    <style>{STYLE}</style>
    <div className="layout">
      <Sidebar page={page} go={go} col={col} setCol={setCol}/>
      <div className={`main ${col?'col':''}`}>
        <ModeBar mode={mode} setMode={setMode} go={go}/>
        {pages[page]||<Browse/>}
      </div>
    </div>
  </>)
}
