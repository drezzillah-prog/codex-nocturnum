"use client";

import { useEffect, useState, type CSSProperties } from "react";
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
    };
  }, []);

  if (!visible) return null;

  const skip = () => {
    setVisible(false);
    document.documentElement.style.overflow = "";
  };

use client";

import { useEffect, useState, type CSSProperties } from "react";
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
