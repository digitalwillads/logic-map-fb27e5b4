// Is the bid right? The words (comm-chat src/modules/mod.rs:260-264: keep, raise, cut or too few to tell; price a raise per
// added conversion; a campaign under break-even gets a proposed cut; read In motion first, and a setting with a test, an open
// question or a teammate's change under 72 hours waits, so name the fix and what it waits on) on top of the fixed rules of
// every module (brief/mod.rs:30-41). Code's four verdicts: mod.rs:33-56 (good, problem, too few to tell, ask); no rule ties
// a word of the words to a verdict. Nothing checks the 72 hours: the facts give each change its day, never its hour
// (brief/numbers.rs:163-169). Real answers, read 2026-11-07: C2's answers 52 (Brand) and 53 (Competitor), whole; Bull's Hedge
// Funds & PE and Securities answers and Kogalla's PMax answer, as code showed their last answers to Opus on Nov 7. Old parts:
// retired/2026-11-07-bids-redo/bids.js (what the answers proposed), bidbrief.js (its words), bidanswer.js (four verdicts).
LOGIC.flow({
  id: 'bverdict', parent: 'bids',
  title: 'Is the bid right?', short: 'Is the bid right?',
  head: 'Opus says keep, raise, cut or too few to tell, and code saves it as one of its own four verdicts',
  chart: [
    'flowchart TB',
    'WORDS["Its instructions: eight short<br/>rules of its own, on top of the<br/>rules every module keeps"]:::code',
    'SAY{"What does<br/>Opus say?"}:::opus',
    'KEEP(["Keep the bid<br/>and the budget"]):::opus',
    'RAISE(["Raise, priced per added<br/>conversion beside the target"]):::opus',
    'CUT(["Cut, as a campaign under<br/>break-even must"]):::opus',
    'FEW(["Too few to tell,<br/>which is a real answer"]):::opus',
    'WAIT{"Does a test, a question or a<br/>teammate’s change under<br/>{bidHours} hours sit on it?"}:::opus',
    'WAITS(["The change waits, and the<br/>answer names the fix and<br/>what it waits on"]):::opus',
    'SAVE["Code saves one of four verdicts:<br/>good, a problem, too few<br/>to tell, or ask a person"]:::code',
    'WORDS --> SAY',
    'SAY --> KEEP', 'SAY --> RAISE', 'SAY --> CUT', 'SAY --> FEW',
    'RAISE --> WAIT', 'CUT --> WAIT',
    'WAIT -- yes --> WAITS', 'WAIT -- no --> SAVE',
    'WAITS --> SAVE', 'KEEP --> SAVE', 'FEW --> SAVE'
  ],
  links: { WORDS: 'bvwords', FEW: 'bvfew', WAIT: 'bvwait', WAITS: 'bvwait', SAVE: 'bvfour' },
  leaves: {
    bvwords: 'Its instructions',
    bvfew: 'Too few to tell',
    bvwait: 'What waits',
    bvfour: 'Four words, four verdicts'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['bverdict'], kicker: 'What the answers said',
      head: 'None of the five answers read for this map proposed a change, because each one waited on a person or on time',
      visual: { type: 'dots', groups: [[1, 'keep', 'good'], [2, 'wait', 'too few to tell'], [2, 'block', 'a problem']] },
      table: { head: ['Campaign', 'Verdict', 'What it said', 'It waited on'], rows: [
        ['C2 · Brand', 'good', 'keep the $4 ceiling and $15 a day', 'Will’s answer on case 59'],
        ['C2 · Competitor', 'too few to tell', 'keep $10 a day', 'about $500 spent, near Nov 24'],
        ['Bull · Securities', 'too few to tell', 'hold $65 a day', 'Will’s hold until Nov 11'],
        ['Bull · Hedge Funds and PE', 'a problem', 'keep the $15 bid and $45 a day', 'Tyler’s budget call after the review'],
        ['Kogalla · PMax', 'a problem', 'cut', 'Will’s yes on the cut to $16 a day']],
        note: 'The five bid answers of Nov 1 that this map read.' },
      vcap: 'An answer that is too few to tell may propose nothing. A problem must now propose its fix, and say whom or what the fix waits on.' },

    { about: ['bvwords'], kicker: 'Its instructions',
      head: 'Opus gets eight short orders for this module, on top of the rules that every module keeps',
      visual: { type: 'card', title: 'Bid and budget’s instructions, in plain words', fields: [
        ['The verdict', 'Say keep, raise, cut or too few to tell.'],
        ['The cost', 'Give the real cost on the main conversion in each stretch of each target.'],
        ['A raise', 'Price a raise per added conversion from Google’s simulator, beside the target.'],
        ['What holds it back', 'Say if rank or budget holds it back.'],
        ['More or less', 'Say what a set amount more or less would buy, and leave the split between campaigns to Decide.'],
        ['Break-even', 'A campaign under break-even gets a proposed cut.'],
        ['The cap', 'Budget that a campaign does not spend is not money at stake.'],
        ['What waits', 'Read In motion first, because a setting with a test, an open question or a teammate’s change under {bidHours} hours waits.']], stamp: ['Name the fix, and say what it waits on', 'opus'] },
      vcap: 'Each module’s instructions come from what the runs of Oct 31 got wrong. The rules every module keeps come first, such as change nothing, test each number at its source, and never state a guess as fact.' },

    { about: ['bvfew'], kicker: 'Too few to tell',
      head: 'Too few to tell is a real answer, as long as it says what would settle it',
      visual: { type: 'flow', rows: [
        { title: 'C2’s Competitor campaign, answer 53', steps: [['33 clicks in its first 25 days, and no lead', '', 'code'], ['At LA + New York’s October rate, 33 clicks bring about 0.38 conversions', '', 'opus']], end: [['So a zero is normal, and it is too few to tell', 'a cut comes if no lead arrives by about $500 spent', 'opus']] }] },
      vcap: 'The answer named the day, near Nov 24, when about $500 spent with no lead would make a cut right. That is what the next morning tests first.' },

    { about: ['bvwait'], kicker: 'What waits',
      head: 'A change waits while a test, an open question or a teammate’s fresh change sits on the same setting',
      visual: { type: 'flow', rows: [
        { title: 'C2’s Brand campaign, Nov 1', steps: [['Case 59 asks Will about its bid strategy', 'open since Oct 28', 'will']], end: [['Keep, and propose nothing', 'Will’s answer comes first', 'opus']] },
        { title: 'Bull’s Securities campaign, Nov 1', steps: [['Will holds $65 a day until Nov 11', '', 'will'], ['Its landing page was rewritten on Oct 29', 'under {bidHours} hours before', 'code']], end: [['It proposes nothing', 'too few to tell', 'opus']] }] },
      vcap: 'Nothing in code checks the {bidHours} hours, because the facts give each change its day and never its hour. Opus reads In motion and the changes, and it applies the wait itself.' },

    { about: ['bvfour'], kicker: 'Four words, four verdicts',
      head: 'The instructions say keep, raise, cut or too few, but code saves only its own four verdicts',
      visual: { type: 'card', title: 'The five real answers of Nov 1', fields: [
        ['C2’s Brand said keep', 'and it saved as good.'],
        ['C2’s Competitor said keep it at $10 a day', 'and it saved as too few to tell.'],
        ['Bull’s Hedge Funds said keep the $15 bid', 'and it saved as a problem.'],
        ['Kogalla’s PMax said cut', 'and it saved as a problem.'],
        ['Bull’s Securities said too few to tell', 'and it saved as too few to tell.']], stamp: ['No rule ties a word to a verdict', 'wait'] },
      vcap: 'The verdict sets the rules that come after it. A problem must propose its fix, an ask must name whom to ask, and a good verdict cannot stand beside a failure of its bids check.' }
  ],

  examples: {
    WORDS: { tag: 'real', rows: [{ steps: [['Kogalla’s PMax', 'a Google campaign', 'code']], end: [['The eight orders, with no Meta method', '', 'code']] }], note: 'The facts that code gathered for Kogalla’s PMax on Nov 7. A Meta campaign would add Meta’s method.' },
    SAY: { tag: 'real', rows: [{ steps: [['C2’s Brand campaign', '2 conversions at $134 each since Sep 30, both marked good', 'code'], ['What does Opus say?', '', 'opus']], end: [['Keep', '', 'keep']] }], note: 'C2’s answer 52, of Nov 1.' },
    KEEP: { tag: 'real', rows: [{ steps: [['C2’s Brand campaign', '', 'opus']], end: [['Keep the $4 ceiling and $15 a day', 'saved as good', 'keep']] }], note: 'C2’s answer 52, of Nov 1.' },
    RAISE: { tag: 'made', rows: [{ steps: [['C2’s Brand campaign', 'if it keeps losing about 30% of its searches to rank for 2 more weeks', 'code']], end: [['A raise, once Will settles case 59', '', 'opus']] }], note: 'Made from what answer 52 said would prove it wrong. No real bid answer has said raise yet.' },
    CUT: { tag: 'real', rows: [{ steps: [['Kogalla’s PMax', '124% against a 167% break-even', 'block']], end: [['Cut', 'to $16 a day, which already waited on Will', 'opus']] }], note: 'Kogalla’s last answer of Nov 1, as code showed it to Opus on Nov 7.' },
    FEW: { tag: 'real', rows: [{ steps: [['C2’s Competitor campaign', '33 clicks and no lead', 'code']], end: [['Too few to tell', 'keep it at $10 a day', 'wait']] }], note: 'C2’s answer 53, of Nov 1.' },
    WAIT: { tag: 'real', rows: [{ steps: [['C2’s Brand campaign', 'case 59 asks Will about its bid strategy', 'will'], ['Does a question sit on it?', 'yes', 'opus']], end: [['It waits', '', 'wait']] }], note: 'C2’s answer 52, of Nov 1.' },
    WAITS: { tag: 'real', rows: [{ steps: [['Bull’s Securities campaign', 'Will holds $65 a day until Nov 11', 'will']], end: [['It proposes nothing', 'and says what it waits on', 'opus']] }], note: 'Its last answer of Nov 1, as code showed it to Opus on Nov 7.' },
    SAVE: { tag: 'real', rows: [{ steps: [['C2’s Brand campaign', 'Opus says keep', 'opus']], end: [['Saved as good', '', 'keep']] }], note: 'C2’s answer 52, of Nov 1.' }
  },

  reviewed: { self: '35d21692', above: '4bfe1dd5', on: '2026-11-07' }
});
