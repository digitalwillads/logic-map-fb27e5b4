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
// Will, 2026-11-08, a note on this part: "What about if we onboard a new client and their tracking is broken. Does that
// change this? We would want to have it find out here and then pass it to opus (as this is a validator) which would then
// work on fixing it." So before the first send, code checks two things against the record (the click id kept, and nothing
// else counting the same leads), each failure goes to Opus, the fix goes on a case for a person, and code checks again.
// The send itself does not change, because it never reads the client's tags. Real cases (the verifiers' trees, read
// 2026-11-08): onboarding.toml:509-521, the goal "Conversion tracking is checked before the first dollar is spent" (its two
// checks built = false; Verify.Dog and Bad Ass Candles pass, Take2 AI fails); fb-conversion-tracking.toml:899 (Piretti's
// onboarding call of Sep 29: "never had attribution set up right", Meta's 29 purchases worth $13,554 before us).
LOGIC.flow({
  id: 'tsend', parent: 'tracking', status: 'Partly built; the rest is not built yet',
  title: 'Send the conversions from the record', short: 'Send from the record',
  head: 'When the record sends each real lead and sale to its platform, every conversion is one we know',
  chart: [
    'flowchart TB',
    'START(["Before the first send,<br/>such as for a new client"]):::next',
    'KEPT{"Does the record keep the<br/>click id of each lead<br/>and sale?"}:::next',
    'ONCE{"Once the send starts, will<br/>anything else count the<br/>same leads and sales?"}:::next',
    'FIX["Opus works on the fix,<br/>from what code found"]:::next',
    'CASE(["The fix goes on a case for<br/>a person, and code checks<br/>again once it is out"]):::next',
    'NEW["Each lead or sale as it comes in:<br/>its time, its own id, its value,<br/>and the click id it came with"]:::next',
    'CLICK{"Did it come from<br/>an ad click?"}:::next',
    'KEEP(["No ad click, so there is<br/>nothing to send, and it counts<br/>in the record alone"]):::next',
    'SEND["It goes to the platform of<br/>that click, with the click id<br/>and its own id"]:::next',
    'REPLY{"Did the platform<br/>take it?"}:::next',
    'REFUSED(["Refused, with the platform’s<br/>reason, which is a clue<br/>to what broke"]):::next',
    'TAKEN(["Taken, so this conversion<br/>is one lead or sale we know"]):::next',
    'BACK["When the client marks the lead<br/>bad or refunds the order, the<br/>conversion is taken back"]:::next',
    'START --> KEPT',
    'KEPT -- no --> FIX', 'KEPT -- yes --> ONCE',
    'ONCE -- yes --> FIX', 'ONCE -- no --> NEW',
    'FIX --> CASE', 'CASE -.-> KEPT',
    'NEW --> CLICK',
    'CLICK -- no --> KEEP', 'CLICK -- yes --> SEND',
    'SEND --> REPLY',
    'REPLY -- no --> REFUSED', 'REPLY -- yes --> TAKEN',
    'TAKEN --> BACK'
  ],
  links: { START: 'tsfirst', KEPT: 'tsnew', ONCE: 'tsonce', FIX: 'tsfix', CASE: 'tsfix', NEW: 'tsnew', SEND: 'tswho', REPLY: 'tsreply', REFUSED: 'tsreply', BACK: 'tsback' },
  leaves: {
    tsfirst: 'A new client',
    tsnew: 'What the record must keep',
    tsonce: 'Nothing else counts them',
    tsfix: 'Opus works on the fix',
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

    { about: ['tsfirst'], kicker: 'A new client',
      head: 'A new client’s broken tags do not change the send, because the send never uses them',
      visual: { type: 'flow', rows: [
        { title: 'Piretti, when we took it on', steps: [['Meta reports 29 purchases worth $13,554', 'Jul 1 to Oct 4, all before us', 'code'], ['Josh says attribution was never set up right', 'its onboarding call, Sep 29', 'will']], end: [['Nobody can trust that count', '', 'block']] },
        { title: 'The same store, in the plan', steps: [['The store’s own orders are the truth', '', 'next'], ['Each order from an ad goes to Meta', 'with its click id and its order number', 'next']], end: [['Meta counts each order once, from the record', 'once the old tag stops counting', 'keep']] }] },
      vcap: 'The send reads the client’s record, never the tags on the site, so a broken tag changes nothing in it. But two things must be right before the first send. The record must keep the click id of each lead and sale, and nothing else may count them once the send starts. Code checks both, and Opus works on each fix.',
      quote: ['What about if we onboard a new client and their tracking is broken. Does that change this?', 'Nov 8'] },
    { about: ['tsfirst'], kicker: 'Today',
      head: 'Today the first dollar can come before anyone checks the tracking',
      visual: { type: 'gate', rows: [
        ['Verify.Dog', 'The client’s developer tested the Google purchase tag on Oct 5, and the account spent nothing before that.', 'pass'],
        ['Bad Ass Candles', 'Reileigh said the pixels were ready on Sep 16, and the ads started on Sep 24.', 'pass'],
        ['Take2 AI', 'Google spent from Sep 27. On Sep 30 Will still asked the client to add the conversion linker in Tag Manager, and no reply came. On Oct 5 its main actions had 1, 1 and 0 conversions in all time.', 'stop']] },
      vcap: 'The onboarding rule “Conversion tracking is checked before the first dollar is spent” is written, but its checks are not built, so nothing stopped Take2’s ads. In the plan, the record’s two checks run at onboarding too, so they can find a break before the first dollar.' },

    { about: ['tsnew'], kicker: 'What the record must keep',
      head: 'To send a lead or sale, the record must keep its own id and the click id it came with',
      visual: { type: 'card', title: 'One lead, as the record would keep it', fields: [
        ['Its own id', 'A lead number, or the order number for a sale, so the platform counts it once and can take it back later.'],
        ['When it came', 'The time the form was sent or the order was placed.'],
        ['The click id', 'The id in the page address, which is a gclid from Google, an fbclid from Meta or an msclkid from Microsoft. A form keeps it in a hidden field, and a store keeps the landing page of each order.'],
        ['Its value', 'For a sale, what the order was worth. For a lead, the value the client gives a real lead, if it has one.']], stamp: ['Not built yet', 'next'] },
      vcap: 'Today C2’s and Bull Legal’s lead apps keep Google’s click with each lead, but no record keeps Meta’s or Microsoft’s click yet.' },

    { about: ['tsnew'], kicker: 'The check before the first send',
      head: 'Before the first send, code checks that the newest leads and sales carry their click ids',
      visual: { type: 'gate', rows: [
        ['A lead with its click id', 'It can be sent, because the platform ties it to the click.', 'pass'],
        ['No lead with a click id', 'The ads got clicks, but no lead carries an id, so the form drops it and nothing can be sent.', 'stop'],
        ['An order in a Shopify store', 'Shopify keeps the landing page of each order, so the click id is there once we can read the orders.', 'wait']] },
      vcap: 'When the ids are missing, the fix is small. A hidden field on the form keeps the id from the page address, and the record saves it with the lead. Opus works on that fix, and code checks the next leads again.' },

    { about: ['tsonce'], kicker: 'Nothing else counts them',
      head: 'When the send starts, the old count must stop on the same day, or each lead counts twice',
      visual: { type: 'flow', rows: [
        { title: 'Both count', steps: [['The tag on the site counts a lead', '', 'code'], ['The send counts the same lead', '', 'next']], end: [['The platform counts it twice', '', 'block']] },
        { title: 'The switch, on one day', steps: [['The send starts', '', 'next'], ['The old action stops counting', '', 'next']], end: [['Each lead counts once', '', 'keep']] }] },
      vcap: 'This holds whether the old tag works or is broken, because the send takes the place of its count. Where a client’s own tool already sends, such as Kogalla’s Shopify to Meta, one of the two must stop, and that change needs the client’s yes.' },

    { about: ['tsfix'], kicker: 'Opus works on the fix',
      head: 'Tracking is a validator, so code finds the break, Opus works on the fix, and code checks again',
      visual: { type: 'flow', rows: [
        { title: 'A validator today, on Opus’s own work', steps: [['A check fails, and says why', '', 'will'], ['Opus reads why and fixes its work', '', 'opus']], end: [['The check runs again', '', 'will']] },
        { title: 'Tracking at a new client, in the plan', steps: [['Code finds that the form drops the click id', '', 'next'], ['Opus works on the fix', 'a hidden field for the click id', 'next'], ['A person says yes on the case', '', 'next']], end: [['Code checks again, and the send starts once both checks pass', '', 'next']] }] },
      vcap: 'The first row is how a validator treats Opus’s work today. Tracking’s fix changes the client’s site or account, so the module changes nothing by itself, and each fix goes on a case for a person. Once the fix is out, code checks again.',
      quote: ['We would want to have it find out here and then pass it to opus (as this is a validator) which would then work on fixing it.', 'Nov 8'] },

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
    START: { tag: 'plan', rows: [{ steps: [['Piretti’s onboarding call', 'Sep 29', 'will'], ['Josh says attribution was never set up right', '', 'will']], end: [['Code checks the account before the first send', '', 'next']] }], note: 'Piretti’s words are real, from its onboarding call of Sep 29. No code runs this check yet.' },
    KEPT: { tag: 'plan', rows: [{ steps: [['C2’s newest leads', 'in its lead app', 'code'], ['The Google ones carry a gclid, but none carries an fbclid', '', 'next']], end: [['Google’s leads can be sent, but Meta’s cannot yet', '', 'block']] }], note: 'The facts are real, because C2’s lead app keeps Google’s click with each lead but not Meta’s. No code runs this check yet.' },
    ONCE: { tag: 'plan', rows: [{ steps: [['Kogalla’s Shopify sends each order to Meta', 'from its server', 'code'], ['Our send would send the same orders', '', 'next']], end: [['One of the two must stop first, with the client’s yes', '', 'block']] }], note: 'Shopify’s send to Meta is real, from Kogalla’s Tracking answer of Nov 1. Nothing of ours sends for Kogalla yet.' },
    FIX: { tag: 'real', rows: [{ steps: [['Meta counted 7 leads, but 4 came in', 'C2, Oct 26 to Nov 1', 'code'], ['Opus finds two Meta Lead tags on each form', '', 'opus']], end: [['Opus names the fix, which pauses one tag and keeps the other only on the sent form', '', 'opus']] }], note: 'C2’s Tracking answer of Nov 1, a module test. It came on the daily path, not before a first send.' },
    CASE: { tag: 'real', rows: [{ steps: [['C2’s fix is a staged Tag Manager version', 'one Meta Lead tag paused, the other only on the sent form', 'opus']], end: [['Case #58 waits on Will', '', 'will']] }], note: 'C2’s Tracking answer of Nov 1 proposed it, and Decide put it on a case. Nothing checks again once a fix is out yet.' },
    NEW: { tag: 'plan', rows: [{ steps: [['A lead comes into C2’s lead app', 'from a Google click', 'code'], ['The app keeps its time, its own id and its gclid', '', 'next']], end: [['Ready to send', '', 'next']] }], note: 'Made up from C2’s lead app, which keeps each lead’s Google click today but gives code no lead rows yet.' },
    CLICK: { tag: 'plan', rows: [{ steps: [['C2, the week of Oct 19', '10 leads came in', 'code'], ['Did each come from an ad click?', '4 came with a Google click', 'next']], end: [['Those 4 go to Google', '', 'next']] }], note: 'The numbers are real, from Barbara’s weekly lead counts for C2, read on Nov 7. The lead app keeps only Google’s click today, so the other 6 may hold Meta clicks that nobody kept.' },
    KEEP: { tag: 'plan', rows: [{ steps: [['A lead from a search with no ad', 'no click id', 'code']], end: [['Nothing to send, and it counts in the record alone', '', 'next']] }], note: 'Made up.' },
    SEND: { tag: 'real', rows: [{ steps: [['A Summerset tour, written into ActiveCampaign', '', 'code'], ['Our worker sends it to Google', 'with its gclid and its own id', 'code']], end: [['Google counts that person’s tour once', '', 'keep']] }], note: 'Summerset’s conversion worker, read on Nov 7. Each send carries its own id, so Google counts each person once for each step.' },
    REPLY: { tag: 'plan', rows: [{ steps: [['Code reads Google’s reply each morning', '', 'next']], end: [['Taken, or refused with a reason', '', 'next']] }], note: 'Made up. Summerset’s worker can read the status of each send, but no code reads the replies each morning yet.' },
    REFUSED: { tag: 'plan', rows: [{ steps: [['A lead whose gclid was cut short', 'the form kept only part of it', 'next'], ['Google refuses it', 'the click id is not valid', 'block']], end: [['A clue that the form keeps the id badly', '', 'block']] }], note: 'Made up, because no code reads the replies yet.' },
    TAKEN: { tag: 'plan', rows: [{ steps: [['C2, the week of Oct 19', '3 real leads go to Google', 'next'], ['Google takes all 3', '', 'next']], end: [['Google’s 3 are three leads we know', '', 'keep']] }], note: 'The 3 are real, from Barbara’s weekly lead counts for C2, read on Nov 7. Nothing sends them yet.' },
    BACK: { tag: 'real', rows: [{ steps: [['C2, October', '5 leads with a Google click marked bad', 'will'], ['The lead app tells Google', '', 'code']], end: [['Google takes all 5 back', '', 'keep']] }], note: 'C2’s Tracking answer of Nov 1. This piece runs today, for C2 on Google alone.' }
  },

  reviewed: { self: '9a0b0987', above: '7441c765', on: '2026-11-08' }
});
