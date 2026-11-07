// Opus answers: the module's words (comm-chat src/modules/mod.rs:123-138), after the brief's fixed rules
// (src/modules/brief/mod.rs:29-46) and the test of the last answer (brief/mod.rs:159-171, Will 2026-11-01). The answer's
// shape: mod.rs:631-663. Real cases: Barbara's Tracking answers of Nov 1 (Bull Legal, Kogalla, C2), read whole on
// 2026-11-07, and KDX's answer of Oct 31 as brief/tests.rs:568-582 cites it.
LOGIC.flow({
  id: 'tanswer', parent: 'tracking',
  title: 'Opus answers: can each count be trusted?', short: 'Opus answers',
  head: 'Opus answers in the module’s own words, platform by platform',
  chart: [
    'flowchart TB',
    'RT["First: test what the last answer<br/>said would prove it wrong"]:::opus',
    'PLAT["For its platform: can the<br/>count be trusted, and from<br/>which day?"]:::opus',
    'MAIN["Name the real<br/>main conversion"]:::opus',
    'BESIDE["Set each count beside the lead<br/>app, the store\'s orders and GA4"]:::opus',
    'MOVED["A count that moved while spend<br/>and clicks held: a tracking<br/>question first"]:::opus',
    'BAD["Bad marks take conversions<br/>back: read the form fills<br/>beside the count"]:::opus',
    'META["On Meta: count leads or<br/>purchases per real submit"]:::opus',
    'CHECKS["Answer each failed check,<br/>each failure and each question"]:::opus',
    'JUDGE["Say what the campaign<br/>modules may judge on"]:::opus',
    'VERD(["The verdict: good, a problem,<br/>too few to tell, or ask"]):::opus',
    'RT --> PLAT --> MAIN --> BESIDE --> MOVED --> BAD --> META --> CHECKS --> JUDGE --> VERD'
  ],
  links: { RT: 'taretest', PLAT: 'tafrom', MAIN: 'tamain', BESIDE: 'tabeside', MOVED: 'tamoved', BAD: 'tabad', META: 'tasubmit', CHECKS: 'tachecks', JUDGE: 'tajudge', VERD: 'taverdict' },
  leaves: {
    taretest: 'Test the last answer first', tafrom: 'From which day?', tamain: 'The real main conversion', tabeside: 'Beside the other counts',
    tamoved: 'A count that moved', tabad: 'Bad marks and form fills', tasubmit: 'On Meta: per real submit', tachecks: 'Each check, answered',
    tajudge: 'What the campaign modules may judge on', taverdict: 'The verdict'
  },

  deck: [
    { about: ['tanswer'], kicker: 'The words',
      head: 'The module’s words, after the brief’s fixed rules',
      visual: { type: 'card', title: 'The words of Tracking, as code gives them', fields: [
        ['Each platform', 'Say if its count can be trusted to judge results, and from which day.'],
        ['The main conversion', 'Name the real main conversion.'],
        ['Beside', 'Set each platform’s count beside the lead app, the store’s orders and GA4 where they exist.'],
        ['A move', 'A count that moved while spend and clicks held is a tracking question first.'],
        ['Bad marks', 'Bad marks retract conversions, so read form fills beside the count when marks exist.'],
        ['The hand-on', 'Say what the campaign modules may judge on.'],
        ['On Meta', 'Count its leads or purchases per real submit: one pixel can send a lead twice.']], stamp: ['Change nothing. Write nothing but the answer.', 'opus'] },
      vcap: 'These words came from what the runs of Oct 31 got wrong. Opus may use every read tool, and it must test each number at its source. Not built: Opus answers one platform, and only when code finds a new break on it.' },
    { about: ['tanswer'], kicker: 'Three answers · Nov 1',
      head: 'The three answers of Nov 1, side by side',
      table: { head: ['Client', 'Verdict', 'Main conversion', 'Trusted from', 'Facts', 'Fixes'], rows: [
        ['Bull Legal', 'Good', 'Submit lead form (1)', 'May 11', '16', '4'],
        ['Kogalla', 'Good', 'Purchase', 'no day named', '18', '6'],
        ['C2', 'Problem', 'Submit Lead Form - 23/3/26', 'Oct 1 on Google; Meta not trusted', '25', '4']],
        note: 'Barbara’s saved answers, read whole on Nov 7. Each fact names its source.' },
      visual: { type: 'dots', groups: [[59, 'opus', 'facts with their sources'], [14, 'will', 'fixes proposed']] },
      vcap: 'Three answers, 59 facts and 14 fixes. Bull’s answer also quoted 8 sentences of mail, and code found each one at its source.' },

    { about: ['taretest'], kicker: 'Test the last answer first',
      head: 'Tomorrow’s answer tests today’s first',
      visual: { type: 'flow', rows: [{ steps: [['KDX, Oct 31: the answer names 6 iPhone booking times', 'what would prove it wrong', 'opus'], ['The next brief opens with them', '', 'code']], end: [['Opus tests them first, from that day’s data', '', 'opus']] }] },
      vcap: 'There is no second reader. The test of the last answer stands in its place. C2’s brief of Nov 7 opens with what its answer of Nov 1 said would prove it wrong.',
      quote: ['on the second run the next day it would catch this again, if something was truly wrong', 'Nov 1'] },

    { about: ['tafrom'], kicker: 'From which day',
      head: 'Each answer must say when its count became true, and why',
      visual: { type: 'gate', rows: [
        ['C2, Google: from Oct 1', 'Tag Manager version 9 of Sep 29 moved the tag to the sent form. From Oct 1 each count matches the lead app by day.', 'pass'],
        ['Bull Legal, Google: from May 11', 'The lead app, Google and GA4 agree week by week from then.', 'pass'],
        ['C2, Meta: not trusted', 'Two tags send each lead twice, since May 20.', 'stop'],
        ['Kogalla: no day named', 'It says to judge Google over 4 weeks or more.', 'wait']] },
      vcap: 'The words ask for a day. Kogalla’s good answer named none, and the save has no rule that asks for one.' },

    { about: ['tamain'], kicker: 'The real main conversion',
      head: 'Opus names the action that counts the client’s real win',
      visual: { type: 'flow', rows: [
        { title: 'Bull Legal', steps: [['Submit lead form (1)', 'the thank-you page after a form send', 'opus']], end: [['The only action primary and counted', '', 'keep']] },
        { title: 'Kogalla', steps: [['Purchase', 'each order, with its value', 'opus']], end: [['The only action counted in Conversions', '', 'keep']] },
        { title: 'C2', steps: [['Submit Lead Form - 23/3/26', 'the sent form, since Sep 29', 'opus']], end: [['Calls and qualified leads counted 0', '', 'keep']] }] },
      vcap: 'For C2 the rule picked Barbara’s main conversion. Opus checks it against the account and the client’s own words.' },

    { about: ['tabeside'], kicker: 'Beside the other counts',
      head: 'With no read of the store, Kogalla’s answer used Shopify’s server feed as the record',
      visual: { type: 'bars', max: 53, rows: [
        { label: 'Shopify’s server feed to Meta', parts: [[53, 'keep', '53 orders']] },
        { label: 'GA4, the store’s second property', parts: [[43, 'code', '43']] },
        { label: 'Meta’s browser pixel', parts: [[42, 'code', '42']] },
        { label: 'Google’s Purchase, by conversion date', parts: [[27, 'opus', '27']] }] },
      vcap: 'Kogalla, October. The server feed sees about 1 order in 5 that no browser tag sees, in both months, so the gap is steady and the fall is real.' },

    { about: ['tamoved'], kicker: 'A count that moved',
      head: 'Spend held and clicks rose, yet the count halved: a tracking question first',
      visual: { type: 'bars', max: 48, rows: [
        { label: 'September: $1,510.25 and 1,176 clicks', parts: [[47.86, 'keep', '47.86 purchases']] },
        { label: 'October: $1,516.22 and 1,692 clicks', parts: [[24, 'block', '24 purchases']] }] },
      vcap: 'Kogalla’s Google Ads. Opus asked tracking first: GA4’s store sales fell with it, from 67 to 43, so the fall is real, not a tag fault.' },

    { about: ['tabad'], kicker: 'Bad marks and form fills',
      head: 'A Bad mark takes the conversion back, so Opus reads the form fills beside the count',
      visual: { type: 'gate', rows: [
        ['29 sends in October', 'C2’s lead app', 'pass'],
        ['15 with a Google click', '9 Good, 5 Bad, 1 not marked', 'pass'],
        ['5 Bad marks taken back at Google', 'Google took all 5', 'pass'],
        ['Google counted 10', 'one for each Good or unmarked send with a Google click', 'pass']], end: ['The count is true from Oct 1', 'keep'] },
      vcap: 'But Google refused all 16 Good uploads, so the qualified lead action holds 0. The fix waits on Will’s sign-in (case #57).' },

    { about: ['tasubmit'], kicker: 'On Meta',
      head: 'One submit, many leads: Opus counts per real submit',
      visual: { type: 'bars', max: 95, rows: [
        { label: 'Lead events in Meta’s pixel, Oct 5 to 31', parts: [[95, 'block', '95']] },
        { label: 'Sends in the lead app, Oct 5 to 31', parts: [[26, 'keep', '26']] }] },
      vcap: 'C2: 4 Lead events for each send on the contact page, and 2 for each send on the home page. One hour of Oct 19 logged 8 for 1 send. The fix waits on Will (case #58).' },

    { about: ['tachecks'], kicker: 'Each check, answered',
      head: 'Opus answers each failed check, and says yes or no to each question',
      visual: { type: 'flow', rows: [
        { title: 'A failure', steps: [['Meta: every lead counted once?', 'failed', 'block']], end: [['“True for C2’s own Meta account”: the fix is staged', 'case #58', 'opus']] },
        { title: 'A question', steps: [['The right actions are primary?', 'Opus answers', 'opus']], end: [['“Right for now: only the sent form counts”', '', 'opus']] }] },
      vcap: 'C2’s answer of Nov 1 answered six checks. A failure is the verifiers’ proof, so an answer can never mark it passed.' },

    { about: ['tajudge'], kicker: 'The hand-on',
      head: 'Opus says what the campaign modules may judge on, platform by platform',
      visual: { type: 'flow', rows: [
        { title: 'C2, Google', steps: [['Submit Lead Form, from Oct 1 only', 'the newest 5 days stay open until Waylon marks them', 'opus']], end: [['Lead quality: the lead app’s Good marks', '', 'keep']] },
        { title: 'C2, Meta', steps: [['Not its lead count', '', 'opus']], end: [['Link clicks, landing page views, and GA4 leads from Meta', '', 'keep']] },
        { title: 'Kogalla', steps: [['Google: Purchase, over 4 weeks or more', '', 'opus']], end: [['Meta: only 7-day-click purchases', 'too few to judge by the week', 'keep']] }] },
      vcap: 'The campaign modules read only the summary, so the hand-on must be in it. C2’s and Kogalla’s summaries hold it.' },

    { about: ['taverdict'], kicker: 'The verdict',
      head: 'Four verdicts, and each one is a real answer',
      visual: { type: 'gate', rows: [
        ['Good', 'the count can be trusted: Bull Legal and Kogalla, Nov 1', 'pass'],
        ['A problem', 'it names its fix: C2, Nov 1', 'stop'],
        ['Too few to tell', 'a real answer, not a failure', 'wait'],
        ['Ask a person', 'it names who, and what to ask them', 'hold']] },
      vcap: 'A problem with no fix is refused. Once check runs reach Barbara, a good verdict is refused too while a failure of its run stands.',
      quote: ['NO I want to have as many proposals as needed. But yes a problem should always name a fix. They should be intelligable though and thought through.', 'Nov 1'] }
  ],

  examples: {
    RT: { tag: 'real', rows: [{ steps: [['C2’s answer of Nov 1 said', 'a settled week from Oct 1 where Google differs from the lead app would prove it wrong', 'opus'], ['C2’s brief of Nov 7', 'opens with it', 'code']], end: [['Opus tests it first', '', 'opus']] }], note: 'C2’s Tracking brief, Nov 7.' },
    PLAT: { tag: 'real', rows: [{ steps: [['C2, Google', 'each October count matches a send in the lead app, by day', 'opus']], end: [['Trusted from Oct 1', '', 'keep'], ['Before October: another measure', 'the old tag missed the home-page form', 'block']] }], note: 'C2’s Tracking answer of Nov 1.' },
    MAIN: { tag: 'real', rows: [{ steps: [['Bull Legal’s actions', 'five secondary, one removed', 'code'], ['Opus reads each one', '', 'opus']], end: [['Submit lead form (1)', 'the only action primary and counted', 'keep']] }], note: 'Bull’s Tracking answer of Nov 1.' },
    BESIDE: { tag: 'real', rows: [{ steps: [['Bull Legal, May 11 to Oct 19', '', 'code'], ['The lead app 102, Google 98, GA4 95', 'equal in 18 of 24 weeks', 'opus']], end: [['No week off by more than 2', '', 'keep']] }], note: 'Bull’s Tracking answer of Nov 1.' },
    MOVED: { tag: 'real', rows: [{ steps: [['Kogalla: purchases halved', 'spend held, clicks rose', 'block'], ['A tracking question first', 'GA4 fell with it', 'opus']], end: [['A real fall, not a tag fault', '', 'keep']] }], note: 'Kogalla’s Tracking answer of Nov 1.' },
    BAD: { tag: 'real', rows: [{ steps: [['C2, October', '5 Google-click sends marked Bad', 'code'], ['Google took all 5 back', '', 'code']], end: [['Google’s 10 equal the Good and unmarked sends', '', 'keep']] }], note: 'C2’s Tracking answer of Nov 1.' },
    META: { tag: 'real', rows: [{ steps: [['C2, Oct 5 to 31', '95 Lead events, 26 sends', 'block'], ['Per real submit', '', 'opus']], end: [['Meta’s count is not trusted', '', 'block']] }], note: 'C2’s Tracking answer of Nov 1.' },
    CHECKS: { tag: 'real', rows: [{ steps: [['C2’s six checks', '2 failures, 1 decision, 3 that could not check', 'will'], ['Opus answers each one', '', 'opus']], end: [['Each with its fix or its case', '', 'opus']] }], note: 'C2’s Tracking answer of Nov 1.' },
    JUDGE: { tag: 'real', rows: [{ steps: [['C2’s summary', '', 'opus']], end: [['Google: judge from Oct 1', '', 'keep'], ['Meta: judge on clicks, landing page views and GA4 leads', '', 'keep']] }], note: 'C2’s Tracking answer of Nov 1.' },
    VERD: { tag: 'real', rows: [{ steps: [['Bull Legal', 'the count matches the lead app and GA4', 'opus']], end: [['Good', '', 'keep']] }], note: 'Bull’s Tracking answer of Nov 1, with 4 fixes that do not touch the count.' }
  },

  reviewed: { self: '507753e2', above: 'd4e50d2f', on: '2026-11-07' }
});
