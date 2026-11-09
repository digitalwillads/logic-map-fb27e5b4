// The In motion module, added on 2026-11-08 (Will: "IN the logic map le's add the rest of step 1 modules."). Code answers
// it with no model, first on every module run, and the four campaign modules and Decide read it. Drawn as it works today,
// from comm-chat at origin/main 1c24d43a (read 2026-11-08): src/modules/mod.rs:155-167 (its entry: by code, no needs, no
// check, no words), :59 (an answer counts 7 days), :119 (the campaign modules and Decide need it); src/modules/brief/code.rs
// :162-203 (`in_motion`: the list, the counts as its summary, the verdict, what would prove it wrong), :100-160
// (`cases_moving`), :38-65 (`task_words`); src/modules/day.rs:255-263 (a module run answers it first), :172-173 (a problem
// makes Decide run); src/modules/brief/paused.rs (what touches only a paused campaign stays out); src/chat/tools/
// module_tools.rs:391-399 (a read of a code module saves a new answer); off in live since Nov 7: docs/claude-code-bridge-
// setup.md:2260-2264. Real cases, read 2026-11-08: Barbara's In motion answers of Nov 1 (Bull 1, C2 3 and 49, Kogalla 15)
// and Bull's Decide answer 58, with module_brief and answer_id; in a copy of Barbara's data from Nov 3 (barbara-local,
// read-only), KDX's cases #20, #49, #196, #204 and #253 (the run that ended Will's $42 test 6 days early) and case #178
// (Will's reply "I decide the $42 test."). Its history: git 7e2ac44c (built, Oct 31 9:17 PM ET), a22712e2 (paused
// campaigns), c5e2d960 (teammates' words), 45ecee7c (missed checks), 19423761 (the module run merged, Nov 6).
LOGIC.flow({
  id: 'motion',
  title: 'The In motion module', short: 'In motion module', status: 'Built; off in live until Will says yes',
  head: 'For the whole account, the In motion module lists what is already under way, so no module starts it again or works against it',
  chart: [
    'flowchart TB',
    'WHEN(["Every morning, before any AI<br/>starts, code reads the cases,<br/>tasks and change history"]):::code',
    'PAUSED["Code leaves out what touches<br/>only a paused campaign, unless<br/>a plan or a person’s recent<br/>pause keeps it"]:::code',
    'CASES["From the open cases, each test,<br/>each change that missed its<br/>check, each question and each<br/>follow-up that is due"]:::code',
    'PEOPLE["People’s changes of the last<br/>{motionChanges} days, and their words<br/>on the client’s open tasks"]:::code',
    'TOLD["What we told the client, copied<br/>from the client module’s<br/>newest answer"]:::code',
    'VERDICT{"Is a follow-up overdue,<br/>or did a change<br/>miss its check?"}:::code',
    'PROBLEM(["A problem, so the Decide<br/>module runs that morning"]):::block',
    'GOOD(["Good, even when many<br/>questions still wait for<br/>a person to answer"]):::keep',
    'GIVE(["The campaign modules see<br/>only the counts, and the<br/>Decide module reads every line"]):::code',
    'BLIND["Words said in Slack, a meeting<br/>or a call never reach the list"]:::next',
    'WHEN --> PAUSED', 'PAUSED --> CASES', 'CASES --> PEOPLE', 'PEOPLE --> TOLD', 'TOLD --> VERDICT',
    'VERDICT -- yes --> PROBLEM', 'VERDICT -- no --> GOOD',
    'PROBLEM --> GIVE', 'GOOD --> GIVE',
    'BLIND -. "not built" .-> PEOPLE'
  ],
  links: { WHEN: 'mwhen', PAUSED: 'mpaused', CASES: 'mcases', PEOPLE: 'mpeople', TOLD: 'mtold', VERDICT: 'mverdict', PROBLEM: 'mverdict', GOOD: 'mverdict', GIVE: 'mgive', BLIND: 'mblind' },
  leaves: {
    mwhen: 'Every morning, before any AI starts',
    mpaused: 'What touches only a paused campaign',
    mtold: 'What we told the client',
    mverdict: 'When the list is a problem',
    mblind: 'What the list cannot see'
  },

  // Each slide belongs to one view: the module's own slides first, then the slides of its rules.
  deck: [
    { about: ['motion'], kicker: 'The idea',
      head: 'A run once ended Will’s own test 6 days early, because nothing in front of it said the test was running',
      visual: { type: 'flow', rows: [
        { title: 'KDX’s DWA NonBrand campaign', steps: [
          ['Will tests a $42 target', 'from Oct 23, to be read on Nov 6', 'will'],
          ['Yasir agrees to hold $42 until Nov 6', 'Oct 27', 'will'],
          ['A run raises the target to $60 on its own', 'Oct 31, 2:56 PM ET', 'block']],
          end: [['The test ends 6 days early', 'and putting $42 back now waits on Will', 'block']] },
        { title: 'That night, 9:17 PM ET', steps: [['The In motion module is built, so code lists each test, each question and each person’s change', 'before any AI starts', 'code']],
          end: [['The campaign modules and the Decide module get the list before they answer', '', 'keep']] }] },
      vcap: 'The run saw that the $42 target held the campaign back, and the raise stayed inside the spend limits Will had set, so no check stopped it. But nothing in front of the run said that a test was running there, or that Yasir had agreed to hold the target. The In motion module is the list that says so.',
      quote: ['I decide the $42 test.', 'Oct 31'] },
    { about: ['motion'], kicker: 'What it lists',
      head: 'The list holds seven kinds of things, taken from the open cases, the tasks and the change history',
      visual: { type: 'gate', rows: [
        ['A test', 'A change that went out, with its follow-up days, the day its test ends and what it waits for.', 'pass'],
        ['A change that missed its check', 'A check failed after the change went out, and the change is still on the account.', 'stop'],
        ['A question for a person', 'Whom the case waits on, since when, and what the answer decides.', 'pass'],
        ['A follow-up that is due', 'Or one whose day passed with no score, which is overdue.', 'hold'],
        ['What we told the client', 'Copied from the client module’s newest answer.', 'pass'],
        ['A teammate’s word on an open task', 'Each comment of the last {motionWords} days, cut to its first {motionWordChars} characters.', 'pass'],
        ['A person’s change', 'Each change of the last {motionChanges} days, with who made it and why.', 'pass']],
        end: ['One list, with the counts as its summary', 'code'] },
      vcap: 'Code writes the lines in this order every time, with the people’s changes last and the newest first. An overdue follow-up and a change that missed its check are the only two things that turn the list into a problem.' },
    { about: ['motion'], kicker: 'A real list · C2 · Nov 1',
      head: 'C2’s list of Nov 1 held 29 questions for Will and 18 people’s changes, and no test',
      visual: { type: 'card', title: 'The In motion module on C2, in a test on Nov 1', fields: [
        ['Its summary', '0 tests run, 29 questions wait on a person, 18 people’s changes and 0 follow-ups are due.'],
        ['One question', 'Case #58 had asked Will since Oct 28 whether the run could publish one Tag Manager version with both fixes.'],
        ['One change', 'On Oct 30 Isaac cut LA + New York from $200 to $150 a day, during his call with Waylon.'],
        ['What we told the client', 'The client module’s summary of that morning, which begins with what Waylon wants.'],
        ['Its verdict', 'Good, because no follow-up was late and no change had missed its check.']],
        stamp: ['29 questions wait on Will', 'will'] },
      vcap: 'This list came from a test, because no live morning has run the module yet. Its summary is all that the campaign modules would see of it.',
      stats: [['29', 'questions that waited on Will', 'real'], ['18', 'people’s changes in the last {motionChanges} days', 'real'], ['0', 'tests running', 'real']] },
    { about: ['motion'], kicker: 'Where it runs',
      head: 'The In motion module answers first each morning, beside Money, and only the campaign modules and the Decide module read it',
      visual: { type: 'flow', rows: [
        { title: 'First, by code', steps: [['The follow-ups that are due get today’s scores', '', 'code'], ['Code answers In motion and Money', 'with no AI', 'code']], end: [['Both answers are saved', 'before any Opus starts', 'code']] },
        { title: 'Then the whole account', steps: [['Tracking, the client module, and Setup and market', 'one Opus each, when it is due', 'opus']], end: [['None of them reads the list', '', 'code']] },
        { title: 'Then each campaign, and last the Decide module', steps: [['The four campaign modules and the Decide module', 'each needs a list from the last {motionFresh} days', 'opus']], end: [['They get the list before they answer', '', 'keep']] }] },
      vcap: 'A quiet morning with nothing new still makes the list. Then no module helper starts, unless the list or Money finds a problem, but the runâs own Opus thread still does its first pass and its paperwork.',
      quote: ['What if I make the checking system modular?', 'Oct 31'] },
    { about: ['motion'], kicker: 'Status · Nov 8',
      head: 'The module is built and has run in tests on three clients, but no live morning runs it until Will says yes',
      visual: { type: 'timeline', items: [
        ['Oct 31, 2:56 PM ET', 'A run raises KDX’s NonBrand target from $42 to $60, and Will’s test ends 6 days early.'],
        ['Oct 31, 9:17 PM ET', 'The In motion module is built. It lists each test, each question for a person, each follow-up that is due, each person’s change, and what we told the client.'],
        ['Nov 1, 1:34 AM ET', 'It leaves out what touches only a paused campaign, unless a plan or a person’s recent pause keeps it.'],
        ['Nov 1, about 3 AM ET', 'Tests on Bull Legal, C2 and Kogalla save its first lists, and all three are good.'],
        ['Nov 1, 10:13 AM ET', 'It adds each teammate’s word on an open task, because Yasir’s hold on Bull’s bids lived only in a task comment.'],
        ['Nov 1, 7:36 PM ET', 'It adds each change that missed its check, because KDX’s case #6 had sat since Oct 26 with no list showing it.'],
        ['Nov 4', 'Module runs take the place of the morning run, and the In motion module answers first on each one.'],
        ['Nov 6 and Nov 7', 'The module run is merged, and from Nov 7 it stays off in live until Will tests it and says yes to its cost.']] },
      vcap: 'In live, a person can still run it under Validators and then Modules, and code answers at once. Every list on this map comes from the tests of Nov 1, or from a test on a copy of Barbara’s data.',
      quote: ['we should just run it yes?', 'Nov 4'] },

    { about: ['mwhen'], kicker: 'Every morning, first',
      head: 'Code makes the list fresh each time, so it needs no reason to run and keeps no memory of yesterday',
      visual: { type: 'flow', rows: [
        { title: 'A morning module run', steps: [['The follow-ups that are due get today’s scores', 'from the verifiers', 'code'], ['Code makes the list and saves it', 'on that run', 'code']], end: [['Then the modules that are due start', '', 'opus']] },
        { title: 'A test, under Validators and then Modules', steps: [['A person picks In motion and one client', '', 'will']], end: [['Code makes the list at once and saves it', '', 'code']] },
        { title: 'A test of a campaign module', steps: [['The last list is {motionFresh} days old', '', 'code']], end: [['The test makes a new list first', '', 'code']] }] },
      vcap: 'Even a read of the In motion module through Barbara’s module tool saves a new list, because for a code module the answer is made at the moment someone asks for it. The list never reads its own last answer, so each morning starts from Barbara’s tables alone.' },

    { about: ['mpaused'], kicker: 'Paused campaigns',
      head: 'What touches only a paused campaign stays off the list, because nothing moves on a campaign that does not run',
      visual: { type: 'flow', rows: [
        { title: 'Left out', steps: [['A test negative on Midwest Targeting', 'paused, and no plan would turn it on', 'code']], end: [['Off the list', '', 'wait']] },
        { title: 'Kept, because a plan would turn it on', steps: [['A case that would turn DWA Competitors back on', 'its change has not gone out yet', 'code']], end: [['That campaign stays on the list', '', 'keep']] },
        { title: 'Kept, because a person paused it lately', steps: [['Yasir pauses DWA Competitors', 'within the last {motionChanges} days', 'code']], end: [['The pause stays on the list', '', 'keep']] }] },
      vcap: 'KDX has 10 campaigns, and 8 of them are paused. These three rows come from code’s own tests on KDX’s campaigns. A campaign that Barbara’s campaign map does not know counts as running, so nothing about it is left out.',
      quote: ['lets get the logic in there so that we are dealing with paused campaigns properly and not reading them when they don\'t need to be read', 'Nov 1'] },

    { about: ['mtold'], kicker: 'What we told the client',
      head: 'The list copies the client module’s whole summary under the name “What we told the client”',
      visual: { type: 'timeline', items: [
        ['Nov 1, 3:13 AM ET', 'The In motion module makes C2’s first list. That line says “What we told the client is not listed: The client has no answer yet.”'],
        ['Nov 1, 4:07 AM ET', 'In a test, the client module writes its first answer for C2.'],
        ['Nov 1, 4:08 AM ET', 'The next list copies that whole summary. It says what Waylon wants, what he last said, and that two things we told him on Oct 27 are not true now.']] },
      vcap: 'The client module’s answer has no line of its own for what we told the client, so the list copies the whole summary. The Decide module already reads that same summary, so this line adds nothing new for it.' },

    { about: ['mverdict'], kicker: 'Good or a problem',
      head: 'The list turns into a problem only when a follow-up is overdue or a change has missed its check',
      visual: { type: 'gate', rows: [
        ['A follow-up is overdue', 'Its day passed and no score came, so nobody knows yet if the change worked.', 'stop'],
        ['A change missed its check', 'A check failed after the change went out, and the change is still on the account.', 'stop'],
        ['Many questions wait on a person', 'On Nov 1, 29 questions waited on Will at C2, and the list stayed good, because putting that queue in order is the Decide module’s job.', 'pass'],
        ['A test is running', 'That is normal work, so the list stays good.', 'pass']],
        end: ['A problem makes the Decide module run that morning, even when nothing else is due', 'block'] },
      vcap: 'The list is only ever good or a problem, and it never proposes a fix. Its summary gives only the counts, and the lines under it say what each one is.',
      quote: ['I want decides ask to become the quene (you mean cases yes?) but I don\'t want it limited to 3.', 'Nov 1'] },

    { about: ['mblind'], kicker: 'What it cannot see',
      head: 'The list sees only what Barbara stores, so a word said in Slack, a meeting or a call never reaches it',
      visual: { type: 'flow', rows: [
        { title: 'C2, Oct 30', steps: [['Isaac and Waylon talk on a call', 'nothing records what they agreed', 'will'], ['Isaac cuts LA + New York to $150 a day and caps each click at $7', 'during the call', 'code']], end: [['The list shows both changes, but not what was agreed', '', 'block']] }] },
      vcap: 'On Nov 1 one of C2’s questions still asked Will if the run could ask Isaac on Slack what Waylon agreed to on that call. Until someone writes it down where Barbara reads, no module can see it.' },
    { about: ['mblind'], kicker: 'What would prove it wrong',
      head: 'With every list, code saves the same three blind spots, the things that could prove the list wrong',
      visual: { type: 'gate', rows: [
        ['A teammate’s word in Slack or a meeting', 'No case, task or change history holds it.', 'hold'],
        ['A client’s own change on a platform Barbara does not read', '', 'hold'],
        ['A change made after the morning’s read', 'It shows up on the next morning’s list.', 'hold']],
        end: ['The next morning, code makes the list again from scratch', 'code'] },
      vcap: 'No AI tests these blind spots the next morning, because a code module keeps no memory of its last answer. It simply makes the list again.' }
  ],

  examples: {
    WHEN: { tag: 'real', rows: [{ steps: [['C2, Nov 1, 3:13 AM ET', 'a test of the module', 'will'], ['Code makes the list for C2, with no AI', '', 'code']], end: [['C2’s first list is saved', '29 questions and 18 people’s changes', 'code']] }], note: 'We took this from C2’s first In motion answer, saved in a test on Nov 1. No live morning has made a list yet, because the module run is off in live.' },
    PAUSED: { tag: 'made', rows: [{ steps: [['KDX has 8 paused campaigns', 'out of 10', 'code'], ['A test negative on Midwest Targeting', 'paused, and no plan would turn it on', 'code']], end: [['Off the list', '', 'wait']] }], note: 'We made this up from KDX’s real campaigns, because no list was ever saved for KDX.' },
    CASES: { tag: 'real', rows: [{ steps: [['C2’s open cases, Nov 1', '', 'code'], ['29 of them wait on Will', 'and none is a test', 'will']], end: [['0 tests, 29 questions and 0 follow-ups due', '', 'code']] }], note: 'We took this from the list that the In motion module made for C2 in a test on Nov 1.' },
    PEOPLE: { tag: 'real', rows: [{ steps: [['Bull’s change history, Oct 18 to Nov 1', '', 'code'], ['Yasir’s keywords, ads and budget', 'on Oct 22 and Oct 28', 'code']], end: [['18 changes by people, and no words from tasks', 'because code began to read task comments later that day', 'code']] }], note: 'We took this from the list that the In motion module made for Bull in a test on Nov 1.' },
    TOLD: { tag: 'real', rows: [{ steps: [['C2’s first list on Nov 1, at 3:13 AM ET', '“What we told the client is not listed”', 'code'], ['The client module answers C2', 'in a test, at 4:07 AM ET', 'opus']], end: [['The next list copies its whole summary', '', 'code']] }], note: 'We took this from the lists that the In motion module made for C2 on Nov 1, the first one and the later ones.' },
    VERDICT: { tag: 'real', rows: [{ steps: [['C2, Nov 1', 'no follow-up overdue, and no change that missed its check', 'code']], end: [['Good', 'with 29 questions waiting on Will', 'keep']] }], note: 'We took this from the list that the In motion module made for C2 in a test on Nov 1.' },
    PROBLEM: { tag: 'made', rows: [{ steps: [['KDX’s case #6', 'its check failed on Oct 26, and the change is still on the account', 'block'], ['It goes on the list', 'as a change that missed its check', 'code']], end: [['A problem, so the Decide module runs', 'and must say keep it, undo it or try another way', 'block']] }], note: 'We made this up from KDX’s real case #6, because no list was ever saved for KDX.' },
    GOOD: { tag: 'real', rows: [{ steps: [['The lists of Bull, C2 and Kogalla on Nov 1', '19, 29 and 31 questions wait on a person', 'will']], end: [['All three lists are good', '', 'keep']] }], note: 'We took this from the three lists that the In motion module made in the tests of Nov 1.' },
    GIVE: { tag: 'real', rows: [{ steps: [['Bull’s list of Nov 1', '19 questions and 18 people’s changes', 'code'], ['The Decide module reads the list', 'and it also reads mail and cases by itself', 'opus']], end: [['Each change it proposed names what is under way', 'such as Yasir’s hold of Oct 28 on bids and budgets', 'opus']] }], note: 'We took this from the answer that the Decide module wrote for Bull in a test on Nov 1. The Decide module found Yasir’s hold in his mail, because the list had no line for it.' },
    BLIND: { tag: 'plan', rows: [{ steps: [['Isaac’s call with Waylon, Oct 30', 'what they agreed is in no record', 'next'], ['A written note of the call reaches the list', '', 'next']], end: [['The list shows what was agreed beside the changes', '', 'next']] }], note: 'Not built. Today nothing writes down what a call or a Slack message agreed, so the list cannot hold it.' }
  },

  reviewed: { self: '6f4ab372', above: '2525099a', on: '2026-11-08' }
});
