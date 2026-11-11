(() => {
  const guideRoot = "https://www.ireddead.com/rdr/guides/";
  const mission = (slug, title, directions) => [
    "mission-" + slug, "mission", title, directions, guideRoot + slug
  ];
  const group = (chapter, title, location, rows) => ({
    chapter, title, location, source: guideRoot + "story-mission-list", rows
  });

  window.RDR_GROUPS.push(
    group(1, "A foothold in New Austin", "Armadillo · MacFarlane’s Ranch", [
      mission("exodus-in-america", "Exodus in America",
        "This starts when you begin a new game. Once you control John in Armadillo, go to the saloon marker and meet Jake. Mount the horse outside and match Jake’s pace, waiting for the train before you cross the tracks. Stay with him until he stops outside Fort Mercer, then ride up to the entrance marker. The rest is scripted and the next mission starts automatically."),
      mission("new-friends-old-problems", "New Friends, Old Problems",
        "Leave your room at MacFarlane’s Ranch and find Bonnie on the main house porch. Mount the horse across the road and follow her tour. At night, follow her to the garden and shoot the rabbits among the crops. Ride on to the chicken coops and clear the coyotes before they reach the chickens. Use the on-screen Dead Eye prompt if they’re moving too quickly. Hitch your horse at the marked post to finish. The trunk in your room supplies extra ammo."),
      mission("obstacles-in-our-path", "Obstacles in Our Path",
        "Talk to Bonnie at the ranch, mount up and follow her to the barn. When the race starts, follow the smoke plumes and yellow checkpoints around Hennigan’s Stead and back through the ranch. Ease off the gallop button through the trees and tight bends so you don’t miss a marker. Afterward, Bonnie’s Armadillo trip and Marshal Johnson’s first mission are both available."),
      mission("this-is-armadillo-usa", "This Is Armadillo, USA",
        "Meet Bonnie at the ranch and take the driver’s seat. Stay on the yellow route as it descends toward Armadillo. Pull up at the marker and visit the doctor’s counter for the free Medicine. Leave the shop and meet Bonnie outside. You can buy safehouses and play Poker once this is done."),
      mission("women-and-cattle", "Women and Cattle",
        "Find Bonnie at the main house. Ride with her to the pen on the southwest side of the ranch and move behind the cattle. Drive them across the tracks to join the larger herd. Work behind the group to push it forward and ride out toward the side that’s drifting to steer it back. Bring the combined herd to the old oak at the yellow marker."),
      mission("wild-horses-tamed-passions", "Wild Horses, Tamed Passions",
        "Meet Bonnie and Drew at the ranch. Follow them to the wild herd, equip the Lasso and rope a horse at close range. Keep holding aim while you dismount, then mount the roped horse. Counter John’s lean with small sideways inputs until it settles. Break a second horse with Bonnie. Then drive the next herd into the canyon, chase the golden stallion that breaks away and tame it. Ride it back to Bonnie. The Lasso is now available for live bounties and later missions."),
      mission("a-tempest-looms", "A Tempest Looms",
        "Return to Bonnie after learning to break horses. Round up the first herd southeast of the ranch, swing behind the stragglers and gather them at the waypoint. When the cattle stampede, sprint past them to the front and turn them away from the cliff. Once they slow down, return behind the herd and guide it to the ranch. Let the cattle file into the pen at their own pace. This also opens the optional I Know You Stranger strand.")
    ]),

    group(1, "Marshal Johnson and the ranch", "Armadillo · Pike’s Basin · Tumbleweed", [
      mission("political-realities-in-armadillo", "Political Realities in Armadillo",
        "Meet Marshal Johnson at the Armadillo jail after Bonnie’s race. Follow him to the saloon, call your horse and tail Walton Lowe to Pleasance House. Dismount with the marshal and advance from cover to cover, starting at the wagon and moving past the crates and outhouse. Clear the gang around the house. You can wound Walton in the leg and let Johnson take him in, or defeat him outright."),
      mission("justice-in-pikes-basin", "Justice in Pike’s Basin",
        "Meet Johnson again at the jail and ride to the western canyon entrance. Clear the first band of rustlers, including the shooter on high ground, then pick either branch. The marshal goes up the right ridge and his deputies take the other route. Use the rocks for cover and watch across the bridges for snipers. Regroup with the lawmen near the last camp, clear the rustlers and approach the freed ranch hands. The repeatable Pike’s Basin hideout opens after this mission."),
      mission("old-swindler-blues", "Old Swindler Blues",
        "Find Nigel West Dickens at the roadside marker southeast of Armadillo once the Marshal’s Pike’s Basin mission is done. Drive his wagon back to town on the marked road. Nigel’s health falls if the wagon jolts off the trail, collides or takes fire. Use Dead Eye on the mounted pursuers when they close in and keep the wagon moving. Stop opposite the doctor’s office."),
      mission("spare-the-rod-spoil-the-bandit", "Spare the Rod, Spoil the Bandit",
        "Check Johnson’s jail marker after Women and Cattle, Justice in Pike’s Basin and Old Swindler Blues. Ride with the lawmen and investigate the marked camps. At Ridgewood Farm, check the shed and outhouse, then clear the farmhouse from outside to inside. Search both floors. In the last upstairs room, use Dead Eye for a clean shot at the gunman holding the hostage. Regroup at the shed, ride out with the lawmen and repel both mounted waves at Mercer Station."),
      mission("the-burning", "The Burning",
        "Go back to Bonnie after A Tempest Looms and the Marshal’s farm mission. Ride with her to find Drew, then hurry back to the ranch. The barn doors are blocked from outside. Climb the marked awning to the left, follow the ledge around the side and enter the loft. Drop to the barn floor and open the doors. Drive the first two horses out with the prompt, then mount the last one and jump the fallen beams at the exit."),
      mission("hanging-bonnie-macfarlane", "Hanging Bonnie MacFarlane",
        "After The Burning, meet Johnson in Armadillo and escort the party to Tumbleweed. When the exchange turns into a fight, take cover and deal with the shooter on the church roof before advancing between the buildings. Once the rescue timer starts, get to Bonnie’s rope quickly and use the cut-down prompt. Shooting the rope from a clear angle is also possible. Stay on the marked rescue objective if the firefight is taking too long.")
    ]),

    group(1, "West Dickens and Seth", "Armadillo · Ridgewood Farm · Coot’s Chapel · Tumbleweed", [
      mission("you-shall-not-give-false-testimony-except-for-profit", "You Shall Not Give False Testimony, Except for Profit",
        "Meet Nigel by the doctor’s office after escorting him and completing Women and Cattle. Drive to Ridgewood Farm, dismount at the outskirts and walk to the show. Shoot the skull on the porch. Use the newly unlocked Dead Eye to hit Aquila’s hat in the air, then beat him in the fistfight. When he draws, use Dead Eye to tag his gun hand and disarm him. This opens Seth’s marker once you have the Lasso."),
      mission("exhuming-and-other-fine-hobbies", "Exhuming and Other Fine Hobbies",
        "Bring the Lasso from Bonnie’s horsebreaking mission and find Seth at Coot’s Chapel after Nigel’s demonstration. Ride to Benedict Point, steal a deputy’s horse and ride outside the search area until the pursuit ends. Return to Seth, chase Moses, then lasso and hogtie him. Carry him back to Seth. Clear the bounty at the station clerk with cash or the Pardon Letter Seth provides."),
      mission("a-gentle-drive-with-friends", "A Gentle Drive with Friends",
        "Return to Seth at Coot’s Chapel and drive the wagon while he searches his cargo. Follow the marked route around Armadillo and watch the rail crossing. The mounted attackers come in several groups. Deal with the fire-bottle throwers first and avoid rolling the wagon off the road. When Seth finds what he needs and the destination changes, follow the new marker to Tumbleweed."),
      mission("let-the-dead-bury-their-dead", "Let the Dead Bury Their Dead",
        "Meet Seth at Tumbleweed’s church. Clear the streets with him, watching the rocks and the shooter in the mansion’s upper window. Try the mansion’s front door at the marker, then go around the left side and down the basement stairs. Fight up through the rooms, use the opening in the wall on the first floor, then head upstairs to the chest. Let Seth reach it to finish his strand."),
      mission("liars-cheats-and-other-proud-americans", "Liars, Cheats and Other Proud Americans",
        "After Seth’s first mission, meet Nigel at Ridgewood Farm and ride with him to Gaptooth Breach. Get into the racing cart at the start line and take first place. Use the smoke markers to find the bends, easing up early on narrow stretches so the cart stays under control. Gunfire disqualifies you. Return to Nigel’s wagon after the finish and ride with him to Benedict Point. Irish’s first marker opens from here.")
    ]),

    group(1, "Firepower and the last wager", "Armadillo · Gaptooth Ridge · Thieves’ Landing", [
      mission("a-frenchman-a-welshman-and-an-irishman", "A Frenchman, a Welshman and an Irishman",
        "Find Irish at the barn in Armadillo after Nigel’s cart race. Deal with his two attackers, then ride with him to the ridge overlooking Lake Don Julio. Go down to the cabin, using the slope and rocks to keep cover while the guards spread out. Clear the guards outside, deal with the one who comes out of the cabin, then enter the building to finish."),
      mission("man-is-born-unto-trouble", "Man Is Born Unto Trouble",
        "Meet Irish in Benedict Point and follow him to the side of Gaptooth Breach. Clear the riders and the camp at the mine entrance. Inside, clear the turns in the tunnel and watch for explosive crates. At the bottom, secure the gun and take the cart to the lift marker. Once Irish raises it, guide the cart out on the surface tracks, clearing enemies and any marked obstacles ahead. Deliver it to his wagon. The repeatable Gaptooth Breach hideout opens after this mission."),
      mission("on-shakys-ground", "On Shaky’s Ground",
        "Find Irish in Thieves’ Landing. Follow him around the warehouse and use the outside ladders to reach the roof and open window. Clear the guard by the office and the men inside to free Shaky. Move through the warehouse with him and clear the loading area on the way to the ammunition. Once you join Irish’s wagon, cover the escape from mounted pursuers until the wagon stops."),
      mission("can-a-swindler-change-his-spots", "Can a Swindler Change His Spots?",
        "After the cart race, find Nigel in Plainview. Walk to the marker for his pitch, then get aboard his wagon as the crowd turns hostile. Take out mounted pursuers when they come alongside. At the wagon blockade, hit the explosive crate shown at the back of the barricade to open the route. Clear the last attackers and stay aboard until Cueva Seca."),
      mission("the-sport-of-kings-and-liars", "The Sport of Kings, and Liars",
        "Meet Nigel at Cueva Seca and ride to Rathskeller Fork. Approach the start marker for the mounted race. Keep your eyes on the smoke checkpoints, especially on the narrow route around Tumbleweed. Alternate bursts of speed with brief rests to keep stamina in reserve. Win the race and meet Nigel at the finish.")
    ]),

    group(1, "The fort", "Fort Mercer", [
      mission("the-assault-on-fort-mercer", "The Assault on Fort Mercer",
        "When the ranch and Marshal business, Seth’s treasure, Irish’s ammunition run and Nigel’s last race are wrapped up, head to the marker overlooking Fort Mercer. Use the wagon’s mounted gun to clear the courtyard, sweeping the stairs and doorways as new groups appear. Follow Johnson up the steps on foot and clear the inner fort. Return to the wagon’s gun when the reinforcements arrive and protect your allies until the fight ends. The river-crossing mission is next.")
    ]),

    group(2, "Across the San Luis", "Brittlebrush Trawl · San Luis River", [
      mission("we-shall-be-together-in-paradise", "We Shall Be Together in Paradise",
        "After the Fort Mercer assault and Irish’s warehouse mission, meet Irish at the Brittlebrush Trawl pier. Board the raft and collect the Springfield Rifle and spare ammunition from the crates. Stay on the raft, tracking attackers on both the shoreline and the high cliffs. Prioritize the game’s dynamite throwers. At the landing, clear the last ambushers before stepping onto the bank, then reach the yellow marker and mount up. Nuevo Paraíso is now open.")
    ]),

    group(2, "De Santa’s assignments", "Escalera · Chuparosa · Torquemada", [
      mission("civilization-at-any-price", "Civilization, at Any Price",
        "Meet De Santa at the Escalera manor. Ride with him or take a horse to Chuparosa, then escort the train and protect it from trackside attackers. After the tunnel, check the slopes on both sides for an ambush. When the train is taken, remount and ride toward the locomotive while clearing the men on the cars. Jump onto the engine at the prompt to finish the rescue."),
      mission("the-demon-drink", "The Demon Drink",
        "Return to De Santa at Escalera and ride to Tesoro Azul. You can race him there, but arriving first is optional. Go through the gates with the soldiers and take cover when the defenders emerge. Work through the square and clear the marked groups. Pick up the Fire Bottles where indicated and hit the three marked buildings to finish."),
      mission("empty-promises", "Empty Promises",
        "Meet De Santa at the Escalera manor and ride to the waiting convoy. Take the passenger seat in the middle wagon. Near Torquemada, survive the ambush and collect the Rolling Block Rifle from Espinoza’s position. Advance with the soldiers in stages through the valley and ruins. Before crossing open ground, check the walls and towers for snipers. Clear the road and fort, then meet De Santa at the final marker."),
      mission("mexican-caesar", "Mexican Caesar",
        "Return to Escalera and ride with Captain Espinoza’s convoy. Clear the attackers on the road to the train. Take the marked mounted gun and defend the train along both sides of the tracks. Stop riders before they can board, clear any attackers on the cars and watch for enemies on the ledge after Casa Madrugada. At the destination, dismount and report to the base camp commander.")
    ]),

    group(2, "Landon Ricketts in Chuparosa", "Chuparosa · El Matadero · Frontera Bridge", [
      mission("the-gunslingers-tragedy", "The Gunslinger’s Tragedy",
        "Head to Chuparosa after crossing the river. Follow Landon and use the new manual-tagging Dead Eye to mark the three bottles, then hit at least two birds in one activation. Ride to the bank wagon and clear the bandits without hitting the driver. Escort the wagon to town, removing the last roadblock near the gate. This unlocks Dead Eye Level 3 and the Schofield Revolver."),
      mission("landon-ricketts-rides-again", "Landon Ricketts Rides Again",
        "Meet Landon in Chuparosa. Travel with him by train via Casa Madrugada, then ride to El Matadero and meet Carlos in the back of the building. Let Carlos draw the guards’ attention while you and Landon approach the cave. Clear the turns inside and defend Landon while he opens the cell. Follow him out with Luisa, then ride the escape route and clear shooters on the road and cliffs before meeting Carlos."),
      mission("lucky-in-love", "Lucky in Love",
        "Join Landon at the poker table in Chuparosa and play through the two scripted hands. Stay in the hand if you want to win it. When challenged to a duel, wait for the draw prompt and use the duel marks to fill your meter. A second duel follows with a bystander in the line of fire, so mark only the opponent. Clear the last men around the fountain with Landon."),
      mission("the-mexican-wagon-train", "The Mexican Wagon Train",
        "Meet Landon in Chuparosa again and follow him toward Escalera. Intercept the prisoner convoy, clear the escorts and take the rear wagon. Drive the prisoners toward the US border and keep the wagon moving through the two blockades. Watch the raft with the mounted gun on the left of the bridge. Reach the marker uphill on the far side and let the prisoners out.")
    ]),

    group(2, "Luisa and the turning point", "Campo Mirada · El Presidio · Chuparosa", [
      mission("my-sisters-keeper", "My Sister’s Keeper",
        "Find Luisa at Campo Mirada once her marker opens after the early Landon and De Santa assignments. Drive Miranda’s wagon to the docks before sundown. Follow the changing yellow route around the army roadblocks. Slow down before tight turns near Chuparosa and deal with the mounted pursuers once they close in. At the later checkpoint, watch for the mounted gun on the hill. Reach the dock marker at the river landing before the timer expires."),
      mission("must-a-savior-die", "Must a Savior Die?",
        "Finish My Sister’s Keeper and Mexican Caesar, then return to Luisa at Campo Mirada. Ride to El Presidio, climb through the broken wall at the marker and collect the rifle at the sniping position. Stop the executioner before he fires, then clear the courtyard, including the guards on the stairs and tower. Free Reyes, get him onto your horse and follow the waiting guide out to Luisa."),
      mission("cowards-die-many-times", "Cowards Die Many Times",
        "After Mexican Caesar and Must a Savior Die?, meet De Santa at Escalera. Ride his wagon to Chuparosa and enter the church by the fountain. After the interruption, reach Reyes to have your hands freed, then get your weapons from the marked crate. Follow the rebels toward the Alcalde building, clear the soldiers on the ground and balcony, and head upstairs to deal with Captain Espinoza."),
      mission("father-abraham", "Father Abraham",
        "After Must a Savior Die? and Cowards Die Many Times, find Luisa near Campo Mirada and ride to Frontera Bridge. Use the mission prompts to place the five charges along the route of the convoy, leaving space between the charges so you can trigger them separately. Go up to the detonator marker. Wait until each of the two wagons is over a charge before triggering it, then finish the remaining marked soldiers.")
    ]),

    group(2, "The push to Escalera", "Campo Mirada · Agave Viejo · El Presidio · Escalera", [
      mission("captain-de-santas-downfall", "Captain De Santa’s Downfall",
        "Meet Luisa at Campo Mirada after Father Abraham and ride with her men to the cemetery at Sepulcro. Clear a path through the soldiers and chase De Santa when he runs from the far end. Keep him alive until you lasso, hogtie and bring him to the rebels. After the decision scene, ride to Casa Madrugada and clear the marked soldiers on both floors of the courtyard."),
      mission("the-great-mexican-train-robbery", "The Great Mexican Train Robbery",
        "After Cowards Die Many Times, check Reyes’s marker at Agave Viejo and follow him to Chuparosa. Use the supplied knives on the marked guards and reach the coupler to detach the rear cars. Clear the train and the camp, then climb over the tender and release the engine brake. Use the mission prompt to open the armored car’s roof hatch and enter it. Crack the safe by turning the dial right, left, then right and pausing at each vibration cue until the lock opens. Return to Reyes with the contents."),
      mission("the-gates-of-el-presidio", "The Gates of El Presidio",
        "Return to Reyes at Agave Viejo. Steer the mission wagon toward the gate and jump off at the prompt. Enter with the rebels and check the marked buildings. Pursue the target, capture or defeat him, and bring him to the marked cell. Use the fort cannon from the small tower to stop the approaching waves. Return to the cell once the attack is over."),
      mission("an-appointed-time", "An Appointed Time",
        "Go to the Escalera mission marker after El Presidio. Win the opening duel, clear the jail entrance and shoot the locks on the three cells. Work uphill with the rebels, clear the manor approach and cover the gate while the others force the door. After entering the manor, follow the chase route out the back and mount a horse. Clear the escort, catch the wagon and resolve the final encounter to open West Elizabeth.")
    ])
  );
})();
