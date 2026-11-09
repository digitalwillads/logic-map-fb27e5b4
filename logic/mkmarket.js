// Do we know the market? Who competes, what they offer, and what a click costs us beside them. comm-chat at origin/main
// 1c24d43a, read 2026-11-08: src/modules/mod.rs:191-194 (the words: "Say who competes, what they offer, and where our click
// cost sits in the market"); src/modules/brief/numbers.rs:582-591 (brand words and the rivals on file, from the business
// record, src/campaign_map/store.rs:174-199; the newest market read with its day, its age and its parts, cut at 6,000
// characters, :57 and :595-601); src/modules/brief/reads.rs:154-184 (`MARKET_DAYS` 30: a read of 30 days or less is "not
// today", an older one or none asks for `market_view` at about $1; Will, 2026-11-01, yes to "Read the market when the data
// is over 30 days old, and only in business hours"); src/chat/tools/market_view.rs:1-26 (the five parts), :52 (a $2 budget
// by default), :411-442 (each read with any part done is kept, `market_reads`, since c5e2d960 of Nov 1 10:13 AM ET),
// :733-755 (`auction_hours`: weekdays from 8 AM to 6 PM in the account's own time zone; Bull's read at 3 AM on a Sunday saw
// almost no ads). The newest read is picked by age alone, whatever its parts (numbers.rs:596-601). The runs' start times:
// the automations' `at_minute` in the copy of Barbara's data (420 for KDX, Kogalla, C2, Bull and Affordable Tree Service, 525
// for AAFE). Real cases, read 2026-11-08: Barbara's Setup answers 10 (Bull) and 12 (Kogalla) of Nov 1, with module_brief and
// answer_id; C2's answer 73 of Nov 3, C2's market read of Nov 3 (market_reads 2) and the business records' rivals, in a copy
// of Barbara's data (barbara-local, read-only).
LOGIC.flow({
  id: 'mkmarket', parent: 'market',
  title: 'Do we know the market?', short: 'The market',
  head: 'Opus names who competes, what they offer and what a click costs us beside them, from the rivals on file, the market read that Barbara keeps, and its own reads',
  chart: [
    'flowchart TB',
    'FILE["Code gives the brand words and<br/>the rivals on file"]:::code',
    'KEPT["Code gives the newest market<br/>read that Barbara keeps"]:::code',
    'OLD{"Is that read over {marketDays}<br/>days old, or is there none?"}:::code',
    'READ["Opus runs a new market read,<br/>for about $1"]:::opus',
    'HOURS{"Is it a weekday from {marketFrom}<br/>to {marketTo} where the<br/>account is?"}:::code',
    'LIVE["The read also looks at who<br/>shows ads on our searches"]:::code',
    'SKIP["The read skips who shows<br/>ads, and Barbara keeps<br/>it anyway"]:::block',
    'WHO["Opus names who competes and<br/>what they offer"]:::opus',
    'CPC(["Opus sets our cost per click<br/>beside the market’s"]):::opus',
    'FILE --> KEPT', 'KEPT --> OLD',
    'OLD -- yes --> READ', 'OLD -- "no, so no new<br/>read today" --> WHO',
    'READ --> HOURS',
    'HOURS -- yes --> LIVE', 'HOURS -- no --> SKIP',
    'LIVE --> WHO', 'SKIP --> WHO',
    'WHO --> CPC'
  ],
  links: { FILE: 'mkmfile', KEPT: 'mkmkept', OLD: 'mkmkept', READ: 'mkmread', HOURS: 'mkmhours', SKIP: 'mkmlive', WHO: 'mkmwho', CPC: 'mkmcpc' },
  leaves: {
    mkmfile: 'The rivals on file',
    mkmkept: 'The market read that Barbara keeps',
    mkmread: 'A new market read',
    mkmhours: 'Who shows ads, only in business hours',
    mkmlive: { title: 'When should code read who shows ads on our searches?', open: {
      q: 'Will said yes on Nov 1 to reading the market only once its data is over {marketDays} days old, and to reading who shows ads only on weekdays from {marketFrom} to {marketTo} where the account is. But each client’s morning run starts at 7:00 AM in New York, which is 5:00 AM in Denver and 4:00 AM in Los Angeles, so a run usually reaches this module before {marketFrom} where the account is. Then its market read skips who shows ads, and Barbara keeps it as fresh for {marketDays} days. C2’s read of Nov 3 skipped them, and Bull’s only read of them, at 3:22 AM on a Sunday, saw no law firm at all. When should code read who shows ads on our searches?',
      since: 'Nov 8',
      opts: [
        ['Read who shows ads by itself on a weekday afternoon where the account is, once every {marketDays} days, apart from the morning run, and keep it for the module', true, 'Each fact sheet would then hold a read of who shows ads on our searches that is at most {marketDays} days old. It needs a read that starts by itself in the afternoon, which Jacob would build, at about $1 for each client each month.'],
        ['Keep it as it is', false, 'Who shows ads is read only when a person runs a market read in business hours. Opus judges who competes from the competitor campaign’s searches, Google’s price ranges and the rivals’ own sites.']] } },
    mkmwho: 'Who competes, and what they offer',
    mkmcpc: 'What a click costs us beside the market'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['mkmarket'], kicker: 'The idea',
      head: 'Knowing who we compete with tells Opus why a click costs what it costs, and why a buyer may pick a rival',
      visual: { type: 'flow', rows: [
        { title: 'Kogalla, Nov 1', steps: [
          ['Noxgear came into Shopping on Sep 25', 'and ranked first on Oct 10, 18 and 28', 'opus'],
          ['UltraSpire, Lightbar and Noxgear each sell a light with its battery', 'from $29.99 to $198.95', 'opus'],
          ['Kogalla could sell only lights with no battery', 'every BatPak was sold out', 'block']],
          end: [['Only Kogalla’s light came without a battery', 'at $129.97 and $149.97', 'block']] }] },
      vcap: 'Opus read Merchant Center’s view of who ranks in Shopping, and each rival’s own pages. Kogalla had not ranked first in Shopping since early October, while searches for running lights climbed toward November.' },
    { about: ['mkmarket'], kicker: 'Three markets',
      head: 'On each test client Opus found the rivals in a different place, and on Bull Legal it could not find who bids against us',
      visual: { type: 'gate', rows: [
        ['C2, Nov 3', 'The competitor campaign spends most on Chaotic Good, now mostly a news search, and next on TREND PR, which sells a money-back guarantee.', 'hold'],
        ['Bull Legal, Nov 1', 'The only read of who shows ads came at 3:22 AM on a Sunday and saw no law firm, so who bids against us was still unknown.', 'stop'],
        ['Kogalla, Nov 1', 'Noxgear, Lightbar and UltraSpire each sell a complete light, from $29.99 to $198.95.', 'pass']],
        end: ['Each answer names only what bears on money', 'opus'] },
      vcap: 'On C2 the rivals came from the searches that the competitor campaign pays for, and on Kogalla from Merchant Center’s view of Shopping. On Bull Legal only searchers named a few rival lawyers, and those searches cost $67.56 with no lead.' },

    { about: ['mkmfile'], kicker: 'The rivals on file',
      head: 'The fact sheet gives the client’s brand words and the rivals on file, and an empty list leaves the verifiers’ check on rivals blind',
      visual: { type: 'gate', rows: [
        ['Bull Legal', 'No rivals on file on Nov 1, so the verifiers’ check on the main competitors could not run.', 'stop'],
        ['C2', 'No rivals on file on Nov 1. By Nov 3 the copy of Barbara’s data held Waylon’s 8 and three more.', 'hold'],
        ['Kogalla', 'By Nov 3, 10 rivals on file, but not Noxgear or Lightbar, which Opus had named on Nov 1.', 'hold']],
        end: ['Each answer proposed saving the rivals that it found', 'opus'] },
      vcap: 'Waylon sent his list of rivals on Oct 6, and C2’s answer of Nov 1 proposed writing it to C2’s record on case #92. Kogalla’s answer proposed the rivals it found on case #133.' },

    { about: ['mkmkept'], kicker: 'The read Barbara keeps',
      head: 'Barbara keeps each market read, and the fact sheet gives the newest one, so Opus reads the market again only when it is over {marketDays} days old',
      visual: { type: 'timeline', items: [
        ['Nov 1, 10:13 AM ET', 'Barbara starts to keep each read, with its day, its parts and its cost.'],
        ['Nov 3, 2:15 AM ET', 'In the test of C2 on a copy of Barbara’s data, a read keeps demand, intent, the missing searches and C2’s own rankings, for $0.57.'],
        ['Nov 3 to Dec 3', 'C2’s fact sheet gives that read and tells Opus not to read the market again.'],
        ['From Dec 4', 'The read is over {marketDays} days old, so the fact sheet asks for a new one.']] },
      vcap: 'Will said yes on Nov 1 to reading the market only once its data is over {marketDays} days old. The fact sheet gives the newest read cut to {marketChars} characters, with its day and the parts it holds, whatever parts those are.' },

    { about: ['mkmread'], kicker: 'A new read',
      head: 'A new market read costs about $1 and reads five things, one of them who shows ads on our searches',
      visual: { type: 'gate', rows: [
        ['Demand', 'How many people search for the account’s keywords, and how that changed in a year.', 'pass'],
        ['Intent', 'Which of the last week’s searches came to buy, and which came to learn.', 'pass'],
        ['Missing searches', 'Buying searches of 40 a month or more that the account does not buy.', 'pass'],
        ['Who shows ads', 'Who shows ads on the account’s main searches, and our cost per click beside Google’s market figure.', 'hold'],
        ['Organic', 'What the client’s own site ranks for.', 'pass']],
        end: ['One report, kept for the module’s next mornings', 'code'] },
      vcap: 'Bull’s read of Nov 1 cost $1.61 with all five, and C2’s of Nov 3 cost $0.57, because it skipped who shows ads. A read stops at $2 unless someone asks for more.' },

    { about: ['mkmhours'], kicker: 'Business hours',
      head: 'Who shows ads is read only on weekdays from {marketFrom} to {marketTo} where the account is, because a read at night sees almost no ads',
      visual: { type: 'flow', rows: [
        { title: 'Bull Legal, Sunday Nov 1, 3:22 AM', steps: [['The read looks at 24 live search pages', '', 'code']], end: [['Ads on 2 of them, and not one from a law firm', '', 'block']] },
        { title: 'Since 10:13 AM that day', steps: [['A read outside those hours skips who shows ads', 'and says why', 'code']], end: [['The rest of the read goes on', '', 'keep']] }] },
      vcap: 'Will said yes to this rule after Bull’s read saw almost no ads. On Nov 3 C2’s read came at 11:15 PM Los Angeles time, so it skipped who shows ads and said so.' },

    { about: ['mkmlive'], kicker: 'A question for Will',
      head: 'The morning runs start at 7:00 AM in New York, too early in the day to see who shows ads, so a run’s market read usually leaves them out',
      visual: { type: 'gate', rows: [
        ['Bull Legal', 'Its account keeps New York time, so its run starts at 7:00 AM there.', 'hold'],
        ['Kogalla', 'Its account keeps Denver time, so its run starts at 5:00 AM there.', 'stop'],
        ['C2', 'Its account keeps Los Angeles time, so its run starts at 4:00 AM there.', 'stop']],
        end: ['The read usually skips who shows ads, and still counts as fresh for {marketDays} days', 'block'] },
      vcap: 'In the copy of Barbara’s data from Nov 3, five of the six clients that are on start their run at 7:00 AM in New York, and AAFE at 8:45. The fact sheet asks for a new read by its age alone, whatever parts the last read held.',
      open: 'mkmlive' },

    { about: ['mkmwho'], kicker: 'Who competes',
      head: 'Opus finds the rivals in the account’s own searches and in Shopping, and reads each one’s offer on its own site',
      visual: { type: 'flow', rows: [
        { title: 'C2, Nov 3', steps: [
          ['The competitor campaign’s searches, 30 days', '$256.14 for 34 clicks and no lead', 'code'],
          ['Chaotic Good took 38.9%', 'mostly a news search since its public fight in May', 'block'],
          ['TREND PR took $54.46', 'it says it is the only music PR firm with a money-back guarantee', 'opus']],
          end: [['C2 proves with artists, 3,000+ press placements and 1B+ streams, and offers no guarantee and no price', '', 'opus']] }] },
      vcap: 'Opus could not read the rivals’ ads, because Google’s Ads Transparency Center gives a page read only its frame. So it read their own sites, and a news story for Chaotic Good.' },

    { about: ['mkmcpc'], kicker: 'What a click costs',
      head: 'Opus sets what we pay for a click beside Google’s own price range for the same searches',
      visual: { type: 'gate', rows: [
        ['music marketing agency', 'We paid $7.98 a click, inside Google’s range of $2.34 to $8.36.', 'pass'],
        ['music publicist', 'We paid $7.87, inside $3.06 to $12.26.', 'pass'],
        ['music promotion services', 'We paid $8.23, inside $3.25 to $13.96.', 'pass'],
        ['c2 management', 'Brand paid $3.59, above Google’s figure of $2.00.', 'hold']],
        end: ['Inside the range on every main keyword', 'keep'] },
      vcap: 'These are C2’s last 30 days beside Google’s ranges for Los Angeles and New York, in C2’s test of Nov 3. On Nov 1 the answer had said that our click cost rose above the market, but since the $7 limit of Oct 30 it averages $6.55.' }
  ],

  examples: {
    FILE: { tag: 'real', rows: [{ steps: [['C2’s rivals on file, Nov 3', '', 'code']], end: [['11 names', 'Waylon’s 8 and three more', 'code']] }], note: 'We read this in a copy of Barbara’s data from Nov 3. On Nov 1 the list was still empty.' },
    KEPT: { tag: 'real', rows: [{ steps: [['C2’s market read, Nov 3, 2:15 AM ET', 'in the test on a copy of Barbara’s data', 'code']], end: [['It holds demand, intent, the missing searches and C2’s rankings', 'it cost $0.57', 'code']] }], note: 'This read sits in the copy of Barbara’s data where C2’s test of Nov 3 ran.' },
    OLD: { tag: 'made', rows: [{ steps: [['C2, on Nov 10', 'its newest read is 7 days old', 'code']], end: [['No, so the fact sheet says not today', '', 'code']] }], note: 'We made this up from the real day of C2’s read, because no module ran on C2 on Nov 10.' },
    READ: { tag: 'real', rows: [{ steps: [['Bull Legal, Nov 1, 3:22 AM ET', 'no read was kept yet', 'opus']], end: [['A new market read for $1.61', 'the read included all five parts', 'code']] }], note: 'We took this from the answer that the Setup and market module wrote for Bull Legal in a test on Nov 1.' },
    HOURS: { tag: 'real', rows: [{ steps: [['C2’s read, Monday Nov 2, 11:15 PM in Los Angeles', '', 'code'], ['Is it a weekday from {marketFrom} to {marketTo} there?', 'no', 'code']], end: [['Who shows ads is not read', '', 'block']] }], note: 'We took this from C2’s market read of Nov 3, which ran at 2:15 AM in New York, in the test on a copy of Barbara’s data.' },
    LIVE: { tag: 'made', rows: [{ steps: [['A read on a Tuesday at 2 PM in Los Angeles', '', 'code']], end: [['Then the read also sees who shows ads, on up to 24 live search pages', '', 'code']] }], note: 'No market read that we could see ran on a weekday afternoon, so we made this example up from code’s rule.' },
    SKIP: { tag: 'real', rows: [{ steps: [['C2’s read of Nov 3', 'who shows ads was not read', 'block']], end: [['Kept, and fresh until Dec 3', '', 'block']] }], note: 'C2’s read of Nov 3 is real, and by code’s rule it counts as fresh for {marketDays} days.' },
    WHO: { tag: 'real', rows: [{ steps: [['C2’s competitor campaign', 'most of its cost went to searches for Chaotic Good, and the next most to TREND PR', 'code']], end: [['TREND PR sells a money-back guarantee, and C2 offers none', '', 'opus']] }], note: 'We took this from the answer that the module wrote for C2 in a test on a copy of Barbara’s data, on Nov 3.' },
    CPC: { tag: 'real', rows: [{ steps: [['music marketing agency', '$7.98 a click', 'code']], end: [['Inside Google’s range of $2.34 to $8.36', '', 'keep']] }], note: 'We took this from the answer that the module wrote for C2 in a test on a copy of Barbara’s data, on Nov 3.' }
  },

  reviewed: { self: 'fd238ebb', above: 'a09a8b52', on: '2026-11-08' }
});
