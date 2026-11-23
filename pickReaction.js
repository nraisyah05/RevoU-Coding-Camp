/**
 * pickReaction.js
 *
 * Pure function extracted from index.html for property-based and unit testing.
 * index.html inlines the same logic in its <script> block (non-module) so it
 * works via the file:// protocol. This file uses CommonJS exports so it can be
 * consumed by Vitest / Node without a bundler.
 *
 * @typedef {{ label: string, emoji: string, animationClass: string }} Reaction
 */

/**
 * Selects a random Reaction from pool, excluding the entry at lastIndex when
 * pool.length >= 2 (no-repeat rule).
 *
 * @param {Reaction[]} pool      - Array of Reaction objects to pick from.
 * @param {number}     lastIndex - Index of the most recently used reaction
 *                                 (-1 means no prior selection).
 * @returns {Reaction|null} The selected Reaction object, or null if pool is empty.
 */
function pickReaction(pool, lastIndex) {
  if (!pool || pool.length === 0) return null;
  if (pool.length === 1) return pool[0];

  // Build candidate index list, excluding lastIndex
  const candidates = [];
  for (let i = 0; i < pool.length; i++) {
    if (i !== lastIndex) candidates.push(i);
  }

  const chosenIndex = candidates[Math.floor(Math.random() * candidates.length)];
  return pool[chosenIndex];
}

module.exports = { pickReaction };
