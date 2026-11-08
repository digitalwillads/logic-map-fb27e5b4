// Send the conversions from the record: not built. Will, 2026-11-07, after the rebuild: "Can we reconcile the orders /
// leads with the conversions if we have the data. I can make sure we have the data". Offered "Add 'send the conversions
// from the record' to the Tracking map, as not built", he picked it (with the list of what each client must give:
// DATA-NEEDED.md). Google, Meta and Microsoft report conversions by day and by campaign but never list which lead or sale
// each one was, so one to one needs the record to send each real lead and sale itself, with its own id.
// Sources: C2's lead app tells Google to take back each lead the client marks bad, and Google took back all 5 of October
// (C2's Tracking answer of Nov 1); Kogalla's Shopify sends each order to Meta from its server (Kogalla's Tracking answer of
// Nov 1); Microsoft can retract or restate an offline conversion by its click id and time, and keeps the first upload for
// each click id and time (learn.microsoft.com: OnlineConversionAdjustment, the bulk offline conversion guide and
// OfflineConversion, checked 2026-11-07); for Meta we found no way to take a sent event back, only third-party guides that
// send refunds as a separate event (checked 2026-11-07), so Meta's send waits for the client's mark (Claude's call).
// Real sends today: Summerset's conversion worker (the verifiers' data/clients/summerset/conversion-worker/worker.js:1-20,
// read 2026-11-07) sends each ActiveCampaign lead, tour and move-in to Google with its gclid and its own id
// (ac-<contact>-<kind>), and can read the status of each send; Skai sends the LS brands' qualified leads to Google as
// Kenshoo_MQL (Barbara's copy of Nov 7, ad_day_conversions: Welch's Google 14, 212, 168 and 224 from March to June,
// then none to Nov 6; Thomas and ADI go on through October). Who sends is Will's question (Nov 7).
LOGIC.flow({
  id: 'tsend', parent: 'tracking', status: 'Partly built; the rest is not built yet',
  title: 'Send the conversions from the record', short: 'Send from the record',
  head: 'When the record sends each real lead and sale to its platform, every conversion is one we know',
  chart: [
    'flowchart TB',
    'NEW["Each lead or sale as it comes in:<br/>its time, its own id, its value,<br/>and the click id it came with"]:::next',
    'CLICK{"Did it come from<br/>an ad click?"}:::next',
    'KEEP(["No ad click, so there is<br/>nothing to send, and it counts<br/>in the record alone"]):::next',
    'SEND["It goes to the platform of<br/>that click, with the click id<br/>and its own id"]:::next',
    'REPLY{"Did the platform<br/>take it?"}:::next',
    'REFUSED(["Refused, with the platform’s<br/>reason, which is a clue<br/>to what broke"]):::next',
    'TAKEN(["Taken, so this conversion<br/>is one lead or sale we know"]):::next',
    'BACK["When the client marks the lead<br/>bad or refunds the order, the<br/>conversion is taken back"]:::next',
    'NEW --> CLICK',
    'CLICK -- no --> KEEP', 'CLICK -- yes --> SEND',
    'SEND --> REPLY',
    'REPLY -- no --> REFUSED', 'REPLY -- yes --> TAKEN',
    'TAKEN --> BACK'
  ],
  links: { NEW: 'tsnew', SEND: 'tswho', REPLY: 'tsreply', REFUSED: 'tsreply', BACK: 'tsback' },
  leaves: {
    tsnew: 'What the record must keep',
    tswho: { title: 'Who sends', open: {
      q: 'Who should send each real lead and sale to the platforms: our code, or the client’s own systems?',
      since: 'Nov 7',
      opts: [
        ['Our code sends every one, from the record it reads each morning', true, 'Only the one who sends sees the platform’s reply for each lead or sale, so this is the only way to match every conversion one by one. Our own worker already does this for Summerset on Google. Where a client’s own tool already sends the same conversions, that sending must stop, or each one counts twice, and that change needs the client’s yes.'],
        ['The client’s own system sends where it already can, and our code sends the rest', false, 'This changes the least in each account, because some tools already send, such as Skai for the five LS brands and Kogalla’s Shopify to Meta. But where the client’s tool sends, code sees only the platform’s totals, so that part is matched by count, and a feed that stops, like Skai’s to Welch’s Google after June, shows only as a gap.'],
        ['Nothing is sent, and code matches counts only', false, 'Nothing changes in any account, and the match stays by day and by campaign. No conversion is ever a lead or sale we know.']] } },
    tsreply: 'The platform’s reply',
    tsback: 'Taking one back'
  },

  deck: [
    { about: ['tsend'], kicker: 'The idea',
      head: 'The platforms report only totals, so to match one to one we must send them each lead and sale ourselves',
      visual: { type: 'flow', rows: [
        { title: 'Today, the platform’s tag counts', steps: [['Someone sends the form', '', 'code'], ['Google’s tag counts a conversion', 'on its own', 'code']], end: [['Google reports 3 that week, but not which 3', '', 'block']] },
        { title: 'The plan, the record sends', steps: [['The lead comes into the record', 'with its click id', 'next'], ['It goes to Google with the lead’s own id', '', 'next']], end: [['Each of the 3 is a lead we know', '', 'keep']] }] },
      vcap: 'Google, Meta and Microsoft each report how many conversions came by day and by campaign, but none of them lists which lead or sale each one was. When the record itself sends each real lead and sale, every conversion carries an id we know, so the match can check them one by one.',
      quote: ['Can we reconcile the orders / leads with the conversions if we have the data. I can make sure we have the data', 'Nov 7'] },
    { about: ['tsend'], kicker: 'What it fixes',
      head: 'A broken tag stops mattering, because the count no longer comes from the tag',
      visual: { type: 'flow', rows: [
        { title: 'C2’s Meta today', steps: [['Two Meta Lead tags fire on each form', 'since May 20', 'block'], ['Meta’s tag counted 7 leads', 'Oct 26 to Nov 1', 'block']], end: [['Only 4 leads came in, so the count is wrong', '', 'block']] },
        { title: 'C2’s Meta in the plan', steps: [['The record sends each real lead from a Meta click', 'once, with its own id', 'next']], end: [['Meta counts each one once, so its count is the true one', '', 'keep']] }] },
      vcap: 'This is not built yet, but the numbers are real, from C2’s trust calendar and its Tracking answer of Nov 1. A tag can fire twice or go silent, but a lead the record sends once counts once, so the platform’s bidding also learns from real leads.' },
    { about: ['tsend'], kicker: 'Today',
      head: 'Today a few clients already send, and code checks none of the sends against the record',
      visual: { type: 'gate', rows: [
        ['Summerset and Google, through our own worker', 'Our worker sends each lead, tour and move-in from ActiveCampaign to Google, with its gclid and its own id, so Google counts each person once for each step. Nothing reads ActiveCampaign back to compare yet.', 'pass'],
        ['C2’s lead app and Google', 'When Waylon marks a lead bad, the lead app tells Google, and Google takes that conversion back. In October it took back all 5 bad leads.', 'pass'],
        ['The five LS brands, through the client’s own tool', 'Skai sends the qualified leads back to Google and Microsoft. Its feed to Welch’s Google account brought 224 in June and none since July, while the account kept spending.', 'hold'],
        ['Kogalla’s store and Meta', 'Shopify sends each order to Meta from its server, and Kogalla’s answer of Nov 1 used that count as the closest thing to the store’s own list.', 'wait'],
        ['Everything else', 'No other record sends its leads or sales to a platform.', 'wait']] },
      vcap: 'Summerset’s worker already does most of this, for one client on Google. Will said on Nov 7 that he can make sure we have the data for the rest.' },

    { about: ['tsnew'], kicker: 'What the record must keep',
      head: 'To send a lead or sale, the record must keep its own id and the click id it came with',
      visual: { type: 'card', title: 'One lead, as the record would keep it', fields: [
        ['Its own id', 'A lead number, or the order number for a sale, so the platform counts it once and can take it back later.'],
        ['When it came', 'The time the form was sent or the order was placed.'],
        ['The click id', 'The id in the page address, which is a gclid from Google, an fbclid from Meta or an msclkid from Microsoft. A form keeps it in a hidden field, and a store keeps the landing page of each order.'],
        ['Its value', 'For a sale, what the order was worth. For a lead, the value the client gives a real lead, if it has one.']], stamp: ['Not built yet', 'next'] },
      vcap: 'Today C2’s and Bull Legal’s lead apps keep Google’s click with each lead, but no record keeps Meta’s or Microsoft’s click yet.' },

    { about: ['tswho'], kicker: 'A question for Will',
      head: 'Only the one who sends sees the platform’s reply for each lead, so who sends decides if the match can be one to one',
      visual: { type: 'flow', rows: [
        { title: 'Our own worker sends, at Summerset', steps: [['Each lead, tour and move-in goes to Google', 'with its gclid and its own id', 'code'], ['Google’s answer on each send comes back to our worker', '', 'code']], end: [['Code can check every one against the record', '', 'keep']] },
        { title: 'The client’s own tool sends, at Welch', steps: [['Skai sends qualified leads to Google', '', 'code'], ['The feed stopped after June', '', 'block']], end: [['We see it only as a gap in the totals', '', 'block']] }] },
      vcap: 'Some clients’ own tools already send, such as Skai for the five LS brands and Kogalla’s Shopify to Meta. If our code sends the same conversions too, each one counts twice, so one of the two must stop.',
      open: 'tswho' },

    { about: ['tsreply'], kicker: 'The platform’s reply',
      head: 'Each platform answers every send, so a refused one comes with its reason',
      visual: { type: 'gate', rows: [
        ['Taken', 'The platform counts it as one conversion, under the campaign of its click.', 'pass'],
        ['The click is too old', 'A platform takes a conversion only within its own window after the click.', 'stop'],
        ['The click id is wrong', 'The id was cut short or belongs to another account, so the form or the store keeps it badly.', 'stop'],
        ['A copy', 'The platform already has this lead or order, so it keeps the first one. Microsoft keeps the first send for each click id and time.', 'hold']] },
      vcap: 'This is not built yet. In the plan code reads every reply each morning, so a refused lead is a clue with its reason, ready before Opus starts.' },

    { about: ['tsback'], kicker: 'Taking one back',
      head: 'Google and Microsoft can take a conversion back, but for Meta we found no way, so Meta’s send waits for the mark',
      visual: { type: 'flow', rows: [
        { title: 'Google, C2 in October', steps: [['Waylon marks 5 leads bad', '', 'will'], ['The lead app tells Google', '', 'code']], end: [['Google takes all 5 back', '', 'keep']] },
        { title: 'Microsoft', steps: [['A lead turns out bad', '', 'next'], ['Microsoft is asked to take it back', 'by its click id and its time', 'next']], end: [['Microsoft removes it', '', 'next']] },
        { title: 'Meta', steps: [['A lead comes in from a Meta click', '', 'next'], ['The send waits for the client’s mark', 'Waylon marks within 0 to 5 days', 'next']], end: [['Only a real lead goes to Meta', '', 'next']] }] },
      vcap: 'The Google row is real, from C2’s Tracking answer of Nov 1. Microsoft’s documentation says it can take back a conversion by its click id and time. For Meta we found only guides that send a refund as a separate event, so waiting for the mark is Claude’s call.' }
  ],

  examples: {
    NEW: { tag: 'plan', rows: [{ steps: [['A lead comes into C2’s lead app', 'from a Google click', 'code'], ['The app keeps its time, its own id and its gclid', '', 'next']], end: [['Ready to send', '', 'next']] }], note: 'Made up from C2’s lead app, which keeps each lead’s Google click today but gives code no lead rows yet.' },
    CLICK: { tag: 'plan', rows: [{ steps: [['C2, the week of Oct 19', '10 leads came in', 'code'], ['Did each come from an ad click?', '4 came with a Google click', 'next']], end: [['Those 4 go to Google', '', 'next']] }], note: 'The numbers are real, from Barbara’s weekly lead counts for C2, read on Nov 7. The lead app keeps only Google’s click today, so the other 6 may hold Meta clicks that nobody kept.' },
    KEEP: { tag: 'plan', rows: [{ steps: [['A lead from a search with no ad', 'no click id', 'code']], end: [['Nothing to send, and it counts in the record alone', '', 'next']] }], note: 'Made up.' },
    SEND: { tag: 'real', rows: [{ steps: [['A Summerset tour, written into ActiveCampaign', '', 'code'], ['Our worker sends it to Google', 'with its gclid and its own id', 'code']], end: [['Google counts that person’s tour once', '', 'keep']] }], note: 'Summerset’s conversion worker, read on Nov 7. Each send carries its own id, so Google counts each person once for each step.' },
    REPLY: { tag: 'plan', rows: [{ steps: [['Code reads Google’s reply each morning', '', 'next']], end: [['Taken, or refused with a reason', '', 'next']] }], note: 'Made up. Summerset’s worker can read the status of each send, but no code reads the replies each morning yet.' },
    REFUSED: { tag: 'plan', rows: [{ steps: [['A lead whose gclid was cut short', 'the form kept only part of it', 'next'], ['Google refuses it', 'the click id is not valid', 'block']], end: [['A clue that the form keeps the id badly', '', 'block']] }], note: 'Made up, because no code reads the replies yet.' },
    TAKEN: { tag: 'plan', rows: [{ steps: [['C2, the week of Oct 19', '3 real leads go to Google', 'next'], ['Google takes all 3', '', 'next']], end: [['Google’s 3 are three leads we know', '', 'keep']] }], note: 'The 3 are real, from Barbara’s weekly lead counts for C2, read on Nov 7. Nothing sends them yet.' },
    BACK: { tag: 'real', rows: [{ steps: [['C2, October', '5 leads with a Google click marked bad', 'will'], ['The lead app tells Google', '', 'code']], end: [['Google takes all 5 back', '', 'keep']] }], note: 'C2’s Tracking answer of Nov 1. This piece runs today, for C2 on Google alone.' }
  },

  reviewed: { self: 'c717740d', above: '7441c765', on: '2026-11-07' }
});
