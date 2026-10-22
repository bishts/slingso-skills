---
type: llm
weight: 3
---
Look at the competitors the reply proposes.
PASS if they include Thorne, Pure Encapsulations and Nature Made (the brand a proposed comparison query names), show Google's websites for Thorne and Pure Encapsulations (thorne.com, pureencapsulations.com), leave out iHerb (a retailer, not a brand rival) or flag it as a retailer, and the reply ends with one question that "yes" accepts (it may also ask for the hero product's page).
FAIL if iHerb is proposed as a competitor, Nature Made is missing, Nature Made is given a website the user and Slingso never supplied (for example naturemade.com, from memory), a brand appears that neither the proposal nor a query names, or it asks more than one question.
