(() => {
  const challengeGuide = "https://www.powerpyx.com/red-dead-redemption-all-challenges-guide/";
  const treasureGuide = "https://www.powerpyx.com/red-dead-redemption-all-treasure-locations/";
  const plants = "https://www.ireddead.com/rdr/maps/plants";
  const animals = "https://www.ireddead.com/rdr/maps/animals";
  function route(chapter,name,key,start,region,rows,source=challengeGuide) {
    window.RDR_GROUPS.push({
      chapter,title:name+" challenges",location:region,source,
      note:"Complete the ranks in order. Ranks 5 and 10 each add one point to the game’s completion percentage.",
      rows:rows.map(([label,note,reference],index)=> {
        const rank=start+index;
        return [key+"-"+rank,"challenge",name+" "+rank+" · "+label,note,reference];
      })
    });
  }

  route(1,"Master Hunter","hunter",1,"New Austin",[
    ["Five coyote pelts","Find packs in Cholla Springs and around Armadillo. Skin the five coyotes to register their pelts."],
    ["Five deer pelts","Look for antlerless deer on the plains around Hennigan’s Stead. Skin five. Bucks count as a different animal."],
    ["Five wolves with the knife","Look around Rathskeller Fork or Río del Lobo. Use the in-game hunting knife for the finishing blow on five wolves, then skin each one."],
    ["Five boar tusks and three armadillo carapaces","Skin boars around Stillwater Creek east of MacFarlane’s Ranch. Search the dry ground around Armadillo for armadillos."],
    ["Two cougars with the knife","Find cougars along the cliffs of Río Bravo near Fort Mercer or in Gaptooth Ridge. Carry Medicine, watch the minimap and make the final strike with the hunting knife. Skin both afterward."],
    ["Five raccoon, skunk and fox pelts each","Search the scrub by Hanging Rock after dusk for raccoons and skunks. Look around Río Bravo and south of Armadillo for foxes. Skin five of each."]
  ],animals);
  route(3,"Master Hunter","hunter",7,"Tall Trees · Nuevo Paraíso · New Austin",[
    ["Five elk meat and five bighorn skins","Hunt elk and bighorn sheep in the high ground north of Manzanita Post. Skin five of each to collect the requested items."],
    ["A bear with the knife","Find a bear in Tall Trees. Bring Medicine and use the hunting knife for the final hit, then skin the bear. Check the minimap for a second bear before getting off your horse."],
    ["Khan the jaguar","Return to Ojo del Diablo after rank 8. Look for the named animal prompt and yellow marker as you approach. Use Dead Eye and skin Khan after the hunt."],
    ["Lobo, Gordo and Brumas","Find Lobo at Aurora Basin, Gordo near Stillwater Creek and Brumas around Nekoti Rock. Wait for the named-animal marker in each area and collect all three hides."]
  ],animals);

  route(1,"Sharpshooter","sharpshooter",1,"New Austin",[
    ["Five flying birds","Tag five birds while they’re airborne. Look for flocks overhead outside Armadillo and use Dead Eye when they’re in range."],
    ["Five rabbits","Search the low scrub of Hennigan’s Stead. Rabbits are small and move quickly, so slow down to spot them."],
    ["Five coyotes without a hit","Find a pack in the open, stay on horseback and use Dead Eye when they gather. Track the count in the journal before taking damage from a coyote."],
    ["Five flying birds from a train","Board a train, find a clear view from a car or its roof, and hit five airborne birds while it’s moving."],
    ["Two animal species in one Dead Eye use","Find a ground animal with a bird nearby. Tag both targets in the same Dead Eye activation, then release the shots together."],
    ["Two hats","Try the Walton gang at Twin Rocks. In Dead Eye, tag the edge of the hat. Do this to two different people."]
  ]);
  route(3,"Sharpshooter","sharpshooter",7,"Tall Trees · New Austin",[
    ["Three one-shot bear kills","Look for bears in Tall Trees. Use a powerful in-game rifle and make each kill with one Dead Eye headshot."],
    ["Two hats and two disarms","At a repeatable hideout, use Dead Eye to target the edge of two hats and two weapons. Watch the challenge counter after each shot."],
    ["Six wild animals without reloading","Load a repeater before starting. Birds make easy targets. Keep the same weapon and avoid reloading until the sixth kill counts."],
    ["Six disarms without reloading","Take a loaded repeater to a repeatable hideout such as Gaptooth Breach. Aim at enemies’ weapons using Dead Eye. Keep the same gun loaded between disarms and check your magazine before starting."]
  ]);

  route(1,"Survivalist","survivalist",1,"New Austin",[
    ["Six Wild Feverfew","Pick the small pale blooms in Hennigan’s Stead or Cholla Springs. Picking the first plant opens the challenge."],
    ["Six Desert Sage","Look for purple flowers on the low shrubs of Gaptooth Ridge."],
    ["Four Red Sage","Search the dry slopes around Río Bravo and Fort Mercer. A Survivalist Map from a general store makes the low red plants easier to spot."]
  ],plants);
  route(2,"Survivalist","survivalist",4,"Nuevo Paraíso",[
    ["Eight Prickly Pear","Look for flowering cactus in Punta Orgullo, around Escalera and its surrounding trails."],
    ["Seven Woolly Blue Curls","Look for purple flower spikes among the scrub in Perdido. Pick seven new plants during the rank."],
    ["Eight Butterfly Weed","Look for the orange flower heads along trails in Diez Coronas."]
  ],plants);
  route(3,"Survivalist","survivalist",7,"West Elizabeth · all territories",[
    ["Ten Hummingbird Sage","Look for pale flower spikes in Tall Trees."],
    ["Twelve Prairie Poppy","Pick yellow poppies in the open grass of the Great Plains."],
    ["Fifteen Golden Currant","Search Great Plains for the large, branching bushes. Use a Survivalist Map if the pickups blend into the grass."],
    ["Violet Snowdrops and a full herb circuit","Collect ten Violet Snowdrops in Tall Trees. Then pick two more of each of the other nine species. Use the plant map to sweep West Elizabeth, then Mexico and New Austin. Check the rank’s journal list before leaving each region."]
  ],plants);

  route(1,"Treasure Hunter","treasure",1,"New Austin",[
    ["The first map","Watch for the roadside encounter with bandits attacking a treasure hunter and his wagon. Save him and take the map he offers. If he dies, loot the map from him. Receiving it completes rank 1."],
    ["Rhodes’ Gold","Go to Hanging Rock north of Armadillo. Walk between the two smaller rocks behind the main boulder and inspect the loose pile where they meet it."],
    ["Jackson’s Gold","Ride southeast from Riley’s Charge to the camp above Del Lobo Rock. From the campfire head south through the notch in the rim. Dismount and descend carefully to the narrow lower ledge with the rock pile."],
    ["Calhoun’s Gold","Go to the mansion uphill west of Tumbleweed. Enter the cellar from outside or by the interior stairs. Inspect the stone pile along the cellar’s west wall."]
  ],treasureGuide);
  route(2,"Treasure Hunter","treasure",5,"Nuevo Paraíso",[
    ["Tubman’s Gold","Find the tree hung with skulls north of Chuparosa near Río del Toro. Cross the road toward the river and look along the far side of the low stone wall."],
    ["Brown’s Gold","Go to Crooked Toes south of Puerto Cuchillo. Climb to the shelf between the tall rock spires and inspect the stacked stones."],
    ["Douglass’ Gold","Go to the rock arch at Ojo del Diablo. Walk up the narrow southwest path beside the arch and check the end of the ledge."],
    ["Garrison’s Gold","At Roca de Madera, approach the cliff and find the lower shelf southwest of the marked rock. Walk to the end of the ledge and inspect the pile."]
  ],treasureGuide);
  route(3,"Treasure Hunter","treasure",9,"West Elizabeth",[
    ["Pickett’s Gold","Visit the Broken Tree east of Beecher’s Hope. Look for the short broken stone wall at its base and inspect the gap between the wall sections."],
    ["Stonewall’s Gold","Ride to Nekoti Rock north of Manzanita Post. Dismount and follow the rising path to the cave. Check for wildlife before searching the stone pile at the back."]
  ],treasureGuide);
})();
