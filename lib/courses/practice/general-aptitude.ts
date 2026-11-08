import { mcq, num, practice, worked, type LessonExtras } from "./helpers";

export const GENERAL_APTITUDE_EXTRAS: LessonExtras = {
  "numbers-percentages-ratios": [
    worked(
      "Worked example: successive percentage changes",
      "A price rises by 20%, then falls by 20%. What is the net change?",
      [
        ["Use multipliers", "+20% is × 1.2; −20% is × 0.8."],
        ["Combine", "1.2 × 0.8.", "0.96"],
        ["Read it off", "0.96 means a 4% drop."],
      ],
      "A net fall of 4%",
      "Shortcut for +a% then −b%: a − b − ab/100. Equal rises and falls always leave a net loss."
    ),
    practice([
      mcq("ga-np-1", "A : B = 2 : 3 and B : C = 4 : 5. What is A : B : C?", [
        ["8 : 12 : 15", true, "Make B the same in both: 2:3 = 8:12 and 4:5 = 12:15."],
        ["2 : 3 : 5", false, "The two ratios use different scales for B."],
        ["8 : 12 : 20", false, "C should be 15."],
      ], "Scale the ratios so the shared term matches.", "foundation"),
      num("ga-np-2", "A number rises by 25%. By what percentage must it now fall to return to the original?", 20,
        "From 125 back to 100 is a fall of 25/125 = 20%.", "gate-level", "%"),
      num("ga-np-3", "The salary is ₹40,000. 30% is spent on rent and 25% of the rest on food. How much is spent on food?", 7000,
        "Rest after rent = 28,000; 25% of that = 7000.", "foundation", "₹"),
    ]),
  ],

  "work-rate-and-speed-time-distance": [
    worked(
      "Worked example: working together",
      "A can finish a job in 10 days and B in 15 days. How long do they take working together?",
      [
        ["Rates", "A does 1/10 of the job per day, B 1/15."],
        ["Combined rate", "1/10 + 1/15 = 3/30 + 2/30.", "5/30 = 1/6 per day"],
        ["Time", "The reciprocal of the rate.", "6 days"],
      ],
      "6 days",
      "Add rates, not times. For two people: time = ab/(a + b)."
    ),
    practice([
      num("ga-ws-1", "A car goes from A to B at 60 km/h and returns at 40 km/h. What is its average speed for the round trip, in km/h?", 48,
        "For equal distances, the average is the harmonic mean: 2·60·40/(60 + 40) = 48.", "gate-level", "km/h"),
      num("ga-ws-2", "A 200 m train passes a pole in 10 s. What is its speed, in km/h?", 72, "20 m/s × 3.6 = 72 km/h.", "foundation", "km/h"),
      num("ga-ws-3", "A pipe fills a tank in 6 hours; a leak empties it in 12 hours. With both open, how many hours does it take to fill?", 12,
        "Net rate = 1/6 − 1/12 = 1/12 per hour, so 12 hours."),
    ]),
  ],

  "permutations-combinations-and-probability": [
    worked(
      "Worked example: arrangements with repeated letters",
      "How many distinct arrangements are there of the letters of LEVEL?",
      [
        ["Total letters", "5 letters: L, E, V, E, L."],
        ["Repeats", "L appears twice, E twice."],
        ["Divide out the repeats", "5! / (2!·2!).", "120 / 4", "30"],
      ],
      "30",
      "For n items with groups of identical items of sizes a, b, …: n!/(a!·b!·…)."
    ),
    practice([
      mcq("ga-pc-1", "Two fair dice are rolled. What is the probability that the sum is 7?", [
        ["1/6", true, "6 favourable outcomes ((1,6), (2,5), …, (6,1)) out of 36."],
        ["1/12", false, "That counts each pair only once."],
        ["7/36", false, "There are 6, not 7, ways."],
      ], "7 is the most likely sum of two dice.", "foundation"),
      num("ga-pc-2", "In how many ways can a committee of 3 be chosen from 8 people?", 56, "C(8, 3) = 56.", "foundation"),
      num("ga-pc-3", "A coin is tossed 3 times. What is the probability of at least one head? Give a decimal.", 0.875,
        "1 − P(no heads) = 1 − 1/8 = 7/8 = 0.875.", "gate-level", undefined, 0.001),
    ]),
  ],

  "geometry-mensuration-and-data-interpretation": [
    worked(
      "Worked example: how area scales",
      "A circle's radius grows by 10%. By what percentage does its area grow?",
      [
        ["Area depends on r²", "A = πr²."],
        ["New area", "(1.1r)² = 1.21r².", "1.21 × the old area"],
        ["Increase", "1.21 − 1 = 0.21.", "21%"],
      ],
      "21%",
      "Lengths scale by k, areas by k², volumes by k³."
    ),
    practice([
      num("ga-gm-1", "What is the area of a triangle with sides 3, 4 and 5?", 6, "It's a right triangle: ½·3·4 = 6.", "foundation"),
      num("ga-gm-2", "A cube's side doubles. By what factor does its volume grow?", 8, "2³ = 8.", "foundation"),
      num("ga-gm-3", "Sales were 120 in 2023 and 150 in 2024. What was the percentage growth?", 25, "(150 − 120)/120 = 30/120 = 25%.", "foundation", "%"),
    ]),
  ],

  "syllogisms-and-deductive-logic": [
    worked(
      "Worked example: does the conclusion follow?",
      "All cats are animals. Some animals are pets. Does 'Some cats are pets' follow?",
      [
        ["Draw it", "The cats circle sits inside the animals circle. The pets circle overlaps the animals circle somewhere."],
        ["Look for a counterexample", "Place the pets overlap in the part of 'animals' that has no cats."],
        ["Conclude", "Both premises stay true while no cat is a pet, so the conclusion isn't forced."],
      ],
      "It does not follow",
      "A conclusion follows only if it's true in every diagram that fits the premises."
    ),
    practice([
      mcq("ga-sy-1", "All roses are flowers. No flower is a tree. Which follows?", [
        ["No rose is a tree", true, "Roses sit inside flowers, which don't overlap trees."],
        ["Some trees are roses", false, "That contradicts the premises."],
        ["All flowers are roses", false, "That reverses the first premise."],
      ], "'All A are B' and 'No B is C' give 'No A is C'.", "foundation"),
      mcq("ga-sy-2", "Some pens are blue. All blue things are bright. Which follows?", [
        ["Some pens are bright", true, "The blue pens are bright."],
        ["All pens are bright", false, "Only the blue ones are known to be."],
        ["No pen is bright", false, "That contradicts the premises."],
      ], "'Some A are B' and 'All B are C' give 'Some A are C'."),
      mcq("ga-sy-3", "'If it rains, the ground is wet. The ground is wet.' Does it follow that it rained?", [
        ["No: that's affirming the consequent", true, "The ground could be wet for another reason."],
        ["Yes: that's modus ponens", false, "Modus ponens needs the 'if' part, not the 'then' part."],
      ], "Valid: p → q, p ⊢ q. Invalid: p → q, q ⊢ p.", "tricky"),
    ]),
  ],

  "logical-puzzles-seating-and-blood-relations": [
    worked(
      "Worked example: a blood relation",
      "Pointing to a man, a woman says: 'His mother is the only daughter of my mother.' How is the woman related to the man?",
      [
        ["The only daughter of my mother", "The woman's mother's only daughter is the woman herself."],
        ["Substitute", "'His mother is me.'"],
      ],
      "She is his mother",
      "Replace each phrase with the person it names, starting from the speaker."
    ),
    practice([
      mcq("ga-bl-1", "A is B's brother. C is A's mother. D is C's father. How is B related to D?", [
        ["B is D's grandchild", true, "D is the father of C, who is the parent of A and B."],
        ["B is D's son", false, "One generation is missing."],
        ["B is D's nephew", false, "There's no sibling of D involved."],
      ], "Draw the family tree as you read.", "foundation"),
      num("ga-bl-2", "Five people sit in a row. A sits in the middle. B sits at the left end, and C sits next to A on A's right. How many seats separate B from C (not counting B's and C's own)?", 2,
        "Seats 1 to 5: B at 1, A at 3, C at 4. Seats 2 and 3 are between them."),
      mcq("ga-bl-3", "Six people sit around a round table. In how many distinct orders can they sit (rotations counted as the same)?", [
        ["120", true, "(n − 1)! = 5! = 120."],
        ["720", false, "That counts rotations separately."],
        ["60", false, "That would also treat reflections as the same."],
      ], "Circular arrangements: (n − 1)!; halve again if reflections count as the same."),
    ]),
  ],

  "spatial-transformations-and-grammar": [
    worked(
      "Worked example: a clock in a mirror",
      "A clock shows 3:15. What time does its mirror image appear to show?",
      [
        ["Rule", "For a mirror on the side, the mirror time = 11:60 − the actual time."],
        ["Subtract", "11:60 − 3:15.", "8:45"],
      ],
      "8:45",
      "If the result goes past 12:00, subtract 12. The rule works because the mirror reflects the dial left to right."
    ),
    practice([
      mcq("ga-sp-1", "A clock shows 9:30. What does its mirror image show?", [
        ["2:30", true, "11:60 − 9:30 = 2:30."],
        ["3:30", false, "Use 11:60, not 12:00, so the minutes work out."],
        ["9:30", false, "Only times like 12:00 and 6:00 look the same in a mirror."],
      ], "Mirror time = 11:60 − actual time.", "foundation"),
      mcq("ga-sp-2", "The letter b is reflected in a vertical mirror. What does it become?", [
        ["d", true, "A vertical mirror swaps left and right."],
        ["p", false, "That's a horizontal (water) reflection."],
        ["q", false, "That's a 180° rotation."],
      ], "Mirror (vertical axis): b ↔ d. Water (horizontal axis): b ↔ p."),
      mcq("ga-sp-3", "A shape is rotated 90° clockwise twice. That's the same as:", [
        ["A 180° rotation", true, "The angles add up."],
        ["A reflection", false, "Rotations never reverse handedness."],
        ["No change", false, "That needs 360°."],
      ], "Two reflections in crossing lines make a rotation; one reflection never does.", "foundation"),
    ]),
  ],

  "paper-folding-cube-nets-and-isometric-views": [
    worked(
      "Worked example: a painted cube cut into pieces",
      "A painted cube is cut into 27 equal small cubes (3 × 3 × 3). How many small cubes have exactly two painted faces?",
      [
        ["Where they are", "Two painted faces means an edge cube, but not a corner."],
        ["Per edge", "Each edge has 3 cubes; take away the 2 corners.", "3 − 2", "1"],
        ["Edges", "A cube has 12 edges.", "12 × 1", "12"],
      ],
      "12",
      "For an n × n × n cut: 8 corners (3 faces), 12(n − 2) with 2 faces, 6(n − 2)² with 1 face, and (n − 2)³ with none."
    ),
    practice([
      num("ga-cu-1", "Same 3 × 3 × 3 cube. How many small cubes have no painted face?", 1, "(n − 2)³ = 1³ = 1, the centre cube.", "foundation"),
      num("ga-cu-2", "A painted cube is cut into 64 small cubes (4 × 4 × 4). How many have exactly one painted face?", 24,
        "6(n − 2)² = 6·4 = 24."),
      num("ga-cu-3", "A square sheet is folded in half twice, and one hole is punched through all the layers. How many holes are there when it's unfolded?", 4,
        "Two folds make 4 layers, and each layer gets a hole.", "foundation"),
    ]),
  ],

  "english-grammar-and-vocabulary-in-context": [
    worked(
      "Worked example: subject-verb agreement with 'neither…nor'",
      "Choose the verb: 'Neither the teacher nor the students ___ ready.'",
      [
        ["The proximity rule", "With either…or and neither…nor, the verb agrees with the nearer subject."],
        ["The nearer subject", "'the students', which is plural."],
      ],
      "are",
      "Compare 'Neither the students nor the teacher is ready', where the nearer subject is singular."
    ),
    practice([
      mcq("ga-en-1", "Choose the correct sentence.", [
        ["Each of the boys has a bike.", true, "'Each' is singular, so it takes 'has'."],
        ["Each of the boys have a bike.", false, "The verb agrees with 'each', not 'boys'."],
      ], "Each, every, either and neither (as subjects) take singular verbs.", "foundation"),
      mcq("ga-en-2", "Which word fits? 'The evidence was so ___ that the jury agreed in minutes.'", [
        ["compelling", true, "Strong, convincing evidence leads to a quick verdict."],
        ["ambiguous", false, "Unclear evidence would slow them down."],
        ["scant", false, "Too little evidence wouldn't convince them quickly."],
      ], "Read the whole sentence and pick the word that fits the logic, not just the grammar."),
      mcq("ga-en-3", "Choose the correct one: 'She is ___ honest person.'", [
        ["an", true, "'Honest' starts with a vowel sound, since the h is silent."],
        ["a", false, "The article follows the sound, not the letter."],
      ], "a university (y sound), an hour (silent h).", "foundation"),
    ]),
  ],

  "reading-comprehension-and-critical-reasoning": [
    worked(
      "Worked example: find the hidden assumption",
      "'Sales rose after we cut prices, so the price cut caused the rise.' Which assumption does this need?",
      [
        ["Spot the jump", "The argument goes from 'after' to 'because'."],
        ["What must be true", "Nothing else that happened at the same time explains the rise (a festival season, a competitor closing, an ad campaign)."],
        ["Test it", "If another cause existed, the conclusion would collapse, so that's the assumption."],
      ],
      "No other factor caused the sales rise",
      "To find an assumption, negate each option: the right one, once negated, destroys the argument."
    ),
    practice([
      mcq("ga-rc-1", "'Students who sleep 8 hours score higher, so sleeping more raises scores.' Which option weakens this most?", [
        ["Students who already score well have less stress, so they sleep more", true, "That reverses the causation: scores (through stress) could be driving the sleep."],
        ["Many students sleep 8 hours", false, "That doesn't touch the causal claim."],
        ["Sleep is good for health", false, "That's irrelevant to scores."],
      ], "Correlation arguments are weakened by reverse causation or a third factor."),
      mcq("ga-rc-2", "An inference in reading comprehension must be:", [
        ["Supported by the passage, even if it isn't stated directly", true, "It has to follow from what's there, not from outside knowledge."],
        ["Stated word for word in the passage", false, "That's a restatement, not an inference."],
        ["True in the real world", false, "Only what the passage supports counts."],
      ], "Beware options that are true but not supported by the passage.", "foundation"),
      mcq("ga-rc-3", "'All successful founders take risks. Ravi takes risks.' Which conclusion is valid?", [
        ["None: Ravi might or might not be a successful founder", true, "Taking risks is necessary for success, not sufficient."],
        ["Ravi is a successful founder", false, "That's affirming the consequent."],
        ["Ravi isn't a founder", false, "Nothing supports that."],
      ], "'All A are B' doesn't mean 'all B are A'.", "tricky"),
    ]),
  ],
};
