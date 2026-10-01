# TTC Streetcar Snake

Classic Snake, except you are operating a TTC streetcar on a geographically simplified model of Toronto's streetcar track network. Collect parked Flexity streetcars and each one becomes another full-length car in your train.

## Play

Choose **Free Play** or **Route Missions** before departing.

- **Free Play:** the whole track network is open; collect streetcars and build the longest consist you can.
- **Route Missions:** operate a real TTC route/terminal pair. Reaching the destination couples one bonus car and flips the sign for the return trip.
- **Random starts:** every departure starts at a different point on the playable network; Route Missions randomize onto track used by the selected route.
- **Keyboard steering:** Arrow keys or WASD.
- **Manual switch control:** Q = left turnout, E = right turnout, R = straight. An approaching-junction panel also lets you throw the switch directly.
- **Mobile:** on-screen direction pad or swipe to steer; tap the turnout choices when a switch is approaching.
- **Driving feel:** Arcade is the default, starting at 90 km/h with a 120 km/h game cap. Realistic / Purist starts at and is governed to 50 km/h. Rogue starts at 110 km/h and permits intentionally fictional overdrive up to 180 km/h.
- **Speed controls:** hold the on-screen accelerator/brake pedals, or use `+` and `-`. The real Flexity rating of 70 km/h remains the realism boundary shown in the HUD.
- **Mobile cockpit:** phones use a compact three-stat HUD, small labeled minimap, one-line location display, smaller D-pad, and thumb-friendly brake/accelerator controls instead of the desktop stack.
- **Pause:** Space, P, or the centre touch button.
- **High score:** stored in a first-party cookie as the number of streetcars joined.
- **Transit Control events:** occasional slow orders or stalled cars temporarily alter the run and may force a diversion.

## Real-world scale and map model

The game stores its network in latitude/longitude and projects it into metres. A TTC Flexity low-floor streetcar is drawn **30.20 m long**, matching TTC's published vehicle specification. Car width is slightly exaggerated on very small screens so a 2.54 m-wide streetcar does not disappear into a single pixel.

The map is intentionally not a GIS/track-engineering dataset, but it preserves the recognizable 2026 network topology and geography. Major street corridors are labeled in-world, the minimap labels major terminals, and a live "YOU ARE NEAR" readout tracks the nearest named intersection/terminal: Queen/Queensway/Lake Shore, King, Dundas, College/Carlton/Gerrard, Kingston Road, Broadview, Bathurst, Spadina, Harbourfront/Fleet, St Clair, downtown diversion trackage, terminal loops/stations, and playable spurs for Roncesvalles Carhouse, Russell Carhouse, Leslie Barns, and Harvey Shop/Hillcrest.

The underlying map represents the playable network rather than a live dispatch feed. Gameplay can generate temporary slow orders and blocked-track diversions, but those events are fictionalized for the run.

### Route missions

The mission roster reflects TTC terminal pairs in the 2026 service information used by the game: 501 Humber–Neville Park, 504A Dundas West–Distillery, 504B Dufferin Gate–Broadview, 505 Dundas West–Broadview, 506 High Park–Main Street, 509 Exhibition–Union, 510A Spadina–Union, 511 Bathurst–Exhibition, and 512 Gunns–St Clair.

### Performance notes

Static track geometry is cached as reusable world-space canvas paths instead of rebuilt every frame. Train history uses a rolling distance-indexed buffer, and self-collision uses streetcar-shaped capsules rather than centre-point circles. The follow camera uses a much tighter view on phones so track motion is visually legible at game speeds instead of looking artificially slow. Cloudflare serves static assets directly; the Worker is invoked first only for `/healthz`.

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


### Opening pickup assist

The first collectible is intentionally different from normal random spawns. It is placed about 6–8 seconds ahead along the player's current track path and is re-targeted if the player misses it by taking another switch. After roughly 22 seconds the assist becomes more aggressive, keeping the first coupling within the opening 30-second engagement window under normal driving. Transit Control disruptions are held until after that first pickup.
