"use client";

import { useCallback, useEffect, useState } from "react";
import type { Identity } from "@/types/contact";

const STORAGE_KEY = "amiolas:contact:v1";

export type ContactStored = {
  conversationId: string;
  identity: Identity;
};

function read(): ContactStored | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw) as Partial<ContactStored>;
    if (!obj.conversationId || !obj.identity?.name || !obj.identity?.email) {
      return null;
    }
    return { conversationId: obj.conversationId, identity: obj.identity };
  } catch {
    return null;
  }
}

function write(value: ContactStored) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* localStorage unavailable — ignore */
  }
}

function erase() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function useContactStorage() {
  const [stored, setStored] = useState<ContactStored | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStored(read());
    setHydrated(true);
  }, []);

  const save = useCallback((next: ContactStored) => {
    write(next);
    setStored(next);
  }, []);

  const clear = useCallback(() => {
    erase();
    setStored(null);
  }, []);

  return { stored, hydrated, save, clear };
}
