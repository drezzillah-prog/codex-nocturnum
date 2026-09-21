"use client";

import { useEffect, useState } from "react";
import { BrandSeal } from "./Ornaments";

const SESSION_KEY = "codex-nocturnum-threshold-v2";
const FULL_DURATION = 5600;

export function ThresholdIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const replay = new URLSearchParams(window.location.search).get("threshold") === "1";

    try {
      if (!replay && sessionStorage.getItem(SESSION_KEY) === "seen") {
        setVisible(false);
        return;
      }
      if (!replay) sessionStorage.setItem(SESSION_KEY, "seen");
    } catch {
      // Continue without session persistence when storage is unavailable.
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

  return (
    <div className="threshold-v2" role="dialog" aria-label="Entering Codex Nocturnum">
      <button className="threshold-v2__skip" type="button" onClick={close}>
        Skip
      </button>

      <div className="threshold-v2__black" aria-hidden="true" />

      <div className="threshold-v2__dust" aria-hidden="true">
        {Array.from({ length: 28 }, (_, index) => (
          <i key={index} />
        ))}
      </div>

      <div className="threshold-v2__gate-stage" aria-hidden="true">
        <div className="threshold-v2__stone-arch" />
        <div className="threshold-v2__gate">
          <div className="threshold-v2__door threshold-v2__door--left">
            <b />
            <span />
            <span />
          </div>
          <div className="threshold-v2__door threshold-v2__door--right">
            <b />
            <span />
            <span />
          </div>
          <div className="threshold-v2__seal">
            <BrandSeal />
            <strong>CODEX NOCTURNUM</strong>
            <small>ARCHIVUM · ADITUS</small>
          </div>
        </div>
      </div>

      <div className="threshold-v2__corridor" aria-hidden="true">
        <div className="threshold-v2__corridor-light" />
        <div className="threshold-v2__corridor-left">
          {Array.from({ length: 7 }, (_, index) => (
            <div className="threshold-v2__shelf" key={index}>
              <i /><i /><i /><i /><i />
            </div>
          ))}
        </div>
        <div className="threshold-v2__corridor-right">
          {Array.from({ length: 7 }, (_, index) => (
            <div className="threshold-v2__shelf" key={index}>
              <i /><i /><i /><i /><i />
            </div>
          ))}
        </div>
        <div className="threshold-v2__floor" />
        <div className="threshold-v2__papers">
          {Array.from({ length: 6 }, (_, index) => <i key={index} />)}
        </div>
      </div>

      <div className="threshold-v2__iris" aria-hidden="true" />
    </div>
  );
}
