// What more or less money would buy: the reads no stored table holds, handed to Opus as queries to run (comm-chat
// src/modules/brief/reads.rs:1-5, Google took each query on KDX and ETD on Oct 31; :7-14 the simulator and the shares; :63-65
// Meta's money in cents; :77-90 `bids`, by platform, and C2's $20 campaign budget of Nov 2). The words (src/modules/mod.rs
// :260-264): price a raise per added conversion from Google's simulator, beside the target; say if rank or budget holds it
// back; say what a set amount more or less would buy, and the split between campaigns is Decide's; unused cap is not money
// at stake. Meta's method (:265-267), with Will's words of Nov 2 (:86-87). Real cases, read 2026-11-07: C2's answers 53
// (Competitor) and 52 (Brand); the last answers of Bull's Hedge Funds & PE and Securities campaigns as code showed them on
// Nov 7; C2's Meta campaign of Nov 2 (mod.rs:758-760). Old part: retired/2026-11-07-bids-redo/bidbrief.js (the reads, the
// simulator, Meta's method).
LOGIC.flow({
  id: 'bmoney', parent: 'bids',
  title: 'What more or less money would buy', short: 'What money would buy',
  head: 'More money pays only while each added lead or sale still earns more than it costs, so Opus prices the added ones',
  chart: [
    'flowchart TB',
    'READS["Code hands Opus the reads that<br/>no stored table holds, each<br/>one ready to run"]:::code',
    'SIM["Google’s simulator: what each<br/>budget or bid would bring<br/>in a week"]:::opus',
    'ADD["The price of each added<br/>lead or sale, beside<br/>the target"]:::opus',
    'SHARE["The searches it lost in the last<br/>30 days, to budget and to rank"]:::opus',
    'HELD{"What holds<br/>it back?"}:::opus',
    'BUDGET(["Budget, so more money<br/>buys more searches"]):::opus',
    'RANK(["Rank, so more money<br/>only buys dearer clicks"]):::opus',
    'META["On Meta, which has no simulator,<br/>its cost at each budget below<br/>and how often people see it"]:::opus',
    'SET["What a set amount more or less<br/>would buy, and Decide splits<br/>the money between campaigns"]:::opus',
    'READS --> SIM', 'SIM --> ADD',
    'READS --> SHARE', 'SHARE --> HELD',
    'HELD -- budget --> BUDGET', 'HELD -- rank --> RANK',
    'READS --> META',
    'ADD --> SET', 'BUDGET --> SET', 'RANK --> SET', 'META --> SET'
  ],
  links: { READS: 'bmreads', SIM: 'bmsim', ADD: 'bmsim', SHARE: 'bmheld', HELD: 'bmheld', META: 'bmmeta', SET: 'bmset' },
  leaves: {
    bmreads: 'Reads no table holds',
    bmsim: 'Google’s simulator',
    bmheld: 'Rank or budget',
    bmmeta: 'On Meta',
    bmset: 'A set amount more or less'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['bmoney'], kicker: 'The idea',
      head: 'The average cost of a lead hides what the next lead would cost, so Opus prices the next one',
      visual: { type: 'flow', rows: [
        { title: 'Bull’s Securities campaign, Nov 1', steps: [['It loses about half its searches to budget', 'and 39% to rank', 'code'], ['$15 a day more or less', 'would add or lose about one lead a month', 'opus'], ['Each added lead would cost $384 to $488', 'against the $300 guide', 'block']] , end: [['So no raise', 'and too few to tell', 'opus']] }] },
      vcap: 'A campaign can lose searches to budget and still not be worth more money, because the next leads cost more than the guide. That is why the instructions ask Opus to price each added lead beside the target, not the average one.' },

    { about: ['bmreads'], kicker: 'Reads no table holds',
      head: 'Code hands Opus each read as a query to run, so Opus spends nothing on finding it',
      visual: { type: 'flow', rows: [
        { title: 'Google', steps: [['The simulator', 'points for a cost target, a return target, the budget, the bid and the share of searches', 'code'], ['The shares of the last 30 days', 'lost to rank, lost to budget, and the top of the page', 'code']], end: [['Opus runs each one as written', '', 'opus']] },
        { title: 'Meta', steps: [['The campaign’s own budget', '', 'code'], ['Each ad set’s budget and bid', '', 'code'], ['90 days by week, with how often people see it', '', 'code']], end: [['Budgets come in cents, but spend in whole units', '', 'wait']] },
        { title: 'Microsoft', steps: [['The campaign’s 30 days', 'with the share lost to budget and to rank', 'code']], end: [['Checked by Chad only', 'no login reached Microsoft', 'next']] }] },
      vcap: 'Google took every one of these queries on KDX and ETD on Oct 31. C2’s Meta campaign held a $20 budget on the campaign itself, which no ad set read shows, so code now hands on the campaign’s own budget too.' },

    { about: ['bmsim'], kicker: 'A real simulator read · C2, Nov 1',
      head: 'The simulator prices each added conversion, and on C2’s Competitor campaign it came to $1,738, three and a half times the guide',
      visual: { type: 'bars', max: 2000, rows: [
        { label: 'The $500 guide', parts: [[500, 'will', '$500']] },
        { label: 'Each added conversion, from $6.23 to $10 a day', parts: [[889, 'wait', '$889']] },
        { label: 'Each added conversion, from $10 to $199.31 a day', parts: [[1738, 'block', '$1,738']] }] },
      vcap: 'Answer 53 ran the simulator on C2’s Competitor campaign for the week of Oct 19 to 25. The simulator counted 13 clicks that week where 7 were real, so only its shape counts.' },
    { about: ['bmsim'], kicker: 'When the simulator reads high',
      head: 'The simulator can read high, so Opus sets its points beside what the campaign really did',
      visual: { type: 'flow', rows: [
        { title: 'C2’s Brand campaign, answer 52', steps: [['The simulator prices more conversions at $295 to $433 each', 'with a higher click ceiling', 'opus'], ['Each of its points frees the $4 ceiling', 'and counts 4.5% to 5.1% of clicks as conversions', 'code'], ['The real rate was 2.6%', '2 of 78 clicks', 'keep']], end: [['At the real rate, about $394 and $620 each', '', 'block']] }] },
      vcap: 'In the same week the campaign really had 13 clicks and 1 conversion, under the simulator’s lowest point. So the answer priced each step again at the real rate before it judged a raise.' },

    { about: ['bmheld'], kicker: 'Rank or budget',
      head: 'More money buys more searches only when budget holds a campaign back, not rank',
      visual: { type: 'flow', rows: [
        { title: 'C2’s Competitor campaign, the 30 days to Nov 1', steps: [['It lost 44.9% of its searches to budget', 'and 16.6% to rank', 'code']], end: [['Budget holds it back more than rank', '', 'opus']] },
        { title: 'C2’s Brand campaign, Sep 30 to Oct 31', steps: [['It lost 21.6% of its searches to rank', 'and 1.7% to budget', 'code']], end: [['Its $4 click ceiling holds it back, not its budget', '', 'block']] }] },
      vcap: 'A campaign that loses searches to budget can buy more of them with more money. A campaign that loses them to rank gets few more from money alone, so Bull’s Hedge Funds answer said more money there would only buy dearer clicks.',
      stats: [['44.9%', 'of the Competitor campaign’s searches lost to budget', 'real'], ['21.6%', 'of the Brand campaign’s searches lost to rank', 'real']] },

    { about: ['bmmeta'], kicker: 'On Meta',
      head: 'Meta has no simulator, so a Meta campaign gets its own way to price more money',
      visual: { type: 'flow', rows: [
        { title: 'C2, Nov 2', steps: [['The instructions for its Meta campaign', 'said to price a raise from Google’s simulator', 'opus']], end: [['Meta has none', 'so a test now fails instructions that name Google with no way for Meta', 'block']] },
        { title: 'Now, on a Meta campaign', steps: [['Price a raise', 'from its cost at each budget below', 'opus'], ['Size a budget change', 'from the daily budget times 7, never from one day’s spend', 'opus']], end: [['Budgets sit on ad sets, an ad set with no purchase is zero return, and a rising frequency buys repeats', '', 'opus']] }] },
      vcap: 'Meta’s method is added to the instructions for a Meta campaign, and for the whole account of a client with a Meta account.',
      quote: ['We are going to run this on very meta heavy accounts as well', 'Nov 2'] },

    { about: ['bmset'], kicker: 'A set amount more or less',
      head: 'Opus says what a set amount more or less would buy, and Decide splits the money between campaigns',
      visual: { type: 'card', title: 'C2’s Competitor campaign, answer 53', fields: [
        ['At its real pace', 'It spends about $10.25 a day, or $71.74 a week, at $7.76 a click.'],
        ['$3.77 a day less', 'Going to $6.23 saves about $17.72 a week and gives up about 0.02 simulated conversions a week.'],
        ['A pause', 'It saves about $72 a week and gives up about 0.03 conversions a week.'],
        ['$10 a day more', 'It would buy about 1.3 more clicks a day, and no click has brought a lead yet.']], stamp: ['The split between campaigns is Decide’s', 'opus'] },
      vcap: 'Budget that a campaign does not spend is not money at stake. C2’s Brand campaign spent $268 of the $480 its budget allowed from Sep 30 to Oct 31, so its answer said more budget alone would buy almost nothing.' }
  ],

  examples: {
    READS: { tag: 'real', rows: [{ steps: [['Bull’s Hedge Funds and PE campaign, Nov 7', 'a Google campaign', 'code']], end: [['Two queries to run', 'the simulator, and the shares of 30 days', 'code']] }], note: 'The facts that code gathered for that campaign on Nov 7.' },
    SIM: { tag: 'real', rows: [{ steps: [['C2’s Competitor campaign', 'the simulator, Oct 19 to 25', 'opus']], end: [['$10 a day brings 0.030 conversions a week', 'and $199.31 a day brings 0.440', 'code']] }], note: 'C2’s answer 53, of Nov 1.' },
    ADD: { tag: 'real', rows: [{ steps: [['From $10 to $199.31 a day', '$712.84 more for 0.41 more conversions a week', 'opus']], end: [['$1,738 for each added conversion', 'three and a half times the $500 guide', 'block']] }], note: 'C2’s answer 53, of Nov 1.' },
    SHARE: { tag: 'real', rows: [{ steps: [['C2’s Competitor campaign', 'the 30 days to Nov 1', 'opus']], end: [['44.9% lost to budget, 16.6% to rank', 'and it showed on 38.4% of its searches', 'code']] }], note: 'C2’s answer 53, of Nov 1.' },
    HELD: { tag: 'real', rows: [{ steps: [['C2’s Competitor campaign', '44.9% to budget, 16.6% to rank', 'code'], ['What holds it back?', '', 'opus']], end: [['Budget, more than rank', '', 'opus']] }], note: 'C2’s answer 53, of Nov 1.' },
    BUDGET: { tag: 'real', rows: [{ steps: [['C2’s Competitor campaign', 'held back by budget', 'opus']], end: [['$10 a day more would buy about 1.3 more clicks a day', '', 'opus']] }], note: 'C2’s answer 53, of Nov 1.' },
    RANK: { tag: 'real', rows: [{ steps: [['Bull’s Hedge Funds and PE campaign', 'held back by rank', 'opus']], end: [['More money would only buy dearer clicks', '', 'block']] }], note: 'Its last answer of Nov 1, as code showed it to Opus on Nov 7.' },
    META: { tag: 'made', rows: [{ steps: [['A Meta ad set at $20 a day', 'its cost a lead at $10 and $15 a day before', 'opus']], end: [['A raise priced from those lower budgets', 'sized from $20 times 7, a week', 'opus']] }], note: 'Made from Meta’s method in the words. No bid answer on a Meta campaign has been read for this map.' },
    SET: { tag: 'real', rows: [{ steps: [['C2’s Competitor campaign', '$3.77 a day less, or a pause', 'opus']], end: [['About $17.72 or $72 a week saved', 'for 0.02 or 0.03 conversions a week given up', 'code']] }], note: 'C2’s answer 53, of Nov 1.' }
  },

  reviewed: { self: 'ab2de63b', above: 'a030a55d', on: '2026-11-08' }
});
