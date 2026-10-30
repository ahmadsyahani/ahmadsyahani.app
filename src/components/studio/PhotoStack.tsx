"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";

const photos = [
  { src: "/studio/ahmad-cafe.jpeg", alt: "Ahmad wearing glasses and a black shirt at a cafe", caption: "A little glimpse of me", position: "50% 65%" },
  { src: "/studio/ahmad-campus.jpeg", alt: "Ahmad wearing glasses and a green striped shirt", caption: "Out and about", position: "50% 38%" },
  { src: "/studio/ahmad-coding.jpeg", alt: "Ahmad on a laptop camera preview while coding at a cafe", caption: "Behind the code", position: "50% 68%" },
] as const;
type Photo = (typeof photos)[number];

function PhotoContents({ photo }: { photo: Photo }) {
  return <><div className="polaroid-photo"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 809px) 80vw, 365px" draggable={false} style={{ objectPosition: photo.position }} /></div><figcaption>{photo.caption}</figcaption></>;
}

const poseFor = (depth: number) => depth === 0 ? { x: 0, y: 0, rotate: 0 } : depth === 1 ? { x: 25, y: -12, rotate: 6 } : { x: -18, y: -24, rotate: -7 };

function DraggablePhoto({ photo, depth, focusOnMount, onChange }: { photo: Photo; depth: number; focusOnMount: boolean; onChange: (direction: number, keyboard: boolean) => void }) {
  const reduced = useReducedMotion();
  const element = useRef<HTMLElement>(null);
  const initialPose = poseFor(depth);
  const x = useMotionValue(initialPose.x);
  const y = useMotionValue(initialPose.y);
  const rotate = useMotionValue(initialPose.rotate);
  const opacity = useMotionValue(1);
  const previousDepth = useRef(depth);
  const gesture = useRef<{ id: number; start: number; lastMove: number } | null>(null);
  const busy = useRef(false);
  const moved = useRef(false);
  const animations = useRef<Array<{ stop: () => void }>>([]);
  const [dragging, setDragging] = useState(false);
  const stop = () => { animations.current.forEach(animation => animation.stop()); animations.current = []; };

  useEffect(() => {
    const before = previousDepth.current;
    previousDepth.current = depth;
    busy.current = false;
    const pose = poseFor(depth);
    const settings = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 125, damping: 23, mass: 1.1 };
    // Recycle the dismissed photo behind the stack while it is invisible.
    if (before === 0 && depth !== 0) {
      x.set(pose.x); y.set(pose.y); rotate.set(pose.rotate);
      animations.current = [animate(opacity, 1, { duration: reduced ? 0 : .4 })];
    } else {
      animations.current = [animate(x, pose.x, settings), animate(y, pose.y, settings), animate(rotate, pose.rotate, settings)];
    }
    if (depth === 0 && focusOnMount) element.current?.focus({ preventScroll: true });
    return () => { animations.current.forEach(animation => animation.stop()); };
  }, [depth, focusOnMount, reduced, x, y, rotate, opacity]);

  const settle = () => {
    stop();
    setDragging(false);
    const settings = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 145, damping: 25, mass: 1.1 };
    animations.current = [animate(x, 0, settings), animate(y, 0, settings), animate(rotate, 0, settings)];
  };
  const dismiss = (direction: number, keyboard = false) => {
    if (busy.current || depth !== 0) return;
    busy.current = true;
    gesture.current = null;
    setDragging(false);
    stop();
    const distance = Math.max(260, (element.current?.offsetWidth ?? 340) * 1.05);
    animations.current = [
      animate(opacity, 0, { duration: reduced ? 0 : .35, delay: reduced ? 0 : .2 }),
      animate(y, 18, { duration: reduced ? 0 : .6 }),
      animate(rotate, direction * 12, { duration: reduced ? 0 : .6 }),
      animate(x, direction * distance, { duration: reduced ? 0 : .65, ease: [.25, .65, .3, 1], onComplete: () => onChange(direction, keyboard) }),
    ];
  };
  const cancel = () => {
    if (!gesture.current || busy.current) return;
    gesture.current = null;
    settle();
  };
  const release = (event: PointerEvent<HTMLElement>) => {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    const velocity = performance.now() - current.lastMove < 80 ? x.getVelocity() : 0;
    const distance = x.get();
    gesture.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const threshold = Math.max(55, event.currentTarget.offsetWidth * .23);
    if (Math.abs(distance) >= threshold || (Math.abs(distance) > 28 && Math.abs(velocity) > 550)) dismiss(distance < 0 ? -1 : 1);
    else settle();
  };

  return <motion.figure ref={element} className={`polaroid${depth === 0 ? " is-front" : ""}${dragging && depth === 0 ? " is-dragging" : ""}`} style={{ x, y, rotate, opacity, zIndex: 3 - depth }}
    initial={false} role={depth === 0 ? "button" : undefined} tabIndex={depth === 0 ? 0 : -1} aria-hidden={depth !== 0}
    aria-label={`${photo.caption}. Swipe left for the next photo or right for the previous photo. Use arrow keys or press Enter.`}
    onPointerDown={event => {
      if (depth !== 0 || busy.current || gesture.current || event.button !== 0 || !event.isPrimary) return;
      stop(); moved.current = false;
      gesture.current = { id: event.pointerId, start: event.clientX - x.get(), lastMove: performance.now() };
      event.currentTarget.setPointerCapture(event.pointerId);
    }}
    onPointerMove={event => {
      const current = gesture.current;
      if (!current || current.id !== event.pointerId) return;
      const distance = event.clientX - current.start;
      if (!moved.current && Math.abs(distance) > 6) { moved.current = true; setDragging(true); }
      current.lastMove = performance.now();
      x.set(distance);
      y.set(reduced ? 0 : Math.min(18, Math.abs(distance) * .04));
      rotate.set(reduced ? 0 : Math.max(-12, Math.min(12, distance * .025)));
    }}
    onPointerUp={release} onPointerCancel={cancel} onLostPointerCapture={cancel}
    onClick={() => { if (!moved.current && !busy.current) dismiss(-1); }}
    onKeyDown={event => {
      if (depth !== 0 || !["ArrowLeft", "ArrowRight", "Enter", " "].includes(event.key)) return;
      event.preventDefault();
      if (!event.repeat && !gesture.current) dismiss(event.key === "ArrowLeft" ? 1 : -1, true);
    }}>
    <PhotoContents photo={photo} />
  </motion.figure>;
}

export default function PhotoStack() {
  const [current, setCurrent] = useState({ index: 0, revision: 0, keyboard: false });
  return <div className="polaroid-stack" aria-label="Photos of Ahmad Syahani">
    {photos.map((photo, index) => <DraggablePhoto key={photo.src} photo={photo} depth={(index - current.index + photos.length) % photos.length} focusOnMount={current.keyboard}
      onChange={(direction, keyboard) => setCurrent(value => ({ index: (value.index + (direction < 0 ? 1 : -1) + photos.length) % photos.length, revision: value.revision + 1, keyboard }))} />)}
    <span className="photo-drag-hint" aria-hidden="true">Drag or tap to explore ↔</span>
    <span className="sr-only" aria-live="polite">{photos[current.index].caption}</span>
  </div>;
}
