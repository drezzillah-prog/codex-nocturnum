"use client";

import { useEffect, useRef, useState } from "react";
import { BrandSeal } from "./Ornaments";

const SESSION_KEY = "codex-nocturnum-threshold-v3";
const FULL_DURATION = 6200;

function playDoorSound(ref: React.MutableRefObject<AudioContext | null>) {
  const context = ref.current ?? new AudioContext();
  ref.current = context;

  const begin = () => {
    const now = context.currentTime;
    const creakAt = now + 0.65;
    const thumpAt = now + 1.85;

    const noiseBuffer = context.createBuffer(1, Math.floor(context.sampleRate * 1.65), context.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let index = 0; index < data.length; index += 1) {
      const progress = index / data.length;
      const envelope = Math.pow(1 - progress, 1.45);
      data[index] = (Math.random() * 2 - 1) * envelope;
    }

    const noise = context.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(860, creakAt);
    filter.frequency.exponentialRampToValueAtTime(190, creakAt + 1.45);
    const noiseGain = context.createGain();
    noiseGain.gain.setValueAtTime(0.0001, creakAt);
    noiseGain.gain.exponentialRampToValueAtTime(0.07, creakAt + 0.12);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, creakAt + 1.55);
    noise.connect(filter).connect(noiseGain).connect(context.destination);
    noise.start(creakAt);

    const groan = context.createOscillator();
    const groanGain = context.createGain();
    groan.type = "triangle";
    groan.frequency.setValueAtTime(76, creakAt);
    groan.frequency.exponentialRampToValueAtTime(43, creakAt + 1.5);
    groanGain.gain.setValueAtTime(0.0001, creakAt);
    groanGain.gain.exponentialRampToValueAtTime(0.035, creakAt + 0.14);
    groanGain.gain.exponentialRampToValueAtTime(0.0001, creakAt + 1.55);
    groan.connect(groanGain).connect(context.destination);
    groan.start(creakAt);
    groan.stop(creakAt + 1.6);

    const thump = context.createOscillator();
    const thumpGain = context.createGain();
    thump.type = "sine";
    thump.frequency.setValueAtTime(55, thumpAt);
    thump.frequency.exponentialRampToValueAtTime(32, thumpAt + 0.42);
    thumpGain.gain.setValueAtTime(0.16, thumpAt);
    thumpGain.gain.exponentialRampToValueAtTime(0.0001, thumpAt + 0.48);
    thump.connect(thumpGain).connect(context.destination);
    thump.start(thumpAt);
    thump.stop(thumpAt + 0.5);
  };

  if (context.state === "suspended") {
    void context.resume().then(begin).catch(() => undefined);
  } else {
    begin();
  }
}

export function ThresholdIntro() {
  const [visible, setVisible] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const replay = new URLSearchParams(window.location.search).get("threshold") === "1";

    try {
      if (!replay && sessionStorage.getItem(SESSION_KEY) === "seen") {
        setVisible(false);
        return;
      }
      if (!replay) sessionStorage.setItem(SESSION_KEY, "seen");
    } catch {
      // Continue when storage is unavailable.
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const oldOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = oldOverflow;
    }, reduced ? 700 : FULL_DURATION);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.style.overflow = oldOverflow;
    };
  }, []);

  if (!visible) return null;

  const close = () => {
    setVisible(false);
    document.documentElement.style.overflow = "";
  };

  const enableSound = () => {
    if (soundEnabled) return;
    setSoundEnabled(true);
    playDoorSound(audioRef);
  };

  return (
    <div className="threshold-v3" role="dialog" aria-label="Entering Codex Nocturnum" onPointerDown={enableSound}>
      <button className="threshold-v3__skip" type="button" onClick={(event) => { event.stopPropagation(); close(); }}>
        Skip
      </button>

      {!soundEnabled && <div className="threshold-v3__sound">tap for sound</div>}

      <div className="threshold-v3__dark" aria-hidden="true" />
      <div className="threshold-v3__smoke" aria-hidden="true"><i /><i /><i /></div>

      <div className="threshold-v3__ash" aria-hidden="true">
        {Array.from({ length: 34 }, (_, index) => <i key={`ash-${index}`} />)}
      </div>

      <div className="threshold-v3__glints" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => <i key={`glint-${index}`} />)}
      </div>

      <div className="threshold-v3__gate-stage" aria-hidden="true">
        <div className="threshold-v3__arch" />
        <div className="threshold-v3__gate">
          <div className="threshold-v3__door threshold-v3__door--left"><span /><span /><b /></div>
          <div className="threshold-v3__door threshold-v3__door--right"><span /><span /><b /></div>
          <div className="threshold-v3__seal"><BrandSeal /><strong>CODEX NOCTURNUM</strong><small>ARCHIVUM · ADITUS</small></div>
        </div>
      </div>

      <div className="threshold-v3__corridor" aria-hidden="true">
        <div className="threshold-v3__vanish" />
        <div className="threshold-v3__wall threshold-v3__wall--left">
          {Array.from({ length: 7 }, (_, index) => <div className="threshold-v3__shelf" key={index}><i /><i /><i /><i /></div>)}
        </div>
        <div className="threshold-v3__wall threshold-v3__wall--right">
          {Array.from({ length: 7 }, (_, index) => <div className="threshold-v3__shelf" key={index}><i /><i /><i /><i /></div>)}
        </div>
        <div className="threshold-v3__floor" />
        <div className="threshold-v3__paper"><i /><i /><i /><i /></div>
      </div>

      <div className="threshold-v3__vignette" aria-hidden="true" />
    </div>
  );
}
