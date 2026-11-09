// Nov 8, 2026: plain-words pass (Will: "The client module needs a run that removes robot speak. Please make this
// intelligable"). Only the words changed, and the logic and every fact stayed the same. The module is "the client module",
// never "The client" alone; C2's answer 44 is "C2's test answer"; the brief is "the fact sheet". check-plain.cjs judges it.
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
  head: 'Each point of the answer rests on a quote, and code finds each quote’s words in its source before the answer is saved',
  chart: [
    'flowchart TB',
    'Q(["One quote, with its words,<br/>its kind of source, and<br/>where to find it"]):::opus',
    'KIND{"What kind of<br/>source is it?"}:::code',
    'SRC{"Does it name the mail and<br/>its mailbox, or the call’s<br/>recording?"}:::code',
    'REPLY{"Is it a person’s reply on<br/>one of this client’s cases?"}:::code',
    'TEXT(["A text, so it is saved as<br/>not checked, because Barbara<br/>cannot read texts"]):::code',
    'READ{"Did the mail or the<br/>transcript open?"}:::code',
    'UNREAD(["The quote is saved and marked<br/>not checked, with the reason"]):::code',
    'MIN{"Is it {clientMin} characters<br/>or longer?"}:::code',
    'FOUND{"Are the words<br/>really there?"}:::code',
    'WHOLE{"For a mail or a reply, does it<br/>start and end where<br/>a sentence does?"}:::code',
    'OK(["Checked"]):::code',
    'R1(["Refused, because it names<br/>no mailbox or no recording"]):::code',
    'R2(["Refused, because no person’s<br/>reply on this client’s<br/>cases holds it"]):::code',
    'R3(["Refused, because words that<br/>short fit too many sources"]):::code',
    'R4(["Refused, because the<br/>words are not there"]):::code',
    'R5(["Refused, because it cuts a<br/>sentence, and the refusal gives<br/>the whole sentence"]):::code',
    'WHO["Never checked: who said<br/>the words, and when"]:::code',
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
    cpwhere: 'Where each quote came from',
    cptext: 'A quote from a text',
    cpunread: 'A source that does not open',
    cpshort: 'Quotes under {clientMin} characters',
    cpfound: 'The words must be in the source',
    cpwhole: 'Quotes from mail must be whole sentences',
    clientwho: { title: 'Should code check who said each quote?', open: {
      q: 'The module’s instructions ask for what the client wants “in their words, each with who and when”. But code checks only that a quote’s words are in its source, never who said them or when. The check on strategy pages does check who said each want. Should the answer’s quote check also check who said each quote?',
      since: 'Nov 7',
      opts: [
        ['Keep it as it is, so code checks the words and Opus names who and when in its proof', false, 'Nothing to build. But a line from our own team can pass as the client’s, and 7 of the 18 mail quotes in C2’s test answer are Will’s or Isaac’s.'],
        ['Code also checks who said each quote and when, and saves both with it, as the check on strategy pages does', true, 'The instructions ask for who and when, and code already reads the sender and the speaker for strategy pages. Code refuses no more quotes than today, so we can still quote what we told the client.'],
        ['Code refuses any quote that is not in the client’s own words', false, 'Too strict, because the answer must also give what we told them, in our own words.']] } }
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['cproof'], kicker: 'The idea',
      head: 'A quote that stops halfway can leave out the part that matters, so code checks every quote against its source',
      visual: { type: 'flow', rows: [
        { title: 'KDX’s strategy draft, Oct 31', steps: [['“averaging about 7-8 that do pan out per month”', 'the draft quoted only this much', 'block'], ['“which amounts to a fairly high client acquisition cost ($268.67+ or so this month)”', 'the sentence goes on', 'code']], end: [['Refused, because the cut hid the cost that Kevin named', '', 'block']] }] },
      vcap: 'Kevin Kulbacki wrote this in a mail of May 31, 2025, and the draft quoted only its first half. The strategy page and the answer run the same check, and KDX’s page now quotes the whole sentence.',
      quote: ['ok I like that. I think that will help.', 'Nov 1'] },
    { about: ['cproof'], kicker: 'The quotes in a real answer',
      head: 'C2’s test answer holds 60 quotes, and code found every one of them in its source',
      visual: { type: 'dots', groups: [[18, 'route', 'from mail, in whole sentences'], [42, 'opus', 'from calls, found in the transcript']] },
      vcap: 'A quote from a call only has to appear somewhere in the transcript, so a fragment like “two week delay on” passed. No quote came from a case reply or a text.',
      stats: [['18', 'mail quotes, from will@ and isaac@', 'real'], ['42', 'call quotes, from 5 recorded calls', 'real'], ['0', 'quotes from a case reply or a text', 'real']] },

    { about: ['cpwhere'], kicker: 'Where each quote came from',
      head: 'Each kind of quote names its own source, and code opens each source only once',
      visual: { type: 'card', title: 'What each quote names, and what code does with it', fields: [
        ['A mail', 'Its Gmail id and the team mailbox that holds it, and code reads the mail the way the mail tools do. A mail quote with no mailbox is refused.'],
        ['A call', 'Its recording’s id, and code reads the transcript. Anything that is not a recording’s id is refused.'],
        ['A case reply', 'Its number, and code reads it from the case. It must be a person’s reply on one of this client’s cases, and the whole reply counts, at any length.'],
        ['A text', 'The name of the conversation, and code never reads it.'],
        ['A source that does not open', 'The quote is saved as not checked, with the reason, and the answer is never refused for it.']],
        stamp: ['Code decides checked or not checked, whatever Opus sent', 'code'] },
      vcap: 'On Nov 1 code refused Will’s replies on Bull’s cases #188 and #95 as quotes, so the answer had to say them in its own words. Later that day, at 10:13 AM, a case reply became its own kind of quote.' },

    { about: ['cptext'], kicker: 'A quote from a text',
      head: 'A quote from a text is always saved as not checked, because Barbara cannot read texts',
      visual: { type: 'flow', rows: [
        { steps: [['A quote from a text', 'such as the C2 Ads group', 'will'], ['Barbara cannot read it', '“texts are read on Will’s computer only, so Barbara cannot check them”', 'code']], end: [['Saved, marked not checked, with the reason', '', 'wait']] }] },
      vcap: 'C2’s test read Waylon’s texts of Oct 30 on Will’s computer but quoted none of them. Its proof says in its own words what the texts asked.',
      quote: ['yes texts', 'Nov 1'] },

    { about: ['cpunread'], kicker: 'A source that does not open',
      head: 'If a source does not open, the answer is not refused, but the quote is saved as not checked',
      visual: { type: 'flow', rows: [
        { steps: [['The mail or the transcript does not open', 'for example, because the mail login fails', 'code'], ['The quote keeps the reason', '', 'code']], end: [['Saved, and the page shows Not checked', '', 'wait']] }] },
      vcap: 'Code never counts such a quote as checked, and when it saves the answer, it lists each quote that it could not check. This has not happened in any answer of the client module yet.' },

    { about: ['cpshort'], kicker: 'Under {clientMin} characters',
      head: 'Words under {clientMin} characters could come from too many places, so code does not tie them to any one source',
      visual: { type: 'bars', max: 30, rows: [
        { label: '“$80”, code’s own example', parts: [[3, 'block', '3, refused']] },
        { label: '“What can we do?”, Waylon, Oct 12', parts: [[15, 'keep', '15 characters']] },
        { label: '“two week delay on”, Waylon, Oct 21', parts: [[17, 'keep', '17 characters']] }] },
      vcap: 'Code counts the characters of the words, without the quote marks. Its own note says why, because “$80” alone shows up in many mails.' },

    { about: ['cpfound'], kicker: 'Are the words there?',
      head: 'The words must be in the source, but capitals, spacing and quote marks do not matter',
      visual: { type: 'flow', rows: [
        { title: 'Found', steps: [['“no we can\'t turn that off you guys that\'s where everybody\'s looking”', 'Waylon, on the call of Oct 7', 'will'], ['In the transcript', '', 'code']], end: [['Checked', '', 'keep']] },
        { title: 'Not found', steps: [['“for this year, I want ten signed cases”', 'a made-up quote in code’s own test of a KDX call', 'code'], ['Not in the recording', '', 'code']], end: [['Refused with “copy the words exactly as they are there”', '', 'block']] }] },
      vcap: 'A quote from a call only has to appear somewhere in its transcript. Transcripts break sentences badly, so the call quotes in C2’s test answer start and stop in the middle of sentences.' },

    { about: ['cpwhole'], kicker: 'Whole sentences',
      head: 'A quote from a mail must start and end where a sentence does',
      visual: { type: 'flow', rows: [
        { title: 'Refused on Nov 1', steps: [['“Anything that changes looks or words, Will to submit for approval”', 'Waylon’s mail of Oct 21 sets this line in bold', 'will'], ['It starts after the two bold marks', 'so code did not see the start of a sentence', 'code']], end: [['Refused as a cut sentence', '', 'block']] },
        { title: 'Since 10:13 AM that day', steps: [['Bold marks and code marks are ignored', '', 'code']], end: [['The same words pass', '', 'keep']] }] },
      vcap: 'A sentence ends at a full stop, a question mark or an exclamation mark, at the end of a paragraph or a list item, or where the writer started a new line. A line that the mail program wrapped joins the next one.' },

    { about: ['clientwho'], kicker: 'A question for Will',
      head: 'Code never checks who said a quote, so Will’s and Isaac’s lines pass the same way as Waylon’s',
      visual: { type: 'dots', groups: [[11, 'will', 'Waylon’s words'], [5, 'opus', 'Will’s words'], [2, 'route', 'Isaac’s words']] },
      vcap: 'These are the 18 mail quotes in C2’s test answer, and code checked them all the same way. The check on strategy pages does check who said each want, and it takes a want only from the client’s own address or from the client’s side of a call.',
      open: 'clientwho' }
  ],

  examples: {
    Q: { tag: 'real', rows: [{ steps: [['“Can you send me the invite?”', 'Waylon, Oct 30, by mail', 'will'], ['A mail', 'it names the mail’s Gmail id and the mailbox will@', 'opus']], end: [['Code’s checks start', '', 'code']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' },
    KIND: { tag: 'real', rows: [{ steps: [['The 60 quotes in C2’s test answer', '', 'opus'], ['By kind', '18 from mail and 42 from calls, with no reply and no text', 'code']], end: [['Each kind of quote is checked its own way', '', 'code']] }], note: 'C2’s test answer was saved before quotes had to say what kind of source they came from. So code sorted each quote by its mailbox, and a quote with a mailbox was a mail.' },
    SRC: { tag: 'real', rows: [
      { title: 'A mail', steps: [['“Can you send me the invite?”', 'Waylon, Oct 30', 'will'], ['A Gmail id and the mailbox will@', '', 'code']], end: [['Yes, so code reads the mail', '', 'code']] },
      { title: 'A call', steps: [['“two week delay on”', 'Waylon, on the call of Oct 21', 'will'], ['A recording’s id', '', 'code']], end: [['Yes, so code reads the transcript', '', 'code']] }], note: 'We took these from the answer that the client module wrote for C2 on Nov 1.' },
    REPLY: { tag: 'made', rows: [{ steps: [['A quote from a person’s reply on one of the client’s cases', 'named by its number', 'will'], ['Read from the case', 'the whole reply counts, at any length', 'code']], end: [['On to the length check', '', 'code']] }], note: 'Made up, because no answer of the client module has quoted a case reply. Replies became a kind of quote at 10:13 AM on Nov 1, after the client tests.' },
    TEXT: { tag: 'made', rows: [{ steps: [['A quote from the C2 Ads texts', '', 'will'], ['It is a text, so code never reads it', '', 'code']], end: [['Saved as not checked', '', 'wait']] }], note: 'Made up, because no answer of the client module has quoted a text. C2’s test read the C2 Ads texts on Will’s computer and left them out of its quotes.' },
    READ: { tag: 'real', rows: [{ steps: [['Mail in will@ and isaac@, and 5 transcripts', 'C2, Nov 1', 'code'], ['Each source opened once', '', 'code']], end: [['All of them opened, so no quote was saved as not checked', '', 'keep']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' },
    UNREAD: { tag: 'made', rows: [{ steps: [['A quote from a mail', '', 'opus'], ['The mail does not open', 'the mail login fails', 'code']], end: [['The quote is saved and marked not checked, with the reason', '', 'wait']] }], note: 'We made this up, because this has not happened in any answer of the client module yet.' },
    MIN: { tag: 'real', rows: [{ steps: [['“What can we do?”', 'Waylon, Oct 12, by mail', 'will'], ['15 characters', 'the line is {clientMin}', 'code']], end: [['It is long enough, so code looks for it in the mail', '', 'code']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' },
    FOUND: { tag: 'real', rows: [{ steps: [['“two week delay on”', 'Waylon, on the call of Oct 21', 'will'], ['In the transcript', 'a call does not need whole sentences', 'code']], end: [['Checked', '', 'keep']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' },
    WHOLE: { tag: 'real', rows: [{ steps: [['“I have to move todays call - I\'m sick as a dog.”', 'Waylon, Oct 28, by mail', 'will'], ['A whole sentence of the mail', '', 'code']], end: [['Checked', '', 'keep']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' },
    OK: { tag: 'real', rows: [{ steps: [['60 quotes', '', 'opus'], ['Each one found, and each mail quote whole', '', 'code']], end: [['Saved as checked', '', 'keep']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' },
    R1: { tag: 'real', rows: [{ steps: [['Will’s reply on case #188', 'Bull, Nov 1, before a case reply could be quoted', 'will'], ['It names no mail and no recording', '', 'code']], end: [['Refused, so Opus put Will’s reply in its own words', '', 'block']] }], note: 'We took this from code’s record of the client module’s answer for Bull Legal on Nov 1. Since 10:13 AM that day, Opus can quote a case reply, and code reads it from the case.' },
    R2: { tag: 'made', rows: [{ steps: [['A quote named “reply 99999”', '', 'opus'], ['No person’s reply on a case of this client', '', 'code']], end: [['Refused with “reply 99999 is no person’s reply on a case of this client”', '', 'block']] }], note: 'We made this up from code’s own test. This has not happened in any answer of the client module yet.' },
    R3: { tag: 'made', rows: [{ steps: [['“$80”', '3 characters', 'opus'], ['{clientMin} characters or longer?', 'no', 'code']], end: [['Refused, with a reminder to quote whole sentences', '', 'block']] }], note: 'We made this up from code’s own example, because “$80” alone shows up in many mails. This has not happened in any answer of the client module yet.' },
    R4: { tag: 'made', rows: [{ steps: [['“for this year, I want ten signed cases”', 'said to be from a KDX call', 'opus'], ['Not in the recording', '', 'code']], end: [['Refused with “copy the words exactly as they are there”', '', 'block']] }], note: 'We made this up from code’s own test of a KDX call. This has not happened in any answer of the client module yet.' },
    R5: { tag: 'real', rows: [{ steps: [['Opus quoted Waylon’s bold line without its bold marks', 'his mail of Oct 21', 'will'], ['In the mail, two bold marks come just before the quote', 'so code did not see the start of a sentence', 'code']], end: [['Refused as a cut sentence, with the whole sentence', '', 'block']] }], note: 'We took this from code’s record of the client module’s answer for C2 on Nov 1, which shows the refusal. Since 10:13 AM that day, code ignores bold marks, so the same quote would pass.' },
    WHO: { tag: 'real', rows: [{ steps: [['The 18 mail quotes in C2’s test answer', '11 are Waylon’s, 5 are Will’s and 2 are Isaac’s', 'opus'], ['Who said them?', 'code never checks', 'code']], end: [['All 18 checked the same way', '', 'code']] }], note: 'We took this from the answer that the client module wrote for C2 on Nov 1.' }
  },

  reviewed: { self: '76ebca37', above: '1f7809b6', on: '2026-11-08' }
});
