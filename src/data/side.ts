import type { RawGroup, RawRow } from "../types";

const RDR_GROUPS: RawGroup[] = [];
// Red Dead Redemption side routes. Stable IDs are shared by the guide and checklist.
{
  const guides = "https://www.ireddead.com/rdr/guides/";
  const maps = "https://www.ireddead.com/rdr/maps/";
  const strangers = guides + "stranger-side-mission-list";
  const outfits = guides + "outfits";
  const stranger = (slug: string, title: string, directions: string): RawRow => ["stranger-" + slug, "stranger", title, directions, guides + slug];
  const scrap = (id: string, title: string, directions: string, map: string): RawRow => ["scrap-" + id, "scrap", title, directions, maps + map];
  const outfit = (id: string, title: string, directions: string, map?: string): RawRow => ["outfit-" + id, "outfit", title, directions, map ? maps + map : outfits];

  RDR_GROUPS.push(
    {
      chapter: 1, title: "Strangers on the ranch roads", location: "Hennigan’s Stead · Armadillo", source: strangers, rows: [
        stranger("flowers-for-a-lady", "Flowers for a Lady",
          "After New Friends, Old Problems, meet Billy West on the road from MacFarlane’s Ranch toward Thieves’ Landing. Bring three Wild Feverfew from Hennigan’s Stead, three Red Sage from Rio Bravo, and three Desert Sage from Gaptooth Ridge. Existing flowers in your satchel count. Hand the bouquet over at Billy’s cabin just farther along the road. If you already have all nine flowers, let about six in-game hours pass for the delivery marker."),
        stranger("let-no-man-put-asunder", "Let No Man Put Asunder",
          "After Obstacles in Our Path, talk to Alma in the ruins on the road to Coot’s Chapel. Find Nathan inside the Armadillo saloon and pay him $5 for the information. Ride west to Odd Fellow’s Rest and inspect Peter’s marked headstone inside the cemetery."),
        stranger("jennys-faith", "Jenny’s Faith",
          "After This Is Armadillo, USA, find Jenny beside a rock east of Ridgewood Farm. Talk to her and hand over one Medicine from your satchel. If you’re out, buy Medicine from the doctor in Armadillo and return to the same spot."),
        stranger("water-and-honesty", "Water and Honesty",
          "After Political Realities in Armadillo, meet Andrew McAllister at the camp on the western edge of Hennigan’s Stead, overlooking Lake Don Julio. Ride northwest of Armadillo to Pleasance House, pay Clyde Evans $200 for the deed, then take it back to McAllister to close the task. McAllister takes ownership of the house when you hand over the deed."),
        stranger("american-appetites", "American Appetites",
          "Visit Armadillo’s sheriff’s office after Political Realities in Armadillo and inspect the clue in the purple search area northeast of The Hanging Rock. Return to the office for the second report after Justice in Pike’s Basin and for the third after Wild Horses, Tamed Passions. Allow about a day between reports if needed. Investigate the marked area again after each report. On the final visit, talk to the injured man, lasso the runner, and bring him back. For the positive-honor ending, restrain the injured man and free the captive."),
      ],
    },
    {
      chapter: 1, title: "Strangers in Gaptooth Ridge", location: "Gaptooth Ridge · Rathskeller Fork", source: strangers, rows: [
        stranger("california", "California",
          "After Women and Cattle, look for Sam Odessa playing harmonica beside a rock in Gaptooth Ridge. Follow his next markers to Cueva Seca, the canyon northeast of Tumbleweed, and finally the road south of Tumbleweed. Allow around two in-game days between visits if the marker hasn’t appeared. At the final site, retrieve the letter and deliver it to the freight station counter in Armadillo."),
        stranger("who-are-you-to-judge", "Who Are You to Judge?",
          "After Liars, Cheats and Other Proud Americans, speak to Jeb by the stables at Rathskeller Fork. Approach Tumbleweed from the north and find the woman and horse at the small stable by the road. Speak to her, lead them back to Rathskeller Fork, and talk to Jeb again at his marker."),
      ],
    },
    {
      chapter: 1, title: "A missable encounter", location: "Cliffs near MacFarlane’s Ranch", source: guides + "i-know-you", rows: [
        ["optional-i-know-you-start", "optional", "Start I Know You",
          "After A Tempest Looms, speak to the man overlooking the canyon southwest of MacFarlane’s Ranch. Then meet his contact in front of the Thieves’ Landing saloon and choose whether to encourage or discourage him. The remaining encounters open as the story progresses. Finish this optional chain before the last main mission if you want to see it.", guides + "i-know-you"],
      ],
    },
    {
      chapter: 1, title: "Elegant Suit and Bollard Twins scraps", location: "Thieves’ Landing · Hennigan’s Stead", source: outfits, rows: [
        outfit("elegant", "Elegant Suit",
          "Play poker or visit Thieves’ Landing to reveal the suit for purchase. Buy it from the tailor in Thieves’ Landing and verify it’s unlocked in the Outfits menu.", "elegant-suit"),
        scrap("bollard-1", "Bollard Twins 1 · Warehouse chest",
          "Enter the large warehouse near the southern approach to Thieves’ Landing. Go upstairs and open the chest in the back office.", "bollard-twins-outfit"),
        scrap("bollard-2", "Bollard Twins 2 · Ranch Nightwatch",
          "Accept the Nightwatch job at MacFarlane’s Ranch after dark. Follow the patrol dog, handle any disturbances, and finish the shift.", "bollard-twins-outfit"),
        scrap("bollard-3", "Bollard Twins 3 · Ranch Horseshoes",
          "Win a full game at the horseshoe pit at MacFarlane’s Ranch. Aim the middle of the shoe at the stake and release near the marked power band.", "bollard-twins-outfit"),
        scrap("bollard-4", "Bollard Twins 4 · Live bounty",
          "Read the gang affiliation on a New Austin wanted poster. For a Bollard Twins target, use the lasso after Wild Horses, Tamed Passions, hogtie them, and deliver them alive to the indicated jail.", "bollard-twins-outfit"),
        scrap("bollard-5", "Bollard Twins 5 · Defend Hennigan’s Stead",
          "Respond to a blue-dot roadside event in Hennigan’s Stead where Bollard Twins are attacking residents. Look along the MacFarlane’s Ranch–Armadillo road and check the Outfits menu after the defense. The encounter is random, so revisit on a later trip if it doesn’t spawn.", "bollard-twins-outfit"),
        scrap("bollard-6", "Bollard Twins 6 · Tailor’s scrap",
          "Buy the Bollard Gang Scrap from the tailor in Thieves’ Landing.", "bollard-twins-outfit"),
        outfit("bollard", "Bollard Twins Outfit",
          "Complete the six Bollard Twins scrap objectives and check that the outfit is available to equip. The outfit itself earns the completion credit.", "bollard-twins-outfit"),
      ],
    },
    {
      chapter: 1, title: "Treasure Hunter outfit scraps", location: "Gaptooth Ridge · Thieves’ Landing", source: outfits, rows: [
        scrap("treasure-1", "Treasure Hunter 1 · Silent Stead chest",
          "At Silent Stead, look inside the small house northwest of the road junction and open the chest.", "treasure-hunter-outfit"),
        scrap("treasure-2", "Treasure Hunter 2 · California",
          "Complete all of Sam Odessa’s encounters in California, ending by delivering his letter to the freight station in Armadillo.", "treasure-hunter-outfit"),
        scrap("treasure-3", "Treasure Hunter 3 · Rathskeller Fork Blackjack",
          "Play Blackjack at Rathskeller Fork. Leave the table after finishing a hand with a higher chip total than you bought in with.", "treasure-hunter-outfit"),
        scrap("treasure-4", "Treasure Hunter 4 · Live bounty",
          "Watch the Rathskeller Fork wanted board for a target affiliated with the Treasure Hunters. Lasso and hogtie the target, then deliver them alive.", "treasure-hunter-outfit"),
        scrap("treasure-5", "Treasure Hunter 5 · Gaptooth Breach",
          "After Man Is Born Unto Trouble, return to Gaptooth Breach in free roam and complete its gang hideout objective.", "treasure-hunter-outfit"),
        scrap("treasure-6", "Treasure Hunter 6 · Tailor’s scrap",
          "Purchase the Treasure Hunter Scrap from the tailor in Thieves’ Landing. Check the shop’s displayed price before budgeting for the purchase.", "treasure-hunter-outfit"),
        outfit("treasure", "Treasure Hunter Outfit",
          "Finish all six Treasure Hunter scrap objectives, then check the Outfits menu for the unlocked outfit.", "treasure-hunter-outfit"),
      ],
    },
    {
      chapter: 2, title: "Strangers across the river", location: "Nuevo Paraíso · New Austin return", source: strangers, rows: [
        stranger("poppycock", "Poppycock",
          "After Civilization, at Any Price, meet Uriah Tollets in the mayor’s office at Chuparosa. Open the marked chest on the rear docks of Nosalida. Clear the hideout during this visit if it’s active. Deliver the package to the foreman behind the slaughterhouse in El Matadero, then return to the mayor’s office and settle up with Tollets."),
        stranger("funny-man", "Funny Man",
          "After Exhuming and Other Fine Hobbies, speak to Jimmy Saint at Benedict Point station. After Man Is Born Unto Trouble, free him behind crates in the Gaptooth Breach mine’s elevator room. Next, untie him by the fire at the southern camp in Pike’s Basin. His final marker appears after Empty Promises on the church roof in Tesoro Azul. Use the ladder and see him to safety. Wait about six in-game hours between encounters if the markers haven’t returned."),
        stranger("eva-in-peril", "Eva in Peril",
          "After Lucky in Love, approach Eva and Mario behind the buildings at Casa Madrugada. Pay Mario $200. Wait a few in-game days, ask the nun inside the Las Hermanas chapel about Eva, and follow the marker to Sepulcro. Win the required duel with Mario there. You can recover the money by looting him afterward."),
        stranger("love-is-the-opiate", "Love is the Opiate",
          "After Empty Promises and Poppycock, speak to Zhou inside the El Matadero slaughterhouse. Break a white Hungarian Half-bred and ride it back to the foreman. Look for a white coat and dark muzzle in the herds near El Matadero and toward Torquemada. After about two in-game days, speak to Zhou on the Chuparosa station platform to finish."),
        stranger("aztec-gold", "Aztec Gold",
          "After Must a Savior Die?, speak to Basilio in Sidewinder Gulch. Search three marked rock piles in order. The first is on a ledge near Basilio, the second is inside the ruin at Primera Quebrada, and the third sits among bushes at the northeast edge of a rock formation in Alta Cabeza. Meet him behind El Matadero’s butcher warehouse and follow him into the cave to finish."),
      ],
    },
    {
      chapter: 2, title: "Mexican Poncho and Bandito scraps", location: "Sidewinder Gulch · Chuparosa · Casa Madrugada", source: outfits, rows: [
        outfit("mexican-poncho", "Mexican Poncho",
          "Buy your first safehouse in Nuevo Paraíso. If you haven’t bought one by An Appointed Time, check the Outfits menu after that mission for the story unlock.", "mexican-poncho"),
        scrap("bandito-1", "Bandito 1 · Sidewinder Gulch chest",
          "Check the cluster of three structure markers at the east end of Sidewinder Gulch. The isolated one has the scrap chest.", "bandito-outfit"),
        scrap("bandito-2", "Bandito 2 · Chuparosa Nightwatch",
          "Take the Nightwatch job in Chuparosa after dark, follow the dog through its patrol, and complete the shift.", "bandito-outfit"),
        scrap("bandito-3", "Bandito 3 · Casa Madrugada Liar’s Dice",
          "Play at the Liar’s Dice table in Casa Madrugada and win the entire match. Stay in until every other player has lost their dice.", "bandito-outfit"),
        scrap("bandito-4", "Bandito 4 · Live bounty",
          "Accept a Nuevo Paraíso wanted poster that identifies its target as a Bandito. Capture the target with the lasso and hand them in alive.", "bandito-outfit"),
        scrap("bandito-5", "Bandito 5 · Defend residents",
          "Ride the roads outside Chuparosa and respond to blue-dot encounters. Complete one where Banditos are attacking residents. The rail crossing west of town is one place to look, and the encounter can appear elsewhere in Mexico.", "bandito-outfit"),
        scrap("bandito-6", "Bandito 6 · Store scrap",
          "Buy the Bandito Scrap from the general store in Chuparosa.", "bandito-outfit"),
        outfit("bandito", "Bandito Outfit",
          "Finish the six Bandito scrap objectives and confirm that the outfit can be equipped.", "bandito-outfit"),
      ],
    },
    {
      chapter: 2, title: "Reyes’ Rebels outfit scraps", location: "Sepulcro · Chuparosa · Torquemada · Escalera", source: outfits, rows: [
        scrap("reyes-1", "Reyes’ Rebels 1 · Sepulcro chest",
          "Enter Sepulcro’s cemetery and check behind the statue and rubble along the southeastern section of the inner wall for the chest.", "reyes-rebels-outfit"),
        scrap("reyes-2", "Reyes’ Rebels 2 · Poppycock",
          "Finish Tollets’s package delivery, including the return conversation in the Chuparosa mayor’s office.", "reyes-rebels-outfit"),
        scrap("reyes-3", "Reyes’ Rebels 3 · Chuparosa Horsebreaking",
          "Take the Horsebreaking job in Chuparosa. Counter the horse’s sway to stay centered until the job is recorded as complete.", "reyes-rebels-outfit"),
        scrap("reyes-4", "Reyes’ Rebels 4 · Love is the Opiate",
          "Deliver the Hungarian Half-bred, then meet Zhou at Chuparosa station once his follow-up marker appears.", "reyes-rebels-outfit"),
        scrap("reyes-5", "Reyes’ Rebels 5 · Torquemada Five Finger Fillet",
          "Play Five Finger Fillet at Torquemada and stay until you’ve beaten all opponents at that table. The scrap is tied to the table at Torquemada.", "reyes-rebels-outfit"),
        scrap("reyes-6", "Reyes’ Rebels 6 · Escalera store scrap",
          "Complete An Appointed Time to unlock the Rebel Scrap for sale at Escalera’s general store. Buy it there.", "reyes-rebels-outfit"),
        outfit("reyes", "Reyes’ Rebels Outfit",
          "Complete all six scrap objectives. An Appointed Time makes the final scrap available for purchase. Check the outfit itself in the Outfits menu after collecting the set.", "reyes-rebels-outfit"),
      ],
    },
    {
      chapter: 3, title: "Cross-region Stranger tasks", location: "New Austin · Nuevo Paraíso · West Elizabeth", source: strangers, rows: [
        stranger("lights-camera-action", "Lights, Camera, Action",
          "After The Sport of Kings, and Liars, speak to MacKenna behind the Armadillo cinema. Win the deed at the Thieves’ Landing saloon’s Liar’s Dice table, which requires a $200 stake, and disarm Spatchcock in a duel at Benedict Point by marking his gun hand. You can do those two jobs in either order. Return to the cinema. After An Appointed Time and roughly two in-game days, find MacKenna behind a building at Pacific Union Railroad Camp to finish."),
        stranger("deadalus-and-son", "Deadalus and Son",
          "The first marker appears after We Shall Be Together in Paradise. Meet Charles Kinnear on the cliff southwest of Casa Madrugada. Gather 20 bird feathers of any kind, 10 Red Sage from Rio Bravo, and five Beaver Fur. Check the riverbanks on the West Elizabeth side of the Upper Montana River for beavers. Bring the materials to Charles, then return once the marker comes back, usually after about two in-game days."),
        ["optional-i-know-you", "optional", "I Know You",
          "If you haven’t started, meet the man on the ridge southwest of MacFarlane’s Ranch after A Tempest Looms and talk to his contact outside the Thieves’ Landing saloon. Once Nuevo Paraíso opens, find him at his campsite south of El Matadero and decide what to do at the Las Hermanas entrance. After An Appointed Time, meet him at the last marker on the cliff overlooking Beecher’s Hope. Finish before starting the last main mission. This task is optional for the in-game 100%.", guides + "i-know-you"],
      ],
    },
    {
      chapter: 3, title: "Strangers in Blackwater", location: "Blackwater", source: strangers, rows: [
        stranger("american-lobbyist", "American Lobbyist",
          "After An Appointed Time, accept the photographs from the man at the gazebo in Blackwater’s main plaza. Visit the bank during business hours, roughly 7 a.m.–6 p.m., and approach the man seated on the left. Return to the gazebo for payment."),
        stranger("the-wronged-woman", "The Wronged Woman",
          "After An Appointed Time, visit Clara at the Blackwater chapel at night, between about 6 p.m. and 7 a.m. Find Harold in the saloon and follow him outside. Win the duel, take the $200 from him, and return to Clara. About two in-game days later, speak to the woman at the marked grave in Blackwater Cemetery to finish the task."),
        stranger("the-prohibitionist", "The Prohibitionist",
          "After The Wronged Woman, speak to Abner Forsyth outside Blackwater’s saloon, then visit Oliver Philips at the marked alley near the docks. Return to Abner, make your choice, and report back to Philips. Warning Abner raises drink and room prices. Killing him lowers them and costs honor. Either outcome completes the task, so consider buying any remaining rooms first."),
      ],
    },
    {
      chapter: 3, title: "U.S. Army outfit scraps", location: "Aurora Basin · Blackwater · Pacific Union Railroad Camp", source: outfits, rows: [
        scrap("army-1", "U.S. Army 1 · Aurora Basin chest",
          "Open the chest inside the cabin at Aurora Basin, by the lake.", "us-army-uniform"),
        scrap("army-2", "U.S. Army 2 · Camp Arm Wrestling",
          "Play Arm Wrestling at Pacific Union Railroad Camp and keep playing until you defeat the opponents there. The scrap is tied to the railroad camp.", "us-army-uniform"),
        scrap("army-3", "U.S. Army 3 · Blackwater Poker",
          "Join a poker table in Blackwater and finish as the last player with chips. Opponents can knock each other out along the way.", "us-army-uniform"),
        scrap("army-4", "U.S. Army 4 · Lights, Camera, Action",
          "Finish MacKenna’s Stranger task by speaking to him at Pacific Union Railroad Camp. The Armadillo delivery alone leaves the final meeting undone.", "us-army-uniform"),
        scrap("army-5", "U.S. Army 5 · Blackwater Nightwatch",
          "Take the Blackwater Nightwatch job after dark and complete the dog-led patrol.", "us-army-uniform"),
      ],
    },
    {
      chapter: 4, title: "Ranch clothing", location: "Beecher’s Hope", source: outfits, rows: [
        outfit("rancher", "Rancher Clothing", "Complete The Outlaw’s Return. Check your Outfits menu after the mission to confirm the automatic unlock."),
      ],
    },
    {
      chapter: 5, title: "The final Stranger task", location: "Blackwater · Lake Don Julio · Río del Toro", source: strangers, rows: [
        stranger("remember-my-family", "Remember My Family",
          "After The Last Enemy That Shall Be Destroyed, speak to the agent at Blackwater station. Ask at the marked cabin by Lake Don Julio, then visit Phillip at the river camp near Río del Toro. Follow the river to the final marker and win the duel. Let the credits run before returning to the cleanup checklist."),
      ],
    },
    {
      chapter: 5, title: "Postgame uniform unlocks", location: "Blackwater · New Austin", source: outfits, rows: [
        scrap("army-6", "U.S. Army 6 · Blackwater tailor",
          "After The Last Enemy That Shall Be Destroyed, buy the U.S. Military Scrap from the Blackwater tailor.", "us-army-uniform"),
        outfit("army", "U.S. Army Uniform",
          "Collect the five West Elizabeth scraps and buy the final Blackwater tailor scrap after the story. Check the complete uniform in the Outfits menu.", "us-army-uniform"),
        outfit("marshal", "U.S. Marshal Uniform",
          "After The Last Enemy That Shall Be Destroyed, clear five New Austin hideouts within one in-game day. Start at Pike’s Basin and ride through Twin Rocks, Fort Mercer, Tumbleweed, then Gaptooth Breach. Stock up before the first clear, ride directly between hideouts, and avoid sleeping or fast travel. Aim to finish within the window without dying. Confirm the uniform unlock after the fifth clear.", "us-marshal-uniform"),
      ],
    },
  );
}

export default RDR_GROUPS;
