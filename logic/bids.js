// The bid and budget module, rebuilt concept first on 2026-11-07. Will: "It's sound like robot speak. Redo the tracking but
// break it down into the concepts so I can read through it", then, on this module, "Redo both the same way after Tracking".
// The logic is the one that works today, and only its shape and words changed. Sources (comm-chat at c275da71, read
// 2026-11-07): src/modules/mod.rs:250-268 (its question, its words and Meta's method), :119 (the four account answers it
// needs), :59 and :61 (an answer counts 7 days; at most 8 campaigns); src/modules/day.rs:108-182 (when it answers);
// src/modules/brief/ (what code hands Opus: mod.rs `build`, numbers.rs, reads.rs, checks.rs); src/chat/tools/module_tools.rs
// :483-617 (the save rules); src/modules/run.rs (held to its bids check); src/modules/brief/numbers.rs:731-763 (what Decide
// reads); the verifiers' verify/src/modules.rs:76 and :95 (the bids check). Judging on Tracking's true numbers is not built
// (Will, Nov 7: "build this as if we can always read the real leads and orders. If we don't have access now we will get
// it"): today the numbers are each platform's own count on every day read whole (src/results/compute.rs:468-470, and the slot
// for broken days is never filled, src/results/load.rs:533). Real cases, read 2026-11-07: Barbara's bids answer 53 (C2); the
// facts that code gathered for Bull's Hedge Funds & PE and Securities campaigns and for Kogalla's PMax; get_client_info of
// Bull (2), C2 (13) and AAFE (42); the verifiers' bids runs of Nov 1 and Nov 3. The run: #136 merged on Nov 6 (4:50 PM
// Pacific), off in live from Nov 7 (docs/claude-code-bridge-setup.md:2254-2263); the dry run's tokens: the memory note of the
// Nov 4 dry run. The old parts: retired/2026-11-07-bids-redo/.
LOGIC.flow({
  id: 'bids',
  title: 'The bid and budget module', short: 'Bid and budget module', status: 'Built; off in live until Will says yes',
  head: 'For each campaign, Bid and budget asks if the bid is right, and what more or less money would do',
  chart: [
    'flowchart TB',
    'WHEN(["Each morning, each live campaign<br/>with something new, or no answer<br/>from the last {bidFresh} days"]):::code',
    'NEEDS["Four answers about the account<br/>come first, each one under<br/>{bidFresh} days old"]:::code',
    'TRUE["The true numbers from Tracking:<br/>each day trusted, or rebuilt<br/>from the client’s own record"]:::next',
    'EARN["What the campaign must earn:<br/>its targets, and the line<br/>where it stops paying"]:::code',
    'COST["What each lead or sale really<br/>cost since its last change<br/>of bid or bid strategy"]:::code',
    'MONEY["What more or less money<br/>would buy, and whether rank<br/>or budget holds it back"]:::opus',
    'GOALS["Eight of Will’s checks on bids<br/>and budgets, and an answer<br/>to each one that fails"]:::will',
    'BID{"Is the bid right? Keep,<br/>raise, cut, or too<br/>few to tell"}:::opus',
    'CHECK{"Does the answer pass<br/>code’s checks?"}:::code',
    'DECIDE(["Decide weighs every proposal,<br/>the most money a month first"]):::opus',
    'NEXT(["The next morning starts with<br/>what would prove the<br/>answer wrong"]):::code',
    'WHEN --> NEEDS', 'NEEDS --> EARN', 'EARN --> COST', 'COST --> MONEY', 'MONEY --> GOALS', 'GOALS --> BID',
    'TRUE -. "not built" .-> COST',
    'BID --> CHECK',
    'CHECK -. "no, so Opus<br/>answers again" .-> BID',
    'CHECK -- yes --> DECIDE', 'CHECK -- yes --> NEXT'
  ],
  links: { WHEN: 'bwhen', NEEDS: 'bneeds', TRUE: 'bcost', EARN: 'bearn', COST: 'bcost', MONEY: 'bmoney', GOALS: 'bgoals', BID: 'bverdict', CHECK: 'bcheck', DECIDE: 'btdecide', NEXT: 'btnext' },
  leaves: { btdecide: 'What Decide gets', btnext: 'The next morning, and Will’s mark' },

  // Each slide belongs to one view: the module's own slides first, then the slides of its rules.
  deck: [
    { about: ['bids'], kicker: 'The idea',
      head: 'Bid and budget sets what a campaign really earned beside what it must earn, then asks what more money would buy',
      visual: { type: 'flow', rows: [
        { title: 'Kogalla’s PMax, Nov 1', steps: [
          ['Its guide is a 300% return', 'and under 167% it stops paying', 'will'],
          ['It returned 124%', 'in the 30 days to Oct 24', 'block'],
          ['More money would return 122%', 'by Google’s own simulator', 'block']],
          end: [['So the answer was to cut', 'and the cut to $16 a day went out on Nov 3', 'opus']] }] },
      vcap: 'That is the whole module on one campaign. The 167% comes from Kogalla’s 60% margin, so under it each sale loses money, and the simulator said more money would not lift the return. The cut went out through case #231, because a module only answers and never changes the account.' },
    { about: ['bids'], kicker: 'Three real answers · Nov 1',
      head: 'Follow three real answers from the tests of Nov 1, one campaign at a time',
      lede: 'Pick a campaign to see what Opus was given and what it said.',
      visual: { type: 'journey', runs: [
        { name: 'C2 · Competitor', out: 'keep', steps: [
          ['A test of the module', 'On Nov 1 a person tested the module, and one subagent answered each campaign.'],
          ['What it cost', 'In its first 25 days it spent $256 on 33 clicks, at $10 a day with no click ceiling, and brought no lead.'],
          ['What it must earn', 'On the call of Sep 24 Waylon named about $500 a conversion as the level for scaling.'],
          ['What more money would buy', 'Google’s simulator priced each added conversion at $1,738, three and a half times the $500 guide.'],
          ['What holds it back', 'It lost 44.9% of its searches to budget and 16.6% to rank.'],
          ['The answer', 'Too few to tell, so keep it at $10 a day, and propose a cut if no lead comes by about $500 spent.']] },
        { name: 'Kogalla · PMax', out: 'wait', steps: [
          ['A test of the module', 'Nov 1.'],
          ['What it must earn', 'Its strategy page puts break-even at a 167% return, at a 60% margin.'],
          ['What it earned', 'It returned 124% in the 30 days to Oct 24, against its 300% guide.'],
          ['What more money would buy', 'Google’s simulator said more money would return only 122%.'],
          ['The answer', 'A problem, so cut. The cut to $16 a day already waited on Will, so it proposed nothing new.']] },
        { name: 'Bull · Securities', out: 'unclear', steps: [
          ['A test of the module', 'Nov 1.'],
          ['What it cost', 'Since its bids were set by hand at $8 on Oct 13, it brought 3 form leads at $383.70 each, against the $300 guide.'],
          ['What holds it back', 'It lost about half its searches to budget and 39% to rank.'],
          ['What more money would buy', 'Google has no simulation for it, and $15 a day more or less would add or lose about one lead a month, at $384 to $488 each.'],
          ['The answer', 'Too few to tell. It proposed nothing, because Will held $65 a day until Nov 11 and its page was rewritten under 72 hours before.']] }
      ] },
      vcap: 'C2’s answer is answer 53, read whole. The other two are the last answers that code showed Opus on Nov 7.' },
    { about: ['bids'], kicker: 'Where it sits',
      head: 'Bid and budget runs beside three other campaign modules, after the account modules and before Decide',
      visual: { type: 'flow', rows: [
        { title: 'First, the whole account', steps: [['Code answers In motion and Money', '', 'code']], end: [['Tracking', 'one subagent each, all at once', 'opus'], ['The client', '', 'opus'], ['Setup and market', 'not one of the four it needs', 'opus']] },
        { title: 'Then each campaign, all at once', steps: [['The four account answers', 'one line each', 'code']], end: [['Results', '', 'opus'], ['Search terms and reach', '', 'opus'], ['Ads and pages', '', 'opus'], ['Bid and budget', 'it needs Tracking, The client, In motion and Money', 'opus']] },
        { title: 'Last', steps: [['Decide', 'reads every fresh answer', 'opus']], end: [['The run makes the changes', 'inside Will’s limits and the spend box', 'code']] }] },
      vcap: 'The four campaign modules run at the same time, so Bid and budget never reads the Results answer on the same campaign. It gets each account answer as one line, with its verdict, its day and its summary.',
      quote: ['What if I make the checking system modular?', 'Oct 31'] },
    { about: ['bids'], kicker: 'What Opus is given',
      head: 'Code gathers the facts for each campaign from Barbara’s stored tables, and Opus reads the rest itself',
      visual: { type: 'flow', rows: [
        { title: 'Code gathers, with no model and no network', steps: [['The four account lines', '', 'code'], ['The campaign’s job, targets and open cases', '', 'code'], ['The cost of each stretch, and the newest {bidWeeks} weeks', '', 'code'], ['The failures of its checks, and its last answer', '', 'code']], end: [['One set of facts, in pages of {bidPage} characters', 'never cut', 'code']] },
        { title: 'Opus reads itself', steps: [['The simulator and the shares', 'each one a query ready to run', 'opus'], ['The bids check', 'run on Will’s computer', 'will']], end: [['Any other read tool it needs', '', 'opus']] }] },
      vcap: 'Nothing in the facts is cut for length. A long set reads in pages, and each page says how to read the next, because Decide’s facts once showed only 4 of C2’s 50 proposals.' },
    { about: ['bids'], kicker: 'Status · Nov 7',
      head: 'The module is built and merged, but it stays off in live until Will says yes to its cost',
      visual: { type: 'timeline', items: [
        ['Oct 31', 'Will says “Build them all so I can start testing and clearing each module.”'],
        ['Nov 1', 'Tests on Kogalla, Bull and C2 run the bids check 12 times and save the module’s first answers.'],
        ['Nov 1', 'Bull’s Hedge Funds answer finds a problem and proposes nothing, and Will says that a problem should always name a fix.'],
        ['Nov 2', 'Meta’s method is added to the instructions, because C2’s Meta campaign had been told to price a raise from Google’s simulator.'],
        ['Nov 3', 'The bids check on C2’s Meta campaign finds that no goal judges a Meta campaign.'],
        ['Nov 4', 'Will asks “we should just run it yes?”, and a dry module run of C2, on a copy, reads about twice the tokens of a full run.'],
        ['Nov 6', 'The module run is merged, and from Nov 7 it stays off in live until Will tests it and says yes to its cost.']] },
      stats: [['380M', 'tokens the dry module run of C2 read, Nov 4', 'real'], ['192M', 'tokens C2’s last full run read, Nov 4', 'real']] },

    { about: ['btdecide'], kicker: 'What Decide gets',
      head: 'Decide reads every proposal of every fresh answer, the most money a month first, and only the run makes a change',
      visual: { type: 'flow', rows: [
        { steps: [['A bid proposal', 'what, why, its effect, what it waits on, and the money a month', 'opus'], ['What Decide reads', 'every proposal of every fresh answer, the most money a month first', 'code'], ['Decide', 'merges them, puts deadlines first, and names next week’s budget for each live campaign', 'opus']], end: [['The run', 'a case, a plan, and the change check', 'code']] },
        { title: 'Bull, Nov 7', steps: [['A raise of a budget or a bid', '', 'code'], ['The spend box', 'the month stays under $5,800 on the whole account, and tracking is trusted in the last {boxWeeks} full weeks', 'will']], end: [['The box is open', 'the weeks of Oct 19 and Oct 26 are trusted', 'keep']] }] },
      vcap: 'The split between campaigns is Decide’s, not Bid and budget’s. A raise goes out on its own only inside the spend box and Will’s switches, and a bid stops at the cost a lead, the return and the click price that he approved.' },
    { about: ['btnext'], kicker: 'The next morning',
      head: 'The next answer must first test what the last one said would prove it wrong',
      visual: { type: 'timeline', items: [
        ['Nov 1', 'Bull’s Hedge Funds answer saves, and names what would prove it wrong, such as leads in the firm’s own records that Google did not count.'],
        ['Nov 7', 'The facts that code gathers open with that test, and tell Opus to test it first from today’s data.'],
        ['If it holds', 'The new answer must say that the last one was wrong, and why.'],
        ['Will’s mark', 'Under Validators and then Modules, Will marks each answer right or wrong with a note, and the next facts carry his mark.'],
        ['A rehearsal', 'A dry run’s or a module test’s answer does not count, so the module stays due.']] },
      vcap: 'Nobody else reads the answer again. The next morning’s data is the second reader, so a wrong answer gets caught the day after it saves.',
      quote: ['on the second run the next day it would catch this again, if something was truly wrong', 'Nov 1'] }
  ],

  examples: {
    WHEN: { tag: 'made', rows: [{ steps: [['Bull’s Securities campaign', 'Yasir raised its daily budget from $65 to $80 on Nov 2', 'code'], ['Did a person change it?', 'yes, after its last answer', 'code']], end: [['It answers the next morning', '', 'opus']] }], note: 'Made from a real change, which the facts of Nov 7 list as new. No live morning has run the module yet, because it stays off in live.' },
    NEEDS: { tag: 'real', rows: [{ steps: [['Bull, Nov 7', 'Tracking, The client, In motion and Money all answered on Nov 1', 'code'], ['Is each one under {bidFresh} days old?', 'yes, through Nov 7', 'code']], end: [['Opus gets the facts', '', 'opus']] }], note: 'The facts that code gathered for Bull’s campaigns on Nov 7.' },
    TRUE: { tag: 'plan', rows: [{ steps: [['Bull’s Google, the week of Oct 5', 'Google counted 1 lead, and the record holds 2 real leads', 'block']], end: [['Bid and budget judges that week on the true 2', 'campaign by campaign, from each lead’s click', 'next']] }], note: 'The week is real, from Barbara’s weekly lead counts for Bull and Bull’s Tracking answer of Nov 1. Today Bid and budget adds Google’s own count on every day it read whole, and only marks that week not trusted.' },
    EARN: { tag: 'real', rows: [{ steps: [['Bull’s Hedge Funds and PE campaign', '', 'code'], ['Its targets', '$300 a lead and $5,800 a month on the whole account, both guides', 'will']], end: [['No break-even line', 'Bull has no margin and no lead value on file', 'wait']] }], note: 'The facts that code gathered for that campaign on Nov 7, and Bull’s client record.' },
    COST: { tag: 'real', rows: [{ steps: [['Bull’s Hedge Funds and PE campaign', 'after its $15 bid of Oct 13', 'code']], end: [['Oct 14 to Oct 31', '$766.12 spent, and no lead', 'block']] }], note: 'The facts that code gathered for that campaign on Nov 7.' },
    MONEY: { tag: 'real', rows: [{ steps: [['C2’s Competitor campaign', 'Google’s simulator, the week of Oct 19', 'opus'], ['From $10 to $199.31 a day', '', 'opus']], end: [['$1,738 for each added conversion', 'three and a half times the $500 guide', 'block']] }], note: 'C2’s answer 53, of Nov 1.' },
    GOALS: { tag: 'real', rows: [{ steps: [['Bull’s Startups campaign, Nov 1', 'the bids check on its own results', 'will']], end: [['2 failed', 'too few conversions for smart bidding, and a $150 bid target against the client’s $300', 'block']] }], note: 'The verifiers’ bids run of Nov 1 on Bull’s Startups campaign.' },
    BID: { tag: 'real', rows: [{ steps: [['C2’s Competitor campaign', '33 clicks and no lead', 'code'], ['Is the bid right?', '', 'opus']], end: [['Too few to tell', 'keep it at $10 a day', 'wait']] }], note: 'C2’s answer 53, of Nov 1.' },
    CHECK: { tag: 'made', rows: [{ steps: [['Bull’s Hedge Funds answer', 'a problem that proposes no fix', 'opus'], ['Does it pass code’s checks?', 'a problem must name its fix', 'code']], end: [['Refused, so nothing saves', '', 'block']] }], note: 'Made from a real answer. Bull’s Hedge Funds answer of Nov 1 saved that day, before this rule, and the rule’s test replays it, so code refuses it today.' },
    DECIDE: { tag: 'made', rows: [{ steps: [['A bid proposal', 'with its money a month', 'opus'], ['What Decide reads', 'the most money a month first', 'code']], end: [['Decide’s order', 'deadlines first, then money', 'opus']] }], note: 'Made, because no real bid answer has proposed a change yet, so no Decide has ranked one.' },
    NEXT: { tag: 'real', rows: [{ steps: [['Bull’s Hedge Funds answer', 'Nov 1', 'opus'], ['The facts of Nov 7', 'open with its test', 'code']], end: [['Test it first, from today’s data', '', 'code']] }], note: 'Its test names the firm’s own leads, searches lost to budget at the $15 bid, a simulator point near $300, and the read of Nov 11.' }
  },

  reviewed: { self: '9a38bdd6', on: '2026-11-07' }
});
