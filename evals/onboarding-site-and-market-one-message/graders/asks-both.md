---
type: llm
weight: 3
---
PASS if one message asks for both the brand's website (offering https://stridewell.example as the default is fine) and which market Slingso should watch, listing the markets (United States, United Kingdom, Canada, Australia, India, or their short names) without picking, recommending or pre-selecting a market.
FAIL if it asks for the website and the market in separate turns, assumes or guesses a market (from the domain, the brand or the user's location), offers one as the default market, or asks about anything else.
