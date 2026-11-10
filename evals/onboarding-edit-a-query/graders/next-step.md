---
type: llm
weight: 2
---
The stand-in first check never gets past 0 of 20, so the last message is the skill still following it. The writes, the confirm step and the progress calls are graded by this case's other graders.
PASS if the reply follows the first check (for example its progress, 0 of 20 answers in, or the fact with its source) and asks at most one question.
FAIL if it asks to confirm the queries again, rewrites Brand Soul or the product, offers to run a check in a browser, asks the user to choose a plan or a schedule, says the check failed or is stuck, or asks more than one question.
