// The search term module: it filters search terms whenever it is called (Will, 2026-11-06: "a module that ... can
// be reached for anytime we need search terms to be filtered"). A call names an account, a campaign or an ad group;
// a person's session calls it today, and the daily run and Barbara are the plan (Nov 8, below). Each call first asks if
// the client is set up; if not, setup starts
// after the call, and the call goes on (Will, Nov 6: "is client set up to do search term filtering? If yes, it
// continues ... And if no it goes over to setup"). Will, Nov 7: "Take clef out. I want to keep the code check that
// means we don't rejudge words." Will, Nov 7: "I also don't want to do any routing. Judge each campaign on itself and
// stop trying to think of the rest. Really the job of this module is to run one campaign at a time." A call is keep,
// block or unclear, and no judge reads another campaign. Will, Nov 7 evening: "Don't say have another AI check. That's
// dumb." He picked "1." (Google's page beside each search: the Google's page part, and DeepSeek's second opinion out),
// then "1" (Jev's checks out). "If the rule says that his words outrank everything then why are you making more work":
// the client's own words outrank the site, the card and Google's page. An Opus unclear waits for Will's review. The
// old Second opinion and Jev checks parts are in retired/2026-11-07-google-page/, never loaded.
// Will, Nov 8: "Switch it for C2 and ADI": the old search-term code in the verifiers is off for both (act search-terms
// off, verify.log 2026-11-08T04:46Z) and on for 52 clients; nothing calls this module each day yet, so only a person's
// session calls it today, and the daily run is the plan (the DAILY box). Will, Nov 8, on the negatives: "Go with 1: Turn
// on auto-send for exact negatives that pass every code check": the code checks and the list of ready negatives are
// built, the send, its daily list and its undo are not (the SEND box). Will, Nov 8: "I don't see a place in here where
// it skips over the searches that have already been judged": the skip is its own step (the JUDGED box; src/todo.rs
// open(): no verdict in the record, keyed by account, campaign and words, or an unclear with no hold past 30 days).
// Sources: the design of 2026-11-05, the backtests, the live C2 call of Nov 6, the campaign-type research of Nov 6, and
// ~/Projects/search-terms (README: "Google's page", "The second opinion is out", "Jev's checks are out"; its QUEUE), and
// ADI's run of Nov 8 (state/logs/search-terms.log.2026-11-08, state/search-terms/adi/2026-11-08/ADI/, its record).
LOGIC.flow({
  id: 'waterfall',
  title: 'The search term module', short: 'Search term module', status: 'Opus judges each search with Google’s page beside it, and Will gets the unclear ones',
  head: 'The search term module',
  chart: [
    'flowchart TB',
    'CALL(["A person\'s session calls it<br/>with an account, a campaign<br/>or an ad group"]):::code',
    'DAILY(["Not built: the daily run<br/>or Barbara calls it"]):::next',
    'subgraph MOD["Inside the module"]',
    'PICK["Pick the searches that cost<br/>money, one campaign at a time"]:::code',
    'JUDGED{"Judged before<br/>in this campaign?"}:::code',
    'READY{"Is this client<br/>set up?"}:::code',
    'SETUP["Setup: service list<br/>and cards"]:::will',
    'KW["The keyword check:<br/>a live keyword of the<br/>campaign, word for word?"]:::code',
    'PAGE["Code reads Google\'s<br/>page for the words"]:::code',
    'OPUS["Opus judges the rest,<br/>the client\'s words first"]:::opus',
    'REC["Every verdict goes<br/>in the record"]:::code',
    'SAFE["Safety checks<br/>on each negative"]:::will',
    'end',
    'OUT(["Hands back: verdicts,<br/>ready negatives, negatives<br/>that wait for Will,<br/>unclear searches and<br/>questions for Will"]):::block',
    'SEND(["Not built: the daily run<br/>sends the ready negatives,<br/>and Will gets a daily<br/>list with an undo"]):::next',
    'CALL --> PICK', 'DAILY -.-> PICK', 'PICK --> JUDGED',
    'JUDGED -- "yes: its verdict<br/>stands, no judge" --> REC', 'JUDGED -- no --> READY',
    'READY -- "yes, or no:<br/>the call goes on" --> KW', 'READY -. "no: setup starts<br/>after the call" .-> SETUP',
    'KW -- "yes: keep,<br/>no judge" --> REC', 'KW -- "no" --> PAGE',
    'PAGE --> OPUS', 'OPUS --> REC',
    'REC -- "keeps, and the<br/>unclear ones for<br/>Will\'s review" --> OUT', 'REC -- blocks --> SAFE', 'SAFE --> OUT', 'OUT -.-> SEND'
  ],
  links: { CALL: 'call', DAILY: 'call', SETUP: 'setup', PICK: 'searches', JUDGED: 'judged', READY: 'ready', KW: 'kwcheck', PAGE: 'gpage', OPUS: 'opus', REC: 'record', SAFE: 'safety', OUT: 'out', SEND: 'send' },
  leaves: { call: 'Who calls the module, and with what', searches: 'Pick the searches', judged: 'Judged before in this campaign?', ready: 'Is this client set up?', kwcheck: 'Is it a keyword of this campaign?', record: 'The record', out: 'What the module hands back', send: 'Who sends the ready negatives' },

  // Each slide belongs to one view: the module's own slides first, then one for each of its rules.
  deck: [
    { about: ['waterfall'], kicker: 'In and out',
      head: 'Who calls the module, with what, and what comes back',
      lede: 'Today a person’s session calls it, and the daily run does not call it yet. A call names an account, a campaign or an ad group. The module judges each search in it that has no verdict yet, and hands back the results.',
      visual: { type: 'flow', rows: [{ steps: [['A caller', 'a person’s session today, the daily run later', 'code'], ['What to filter', 'an account, a campaign or an ad group', 'code'], ['The module', 'judges each new search, one campaign at a time', 'opus']], end: [['A verdict for each search', 'keep, block or unclear', 'keep'], ['Ready negatives, and the ones that wait for Will', 'always on the campaign', 'block'], ['Unclear searches and questions for the client', 'Will answers or sends each one', 'will']] }] },
      vcap: 'Each campaign is judged on its own: no judge reads the other campaigns (Will, Nov 7). A call for one ad group judges only the searches of that ad group. Its negatives still go on the campaign (Will, Nov 6).',
      quote: ['this is a module that people could that like can be reached for anytime we need search terms to be filtered', 'Nov 6'] },
    { about: ['waterfall'], kicker: 'Why it exists',
      head: 'Before Nov 6, Opus judged every search with little to go on, and a second read changed about 1 call in 6',
      lede: 'Each run sent every search that cost money to Opus, with no research and no page of what searchers want.',
      visual: { type: 'dots', groups: [[25, 'wait', 'got a different call the second time'], [119, 'code', 'got the same call']] },
      vcap: 'The same prompt ran twice on 144 C2 searches.',
      stats: [['7,643', 'search verdicts by Opus in 6 days (Oct 30 to Nov 4)', 'real'], ['1%', 'of its reasons cited any research', 'real']] },
    { about: ['waterfall'], kicker: 'The idea · Will, Nov 7',
      head: 'Google’s page shows Opus what searchers want, and the client’s own words still come first',
      visual: { type: 'flow', rows: [{ steps: [['A new search', 'not a live keyword of its campaign', 'code'], ['Google’s page', 'what most people who type these words want', 'code'], ['Opus', 'the client’s words first, then the page', 'opus']], end: [['Keep, and it is done', '', 'keep'], ['Block, then the safety checks', '', 'block'], ['Unclear, and Will decides', '', 'will']] }] },
      vcap: 'Google ranks what people click and read, so its page shows what most of the people who type the words want. The client’s own words still outrank it, so the page decides only what his words do not cover. The keyword check stays, and a search that is a live keyword of its campaign gets no judge.' },
    { about: ['waterfall'], kicker: 'What changed on Nov 7',
      head: 'Two checks of Opus came out, and Opus got Google’s page and the client’s words first',
      visual: { type: 'gate', rows: [
        ['DeepSeek’s second opinion', 'out, because with the page Opus settled the searches the two had argued over', 'stop'],
        ['Jev’s checks of Opus', 'out, because Jev reads only the words, so it argued with blocks the page backs', 'stop'],
        ['Google’s page beside each search', 'in, at ${pageDollars} a page, kept {pageDays} days', 'pass'],
        ['The client’s own words', 'in, and they outrank the site, the card and the page', 'pass'],
        ['Smaller batches', 'in, {batch} searches a batch instead of 250', 'pass'],
        ['The cards', 'in, they follow the client’s places and name no other campaign', 'pass']], end: ['The code’s checks of each negative stay', 'code'] },
      vcap: 'All of it was built and merged on Nov 7 in the module’s own project. Jev’s check of each question for the client stays too.',
      quote: ["Don't say have another AI check. That's dumb.", 'Nov 7'] },
    { about: ['waterfall'], kicker: 'What changed on Nov 8',
      head: 'Will moved C2 and ADI to this module, and chose to let the clear negatives go out by themselves',
      visual: { type: 'gate', rows: [
        ['The old search-term code in the verifiers', 'off for C2 and ADI, so their searches wait for this module', 'stop'],
        ['The daily run calls this module', 'not built yet, so only a person’s session judges their searches', 'hold'],
        ['An exact negative that passes every code check goes out by itself', 'not built yet, and Will gets a daily list with an undo', 'hold'],
        ['The code checks, and the list of ready negatives', 'built', 'pass']], end: ['Until the send is built, every negative still waits for Will on a case', 'will'] },
      vcap: 'Will asked why the negatives need his check when the system has all the context, and he picked the first choice. Unclear calls, the negatives a check stops, phrase and broad negatives, and every negative of a client he holds still come to him.',
      quote: ['Go with 1: Turn on auto-send for exact negatives that pass every code check.', 'Nov 8'] },
    { about: ['waterfall'], kicker: 'Four real searches',
      head: 'Follow four real searches through the module',
      lede: 'Pick a search. Watch where it goes, and why.',
      visual: { type: 'journey', runs: [
        { name: 'music advertising agencies', out: 'keep', steps: [
          ['A new search', 'LA + New York, Nov 6. It cost money and has no verdict yet.'],
          ['Set up for filtering?', 'Yes, C2 has a service list and 8 cards.'],
          ['The keyword check', 'It is an exact keyword of LA + New York, word for word.'],
          ['Kept, with no judge', 'No judge reads it.'],
          ['The record', 'Done. A keep needs no negative.']] },
        { name: 'music press release', out: 'block', steps: [
          ['A search the campaign kept', 'National Sep 2026. Its new card of Nov 7 sent it back to Opus.'],
          ['Google’s page', 'Code read it. The page is templates, examples and guides for writing your own release.'],
          ['Opus, the client’s words first', 'C2 sells full PR campaigns, not do-it-yourself help. Block.'],
          ['The record', 'Jev held the block that evening, at 0.12. With Jev’s checks out, the block stands.'],
          ['Safety checks', 'The campaign is paused, so no negative is owed yet. When it is on again, its negative goes through the safety checks.']] },
        { name: 'music marketing campaigns', out: 'wait', steps: [
          ['A search the campaign kept', 'Los Angeles. Its new card of Nov 7 sent it back to Opus.'],
          ['Google’s page', 'Code read it. The page mostly lists famous campaigns to study.'],
          ['Opus, the client’s words first', 'The words name what C2 runs, but the searcher may want examples, not a firm. Unclear.'],
          ['The record', 'Held for Will’s review, so no negative of any kind goes out.'],
          ['Will decides', 'It is one of the 13 unclear searches of Nov 7. His answer stands.']] },
        { name: 'dawn miller pr', out: 'block', steps: [
          ['A new search', 'LA + New York, Nov 6, before Google’s page. It cost money and has no verdict yet.'],
          ['The keyword check', 'Not a keyword of the campaign.'],
          ['Opus, research first', 'Opus researched it. It is a rival’s name, not for this campaign.'],
          ['Safety checks', 'The limits, a sale, and a keyword of this campaign.'],
          ['Will kept it blocked', 'On Nov 6 every negative waited for Will on a case.']] }
      ] } },
    { about: ['waterfall'], kicker: 'Campaign types · built Nov 7',
      head: 'Filtering works the same for each campaign type, but some types need checks of their own',
      visual: { type: 'gate', rows: [
        ['Search, AI Max, DSA', 'Searches come with a keyword or a page. The module works as it is.', 'pass'],
        ['Shopping', 'Searches match the product feed. A block whose search names a feed product waits for a person.', 'hold'],
        ['Performance Max', 'Searches show for the campaign only. Past 10,000 negatives on one campaign, the rest wait for a person.', 'hold'],
        ['Display, Video, Demand Gen, App', 'No searches to judge: skipped, and no card.', 'stop'],
        ['Microsoft Ads', 'Exact and phrase negatives only. The module has no Microsoft code yet.', 'hold']] },
      vcap: 'The old search-term code in the verifiers still runs on 52 clients with Opus, and on Nov 3 it put exact negatives on Kogalla’s Performance Max campaign (case #239). Built Nov 7: on a Shopping campaign, a block whose search names a feed product waits for a person. On ADI, with its Shopping campaign on again, “ptfe” and “teflon ptfe” wait for a person: they name its All-Teflon PTFE kits.' },

    { about: ['call'], kicker: 'Who calls it today · Will, Nov 8',
      head: 'Today only a person’s session calls the module, and nothing calls it each day yet',
      visual: { type: 'gate', rows: [
        ['A person’s session', 'it calls the module today, as Will’s did for ADI on Nov 8', 'pass'],
        ['The old search-term code in the verifiers', 'the daily run still runs it for 52 clients, but it is off for C2 and ADI since Nov 8', 'stop'],
        ['The daily run calls this module', 'not built yet', 'hold'],
        ['Or Barbara gets a tool that reads Google’s page', 'not built yet, and the verifiers would read the page through it', 'hold']], end: ['Until one of the two is built, nothing judges C2’s and ADI’s new searches each day', 'will'] },
      vcap: 'Will turned the old code off for C2 and ADI so that this module judges their searches. But the verifiers may not call an outside service with their own key, and this module buys Google’s page from DataForSEO with ours. So the daily run must either call this module, or read the page through a Barbara tool.',
      quote: ['Switch it for C2 and ADI', 'Nov 8'] },
    { about: ['call'], kicker: 'Who calls, with what',
      head: 'A call names an account, a campaign or an ad group, and the module judges only what is in it',
      visual: { type: 'flow', rows: [
        { title: 'An account', steps: [['A person’s session', 'Nov 6: Will, “Run just the search terms”', 'code'], ['Every campaign in it', 'one at a time', 'opus']], end: [['Negatives on each campaign', '', 'block']] },
        { title: 'A campaign', steps: [['A person’s session', 'built Nov 7', 'code'], ['Only that campaign', '', 'opus']], end: [['Negatives on that campaign', '', 'block']] },
        { title: 'An ad group', steps: [['A person’s session', 'built Nov 7', 'code'], ['Only the searches of that ad group', '', 'opus']], end: [['Negatives on its campaign', 'never on the ad group', 'block']] }] },
      vcap: 'Built Nov 7 in the new project: a person can call one campaign or one ad group. On C2’s data of Nov 6, a call for the ad group Music Marketing - Core picks 101 of the account’s 261 searches, and all 9 of its negatives go on LA + New York. A call from Barbara is not built yet.',
      quote: ["It's gonna go on the campaign.", 'Nov 6'] },
    { about: ['call'], kicker: 'A narrower call · built Nov 7',
      head: 'A narrower call picks fewer searches, but its checks still read the whole account',
      visual: { type: 'gate', rows: [
        ['The searches', 'only those that showed in the campaign or ad group', 'pass'],
        ['The live negatives it judges', 'each one that acts on its searches: the campaign’s, its lists’ and the ad group’s own', 'pass'],
        ['The safety checks and the two questions', 'the whole account, as for an account call', 'hold'],
        ['The daily limit of live negatives', 'one limit for the whole account', 'hold'],
        ['A wrong live negative', 'it comes out of every place it lives, also outside the call', 'hold']], end: ['Negatives on the campaign', 'block'] },
      vcap: 'Claude’s calls, built Nov 7: a wrong campaign negative also blocks good searches in the ad group; one limit caps a day’s work on the account; a term on a shared list cannot leave only one campaign. An account call prints the same as before.' },
    { about: ['searches'], kicker: 'Pick the searches',
      head: 'A call picks the searches that cost money in the last 90 days, and the costliest go first',
      visual: { type: 'flow', rows: [{ title: 'ADI, Nov 8', steps: [['The account’s searches', 'in the last 90 days', 'code'], ['935 of them cost money', 'on campaigns that are on', 'code']], end: [['Each one goes on, one campaign at a time', '', 'opus'], ['9 of a paused campaign wait apart', 'a negative there blocks nothing', 'wait']] }] },
      vcap: 'The costliest go first, so the money is judged first, but no judge sees what a search cost. A paused campaign’s searches come back on the day it is on again. A call for one campaign or one ad group picks only the searches in it.' },
    { about: ['judged'], kicker: 'Judged before?',
      head: 'A search that already has a verdict in its campaign keeps it, so no judge reads it again',
      visual: { type: 'bars', max: 935, rows: [
        { label: 'ADI’s searches that cost money in the last 90 days', parts: [[935, 'code', '935']] },
        { label: 'Judged before in their campaign, so skipped', parts: [[866, 'keep', '866']] },
        { label: 'New in their campaign, so they went on. The keyword check kept 4, and Opus judged 65.', parts: [[69, 'opus', '69']] }] },
      vcap: 'ADI, Nov 8. The record keeps each verdict under its account, its campaign and its words, so the same words in another campaign get a verdict of their own. “versa matic” cost money in 5 of ADI’s campaigns. Four of them had a verdict from Nov 1, so Opus judged it only on the French campaign, and blocked it there too.',
      quote: ["if you checked all the months search terms don't do that again. Just the new ones.", 'Oct 30'] },
    { about: ['judged'], kicker: 'When a search is judged again',
      head: 'A verdict stands, but a new or changed card sends its campaign’s keeps back to Opus',
      visual: { type: 'gate', rows: [
        ['A campaign’s card is new or changed', 'every search that campaign kept goes back to Opus, with the new card', 'wait'],
        ['A keep of the keyword check', 'never judged again, even with a new card', 'pass'],
        ['Will’s own answer, or a keep the client’s answer gave', 'never judged again, even with a new card', 'pass'],
        ['An unclear call that waits for Will', 'no run judges it again until Will answers', 'hold'],
        ['An unclear call from before Nov 7', 'it has no hold, so a run judges it again once it is more than {unclearDays} days old', 'wait']], end: ['Every other verdict stands', 'keep'] },
      vcap: 'On Nov 8 a changed card sent 7 kept searches of ADI’s NA US EN AI Max campaign back to Opus. 4 stayed keeps, 1 became a block and 2 came back unclear. On Nov 7, C2’s 5 new cards sent back 230. ADI still has 29 unclear calls of Nov 1 with no hold, and C2 has 71 from before Nov 7.',
      quote: ['it would need to search the approved ones yes? Not the other ones.', 'Nov 7'] },
    { about: ['ready'], kicker: 'Set up?',
      head: 'Each call asks if setup is done, and a no never stops the call',
      visual: { type: 'flow', rows: [
        { title: 'Set up', steps: [['A call for C2', 'a service list and 8 cards', 'code'], ['Set up? Yes', '', 'code']], end: [['Opus reads the newest list and cards', '', 'opus']] },
        { title: 'Not set up yet', steps: [['A call for a new client', '', 'code'], ['Set up? No', '', 'code']], end: [['Opus judges all, as before', '', 'opus'], ['Setup starts after the call', 'in the background; nothing runs all the time', 'code']] }] },
      vcap: 'Setup runs outside the call, so the call never waits for it: todo ends with “run search-terms setup <client> in the background”. Built Nov 7.' },
    { about: ['ready'], kicker: 'Who is set up',
      head: 'Setup is done for 2 clients, C2 and ADI',
      visual: { type: 'dots', groups: [[2, 'keep', 'set up: C2 and ADI'], [52, 'code', 'not set up yet: Opus judges all, as before']] },
      vcap: 'ADI’s service list and 20 cards came into this project on Nov 8, when Will moved it here. For each other client, setup starts after a call finds it not set up.' },
    { about: ['kwcheck'], kicker: 'First, a code check · built Nov 6',
      head: 'A search that is one of the campaign’s keywords is kept, and no judge reads it',
      visual: { type: 'flow', rows: [{ steps: [['A search', 'new, cost money', 'code'], ['Is it a keyword of this campaign?', 'word for word', 'code']], end: [['Yes: keep, no judge', '', 'keep'], ['No: on to Opus', '', 'opus']] }] },
      vcap: 'On C2’s 763 judged searches, the check keeps 37, with 0 wrong negatives. “Word for word” means the same words, in any case: Claude’s call. Will, Nov 7: keep this check. Built Nov 7: it runs for every client.',
      quote: ['I think we need to have a code check that starts off at the beginning that says, is it the keyword?', 'Nov 6'] },
    { about: ['kwcheck'], kicker: 'ADI · Nov 7',
      head: 'On ADI, the keyword check kept 10 searches that Opus had negated',
      visual: { type: 'flow', rows: [
        { title: 'A pump ADI does not make', steps: [['ammonia transfer pump', 'an exact keyword of NA US EN', 'code'], ['The keyword check', 'keep, with no judge', 'keep']], end: [['Opus, Nov 1: block', 'a liquid transfer pump ADI does not make', 'block']] },
        { title: 'A brand word in a non-brand campaign', steps: [['dia vac pumps', 'a keyword of EUR EU EN', 'code'], ['The keyword check', 'keep, with no judge', 'keep']], end: [['Opus, Nov 1: not for this campaign', 'a brand search; an old route counts as a block', 'block']] }] },
      vcap: 'The other 8: three more pumps for liquids, two Korean pump searches, and ADI’s own names in three more campaigns. A keyword’s search never gets a negative by itself: the negatives step makes it wait (“pause the keyword instead”). But with the check, Opus no longer sees these searches. ADI’s answer to its client question on pumps for liquids also tells if those pump keywords should stay.' },
    { about: ['record'], kicker: 'The record',
      head: 'Each verdict says who decided and why, so a run knows what was judged before',
      visual: { type: 'card', title: 'One line of the record (from the Nov 6 call)', fields: [['Search', 'pritanmg com'], ['Campaign', 'LA + New York'], ['Verdict', 'block'], ['By', 'Opus'], ['Why', 'one plain sentence about the words, never cost or clicks'], ['Day', 'Nov 6']], stamp: ['A verdict stands. An unclear waits for Will, and his answer stands.', 'code'] },
      vcap: 'Opus’s verdicts and Will’s answers go in the same record, each marked with who decided. An Opus unclear goes in held for Will’s review, so no negative of any kind goes out for it until he answers. An old route in the record counts as a block for its own campaign. Old lines stay as written, but a hold that only Jev made no longer counts, so C2’s 16 blocks of Nov 7 that Jev held now stand.' },
    { about: ['out'], kicker: 'What comes back',
      head: 'The module hands back four things, and changes nothing in the account by itself',
      visual: { type: 'flow', rows: [{ title: 'ADI, Nov 8', steps: [['A call for the whole account', 'Will’s session', 'code']], end: [['72 new verdicts', '19 keeps, 46 blocks and 7 unclear', 'keep'], ['Ready negatives', '4, in a change file and Chad’s input', 'block'], ['Negatives that wait', '2 that bought, and 23 for the client’s own words', 'will'], ['Unclear searches and questions for the client', 'Will answers or sends each one', 'will']] }] },
      vcap: 'The module cannot change the account, because a program cannot write through Barbara, so a session sends what it hands back. The other 17 blocks need no new negative, because a live negative already blocks each one. Will holds ADI, so nothing went out.' },
    { about: ['send'], kicker: 'Who sends · Will, Nov 8',
      head: 'A session will send the ready negatives, because the module itself cannot write to the account',
      visual: { type: 'flow', rows: [
        { title: 'Built today', steps: [['The module', 'checks each negative', 'code'], ['A change file and Chad’s input', 'each ready negative, exact, on its campaign', 'code']], end: [['They wait for Will on a case', '', 'will']] },
        { title: 'Not built yet', steps: [['The daily run', 'a session with Barbara’s change tool', 'next'], ['It sends the ready ones', 'after the change check', 'next']], end: [['Live', '', 'block'], ['Will’s daily list', 'each one that went out, with an undo', 'next']] }] },
      vcap: 'Barbara’s route for programs only reads, so the module cannot make a change itself. A session with Barbara’s change tool can, and that will be the daily run, once it calls this module. Barbara still holds every change on a client Will holds, until he approves its case.' },
    { about: ['send'], kicker: 'A real list · ADI, Nov 8',
      head: 'On Nov 8 the list of ready negatives held 4 for ADI, all of them competitors’ names',
      visual: { type: 'card', title: 'ADI’s change file, Nov 8', fields: [
        ['knf neuberger vacuum', 'an exact negative on NA CA EN'],
        ['varian diaphragm pump', 'an exact negative on NA US EN'],
        ['knf nmp830', 'an exact negative on SA + ES'],
        ['knf vakuumpumpe', 'an exact negative on EUR DE+CH DE']], stamp: ['Chad’s input holds the same 4', 'code'] },
      vcap: 'KNF and Varian are competitors of ADI. Will holds ADI, so none of the 4 went out. On a client he does not hold, the daily run will send a list like this one by itself.' }
  ],

  examples: {
    CALL: { tag: 'real', rows: [{ steps: [['Will asks', '“Run just the search terms”', 'will'], ['The module runs for C2', 'Nov 6, 1:19 PM', 'code']], end: [['8 new searches judged', '', 'opus']] }], note: 'That call named the whole C2 account. A call can also name one campaign or one ad group: then only the searches in it are judged, and the negatives still go on the campaign.' },
    DAILY: { tag: 'plan', rows: [{ steps: [['The daily run, each morning', 'not built', 'next'], ['It calls the module for ADI', 'the whole account', 'next']], end: [['ADI’s new searches judged that day', '', 'opus']] }], note: 'Not built yet. Since Nov 8 the old code in the verifiers is off for C2 and ADI, so only a person’s session judges their searches.' },
    SETUP: { tag: 'real', rows: [{ steps: [['C2’s calls, emails and notes', '', 'will'], ['A service list and 8 cards', 'Nov 5', 'will']], end: [['Set up', '', 'keep']] }], note: 'C2 and ADI are the clients with setup done in this project. Built Nov 7: setup starts by itself after a call finds a client not set up.' },
    PICK: { tag: 'real', rows: [{ steps: [['ADI, Nov 8', 'the whole account', 'code'], ['Pick the searches that cost money', '935 in the last 90 days', 'code']], end: [['Each one goes on', 'one campaign at a time', 'opus']] }], note: 'The 9 searches of ADI’s one paused campaign wait apart, because a negative there blocks nothing.' },
    JUDGED: { tag: 'real', rows: [
      { title: 'Judged before', steps: [['versa matic', 'SA BR PT, a block of Nov 1', 'block'], ['Judged before in this campaign?', 'yes', 'code']], end: [['Its verdict stands', 'no judge', 'keep']] },
      { title: 'New in this campaign', steps: [['versa matic', 'EUR EU FR, no verdict yet', 'code'], ['Judged before in this campaign?', 'no', 'code']], end: [['Opus judged it', 'a block, Nov 8', 'block']] }], note: 'ADI, Nov 8. The same words cost money in 5 of its campaigns, and 4 of them had a verdict from Nov 1.' },
    READY: { tag: 'real', rows: [{ steps: [['C2, Nov 6, 1:19 PM', 'a service list and 8 cards', 'will'], ['Set up for filtering?', 'yes', 'code']], end: [['The keyword check, then Opus with the cards', '', 'opus']] }], note: 'With a no, Opus judges all, as before, and setup starts after the call. Every client but C2 and ADI gets a no today.' },
    KW: { tag: 'real', rows: [{ steps: [['music advertising agencies', 'an exact keyword of LA + New York', 'code'], ['Is it a keyword of this campaign?', 'yes, word for word', 'code']], end: [['keep, no judge', '', 'keep']] }], note: 'C2, the replay of the Nov 6 call. Opus had kept it too.' },
    PAGE: { tag: 'real', rows: [{ steps: [['music press release', 'not a keyword of National Sep 2026', 'code'], ['Code reads Google’s page', '${pageDollars}, kept {pageDays} days', 'code']], end: [['Beside the search for Opus', 'templates, examples and guides to write your own', 'opus']] }], note: 'C2, Nov 7: each of the 230 searches that the 5 new cards sent back to Opus went with its page. Their 173 different words cost $0.35.' },
    OPUS: { tag: 'real', rows: [{ steps: [['music press release', 'with Google’s page beside it', 'code'], ['Opus, the client’s words first', 'C2 sells full PR campaigns', 'opus']], end: [['Block', 'the page shows people who write their own', 'block']] }], note: 'C2, Nov 7, on National Sep 2026, after its new card.' },
    REC: { tag: 'real', rows: [{ steps: [['creative music agency', 'Opus: keep', 'opus'], ['The record', 'marked as Opus’s', 'code']], end: [['Done', 'a keep needs no negative', 'keep']] }], note: 'After the Nov 6 call, all 261 C2 searches had a verdict.' },
    SAFE: { tag: 'real', rows: [{ steps: [['knf nmp830', 'a block on SA + ES, ADI, Nov 8', 'block'], ['The safety checks', 'no sale, no keyword, within Google’s limits', 'will']], end: [['Ready, but Will holds ADI', 'so it waits for him', 'will']] }], note: 'ADI, Nov 8. Once the send is built, a negative like this one goes out by itself on a client Will does not hold.' },
    OUT: { tag: 'real', rows: [
      { title: 'Negatives', steps: [['46 blocks', 'ADI, Nov 8', 'block'], ['The safety checks', '4 ready, 25 wait, 17 blocked already', 'will']], end: [['A change file with the 4', 'and Chad’s input', 'block']] },
      { title: 'Unclear searches', steps: [['7 unclear searches', 'ADI, Nov 8', 'opus'], ['Will’s review list', 'no negative while they wait', 'will']], end: [['Will’s answer stands', '', 'will']] }], note: 'Of the 25 that wait, 2 bought in the 90 days and 23 wait for ADI’s own words. Nothing went out, because Will holds ADI.' },
    SEND: { tag: 'plan', rows: [{ steps: [['The ready negatives', 'a change file and Chad’s input', 'block'], ['The daily run sends them', 'with Barbara’s change tool', 'next']], end: [['Live, and on Will’s daily list with an undo', '', 'next']] }], note: 'Not built yet. ADI’s 4 ready negatives of Nov 8 would wait anyway, because Will holds ADI.' }
  },

  reviewed: { self: 'cf875a54', above: '2525099a', on: '2026-11-08' }
});
