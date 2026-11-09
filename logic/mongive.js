// Who reads the Money answer. comm-chat at origin/main 1c24d43a, read 2026-11-08: src/modules/mod.rs:119 (ACCOUNT_FACTS:
// the four campaign modules and Decide need Money, :207, :223, :241, :258, :277; Tracking, The client and Setup need
// nothing), :263 (Bid and budget's words: "Unused cap is not money at stake"), :283-284 (Decide's words: "Name next week's
// budget for each live campaign"); src/modules/store.rs:129-147 (`stale`, `missing`: 7 New York days); src/modules/brief/
// mod.rs:113-136 (`needs_part`: each needed answer as one line, its title, day, verdict and summary; a missing one ends the
// facts with WAIT); src/modules/brief/numbers.rs:49 and :756 (Decide reads every line of Money's proof, each cut at 300
// characters); src/modules/day.rs:172-173 (a problem from In motion or Money makes Decide run); src/modules/brief/mod.rs
// :198-203 and :235-238 (a code module's facts are its answer: no last answer, no mark); src/modules/store.rs:149-157 (Will's
// mark). Real cases, read 2026-11-08: Bull's Money answer of Nov 1 (2) with module_brief and answer_id; the line that code
// handed Bid and budget for Bull's campaigns on Nov 7 (logic/bneeds.js, HANDOFF-bids-redo.md); in a copy of Barbara's data
// (barbara-local, read-only): Bull's Decide answer 58, Bull's bid answers 21 (Hedge Funds & PE: "The $447.81 left under the
// cap ... are not money at stake") and 27, C2's bid answers 52 and 53 (each names the hold from Money's line), C2's Money
// answer 70 of Nov 3; C2's Meta days in that copy to Nov 5, and C2's caps in live Barbara (get_client_info, Nov 8); commits
// 69544c43 and aa292355 (the cap rule; "C2's 44 and 45 stay hard until Will decides"). No Money answer carries a mark.
LOGIC.flow({
  id: 'mongive', parent: 'money',
  title: 'Who reads the answer', short: 'Who reads it',
  head: 'Every campaign module gets Money’s summary, and the Decide module reads all of it and runs whenever Money finds a problem',
  chart: [
    'flowchart TB',
    'ONE(["The answer is saved, with a<br/>verdict, a summary and<br/>its lines"]):::code',
    'FRESH{"Is it under {moneyFresh}<br/>New York days old?"}:::code',
    'WAIT(["No, so the campaign modules<br/>and the Decide module wait,<br/>and save nothing"]):::block',
    'CAMP["The four campaign modules get<br/>one line, with the verdict,<br/>the day and the summary"]:::code',
    'BIDS(["Bid and budget’s instructions<br/>say unused cap is not<br/>money at stake"]):::opus',
    'DEC["The Decide module also reads<br/>every line, each cut to<br/>{moneyLine} characters"]:::code',
    'BUDGET(["It names next week’s budget<br/>for each live campaign"]):::opus',
    'WAKE(["A problem makes the Decide<br/>module run that morning"]):::block',
    'MARK(["Will can mark the answer right<br/>or wrong, but no code<br/>reads the mark"]):::will',
    'ONE --> FRESH',
    'FRESH -- no --> WAIT',
    'FRESH -- yes --> CAMP', 'FRESH -- yes --> DEC',
    'CAMP --> BIDS',
    'DEC --> BUDGET',
    'ONE --> WAKE',
    'ONE --> MARK'
  ],
  links: { FRESH: 'monwait', WAIT: 'monwait', CAMP: 'moncamp', BIDS: 'moncamp', DEC: 'mondecide', BUDGET: 'mondecide', WAKE: 'monwake' },
  leaves: {
    monwait: 'They wait for a fresh answer',
    moncamp: 'The campaign modules get the summary',
    mondecide: 'The Decide module reads every line',
    monwake: 'A problem wakes the Decide module'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['mongive'], kicker: 'The idea',
      head: 'Money proposes nothing itself, so what counts is what the modules after it do with the room',
      visual: { type: 'gate', rows: [
        ['Results', 'It gets the summary.', 'pass'],
        ['Search terms and reach', 'It gets the summary.', 'pass'],
        ['Ads and pages', 'It gets the summary.', 'pass'],
        ['Bid and budget', 'It gets the summary, and its instructions say that unused cap is not money at stake.', 'hold'],
        ['Decide', 'It gets the summary and reads every line, and it names next week’s budget for each live campaign.', 'pass']],
        end: ['None of them saves without a Money answer from the last {moneyFresh} days', 'code'] },
      vcap: 'The other three modules of the first step, Tracking, the client module, and Setup and market, never read Money’s answer.' },

    { about: ['monwait'], kicker: 'A fresh answer',
      head: 'The campaign modules and the Decide module wait, and save nothing, until Money has an answer from the last {moneyFresh} days',
      visual: { type: 'flow', rows: [
        { title: 'Bull Legal, Nov 8', steps: [['Its newest Money answer is from the test of Nov 1', '', 'code'], ['{moneyFresh} New York days have passed', '', 'code']], end: [['A test of a campaign module makes a new Money answer first', '', 'code']] },
        { title: 'A live morning', steps: [['Code makes the answer before any other module', '', 'code']], end: [['So a live morning never waits for it', '', 'keep']] }] },
      vcap: 'The wait matters only in a test, because a live morning makes the answer first. Code counts the days by the calendar in New York, the same way for every module.' },

    { about: ['moncamp'], kicker: 'The summary',
      head: 'Each campaign module gets Money’s answer as one line, and on Nov 1 three bid answers quoted its word about Will’s hold',
      visual: { type: 'card', title: 'What Bid and budget got from Money for Bull Legal, Nov 7', fields: [
        ['The line', 'Money, Nov 1, good. $0 so far at $176.03 a day against $5,800 a month on the whole account. The box is shut, because Will has set everything on Bull Legal to wait.'],
        ['Not in it', 'The line does not include the pace over a whole month, Google’s weeks, the targets or our billing check.'],
        ['What the bid answers did', 'Three bid answers, one for Bull and two for C2, quoted Will’s hold from this line.']],
        stamp: ['One line', 'code'] },
      vcap: 'Bid and budget’s instructions say that unused cap is not money at stake, so a campaign that spends under its cap is no loss to fix. On Nov 1 Bull’s Hedge Funds answer said the $447.81 left under the cap in October was not money at stake.' },

    { about: ['mondecide'], kicker: 'Every line',
      head: 'The Decide module reads every line of Money’s answer, and on Nov 1 it used Money’s pace to keep Bull’s budgets as they were',
      visual: { type: 'flow', rows: [
        { title: 'What Bull’s Decide answer took from Money, Nov 1', steps: [['$176.03 a day over {moneyPace} days', '$5,280.90 over a whole month, $519.10 under the soft $5,800', 'code'], ['Will has set everything on Bull Legal to wait', '', 'will']], end: [['Next week, hold Startups and Securities at $65, Hedge Funds at $45 and DeFi at $15 a day', '', 'opus']] }] },
      vcap: 'The Decide module’s instructions say to name next week’s budget for each live campaign, so the room under each cap is what it budgets against. Code gives the Decide module every line of Money’s answer, each one cut to {moneyLine} characters.' },

    { about: ['monwake'], kicker: 'A problem',
      head: 'A problem from Money makes the Decide module run that morning, and C2’s small Meta cap would do it every day',
      visual: { type: 'flow', rows: [
        { title: 'C2, Nov 3, in a test on a copy of Barbara’s data', steps: [['Meta’s $10.95 a day comes to $328.50 over a whole month', 'past its $200 cap', 'block'], ['Money reads a problem', '', 'block']], end: [['On a live morning the Decide module would run that day', 'even with no other module due', 'opus']] },
        { title: 'Every morning from Nov 2 to Nov 6, by the spend that Barbara stored', steps: [['A whole month at Meta’s pace stays over $200', '$328.50 on Nov 2, and about $530 on Nov 6', 'block']], end: [['Money would read a problem each morning', 'while the cap stays as it is', 'block']] }] },
      vcap: 'Barbara’s rule set the $200 cap on Nov 1 from Meta’s spend in the 30 days before, but the campaign had run on only 5 of those days. Only a problem wakes the Decide module, so an answer that says too few to tell, or a shut box, does not.' }
  ],

  examples: {
    ONE: { tag: 'real', rows: [{ steps: [['Bull’s Money answer of Nov 1', 'It says good.', 'code']], end: [['Its summary', '$0 so far at $176.03 a day against $5,800 a month, and the box is shut by Will’s hold', 'code']] }], note: 'We took this from the answer that the Money module wrote for Bull in a test on Nov 1.' },
    FRESH: { tag: 'made', rows: [{ steps: [['Bull’s newest Money answer', 'from the test of Nov 1', 'code'], ['Is it under {moneyFresh} New York days old on Nov 8?', 'no', 'code']], end: [['The campaign modules and the Decide module wait', '', 'block']] }], note: 'We made this up from the real day of Bull’s last answer, because no module ran on Bull on Nov 8.' },
    WAIT: { tag: 'made', rows: [{ steps: [['A test of Bid and budget on Bull, Nov 8', 'with no Money answer from the last {moneyFresh} days', 'code']], end: [['Nothing saves until a new Money answer exists', 'so the test makes one first', 'block']] }], note: 'We made this up from the rule in code and the real day of Bull’s last answer, because no test ran on Bull on Nov 8.' },
    CAMP: { tag: 'real', rows: [{ steps: [['Bid and budget on Bull’s campaigns, Nov 7', '', 'code']], end: [['One line from Money', '$0 so far at $176.03 a day, and the box is shut', 'code']] }], note: 'This is the line that code gave Bid and budget for each of Bull’s campaigns on Nov 7.' },
    BIDS: { tag: 'real', rows: [{ steps: [['Bull’s Hedge Funds and PE campaign, Nov 1', 'October left $447.81 under the $5,800 cap', 'code']], end: [['Not money at stake, so no raise to chase', '', 'opus']] }], note: 'We took this from the answer that the Bid and budget module wrote for that campaign in a test on Nov 1. We read it in a copy of Barbara’s data.' },
    DEC: { tag: 'real', rows: [{ steps: [['Bull’s Decide answer, Nov 1', '', 'opus']], end: [['It quotes Money’s pace', 'a pace of $176.03 a day, which leaves $519.10 under the $5,800 cap', 'code']] }], note: 'We took this from the answer that the Decide module wrote for Bull in a test on Nov 1. We read it in a copy of Barbara’s data.' },
    BUDGET: { tag: 'real', rows: [{ steps: [['Bull’s Decide answer, Nov 1', '', 'opus']], end: [['Keep next week’s budgets at $65 a day for Startups and Securities, $45 for Hedge Funds and $15 for DeFi', '', 'opus']] }], note: 'We took this from the answer that the Decide module wrote for Bull in a test on Nov 1. We read it in a copy of Barbara’s data.' },
    WAKE: { tag: 'made', rows: [{ steps: [['C2’s Money reads a problem', 'because Meta spends fast enough to pass its $200 cap in a month', 'block']], end: [['The Decide module runs that morning', '', 'opus']] }], note: 'The problem is real, from a test on a copy of Barbara’s data on Nov 3, but no live morning ran, because the module run is off in live.' },
    MARK: { tag: 'made', rows: [{ steps: [['Will marks a Money answer wrong', 'with a note', 'will'], ['The next morning', 'code makes a new answer', 'code']], end: [['His mark stays on the old answer, and nothing reads it', '', 'wait']] }], note: 'We made this up, because no Money answer that we read for this map carries a mark from Will.' }
  },

  reviewed: { self: '95e034ca', above: '495bd93b', on: '2026-11-08' }
});
