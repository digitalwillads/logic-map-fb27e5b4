// Who reads the Setup and market answer. comm-chat at origin/main 1c24d43a, read 2026-11-08: src/modules/mod.rs:119
// (ACCOUNT_FACTS: the four campaign modules and Decide need Tracking, the client, In motion and Money; nothing needs Setup,
// :207, :223, :241, :258, :277), :279-289 (Decide's words: "Merge what two modules propose into one"); src/modules/brief/
// numbers.rs:603-611 (`fresh_answers`: under 7 New York days), :731-763 (`decide`: every fresh answer that is not a need goes
// in "The other modules' answers" as a line of up to 600 characters, :46 and :754; every proposal, the most money a month
// first, up to 900 characters each, :47 and :619-644; every ask, up to 400, :48 and :647-649; Decide may open one answer
// whole by its number); src/modules/day.rs:160-182 (a model module that is due makes Decide run); src/modules/brief/mod.rs
// :113-136 (`needs_part`: the campaign modules get one line for each need only), :157-171 (`retest_part`: the last answer's
// "would prove it wrong", up to 600 characters, tested first), :173-179 (`last_line` with Will's mark); src/modules/store.rs
// (the mark: Right or Wrong under Validators and then Modules). The plan of Oct 31 (~/.agent/diagrams/modules-plan-2026-10-31-
// slides.html): "Step 1's answers go into every campaign." Real cases, read 2026-11-08: Barbara's Setup answers 8 (C2), 10
// (Bull) and 12 (Kogalla) of Nov 1, with module_brief and answer_id; in a copy of Barbara's data (barbara-local, read-only),
// C2's answer 73 of Nov 3, Kogalla's Results answer 31 on PMax (4:01 AM ET, Nov 1: "Known for this view, not the cause: a new
// Shopping rival ... None starts at Oct 1"), and the Decide answers 54 (Kogalla: the price list in its first decision;
// "Noxgear, which the setup answer names from Sep 25, does not show in these views"), 58 (Bull: the old firm name in one
// push with the other free fixes) and 68 (C2). No Setup answer in the copy carries a mark.
LOGIC.flow({
  id: 'mkgive', parent: 'market',
  title: 'Who reads the answer', short: 'Who reads it',
  head: 'Only the Decide module reads this answer, and the module’s next answer checks whether it was right',
  chart: [
    'flowchart TB',
    'ONE(["The answer is saved, with its<br/>verdict, its proof, its fixes<br/>and its questions"]):::code',
    'FRESH{"Is it under {marketFresh}<br/>New York days old?"}:::code',
    'GONE(["No, so the Decide module stops<br/>seeing it, and no module<br/>needs it anyway"]):::code',
    'DEC["The Decide module reads its<br/>summary, each fix and each<br/>question"]:::code',
    'RANK["Its fixes go in one list with<br/>every other module’s fixes,<br/>the most money a month first"]:::code',
    'MERGE(["When two modules propose the<br/>same fix, the Decide module<br/>makes it one decision"]):::opus',
    'CAMP["The modules that judge each<br/>campaign never get this answer"]:::block',
    'NEXT["The next answer starts by<br/>testing whether this one<br/>was wrong"]:::code',
    'MARK(["Will can mark it right or<br/>wrong, and Opus sees his mark<br/>the next time"]):::will',
    'ONE --> FRESH',
    'FRESH -- no --> GONE', 'FRESH -- yes --> DEC',
    'DEC --> RANK', 'RANK --> MERGE',
    'ONE -. "not given" .-> CAMP',
    'ONE --> NEXT', 'MARK -.-> NEXT'
  ],
  links: { FRESH: 'mkgfresh', GONE: 'mkgfresh', DEC: 'mkgdecide', RANK: 'mkgrank', MERGE: 'mkgdecide', CAMP: 'mkgcamp', NEXT: 'mkgnext', MARK: 'mkgnext' },
  leaves: {
    mkgfresh: 'Fresh for {marketFresh} days',
    mkgdecide: 'The Decide module reads it',
    mkgrank: 'The most money a month first',
    mkgcamp: { title: 'Should the campaign modules read this answer?', open: {
      q: 'The plan Will read on Oct 31 says that step 1’s answers go into every campaign. But code gives the four campaign modules four of the five, Tracking, the client module, In motion and Money, and not this one. So a campaign module never hears about a billing hold, a store that Google suspended or a new rival that this module found, though this module’s own instructions warn that a billing hold looks like a creative problem. On Nov 1 Kogalla’s Results module looked for the cause of PMax’s October fall without this answer, which named a new Shopping rival, and it found none. Should the campaign modules read this answer?',
      since: 'Nov 8',
      opts: [
        ['Yes, each campaign module reads its summary first, as it reads the other four answers about the whole account', true, 'Results, Search terms and reach, Ads and pages, and Bid and budget would each get one line with its verdict, its day and its summary, and each would wait for a fresh one. On a live morning this module answers before the campaign modules anyway, so only a test of one campaign module would have to run it first.'],
        ['Keep it as it is, so only the Decide module reads it', false, 'The campaign modules keep answering without it, and the Decide module weighs it beside their answers, as it did for Kogalla on Nov 1.']] } },
    mkgnext: 'The next answer tests it first'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['mkgive'], kicker: 'The idea',
      head: 'The module only answers, so what counts is what the Decide module does with its answer',
      visual: { type: 'gate', rows: [
        ['Decide', 'It reads the summary, each fix and each question, and merges what two modules propose.', 'pass'],
        ['Results, Search terms and reach, Ads and pages, and Bid and budget', 'They never see this answer.', 'stop'],
        ['Tracking, the client module, In motion and Money', 'They answer before it or beside it, and never read it.', 'pass'],
        ['The next Setup and market answer', 'It starts by testing what would prove this one wrong.', 'pass']],
        end: ['No module waits for this answer', 'code'] },
      vcap: 'Because no module needs this answer, an old or missing one stops nothing. Whenever a module that Opus answers is due, the Decide module runs that morning too, so a morning when this module answers always ends with a decision.' },

    { about: ['mkgfresh'], kicker: 'A fresh answer',
      head: 'The Decide module reads only answers from the last {marketFresh} New York days, so an older one drops out of sight',
      visual: { type: 'flow', rows: [
        { title: 'Kogalla', steps: [['Its answer of Nov 1', 'from a test', 'opus'], ['Nov 8', '{marketFresh} New York days later', 'code']], end: [['The Decide module no longer sees it', 'and a live morning would read Kogalla again first', 'code']] }] },
      vcap: 'The module reads again at least every {marketFresh} days, so on a live morning the Decide module always has an answer from it. Code counts the days by the calendar in New York, as it does for every module.' },

    { about: ['mkgdecide'], kicker: 'The Decide module',
      head: 'The Decide module reads the summary, each fix and each question, and on Nov 1 it put Kogalla’s wrong price list into its first decision',
      visual: { type: 'flow', rows: [
        { title: 'Kogalla, Nov 1', steps: [['Setup and market proposes removing the price list', 'it shows a wrong price and the recalled packs', 'opus'], ['The Decide module reads it', 'with the other answers', 'code']], end: [['Its first decision', 'show only the RA Light Kit, and remove the price list', 'opus']] },
        { title: 'Where the Decide module checked the claim again', steps: [['Setup and market names Noxgear as a new rival from Sep 25', '', 'opus'], ['The Decide module reads Merchant Center’s view of Shopping itself', '', 'opus']], end: [['It could not find Noxgear in its views', '', 'wait']] }] },
      vcap: 'The Decide module gets the summary in a line of up to {marketSummary} characters, each fix in a line of up to {marketProposal}, and each question in a line of up to {marketAsk}. It can open the whole answer by its number, and its instructions tell it to merge what two modules propose into one decision.' },
    { about: ['mkgdecide'], kicker: 'One decision from two modules',
      head: 'When two modules propose the same fix, the Decide module merges them, as it did with Bull’s old firm name',
      visual: { type: 'flow', rows: [
        { title: 'Bull Legal, Nov 1', steps: [['Setup and market', 'replace the old firm name in 6 older ads', 'opus'], ['Ads and pages, on Securities and on DeFi', 'the same old name, in the same ads', 'opus']], end: [['One decision of free fixes', 'the old firm name goes out in the same change as other word swaps', 'opus']] }] },
      vcap: 'Six of Bull’s 12 live ads still said Bull Blockchain Law, while the site says Bull Harttraft. The Decide module put that fix in one decision with the other fixes that change no budget or bid.' },

    { about: ['mkgrank'], kicker: 'The most money first',
      head: 'Every fix joins one list with the other modules’ fixes, the most money a month first, so a fix with no money named sinks to the end',
      visual: { type: 'flow', rows: [
        { title: 'C2’s answer of Nov 3', steps: [['Switch the Meta remarketing to the house campaign', '$663.55 a month at stake', 'opus'], ['A $5 limit on the competitor campaign’s clicks', '$95.72 a month', 'opus']], end: [['Near the top of the Decide module’s list', '', 'keep']] },
        { title: 'The same answer', steps: [['Turn off Google’s tips, tag the Meta ads, and speed up the homepage', 'they name no money a month', 'opus']], end: [['At the end of the list', '', 'wait']] }] },
      vcap: 'The answers of Nov 1 named no money a month on any fix, because that field came at 10:13 AM that day. A fix that gives its stake only in words, such as the risk to $5,838 of Google spend, still sorts as no money.' },

    { about: ['mkgcamp'], kicker: 'A question for Will',
      head: 'The plan of Oct 31 sends every first-step answer into every campaign, but code gives this one only to the Decide module',
      visual: { type: 'flow', rows: [
        { title: 'The plan of Oct 31', steps: [['Step 1’s answers go into every campaign', '', 'will']], end: [['Each campaign module would see this answer', '', 'opus']] },
        { title: 'The code today', steps: [['The campaign modules get Tracking, the client module, In motion and Money', '', 'code']], end: [['Not this answer', '', 'block']] },
        { title: 'Kogalla, Nov 1', steps: [['Setup and market names a new Shopping rival, Noxgear', '3:35 AM ET', 'opus'], ['Results looks for the cause of PMax’s October fall', 'at 4:01 AM ET, without the Setup and market answer', 'opus']], end: [['It rules out a new rival, and the cause stays unknown', '', 'wait']] }] },
      vcap: 'The Decide module read both answers, looked at Shopping again, and could not find Noxgear. So the two modules may have read Shopping in different ways, and only the Decide module ever saw both.',
      open: 'mkgcamp' },

    { about: ['mkgnext'], kicker: 'The next answer',
      head: 'Each answer says what would prove it wrong, and the next answer tests that first with the day’s data',
      visual: { type: 'timeline', items: [
        ['Nov 1, 3:30 AM ET', 'C2’s answer says it is wrong if Meta’s placements are set by hand, if Google’s tips are all off, if the homepage loads in under 4 seconds on a phone, or if the market’s click price rose as much as ours.'],
        ['Nov 3, 3:07 AM ET', 'In a test on a copy of Barbara’s data, C2’s next answer tests each of those four things first. Meta still picks the placements, the 4 tips are still on, and Google refused the speed test.'],
        ['The old answer', 'None of the tests holds, so the old answer stands, but one point is out of date, because under the $7 limit our click cost is back inside the market’s range.']] },
      vcap: 'Code puts that sentence, up to {marketWrong} characters of it, at the top of the next fact sheet. Will can also mark each answer right or wrong in Barbara, under Validators and then Modules. Opus sees his mark the next time it answers, but none of this module’s answers has a mark yet.',
      quote: ['on the second run the next day it would catch this again, if something was truly wrong', 'Nov 1'] }
  ],

  examples: {
    ONE: { tag: 'real', rows: [{ steps: [['Kogalla’s answer, Nov 1', 'a problem', 'opus']], end: [['26 facts of proof, 4 fixes and 8 checks answered', '', 'code']] }], note: 'We took this from the answer that the Setup and market module wrote for Kogalla in a test on Nov 1.' },
    FRESH: { tag: 'made', rows: [{ steps: [['Kogalla’s answer of Nov 1', '', 'opus'], ['Is it under {marketFresh} New York days old on Nov 8?', 'no', 'code']], end: [['The Decide module would not see it', '', 'code']] }], note: 'We made this up from the real day of Kogalla’s answer, because no module ran on Kogalla on Nov 8.' },
    GONE: { tag: 'made', rows: [{ steps: [['Kogalla’s Decide module, if it ran on Nov 8', 'with no answer of this module from the last {marketFresh} days', 'code']], end: [['The Decide module answers without it, and no module waits for it', '', 'code']] }], note: 'We made this up from the real day of Kogalla’s answer, because no module ran on Kogalla on Nov 8.' },
    DEC: { tag: 'real', rows: [{ steps: [['Kogalla’s Setup and market answer', 'it proposes removing the wrong price list', 'opus'], ['The Decide module reads that fix', '', 'code']], end: [['Its first decision removes the price list', '', 'opus']] }], note: 'We took this from the answer that the Decide module wrote for Kogalla in a test on Nov 1.' },
    RANK: { tag: 'real', rows: [{ steps: [['C2’s Meta switch', '$663.55 a month', 'opus'], ['C2’s homepage speed', 'it names no money a month', 'opus']], end: [['The Meta switch comes first on the Decide module’s list, and the speed fix comes last', '', 'code']] }], note: 'We took this from the answer that the module wrote for C2 in a test on a copy of Barbara’s data, on Nov 3.' },
    MERGE: { tag: 'real', rows: [{ steps: [['Bull’s old firm name in 6 ads', 'proposed by Setup and market and by Ads and pages', 'opus']], end: [['The Decide module puts both into one decision', '', 'opus']] }], note: 'We took this from the answers for Bull Legal in the tests of Nov 1, which we read in a copy of Barbara’s data.' },
    CAMP: { tag: 'real', rows: [{ steps: [['Kogalla’s Results module on PMax, Nov 1', 'it got four answers about the whole account', 'code']], end: [['Not the one that named a new Shopping rival', '', 'block']] }], note: 'We took this from the answer that the Results module wrote for Kogalla’s PMax campaign in a test on Nov 1, which we read in a copy of Barbara’s data.' },
    NEXT: { tag: 'real', rows: [{ steps: [['C2’s answer of Nov 1', 'it is wrong if Meta’s placements are set by hand', 'opus'], ['The next answer, Nov 3', 'Meta still picks them', 'opus']], end: [['The old answer stands', '', 'keep']] }], note: 'We took this from the answers that the module wrote for C2 on Nov 1, and on Nov 3 in a test on a copy of Barbara’s data.' },
    MARK: { tag: 'made', rows: [{ steps: [['Will marks an answer wrong', 'with a note', 'will'], ['The module’s next fact sheet', 'carries his mark and his note', 'code']], end: [['Opus reads his mark before it answers', '', 'opus']] }], note: 'We made this up, because no answer of this module that we read carries a mark from Will.' }
  },

  reviewed: { self: '88f85f35', above: 'a09a8b52', on: '2026-11-08' }
});
