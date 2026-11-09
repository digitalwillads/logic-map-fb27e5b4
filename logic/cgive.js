// Nov 8, 2026: plain-words pass (Will: "The client module needs a run that removes robot speak. Please make this
// intelligable"). Only the words changed, and the logic and every fact stayed the same. The module is "the client module",
// never "The client" alone; C2's answer 44 is "C2's test answer"; the brief is "the fact sheet". check-plain.cjs judges it.
// What the other modules get from The client: comm-chat src/modules/mod.rs:119 (ACCOUNT_FACTS: Tracking, The client, In
// motion, Money) and :207-277 (Results, Search terms and reach, Ads and pages, Bid and budget and Decide need them);
// src/modules/store.rs:129-147 (`missing` counts any answer under 7 New York days, a test's too, while the day's list drops a
// test's, day.rs:241-252); src/modules/brief/mod.rs:113-136 (each account answer as one line, with its verdict, its day and
// its summary, and the line that says to wait); src/chat/tools/module_tools.rs:513-517 (the save refuses). In motion lists
// The client's whole summary as what we told the client (src/modules/brief/code.rs:174-177) and runs at step 0, before The
// client (day.rs:259-268). The next morning: brief/mod.rs `retest_part` (156-171, 600 characters) and `last_line` with Will's
// mark (store.rs `set_mark`; src/ui/modules.rs, Right or Wrong). A blank page: day.rs:275-278 (the run drafts the page from
// The client's answer), src/results/strategy_case.rs (set by rule, one notice tells Will). Real cases, read 2026-11-07:
// Bull's answer 39 (Search terms and reach, Nov 1); C2's In motion answers 3 and 46 (Nov 1); C2's facts of Nov 7; the
// strategy pages of Affordable Tree Service and AAFE (runs #239 and #241). Old parts: retired/2026-11-07-client-redo/
// client.js (who waits for it, In motion, tomorrow's test, the draft).
LOGIC.flow({
  id: 'cgive', parent: 'client',
  title: 'What the other modules get', short: 'What others get',
  head: 'Five modules need the client module’s answer, and the next day’s answer checks whether this one was right',
  chart: [
    'flowchart TB',
    'ONE(["One answer for the whole<br/>account, with its verdict,<br/>its date and its summary"]):::code',
    'NEEDS["The five modules after it<br/>cannot save unless the client<br/>module answered in the<br/>last {clientFresh} days"]:::code',
    'MOTION["The In motion module lists<br/>its summary as what we<br/>told the client"]:::code',
    'DRAFT["A blank strategy page is drafted<br/>from this answer, and Barbara<br/>sets it by rule"]:::code',
    'NEXT["Tomorrow’s answer starts by<br/>testing what would prove<br/>this one wrong"]:::code',
    'MARK(["Will can mark the answer<br/>right or wrong, and the next<br/>answer reads his mark"]):::will',
    'ONE --> NEEDS', 'ONE --> MOTION', 'ONE --> DRAFT', 'ONE --> NEXT',
    'MARK -.-> NEXT'
  ],
  links: { ONE: 'chneeds', NEEDS: 'chneeds', MOTION: 'chmotion', DRAFT: 'chdraft', NEXT: 'chnext', MARK: 'chnext' },
  leaves: {
    chneeds: 'Who uses this answer',
    chmotion: 'The In motion module repeats the summary',
    chdraft: 'The run drafts a blank strategy page from this answer',
    chnext: 'Each answer is tested the next day'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['cgive'], kicker: 'The idea',
      head: 'Five modules rely on the client module, because a number alone cannot say what the client wants',
      visual: { type: 'gate', rows: [
        ['Results', 'Is this campaign doing its job?', 'pass'],
        ['Search terms and reach', 'Are the right people seeing it?', 'pass'],
        ['Ads and pages', 'Are the ads and pages strong?', 'pass'],
        ['Bid and budget', 'Is the bid right, and what would more or less money do?', 'pass'],
        ['Decide', 'Where does the money go, what comes first, and who says yes?', 'pass']],
        end: ['With no answer from the client module in the last {clientFresh} days, none of them can save', 'code'] },
      vcap: 'Each of them gets the client module’s answer as one line, with its verdict, its date and its summary. For example, on Nov 1 the Search terms and reach module judged Bull’s Hedge Funds and PE campaign, and it used the client module’s answer, because Tyler wants a few of those leads a month.' },

    { about: ['chneeds'], kicker: 'Who needs this answer',
      head: 'The campaign modules and Decide can save only while the client module’s answer is under {clientFresh} days old',
      visual: { type: 'flow', rows: [
        { title: 'A fresh answer', steps: [['The client module’s answer', 'under {clientFresh} days old, counted by the calendar in New York', 'opus']], end: [['The four campaign modules and Decide read it', 'as one line', 'code']] },
        { title: 'No fresh answer', steps: [['A campaign module’s fact sheet', 'says to wait for the client module, and stops there', 'code']], end: [['Its save is refused, so nothing is saved', '', 'block']] }] },
      vcap: 'Any answer that young counts, even one from a test, though the client module itself still reads the client again after a test. Bull’s answers about the whole account, of Nov 1, stay fresh through Nov 7, and from Nov 8 Bull’s campaign modules wait.' },

    { about: ['chmotion'], kicker: 'The In motion module repeats it',
      head: 'The In motion module copies the client module’s whole summary into its list of what we told the client',
      visual: { type: 'timeline', items: [
        ['First, before the client module', 'Code writes the In motion module’s answer, with no AI. On C2’s first test it said “What we told the client is not listed: The client has no answer yet.”'],
        ['Next', 'The client module answers, and that is C2’s test answer.'],
        ['Later tests that day', 'The In motion module’s next three answers list the whole summary of C2’s test answer as what we told the client.']] },
      vcap: 'Each morning the In motion module runs before the client module, so it reads the answer of an earlier morning. The summary says what Waylon wants, not only what we told him, because the answer has no field for what we told the client.' },

    { about: ['chdraft'], kicker: 'A blank strategy page',
      head: 'The client module answers first, and then the run drafts the strategy page from that answer',
      visual: { type: 'flow', rows: [
        { title: 'In a module run', steps: [['A blank page that Will was never asked for', 'an item each morning', 'code'], ['The client module reads the account', 'because the page is blank', 'opus'], ['The run drafts the page from the client module’s answer', 'because the run reads no raw data itself', 'code']], end: [['The check on strategy pages reads each want', 'in the client’s own words, in whole sentences', 'code']] },
        { title: 'When the draft passes', steps: [['Barbara sets the page at once', 'by rule', 'code']], end: [['One notice tells Will what changed', '', 'will']] }] },
      vcap: 'Before module runs began, the old morning run also drafted blank strategy pages from its answer. That is how Affordable Tree Service and AAFE got their pages, from the drafts of runs #239 and #241. The check on strategy pages makes sure that each want came from the client, but the quote check on this answer does not check who said a quote.',
      quote: ['can we automatically set and update the stratagy pages? Just have it as a notification in the cases that there was a change. It is so much more likely that a human doesn\'t do the job than a robot will make a mistake', 'Nov 1'] },

    { about: ['chnext'], kicker: 'The next morning',
      head: 'Each answer says what would prove it wrong, and the next day’s answer must test that first',
      visual: { type: 'timeline', items: [
        ['Nov 1', 'C2’s test answer is saved, and says that Isaac’s or Will’s account of the call of Oct 30 would prove it wrong.'],
        ['Nov 7', 'C2’s fact sheet opens with that test, and tells Opus to try it first with today’s data.'],
        ['If it holds', 'The new answer must say that the last one was wrong, and why.'],
        ['Will’s mark', 'In Barbara, under Validators and then Modules, Will marks each answer right or wrong with a note, and the next fact sheet carries his mark.']] },
      vcap: 'Code quotes at most {clientWrong} characters of the test. Nobody else reads the answer again, because the next morning’s data acts as the second reader.',
      quote: ['on the second run the next day it would catch this again, if something was truly wrong', 'Nov 1'] }
  ],

  examples: {
    ONE: { tag: 'real', rows: [{ steps: [['C2’s test answer, Nov 1', '', 'opus']], end: [['One line for each module after it', 'its verdict, its date and its summary', 'code']] }], note: 'C2’s test answer is what C2’s campaign modules read on Nov 1.' },
    NEEDS: { tag: 'real', rows: [{ steps: [['Bull’s client module answer, Nov 1', 'Tyler wants a few Hedge Funds and PE leads a month', 'opus'], ['Search terms and reach on Hedge Funds and PE', 'its answer used the client module’s answer', 'opus']], end: [['Its proof names the client module as its source', '', 'code']] }], note: 'We took this from the Search terms and reach module’s answer for Bull Legal on Nov 1.' },
    MOTION: { tag: 'real', rows: [{ steps: [['The In motion module, C2, Nov 1', 'its first answer, before the client module answered', 'code'], ['“What we told the client is not listed”', 'because the client module had no answer yet', 'code']], end: [['Its next three answers list the whole summary of C2’s test answer', '', 'code']] }], note: 'From the In motion module’s four answers for C2 on Nov 1.' },
    DRAFT: { tag: 'made', rows: [{ steps: [['A blank strategy page', 'Will was never asked for it', 'code'], ['The client module answers', 'because the page is blank', 'opus']], end: [['The run drafts the page from that answer', '', 'code']] }], note: 'We made this up, because no module run has taken this path. Before module runs began, the old morning run drafted the pages of Affordable Tree Service and AAFE from its own answer.' },
    NEXT: { tag: 'real', rows: [{ steps: [['C2’s test answer named what would prove it wrong', 'Isaac’s or Will’s account of the call of Oct 30', 'opus'], ['C2’s fact sheet of Nov 7', 'opens with it', 'code']], end: [['Test it first, with today’s data', '', 'opus']] }], note: 'We took this from the client module’s answer for C2 on Nov 1, and from C2’s fact sheet of Nov 7.' },
    MARK: { tag: 'made', rows: [{ steps: [['Will marks an answer wrong', 'with a note', 'will'], ['The next morning’s fact sheet', 'carries his mark and his note', 'code']], end: [['Opus reads his mark before it answers', '', 'opus']] }], note: 'Made up, because no answer of the client module carries a mark yet. The fact sheets of Nov 7 show none on C2, Bull Legal or Kogalla.' }
  },

  reviewed: { self: '01e1bb72', above: 'f4196f57', on: '2026-11-08' }
});
