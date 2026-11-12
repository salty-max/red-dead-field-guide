# Facts still to verify

Nothing in this guide has been replayed against the game by its author. The data was compiled from the community pages listed in `src/data/catalog.ts` and is shown to the player as guidance. This is what we know is soft. Use **Progress → Check against the game** to measure the estimate against Stats → General.

## The completion estimate

- **Weights** (`src/lib/guide.ts`): story mission 1, Stranger task 0.5, map location 6/94, bounty 0.1, outfit 0.5, safehouse 2/13, hideout 0.5, rare weapon 0.5, job 0.5, minigame 0.5, and challenge ranks 5 and 10 at 1 each. These come from community 100% checklists. A test only confirms the total is about 100%, not that each weight is right.
- **Counts** (57 story missions, 18 Stranger tasks, 94 map locations, 20 bounties, 13 safehouses, 9 outfits): taken from the same pages, not recounted in the game or against each other.
- **What counts toward the in-game stat** (scraps do not, optional tasks do not, outfits give credit): from guides, not tested.
- The estimate is rounded **down** to a tenth. The game’s own rounding is not confirmed.
- Version differences: the game exists in original and later releases. Guides do not always say which they describe, so unlock conditions may differ between them.

## Missables

Only entries confirmed by two independent sources are flagged (`src/data/missables.ts`):

- **I Know You** (Stranger chain, optional for 100%): must be finished before the last main mission. Sources: ireddead.com and GamesRadar. One minor wiki disagrees about whether it is optional; the 100% rule is consistent either way.

Not flagged because we have fewer than two sources, and so unverified:

- Stranger tasks with timed or day-limited steps (for example the in-game days between California visits).
- Anything that locks once you cross into Mexico or leave a county for good.
- Treasure Hunter, Master Hunter and other challenge sets that depend on region access.
- Any purchase or job that disappears after a story point.

## Chapter text

- Chapter 4 and 5 names are hidden behind “Late game” while locked, because their titles hint at the story. Chapters 1–3 show their region names.
- The chapter intros were checked by eye for story leaks, not by a playtester.
