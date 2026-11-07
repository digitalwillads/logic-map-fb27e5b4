// Setup: how a client gets ready for search term filtering, as it really works (Will, 2026-11-06: "for this
// documentation we want to show how it actually works ... what needs to be created? and I want it to happen
// automatically ... I want to call in from Barbara and the other places"). It is not a step of each call.
// Round 2 (Will, Nov 6): the service list comes before the cards ("wouldn't it be before we write the card? Not off on
// the side"; the card writer already reads it first); no card approval. Will, Nov 7: "Take clef out": the history,
// the backtest and the step that turned Clef on left with it. Will, Nov 7, on what checks a new or changed card: Opus
// judges again every search that campaign kept ("Just to make sure we don't have things approved that shouldn't be").
// Will, Nov 7: "I think that will be in a seperate module that will call and have the setup run again (or run it
// itself)." Setup drafts a card only for a campaign with no card, or when a caller runs the cards job again; it does
// not watch for changed campaigns.
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
    'CHG(["Not built: another module<br/>sees a changed campaign<br/>and asks for a new card"]):::next',
    'RE["Opus judges the<br/>campaign\'s kept searches<br/>again with the new card"]:::opus',
    'DONE(["Set up: the judges read<br/>the newest list and cards"]):::keep',
    'CALL --> SVC', 'CALL --> READ', 'SVC --> CARDS', 'READ --> CARDS', 'CARDS --> DONE', 'CHG -.-> CARDS', 'CARDS -. "a new or<br/>changed card" .-> RE'
  ],
  links: { CALL: 'setupcall', SVC: 'services', READ: 'readcamps', CARDS: 'cards', CHG: 'redraft', RE: 'rejudge' },
  leaves: {
    setupcall: 'Who starts setup',
    services: 'Service list',
    readcamps: 'Read each campaign',
    redraft: 'A changed campaign',
    cards: 'Campaign cards',
    rejudge: 'A new card: the kept searches again'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each box.
  deck: [
    { about: ['setup'], kicker: 'What it is',
      head: 'Setup makes a client ready, and nobody has to start it by hand',
      visual: { type: 'flow', rows: [{ steps: [['A start', 'Barbara, the daily run, or a call that finds a client not set up', 'next'], ['Setup', 'service list, cards', 'opus']], end: [['Set up', 'the judges read the newest list and cards', 'keep']] }] },
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
        { title: 'A call finds a client not set up', steps: [['The daily run calls the module', 'Set up? No.', 'code'], ['Setup starts after the call', 'the call goes on with Opus', 'opus']], end: [['Set up for the next call', '', 'keep']] },
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
        ['DeepSeek reads it too', 'the second opinion', 'deep']] }] },
      vcap: 'It stays one list, not a copy in each card: each judge reads the newest list on every call.',
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
      vcap: 'Will, Nov 7: each campaign is judged on its own, so the judges no longer read a card’s lines on where searches go or on twins. Open: the words of 5 old C2 cards and 1 ADI card still name another campaign, and the judges read them (the project’s queue). Will, Nov 6: a new or changed card needs no approval. Built Nov 7: Opus and Jev read each campaign’s newest card. Will approved C2’s 8 cards by hand on Nov 5; that stays as history.' },
    { about: ['rejudge'], kicker: 'A new card · Will, Nov 7',
      head: 'When a card is new or changed, Opus judges again every search that campaign kept',
      visual: { type: 'flow', rows: [{ steps: [['A new or changed card', 'its fingerprint differs', 'opus'], ['Opus judges each kept search again', 'with the new card', 'opus']], end: [['Still a keep: nothing changes', '', 'keep'], ['Now a block: it goes the way of any block, to Will', '', 'block']] }] },
      vcap: 'Built Nov 7; no real card change has run it yet. Will, Nov 7: the kept searches only, and all of them, not a sample. Claude’s calls: a keep by the keyword check, by Will, or from a client’s answer is not judged again; a new block or unclear passes the same checks as any call.',
      quote: ["Just to make sure we don't have things approved that shouldn't be.", 'Nov 7'] }
  ],

  examples: {
    CALL: { tag: 'real', rows: [{ steps: [['A person runs setup', 'C2, Nov 7', 'code'], ['Each step is done', 'service list, cards', 'code']], end: [['Set up', '', 'keep']] }], note: 'Nov 7, this project’s C2 data. A call from Barbara is not built yet.' },
    SVC: { tag: 'real', rows: [{ steps: [['C2’s calls, emails, notes', '', 'code'], ['The service list', '32 lines: 20 sold, 12 not', 'opus']], end: [['Ready for the cards', 'the card writer reads it first', 'opus']] }], note: '4 of 4 sampled quotes were found in the recordings. It took about 506K tokens and 21 minutes.' },
    READ: { tag: 'real', rows: [{ steps: [['C2’s campaigns', '3 on, 5 paused', 'code'], ['Read each one', 'keywords, ad groups, ads, landing page', 'code']], end: [['Ready to write the cards', '', 'opus']] }], note: 'Nov 5.' },
    CARDS: { tag: 'real', rows: [{ steps: [['The service list and 8 C2 campaigns', '', 'code'], ['A card for each', 'wants, never negate', 'opus']], end: [['8 cards', 'Will approved them as drafted, Nov 5', 'keep']] }], note: 'Will, Nov 6: from now on no approval. Built Nov 7: the newest card is read.' },
    CHG: { tag: 'plan', rows: [{ steps: [['C2 adds keywords to LA + New York', 'a made change', 'next'], ['Another module notices', 'not built', 'next']], end: [['A new card for LA + New York', '', 'next']] }], note: 'Not built: a separate module (Will, Nov 7).' },
    RE: { tag: 'made', rows: [{ steps: [['knf air pump', 'ADI: kept by Opus, Nov 1', 'opus'], ['A made card line', '“this campaign does not want other makers’ pumps”', 'code']], end: [['Opus judges it again', 'a block would go to Will', 'opus']] }], note: 'Built Nov 7, and tested with this real search and a made card line. No real card change has run it yet.' },
    DONE: { tag: 'real', rows: [{ steps: [['C2', 'a service list and 8 cards', 'code'], ['Set up', 'Nov 5', 'keep']], end: [['Opus reads them on each call', '', 'opus']] }], note: 'C2 is the only client set up in this project.' }
  },

  reviewed: { self: 'c66b5d92', above: 'f9f28543', on: '2026-11-07' }
});
