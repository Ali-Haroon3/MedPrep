# Changelog

All notable changes to MedPrep are documented here.

## [Unreleased]

### Added
- SM-2 spaced repetition scheduling for flashcards.
- Deck data model with seeded biology and biochemistry decks.
- Multiple-choice quiz engine with shuffling, scoring, and persisted history.
- Study session timer with pause/resume.
- Progress dashboard: daily streaks, average accuracy, accuracy-over-time
  chart, and a review heatmap.
- Tagged notes with a lightweight editor.
- Study goals with target-score progress bars.
- Flashcard search and tag filtering with a debounced input.
- Keyboard-first review (Space to flip, 1–4 to grade) and a shortcut help
  overlay.
- JSON deck import/export and Anki-style CSV import.
- Light/dark theming with a settings panel.
- Unit tests for the SM-2 algorithm, streak calculation, and quiz scoring.

### Notes
- All study data is persisted to the browser's local storage.
