// Opus judges, research first: what Opus does with each new search the keyword check does not keep (Will, Nov 7:
// "Take clef out": Opus settles every such search, and Jev and DeepSeek check its calls).
LOGIC.flow({
  id: 'opus', parent: 'waterfall',
  title: 'Opus judges, research first', short: 'Opus',
  head: 'Opus judges every search the keyword check does not keep, research first',
  chart: [
    'flowchart LR',
    'IN["Every new search<br/>the keyword check<br/>does not keep"]:::code',
    'U{"Unknown word?<br/>Opus decides"}:::code',
    'R1["The client\'s own words:<br/>calls, emails, notes"]:::opus',
    'R2["Their site"]:::opus',
    'R3["The web"]:::opus',
    'FA["Save each finding<br/>as a fact"]:::opus',
    'V(["Verdict: keep,<br/>block or unclear"]):::opus',
    'IN --> U', 'U -- yes --> R1 --> R2 --> R3 --> FA --> V', 'U -- no --> V'
  ],
  links: { R1: 'research', R2: 'research', R3: 'research', FA: 'facts', V: 'judgerules' },
  leaves: { research: 'Research order', facts: 'Facts', judgerules: 'How Opus judges' },

  deck: [
    { about: ['opus'], kicker: 'What Opus gets',
      head: 'Opus judges every new search that the keyword check does not keep',
      visual: { type: 'gate', rows: [['A live keyword of its campaign, word for word', 'kept with no judge', 'pass'], ['Judged before', 'never judged again; an unclear comes back after 7 days', 'pass'], ['Every other new search that cost money', 'Opus judges it, research first', 'wait']], end: ['Opus’s verdict, then Jev’s checks and DeepSeek’s second opinion', 'opus'] },
      vcap: 'Will, Nov 7: no cheaper judge settles searches before Opus. Then DeepSeek’s second opinion checks each keep and block (built Nov 7).' },
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
    { about: ['judgerules'], kicker: 'Wording',
      head: 'Two lines of wording cut unclear calls from 6 to 2',
      visual: { type: 'bars', max: 25, rows: [
        { label: 'Unclear calls with the old wording', parts: [[6, 'code', '6']] },
        { label: 'Unclear calls with the new wording', parts: [[2, 'keep', '2']] },
        { label: 'Calls that changed when the same old wording ran twice', parts: [[25, 'wait', '25 of 144']] }] },
      vcap: 'With the new wording, 0 keeps became negatives. The noise between two identical runs is why research and checks matter.',
      quote: ["Shouldn't we just change the wording in the prompt? then see what that does?", 'Nov 5'] },
    { about: ['facts'], kicker: 'Facts',
      head: 'Each finding becomes a fact, with its proof',
      visual: { type: 'card', title: 'One fact (its shape)', fields: [['Word', 'radio'], ['Fact', 'C2 does radio promotion.'], ['Source', 'Waylon, calls of Sep 9 and Sep 17'], ['Exact words', 'the words from the call'], ['Day', 'Nov 5']], stamp: ['Jev will check: does the quote back the fact?', 'next'] },
      vcap: 'Facts are trusted for now, with no buying-search check.',
      quote: ['2 for now. We will continue to iterate', 'Nov 4'] }
  ],

  examples: {
    IN: { tag: 'real', rows: [{ steps: [['pritanmg com', 'LA + New York · new · not a keyword', 'code'], ['Opus judges it', '', 'opus']], end: [['block', 'Nov 6', 'block']] }], note: 'C2, Nov 6: Opus judged 6 new searches of the call.' },
    U: { tag: 'real', rows: [{ steps: [['independent radio promoters', 'a new search', 'code'], ['Unknown word?', 'yes: does C2 do radio?', 'code']], end: [['Research first', '', 'opus']] }], note: 'C2 research test, Nov 5: Opus decides by itself if a word is unknown.' },
    R1: { tag: 'real', rows: [{ steps: [['independent radio promoters', '', 'code'], ['The client’s own words', 'Waylon on the Sep 9 and Sep 17 calls', 'opus']], end: [['Found: C2 does radio', '', 'keep']] }], note: 'A rerun without research had blocked this search.' },
    R2: { tag: 'real', rows: [{ steps: [['Calls, emails, notes', 'step 1: the radio answer was here', 'opus'], ['Their site', 'step 2', 'opus']], end: [['The web', 'step 3', 'opus']] }], note: 'The order is fixed: what the client said comes first.' },
    R3: 'R2',
    FA: { tag: 'real', rows: [{ steps: [['radio', 'the word', 'code'], ['A fact', 'C2 does radio promotion · Waylon, Sep 9 and Sep 17 calls', 'opus']], end: [['Saved', 'with the exact words', 'opus']] }], note: 'The Nov 5 test saved 29 facts, each with a quote.' },
    V: { tag: 'real', rows: [
      { steps: [['independent radio promoters', 'after research', 'opus'], ['Verdict', '', 'opus']], end: [['keep', '', 'keep']] },
      { steps: [['apple music advertising campaign', 'after research', 'opus'], ['Verdict', '', 'opus']], end: [['unclear', 'nothing clear was found', 'next']] }], note: 'C2 research test, Nov 5: 5 keeps, 1 unclear, 0 blocks.' }
  },

  reviewed: { self: '29f7b992', above: 'f9f28543', on: '2026-11-07' }
});
