// The proof: how code checks each quote before an answer saves (Will, 2026-11-01: "ok I like that. I think that will help.").
// The quote (comm-chat src/modules/mod.rs:565-614: its words, its kind, its source, a mail's mailbox); where each quote is
// (src/chat/tools/module_tools.rs `where_of`, 436-481; src/client_profile/client_words.rs `Source::of_quote`); each source read
// once and checked (module_tools.rs `check_quotes`, 619-669); the one check (client_words.rs `quote_refusal`, 293-372, 12
// characters at :27; `marks_out`, :270-276, since Nov 1 at 10:13 AM ET, commit c5e2d960; `reply_refusal`, :277-286). A text is
// never read (module_tools.rs:445-446). Nothing here reads who said the words; the strategy check does (client_words.rs
// `email_said`, :375-405, and `Read::said`, :133-139; src/results/strategy_case.rs:150-170). Design: docs/design/modules/
// README.md:97-122 (the KDX cut quote of Oct 31). Real cases: C2's answer 44 of Nov 1 (its 60 quotes, read whole on
// 2026-11-07); the Bull note on cases #188 and #95 (module_tools.rs:448-449); code's own tests. The question on who said
// each quote is Will's (Nov 7). Old part: retired/2026-11-07-client-redo/clientquotes.js.
LOGIC.flow({
  id: 'cproof', parent: 'client',
  title: 'The proof', short: 'The proof',
  head: 'Each point of the answer rests on a quote, and code finds each quote’s words in its source before the answer saves',
  chart: [
    'flowchart TB',
    'Q(["One quote: its words, its kind<br/>of source, and where it is"]):::opus',
    'KIND{"What kind<br/>of source?"}:::code',
    'SRC{"Does it name the mail and<br/>its mailbox, or the call’s<br/>recording?"}:::code',
    'REPLY{"Is it a person’s reply on<br/>one of this client’s cases?"}:::code',
    'TEXT(["A text, so it saves as not<br/>checked, because Barbara<br/>cannot read texts"]):::code',
    'READ{"Did the mail or the<br/>transcript open?"}:::code',
    'UNREAD(["It saves as not<br/>checked, with why"]):::code',
    'MIN{"Is it {clientMin} characters<br/>or more?"}:::code',
    'FOUND{"Are the words<br/>really there?"}:::code',
    'WHOLE{"For a mail or a reply, does it<br/>start and end where<br/>a sentence does?"}:::code',
    'OK(["Checked"]):::code',
    'R1(["Refused, because it names<br/>no mailbox or no recording"]):::code',
    'R2(["Refused, because no person’s<br/>reply on this client’s<br/>cases holds it"]):::code',
    'R3(["Refused, because words that<br/>short fit too many sources"]):::code',
    'R4(["Refused, because the<br/>words are not there"]):::code',
    'R5(["Refused, because it cuts a<br/>sentence, and the refusal gives<br/>the whole sentence"]):::code',
    'WHO["Never asked: who said<br/>the words, and when"]:::code',
    'Q --> KIND',
    'KIND -- "a mail or a call" --> SRC', 'KIND -- "a case reply" --> REPLY', 'KIND -- "a text" --> TEXT',
    'SRC -- no --> R1', 'SRC -- yes --> READ', 'REPLY -- no --> R2', 'REPLY -- yes --> MIN',
    'READ -- no --> UNREAD', 'READ -- yes --> MIN',
    'MIN -- no --> R3', 'MIN -- yes --> FOUND',
    'FOUND -- no --> R4', 'FOUND -- "yes, in a call" --> OK', 'FOUND -- "yes, in a mail<br/>or a reply" --> WHOLE',
    'WHOLE -- no --> R5', 'WHOLE -- yes --> OK',
    'OK -.- WHO'
  ],
  links: { SRC: 'cpwhere', REPLY: 'cpwhere', TEXT: 'cptext', READ: 'cpunread', UNREAD: 'cpunread', MIN: 'cpshort', FOUND: 'cpfound', WHOLE: 'cpwhole', WHO: 'clientwho' },
  leaves: {
    cpwhere: 'Where the words are',
    cptext: 'A text',
    cpunread: 'A source that does not open',
    cpshort: 'Under {clientMin} characters',
    cpfound: 'Are the words there?',
    cpwhole: 'Whole sentences',
    clientwho: { title: 'Should code read who said each quote?', open: {
      q: 'The module’s instructions ask for what the client wants “in their words, each with who and when”. But code checks only that a quote’s words are in its source, never who said them or when, while the strategy page’s check does read who said each want. Should the answer’s quote check read who said each quote too?',
      since: 'Nov 7',
      opts: [
        ['Keep it as it is, so code checks the words and Opus names who and when in its proof', false, 'Nothing to build. But a line of our own team can read as the client’s, and 7 of answer 44’s 18 mail quotes are Will’s or Isaac’s.'],
        ['Code also reads who said each quote and when, and saves both with it, as the strategy page’s check does', true, 'The instructions ask for who and when, and code already reads the sender and the speaker for the strategy page. It refuses nothing new, so what we told them can still be quoted.'],
        ['Code refuses any quote that is not in the client’s own words', false, 'Too strict, because the answer must also give what we told them, in our own words.']] } }
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['cproof'], kicker: 'The idea',
      head: 'A cut quote can hide the half of a sentence that matters, so code reads every quote at its source',
      visual: { type: 'flow', rows: [
        { title: 'KDX’s strategy draft, Oct 31', steps: [['“averaging about 7-8 that do pan out per month”', 'the draft quoted this much', 'block'], ['“which amounts to a fairly high client acquisition cost ($268.67+ or so this month)”', 'the sentence goes on', 'code']], end: [['Refused, because the cut hid the cost Kevin named', '', 'block']] }] },
      vcap: 'Kevin Kulbacki wrote this in a mail of May 31, 2025, and the draft quoted only its first half. The strategy page and the answer run the same check, and KDX’s page now quotes the whole sentence.',
      quote: ['ok I like that. I think that will help.', 'Nov 1'] },
    { about: ['cproof'], kicker: 'A real answer’s quotes',
      head: 'Answer 44 holds 60 quotes, and code found every one of them in its source',
      visual: { type: 'dots', groups: [[18, 'route', 'from mail, in whole sentences'], [42, 'opus', 'from calls, found in the transcript']] },
      vcap: 'A call’s words need only be somewhere in its transcript, so a fragment such as “two week delay on” passed. No quote came from a case reply or a text.',
      stats: [['18', 'mail quotes, from will@ and isaac@', 'real'], ['42', 'call quotes, from 5 recorded calls', 'real'], ['0', 'quotes from a case reply or a text', 'real']] },

    { about: ['cpwhere'], kicker: 'Where the words are',
      head: 'Each kind of quote names its own source, and code reads each source only once',
      visual: { type: 'card', title: 'What each quote names, and what code does with it', fields: [
        ['A mail', 'Its Gmail id and the team mailbox that holds it, and code reads the mail as the mail tools do. With no mailbox it is refused.'],
        ['A call', 'Its recording’s id, and code reads the transcript. Anything that is not a recording’s id is refused.'],
        ['A case reply', 'Its number, and code reads it from the case. It must be a person’s reply on one of this client’s cases, and the whole reply stands at any length.'],
        ['A text', 'The conversation’s name, and code never reads it.'],
        ['A source that does not open', 'The quote saves as not checked, with why, and the answer is never refused for it.']],
        stamp: ['Code sets checked or not checked, whatever Opus sent', 'code'] },
      vcap: 'On Nov 1 code refused Will’s replies on Bull’s cases #188 and #95 as quotes, so the answer had to say them in its own words. A case reply became its own kind of quote at 10:13 AM that day.' },

    { about: ['cptext'], kicker: 'A text',
      head: 'A quote from a text always saves as not checked, because Barbara cannot read texts',
      visual: { type: 'flow', rows: [
        { steps: [['A quote from a text', 'such as the C2 Ads group', 'will'], ['Barbara cannot read it', '“texts are read on Will’s computer only, so Barbara cannot check them”', 'code']], end: [['Saved, marked not checked, with why', '', 'wait']] }] },
      vcap: 'Answer 44 read Waylon’s texts of Oct 30 on Will’s computer and quoted none of them, so its proof says what they asked instead.',
      quote: ['yes texts', 'Nov 1'] },

    { about: ['cpunread'], kicker: 'A source that does not open',
      head: 'A source that does not open never refuses the answer, but its quote saves as not checked',
      visual: { type: 'flow', rows: [
        { steps: [['The mail or the transcript does not open', 'for example, because the mail login fails', 'code'], ['The quote keeps the reason', '', 'code']], end: [['Saved, and the page shows Not checked', '', 'wait']] }] },
      vcap: 'Code never counts such a quote as checked, and its reply to the save names each one. No client answer has met this yet.' },

    { about: ['cpshort'], kicker: 'Under {clientMin} characters',
      head: 'Words under {clientMin} characters fit too many sources, so code ties none of them to one',
      visual: { type: 'bars', max: 30, rows: [
        { label: '“$80”, code’s own example', parts: [[3, 'block', '3, refused']] },
        { label: '“What can we do?”, Waylon, Oct 12', parts: [[15, 'keep', '15 characters']] },
        { label: '“two week delay on”, Waylon, Oct 21', parts: [[17, 'keep', '17 characters']] }] },
      vcap: 'Code counts the characters of the words, with the quote marks around them left off. Its own note says why, because “$80” alone is in many mails.' },

    { about: ['cpfound'], kicker: 'Are the words there?',
      head: 'The words must be in the source, but case, spacing and quote marks do not count',
      visual: { type: 'flow', rows: [
        { title: 'Found', steps: [['“no we can\'t turn that off you guys that\'s where everybody\'s looking”', 'Waylon, the call of Oct 7', 'will'], ['In the transcript', '', 'code']], end: [['Checked', '', 'keep']] },
        { title: 'Not found', steps: [['“for this year, I want ten signed cases”', 'code’s own test on a KDX call', 'code'], ['Not in the recording', '', 'code']], end: [['Refused with “copy the words exactly as they are there”', '', 'block']] }] },
      vcap: 'A call’s quote need only be somewhere in its transcript, and a transcript breaks sentences badly, so answer 44’s call quotes start and stop in the middle of a sentence.' },

    { about: ['cpwhole'], kicker: 'Whole sentences',
      head: 'A quote from a mail must start and end where a sentence does',
      visual: { type: 'flow', rows: [
        { title: 'Refused on Nov 1', steps: [['“Anything that changes looks or words, Will to submit for approval”', 'Waylon’s mail of Oct 21 sets the line in bold', 'will'], ['It starts after the two bold marks', 'so code did not see the start of a sentence', 'code']], end: [['Refused as a cut sentence', '', 'block']] },
        { title: 'Since 10:13 AM that day', steps: [['Bold and code marks do not count', '', 'code']], end: [['The same words pass', '', 'keep']] }] },
      vcap: 'A sentence ends at a full stop, a question mark or an exclamation mark, at a paragraph or a list item, or at a line its writer typed. A line that the mail program wrapped joins the next one.' },

    { about: ['clientwho'], kicker: 'A question for Will',
      head: 'Code never asks who said a quote, so Will’s and Isaac’s lines pass the same way as Waylon’s',
      visual: { type: 'dots', groups: [[11, 'will', 'Waylon’s words'], [5, 'opus', 'Will’s words'], [2, 'route', 'Isaac’s words']] },
      vcap: 'These are answer 44’s 18 mail quotes, all checked the same way. The strategy page’s check does read who said each want, and it takes a want only from the client’s own address or from a client’s speaker on a call.',
      open: 'clientwho' }
  ],

  examples: {
    Q: { tag: 'real', rows: [{ steps: [['“Can you send me the invite?”', 'Waylon, Oct 30, by mail', 'will'], ['A mail', 'its Gmail id and the mailbox will@', 'opus']], end: [['Code’s checks start', '', 'code']] }], note: 'C2’s answer 44, of Nov 1.' },
    KIND: { tag: 'real', rows: [{ steps: [['Answer 44’s 60 quotes', '', 'opus'], ['By kind', '18 from mail and 42 from calls, with no reply and no text', 'code']], end: [['Each kind goes its own way', '', 'code']] }], note: 'C2’s answer 44, of Nov 1. It saved before quotes named a kind, so code read each by its mailbox, and a mailbox meant a mail.' },
    SRC: { tag: 'real', rows: [
      { title: 'A mail', steps: [['“Can you send me the invite?”', 'Waylon, Oct 30', 'will'], ['A Gmail id and the mailbox will@', '', 'code']], end: [['Yes, so code reads the mail', '', 'code']] },
      { title: 'A call', steps: [['“two week delay on”', 'Waylon, the call of Oct 21', 'will'], ['A recording’s id', '', 'code']], end: [['Yes, so code reads the transcript', '', 'code']] }], note: 'C2’s answer 44, of Nov 1.' },
    REPLY: { tag: 'made', rows: [{ steps: [['A quote from a person’s reply on one of the client’s cases', 'named by its number', 'will'], ['Read from the case', 'the whole reply stands at any length', 'code']], end: [['On to the length check', '', 'code']] }], note: 'Made, because no client answer has quoted a case reply. Replies became a kind of quote at 10:13 AM on Nov 1, after the client tests.' },
    TEXT: { tag: 'made', rows: [{ steps: [['A quote from the C2 Ads texts', '', 'will'], ['A text, so it is never read', '', 'code']], end: [['Saved as not checked', '', 'wait']] }], note: 'Made, because no client answer has quoted a text. Answer 44 read the C2 Ads texts on Will’s computer and left them out of its quotes.' },
    READ: { tag: 'real', rows: [{ steps: [['Mail in will@ and isaac@, and 5 transcripts', 'C2, Nov 1', 'code'], ['Each source read once', '', 'code']], end: [['All of them opened, so no quote saved as not checked', '', 'keep']] }], note: 'C2’s answer 44, of Nov 1.' },
    UNREAD: { tag: 'made', rows: [{ steps: [['A quote from a mail', '', 'opus'], ['The mail does not open', 'the mail login fails', 'code']], end: [['Saved as not checked, with why', '', 'wait']] }], note: 'Made, because no client answer has met this.' },
    MIN: { tag: 'real', rows: [{ steps: [['“What can we do?”', 'Waylon, Oct 12, by mail', 'will'], ['15 characters', 'the line is {clientMin}', 'code']], end: [['Long enough, so code looks for it', '', 'code']] }], note: 'C2’s answer 44, of Nov 1.' },
    FOUND: { tag: 'real', rows: [{ steps: [['“two week delay on”', 'Waylon, the call of Oct 21', 'will'], ['In the transcript', 'a call need not give whole sentences', 'code']], end: [['Checked', '', 'keep']] }], note: 'C2’s answer 44, of Nov 1.' },
    WHOLE: { tag: 'real', rows: [{ steps: [['“I have to move todays call - I\'m sick as a dog.”', 'Waylon, Oct 28, by mail', 'will'], ['A whole sentence of the mail', '', 'code']], end: [['Checked', '', 'keep']] }], note: 'C2’s answer 44, of Nov 1.' },
    OK: { tag: 'real', rows: [{ steps: [['60 quotes', '', 'opus'], ['Each one found, and each mail quote whole', '', 'code']], end: [['Saved as checked', '', 'keep']] }], note: 'C2’s answer 44, of Nov 1.' },
    R1: { tag: 'real', rows: [{ steps: [['Will’s reply on case #188', 'Bull, Nov 1, before a reply was a kind of quote', 'will'], ['Neither a mail with its mailbox nor a recording', '', 'code']], end: [['Refused, so the answer said it in its own words', '', 'block']] }], note: 'Bull Legal, Nov 1, from code’s own note. Since 10:13 AM that day a case reply is its own kind, read from the case.' },
    R2: { tag: 'made', rows: [{ steps: [['A quote named “reply 99999”', '', 'opus'], ['No person’s reply on a case of this client', '', 'code']], end: [['Refused with “reply 99999 is no person’s reply on a case of this client”', '', 'block']] }], note: 'Made from code’s own test. No client answer has met it.' },
    R3: { tag: 'made', rows: [{ steps: [['“$80”', '3 characters', 'opus'], ['{clientMin} characters or more?', 'no', 'code']], end: [['Refused, with a reminder to quote whole sentences', '', 'block']] }], note: 'Made from code’s own example, because “$80” alone is in many mails. No client answer has met it.' },
    R4: { tag: 'made', rows: [{ steps: [['“for this year, I want ten signed cases”', 'named on a KDX call', 'opus'], ['Not in the recording', '', 'code']], end: [['Refused with “copy the words exactly as they are there”', '', 'block']] }], note: 'Made from code’s own test on a KDX call. No client answer has met it.' },
    R5: { tag: 'real', rows: [{ steps: [['A quote cut from Waylon’s bolded line', 'his mail of Oct 21', 'will'], ['It starts after the bold marks', 'not where the sentence starts', 'code']], end: [['Refused as a cut sentence, with the whole sentence', '', 'block']] }], note: 'C2, Nov 1, from code’s own note on that refusal. KDX’s strategy draft of Oct 31 met the same refusal for “averaging about 7-8 that do pan out per month”.' },
    WHO: { tag: 'real', rows: [{ steps: [['Answer 44’s 18 mail quotes', '11 are Waylon’s, 5 Will’s and 2 Isaac’s', 'opus'], ['Who said them?', 'code never asks', 'code']], end: [['All 18 checked the same way', '', 'code']] }], note: 'C2’s answer 44, of Nov 1.' }
  },

  reviewed: { self: 'f191faf6', above: 'a94aa4ce', on: '2026-11-07' }
});
