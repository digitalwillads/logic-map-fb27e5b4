// Has the tracking broken? Code checks each platform on each call. It replaces the due day (Will, 2026-11-07, on "Is it
// due today?": "I don't want to have this. I want it to check that it hasen't broken via code ever time it's called";
// and "IT would make sense to have this split by platform yes?"). Not built. It uses three checks code has today: its five
// week rules (comm-chat src/results/compute.rs:580-636, `suspicions`), the verifiers' tracking checks (`verify module
// tracking`, verify/src/modules.rs:66-79), and the worse-week signal of the old due day (src/modules/day.rs:139). Only a
// break the last answer did not name starts Opus (Claude's call, from Will 2026-10-30: "Just the new ones").
// Real findings in the examples: KDX's brief of Nov 7, C2's runs of Nov 1 and Nov 2, Bull's run of Nov 1.
LOGIC.flow({
  id: 'tbroken', parent: 'tracking', status: 'Not built yet',
  title: 'Has the tracking broken? Code checks each call', short: 'Has it broken?',
  head: 'On each call, code checks each platform. Only a new break starts Opus.',
  chart: [
    'flowchart TB',
    'IN["Each call, one platform:<br/>its weeks and today\'s<br/>check run"]:::code',
    'W{"Code\'s five rules: is<br/>a week not trusted?"}:::code',
    'G{"Today\'s tracking checks:<br/>did a goal fail?"}:::will',
    'M{"Did a week turn Worse<br/>past its normal swing?"}:::code',
    'OK(["Not broken: trusted"]):::keep',
    'NEW{"Is it new: not named<br/>in the last answer?"}:::code',
    'SAME(["The last answer<br/>stands"]):::code',
    'RUN(["Opus answers<br/>for this platform"]):::opus',
    'IN --> W', 'W -- no --> G', 'G -- no --> M', 'M -- no --> OK',
    'W -- yes --> NEW', 'G -- yes --> NEW', 'M -- yes --> NEW',
    'NEW -- no --> SAME', 'NEW -- yes --> RUN'
  ],
  links: { W: 'tbweek', G: 'tbgoal', M: 'tbmoved', NEW: 'tbnew', OK: 'tbok' },
  leaves: { tbweek: 'A week code does not trust', tbgoal: 'A goal that failed today', tbmoved: 'A week that turned Worse', tbnew: 'Only a new break starts Opus', tbok: 'Not broken' },

  deck: [
    { about: ['tbroken'], kicker: 'Every call',
      head: 'No due day: code checks each platform on each call, and spends no tokens',
      visual: { type: 'flow', rows: [
        { title: 'Bull Legal, Google', steps: [['Code checks', 'no week, goal or swing found', 'code']], end: [['Not broken: trusted', 'no Opus', 'keep']] },
        { title: 'C2, Meta', steps: [['Code checks', 'every lead counted once? failed', 'block'], ['The last answer named it', 'Nov 1, case #58', 'code']], end: [['The last answer stands', 'no Opus', 'code']] },
        { title: 'KDX, Google', steps: [['Code checks', 'the week of Oct 26 is not trusted', 'block'], ['KDX has no answer', 'so the break is new', 'code']], end: [['Opus answers for KDX’s Google', '', 'opus']] }] },
      vcap: 'Not built. Each row is made from a real finding of Nov 1 to Nov 7. No model runs in these checks, so they can run on every call.',
      quote: ["I want it to check that it hasen't broken via code ever time it's called", 'Nov 7'] },
    { about: ['tbroken'], kicker: 'What it replaces',
      head: 'The four reasons of the due day are gone. A check on each call covers each one.',
      visual: { type: 'gate', rows: [
        ['Chad Ads: leads stopped', 'code’s rule “the main conversion went silent” looks for it on each call', 'pass'],
        ['A week turned Worse', 'now one of the three checks', 'pass'],
        ['A follow-up of a tracking change', 'the next call checks the change: a goal that passes again ends the break', 'pass'],
        ['No answer from the last {freshDays} days', 'gone: each call leaves each platform a result of the day', 'pass']] },
      vcap: 'Under the due day, a tag that sent each lead twice could wait up to {freshDays} days: more leads raise no alert and make no week worse.' },

    { about: ['tbweek'], kicker: 'A week code does not trust',
      head: 'A week that breaks one of code’s five rules is a break',
      visual: { type: 'card', title: 'KDX, the week of Oct 26 (its brief, Nov 7)', fields: [
        ['The rule', 'a setting changed on an action that recorded'],
        ['What changed', 'two GA4 contact actions: from every conversion to one per click, on Oct 28'],
        ['KDX’s last answer', 'none'],
        ['So', 'a new break: Opus answers for KDX’s Google']], stamp: ['Not built: today this week waits for the due day', 'next'] },
      vcap: 'The five rules are in the part on which days count. If you pick “The calendar marks the weeks too” there, a broken day on the calendar makes a break here too.' },

    { about: ['tbgoal'], kicker: 'A goal that failed',
      head: 'A tracking goal that failed today is a break. A goal that could not check is not.',
      visual: { type: 'gate', rows: [
        ['Failed', 'a break: C2’s Meta, “Every lead and sale is counted once”, Nov 1 and Nov 2', 'stop'],
        ['Needs a decision', 'no break: it waits on a person, as today', 'hold'],
        ['A question', 'no break: Opus answers it when it next runs', 'hold'],
        ['Could not check', 'no break, and never a pass', 'wait'],
        ['Passed', 'no break', 'pass']] },
      vcap: 'Not built: today Opus starts the checks after the due day. Here code starts them on each call, so a failed goal is found before any Opus starts.' },

    { about: ['tbmoved'], kicker: 'A week that turned Worse',
      head: 'A count that moved while spend and clicks held is a tracking question first',
      visual: { type: 'flow', rows: [
        { title: 'A tag fault', steps: [['The count halves', 'spend and clicks hold', 'block'], ['Code: the week turned Worse', '', 'code']], end: [['Opus checks the tags first', '', 'opus']] },
        { title: 'Kogalla, October', steps: [['Purchases halve', 'spend held, clicks rose', 'block'], ['Opus checks', 'GA4’s store sales fell with it', 'opus']], end: [['A real fall, not a tag fault', '', 'keep']] }] },
      vcap: 'The due day already used this signal. The module’s words say why: a count that moved while spend and clicks held is a tracking question first. Kogalla’s fall is from its answer of Nov 1.' },

    { about: ['tbnew'], kicker: 'Only a new break',
      head: 'A break the last answer named starts no new answer',
      visual: { type: 'timeline', items: [
        ['Nov 1', 'C2’s answer: Meta is not trusted. Two tags send each lead twice. The fix waits on Will (case #58).'],
        ['Each morning after', 'Code finds the same failure. The last answer named it, so that answer stands, and no Opus starts.'],
        ['The day the fix goes out', 'The goal passes, and code finds no break on Meta.'],
        ['A new finding', 'A break the last answer did not name starts Opus, for Meta alone.']] },
      vcap: 'Claude’s call, from your rule of Oct 30. The answer keeps the list of what code found when it ran. A finding on that list is not new.',
      quote: ["if you checked all the months search terms don't do that again. Just the new ones", 'Oct 30'] },

    { about: ['tbok'], kicker: 'Not broken',
      head: 'Not broken: the count is trusted, and Opus does not start',
      visual: { type: 'gate', rows: [
        ['No week code does not trust', 'code now skips a setting change on an action that recorded nothing', 'pass'],
        ['No goal failed', 'Nov 1: 4 passed, 2 could not check', 'pass'],
        ['No week turned Worse', '', 'pass']], end: ['Trusted, with no tokens spent', 'keep'] },
      vcap: 'Not built. A made-up morning, from Bull Legal’s run of Nov 1. The day the count is trusted from stays as the last answer said: Bull’s, from May 11.' }
  ],

  examples: {
    IN: { tag: 'plan', rows: [{ steps: [['KDX’s Google, a morning', '14 weeks and today’s check run', 'code']], end: [['Three checks, in order', '', 'code']] }], note: 'Not built.' },
    W: { tag: 'plan', rows: [{ steps: [['KDX, the week of Oct 26', 'two actions changed how they count, Oct 28', 'code'], ['A week not trusted?', 'yes', 'code']], end: [['Is it new?', '', 'code']] }], note: 'Not built. The week is real: KDX’s brief, Nov 7.' },
    G: { tag: 'plan', rows: [{ steps: [['C2’s Meta: every lead counted once?', 'failed, Nov 1 and Nov 2', 'block'], ['Did a goal fail?', 'yes', 'will']], end: [['Is it new?', '', 'code']] }], note: 'Not built. The failure is real: the verifiers’ runs of Nov 1 and Nov 2.' },
    M: { tag: 'plan', rows: [{ steps: [['A made-up week', 'the count halves while spend and clicks hold', 'block'], ['Turned Worse?', 'yes', 'code']], end: [['Is it new?', '', 'code']] }], note: 'Not built, and made up. The due day used the same signal.' },
    OK: { tag: 'plan', rows: [{ steps: [['Bull Legal’s Google', 'no week, no failed goal, no worse week', 'code']], end: [['Not broken: trusted', 'no Opus', 'keep']] }], note: 'Not built. Made from Bull’s run of Nov 1: 4 passed, 2 could not check.' },
    NEW: { tag: 'plan', rows: [{ steps: [['C2’s Meta, Nov 2', 'the same failure as Nov 1', 'block'], ['Named in the last answer?', 'yes: Nov 1', 'code']], end: [['The last answer stands', 'no Opus', 'code']] }], note: 'Not built. Both runs are real.' },
    SAME: 'NEW',
    RUN: { tag: 'plan', rows: [{ steps: [['KDX’s Google', 'a week not trusted, and no answer yet', 'block'], ['Is it new?', 'yes', 'code']], end: [['Opus answers for KDX’s Google', '', 'opus']] }], note: 'Not built. KDX has no Tracking answer (its brief, Nov 7).' }
  },

  reviewed: { self: '403a10df', above: 'd4e50d2f', on: '2026-11-07' }
});
