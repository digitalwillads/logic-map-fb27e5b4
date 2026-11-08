// Rebuild the true numbers: not built. Will, 2026-11-07, on the trust calendar box "Will's or Jacob's answer on a case:
// those days broken, or trusted": "For this I want to go back. We should have access to the root truth (the order or the
// leads) so you should be able to reconstuct what should have happened when no?". Will, Nov 2, case #260: "I want you to set
// the dates that it's broken. I don't want to confirm."; Nov 2: "Going forward we don't want to have the past broken days
// wait for my yes." So the record's numbers take the platform's place on each day that does not match, the trust calendar
// keeps both, and nobody confirms (Claude's call from these words). Sources: the trust calendar (comm-chat
// src/chat/tools/trust_calendar.rs:1-90; Barbara's read of C2's Meta days, 2026-11-07: 49 broken, 1 suspect, Sep 14 to
// Nov 2, Will's reply 4425 on case #260); src/results/load.rs:533 and compute.rs:202-203 (the slot for days a person marked
// broken is never filled); src/lead_match/read.rs:30-34 (first click days: Bull May 7, C2 Sep 29); Barbara's client_leads
// tool (each lead's Google click with its campaign, keyword and device; Bull's app refused the read on Nov 7). Tracking's
// answers of Nov 1: C2 (answer 11: "Past broken days are found and marked" failed for want of a person's yes; Results judges
// Meta on clicks, landing page views and GA4 leads), Bull (answer 7: one of the week of Oct 5's sends was a repeat).
LOGIC.flow({
  id: 'trebuild', parent: 'tracking', status: 'Not built yet',
  title: 'Rebuild the true numbers', short: 'Rebuild',
  head: 'When a day does not match, the record’s numbers take the platform’s place, and nobody has to confirm',
  chart: [
    'flowchart TB',
    'DAY["Each day of a week that does<br/>not match, on one platform"]:::next',
    'CLICK{"Did the record keep<br/>each lead’s click?"}:::next',
    'NONE(["Nothing to rebuild from, so<br/>the day stays not trusted"]):::next',
    'CAMP{"Does it know each<br/>click’s campaign?"}:::next',
    'BYCAMP["The record’s count and value<br/>take the platform’s place,<br/>campaign by campaign"]:::next',
    'TOTAL["The record’s count and value<br/>take the platform’s place for<br/>the whole account"]:::next',
    'BOTH["The trust calendar keeps both<br/>numbers, and why they differ"]:::next',
    'NOBODY["Nobody confirms: the record<br/>takes the place of a<br/>person’s answer"]:::next',
    'USE(["The campaign modules judge<br/>on the true numbers"]):::next',
    'DAY --> CLICK',
    'CLICK -- no --> NONE', 'CLICK -- yes --> CAMP',
    'CAMP -- yes --> BYCAMP', 'CAMP -- no --> TOTAL',
    'BYCAMP --> BOTH', 'TOTAL --> BOTH',
    'BOTH --> NOBODY --> USE'
  ],
  links: { CLICK: 'trbwhich', NONE: 'trbwhich', CAMP: 'trbcamp', BYCAMP: 'trbcamp', TOTAL: 'trbcamp', BOTH: 'trbboth', NOBODY: 'trbnobody' },
  leaves: { trbwhich: 'Which days can be rebuilt', trbcamp: 'Campaign by campaign', trbboth: 'Both numbers stay', trbnobody: 'Nobody confirms' },

  deck: [
    { about: ['trebuild'], kicker: 'The idea',
      head: 'The record says what should have happened, so the true numbers can be rebuilt from it',
      visual: { type: 'flow', rows: [{ title: 'Bull Legal’s Google, the week of Oct 5', steps: [['Google counted 1 lead', '', 'block'], ['The lead app took 3 sends with a Google click', '', 'code'], ['One send was the same person again', 'Bull’s answer of Nov 1', 'opus']], end: [['Bull’s true count is 2', 'it takes the place of Google’s 1', 'next']] }] },
      vcap: 'This is not built yet. Google’s count that week is too low, but the record still holds what really happened, so the record’s number can stand in for Google’s in every module that judges that week.',
      quote: ['For this I want to go back. We should have access to the root truth (the order or the leads) so you should be able to reconstuct what should have happened when no?', 'Nov 7'] },
    { about: ['trebuild'], kicker: 'Today',
      head: 'Today a broken day is only marked, so every module loses its numbers',
      visual: { type: 'flow', rows: [
        { title: 'Today', steps: [['C2’s Meta days are broken from Sep 14', 'by Will’s answer on case #260', 'block'], ['No number is read from them', '', 'block']], end: [['Results judges Meta on clicks, landing page views and GA4’s leads', '', 'code']] },
        { title: 'The plan', steps: [['Each broken day is rebuilt from the record', '', 'next']], end: [['The modules judge Meta on its true leads', '', 'next']] }] },
      vcap: 'On Nov 7 C2’s trust calendar holds 49 broken days and 1 suspect day of Meta, from Sep 14 to Nov 2. Nothing rebuilds them, so none of those days can be judged.' },

    { about: ['trbwhich'], kicker: 'Which days can be rebuilt',
      head: 'A day can be rebuilt only when the record kept each lead’s click that day',
      visual: { type: 'flow', rows: [
        { title: 'Bull’s Google, the week of Oct 5', steps: [['The lead app kept each lead’s Google click', 'since May 7', 'code']], end: [['It can be rebuilt', '', 'next']] },
        { title: 'C2’s Meta, Oct 26 to Nov 1', steps: [['The lead app keeps no Meta click', '', 'block']], end: [['Nothing to rebuild from today, so the days stay broken', '', 'block']] },
        { title: 'C2’s Google, before Sep 29', steps: [['The lead app kept no click then', '', 'block']], end: [['Those days can never be rebuilt', '', 'block']] }] },
      vcap: 'A lead with no click can come from any source, so nobody can give it to one platform. That is why the rebuild needs a record that keeps every platform’s click.' },

    { about: ['trbcamp'], kicker: 'Campaign by campaign',
      head: 'Where the record knows each click’s campaign, each campaign gets its own true count',
      visual: { type: 'flow', rows: [
        { title: 'A Google click', steps: [['The click’s id', '', 'code'], ['Google can name the campaign of each of its clicks', '', 'code']], end: [['Each campaign gets its own true count', '', 'next']] },
        { title: 'A Meta or Microsoft click', steps: [['The click’s id', '', 'code'], ['The page address must also name the campaign', '', 'next']], end: [['Else the true count is for the whole account', '', 'next']] }] },
      vcap: 'Barbara’s lead tool is built to read each Google click’s campaign, keyword and device from the lead app. Claude’s call is that Meta’s and Microsoft’s ids do not name a campaign by themselves, so their record needs the campaign in the page address too.' },

    { about: ['trbboth'], kicker: 'Both numbers stay',
      head: 'The trust calendar keeps what the platform said beside what really happened',
      visual: { type: 'card', title: 'Bull Legal’s Google, the week of Oct 5, in the plan', fields: [
        ['What Google counted', 'Google counted 1 lead that week.'],
        ['What really happened', 'The lead app took 3 sends with a Google click, and they came from 2 people.'],
        ['Why they differ', 'One person sent the form twice, and Google missed at most one lead.'],
        ['What the modules use', 'They use 2, the record’s count, for that week.']], stamp: ['Not built yet; today the calendar keeps one label a day', 'next'] },
      vcap: 'So Will can always see what the platform claimed and what it should have been. The platform’s number is never thrown away, because the gap between the two is the proof of the break.' },

    { about: ['trbnobody'], kicker: 'Nobody confirms',
      head: 'The record takes the place of a person’s answer, so no broken day waits for Will',
      visual: { type: 'timeline', items: [
        ['Nov 1', 'C2’s check “Past broken days are found and marked” fails, only because no person had said yes to the broken days.'],
        ['Nov 2, case #260', 'Will answers that the machine should set the broken days itself, because he does not want to confirm them.'],
        ['Nov 2', 'Will says that from now on, the past broken days should not wait for his yes.'],
        ['Nov 7, on this map', 'Will asks to go back to the record and rebuild what should have happened, so the record decides each day.']] },
      vcap: 'This replaces the person’s answer on the trust calendar. It is Claude’s call from Will’s words that the record is the proof, so a broken day never waits for Will or Jacob.',
      quote: ["I want you to set the dates that it's broken. I don't want to confirm.", 'Nov 2'] }
  ],

  examples: {
    DAY: { tag: 'plan', rows: [{ steps: [['Bull’s Google, the week of Oct 5', 'Google counted 1, the lead app has 3', 'block']], end: [['Each of its days is rebuilt', '', 'next']] }], note: 'The week is real, from Barbara’s weekly lead counts for Bull Legal, read on Nov 7.' },
    CLICK: { tag: 'plan', rows: [{ steps: [['Bull’s lead app, Oct 5 to 11', '3 leads with a Google click', 'code'], ['Did it keep the clicks?', 'yes, since May 7', 'next']], end: [['Rebuild from the record', '', 'next']] }], note: 'The clicks are real: Bull’s app has kept Google’s click since May 7.' },
    NONE: { tag: 'plan', rows: [{ steps: [['C2’s Meta, Oct 26 to Nov 1', 'the lead app keeps no Meta click', 'code']], end: [['Nothing to rebuild from', 'the days stay broken', 'block']] }], note: 'The days are real: C2’s trust calendar marks them broken on Nov 7.' },
    CAMP: { tag: 'plan', rows: [{ steps: [['Bull’s leads, Oct 5 to 11', 'each with its Google click', 'code'], ['Does the record know each campaign?', 'yes, from Google’s click', 'next']], end: [['Rebuild campaign by campaign', '', 'next']] }], note: 'Barbara cannot read Bull’s leads one by one yet, because its app refused the read on Nov 7.' },
    BYCAMP: { tag: 'plan', rows: [{ steps: [['Bull, the week of Oct 5', '', 'next']], end: [['Each campaign’s true count takes Google’s place', '', 'next']] }], note: 'Bull’s answer of Nov 1 found that one of the 3 sends was the same person again, so the true count would be 2 where Google counted 1.' },
    TOTAL: { tag: 'plan', rows: [{ steps: [['A Meta lead with no campaign in its page address', '', 'code']], end: [['It counts toward Meta’s true total for the account', '', 'next']] }], note: 'Made up, because no record keeps a Meta click yet.' },
    BOTH: { tag: 'plan', rows: [{ steps: [['Bull’s Google, the week of Oct 5', '', 'next']], end: [['Google said 1, and the record says 2', 'both kept, with why', 'next']] }], note: 'The numbers are real, from Barbara’s weekly lead counts for Bull Legal and Bull’s answer of Nov 1.' },
    NOBODY: { tag: 'plan', rows: [{ steps: [['C2’s Meta days from Sep 14', 'broken today by Will’s answer on case #260', 'will'], ['The record decides them', '', 'next']], end: [['No answer waits on Will', '', 'next']] }], note: 'Will’s answer is real: his reply 4425 on case #260.' },
    USE: { tag: 'plan', rows: [{ steps: [['Bull’s Results answer', 'the week of Oct 5', 'opus']], end: [['It judges on 2 real leads, not Google’s 1', '', 'next']] }], note: 'The 2 come from Bull’s answer of Nov 1, which found that one of the 3 sends was the same person again.' }
  },

  reviewed: { self: '589a4732', above: '7441c765', on: '2026-11-07' }
});
