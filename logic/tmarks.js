// Which actions count: Opus chooses (Will, 2026-11-07, on "Will's marks say which actions count": "I want this automated.
// Opus should choose"). Not built: today only Will's word sets a mark (comm-chat src/chat/tools/mark_tools.rs, Will
// 2026-11-01: "Your answer sets the mark"). Kept as built: Jev's morning rating and the wait rule (src/results/labels.rs:1-90,
// src/scorecard/compute.rs:226-262, results/compute.rs:395-407), and Will's own word where he gives one, with its checks
// (mark_tools.rs:115-184, :212-312). Claude's call: Opus never replaces a word of Will's. Real cases: Bull's case #151,
// KDX's case #235, LS Thomas's rule (#589, case #273), the marks and Jev's chances in Barbara's copy of Nov 6.
LOGIC.flow({
  id: 'tmarks', parent: 'tracking', status: 'Not built yet',
  title: 'Which actions count: Opus chooses', short: 'Which actions count',
  head: 'Opus chooses for each action that waits. Code checks the choice before it counts.',
  chart: [
    'flowchart TB',
    'RATE["Each morning Jev rates each<br/>action: does it count real<br/>orders or leads?"]:::code',
    'WAIT{"Recorded in 30 days, no choice<br/>yet, no rule leaves it out,<br/>Jev {waitFloor} or more?"}:::code',
    'NOT(["It needs no choice"]):::code',
    'OPUS["Not built: Opus chooses:<br/>order, lead or no, with why"]:::next',
    'CODE{"Not built: code checks<br/>the choice: does it pass<br/>every rule?"}:::next',
    'REF(["Refused, with why:<br/>Opus chooses again"]):::code',
    'WORD["Will\'s own word, where he<br/>gives one: it beats<br/>Opus\'s choice"]:::will',
    'SAVED(["Saved: order, lead or no,<br/>and whose choice it is"]):::code',
    'COUNT(["An order or a lead counts<br/>beside the main conversion"]):::code',
    'RATE --> WAIT', 'WAIT -- yes --> OPUS', 'WAIT -- no --> NOT',
    'OPUS --> CODE', 'CODE -- yes --> SAVED', 'CODE -- no --> REF', 'REF -.-> OPUS',
    'WORD --> SAVED', 'SAVED --> COUNT'
  ],
  links: { RATE: 'tmrate', WAIT: 'tmwait', OPUS: 'tmopus', CODE: 'tmcode', WORD: 'tmword', COUNT: 'tmcount' },
  leaves: { tmrate: 'Jev’s morning rating', tmwait: 'Does it wait for a choice?', tmopus: 'What Opus reads to choose', tmcode: 'Code’s checks on the choice', tmword: 'Will’s own word', tmcount: 'What a choice changes' },

  deck: [
    { about: ['tmarks'], kicker: 'Will’s change · Nov 7',
      head: 'No action waits for Will: Opus chooses, and says why',
      visual: { type: 'flow', rows: [
        { title: 'Today', steps: [['An action waits', 'for Will’s mark', 'will'], ['A case asks Will', 'lead or not?', 'code']], end: [['It waits until he answers', 'KDX’s Contact_Phone_GA4, still on Nov 7', 'block']] },
        { title: 'Not built', steps: [['An action waits', 'for a choice', 'code'], ['Opus chooses', 'order, lead or no, with why', 'next'], ['Code checks the choice', '', 'next']], end: [['Counted, or left out, the same morning', '', 'keep']] }] },
      vcap: 'KDX, case #235: “3 lead actions wait for Will’s mark, so no one knows what a KDX lead costs.” Will marked two on Nov 2. The third still waits on Nov 7.',
      quote: ['I want this automated. Opus should choose', 'Nov 7'] },
    { about: ['tmarks'], kicker: 'Why a choice is saved · Bull Legal',
      head: 'Will answered once, and a run asked him again',
      visual: { type: 'timeline', items: [
        ['Case #151', 'A run asks if “Calls from website on click” is a lead. Will answers “Not a lead”.'],
        ['Case #219', 'A run asks again: “still waits for Will’s mark, though he answered Not a lead”. His answer set no mark.'],
        ['Nov 1', 'Will: “Your answer sets the mark”. The mark tool is built.'],
        ['After', 'The mark saves from his answer on case #151: no. The action stops waiting.']] },
      vcap: 'A saved choice stops the action from waiting, so no run asks about it again. Opus’s choice saves the same way.' },

    { about: ['tmrate'], kicker: 'Jev’s rating',
      head: 'Each morning Jev rates each action: does it count real orders or leads the main conversion does not?',
      visual: { type: 'scale', label: 'Jev’s chance that the action counts real orders or leads',
        lines: [['{waitFloor}', 'the floor: {waitFloor}', 'will']],
        dots: [[0.80, 'Bull: calls from website on click', 'will'], [0.54, 'KDX: calls from Smart Campaign Ads', 'will'], [0.66, 'KDX: the GA4 email contact', 'will']],
        zones: [[0, '{waitFloor}', 'Under the floor: it never waits', 'code'], ['{waitFloor}', 1, 'It may wait for a choice', 'will']] },
      vcap: 'Jev’s chances beside Will’s marks, in Barbara’s copy of Nov 6. Will marked all three “no”. Jev’s chance only decides what waits. The choice decides what counts.' },

    { about: ['tmwait'], kicker: 'Does it wait?',
      head: 'An action waits for a choice only when no rule decides it',
      visual: { type: 'gate', rows: [
        ['It recorded in the last 30 settled days', '', 'pass'],
        ['No choice yet', 'no word of Will’s, and no choice of Opus’s', 'pass'],
        ['No fixed rule leaves it out', 'removed, hidden, Google’s own, a step before the lead, a copy of the main event, or a lead action on a store', 'pass'],
        ['Jev’s chance is {waitFloor} or more', '', 'pass']], end: ['It waits: Opus chooses', 'next'] },
      vcap: 'KDX, Nov 7: Contact_Phone_GA4 waits, with 2 in the last 30 settled days. C2, Nov 7: four Meta actions wait, such as a messaging conversation that started.' },

    { about: ['tmopus'], kicker: 'What Opus reads',
      head: 'Opus reads the action, its counts and the client’s own words before it chooses',
      visual: { type: 'card', title: 'Bull Legal: calls from website on click', fields: [
        ['What it counts', 'taps on the phone link of the site'],
        ['Jev’s chance', '0.80'],
        ['The client’s words', 'Will’s mail of Oct 29: “So keep call clicks out of the lead numbers Tyler sees.”'],
        ['The choice', 'no, with that mail as its why']], stamp: ['Made from a real case: Will marked it “no” on case #151', 'will'] },
      vcap: 'Not built. A choice names its why and its source, as each fact of a Tracking answer does.',
      quote: ['The model should be able to tell what the real leads are. It can also explore those', 'Oct 25'] },

    { about: ['tmcode'], kicker: 'Code’s checks',
      head: 'Code checks each choice before it counts',
      visual: { type: 'gate', rows: [
        ['The action is on this client’s account', 'by its id, or by its exact name', 'pass'],
        ['The choice is order, lead or no', 'with its why', 'pass'],
        ['No word of Will’s on it', 'his word stands: Opus never replaces it', 'pass'],
        ['A copy of the main action', 'never counts, whatever the choice', 'stop'],
        ['A lead choice on a store', 'it saves, but adds nothing to the count', 'hold']], end: ['Then it saves', 'code'] },
      vcap: 'Not built. A refusal says why, and Opus chooses again. These are the checks a mark of Will’s has today, less the ones on whose words they are.' },

    { about: ['tmword'], kicker: 'Will’s own word',
      head: 'Will’s word still sets a mark, and Opus never replaces it',
      visual: { type: 'flow', rows: [
        { title: 'A click', steps: [['The Results tab', 'order, lead or no', 'will']], end: [['Saved at once', 'only Will may click it', 'will']] },
        { title: 'A client rule', steps: [['LS Thomas: “Conversions = GAds_form_sent_all only”', 'a rule Will approved', 'will']], end: [['A mark for each action it names or leaves out', '', 'code']] },
        { title: 'An answer on a case', steps: [['KDX, case #235', 'Will’s reply, Nov 2', 'will']], end: [['Two marks saved: no', '', 'will']] }] },
      vcap: 'Claude’s call: a word of Will’s beats a model’s choice, and a newer word of his replaces Opus’s. Code checks his word and Jev reads it once, at {markYes} or more, as today.' },

    { about: ['tmcount'], kicker: 'What a choice changes',
      head: 'An order or a lead adds the action to the count. A “no” leaves it out.',
      visual: { type: 'flow', rows: [
        { title: 'Order, or lead', steps: [['A chosen action', '', 'opus']], end: [['It counts beside the main conversion', 'a lead adds nothing on a store', 'keep']] },
        { title: 'No', steps: [['A chosen action', '', 'opus']], end: [['It is left out, and stops waiting', '', 'code']] },
        { title: 'A copy of the main action', steps: [['It counts the same results again', '', 'code']], end: [['Never counted, whatever the choice', '', 'block']] }] },
      vcap: 'Kogalla, Nov 1: its answer asked Will to mark the second Shopify purchase action as no main conversion, because the same pixel sends it the same orders as Purchase (case #87, closed).' }
  ],

  examples: {
    RATE: { tag: 'real', rows: [{ steps: [['Bull: calls from website on click', 'taps on the phone link', 'code'], ['Jev’s rating', '0.80', 'code']], end: [['Likely counts: it may wait', '', 'will']] }], note: 'Barbara’s copy of Nov 6. Will marked it “no” all the same.' },
    WAIT: { tag: 'real', rows: [{ steps: [['KDX: Contact_Phone_GA4', '2 in the last 30 settled days, no mark', 'code'], ['Does it wait?', 'yes', 'code']], end: [['It waits', 'today for Will’s mark', 'will']] }], note: 'KDX’s brief, Nov 7. With Opus’s choice (not built), Opus would choose for it that morning.' },
    NOT: { tag: 'real', rows: [{ steps: [['Bull: calls from website on click', 'Will marked it “no”', 'will'], ['Does it wait?', 'no: it has his word', 'code']], end: [['It needs no choice', '', 'code']] }], note: 'Since his answer on case #151.' },
    OPUS: { tag: 'plan', rows: [{ steps: [['KDX: Contact_Phone_GA4', 'a call, primary: 10 in 14 weeks', 'code'], ['Opus reads it', 'its counts and KDX’s own words', 'next']], end: [['Order, lead or no, with why', '', 'next']] }], note: 'Not built. On Nov 7 it still waits for Will’s mark.' },
    CODE: { tag: 'plan', rows: [{ steps: [['Opus chooses “lead”', 'for a copy of the main action', 'next'], ['Does it pass every rule?', 'no', 'next']], end: [['Refused: a copy never counts', '', 'block']] }], note: 'Not built, and made up.' },
    REF: 'CODE',
    WORD: { tag: 'real', rows: [{ steps: [['KDX, case #235, reply 4504', 'Will’s answer, Nov 2', 'will'], ['Code’s checks and Jev', 'pass', 'code']], end: [['Saved: no, on two actions', '', 'will']] }], note: 'Barbara’s copy of Nov 6 keeps both marks with his answer as their source.' },
    SAVED: { tag: 'plan', rows: [{ steps: [['KDX: Contact_Phone_GA4', 'Opus’s choice passes', 'next']], end: [['Saved: the choice, its why, and “Opus”', '', 'code']] }], note: 'Not built. Today only a word of Will’s saves a mark.' },
    COUNT: { tag: 'real', rows: [{ steps: [['Bull: calls from website on click', 'marked “no”', 'will']], end: [['Left out of the lead count', 'call clicks stay out of the numbers Tyler sees', 'code']] }], note: 'Will’s mail of Oct 29, quoted in Bull’s Tracking answer: “So keep call clicks out of the lead numbers Tyler sees.”' }
  },

  reviewed: { self: 'a840b83c', above: 'd4e50d2f', on: '2026-11-07' }
});
