// How code checks each quote before an answer saves (Will, 2026-11-01: "ok I like that. I think that will help.").
// The Quote (comm-chat src/modules/mod.rs:565-614); where each quote is (src/chat/tools/module_tools.rs where_of, 436-481;
// client_profile/client_words.rs Source::of_quote, 72-82); each source read once and checked (module_tools.rs
// check_quotes, 619-669); the one check (client_words.rs quote_refusal, 288-366; holds_words, 212-218; marks_out,
// 270-275; reply_refusal, 277-286). A text is never read (module_tools.rs:445-446). Design: docs/design/modules/README.md,
// "Quotes are checked at their source".
LOGIC.flow({
  id: 'clientquotes', parent: 'client',
  title: 'How code checks each quote', short: 'Quotes',
  head: 'Code reads each quote at its source before the answer saves',
  chart: [
    'flowchart TB',
    'Q(["One quote: its words,<br/>its kind, its source"]):::opus',
    'KIND{"What kind?"}:::code',
    'SRC{"A mail with its team<br/>mailbox, or a<br/>recording id?"}:::code',
    'REPLY{"A person’s reply<br/>on this client’s case?"}:::code',
    'TEXT(["A text: saved as not<br/>checked. Only Will’s<br/>computer reads texts"]):::code',
    'READ{"Did the mail or<br/>the transcript read?"}:::code',
    'UNREAD(["Saved as not<br/>checked, with why"]):::code',
    'MIN{"{clientMin} characters<br/>or more?"}:::code',
    'FOUND{"Are the words<br/>in the source?"}:::code',
    'WHOLE{"Whole sentences of<br/>the mail or reply?"}:::code',
    'OK(["Checked"]):::code',
    'R1(["Refused: no mailbox,<br/>or no recording id"]):::code',
    'R2(["Refused: no person’s<br/>reply on this client’s case"]):::code',
    'R3(["Refused: under<br/>{clientMin} characters"]):::code',
    'R4(["Refused: the words<br/>are not there"]):::code',
    'R5(["Refused: it cuts a sentence.<br/>The refusal gives the<br/>whole sentence"]):::code',
    'WHO["Never asked: who said<br/>the words, and when"]:::code',
    'Q --> KIND',
    'KIND -- "mail or call" --> SRC', 'KIND -- "case reply" --> REPLY', 'KIND -- text --> TEXT',
    'SRC -- no --> R1', 'SRC -- yes --> READ', 'REPLY -- no --> R2', 'REPLY -- yes --> MIN',
    'READ -- no --> UNREAD', 'READ -- yes --> MIN',
    'MIN -- no --> R3', 'MIN -- yes --> FOUND',
    'FOUND -- no --> R4', 'FOUND -- "yes: a call" --> OK', 'FOUND -- "yes: a mail<br/>or a reply" --> WHOLE',
    'WHOLE -- no --> R5', 'WHOLE -- yes --> OK',
    'OK -.- WHO'
  ],
  links: { SRC: 'clientwhere', REPLY: 'clientwhere', TEXT: 'clienttext', READ: 'clientunread', MIN: 'clientshort', FOUND: 'clientfound', WHOLE: 'clientwhole', WHO: 'clientwho' },
  leaves: {
    clientwhere: 'Where the words are',
    clienttext: 'A text',
    clientunread: 'A source that does not read',
    clientshort: 'Under {clientMin} characters',
    clientfound: 'In the source?',
    clientwhole: 'Whole sentences',
    clientwho: { title: 'Should code read who said each quote?', open: {
      q: 'The module’s words ask for what the client wants “in their words, each with who and when”. Code checks only that a quote’s words are in its source, never who said them or when. The strategy page’s check does read who said each want. Should the answer’s quote check read it too?',
      since: 'Nov 7',
      opts: [
        ['As now: code checks the words; Opus names who and when in its proof', false, 'Nothing to build. Our own team’s line can read as the client’s: 7 of answer 44’s 18 mail quotes are Will’s or Isaac’s.'],
        ['Code also reads who said each quote and when, and saves both with it, as the strategy page’s check does', true, 'The module’s words ask for who and when, and code already reads the sender and the speaker for the strategy page. It refuses nothing new: what we told them still quotes.'],
        ['Code refuses any quote that is not the client’s own words', false, 'Too strict: the answer must also give what we told them, in our own words.']] } }
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each box.
  deck: [
    { about: ['clientquotes'], kicker: 'Why quotes',
      head: 'A cut quote can hide the half of a sentence that matters',
      visual: { type: 'flow', rows: [{ steps: [['“averaging about 7-8 that do pan out per month”', 'the draft quoted this', 'block'], ['“which amounts to a fairly high client acquisition cost ($268.67+ or so this month)”', 'the sentence goes on', 'code']], end: [['Refused: the cut hides the cost Kevin named', '', 'block']] }] },
      vcap: 'Kevin Kulbacki’s mail of May 31, 2025, in KDX’s strategy draft of Oct 31. The page and the answer run the same check, and KDX’s page now quotes the whole sentence.',
      quote: ['ok I like that. I think that will help.', 'Nov 1'] },
    { about: ['clientquotes'], kicker: 'A real answer’s quotes',
      head: 'Answer 44 holds 60 quotes, and code found each one in its source',
      visual: { type: 'dots', groups: [[18, 'route', 'from mail: whole sentences'], [42, 'opus', 'from calls: only in the transcript']] },
      vcap: 'C2, Nov 1. Every one saved as checked. A call’s words need only be in its transcript, so “two week delay on” passed.',
      stats: [['18', 'mail quotes, from will@ and isaac@', 'real'], ['42', 'call quotes, from 5 recordings', 'real'], ['0', 'case replies or texts', 'real']] },

    { about: ['clientwhere'], kicker: 'Where the words are',
      head: 'Each kind of quote names its own source, and code reads each source once',
      visual: { type: 'card', title: 'What each quote names, and what code does', fields: [
        ['A mail', 'its Gmail id and its team mailbox: read as the mail tools read it. No mailbox: refused'],
        ['A call', 'its recording id: the transcript is read. A source that is not a recording id: refused'],
        ['A case reply', 'its number: a person’s reply on this client’s case, read from the case. The whole reply stands at any length'],
        ['A text', 'the conversation’s name: never read'],
        ['A source that does not read', 'the quote saves as not checked, with why: never refused']], stamp: ['Code sets checked and not checked, whatever Opus sent', 'code'] },
      vcap: 'Bull, Nov 1: Will’s replies on cases 188 and 95 were refused as quotes and went in as paraphrase. A case reply became a kind of quote that day.' },
    { about: ['clienttext'], kicker: 'A text',
      head: 'A text always saves as not checked',
      visual: { type: 'flow', rows: [{ steps: [['A quote from a text', 'the conversation: C2 Ads', 'will'], ['Barbara cannot read it', '“texts are read on Will’s computer only, so Barbara cannot check them”', 'code']], end: [['Saved, marked not checked, with why', '', 'wait']] }] },
      vcap: 'Answer 44 read Waylon’s texts of Oct 30 on Will’s computer and quoted none of them.',
      quote: ['yes texts', 'Nov 1'] },
    { about: ['clientunread'], kicker: 'A source that does not read',
      head: 'A source that does not read never refuses: the quote saves as not checked',
      visual: { type: 'flow', rows: [{ steps: [['The mail or the transcript does not read', 'for example, the mail login fails', 'code'], ['The quote keeps why', '“the email … did not read: …”', 'code']], end: [['Saved; the page shows Not checked', '', 'wait']] }] },
      vcap: 'Code never counts such a quote as checked, and the save reply lists it. No client answer has met this yet.' },
    { about: ['clientshort'], kicker: 'Under {clientMin} characters',
      head: 'Words under {clientMin} characters tie to no source',
      visual: { type: 'bars', max: 30, rows: [
        { label: '“$80”: code’s own example', parts: [[3, 'block', '3: refused']] },
        { label: '“What can we do?”: Waylon, Oct 12', parts: [[15, 'keep', '15 characters']] },
        { label: '“two week delay on”: Waylon, Oct 21', parts: [[17, 'keep', '17 characters']] }] },
      vcap: 'The line is {clientMin} characters, with case, spaces and quote marks set aside. Code’s note: “$80” alone is in many mails.' },
    { about: ['clientfound'], kicker: 'In the source?',
      head: 'The words must be in the source; case, spaces and marks do not count',
      visual: { type: 'flow', rows: [
        { title: 'Found', steps: [['“no we can\'t turn that off you guys that\'s where everybody\'s looking”', 'Waylon, the Oct 7 call', 'will'], ['In the transcript', '', 'code']], end: [['Checked', '', 'keep']] },
        { title: 'Not found', steps: [['“for this year, I want ten signed cases”', 'code’s test on KDX’s call', 'code'], ['Not in the recording', '', 'code']], end: [['Refused: “copy the words exactly as they are there”', '', 'block']] }] },
      vcap: 'A call’s quote need only be in its transcript, which breaks sentences badly: answer 44’s call quotes start and stop in the middle of a sentence.' },
    { about: ['clientwhole'], kicker: 'Whole sentences',
      head: 'A mail’s quote must start and end where a sentence does',
      visual: { type: 'flow', rows: [
        { title: 'Refused, Nov 1', steps: [['“Anything that changes looks or words, Will to submit for approval”', 'Waylon’s Oct 21 mail bolds the line', 'will'], ['It starts after the two bold marks', 'not where the sentence starts', 'code']], end: [['“cuts a sentence”', '', 'block']] },
        { title: 'Since Nov 1, 10:13 AM', steps: [['Bold and code marks do not count', '', 'code']], end: [['The same words pass', '', 'keep']] }] },
      vcap: 'A sentence ends at a full stop, a question mark or an exclamation mark, at a paragraph or a list item, or at a line its writer typed. A line the mail program wrapped joins the next.' },
    { about: ['clientwho'], kicker: 'Who said it?',
      head: 'Code never asks who said a quote: Will’s and Isaac’s lines pass the same way',
      visual: { type: 'dots', groups: [[11, 'will', 'Waylon’s words'], [5, 'opus', 'Will’s words'], [2, 'route', 'Isaac’s words']] },
      vcap: 'Answer 44’s 18 mail quotes, all checked the same way. The strategy page’s check reads who said each want: the client’s own address, or a client speaker on the call.',
      open: 'clientwho' }
  ],

  examples: {
    Q: { tag: 'real', rows: [{ steps: [['“Can you send me the invite?”', 'Waylon, Oct 30, by mail', 'will'], ['Kind: mail', 'its Gmail id and the mailbox will@', 'opus']], end: [['Code’s checks start', '', 'code']] }], note: 'C2, Nov 1, answer 44.' },
    KIND: { tag: 'real', rows: [{ steps: [['Answer 44’s 60 quotes', '', 'opus'], ['By kind', '18 mail, 42 call, no reply, no text', 'code']], end: [['Each goes its own way', '', 'code']] }], note: 'C2, Nov 1, answer 44. It saved before quotes named a kind, so code read each by its mailbox: a mailbox means a mail, none means a call.' },
    SRC: { tag: 'real', rows: [
      { title: 'A mail', steps: [['“Can you send me the invite?”', 'Waylon, Oct 30', 'will'], ['A Gmail id and the mailbox will@', '', 'code']], end: [['Yes: code reads the mail', '', 'code']] },
      { title: 'A call', steps: [['“two week delay on”', 'Waylon, the Oct 21 call', 'will'], ['A recording’s id', '', 'code']], end: [['Yes: code reads the transcript', '', 'code']] }], note: 'C2, Nov 1, answer 44.' },
    REPLY: { tag: 'made', rows: [{ steps: [['A quote from a person’s reply on one of the client’s cases', 'named by its number', 'will'], ['Read from the case', 'the whole reply stands at any length', 'code']], end: [['On to the length check', '', 'code']] }], note: 'No client answer has quoted a case reply: replies became a kind of quote at 10:13 AM on Nov 1, after the client tests.' },
    R1: { tag: 'real', rows: [{ steps: [['Will’s reply on case 188', 'Bull, Nov 1, before a reply was a kind of quote', 'will'], ['Neither a mail with its mailbox nor a recording', '', 'code']], end: [['Refused: it went in as paraphrase', '', 'code']] }], note: 'Bull Legal, Nov 1 (the note in module_tools.rs). Since 10:13 AM that day a case reply is its own kind, read from the case.' },
    R2: { tag: 'made', rows: [{ steps: [['A quote named “reply 99999”', '', 'opus'], ['No person’s reply on a case of this client', '', 'code']], end: [['Refused: “reply 99999 is no person’s reply on a case of this client”', '', 'code']] }], note: 'Code’s own test (module_tools.rs). No client answer has met it.' },
    R3: { tag: 'made', rows: [{ steps: [['“$80”', '3 characters', 'opus'], ['{clientMin} characters or more?', 'no', 'code']], end: [['Refused: “quote whole sentences”', '', 'code']] }], note: 'Code’s own example: “$80” alone is in many mails. No client answer has met it.' },
    R4: { tag: 'made', rows: [{ steps: [['“for this year, I want ten signed cases”', 'named on KDX’s call', 'opus'], ['Not in the recording', '', 'code']], end: [['Refused: “copy the words exactly as they are there”', '', 'code']] }], note: 'Code’s own test on KDX’s call. No client answer has met it.' },
    R5: { tag: 'real', rows: [{ steps: [['A quote cut from Waylon’s bolded line', 'his Oct 21 mail', 'will'], ['It starts after the bold marks', 'not where the sentence starts', 'code']], end: [['Refused: “cuts a sentence”, with the whole sentence', '', 'code']] }], note: 'C2, Nov 1 (the note in client_words.rs). KDX’s strategy draft of Oct 31 met the same refusal for “averaging about 7-8 that do pan out per month”.' },
    TEXT: { tag: 'made', rows: [{ steps: [['A quote from the C2 Ads texts', '', 'will'], ['A text: never read', '', 'code']], end: [['Saved as not checked', '', 'code']] }], note: 'No client answer has quoted a text. Answer 44 read the C2 Ads texts on Will’s computer and left them out of its quotes.' },
    READ: { tag: 'real', rows: [{ steps: [['Mail in will@ and isaac@, and 5 transcripts', 'C2, Nov 1', 'code'], ['Each source read once', '', 'code']], end: [['All read: no quote saved as not checked', '', 'code']] }], note: 'C2, Nov 1, answer 44.' },
    UNREAD: { tag: 'made', rows: [{ steps: [['A quote from a mail', '', 'opus'], ['The mail does not read', 'the mail login fails', 'code']], end: [['Saved as not checked, with why', '', 'code']] }], note: 'No client answer has met this.' },
    MIN: { tag: 'real', rows: [{ steps: [['“What can we do?”', 'Waylon, Oct 12, by mail', 'will'], ['15 characters', 'the line is {clientMin}', 'code']], end: [['Long enough: look for it', '', 'code']] }], note: 'C2, Nov 1, answer 44.' },
    FOUND: { tag: 'real', rows: [{ steps: [['“two week delay on”', 'Waylon, the Oct 21 call', 'will'], ['In the transcript', 'a call need not be whole sentences', 'code']], end: [['Checked', '', 'code']] }], note: 'C2, Nov 1, answer 44.' },
    WHOLE: { tag: 'real', rows: [{ steps: [['“I have to move todays call - I\'m sick as a dog.”', 'Waylon, Oct 28, by mail', 'will'], ['A whole sentence of the mail', '', 'code']], end: [['Checked', '', 'code']] }], note: 'C2, Nov 1, answer 44.' },
    OK: { tag: 'real', rows: [{ steps: [['60 quotes', '', 'opus'], ['Each found, each mail quote whole', '', 'code']], end: [['Saved as checked', '', 'code']] }], note: 'C2, Nov 1, answer 44.' },
    WHO: { tag: 'real', rows: [{ steps: [['Answer 44’s 18 mail quotes', '11 Waylon’s, 5 Will’s, 2 Isaac’s', 'opus'], ['Who said them?', 'code never asks', 'code']], end: [['All 18 checked the same way', '', 'code']] }], note: 'C2, Nov 1, answer 44.' }
  },

  reviewed: { self: 'bec059b9', above: '47369265', on: '2026-11-07' }
});
