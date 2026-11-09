// The lines and limits of each module, in the order of the module list. Write {name} in any text
// to show one of them.
// Change a number here and every page that shows it follows. The parts that use it turn out of date
// until someone reviews them (node stamp.cjs --check).
LOGIC.facts({
  // The search term module (~/Projects/search-terms src/lib.rs, read 2026-11-07). Clef's lines left with Clef, and
  // Jev's and DeepSeek's checks of Opus left with them (Will, Nov 7: "Don't say have another AI check. That's dumb.").
  batch: 50,      // BATCH: the searches in one batch that Opus judges, each with Google's page (250 before the pages)
  negBatch: 250,  // NEG_BATCH: the live negatives in one batch; they carry no page
  pageDollars: '0.002', // PAGE_DOLLARS: one Google page from DataForSEO, in dollars (text, so it shows three places)
  pageDays: 30,   // PAGE_DAYS: a kept Google page is read again for this many days; an older one is bought again
  pageRun: '1,000', // PER_RUN: a run buys at most this many pages, the costliest searches first
  qline: 0.50,    // the question check: a question for the client is refused when Jev's chance that the client's words or an open question already answer it is at or over this (Will, Nov 7)
  wideMax: 0.35,  // JEV_MAX: a phrase or broad negative passes when Jev's chance that a search holding its words is a customer is at or under this (wide.rs)
  maxChars: 80,   // a negative longer than this waits for a person
  maxWords: 10,   // a negative with more words than this waits for a person
  boughtDays: 90, // a search that made a sale in this many days waits for a person
  unclearDays: 30, // UNCLEAR_DAYS: an unclear verdict with no hold (one from before Nov 7) is judged again once older than this (todo.rs open)

  // The tracking module (comm-chat and the verifiers' trees, read 2026-11-07; rebuilt the same day).
  freshDays: 7,   // an answer counts for the modules after it this many New York days (modules/mod.rs FRESH_DAYS)
  waitFloor: 0.30, // an action waits for Will's mark only when Jev's chance that it counts is at least this (scorecard WAITING_JEV_FLOOR)
  markYes: 0.70,  // Jev's read of Will's words saves a mark only at or over this, a clear yes (chat/jev.rs UNCERTAIN)
  boxWeeks: 2,    // the spend box lets a run raise Google spend only while this many newest full weeks are trusted (spend_box TRUST_WEEKS)
  settleDays: 7,  // a week counts once it ended this many days ago (results/compute.rs SETTLE_DAYS)
  gapLeads: 3,    // a lead-app week matches Google when the gap is under this many leads (lead_match/weeks.rs GAP_LEADS)
  gapPct: 30,     // and under this % of the real leads (GAP_SHARE 0.30)
  valuePct: 20,   // the plan's value match: a week's sale value within this % of the store's sales, the audit's own line (google-ads-audit.toml ct-values-1-2)

  // The client module (comm-chat src/modules: mod.rs, day.rs, brief/, client_profile/client_words.rs, chat/tools/module_tools.rs; the verifiers' inbox tree; read 2026-11-07).
  clientFresh: 7,       // FRESH_DAYS: an answer counts this many New York days, so the module runs at least this often (mod.rs:59)
  clientQuiet: 30,      // QUIET_DAYS: no mail or call from the client's people this long puts "quiet" on Barbara's list (scorecard/mod.rs:53)
  clientMin: 12,        // MIN_WORDS: a quote shorter than this many characters ties to no source (client_words.rs:27)
  clientCalls: 6,       // the brief lists at most this many of the client's newest recorded calls (brief/numbers.rs:547)
  clientRunAge: 24,     // MAX_AGE_MS in hours: a module run older than this is refused (run.rs:27)
  clientItem: 180,      // NEW_ITEM_CHARS: each new item in the brief is cut at this many characters (brief/mod.rs:59)
  clientNew: '1,000',   // NEW_CHARS: what is new takes at most this many characters in the brief (brief/mod.rs:58)
  clientWrong: 600,     // WRONG_CHARS: the brief quotes at most this many characters of what the last answer said would prove it wrong (brief/mod.rs:157)
  clientJevNo: 0.30,    // Jev's unsure band starts here: a fix Jev reads at or under it is refused (chat/jev.rs:19)
  clientJevYes: 0.70,   // Jev's unsure band ends here (chat/jev.rs:19)
  clientAsk: 0.50,      // the inbox's line for "Does that later team mail answer what they asked?" (verify/trees/inbox.toml)

  // The bid and budget module (comm-chat src/modules: mod.rs, day.rs, store.rs, brief/; the verifiers' bids goals in verify/trees; read 2026-11-07).
  bidFresh: 7,         // FRESH_DAYS (mod.rs:59): an answer counts this many New York days; older or none keeps it from saving
  bidMost: 8,          // MOST_CAMPAIGNS (mod.rs:61): a campaign module answers at most this many campaigns, the most money first
  bidLive: 30,         // LIVE_DAYS (brief/numbers.rs:30): a campaign is live when it spent in this many stored days
  bidPeriod: 180,      // PERIOD_DAYS (brief/numbers.rs:34): how far back the periods of a campaign's targets read
  bidWeeks: 8,         // WEEKS_SHOWN (brief/numbers.rs:38): the weeks the bids brief shows
  bidChanges: 44,      // CHANGE_DAYS = scorecard::WORSE_CHANGE_DAYS (brief/numbers.rs:32): its changes read this far back
  bidShown: 8,         // CHANGES_SHOWN (brief/numbers.rs:36): at most this many changes listed
  bidStrategy: '1,000', // STRATEGY_CHARS (brief/numbers.rs:44): the strategy page is clipped to this many characters
  bidPage: '24,000',   // PAGE_CHARS (brief/mod.rs:288): longer facts read in pages of this many characters
  bidHours: 72,        // the module's words (mod.rs:264): a teammate's change under this many hours waits
  bidRunHours: 24,     // run::MAX_AGE_MS (run.rs:28): a check run older than this is refused
  bidJev: 0.30,        // jev::UNCERTAIN low end (chat/jev.rs:19): Jev at or under this on a proposal refuses the answer
  bidJevSure: 0.70,    // jev::UNCERTAIN high end (chat/jev.rs:19): Jev at or over this is a clear yes
  bidDigits: 9,        // cases::words::machine_token (cases/words.rs:78): an id of this many digits or more is not plain words
  bidChecksDays: 14,   // exam WINDOW_MS (validators_api/exam.rs:31): a goal's newest result counts this long
  bidSpendAlert: 150,  // the Spend alert (triggers/kinds.rs:200): a day over this % of a campaign's budget
  bidLimited: 10,      // bb-limited-winners: losing this % or more of impressions to budget is a finding
  bidOver: 25,         // bb-over-target: cost a conversion this % or more over target
  bidOverDays: 30,     // bb-over-target: for this many trusted days
  bidSmart: 15,        // bb-strategy-fits-data: fewer conversions than this in 30 days fails
  bidValue: 30,        // bb-strategy-fits-data: a value strategy needs this many conversions in 30 days
  bidStarve: 70,       // bb-targets-realistic: a target under this % of the 30-day result starves the campaign
  bidLoose: 150,       // bb-targets-realistic: a target over this % of the 30-day result tells Google nothing
  bidPace: 5,          // bb-pacing: off pace by more than this % is a finding
  bidBrandCpc: 50,     // bb-brand-cost: a brand click at this % or more of the non-brand click is a finding
  bidChurn: 2,         // bb-churn: more than this many bid, target or budget changes ...
  bidChurnDays: 14,    // bb-churn: ... in this many days on one smart bidding campaign
  bidCpcMin: 50,       // cpc-near-norm: a search that cost this many dollars or more ...
  bidCpcTimes: 5,      // cpc-near-norm: ... at this many times the campaign's norm or more, with no conversion, fails
  bidCpcClicks: 20,    // cpc-near-norm: a campaign under this many clicks has no norm

  // The In motion module (comm-chat at origin/main 1c24d43a: src/modules/brief/code.rs, numbers.rs, paused.rs, mod.rs; read 2026-11-08).
  motionChanges: 14,    // CHANGE_DAYS = scorecard::CHANGES_DAYS (code.rs:28): a person's change is listed this many days; a person's pause keeps its campaign on the list as long (paused.rs:23)
  motionWords: 21,      // TASK_WORD_DAYS (code.rs:35): a comment on an open task is listed this many days
  motionWordChars: 300, // TASK_WORD_CHARS (code.rs:36): each comment is cut to this many characters
  motionAsked: 200,     // ASKED_CHARS (code.rs:33): a question's first line is cut to this many characters
  motionFresh: 7,       // FRESH_DAYS (mod.rs:59): the list counts this many New York days for the modules that need it
  motionLine: 300       // MOTION_LINE_CHARS (numbers.rs:51): the Decide module reads each line of the list cut to this many characters
});
