// Nov 8, 2026: plain-words pass (Will: "The client module needs a run that removes robot speak. Please make this
// intelligable"). Only the words changed, and the logic and every fact stayed the same. The module is "the client module",
// never "The client" alone; C2's answer 44 is "C2's test answer"; the brief is "the fact sheet". check-plain.cjs judges it.
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
    'CARD["Code gives Opus the client’s<br/>newest message, the team’s<br/>newest message to them, and<br/>their newest calls"]:::code',
    'WHOSE{"Did a person write their<br/>newest message?"}:::opus',
    'PAST(["No, a machine did, so<br/>Opus looks back to their<br/>last real message"]):::opus',
    'READ["Opus reads their mail, calls,<br/>Slack and notes itself"]:::opus',
    'TEXTS["No Barbara tool reads their<br/>texts, so only a read on<br/>Will’s computer finds them"]:::code',
    'CAMP["Opus finds each live campaign<br/>itself, because the fact<br/>sheet lists none"]:::opus',
    'SAYS(["Their newest word on each live<br/>campaign, for or against<br/>what we do"]):::opus',
    'CARD --> WHOSE',
    'WHOSE -- yes --> READ', 'WHOSE -- no --> PAST', 'PAST --> READ',
    'TEXTS -.-> READ',
    'READ --> CAMP', 'CAMP --> SAYS'
  ],
  links: { CARD: 'cfcard', WHOSE: 'cfwhose', PAST: 'cfwhose', READ: 'cfread', TEXTS: 'cftexts', CAMP: 'cfcamp', SAYS: 'cfsays' },
  leaves: {
    cfcard: 'The fact sheet that code gives Opus',
    cfwhose: 'A person’s message, or a machine’s',
    cfread: 'What Opus reads itself',
    cftexts: 'Texts',
    cfcamp: 'The live campaigns',
    cfsays: 'For or against, campaign by campaign'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['cfeel'], kicker: 'The idea',
      head: 'Waylon’s own words show how he felt, campaign by campaign and call by call',
      visual: { type: 'flow', rows: [
        { title: 'C2, in the test answer of Nov 1', steps: [
          ['Oct 14', 'he approved the raise to $200 a day on the call', 'keep'],
          ['Oct 21', 'he said nothing had been done since what we promised on Oct 7', 'block'],
          ['Oct 30', 'he asked only for the call link, then declined the next two calls with no note', 'wait']],
          end: [['The answer sets each word beside its campaign and its day', '', 'opus']] }] },
      vcap: 'The instructions never ask how the client feels by name. But his newest word on each campaign, for or against what we do, and the calls he declined, show it plainly.',
      quote: ['have it do the bid code and the how the client is feeling in the same way so I can audit them both tomorrow', 'Nov 7'] },
    { about: ['cfeel'], kicker: 'Silence counts',
      head: 'A client who goes quiet is telling us something too, so Barbara’s account scorecard flags {clientQuiet} days with no word from them',
      visual: { type: 'bars', max: 70, rows: [
        { label: 'KDX, no mail or call from Kevin’s people, on Nov 7', parts: [[69, 'block', '69 days']] },
        { label: 'The line on the account scorecard', parts: [['{clientQuiet}', 'wait', '{clientQuiet} days']] }] },
      vcap: 'Kevin last wrote on Aug 27, to say that the new site was not ready, and the team last wrote to him on Oct 26. The answer must respond to that flag among its checks, so a quiet client never goes unnoticed.' },

    { about: ['cfcard'], kicker: 'The fact sheet',
      head: 'Code gives Opus a fact sheet with the newest message from the client and from the team, and the client’s newest calls',
      visual: { type: 'card', title: 'C2’s fact sheet on Nov 7', fields: [
        ['Their newest message', 'An out-of-office reply from Waylon’s address, of Nov 2.'],
        ['The team’s newest message to them', 'Isaac’s note of Nov 2 about a lead that came from Google with no ad.'],
        ['Their newest calls', '{clientCalls} listed, and the newest is the weekly call of Oct 28.'],
        ['Where to read the rest', 'Search the mail, read each call’s transcript, read the Slack channel and the notes, and open the contract and any tracker.']],
        stamp: ['Opus reads the words themselves', 'opus'] },
      vcap: 'The newest message comes from Barbara’s account scorecard of Nov 4, so it can be days old. For a client with no recorded call, the fact sheet says “No recorded call is filed under them.”' },

    { about: ['cfwhose'], kicker: 'A person, or a machine',
      head: 'The newest message on file can come from a machine, so Opus looks back to the client’s last real message',
      visual: { type: 'flow', rows: [
        { title: 'C2', steps: [['From Waylon’s address, Nov 2', '“Thanks for reaching out. I’m currently out of the office …”', 'code']], end: [['An out-of-office reply', '', 'wait']] },
        { title: 'AAFE', steps: [['From Dr. Louis Malcmacher, AAFE, Nov 3', '“Last chance, no replay. Save your seat now!”', 'code']], end: [['A course newsletter', '', 'wait']] },
        { title: 'Affordable Tree Service', steps: [['Weldon Granger, Nov 3', '“It has been exceptionally slow 10 days. We can’t figure out the problem. We are at your mercy.”', 'will']], end: [['A real message, and a worried one', '', 'will']] }] },
      vcap: 'Code passes on the newest message just as the scorecard found it, without checking who wrote it. On Nov 7 C2’s fact sheet also listed Waylon’s out-of-office reply of that day as new, beside the mail he typed on Nov 4.' },

    { about: ['cfread'], kicker: 'What Opus reads itself',
      head: 'The fact sheet only says where to look, so every word in the answer comes from something Opus read itself',
      visual: { type: 'gate', rows: [
        ['The mail', 'Opus searches the team’s mailboxes for the client’s addresses, then reads each thread.', 'pass'],
        ['The calls', 'Opus finds each call by who was on it, and reads its transcript.', 'pass'],
        ['Slack and the notes', 'Opus reads the client’s Slack channel and the notes on their record.', 'pass'],
        ['The contract and a tracker', 'Opus opens them when the client keeps one.', 'pass'],
        ['Texts', 'No Barbara tool reads them.', 'stop']],
        end: ['C2’s test read the mail in two team mailboxes and 5 recorded calls', 'opus'] },
      vcap: 'Code gathers no mail, call or Slack message itself. That keeps the fact sheet short, but it means the answer is only as good as what Opus chose to read.' },

    { about: ['cftexts'], kicker: 'Texts',
      head: 'No Barbara tool reads texts, so C2’s test read Waylon’s texts on Will’s computer and quoted none of them',
      visual: { type: 'flow', rows: [
        { title: 'The C2 Ads group, Oct 30', steps: [['Waylon asked what happened to the call', 'at 3:59 PM ET', 'will'], ['He asked for the invite, then for news', 'at 4:36 PM and 5:01 PM ET', 'will'], ['Read on Will’s computer', 'by the test run', 'opus']], end: [['In the proof, but never quoted', 'because code cannot check a text', 'wait']] }] },
      vcap: 'Those texts came after his last mail, so they were his newest words. A text from a client cannot make the module read again either, because nothing sends texts to Barbara yet.' },

    { about: ['cfcamp'], kicker: 'The live campaigns',
      head: 'The instructions ask for the client’s word on each live campaign, but the fact sheet lists no campaigns, so Opus finds them itself',
      visual: { type: 'gate', rows: [
        ['LA + NY on Google', '$150 a day, with $1,463.79 spent and 2 conversions in the last 7 days.', 'pass'],
        ['Competitor and Brand on Google', '$10 and $15 a day.', 'pass'],
        ['MOFU/BOFU on Meta', '$20 a day, with 1 lead from Oct 25 to Nov 1.', 'pass'],
        ['Paused', 'The remarketing to site visitors, Tour Promotion, ChatGPT Ads and the Graystone show ads.', 'hold']],
        end: ['C2’s test read them from the ad accounts on Nov 1', 'opus'] },
      vcap: 'Opus read each campaign from the ad accounts itself, because code gives the client module no list of them.' },

    { about: ['cfsays'], kicker: 'For or against',
      head: 'Waylon’s newest word on each campaign shows where he stands, one campaign at a time',
      lede: 'Pick a campaign to see his words in order.',
      visual: { type: 'journey', runs: [
        { name: 'LA + NY', out: 'unclear', steps: [
          ['Oct 14', 'He approved the raise to $200 a day on the call.'],
          ['Oct 21', 'He asked for another raise, and Will held it.'],
          ['Oct 30', 'Isaac cut it to $150 a day, and we have no word from Waylon about the cut.']] },
        { name: 'Remarketing', out: 'wait', steps: [
          ['Oct 14', 'He said no to it.'],
          ['Oct 21', 'He asked for it, and agreed to $500 a month even though he was not sold on Facebook.'],
          ['Oct 26 and 27', 'He asked when it would go live.'],
          ['Oct 28', 'He thanked Will for the mail that said it was on.']] },
        { name: 'Competitor', out: 'keep', steps: [
          ['Oct 7', 'He approved it on the call.'],
          ['Oct 14', 'He called it cool.']] },
        { name: 'ChatGPT Ads', out: 'block', steps: [
          ['Oct 21', 'He asked us to stop it, and to stop its billing too.']] }] },
      vcap: 'C2’s test answer gives each of these words, with the call or mail where Waylon said it. Brand had no word from him at all, so the answer said so.' }
  ],

  examples: {
    CARD: { tag: 'real', rows: [{ steps: [['C2, Nov 7', 'their newest message is an out-of-office reply of Nov 2', 'code'], ['Their newest calls', '{clientCalls}, the newest on Oct 28', 'code']], end: [['Then where to read the rest', '', 'opus']] }], note: 'We took this from C2’s fact sheet of Nov 7.' },
    WHOSE: { tag: 'real', rows: [{ steps: [['Weldon Granger, Nov 3', '“It has been exceptionally slow 10 days.”', 'will']], end: [['A person wrote it, and he is worried', '', 'will']] }], note: 'We took this from Affordable Tree Service’s fact sheet of Nov 7.' },
    PAST: { tag: 'made', rows: [{ steps: [['C2, Nov 7', 'the newest message on file is an out-of-office reply', 'code']], end: [['Opus looks back to the mail he typed on Nov 4', '', 'opus']] }], note: 'We made this one up from C2’s real fact sheet of Nov 7, because no saved answer has run into an automatic reply yet.' },
    READ: { tag: 'real', rows: [{ steps: [['Opus, Nov 1', 'mail in two team mailboxes, 5 recorded calls and the lead app', 'opus']], end: [['17 facts in its proof, each with its source', '', 'opus']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' },
    TEXTS: { tag: 'real', rows: [{ steps: [['The C2 Ads texts of Oct 30', '', 'will'], ['Read on Will’s computer', '', 'opus']], end: [['In the proof, but not quoted', '', 'wait']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' },
    CAMP: { tag: 'real', rows: [{ steps: [['C2’s ad accounts, Nov 1', '', 'opus']], end: [['4 live campaigns, and which ones are paused', '', 'opus']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' },
    SAYS: { tag: 'real', rows: [{ steps: [['LA + NY', 'he approved the raise to $200 a day on Oct 14', 'keep']], end: [['No word from him on the cut of Oct 30', '', 'block']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' }
  },

  reviewed: { self: 'f3025d49', above: 'f4196f57', on: '2026-11-08' }
});
