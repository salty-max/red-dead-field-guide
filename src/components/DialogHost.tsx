import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button, IconButton } from "./ui";
import { chapters, readChapter } from "../lib/guide";
import { exportProgress } from "../lib/backup";
import { validateState } from "../lib/progress-state";
import { isOpen, useProgress } from "../store/progress";
import { themeOptions, useTheme, type ThemePreference } from "../store/theme";
import { useUi } from "../store/ui";
import type { ProgressState } from "../types";

/** One native <dialog> for the whole app; its content switches on the store. */
export function DialogHost() {
  const dialog = useUi((s) => s.dialog);
  const closeDialog = useUi((s) => s.closeDialog);
  const ref = useRef<HTMLDialogElement>(null);
  const trigger = useRef<Element | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (dialog && !element.open) {
      trigger.current = document.activeElement;
      element.showModal();
    } else if (!dialog && element.open) {
      element.close();
    }
    if (dialog) element.querySelector<HTMLElement>("[autofocus], input, select, .controls button")?.focus();
  }, [dialog]);

  const title = dialog?.kind === "settings" ? "Guide settings" : dialog?.title;

  return (
    <dialog
      id="dialog"
      ref={ref}
      aria-labelledby="dialog-title"
      onClose={() => {
        closeDialog();
        if (trigger.current instanceof HTMLElement && trigger.current.isConnected) trigger.current.focus({ preventScroll: true });
        trigger.current = null;
      }}
    >
      {dialog && (
        <>
          <h2 id="dialog-title">{title}</h2>
          <span className="close">
            <IconButton label="Close dialog" icon="x" onClick={closeDialog} />
          </span>
          {dialog.kind === "settings" ? <SettingsForm /> : <ConfirmBody dialog={dialog} />}
        </>
      )}
    </dialog>
  );
}

function ConfirmBody({ dialog }: { dialog: Extract<NonNullable<ReturnType<typeof useUi.getState>["dialog"]>, { kind: "confirm" }> }) {
  const closeDialog = useUi((s) => s.closeDialog);
  return (
    <>
      <p>{dialog.explanation}</p>
      <div className="controls">
        <Button
          look={dialog.danger ? "danger" : ""}
          onClick={() => {
            closeDialog();
            dialog.onConfirm();
          }}
        >
          {dialog.label}
        </Button>
        <Button onClick={closeDialog}>Cancel</Button>
      </div>
    </>
  );
}

function SettingsForm() {
  const data = useProgress((s) => s.data);
  const storageError = useProgress((s) => s.storageError);
  const preference = useTheme((s) => s.preference);
  const closeDialog = useUi((s) => s.closeDialog);
  const announce = useUi((s) => s.announce);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [imported, setImported] = useState<ProgressState>();
  const [feedback, setFeedback] = useState<{ text: string; error: boolean }>({ text: "", error: false });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    useTheme.getState().setPreference(fields.get("theme") as ThemePreference);
    useProgress.getState().saveSettings({ spoilers: fields.has("spoilers"), ceiling: readChapter(fields.get("ceiling")) });
    closeDialog();
    const next = useProgress.getState().data;
    const [view, param] = pathname.split("/").filter(Boolean);
    if (view === "guide" && !isOpen(next, readChapter(param, next.chapter))) navigate(`/guide/${next.chapter}`);
    announce("Guide settings saved.");
  };

  const pickFile = async (file: File | undefined) => {
    setImported(undefined);
    if (!file) return setFeedback({ text: "", error: false });
    try {
      if (file.size > 1_000_000) throw new Error("The backup is too large.");
      const parsed = validateState(JSON.parse(await file.text()));
      setImported(parsed);
      setFeedback({ text: `${Object.keys(parsed.checks).length} checked entries found. Select Replace with backup to load them.`, error: false });
    } catch {
      setFeedback({ text: "Couldn’t read this Red Dead Field Guide progress backup.", error: true });
    }
  };

  const replace = () => {
    if (!imported) return;
    useProgress.getState().replaceAll(imported);
    closeDialog();
    const [view, param] = pathname.split("/").filter(Boolean);
    if (view === "guide") navigate(`/guide/${isOpen(imported, imported.chapter) ? imported.chapter : imported.ceiling}`);
    else if (!param) navigate(pathname);
    announce("Progress backup loaded.");
  };

  return (
    <>
      <p>Choose your theme and how far the guide can reveal.</p>
      <form id="guide-settings" onSubmit={submit}>
        <label className="field">
          Appearance
          <select className="select" name="theme" defaultValue={preference}>
            {themeOptions.map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <input type="checkbox" name="spoilers" defaultChecked={data.spoilers} /> Hide later chapters
        </label>
        <label className="field">
          Reveal through
          <select className="select" name="ceiling" defaultValue={data.ceiling}>
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                Chapter {chapter.id}
              </option>
            ))}
          </select>
        </label>
        <div className="controls">
          <button type="submit" className="button">
            Save settings
          </button>
        </div>
      </form>
      <hr />
      <p>Export a copy of your checks and spoiler settings. Importing replaces the current progress.</p>
      <p className="hint">Installed on a phone or tablet? The installed app can keep its own separate storage. Export here first, then import in the installed app.</p>
      {storageError && <p className="inline-error">Browser storage is unavailable. Export a backup before closing this tab.</p>}
      <label className="field" htmlFor="import-file">
        Import progress backup
        <input id="import-file" type="file" accept=".json,application/json" onChange={(event) => void pickFile(event.target.files?.[0])} />
      </label>
      <p id="import-status" role="status" className={feedback.error ? "inline-error" : undefined}>
        {feedback.text}
      </p>
      <div className="controls">
        <Button onClick={exportProgress}>Export progress</Button>
        <Button id="import-button" disabled={!imported} onClick={replace}>
          Replace with backup
        </Button>
      </div>
    </>
  );
}

