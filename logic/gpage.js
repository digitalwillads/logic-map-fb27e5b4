// Google's page for each search (Will, 2026-11-07, after "Search term filtering keeps getting things wrong ... Is it
// actually reading the websites?": he picked "1."). The judge read only the search's words and the site's address, so it
// knew nothing about what the people who type those words want. Google ranks what they click and read, so its results
// page shows what most of them want. For each search that goes to Opus, code reads the page from DataForSEO (our own
// key), keeps it 30 days for every client, pays from the balance, and puts a short summary beside the search. A search
// with no page waits for the next run. Built and merged on Nov 7 in ~/Projects/search-terms (src/google_page.rs, the
// README's "Google's page"). The numbers: the test folder ~/Projects/search-terms-runs/serp-test-2026-11-07/ (runs/,
// serp/, google.jsonl, truth.jsonl) and the log of Nov 7 (state/logs/search-terms.log.2026-11-08: C2's 5 new cards, 230
// searches, 173 pages bought for $0.346, the balance $0.836 before and $0.494 after).
LOGIC.flow({
  id: 'gpage', parent: 'waterfall',
  title: 'Google’s page for each search', short: 'Google’s page',
  head: 'Code reads Google’s page for each search, so Opus sees what most people who type those words want',
  chart: [
    'flowchart TB',
    'IN(["A search that<br/>goes to Opus"]):::code',
    'KEPT{"Was its page read<br/>in the last {pageDays} days?"}:::code',
    'BAL{"Does the balance<br/>pay for a page?"}:::code',
    'BUY["Buy the page from<br/>DataForSEO for ${pageDollars}"]:::code',
    'GOT{"Did a page<br/>come back?"}:::code',
    'SUM["Write a short summary,<br/>and keep it {pageDays} days"]:::code',
    'NONE(["No page yet, so the<br/>search waits for<br/>the next run"]):::code',
    'OPUS(["The summary goes<br/>beside the search<br/>in Opus\'s batch"]):::opus',
    'IN --> KEPT', 'KEPT -- "yes: read it<br/>for free" --> OPUS', 'KEPT -- no --> BAL',
    'BAL -- yes --> BUY', 'BAL -- no --> NONE', 'BUY --> GOT',
    'GOT -- yes --> SUM', 'GOT -- "no, after<br/>3 tries" --> NONE', 'SUM --> OPUS'
  ],
  links: { KEPT: 'gkept', BAL: 'gmoney', BUY: 'gwhich', SUM: 'gsum', NONE: 'gnopage' },
  leaves: { gkept: 'The kept pages', gmoney: 'The balance', gwhich: 'Which Google page', gsum: 'What the summary holds', gnopage: 'A search with no page' },

  // Each slide belongs to one view: the part's own slides first, then one or more for each of its rules.
  deck: [
    { about: ['gpage'], kicker: 'The idea · Will, Nov 7',
      head: 'Google ranks what people click and read, so its page shows what most people who type the words want',
      visual: { type: 'flow', rows: [
        { title: 'Before Nov 7', steps: [['music press release', 'the words, and the client’s site address', 'code'], ['Opus guesses', 'C2 does sell press releases', 'opus']], end: [['Keep once, unclear once', 'two reads of the same search', 'code']] },
        { title: 'With Google’s page', steps: [['music press release', 'and its page beside it', 'code'], ['8 of the page’s 9 results', 'how-to guides, templates and examples', 'code']], end: [['Block, both times', 'the searcher writes his own', 'block']] }] },
      vcap: 'Will asked if the judge was reading the websites. It read only the site’s address. Now code reads Google’s results page for each search that goes to Opus, and puts a short summary of it beside the search. The two reads of each kind come from the test of Nov 7, on C2’s LA + New York campaign.',
      quote: ['Search term filtering keeps getting things wrong ... Is it actually reading the websites?', 'Nov 7'] },
    { about: ['gpage'], kicker: 'The test · Nov 7',
      head: 'With the page, the same judge gave the same call twice on 61 of 68 searches, up from 49',
      visual: { type: 'bars', max: 68, rows: [
        { label: 'The same call twice, without the page', parts: [[49, 'code', '49 of 68']] },
        { label: 'The same call twice, with the page', parts: [[61, 'opus', '61 of 68']] },
        { label: 'Settled without the page (the same keep or block twice)', parts: [[30, 'code', '30 of 68']] },
        { label: 'Settled with the page', parts: [[58, 'opus', '58 of 68']] }] },
      vcap: 'The 68 were C2’s searches where Opus and DeepSeek had disagreed, with 61 different words. The same Opus judge read each one twice without Google’s page and twice with it, and it never saw the old calls. The 61 pages cost $0.122 in all.' },
    { about: ['gpage'], kicker: 'Whose call held · Nov 7',
      head: 'Of the 58 searches the page settled, 44 went the way Opus first called them, and only 9 went DeepSeek’s way',
      visual: { type: 'dots', groups: [[44, 'opus', 'as Opus first called them'], [9, 'deep', 'as DeepSeek called them'], [5, 'code', 'neither']] },
      vcap: 'So most of DeepSeek’s disagreements were false alarms. Will picked the page on Nov 7, and DeepSeek’s second opinion came out of the module.' },

    { about: ['gkept'], kicker: 'The kept pages',
      head: 'A page read in the last {pageDays} days is read again for free, for every client',
      visual: { type: 'flow', rows: [{ title: 'C2’s 5 new cards, Nov 7', steps: [['230 searches went back to Opus', 'on 5 campaigns', 'code'], ['173 different words', '173 pages bought for $0.35', 'code'], ['The other 57', 'the same words on another campaign, read from the kept pages', 'keep']], end: [['A later step that evening read all 230 from the kept pages', 'and bought none', 'keep']] }] },
      vcap: 'One store serves every client, because the same words in the same country give the same page. Each kept page holds its words, its country, the day it was read and its summary. A page older than {pageDays} days is bought again.' },
    { about: ['gmoney'], kicker: 'The balance',
      head: 'Before it buys pages, code reads the balance, and it buys no more than the balance pays',
      visual: { type: 'bars', max: 0.84, rows: [
        { label: 'The balance before C2’s 5 new cards, Nov 7', parts: [[0.84, 'code', '$0.84']] },
        { label: 'The balance after their 173 pages', parts: [[0.49, 'code', '$0.49']] }] },
      vcap: 'Each page costs ${pageDollars}, so $0.49 buys about 247 more pages. A run buys at most {pageRun}, and the searches that cost the most money go first. A search it cannot pay for waits for the next run, so no search is judged without its page. The pages come from our own DataForSEO account.' },
    { about: ['gwhich'], kicker: 'Which Google page',
      head: 'Code asks for the page an American sees, in English, unless the campaign targets one other country',
      visual: { type: 'gate', rows: [
        ['The country', 'the United States, unless every place the campaign targets is in one other country', 'pass'],
        ['The language', 'English, always', 'hold'],
        ['The device', 'a desktop', 'pass'],
        ['The results', 'the top 10', 'pass']], end: ['One page for the search’s words', 'code'] },
      vcap: 'The code takes one shortcut here, so ADI’s French, German, Korean, Portuguese and Spanish campaigns read Google in English. The code knows the 58 countries of C2’s and ADI’s accounts. A campaign in any other country reads the American page, and the log warns.' },
    { about: ['gsum'], kicker: 'What the summary holds',
      head: 'The summary keeps six things from the page, each cut short, so {batch} searches fit in one batch',
      visual: { type: 'card', title: 'The summary of one page', fields: [
        ['Top results', 'the first 10, each with its site, its title and the first 160 characters of its text'],
        ['Google’s AI summary', 'the first 450 characters, when the page has one'],
        ['Related searches', 'the first 8'],
        ['People also ask', 'the first 4 questions'],
        ['Local businesses', 'the first 4 on the map'],
        ['Forum threads', 'the first 3']], stamp: ['The same summary the judge read in the test', 'code'] },
      vcap: 'The code gives the very summary the judge read in the test, on all 61 of its pages. A forum thread or a video with no web address of its own shows as “forum or video”.' },
    { about: ['gsum'], kicker: 'A real page · Nov 7',
      head: 'For “music promoters dallas”, the page shows people who want shows, not a marketing firm',
      visual: { type: 'card', title: 'The summary of “music promoters dallas”', fields: [
        ['Top results', 'The Bomb Factory, a Dallas venue · Eventbrite’s concerts in Dallas · the Better Business Bureau’s concert promoters · a list of music marketing agencies in Dallas'],
        ['Local businesses', 'The Bomb Factory, Dada Dallas and Trees, all three of them venues'],
        ['Forum threads', '“How to connect with promoters and bands for shows in Dallas/Ft. Worth?”'],
        ['Google’s AI summary', 'none on this page']], stamp: ['Most of these searchers want gigs or concerts', 'opus'] },
      vcap: 'With the page alone, the judge blocked it on one read and called it unclear on the other. C2’s own words settle it, because Dallas is not one of the cities Waylon named.' },
    { about: ['gnopage'], kicker: 'No page',
      head: 'A search with no page goes to no judge, and the next run tries again',
      visual: { type: 'flow', rows: [{ steps: [['No key, no money, or an error after 3 tries', '', 'code'], ['No page', 'the search goes in no batch', 'code']], end: [['It does not count against the day’s limit', '', 'code'], ['The next run reads it again', '', 'opus']] }] },
      vcap: 'So no search is judged without its page. In the test, 1 of 62 calls answered “Internal SE Server Error”, and the next try worked. A new card waits the same way, because it is not kept while a search its campaign kept has no page. The same command again buys only the pages that are missing.' }
  ],

  examples: {
    IN: { tag: 'real', rows: [{ steps: [['music press release', 'National Sep 2026, Nov 7', 'code'], ['It goes to Opus', 'the campaign’s new card sent it back', 'code']], end: [['Its page comes first', '', 'code']] }], note: 'C2, Nov 7: the 5 new cards sent 230 kept searches back to Opus, each with its page.' },
    KEPT: { tag: 'real', rows: [{ steps: [['pay for radio play', 'C2, a second call the same day', 'code'], ['Was its page read in the last {pageDays} days?', 'yes, by the first call', 'code']], end: [['Read from the kept pages, for free', '', 'keep']] }], note: 'Nov 7, on a scratch copy of C2’s data: the second call read all 7 of its kept pages and bought none.' },
    BAL: { tag: 'real', rows: [{ steps: [['The balance', '$0.84, Nov 7', 'code'], ['Does it pay for 68 pages?', 'yes, they cost $0.136', 'code']], end: [['Buy the 68', '', 'code']] }], note: 'C2’s first new card, Nov 7. Code read the balance again before the pages of each of the next four cards.' },
    BUY: { tag: 'real', rows: [{ steps: [['pay for radio play', 'C2', 'code'], ['DataForSEO', 'the American page in English, the top 10', 'code']], end: [['A page came back', '11 items, $0.002, in 3.1 seconds', 'keep']] }], note: 'The first real call, Nov 7, on a scratch copy of C2’s data.' },
    GOT: { tag: 'real', rows: [{ steps: [['One page of the test', '“Internal SE Server Error”', 'code'], ['Did a page come back?', 'no, so code tries again', 'code']], end: [['The next try worked', '', 'keep']] }], note: 'The test of Nov 7: 1 of 62 calls failed once. Code tries 3 times before a search waits.' },
    SUM: { tag: 'real', rows: [{ steps: [['music press release', 'Google’s page', 'code'], ['The summary', '9 results, the AI summary and 8 related searches', 'code']], end: [['Kept {pageDays} days', 'and put beside the search', 'opus']] }], note: 'One of the 61 pages of the test. It is now one of the code’s test pages.' },
    NONE: { tag: 'made', rows: [{ steps: [['A search, and the balance is empty', '', 'code'], ['No page', 'no batch', 'code']], end: [['The next run reads it again', '', 'opus']] }], note: 'Made: no real run has run out of money yet. Built Nov 7, and tested with a stand-in for DataForSEO.' },
    OPUS: { tag: 'real', rows: [{ steps: [['music press release', 'with its summary', 'code'], ['Opus reads it', 'templates and guides to write your own release', 'opus']], end: [['Block', 'National Sep 2026, Nov 7', 'block']] }], note: 'C2, Nov 7. Opus’s reason names the page, and C2 sells full PR campaigns, not do-it-yourself help.' }
  },

  reviewed: { self: 'f1f00049', above: 'cce35754', on: '2026-11-08' }
});
