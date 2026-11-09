// The spend box, as the Money module reports it. comm-chat at origin/main 1c24d43a, read 2026-11-08: src/spend_box.rs:1-46
// (the box: Will's words of Oct 30; a raise inside it goes alone and its results are checked; a cut needs none of this;
// raises on Google Ads only), :845-967 (`standing`, `standing_with`: with no change planned, the hold first, then a Google
// account, a cap, a cap on Google, the newest 2 full weeks trusted, and the month's own end under each Google cap; each other
// platform's room under its own caps), :944-948 (the box's line reads only where the month ends), :305-320 (`under_cap`: a
// real raise must also stay under the cap over a whole month), :282-302 (`cheap_no`), :265-279 (`untrusted`), :545-559
// (`weeks_of`: code's warning signs, `results::compute::suspicions`), :569-586 (`turns`: the Mondays the box shuts and
// opens); src/modules/brief/code.rs:270-292 (the box's line, each room, Google's weeks, the line that a raise elsewhere
// waits), :232-237 (`running_doubt`, Google's week still running); src/cases/scores.rs:148-151 (Will's hold);
// src/chat/tools/run_hold.rs:453, :660 (every run asks the box before a raise). Real cases, read 2026-11-08: Barbara's
// Money answers of Nov 1 (Bull 2, C2 4, Kogalla 6) with module_brief and answer_id; C2's answer 70 of Nov 3 in a copy of
// Barbara's data; Bull's Decide answer 58 and bid answers 27, 52 and 53 of Nov 1 in that copy (each names the hold); code's
// own test on Bull's cap (src/modules/brief/tests.rs:317-343, a made-up pace of $210 a day); commits c3e946dd (C2's rooms,
// Nov 2, before and after), 5b8a3f4e (Will's words on Meta, Nov 2), ebbd477a (KDX's month-end gap). The plan Will read on
// Oct 31 said the box "reads a full month too". KDX's counting change of Oct 28 and Bull's changed actions: logic/twhy.js.
LOGIC.flow({
  id: 'monbox', parent: 'money',
  title: 'The spend box', short: 'The spend box',
  head: 'The spend box says whether a run could raise spend on Google today without asking Will, and it gives each other platform its own room',
  chart: [
    'flowchart TB',
    'START(["The box as it stands this<br/>morning, with no change<br/>planned"]):::code',
    'HOLD{"Has Will set everything on<br/>the client to wait?"}:::will',
    'GOOGLE{"Does the client run<br/>Google Ads?"}:::code',
    'CAP{"Does an approved cap<br/>cover Google?"}:::code',
    'WEEKS{"Are Google’s newest {moneyWeeks}<br/>full weeks trusted?"}:::code',
    'MONTH{"Does this month end under<br/>each cap at today’s pace?"}:::code',
    'SHUT(["Shut, so every raise waits<br/>for Will, and the answer<br/>says why"]):::block',
    'OPEN(["Open, so a raise on Google<br/>could go out alone"]):::keep',
    'ROOMS["Each other platform under its<br/>own cap gets a room, but a<br/>raise there waits for Will"]:::code',
    'DOUBT["Code warns early when a<br/>warning sign shows up in<br/>the current week"]:::code',
    'START --> HOLD', 'START --> ROOMS',
    'HOLD -- yes --> SHUT', 'HOLD -- no --> GOOGLE',
    'GOOGLE -- no --> SHUT', 'GOOGLE -- yes --> CAP',
    'CAP -- no --> SHUT', 'CAP -- yes --> WEEKS',
    'WEEKS -- no --> SHUT', 'WEEKS -- yes --> MONTH',
    'WEEKS -. "the current week" .-> DOUBT',
    'MONTH -- no --> SHUT', 'MONTH -- yes --> OPEN'
  ],
  links: { HOLD: 'monhold', GOOGLE: 'mongoogle', ROOMS: 'mongoogle', WEEKS: 'monweeks', DOUBT: 'mondoubt', MONTH: 'monmonth', OPEN: 'monmonth' },
  leaves: {
    monhold: 'Will’s hold',
    mongoogle: 'Google only, and a room for each platform',
    monweeks: 'The trusted weeks',
    mondoubt: 'A warning sign in the current week',
    monmonth: 'An open box, and a real raise'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['monbox'], kicker: 'The idea',
      head: 'In every run the spend box decides whether a raise can go out without Will, and each morning Money reports how the box stands',
      visual: { type: 'flow', rows: [
        { title: 'In every run today, before a raise goes out', steps: [['A run plans to raise a budget or a bid', '', 'opus'], ['The box checks the hold, the cap, the weeks and the month', 'with the raise in it', 'code']], end: [['Inside, so it goes out alone, and its results are checked', '', 'keep'], ['Outside, so it waits for Will', '', 'block']] },
        { title: 'Each morning, in the Money answer', steps: [['The same checks, with no change planned', '', 'code']], end: [['Open or shut, and why, for the modules that propose money', '', 'code']] }] },
      vcap: 'A cut needs none of this and goes as before. The box takes raises on Google Ads only for now, so on Meta and Microsoft the answer reports only the room.',
      quote: ['IF we just have a hard monthly / weekly cap we should be fine', 'Oct 30'] },

    { about: ['monhold'], kicker: 'Will’s hold',
      head: 'Will’s hold speaks first, so on Nov 1 the box was shut on all three test clients, whatever their caps said',
      visual: { type: 'gate', rows: [
        ['Bull Legal', 'It had $519.10 of room under its $5,800 cap, but Will had set everything on the client to wait.', 'stop'],
        ['C2', 'No cap yet, and Will’s hold as well.', 'stop'],
        ['Kogalla', 'No cap yet, and Will’s hold as well.', 'stop']],
        end: ['The box is shut, and every raise waits for Will', 'block'] },
      vcap: 'The modules after Money read the hold in its summary. On Nov 1 Bull’s Decide answer named it as the reason each change needs Will’s yes, and three bid answers repeated it.' },

    { about: ['mongoogle'], kicker: 'One room for each platform',
      head: 'Each platform answers only to its own caps, so a small cap on Meta no longer shuts the box for Google',
      visual: { type: 'flow', rows: [
        { title: 'C2, before Nov 2 at 10:43 PM ET', steps: [['Meta’s pace passes its own $200 cap', '', 'block']], end: [['The whole box is shut, Google as well', '', 'block']] },
        { title: 'C2, after', steps: [['Google’s month stays under its $11,800 cap', 'and its weeks are trusted', 'keep']], end: [['The box is open for Google', '', 'keep'], ['Meta has no room', 'and a raise there waits for Will anyway', 'block']] }] },
      vcap: 'On Nov 2 Will read C2’s answer, in which Meta’s small cap had shut the box for Google as well. Code changed that night. A cap on the whole account still holds every platform at once, as Bull’s does.',
      quote: ['Let\'s fix the meta gaps. We are going to run this on very meta heavy accounts as well and need it to be clean.', 'Nov 2'] },

    { about: ['monweeks'], kicker: 'The trusted weeks',
      head: 'A raise needs Google’s newest {moneyWeeks} full weeks trusted, so one warning sign shuts the box until that week is older',
      visual: { type: 'gate', rows: [
        ['The real leads do not match', 'The count and the client’s own leads disagree.', 'hold'],
        ['The count went silent', 'No conversion all week, after weeks that had some.', 'hold'],
        ['Too many leads for the clicks', 'More than one lead for every five clicks.', 'hold'],
        ['A new action began to count', 'It can count one result twice.', 'hold'],
        ['A setting changed', 'An action changed how it counts.', 'hold']],
        end: ['Any one of them, in either week, shuts the box', 'block'] },
      vcap: 'On Oct 28 two of KDX’s contact actions changed how they count. Its box was open on Saturday, Oct 31, and shut on Monday, Nov 2, when that week became one of the two the box reads. It opens again about Nov 16, when that week is older than both. If Barbara missed a day of either week, the box stays shut too.' },

    { about: ['mondoubt'], kicker: 'The current week',
      head: 'When a warning sign shows up in the current week, the answer says so early, and names the Monday when the box will judge that week',
      visual: { type: 'flow', rows: [
        { title: 'Bull Legal, Nov 1', steps: [['The week from Oct 26 shows two changed actions', 'one action stopped counting as a conversion, and another was removed', 'block'], ['Money’s answer names both changes', 'and says the box will judge that week once it ends', 'code']], end: [['On Monday, Nov 2, that week would shut the box', 'if Will’s hold had not shut it already', 'block']] },
        { title: 'What Tracking found', steps: [['Neither action had recorded anything since May 1', '', 'code']], end: [['Nothing broke, and code now skips a change on an action that records nothing', '', 'keep']] }] },
      vcap: 'Only Google’s current week gets this early warning, because the box judges Google’s weeks alone. The line gives the other modules a few days’ notice before the box shuts.' },

    { about: ['monmonth'], kicker: 'An open box, and a real raise',
      head: 'The box’s line reads only where this month ends, but a real raise must also stay under the cap over a whole month',
      visual: { type: 'flow', rows: [
        { title: 'Code’s own test on Bull’s $5,800 cap, Oct 30, at $210 a day', steps: [['October ends at $3,360', 'so the box’s line says open', 'keep'], ['A whole month at $210 a day is $6,300', 'so Money’s verdict says a problem', 'block']], end: [['A real raise that day would be refused', 'because it fails the whole month', 'block']] }] },
      vcap: 'The plan that Will read on Oct 31 said the box would check a whole month too. A real raise does, and Money’s verdict does, but the box’s own line still reads only this month’s end. So on a month’s last days it can say open when no raise would get in. The $210 a day is the test’s own number, not Bull’s.' }
  ],

  examples: {
    START: { tag: 'real', rows: [{ steps: [['C2, Nov 3', 'no change planned', 'code']], end: [['Open for Google, and no room on Meta', '', 'code']] }], note: 'We took this from the answer that the Money module wrote for C2 in a test on a copy of Barbara’s data, on Nov 3.' },
    HOLD: { tag: 'real', rows: [{ steps: [['A test on Bull Legal, Nov 1', '', 'code'], ['Has Will set everything on the client to wait?', 'yes', 'will']], end: [['Shut, because Will has set everything on Bull Legal to wait', '', 'block']] }], note: 'We took this from the answer that the Money module wrote for Bull in a test on Nov 1.' },
    GOOGLE: { tag: 'made', rows: [{ steps: [['A client with only a Meta account', '', 'code'], ['Does the client run Google Ads?', 'no', 'code']], end: [['Shut, because the box takes raises on Google Ads only for now', '', 'block']] }], note: 'We made this up from the rule in code, because every client in the tests runs Google Ads.' },
    CAP: { tag: 'made', rows: [{ steps: [['Kogalla, Nov 1, early morning', 'no cap approved yet', 'code'], ['Does an approved cap cover Google?', 'no', 'code']], end: [['No box, so a raise waits for Will', '', 'block']] }], note: 'We made this up from Kogalla’s Money answer of Nov 1, which had no cap yet. In that answer Will’s hold spoke first, so the box gave the hold as its reason.' },
    WEEKS: { tag: 'real', rows: [{ steps: [['C2, Nov 3', 'the weeks of Oct 19 and Oct 26', 'code'], ['Are Google’s newest {moneyWeeks} full weeks trusted?', 'yes, both', 'keep']], end: [['On to the month', '', 'code']] }], note: 'We took this from the answer that the Money module wrote for C2 in a test on a copy of Barbara’s data, on Nov 3.' },
    MONTH: { tag: 'real', rows: [{ steps: [['C2’s Google, Nov 3', 'at $209.63 a day the month ends at $6,007.87', 'code'], ['Does this month end under each cap?', 'yes, under $11,800', 'keep']], end: [['Open', '', 'keep']] }], note: 'We took this from the answer that the Money module wrote for C2 in a test on a copy of Barbara’s data, on Nov 3.' },
    SHUT: { tag: 'real', rows: [{ steps: [['The tests on Bull Legal, C2 and Kogalla, Nov 1', '', 'code']], end: [['Each box shut', 'and each answer says Will has set everything on the client to wait', 'block']] }], note: 'We took this from the three answers that the Money module saved in the tests of Nov 1.' },
    OPEN: { tag: 'real', rows: [{ steps: [['C2, Nov 3', 'C2 had no hold in this copy, its Google cap had room, and both weeks were trusted.', 'code']], end: [['A raise fits C2’s box', '', 'keep']] }], note: 'We took this from the answer that the Money module wrote for C2 in a test on a copy of Barbara’s data, on Nov 3.' },
    ROOMS: { tag: 'real', rows: [{ steps: [['C2’s Meta, Nov 3', 'its own $200 cap', 'code']], end: [['No room, because at its pace the month ends at $335.81', '', 'block']] }], note: 'We took this from the answer that the Money module wrote for C2 in a test on a copy of Barbara’s data, on Nov 3.' },
    DOUBT: { tag: 'real', rows: [{ steps: [['A test on Bull Legal, Nov 1', 'the week that began on Oct 26', 'code']], end: [['The answer says the week is in doubt so far', 'and that the box will judge it once the week ends', 'block']] }], note: 'We took this from the answer that the Money module wrote for Bull in a test on Nov 1.' }
  },

  reviewed: { self: 'e0bc485c', above: '495bd93b', on: '2026-11-08' }
});
