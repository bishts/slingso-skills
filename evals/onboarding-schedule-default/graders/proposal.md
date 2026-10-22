---
type: llm
weight: 3
---
PASS if the reply asks which AI assistants Slingso should check, listing ChatGPT, Google AI Mode, Google AI Overviews and Gemini by name as the ones available, says ChatGPT and Google AI Mode are on now, and asks which ones to check regularly, ending with that one question. Asking when (the day, the time) can wait for the next turn.
Mentioning the first check's progress (12 of 20 answers in) is fine.
FAIL if it says they are all selected or on, asks one yes/no about the whole schedule (assistants and day and time together, such as "Check ChatGPT, Google AI Mode, Google AI Overviews and Gemini every Monday at 09:00?"), counts the assistants ("four assistants", "4 AI assistants"), shares a fact or statistic (facts belong to the wait at the end), offers to run a monitor in a browser, asks for the timezone (it is known), or asks more than one question.
