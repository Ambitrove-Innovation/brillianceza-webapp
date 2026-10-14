# Maintenance mode

Shows visitors a "Back soon" page instead of the site. **Off by default.**
There are two ways to switch it on. Pick one.

## Method A: environment variable (simplest)

Turns the site into the holding page without touching code.

**Turn ON**
1. Netlify dashboard, then your site, then **Environment variables**.
2. Add `VITE_MAINTENANCE_MODE` = `true`.
3. Optional: add `VITE_MAINTENANCE_BACK_BY` = `3:00 PM` (shows "Expected back by 3:00 PM").
4. Go to **Deploys**, then **Trigger deploy**, then **Deploy site**.

**Turn OFF**: delete the variable (or set it to `false`), then trigger a deploy again.

> Vite reads variables when the site is *built*, so changing a variable does nothing
> until a new deploy finishes (about a minute).

**Preview without taking the site down:** open `https://www.brillianceza.com/?maintenance=preview`

Good for: short updates, planned pauses. The page returns a normal "200 OK" and is
marked `noindex`, which is fine for hours, not weeks.

## Method B: Netlify 503 rule (best for a long outage)

Answers every request with a proper **503 Service Unavailable** (the correct signal
to Google that the outage is temporary) using `public/maintenance.html`.

**Turn ON**: add this line at the very **top** of `public/_redirects`, commit, deploy:

```
/*  /maintenance.html  503!
```

**Turn OFF**: delete that line, commit, deploy.

Notes:
- `maintenance.html` is fully self-contained on purpose (no local images or scripts),
  because the forced rule replaces every file, including images.
- Edit the wording or the "Expected back by" time directly in `public/maintenance.html`.
- Netlify's documentation only lists 200, 301, 302 and 404 as redirect statuses; a 503
  has been shown to work by Netlify staff but is not documented. **Test it on a
  branch deploy first**, and confirm with `curl -I https://<branch-url>/` that you see `503`.

## Which to use?
- Short update, quick switch: **A**.
- Site needs to stay down for a long time, or SEO matters: **B**.
- Neither helps if Netlify itself is down. Add a free uptime monitor
  (UptimeRobot or Better Stack) so you get an email first.
