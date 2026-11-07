// Jev checks every Opus call. Measured on the Nov 5 blind Opus runs, then built in the new project (Nov 6); not live yet.
LOGIC.flow({
  id: 'jev', parent: 'waterfall',
  title: 'Jev checks Opus', short: 'Jev checks', status: 'Built Nov 6, not live yet',
  head: 'Jev checks each Opus call. Doubtful calls wait for Will.',
  chart: [
    'flowchart LR',
    'O["Opus\'s call"]:::opus',
    'J1{"Jev picks keep<br/>or a negative,<br/>blind to Opus"}:::code',
    'J2{"Does the quote<br/>back each<br/>new fact?"}:::code',
    'H["Held for<br/>Will\'s review"]:::will',
    'REC(["The record"]):::code',
    'O --> J1', 'J1 -- "{jline} or more" --> J2', 'J1 -- "under {jline},<br/>or unclear" --> H',
    'J2 -- yes --> REC', 'J2 -- no --> H', 'H -- "Will\'s answer<br/>is the verdict" --> REC'
  ],
  links: { J1: 'j1', J2: 'quotecheck' },
  leaves: {
    j1: 'Jev’s blind call',
    quotecheck: 'The quote check'
  },

  deck: [
    { about: ['jev'], kicker: 'Why',
      head: 'Without a check, nobody sees when Opus would call a search the other way',
      visual: { type: 'dots', groups: [[25, 'wait', 'got a different call the second time'], [119, 'code', 'got the same call']] },
      vcap: 'Two Opus runs with the same prompt, on 144 C2 searches. A second, blind judge catches these splits.',
      quote: ["I feel like there are no checks on opus. Can we have a jev check that gives a confidence intervel and then if it's below it gets added in a review step for humans?", 'Nov 4'] },
    { about: ['quotecheck'], kicker: 'The quote check',
      head: 'The saved quote must back the fact',
      visual: { type: 'card', title: 'A new fact, before it is saved', fields: [['Fact', 'C2 does radio promotion.'], ['Source', 'Waylon, calls of Sep 9 and Sep 17'], ['Exact words', 'the words from the call']], stamp: ['Does the quote back the fact? Under {jquote}: not saved', 'next'] },
      vcap: 'A fact that fails the quote check is not saved, and its search waits for Will.' },
    { about: ['jev'], kicker: 'Will’s review',
      head: 'A held search gets no negative until Will answers',
      visual: { type: 'flow', rows: [{ steps: [['A held search', 'Jev under {jline}, or unclear', 'will'], ['No negative goes out', '', 'code'], ['Will answers on the case', '', 'will']], end: [['His answer is the verdict', '', 'keep'], ['His reason becomes a fact', '', 'opus']] }] },
      quote: ['unclear should go to the review too', 'Nov 4'] },
    { about: ['jev'], kicker: 'The lines',
      head: 'Measured on real Opus calls, then set by Will: {jline} for the blind call, {jquote} for the quote check',
      visual: { type: 'flow', rows: [{ steps: [['The Nov 5 blind Opus runs', '144 C2 searches', 'opus'], ['Jev measured', 'Nov 6: 19 requests, under one cent', 'next'], ['Will set the lines', '{jline} and {jquote}, one per request, Nov 6', 'will']], end: [['Built Nov 6', 'in the new project; not live yet', 'code']] }] },
      vcap: 'The measurement ran in the new project. Built there on Nov 6: the hold, the review list and the research-note check. Built Nov 7: they run for every client.' },

    { about: ['j1'], kicker: 'Jev’s blind call',
      head: 'Jev judges each search blind, then scores Opus’s side',
      visual: { type: 'flow', rows: [{ steps: [['Opus’s call', 'hidden from Jev', 'opus'], ['Jev judges alone', 'keep, or a negative here', 'next'], ['Jev’s score for Opus’s side', 'the confidence', 'next']], end: [['{jline} or more: it stands', '', 'keep'], ['Under {jline}: waits for Will', '', 'will']] }] },
      vcap: 'Each campaign is judged on its own, so the call is keep or a negative (Will, Nov 7: no routing).',
      quote: ['also this logic would change if we are doing to campaign by campaign no?', 'Nov 4'] },
    { about: ['j1'], kicker: 'Jev, or a bigger model?',
      head: 'Jev is measured on real Opus calls first. Then Will decides if a bigger model is needed.',
      visual: { type: 'flow', rows: [
        { title: 'Measure first', steps: [['The Nov 5 blind Opus runs', '144 C2 searches, each judged twice', 'opus'], ['Jev judges the same searches', 'blind to Opus', 'next']], end: [['How often Jev agrees', 'then set the line, or add a bigger model', 'will']] },
        { title: 'Your idea', steps: [['Jev is sure', 'most searches', 'next'], ['Jev is not sure', 'the strange ones', 'next']], end: [['A bigger model on those only', 'an OpenAI one, for example', 'next']] }] },
      vcap: 'Will, Nov 6: measure Jev on the Nov 5 blind Opus runs first, then decide. A bigger model on every Opus call would cost the most; on only the searches Jev is not sure of, it costs little.',
      quote: ['Is JEV good enough? Maybe we have open AI on the weird things.', 'Nov 6'] },
    { about: ['j1'], kicker: 'The measurement · Nov 6',
      head: 'At 0.80 Jev would hold two of every three Opus calls for Will. At 0.30, about one in eight.',
      visual: { type: 'bars', max: 144, rows: [
        { label: 'Held at 0.80, as designed', parts: [[93, 'will', '93 of 144']] },
        { label: 'Held at 0.50', parts: [[47, 'will', '47 of 144']] },
        { label: 'Held at 0.30', parts: [[17, 'will', '17 of 144']] }] },
      vcap: 'The new-prompt run of Nov 5. Names cause most holds: Jev knows no fact about a name, so it stays near the middle (at 0.80 it holds 57 of 65 company names). At 0.30 it holds 10 of the 25 searches two Opus runs split on, and 11 of the other 119. Jev read the campaign’s whole card, which says where rival names go: Claude’s call. Will first picked 0.30; after the measurement with one search per request, {jline}.' },
    { about: ['j1'], kicker: 'Built · Nov 6',
      head: 'Jev’s score moves with the other searches in its request',
      visual: { type: 'scale', label: 'Jev’s score for Opus’s block of “independent radio promoters”',
        lines: [['{jline}', 'the line: {jline}', 'will']],
        dots: [[0.21, 'among ten searches', 'block'], [0.34, 'alone, first ask', 'block'], [0.37, 'alone, second ask', 'block'], [0.37, 'with two others', 'block'], [0.28, 'one per request, ask 1', 'block'], [0.36, 'one per request, ask 2', 'block']],
        zones: [[0, '{jline}', 'Held for Will', 'will'], ['{jline}', 1, 'The block stands', 'keep']] },
      vcap: 'Jev’s answers to the very same request also move by up to 0.07 between asks. Will, Nov 6: measure again with one search per request, then pick the line: measured the same night.' },
    { about: ['j1'], kicker: 'One search per request · Nov 6',
      head: 'With one search per request, Jev’s scores hold still, and 0.40 holds the radio block every time',
      visual: { type: 'bars', max: 144, rows: [
        { label: 'Line 0.20: held (ten a request: 9)', parts: [[13, 'will', '13 of 144']] },
        { label: 'Line 0.30: held (ten a request: 17)', parts: [[22, 'will', '22 of 144']] },
        { label: 'Line 0.40: held (ten a request: 31)', parts: [[31, 'will', '31 of 144']] },
        { label: 'Line 0.50: held (ten a request: 47)', parts: [[38, 'will', '38 of 144']] }] },
      vcap: 'The new-prompt run of Nov 5, one search per request. Asked twice, scores moved 0.03 on average and 0.11 at most; at 0.40 no call changed sides. Cost: about one cent; a file of 250 searches takes about 21 seconds. Will, Nov 6: “0.40, one search per request”.' },
    { about: ['quotecheck'], kicker: 'The measurement · Nov 6',
      head: 'At 0.50 the quote check rejects only the real misquotes',
      visual: { type: 'bars', max: 29, rows: [
        { label: 'Facts backed at 0.80', parts: [[16, 'keep', '16 of 29']] },
        { label: 'Facts backed at 0.50', parts: [[24, 'keep', '24 of 29']] }] },
      vcap: 'The 29 facts the Nov 5 research run saved. The 5 under 0.50 are real misquotes. Most facts between 0.50 and 0.80 are Waylon’s own words that do back the fact: Claude’s reading of the list. Will first picked 0.50; with one fact per request, {jquote}.' },
    { about: ['quotecheck'], kicker: 'One fact per request · Nov 6',
      head: 'With one fact per request, 0.30 holds only the misquotes',
      visual: { type: 'bars', max: 29, rows: [
        { label: 'Backed at 0.50, one fact per request', parts: [[20, 'keep', '20 of 29']] },
        { label: 'Backed at 0.30, one fact per request', parts: [[24, 'keep', '24 of 29']] }] },
      vcap: 'The 5 misquotes all score 0.26 or less, and the next fact scores 0.39. One setting sends searches and facts alike, so one per request moves both checks. Will, Nov 6: {jquote}.' }
  ],

  examples: {
    O: { tag: 'real', rows: [{ steps: [['symphony music marketing', 'a Nov 5 blind run', 'code'], ['Opus’s call', 'block', 'opus']], end: [['To Jev', 'Jev does not see the block', 'code']] }], note: 'The end-to-end run of Nov 6, on a copy of the record.' },
    J1: { tag: 'real', rows: [{ steps: [['symphony music marketing', 'Opus: block; Jev never sees it', 'opus'], ['Jev’s blind call', 'its score for the block: 0.21', 'code']], end: [['Under {jline}: held for Will', 'no negative goes out', 'will']] }], note: 'The end-to-end run of Nov 6, on a copy of the record.' },
    J2: { tag: 'real', rows: [{ steps: [['advertise your music', 'Opus: keep, with a new fact', 'opus'], ['Does the quote back it?', 'Jev: 0.19', 'code']], end: [['Under {jquote}: not saved, and the search waits for Will', '', 'will']] }], note: 'The end-to-end run of Nov 6, on a copy of the record. Jev agreed with the keep itself (0.91).' },
    H: { tag: 'real', rows: [{ steps: [['apple music advertising campaign', 'Opus: unclear', 'opus'], ['Held for Will', 'no negative goes out, and no run judges it again', 'will']], end: [['Will answers on the case', '', 'will']] }], note: 'The end-to-end run of Nov 6, on a copy of the record. An unclear is always held.' },
    REC: { tag: 'real', rows: [{ steps: [['Will’s answer', 'on the case', 'will'], ['The verdict', 'his answer stands', 'keep']], end: [['Off the review list', '', 'code']] }], note: 'The end-to-end run of Nov 6, on a copy of the record.' }
  },

  reviewed: { self: 'd5b79906', above: 'f9f28543', on: '2026-11-07' }
});
