import type { RawGroup, RawRow } from "../types";

const RDR_GROUPS: RawGroup[] = [];
{
  const root = "https://www.ireddead.com/rdr/";
  const locations = root + "maps/towns-and-locations";
  const bounties = root + "guides/bounty-hunting";
  const hideouts = root + "guides/gang-hideouts-single-player";
  const safehouses = root + "guides/safehouses";
  const weapons = root + "maps/rare-weapons";
  const games = root + "guides/activities-and-minigames";
  const jobs = root + "guides/jobs";
  const slug = (name: string) => name.normalize("NFD").replace(/[\u0300-\u036f’']/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-");
  function group(chapter: number, title: string, location: string, category: string, source: string, entries: [name: string, text?: string, id?: string][], note = "") {
    RDR_GROUPS.push({
      chapter,title,location,source,note,
      rows:entries.map(([name,text = "",id]): RawRow => [id ?? category+"-"+slug(name),category,name,text])
    });
  }
  function county(chapter: number, name: string, vendor: string, places: string) {
    group(chapter,name+" map locations",name,"location",locations,[name,...places.split("|")].map((place): [string] => [place]),
      "Buy the "+name+" map at "+vendor+" and use it from your satchel. You can also ride close enough to discover each entry. Check this list against the labels on your world map.");
  }
  county(1,"Cholla Springs","the Armadillo general store","Armadillo|Coot’s Chapel|Critchley’s Ranch|Hamlin’s Passing|Jorge’s Gap|Lake Don Julio|Mercer Station|Odd Fellow’s Rest|Pleasance House|Rattlesnake Hollow|Ridgewood Farm|Riley’s Charge|Río del Lobo|The Hanging Rock|Twin Rocks|Two Crows|Venter’s Place");
  county(1,"Río Bravo","the Thieves’ Landing general store","Del Lobo Rock|Fort Mercer|Frontera Bridge|Plainview|Repentance Rock");
  county(1,"Hennigan’s Stead","the MacFarlane’s Ranch general store","Brittlebrush Trawl|Butter Bridge|Greenhollow|MacFarlane’s Ranch|Mescalero|Pike’s Basin|Stillwater Creek|The Old Bacchus Place|Thieves’ Landing|Warthington Ranch");
  county(1,"Gaptooth Ridge","the Armadillo general store","Benedict Pass|Benedict Point|Cueva Seca|Gaptooth Breach|Rathskeller Fork|Silent Stead|Solomon’s Folly|The Scratching Post|Tumbleweed");
  county(2,"Punta Orgullo","the Escalera gunsmith","Crooked Toes|Escalera|Nosalida|Plata Grande|Puerto Cuchillo|Sidewinder Gulch|Tesoro Azul");
  county(2,"Perdido","the Chuparosa general store","Agave Viejo|Barranca|Campo Miranda|Chuparosa|Hendidura Grande|Laguna Borrego|Las Hermanas|Ojo del Diablo|Primera Quebrada|Ramita de la Baya|Rancho Polvo|Río del Toro|Sepulcro");
  county(2,"Diez Coronas","the Chuparosa general store","Alta Cabeza|Casa Madrugada|El Matadero|El Presidio|Manteca Falls|Mesa de la Luna|Mesa del Sol|Roca de Madera|Torquemada");
  county(3,"Tall Trees","the Manzanita Post general store","Aurora Basin|Bearclaw Camp|Cochinay|Manzanita Post|Mason’s Bridge|Montanna Ford|Nekoti Rock|Pacific Union Railroad Camp|Tanner’s Reach|Tanner’s Span");
  county(3,"Great Plains","the Blackwater general store","Beecher’s Hope|Blackwater|Broken Tree|Dixon Crossing|Wreck of the Serendipity");

  function bountyLocations(chapter: number, region: string, towns: string, targets: string) {
    group(chapter,region+" bounty locations",towns,"bounty",bounties,targets.split("|").map((target): [string] => [target]),
      "After Political Realities in Armadillo, look for the white skull marking a wanted poster. Take regional posters as they appear in daylight. Check a location after bringing the fugitive or proof back to the law. Repeating a target location does not add completion credit.");
  }
  bountyLocations(1,"New Austin","Armadillo · Rathskeller Fork · MacFarlane’s Ranch","Brittlebrush Trawl|The Hanging Rock|Mercer Station|Mescalero|Rattlesnake Hollow|Repentance Rock|Río del Lobo|Silent Stead");
  bountyLocations(2,"Nuevo Paraíso","Escalera · Chuparosa · El Presidio","Barranca|Hendidura Grande|Laguna Borrego|Ojo del Diablo|Plata Grande|Primera Quebrada|Rancho Polvo|Sepulcro");
  bountyLocations(3,"West Elizabeth","Blackwater · Manzanita Post","Aurora Basin|Bearclaw Camp|Nekoti Rock|Tanner’s Reach");

  group(1,"Gang hideouts in New Austin","Cholla Springs · Hennigan’s Stead · Gaptooth Ridge","hideout",hideouts,[
    ["Twin Rocks","Available after New Friends, Old Problems. Meet the rancher outside, clear the lookouts on the rocks and the gang in the yard. Enter the bedroom and use Dead Eye to stop the hostage taker."],
    ["Pike’s Basin","After Justice in Pike’s Basin, return to the western entrance and meet the rancher. Follow the canyon past the fork, clear the camp and finish the marked rescue objective."],
    ["Tumbleweed","After Let the Dead Bury Their Dead, free the captured sheriff in town, clear the streets and go to the mansion uphill. Check both floors and the cellar for the last red markers."],
    ["Gaptooth Breach","After Man Is Born Unto Trouble, speak to the injured man near the mine. Rescue Floyd outside if you want his directions. Go into the mine, follow the tunnel markers to the treasure and clear a path to the exit."]
  ]);
  group(2,"Fort Mercer return and Mexican hideouts","Río Bravo · Punta Orgullo","hideout",hideouts,[
    ["Fort Mercer","After We Shall Be Together in Paradise, return to the fort and meet the gunman outside. Climb at the marked wall, clear the upper walkways and open the gate. Clear the rest of the defenders and follow the final objective to the reward room."],
    ["Tesoro Azul","After The Demon Drink, meet the sheriff by the wrecked wagon, sweep the town and reach the captive deputy. Use Dead Eye to stop the captor before he fires."],
    ["Nosalida","Once the Mexican side of the map opens, meet the soldiers outside the village. Use the supplied Fire Bottles on marked buildings and boats, clear the armed defenders, then return to the commanding officer."]
  ]);
  group(1,"Optional hideout","Gaptooth Ridge","optional",hideouts,[
    ["Solomon’s Folly","Where available in your edition, help the lawman by clearing the ruined farm and following the marked wagon objective. The hideout appears in modern releases and in some original editions."]
  ]);

  group(1,"Safehouses in New Austin","MacFarlane’s Ranch · Armadillo · Gaptooth Ridge","safehouse",safehouses,[
    ["MacFarlane’s Ranch","Your room is awarded through the opening ranch missions. Check for its save icon after New Friends, Old Problems."],
    ["Armadillo","After This Is Armadillo, USA, buy the room upstairs at the saloon. Interact with the sale marker."],
    ["Rathskeller Fork","Buy the room at the Rathskeller Fork property marker in northern Gaptooth Ridge."],
    ["Thieves’ Landing","Buy the property at the sale marker near the town’s waterfront."]
  ]);
  group(2,"Safehouses in Nuevo Paraíso","Escalera · Chuparosa · Casa Madrugada · El Matadero","safehouse",safehouses,[
    ["Irish’s Shack","The free room by the landing is awarded by We Shall Be Together in Paradise."],
    ["Escalera","Buy the marked property on the lower streets of Escalera."],
    ["Chuparosa","Purchase the property at the green house marker in Chuparosa."],
    ["Casa Madrugada","Buy the marked room at Casa Madrugada. Use it to save near the Liar’s Dice table."],
    ["El Matadero","Buy the marked property at El Matadero, east of Casa Madrugada."]
  ]);
  group(3,"Safehouses in West Elizabeth","Blackwater · Manzanita Post","safehouse",safehouses,[
    ["Blackwater","The safehouse is awarded after An Appointed Time. Look for the save icon when you return to town."],
    ["Manzanita Post","Purchase the marked property at the trading post in Tall Trees."]
  ]);
  group(4,"Ranch safehouse","Beecher’s Hope","safehouse",safehouses,[
    ["Beecher’s Hope · first room","Check the save room awarded by The Outlaw’s Return.","safehouse-beechers-room"]
  ]);
  group(5,"Final safehouse","Beecher’s Hope","safehouse",safehouses,[
    ["Beecher’s Hope · second room","The other save room becomes available after The Last Enemy That Shall Be Destroyed. Check the unlocked property in the ranch house.","safehouse-beechers-final"]
  ]);

  group(2,"Rare weapons in Escalera","Escalera gunsmith","weapon",weapons,[
    ["Semi-Auto Shotgun","Buy it from the Escalera gunsmith. If you plan to buy the other rare weapon here, return after the last mission in this chapter."],
    ["LeMat Revolver","After An Appointed Time, purchase it from the Escalera gunsmith."]
  ]);
  group(3,"Rare weapons in Blackwater","Blackwater gunsmith","weapon",weapons,[
    ["Carcano Rifle","Buy it from the Blackwater gunsmith once West Elizabeth is open."],
    ["Evans Repeater","Buy it from the Blackwater gunsmith. Its capacity is handy for the final Sharpshooter ranks."],
    ["Mauser Pistol","Buy it from the Blackwater gunsmith."]
  ]);

  group(1,"Jobs in New Austin","MacFarlane’s Ranch · Ridgewood Farm","job",jobs,[
    ["Nightwatch · MacFarlane’s Ranch","After New Friends, Old Problems, accept the Nightwatch shift at the marker after dark. Follow the dog, deal with each disturbance and return when directed. This also earns a Bollard Twins scrap."],
    ["Horsebreaking · Ridgewood Farm","Get the Lasso in Wild Horses, Tamed Passions, then take the horsebreaking job at Ridgewood Farm. Rope the horse in the corral, mount while holding the rope and counter its movement until it settles."]
  ]);
  group(2,"Jobs in Nuevo Paraíso","Chuparosa","job",jobs,[
    ["Nightwatch · Chuparosa","Take the nighttime shift in front of the bank. Follow the dog, resolve the calls and finish the patrol. This also earns a Bandito scrap."],
    ["Horsebreaking · Chuparosa","Accept the daytime job at the corral. Rope and mount the horse, then keep your rider balanced until the job completes."]
  ]);
  group(3,"Job in West Elizabeth","Blackwater","job",jobs,[
    ["Nightwatch · Blackwater","Take the shift at the post office on the south side of town after dark. Follow the dog through its calls, then finish the shift to earn job credit and an Army scrap."]
  ]);

  group(1,"Minigames in New Austin","MacFarlane’s Ranch · Rathskeller Fork · Thieves’ Landing","minigame",games,[
    ["Horseshoes","Play at MacFarlane’s Ranch. Aim at the stake, then release near the middle of the power meter. Win the match here to earn the Bollard Twins scrap too."],
    ["Blackjack","Play at Rathskeller Fork to combine this with a Treasure Hunter scrap. Leave the table with more chips than you bought in with."],
    ["Five Finger Fillet","Use the table in Armadillo or another town offering it. Learn each button sequence at the lowest stake and stay until every challenger is beaten."],
    ["Poker","Win the entire table by taking every opponent’s chips. The ranch table has a low buy-in. You can also do this later at the Blackwater saloon for an Army scrap."],
    ["Liar’s Dice","Play in Thieves’ Landing after Man Is Born Unto Trouble, or wait for Casa Madrugada to combine the win with a Bandito scrap. Keep your own dice count in mind before calling a bluff and play until all opponents are out."]
  ]);
  group(2,"Arm wrestling","Plainview · Agave Viejo · Casa Madrugada","minigame",games,[
    ["Arm Wrestling","Available after We Shall Be Together in Paradise. Bet low, hold the input to recover strength and push when your opponent tires. Beat all challengers at the table. Later, a specific table also awards an outfit scrap."]
  ]);
}

export default RDR_GROUPS;
