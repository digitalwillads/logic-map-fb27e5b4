// When The client reads the account again: comm-chat src/modules/day.rs `reason` (108-156). For The client only three
// reasons can fit, in this order: the client's words (:118, ItemKind::Words, a trigger event of kind mail, meeting or text
// that still waits, src/triggers/morning.rs:66-82, :184-186, :211-223), the blank strategy page (:121; morning.rs:458-460,
// src/results/strategy_case.rs:75-81), and no answer that stands from the last 7 New York days (:155; store.rs:129-135).
// Only what came after its newest answer that stands counts (:113-114); a dry run's or a module test's answer does not stand
// (`stands`, :241-252; src/claude_code_jobs.rs:1470 reads a test as a dry run). A blank page adds the draft to the case work
// (:275-278, STRATEGY_WORK). A failed morning read leaves only the 7 days (:263-272). The morning's line: day.rs `text`
// (193-224), brief/mod.rs `subagent_line` (340-345). A test: brief/mod.rs `test_prompt` (347-384), src/modules_api.rs:204-236
// (The client needs no other answer, so a test runs it alone). Not built: no text reaches Barbara (src/triggers/kinds.rs:181),
// and no trigger kind is Slack (kinds.rs:9-24). The modules plan of Oct 31 (~/.agent/diagrams/modules-plan-2026-10-31-
// slides.html): "When mail, a call or a Slack message comes in, or 7 days pass." Real items, read 2026-11-07: the facts that
// code gathered for The client on C2 and KDX; get_client_info of the six test clients (Slack channels). Old parts:
// retired/2026-11-07-client-redo/clientdue.js, and client.js (its morning line and its test).
LOGIC.flow({
  id: 'cwhen', parent: 'client',
  title: 'When The client reads again', short: 'When it reads',
  head: 'The client reads the account again when the client writes or calls, when the strategy page is blank, or when its answer is {clientFresh} days old',
  chart: [
    'flowchart TB',
    'NEW["Code reads what came in since<br/>its last answer that stands"]:::code',
    'TEST(["Or a person tests it, and<br/>code asks for no reason"]):::will',
    'WORDS{"Did the client write or call,<br/>in a message that still waits?"}:::code',
    'BLANK{"Is the strategy page blank,<br/>with Will never asked for it?"}:::code',
    'STALE{"Is its last answer that stands<br/>{clientFresh} days old, or is there none?"}:::code',
    'DUE(["It reads the client today,<br/>with the first reason that fits"]):::opus',
    'NOT(["Not today, so its<br/>last answer stands"]):::code',
    'WAKE["Not built: a text or a Slack<br/>message from the client"]:::next',
    'NEW --> WORDS',
    'WORDS -- yes --> DUE', 'WORDS -- no --> BLANK',
    'BLANK -- yes --> DUE', 'BLANK -- no --> STALE',
    'STALE -- yes --> DUE', 'STALE -- no --> NOT',
    'WAKE -. "not built" .-> WORDS',
    'TEST --> DUE'
  ],
  links: { NEW: 'cwnew', TEST: 'cwtest', WORDS: 'cwwords', BLANK: 'cwblank', STALE: 'cwstale', DUE: 'cwline', WAKE: 'clientwake' },
  leaves: {
    cwnew: 'Only what is new counts',
    cwtest: 'Today a person tests it',
    cwwords: 'The client wrote or called',
    cwblank: 'A blank strategy page',
    cwstale: '{clientFresh} days, counted in New York days',
    cwline: 'One line for one subagent',
    clientwake: { title: 'Which client words should wake it?', open: {
      q: 'The plan of Oct 31 says The client reads again “when mail, a call or a Slack message comes in”. But code wakes it only for a mail or a recorded call from the client that still waits, so a Slack message never wakes it, and neither does a message that Jev read as no ask or that a run already took. Which client words should wake it?',
      since: 'Nov 7',
      opts: [
        ['Keep it as it is, with a mail or a recorded call that still waits', false, 'Nothing to build. A thank-you, a Slack message, or a mail that a run already took waits for the {clientFresh}-day read.'],
        ['Every mail and recorded call from the client, whatever Jev read or a run already did', false, 'One rule of the morning’s read changes, but a Slack message still never wakes it.'],
        ['Every mail, call and Slack message from the client, as the plan says', true, 'The plan names Slack, and the module’s instructions already send Opus to read Slack. It needs a way for each Slack message to reach the morning’s read. Texts wait until the Switchboard sends them.']] } }
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['cwhen'], kicker: 'The idea',
      head: 'Three things make The client read again, because each one means that what we know of the client may be out of date',
      visual: { type: 'gate', rows: [
        ['The client wrote or called', 'A mail to any team inbox, or a recorded call whose transcript is ready, that no run has taken yet.', 'pass'],
        ['The strategy page is blank', 'Nobody has written down what the client wants, and Will was never asked for it.', 'pass'],
        ['Its last answer is {clientFresh} days old', 'Or it has no answer at all, because a test’s answer does not count.', 'pass']],
        end: ['The first reason that fits names the line', 'code'] },
      vcap: 'No alert, change, follow-up or target ever wakes The client, because those are news about the ads. KDX on Nov 7 had no answer yet and no new word from Kevin, so the third reason alone would wake it.' },
    { about: ['cwhen'], kicker: 'Each account module',
      head: 'Each account module wakes on its own news, and only The client wakes on the client’s words',
      visual: { type: 'flow', rows: [
        { title: 'The client', steps: [['A mail or a recorded call from the client that still waits', 'or a blank strategy page that Will was never asked for', 'will']], end: [['The client reads again', '', 'opus']] },
        { title: 'Tracking', steps: [['A leads alert, or a week that turned worse', 'or a follow-up of a tracking change', 'code']], end: [['Tracking reads again', '', 'code']] },
        { title: 'Setup and market', steps: [['A person’s change or an alert', 'that names no campaign', 'code']], end: [['Setup and market reads again', '', 'code']] }] },
      vcap: 'With no news, each one still reads once in {clientFresh} New York days. When the morning’s read of new items fails, only that last reason is left, so each module with an old answer reads again.' },
    { about: ['cwhen'], kicker: 'Two reasons, one line',
      head: 'When two reasons fit on one morning, the line names the first one, and a blank page still gets its draft',
      visual: { type: 'flow', rows: [
        { steps: [['The client wrote', 'and the strategy page is blank', 'code'], ['The line says the client wrote or called', 'because the first reason wins', 'code']], end: [['The run still drafts the page from the answer', 'because the page is blank', 'code']] }] },
      vcap: 'Code adds the draft to the run’s case work whenever the page is blank, whatever reason names the line. Either way one subagent reads the client.' },

    { about: ['cwnew'], kicker: 'Only what is new',
      head: 'Only news that came after its last answer that stands can wake it, and a test’s answer does not stand',
      visual: { type: 'flow', rows: [
        { title: 'Counts', steps: [['An answer from a real morning run', '', 'code']], end: [['Only news after it counts', '', 'keep']] },
        { title: 'Counts', steps: [['An answer from a person’s own session', 'with no run behind it', 'code']], end: [['Only news after it counts', '', 'keep']] },
        { title: 'Does not count', steps: [['An answer from a dry run or a module test', 'nobody carried it out', 'code']], end: [['As if The client never answered', '', 'wait']] }] },
      vcap: 'C2’s answer 44 came from a module test on Nov 1, so a live morning would read C2 as never answered, and every item of the morning’s read would count as new. The modules that need The client still read answer 44, because their wait counts any answer under {clientFresh} days.' },
    { about: ['cwnew'], kicker: 'What is new, in the facts',
      head: 'The same news also opens the facts that Opus gets, so it sees what changed since its last answer',
      visual: { type: 'dots', groups: [[2, 'will', 'the client’s words, Waylon’s mails of Nov 4 and Nov 7'], [5, 'code', 'account changes, by Isaac or with no record of who'], [9, 'next', 'did not fit, so the list ends with “And 9 more.”']] },
      vcap: 'This is C2’s list of Nov 7. Each item is cut at {clientItem} characters and the whole list at {clientNew}, so the rest shows only as a count. An item about a case goes to Decide alone, and with no answer yet the list reads the last {clientFresh} days.' },

    { about: ['cwtest'], kicker: 'Today',
      head: 'Today a person starts every run of The client, as a test that changes nothing',
      visual: { type: 'flow', rows: [
        { title: 'Validators, then Modules, on one client', steps: [['A person picks this module and one client', '', 'will'], ['One subagent on the whole account', 'no other module first, because it needs none', 'opus']], end: [['One answer', 'it does not stand, so the module stays due', 'code']] },
        { title: 'C2, Nov 1', steps: [['A test of The client', '', 'will'], ['Opus reads the mail, the calls and the texts', '', 'opus']], end: [['Answer 44', 'a problem', 'block']] }] },
      vcap: 'A test asks for no reason. Its opening tells Opus to change nothing, call no change tool and send nothing. Every real answer of this module came from a test, because the morning’s module run stays off in live.' },

    { about: ['cwwords'], kicker: 'What still waits',
      head: 'A client’s mail or call counts until a run takes it, unless Jev read no ask in it',
      visual: { type: 'flow', rows: [
        { title: 'An ask that can wait', steps: [['Jev opens a case for it', '', 'code'], ['The message still waits', '', 'code']], end: [['It wakes The client', '', 'opus']] },
        { title: 'An ask for today', steps: [['Jev starts a run or joins one', '', 'code']], end: [['Taken by that run, so it wakes nothing', '', 'wait']] },
        { title: 'No ask', steps: [['A thank-you, or a sender on the list', 'Jev does nothing with it', 'code']], end: [['Done, so it wakes nothing', '', 'wait']] }] },
      vcap: 'A mail counts when it lands in the Primary tab of any team inbox, and a call counts once its transcript is ready. A message that wakes nothing waits for the {clientFresh}-day read, when Opus reads the newest mail itself anyway.' },
    { about: ['cwwords'], kicker: 'A real message · C2 · Nov 4',
      head: 'Waylon’s mail of Nov 4 still waits, so a live morning would read C2 again',
      visual: { type: 'flow', rows: [
        { steps: [['Waylon, Nov 4, 4:43 PM', '“Wow so what does this mean? Non ads conversion?”', 'will'], ['It still waits', 'no run has taken it', 'code'], ['Since the last answer that stands', 'there is none, because answer 44 was a test', 'code']], end: [['It wakes The client, because the client wrote', '', 'opus']] }] },
      vcap: 'He was answering Isaac’s note of Nov 2 about a lead that came from Google with no ad. C2’s facts of Nov 7 list it as new, but no morning has run, because the module run stays off in live.' },

    { about: ['cwblank'], kicker: 'A blank strategy page',
      head: 'A blank strategy page wakes The client every morning, until Will has been asked for it once',
      visual: { type: 'flow', rows: [
        { title: 'Blank, and Will was never asked', steps: [['A new item each morning', 'dated that morning', 'code']], end: [['It wakes The client, and the run drafts the page', '', 'opus']] },
        { title: 'Blank, but Will was asked once', steps: [['No item', 'code’s note says the weekly full run tries again', 'code']], end: [['No weekly full run comes while module runs are on', '', 'block']] },
        { title: 'A page is written', steps: [['No item', '', 'code']], end: [['Not this reason', '', 'code']] }] },
      vcap: 'On Nov 1 C2’s page was blank, but case #210 had already asked Will to approve a draft, so the page woke nothing. C2’s page is Will’s now.' },

    { about: ['cwstale'], kicker: '{clientFresh} days',
      head: 'It counts New York days, so an answer never turns old in the middle of a morning',
      visual: { type: 'timeline', items: [
        ['A Wednesday, 7:30 AM', 'The client answers.'],
        ['The next Wednesday, 7:00 AM', 'It is 6 days and 23.5 hours later, but {clientFresh} New York days have passed, so the morning’s list reads the client again.'],
        ['That morning, 8:00 AM', 'The campaign modules read the new answer. Counted by the hour, the old one would have turned old an hour after the list, and they would have waited.']] },
      vcap: 'The morning’s list and the modules that need an answer count the same New York days, because counting by the hour once made every module wait. KDX on Nov 7 had no answer yet, no new word from Kevin and a written page, so this reason alone would wake it.' },

    { about: ['cwline'], kicker: 'One line, one subagent',
      head: 'The morning’s list gives The client one line, and that line is the whole prompt of one subagent',
      visual: { type: 'card', title: 'The line for The client, on C2', fields: [
        ['The module', 'The client'],
        ['On', 'the whole account'],
        ['It reads', 'the facts that code gathered for C2, then follows them'],
        ['When', 'in the first step, at the same time as Tracking and Setup and market'],
        ['Its model', 'the run’s own, which is Opus'],
        ['What it may write', 'only its one answer, so it changes nothing']],
        stamp: ['One subagent, never a fork', 'opus'] },
      vcap: 'The run itself never reads the client’s mail. It reads the saved answers, and a quiet morning starts no subagent at all.' },

    { about: ['clientwake'], kicker: 'A question for Will',
      head: 'The plan of Oct 31 wakes The client on Slack too, but code wakes it only on a mail or a call that still waits',
      visual: { type: 'flow', rows: [
        { title: 'The plan of Oct 31', steps: [['Mail, a call or a Slack message comes in', '', 'will']], end: [['The client reads again', '', 'opus']] },
        { title: 'Code today', steps: [['A mail or a recorded call from the client', 'unless a run took it, or Jev read no ask in it', 'code']], end: [['The client reads again', '', 'opus']] },
        { title: 'Not built', steps: [['A text from the client', 'no text reaches Barbara yet', 'next']], end: [['It waits for the {clientFresh}-day read', '', 'next']] },
        { steps: [['A Slack message from the client', 'nothing sends Slack to the morning’s read', 'next']], end: [['It waits for the {clientFresh}-day read', '', 'next']] }] },
      vcap: 'Answer 44 found Waylon’s newest words in texts of Oct 30 that nothing had seen. Of the six test clients, 5 have a Slack channel on their record.',
      open: 'clientwake' }
  ],

  examples: {
    NEW: { tag: 'real', rows: [{ steps: [['C2, Nov 7', 'everything new since answer 44', 'code'], ['Waylon’s mails of Nov 4 and Nov 7', 'and account changes by Isaac or with no record of who', 'code']], end: [['7 items shown, and “And 9 more.”', '', 'code']] }], note: 'The facts that code gathered for C2 on Nov 7 make the same read as the morning’s list.' },
    TEST: { tag: 'real', rows: [{ steps: [['C2, Nov 1', 'a person tests The client', 'will'], ['One subagent on the whole account', 'no reason asked', 'opus']], end: [['Answer 44', 'a problem', 'block']] }], note: 'A test changes nothing, and its answer does not stand, so the module stays due.' },
    WORDS: { tag: 'made', rows: [{ steps: [['Waylon, Nov 4, 4:43 PM', '“Wow so what does this mean? Non ads conversion?”', 'will'], ['A mail from the client that still waits', '', 'code']], end: [['It wakes The client', '', 'opus']] }], note: 'The mail is real, and C2’s facts of Nov 7 list it as new. No morning run took this path, because the module run stays off in live.' },
    BLANK: { tag: 'made', rows: [{ steps: [['C2, Nov 1', 'the page is blank, and case #210 asks Will to approve a draft', 'code'], ['Was Will never asked?', 'no, he was asked', 'code']], end: [['No item, so not this reason', '', 'code']] }], note: 'The facts are from answer 44. No module run read them, because module runs began on Nov 4.' },
    STALE: { tag: 'made', rows: [{ steps: [['KDX, Nov 7', '“You have no answer here yet.”', 'code'], ['No mail or call from Kevin since Aug 27', 'and the page is written', 'code']], end: [['It reads KDX, because it has no answer', '', 'opus']] }], note: 'The facts that code gathered for KDX on Nov 7. No morning run took this path.' },
    DUE: { tag: 'made', rows: [{ steps: [['C2, a morning with Waylon’s mail waiting', '', 'code'], ['The line names the first reason', 'the client wrote or called', 'code']], end: [['One subagent reads the whole account', '', 'opus']] }], note: 'Made from C2’s real items of Nov 7. No live morning has run the module yet.' },
    NOT: { tag: 'made', rows: [{ steps: [['An answer from yesterday’s real run', '', 'code'], ['No new mail or call, and the page is written', '', 'code']], end: [['Not today, so that answer stands', '', 'code']] }], note: 'Made from code’s own test of a quiet morning, because no live morning has run.' },
    WAKE: { tag: 'plan', rows: [{ steps: [['Waylon’s texts in the C2 Ads group', 'Oct 30, 3:59 to 5:01 PM ET', 'next'], ['No text reaches Barbara', 'the Switchboard sends none yet', 'next']], end: [['A text would wake The client', '', 'next']] }], note: 'Not built. Answer 44 read those texts on Will’s computer, and no Slack source is built either.' }
  },

  reviewed: { self: '9ca53b98', above: 'a94aa4ce', on: '2026-11-07' }
});
