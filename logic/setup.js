// Setup: how a client gets ready for search term filtering, as it really works (Will, 2026-11-06: "for this
// documentation we want to show how it actually works ... what needs to be created? and I want it to happen
// automatically ... I want to call in from Barbara and the other places"). It is not a step of each call.
// Round 2 (Will, Nov 6): the service list comes before the cards ("wouldn't it be before we write the card? Not off on
// the side"; the card writer already reads it first); no card approval. Will, Nov 7: "Take clef out": the history,
// the backtest and the step that turned Clef on left with it. Will, Nov 7, on what checks a new or changed card: Opus
// judges again every search that campaign kept ("Just to make sure we don't have things approved that shouldn't be").
// Will, Nov 7: "I think that will be in a seperate module that will call and have the setup run again (or run it
// itself)." Setup drafts a card only for a campaign with no card, or when a caller runs the cards job again; it does
// not watch for changed campaigns. Built Nov 7 (~/Projects/search-terms src/cards.rs, the README's "Cards follow the
// client's places"): the card writer follows the client's own words about places, and code refuses a card that names
// another campaign (cards::names_a_campaign). It refused C2's 5 old cards and 4 of ADI's; C2's 5 were drafted again on
// Nov 7, and their campaigns' 230 kept searches were judged again with Google's page (197 keeps, 20 blocks, 13 unclear).
LOGIC.flow({
  id: 'setup', parent: 'waterfall',
  title: 'Setup: getting a client ready', short: 'Setup',
  head: 'Setup makes a client ready, and nobody has to start it by hand',
  chart: [
    'flowchart TB',
    'CALL(["After a call that finds<br/>a client not set up,<br/>or by a person"]):::code',
    'SVC["Build the service list<br/>from the client\'s calls,<br/>emails and notes"]:::opus',
    'READ["Read each campaign:<br/>keywords, ad groups,<br/>ads, landing page"]:::code',
    'CARDS["Write a card for each<br/>campaign with no card,<br/>or when a caller asks"]:::opus',
    'CHK{"Does the card name<br/>another campaign?"}:::code',
    'CHG(["Not built: another module<br/>sees a changed campaign<br/>and asks for a new card"]):::next',
    'RE["Opus judges the<br/>campaign\'s kept searches<br/>again, with the new card<br/>and Google\'s page"]:::opus',
    'DONE(["Set up: the judges read<br/>the newest list and cards"]):::keep',
    'CALL --> SVC', 'CALL --> READ', 'SVC --> CARDS', 'READ --> CARDS', 'CARDS --> CHK',
    'CHK -- "yes: refused,<br/>drafted again" --> CARDS', 'CHK -- "no: kept" --> DONE', 'CHG -.-> CARDS', 'CHK -. "kept, and new<br/>or changed" .-> RE'
  ],
  links: { CALL: 'setupcall', SVC: 'services', READ: 'readcamps', CARDS: 'cards', CHK: 'cardcheck', CHG: 'redraft', RE: 'rejudge' },
  leaves: {
    setupcall: 'Who starts setup',
    services: 'Service list',
    readcamps: 'Read each campaign',
    redraft: 'A changed campaign',
    cards: 'Campaign cards',
    cardcheck: 'A card names no other campaign',
    rejudge: 'A new card: the kept searches again'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each box.
  deck: [
    { about: ['setup'], kicker: 'What it is',
      head: 'Setup makes a client ready, and nobody has to start it by hand',
      visual: { type: 'flow', rows: [{ steps: [['A start', 'a person, or a call that finds a client not set up', 'code'], ['Setup', 'service list, cards', 'opus']], end: [['Set up', 'the judges read the newest list and cards', 'keep']] }] },
      vcap: 'Setup is not a step of each call. It runs once for a new client, and again when a campaign changes.' },
    { about: ['setup'], kicker: 'What gets made',
      head: 'Setup makes three things for each client',
      visual: { type: 'card', title: 'What setup makes', fields: [
        ['The service list', 'what the client sells and does not sell, in their own words'],
        ['A card for each campaign', 'what it wants, and the words it must keep'],
        ['Facts', 'research adds them over time, each with its source']], stamp: ['Drafted again only when a caller asks: a person today, another module later', 'code'] },
      vcap: 'C2 has a 32-line service list and 8 cards.' },
    { about: ['setupcall'], kicker: 'Who starts setup',
      head: 'Three callers start setup: a person or Barbara, a call, and later another module',
      visual: { type: 'flow', rows: [
        { title: 'A new client', steps: [['Barbara or a person asks', '“Set up search terms for this client”', 'next'], ['Setup runs', '', 'opus']], end: [['Set up', '', 'keep']] },
        { title: 'A call finds a client not set up', steps: [['A person’s session calls the module', 'Set up? No.', 'code'], ['Setup starts after the call', 'the call goes on with Opus', 'opus']], end: [['Set up for the next call', '', 'keep']] },
        { title: 'A campaign changed', steps: [['A changed campaign', 'another module will notice it: not built', 'next'], ['It asks for a new card', '', 'next']], end: [['Opus drafts the card again', '', 'opus']] }] },
      vcap: 'Built Nov 7: setup starts after a call finds a client not set up, and a person can run it with “search-terms setup <client>”. Not built yet: a start from Barbara, and the module that notices a changed campaign (Will, Nov 7).',
      quote: ['I want it to happen automatic automatically, right? So like I want to call in from Barbara and the other places to make this happen.', 'Nov 6'] },
    { about: ['services'], kicker: 'The service list',
      head: 'The client’s own words say what they sell, and what they do not',
      visual: { type: 'dots', groups: [[20, 'keep', 'lines C2 sells'], [12, 'code', 'lines C2 does not sell']] },
      vcap: '4 of 4 sampled quotes were found in the call recordings. C2’s list took about 506K tokens and 21 minutes. All 54 clients would cost about 27M tokens.',
      quote: ['I only want to do it with this client right now. We are developing', 'Nov 5'] },
    { about: ['services'], kicker: 'Where it is used',
      head: 'One list for the whole client. A card says which part of it a campaign wants.',
      visual: { type: 'flow', rows: [{ steps: [['The service list', 'one for the client: 20 sold, 12 not', 'opus']], end: [
        ['The card writer reads it first', 'then each campaign, to write its card', 'opus'],
        ['Opus reads it on every call', 'beside the business, before it judges', 'opus'],
        ['The client question reads it', 'does a line settle the search?', 'opus']] }] },
      vcap: 'It stays one list, not a copy in each card: each judge reads the newest list on every call. Since Nov 7 the judge’s text says the list outranks everything else, Google’s page included.',
      quote: ["Wouldn't the service list exist inside the card? Or when is the service list being used?", 'Nov 6'] },
    { about: ['readcamps'], kicker: 'Read each campaign',
      head: 'Setup reads what each campaign bids on, says and sells before it writes a card',
      visual: { type: 'card', title: 'What setup reads for each campaign', fields: [
        ['Keywords', 'what the campaign bids on'],
        ['Ad groups', 'how it splits its searches'],
        ['Ads', 'what it promises'],
        ['Landing page', 'what the client sells there']], stamp: ['Every campaign that is on, or had searches in the last 90 days', 'code'] },
      vcap: 'C2: 8 campaigns, 3 on and 5 paused. A paused campaign gets a card when it had searches.' },
    { about: ['redraft'], kicker: 'A changed campaign · Will, Nov 7',
      head: 'Another module will notice a changed campaign and ask for a new card',
      visual: { type: 'flow', rows: [{ steps: [['A campaign gets new keywords, ads or a landing page', '', 'code'], ['Another module notices', 'not built', 'next']], end: [['It runs setup or the cards job again', '', 'opus'], ['The new card’s fingerprint differs, so it is a changed card', 'built', 'code']] }] },
      vcap: 'The search term module does not watch for changes. Each card has a fingerprint of its words, and saving a new draft compares the two. Today a person can run the cards job again: “search-terms cards <client>” drafts every card again.',
      quote: ['I think that will be in a seperate module that will call and have the setup run again (or run it itself).', 'Nov 7'] },
    { about: ['cards'], kicker: 'Campaign cards',
      head: 'A card says what a campaign wants, so “should it have this search?” has an answer',
      visual: { type: 'card', title: 'A campaign card (its shape)', fields: [['Wants', 'One to three sentences: what this campaign is for.'], ['Never negate', 'Words this campaign must keep.'], ['Note', 'Anything else a judge must know about this campaign.']], stamp: ['Written from the service list and the campaign', 'opus'] },
      vcap: 'Will, Nov 7: each campaign is judged on its own, so the judges no longer read a card’s lines on where searches go or on twins, and a card speaks of its own campaign alone. Will, Nov 6: a new or changed card needs no approval. Built Nov 7: Opus reads each campaign’s newest card. Will approved C2’s first 8 cards by hand on Nov 5; that stays as history.' },
    { about: ['cards'], kicker: 'The client’s places · built Nov 7',
      head: 'Where the client names the places he wants, the card follows his words, even where the ads reach wider',
      visual: { type: 'card', title: 'C2’s 5 new cards, Nov 7', fields: [
        ['National, both campaigns', 'Austin, Nashville or Chicago, the only cities outside LA and New York that Waylon would consider'],
        ['New York', 'the New York area, nearby New Jersey included'],
        ['Los Angeles', 'the Los Angeles area'],
        ['Tour Promotion', 'artists and teams in LA and New York, for shows in any market'],
        ['Not wanted, on all but Tour', 'a searcher who names a place outside those five areas, such as Dallas, Houston or Atlanta']], stamp: ['Drafted from Waylon’s own words', 'opus'] },
      vcap: 'The card writer now first looks for the places the client wants, in his own words. Will’s goal quotes him, and his calls, emails and notes say more. Waylon said on Sep 16, “austin nashville and chicago would be the only cities that i would”, so both National cards want only those three cities, though their ads reach the whole country outside Los Angeles and New York.' },
    { about: ['cardcheck'], kicker: 'A card names no other campaign · built Nov 7',
      head: 'Code refuses a card that names another campaign, so a judge never reads one',
      visual: { type: 'gate', rows: [
        ['C2, National Sep 2026: “the national twin of the LA + New York campaign”', 'refused', 'stop'],
        ['C2, New York: “the older New York version of the LA + New York campaign”', 'refused', 'stop'],
        ['ADI: “the bidding test arm of the EU Brand campaign”', 'refused', 'stop'],
        ['C2, LA + New York: “It is the account’s main non-brand campaign”', 'passes, because it says what this campaign is', 'pass'],
        ['“Artists in Los Angeles and New York”', 'passes, because it names places, not a campaign', 'pass']], end: ['Only a card that speaks of its own campaign is kept', 'code'] },
      vcap: 'The check refused C2’s 5 old cards and 4 of ADI’s 20. C2’s 5 were drafted again on Nov 7, and the new ones pass. ADI’s 4 still wait for a new draft in its test copy. Before the check, DeepSeek blocked “music pr agencies nyc” on National in a try of Nov 7, because an old card said New York belongs to another campaign.' },
    { about: ['rejudge'], kicker: 'A new card · Will, Nov 7',
      head: 'When a card is new or changed, Opus judges again every search that campaign kept',
      visual: { type: 'flow', rows: [{ title: 'C2’s 5 new cards, Nov 7', steps: [['230 kept searches', 'on 5 campaigns', 'opus'], ['Opus judges each one again', 'with the new card and Google’s page', 'opus']], end: [['197 stay keeps, and nothing changes', '', 'keep'], ['20 become blocks, on to the safety checks and Will', '', 'block'], ['13 come back unclear, for Will’s review', '', 'will']] }] },
      vcap: 'Built Nov 7, and run that evening on C2’s 5 new cards. Will, Nov 7: the kept searches only, and all of them, not a sample. Claude’s calls: a keep by the keyword check, by Will, or from a client’s answer is not judged again; a new block or unclear passes the same checks as any call. A card waits while one of its kept searches has no Google page.',
      quote: ["Just to make sure we don't have things approved that shouldn't be.", 'Nov 7'] }
  ],

  examples: {
    CALL: { tag: 'real', rows: [{ steps: [['A person runs setup', 'C2, Nov 7', 'code'], ['Each step is done', 'service list, cards', 'code']], end: [['Set up', '', 'keep']] }], note: 'Nov 7, this project’s C2 data. A call from Barbara is not built yet.' },
    SVC: { tag: 'real', rows: [{ steps: [['C2’s calls, emails, notes', '', 'code'], ['The service list', '32 lines: 20 sold, 12 not', 'opus']], end: [['Ready for the cards', 'the card writer reads it first', 'opus']] }], note: '4 of 4 sampled quotes were found in the recordings. It took about 506K tokens and 21 minutes.' },
    READ: { tag: 'real', rows: [{ steps: [['C2’s campaigns', '3 on, 5 paused', 'code'], ['Read each one', 'keywords, ad groups, ads, landing page', 'code']], end: [['Ready to write the cards', '', 'opus']] }], note: 'Nov 5.' },
    CARDS: { tag: 'real', rows: [{ steps: [['The service list and Waylon’s words on places', '', 'code'], ['5 C2 cards drafted again', 'Nov 7', 'opus']], end: [['5 new cards', 'each one passes the check', 'keep']] }], note: 'C2, Nov 7: the check had refused the 5 old ones, because each named another campaign. Will approved the first 8 cards as drafted on Nov 5; from Nov 6 a card needs no approval.' },
    CHK: { tag: 'real', rows: [{ steps: [['C2’s old National Sep 2026 card', '“the national twin of the LA + New York campaign”', 'code'], ['Does it name another campaign?', 'yes', 'code']], end: [['Refused, and drafted again', 'Nov 7', 'block']] }], note: 'One of C2’s 5 old cards that the check refused. Its new card names only places.' },
    CHG: { tag: 'plan', rows: [{ steps: [['C2 adds keywords to LA + New York', 'a made change', 'next'], ['Another module notices', 'not built', 'next']], end: [['A new card for LA + New York', '', 'next']] }], note: 'Not built: a separate module (Will, Nov 7).' },
    RE: { tag: 'real', rows: [{ steps: [['music press release', 'National Sep 2026, kept before', 'opus'], ['Its new card, Nov 7', 'and Google’s page', 'code']], end: [['Opus judges it again: block', 'the page is guides to write your own', 'block']] }], note: 'C2, Nov 7: one of the 20 kept searches that became blocks with the 5 new cards.' },
    DONE: { tag: 'real', rows: [{ steps: [['C2', 'a service list and 8 cards', 'code'], ['Set up', 'Nov 5', 'keep']], end: [['Opus reads them on each call', '', 'opus']] }], note: 'C2 and ADI are the clients set up in this project.' }
  },

  reviewed: { self: '5ddbecca', above: 'cce35754', on: '2026-11-08' }
});
