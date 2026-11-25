'use client';

import React, { useMemo, useState } from 'react';
import { DOODLES, type DoodleCategory } from '@/lib/doodles';
import { Doodle, type DoodleTone } from '@/components/doodles';

const CATEGORIES: Array<'all' | DoodleCategory> = [
  'all',
  'brand',
  'seeds',
  'berries',
  'dry-fruits',
  'nuts',
  'makhana-spices',
  'farm-story',
  'connectors',
];

const TONES: DoodleTone[] = ['oat', 'apricot', 'peach', 'flame', 'ink'];

export function DoodlePreviewClient() {
  const [category, setCategory] = useState<'all' | DoodleCategory>('all');
  const [tone, setTone] = useState<DoodleTone>('oat');
  const [surface, setSurface] = useState<'navy' | 'oat'>('navy');
  const [drawEnabled, setDrawEnabled] = useState(true);
  const [drawKey, setDrawKey] = useState(0);
  const [search, setSearch] = useState('');

  const items = useMemo(() => {
    const q = search.trim().toLowerCase();
    return Object.values(DOODLES).filter((d) => {
      if (category !== 'all' && d.category !== category) return false;
      if (q && !d.name.includes(q) && !d.tags.some((t) => t.includes(q))) return false;
      return true;
    });
  }, [category, search]);

  return (
    <div
      className={`min-h-[100dvh] pt-24 pb-20 px-4 sm:px-8 transition-colors ${
        surface === 'navy' ? 'bg-navy text-oat' : 'bg-[#F6EFE2] text-[#1A1410]'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-current/15 pb-6">
          <div>
            <span className="font-ui-label text-[11px] opacity-75 block mb-1">
              Dev-Only Asset Inspector · {items.length} / {Object.keys(DOODLES).length} Doodles
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-medium">
              Yagya Doodle Library
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by name or tag..."
              className="px-3 py-2 rounded-[4px] border border-current/25 bg-transparent"
            />
            <button
              type="button"
              onClick={() => {
                setSurface((s) => (s === 'navy' ? 'oat' : 'navy'));
                setTone((t) => (t === 'ink' ? 'oat' : 'ink'));
              }}
              className="px-3 py-2 rounded-[4px] border border-current/25 cursor-pointer"
            >
              Surface: {surface === 'navy' ? 'Dark Navy' : 'Light Oat'}
            </button>
            <button
              type="button"
              onClick={() => setDrawEnabled((v) => !v)}
              className="px-3 py-2 rounded-[4px] border border-current/25 cursor-pointer"
            >
              Draw: {drawEnabled ? 'On' : 'Off'}
            </button>
            <button
              type="button"
              onClick={() => setDrawKey((k) => k + 1)}
              className="px-3 py-2 rounded-[4px] bg-flame text-oat cursor-pointer"
            >
              Replay Draw
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-[4px] border text-xs cursor-pointer ${
                  category === c ? 'bg-flame text-oat border-flame' : 'border-current/20 opacity-80'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTone(t)}
                className={`px-3 py-1.5 rounded-[4px] border text-xs cursor-pointer ${
                  tone === t ? 'bg-flame text-oat border-flame' : 'border-current/20 opacity-80'
                }`}
              >
                tone: {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((d) => (
            <div
              key={d.name}
              className="rounded-[6px] border border-current/15 p-3 flex flex-col items-center justify-between gap-2 bg-current/[0.03]"
            >
              <div className="h-24 w-full flex items-center justify-center">
                <Doodle
                  name={d.name}
                  tone={tone}
                  size={d.viewBox.startsWith('0 0 400') ? 120 : 72}
                  draw={drawEnabled}
                  drawKey={drawKey}
                  inline
                />
              </div>
              <div className="w-full text-center">
                <p className="text-[11px] font-medium truncate" title={d.name}>
                  {d.name}
                </p>
                <p className="text-[10px] opacity-65 truncate">
                  {d.category} · {d.recommendedUse}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
