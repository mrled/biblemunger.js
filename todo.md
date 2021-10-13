# To do

## Fix query string redirect

- In old biblemunger, I used query strings, like `/?search=hearts&replace=feels`.
- In new biblemunger, I use cleaner routes, like `/munge/hearts/feels`.
- I redirect the old to the new, so it has both, like `/munge/hearts/feels?search=hearts&replace=feels`.
  This is fine but unnecessary. Apparently I would have to use serverSiteProps to strip it off. Lol.
