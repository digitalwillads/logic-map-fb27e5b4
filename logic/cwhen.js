// Nov 8, 2026: plain-words pass (Will: "The client module needs a run that removes robot speak. Please make this
// intelligable"). Only the words changed, and the logic and every fact stayed the same. The module is "the client module",
// never "The client" alone; C2's answer 44 is "C2's test answer"; the brief is "the fact sheet". check-plain.cjs judges it.
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
  title: 'When the client module reads again', short: 'When it reads',
  head: 'The client module reads the account again when the client writes or calls, when the strategy page is blank, or when its last answer is {clientFresh} days old',
  chart: [
    'flowchart TB',
    'NEW["Code looks at what has come<br/>in since the module’s last<br/>real answer"]:::code',
    'TEST(["Or a person tests it,<br/>and no reason is needed"]):::will',
    'WORDS{"Did the client write or call,<br/>and has no run handled it yet?"}:::code',
    'BLANK{"Is the strategy page blank, and<br/>has Will never been asked for it?"}:::code',
    'STALE{"Is the last real answer<br/>{clientFresh} days old, or is there none?"}:::code',
    'DUE(["The module reads the client<br/>today, for the first<br/>reason that fits"]):::opus',
    'NOT(["No reason to read today, so<br/>the last answer still counts"]):::code',
    'WAKE["Texts and Slack messages from<br/>the client do not count yet"]:::next',
    'NEW --> WORDS',
    'WORDS -- yes --> DUE', 'WORDS -- no --> BLANK',
    'BLANK -- yes --> DUE', 'BLANK -- no --> STALE',
    'STALE -- yes --> DUE', 'STALE -- no --> NOT',
    'WAKE -. "not built" .-> WORDS',
    'TEST --> DUE'
  ],
  links: { NEW: 'cwnew', TEST: 'cwtest', WORDS: 'cwwords', BLANK: 'cwblank', STALE: 'cwstale', DUE: 'cwline', WAKE: 'clientwake' },
  leaves: {
    cwnew: 'Only what came in since the last real answer',
    cwtest: 'Today only a person’s test runs it',
    cwwords: 'The client wrote or called',
    cwblank: 'A blank strategy page',
    cwstale: '{clientFresh} days, counted by the calendar in New York',
    cwline: 'Each module that is due gets its own Opus subagent',
    clientwake: { title: 'Which messages from the client should make the module read again?', open: {
      q: 'The plan of Oct 31 says the module reads again “when mail, a call or a Slack message comes in”. But the code makes it read again only for a mail or a recorded call from the client that no run has handled yet. So a Slack message never makes it read again, and neither does a message that Jev found nothing to act on, or one that a run already handled. Which messages from the client should make it read again?',
      since: 'Nov 7',
      opts: [
        ['Keep it as it is, with only a mail or a recorded call that no run has handled yet', false, 'Nothing to build. A thank-you, a Slack message, or a mail that a run already handled must wait for the read every {clientFresh} days.'],
        ['Every mail and recorded call from the client, whatever Jev found in it or a run already did', false, 'Every mail and recorded call would count, but a Slack message would still never make the module read again.'],
        ['Every mail, call and Slack message from the client, as the plan says', true, 'The plan names Slack, and the module’s instructions already send Opus to read Slack. It needs a way for each Slack message to reach the code that picks the modules each morning. Texts cannot count until something sends them to Barbara.']] } }
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['cwhen'], kicker: 'The idea',
      head: 'Three things make the module read the client again, because each one means that what we know about the client may be out of date',
      visual: { type: 'gate', rows: [
        ['The client wrote or called', 'A mail to any team inbox, or a recorded call whose transcript is ready, that no run has handled yet.', 'pass'],
        ['The strategy page is blank', 'Nobody has written down what the client wants, and Will was never asked for it.', 'pass'],
        ['The last real answer is {clientFresh} days old', 'Or there is no real answer at all, because a test’s answer does not count.', 'pass']],
        end: ['Code gives the first reason that fits', 'code'] },
      vcap: 'An alert, a change, a follow-up or a target never makes the client module read again, because those are news about the ads. KDX on Nov 7 had no answer yet and no new word from Kevin, so the third reason alone would make the module read it.' },
    { about: ['cwhen'], kicker: 'Each module has its own reasons',
      head: 'Each module about the whole account reads again on its own kind of news, and only the client module reads again on the client’s words',
      visual: { type: 'flow', rows: [
        { title: 'The client module', steps: [['A mail or a recorded call from the client that no run has handled yet', 'or a blank strategy page that Will was never asked for', 'will']], end: [['The client module reads again', '', 'opus']] },
        { title: 'Tracking', steps: [['A leads alert, or a week that turned worse', 'or a follow-up of a tracking change', 'code']], end: [['Tracking reads again', '', 'code']] },
        { title: 'Setup and market', steps: [['A person’s change, or an alert', 'that names no campaign', 'code']], end: [['Setup and market reads again', '', 'code']] }] },
      vcap: 'With no news, each one still reads again every {clientFresh} days, counted by the calendar in New York. If code cannot read the new items one morning, only that last reason is left, so each module with an old answer reads again.' },
    { about: ['cwhen'], kicker: 'Two reasons on one morning',
      head: 'The module reads the client only once a morning, even when more than one reason fits',
      visual: { type: 'flow', rows: [
        { steps: [['The client wrote', 'and the strategy page is blank', 'code'], ['Code gives “the client wrote or called” as the reason', 'because the first reason wins', 'code']], end: [['The run still drafts the page from the answer', 'because the page is blank', 'code']] }] },
      vcap: 'Code adds the draft to the run’s work whenever the page is blank, whichever reason it gave. Either way, one Opus subagent reads the client.' },

    { about: ['cwnew'], kicker: 'Only what is new',
      head: 'Only what came in since the module’s last real answer can make it read again, and a test does not count as a real answer',
      visual: { type: 'flow', rows: [
        { title: 'Counts', steps: [['An answer from a real morning run', '', 'code']], end: [['Only news after it counts', '', 'keep']] },
        { title: 'Counts', steps: [['An answer from a person’s own session', 'with no run behind it', 'code']], end: [['Only news after it counts', '', 'keep']] },
        { title: 'Does not count', steps: [['An answer from a test or a dry run', 'nobody acted on it', 'code']], end: [['As if the module never answered', '', 'wait']] }] },
      vcap: 'C2’s only answer came from a test on Nov 1, so a live morning would treat C2 as never answered, and everything new would count. The modules that need the client module’s answer still use that test answer, because they accept any answer under {clientFresh} days old.' },
    { about: ['cwnew'], kicker: 'What Opus sees first',
      head: 'The same new items open the fact sheet that code gives Opus, so Opus sees what changed since the last answer',
      visual: { type: 'dots', groups: [[2, 'will', 'messages from the client, Waylon’s mails of Nov 4 and Nov 7'], [5, 'code', 'changes to the account, by Isaac or with no record of who made them'], [9, 'next', 'did not fit, so the list ends with “And 9 more.”']] },
      vcap: 'This is C2’s list on Nov 7. Code cuts each item at {clientItem} characters and the whole list at {clientNew}, so the rest shows only as a count. An item about a case goes only to the Decide module. With no answer yet, the list covers the last {clientFresh} days.' },

    { about: ['cwtest'], kicker: 'Today',
      head: 'Today the module runs only when a person tests it, and a test changes nothing',
      visual: { type: 'flow', rows: [
        { title: 'In Barbara, under Validators and then Modules', steps: [['A person picks this module and one client', '', 'will'], ['One Opus subagent reads the whole account', 'no other module runs first, because it needs none', 'opus']], end: [['One answer', 'it does not count as a real answer, so the module is still due', 'code']] },
        { title: 'C2, Nov 1', steps: [['A test of the client module', '', 'will'], ['Opus reads the mail, the calls and the texts', '', 'opus']], end: [['C2’s test answer', 'a problem', 'block']] }] },
      vcap: 'A test needs no reason. Its first instruction tells Opus to change nothing, call no change tool and send nothing. Every answer this module has written came from a test, because the morning module run is off in live.' },

    { about: ['cwwords'], kicker: 'Messages no run has handled',
      head: 'A mail or call from the client makes the module read again until a run handles it, unless Jev finds nothing in it to act on',
      visual: { type: 'flow', rows: [
        { title: 'Something to act on, but not today', steps: [['Jev opens a case for it', '', 'code'], ['No run has handled it yet', '', 'code']], end: [['The module reads the client again', '', 'opus']] },
        { title: 'Something to act on today', steps: [['Jev starts a run, or adds it to a run', '', 'code']], end: [['That run handles it, so the module does not read again for it', '', 'wait']] },
        { title: 'Nothing to act on', steps: [['A thank-you, or a sender that we always skip', 'Jev does nothing with it', 'code']], end: [['Done, so the module does not read again for it', '', 'wait']] }] },
      vcap: 'A mail counts when it lands in the Primary tab of any team inbox, and a call counts once its transcript is ready. A message that does not count waits for the read every {clientFresh} days, and Opus reads the newest mail itself then anyway.' },
    { about: ['cwwords'], kicker: 'A real message',
      head: 'Nobody has dealt with Waylon’s mail of Nov 4, so the module would read C2 again the next time it runs for real',
      visual: { type: 'flow', rows: [
        { steps: [['Waylon, Nov 4, 4:43 PM', '“Wow so what does this mean? Non ads conversion?”', 'will'], ['No run has handled it', '', 'code'], ['No real answer since', 'because C2’s only answer was a test', 'code']], end: [['The module would read C2 again, because Waylon wrote', '', 'opus']] }] },
      vcap: 'He was answering Isaac’s note of Nov 2 about a lead that came from Google with no ad. C2’s fact sheet of Nov 7 lists his mail as new, but no morning has run, because the module run is off in live.' },

    { about: ['cwblank'], kicker: 'A blank strategy page',
      head: 'A blank strategy page makes the module read the client every morning, until Will has been asked for the page once',
      visual: { type: 'flow', rows: [
        { title: 'Blank, and Will was never asked', steps: [['A new item each morning', 'dated that morning', 'code']], end: [['The module reads the client, and the run drafts the page', '', 'opus']] },
        { title: 'Blank, but Will was asked once', steps: [['No item', 'code’s note says the weekly full run tries again', 'code']], end: [['But no weekly full run comes while module runs are on', '', 'block']] },
        { title: 'A page is written', steps: [['No item', '', 'code']], end: [['Not this reason', '', 'code']] }] },
      vcap: 'On Nov 1 C2’s page was blank, but case #210 had already asked Will to approve a draft, so the blank page started nothing. Will has since written C2’s page himself.' },

    { about: ['cwstale'], kicker: '{clientFresh} days',
      head: 'The module counts calendar days in New York, so an answer never runs out in the middle of a morning',
      visual: { type: 'timeline', items: [
        ['A Wednesday, 7:30 AM', 'The client module answers.'],
        ['The next Wednesday, 7:00 AM', 'Only 6 days and 23.5 hours have passed, but {clientFresh} calendar days have passed in New York, so the module reads the client again.'],
        ['That morning, 8:00 AM', 'The campaign modules use the new answer. Counted by the hour, the module would have skipped the read at 7:00, the old answer would have run out at 7:30, and the campaign modules would have had to wait.']] },
      vcap: 'Code picks the modules each morning by calendar days, and the modules after it count an answer’s age the same way. Counting by the hour once made every module wait. On Nov 7, KDX had no answer yet. Kevin had sent nothing new and KDX’s page was written, so the only reason to read KDX was that it had no answer.' },

    { about: ['cwline'], kicker: 'Its own Opus',
      head: 'Each morning, each module that is due gets its own Opus subagent, which reads that module’s fact sheet and writes that module’s answer',
      visual: { type: 'card', title: 'What the client module’s subagent is told, on C2', fields: [
        ['The module', 'The client module'],
        ['On', 'the whole account'],
        ['It reads', 'the fact sheet that code made for C2, and then follows it'],
        ['When', 'early in the morning, at the same time as Tracking and Setup and market'],
        ['Its model', 'the run’s own model, which is Opus'],
        ['What it may write', 'only its one answer, so it changes nothing']],
        stamp: ['One subagent, never a fork', 'opus'] },
      vcap: 'The run itself never reads the client’s mail. It reads only the saved answers, and on a quiet morning it starts no subagent at all.' },

    { about: ['clientwake'], kicker: 'A question for Will',
      head: 'The plan of Oct 31 has the module read again on Slack messages too, but the code reads again only on a mail or a call that no run has handled',
      visual: { type: 'flow', rows: [
        { title: 'The plan of Oct 31', steps: [['Mail, a call or a Slack message comes in', '', 'will']], end: [['The client module reads again', '', 'opus']] },
        { title: 'The code today', steps: [['A mail or a recorded call from the client', 'unless a run handled it, or Jev found nothing in it to act on', 'code']], end: [['The client module reads again', '', 'opus']] },
        { title: 'Not built', steps: [['A text from the client', 'no text reaches Barbara yet', 'next']], end: [['It waits for the read every {clientFresh} days', '', 'next']] },
        { steps: [['A Slack message from the client', 'nothing sends Slack messages to the code that picks the modules', 'next']], end: [['It waits for the read every {clientFresh} days', '', 'next']] }] },
      vcap: 'In C2’s test, Opus found Waylon’s newest words in texts of Oct 30 that nothing else had seen. Of the six test clients, 5 have a Slack channel on their record.',
      open: 'clientwake' }
  ],

  examples: {
    NEW: { tag: 'real', rows: [{ steps: [['C2, Nov 7', 'everything new since the test answer of Nov 1', 'code'], ['Waylon’s mails of Nov 4 and Nov 7', 'and changes to the account by Isaac or with no record of who made them', 'code']], end: [['7 items shown, then “And 9 more.”', '', 'code']] }], note: 'C2’s fact sheet of Nov 7 lists the same new items that a live morning would.' },
    TEST: { tag: 'real', rows: [{ steps: [['C2, Nov 1', 'a person tests the client module', 'will'], ['One Opus subagent reads the whole account', 'no reason needed', 'opus']], end: [['C2’s test answer', 'a problem', 'block']] }], note: 'A test changes nothing, and its answer does not count as a real answer, so the module is still due.' },
    WORDS: { tag: 'made', rows: [{ steps: [['Waylon, Nov 4, 4:43 PM', '“Wow so what does this mean? Non ads conversion?”', 'will'], ['A mail from the client that no run has handled', '', 'code']], end: [['The module reads the client again', '', 'opus']] }], note: 'The mail is real, and C2’s fact sheet of Nov 7 lists it as new. No morning run took this path, because the module run is off in live.' },
    BLANK: { tag: 'made', rows: [{ steps: [['C2, Nov 1', 'the page is blank, and case #210 asks Will to approve a draft', 'code'], ['Was Will never asked?', 'no, he was asked', 'code']], end: [['Code adds nothing, so the blank page is not the reason', '', 'code']] }], note: 'The facts come from C2’s test answer of Nov 1. No module run looked at them, because module runs began on Nov 4.' },
    STALE: { tag: 'made', rows: [{ steps: [['KDX, Nov 7', '“You have no answer here yet.”', 'code'], ['No mail or call from Kevin since Aug 27', 'and the page is written', 'code']], end: [['The module reads KDX, because there is no answer', '', 'opus']] }], note: 'The facts come from KDX’s fact sheet of Nov 7, but no live morning has run the module yet.' },
    DUE: { tag: 'made', rows: [{ steps: [['C2, on a morning when no run has handled Waylon’s mail', '', 'code'], ['Code gives the first reason', 'the client wrote or called', 'code']], end: [['One Opus subagent reads the whole account', '', 'opus']] }], note: 'Made up from C2’s real items of Nov 7. No live morning has run the module yet.' },
    NOT: { tag: 'made', rows: [{ steps: [['An answer from yesterday’s real run', '', 'code'], ['No new mail or call, and the page is written', '', 'code']], end: [['No reason to read today, so that answer still counts', '', 'code']] }], note: 'Made up from code’s own test of a quiet morning, because no live morning has run.' },
    WAKE: { tag: 'plan', rows: [{ steps: [['Waylon’s texts in the C2 Ads group', 'Oct 30, 3:59 to 5:01 PM ET', 'next'], ['No text reaches Barbara', 'nothing sends texts there yet', 'next']], end: [['A text would make the module read again', '', 'next']] }], note: 'Not built. C2’s test read those texts on Will’s computer, and Slack messages cannot make the module read again yet either.' }
  },

  reviewed: { self: '38166a55', above: 'f4196f57', on: '2026-11-08' }
});
