import type { Pattern } from "@/src/types/patternTypes";
import { useEffect, useState } from "react";
import { patternService } from "../services/data";

interface UsePatternOptions {
  id?: string;
  userId?: string;
}

interface UsePatternResult {
  pattern: Pattern | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export function usePattern({ id, userId }: UsePatternOptions): UsePatternResult {
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!id || !userId) {
        setPattern(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await patternService.getPatternById(id, userId)

        if (!active) return;

        if (!data) {
          setPattern(null);
          setError("Pattern konnte nicht geladen werden.");
        } else {
          setPattern(data);
        }
      } catch (e) {
        if (!active) return;
        console.error("usePattern load error", e);
        setError("Unerwarteter Fehler beim Laden des Patterns.");
        setPattern(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [id, userId, reloadToken]);

  function reload() {
    setReloadToken((t) => t + 1);
  }

  return { pattern, loading, error, reload };
}
