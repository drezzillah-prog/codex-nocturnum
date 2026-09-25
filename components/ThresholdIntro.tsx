"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";

const SESSION_KEY = "codex-nocturnum-threshold-v5";
const FULL_DURATION = 11600;

function playDoorSound(ref: MutableRefObject<AudioContext | null>) {
  const context = ref.current ?? new AudioContext();
  ref.current = context;

  const begin = () => {
    const now = context.currentTime;
    const creakAt = now + 1.4;
    const thumpAt = now + 4.7;

    const noiseBuffer = context.createBuffer(1, Math.floor(context.sampleRate * 3.6), context.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i=0;i<data.length;i+=1) {
      const t=i/data.length;
      const scrape=Math.sin(i*.018)*.22 + Math.sin(i*.004)*.13;
      data[i]=(Math.random()*2-1)*Math.pow(1-t,1.15)*(0.55+scrape);
    }

    const noise=context.createBufferSource();
    const filter=context.createBiquadFilter();
    const gain=context.createGain();
    noise.buffer=noiseBuffer;
    filter.type="lowpass";
    filter.frequency.setValueAtTime(1050,creakAt);
    filter.frequency.exponentialRampToValueAtTime(135,creakAt+3.1);
    gain.gain.setValueAtTime(.0001,creakAt);
    gain.gain.exponentialRampToValueAtTime(.055,creakAt+.18);
    gain.gain.setValueAtTime(.045,creakAt+1.35);
    gain.gain.exponentialRampToValueAtTime(.0001,creakAt+3.3);
    noise.connect(filter).connect(gain).connect(context.destination);
    noise.start(creakAt);

    const groan=context.createOscillator();
    const groanGain=context.createGain();
    groan.type="triangle";
    groan.frequency.setValueAtTime(62,creakAt);
    groan.frequency.exponentialRampToValueAtTime(31,creakAt+3.0);
    groanGain.gain.setValueAtTime(.0001,creakAt);
    groanGain.gain.exponentialRampToValueAtTime(.028,creakAt+.2);
    groanGain.gain.exponentialRampToValueAtTime(.0001,creakAt+3.15);
    groan.connect(groanGain).connect(context.destination);
    groan.start(creakAt);
    groan.stop(creakAt+3.2);

    const thump=context.createOscillator();
    const thumpGain=context.createGain();
    thump.type="sine";
    thump.frequency.setValueAtTime(49,thumpAt);
    thump.frequency.exponentialRampToValueAtTime(24,thumpAt+.7);
    thumpGain.gain.setValueAtTime(.19,thumpAt);
    thumpGain.gain.exponentialRampToValueAtTime(.0001,thumpAt+.72);
    thump.connect(thumpGain).connect(context.destination);
    thump.start(thumpAt);
    thump.stop(thumpAt+.75);
  };

  if (context.state==="suspended") void context.resume().then(begin).catch(()=>undefined);
  else begin();
}

function DoorLeaf({ side }:{ side:"left"|"right" }) {
  return (
    <div className={`threshold-v5__door threshold-v5__door--${side}`}>
      <div className="threshold-v5__door-frame" />
      {Array.from({length:6},(_,i)=><span className="threshold-v5__panel" key={i}><b/><i/><i/><i/><i/></span>)}
      <div className="threshold-v5__knocker" />
    </div>
  );
}

function ArchiveWall({ side }:{ side:"left"|"right" }) {
  return (
    <div className={`threshold-v5__wall threshold-v5__wall--${side}`}>
      {Array.from({length:7},(_,bay)=>(
        <div className="threshold-v5__bay" key={bay}>
          <span className="threshold-v5__bay-arch" />
          {Array.from({length:4},(_,shelf)=><i className="threshold-v5__shelf" key={shelf} />)}
        </div>
      ))}
    </div>
  );
}

export function ThresholdIntro() {
  const [visible,setVisible]=useState(true);
  const [soundEnabled,setSoundEnabled]=useState(false);
  const audioRef=useRef<AudioContext|null>(null);

  useEffect(()=>{
    const replay=new URLSearchParams(window.location.search).get("threshold")==="1";
    try {
      if (!replay && sessionStorage.getItem(SESSION_KEY)==="seen") { setVisible(false); return; }
      if (!replay) sessionStorage.setItem(SESSION_KEY,"seen");
    } catch {}

    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previous=document.documentElement.style.overflow;
    document.documentElement.style.overflow="hidden";
    const timer=window.setTimeout(()=>{setVisible(false);document.documentElement.style.overflow=previous;},reduced?750:FULL_DURATION);
    return ()=>{window.clearTimeout(timer);document.documentElement.style.overflow=previous;};
  },[]);

  if(!visible) return null;

  const enableSound=()=>{
    if(soundEnabled) return;
    setSoundEnabled(true);
    playDoorSound(audioRef);
  };

  return (
    <div className="threshold-v5" role="dialog" aria-label="Entering Codex Nocturnum" onPointerDown={enableSound}>
      <button className="threshold-v5__skip" type="button" onClick={(event)=>{event.stopPropagation();setVisible(false);document.documentElement.style.overflow="";}}>Skip threshold</button>
      {!soundEnabled && <span className="threshold-v5__sound">tap for door sound</span>}

      <div className="threshold-v5__dark" aria-hidden="true" />
      <div className="threshold-v5__dust-cloud" aria-hidden="true"><i/><i/><i/></div>
      <div className="threshold-v5__dust" aria-hidden="true">
        {Array.from({length:42},(_,i)=><i key={i}/>)}
      </div>

      <div className="threshold-v5__entrance" aria-hidden="true">
        <div className="threshold-v5__stone-surround"><i/><i/><i/><i/><i/></div>
        <div className="threshold-v5__bronze-frame">
          <DoorLeaf side="left" />
          <DoorLeaf side="right" />
          <div className="threshold-v5__lintel">CODEX NOCTURNUM · ARCHIVUM</div>
        </div>
      </div>

      <div className="threshold-v5__archive" aria-hidden="true">
        <div className="threshold-v5__ceiling">
          {Array.from({length:8},(_,i)=><i key={i}/>)}
        </div>
        <ArchiveWall side="left" />
        <ArchiveWall side="right" />
        <div className="threshold-v5__floor">
          {Array.from({length:9},(_,i)=><i key={i}/>)}
        </div>
        <div className="threshold-v5__lamps">
          {Array.from({length:6},(_,i)=><i key={i}/>)}
        </div>
        <div className="threshold-v5__far-door"><span>ARCHIVUM</span></div>
        <div className="threshold-v5__papers">{Array.from({length:5},(_,i)=><i key={i}/>)}</div>
      </div>

      <div className="threshold-v5__vignette" aria-hidden="true" />
    </div>
  );
}
