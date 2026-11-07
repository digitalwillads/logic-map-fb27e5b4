// When is The client due? comm-chat src/modules/day.rs: reason() (110-156) takes the first reason that fits, staleness
// last; for The client only WORDS (118), STRATEGY (121) and STALE (155) can fit. The items come from the morning gate
// (src/triggers/morning.rs: Words = a trigger event of kind mail, meeting or text that still waits, 66-82, 211-223;
// the blank page item, 458-460, from results/strategy_case.rs:75-81). stands() (day.rs:244-252) drops a rehearsal's
// answer. Will's plan of Oct 31 (~/.agent/diagrams/modules-plan-2026-10-31-slides.html): "When mail, a call or a Slack
// message comes in, or 7 days pass."
LOGIC.flow({
  id: 'clientdue', parent: 'client',
  title: 'When is it due?', short: 'When due?',
  head: 'The client is due when the client wrote or called, the strategy page is blank, or {clientFresh} days pass',
  chart: [
    'flowchart TB',
    'IN["The morning gate’s items: what<br/>came in since the client’s<br/>last finished run"]:::code',
    'STANDS{"Did its newest answer<br/>come from a real run?"}:::code',
    'WORDS{"A mail or a call from<br/>the client since then,<br/>still waiting?"}:::code',
    'BLANK{"A blank strategy page<br/>Will was never asked for?"}:::code',
    'STALE{"No answer from the last<br/>{clientFresh} New York days?"}:::code',
    'DW(["Due: the client<br/>wrote or called"]):::code',
    'DB(["Due: the strategy page<br/>is blank. The main thread<br/>drafts it after"]):::code',
    'DS(["Due: no answer from<br/>the last {clientFresh} days"]):::code',
    'NOT(["Not due today"]):::code',
    'WAKE["Not built: a text or a<br/>Slack message from the<br/>client wakes it"]:::next',
    'IN --> STANDS',
    'STANDS -- "yes: count<br/>from its time" --> WORDS',
    'STANDS -- "no: count every<br/>item; it is stale" --> WORDS',
    'WORDS -- yes --> DW', 'WORDS -- no --> BLANK',
    'BLANK -- yes --> DB', 'BLANK -- no --> STALE',
    'STALE -- yes --> DS', 'STALE -- no --> NOT',
    'WAKE -.-> WORDS'
  ],
  links: { STANDS: 'clientstands', WORDS: 'clientwords', BLANK: 'clientblank', STALE: 'clientstale', WAKE: 'clientwake' },
  leaves: {
    clientstands: 'Does its newest answer count?',
    clientwords: 'A mail or a call from the client?',
    clientblank: 'A blank strategy page?',
    clientstale: 'No answer from the last {clientFresh} days?',
    clientwake: { title: 'Which client words should wake it?', open: {
      q: 'The modules plan of Oct 31 runs The client “when mail, a call or a Slack message comes in”. Code wakes it only for a client’s mail or recorded call that still waits: no Slack, and no message that Jev read as no ask or that started its own run. Which client words should wake it?',
      since: 'Nov 7',
      opts: [
        ['As now: a mail or a recorded call that still waits', false, 'Nothing to build. A thank-you, a Slack message or a mail that started its own run waits for the {clientFresh}-day run.'],
        ['Every mail and recorded call from the client, whatever Jev read or a trigger run did', false, 'One rule in the morning gate changes. Slack still does not count.'],
        ['Every mail, call and Slack message from the client, as the plan says', true, 'The plan names Slack, and the words already send Opus to Slack. It needs a Slack source in the morning gate. Texts wait for the Switchboard.']] } }
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each box.
  deck: [
    { about: ['clientdue'], kicker: 'Three account modules',
      head: 'Each account module wakes on its own items; The client wakes only on the client’s words and a blank page',
      visual: { type: 'flow', rows: [
        { title: 'The client', steps: [['A client’s mail or recorded call', 'that still waits', 'will'], ['A blank strategy page', 'Will never asked', 'will']], end: [['The client is due', '', 'opus']] },
        { title: 'Tracking', steps: [['A leads alert, a Worse week', 'or a tracking follow-up', 'code']], end: [['Tracking is due', '', 'code']] },
        { title: 'Setup and market', steps: [['A person’s change or an alert', 'that names no campaign', 'code']], end: [['Setup is due', '', 'code']] }] },
      vcap: 'No alert, change, follow-up, search or target names The client. With no reason, each one still runs once in {clientFresh} New York days. A failed gate read leaves only that reason.' },
    { about: ['clientdue'], kicker: 'The line and the draft',
      head: 'The reason only names the line; a blank page still gets its draft',
      visual: { type: 'flow', rows: [
        { title: 'One morning, two reasons', steps: [['The client wrote', 'and the page is blank', 'code'], ['The line', '“the client wrote or called”: the first reason wins', 'code']], end: [['Case work: “No strategy page yet: draft it from The client’s answer”', 'added because the page is blank', 'code']] }] },
      vcap: 'Code adds the draft to the case work whenever the blank-page item is there, whatever reason names the line. Either way one subagent answers.' },

    { about: ['clientstands'], kicker: 'Does its newest answer count?',
      head: 'A rehearsal’s answer does not keep The client from being due',
      visual: { type: 'flow', rows: [
        { title: 'Counts', steps: [['An answer from a real run', '', 'code']], end: [['Its time starts the clock', '', 'keep']] },
        { title: 'Counts', steps: [['An answer from a person’s own session', 'no run behind it', 'code']], end: [['Its time starts the clock', '', 'keep']] },
        { title: 'Does not count', steps: [['An answer from a dry run or a module test', 'nobody carried it out', 'code']], end: [['As if The client never answered', '', 'wait']] }] },
      vcap: 'C2’s answer 44 came from a module test on Nov 1, so a live morning reads C2 as never answered. The campaign modules still read answer 44: their wait counts any answer under {clientFresh} days.' },
    { about: ['clientwords'], kicker: 'What still waits',
      head: 'A client’s message counts only while no run has it and Jev read an ask in it',
      visual: { type: 'flow', rows: [
        { title: 'An ask that can wait', steps: [['Jev opens a case', '', 'code'], ['The message still waits', '', 'code']], end: [['An item: The client is due', '', 'opus']] },
        { title: 'An ask for today', steps: [['Jev starts or joins a run', 'that run does only its own line', 'code']], end: [['Done: no item', '', 'wait']] },
        { title: 'No ask', steps: [['A thank-you, or a sender on the list', 'Jev does nothing', 'code']], end: [['Done: no item', '', 'wait']] }] },
      vcap: 'A mail counts from any team inbox’s Primary tab; a call counts when its transcript is ready. A done message waits for the {clientFresh}-day run, which reads the newest mail itself.' },
    { about: ['clientwords'], kicker: 'A real message · C2 · Nov 4',
      head: 'Waylon’s mail of Nov 4 still waits, so a morning run would be due',
      visual: { type: 'flow', rows: [{ steps: [['Waylon, Nov 4, 4:43 PM', '“Wow so what does this mean? Non ads conversion?”', 'will'], ['Still waiting', 'no run has it', 'code'], ['Since the last answer that counts', 'none: answer 44 was a test', 'code']], end: [['Due: the client wrote or called', '', 'opus']] }] },
      vcap: 'It answers Isaac’s note of Nov 2 about an organic lead. C2’s brief of Nov 7 lists it under “New since then”. No morning has run: live keeps module runs off.' },
    { about: ['clientblank'], kicker: 'A blank strategy page?',
      head: 'A blank page wakes The client each morning, until Will is asked once',
      visual: { type: 'flow', rows: [
        { title: 'Blank, Will never asked', steps: [['A new item each morning', 'its time is the morning itself', 'code']], end: [['Due, and the main thread drafts the page', '', 'opus']] },
        { title: 'Blank, Will was asked once', steps: [['No item', 'code’s note: the weekly full run tries again', 'code']], end: [['No full run comes while module runs are on', '', 'next']] },
        { title: 'A page is set', steps: [['No item', '', 'code']], end: [['Not this reason', '', 'code']] }] },
      vcap: 'C2 on Nov 1: the page was blank, but case 210 had asked Will to approve a draft, so the page made no item. C2’s page is set now, by Will.' },
    { about: ['clientstale'], kicker: 'No answer from the last {clientFresh} days?',
      head: 'It counts New York days, so the answer never goes stale in the middle of a run',
      visual: { type: 'timeline', items: [
        ['Wednesday, 7:30 AM', 'The module answers.'],
        ['Next Wednesday, 7:00 AM: step 0', '6 days and 23.5 hours later, but {clientFresh} New York days: due now.'],
        ['Next Wednesday, 8:00 AM', 'The campaign modules read the new answer. The old one would be past {clientFresh} days now, and they would wait.']] },
      vcap: 'The code’s own test of this rule uses Tracking; The client keeps the same clock. KDX on Nov 7 has no answer yet, no new client words and a written page: it is due for this reason.' },
    { about: ['clientwake'], kicker: 'Which words wake it?',
      head: 'The plan of Oct 31 wakes The client on Slack too; code wakes it on a waiting mail or call only',
      visual: { type: 'flow', rows: [
        { title: 'The plan, Oct 31', steps: [['Mail, a call or a Slack message comes in', '', 'will']], end: [['The client runs', '', 'opus']] },
        { title: 'Code today', steps: [['A client’s mail or recorded call', 'still waiting: no run has it, and Jev read an ask', 'code']], end: [['The client runs', '', 'opus']] },
        { title: 'Not built', steps: [['A text from the client', 'no text reaches Barbara yet', 'next'], ['A Slack message from the client', 'no Slack source in the morning gate', 'next']], end: [['It waits for the {clientFresh}-day run', '', 'next']] }] },
      vcap: 'Answer 44 found Waylon’s newest words in texts of Oct 30 that no trigger saw. 5 of the 6 test clients have a Slack channel on their record.',
      open: 'clientwake' }
  ],

  examples: {
    IN: { tag: 'real', rows: [{ steps: [['C2, Nov 7', 'the morning gate’s read, in C2’s brief', 'code'], ['New items', 'Waylon’s mail of Nov 4; changes by Isaac and with no record', 'code']], end: [['15 items: 7 shown, then “And 8 more.”', '', 'code']] }], note: 'C2’s brief of Nov 7 (module_brief, client 13) lists the items this read gave. Step 0 makes the same read.' },
    STANDS: { tag: 'made', rows: [{ steps: [['Answer 44', 'C2, Nov 1, from a module test', 'code'], ['Did it come from a real run?', 'no: a test is a rehearsal', 'code']], end: [['Count every item; it is stale', '', 'code']] }], note: 'Answer 44 is real. No live morning has read it: live keeps module runs off.' },
    WORDS: { tag: 'made', rows: [{ steps: [['Waylon, Nov 4, 4:43 PM', '“Wow so what does this mean? Non ads conversion?”', 'will'], ['A mail from the client, still waiting', '', 'code']], end: [['Due: the client wrote or called', '', 'code']] }], note: 'The mail is real: C2’s brief of Nov 7 lists it. No morning run took this path.' },
    BLANK: { tag: 'made', rows: [{ steps: [['C2, Nov 1', 'the page blank; case 210 asks Will to approve a draft', 'code'], ['Was Will never asked?', 'no: he was asked', 'code']], end: [['No item: not this reason', '', 'code']] }], note: 'The facts are from answer 44 (C2, Nov 1). No module run read them: module runs began on Nov 4.' },
    STALE: { tag: 'made', rows: [{ steps: [['KDX, Nov 7', '“You have no answer here yet.”', 'code'], ['No client mail or call; the page is written', '', 'code']], end: [['Due: no answer from the last {clientFresh} days', '', 'code']] }], note: 'KDX’s brief of Nov 7 shows no answer and no new client words. No morning run took this path.' },
    DW: 'WORDS',
    DB: { tag: 'made', rows: [{ steps: [['A blank page, Will never asked', 'the item is new each morning', 'code'], ['The client is due', 'the line: the strategy page is blank', 'code']], end: [['Case work: draft the page from The client’s answer', '', 'code']] }], note: 'No module run has taken this path. Before module runs, morning looks drafted the pages of Affordable Tree Service (run #239) and AAFE (run #241).' },
    DS: 'STALE',
    NOT: { tag: 'made', rows: [{ steps: [['An answer from yesterday’s real run', '', 'code'], ['No client words; the page written', '', 'code']], end: [['Not due: no line for The client', '', 'code']] }], note: 'No real case: no live morning has run a module run.' },
    WAKE: { tag: 'plan', rows: [{ steps: [['Waylon’s texts in the C2 Ads group', 'Oct 30, 3:59 to 5:01 PM ET', 'next'], ['No text reaches Barbara', 'the Switchboard sends none yet', 'next']], end: [['A text would wake The client', 'not built', 'next']] }], note: 'Not built. Answer 44 read those texts on Will’s computer. A Slack source is not built either.' }
  },

  reviewed: { self: '8d19f268', above: '47369265', on: '2026-11-07' }
});
