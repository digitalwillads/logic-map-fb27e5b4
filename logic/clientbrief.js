// What the brief gives the model: comm-chat src/modules/brief/mod.rs build() (235-266) puts the parts in this order:
// the last answer's test (retest_part, 162-171), the fixed rules (RULES, 30-41), the question and the words, the needs
// (none for The client), its numbers (brief/numbers.rs client(), 500-539, and recordings(), 541-555), its failed checks
// (brief/checks.rs AREAS: The client reads exam "Strategy and client", 15; validators_api/exam.rs:166-167 and 447-466),
// its check command, and its memory (memory_part, 183-196; fits, 148-154). No model and no network.
LOGIC.flow({
  id: 'clientbrief', parent: 'client',
  title: 'What the brief gives the model', short: 'The brief',
  head: 'Code builds The client’s brief from stored tables; Opus reads the rest itself',
  chart: [
    'flowchart TB',
    'RETEST["What its last answer said<br/>would prove it wrong:<br/>test it first"]:::code',
    'RULES["The fixed rules: change nothing,<br/>quote whole sentences,<br/>answer every failed check"]:::code',
    'WORDS["The question and<br/>the module’s words"]:::code',
    'PART["The client’s part: strategy page,<br/>targets, rules, addresses,<br/>newest words, calls"]:::code',
    'LIST["Its failed checks: Barbara’s<br/>list for strategy and client"]:::code',
    'CMD["Its check command:<br/>verify module client"]:::code',
    'MEM["Its last answer, and what is<br/>new since: every morning<br/>item but a case’s"]:::code',
    'OPUS(["Opus reads the rest<br/>with its read tools"]):::opus',
    'LEFT["Left out: the mail, calls,<br/>Slack and files themselves,<br/>texts, the live campaigns"]:::code',
    'RETEST --> RULES', 'RULES --> WORDS', 'WORDS --> PART', 'PART --> LIST', 'LIST --> CMD', 'CMD --> MEM', 'MEM --> OPUS',
    'LEFT -.-> OPUS'
  ],
  links: { RETEST: 'clientretest', PART: 'clientpart', LIST: 'clientlist', MEM: 'clientnew', LEFT: 'clientleft' },
  leaves: {
    clientretest: 'Its last answer’s test',
    clientpart: 'The client’s part',
    clientlist: 'Barbara’s list',
    clientnew: 'What is new',
    clientleft: 'What it leaves out'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each box.
  deck: [
    { about: ['clientbrief'], kicker: 'Six real briefs · Nov 7',
      head: 'Six clients’ briefs on Nov 7: four pages Will wrote, two Barbara set by rule',
      visual: { type: 'dots', groups: [[4, 'will', 'strategy pages Will wrote'], [2, 'code', 'pages Barbara set by rule from a run’s draft']] },
      table: { head: ['Client', 'Targets in force', 'Rules', 'Calls listed', 'Newest word on the card', 'Failed checks'], rows: [
        ['C2', '4', '1', '6', 'Nov 2: an out-of-office reply', 'none'],
        ['Bull Legal', '2', '1', '1', 'Nov 3: Tyler asks for a bio update', 'none'],
        ['Kogalla', '4', '0', 'none filed', 'Oct 12: Rob, the RA Light Kit', 'none'],
        ['KDX', '4', '0', 'none filed', 'Aug 27: the new site is not ready', 'quiet 69 days'],
        ['Affordable Tree Service', '2', '0', 'none filed', 'Nov 3: Weldon, “exceptionally slow”', 'none'],
        ['AAFE', '4', '1', '6', 'Nov 3: a course newsletter', 'none']], note: 'module_brief for The client, read Nov 7. “Failed checks” is Barbara’s list: no tree goal maps to this module’s area.' } },
    { about: ['clientbrief'], kicker: 'No wait',
      head: 'The client needs no other answer, so its brief never stops at WAIT',
      visual: { type: 'flow', rows: [
        { title: 'A campaign module', steps: [['Its needs: Tracking, The client, In motion, Money', '', 'code'], ['One is older than {clientFresh} days', '', 'code']], end: [['WAIT: stop here', 'the brief ends', 'block']] },
        { title: 'The client', steps: [['Its needs: none', '', 'code']], end: [['The brief goes on to its numbers', '', 'keep']] }] },
      vcap: 'The same holds when it saves: write_module_answer never makes The client wait for another module.' },

    { about: ['clientretest'], kicker: 'Tomorrow tests today',
      head: 'Each brief opens with what the last answer said would prove it wrong',
      visual: { type: 'flow', rows: [{ steps: [['Answer 44, Nov 1', '“Isaac’s or Will’s account of the Oct 30 call, if it shows that Waylon asked for the $150 budget and the $7 cap …”', 'opus'], ['C2’s brief of Nov 7', 'its first lines', 'code']], end: [['Test it first, from today’s data. If it holds, say the last answer was wrong, and why.', '', 'opus']] }] },
      vcap: 'Code quotes at most {clientWrong} characters of it. There is no second reader: the next morning’s answer is the check.',
      quote: ['on the second run the next day it would catch this again, if something was truly wrong', 'Nov 1'] },
    { about: ['clientpart'], kicker: 'The client’s part',
      head: 'Code reads six things about the client before Opus starts',
      visual: { type: 'card', title: 'C2’s part of the brief, Nov 7', fields: [
        ['The strategy page', 'by Will: 5 wants, each with who and when'],
        ['Targets in force', '4, each with who and when: 3 say Barbara, 1 says Waylon'],
        ['The client’s rules', '1, from the verifiers’ notebook of Sep 9'],
        ['Addresses and domains', 'ctwomanagement.com and 2 contacts'],
        ['Their newest word on the card', 'Nov 2: an out-of-office reply'],
        ['Their newest calls', '{clientCalls} listed, the newest Oct 28']], stamp: ['Then: “Read these with client_id 13 …”', 'opus'] },
      vcap: 'A blank page reads “No strategy page is written. Say so in your answer.” A client with no filed call gets “No recorded call is filed under them.”' },
    { about: ['clientpart'], kicker: 'The card’s newest word',
      head: 'The card’s “newest word” can be a machine’s',
      visual: { type: 'flow', rows: [
        { title: 'C2', steps: [['From Waylon’s address, Nov 2', '“Thanks for reaching out. I\'m currently out of the office …”', 'code']], end: [['An out-of-office reply', '', 'wait']] },
        { title: 'AAFE', steps: [['From Dr. Louis Malcmacher, AAFE, Nov 3', '“Last chance, no replay. Save your seat now!”', 'code']], end: [['A course newsletter', '', 'wait']] },
        { title: 'Affordable Tree Service', steps: [['Weldon Granger, Nov 3', '“It has been exceptionally slow 10 days. We can\'t figure out the problem. We are at your mercy.”', 'will']], end: [['A real word: worried', '', 'will']] }] },
      vcap: 'The brief passes the card’s line as it is. Opus must read past a machine’s line to the client’s last real word.' },
    { about: ['clientlist'], kicker: 'Barbara’s list',
      head: 'Its failed checks hold two kinds of item, and no tree goal',
      visual: { type: 'gate', rows: [
        ['No strategy page is written', 'the account goal is blank', 'hold'],
        ['The client has been quiet for {clientQuiet} days or more', 'no email or recorded call from the client’s people', 'hold']], end: ['Answer each one in checks', 'opus'] },
      vcap: 'No verifier goal maps to strategy and client, so a brief with neither item says “No stored check covers this yet.” The 27 goals come from the module’s own check run.',
      stats: [['69', 'days KDX’s people have been quiet, Nov 7', 'real'], ['5 of 6', 'test clients’ briefs: “No stored check covers this yet”', 'real']] },
    { about: ['clientnew'], kicker: 'What is new',
      head: 'What is new holds every morning item since its last answer, but a case’s',
      visual: { type: 'dots', groups: [[1, 'will', 'the client’s words: Waylon’s mail of Nov 4'], [6, 'code', 'account changes: by Isaac, or with no record'], [8, 'next', 'did not fit: “And 8 more.”']] },
      vcap: 'C2’s brief of Nov 7. Each item is cut at {clientItem} characters, and the list at {clientNew}. A case’s item goes to Decide only. With no answer yet, it reads the last {clientFresh} days.' },
    { about: ['clientleft'], kicker: 'What it leaves out',
      head: 'The brief names where to read; it holds no mail, call, Slack line or file',
      visual: { type: 'gate', rows: [
        ['The mail, calls, Slack and notes', 'Opus reads them with search_emails, get_meeting_transcript, read_slack_channel and list_client_notes', 'hold'],
        ['A tracker or the contract', 'only a pointer: read_client_file', 'hold'],
        ['Texts', 'no Barbara tool reads them', 'stop'],
        ['The live campaigns', 'the words ask for the newest word on each; the brief lists none', 'stop']], end: ['Opus finds the rest', 'opus'] },
      vcap: 'Answer 44 read the C2 Ads texts on Will’s computer, read the live campaigns itself, and quoted no text.' }
  ],

  examples: {
    RETEST: { tag: 'real', rows: [{ steps: [['Answer 44', '“Isaac’s or Will’s account of the Oct 30 call …”', 'opus'], ['C2’s brief of Nov 7', 'its first lines', 'code']], end: [['Test it first', '', 'opus']] }], note: 'C2, the brief of Nov 7, answer 44.' },
    RULES: { tag: 'real', rows: [{ steps: [['C2’s brief of Nov 7', '', 'code'], ['“Change nothing. Call no change tool. Write nothing but write_module_answer.”', '', 'code']], end: [['Then the answer’s fields, quotes among them', '', 'code']] }], note: 'Every model module of a client gets the same fixed rules.' },
    WORDS: { tag: 'real', rows: [{ steps: [['C2’s brief of Nov 7', '', 'code'], ['“Read the strategy page, then the newest mail, calls, Slack and any tracker the client keeps, every address of theirs.”', '', 'code']], end: [['Then the five things to give', '', 'opus']] }], note: 'The words are the same for every client. The client has no words for Meta.' },
    PART: { tag: 'real', rows: [{ steps: [['C2, Nov 7', 'the page by Will, 4 targets, 1 rule', 'code'], ['3 addresses, the card’s newest word, 6 calls', '', 'code']], end: [['“Read these with client_id 13 …”', '', 'opus']] }], note: 'C2’s brief of Nov 7 (module_brief, client 13).' },
    LIST: { tag: 'real', rows: [{ steps: [['KDX, Nov 7', 'Barbara’s list', 'code'], ['“The client has been quiet for 69 days”', 'their newest: email on Aug 27', 'code']], end: [['Answer it in checks', '', 'opus']] }], note: 'KDX’s brief of Nov 7 (module_brief, client 93).' },
    CMD: { tag: 'real', rows: [{ steps: [['C2’s brief of Nov 7', '', 'code'], ['“run verify module client --client 13”', 'then act cases push', 'code']], end: [['Name the run’s id in module_run', '', 'opus']] }], note: 'C2’s brief of Nov 7. The client answers for the whole account, so its command names no campaign.' },
    MEM: { tag: 'real', rows: [{ steps: [['Its last answer', 'Nov 1, Problem: “Waylon wants more budget …”', 'code'], ['New since then', 'Waylon’s mail of Nov 4, then 6 account changes', 'code']], end: [['“And 8 more.”', '', 'code']] }], note: 'C2’s brief of Nov 7.' },
    OPUS: { tag: 'real', rows: [{ steps: [['Answer 44', 'read with Barbara’s tools: mail in two mailboxes, 5 recordings', 'opus'], ['And outside them', 'the C2 Ads texts on Will’s computer, the lead app’s data', 'opus']], end: [['17 proof lines, each with its source', '', 'opus']] }], note: 'C2, Nov 1, answer 44.' },
    LEFT: { tag: 'real', rows: [{ steps: [['C2’s brief', 'no texts and no list of live campaigns', 'code'], ['Answer 44', 'read the texts on Will’s computer and the campaigns itself', 'opus']], end: [['It quoted no text', '', 'opus']] }], note: 'C2, Nov 1, answer 44, beside the brief of Nov 7.' }
  },

  reviewed: { self: 'a57cef15', above: '47369265', on: '2026-11-07' }
});
