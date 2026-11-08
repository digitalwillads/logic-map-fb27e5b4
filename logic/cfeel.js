// How the client feels about our work. The instructions never ask for a feeling by name (comm-chat src/modules/mod.rs:149-153);
// the closest line is "Give their newest word on each live campaign, for or against what we do." What code hands on
// (src/modules/brief/numbers.rs `client`, 520-541): the newest word on the saved account scorecard, as it is (`words.last_in`,
// no check of who wrote it), the team's newest message to them, the newest 6 recorded calls (`recordings`, 543-557), and
// where to read the rest (search the mail, the transcripts, the Slack channel, the notes, the contract and any tracker).
// The facts list no live campaign (numbers.rs:500-539), so Opus finds them. Texts: no Barbara tool reads them
// (src/chat/tools/module_tools.rs:445-446). A client gone quiet: scorecard QUIET_DAYS 30 (src/scorecard/mod.rs:53). Real cases,
// read 2026-11-07: C2's answer 44 of Nov 1 (its newest word on each campaign, the texts of Oct 30, the live campaigns, Oct
// 21's call); the facts that code gathered for The client on C2, KDX, AAFE and Affordable Tree Service (their newest words).
// Old parts: retired/2026-11-07-client-redo/clientbrief.js (the card's newest word, what it leaves out) and client.js
// (what the answer must give).
LOGIC.flow({
  id: 'cfeel', parent: 'client',
  title: 'How the client feels', short: 'How they feel',
  head: 'The answer shows how the client feels through their newest word on each campaign, for or against what we do',
  chart: [
    'flowchart TB',
    'CARD["Code hands on the client’s<br/>newest word, the team’s newest<br/>word to them, and their<br/>newest calls"]:::code',
    'WHOSE{"Is their newest word<br/>a person’s?"}:::opus',
    'PAST(["No, a machine’s, so Opus<br/>reads past it to their<br/>last real word"]):::opus',
    'READ["Opus reads their mail, calls,<br/>Slack and notes itself"]:::opus',
    'TEXTS["Their texts reach no Barbara<br/>tool, so only a read on Will’s<br/>computer finds them"]:::code',
    'CAMP["Opus finds each live campaign<br/>itself, because the facts<br/>list none"]:::opus',
    'SAYS(["Their newest word on each live<br/>campaign, for or against<br/>what we do"]):::opus',
    'CARD --> WHOSE',
    'WHOSE -- yes --> READ', 'WHOSE -- no --> PAST', 'PAST --> READ',
    'TEXTS -.-> READ',
    'READ --> CAMP', 'CAMP --> SAYS'
  ],
  links: { CARD: 'cfcard', WHOSE: 'cfwhose', PAST: 'cfwhose', READ: 'cfread', TEXTS: 'cftexts', CAMP: 'cfcamp', SAYS: 'cfsays' },
  leaves: {
    cfcard: 'What code hands on',
    cfwhose: 'A person’s word, or a machine’s',
    cfread: 'What Opus reads itself',
    cftexts: 'Texts',
    cfcamp: 'The live campaigns',
    cfsays: 'For or against, campaign by campaign'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['cfeel'], kicker: 'The idea',
      head: 'How Waylon felt shows in his own words, campaign by campaign and call by call',
      visual: { type: 'flow', rows: [
        { title: 'C2, from answer 44', steps: [
          ['Oct 14', 'he approved the raise to $200 a day on the call', 'keep'],
          ['Oct 21', 'he said nothing had been done since the promise of Oct 7', 'block'],
          ['Oct 30', 'he asked only for the call link, then declined the next two calls with no note', 'wait']],
          end: [['The answer sets each word beside its campaign and its day', '', 'opus']] }] },
      vcap: 'Nothing in the instructions asks how the client feels by name. But his newest word on each campaign, for or against what we do, and the calls he declined, show it plainly.',
      quote: ['have it do the bid code and the how the client is feeling in the same way so I can audit them both tomorrow', 'Nov 7'] },
    { about: ['cfeel'], kicker: 'Silence counts',
      head: 'A client who goes quiet says something too, so Barbara’s account scorecard flags {clientQuiet} days with no word from them',
      visual: { type: 'bars', max: 70, rows: [
        { label: 'KDX, no mail or call from Kevin’s people, on Nov 7', parts: [[69, 'block', '69 days']] },
        { label: 'The line on the account scorecard', parts: [['{clientQuiet}', 'wait', '{clientQuiet} days']] }] },
      vcap: 'Kevin last wrote on Aug 27, to say that the new site was not ready, and the team last wrote to him on Oct 26. The answer must answer that line among its checks, so a quiet client never goes unnoticed.' },

    { about: ['cfcard'], kicker: 'What code hands on',
      head: 'Code hands on the newest word from the client and from the team, and the client’s newest calls',
      visual: { type: 'card', title: 'C2, as code showed it on Nov 7', fields: [
        ['Their newest word', 'An out-of-office reply from Waylon’s address, of Nov 2.'],
        ['The team’s newest word to them', 'Isaac’s note of Nov 2 about a lead that came from Google with no ad.'],
        ['Their newest calls', '{clientCalls} listed, and the newest is the weekly call of Oct 28.'],
        ['Where to read the rest', 'search the mail, read each call’s transcript, read the Slack channel and the notes, and open the contract and any tracker']],
        stamp: ['Opus reads the words themselves', 'opus'] },
      vcap: 'The newest word comes from Barbara’s account scorecard of Nov 4, so it can be days old. A client with no filed call gets “No recorded call is filed under them.”' },

    { about: ['cfwhose'], kicker: 'A person’s word, or a machine’s',
      head: 'The newest word on file can be a machine’s, so Opus reads past it to the client’s last real word',
      visual: { type: 'flow', rows: [
        { title: 'C2', steps: [['From Waylon’s address, Nov 2', '“Thanks for reaching out. I’m currently out of the office …”', 'code']], end: [['An out-of-office reply', '', 'wait']] },
        { title: 'AAFE', steps: [['From Dr. Louis Malcmacher, AAFE, Nov 3', '“Last chance, no replay. Save your seat now!”', 'code']], end: [['A course newsletter', '', 'wait']] },
        { title: 'Affordable Tree Service', steps: [['Weldon Granger, Nov 3', '“It has been exceptionally slow 10 days. We can’t figure out the problem. We are at your mercy.”', 'will']], end: [['A real word, and a worried one', '', 'will']] }] },
      vcap: 'Code passes the newest word on as the scorecard read it, with no check of who wrote it. On Nov 7 C2’s facts also list Waylon’s out-of-office reply of that day as new, beside his typed mail of Nov 4.' },

    { about: ['cfread'], kicker: 'What Opus reads itself',
      head: 'The facts only name where to read, so every word in the answer comes from a read that Opus made',
      visual: { type: 'gate', rows: [
        ['The mail', 'Opus searches the team’s mailboxes for the client’s addresses, then reads each thread.', 'pass'],
        ['The calls', 'Opus finds each call by its people and reads its transcript.', 'pass'],
        ['Slack and the notes', 'Opus reads the client’s Slack channel and the notes on its record.', 'pass'],
        ['The contract and a tracker', 'Opus opens them when the client keeps one.', 'pass'],
        ['Texts', 'No Barbara tool reads them.', 'stop']],
        end: ['Answer 44 read mail in two team mailboxes and 5 recorded calls', 'opus'] },
      vcap: 'Code gathers no mail, call or Slack line itself. That keeps the facts small, but it means the answer is only as good as what Opus chose to read.' },

    { about: ['cftexts'], kicker: 'Texts',
      head: 'Texts reach no Barbara tool, so answer 44 read Waylon’s on Will’s computer and quoted none of them',
      visual: { type: 'flow', rows: [
        { title: 'The C2 Ads group, Oct 30', steps: [['Waylon asked what happened to the call', 'at 3:59 PM ET', 'will'], ['He asked for the invite, then for news', 'at 4:36 PM and 5:01 PM ET', 'will'], ['Read on Will’s computer', 'by the test run', 'opus']], end: [['In the proof, but never quoted', 'because code cannot check a text', 'wait']] }] },
      vcap: 'Those texts came after his last mail, so they changed what his newest word was. A text from a client cannot wake the module either, because nothing sends texts to Barbara yet.' },

    { about: ['cfcamp'], kicker: 'The live campaigns',
      head: 'The instructions ask for their word on each live campaign, but the facts list no campaign, so Opus finds them',
      visual: { type: 'gate', rows: [
        ['LA + NY on Google', '$150 a day, with $1,463.79 spent and 2 conversions in the last 7 days.', 'pass'],
        ['Competitor and Brand on Google', '$10 and $15 a day.', 'pass'],
        ['MOFU/BOFU on Meta', '$20 a day, with 1 lead from Oct 25 to Nov 1.', 'pass'],
        ['Paused', 'The site-visitor remarketing, Tour Promotion, ChatGPT Ads and the Graystone show ads.', 'hold']],
        end: ['Answer 44 read them from the ad accounts on Nov 1', 'opus'] },
      vcap: 'Opus read each campaign from the ad accounts itself, because code hands The client no list of them.' },

    { about: ['cfsays'], kicker: 'For or against',
      head: 'Waylon’s newest word on each campaign shows where he stands, one campaign at a time',
      lede: 'Pick a campaign to see his words in order.',
      visual: { type: 'journey', runs: [
        { name: 'LA + NY', out: 'unclear', steps: [
          ['Oct 14', 'He approved the raise to $200 a day on the call.'],
          ['Oct 21', 'He asked for another raise, and Will held it.'],
          ['Oct 30', 'Isaac cut it to $150 a day, and no word from Waylon about the cut is on record.']] },
        { name: 'Remarketing', out: 'wait', steps: [
          ['Oct 14', 'He said no to it.'],
          ['Oct 21', 'He asked for it, and agreed to $500 a month while he was not sold on Facebook.'],
          ['Oct 26 and 27', 'He asked when it would go live.'],
          ['Oct 28', 'He thanked Will for the mail that said they were on.']] },
        { name: 'Competitor', out: 'keep', steps: [
          ['Oct 7', 'He approved it on the call.'],
          ['Oct 14', 'He called it cool.']] },
        { name: 'ChatGPT Ads', out: 'block', steps: [
          ['Oct 21', 'He asked to stop it, and to stop its billing too.']] }] },
      vcap: 'Each word comes from answer 44, with its call or its mail. Brand had no word from him at all, so the answer said so.' }
  ],

  examples: {
    CARD: { tag: 'real', rows: [{ steps: [['C2, Nov 7', 'their newest word is an out-of-office reply of Nov 2', 'code'], ['Their newest calls', '{clientCalls}, the newest on Oct 28', 'code']], end: [['Then where to read the rest', '', 'opus']] }], note: 'The facts that code gathered for C2 on Nov 7.' },
    WHOSE: { tag: 'real', rows: [{ steps: [['Weldon Granger, Nov 3', '“It has been exceptionally slow 10 days.”', 'will']], end: [['A person’s word, and a worried one', '', 'will']] }], note: 'The facts that code gathered for Affordable Tree Service on Nov 7.' },
    PAST: { tag: 'made', rows: [{ steps: [['C2, Nov 7', 'the newest word on file is an out-of-office reply', 'code']], end: [['Opus reads back to his typed mail of Nov 4', '', 'opus']] }], note: 'Made from C2’s real facts of Nov 7, because no saved answer has met a machine’s word yet.' },
    READ: { tag: 'real', rows: [{ steps: [['Opus, Nov 1', 'mail in two team mailboxes, 5 recorded calls and the lead app', 'opus']], end: [['17 proof lines, each with its source', '', 'opus']] }], note: 'C2’s answer 44, of Nov 1.' },
    TEXTS: { tag: 'real', rows: [{ steps: [['The C2 Ads texts of Oct 30', '', 'will'], ['Read on Will’s computer', '', 'opus']], end: [['In the proof, and not quoted', '', 'wait']] }], note: 'C2’s answer 44, of Nov 1.' },
    CAMP: { tag: 'real', rows: [{ steps: [['C2’s ad accounts, Nov 1', '', 'opus']], end: [['4 live campaigns, and which ones are paused', '', 'opus']] }], note: 'C2’s answer 44, of Nov 1.' },
    SAYS: { tag: 'real', rows: [{ steps: [['LA + NY', 'he approved the raise to $200 a day on Oct 14', 'keep']], end: [['No word from him on the cut of Oct 30', '', 'block']] }], note: 'C2’s answer 44, of Nov 1.' }
  },

  reviewed: { self: 'c1e9ba77', above: 'a94aa4ce', on: '2026-11-07' }
});
