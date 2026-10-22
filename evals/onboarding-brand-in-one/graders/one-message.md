---
type: llm
weight: 3
---
PASS if all hold:
- It opens with what Slingso learned from stridewell.example (for example: running shoes for flat and low-arched feet).
- In one message it shows Brand Soul (in full, or its headings), the five proposed brand queries each with its stage, and the competitors Brooks, Hoka, ASICS and Saucony.
- It ends with one question that "yes" answers (keep these, or change anything), which also asks for the hero product's page.
FAIL if it asks about Brand Soul, the queries and the competitors in separate turns, invents or drops queries, adds competitors that neither the proposal nor a query names, treats a hero product as already chosen, or asks more than that one question.
