// What the client wants: comm-chat src/modules/brief/numbers.rs `client` (500-539) puts the strategy page first, by its
// writer (src/goals.rs `account_goal`), or "No strategy page is written. Say so in your answer."; then the targets in force,
// each with who set it, the day and their words (src/client_profile.rs `in_force`, clipped at 160 characters); the
// client's approved rules; and every address and domain of theirs (gmail::client_mail_terms with the record's contacts,
// joined with no dedup, :517-519). The instructions (src/modules/mod.rs:149-153): "Give what they want now, in their words,
// each with who and when", and "Read what a word means in its call before you use it." A page set by rule passed the
// strategy check (src/results/strategy_case.rs:1-13). Real cases, read 2026-11-07: the facts that code gathered for The
// client on C2 (13), Bull Legal (2), Kogalla (31), KDX (93), Affordable Tree Service (64) and AAFE (42); C2's answer 44 of
// Nov 1 (its wants, the blank page, case #210, Will's reading of the $500 on case #192, reply 2604, and case #63); Kogalla's
// client answer of Nov 1 as its facts of Nov 7 show it. Old parts: retired/2026-11-07-client-redo/clientbrief.js (the
// client's part) and client.js (what the answer must give).
LOGIC.flow({
  id: 'cwant', parent: 'client',
  title: 'What the client wants', short: 'What they want',
  head: 'The client’s own words say what they want, so the answer gives each want in those words, with who said it and when',
  chart: [
    'flowchart TB',
    'PAGE["The strategy page: what the<br/>client wants, what winning<br/>looks like, the plan, and<br/>what never to do"]:::code',
    'WRITTEN{"Is a page<br/>written?"}:::code',
    'NONE(["No, so code says so,<br/>and the answer must<br/>say so too"]):::code',
    'TGT["The targets in force, each<br/>with who set it and when"]:::code',
    'RULES["The client’s own rules, and<br/>every address of theirs"]:::code',
    'NEWER["Opus reads their newest words,<br/>because a want can change<br/>after the page was written"]:::opus',
    'MEANS["Opus reads what a word means<br/>in its call before it uses it"]:::opus',
    'WANTS(["What they want now, in their<br/>words, each with who and when"]):::opus',
    'PAGE --> WRITTEN',
    'WRITTEN -- yes --> TGT', 'WRITTEN -- no --> NONE', 'NONE --> TGT',
    'TGT --> RULES', 'RULES --> NEWER', 'NEWER --> MEANS', 'MEANS --> WANTS'
  ],
  links: { PAGE: 'capage', WRITTEN: 'capage', NONE: 'capage', TGT: 'catargets', RULES: 'carules', NEWER: 'canewer', MEANS: 'cameans' },
  leaves: {
    capage: 'The strategy page',
    catargets: 'The targets, and who set them',
    carules: 'The client’s rules and addresses',
    canewer: 'A want can change',
    cameans: 'What a word means in its call'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['cwant'], kicker: 'The idea',
      head: 'A want is best said in the client’s own words, so the strategy page quotes each one with who said it and when',
      visual: { type: 'card', title: 'What C2 wants, on its strategy page of Nov 7', fields: [
        ['Waylon, the call of Sep 24', '“i really want to scale the budget i just don\'t want it to be in vain”'],
        ['Waylon, the call of Oct 21', '“do you think we should do the same again”'],
        ['Waylon, the call of Oct 21', '“i do eventually want to just talk about a bigger role for you guys”'],
        ['Waylon, the call of Sep 16', '“austin nashville and chicago would be the only cities that i would”'],
        ['What winning looks like', 'About $500 a conversion, with leads coming through proper, in Waylon’s terms of Sep 24. Will picks the measure.']],
        stamp: ['By Will, from 11 calls and 3 mails', 'will'] },
      vcap: 'Each want names the person and the day, so Opus can read it again at its source. The answer then says what the client wants now, because a page can be older than the newest call.' },
    { about: ['cwant'], kicker: 'Six real clients · Nov 7',
      head: 'Will wrote four of the six test clients’ strategy pages, and Barbara set the other two by rule',
      visual: { type: 'dots', groups: [[4, 'will', 'pages Will wrote'], [2, 'code', 'pages Barbara set by rule from a run’s draft']] },
      table: { head: ['Client', 'Who wrote the page', 'Targets in force', 'The client’s rules'], rows: [
        ['C2', 'Will', '4', '1'],
        ['Bull Legal', 'Will', '2', '1'],
        ['Kogalla', 'Will', '4', '0'],
        ['KDX', 'Will', '4', '0'],
        ['Affordable Tree Service', 'Barbara, from the draft of run #239', '2', '0'],
        ['AAFE', 'Barbara, from the draft of run #241', '4', '1']],
        note: 'The facts that code gathered for The client on each of the six, read on Nov 7.' },
      vcap: 'A page that Barbara set by rule passed the strategy check first, so each want on it was read at its source.' },

    { about: ['capage'], kicker: 'The strategy page',
      head: 'Code puts the strategy page first, and a blank page makes the answer say so',
      visual: { type: 'flow', rows: [
        { title: 'A page is written', steps: [['The page comes first in the facts', 'by Will, or by Barbara’s rule', 'code']], end: [['Opus reads it before any mail or call', '', 'opus']] },
        { title: 'No page is written', steps: [['The facts say “No strategy page is written. Say so in your answer.”', '', 'code']], end: [['The answer says so, and the run drafts a page from it', '', 'opus']] }] },
      vcap: 'On Nov 1 C2 had no page yet, so answer 44 said so and proposed that Will approve the redraft that waited on case #210. C2’s page is Will’s now.' },

    { about: ['catargets'], kicker: 'The targets',
      head: 'Each target names who set it and when, and that is not always the client',
      visual: { type: 'flow', rows: [
        { title: 'C2, Nov 7', steps: [['Its 4 targets in force', '', 'code']], end: [['$500 a lead on Google Ads', 'Waylon, Sep 24, “so if we can get this down to what like 500 of conversion”', 'will'], ['$60 a lead and a $200 cap on Meta, and an $11,800 cap on Google', 'Barbara, by rule, Nov 1', 'code']] },
        { title: 'Kogalla, Nov 7', steps: [['Its 2 targets on Google Ads', '', 'code']], end: [['A 300% return and a $1,520 cap', 'our proposal from account data, with no client words', 'code']] }] },
      vcap: 'Code hands on only the targets in force, each with who set it and when. Three of C2’s four came from Barbara’s rule, so the facts say plainly which numbers are the client’s own.' },

    { about: ['carules'], kicker: 'Rules and addresses',
      head: 'Code hands on the client’s own rules and every address of theirs, so Opus can find all their mail',
      visual: { type: 'gate', rows: [
        ['C2’s rule', 'An ad sends people only to one approved page, from the verifiers’ notebook of Sep 9.', 'pass'],
        ['C2’s addresses', 'ctwomanagement.com, and Waylon’s and Klaudia’s own addresses.', 'pass'],
        ['Affordable Tree Service’s addresses', 'Six are listed, and one of them twice, because code joins two lists and keeps both copies.', 'hold']] },
      vcap: 'The addresses come from the client’s record and its mail search, and Opus searches the team’s mail for every one of them.' },

    { about: ['canewer'], kicker: 'A want can change',
      head: 'A want can change after the page was written, so Opus reads the newest words too',
      visual: { type: 'timeline', items: [
        ['Before Oct 12', 'Kogalla’s ads sell every product in the store.'],
        ['Oct 12', 'Rob writes “If we could adjust the ads for this SKU only, until we get more batteries in, that would be good.”'],
        ['Nov 1', 'The client answer says that Rob asked for ads on the RA Light Kit only, and that Google and Meta still advertise other products.'],
        ['Nov 7', 'Kogalla’s strategy page now opens with Rob’s words of Oct 12.']] },
      vcap: 'A stock-out changed what Rob wanted, and his mail said so before any page did. That is why the instructions send Opus to the newest mail, calls and Slack after the page.' },

    { about: ['cameans'], kicker: 'What a word means',
      head: 'Opus reads what a word means in its call before it uses it, because one number can mean two things',
      visual: { type: 'flow', rows: [
        { title: 'C2, the call of Sep 24', steps: [['Waylon says “so if we can get this down to what like 500 of conversion”', '', 'will'], ['A conversion could be Google’s count, or a real lead', '', 'wait'], ['Will reads it as a Google conversion', 'and keeps the measure for his own pick', 'will']], end: [['The answer quotes him whole, and says how Will reads it', '', 'opus']] }] },
      vcap: 'Answer 44 took that reading from Will’s reply on case #192 and from case #63. The instructions give the rule in one line, “Read what a word means in its call before you use it.”' }
  ],

  examples: {
    PAGE: { tag: 'real', rows: [{ steps: [['C2’s strategy page, Nov 7', 'by Will, from 11 calls and 3 mails', 'code']], end: [['Five wants, each in Waylon’s words with its day', '', 'will']] }], note: 'The facts that code gathered for C2 on Nov 7.' },
    WRITTEN: { tag: 'real', rows: [{ steps: [['KDX, Nov 7', 'a page by Will', 'code'], ['Is a page written?', 'yes', 'code']], end: [['Opus reads it first', '', 'opus']] }], note: 'The facts that code gathered for KDX on Nov 7.' },
    NONE: { tag: 'real', rows: [{ steps: [['C2, Nov 1', 'no page yet, and a redraft waits on case #210', 'code']], end: [['The answer says so, and asks Will to approve the redraft', '', 'opus']] }], note: 'C2’s answer 44, of Nov 1.' },
    TGT: { tag: 'real', rows: [{ steps: [['C2’s targets, Nov 7', '4 in force', 'code']], end: [['1 in Waylon’s words, and 3 from Barbara’s rule', '', 'wait']] }], note: 'The facts that code gathered for C2 on Nov 7.' },
    RULES: { tag: 'real', rows: [{ steps: [['C2, Nov 7', '1 rule and 3 addresses', 'code']], end: [['Opus searches the mail for each address', '', 'opus']] }], note: 'The facts that code gathered for C2 on Nov 7.' },
    NEWER: { tag: 'real', rows: [{ steps: [['Rob, Oct 12', '“If we could adjust the ads for this SKU only, until we get more batteries in, that would be good.”', 'will']], end: [['Ads on the RA Light Kit only, until the batteries are back', '', 'opus']] }], note: 'Kogalla’s client answer of Nov 1, as its facts of Nov 7 show it.' },
    MEANS: { tag: 'real', rows: [{ steps: [['Waylon’s $500 a conversion', 'the call of Sep 24', 'will'], ['Will reads it as a Google conversion', '', 'will']], end: [['Quoted whole, with Will’s reading beside it', '', 'opus']] }], note: 'C2’s answer 44, of Nov 1.' },
    WANTS: { tag: 'real', rows: [{ steps: [['Scale the budget, but not in vain', 'Waylon, Sep 24', 'will'], ['A page that shows which source sends the bad leads', 'Oct 7, and “asap” on Oct 14', 'will']], end: [['Each want with its day and its call or mail', '', 'opus']] }], note: 'C2’s answer 44, of Nov 1.' }
  },

  reviewed: { self: 'f8d1fe36', above: 'a94aa4ce', on: '2026-11-07' }
});
