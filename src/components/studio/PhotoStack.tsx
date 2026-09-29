"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";

const photos = [
  { src: "/studio/ahmad-portrait.webp", alt: "Ahmad smiling in an elevator", caption: "A little glimpse of me", position: "50% 35%" },
  { src: "/ahmad_1.webp", alt: "Ahmad walking across a court", caption: "Out and about", position: "50% 50%" },
  { src: "/studio/ahmad-side.webp", alt: "Ahmad smiling during a candid moment", caption: "A candid moment", position: "50% 40%" },
] as const;

const DISMISS_MS = 380;

export default function PhotoStack() {
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [exitDirection, setExitDirection] = useState<0 | -1 | 1>(0);
  const start = useRef<{ x: number; time: number; pointerId: number } | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
  }, []);

  const showNext = (direction: -1 | 1) => {
    if (exitDirection) return;
    setDragging(false);
    setExitDirection(direction);
    dismissTimer.current = setTimeout(() => {
      setActive(index => (index + 1) % photos.length);
      setOffset(0);
      setExitDirection(0);
    }, DISMISS_MS);
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>, depth: number) => {
    if (depth !== 0 || exitDirection || (event.pointerType === "mouse" && event.button !== 0)) return;
    start.current = { x: event.clientX, time: performance.now(), pointerId: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!start.current || start.current.pointerId !== event.pointerId) return;
    setOffset(Math.max(-420, Math.min(420, event.clientX - start.current.x)));
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    const gesture = start.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    start.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const distance = event.clientX - gesture.x;
    const speed = Math.abs(distance) / Math.max(1, performance.now() - gesture.time);
    if (Math.abs(distance) > 72 || (Math.abs(distance) > 28 && speed > .45)) {
      showNext(distance < 0 ? -1 : 1);
    } else {
      setDragging(false);
      setOffset(0);
    }
  };

  const handlePointerCancel = () => {
    start.current = null;
    setDragging(false);
    setOffset(0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>, depth: number) => {
    if (depth !== 0 || !["ArrowLeft", "ArrowRight", "Enter", " "].includes(event.key)) return;
    event.preventDefault();
    showNext(event.key === "ArrowRight" ? 1 : -1);
  };

  return <div className="polaroid-stack" aria-label="Photos of Ahmad Syahani">
    {photos.map((photo, index) => {
      const depth = (index - active + photos.length) % photos.length;
      const isFront = depth === 0;
      const transform = isFront
        ? exitDirection
          ? `translate3d(${exitDirection * 470}px, ${Math.abs(offset) * .08}px, 0) rotate(${exitDirection * 18}deg)`
          : `translate3d(${offset}px, ${Math.abs(offset) * .08}px, 0) rotate(${offset * .055}deg)`
        : depth === 1
          ? "translate3d(32px, -14px, 0) rotate(7deg)"
          : "translate3d(-22px, -28px, 0) rotate(-9deg)";
      return <figure
        key={photo.src}
        className={`polaroid${isFront ? " is-front" : ""}${dragging && isFront ? " is-dragging" : ""}`}
        style={{ zIndex: photos.length - depth, transform, opacity: isFront && exitDirection ? 0 : 1 }}
        role={isFront ? "button" : undefined}
        tabIndex={isFront ? 0 : -1}
        aria-hidden={!isFront}
        aria-label={isFront ? `${photo.caption}. Drag left or right, or press Enter, to see the next photo.` : undefined}
        onPointerDown={event => handlePointerDown(event, depth)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onKeyDown={event => handleKeyDown(event, depth)}
      >
        <div className="polaroid-photo"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 809px) 80vw, 365px" draggable={false} style={{ objectPosition: photo.position }} /></div>
        <figcaption>{photo.caption}</figcaption>
      </figure>;
    })}
    <span className="photo-drag-hint" aria-hidden="true">Drag the photo to explore ↔</span>
    <span className="sr-only" aria-live="polite">{photos[active].caption}</span>
  </div>;
}
