import { useState, type FormEvent } from "react";
import { Button } from "./ui";
import { calibrationDelta, estimate } from "../lib/guide";
import { readPercent } from "../lib/progress-state";
import { useProgress } from "../store/progress";
import { useUi } from "../store/ui";

export function Calibration() {
  const reported = useProgress((s) => s.data.reported);
  const checks = useProgress((s) => s.data.checks);
  const setReported = useProgress((s) => s.setReported);
  const announce = useUi((s) => s.announce);
  const [draft, setDraft] = useState(reported === null ? "" : String(reported));
  const [error, setError] = useState("");
  const estimated = estimate(checks);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const value = readPercent(draft);
    if (value === null) {
      setError("Enter a number from 0 to 100.");
      return;
    }
    setError("");
    setDraft(String(value));
    setReported(value);
    announce("In-game percentage saved.");
  };

  const delta = reported === null ? null : calibrationDelta(estimated, reported);
  return (
    <section className="panel" aria-labelledby="calibration-title">
      <h2 id="calibration-title">Check against the game</h2>
      <p>Enter the completion percentage from Stats → General to see how far this guide’s estimate is off.</p>
      <form className="calibration" onSubmit={submit} noValidate>
        <label className="field" htmlFor="reported">
          <span>In-game completion (%)</span>
          <input
            id="reported"
            className="select"
            inputMode="decimal"
            value={draft}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "reported-error" : undefined}
            onChange={(event) => setDraft(event.target.value)}
          />
        </label>
        <Button type="submit" look="">
          Save
        </Button>
        {reported !== null && (
          <Button
            onClick={() => {
              setReported(null);
              setDraft("");
              setError("");
            }}
          >
            Clear
          </Button>
        )}
      </form>
      {error && (
        <p id="reported-error" className="inline-error" role="alert">
          {error}
        </p>
      )}
      {delta !== null && (
        <p className="delta" role="status">
          Guide {estimated}% · game {reported}% ·{" "}
          {delta === 0
            ? "they match."
            : delta > 0
              ? `the game is ${delta} points ahead. Something is done in the game that isn’t checked here.`
              : `the guide is ${Math.abs(delta)} points ahead. Something checked here may not count in the game yet.`}
        </p>
      )}
    </section>
  );
}
