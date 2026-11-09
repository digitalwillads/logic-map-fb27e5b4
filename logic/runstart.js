// What starts the morning run. comm-chat at origin/main 1c24d43a, read 2026-11-08: src/claude_code_jobs.rs:2333-2440
// (`tick_slot`, in its order: the automation on, its morning trigger on, the day's window, Will's desktop ready, a trigger
// deciding or a trigger's run open holds it, then the morning gate, the claim and the launch), :1530-1543 (`window_of`: its
// time and 9 hours more), :1659 (a tick every 30 seconds), :2254-2288 (switched on after its time: the first run is the next
// day), :2087-2100 (`morning_gate`: MODULE_RUNS on gives a module run before the gate decides), :2127-2140 (`scheduler_on`,
// MODULE_RUNS_ENV, unset or on), :2190-2200 (`ready`: only Will's desktop, while it heartbeats), :1616-1624 (the module run's
// opening), :29-36 (Run now: dry or real, on Will's desktop or the starter's own computer, it reports to its starter);
// src/triggers/morning.rs:9-22 and :111-121 (the old morning run: a look, or the full run once a week and on the report day;
// MORNING_GATE=off makes every morning the full run); src/triggers/kinds.rs:137-260 (what else starts a run);
// src/triggers/fire.rs:217-234 (a trigger that joins a module run asks through ask_person, never DECISIONS), :260-274 (only a
// trigger's run holds the morning run), :285-317 (`open_run`); docs/claude-code-bridge-setup.md:2183-2198 (triggers),
// :2200-2253 (the morning gate), :2255-2264 (the module run's switch: off in live since #136 merged). Barbara's
// list_automations, read 2026-11-08: each client's time, all 14 client runs off, 8 held, the A&R check-in on at 8:30 AM ET,
// the newest scheduled client runs of Nov 4 (C2 #250, KDX #248, Kogalla #249, Bull #251, Affordable Tree Service #252 at
// 7:00 AM; AAFE #254 at 8:45 AM). The dry run 260 was started through the private test link (via webhook) on a copy of
// Barbara (instances/modrun2/barbara.db, read with immutable=1). Will's answer of Nov 8 to "How should the module run go
// live?": "Turn it on, then turn on each client run that you want", with his note on the switch's slide: "I don’t want to have
// this be an option I want to have it always run themodules". So the switch and the old run left the chart; the switch's
// removal is drawn as not built, because the code still reads MODULE_RUNS and live keeps it off.
LOGIC.flow({
  id: 'runstart', parent: 'morning',
  title: 'What starts the run', short: 'What starts the run',
  head: 'Only the clock starts a morning run, and only for a client whose run Will has turned on, on his own computer',
  chart: [
    'flowchart TB',
    'CLOCK(["The clock reaches the client’s<br/>own time, such as 7:00 AM<br/>in New York"]):::code',
    'HAND(["Or a person presses Run now,<br/>for real or as a dry run"]):::will',
    'ON{"Has Will turned on<br/>the client’s run?"}:::will',
    'OFF(["No run that day"]):::block',
    'PC{"Is Will’s computer on<br/>and connected?"}:::code',
    'ONE{"Is a run that a trigger<br/>started still open?"}:::code',
    'WAIT(["The run waits, and the day<br/>is missed after {runWindow} hours"]):::code',
    'MOD(["A module run opens in<br/>a new tab"]):::opus',
    'NOSW["Not built: the switch that<br/>keeps the module run off<br/>in live comes out"]:::next',
    'TRIG(["A client’s mail or an alert<br/>starts a short run of its own,<br/>or joins the open one"]):::code',
    'CLOCK --> ON', 'ON -- no --> OFF', 'ON -- yes --> PC',
    'PC -- no --> WAIT', 'PC -- yes --> ONE',
    'ONE -- yes --> WAIT', 'ONE -- no --> MOD',
    'HAND --> MOD',
    'NOSW -. "not built" .-> MOD',
    'TRIG -. "it may join" .-> MOD'
  ],
  links: { CLOCK: 'rsclock', PC: 'rsclock', ONE: 'rsclock', WAIT: 'rsclock', ON: 'rson', OFF: 'rson', NOSW: 'rsalways', HAND: 'rshand', TRIG: 'rstrigger' },
  leaves: {
    rsclock: 'Each client’s own time',
    rson: 'Will’s switch for each client',
    rsalways: 'Every morning runs the modules',
    rshand: 'Run now, for real or as a dry run',
    rstrigger: 'What else starts a run'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['runstart'], kicker: 'The idea',
      head: 'A morning run needs three things, the client’s own time, Will’s switch for that client, and his computer',
      visual: { type: 'gate', rows: [
        ['The client’s own time', 'Each client has one, in New York time, such as 7:00 AM.', 'pass'],
        ['Will’s switch for the client’s run', 'Will or Jacob turns it on, on the Automations page.', 'hold'],
        ['Will’s desktop, on and connected', 'Every client’s run opens there, in a new tab.', 'pass']],
        end: ['The run opens as a module run', 'opus'] },
      vcap: 'A client’s mail, a call or an alert never starts the morning run. Each one starts a short run of its own that does only what the message asks.' },
    { about: ['runstart'], kicker: 'Today · Nov 8',
      head: 'On Nov 8 all 14 client runs are off, so no client morning opens at all',
      visual: { type: 'dots', groups: [[8, 'will', 'off, and Will’s hold also keeps every write for his Approve'], [6, 'code', 'off, with no hold']] },
      vcap: 'The newest scheduled client runs were on Nov 4, at 7:00 AM for C2, KDX, Kogalla, Bull Legal and Affordable Tree Service, and at 8:45 AM for AAFE. Only the A&R check-in still opens by the clock, at 8:30 AM.' },

    { about: ['rsclock'], kicker: 'Each client’s own time',
      head: 'Ten of the 14 client runs open at 7:00 AM, and all of them open on Will’s desktop',
      visual: { type: 'timeline', items: [
        ['7:00 AM', 'C2, KDX, Kogalla, Bull Legal, Affordable Tree Service, Welch, Flexan, ADI, ILC Dover and Thomas.'],
        ['8:30 AM', 'The A&R check-in, the only run that is on today.'],
        ['8:45 AM', 'AAFE, KeyBar, Trailer Jacks and Extreme Tactical Dynamics.'],
        ['4:00 PM', 'A 7:00 AM run that has not opened by now is missed for that day.']] },
      vcap: 'If Will’s computer sleeps, the run waits and opens when the computer connects, up to {runWindow} hours after its time. A short run that a trigger started holds the morning run until it ends. Nothing spreads out the ten runs of 7:00 AM, and the only full module run so far took almost five hours.' },

    { about: ['rson'], kicker: 'Will’s switch',
      head: 'Only Will and Jacob turn a client’s run on, and today every client run is off',
      visual: { type: 'flow', rows: [
        { title: 'On the Automations page', steps: [
          ['A client’s run, on or off', 'and its time of day', 'will'],
          ['Its morning trigger, on the Triggers tab', 'off means that the clock starts nothing', 'will']],
          end: [['Both are on, so the clock opens the run', '', 'keep']] }] },
      vcap: 'A run that is turned on after its time waits for the next day. Today all 14 client runs are off, and 8 of them also have Will’s hold, so every write there would wait for his Approve.' },

    { about: ['rsalways'], kicker: 'Every morning runs the modules',
      head: 'Will wants every client’s morning to run the modules, with no switch, and he turns on each client’s run himself',
      visual: { type: 'flow', rows: [
        { title: 'Will’s call, Nov 8', steps: [['Will turns on a client’s run', 'on the Automations page', 'will'], ['Its morning opens at its own time', '', 'code']], end: [['A module run, every time', '', 'opus']] },
        { title: 'The code today', steps: [['One switch on the server', 'live keeps it off since Nov 7', 'code']], end: [['A client’s morning gets the old run', 'until the switch comes out', 'block']] }] },
      vcap: 'Each client run that Will turns on may read about twice the tokens of the old run, and up to ten of them open at 7:00 AM on his desktop. A trigger’s own run and a test of one module stay as they are.',
      quote: ['I don’t want to have this be an option I want to have it always run themodules', 'Nov 8'] },

    { about: ['rsalways'], kicker: 'The old morning run',
      head: 'Until the switch comes out, a client’s morning in live gets the old run, a short look on most days and the full check once a week',
      visual: { type: 'flow', rows: [
        { title: 'Most mornings', steps: [['A short look', 'told what came in since the last run', 'opus']], end: [['It works only the new items', '', 'code']] },
        { title: 'Once a week, and on the report day', steps: [['The full check', 'every verifier, the weekly report and the story', 'opus']], end: [['One long thread does it all', '', 'block']] }] },
      vcap: 'C2’s run of Nov 4 was a full check of this old kind. It made no call to a module, and its one thread read 177 million tokens from its cache. A second setting can also make every morning the full check.' },

    { about: ['rshand'], kicker: 'Run now',
      head: 'A person can start a run by hand, and a dry run reads everything but changes nothing',
      visual: { type: 'gate', rows: [
        ['A real run', 'It works like a morning run, and its changes go out within Will’s switches.', 'pass'],
        ['A dry run', 'The tools refuse every write, so nothing changes.', 'stop'],
        ['The end of a dry run', 'One ask to finish, and then the tab closes with no look back.', 'hold']],
        end: ['The dry run of Nov 4 was one of these, on a copy of Barbara', 'code'] },
      vcap: 'Will or Jacob can start one from the Automations page, on Will’s desktop or on their own computer. A run that a person started reports to that person.' },

    { about: ['rstrigger'], kicker: 'What else starts a run',
      head: 'A client’s mail, a call or an alert starts a short run of its own, or joins the run that is open',
      visual: { type: 'gate', rows: [
        ['A client’s mail, or a recorded call', 'Jev sorts it. An ask for today starts or joins a run, and one that can wait opens a case.', 'pass'],
        ['A change by someone not on the list', 'Chad reads Google’s change history every 15 minutes.', 'pass'],
        ['A Chad Ads alert', 'Runaway spend, leads that stop, a stopped ad or a broken page, each only while its trigger is on.', 'hold'],
        ['A failed payment, or a change in billing', 'Stripe sends it.', 'pass']],
        end: ['Its own short run does only what the message asks', 'code'] },
      vcap: 'A trigger’s run never uses the modules. When it joins a module run that is open, any question in it goes to a person through a case, because a module run never asks questions in its own thread.' }
  ],

  examples: {
    CLOCK: { tag: 'real', rows: [{ steps: [['C2’s time is 7:00 AM', '', 'code'], ['Nov 4, 7:00 AM', 'run #250 opens on Will’s desktop', 'code']], end: [['It is the old kind of run, with no modules', '', 'code']] }], note: 'This is from C2’s runs in Barbara. It was C2’s last run that the clock started, and it came before the module run was merged.' },
    HAND: { tag: 'real', rows: [{ steps: [['Nov 4, 11:21 PM', 'a person starts a dry run of C2', 'will']], end: [['A module run, on a copy of Barbara', 'so nothing can change', 'opus']] }], note: 'This is from C2’s dry run of Nov 4. A person started it through the private test link, on a copy of Barbara.' },
    ON: { tag: 'real', rows: [{ steps: [['All 14 client runs', 'Nov 8', 'will']], end: [['All of them are off', '', 'block']] }], note: 'This is from the Automations list in Barbara on Nov 8.' },
    OFF: { tag: 'real', rows: [{ steps: [['KDX, Nov 8, 7:00 AM', 'its run is off', 'will']], end: [['No run that day', '', 'block']] }], note: 'This is from the Automations list in Barbara on Nov 8. KDX’s newest run is still the one of Nov 4.' },
    PC: { tag: 'made', rows: [{ steps: [['A morning when Will’s desktop sleeps', '', 'code'], ['It wakes at 9:10 AM', '', 'code']], end: [['The 7:00 AM run opens at 9:10 AM', '', 'code']] }], note: 'We made this up from the rule in code, because we read no real morning like it for this map.' },
    ONE: { tag: 'made', rows: [{ steps: [['A client’s mail at 6:50 AM starts a short run', '', 'code'], ['That short run is still open at 7:00 AM', '', 'code']], end: [['The morning run waits until that short run ends', '', 'code']] }], note: 'We made this up from the rule in code, because we read no real morning like it for this map.' },
    WAIT: { tag: 'made', rows: [{ steps: [['Will’s desktop stays off all day', '', 'code']], end: [['At 4:00 PM the 7:00 AM run is missed', '', 'block']] }], note: 'We made this up from the rule in code, because we read no real morning like it for this map.' },
    NOSW: { tag: 'plan', rows: [{ steps: [['Will turns on C2’s run', '', 'will'], ['The next morning at 7:00 AM', '', 'code']], end: [['A module run opens, with no switch to ask', '', 'opus']] }], note: 'This is Will’s decision of Nov 8. The code still has the switch, and live keeps it off, so this is not built yet.' },
    MOD: { tag: 'real', rows: [{ steps: [['Nov 4, 11:21 PM', 'the dry run of C2', 'code']], end: [['It opens with the day and the client first', 'then the steps of the module run', 'opus']] }], note: 'This is from C2’s dry run of Nov 4, which ran on a copy of Barbara and changed nothing.' },
    TRIG: { tag: 'made', rows: [{ steps: [['Waylon mails at 9:00 AM', 'and asks for something today', 'will'], ['The morning run is still open', '', 'code']], end: [['His mail joins that run', 'and a question for Will goes to a case', 'code']] }], note: 'We made this up from the rule in code, because no live morning has run as a module run yet.' }
  },

  reviewed: { self: '4bfde01e', above: '2525099a', on: '2026-11-08' }
});
