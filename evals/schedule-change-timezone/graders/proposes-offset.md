---
type: llm
weight: 3
---
PASS if the reply asks when to check, suggesting weekly on Monday at 09:00 with a specific UTC offset already filled in (the one the machine reported), says daily or monthly or another day or time are fine, lets the user confirm or change the offset, and ends with one question.
FAIL if it asks "What's your timezone?" without proposing an offset, asks again which assistants to check (the user named them), asks more than one question, or counts the assistants ("four assistants").
