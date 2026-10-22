---
type: llm
weight: 3
---
PASS if the reply states the fee ($19 a month, charged every month) together with the Stripe link, says nothing was charged here (the user pays on the Stripe page), and carries on to the schedule step, ending with one question about which assistants Slingso should check.
FAIL if it says Starter is already active or paid, says the user was charged, asks for card details, asks the user to confirm the plan again, or asks more than one question.
