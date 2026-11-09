// The Setup and market module, added on 2026-11-08 (Will: "IN the logic map le's add the rest of step 1 modules."). An Opus
// subagent answers it for the whole account at step 1, beside Tracking and the client module, with the module's
// instructions and the verifiers' checks. Drawn as it works today, from comm-chat at origin/main 1c24d43a (read
// 2026-11-08): src/modules/mod.rs:181-198 (its entry: by a model, no needs, its check command, its words, and Meta's words),
// :119 (ACCOUNT_FACTS: the campaign modules and Decide need Tracking, the client, In motion and Money, not Setup), :59 (an
// answer counts 7 days), :665-722 (the shape of an answer; a problem names its fix); src/modules/day.rs:103 and :110-156
// (when it is due), :160-182 (a model module that is due makes Decide run); src/modules/brief/mod.rs:30-41 (the fixed rules),
// :46 (the check's questions), :157-171 (the last answer's test goes first), :218-230 (Meta's words on a Meta client);
// src/modules/brief/numbers.rs:556-601 (its facts: the accounts, the live campaigns, Google's and the platforms' own
// changes, brand words and rivals, the newest market read), :731-763 (Decide reads every fresh answer); src/modules/brief/
// reads.rs:39-52 and :154-184 (the exact reads, and the market's 30 days); src/modules/brief/checks.rs:13-22 (its stored
// checks: the exam's Settings and Market areas); src/chat/tools/module_tools.rs:483-558 (the save rules); src/modules/
// run.rs:84-130 (held to the newest module run once one is pushed); src/chat/tools/market_view.rs:418-442 (each read kept)
// and :733-755 (the live ads only in business hours); off in live since Nov 7: docs/claude-code-bridge-setup.md:2260-2264.
// The verifiers (~/Projects/verifiers at 4445307f): verify/src/modules.rs:72 (its four runs), :92 and :123-144 (its 16
// goals), verify/src/audit/market.rs:86-140 (both market goals warn on every run), the trees' `jev_blocks = []`. Real
// cases, read 2026-11-08: Barbara's Setup answers 8 (C2), 10 (Bull) and 12 (Kogalla) of Nov 1, with module_brief and
// answer_id; C2's answer 73 of Nov 3 and the Decide answers 54, 58 and 68, in a copy of Barbara's data (barbara-local,
// read-only; 73 is a test on that copy); the verifiers' module runs in state/modules/setup/runs/ and ~/Projects/verifiers-dev;
// the modules plan of Oct 31 (~/.agent/diagrams/modules-plan-2026-10-31-slides.html). Its history: comm-chat 535ea6b4 (its
// words, Oct 31 8:25 PM ET), 7e2ac44c (the facts, 9:17 PM), c5e2d960 (the market's 30 days and hours, Nov 1 10:13 AM),
// 5b8a3f4e (Meta's words, Nov 2 7:44 PM), adf00766 and c41c7c6c (demand and gaps to Reach, Nov 3 1:27 and 3:09 AM),
// 19423761 (merged Nov 6); the verifiers' 87abbca6 (`verify module`, Oct 31) and 0f424d35 (Nov 3).
LOGIC.flow({
  id: 'market',
  title: 'The Setup and market module', short: 'Setup and market module', status: 'Built; off in live until Will says yes',
  head: 'For the whole account, the Setup and market module checks that nothing stops the ads from running and that we know who we compete with, because no campaign fix helps while the account itself is broken',
  chart: [
    'flowchart TB',
    'WHEN(["It reads the account again on<br/>news about the whole account,<br/>or when its answer is<br/>{marketFresh} days old"]):::code',
    'RUN["Can the ads run at all? Opus<br/>reads each account’s settings,<br/>its billing, what holds its ads<br/>back, and Merchant Center"]:::opus',
    'PAGE["Do the client’s site and ads<br/>tell the truth? Opus looks for<br/>a banner, a price or a promise<br/>that is false"]:::opus',
    'MARKET["Who competes, what do they<br/>offer, and what does a click<br/>cost us beside them?"]:::opus',
    'LEFT["Search demand and the searches<br/>that no keyword covers belong<br/>to each campaign’s Search<br/>terms and reach"]:::code',
    'CHECKS["The verifiers check up to {marketGoals}<br/>things, and Opus answers each<br/>one that does not pass"]:::will',
    'RIVALS["The checks read each rival’s<br/>ads, pages and reviews"]:::next',
    'VERDICT(["Opus says good, a problem,<br/>too few to tell, or ask a<br/>person, and a problem<br/>comes with its fix"]):::opus',
    'CHECK{"Before it is saved, does<br/>the answer pass code’s<br/>checks?"}:::code',
    'GIVE(["Only the Decide module reads<br/>the answer, and the next one<br/>checks if it was right"]):::code',
    'WHEN --> RUN', 'RUN --> PAGE', 'PAGE --> MARKET', 'MARKET --> CHECKS', 'CHECKS --> VERDICT', 'VERDICT --> CHECK',
    'MARKET -. "left out here" .-> LEFT',
    'RIVALS -. "not built" .-> CHECKS',
    'CHECK -. "no, so Opus fixes<br/>it and tries again" .-> VERDICT',
    'CHECK -- yes --> GIVE'
  ],
  links: { WHEN: 'mkwhen', RUN: 'mkrun', PAGE: 'mkpage', MARKET: 'mkmarket', LEFT: 'mkleft', CHECKS: 'mkchecks', RIVALS: 'mkrivals', VERDICT: 'mkverdict', CHECK: 'mksave', GIVE: 'mkgive' },
  leaves: {
    mkpage: 'A banner, a price or a promise that is false',
    mkleft: 'Search demand and missing searches go to each campaign',
    mkrivals: 'The rivals’ ads, pages and reviews',
    mkverdict: 'Good, a problem, too few to tell, or ask a person',
    mksave: 'How code checks the answer'
  },

  // Each slide belongs to one view: the module's own slides first, then the slides of its rules.
  deck: [
    { about: ['market'], kicker: 'The idea',
      head: 'A false banner or a wrong price list wastes every click, whatever the campaigns do, so this module looks at the account and the market first',
      visual: { type: 'flow', rows: [
        { title: 'Kogalla, in the test of Nov 1', steps: [
          ['Every page carries a banner that says the new BatPaks are here', 'all three BatPaks were sold out', 'block'],
          ['A Google price list shows wrong prices and two recalled battery packs', '121 clicks in 30 days', 'block'],
          ['Noxgear came into Shopping on Sep 25', 'and Kogalla has not ranked first since early October', 'opus']],
          end: [['A problem, with 4 fixes', 'each one waits for a person', 'opus']] }] },
      vcap: 'That is the whole module on one client. The ads could run, but every paid visitor landed on an offer that the store could not fill. Opus read the account’s settings, Merchant Center, the site and the rivals in Shopping. The module only answers and never changes the account, so each fix went to a person.' },
    { about: ['market'], kicker: 'What it is asked',
      head: 'The module’s instructions ask Opus two things, whether the account can run and who it competes with, and to name only what bears on money',
      visual: { type: 'gate', rows: [
        ['Anything that stops the account from running well', 'Its settings, Merchant Center, delivery, a banner, or a page that says something false.', 'pass'],
        ['Who competes, and what they offer', '', 'pass'],
        ['Where our click cost sits in the market', '', 'pass'],
        ['Search demand and the searches no keyword covers', 'Left out here, because each campaign’s Search terms and reach answers them.', 'hold'],
        ['On Meta, the account’s status and billing first', 'A billing hold or a review stops every ad, and it looks like a creative problem.', 'pass'],
        ['On Meta, Advantage+ stays off, and the account keeps our standard campaigns', 'Both builders off, an audience test, a creative test and remarketing.', 'pass']],
        end: ['Name only what bears on money', 'opus'] },
      vcap: 'The last two lines join the instructions only for a client with a Meta account. Code gives these instructions to Opus word for word, near the top of the fact sheet that it hands over first.' },
    { about: ['market'], kicker: 'A real answer',
      head: 'Kogalla’s answer of Nov 1 found that the ads could run, but that a price list, a banner and a new rival were costing sales',
      visual: { type: 'card', title: 'The Setup and market module’s answer for Kogalla, Nov 1, a problem', fields: [
        ['Can the ads run', 'Yes. Google’s settings are right, both campaigns serve, Merchant Center approves all 15 products, and Google may not apply its own tips.'],
        ['What is false', 'A Google price list shows the RA at $114.99 while the site sells it at $129.97, and it names the 2F and 3F packs that Kogalla recalled. A banner on every page promises BatPaks that are sold out.'],
        ['Who competes', 'In Shopping, Noxgear came in on Sep 25. UltraSpire, Lightbar and Noxgear each sell a light with its battery, while Kogalla can sell only lights with no battery.'],
        ['What a click costs us', 'Brand clicks cost $0.86, far under Google’s range of $2.71 to $3.00 for “kogalla”. PMax pays at or above the top of Google’s range on rival and waist-light searches.'],
        ['Its fixes', 'Remove the price list, show only the RA Light Kit in Shopping, ask Rob to change the banner, and save the rivals on Kogalla’s record.']],
        stamp: ['A problem, with 4 fixes', 'block'] },
      vcap: 'Opus wrote it in a test at 3:35 AM ET on Nov 1. It read Merchant Center’s view of who ranks in Shopping, the store’s own product pages and Kogalla’s recall page, and it found each rival’s offer on that rival’s own site.',
      stats: [['26', 'facts in its proof, each with its source', 'real'], ['4', 'fixes, three of them on open cases', 'real'], ['8', 'checks that it answered in words', 'real']] },
    { about: ['market'], kicker: 'Where it runs',
      head: 'The Setup and market module runs early each morning, beside Tracking and the client module, because it needs no other module’s answer',
      visual: { type: 'flow', rows: [
        { title: 'First, code answers two modules by itself', steps: [['The In motion and Money modules', 'with no AI', 'code']], end: [['Both answers are saved', 'before any Opus starts', 'code']] },
        { title: 'Then the modules about the whole account, side by side', steps: [['Each one that is due gets its own Opus subagent', '', 'code']], end: [['Tracking', '', 'opus'], ['The client module', '', 'opus'], ['Setup and market', 'it needs no other answer', 'opus']] },
        { title: 'Then each campaign, and last the Decide module', steps: [['Results, Search terms and reach, Ads and pages, and Bid and budget', 'none of them reads this answer', 'opus']], end: [['Decide', 'it reads this answer with all the others', 'opus']] }] },
      vcap: 'The module’s subagent starts from the fact sheet that code gives it, runs the verifiers’ checks, and may use every read tool after that. It can write only its one answer, so it never changes the account.' },
    { about: ['market'], kicker: 'The plan of Oct 31',
      head: 'The plan Will read on Oct 31 already set the module’s question, what it reads and its tests, and the code follows it with three changes',
      visual: { type: 'card', title: 'Setup and market, in the modules plan of Oct 31', fields: [
        ['Its question', 'Can the account run, and do we know the market?'],
        ['When it runs', 'Once a week, or when a setting changes.'],
        ['What it reads', 'Account settings, Merchant Center, Meta delivery, who competes and what they say.'],
        ['Its checks', '18, the settings and market goals of each platform.'],
        ['Its answer', 'Clear, or what stops the account from running well.'],
        ['Its tests', 'Kogalla’s false banner and Lightbar’s rise, and the recommendations that Google applied by itself on C2’s Brand campaign.']],
        stamp: ['Built that night', 'code'] },
      vcap: 'First, it also reads again after an alert that names no campaign, or a follow-up on the product feed. Second, its checks are {marketGoals}, after two market checks moved to Search terms and reach on Nov 3. Third, the plan sends every first-step answer into every campaign, but code gives this one only to the Decide module.',
      quote: ['Build them all so I can start testing and clearing each module', 'Oct 31'] },
    { about: ['market'], kicker: 'Where it stands',
      head: 'The module is built and has run in tests on three clients, but no live morning runs it until Will says yes',
      visual: { type: 'timeline', items: [
        ['Oct 31, 9:17 PM ET', 'The modules are built, Setup and market among them, with its question, its instructions and its checks.'],
        ['Nov 1, 3:15 AM ET', 'Its checks run on Kogalla, Bull Legal and C2. Between 3:30 and 3:35 AM Opus saves the first three answers, and C2 and Kogalla read a problem while Bull Legal asks a person.'],
        ['Nov 1, 10:13 AM ET', 'Barbara starts to keep each market read, and the module reads the market again only once the newest read is over {marketDays} days old. Who shows ads is read only in business hours.'],
        ['Nov 2, 7:44 PM ET', 'On a client with a Meta account, Opus now reads the account’s status and billing first, and checks Advantage+ and the house structure.'],
        ['Nov 3, 1:27 AM ET', 'Search demand and the searches no keyword covers move to Search terms and reach, and the verifiers’ check starts to read the market by itself.'],
        ['Nov 3, 3:09 AM ET', 'The instructions change to who competes, what they offer and where our click cost sits.'],
        ['Nov 4', 'Module runs take the place of the morning run.'],
        ['Nov 6 and Nov 7', 'The module run is merged, and from Nov 7 it stays off in live until Will tests it and says yes to its cost.']] },
      vcap: 'Every answer on this map comes from the tests of Nov 1, or from a test of C2 on a copy of Barbara’s data on Nov 3. In live, a person can still run it under Validators and then Modules.',
      quote: ['we should just run it yes?', 'Nov 4'] },

    { about: ['mkpage'], kicker: 'What the visitor reads',
      head: 'Opus reads the client’s own pages and ads, because a false promise there loses the clicks that we already paid for',
      visual: { type: 'gate', rows: [
        ['Kogalla, Nov 1', 'A banner on every page says the new BatPaks are here, while all three are sold out. A Google price list names two battery packs that Kogalla recalled.', 'stop'],
        ['Bull Legal, Nov 1', 'The two Startups ads that brought 15 of the account’s 19 conversions promise a free consultation, and the page does not say so.', 'hold'],
        ['C2, Nov 3', 'The address in the footer and its map link point to two different cities, and Opus saw no money in it.', 'pass']],
        end: ['Only what bears on money becomes a fix', 'opus'] },
      vcap: 'The fact sheet names the client’s website and asks Opus to read it for a banner or a line that says something false. Only Kogalla could change its banner, because we have had no Shopify access since May, so the fix was an email to Rob. For Bull, the fix was a question that Isaac puts to Tyler.' },

    { about: ['mkleft'], kicker: 'Left to each campaign',
      head: 'Search demand and the searches that no keyword covers belong to each campaign, so this module leaves them out',
      visual: { type: 'timeline', items: [
        ['Nov 1', 'The first answers still answer search demand and the buying searches that no keyword covers, because both were among the module’s checks.'],
        ['Nov 2', 'Will asks whether those two belong with the search terms.'],
        ['Nov 3, 1:27 AM ET', 'Both checks move to each campaign’s Search terms and reach.'],
        ['Nov 3, 3:07 AM ET', 'C2’s test on a copy of Barbara’s data still puts the niche’s loss of about 41% of its searches in its summary, because the instructions still say what changed in the market.'],
        ['Nov 3, 3:09 AM ET', 'The instructions change to who competes, what they offer and where our click cost sits, and they leave demand and the missing searches to Search terms and reach.']] },
      vcap: 'Each Google campaign’s Search terms and reach now gets the market’s two lines for the whole account, and it must test each missing search against its own keywords before it proposes one.',
      quote: ["Shouldn't these two be in the search term section?", 'Nov 2'] },

    { about: ['mkrivals'], kicker: 'Not built yet',
      head: 'Nothing reads the rivals’ ads, pages and reviews yet, so the verifiers’ check on the main competitors can never pass today',
      visual: { type: 'flow', rows: [
        { title: 'Today', steps: [['The check on the main competitors', 'it counts the rivals on file and the advertisers on live search pages', 'will']], end: [['Could not check, on every client', 'because nothing reads their ads, pages, reviews or local ads', 'block']] },
        { title: 'The plan', steps: [['Code reads each rival’s ads, landing pages, reviews and local ads', '', 'next'], ['Opus compares the offer, the price, the guarantee, the speed and the proof', '', 'next']], end: [['Each place where a rival beats the client becomes a fix for the ads or the pages', '', 'next']] }] },
      vcap: 'The verifiers mark this as a reader that Jacob still has to build. Until then Opus reads the rivals itself. On Nov 3 it found on TREND PR’s own site a money-back guarantee, which C2 does not offer.' },

    { about: ['mkverdict'], kicker: 'The verdict',
      head: 'Each answer ends in one of four verdicts, and the first three answers used two of them',
      visual: { type: 'gate', rows: [
        ['A problem', 'C2’s and Kogalla’s answers of Nov 1 read a problem. A problem must come with at least one fix, and C2’s answer came with 5.', 'stop'],
        ['Ask a person', 'Bull Legal on Nov 1. Tyler must say whether the first consultation is free, so the answer asks Isaac to ask him.', 'hold'],
        ['Good', 'No answer has said good yet.', 'pass'],
        ['Too few to tell', 'No answer has said it yet.', 'hold']],
        end: ['One verdict for the whole account', 'opus'] },
      vcap: 'An answer that asks a person must say whom to ask and what. Bull’s answer also proposed five fixes, so a question and fixes can come in the same answer. C2’s answer of Nov 3 read a problem again.' },

    { about: ['mksave'], kicker: 'Before it is saved',
      head: 'Code checks the answer before it is saved, the cheap checks first, and any miss sends it back to Opus with the reason',
      visual: { type: 'gate', rows: [
        ['It is for the run’s own client', '', 'pass'],
        ['The summary and each fix are in plain words', 'No ids, file paths or links.', 'pass'],
        ['It is complete, and a problem comes with its fix', 'Each fix says what it should change, the number that will show it, and when.', 'pass'],
        ['It answers the newest run of the verifiers’ checks', 'Once the verifiers send module runs to Barbara.', 'hold'],
        ['Each quote is in the mail, call or reply it came from', '', 'pass'],
        ['Jev reads each fix once', 'A clear no refuses it, and an unsure reading lets it through.', 'pass']],
        end: ['Saved, or refused with the reason, so Opus fixes it and tries again', 'code'] },
      vcap: 'C2’s answer of Nov 1 came before the rule that each fix says what it should change, so none of its five fixes did, and today code would refuse it. C2’s answer of Nov 3 gave every fix its effect, such as Meta’s spend falling to about $5 a day.' }
  ],

  examples: {
    WHEN: { tag: 'made', rows: [{ steps: [['Isaac pauses C2’s two webinar campaigns', 'Nov 2, neither had spent anything', 'will'], ['A person’s change that names no live campaign', '', 'code']], end: [['The module reads C2 the next morning', '', 'opus']] }], note: 'Isaac really paused the two campaigns on Nov 2, as C2’s answer of Nov 3 says, but no live morning has run this module yet.' },
    RUN: { tag: 'real', rows: [{ steps: [['Kogalla, Nov 1', 'Google’s settings are right and both campaigns serve', 'opus'], ['Merchant Center approves all 15 products', '', 'opus']], end: [['The ads can run', '', 'keep']] }], note: 'We took this from the answer that the Setup and market module wrote for Kogalla in a test on Nov 1.' },
    PAGE: { tag: 'real', rows: [{ steps: [['A banner on every page of Kogalla’s site', '“the new BatPaks are here”', 'code'], ['All three BatPaks are sold out', '', 'block']], end: [['A fix that asks Rob to change the banner', 'only Kogalla can change it', 'opus']] }], note: 'This banner was on Kogalla’s site on Nov 1, when a test of this module read it.' },
    MARKET: { tag: 'real', rows: [{ steps: [['Kogalla’s rivals in Shopping', 'Noxgear from Sep 25, and Lightbar', 'opus'], ['Each sells a light with its battery', 'from $29.99 to $99.99', 'opus']], end: [['Kogalla can sell only lights with no battery', 'every BatPak is sold out', 'block']] }], note: 'We took this from the answer that the Setup and market module wrote for Kogalla in a test on Nov 1.' },
    LEFT: { tag: 'real', rows: [{ steps: [['C2’s test answer, Nov 3, 3:07 AM ET', 'its summary still says the niche lost about 41% of its searches', 'opus']], end: [['The instructions change two minutes later', 'they now leave search demand to each campaign’s Search terms and reach', 'code']] }], note: 'C2’s answer is real, from a test on a copy of Barbara’s data, and the change to the instructions came two minutes after it.' },
    CHECKS: { tag: 'real', rows: [{ steps: [['The verifiers’ check on C2', 'Nov 1, 3:16 AM ET, in 133.7 s', 'will']], end: [['1 failed, 4 could not run, and 4 passed', '', 'block']] }], note: 'We took this from the verifiers’ run of the module’s check on C2, Nov 1.' },
    RIVALS: { tag: 'plan', rows: [{ steps: [['Code reads TREND PR’s ads, pages and reviews', '', 'next'], ['Opus sets its money-back guarantee beside C2’s offer', '', 'next']], end: [['If TREND PR’s offer beats C2’s, a fix for C2’s ads or pages', '', 'next']] }], note: 'Not built. On Nov 3 Opus found the guarantee on TREND PR’s own site, because nothing reads the rivals’ ads.' },
    VERDICT: { tag: 'real', rows: [{ steps: [['Bull Legal, Nov 1', 'two ads promise a free consultation that the page does not', 'opus']], end: [['Ask a person', 'Isaac asks Tyler whether the first consultation is free', 'will']] }], note: 'This comes from the answer that this module wrote for Bull Legal in a test on Nov 1.' },
    CHECK: { tag: 'made', rows: [{ steps: [['C2’s answer of Nov 1', 'a problem, with 5 fixes', 'opus'], ['Does each fix say what it should change?', 'no, not one', 'code']], end: [['Refused today, so Opus fixes it and tries again', '', 'block']] }], note: 'The answer is real, but it was saved before that rule came in, so code never refused it. Today code would send it back to Opus.' },
    GIVE: { tag: 'real', rows: [{ steps: [['Kogalla’s answer of Nov 1', 'it proposes removing the price list', 'opus'], ['The Decide module reads that fix', 'together with every other module’s answer', 'code']], end: [['Its first decision removes the price list', 'together with the fix that shows only the RA Light Kit', 'opus']] }], note: 'We took this from the answer that the Decide module wrote for Kogalla in a test on Nov 1, which we read in a copy of Barbara’s data.' }
  },

  reviewed: { self: '7ff42090', above: '2525099a', on: '2026-11-08' }
});
