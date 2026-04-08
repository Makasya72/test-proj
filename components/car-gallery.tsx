'use client';

import { useMemo, useState } from 'react';

type CarGalleryProps = {
  title: string;
  images: string[];
};

export function CarGallery({ title, images }: CarGalleryProps) {
  const safeImages = useMemo(() => {
    const unique = Array.from(new Set(images.filter(Boolean)));
    return unique;
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);

  if (!safeImages.length) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-[32px] bg-[#efe9df] text-slate-500">
        No image
      </div>
    );
  }

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[32px] border border-[#e6ddd0] bg-[#fcfaf7] shadow-[0_12px_30px_rgba(44,69,89,0.06)]">
        <div className="relative aspect-[16/10] bg-[#efe9df]">
          <img
            src={safeImages[activeIndex]}
            alt={`${title} ${activeIndex + 1}`}
            className="h-full w-full object-cover"
          />

          {safeImages.length > 1 ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg font-bold text-slate-800 shadow transition hover:bg-white"
                aria-label="Previous image"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={goNext}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg font-bold text-slate-800 shadow transition hover:bg-white"
                aria-label="Next image"
              >
                ›
              </button>

              <div className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">
                {activeIndex + 1} / {safeImages.length}
              </div>
            </>
          ) : null}
        </div>
      </div>

      {safeImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
          {safeImages.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`overflow-hidden rounded-2xl border transition ${
                  isActive
                    ? 'border-[#233142] ring-2 ring-[#233142]/15'
                    : 'border-[#e6ddd0] hover:border-[#b6c3d1]'
                }`}
              >
                <div className="aspect-[4/3] bg-[#efe9df]">
                  <img
                    src={image}
                    alt={`${title} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}