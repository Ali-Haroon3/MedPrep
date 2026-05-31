import { Deck } from './types';

// Seed decks covering high-yield MCAT content. Content is authored by hand
// from standard prep material and is intentionally concise for quick review.

export const biologyDeck: Deck = {
  id: 'bio-101',
  name: 'Cell & Molecular Biology',
  subject: 'Biology',
  description: 'High-yield cell biology, membranes and the cell cycle.',
  color: '#2563eb',
  cards: [
    {
      id: 'bio-1',
      front: 'What phase of the cell cycle is DNA replicated?',
      back: 'S phase (synthesis) of interphase.',
      difficulty: 'easy',
      tags: ['cell cycle', 'dna'],
    },
    {
      id: 'bio-2',
      front: 'Which organelle is the primary site of ATP production?',
      back: 'The mitochondrion, via oxidative phosphorylation on the inner membrane.',
      difficulty: 'easy',
      tags: ['organelles', 'metabolism'],
    },
    {
      id: 'bio-3',
      front: 'Define a competitive inhibitor.',
      back: 'A molecule that binds the active site, raising apparent Km while Vmax is unchanged.',
      difficulty: 'medium',
      tags: ['enzymes', 'kinetics'],
    },
    {
      id: 'bio-4',
      front: 'What distinguishes facilitated diffusion from active transport?',
      back: 'Facilitated diffusion moves solute down its gradient without ATP; active transport moves against the gradient using energy.',
      difficulty: 'medium',
      tags: ['membranes', 'transport'],
    },
  ],
};

export const biochemDeck: Deck = {
  id: 'biochem-101',
  name: 'Biochemistry Foundations',
  subject: 'Biochemistry',
  description: 'Amino acids, protein structure and core metabolic pathways.',
  color: '#7c3aed',
  cards: [
    {
      id: 'bc-1',
      front: 'Name the only amino acid that is achiral.',
      back: 'Glycine — its side chain is a hydrogen, so the alpha carbon is not a stereocenter.',
      difficulty: 'medium',
      tags: ['amino acids'],
    },
    {
      id: 'bc-2',
      front: 'What is the net ATP yield of glycolysis (per glucose)?',
      back: '2 ATP net (4 produced, 2 consumed) plus 2 NADH.',
      difficulty: 'easy',
      tags: ['glycolysis', 'metabolism'],
    },
    {
      id: 'bc-3',
      front: 'Which bond stabilizes the alpha-helix?',
      back: 'Hydrogen bonds between the backbone carbonyl O of residue i and the amide H of residue i+4.',
      difficulty: 'hard',
      tags: ['protein structure'],
    },
  ],
};

export const seedDecks: Deck[] = [biologyDeck, biochemDeck];
