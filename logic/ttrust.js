// Which days count: two judges of trust. Code's five week rules mark the brief's weeks (comm-chat
// src/results/compute.rs:580-636, `suspicions`; scorecard/compute.rs:283-302). The trust calendar labels each day
// (src/chat/tools/trust_calendar.rs:1-90; the verifiers' fb-conversion-tracking.toml, its trust goals). The brief does
// not read the calendar, and the slot for days a person marked broken is never filled (results/load.rs:533). Real cases:
// C2's calendar read on 2026-11-07, Bull's week of Oct 26, KDX's week of Oct 26.
LOGIC.flow({
  id: 'ttrust', parent: 'tracking',
  title: 'Which days count: the trust calendar and code’s rules', short: 'Which days count',
  head: 'Two judges of trust: code’s rules mark the brief’s weeks, and the trust calendar labels each day',
  chart: [
    'flowchart TB',
    'subgraph CW["Code\'s rules, in the brief"]',
    'RULES["Code\'s five rules<br/>read each week"]:::code',
    'WEEK(["The brief\'s week: trusted,<br/>or not trusted, with why"]):::code',
    'end',
    'subgraph TC["The trust calendar"]',
    'MACH{"The verifiers\' run: does its row<br/>clear a broken day, or make<br/>a suspect day trusted?"}:::code',
    'MROW["A machine row: trusted,<br/>suspect or broken, with<br/>its reason"]:::will',
    'PERSON["Will\'s or Jacob\'s answer on<br/>a case: those days broken,<br/>or trusted"]:::will',
    'JEV{"Jev reads once: do the words<br/>give every one of those<br/>days that label?"}:::code',
    'REF(["Refused: nothing<br/>is written"]):::code',
    'PART["A part line: a tracking<br/>change on its day"]:::will',
    'LABEL["Each day\'s label: the newest<br/>person\'s row, else the newest<br/>machine row"]:::code',
    'end',
    'BOTH(["Opus reads both: the brief\'s<br/>weeks, and the calendar<br/>with its own read"]):::opus',
    'RULES --> WEEK', 'WEEK --> BOTH',
    'MACH -- no --> MROW', 'MACH -- yes --> REF',
    'PERSON --> JEV', 'JEV -- "a clear yes" --> LABEL', 'JEV -- no --> REF',
    'MROW --> LABEL', 'PART --> LABEL', 'LABEL --> BOTH'
  ],
  links: { RULES: 'ttrules', WEEK: 'ttrules', MACH: 'ttmach', MROW: 'ttmach', PERSON: 'ttperson', JEV: 'ttperson', PART: 'ttcal', LABEL: 'ttcal', BOTH: 'ttwhich' },
  leaves: {
    ttrules: 'Code’s five week rules',
    ttmach: 'The machine’s rows',
    ttperson: 'A person’s answer',
    ttcal: 'Labels and part lines',
    ttwhich: { title: 'Which one decides a week?', open: {
      q: 'C2’s Meta days from Sep 14 are broken on the trust calendar, from your answer on case #260. On Nov 7 the brief still marks none of those weeks “Not trusted”. Which one decides a week?',
      since: 'Nov 7',
      opts: [
        ['The calendar marks the weeks too', true, 'A broken or suspect day on the calendar makes its week not trusted, beside code’s five rules. The brief, the spend box and the target lines then follow your answers.'],
        ['Keep them apart, as today', false, 'Code’s rules decide the brief’s weeks. Opus reads the calendar by itself, as C2’s and Kogalla’s answers of Nov 1 did.'],
        ['The calendar alone decides', false, 'Code’s five rules write suspect rows to the calendar, and only the calendar marks a week. Microsoft has no calendar yet.']] } }
  },

  deck: [
    { about: ['ttrust'], kicker: 'Two judges',
      head: 'Code’s rules judge whole weeks. The calendar labels single days.',
      visual: { type: 'flow', rows: [
        { title: 'Code’s rules', steps: [['Each week of each platform', 'five fixed rules', 'code']], end: [['The brief, the spend box, the target lines', '', 'code']] },
        { title: 'The trust calendar', steps: [['Each day of a Meta or Google account', 'the machine’s rows and a person’s', 'will']], end: [['Opus, with its own read', '', 'opus']] }] },
      vcap: 'The brief does not show the calendar. Its tool says to read it before you judge or report a conversion number over days.' },

    { about: ['ttrules'], kicker: 'Code’s five rules',
      head: 'Code does not trust a week when any one of five rules finds something',
      visual: { type: 'gate', rows: [
        ['The real leads do not match', 'a settled week of the lead app is off from Google’s count', 'stop'],
        ['The main conversion went silent', 'none all week, where the 4 weeks before predict 3 or more', 'stop'],
        ['Too many leads for the clicks', 'a lead client with more than 1 lead in 5 clicks, at 20 clicks or more', 'stop'],
        ['An action began to count', 'it began to count in Google’s Conversions inside the weeks shown: it can count a result twice', 'stop'],
        ['A setting changed', 'on an action that recorded in that week or in the 28 days before it', 'stop']], end: ['Any one: “Not trusted”, with why', 'block'] },
      vcap: 'A week that is not trusted counts on neither side of any verdict. A setting change on an action that recorded nothing moves no count, so it marks no week: Bull’s week of Oct 26 made that rule.' },

    { about: ['ttmach'], kicker: 'The machine’s rows',
      head: 'The verifiers write the machine’s rows, and a machine row cannot clear a broken day',
      visual: { type: 'gate', rows: [
        ['Trusted', 'every goal that decides trust passed for the day, with no signal', 'pass'],
        ['Suspect', 'a check or a signal found something: a person decides', 'hold'],
        ['Broken', 'a signal that a second source confirms: the client’s lead app, or its store’s orders', 'stop'],
        ['Refused', 'a machine row that clears a broken day, or makes a suspect day trusted', 'stop']] },
      vcap: 'C2, Oct 27 to Nov 1: Meta’s dataset counted 7 leads and the lead app 4, 75% apart, beside a double count. The machine marked those days broken.',
      quote: ["Going forward we don't want to have the past broken days wait for my yes.", 'Nov 2'] },

    { about: ['ttperson'], kicker: 'A person’s answer',
      head: 'Only Will’s or Jacob’s own answer on a case clears a broken day, or trusts a suspect one',
      visual: { type: 'timeline', items: [
        ['Oct 26 and 27', 'Two C2 runs write 43 rows “Jev for Will”: broken from Sep 14. No case asks Will.'],
        ['Oct 28', 'A review finds it: a name typed into a row is no person’s answer.'],
        ['Nov 2, case #260', 'Will answers: “I want you to set the dates that it’s broken. I don’t want to confirm.”'],
        ['After his answer', 'His own answer marks Sep 14 to Oct 26 broken: two Meta Lead tags fired on each form.']] },
      vcap: 'Barbara reads the reply itself, from Will’s or Jacob’s browser on the Cases page. Then Jev reads once: do the words give every one of those days that label? Only a clear yes writes one row a day.' },

    { about: ['ttcal'], kicker: 'Labels and part lines',
      head: 'C2’s Meta account: 49 broken days, 1 suspect day, and one part line',
      visual: { type: 'dots', groups: [[49, 'block', 'broken'], [1, 'will', 'suspect'], [0, 'keep', 'trusted']] },
      vcap: 'Sep 14 to Nov 2, read on Nov 7. A day’s label is its newest person’s row, else its newest machine row. A part line on Oct 11: the dataset began to get page views from chatgpt.com. No number is compared across a part line.' },

    { about: ['ttwhich'], kicker: 'A question for Will',
      head: 'The calendar and the brief can disagree. Which one decides a week?',
      visual: { type: 'flow', rows: [
        { title: 'The trust calendar', steps: [['C2’s Meta, Sep 14 to Nov 1', '49 days broken', 'block']], end: [['From your answer on case #260, and the machine', '', 'will']] },
        { title: 'The brief', steps: [['C2’s Meta weeks', 'no week says “Not trusted”', 'code']], end: [['Code’s five rules found nothing', '', 'code']] }] },
      vcap: 'Code has a place for the days a person marks broken, but nothing fills it. So the brief, and each code rule that reads its weeks, miss your answer on case #260.',
      open: 'ttwhich' }
  ],

  examples: {
    RULES: { tag: 'real', rows: [{ steps: [['KDX, the week of Oct 26', 'two GA4 contact actions changed how they count, Oct 28', 'code'], ['A setting changed on an action that recorded?', 'yes', 'code']], end: [['Not trusted, with why', '', 'block']] }], note: 'KDX’s brief, Nov 7.' },
    WEEK: { tag: 'real', rows: [{ steps: [['Bull, the week of Oct 26', 'the brief: not trusted, two setting changes', 'code'], ['Opus checks', 'neither action recorded since May 1', 'opus']], end: [['Trusted for the main action', 'and code now skips such changes', 'keep']] }], note: 'Bull’s Tracking answer of Nov 1. The fix to the rule names this week.' },
    MACH: { tag: 'real', rows: [{ steps: [['C2’s Meta, Oct 27 to Nov 1', 'dataset 7 leads, lead app 4, and a double count', 'code'], ['Does the row clear a broken day?', 'no', 'code']], end: [['A machine row: broken', '', 'block']] }], note: 'C2’s trust calendar, read on Nov 7.' },
    MROW: 'MACH',
    REF: { tag: 'made', rows: [{ steps: [['A machine row: Sep 20 trusted', 'after Will’s answer made it broken', 'code'], ['Does it clear a broken day?', 'yes', 'code']], end: [['Refused: nothing is written', '', 'block']] }], note: 'Made up: no refused row is on record.' },
    PERSON: { tag: 'real', rows: [{ steps: [['Case #260', 'Meta’s lead counts of Sep 14 to Oct 26 need Will’s own yes', 'code'], ['Will answers', 'reply 4425', 'will']], end: [['43 days broken, by his answer', '', 'block']] }], note: 'C2’s trust calendar, read on Nov 7.' },
    JEV: { tag: 'real', rows: [{ steps: [['Will’s reply 4425', 'two Meta Lead tags fired on each form', 'will'], ['Jev reads once', 'a clear yes', 'code']], end: [['One row a day, Sep 14 to Oct 26', '', 'block']] }], note: 'The rows were written, so Jev read a clear yes.' },
    PART: { tag: 'real', rows: [{ steps: [['C2’s Meta dataset', 'page views from a new host: chatgpt.com', 'code'], ['A part line', 'Oct 11', 'will']], end: [['No number is compared across it', '', 'code']] }], note: 'C2’s trust calendar, read on Nov 7.' },
    LABEL: { tag: 'real', rows: [{ steps: [['C2’s Meta, Sep 14', '43 rows of the old runs, and Will’s row', 'code'], ['The newest person’s row wins', '', 'code']], end: [['Broken, by Will’s answer', '', 'block']] }], note: 'A name typed into a row decides no day.' },
    BOTH: { tag: 'real', rows: [{ steps: [['C2’s Tracking answer, Nov 1', '', 'opus'], ['It reads the calendar', 'Sep 14 to Oct 26 broken, Oct 27 to 30 suspect', 'opus']], end: [['Meta’s count is not trusted', '', 'block']] }], note: 'Then the broken mark rested on Jev’s rows, not a person’s yes. Will’s answer on case #260 came after.' }
  },

  reviewed: { self: '76975095', above: 'd4e50d2f', on: '2026-11-07' }
});
