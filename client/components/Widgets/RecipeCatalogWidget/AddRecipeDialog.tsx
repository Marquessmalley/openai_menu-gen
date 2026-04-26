"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { createMenuItem } from "@/lib/data";

function defaultSides(): string[] {
  return [""];
}

export function AddRecipeDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [sides, setSides] = useState<string[]>(defaultSides);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setName("");
    setSides(defaultSides());
    setError(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openDialog = () => {
    resetForm();
    setOpen(true);
  };

  const closeDialog = () => {
    if (loading) return;
    setOpen(false);
  };

  const updateSide = (index: number, value: string) => {
    setSides((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const addSideRow = () => {
    setSides((prev) => [...prev, ""]);
  };

  const removeSideRow = (index: number) => {
    setSides((prev) =>
      prev.length <= 1 ? prev : prev.filter((_, i) => i !== index),
    );
  };

  const trimmedName = name.trim();
  const cleanedSides = sides.map((s) => s.trim()).filter((s) => s.length > 0);
  const canSubmit =
    trimmedName.length > 0 && cleanedSides.length > 0 && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      await createMenuItem({ name: trimmedName, sides: cleanedSides });
      setOpen(false);
      resetForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500 text-white shadow-sm transition hover:bg-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
        aria-label="Add recipe to catalog"
      >
        <Plus className="h-5 w-5" aria-hidden />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close dialog"
            onClick={closeDialog}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-recipe-title"
            className="relative z-10 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-600 dark:bg-gray-800"
          >
            <h3
              id="add-recipe-title"
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              Add recipe
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Enter the main dish and side dishes. They will be saved to the
              catalog.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="recipe-name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  id="recipe-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  placeholder="e.g. Shrimp Scampi"
                  autoComplete="off"
                  disabled={loading}
                />
              </div>

              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sides
                </span>
                <ul className="mt-2 space-y-2">
                  {sides.map((side, index) => (
                    <li key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={side}
                        onChange={(e) => updateSide(index, e.target.value)}
                        className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                        placeholder="Side dish"
                        aria-label={`Side ${index + 1}`}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => removeSideRow(index)}
                        disabled={loading || sides.length <= 1}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        aria-label={`Remove side ${index + 1}`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={addSideRow}
                  disabled={loading}
                  className="mt-2 text-sm font-medium text-teal-600 hover:text-teal-700 disabled:opacity-50 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  + Add side
                </button>
              </div>

              {error ? (
                <p
                  className="text-sm text-red-600 dark:text-red-400"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeDialog}
                  disabled={loading}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Saving…" : "Save recipe"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
