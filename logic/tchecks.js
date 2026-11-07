// The tracking checks: the verifiers' `verify module tracking`, which runs the tracking goals of four checks on the data
// read today (the verifiers' verify/src/modules.rs:66-79 and 101-171, coverage_areas.rs:50-158; the trees
// conversion-tracking.toml, google-ads-audit.toml section 1, fb-conversion-tracking.toml, microsoft-ads.toml:508-557).
// A goal sorted limit, tool or delete is in no module (modules.rs:34-36). Barbara holds the answer to the run's lines
// (comm-chat src/modules/run.rs). Will approved no Jev line of these trees (jev_blocks = [] in each).
// Real cases: the six runs in the verifiers' state/modules/tracking/runs/ (Nov 1 and Nov 2).
LOGIC.flow({
  id: 'tchecks', parent: 'tracking',
  title: 'The tracking checks', short: 'The checks',
  head: 'The verifiers run the tracking goals of four checks, and Opus must answer each failure and question',
  chart: [
    'flowchart TB',
    'RUN["Not built: code runs the<br/>verifiers\' tracking checks<br/>on each call, before Opus"]:::next',
    'GD["Google\'s daily check:<br/>every account tracks<br/>its conversions"]:::will',
    'AU["The audit: 5 tracking goals"]:::will',
    'ME["Meta: 9 of its 13<br/>tracking goals"]:::will',
    'MS["Microsoft: 2 goals"]:::will',
    'END{"How does each<br/>goal end?"}:::code',
    'PASS(["Passed"]):::code',
    'FAIL(["Failed: it stands until<br/>the next run passes it"]):::will',
    'DEC(["Needs a decision"]):::will',
    'NR(["Could not check:<br/>never a pass"]):::code',
    'QQ(["A question for Opus:<br/>no judge runs here"]):::opus',
    'PUSH(["The run goes to Barbara: each<br/>failure and question needs<br/>an answer by its line"]):::code',
    'RUN --> GD', 'RUN --> AU', 'RUN --> ME', 'RUN --> MS',
    'GD --> END', 'AU --> END', 'ME --> END', 'MS --> END',
    'END --> PASS', 'END --> FAIL', 'END --> DEC', 'END --> NR', 'END --> QQ',
    'FAIL --> PUSH', 'QQ --> PUSH'
  ],
  links: { RUN: 'tcrun', GD: 'tcgoogle', AU: 'tcaudit', ME: 'tcmeta', MS: 'tcmsft', END: 'tclines', FAIL: 'tclines', QQ: 'tcjev' },
  leaves: {
    tcrun: 'Who runs the checks',
    tcgoogle: 'Google’s daily check',
    tcaudit: 'The audit’s tracking goals',
    tcmeta: 'Meta’s tracking goals',
    tcmsft: 'Microsoft’s tracking goals',
    tclines: 'How each goal ends',
    tcjev: { title: 'Who checks Opus’s yes or no?', open: {
      q: 'Every tracking question comes to Opus with no judge, and you approved no Jev line in the tracking trees. On C2, Nov 1, Opus called the primary actions right, where Jev’s kept answer said no (0.42, under {auditLine}). Should Jev read Opus’s answer to any tracking question?',
      since: 'Nov 7',
      opts: [
        ['Measure Jev first, then pick the lines', true, 'Run Jev on the saved Tracking answers, as the search term module measured Jev on real Opus calls. Then approve only the lines where Jev agrees with what proved right.'],
        ['Approve the two lines on what counts now', false, '“Is each counted action a real lead, call or sale?” and “Do the primary actions match what we agreed?”: Jev reads Opus’s answer at {auditLine}, and C2’s answer of Nov 1 would not save.'],
        ['Keep Opus’s word alone, as today', false, 'You said on Nov 2: “lets then have the questions run with just the model and no judge”. Code still holds each answer to the verifiers’ failures.']] } }
  },

  deck: [
    { about: ['tchecks'], kicker: 'The run',
      head: 'One command runs the tracking goals of four checks, on the data read today',
      visual: { type: 'flow', rows: [{ steps: [['Code runs the command', 'on each call, for one platform', 'next'], ['That platform’s checks', 'Google: the audit and the daily check; Meta’s; Microsoft’s', 'will'], ['The run goes to Barbara', '', 'code']], end: [['Code’s check reads its failures', '', 'next']] }] },
      vcap: 'Not built: today the brief tells Opus to run the command after the due day. A run older than {runHours} hours read no data of today, so the save refuses an answer to it. The run keeps its own folder, so it never counts as a check of the whole client.' },
    { about: ['tchecks'], kicker: 'Six real runs · Nov 1 and Nov 2',
      head: 'Most lines that could not check were C2’s concert account, which no dataset can reach',
      visual: { type: 'bars', max: 15, rows: [
        { label: 'Bull Legal, Nov 1 (and a second run)', parts: [[4, 'keep', '4 pass'], [2, 'code', '2 not run']] },
        { label: 'C2, Nov 1', parts: [[3, 'keep', '3 pass'], [2, 'block', '2 fail'], [1, 'will', '1 decide'], [9, 'code', '9 not run']] },
        { label: 'Kogalla, Nov 1', parts: [[9, 'keep', '9 pass'], [2, 'block', '2 fail'], [4, 'code', '4 not run']] },
        { label: 'C2, a replay of Nov 1', parts: [[3, 'keep', '3 pass'], [1, 'will', '1 decide'], [2, 'opus', '2 asks']] },
        { label: 'C2, a replay of Nov 2', parts: [[1, 'block', '1 fail'], [8, 'code', '8 not run']] }] },
      vcap: 'C2’s second Meta account is Graystone: its concert tickets sell on the venues’ sites, so every Meta goal could not check there. A replay of a past day reads only what was kept that day.' },

    { about: ['tcrun'], kicker: 'Who runs it',
      head: 'Today Opus starts the checks. Not built: code starts them on each call.',
      visual: { type: 'gate', rows: [
        ['The checks read today’s data', 'with no input read today, the module reads the account once', 'pass'],
        ['No AI judge runs', 'each Jev check comes to Opus as a question', 'hold'],
        ['The run goes to Barbara', 'today Opus sends it, and names its id in the answer', 'pass'],
        ['Not built: code starts it', 'on each call, so a failed goal is found before any Opus starts', 'wait']] },
      vcap: 'C2’s run of Nov 1 at 3:15 AM took 164 seconds: no check had read the account that day, so the module ran each one. No tracking run has gone to Barbara yet (its copy of Nov 6).',
      quote: ['lets then have the questions run with just the model and no judge', 'Nov 2'] },

    { about: ['tcgoogle'], kicker: 'Google’s daily check',
      head: 'Every account tracks its conversions',
      visual: { type: 'card', title: 'One goal, one question: is tracking set up? All three checks must pass.', fields: [
        ['Why', 'Without one clean primary conversion, every bid works from the wrong number.'],
        ['The action', 'The planned primary action exists, is on, and counts in the Conversions column.'],
        ['The tag', 'The Google tag is on every page that something able to serve uses, the conversion event is on the page the tag fires on, and auto-tagging is on.'],
        ['The bidding', 'A campaign that bids on conversions has an action that already recorded one.']], stamp: ['Passed for Bull Legal, C2 and Kogalla, Nov 1', 'keep'] },
      vcap: 'This check holds one goal today. Will took out the goals that were never built: “I need to remove everything not built yet from the list” (Oct 27).' },

    { about: ['tcaudit'], kicker: 'The audit',
      head: 'The audit’s five tracking goals, each with its questions',
      visual: { type: 'gate', rows: [
        ['Conversions are real actions, not page views', 'Is each counted action a real lead, call or sale? Do the counts agree with the client’s own record, within 25%? Is the tag on the pages?', 'pass'],
        ['Each conversion is counted once', 'Do two counted actions record the same thing? Does each action count the right number per click: one for a lead, each one for a purchase?', 'pass'],
        ['The right actions are primary', 'Do the primary actions match what the client counts as a win? Does each campaign bid on a counted action with conversions in 30 days?', 'pass'],
        ['Store clients send a real value with each sale', 'Does each sale carry its real value, within 20% of the store’s sales where a store is linked? Do lead values come from a real model?', 'pass'],
        ['Offline conversion uploads are fresh', 'An upload in the last 3 days, 90% or more of uploads taken, and a click window as long as the sales cycle.', 'pass']] },
      vcap: 'A goal passes only when all of its checks pass. A check that could not run is a warning, never a pass.' },
    { about: ['tcaudit'], kicker: 'Two real failures · Kogalla, Nov 1',
      head: 'A failure stands, even where Opus finds it does no harm to the count',
      visual: { type: 'flow', rows: [
        { title: 'The right actions are primary', steps: [['Add to cart and Begin checkout are primary', 'but not counted', 'block'], ['Opus: true, but no harm', 'nothing bids on their goals', 'opus']], end: [['The fix: set both secondary', 'case #102', 'will']] },
        { title: 'Conversions are real actions', steps: [['One landing page has no Google tag', 'the returns and recall site', 'block'], ['Opus: true, but no harm', '10 clicks for $11.84 in 90 days, no sale', 'opus']], end: [['The fix: keep the campaign off that site', 'case #105', 'will']] }] },
      vcap: 'Kogalla’s answer was good: Purchase is the only counted action, and the October fall in sales is real. Both cases are closed.' },

    { about: ['tcmeta'], kicker: 'Meta',
      head: 'The nine Meta goals the module runs',
      visual: { type: 'gate', rows: [
        ['The dataset loads on every page the ads send people to', 'and page views come from the site each day', 'pass'],
        ['Each conversion ad set optimizes for a real lead or sale', 'and for the event the client counts as a win', 'pass'],
        ['Every lead and sale is counted once', 'one event for one action, and 90% of copies carry an event id to merge', 'pass'],
        ['Each sale sends its real value and currency', '', 'pass'],
        ['The Conversions API sends each lead and sale from the server', 'matched well, 6.0 or more, and on time', 'pass'],
        ['On-Facebook lead forms count their leads', 'and each lead reaches the client', 'pass'],
        ['Each ad set uses the planned attribution setting', '', 'pass'],
        ['Each conversion event keeps firing', 'a zero is a broken event only when the people still came', 'pass'],
        ['Past broken days are found and marked', 'a person or a second source confirms each broken range', 'pass']] },
      vcap: 'Will’s Meta tree mirrors the Google goals where the idea is the same. Its core question is Riley’s, Oct 7: “do pixels fire once per event”.' },
    { about: ['tcmeta'], kicker: 'Left out',
      head: 'Four of Meta’s 13 goals stay out of the module',
      visual: { type: 'gate', rows: [
        ['Every account, dataset, page and container was read', 'a tool’s own guarantee', 'stop'],
        ['Each account uses the client’s own dataset, one per site', 'a limit: it runs in the change check', 'stop'],
        ['Every change to a dataset or an event is caught and dated', 'a tool’s own guarantee', 'stop'],
        ['Every day’s Meta conversions have a trust label', 'a tool’s own guarantee', 'stop']] },
      vcap: 'The module leaves out each goal that Will sorted as a limit or a tool. The Meta check inside the run still answers all 13, but the module shows nine. So the module that asks “can we trust the tracking?” never shows if each day has a trust label.' },

    { about: ['tcmsft'], kicker: 'Microsoft',
      head: 'Microsoft’s two tracking goals',
      visual: { type: 'gate', rows: [
        ['Microsoft’s tag is live on the landing pages, and clicks carry their id', 'each tag a counted goal uses is active, each landing page loads it, and click ids are on', 'pass'],
        ['The goals that count are recording, and are the client’s real lead or sale', 'no step before the lead counts, and a run of days with spend and no conversion is caught', 'pass']] },
      vcap: 'None of the three test clients has a Microsoft account, so no real run shows these lines yet. Welch, Sep 20 to 24: Microsoft counted 21 leads against the client’s 14, because a purchase goal counted beside the forms.' },

    { about: ['tclines'], kicker: 'How each goal ends',
      head: 'Each line of the run asks Opus for one kind of answer',
      visual: { type: 'gate', rows: [
        ['Passed', 'nothing to answer', 'pass'],
        ['Failed', 'Opus says no, as it stands, with its fix or its case', 'stop'],
        ['Needs a decision', 'it waits on a person: Opus names who, and what to ask', 'hold'],
        ['Could not check', 'never a pass: Opus says what it read in its place', 'wait'],
        ['A question', 'Opus says yes or no, by what its yes and no mean', 'hold']] },
      vcap: 'C2, Nov 1: “Every lead and sale is counted once” failed, because two Tag Manager tags send Lead on the same form submit. Opus said it was true, and named the fix that waits on Will (case #58).' },

    { about: ['tcjev'], kicker: 'A question for Will',
      head: 'No judge reads Opus’s yes or no on a tracking question',
      visual: { type: 'scale', label: 'Jev’s kept answer: do C2’s primary actions match what we agreed?',
        lines: [['{auditLine}', 'the line: {auditLine}', 'will']],
        dots: [[0.42, 'Jev’s kept answer', 'block']],
        zones: [[0, '{auditLine}', 'Jev: no', 'block'], ['{auditLine}', 1, 'Jev: yes', 'keep']] },
      vcap: 'C2, Nov 1: Opus answered “Right for now: only the sent form counts”, and the answer saved. Every Jev line of the tracking trees reports only until you approve it, and you approved none.',
      open: 'tcjev' }
  ],

  examples: {
    RUN: { tag: 'plan', rows: [{ steps: [['C2’s Meta, a morning', 'code starts Meta’s checks', 'next'], ['Meta’s goals', '', 'will']], end: [['Its lines, before any Opus', '', 'code']] }], note: 'Not built. C2’s real run of Nov 1, 3:15 AM: Opus started it, and its 15 lines took 164 seconds.' },
    GD: { tag: 'real', rows: [{ steps: [['Bull Legal, Nov 1', '', 'code'], ['Every account tracks its conversions', 'all three checks pass', 'will']], end: [['Passed', '', 'keep']] }], note: 'It passed for C2 and Kogalla too.' },
    AU: { tag: 'real', rows: [{ steps: [['Kogalla’s audit goals, Nov 1', '', 'code'], ['5 goals', '', 'will']], end: [['2 passed, 2 failed, 1 could not check', 'no store is linked to judge values', 'block']] }], note: 'The verifiers’ run of Nov 1.' },
    ME: { tag: 'real', rows: [{ steps: [['Kogalla’s Meta goals, Nov 1', '', 'code'], ['9 goals', '', 'will']], end: [['6 passed, 3 could not check', 'Meta gave no event id or match data', 'code']] }], note: 'The verifiers’ run of Nov 1.' },
    MS: { tag: 'made', rows: [{ steps: [['A client with a Microsoft account', '', 'code'], ['Microsoft’s 2 goals', '', 'will']], end: [['Passed, failed or could not check', '', 'code']] }], note: 'Made up: none of the three test clients has a Microsoft account.' },
    END: { tag: 'real', rows: [{ steps: [['C2, Nov 1, 15 lines', '', 'code'], ['How does each goal end?', '', 'code']], end: [['3 passed, 2 failed, 1 decision, 9 could not check', '', 'will']] }], note: 'The verifiers’ run of Nov 1, 3:15 AM.' },
    PASS: 'GD',
    FAIL: { tag: 'real', rows: [{ steps: [['C2: every lead and sale is counted once?', 'two tags send Lead on one form submit', 'block'], ['Failed', '', 'will']], end: [['It stands until a run passes it', 'the fix waits on Will, case #58', 'will']] }], note: 'It failed again in the replay of Nov 2: 43 browser and 44 server copies, with no event id data from Meta.' },
    DEC: { tag: 'real', rows: [{ steps: [['C2: offline uploads are fresh?', '“C2 Qualified lead” has no upload on record', 'code'], ['Needs a decision', '', 'will']], end: [['Opus: Google refuses each upload; Will’s sign-in decides', 'case #57', 'opus']] }], note: 'C2’s run and answer of Nov 1.' },
    NR: { tag: 'real', rows: [{ steps: [['Bull: do the counts agree with the client’s record?', 'no record to read', 'code'], ['Could not check', '', 'code']], end: [['Since Nov 2 the audit reads Barbara’s lead days', 'a gap became a check', 'keep']] }], note: 'The audit’s real cases, Bull and C2, Nov 1.' },
    QQ: { tag: 'real', rows: [{ steps: [['C2, a replay of Nov 1', 'no AI judge ran', 'code'], ['Two questions for Opus', 'the primary actions; real leads or not', 'opus']], end: [['Opus answers yes or no', '', 'opus']] }], note: 'The verifiers’ run of Nov 1, 6:59 PM.' },
    PUSH: { tag: 'made', rows: [{ steps: [['A tracking run', '', 'code'], ['Opus sends it to Barbara', '', 'code']], end: [['The save holds the answer to its lines', '', 'code']] }], note: 'Made up: no tracking run has gone to Barbara yet (its copy of Nov 6). Until one does, an answer saves as before, held to no run.' }
  },

  reviewed: { self: '51ab5987', above: 'd4e50d2f', on: '2026-11-07' }
});
