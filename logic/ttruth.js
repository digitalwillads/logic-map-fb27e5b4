// What really happened: the client's own record of its real leads and sales. Will, 2026-11-07: "build this as if we can
// always read the real leads and orders. If we don't have access now we will get it". So the part draws every record as
// readable, and its slides say what Barbara reads today. Sources (comm-chat, read 2026-11-07): src/lead_match/read.rs:1-3
// (counts only, each morning), :30-34 (the two lead apps: C2, client 13, clicks from Sep 29, 2026; Bull Legal, client 2,
// clicks from May 7, 2026), :40-61 (a day's leads, with_click = a Google click id only: gclid, gbraid or wbraid; good and bad
// marks; scored and passed on), weeks.rs:38 (real = leads with a click less the bad marks), :57-75 (bug #458: Bull's scorer
// stopped in June); src/scorecard/mod.rs:184 (the account scorecard shows it); src/results/lead_source.rs:1-10 (Will,
// 2026-10-27: a case asks where a lead client keeps its leads; reading the CRM is a later build); HANDOFF-tracking.md,
// surprise 7 (no code reads a store's orders); src/chat/tools/ga4.rs:81 (GA4's sales from Google clicks are GA4's own count).
// Barbara, read 2026-11-07: client_leads weeks of C2 and Bull; client_leads leads of both refused (C2's app has no rows
// route; Bull's answered 401). Tracking's answers of Nov 1: Bull (answer 7: the repeat send of Oct 4 and 5), C2 (answer
// 11: October's marks), Kogalla (answer 9: Shopify's server feed as the stand-in for the store). Click ids, read 2026-11-07:
// Google (support.google.com/google-ads/answer/10417364: gbraid and wbraid on iOS), Meta (developers.facebook.com, "ClickID
// and the fbp and fbc Parameters": fbclid), Microsoft (learn.microsoft.com, AccountProperty: MSCLKID, a 32-character GUID
// unique to each ad click, added to the landing page URL).
LOGIC.flow({
  id: 'ttruth', parent: 'tracking', status: 'Partly built; the rest is not built yet',
  title: 'What really happened', short: 'What happened',
  head: 'The client’s own record holds each real lead and sale, and the ad click it came from',
  chart: [
    'flowchart TB',
    'WHERE["Where the record lives: the<br/>lead app, the CRM, the call<br/>tracker or the inbox, and for<br/>a store, its orders"]:::next',
    'EACH["Each real lead or sale, once:<br/>its day and its value"]:::next',
    'CLICK["The ad click it came from:<br/>Google’s gclid, gbraid or wbraid,<br/>Meta’s fbclid, Microsoft’s msclkid"]:::next',
    'MARK["The client’s marks: a lead<br/>marked bad is not real"]:::code',
    'WHOLE["Code checks that the record<br/>has not stopped: every lead<br/>taken, scored and passed on"]:::code',
    'REAL(["The real count for each<br/>platform: its leads less the bad<br/>marks, and each sale’s value"]):::next',
    'WHERE --> EACH --> CLICK --> MARK --> WHOLE --> REAL'
  ],
  links: { WHERE: 'trwhere', EACH: 'treach', CLICK: 'trclick', MARK: 'trmark', WHOLE: 'trwhole' },
  leaves: { trwhere: 'Where the record lives', treach: 'Each lead or sale, once', trclick: 'The click it came from', trmark: 'Good and bad marks', trwhole: 'The record can break too' },

  deck: [
    { about: ['ttruth'], kicker: 'The idea',
      head: 'The client’s own record is the proof, because it holds each lead or sale that really happened',
      visual: { type: 'flow', rows: [
        { title: 'A lead', steps: [['Someone clicks a Google ad', 'the page address carries the click’s id', 'code'], ['They send the form', 'the site keeps that id with the lead', 'code']], end: [['The record knows Google sent this lead', '', 'keep']] },
        { title: 'A sale', steps: [['Someone clicks a Meta ad', 'the page address carries Meta’s id', 'code'], ['They buy', 'the order keeps the id and what it was worth', 'code']], end: [['The record knows Meta sent this sale, and its value', '', 'keep']] }] },
      vcap: 'A platform only counts what its own tags saw, but the client’s record holds every lead and order. When the record also keeps each click’s id, it can say which platform sent each one, so it can prove each platform’s count.' },
    { about: ['ttruth'], kicker: 'Today · Nov 7',
      head: 'Today Barbara reads two clients’ leads, and only their Google clicks',
      visual: { type: 'timeline', items: [
        ['May 7', 'Bull Legal’s lead app starts to keep the Google click of each lead.'],
        ['Sep 29', 'C2’s lead app starts to keep the Google click of each lead.'],
        ['Oct 27', 'Will asks for a case that finds out where each lead client keeps its leads.'],
        ['Oct 30', 'Barbara reads both lead apps each morning: each day’s leads, and how many came with a Google click.'],
        ['Nov 7', 'Neither app gives Barbara each lead yet: C2’s has no way to, and Bull’s refuses the read. No code reads a store’s orders.']] },
      vcap: 'So today the record can prove Google’s count for C2 and Bull Legal, and nothing else. The rest of this part is drawn as if every client’s record can be read, because Will asked for it that way.',
      quote: ["build this as if we can always read the real leads and orders. If we don't have access now we will get it", 'Nov 7'] },

    { about: ['trwhere'], kicker: 'Where the record lives',
      head: 'Every client keeps its real leads or orders somewhere, and the plan reads each of those places',
      visual: { type: 'gate', rows: [
        ['A lead app', 'C2 and Bull Legal have one, and Barbara reads each day’s leads from both today.', 'pass'],
        ['A CRM', 'A case asks Will once for each business where its leads live. Reading the CRM is a later build.', 'wait'],
        ['A call tracker', 'It would show each real call and the ad it came from. Nothing reads one today.', 'wait'],
        ['An inbox', 'Some clients get their leads by mail. Nothing reads those mails as leads today.', 'wait'],
        ['A store’s orders', 'Each order would come with its value, but no code reads a store’s orders today.', 'wait']] },
      vcap: 'The record must be the client’s own, because a platform or GA4 only counts what its tags saw. So GA4’s report of sales from Google clicks is one more claim, not the truth.',
      quote: ['That should generate a case to get the lead scanning setup so that barbara can see inside of their CRM and make sure the leads are good and score them', 'Oct 27'] },

    { about: ['treach'], kicker: 'Each lead once',
      head: 'A person who sends the form twice is one lead, so the record must count people, not sends',
      visual: { type: 'flow', rows: [
        { title: 'Bull Legal, Oct 4 and Oct 5', steps: [['A visitor sends the Startups form', 'Oct 4', 'code'], ['GA4 shows the same visitor sending it again', 'Oct 5', 'code']], end: [['Google counts one lead, because it counts one per click', '', 'keep'], ['The lead app counts two', '', 'block']] }] },
      vcap: 'Bull’s Tracking answer of Nov 1 found this. If the record counts the second send as a new lead, Google looks wrong when it is right, so the record keeps each lead once.' },
    { about: ['treach'], kicker: 'For a store',
      head: 'For a store, the truth is its own list of orders, and each tag sees only part of it',
      visual: { type: 'bars', max: 53, rows: [
        { label: 'Shopify’s server feed to Meta: the closest to the store’s own list', parts: [[53, 'keep', '53 orders']] },
        { label: 'GA4: every sale it saw on the site', parts: [[43, 'code', '43']] },
        { label: 'Meta’s tag in the browser: every sale it saw', parts: [[42, 'code', '42']] },
        { label: 'Google’s Purchase: the sales it credits to its ads', parts: [[27, 'code', '27']] }] },
      vcap: 'These are Kogalla’s October sales. Barbara cannot read Kogalla’s Shopify orders, so its answer of Nov 1 used Shopify’s server feed to Meta as the closest thing to the store’s own list, and in the plan the store’s orders themselves are the record.' },

    { about: ['trclick'], kicker: 'The click it came from',
      head: 'Each platform puts its own id on the page address when someone clicks an ad',
      visual: { type: 'gate', rows: [
        ['Google adds a gclid, or on iPhones a gbraid or wbraid', 'C2’s and Bull’s lead apps keep it with each lead today.', 'pass'],
        ['Meta adds an fbclid', 'It comes when someone clicks an ad on Facebook or Instagram. No record keeps it today.', 'wait'],
        ['Microsoft adds an msclkid', 'Every ad click gets a new one. No record keeps it today.', 'wait']] },
      vcap: 'Each platform’s own documentation names these ids. A lead that keeps one tells the record which platform sent it, and Google’s click also tells the lead app which campaign it came from.' },
    { about: ['trclick'], kicker: 'Why the click matters',
      head: 'Only the leads that came with a platform’s click can prove that platform’s count',
      visual: { type: 'dots', groups: [[3, 'keep', 'came with a Google click, and are real'], [1, 'block', 'came with a Google click, but the client marked it bad'], [6, 'code', 'came with no Google click']] },
      vcap: 'In the week of Oct 19, 10 leads came into C2’s lead app, but only 4 came from a Google click, and the client marked 1 of those bad. So Google’s true count that week is 3, and Google counted 3.' },

    { about: ['trmark'], kicker: 'Good and bad marks',
      head: 'A lead the client marks bad is not a real lead, so it leaves both the real count and Google’s',
      visual: { type: 'gate', rows: [
        ['29 leads came in during October', 'C2’s lead app took every one of them.', 'pass'],
        ['15 came with a Google click', 'Waylon marked 9 good and 5 bad, and 1 still waited for a mark.', 'pass'],
        ['Google took back all 5 bad ones', 'The lead app sends each bad mark to Google, and Google takes that conversion back.', 'pass'],
        ['Google counted 10', 'That is one for each good or unmarked lead with a Google click.', 'pass']],
        end: ['So Google’s count is true from Oct 1', 'keep'] },
      vcap: 'These numbers come from C2’s Tracking answer of Nov 1, and Bull’s lead app keeps no marks that Barbara can read. Waylon marks each lead 0 to 5 days after it comes, so the newest days stay open until he has marked them.' },

    { about: ['trwhole'], kicker: 'The record can break too',
      head: 'The record can stop working too, so code checks each morning that it handled every lead',
      visual: { type: 'bars', max: 9, rows: [
        { label: 'Leads Bull’s app took, Oct 31 to Nov 6', parts: [[9, 'code', '9 leads']] },
        { label: 'Leads it scored', parts: [[6, 'block', '6 scored']] },
        { label: 'Leads it passed on to Bull’s own system, Clio', parts: [[8, 'block', '8 passed on']] }] },
      vcap: 'Bull Legal’s lead scorer stopped in June, and four months passed before anyone saw it. Now the account scorecard says so the next morning, as it does for this week.' }
  ],

  examples: {
    WHERE: { tag: 'plan', rows: [{ steps: [['KDX', 'no lead app on file', 'code'], ['Barbara reads KDX’s own record each morning', '', 'next']], end: [['KDX’s real leads, each one', '', 'next']] }], note: 'Today Barbara reads the lead apps of C2 and Bull Legal alone, and the facts that code gathered for KDX on Nov 7 name no lead app.' },
    EACH: { tag: 'plan', rows: [{ steps: [['One lead in the record', 'its day, its value and the person who sent it', 'next']], end: [['One row for each lead, once', '', 'next']] }], note: 'Today Barbara reads only each day’s counts. C2’s app has no way to answer each lead, and Bull’s refused the read on Nov 7.' },
    CLICK: { tag: 'plan', rows: [{ steps: [['A lead from a Meta ad', 'its page address carried an fbclid', 'next'], ['The record keeps it with the lead', '', 'next']], end: [['The record knows Meta sent it', '', 'next']] }], note: 'Today C2’s and Bull’s lead apps keep only Google’s click.' },
    MARK: { tag: 'real', rows: [{ steps: [['C2, the week of Oct 19', '4 leads with a Google click', 'code'], ['The client marked 1 of them bad', '', 'will']], end: [['3 real leads', '', 'keep']] }], note: 'Barbara’s weekly lead counts for C2, read on Nov 7.' },
    WHOLE: { tag: 'real', rows: [{ steps: [['Bull’s app, Oct 31 to Nov 6', 'it took 9 leads', 'code'], ['It scored 6, and passed 8 on to Clio', '', 'block']], end: [['The account scorecard says so', '', 'will']] }], note: 'Barbara’s read of Bull’s lead app, Nov 7.' },
    REAL: { tag: 'plan', rows: [{ steps: [['C2, the week of Oct 19', '3 real Google leads', 'keep'], ['The leads that came from a Meta click', 'not kept today', 'next']], end: [['A real count for each platform', '', 'next']] }], note: 'Today the real count is Google’s alone, for two clients.' }
  },

  reviewed: { self: '11e6def7', above: '7441c765', on: '2026-11-07' }
});
