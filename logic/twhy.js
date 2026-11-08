// Why it broke: what happens when a platform's count does not match the record. Code's five week rules (comm-chat
// src/results/compute.rs:580-636, `suspicions`: the real leads do not match, the main conversion went silent, more than 1
// lead in 5 clicks at 20 clicks or more, an action began to count, a setting changed on an action that recorded in the week
// or the 28 days before it; :617-618 Bull's week of Oct 26 made the exception for quiet actions). The platform checks: the
// verifiers' trees (fb-conversion-tracking.toml, google-ads-audit.toml, microsoft-ads.toml:525-540: Welch 21 against 14,
// ILC Dover's step goals, Take2's goals that never recorded, Flexan's silent week of Oct 3 to 10). Only a new break wakes
// Opus: Claude's call from Will, Oct 30, "Just the new ones". Code checking Opus's answer against the record replaces the
// old question "Who checks Opus's yes or no?" (Claude's call from Will's words of Nov 7). Decide puts each proposal of a
// run on a case: src/modules/finish.rs:1-3, :40-55. Real cases: Barbara, read 2026-11-07: client_leads weeks of Bull
// Legal; C2's trust calendar (Meta, Oct 26 to Nov 1: the dataset 7, the record 4); KDX's Tracking brief (Oct 28); the
// scorecard of LS ADI of Nov 1 (GAds_purchase began counting on Oct 22). Tracking's answers of Nov 1: C2 (answer 11: the
// cause, the fix, $33 a day, 95 Lead events for 26 sends, case #58), Bull (answer 7: the week of Oct 5, the week of Oct 26,
// what would prove it wrong). Bull's scorer: src/lead_match/weeks.rs:57-75 (bug #458). The verifiers' replay of Nov 2 for
// C2 (the same failure). No scorecard in Barbara's copy of Nov 7 holds a "1 lead in 5 clicks" alarm.
// Will, 2026-11-08, asked "Should Opus's tracking fix wait for a person's yes?": "No, Opus makes the fix itself, and code
// checks it." So the flow ends with Opus's own fix, and the rule "Opus's answer, checked against the record" checks it
// (its last row: the next settled week must match again). Today the fix waits on Will on case #58 (answer 11).
LOGIC.flow({
  id: 'twhy', parent: 'tracking', status: 'Partly built; the rest is not built yet',
  title: 'Why it broke', short: 'Why it broke',
  head: 'When the counts do not match, code reads the clues first, and Opus names the cause only for a new break',
  chart: [
    'flowchart TB',
    'IN["A platform’s count does not<br/>match the client’s record"]:::code',
    'SIGNS["Code’s five warning signs:<br/>each one names a day"]:::code',
    'CHECKS["The platform checks: each<br/>failure names a likely cause"]:::will',
    'NEW{"Has an answer already<br/>explained this break?"}:::next',
    'STANDS(["That answer still holds,<br/>and Opus does not start"]):::next',
    'OPUS["Opus names the cause, the<br/>day it began and the fix"]:::opus',
    'PROOF{"Code checks: does<br/>the cause explain the<br/>gap in the record?"}:::next',
    'AGAIN(["Refused, with why:<br/>Opus answers again"]):::next',
    'FIX(["Opus makes the fix itself,<br/>and code checks that the<br/>counts match again"]):::next',
    'IN --> SIGNS --> CHECKS --> NEW',
    'NEW -- yes --> STANDS', 'NEW -- no --> OPUS',
    'OPUS --> PROOF',
    'PROOF -- no --> AGAIN', 'AGAIN -.-> OPUS',
    'PROOF -- yes --> FIX'
  ],
  links: { SIGNS: 'twsigns', CHECKS: 'twchecks', NEW: 'twnew', STANDS: 'twnew', OPUS: 'twopus', PROOF: 'twproof', AGAIN: 'twproof', FIX: 'twproof' },
  leaves: { twsigns: 'Five warning signs', twchecks: 'The platform checks', twnew: 'Only a new break', twopus: 'Opus names the cause', twproof: 'Opus’s answer, checked against the record' },

  deck: [
    { about: ['twhy'], kicker: 'The idea',
      head: 'A gap says that something broke, and the clues say what broke and when',
      visual: { type: 'flow', rows: [{ title: 'C2’s Meta', steps: [['The gap', 'Meta’s tag counted 7 leads, but 4 came in', 'block'], ['A clue', 'the check “Every lead and sale is counted once” failed', 'will'], ['The cause', 'two Meta Lead tags fire on each form, since May 20', 'opus']], end: [['Opus names the fix', 'one tag paused, the other only on the sent form', 'opus']] }] },
      vcap: 'This comes from C2’s trust calendar and its Tracking answer of Nov 1. Code finds the gap and the clues for free, so Opus starts only to name a cause that nobody has named yet.' },
    { about: ['twhy'], kicker: 'Today',
      head: 'Today the clues exist, but nothing starts when a week stops matching',
      visual: { type: 'flow', rows: [
        { title: 'Today', steps: [['Bull’s week of Oct 5 stops matching', '', 'block'], ['The account scorecard lists it', '', 'code']], end: [['Opus looks at it only when Tracking runs as a test', 'Bull, Nov 1', 'opus']] },
        { title: 'The plan', steps: [['A week stops matching', '', 'block'], ['Code reads the clues', '', 'code']], end: [['Opus starts the same morning, for that platform alone', '', 'next']] }] },
      vcap: 'Bull’s test of Nov 1 found that the week of Oct 5 was mostly one person sending the form twice, with at most one lead missed. In the plan that answer comes on the morning the week settles.' },

    { about: ['twsigns'], kicker: 'Five warning signs',
      head: 'Code watches for five warning signs, and any one of them flags the week',
      visual: { type: 'gate', rows: [
        ['The real leads do not match', 'This sign is now the match itself. In Bull’s week of Oct 5, Google counted 1, but 3 real leads came with a Google click.', 'hold'],
        ['The count went silent', 'The main conversion records none all week, where the 4 weeks before brought 3 or more a week. The same alarm in the Microsoft check caught Flexan from Oct 3 to Oct 10, and Flexan’s own people wrote that they had no leads that week either.', 'hold'],
        ['Too many leads for the clicks', 'A lead client gets more than 1 lead for every 5 clicks, in a week of 20 clicks or more. No client has tripped it yet, but Welch shows what it guards against: Microsoft counted 21 leads where the client had 14.', 'hold'],
        ['A new action began to count', 'An action that recorded without counting starts to count in Google’s conversions, so it can count a result twice. LS ADI’s GAds_purchase began to count on Oct 22.', 'hold'],
        ['A setting changed', 'An action that recorded something in that week or the 28 days before changes how it counts. On Oct 28 someone changed how two of KDX’s contact actions count, from every conversion to one per click.', 'hold']] },
      vcap: 'A change like KDX’s can move the count while the real leads stay the same. Today any one sign marks the week not trusted, and in the plan the match decides while the signs say where and when to look.' },
    { about: ['twsigns'], kicker: 'A sign is a clue',
      head: 'A warning sign tells Opus where to look, but the record decides whether anything broke',
      visual: { type: 'flow', rows: [
        { title: 'Bull Legal, the week of Oct 26', steps: [['Code flags two changed actions', 'one left the conversions, and one was removed', 'block'], ['Neither had recorded anything since May 1', '', 'code'], ['The main count matched the lead app and GA4', '4, 4 and 4', 'keep']], end: [['Nothing broke, and code now skips a change on an action that records nothing', '', 'keep']] }] },
      vcap: 'Bull’s answer of Nov 1 found it, and code’s rule changed that week. In the plan the match settles a week like this one without Opus, because the record already shows that the count is right.' },

    { about: ['twchecks'], kicker: 'The platform checks',
      head: 'The platform checks look at the tags themselves, so a failed check names a likely cause',
      visual: { type: 'gate', rows: [
        ['Two tags send one lead twice', '“Every lead and sale is counted once” failed for C2’s Meta, because from Oct 5 to 31 its tag logged 95 Lead events for 26 real sends.', 'stop'],
        ['A tag records nothing', '“The goals that count are recording, and are the client’s real lead or sale” failed for Take2 on Microsoft, because its two counted goals recorded nothing after it went live on Sep 29.', 'stop'],
        ['A step before the lead counts', 'The same Microsoft check failed for ILC Dover, because its campaigns counted begin checkout and add to cart.', 'stop'],
        ['No value sent with a sale', '“Store clients send a real value with each sale” could not check for Kogalla on Nov 1, because no store is linked.', 'wait']] },
      vcap: 'The verifiers run these checks today, but only when Opus starts them during a module test. In the plan code runs them on every call, so each clue is ready before Opus starts.' },

    { about: ['twnew'], kicker: 'Only a new break',
      head: 'Opus starts only for a break that no answer has explained yet',
      visual: { type: 'timeline', items: [
        ['Nov 1', 'C2’s answer says Meta’s count cannot be trusted, because two tags send each lead twice. The fix waits on a person, on case #58.'],
        ['Nov 2', 'The checks find the same failure again. An answer already explains it, so in the plan Opus does not start.'],
        ['The day the fix goes out', 'Meta’s count starts to match the record again, and Meta is trusted from that day.'],
        ['A new gap', 'A gap that the last answer does not explain wakes Opus, for Meta alone.']] },
      vcap: 'This is Claude’s call, from Will’s rule of Oct 30 for search terms. Each answer keeps the list of what it explained, so code can tell a new break from an old one.',
      quote: ["if you checked all the months search terms don't do that again. Just the new ones", 'Oct 30'] },

    { about: ['twopus'], kicker: 'Opus names the cause',
      head: 'Opus reads the clues and the record, then names the cause, the day it began and the fix',
      visual: { type: 'card', title: 'C2’s Meta, from its answer of Nov 1', fields: [
        ['The cause', 'Two Tag Manager tags send Lead to Meta on every submit, twice on the contact page.'],
        ['The day it began', 'Both tags came in the Tag Manager version saved on May 20.'],
        ['The fix', 'Publish the staged Tag Manager version: pause one Meta Lead tag, and fire the other only on the sent form, with the lead’s id as its event id.'],
        ['What is at stake', 'A true Meta lead count, and what the live Meta campaign learns from, at about $33 a day.']], stamp: ['On case #58, which waits on Will', 'will'] },
      vcap: 'A module test of Nov 1 wrote this answer. Today Opus answers only when Tracking runs, and for the whole account at once. Today its fix waits on Will, but in the plan Opus makes it itself.',
      quote: ['NO I want to have as many proposals as needed. But yes a problem should always name a fix. They should be intelligable though and thought through.', 'Nov 1'] },
    { about: ['twopus'], kicker: 'Either side can break',
      head: 'The cause can sit on the platform’s side or on the record’s side, so Opus reads both',
      visual: { type: 'flow', rows: [
        { title: 'The platform’s side', steps: [['C2’s two Meta Lead tags', 'since May 20', 'block']], end: [['Meta’s tag counts more leads than came in', '', 'block']] },
        { title: 'The record’s side', steps: [['Bull’s lead scorer stopped in June', '', 'block']], end: [['Nobody saw it for four months', 'now code checks the app each morning', 'block']] }] },
      vcap: 'A gap only says that the two counts differ. Before Opus blames a tag, it checks that the record itself is working, because a fix on the wrong side changes nothing.' },

    { about: ['twproof'], kicker: 'Checked against the record',
      head: 'Code holds Opus’s answer up against the record, so a cause must explain the gap',
      visual: { type: 'gate', rows: [
        ['The day it began', 'The counts must match before that day and stop matching after it.', 'pass'],
        ['The size of the gap', 'The cause must explain how far apart the counts are: two tags on each form predict up to twice the real leads, as C2’s 7 against 4.', 'pass'],
        ['What would prove it wrong', 'Each answer names one, and code runs it on the record. Bull’s answer of Nov 1 named a lead-by-lead read that shows two people sent the forms of Oct 4 and Oct 5.', 'pass'],
        ['The fix', 'After the fix goes out, the next settled week must match again.', 'pass']], end: ['An answer that fails is refused, and Opus tries again', 'code'] },
      vcap: 'This is not built yet, and it settles the old question “Who checks Opus’s yes or no?”: the record checks it, because Will wants the record to be the proof. That is Claude’s call, from his words of Nov 7. Since Nov 8 Opus also makes each fix itself, with no person’s yes, so the last row is the check on every fix.' }
  ],

  examples: {
    IN: { tag: 'real', rows: [{ steps: [['Bull’s Google, the week of Oct 5', 'Google counted 1, the lead app has 3', 'block']], end: [['It does not match', '', 'block']] }], note: 'Barbara’s weekly lead counts for Bull Legal, read on Nov 7.' },
    SIGNS: { tag: 'real', rows: [{ steps: [['KDX’s Google, the week of Oct 26', '', 'code'], ['Code flags a setting change', 'two contact actions, Oct 28', 'block']], end: [['A clue, with its day', '', 'code']] }], note: 'The facts that code gathered for KDX’s Tracking, Nov 7.' },
    CHECKS: { tag: 'real', rows: [{ steps: [['C2’s Meta check, Nov 1', '“Every lead and sale is counted once”', 'will'], ['It failed', 'two tags send Lead on each form submit', 'block']], end: [['A likely cause', '', 'will']] }], note: 'The verifiers’ run of Nov 1, and its replay of Nov 2, which failed the same way.' },
    NEW: { tag: 'plan', rows: [{ steps: [['C2’s Meta, Nov 2', 'the same failure as Nov 1', 'block'], ['Has an answer explained it?', 'yes, the answer of Nov 1', 'next']], end: [['That answer still holds', 'Opus does not start', 'next']] }], note: 'Both runs are real: the verifiers’ runs of Nov 1 and Nov 2.' },
    STANDS: 'NEW',
    OPUS: { tag: 'real', rows: [{ steps: [['C2’s Meta, Nov 1', '', 'opus'], ['Two tags send Lead on every submit', 'since May 20', 'opus']], end: [['The fix is to publish the staged Tag Manager version', '', 'opus']] }], note: 'C2’s Tracking answer of Nov 1, a module test.' },
    PROOF: { tag: 'plan', rows: [{ steps: [['Opus says Meta counts each lead twice since May 20', '', 'opus'], ['Code asks if Meta’s tag counts up to twice the real leads since then', 'from Oct 26 to Nov 1 it counted 7 against 4', 'next']], end: [['It fits, so the answer saves', '', 'next']] }], note: 'The numbers are real, from C2’s trust calendar, read on Nov 7.' },
    AGAIN: { tag: 'plan', rows: [{ steps: [['Opus says the tag went silent', '', 'opus'], ['But code sees Meta’s tag count more leads than came in', '', 'next']], end: [['Refused, because the cause does not explain the gap', '', 'block']] }], note: 'Made up, because no code checks an answer this way yet.' },
    FIX: { tag: 'plan', rows: [{ steps: [['Opus publishes C2’s staged Tag Manager version', 'the fix it named on Nov 1', 'next'], ['The next settled week', 'Meta’s tag counts each lead once', 'next']], end: [['The counts match again, so Meta is trusted from the day of the fix', '', 'keep']] }], note: 'Made from C2’s fix of Nov 1, which today waits on Will on case #58. No code checks a fix after it goes out yet.' }
  },

  reviewed: { self: '10ea6f6a', above: '7f08998d', on: '2026-11-08' }
});
