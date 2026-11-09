// The Money module, added on 2026-11-08 (Will: "IN the logic map le's add the rest of step 1 modules."). Code answers it
// with no model, first on every module run beside In motion, and the four campaign modules and Decide read it. Drawn as it
// works today, from comm-chat at origin/main 1c24d43a (read 2026-11-08): src/modules/mod.rs:168-180 (its entry: by code,
// no needs, no check, no words), :119 (the campaign modules and Decide need it), :59 (an answer counts 7 days);
// src/modules/brief/code.rs:239-320 (`money`: each cap, the box, each other platform's room, Google's weeks, the line that a
// raise elsewhere waits, the week still running, the margin, each target, the newest billing check; the verdict :307-312,
// the summary :313-317, what would prove it wrong :319), :205-220 (`cap_line`), :222-230 (`target_line`), :232-237
// (`running_doubt`); src/spend_box.rs:845-967 (`standing`), :69-81 (14 days of pace, 30 days, 2 trusted weeks, Google
// only); src/modules/day.rs:255-263 (a module run answers it first), :172-173 (a problem makes Decide run);
// src/validators_api/exam.rs:514-527 (the newest billing check of the client, any age); src/ad_days/collect.rs:16-18 (the
// day's spend is read at 5 AM New York time); src/scorecard/compute.rs:374-392 and text.rs:16-45 (the target lines);
// src/chat/tools/module_tools.rs:382-399 (a read of a code module saves a new answer; an answer_id read does not); off in
// live since Nov 7: docs/claude-code-bridge-setup.md:2260-2264. Real cases, read 2026-11-08: Barbara's Money answers of
// Nov 1 (Bull 2, C2 4, Kogalla 6), read with module_brief and answer_id; C2's answers 70, 74 and 76 of Nov 3 and Bull's
// Decide answer 58, in a copy of Barbara's data (barbara-local, read-only; 70 to 76 are not in live Barbara); C2's targets
// in live Barbara (get_client_info, Nov 8); the plan Will read on Oct 31 (~/.agent/diagrams/
// modules-plan-2026-10-31-slides.html: "A model reads it only if a billing check fails"). Its history: git d7b8174b and
// 0bedc40e (the spend box, Oct 30), ebbd477a (a whole month too, Oct 31), 7e2ac44c (built, Oct 31 9:17 PM ET), c536507a
// and 79f9d374 (Oct 31), 5b8a3f4e, c3e946dd and aa292355 (Nov 2), 0bfea4cc (Nov 3), 19423761 (the module run merged).
LOGIC.flow({
  id: 'money',
  title: 'The Money module', short: 'Money module', status: 'Built; off in live until Will says yes',
  head: 'For the whole account, the Money module says how much room each monthly cap leaves, so the modules after it know the room before they propose money',
  chart: [
    'flowchart TB',
    'WHEN(["Every morning, before any AI<br/>starts, code reads the caps,<br/>the spend and our billing"]):::code',
    'CAPS["Each monthly cap that Will or<br/>Barbara’s rule approved, on the<br/>whole account or one platform"]:::will',
    'PACE["This month’s spend under each<br/>cap, and a whole month at the<br/>pace of the last {moneyPace} days"]:::code',
    'BOX["The spend box answers whether<br/>a raise on Google could go<br/>out alone today"]:::code',
    'TARGET["Each target, such as $500 a<br/>lead, and how far the account<br/>falls short of it"]:::code',
    'BILL["The newest check of how<br/>we bill the client"]:::code',
    'OVER{"Does a whole month at this<br/>pace pass a cap, or did the<br/>billing check fail?"}:::code',
    'READ{"Was every day of this<br/>month’s spend read?"}:::code',
    'PROBLEM(["A problem, so the Decide<br/>module runs that morning"]):::block',
    'FEW(["Too few to tell, because a<br/>day of the month’s spend<br/>is missing"]):::code',
    'GOOD(["Good, even when a raise<br/>must wait for Will"]):::keep',
    'GIVE(["The campaign modules get the<br/>summary, and the Decide module<br/>reads every line"]):::code',
    'TRUE["The box and the targets use<br/>Tracking’s true numbers to<br/>judge each week"]:::next',
    'WHEN --> CAPS', 'CAPS --> PACE', 'PACE --> BOX', 'BOX --> TARGET', 'TARGET --> BILL', 'BILL --> OVER',
    'OVER -- yes --> PROBLEM', 'OVER -- no --> READ',
    'READ -- no --> FEW', 'READ -- yes --> GOOD',
    'PROBLEM --> GIVE', 'FEW --> GIVE', 'GOOD --> GIVE',
    'TRUE -. "not built" .-> BOX'
  ],
  links: { WHEN: 'monwhen', CAPS: 'moncaps', PACE: 'moncaps', BOX: 'monbox', TARGET: 'montarget', BILL: 'monbill', OVER: 'monverdict', READ: 'monverdict', PROBLEM: 'monverdict', FEW: 'monverdict', GOOD: 'monverdict', GIVE: 'mongive', TRUE: 'montrue' },
  leaves: {
    monwhen: 'Every morning, first',
    montarget: 'The targets',
    monbill: 'Our billing check',
    monverdict: 'Good, too few to tell, or a problem',
    montrue: 'Tracking’s true numbers'
  },

  // Each slide belongs to one view: the module's own slides first, then the slides of its rules.
  deck: [
    { about: ['money'], kicker: 'The idea',
      head: 'The runs may raise budgets on their own under a monthly cap, so every morning code says how much room each cap leaves',
      visual: { type: 'flow', rows: [
        { title: 'Will’s idea, Oct 30', steps: [['Will approves a monthly cap', 'such as $5,800 a month for Bull Legal', 'will'], ['A run may raise a budget or a bid by itself', 'while the month stays under the cap', 'code']], end: [['A raise past the cap waits for Will', '', 'block']] },
        { title: 'Every morning, since Oct 31', steps: [['The Money module holds each cap against this month’s spend', 'before any AI starts', 'code']], end: [['The modules that propose money know the room first', '', 'keep']] }] },
      vcap: 'The spend box is the rule that lets a raise go out alone, and every run asks it before a raise. The Money module changes nothing. It reports where each cap stands, so no module proposes money that the client has not given.',
      quote: ['I want it to be able to play with budgets and bids as long as we have caps on them. That would allow for more atonomy because I am the bottleneck.', 'Oct 30'] },
    { about: ['money'], kicker: 'What it lists',
      head: 'The answer holds nine kinds of lines, always in the same order',
      visual: { type: 'gate', rows: [
        ['Each cap', 'This month’s spend so far, the pace of the last {moneyPace} days, a whole month at that pace, and where this month ends.', 'pass'],
        ['The spend box', 'Open or shut for a raise on Google, and why.', 'pass'],
        ['Each other platform’s room', 'Meta or Microsoft, each under its own caps.', 'pass'],
        ['Google’s newest full weeks', 'Each one trusted or not, because a raise needs {moneyWeeks} trusted weeks.', 'pass'],
        ['Raises on other platforms', 'On a client with Meta or Microsoft, one line says that a raise there waits for Will.', 'pass'],
        ['A warning sign in the current week', 'Named early, with the Monday when the box will judge that week.', 'hold'],
        ['The margin', 'When the client page has one.', 'pass'],
        ['Each target', 'Its figure over the last {moneyTargetDays} settled days, and what the account falls short by, in money.', 'pass'],
        ['Our billing check', 'The newest check of how we bill the client.', 'pass']],
        end: ['One answer, with a verdict and a short summary', 'code'] },
      vcap: 'Only two things can turn the answer into a problem. One is a whole month at today’s pace that passes a cap, and the other is a failed billing check.' },
    { about: ['money'], kicker: 'A real answer · Bull Legal · Nov 1',
      head: 'Bull’s answer of Nov 1 found $519.10 of room under its $5,800 cap, but its box was shut because Will held the client',
      visual: { type: 'card', title: 'The Money module on Bull Legal, in a test on Nov 1', fields: [
        ['Its cap', '$5,800 a month on the whole account, a soft cap that Will approved on Oct 30'],
        ['This month', 'Nothing spent yet, because it was the first day of November'],
        ['The pace', '$176.03 a day over the last {moneyPace} days, so $5,280.90 over a whole month'],
        ['The spend box', 'Shut, because Will has set everything on Bull Legal to wait'],
        ['Its target', '$270.55 a lead against $300, which is 10% under, on 19 conversions'],
        ['Our billing check', 'From Oct 31, with 8 checks passed and 2 that could not run']],
        stamp: ['Good', 'keep'] },
      vcap: 'This answer came from a test, because no live morning has run the module yet. The campaign modules saw only its summary, the room and the shut box, in one line.',
      stats: [['$519.10', 'of room under the cap over a whole month', 'real'], ['$176.03', 'a day, the pace of the last {moneyPace} days', 'real'], ['$5,800', 'a month, the cap that Will approved', 'will']] },
    { about: ['money'], kicker: 'Where it runs',
      head: 'Money answers first each morning, beside In motion, after the day’s spend is read and before any AI starts',
      visual: { type: 'flow', rows: [
        { title: 'At 5 AM New York time', steps: [['Barbara reads yesterday’s spend', 'from Google, Meta and Microsoft', 'code']], end: [['The days are stored', '', 'code']] },
        { title: 'The first step of a module run', steps: [['The verifiers check how we bill the client', '', 'code'], ['Code answers In motion and Money', 'with no AI', 'code']], end: [['Both answers are saved', 'before any Opus starts', 'code']] },
        { title: 'Then the other modules', steps: [['Tracking, the client module, and Setup and market', 'none of them reads Money', 'opus'], ['The four campaign modules and the Decide module', 'each needs a Money answer from the last {moneyFresh} days', 'opus']], end: [['They see the room before they propose money', '', 'keep']] }] },
      vcap: 'A quiet morning with nothing new still makes the answer. Then no AI starts at all, unless Money or In motion finds a problem.' },
    { about: ['money'], kicker: 'Status · Nov 8',
      head: 'The module is built and has run in tests, but no live morning runs it until Will says yes',
      visual: { type: 'timeline', items: [
        ['Oct 30', 'The spend box lets a run raise a budget or a bid on its own while the month stays under the cap Will approved, judged by what the campaigns really spend each day.'],
        ['Oct 31, 8:59 PM ET', 'Code also holds the pace against each cap over a whole month. On KDX’s last day of October, with one day left, any pace up to $697 a day would have ended the month under its cap.'],
        ['Oct 31, 9:17 PM ET', 'The Money module is built beside In motion, with each cap, the box, the weeks, the margin, the targets and our billing check.'],
        ['Nov 1, 3:13 AM ET', 'Tests on Bull Legal, C2 and Kogalla save its first answers. All three are good, and all three boxes are shut by Will’s hold.'],
        ['Nov 2', 'Will reads C2’s answer, where Meta’s small cap had shut the box for Google too. That night code gives each platform its own room under its own caps, and the caps that Barbara’s rule picks become soft guides.'],
        ['Nov 3, 3:23 AM ET', 'When a day of the month’s spend is missing, the answer now says too few to tell, where before it said good.'],
        ['Nov 4', 'Module runs take the place of the morning run, and Money answers first on each one.'],
        ['Nov 6 and Nov 7', 'The module run is merged, and from Nov 7 it stays off in live until Will tests it and says yes to its cost.']] },
      vcap: 'The spend box itself works in every run today, because a run asks it before each raise. Only the Money answer, which reports where the box stands, waits for the module run. In live a person can still run it under Validators and then Modules.',
      quote: ['Let\'s fix the meta gaps. We are going to run this on very meta heavy accounts as well and need it to be clean.', 'Nov 2'] },

    { about: ['monwhen'], kicker: 'Every morning, first',
      head: 'Code makes the answer fresh each time from the stored spend, so it keeps no memory of yesterday',
      visual: { type: 'flow', rows: [
        { title: 'A live morning, once Will says yes', steps: [['The verifiers check how we bill the client', '', 'code'], ['Code makes the answer and saves it on the run', '', 'code']], end: [['Then the modules that are due start', '', 'opus']] },
        { title: 'A test, under Validators and then Modules', steps: [['A person picks Money and one client', '', 'will']], end: [['Code makes the answer at once and saves it', '', 'code']] },
        { title: 'A read through Barbara’s module tool', steps: [['Someone asks for Money on a client', '', 'will']], end: [['That read saves a new answer too', '', 'block']] }] },
      vcap: 'For a code module the answer is made at the moment someone asks for it, so even a read writes a new one. Only a read of one saved answer, by its number, saves nothing.' },

    { about: ['montarget'], kicker: 'The targets',
      head: 'Each target is compared with the last {moneyTargetDays} settled days, and the gap is given in dollars, but a missed target never changes the verdict',
      visual: { type: 'flow', rows: [
        { title: 'C2’s Google, in a test on Nov 3', steps: [['$617.13 a conversion against $500', '23% over, on 10 conversions', 'code']], end: [['$1,171.26 of spend past the target', 'in the last {moneyTargetDays} settled days', 'block']] },
        { title: 'Bull Legal, Nov 1', steps: [['$270.55 a lead against $300', '10% under, on 19 conversions', 'code']], end: [['No gap to name', '', 'keep']] },
        { title: 'C2’s Meta, in the same test', steps: [['A target of $60 a lead', 'and the trust calendar marked every one of its 30 days broken', 'code']], end: [['It said no conversion for $0 spent', 'and since that night it says no trusted day can judge it', 'wait']] }] },
      vcap: 'A cost target counts the spend past it, and a return target counts the revenue short of it. Under {moneyFew} conversions the line adds that it is too few to tell. Money only lists the targets, because the campaign modules judge them.' },

    { about: ['monbill'], kicker: 'Our billing check',
      head: 'Money copies the newest check of how we bill the client, and only a failed check turns the answer into a problem',
      visual: { type: 'gate', rows: [
        ['The checks of Oct 31 on Bull Legal, C2 and Kogalla', 'Between 8 and 11 checks passed, and 2 could not run, both about follow-ups on late invoices. Each answer stayed good.', 'hold'],
        ['Preceptor Point, Oct 28', 'One check failed, because the billing schedule and the client records disagreed, while every check on the invoices passed. That alone would make a problem.', 'stop'],
        ['No check stored', 'When no billing check is stored, the answer says so, and it stays good.', 'pass']],
        end: ['A failed check makes the Decide module run that morning', 'block'] },
      vcap: 'The line gives only the counts, such as 1 failed, 2 could not run and 6 passed, so the Decide module cannot tell which check failed. In a module run, the verifiers check our billing just before Money answers, so the line is always from that morning. A test, though, reads the newest check, however old it is.' },

    { about: ['monverdict'], kicker: 'Good, too few to tell, or a problem',
      head: 'Code turns the answer into a problem only when a whole month at today’s pace passes a cap, or our billing check failed',
      visual: { type: 'gate', rows: [
        ['A whole month at today’s pace passes a cap', 'C2, Nov 3, in a test on a copy of Barbara’s data. Meta’s $10.95 a day comes to $328.50 over a whole month, past its $200 cap.', 'stop'],
        ['The newest billing check failed', 'Any failed check counts, whatever it was about.', 'stop'],
        ['A day of this month’s spend is missing', 'Too few to tell, because nobody knows the pace.', 'hold'],
        ['The box is shut, a target is missed, or no cap is approved', 'Bull, C2 and Kogalla were all good on Nov 1, each with its box shut by Will’s hold.', 'pass']],
        end: ['A problem makes the Decide module run that morning, even when nothing else is due', 'block'] },
      vcap: 'Code counts a whole month as {moneyMonth} days. Too few to tell does not wake the Decide module. The answer never proposes a fix and never asks anyone, because it only reports where the money stands.' },
    { about: ['monverdict'], kicker: 'What would prove it wrong',
      head: 'With every answer, code saves the same three blind spots, but no AI tests them the next morning',
      visual: { type: 'gate', rows: [
        ['Spend since the newest stored day', 'Today’s spend is not read until 5 AM tomorrow.', 'hold'],
        ['A change in the last {moneyPace} days', 'A new or changed budget moves the pace slowly, because the pace spreads over all {moneyPace} days.', 'hold'],
        ['A cap that the client said in words', 'A number in a mail or a call counts only once it is approved on the client’s Targets card.', 'hold']],
        end: ['The next morning, code makes the answer again from scratch', 'code'] },
      vcap: 'A code module keeps no memory of its last answer, so nobody checks these the next day. Code simply reads the stored spend again.' },

    { about: ['montrue'], kicker: 'Not built yet',
      head: 'In the plan, the box’s weeks and the target lines judge on Tracking’s true numbers',
      visual: { type: 'flow', rows: [
        { title: 'Today', steps: [['Code’s five warning signs judge each week', 'for the box and for the target lines', 'code']], end: [['A week with a sign shuts the box until it is older than the newest {moneyWeeks} full weeks', '', 'block']] },
        { title: 'The plan', steps: [['Tracking rebuilds each week from the client’s own leads and orders', '', 'next'], ['The box and the targets read those true numbers', '', 'next']], end: [['A raise is judged on what really happened', 'where the bids do not follow the platform’s count', 'next']] }] },
      vcap: 'Will chose on Nov 8 that while a platform’s count is broken, a run may raise spend there only where the bids do not follow that count. None of this is built in Money yet, so today the box and the targets read code’s own warning signs.',
      quote: ['build this as if we can always read the real leads and orders. If we don\'t have access now we will get it', 'Nov 7'] }
  ],

  examples: {
    WHEN: { tag: 'real', rows: [{ steps: [['A test on Bull Legal, Nov 1, at 3:13 AM ET', 'a person runs the module', 'will'], ['Code makes the answer for Bull, with no AI', '', 'code']], end: [['Bull’s first answer is saved', 'Money says good, and no raise can go out alone, because Will has set everything on Bull to wait for him.', 'code']] }], note: 'We took this from the first answer that the Money module saved for Bull, in a test on Nov 1. No live morning has made one yet, because the module run is off in live.' },
    CAPS: { tag: 'real', rows: [{ steps: [['Will approves Bull’s caps', '“Soft $300 a lead and soft $5,800 a month”', 'will']], end: [['$5,800 a month on the whole account', 'soft, a guide and not a stop point', 'keep']] }], note: 'We read this cap in a copy of Barbara’s data from Nov 3. Will approved it on Oct 30.' },
    PACE: { tag: 'real', rows: [{ steps: [['C2’s Google, Nov 3', '$138.23 so far, and $209.63 a day', 'code']], end: [['$6,288.90 over a whole month', '$5,511.10 under its $11,800 cap', 'keep']] }], note: 'We took this from the answer that the Money module wrote for C2 in a test on a copy of Barbara’s data, on Nov 3.' },
    BOX: { tag: 'real', rows: [{ steps: [['C2, Nov 3', 'tracking is trusted, and the month stays under $11,800 on Google', 'code']], end: [['The box is open for Google', '', 'keep'], ['Meta has no room', 'its month ends at $335.81, over its $200 cap', 'block']] }], note: 'We took this from the answer that the Money module wrote for C2 in a test on a copy of Barbara’s data, on Nov 3.' },
    TARGET: { tag: 'real', rows: [{ steps: [['C2’s Google target, Nov 3', '$500 a conversion', 'will'], ['$617.13 a conversion over 30 settled days', '23% over, on 10 conversions', 'code']], end: [['$1,171.26 of spend past the target', '', 'block']] }], note: 'We took this from the answer that the Money module wrote for C2 in a test on a copy of Barbara’s data, on Nov 3.' },
    BILL: { tag: 'real', rows: [{ steps: [['Bull’s billing check, Oct 31', '', 'code']], end: [['8 checks passed and 2 could not run', 'both about follow-ups on late invoices', 'code']] }], note: 'We took this from the answer that the Money module wrote for Bull in a test on Nov 1. We found which two checks could not run in a copy of Barbara’s data.' },
    OVER: { tag: 'real', rows: [{ steps: [['C2, Nov 3, 2:05 AM ET', 'in a test', 'code'], ['Does a whole month at this pace pass a cap?', 'yes, on Meta, where $328.50 passes $200', 'block']], end: [['A problem', '', 'block']] }], note: 'We took this from the answer that the Money module wrote for C2 in a test on a copy of Barbara’s data, on Nov 3.' },
    READ: { tag: 'real', rows: [{ steps: [['C2, Nov 3, 3:24 AM ET', 'Barbara had not read Nov 2 yet', 'code'], ['Was every day of this month’s spend read?', 'no', 'code']], end: [['Too few to tell', '', 'code']] }], note: 'We took this from the answer that the Money module wrote for C2 in a test on a copy of Barbara’s data, after code’s change that night.' },
    PROBLEM: { tag: 'real', rows: [{ steps: [['C2, Nov 3', 'Meta’s pace passes its $200 cap over a whole month', 'block']], end: [['Money calls it a problem, so on a live morning the Decide module would run that day', '', 'block']] }], note: 'The answer is real, from a test on a copy of Barbara’s data. No live morning ran, because the module run is off in live.' },
    FEW: { tag: 'real', rows: [{ steps: [['C2, Nov 3, 3:24 AM ET', 'neither month read', 'code']], end: [['Too few to tell', 'and the summary names both months', 'code']] }], note: 'We took this from the answer that the Money module wrote for C2 in a test on a copy of Barbara’s data, on Nov 3.' },
    GOOD: { tag: 'real', rows: [{ steps: [['The tests on Bull Legal, C2 and Kogalla, Nov 1', 'Will had set everything on these three clients to wait for him', 'will']], end: [['All three answers are good', 'even though no raise could go out alone', 'keep']] }], note: 'We took this from the three answers that the Money module saved in the tests of Nov 1.' },
    GIVE: { tag: 'real', rows: [{ steps: [['Bull’s Money answer of Nov 1', 'a pace of $176.03 a day, which leaves $519.10 under the cap', 'code'], ['The Decide module reads every line', '', 'opus']], end: [['It keeps each budget for next week', 'and it quotes Money’s pace as its reason', 'opus']] }], note: 'We took this from the answer that the Decide module wrote for Bull in a test on Nov 1. We read it in a copy of Barbara’s data.' },
    TRUE: { tag: 'plan', rows: [{ steps: [['C2’s Google weeks', 'each week rebuilt from the real leads in C2’s lead app', 'next']], end: [['The box decides on the true count of leads', '', 'next']] }], note: 'Nothing of this is built. Today the box trusts a week of Google’s numbers unless code finds a warning sign in it.' }
  },

  reviewed: { self: 'c7c2be68', on: '2026-11-08' }
});
