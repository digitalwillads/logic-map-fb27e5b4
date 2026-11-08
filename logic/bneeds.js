// What Bid and budget needs first: the four account answers. comm-chat src/modules/mod.rs:119 (ACCOUNT_FACTS: Tracking, The
// client, In motion, Money), :258 (Bid and budget needs them); store.rs:129-147 (`stale`, `missing`: 7 New York days);
// brief/mod.rs:113-136 (`needs_part`: each answer as one line with its verdict and day, and the WAIT line that stops the facts
// there), :240-247 (no numbers, no reads, no checks after a WAIT); src/chat/tools/module_tools.rs:513-517 (the save asks
// again and refuses). What each says: brief/code.rs:162-203 (In motion's answer is counts in its summary; its lines live in
// its proof), :34-65 (a teammate's word on an open task, Bull's freeze of Oct 28), :280-300 (Money's proof: the box, the
// margin). Results' words have a rule for a count that Tracking does not trust and Bid and budget's have none: mod.rs:211
// against :260-264. Tracking's true numbers are not built (Will, Nov 7). The question on In motion's lines: mod.rs:263-264
// against brief/mod.rs:113-136. Real cases: the facts that code gathered on Nov 7 for Bull's Hedge Funds & PE and Securities
// campaigns and Kogalla's PMax (each holds the four lines of Nov 1); C2's Brand answer of Nov 1, as HANDOFF-tracking.md lists
// C2's campaign answers. Old parts: retired/2026-11-07-bids-redo/bids.js (bidneeds) and bidbrief.js (bidmotion).
LOGIC.flow({
  id: 'bneeds', parent: 'bids',
  title: 'What Bid and budget needs first', short: 'What it needs first',
  head: 'Bid and budget stands on four answers about the account, and it waits while one of them is missing or old',
  chart: [
    'flowchart TB',
    'FOUR["Four answers about the account:<br/>Tracking, The client,<br/>In motion and Money"]:::code',
    'FRESH{"Is each one under<br/>{bidFresh} days old?"}:::code',
    'WAIT(["It waits, so code hands<br/>Opus nothing more, and<br/>no answer can save"]):::code',
    'LINE["Opus gets each one as a<br/>single line, with its verdict,<br/>its day and its summary"]:::code',
    'TRK["Tracking says which platform’s<br/>count to trust, and from<br/>which day"]:::code',
    'CLI["The client says what the<br/>client wants, and what<br/>we owe them"]:::code',
    'MOT["In motion counts the tests, the<br/>questions and the people’s<br/>changes on the account"]:::code',
    'MON["Money says how much room<br/>the month has, and whether<br/>the spend box is open"]:::code',
    'FOUR --> FRESH',
    'FRESH -- no --> WAIT', 'FRESH -- yes --> LINE',
    'LINE --> TRK', 'LINE --> CLI', 'LINE --> MOT', 'LINE --> MON'
  ],
  links: { FRESH: 'bnfresh', WAIT: 'bnfresh', TRK: 'bntrack', CLI: 'bnclient', MOT: 'bidmotion', MON: 'bnmoney' },
  leaves: {
    bnfresh: 'Each one under {bidFresh} days old',
    bntrack: 'What Tracking hands on',
    bnclient: 'What the client wants',
    bidmotion: { title: 'In motion’s lines, or only its counts', open: {
      q: 'Bid and budget’s instructions say to read In motion first, and to wait on a test, an open question or a teammate’s fresh change. But code hands Opus only In motion’s counts. Should code also hand on In motion’s lines?',
      since: 'Nov 7',
      opts: [
        ['Yes, hand on each line of In motion that names this campaign or the whole account', true, 'A freeze written only on a task then reaches the bid answer. The lines are short, and code already saves them.'],
        ['No, keep the counts, and Opus reads In motion’s answer itself when a count is not zero', false, 'This is how it works today. Opus gets less to read, but the wait rests on one more read by the model.']] } },
    bnmoney: 'How much room there is'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['bneeds'], kicker: 'The idea',
      head: 'One campaign cannot tell if its count is true or what the client wants, so Bid and budget leans on the account modules',
      visual: { type: 'gate', rows: [
        ['Is the count true?', 'Only Tracking sets each platform’s count beside the client’s own record.', 'pass'],
        ['What does the client want?', 'Only The client reads the mail, the calls and the client’s own words.', 'pass'],
        ['What already waits?', 'Only In motion reads the tests, the open questions, the people’s changes and the follow-ups.', 'pass'],
        ['How much room is there?', 'Only Money reads the month’s spend against its caps and the spend box.', 'pass']], end: ['So Bid and budget reads their four answers first', 'code'] },
      vcap: 'On Nov 1 C2’s Brand answer set September’s count aside, because Tracking said Google’s count was true only from Oct 1, and it judged the bid on October’s 2 good leads instead. A bid answer is only as good as the answers it stands on.' },

    { about: ['bnfresh'], kicker: 'Each one under {bidFresh} days old',
      head: 'No Bid and budget answer saves while one of the four answers is missing or {bidFresh} days old',
      visual: { type: 'gate', rows: [
        ['Tracking, Nov 1, good', 'Google’s main lead count, the lead form, can be trusted from May 11.', 'pass'],
        ['The client, Nov 1, a problem', 'Tyler wants good form leads, above all a few Hedge Funds and PE leads a month.', 'pass'],
        ['In motion, Nov 1, good', '0 tests run, 19 questions wait on a person, and there are 18 people’s changes.', 'pass'],
        ['Money, Nov 1, good', 'The spend box is shut, because Will has set everything on Bull Legal to wait.', 'pass']], end: ['Fresh through Nov 7, and from Nov 8 Bid and budget waits', 'wait', 'Bull, as code showed it to Opus on Nov 7'] },
      vcap: 'Code counts New York days, so an answer of Nov 1 is stale on Nov 8. Then code stops the facts at a line that says to wait, and when Opus tries to save, the save asks again and refuses.' },

    { about: ['bntrack'], kicker: 'Today',
      head: 'Today Opus gets Tracking’s answer as one line, and Bid and budget’s instructions give no rule for a count it does not trust',
      visual: { type: 'flow', rows: [
        { title: 'Results, today', steps: [['Tracking does not trust a count', '', 'opus']], end: [['Its instructions say to judge on clicks and cost instead', '', 'keep']] },
        { title: 'Bid and budget, today', steps: [['Tracking does not trust a count', '', 'opus']], end: [['Its instructions give no rule for that', 'Opus has only the one line to go on', 'block']] },
        { title: 'C2’s Brand campaign, Nov 1', steps: [['Tracking says Google’s count is true only from Oct 1', '', 'opus']], end: [['The bid answer judged on October’s 2 good leads', 'and set September’s count aside', 'keep']] }] },
      vcap: 'Results’ instructions say “If Tracking does not trust the count, judge on clicks and cost.” Bid and budget’s instructions name no such rule, but on C2’s Brand campaign Opus still followed Tracking’s line.' },
    { about: ['bntrack'], kicker: 'The plan',
      head: 'In the plan Tracking hands on the true numbers of each platform and day, so Bid and budget judges on what really happened',
      visual: { type: 'flow', rows: [
        { title: 'Today', steps: [['One answer for the whole account', 'a summary, a verdict and its day', 'opus']], end: [['The numbers stay each platform’s own count', '', 'code']] },
        { title: 'The plan', steps: [['One answer for each platform and day', 'trusted, or rebuilt from the client’s own leads and orders', 'next']], end: [['Bid and budget judges on the true numbers', '', 'next']] }] },
      vcap: 'This is not built yet. A day that matches the client’s record keeps the platform’s count, and a day that does not gets the true count from the record, with the platform’s number kept beside it.',
      quote: ['build this as if we can always read the real leads and orders. If we don\'t have access now we will get it', 'Nov 7'] },

    { about: ['bnclient'], kicker: 'What the client wants',
      head: 'The client’s answer tells Bid and budget what the client wants, in one line',
      visual: { type: 'card', title: 'The client’s line for Bull, Nov 1', fields: [
        ['What Tyler wants', 'Good form leads, and above all a few Hedge Funds and PE leads a month.'],
        ['What he agreed to', 'On Oct 27 he agreed to keep this spend.'],
        ['What we owe him', 'The Oct 6 Hedge Funds review, his LinkedIn tag news, and answers on DeFi, Securities, Chambers, the domain and his site wins.']], stamp: ['A problem, of Nov 1', 'opus'] },
      vcap: 'That one line is all of The client’s answer that Opus gets. For more, Opus has the strategy page, which code puts in front of the numbers, and it reads the mail itself when it needs to.' },

    { about: ['bidmotion'], kicker: 'In motion’s lines',
      head: 'The instructions say to read In motion first, but Opus gets only In motion’s counts',
      visual: { type: 'card', title: 'In motion, as code hands it to Opus for Bull, Nov 7', fields: [
        ['Its line', '0 tests run, 19 questions wait on a person, 18 people’s changes, and 0 follow-ups are due.'],
        ['Also handed on', 'the open cases on this campaign, and its changes of the last {bidChanges} days, each with its day'],
        ['Not handed on', 'a teammate’s word on an open task, the day a follow-up is due, and the hour of a change']], stamp: ['Counts only', 'wait'] },
      vcap: 'On Oct 28 Yasir froze all of Bull’s bids and budgets, but he wrote it only in the comments of two tasks. In motion now lists words like his, while Bid and budget still gets only their count.',
      open: 'bidmotion' },

    { about: ['bnmoney'], kicker: 'How much room there is',
      head: 'Money’s answer tells Bid and budget how much room the month has, and whether the spend box is open',
      visual: { type: 'flow', rows: [
        { title: 'Bull, Nov 1', steps: [['$0 spent so far in November', 'at $176.03 a day', 'code'], ['against $5,800 a month on the whole account', '', 'will']], end: [['The spend box is shut', 'Will has set everything on Bull Legal to wait', 'block']] },
        { title: 'Kogalla, Nov 1', steps: [['Will has set everything on Kogalla to wait', '', 'will']], end: [['The spend box is shut', '', 'block']] }] },
      vcap: 'Money is code, with no model. Its answer also lists the client’s margin when one is on file, but Opus gets only this one line.' }
  ],

  examples: {
    FOUR: { tag: 'real', rows: [{ steps: [['Bull, Nov 7', 'Tracking, The client, In motion and Money', 'code']], end: [['All four answered on Nov 1', '', 'code']] }], note: 'The facts that code gathered for Bull’s campaigns on Nov 7.' },
    FRESH: { tag: 'real', rows: [{ steps: [['Bull, Nov 7', 'the four answers of Nov 1', 'code'], ['Is each one under {bidFresh} days old?', 'yes, for one more day', 'code']], end: [['Opus gets the rest of the facts', '', 'opus']] }], note: 'The facts that code gathered for Bull’s campaigns on Nov 7.' },
    WAIT: { tag: 'made', rows: [{ steps: [['Bull, Nov 8', 'the four answers turn {bidFresh} days old', 'code'], ['Is each one under {bidFresh} days old?', 'no', 'code']], end: [['It waits', 'no numbers and no test, and no answer can save', 'code']] }], note: 'Made, because this happens from Nov 8 unless the account modules answer again first.' },
    LINE: { tag: 'real', rows: [{ steps: [['Bull’s Tracking answer, Nov 1, good', '', 'opus']], end: [['One line', 'Google’s main lead count can be trusted from May 11, so judge on the lead form alone', 'code']] }], note: 'The line as code handed it to Opus for Bull on Nov 7.' },
    TRK: { tag: 'real', rows: [{ steps: [['Kogalla’s Tracking answer, Nov 1, good', 'Google’s Purchase, GA4 and Shopify’s server feed move together week by week', 'opus']], end: [['Judge Google on Purchase over 4 weeks or more', '', 'keep']] }], note: 'The line as code handed it to Opus for Kogalla’s PMax on Nov 7.' },
    CLI: { tag: 'real', rows: [{ steps: [['Kogalla’s client answer, Nov 1, a problem', '', 'opus']], end: [['On Oct 12 Rob asked for ads on the RA Light Kit only', 'until the batteries are back', 'will']] }], note: 'The line as code handed it to Opus for Kogalla’s PMax on Nov 7.' },
    MOT: { tag: 'real', rows: [{ steps: [['Bull’s In motion answer, Nov 1, good', '', 'code']], end: [['0 tests run, 19 questions wait on a person, and 18 people’s changes', '', 'code']] }], note: 'The line as code handed it to Opus for Bull on Nov 7.' },
    MON: { tag: 'real', rows: [{ steps: [['Bull’s Money answer, Nov 1, good', '$0 so far at $176.03 a day, against $5,800 a month', 'code']], end: [['The spend box is shut', 'Will has set everything on Bull Legal to wait', 'block']] }], note: 'The line as code handed it to Opus for Bull on Nov 7.' }
  },

  reviewed: { self: 'b68986b8', above: '4bfe1dd5', on: '2026-11-07' }
});
