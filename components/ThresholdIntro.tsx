"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { BrandSeal } from "./Ornaments";

const SESSION_KEY = "codex-nocturnum-threshold-v1";
const INTRO_DURATION = 4900;

type ParticleStyle = CSSProperties & {
  "--x"?: string;
  "--y"?: string;
  "--dx"?: string;
  "--dy"?: string;
  "--delay"?: string;
  "--size"?: string;
  "--spin"?: string;
};

function makeParticles(count: number, gold = false) {
  return Array.from({ length: count }, (_, index) => {
    const angle = ((index * 137.5 + (gold ? 19 : 0)) % 360) * (Math.PI / 180);
    const radius = 18 + ((index * 29) % 54);
    const x = 50 + Math.cos(angle) * (5 + ((index * 7) % 13));
    const y = 49 + Math.sin(angle) * (3 + ((index * 11) % 9));
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius * 0.72 - 8;
    const size = gold ? 1 + (index % 3) * 0.7 : 2 + (index % 5) * 1.4;

    return {
      "--x": `${x}%`,
      "--y": `${y}%`,
      "--dx": `${dx}vw`,
      "--dy": `${dy}vh`,
      "--delay": `${(index % 9) * 24}ms`,
      "--size": `${size}px`,
      "--spin": `${140 + (index % 7) * 61}deg`,
    } satisfies ParticleStyle;
  });
}

const ash = makeParticles(48);
const gilt = makeParticles(22, true);

function playCreak(contextRef: React.MutableRefObject<AudioContext | null>) {
  if (typeof window === "undefined") return;
  const AudioCtor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtor) return;

  const ctx = contextRef.current ?? new AudioCtor();
  contextRef.current = ctx;

  const start = () => {
    const now = ctx.currentTime + 0.02;
    const master = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(780, now);
    filter.frequency.exponentialRampToValueAtTime(210, now + 1.75);
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.12, now + 0.13);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 2.05);
    filter.connect(master).connect(ctx.destination);

    const length = Math.max(1, Math.floor(ctx.sampleRate * 2.1));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      const envelope = Math.pow(1 - i / length, 1.7);
      data[i] = (Math.sin(i * 0.031) * 0.18 + Math.sin(i * 0.0087) * 0.11 + (Math.random() * 2 - 1) * 0.48) * envelope;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.playbackRate.setValueAtTime(0.78, now);
    noise.connect(filter);
    noise.start(now);

    [62, 91].forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = index ? "triangle" : "sawtooth";
      osc.frequency.setValueAtTime(frequency, now);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.58, now + 1.65);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(index ? 0.018 : 0.028, now + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.85);
      osc.connect(gain).connect(master);
      osc.start(now);
      osc.stop(now + 1.9);
    });
  };

  if (ctx.state === "suspended") {
    void ctx.resume().then(start).catch(() => undefined);
  } else {
    start();
  }
}

export function ThresholdIntro() {
  const [visible, setVisible] = useState(true);
  const [soundHint, setSoundHint] = useState(true);
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const forceReplay = new URLSearchParams(window.location.search).get("threshold") === "1";

    try {
      if (!forceReplay && sessionStorage.getItem(SESSION_KEY) === "seen") {
        setVisible(false);
        return;
      }
      if (!forceReplay) sessionStorage.setItem(SESSION_KEY, "seen");
    } catch {
      // Session storage can be unavailable in hardened/private contexts.
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    if (reduceMotion) {
      const reducedTimer = window.setTimeout(() => {
        setVisible(false);
        document.documentElement.style.overflow = previousOverflow;
      }, 650);
      return () => {
        window.clearTimeout(reducedTimer);
        document.documentElement.style.overflow = previousOverflow;
      };
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = previousOverflow;
    }, INTRO_DURATION);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.style.overflow = previousOverflow;
      if (contextRef.current && contextRef.current.state !== "closed") {
        void contextRef.current.close();
      }
    };
  }, []);

  if (!visible) return null;

  const skip = () => {
    setVisible(false);
    document.documentElement.style.overflow = "";
  };

  const enableSound = () => {
    setSoundHint(false);
    window.setTimeout(() => playCreak(contextRef), 120);
  };

  return (
    <div
      className="threshold-intro"
      role="dialog"
      aria-label="Entering the Codex Nocturnum archive"
      onPointerDown={soundHint ? enableSound : undefined}
    >
      <button className="threshold-skip" type="button" onClick={(event) => { event.stopPropagation(); skip(); }}>
        Skip threshold
      </button>

      <div className="threshold-darkness" aria-hidden="true" />

      <div className="threshold-dust" aria-hidden="true">
        {ash.map((style, index) => <i className="threshold-particle threshold-particle--ash" style={style} key={`ash-${index}`} />)}
        {gilt.map((style, index) => <i className="threshold-particle threshold-particle--gilt" style={style} key={`gilt-${index}`} />)}
      </div>

      <div className="threshold-gate-scene" aria-hidden="true">
        <div className="threshold-arch">
          <span className="threshold-arch__stone threshold-arch__stone--1" />
          <span className="threshold-arch__stone threshold-arch__stone--2" />
          <span className="threshold-arch__stone threshold-arch__stone--3" />
        </div>

        <div className="threshold-gate">
          <div className="threshold-door threshold-door--left">
            <span className="threshold-door__panel threshold-door__panel--top" />
            <span className="threshold-door__panel threshold-door__panel--bottom" />
            <span className="threshold-hinge threshold-hinge--one" />
            <span className="threshold-hinge threshold-hinge--two" />
          </div>
          <div className="threshold-door threshold-door--right">
            <span className="threshold-door__panel threshold-door__panel--top" />
            <span className="threshold-door__panel threshold-door__panel--bottom" />
            <span className="threshold-hinge threshold-hinge--one" />
            <span className="threshold-hinge threshold-hinge--two" />
          </div>

          <div className="threshold-gate__seal">
            <BrandSeal />
            <strong>CODEX NOCTURNUM</strong>
            <span>ARCHIVUM · ADITUS</span>
          </div>
        </div>
      </div>

      <div className="threshold-corridor" aria-hidden="true">
        <div className="threshold-corridor__ceiling">
          {Array.from({ length: 7 }, (_, index) => <i key={`beam-${index}`} style={{ "--beam": index } as CSSProperties} />)}
        </div>
        <div className="threshold-wall threshold-wall--left">
          {Array.from({ length: 8 }, (_, index) => (
            <div className="threshold-shelf" key={`left-${index}`}>
              <span /><span /><span /><span /><span /><span />
            </div>
          ))}
        </div>
        <div className="threshold-wall threshold-wall--right">
          {Array.from({ length: 8 }, (_, index) => (
            <div className="threshold-shelf" key={`right-${index}`}>
              <span /><span /><span /><span /><span /><span />
            </div>
          ))}
        </div>
        <div className="threshold-floor">
          {Array.from({ length: 10 }, (_, index) => <i key={`floor-${index}`} />)}
        </div>
        <div className="threshold-endlight"><span>CODEX NOCTURNUM</span></div>
        <div className="threshold-papers">
          {Array.from({ length: 9 }, (_, index) => (
            <i key={`paper-${index}`} style={{ "--paper": index } as CSSProperties} />
          ))}
        </div>
      </div>

      <div className="threshold-vignette" aria-hidden="true" />

      {soundHint && (
        <div className="threshold-sound-hint" aria-hidden="true">
          <span>tap anywhere for sound</span>
        </div>
      )}
    </div>
  );
}
