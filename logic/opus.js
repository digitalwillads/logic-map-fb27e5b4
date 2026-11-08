// Opus judges, research first: what Opus does with each new search the keyword check does not keep. Will, Nov 7:
// "Take clef out", so Opus judges every such search. Then "1." (Google's page beside each search, in batches of 50),
// and "1" (Jev's checks out: an Opus unclear waits for Will's review, every other call stands). Will, Nov 7: "If the
// rule says that his words outrank everything then why are you making more work": the client's own words outrank the
// site, the campaign's card and Google's page; the page decides what his words do not cover. Sources: ~/Projects/
// search-terms (src/context.rs, the judge's text; src/held.rs; src/facts.rs; the README's "Google's page" and "Jev's
// checks are out"), the test folder ~/Projects/search-terms-runs/serp-test-2026-11-07/ (runs base-a/b, serp-a/b,
// fix-a/b: the last two with Will's rule), and C2's record of Nov 7.
LOGIC.flow({
  id: 'opus', parent: 'waterfall',
  title: 'Opus judges, research first', short: 'Opus',
  head: 'Opus judges each search with Google’s page beside it, and the client’s own words come first',
  chart: [
    'flowchart TB',
    'IN["A batch of new searches<br/>of one campaign, each<br/>with Google\'s page"]:::code',
    'U{"Unknown word?<br/>Opus decides"}:::code',
    'R1["The client\'s own words:<br/>calls, emails, notes"]:::opus',
    'R2["Their site"]:::opus',
    'R3["The web"]:::opus',
    'FA["Save each finding<br/>as a fact"]:::opus',
    'CW{"Do the client\'s own<br/>words settle it?"}:::opus',
    'GP["Google\'s page decides<br/>what his words<br/>do not cover"]:::opus',
    'V(["Verdict: keep,<br/>block or unclear"]):::opus',
    'HELD(["An unclear waits<br/>for Will\'s review"]):::will',
    'IN --> U', 'U -- yes --> R1 --> R2 --> R3 --> FA --> CW', 'U -- no --> CW',
    'CW -- "yes: his<br/>words decide" --> V', 'CW -- no --> GP --> V', 'V -- unclear --> HELD'
  ],
  links: { IN: 'batches', R1: 'research', R2: 'research', R3: 'research', FA: 'facts', CW: 'clientfirst', GP: 'pagedecides', V: 'judgerules', HELD: 'unclear' },
  leaves: { batches: 'Batches of {batch}', research: 'Research order', facts: 'Facts', clientfirst: 'The client’s words come first', pagedecides: 'What Google’s page decides', judgerules: 'How Opus judges', unclear: 'An unclear goes to Will' },

  deck: [
    { about: ['opus'], kicker: 'What Opus gets',
      head: 'Opus judges every new search that the keyword check does not keep, and no second judge checks its call',
      visual: { type: 'gate', rows: [['A live keyword of its campaign, word for word', 'kept with no judge', 'pass'], ['Judged before', 'not judged again unless a new card sends a keep back, and an unclear waits for Will', 'pass'], ['Every other new search that cost money', 'Opus judges it, with Google’s page beside it', 'wait']], end: ['Opus’s keep or block stands, and code checks each negative', 'opus'] },
      vcap: 'Will, Nov 7: no cheaper judge settles searches before Opus, and no other AI checks Opus after. Code still checks each negative before it goes out.' },
    { about: ['opus'], kicker: 'The research test · Nov 5',
      head: '6 hard searches: 5 keeps, 1 unclear, 0 blocks',
      visual: { type: 'dots', groups: [[5, 'keep', 'keep'], [1, 'code', 'unclear'], [0, 'block', 'block']] },
      vcap: '29 facts saved with quotes. 32 minutes and about 210K tokens. A saved fact makes the next lookup free.',
      table: { head: ['Search or theme', 'What research found', 'Call'], rows: [
        ['independent radio promoters', 'Radio: Waylon on the Sep 9 and Sep 17 calls', 'keep'],
        ['advertise / marketing your music', 'From the Oct 7 call', 'keep'],
        ['TikTok agency', 'From the Jul 1 call', 'keep'],
        ['music promoters', 'From the Jul 1 call', 'keep'],
        ['apple music advertising campaign', 'Nothing clear', 'unclear']], note: 'C2, a blind judge with Barbara’s meeting, email and notes search.' } },

    { about: ['batches'], kicker: 'Batches · built Nov 7',
      head: 'Opus now reads {batch} searches at a time, because each one carries its page',
      visual: { type: 'bars', max: 250, rows: [
        { label: 'Searches in one batch before Nov 7', parts: [[250, 'code', '250']] },
        { label: 'Searches in one batch now, each with its page', parts: [['{batch}', 'opus', '{batch}']] },
        { label: 'Live negatives in one batch, which carry no page', parts: [['{negBatch}', 'code', '{negBatch}']] }] },
      vcap: 'A batch holds one campaign, and Opus reads that campaign alone. The test of Nov 7 read 68 searches with their pages in one batch, and it went well. KDX’s 82 searches now make 2 batches.' },
    { about: ['research'], kicker: 'Research first',
      head: 'Research starts with what the client said',
      lede: 'A rerun blocked “independent radio promoters” without research. C2 does radio. The proof was in their own calls.',
      visual: { type: 'journey', runs: [
        { name: 'independent radio promoters', out: 'keep', steps: [
          ['A new search', 'Not a keyword of its campaign. Does C2 do radio?'],
          ['1. The client’s own words', 'Calls, emails and notes. Found: Waylon on the Sep 9 and Sep 17 calls. C2 does radio.'],
          ['2. Their site', 'Next in the order.'],
          ['3. The web', 'The last place to look.'],
          ['Save a fact', 'With the source and the exact words.'],
          ['Verdict', 'Keep.']] }] },
      vcap: 'Built Nov 6 in the new project: the record refuses a verdict on an unknown word with no research note that says where Opus looked. Not live yet.',
      quote: ['Can we just have the model go through and find out dynamically from what the clients say? Thats why they are doing research no?', 'Nov 5'] },
    { about: ['facts'], kicker: 'Facts',
      head: 'Each finding becomes a fact, with its proof',
      visual: { type: 'card', title: 'One fact (its shape)', fields: [['Word', 'radio'], ['Fact', 'C2 does radio promotion.'], ['Source', 'Waylon, calls of Sep 9 and Sep 17'], ['Exact words', 'the words from the call'], ['Day', 'Nov 5']], stamp: ['Code checks each field, and a fact from Google’s page is not saved', 'code'] },
      vcap: 'Facts are trusted for now, with no buying-search check. Since Nov 7 only code checks a fact, to see that each field is there and within its limit. A fact whose source is Google’s page is not saved, because the page is kept {pageDays} days and every judge reads it beside its search. On C2, 15 of the 46 facts of Nov 7 came from Google’s page, so the judge no longer reads them.',
      quote: ['2 for now. We will continue to iterate', 'Nov 4'] },
    { about: ['clientfirst'], kicker: 'Will’s rule · Nov 7',
      head: 'The client’s own words outrank everything else, Google’s page included',
      visual: { type: 'flow', rows: [
        { title: 'His words say it is wanted', steps: [['music promoters chicago', 'National', 'code'], ['Waylon, Jul 1', '“actually relevant yeah band promoters because we do promote”', 'will'], ['Waylon, Sep 16', '“austin nashville and chicago would be the only cities that i would”', 'will']], end: [['Keep', 'his words decide, whatever the page shows', 'keep']] },
        { title: 'He named the places he wants', steps: [['music promoters dallas', 'National', 'code'], ['Dallas is not one of his cities', '', 'will']], end: [['Block', 'a search that names another place is not wanted', 'block']] }] },
      vcap: 'Google’s page for both mixes club and concert promoters with a few marketing firms, so the page alone could not settle them. In the test with Will’s rule, both reads kept Chicago. One read blocked Dallas and one kept it, because the campaign’s ads reach Dallas. The judge’s text now says so plainly: when the client names the places he wants, a search that names another place is not wanted.',
      quote: ['If the rule says that his words outrank everything then why are you making more work', 'Nov 7'] },
    { about: ['clientfirst'], kicker: 'The judge’s text · built Nov 7',
      head: 'The rule Opus reads before every batch',
      visual: { type: 'card', title: 'What the judge’s text says', fields: [
        ['First', 'What the client said outranks everything else, the site, the campaign’s card and Google’s page.'],
        ['Wanted', 'When his own words call a search, or its words, wanted or relevant, keep it.'],
        ['Not wanted', 'When they call it not wanted, block it.'],
        ['Places', 'When he names the places he wants, a search that names another place is not wanted.'],
        ['The page', 'Use Google’s page for what his words do not cover, such as whether the searcher wants to hire a firm or do the work alone.']], stamp: ['In the judge’s text since Nov 7', 'code'] },
      vcap: 'The client’s words are his service list, the quotes in Will’s goal for the campaign, and his calls, emails and notes. The service list now says it outranks everything else, Google’s page included.' },
    { about: ['pagedecides'], kicker: 'What the page decides',
      head: 'Where the client’s words say nothing, Google’s page shows what the searcher wants',
      visual: { type: 'flow', rows: [
        { title: 'Do it alone', steps: [['music press release', 'C2 sells PR, press releases included', 'code'], ['Google’s page', '8 of its 9 results are how-to guides, templates and examples', 'code']], end: [['Block', 'the searcher writes his own', 'block']] },
        { title: 'Read, not hire', steps: [['best music marketing campaigns', 'C2 sells music marketing campaigns', 'code'], ['Google’s page', 'mostly lists of famous campaigns and yearly reports of the best ones', 'code']], end: [['Block', 'the searcher wants examples to read, not a firm to hire', 'block']] }] },
      vcap: 'Both are from the test of Nov 7, on C2’s LA + New York campaign, and the judge blocked each one on both reads with the page. Without the page, it kept “music press release” once and called it unclear once, because C2 does sell press releases. DeepSeek had kept “best music marketing campaigns”.' },
    { about: ['judgerules'], kicker: 'Wording',
      head: 'Two lines of wording cut unclear calls from 6 to 2',
      visual: { type: 'bars', max: 25, rows: [
        { label: 'Unclear calls with the old wording', parts: [[6, 'code', '6']] },
        { label: 'Unclear calls with the new wording', parts: [[2, 'keep', '2']] },
        { label: 'Calls that changed when the same old wording ran twice', parts: [[25, 'wait', '25 of 144']] }] },
      vcap: 'With the new wording, 0 keeps became negatives. The noise between two runs of the same wording is why Opus researches, and why it now reads Google’s page.',
      quote: ["Shouldn't we just change the wording in the prompt? then see what that does?", 'Nov 5'] },
    { about: ['unclear'], kicker: 'Unclear · Will, Nov 7',
      head: 'When Opus cannot tell, the search waits for Will, and no run judges it again until he answers',
      visual: { type: 'flow', rows: [{ steps: [['music marketing campaigns', 'Los Angeles, Nov 7', 'code'], ['Opus: unclear', '“Google’s page mostly lists famous campaigns to study, so the searcher may want examples and not a firm”', 'opus'], ['Held for Will’s review', 'no negative of any kind', 'will']], end: [['Will answers on a case', 'and his answer stands', 'will']] }] },
      vcap: 'On Nov 7 C2’s 5 new cards sent 230 kept searches back to Opus, and 13 came back unclear. All 13 wait on Will’s review list. Will picked this when Jev’s checks came out, and every other call of Opus now stands as it is.' }
  ],

  examples: {
    IN: { tag: 'real', rows: [{ steps: [['music press release', 'National Sep 2026, with its page', 'code'], ['A batch of at most {batch}', 'that campaign alone', 'code']], end: [['Opus judges it', '', 'opus']] }], note: 'C2, Nov 7: the searches that the 5 new cards sent back went in batches of at most {batch}, one campaign each, each search with its page.' },
    U: { tag: 'real', rows: [{ steps: [['independent radio promoters', 'a new search', 'code'], ['Unknown word?', 'yes: does C2 do radio?', 'code']], end: [['Research first', '', 'opus']] }], note: 'C2 research test, Nov 5: Opus decides by itself if a word is unknown.' },
    R1: { tag: 'real', rows: [{ steps: [['independent radio promoters', '', 'code'], ['The client’s own words', 'Waylon on the Sep 9 and Sep 17 calls', 'opus']], end: [['Found: C2 does radio', '', 'keep']] }], note: 'A rerun without research had blocked this search.' },
    R2: { tag: 'real', rows: [{ steps: [['Calls, emails, notes', 'step 1: the radio answer was here', 'opus'], ['Their site', 'step 2', 'opus']], end: [['The web', 'step 3', 'opus']] }], note: 'The order is fixed: what the client said comes first.' },
    R3: 'R2',
    FA: { tag: 'real', rows: [{ steps: [['radio', 'the word', 'code'], ['A fact', 'C2 does radio promotion · Waylon, Sep 9 and Sep 17 calls', 'opus']], end: [['Saved', 'with the exact words', 'opus']] }], note: 'The Nov 5 test saved 29 facts, each with a quote.' },
    CW: { tag: 'real', rows: [{ steps: [['music promoters chicago', 'National', 'code'], ['Do his own words settle it?', 'yes, band promoters, and Chicago is one of his cities', 'opus']], end: [['Keep', 'his words decide', 'keep']] }], note: 'The test of Nov 7 with Will’s rule: both reads kept it.' },
    GP: { tag: 'real', rows: [{ steps: [['music press release', 'his words say C2 sells press releases', 'code'], ['Google’s page', 'how-to guides and templates', 'opus']], end: [['Block', 'the searcher writes his own', 'block']] }], note: 'His words say what C2 sells, but not whether this searcher wants to hire a firm, and the page tells that. The test of Nov 7, with C2’s searches.' },
    V: { tag: 'real', rows: [
      { steps: [['independent radio promoters', 'after research', 'opus'], ['Verdict', '', 'opus']], end: [['keep', '', 'keep']] },
      { steps: [['apple music advertising campaign', 'after research', 'opus'], ['Verdict', '', 'opus']], end: [['unclear', 'nothing clear was found', 'next']] }], note: 'C2 research test, Nov 5: 5 keeps, 1 unclear, 0 blocks.' },
    HELD: { tag: 'real', rows: [{ steps: [['music marketing campaigns', 'Los Angeles: unclear', 'opus'], ['Held for Will’s review', 'no negative, and no new judge', 'will']], end: [['Waits for Will', 'one of 13 on Nov 7', 'will']] }], note: 'C2, Nov 7.' }
  },

  reviewed: { self: '55cf8b49', above: 'cce35754', on: '2026-11-08' }
});
