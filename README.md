# Red Dead Field Guide

A spoiler-aware, unofficial companion for the original *Red Dead Redemption* campaign. The checklist targets the game’s **Redeemed** 100% stat and works with the original and modern releases of that campaign.

## Run it locally

Run this command from the project folder, then visit [localhost:8000](http://localhost:8000).

```sh
python3 -m http.server 8000 --directory dist
```

The site uses static HTML, CSS and JavaScript. There are no packages to install. Serve the contents of `dist` with any static host.

## Use the guide

- **Guide** starts in New Austin. Reveal chapters as you reach them. Each mission has its own directions and a source link. The order is a practical route through strands that can open in parallel.
- **Checklist** tracks story missions, Stranger tasks, outfits and scraps, challenges, map locations, bounties, hideouts, properties, purchases, jobs and minigames. Each check is shared with the walkthrough. Use the county buttons after reading a purchased map in-game.
- **Progress** estimates the game’s weighted percentage, with one point at each rank 5 and 10 challenge milestone. Outfit scraps are tracked individually. The completed outfit supplies the in-game credit. Compare your estimate with **Stats → General**.
- The sun or moon in the header switches the theme. Choose **Use device setting** under **Appearance** to follow your system.
- Open **Progress saved** to change spoiler settings or export and import your checklist. Progress is stored for this browser and site address.

The in-game percentage applies to the base campaign. *Undead Nightmare*, multiplayer, mission medals, platform trophies and optional encounters have separate completion goals. Sources and maps are linked inside the app. Game directions were checked against Switch-era and original-release references.

## Artwork and fonts

The five chapter banners are original illustrations generated with OpenAI’s built-in image generator. They use a cinematic frontier look with the subject on the right and shaded foreground on the left. They depict a New Austin rail town, a Nuevo Paraíso adobe mission, a Blackwater waterfront, a Great Plains ranch, and a frontier valley. The images are decorative. Barlow Condensed and DM Sans licenses are in `dist/assets`. *Red Dead Redemption* belongs to Rockstar Games.

### Banner prompts

Wide cinematic banner for an unofficial Red Dead Redemption 1 completion guide. Realistic late-American-frontier environmental artwork, atmospheric film still from a classic western, natural camera framing, tactile earth, adobe, stone and weathered wood, softly hazy depth, restrained colors, no plastic look. Composition for a browser hero center-cropped to about 3:1. Keep the featured structure or landscape on the RIGHT half, center at x=74% and y=50%, within the middle height so it survives the crop. Leave the entire LEFT 46% continuously shaded, subtle and dark for cream heading and body text added later. No people, lettering, signage with words, logos, interfaces or border.

- Chapter 1. Wide New Austin frontier. In right half, weathered frontier railway town with small timber train depot, water tower, hitching rails, packed dirt street with gentle wagon grooves, dry agave and iconic red desert buttes behind. Late afternoon with long shadows, dusty golden light, tobacco browns and subdued terracotta. Left half is a dark foreground of shaded sagebrush and soft deep brown dusty plains.
- Chapter 2. Nuevo Paraíso, with an aged pale adobe mission and small bell tower on the right, built on a sandy bluff overlooking a broad river and dry terracotta ridges. Agave, scrub and dusty mustard sunlight. A distant mountain ridge; soft river breeze. Shadowed desert and foreground grasses on the left, low contrast.
- Chapter 3. Blackwater at the edge of the Great Plains. Right half has an early-1900s modest two-story red brick storefront and wooden boardwalk by a large slate-blue lake, with a hint of a lakeside dock and telegraph lines, under soft cool overcast light. Open grassland and the start of distant pine hills. Left half is shadowed muted meadow, low contrast. No cars, no people.
- Chapter 4. A small lived-in American frontier ranch under early-evening sun. The right third has weathered clapboard ranch house and modest red barn, split-rail fence and a long prairie track, rolling yellow grass and oak silhouettes. Left half is shaded tall grass and dark olive prairie, low contrast. Quiet scene with no people, conflict, crosses or grave markers.
- Chapter 5. Overlook from a shaded bluff above a broad western frontier valley, right half showing a winding wagon trail, rust and ochre cliffs, grassland rolling into distant dark pine ridges. Subdued blue mountains and golden dawn. Left half is dark shadowed stone and sagebrush, low contrast. Only landscape, no characters.
