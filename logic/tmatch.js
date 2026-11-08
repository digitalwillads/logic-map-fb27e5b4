// Do they match? The platform's count beside the real count. Today's match (comm-chat, read 2026-11-07):
// src/lead_match/weeks.rs:16-24 (a week matches when the gap is 0, or under 3 leads and under 30% of the real leads),
// :26-52 (full Monday weeks; a week counts once it has settled and each day was read whole; real = the leads with a click
// less the bad marks; before the first click day, totals only), src/lead_match/mod.rs:1-6 (a settled week that does not
// match joins the scorecard's list and is not trusted), src/results/compute.rs:26-37 (SETTLE_DAYS 7: "Only settled days",
// Jacob, Oct 25), src/ad_days/mod.rs:18-22 (one account had 72% of a day's value on the click day, 91% by day 21 and 94% by
// day 30). Barbara, read 2026-11-07: client_leads weeks of C2 (13) and Bull Legal (2). Tracking's answers of Nov 1: Bull
// (answer 7: the week of Oct 5 by day), C2 (answer 11: Waylon marks 0 to 5 days late; the old tag before Sep 29), Kogalla
// (answer 9: 25 of 39 Meta purchases by 1-day view, Jul 27 to Oct 31; $124.81 a sale). The value line is the audit's
// (the verifiers' google-ads-audit.toml:633: within 20% of the store's sales from ads); using it here is Claude's call. Why a
// small gap is normal, checked 2026-11-07: Google's help (support.google.com/google-ads/answer/10081327: the Conversions
// column holds modeled and observed conversions; many cross-device conversions are modeled); Meta's developer blog of
// 2025-10-16 (the 1-day view window stays); Microsoft's docs (AccountProperty: view-through conversions in the "all"
// conversions columns). Judging a whole week, and setting a platform's click count beside the leads with its click, is
// Claude's call.
LOGIC.flow({
  id: 'tmatch', parent: 'tracking', status: 'Partly built; the rest is not built yet',
  title: 'Do they match?', short: 'Do they match?',
  head: 'The match puts each platform’s count beside the real count, and a small gap is normal',
  chart: [
    'flowchart TB',
    'SIDE["Each platform’s count beside<br/>the real count: by day, by<br/>campaign, and for sales the value"]:::next',
    'SETTLED{"Has the week<br/>settled?"}:::code',
    'WAIT(["Settling: it is judged once it<br/>ended {settleDays} days ago and every<br/>day of it was read whole"]):::code',
    'CLICKS{"Did the record keep<br/>the clicks back then?"}:::code',
    'TOTALS(["Totals only: the record cannot<br/>say which platform sent each<br/>lead, so there is no verdict"]):::code',
    'GAP{"Is the gap under {gapLeads}<br/>leads, and under {gapPct}%<br/>of the real leads?"}:::code',
    'VALUE{"For a store: is<br/>the value within<br/>{valuePct}% of its orders?"}:::next',
    'YES(["It matches, so<br/>tracking works"]):::keep',
    'NO(["It does not match, so the<br/>week is not trusted"]):::block',
    'SIDE --> SETTLED',
    'SETTLED -- no --> WAIT', 'SETTLED -- yes --> CLICKS',
    'CLICKS -- no --> TOTALS', 'CLICKS -- yes --> GAP',
    'GAP -- yes --> VALUE', 'GAP -- no --> NO',
    'VALUE -- "yes, or no sales" --> YES', 'VALUE -- no --> NO'
  ],
  links: { SETTLED: 'tmsettle', WAIT: 'tmsettle', CLICKS: 'tmtotals', TOTALS: 'tmtotals', GAP: 'tmline', VALUE: 'tmvalue' },
  leaves: { tmsettle: 'Settled weeks', tmtotals: 'Before the record kept clicks', tmline: 'The line', tmvalue: 'The value of sales' },

  deck: [
    { about: ['tmatch'], kicker: 'The idea',
      head: 'The match compares two counts, never one lead with one conversion',
      visual: { type: 'bars', max: 5, rows: [
        { label: 'Bull’s week of Oct 5: Google', parts: [[1, 'block', '1']] },
        { label: 'Bull’s week of Oct 5: the lead app', parts: [[3, 'keep', '3']] },
        { label: 'Bull’s week of Oct 12: Google', parts: [[5, 'code', '5']] },
        { label: 'Bull’s week of Oct 12: the lead app', parts: [[5, 'keep', '5']] },
        { label: 'Bull’s week of Oct 19: Google', parts: [[4, 'code', '4']] },
        { label: 'Bull’s week of Oct 19: the lead app', parts: [[4, 'keep', '4']] }] },
      vcap: 'These are Bull Legal’s three newest settled weeks. Google reports how many conversions came each day and in each campaign, but not which lead each one was, so the match lays the two counts side by side.' },
    { about: ['tmatch'], kicker: 'Days and weeks',
      head: 'The match lines the counts up by day and by campaign, but it judges a whole week',
      visual: { type: 'flow', rows: [
        { title: 'Bull Legal, the week of Oct 5', steps: [['On Oct 5 Google counted 1, and the lead app 2', '', 'code'], ['On Oct 6 Google counted 0, and the lead app 1', '', 'code']], end: [['Over the week, Google 1 and the lead app 3', 'it does not match', 'block']] }] },
      vcap: 'One day holds too few leads to judge, so the verdict is for the whole week, and the days and campaigns only show where the gap sits. That is Claude’s call, and today’s match already judges by the week.' },
    { about: ['tmatch'], kicker: 'Today and the plan',
      head: 'Today the match judges Google for two clients, and the plan judges every platform the same way',
      visual: { type: 'flow', rows: [
        { title: 'Today', steps: [['Google only', '', 'code'], ['C2 and Bull Legal', '', 'code'], ['The main action, for the whole account', '', 'code']], end: [['A whole week at a time', '', 'code']] },
        { title: 'The plan', steps: [['Google, Meta and Microsoft', '', 'next'], ['Every client', '', 'next'], ['Every action that counts, campaign by campaign', '', 'next']], end: [['A whole week at a time, and the value of sales', '', 'next']] }] },
      vcap: 'Today a settled week that does not match is marked not trusted, and the account scorecard lists it. The plan keeps the same line for every platform.' },

    { about: ['tmsettle'], kicker: 'Settled weeks',
      head: 'A week waits {settleDays} days after it ends, because late conversions and late marks keep landing on it',
      visual: { type: 'bars', max: 100, rows: [
        { label: 'Of a day’s value, shown on the day of the click', parts: [[72, 'code', '72%']] },
        { label: 'Shown by day 21', parts: [[91, 'code', '91%']] },
        { label: 'Shown by day 30', parts: [[94, 'keep', '94%']] }] },
      vcap: 'In one account in the playbook, Google kept adding conversions to a past day for a month. The client’s marks come late too, so on Nov 7 C2’s week of Oct 26 is still settling while its newest leads wait for Waylon’s mark.' },

    { about: ['tmtotals'], kicker: 'Before the record kept clicks',
      head: 'Before the record kept clicks it cannot say which platform sent a lead, so those weeks get no verdict',
      visual: { type: 'flow', rows: [
        { title: 'C2, before Sep 29', steps: [['The lead app kept no click', '', 'code'], ['All its leads beside Google’s count', 'in the week of Sep 21, 5 leads and Google 0', 'code']], end: [['Totals only, never a verdict', '', 'code']] },
        { title: 'C2, from Sep 29', steps: [['Each lead keeps its Google click', '', 'code'], ['The leads with a click beside Google’s count', 'in the week of Oct 19, 3 and 3', 'keep']], end: [['A verdict, and they match', '', 'keep']] }] },
      vcap: 'An early week holds leads from every source, so it never counts as a mismatch. C2’s answer of Nov 1 also found that the old tag missed the home-page form before Sep 29, so those weeks measured something else anyway.' },

    { about: ['tmline'], kicker: 'Why a small gap is normal',
      head: 'A platform also counts some results it cannot tie to a click, so a small gap is normal',
      visual: { type: 'gate', rows: [
        ['Google models what it cannot see', 'Google’s help says its conversions hold modeled ones beside the ones it saw, and that many conversions on a second device are modeled.', 'hold'],
        ['Meta counts people who only saw an ad', 'Meta can credit a sale up to a day after a view with no click. From Jul 27 to Oct 31, 25 of Kogalla’s 39 Meta purchases came that way.', 'hold'],
        ['Microsoft can count views too', 'Microsoft’s docs say its “all conversions” include people who saw an ad without a click, when the account includes them.', 'hold'],
        ['One person, two sends', 'On Oct 4 and Oct 5 one of Bull’s visitors sent the form twice. Google counted one, and the lead app counted two.', 'hold']] },
      vcap: 'So in the plan the match counts only the results a platform credits to a click, and sets them beside the leads that came with its click. That is Claude’s call. The line still allows a small gap, and a gap past the line means something broke.' },
    { about: ['tmline'], kicker: 'The line',
      head: 'A small week must match exactly, and a big week may be off by one or two',
      visual: { type: 'gate', rows: [
        ['1 to 3 real leads', 'The count must be exact. Bull’s week of Jun 1 had 3 real leads and Google counted 2, so it does not match.', 'stop'],
        ['4 to 6 real leads', 'A gap of 1 passes. Bull’s week of Aug 31 had 4 real leads and Google counted 5, so it matches.', 'pass'],
        ['7 real leads or more', 'A gap of 2 passes. Bull’s week of Aug 17 had 9 real leads and Google counted 7, so it matches.', 'pass'],
        ['A gap of {gapLeads} or more', 'It never passes, however big the week.', 'stop']] },
      vcap: 'This is today’s line: a week matches when the gap is under {gapLeads} leads and under {gapPct}% of the real leads. Of Bull’s 24 settled weeks from May 11, only Jun 1 and Oct 5 do not match.' },

    { about: ['tmvalue'], kicker: 'The value of sales',
      head: 'For a store the money must match too, because a count can be right while every value is wrong',
      visual: { type: 'flow', rows: [
        { title: 'Kogalla, Nov 1', steps: [['Google’s Purchase carries a value for each sale', '$124.81 a sale, Aug 3 to Oct 31', 'code'], ['The store’s own orders', 'not read', 'next']], end: [['The audit could not check the value', 'no store is linked', 'wait']] }] },
      vcap: 'This is not built yet. Claude’s call is to use the Google Ads audit’s own line, so a week’s value must be within {valuePct}% of the store’s sales from the ads, and a lead client, which has no sales, passes this step.' }
  ],

  examples: {
    SIDE: { tag: 'plan', rows: [{ steps: [['Bull’s Google, the week of Oct 5', 'Google counted 1', 'code'], ['Bull’s lead app', '3 real leads', 'keep']], end: [['Side by side, they are 2 apart', '', 'block']] }], note: 'Not built for every platform, campaign or sale. The week is real, from Barbara’s weekly lead counts for Bull Legal, read on Nov 7.' },
    SETTLED: { tag: 'real', rows: [{ steps: [['C2, the week of Oct 26', 'it ended on Nov 1', 'code'], ['Has it settled?', 'no, because {settleDays} days have not passed', 'code']], end: [['Settling', '', 'code']] }], note: 'Barbara’s weekly lead counts for C2, read on Nov 7.' },
    WAIT: 'SETTLED',
    CLICKS: { tag: 'real', rows: [{ steps: [['C2, the week of Sep 21', 'before the app kept clicks', 'code'], ['5 leads in all, and Google counted 0', '', 'code']], end: [['Totals only', '', 'code']] }], note: 'Barbara’s weekly lead counts for C2, whose app keeps clicks from Sep 29.' },
    TOTALS: 'CLICKS',
    GAP: { tag: 'real', rows: [{ steps: [['Bull, the week of Oct 5', 'a gap of 2 on 3 real leads', 'block'], ['Under {gapLeads} leads, and under {gapPct}% of 3?', 'no, because 2 is more than {gapPct}% of 3', 'code']], end: [['It does not match', '', 'block']] }], note: 'Barbara’s weekly lead counts for Bull Legal, read on Nov 7.' },
    VALUE: { tag: 'plan', rows: [{ steps: [['A store’s week', 'the count matches its orders', 'code'], ['The value is 40% under the store’s sales', '', 'next']], end: [['It does not match', '', 'block']] }], note: 'Made up, because no store’s orders are read yet.' },
    YES: { tag: 'real', rows: [{ steps: [['C2, the week of Oct 19', 'Google 3, real leads 3', 'keep']], end: [['It matches, so tracking works', '', 'keep']] }], note: 'Barbara’s weekly lead counts for C2, read on Nov 7.' },
    NO: { tag: 'real', rows: [{ steps: [['Bull, the week of Oct 5', 'Google 1, real leads 3', 'block']], end: [['Not trusted, and the account scorecard lists it', '', 'block']] }], note: 'Barbara’s weekly lead counts for Bull Legal, read on Nov 7. Bull’s answer of Nov 1 found the gap was mostly one person sending the form twice.' }
  },

  reviewed: { self: '211e4817', above: '729bed9e', on: '2026-11-07' }
});
