# MedPrep

MedPrep is a React + TypeScript study app for MCAT preparation. The goal is to
take the best ideas from tools like Anki and Quizlet, tailor them to medicine,
and give learners a fast, focused review workflow.

> The original goal was to help myself with MCAT studying. It is not used for AI training.

## Features

- **Spaced repetition** — flashcard scheduling built on the SM-2 algorithm.
- **Decks** — organized MCAT decks (biology, biochemistry, and more) with tags
  and difficulty levels.
- **Quizzes** — multiple-choice question bank with shuffling, scoring, and a
  persisted attempt history.
- **Keyboard-first review** — flip with Space and grade recall with `1`–`4`.
- **Progress tracking** — daily study streaks, average accuracy, an
  accuracy-over-time chart, and a GitHub-style review heatmap.
- **Notes & goals** — quick tagged notes and target-score goals with progress
  bars.
- **Import / export** — JSON deck export plus Anki-style CSV import.
- **Light / dark themes** — theme preference persisted to local storage.

## Getting started

```bash
npm install
npm start      # run the dev server
npm test       # run the unit tests
npm run build  # production build
```

## Project structure

```
src/
  components/   UI components (review, dashboard, charts, settings)
  hooks/        reusable hooks (timer, debounce, keyboard shortcuts)
  store/        persisted state slices (decks, notes, goals, quiz)
  utils/        pure logic (SM-2, streaks, quiz engine, analytics)
  data/         seed decks and the question bank
```

All study data is stored locally in the browser — nothing is sent to a server.
