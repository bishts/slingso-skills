---
type: llm
weight: 2
---
PASS if the reply says the site doesn't look like an online store and that the empty workspace was deleted (or that they're starting fresh), then asks in one message for the store's website, which market to watch (listing United States, United Kingdom, Canada, Australia, India) and the hero product's page.
FAIL if it says the read is still running, offers to retry the same site, splits the three questions across turns, guesses the market, or names a tool, field or error code.
