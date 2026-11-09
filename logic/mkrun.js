// Can the ads run? What code gives the Setup and market module about the accounts, and what Opus reads with it. comm-chat
// at origin/main 1c24d43a, read 2026-11-08: src/modules/brief/numbers.rs:556-593 (`setup`: each account with its currency,
// its campaigns on the map and the morning's check of the read, compute.rs:224-225; the live campaigns of the last 30 days,
// the most money first, cut at 1,200 characters, :55 and :64-114; what Google or a platform changed by itself in the last 30
// days, at most 8, paused campaigns left out, :570-581; brand words and rivals; the website); src/modules/brief/reads.rs:39-52
// (the Google reads: the account's settings, its tips set to apply themselves, the enabled campaigns' serving status; the Meta
// reads: the account's status, disable reason, spend cap, amount spent and balance, and the ads with issues or disapproved),
// :63-65 (Meta gives money in cents), :158-184 (`setup`: Google and Meta only, Merchant Center for a Google client, the
// website); src/modules/mod.rs:191-197 (the words, and Meta's words); src/modules/brief/mod.rs:218-230 (Meta's words on a
// client with a Meta account). The tips are a limit in the verifiers (google-ads-audit `sa-automation`, sort limit), so they
// run in the change check, not in this module. Microsoft: no read in `reads::setup`; its two goals in the verifiers'
// verify/src/modules.rs:138-139 and the tree microsoft-ads.toml (Take2's card, declined on 2026-10-05). Real cases, read
// 2026-11-08: Barbara's Setup answers 8 (C2), 10 (Bull) and 12 (Kogalla) of Nov 1, with module_brief and answer_id; C2's
// answer 73 of Nov 3, in a copy of Barbara's data (barbara-local, read-only); the verifiers' module runs of Nov 1
// (state/modules/setup/runs/). Meta's words: commit 5b8a3f4e (Nov 2, 7:44 PM ET).
LOGIC.flow({
  id: 'mkrun', parent: 'market',
  title: 'Can the ads run?', short: 'Can the ads run',
  head: 'Opus first checks that the ads can run at all, from each account’s settings and billing to what holds the campaigns back and Merchant Center',
  chart: [
    'flowchart TB',
    'FACTS["Code gives Opus each account,<br/>its live campaigns, and what<br/>Google or a platform changed<br/>by itself"]:::code',
    'GOOGLE["On Google, the account’s<br/>settings, Google’s own tips,<br/>and what holds the<br/>campaigns back"]:::opus',
    'MC["Merchant Center, when the<br/>client has a store"]:::opus',
    'META["On Meta, the account’s status<br/>and billing first, then the<br/>ads that cannot run"]:::opus',
    'HOUSE["On Meta, Opus checks that<br/>Advantage+ is off and the<br/>account has our standard<br/>campaign setup"]:::opus',
    'MS["The fact sheet has no reads<br/>for Microsoft, so only its two<br/>checks look at the account"]:::code',
    'FIX(["Anything that stops the ads<br/>from working, and costs money,<br/>becomes a fix"]):::opus',
    'FACTS --> GOOGLE', 'FACTS --> META', 'FACTS --> MS',
    'GOOGLE --> MC', 'MC --> FIX',
    'META --> HOUSE', 'HOUSE --> FIX',
    'MS --> FIX'
  ],
  links: { FACTS: 'mkrfacts', GOOGLE: 'mkrgoogle', MC: 'mkrmc', META: 'mkrmeta', HOUSE: 'mkrhouse', MS: 'mkrms' },
  leaves: {
    mkrfacts: 'What code gives Opus about the accounts',
    mkrgoogle: 'The Google account',
    mkrmc: 'Merchant Center',
    mkrmeta: 'On Meta, the status and billing first',
    mkrhouse: 'The house structure on Meta',
    mkrms: 'Microsoft'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['mkrun'], kicker: 'The idea',
      head: 'An account that cannot spend, or a store that Google has suspended, stops every campaign at once, so Opus checks the account before anything else',
      visual: { type: 'gate', rows: [
        ['C2, Nov 1', 'It can run. Its Google campaigns serve and Meta has no billing hold, but two Meta campaigns could not run at all.', 'hold'],
        ['Bull Legal, Nov 1', 'It can run. Its billing is approved with no limit, all 12 ads are approved, and it spent every day from Oct 11 to Oct 31.', 'pass'],
        ['Kogalla, Nov 1', 'It can run. Merchant Center approves all 15 products, and both Google campaigns serve.', 'pass']],
        end: ['All three accounts could run on Nov 1', 'keep'] },
      vcap: 'The module’s own Meta instructions say why this comes first. A billing hold or a review stops every ad, and from the campaigns it looks like a creative problem. None of the three test clients had one on Nov 1.' },
    { about: ['mkrun'], kicker: 'A real account',
      head: 'On Nov 1 C2’s ads could run, but Opus found three things on the account that cost money',
      visual: { type: 'card', title: 'What Opus read on C2’s accounts, Nov 1', fields: [
        ['Google’s settings', 'Auto-tagging on, US dollars, Los Angeles time, and the account on, with an approved budget and no end date.'],
        ['What holds Google back', 'Brand serves under its $4 click limit, and LA + New York is still learning after the changes of Oct 30.'],
        ['Google’s own tips', '4 kinds are still set to apply by themselves, though none has changed anything since Oct 3.'],
        ['Meta', 'Active, with no billing hold and no spend cap. Three campaigns are on, but only the remarketing one delivers, and it breaks our Meta rules.'],
        ['The site', 'The homepage loads, holds a form and the Google tag, and shows no banner, but it took 12.62 seconds on a phone in the audit of Oct 31.']],
        stamp: ['The ads can run, with 3 things to fix', 'block'] },
      vcap: 'Each of the three became a fix on an open case. The remarketing switch went on case #53, Google’s tips on case #135 and the homepage’s speed on case #163.' },

    { about: ['mkrfacts'], kicker: 'The fact sheet',
      head: 'Code gives Opus a fact sheet with each account, the live campaigns and what changed by itself, and then a list of exact reads to run',
      visual: { type: 'card', title: 'What the fact sheet holds about the accounts', fields: [
        ['Each account', 'Its platform, its currency, how many campaigns the map holds and how many run, and whether the morning’s read of spend matched the platform’s own totals.'],
        ['The live campaigns', 'Each campaign that spent in the last {marketLive} days, the most money first, with its spend.'],
        ['What changed by itself', 'Up to {marketShown} changes made by Google or a platform in the last {marketByItself} days, leaving out paused campaigns.'],
        ['Brand words and rivals', 'The client’s brand words and the competitors on file in Barbara.'],
        ['Exact reads to run', 'For each Google account its settings, its tips set to apply themselves and how each campaign serves. For each Meta account its status and billing, and its ads with issues. Then Merchant Center and the client’s website.']],
        stamp: ['No table holds those reads, so Opus runs each one as written', 'code'] },
      vcap: 'Each of these reads was tried for real. Google’s reads worked on KDX and ETD on Oct 31, and Meta’s worked on C2 by Nov 2. Meta gives money in cents in these reads, so the fact sheet tells Opus that 2000 means $20.00.' },

    { about: ['mkrgoogle'], kicker: 'The settings',
      head: 'On Google, Opus checks the settings that touch every click and every number, such as auto-tagging, the currency and the time zone',
      visual: { type: 'gate', rows: [
        ['C2', 'Auto-tagging on, US dollars, Los Angeles time, and no tracking template.', 'pass'],
        ['Bull Legal', 'Auto-tagging on, US dollars, New York time, and no tracking template.', 'pass'],
        ['Kogalla', 'Auto-tagging on, US dollars, Denver time, and no tracking template.', 'pass']],
        end: ['All three passed the check on the account’s settings, Nov 1', 'keep'] },
      vcap: 'Auto-tagging is how Google ties each click to its campaign, and a wrong time zone or currency shifts every daily number. The verifiers’ check on settings for the whole account passed on all three clients on Nov 1.' },
    { about: ['mkrgoogle'], kicker: 'Google’s own tips',
      head: 'Opus also checks whether Google may apply its own tips, because then Google can change the campaigns without us',
      visual: { type: 'flow', rows: [
        { title: 'C2, Nov 1 and Nov 3', steps: [['Google lists 4 kinds of tips set to apply by themselves', 'its reply names their kind only as unknown', 'block'], ['None had changed anything since Oct 3', 'by the change history', 'code']], end: [['A fix for a person, in Google Ads’ own pages', 'because no tool of ours can turn these 4 off', 'opus']] },
        { title: 'Bull Legal and Kogalla, Nov 1', steps: [['No tip is set to apply by itself', '', 'code']], end: [['Nothing to fix', '', 'keep']] }] },
      vcap: 'Our rules keep these tips off. The verifiers check that rule before each change, not in this module, so Opus finds it from the exact read that the fact sheet gives it. The fix sits on C2’s case #135.' },
    { about: ['mkrgoogle'], kicker: 'What holds the campaigns back',
      head: 'Opus reads why each campaign serves less than it could, because a limit we chose is not a fault',
      visual: { type: 'gate', rows: [
        ['Bull Legal, Nov 1', 'All 4 campaigns were held back, three by their budgets and DeFi by its $20 click limit, but none by a fault.', 'pass'],
        ['C2, Nov 1', 'Brand was held back by its $4 click limit, and LA + New York was still learning after the changes of Oct 30.', 'pass'],
        ['Kogalla, Nov 1', 'Both campaigns could serve, with nothing holding them back.', 'pass']],
        end: ['Only a block on the account would stop them all', 'block'] },
      vcap: 'Google gives each campaign that is on a serving status and its reasons. Bull’s answer read its limits as budget and rank, not a fault, so the account could run and no fix came from them.' },

    { about: ['mkrmc'], kicker: 'Merchant Center',
      head: 'A problem in Merchant Center can stop every Shopping ad at once, so Opus reads it for each client that sells products',
      visual: { type: 'gate', rows: [
        ['Kogalla, Nov 1', 'No issue on the account, and all 15 products approved for Shopping, Display and free listings.', 'pass'],
        ['Kogalla’s shipping and returns', 'Merchant Center counts the 30 days from delivery and the site from purchase, and the site’s shipping page has a heading and no text.', 'hold'],
        ['Bull Legal and C2', 'No Merchant Center, because neither sells products, so the read says so and Opus goes on.', 'pass']],
        end: ['A suspension would stop every Shopping campaign the same day', 'block'] },
      vcap: 'The verifiers’ check on Kogalla’s store policies could not run on Nov 1, because Kogalla’s written delivery time is not on record. Opus read the settings and the site itself, and it found that nothing lost money that day.' },

    { about: ['mkrmeta'], kicker: 'Meta first',
      head: 'On a Meta account, Opus reads the account’s status and billing before its ads, because a billing hold looks like a creative problem',
      visual: { type: 'flow', rows: [
        { title: 'C2’s Meta account, Nov 1 and Nov 3', steps: [['Active, with no reason to disable it and no spend cap', '', 'code'], ['Not prepaid, with $124.71 and then $181.66 not yet billed', '', 'code']], end: [['No billing hold', '', 'keep']] },
        { title: 'The ads that cannot run', steps: [['Two webinar campaigns were on, with every ad set stopped by an error', 'Meta had replaced the market areas they targeted', 'block']], end: [['42 ads spent nothing', 'and Isaac paused both campaigns on Nov 2', 'block']] }] },
      vcap: 'These Meta instructions came on Nov 2, after Will asked for the Meta gaps to be fixed. They join the instructions on every client that has a Meta account, whether or not Meta spends much there.',
      quote: ["Let's fix the meta gaps. We are going to run this on very meta heavy accounts as well and need it to be clean.", 'Nov 2'] },

    { about: ['mkrhouse'], kicker: 'The house structure',
      head: 'On Meta, the account must keep our standard setup, with both builders off, an audience test, a creative test, remarketing, and Advantage+ off',
      visual: { type: 'gate', rows: [
        ['Both creative builders are paused', 'C2, Nov 3.', 'pass'],
        ['An audience builder, an audience test and a creative test', 'None of them exists on C2.', 'stop'],
        ['Remarketing', 'The live campaign lets Meta pick the placements, keeps its budget on the campaign, and also reaches people who only engaged on Facebook or Instagram.', 'stop'],
        ['Advantage+ stays off', 'Meta was free to widen both the interests and the places.', 'stop']],
        end: ['Switch to the house campaign that Will built on Oct 27', 'opus'] },
      vcap: 'C2’s strategy page keeps Facebook a small test for site visitors, so Opus proposed the house campaign at $5 a day, which ends November under the $200 Meta cap. The switch waits for Will’s yes, because it is spend and his hold keeps every change on C2.' },

    { about: ['mkrms'], kicker: 'Microsoft',
      head: 'For a Microsoft account the fact sheet gives Opus nothing to read, so only the verifiers’ two checks look at it',
      visual: { type: 'flow', rows: [
        { title: 'Take2, Oct 5', steps: [['Its card was declined', '', 'block'], ['Microsoft held the account', '', 'block']], end: [['Its ads stopped', '', 'block']] },
        { title: 'What the module has for Microsoft', steps: [['“The account is active, its money is clear, and nothing paused it”', 'one of the verifiers’ checks', 'will'], ['“Each campaign meant to run serves”', 'one of the verifiers’ checks', 'will']], end: [['Opus has to find any other read of the account on its own', '', 'opus']] }] },
      vcap: 'Take2’s declined card is the reason the first check exists. None of the three test clients runs Microsoft ads, so no answer has looked at a Microsoft account yet.' }
  ],

  examples: {
    FACTS: { tag: 'made', rows: [{ steps: [['Code lists C2’s Google and Meta accounts', '', 'code'], ['Code lists C2’s live campaigns with their spend', '', 'code'], ['Code lists what Google or Meta changed by itself', '', 'code']], end: [['Then it gives Opus the exact reads to run', '', 'code']] }], note: 'We did not open C2’s real fact sheet, so we made this up from code’s rules and the facts in C2’s answer of Nov 1.' },
    GOOGLE: { tag: 'real', rows: [{ steps: [['C2’s Google account, Nov 1', 'its settings are right', 'opus'], ['Google may apply 4 kinds of its own tips without asking', '', 'block']], end: [['A fix on case #135', 'a person turns them off in Google Ads', 'opus']] }], note: 'We took this from the answer that the Setup and market module wrote for C2 in a test on Nov 1.' },
    MC: { tag: 'real', rows: [{ steps: [['Kogalla’s Merchant Center, Nov 1', 'no issue on the account', 'opus']], end: [['All 15 products approved', '', 'keep']] }], note: 'We took this from the answer that the Setup and market module wrote for Kogalla in a test on Nov 1.' },
    META: { tag: 'real', rows: [{ steps: [['C2’s Meta account, Nov 1', 'active, no billing hold', 'keep'], ['Two webinar campaigns', 'every ad set stopped by an error', 'block']], end: [['42 ads spent nothing', '', 'block']] }], note: 'We took this from the answer that the Setup and market module wrote for C2 in a test on Nov 1.' },
    HOUSE: { tag: 'real', rows: [{ steps: [['C2’s Meta, Nov 3', 'no audience test and no creative test', 'block'], ['The live remarketing lets Meta pick the placements', '', 'block']], end: [['Switch to the house campaign at $5 a day', 'it waits for Will’s yes', 'opus']] }], note: 'We took this from the answer that the module wrote for C2 in a test on a copy of Barbara’s data, on Nov 3.' },
    MS: { tag: 'made', rows: [{ steps: [['A Microsoft account whose card is declined', 'as Take2’s was on Oct 5', 'block'], ['The check on the account fails', '', 'will']], end: [['Opus must answer it, with its fix', '', 'opus']] }], note: 'Take2’s declined card is real, and the verifiers name it as the reason for their check. No test client runs Microsoft ads, so this example is made up.' },
    FIX: { tag: 'real', rows: [{ steps: [['C2, Nov 1', 'the remarketing, Google’s tips and the slow homepage', 'block']], end: [['Three fixes, on cases #53, #135 and #163', 'each waits for a person', 'opus']] }], note: 'We took this from the answer that the Setup and market module wrote for C2 in a test on Nov 1.' }
  },

  reviewed: { self: '4450f6b2', above: 'a09a8b52', on: '2026-11-08' }
});
