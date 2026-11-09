// How a module run ends. comm-chat at origin/main 1c24d43a, read 2026-11-08: src/claude_code_jobs.rs:521-522 (the
// paperwork, the client's story last, then write_run_report with Decide's first 3), :595-630 (the CRM step and the story's
// steps), :4712-4741 (`finish_ask`: once, what is left of Decide's answer, in its order; a report written already is
// written again), :4635-4670 (the look back: recipes, skill updates, tool requests), :4606-4626 (`case_check_ask`: each item of
// the report that waits on a person names an open case), :5507-5530 (`module_run_action`: wait while it works, one finish
// ask, then the end once the report is written; never DECISIONS, research, the manager's step or the cases ask), :5808-5813
// (a dry run closes with no look back), :6331-6333 (MODULE_STALL_MS: 4 hours), :6517-6582 (the stall watch: it asks the
// computer once, nudges once, then closes the thread as stuck); src/modules/finish.rs:37-71 (`left`: an item is acted on once
// the run touched its case or its case waits on a person; an item with no case takes a case the run opened, "shortcut:
// counts, not matches"); src/modules/day.rs:213-222 (a quiet day: no CRM step and no story); src/run_report/mod.rs:107-108
// (DECISIONS_MAX 3); docs/claude-code-bridge-setup.md:2272-2287 (how it ends, dry run 259 closed before Decide, the Story
// tab); docs/superpowers/specs/2026-11-04-modules-in-the-daily-run-design.md:137-148 (the paperwork and Jev's end), :174-179
// (what Will sees). Real case: the dry run 260 of C2 (instances/modrun2/barbara.db, immutable=1: its 22 turns, the finish
// ask after turn 21 at 3:36 AM ET, "concluded ... thread closed" at 4:03 AM, its report written at 4:03 AM with 7 waits on
// Will; answers 74 to 90, 15 of 16 lines in by 12:33 AM and the last at 2:15 AM; its transcript: the story's helper at 2:53
// AM, no weekly report due).
LOGIC.flow({
  id: 'runend', parent: 'morning',
  title: 'How the run ends', short: 'How the run ends',
  head: 'The run ends with its paperwork and its report, Jev makes sure that no item of Decide’s answer is forgotten, and the run looks back before it closes',
  chart: [
    'flowchart TB',
    'PAPER["The run updates the client’s<br/>record, and helpers write the<br/>weekly report and the story"]:::opus',
    'REPORT["The run writes its report,<br/>and the report keeps Decide’s<br/>first {runDecisions} decisions"]:::code',
    'WORK{"Is a helper<br/>still working?"}:::code',
    'WAIT(["Jev waits for the<br/>next turn"]):::code',
    'STALL(["After {runStall} hours with no turn,<br/>the thread closes as stuck"]):::block',
    'LEFT{"Has the run left an item<br/>of Decide’s answer<br/>untouched?"}:::code',
    'FINISH(["Jev asks the run once to<br/>carry out each item<br/>that is left"]):::code',
    'LOOK(["The run looks back for tools<br/>and recipes that would have<br/>made it easier"]):::opus',
    'CASES{"Does an item that waits on<br/>a person still have no case?"}:::code',
    'FILE(["Jev asks the run to put<br/>each one on its case"]):::code',
    'CLOSE(["The tab closes"]):::keep',
    'PAPER --> REPORT', 'REPORT --> WORK',
    'WORK -- yes --> WAIT', 'WAIT -. "no turn comes" .-> STALL',
    'WORK -- no --> LEFT',
    'LEFT -- yes --> FINISH', 'FINISH -. "its next turn" .-> WORK',
    'LEFT -- no --> LOOK', 'LOOK --> CASES',
    'CASES -- yes --> FILE', 'CASES -- no --> CLOSE', 'FILE --> CLOSE'
  ],
  links: { PAPER: 'rnpaper', REPORT: 'rnreport', WORK: 'rnwait', WAIT: 'rnwait', STALL: 'rnwait', LEFT: 'rnfinish', FINISH: 'rnfinish', LOOK: 'rnlook', CASES: 'rnlook', FILE: 'rnlook' },
  leaves: {
    rnpaper: 'The paperwork',
    rnreport: 'The run’s report',
    rnwait: 'While helpers work',
    rnfinish: 'The items of Decide’s answer that are left',
    rnlook: 'The look back and the case check'
  },

  // Each slide belongs to one view: the part's own slides first, then one or more for each rule.
  deck: [
    { about: ['runend'], kicker: 'The idea',
      head: 'A module run ends only after it writes its report, because Jev once closed a dry run while its helpers were still working',
      visual: { type: 'flow', rows: [
        { title: 'An earlier dry run of C2, Nov 4', steps: [['Thirteen module helpers are still working', '', 'opus'], ['Jev scores the turn as no longer working', 'a score of 0.34', 'code']], end: [['The tab closes before Decide answers', '', 'block']] },
        { title: 'Since then', steps: [['Until the report is written, the run keeps working', '', 'code'], ['The run writes its report last', '', 'code']], end: [['Only then can the run end', '', 'keep']] }] },
      vcap: 'The next dry run that night reached Decide and the end, and it closed at 4:03 AM. A run’s report is its last step, whether the run is real, dry or quiet.' },
    { about: ['runend'], kicker: 'What Will sees',
      head: 'After the run, Will reads its answers, its finished changes and its report, each in its own place',
      visual: { type: 'gate', rows: [
        ['Validators, then Modules', 'Each module’s answer, which he can mark right or wrong.', 'pass'],
        ['Cases, then Check these', 'Each finished change, as slides.', 'pass'],
        ['To approve', 'Each change that his switches or his hold keep for him.', 'hold'],
        ['The run’s page', 'Its report, with Decide’s first {runDecisions} decisions and what went out.', 'pass']],
        end: ['Each question for him waits on its own case', 'will'] },
      vcap: 'The design’s aim is fewer questions for Will, each one a step that only he can take, with a link that does it in one click.' },

    { about: ['rnpaper'], kicker: 'The paperwork',
      head: 'Last, the run updates the client’s record, and helpers write the client’s story and, on its day, the weekly report',
      visual: { type: 'flow', rows: [
        { steps: [['The client’s record', 'it changes only when its check passes', 'code'], ['The weekly report', 'only on the day that it is due', 'opus'], ['The client’s story', 'always last', 'opus']],
          end: [['Then the run writes its report', '', 'code']] }] },
      vcap: 'A quiet morning writes no story, because no module answered. A story that cannot pass its check goes in the run’s report, and it is never a reason to skip the story.' },

    { about: ['rnreport'], kicker: 'The run’s report',
      head: 'Every module run writes its report last, even a dry run or a quiet one, and that report marks its end',
      visual: { type: 'card', title: 'The report of the dry run of Nov 4', fields: [
        ['Its headline', 'Dry run: Google runs 21% over the $500 target, and Waylon is owed his report and a true word on Facebook. Nothing changed.'],
        ['Its decisions', 'The first {runDecisions} of Decide’s decisions, in Decide’s order.'],
        ['What waits on Will', '7 items.']],
        stamp: ['Written at 4:03 AM', 'code'] },
      vcap: 'The run reads the account scorecard before it writes the report, because the report waits for that read. When the run writes its report again, the new report replaces the old one, so later work still gets into it.' },

    { about: ['rnwait'], kicker: 'While helpers work',
      head: 'Jev waits while any helper works, because one helper took about two hours in the dry run',
      visual: { type: 'timeline', items: [
        ['12:00 AM', 'Sixteen campaign helpers start at once.'],
        ['12:33 AM', 'Fifteen of them have answered.'],
        ['2:15 AM', 'Search terms and reach on LA + New York answers last.'],
        ['After {runStall} hours with no turn', 'Code asks the computer once what the thread is doing, nudges it once, and then closes it as stuck.']] },
      vcap: 'While the helpers work, the run’s own thread looks idle to the server, so the wait is long on purpose. A run of the old kind gets one hour.' },

    { about: ['rnfinish'], kicker: 'What is left',
      head: 'Jev checks once which items of Decide’s answer the run has not touched, and asks the run to carry them out',
      visual: { type: 'flow', rows: [
        { title: 'At 3:36 AM in C2’s dry run', steps: [['Decide’s answer held 26 items', '18 proposals and 8 asks', 'opus'], ['17 of them had no step from the run', '', 'code']], end: [['Jev asked once, and the run said that a dry run changes nothing', '', 'code']] }] },
      vcap: 'An item counts as done once the run touched its case, or once its case waits on a person. If an item has no case yet, code can only count the new cases that the run opened. So a new case for one item can make a different item look done.' },

    { about: ['rnlook'], kicker: 'The look back',
      head: 'Before the tab closes, the run looks back for what would have made it easier, and Jev checks that each wait has a case',
      visual: { type: 'gate', rows: [
        ['A recipe', 'A sequence of tools that worked.', 'pass'],
        ['A skill update', 'Something learned about how we work.', 'pass'],
        ['A tool request', 'A gap that no tool covers, or a tool that misbehaved.', 'pass'],
        ['The case check', 'Each item of the report that waits on a person must name an open case.', 'hold']],
        end: ['Then the tab closes', 'keep'] },
      vcap: 'A dry run changes nothing and files nothing, so it closes with no look back. A tool request goes to Jacob, never to Will.' }
  ],

  examples: {
    PAPER: { tag: 'real', rows: [{ steps: [['The client’s story, 2:53 AM', 'one helper writes it, marked as a dry run', 'opus']], end: [['Then the run writes its report, at 4:03 AM', '', 'code']] }], note: 'This is from C2’s dry run of Nov 4. No weekly report was due that night, so no helper wrote one.' },
    REPORT: { tag: 'real', rows: [{ steps: [['The report of the dry run', 'Google runs 21% over the $500 target', 'code']], end: [['7 items wait on Will', '', 'will']] }], note: 'This is the report that C2’s dry run of Nov 4 wrote on a copy of Barbara.' },
    WORK: { tag: 'real', rows: [{ steps: [['12:33 AM', '15 of the 16 campaign lines have answered', 'opus']], end: [['Jev waits for Search terms and reach on LA + New York', '', 'code']] }], note: 'This is from C2’s dry run of Nov 4, which ran on a copy of Barbara and changed nothing.' },
    WAIT: { tag: 'real', rows: [{ steps: [['The last helper answers at 2:15 AM', 'after about two hours', 'opus']], end: [['Then Decide starts', '', 'opus']] }], note: 'This is from C2’s dry run of Nov 4, which ran on a copy of Barbara and changed nothing.' },
    STALL: { tag: 'made', rows: [{ steps: [['A thread stops, with no turn', '', 'block'], ['{runStall} hours pass', 'code asks the computer once and nudges it once', 'code']], end: [['It closes as stuck', '', 'block']] }], note: 'We made this up from the rule in code, because no module run has stalled that long.' },
    LEFT: { tag: 'real', rows: [{ steps: [['3:36 AM', 'the run left 17 of Decide’s 26 items untouched', 'code']], end: [['Jev asks the run once to carry them out', '', 'code']] }], note: 'This is from C2’s dry run of Nov 4, which ran on a copy of Barbara and changed nothing.' },
    FINISH: { tag: 'real', rows: [{ steps: [['Jev’s ask', 'carry out each item now, in Decide’s order', 'code']], end: [['The run says that a dry run changes nothing', '', 'code']] }], note: 'This is from C2’s dry run of Nov 4, which ran on a copy of Barbara and changed nothing.' },
    LOOK: { tag: 'made', rows: [{ steps: [['A real run ends its work', '', 'code'], ['It looks back over the whole thread', '', 'opus']], end: [['It saves what it learned in Barbara, as a recipe or a tool request for Jacob', '', 'keep']] }], note: 'We made this up, because C2’s dry run of Nov 4 closed with no look back, as every dry run does.' },
    CASES: { tag: 'made', rows: [{ steps: [['An item of the report waits on Will', 'with no case', 'will']], end: [['Jev asks the run to file it', '', 'code']] }], note: 'We made this up from the rule in code, because a dry run skips the case check.' },
    FILE: { tag: 'made', rows: [{ steps: [['The run asks Will on the item’s case', '', 'code']], end: [['The report names the case', '', 'keep']] }], note: 'We made this up from the rule in code, because a dry run skips the case check.' },
    CLOSE: { tag: 'real', rows: [{ steps: [['4:03 AM', 'the dry run’s last turn', 'code']], end: [['The tab closes', '', 'keep']] }], note: 'This is from C2’s dry run of Nov 4, which ran on a copy of Barbara and changed nothing.' }
  },

  reviewed: { self: '278a9469', above: '2525099a', on: '2026-11-08' }
});
