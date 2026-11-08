// What the campaign must earn: comm-chat src/modules/brief/numbers.rs:212-234 (`head`: the campaign, its job as written or
// else the strategy page clipped to 1,000 characters, the targets that hold, the open cases on it); src/campaign_map/scope.rs
// :183-190 and :250-259 (`sentence`, `holding`: the most specific rows); src/client_profile.rs:623-632 (`in_force`: approved,
// not ended, not moved in from the verifiers' file) and :636-638 (the verifiers judge every approved row). The words ask for a
// cut under break-even (src/modules/mod.rs:262-263), but the facts hold no break-even: numbers.rs:150-160 (`sum_words`: spend,
// conversions, cost each, return, clicks, share; no profit) and brief/mod.rs:118-121 (only each account answer's summary),
// while Money's answer lists the margin (brief/code.rs:294-295). The lead value model exists for the Results tab
// (src/results/lead_value.rs:1-6). Several targets: the playbook's rule (bridge/skills/dwa-ads-playbook/references/
// safety-and-approvals.md:110) against one effect line a proposal (mod.rs:441-464); Will's words of Oct 17 (memory note
// project_multi_target_tradeoffs). Real cases, read 2026-11-07: get_client_info of AAFE (42), Bull (2) and C2 (13); the facts
// that code gathered for Bull's Hedge Funds & PE campaign and Kogalla's PMax; their last answers of Nov 1. Old part:
// retired/2026-11-07-bids-redo/bidbrief.js (its job, the targets, the break-even question).
LOGIC.flow({
  id: 'bearn', parent: 'bids',
  title: 'What the campaign must earn', short: 'What it must earn',
  head: 'Each campaign is held to the client’s own numbers, and a campaign that cannot pay for itself should get a cut',
  chart: [
    'flowchart TB',
    'JOB["Its job: what the campaign is<br/>for, or the strategy page<br/>when none is written"]:::code',
    'TGT["The client’s targets that hold<br/>on it, the most specific first"]:::code',
    'KIND{"How firm is<br/>each target?"}:::code',
    'SOFT(["A guide, not a<br/>stop point"]):::code',
    'FLOOR(["A floor to stay<br/>at or above"]):::code',
    'HARD(["A limit not<br/>to cross"]):::code',
    'EVEN["Where it stops paying: code gives<br/>no break-even line, so Opus<br/>looks for one itself"]:::code',
    'JOB --> TGT', 'JOB --> EVEN',
    'TGT --> KIND',
    'KIND --> SOFT', 'KIND --> FLOOR', 'KIND --> HARD'
  ],
  links: { JOB: 'bejob', TGT: 'betargets', KIND: 'betargets', EVEN: 'bidbreakeven' },
  leaves: {
    bejob: 'Its job comes first',
    betargets: 'The targets that hold',
    bidbreakeven: { title: 'A break-even line', open: {
      q: 'Bid and budget’s instructions say a campaign under break-even gets a proposed cut, but code hands Opus no break-even line. Should code put one in the facts it gathers?',
      since: 'Nov 7',
      opts: [
        ['Yes, code writes a break-even line from the margin or the approved lead value, and says when neither is on file', true, 'The cut rule then rests on a number that code reads, and a blank shows as a blank, not as a guess.'],
        ['No, Opus finds the margin or the lead value with its own read tools', false, 'This is how it works today. Kogalla’s answer found it on the strategy page, and Bull’s found none.'],
        ['Take the break-even order out of the instructions until lead values are on file', false, 'It stops an order that the facts cannot support for most lead clients.']] } }
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['bearn'], kicker: 'The idea',
      head: 'A campaign is held to the client’s own number, such as a cost a lead or a return on its spend',
      visual: { type: 'bars', max: 900, rows: [
        { label: 'Bull’s guide, a cost a lead', parts: [[300, 'will', '$300 a lead']] },
        { label: 'What a form lead from Hedge Funds and PE cost since May 11', parts: [[886, 'block', '$886 a lead']] }] },
      vcap: 'Bull’s Hedge Funds and PE campaign is held to a guide of $300 a lead on the whole account. Since May 11 a form lead there cost $886, about three times the guide, and no lead came after Sep 3.' },

    { about: ['bejob'], kicker: 'Its job comes first',
      head: 'Opus reads what the campaign is for before it reads a single number',
      visual: { type: 'card', title: 'Bull’s Hedge Funds and PE campaign, as code showed it to Opus on Nov 7', fields: [
        ['The campaign', 'A non-brand Search campaign, and it is on.'],
        ['Its job', 'None is written, so code hands on its type and the strategy page.'],
        ['The strategy page', 'Its first {bidStrategy} characters, which open with Tyler’s words “I would expect a few conversions a month from the hedge funds and pe, which are the highest value matters.”'],
        ['The targets that hold', '$300 a lead and $5,800 a month on the whole account, both guides, not stop points.'],
        ['The open cases on it', '5, from negatives to a sitelink that drops the ad click’s id.']], stamp: ['Read before the numbers', 'code'] },
      vcap: 'A job written for the campaign takes the place of the strategy page, because it says what this one campaign is for. Bull’s campaigns and Kogalla’s PMax have no job written yet, so each one gets the strategy page.' },

    { about: ['betargets'], kicker: 'The targets',
      head: 'Each target is one number, with where it applies and how firm it is',
      visual: { type: 'card', title: 'AAFE’s approved targets', fields: [
        ['A 300% return, a guide', 'On its non-brand and dentist campaigns. Rob said on Jul 1 that “3x is really where i expect to be in order just to make me profitable”.'],
        ['A 200% return, a floor', 'On the same two campaigns, because Rob turned off what fell under 2x.'],
        ['A 527% return, a guide', 'On all of Google Ads, from Barbara’s rule over the last 90 settled days.'],
        ['$41,040 a month, a hard limit', 'On all of Google Ads.']], stamp: ['On those two campaigns, their own rows win over the Google row', 'code'] },
      vcap: 'Code hands Opus only the rows in force, meaning approved and not ended. A row moved in from the verifiers’ old file stays out, even though the verifiers still judge by it.' },
    { about: ['betargets'], kicker: 'Several targets',
      head: 'A client often holds several targets at once, so a change must weigh every one it touches',
      visual: { type: 'flow', rows: [
        { title: 'C2 on Google, from Nov 1', steps: [['$500 a lead, a guide', 'from Waylon’s words of Sep 24', 'will'], ['$11,800 a month, a hard limit', 'twice its last 30 days of spend', 'will']], end: [['A raise on Google must weigh both', '', 'opus']] },
        { title: 'A bid proposal today', steps: [['What it changes, and why', '', 'opus']], end: [['One line for its effect', 'not one for each target', 'wait']] }] },
      vcap: 'Will’s rule in the playbook asks each change to say better, worse or no change for each target it touches. A bid proposal still has one line for its effect.',
      quote: ['This is the hardest part of working with the clients. They often won\'t accept only one.', 'Oct 17'] },

    { about: ['bidbreakeven'], kicker: 'A break-even line',
      head: 'The instructions ask for a cut under break-even, but code puts no break-even line in front of Opus',
      visual: { type: 'flow', rows: [
        { title: 'Kogalla, Nov 1', steps: [['The strategy page', 'break-even is a 167% return at a 60% margin', 'code']], end: [['Opus judged PMax against it', 'and said cut', 'opus']] },
        { title: 'Bull, Nov 1', steps: [['No margin and no lead value on file', 'and the strategy page names neither', 'code']], end: [['Opus said only the firm’s signed clients would set a real break-even', '', 'wait']] }] },
      vcap: 'Money’s answer lists the client’s margin when one is on file, but Opus gets only Money’s one line. So today the cut rule rests on what Opus finds by itself.',
      open: 'bidbreakeven' }
  ],

  examples: {
    JOB: { tag: 'real', rows: [{ steps: [['Bull’s Hedge Funds and PE campaign', 'no job written', 'code']], end: [['Opus gets its type and the strategy page', 'the strategy page opens with Tyler’s words', 'code']] }], note: 'The facts that code gathered for that campaign on Nov 7.' },
    TGT: { tag: 'real', rows: [{ steps: [['Bull’s Hedge Funds and PE campaign', '', 'code']], end: [['$300 a lead and $5,800 a month', 'both on the whole account', 'will']] }], note: 'The facts that code gathered for that campaign on Nov 7. Will approved both on Oct 30.' },
    KIND: { tag: 'real', rows: [{ steps: [['C2’s four targets of Nov 1', '', 'will']], end: [['Two guides and two hard limits', '$500 and $60 a lead are guides, and the $11,800 and $200 caps are hard', 'code']] }], note: 'C2’s client record, read on Nov 7.' },
    SOFT: { tag: 'real', rows: [{ steps: [['Bull’s $300 a lead', '', 'will']], end: [['A guide, not a stop point', '', 'code']] }], note: 'The facts that code gathered for Bull on Nov 7.' },
    FLOOR: { tag: 'real', rows: [{ steps: [['AAFE’s 200% return', 'on its non-brand and dentist campaigns', 'will']], end: [['A floor to stay at or above', '', 'code']] }], note: 'AAFE’s client record, read on Nov 7.' },
    HARD: { tag: 'real', rows: [{ steps: [['AAFE’s $41,040 a month', 'on all of Google Ads', 'will']], end: [['A limit not to cross', '', 'block']] }], note: 'AAFE’s client record, read on Nov 7.' },
    EVEN: { tag: 'real', rows: [{ steps: [['Kogalla’s PMax, Nov 1', 'no break-even line from code', 'code'], ['Opus reads the strategy page', 'a 167% return at a 60% margin', 'opus']], end: [['It judges PMax against 167%', '', 'opus']] }], note: 'Kogalla’s last answer of Nov 1, and its strategy page, as code showed them to Opus on Nov 7.' }
  },

  reviewed: { self: '2cbbef25', above: '4bfe1dd5', on: '2026-11-07' }
});
