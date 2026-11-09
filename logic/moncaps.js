// Each cap and its month, in the Money module. comm-chat at origin/main 1c24d43a, read 2026-11-08: src/modules/brief/code.rs
// :205-220 (`cap_line`: this month so far, the real pace of the last 14 days, that pace over 30 days against the cap, and
// where the month ends), :250-268 (a cap whose month did not read; "No monthly cap is approved."); src/spend_box.rs:502-517
// (`caps`, `walls`: each approved cap in force but a floor; a cap the import moved from the verifiers' file counts only
// beside one of Will's), :919 (each cap's month at the real pace), :692-698 (`pace_after`: each campaign's stored spend over
// the stored days), :713-741 (`month_by_the_week`, `month_at`: a cap that covers spend in two currencies does not read),
// :495-500 (`days_left`, today included), :20-26 (a budget is no pace: KDX's $210 a day against $806 in 30 days);
// src/ad_days/spend.rs:85-90 and :129-138 (the month reads only when every day of it up to yesterday is read, on each
// account's clock; one account's missing day fails the month), :121 (the words); src/client_profile.rs:630-643
// (`in_force`, `imported`); src/client_profile/auto.rs:189-214 (a cap past about twice the last 30 days' spend waits for
// Will); src/results/targets_case.rs:12-19 (a blank's cap, soft since Nov 2), :807-837 (C2's Meta cap from a paused window);
// docs/design/client-targets/README.md:71-101. Real cases, read 2026-11-08: Barbara's Money answers of Nov 1 (Bull 2, C2 4,
// Kogalla 6) with module_brief and answer_id; C2's answers 70, 74 and 76 of Nov 3 in a copy of Barbara's data (barbara-local,
// read-only); the stored days of that copy (C2's Meta, KDX's and Kogalla's Google, to Nov 5); the target rows of that copy
// (Bull 41, C2 44 and 45, Kogalla 18); C2's targets in live Barbara (get_client_info, Nov 8). Commits: ebbd477a (KDX's last
// day of October, $697 a day), 0bfea4cc (a month that did not read, Nov 3), 69544c43 and aa292355 (the cap rule, Nov 2).
LOGIC.flow({
  id: 'moncaps', parent: 'money',
  title: 'The caps and the month', short: 'The caps and the month',
  head: 'Each cap is held against what its campaigns spent this month, and against a whole month at the pace of the last {moneyPace} days',
  chart: [
    'flowchart TB',
    'FROM(["Will, the client’s own words,<br/>or Barbara’s rule sets a cap"]):::will',
    'IN{"Is an approved cap in force,<br/>soft or hard?"}:::code',
    'NONE(["No cap, so the answer says<br/>so and the box stays shut"]):::code',
    'SPENT["What the campaigns under the<br/>cap spent this month, up<br/>to yesterday"]:::code',
    'READ{"Was every day of this<br/>month’s spend read?"}:::code',
    'UNREAD(["A day is missing, so the<br/>month’s pace is not known"]):::code',
    'PACE["The real pace, what they spent<br/>each day over the last<br/>{moneyPace} stored days"]:::code',
    'FULL["A whole month at that pace,<br/>set against the cap"]:::code',
    'ENDS["Where the month ends if it<br/>keeps that pace every day left"]:::code',
    'LINE(["One line for each cap, with<br/>its room or how far over<br/>the pace runs"]):::code',
    'FROM --> IN',
    'IN -- no --> NONE',
    'IN -- yes --> SPENT',
    'SPENT --> READ',
    'READ -- no --> UNREAD',
    'READ -- yes --> PACE',
    'PACE --> FULL', 'PACE --> ENDS',
    'FULL --> LINE', 'ENDS --> LINE'
  ],
  links: { FROM: 'monold', IN: 'monfrom', READ: 'monread', UNREAD: 'monread', PACE: 'monpace', FULL: 'montwo', ENDS: 'montwo' },
  leaves: {
    monold: { title: 'Should Barbara redo the caps that its rule set before it was fixed?', open: {
      q: 'On Nov 1 Barbara’s rule gave C2 a hard cap of $200 a month on Meta, twice what Meta spent in the 30 days before. But the campaign ran on only 5 of those days, and its budget is $20 a day. Since Nov 2 the rule reads the newest month in which a campaign ran every day, which gives about $1,200 for C2, and it sets a soft cap. The caps it set before stay as they were, so Money reads a problem for C2 every morning. But Isaac told Waylon that these Meta ads would run “about $10 a day”, and C2’s strategy page keeps Facebook a small test, so a soft cap of about $1,200 would let Meta spend $20 to $30 a day before Money says anything. Should Barbara redo them?',
      since: 'Nov 8',
      opts: [
        ['Yes, redo each cap whose number Barbara’s rule picked before Nov 2, with today’s rule, and tell Will in its usual notice', true, 'C2’s Meta cap would become about $1,200 and soft, so Money would stop reading a problem there every morning, even at two to three times the $10 a day that Isaac told Waylon. A cap that Will or the client set is never touched.'],
        ['Keep them until Will changes each one on the client’s Targets card', false, 'C2’s Meta cap stays at $200 and hard. On a live morning Money reads a problem each day, so the Decide module runs each day to weigh it.']] } },
    monfrom: 'Where a cap comes from',
    monread: 'A missing day of spend',
    monpace: 'The real pace',
    montwo: 'Two ways to read one cap'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['moncaps'], kicker: 'The idea',
      head: 'For each cap, code works out four numbers, and the room is what a whole month at today’s pace leaves under the cap',
      visual: { type: 'bars', max: 340, rows: [
        { label: 'C2’s cap on Meta', parts: [[200, 'will', '$200']] },
        { label: 'Spent so far in November', parts: [[29.21, 'code', '$29.21']] },
        { label: 'A whole month at $10.95 a day', parts: [[328.50, 'block', '$328.50']] },
        { label: 'Where November ends at that pace', parts: [[335.81, 'block', '$335.81']] }] },
      vcap: 'These are C2’s Meta numbers from a test on a copy of Barbara’s data, on Nov 3. A whole month at the pace passes the $200 cap by $128.50, so Meta had no room and the answer read a problem.' },
    { about: ['moncaps'], kicker: 'Whose spend a cap counts',
      head: 'A cap counts only the spend of the campaigns it covers, so each of C2’s two caps has its own room',
      visual: { type: 'flow', rows: [
        { title: '$11,800 a month on Google', steps: [['$138.23 so far, and $209.63 a day', '', 'code'], ['$6,288.90 over a whole month', '', 'code']], end: [['$5,511.10 under the cap', '', 'keep']] },
        { title: '$200 a month on Meta', steps: [['$29.21 so far, and $10.95 a day', '', 'code'], ['$328.50 over a whole month', '', 'block']], end: [['$128.50 over the cap', '', 'block']] }] },
      vcap: 'A cap on the whole account counts every platform at once, as Bull’s $5,800 does. If a cap covers spend in two currencies, code cannot add it up, so that cap’s month cannot be read.' },

    { about: ['monfrom'], kicker: 'Where a cap comes from',
      head: 'A cap comes from Will, from the client’s own words, or from Barbara’s rule, and Money counts each one that is approved',
      visual: { type: 'flow', rows: [
        { title: 'Bull Legal', steps: [['Will approves $5,800 a month on the whole account', 'on case #99, Oct 30', 'will']], end: [['A soft cap, a guide and not a stop point', '', 'keep']] },
        { title: 'C2', steps: [['C2 has no cap on Google, so Barbara’s rule sets one on Nov 1', 'twice the $5,914 that Google spent in the last 30 days', 'code']], end: [['$11,800 a month on Google, hard', '', 'block']] },
        { title: 'Kogalla', steps: [['Our own proposal of Oct 17 waits for a yes', '$50 a day of budgets for 30.4 days', 'code'], ['Barbara’s rule approves it on Nov 1', '', 'code']], end: [['$1,520 a month on Google, hard', '', 'block']] }] },
      vcap: 'Money reads every approved cap that is in force, soft or hard, and never a floor, because a floor sets the least to spend, not the most. A cap in the client’s own words counts too, once a run saves it from their mail or a call. A number that came from the verifiers’ old file counts only beside a cap of Will’s. Since Nov 2 a cap whose number the rule picks is soft.',
      quote: ['I want to have the system automatically approve targets and still make a case just informing you when they change', 'Nov 1'] },
    { about: ['monold'], kicker: 'A question for Will',
      head: 'Barbara’s rule was fixed on Nov 2, but the caps it had set the day before still stand',
      visual: { type: 'flow', rows: [
        { title: 'C2’s Meta, Nov 1', steps: [['Meta spent $124 in the last 30 days', 'on only 5 of them, because the campaign was paused until Oct 26', 'code'], ['Barbara’s rule picks twice that', '', 'code']], end: [['$200 a month, hard', 'while the campaign’s budget is $20 a day', 'block']] },
        { title: 'Since Nov 2', steps: [['The rule reads the newest month in which a campaign ran every day', 'for C2 that is August, with $623', 'code']], end: [['About $1,200, as a soft cap', 'but only for a cap that is not set yet', 'keep']] }] },
      vcap: 'Code leaves C2’s caps of Nov 1 as they are until Will decides. Until then, every morning, Meta’s pace for a whole month goes past the $200 cap. It went past by $128.50 on Nov 3, and by about $330 on Nov 6.',
      open: 'monold' },

    { about: ['monread'], kicker: 'A missing day of spend',
      head: 'When one day of this month’s spend is missing, nobody knows the pace, so the answer says too few to tell',
      visual: { type: 'timeline', items: [
        ['Nov 3, 2:05 AM ET', 'In a test on a copy of Barbara’s data, both of C2’s months can be read, and Meta’s pace passes its cap. The answer is a problem.'],
        ['Nov 3, 3:20 AM ET', 'Midnight has passed on C2’s Pacific clock, but Barbara has not read Nov 2 yet. Neither month can be read, and the answer says good.'],
        ['Nov 3, 3:23 AM ET', 'Code changes, because a month that cannot be read is no reason to say good.'],
        ['Nov 3, 3:24 AM ET', 'The same test now says too few to tell, and names the two caps whose month could not be read.']] },
      vcap: 'When one account is missing a day, no cap’s month can be read. That is why C2’s cap on Meta failed too, though only its Google account was missing a day. On a live morning this should not happen, because Barbara reads yesterday’s spend at 5 AM New York time, before the module run.' },

    { about: ['monpace'], kicker: 'The real pace',
      head: 'The pace is what the campaigns really spent each day over the last {moneyPace} stored days, so a campaign that just began reads low',
      visual: { type: 'flow', rows: [
        { title: 'C2’s Meta campaign, as Money read it on Nov 3', steps: [['Oct 19 to Oct 26', '8 days with no spend, because the campaign was paused', 'wait'], ['Oct 27 to Nov 1', '$153.32 in 6 days, and $29 to $34 a day from Oct 29', 'code']], end: [['A pace of $10.95 a day', 'the $153.32 spread over all {moneyPace} days', 'block']] },
        { title: 'Why the budgets are no pace', steps: [['KDX’s budgets add up to $210 a day', 'but it spent $806 in 30 days', 'code']], end: [['If code paced the month by budgets, every raise under the $1,500 cap would have been refused', '', 'block']] }] },
      vcap: 'So for up to two weeks after a campaign starts, or after a person raises its budget, the pace reads low and the room reads high. When a run plans a raise, the spend box uses this same pace to judge it. Money’s answer lists this weak spot itself, among the things that could prove the answer wrong.' },

    { about: ['montwo'], kicker: 'Two ways to read one cap',
      head: 'Where this month ends and what a whole month would cost can disagree, and Money’s verdict reads the whole month',
      visual: { type: 'flow', rows: [
        { title: 'KDX, Oct 31, the last day of the month', steps: [['$802.41 spent of its $1,500 cap', '', 'code'], ['With one day left, any pace up to $697 a day ends October under the cap', '', 'block']], end: [['So code also holds the pace against a whole month', 'about $20 a day comes to about $600', 'keep']] },
        { title: 'Kogalla’s Google, Oct 26 to Oct 31, made from its real spend', steps: [['At its pace, October would end at $1,528 to $1,538', 'just over a $1,520 cap', 'block'], ['A whole month at that pace came to $1,433 to $1,508', 'under it', 'keep']], end: [['Money would have said good, and October really ended at $1,516.35', '', 'keep']] }] },
      vcap: 'Money’s answer still says where this month ends, in its line about the spend box. But a month that will end over the cap does not, on its own, make the answer a problem. Kogalla’s $1,520 cap was approved only on Nov 1, so this row shows what Money would have said in late October.' }
  ],

  examples: {
    FROM: { tag: 'real', rows: [{ steps: [['Barbara’s rule sets C2’s caps, Nov 1, 12:43 PM ET', 'twice what each platform spent in the last 30 days', 'code']], end: [['$11,800 a month on Google', 'hard', 'code'], ['$200 a month on Meta', 'hard', 'block']] }], note: 'We read these caps in Barbara on Nov 8, and both are still hard.' },
    IN: { tag: 'real', rows: [{ steps: [['A test on C2, Nov 1, at 3:13 AM ET', '', 'code'], ['Is an approved cap in force?', 'not yet', 'code']], end: [['The answer says no monthly cap is approved', '', 'code']] }], note: 'We took this from the answer that the Money module wrote for C2 in a test on Nov 1. Barbara’s rule set C2’s caps later that day, at 12:43 PM ET.' },
    NONE: { tag: 'real', rows: [{ steps: [['A test on Kogalla, Nov 1', 'Kogalla had no cap yet', 'code']], end: [['The answer says no monthly cap is approved', 'and the box is shut', 'code']] }], note: 'We took this from the answer that the Money module wrote for Kogalla in a test on Nov 1. Will’s hold had already shut Kogalla’s box that morning.' },
    SPENT: { tag: 'real', rows: [{ steps: [['A test on Bull Legal, Nov 1', 'the first day of the month', 'code']], end: [['Nothing spent so far', 'because no day of November had ended yet', 'code']] }], note: 'We took this from the answer that the Money module wrote for Bull in a test on Nov 1.' },
    READ: { tag: 'real', rows: [{ steps: [['A test on C2, Nov 3, at 3:20 AM ET', 'Barbara had not read Nov 2 yet', 'code'], ['Was every day of this month’s spend read?', 'no', 'code']], end: [['Neither of C2’s two months can be read', '', 'block']] }], note: 'We took this from the answer that the Money module wrote for C2 in a test on a copy of Barbara’s data, on Nov 3.' },
    UNREAD: { tag: 'real', rows: [{ steps: [['A test on C2, Nov 3, at 3:24 AM ET', 'neither month could be read', 'code']], end: [['Too few to tell', 'since nobody knows how fast the month is spending', 'code']] }], note: 'We took this from the answer that the Money module wrote for C2 in a test on a copy of Barbara’s data, just after code changed that night.' },
    PACE: { tag: 'real', rows: [{ steps: [['A test on Bull Legal, Nov 1', 'what it spent in its last {moneyPace} stored days', 'code']], end: [['A pace of $176.03 a day', '', 'code']] }], note: 'We took this from the answer that the Money module wrote for Bull in a test on Nov 1.' },
    FULL: { tag: 'real', rows: [{ steps: [['A test on Bull Legal, Nov 1', 'a pace of $176.03 a day', 'code']], end: [['$5,280.90 over a whole month', 'which leaves $519.10 under its $5,800 cap', 'keep']] }], note: 'We took this from the answer that the Money module wrote for Bull in a test on Nov 1.' },
    ENDS: { tag: 'made', rows: [{ steps: [['Kogalla’s Google, Oct 31', '$1,480.59 spent, and $47.81 a day', 'code']], end: [['October would end at $1,528.40', 'over a $1,520 cap, but it really ended at $1,516.35', 'block']] }], note: 'We made this up from Kogalla’s real stored spend, because its cap was approved only on Nov 1 and no Money answer was saved for that day.' },
    LINE: { tag: 'real', rows: [{ steps: [['C2’s cap on Meta, Nov 3', '$29.21 so far, and $10.95 a day', 'code']], end: [['$328.50 over a whole month, $128.50 over the cap', 'and November ends at $335.81', 'block']] }], note: 'We took this from the answer that the Money module wrote for C2 in a test on a copy of Barbara’s data, on Nov 3.' }
  },

  reviewed: { self: '7f4c708d', above: '495bd93b', on: '2026-11-08' }
});
