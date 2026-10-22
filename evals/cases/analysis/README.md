# Analysis cases

The window and expectations Slingso grades every analysis on: its own servers'
(Growth) and this skill running in the brand's Claude (Free, Starter). One
contract (served with `get_analysis_window` as `contract`), one set of cases,
one grader, so the two can word things differently but never drift. The
`contract.rules` in these windows are stand-ins; the real rules are served at
runtime.

`analyse-opportunities` and `analyse-stale-memory` use this window. Change a
case here and in its eval folder together; Slingso's copy changes with it.
