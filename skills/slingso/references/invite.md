# invite: a teammate

## When

"Invite sam@brand.com", "add my agency", "slingso invite ...".

## Calls, in order

1. Get the email. Role default `editor`. Ask once: "Invite sam@brand.com as an editor?" (editor: runs and decides; viewer: reads and comments; owner is not offered here).
2. `members_invite` with `email` and `role`.
3. "Invite sent. They sign in with the code in the email and land in this workspace."

To see who is in: `members_list`.

## Walls

- Free: "Free is one person. Teammates come with Starter ($19 a month per workspace)."
- Not the owner: "Only the owner can invite. Ask <owner> to send it."

## If it fails

- Already a member: say so; nothing to do.
- An invalid email: ask again with the corrected address as the default.
