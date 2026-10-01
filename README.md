# TTC Streetcar Snake

Classic Snake, except you are operating a TTC streetcar on a geographically simplified model of Toronto's streetcar track network. Collect parked Flexity streetcars and each one becomes another full-length car in your train.

## Play

- **Keyboard:** Arrow keys or WASD. Choose a direction before the next switch.
- **Mobile:** On-screen direction pad or swipe anywhere on the map.
- **Pause:** Space, P, or the centre touch button.
- **Goal:** Collect streetcars without running the head of your train into your own consist.
- **High score:** Stored in a first-party cookie as the number of streetcars joined.

## Real-world scale and map model

The game stores its network in latitude/longitude and projects it into metres. A TTC Flexity low-floor streetcar is drawn **30.20 m long**, matching TTC's published vehicle specification. Car width is slightly exaggerated on very small screens so a 2.54 m-wide streetcar does not disappear into a single pixel.

The map is intentionally not a GIS/track-engineering dataset, but it preserves the recognizable 2026 network topology and geography: Queen/Queensway/Lake Shore, King, Dundas, College/Carlton/Gerrard, Kingston Road, Broadview, Bathurst, Spadina, Harbourfront/Fleet, St Clair, downtown diversion trackage, terminal loops/stations, and playable spurs for Roncesvalles Carhouse, Russell Carhouse, Leslie Barns, and Harvey Shop/Hillcrest.

Temporary construction diversions are not simulated; the game represents the underlying playable streetcar network.

## Run locally

```bash
npm install
npm run dev
```

Wrangler will print the local URL (normally `http://localhost:8787`).

## Deploy to Cloudflare Workers

```bash
npm install
npx wrangler login
npm run deploy
```

The app uses current Cloudflare Workers Static Assets with an `ASSETS` binding behind a small Worker shell. `/healthz` returns a JSON health check.

## Sources / inspiration

- [TTC Subway, Light Rail and Streetcar Map — June 2026](https://cdn.ttc.ca/-/media/Project/TTC/DevProto/Images/Home/Routes-and-Schedules/Landing-page-pdfs/TTC_SubwayStreetcarLightrailMap.pdf)
- [TTC 2026 Annual Network Plan — streetcar network projects](https://cdn.ttc.ca/-/media/Project/TTC/DevProto/Documents/Home/About-the-TTC/2026-ANP/2026-Annual-Network-Plan_Attachment-2-All-Appendixes.pdf)
- [TTC Next-Generation Streetcars — Flexity specifications](https://www.ttc.ca/en/transparency-and-accountability/Operating-Statistics/operating-statistics---2017/next-generation-streetcars)
- [TTC Leslie Barns / streetcar facility background](https://www.ttc.ca/news/2015/November/TTCs-new-streetcar-facility-to-enter-service-this-Sunday)
- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)

This is an unofficial fan game and is not affiliated with or endorsed by the Toronto Transit Commission.
