---
type: llm
weight: 2
---
PASS if the reply gives a short overview (what Slingso does, and that setup needs the website, the market and the hero product's page), then asks exactly one question: the brand's website, which market Slingso should watch and the hero product's page, together, listing the markets (United States, United Kingdom, Canada, Australia, India) with no market guessed or defaulted.
FAIL if it asks the user to choose a plan or a schedule now, asks the website, the market or the hero product in separate turns, leaves the hero product out, guesses the market, or asks anything else in the same turn.
