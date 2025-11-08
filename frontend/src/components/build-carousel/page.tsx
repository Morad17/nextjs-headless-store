import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "./buildCarousel.scss";
import { useOrderStore } from "@/store/useOrderStore";

type OrderItem = any;

function getItemId(item: OrderItem): string | number {
  return item?.id ?? item?.product?.id ?? `${item?.category}-${item?.name}`;
}

function getItemName(item: OrderItem): string {
  return item?.name ?? item?.product?.name ?? "Component";
}

function getItemImage(item: OrderItem): string | undefined {
  return item?.imageUrl ?? item?.product?.imageUrl;
}

function getItemCategory(item: OrderItem): string | undefined {
  return item?.category ?? item?.product?.category;
}

const PLACEHOLDER_SRC = "/assets/images/placeholder-image.png";

export default function BuildCarousel() {
  const { currentOrder, getMainComponents, getAddOns } = useOrderStore();

  // Guaranteed image (fallback if missing / empty)
  const items = useMemo(() => {
    const main =
      typeof getMainComponents === "function" ? getMainComponents() : [];
    const addOns = typeof getAddOns === "function" ? getAddOns() : [];
    const merged =
      main.length || addOns.length ? [...main, ...addOns] : currentOrder || [];

    return merged.map((it: OrderItem) => {
      const raw = getItemImage(it);
      const cleaned =
        raw && typeof raw === "string" && raw.trim().length > 0
          ? raw
          : PLACEHOLDER_SRC;
      return {
        id: getItemId(it),
        title: getItemName(it),
        category: getItemCategory(it),
        image: cleaned,
      };
    });
  }, [currentOrder, getMainComponents, getAddOns]);

  const [index, setIndex] = useState(0);
  const activeIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    activeIdRef.current = items[index]?.id ?? null;
  }, [index, items]);

  useEffect(() => {
    if (items.length === 0) {
      setIndex(0);
      return;
    }
    const prevId = activeIdRef.current;
    if (prevId != null) {
      const newIdx = items.findIndex((s) => s.id === prevId);
      if (newIdx !== -1) {
        setIndex(newIdx);
        return;
      }
    }
    setIndex((prev) => Math.min(prev, items.length - 1));
  }, [items]);

  const canPrev = index > 0;
  const canNext = index < items.length - 1;

  const prev = () => canPrev && setIndex((i) => i - 1);
  const next = () => canNext && setIndex((i) => i + 1);
  const goTo = (i: number) => setIndex(i);

  if (items.length === 0) {
    return (
      <div className="build-carousel">
        <div className="bc-empty">
          <Image
            src={PLACEHOLDER_SRC}
            alt="No components"
            width={64}
            height={64}
          />
          <p>Select components to preview them here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="build-carousel">
      {/* Top-right title with count */}
      {items.length > 0 && (
        <div className="bc-selected-title" role="status" aria-live="polite">
          <span className="bc-selected-label">Selected components</span>
          <span className="bc-count">{items.length}</span>
        </div>
      )}
      <div className="bc-viewport">
        <motion.div
          className="bc-track"
          animate={{ x: `-${index * 100}%` }}
          transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
        >
          {items.map((item) => (
            <div className="bc-slide" key={item.id}>
              <div className="bc-image-wrap">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={320}
                  height={220}
                  className="bc-image"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    // Force placeholder if remote fails
                    if (!el.src.includes(PLACEHOLDER_SRC)) {
                      el.src = PLACEHOLDER_SRC;
                    }
                  }}
                />
              </div>
              <div className="bc-title" title={item.title}>
                {item.title}
              </div>
              <div className="bc-category">{item.category}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="bc-controls">
        <button
          type="button"
          className={`bc-arrow left ${canPrev ? "" : "disabled"}`}
          onClick={prev}
          aria-label="Previous"
          disabled={!canPrev}
        >
          ‹
        </button>

        <div
          className="bc-dots"
          role="tablist"
          aria-label="Selected components"
        >
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`bc-dot ${i === index ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>

        <button
          type="button"
          className={`bc-arrow right ${canNext ? "" : "disabled"}`}
          onClick={next}
          aria-label="Next"
          disabled={!canNext}
        >
          ›
        </button>
      </div>
    </div>
  );
}
