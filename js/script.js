/* =========================================================
   Emmanuel Gonzales — AI Automation Portfolio
   script.js  (vanilla JS, no dependencies)
========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     Data — Projects
     Every entry describes what the workflow does. These are
     portfolio / independent projects.
  --------------------------------------------------------- */
  var PROJECTS = [
    {
      id: 'crypto-trading-system',
      featured: true,
      flag: 'Flagship project',
      title: 'AI Crypto Trading Signals, Market Context & Discipline System',
      platform: 'n8n',
      trigger: 'TradingView webhook · every 4H · every 2H · every 5 min',
      image: 'assets/projects/n8n-crypto-trading-system.png',
      tagline: 'One n8n workflow with three lanes: strategy signals with an AI analyst note, a two-hour market and news context feed, and a Discord trade journal that enforces daily stop rules.',
      overview: [
        'A single n8n workflow built as three independent lanes that share one Discord server. It watches BTC, SOL, WLD and GRASS, turns raw candle data into rule-based trade signals, adds market and news context, and keeps the trader inside their own daily limits.',
        'The strategy lane runs from a TradingView alert or from a scan at every 4H candle close. It pulls 4H and 15m candles, runs a strategy engine that checks three confirmations, Fibonacci golden zones and risk rules, asks an AI analyst to explain the setup, and posts the result to a Discord signals channel.'
      ],
      lanes: [
        {
          name: 'Strategy signals',
          short: 'TradingView alert or 4H scan → candles → strategy engine → AI note → Discord',
          steps: [
            'A TradingView alert (any watched coin) arrives by webhook and is parsed, or a scheduled trigger fires at every 4H candle close.',
            'A watchlist step decides which coins to evaluate.',
            'Exchange candle data is requested over HTTP for two timeframes: 4H and 15m.',
            'A JavaScript strategy engine checks three confirmations, Fibonacci golden zones and risk rules.',
            'An AI analyst writes a short note on the setup, and a final-message step formats it.',
            'The message is posted to the signals channel on Discord.'
          ]
        },
        {
          name: 'altFINS market context',
          short: 'Every 2 hours → top gainers + crypto news → cached → added to every signal',
          steps: [
            'A schedule runs every two hours.',
            'The altFINS API returns top gainers, and crypto news is read from RSS feeds.',
            'The combined context is cached inside the workflow so every signal can include it.',
            'When a watched coin becomes a top gainer, a market alert is posted to Discord.'
          ]
        },
        {
          name: 'Discipline journal',
          short: 'Every 5 minutes → read #trade-log → update journal → reply on Discord',
          steps: [
            'A schedule checks the Discord trade-log channel every five minutes.',
            'Commands are read from the channel: /win, /loss, /status and /reset, with a “scalp” option for scalping trades.',
            'The journal updates its counts and enforces stop rules: day trading stops at 3 wins or 2 losses, scalping at 4 wins or 3 losses.',
            'The current status is posted back to Discord.'
          ]
        }
      ],
      tools: ['n8n', 'TradingView Webhooks', 'HTTP Requests', 'JavaScript Code Nodes', 'AI Analyst', 'altFINS API', 'RSS Feeds', 'Discord'],
      features: [
        ['Two entry points', 'Reacts to a TradingView alert and also scans on a schedule at each 4H close.'],
        ['Multi-timeframe data', 'Combines 4H and 15m candles for each watched coin.'],
        ['Rule-based strategy engine', 'Three confirmations, Fibonacci golden zones and risk rules written in JavaScript.'],
        ['AI analyst note', 'Explains each setup in plain language before it reaches Discord.'],
        ['Shared market context', 'Top-gainer and news data refreshed every two hours and attached to signals.'],
        ['Trade journal commands', 'Win, loss, status and reset tracked from a Discord channel.'],
        ['Daily stop rules', 'Built-in limits for day trading and scalping to support trading discipline.']
      ],
      goal: 'Reduce manual chart watching, make the strategy checklist repeatable, and keep signals, market context and trading discipline in one automated system.',
      note: 'Portfolio project for demonstration only. It is not financial advice.'
    },
    {
      id: 'gmail-organizer',
      title: 'AI-Powered Gmail Attachment Organizer',
      platform: 'Make.com',
      trigger: 'New Gmail message',
      image: 'assets/projects/make-gmail-automation.png',
      tagline: 'Watches Gmail for attachments, uses AI to analyze and name each file, stores it in Google Drive, logs the email in Google Sheets and sends a notification.',
      overview: [
        'Attachments that arrive by email usually end up with inconsistent names and scattered locations. This Make.com scenario removes that manual sorting: every new attachment is analyzed, renamed, filed in Google Drive and recorded in a log.'
      ],
      steps: [
        'Monitor Gmail for new messages.',
        'Detect attachments and pass each file for analysis.',
        'Generate a clear, consistent filename with AI.',
        'Upload the file to Google Drive.',
        'Log the email details in Google Sheets.',
        'Send an email notification when the file is stored.'
      ],
      tools: ['Make.com', 'Gmail', 'Google Drive', 'Google Sheets', 'AI'],
      features: ['Email monitoring', 'Attachment detection', 'AI-assisted file analysis', 'Automated file naming', 'Google Drive storage', 'Email logging', 'Automatic notifications']
    },
    {
      id: 'support-agent',
      title: 'AI Customer Support Knowledge Base Agent',
      platform: 'n8n',
      trigger: 'Webhook',
      image: 'assets/projects/n8n-customer-support.png',
      tagline: 'An AI agent with conversation memory that answers customer inquiries from a Google Docs knowledge base and hands off when it has no answer.',
      overview: [
        'Customer questions arrive through a webhook and are passed to an AI agent that answers only from an approved Google Docs knowledge base. The agent keeps conversation memory so follow-up questions make sense.',
        'When the answer is not in the knowledge base, the workflow is designed to route the inquiry to the business owner instead of inventing an unsupported reply.'
      ],
      steps: [
        'Receive the customer inquiry through a webhook.',
        'Retrieve the relevant information from the Google Docs knowledge base.',
        'Process the request with an AI agent that uses chat memory.',
        'Send the generated response back through an HTTP request.',
        'Follow the no-answer path to a human when the knowledge base has nothing relevant.'
      ],
      tools: ['n8n', 'Google Docs', 'Google Gemini', 'AI Agent', 'Webhook', 'HTTP Request', 'Chat Memory'],
      features: ['Knowledge-base retrieval', 'AI-generated responses', 'Conversation memory', 'Webhook integration', 'API communication', 'Human handoff / no-answer path']
    },
    {
      id: 'resume-generation',
      title: 'AI Resume Generation Automation',
      platform: 'n8n',
      trigger: 'Slack request',
      image: 'assets/projects/n8n-resume-automation.png',
      tagline: 'Turns a Slack request into tailored resume content, a populated Google Doc and a Gmail draft, then confirms back in Slack.',
      overview: [
        'Building a tailored resume normally spans several tools. This workflow starts from a Slack message, gathers the data it needs through APIs, has AI generate structured resume content, and completes the document and email draft automatically.'
      ],
      steps: [
        'Receive the request in Slack.',
        'Process the information through APIs and AI to produce structured resume content.',
        'Search Google Drive for the correct template and organize the files.',
        'Populate the resume template and update the Google Doc.',
        'Create a Gmail draft.',
        'Notify the requester in Slack.'
      ],
      tools: ['n8n', 'Slack', 'OpenAI', 'Google Drive', 'Google Docs', 'Gmail', 'HTTP APIs'],
      features: ['Slack-triggered requests', 'AI content generation', 'Structured output', 'File search', 'Resume template automation', 'Google Docs updates', 'Email draft creation', 'Slack notifications']
    },
    {
      id: 'video-automation',
      title: 'Automated AI Video Generation & Publishing',
      platform: 'n8n',
      trigger: 'Schedule',
      image: 'assets/projects/n8n-video-automation.png',
      tagline: 'A scheduled pipeline that writes a prompt with AI, requests a video through an authenticated API, waits for it and publishes it to social platforms.',
      overview: [
        'Producing and posting short-form video on a schedule is slow when done by hand. This workflow covers the whole path: prompt creation, API authentication with JWT, video generation, status checking, file conversion and publishing.'
      ],
      steps: [
        'A schedule starts the run.',
        'AI generates the video prompt.',
        'The workflow authenticates with the video service using JWT.',
        'A video-generation request is sent through the API.',
        'The workflow waits and checks status until the video is ready.',
        'The finished video is retrieved and converted into a usable file.',
        'The content is published to social platforms.'
      ],
      tools: ['n8n', 'Google Gemini', 'JWT', 'HTTP APIs', 'Facebook Graph API', 'YouTube'],
      features: ['Scheduled automation', 'AI prompt generation', 'API authentication', 'Video generation', 'Status checking', 'File conversion', 'Automated social publishing']
    },
    {
      id: 'appointment-management',
      title: 'Appointment & Lead Management Automation',
      platform: 'n8n',
      trigger: 'Webhooks',
      image: 'assets/projects/n8n-appointment-automation.png',
      tagline: 'Connected workflows that handle the whole appointment lifecycle: booking, rescheduling, updates, cancellations and follow-ups.',
      overview: [
        'Bookings, reschedules and cancellations are repetitive and easy to get wrong by hand. This system splits each action into its own workflow and keeps calendar and lead records in sync.'
      ],
      steps: [
        'Receive appointment requests and changes through webhooks.',
        'Check calendar availability and create the appointment.',
        'Handle rescheduling, updates and cancellations.',
        'Track the lead in Airtable and send automated responses.',
        'Trigger follow-ups after the appointment.'
      ],
      tools: ['n8n', 'Webhooks', 'Airtable', 'Google Calendar', 'AI', 'APIs'],
      features: ['Appointment booking', 'Availability checks', 'Calendar integration', 'Lead management', 'Rescheduling', 'Cancellation handling', 'Automated responses']
    },
    {
      id: 'recruitment-screening',
      title: 'AI Recruitment & Applicant Screening System',
      platform: 'n8n',
      trigger: 'Form submission',
      image: 'assets/projects/n8n-recruitment-automation.png',
      tagline: 'Processes applications end to end: resume extraction, AI evaluation, qualified or rejected routing, interview questions and scheduling.',
      overview: [
        'Screening applicants by hand is slow and inconsistent. This workflow evaluates every candidate the same way and moves them through the next stage automatically.'
      ],
      steps: [
        'Receive the application from a form submission.',
        'Store applicant information and extract data from the resume.',
        'Evaluate the applicant with AI.',
        'Route the candidate down a qualified or rejected path.',
        'Generate interview questions, send messages and schedule the interview.',
        'Update the candidate record.'
      ],
      tools: ['n8n', 'Google Drive', 'Airtable', 'Gmail', 'Google Gemini', 'AI Agents'],
      features: ['Resume processing', 'AI applicant evaluation', 'Candidate routing', 'Interview question generation', 'Email automation', 'Interview scheduling', 'Applicant database updates']
    },
    {
      id: 'business-report',
      title: 'AI Business Report Generator',
      platform: 'n8n',
      trigger: 'Schedule',
      image: 'assets/projects/n8n-business-report.png',
      tagline: 'Reads business data from Google Sheets, compares the latest and previous periods, has an AI analyst write the commentary and emails an HTML report.',
      overview: [
        'Recurring reports mean pulling figures, comparing periods, writing a summary and formatting an email. This workflow does all four on a schedule.'
      ],
      steps: [
        'A schedule starts the run.',
        'Read the data from Google Sheets and select the latest and previous records.',
        'Calculate the report figures in a Code node.',
        'An AI business analyst (Google Gemini) writes the analysis.',
        'Format the result as an HTML report.',
        'Send it by email through Gmail.'
      ],
      tools: ['n8n', 'Google Sheets', 'Code Node', 'Google Gemini', 'AI Agent', 'HTML Template', 'Gmail'],
      features: ['Scheduled trigger', 'Google Sheets data retrieval', 'Latest vs. previous record comparison', 'Calculated report metrics', 'AI-written business analysis', 'HTML report formatting', 'Automated email delivery']
    },
    {
      id: 'lead-qualification',
      title: 'AI Lead Qualification & Scoring',
      platform: 'n8n',
      trigger: 'Webhook',
      image: 'assets/projects/n8n-lead-qualification.png',
      tagline: 'Validates each incoming lead, qualifies and scores it with AI, then routes it as hot, warm or cold with the matching alert, email or record.',
      overview: [
        'Not every lead needs the same response. This workflow decides quickly which ones do: hot leads trigger an alert, warm leads get a follow-up email and cold leads are saved to a Google Sheets CRM.'
      ],
      steps: [
        'Receive the lead through a webhook.',
        'Validate the lead data.',
        'Qualify the lead with an AI model and calculate a score.',
        'Route by score: hot, warm or cold.',
        'Send a hot-lead alert, a warm follow-up email, or save the cold lead to Google Sheets.'
      ],
      tools: ['n8n', 'Webhook', 'Google Gemini', 'AI Agent', 'Code Node', 'Gmail', 'Google Sheets'],
      features: ['Webhook lead intake', 'Lead data validation', 'AI lead qualification', 'Lead scoring', 'Hot / Warm / Cold routing', 'Hot-lead email alerts', 'Warm-lead follow-up emails', 'Cold-lead storage in Google Sheets']
    },
    {
      id: 'social-content',
      title: 'AI Social Media Content Automation',
      platform: 'Zapier',
      trigger: 'New file',
      image: 'assets/projects/zapier-social-media.png',
      tagline: 'Monitors files, uses AI to transcribe and write post copy, loops through the content and publishes to Facebook Pages and LinkedIn.',
      overview: [
        'Turning raw files into platform-ready posts takes repeated effort. This Zapier workflow handles transcription, copywriting, routing and publishing.'
      ],
      steps: [
        'Monitor for new files and filter the content.',
        'Generate a transcription and post copy with AI.',
        'Loop through the selected content.',
        'Route each post by condition with Paths.',
        'Publish to Facebook Pages and LinkedIn.'
      ],
      tools: ['Zapier', 'AI by Zapier', 'Facebook Pages', 'LinkedIn', 'Looping', 'Paths', 'Filters'],
      features: ['File monitoring', 'AI transcription', 'AI-generated captions', 'Conditional routing', 'Multi-platform publishing', 'Automated social media updates']
    },
    {
      id: 'sales-pipeline',
      title: 'Sales Pipeline Follow-Up Automation',
      platform: 'Zapier',
      trigger: 'Asana stage change',
      image: 'assets/projects/zapier-sales-pipeline.png',
      tagline: 'Responds to every Asana pipeline stage change with its own path: folders, tasks, timed follow-ups, PDFs and welcome messages.',
      overview: [
        'Follow-ups are easy to miss when they depend on memory. This Zapier workflow watches the pipeline in Asana and runs the right actions for each stage.'
      ],
      steps: [
        'Detect a stage change in Asana.',
        'Send the update down the matching path.',
        'Create Google Drive folders and Asana tasks where needed.',
        'Send follow-up emails, with delays and lookups of earlier emails.',
        'Generate PDF files and send welcome or recommendation messages.'
      ],
      tools: ['Zapier', 'Asana', 'Gmail', 'Google Drive', 'Paths', 'Filters', 'Delay'],
      features: ['Pipeline stage monitoring', 'Conditional workflow routing', 'Automated follow-ups', 'Document generation', 'Folder creation', 'Task creation', 'Customer communication']
    },
    {
      id: 'lead-enrichment',
      title: 'AI Lead Enrichment & Qualification',
      platform: 'Zapier',
      trigger: 'Webhook',
      image: 'assets/projects/zapier-lead-enrichment.png',
      tagline: 'Enriches incoming leads with Apollo, routes them by qualification, stores qualified leads, alerts the sales team and drafts an email with AI.',
      overview: [
        'Qualifying a lead normally needs manual research. This workflow gathers company data automatically and gives the sales team the context to act.'
      ],
      steps: [
        'Receive the lead through a webhook.',
        'Format the company URL and enrich the company data with Apollo.',
        'Route the lead based on qualification conditions.',
        'Store qualified leads and alert the sales team.',
        'Draft a first email with AI.'
      ],
      tools: ['Zapier', 'Apollo', 'Google Sheets', 'Slack', 'Gmail', 'AI by Zapier', 'Webhooks'],
      features: ['Lead capture', 'Company enrichment', 'Lead qualification', 'Conditional routing', 'Sales notifications', 'AI email drafting']
    }
  ];

  /* ---------------------------------------------------------
     Data — Certifications
  --------------------------------------------------------- */
  var CERTS = [
    { id: 'n8n-cert', name: 'AI Automation with n8n', provider: 'Technical Virtual Assistants PH / Tara AI Community', date: 'August 27, 2026',
      thumb: 'assets/certificates/n8n-certificate-thumb.webp', file: 'assets/certificates/n8n-certificate.pdf',
      details: 'Training includes AI agents, workflows, nodes, data handling, triggers, actions, filtering, branching, looping, APIs, MCP, and AI agents.' },
    { id: 'zapier-cert', name: 'No-Code Automation with Zapier', provider: 'Tara AI Community+', date: 'August 9, 2026',
      thumb: 'assets/certificates/zapier-certificate-thumb.webp', file: 'assets/certificates/zapier-certificate.pdf',
      details: 'Training includes Zapier interface, triggers, Formatter, Delay, Filters, Paths, Looping, Sub-Zaps, Webhooks, and AI with human-in-the-loop workflows.' },
    { id: 'make-cert', name: 'No-Code Automation with Make.com', provider: 'Tara AI Community+', date: 'August 15, 2026',
      thumb: 'assets/certificates/make-certificate-thumb.webp', file: 'assets/certificates/make-certificate.pdf',
      details: 'Training includes Make.com interface, scenario structure, filters, triggers, app connections, actions, data manipulation, advanced routing, HTTP requests, and AI agents.' },
    { id: 'ghl-cert', name: 'HighLevel CRM Full Training', provider: 'Tara AI Community+', date: 'September 3, 2026',
      thumb: 'assets/certificates/ghl-certificate-thumb.webp', file: 'assets/certificates/ghl-certificate.pdf',
      details: 'Training includes CRM and pipeline management, sales funnels, website builder, surveys and forms, email marketing, booking and appointments, contacts, workflow automation, API integration, reputation management, tracking, analytics, communities, document signing, and AI agents.' },
    { id: 'prompt-cert', name: 'Prompt Engineering', provider: 'Tara AI Community+', date: 'August 27, 2026',
      thumb: 'assets/certificates/prompt-engineering-certificate-thumb.webp', file: 'assets/certificates/prompt-engineering-certificate.pdf',
      details: 'Training includes prompt engineering fundamentals, anatomy of a good prompt, practical prompting techniques, real-world scenarios, tools, templates, prompt libraries, and workflow building.' }
  ];

  /* ---------------------------------------------------------
     Helpers
  --------------------------------------------------------- */
  var $ = function (id) { return document.getElementById(id); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ARROW = '<svg class="i" aria-hidden="true"><use href="#i-right"/></svg>';

  function tagsHTML(list) {
    return '<ul class="tags">' + list.map(function (t) { return '<li class="tag">' + t + '</li>'; }).join('') + '</ul>';
  }
  function listHTML(list) {
    return '<ul class="m-list">' + list.map(function (i) {
      return Array.isArray(i) ? '<li><strong>' + i[0] + '.</strong> ' + i[1] + '</li>' : '<li>' + i + '</li>';
    }).join('') + '</ul>';
  }
  function flowHTML(steps) {
    return '<ol class="flow">' + steps.map(function (s) { return '<li><span>' + s + '</span></li>'; }).join('') + '</ol>';
  }

  /* ---------------------------------------------------------
     Projects: filters + cards
  --------------------------------------------------------- */
  var grid = $('projectGrid');
  var filterBar = $('filters');
  var activeFilter = 'All';
  var cardNodes = [];

  function buildCards() {
    PROJECTS.forEach(function (p, i) {
      var card = document.createElement('article');
      card.className = 'project reveal' + (p.featured ? ' project--featured' : '');
      card.setAttribute('data-platform', p.platform);
      card.style.setProperty('--d', Math.min(i % 3, 2) * 60 + 'ms');

      var lanes = p.lanes ? '<ul class="lanes">' + p.lanes.map(function (l) {
        return '<li><b>' + l.name + '</b>' + l.short + '</li>';
      }).join('') + '</ul>' : '';

      card.innerHTML =
        '<div class="project__media' + (p.featured ? '' : '') + '">' +
          '<span class="project__platform">' + p.platform + '</span>' +
          '<img src="' + p.image + '" alt="' + p.title + ' workflow screenshot" loading="' + (i < 2 ? 'eager' : 'lazy') + '" decoding="async">' +
        '</div>' +
        '<div class="project__body">' +
          (p.featured ? '<span class="project__flag">' + p.flag + '</span>' : '<span class="project__trigger">Trigger: ' + p.trigger + '</span>') +
          '<h3>' + p.title + '</h3>' +
          '<p class="project__tagline">' + p.tagline + '</p>' +
          lanes +
          tagsHTML(p.tools.slice(0, p.featured ? 8 : 4)) +
          '<button type="button" class="open-btn" data-project="' + p.id + '">View case study ' + ARROW + '</button>' +
        '</div>';
      grid.appendChild(card);
      cardNodes.push({ id: p.id, platform: p.platform, el: card });
    });
  }

  function buildFilters() {
    var platforms = ['All'];
    PROJECTS.forEach(function (p) { if (platforms.indexOf(p.platform) < 0) platforms.push(p.platform); });
    platforms.forEach(function (name) {
      var n = name === 'All' ? PROJECTS.length : PROJECTS.filter(function (p) { return p.platform === name; }).length;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'filter';
      b.setAttribute('data-filter', name);
      b.setAttribute('aria-pressed', name === 'All' ? 'true' : 'false');
      b.innerHTML = name + ' <span class="filter__n">' + n + '</span>';
      filterBar.appendChild(b);
    });
    filterBar.addEventListener('click', function (e) {
      var b = e.target.closest('.filter');
      if (!b) return;
      activeFilter = b.getAttribute('data-filter');
      Array.prototype.forEach.call(filterBar.children, function (x) {
        x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
      });
      cardNodes.forEach(function (c) {
        c.el.hidden = !(activeFilter === 'All' || c.platform === activeFilter);
      });
    });
  }

  function visibleProjects() {
    return cardNodes.filter(function (c) { return !c.el.hidden; }).map(function (c) { return c.id; });
  }

  /* ---------------------------------------------------------
     Certifications
  --------------------------------------------------------- */
  function buildCerts() {
    var wrap = $('certGrid');
    CERTS.forEach(function (c, i) {
      var card = document.createElement('article');
      card.className = 'cert reveal';
      card.style.setProperty('--d', (i % 3) * 60 + 'ms');
      card.innerHTML =
        '<div class="cert__thumb"><img src="' + c.thumb + '" alt="' + c.name + ' certificate preview" loading="lazy" decoding="async"></div>' +
        '<div class="cert__body">' +
          '<h3>' + c.name + '</h3>' +
          '<span class="cert__provider">' + c.provider + '</span>' +
          '<span class="cert__date">' + c.date + '</span>' +
          '<button type="button" class="open-btn" data-cert="' + c.id + '">View certificate ' + ARROW + '</button>' +
        '</div>';
      wrap.appendChild(card);
    });
  }

  /* ---------------------------------------------------------
     Modal (projects + certificates, prev/next)
  --------------------------------------------------------- */
  var modal = $('modal'), dialog = $('modalDialog'), mImg = $('modalImage'), mBody = $('modalBody'),
      mCount = $('modalCount'), mPrev = $('modalPrev'), mNext = $('modalNext'), mClose = $('modalClose');
  var lastFocus = null;
  var current = { type: null, list: [], index: 0 };

  function byId(arr, id) { return arr.filter(function (x) { return x.id === id; })[0]; }

  function renderProject(p) {
    mImg.src = p.image;
    mImg.alt = p.title + ' workflow screenshot';

    var left = '<div class="m-sec"><h4>Overview</h4>' + p.overview.map(function (t) { return '<p>' + t + '</p>'; }).join('') + '</div>';
    if (p.lanes) {
      left += '<div class="m-sec"><h4>How it works</h4>' + p.lanes.map(function (l) {
        return '<div class="lane"><h5>' + l.name + '</h5>' + flowHTML(l.steps) + '</div>';
      }).join('') + '</div>';
    } else {
      left += '<div class="m-sec"><h4>How it works</h4>' + flowHTML(p.steps) + '</div>';
    }

    var right = '<div class="m-sec"><h4>Tools used</h4>' + tagsHTML(p.tools) + '</div>' +
      '<div class="m-sec"><h4>Key features</h4>' + listHTML(p.features) + '</div>';
    if (p.goal) right += '<div class="m-sec"><h4>Project goal</h4><p>' + p.goal + '</p></div>';
    if (p.note) right += '<p class="m-note">' + p.note + '</p>';
    right += '<div class="m-actions"><a class="btn btn--ghost" href="' + p.image + '" target="_blank" rel="noopener">Open full-size screenshot</a></div>';

    mBody.innerHTML =
      '<div class="m-head"><span class="project__trigger">' + p.platform + ' · Trigger: ' + p.trigger + '</span><h3 id="modalTitle">' + p.title + '</h3></div>' +
      '<div class="m-col">' + left + '</div><div class="m-col">' + right + '</div>';
  }

  function renderCert(c) {
    mImg.src = c.thumb;
    mImg.alt = c.name + ' certificate';
    mBody.innerHTML =
      '<div class="m-head"><span class="project__trigger">' + c.provider + '</span><h3 id="modalTitle">' + c.name + '</h3></div>' +
      '<div class="m-col"><div class="m-sec"><h4>Issued</h4><p>' + c.date + '</p></div>' +
      '<div class="m-sec"><h4>Training covered</h4><p>' + c.details + '</p></div></div>' +
      '<div class="m-col"><div class="m-actions"><a class="btn btn--primary" href="' + c.file + '" target="_blank" rel="noopener">Open certificate (PDF)</a></div></div>';
  }

  function render() {
    var id = current.list[current.index];
    if (current.type === 'project') renderProject(byId(PROJECTS, id));
    else renderCert(byId(CERTS, id));
    mCount.textContent = (current.index + 1) + ' / ' + current.list.length;
    $('modalMedia').scrollTop = 0;
    modal.querySelector('.modal__scroll').scrollTop = 0;
  }

  function openModal(type, id) {
    current.type = type;
    current.list = type === 'project' ? visibleProjects() : CERTS.map(function (c) { return c.id; });
    current.index = Math.max(0, current.list.indexOf(id));
    lastFocus = document.activeElement;
    render();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    dialog.focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function step(d) {
    var n = current.list.length;
    current.index = (current.index + d + n) % n;
    render();
  }

  document.addEventListener('click', function (e) {
    var p = e.target.closest('[data-project]');
    var c = e.target.closest('[data-cert]');
    if (p) openModal('project', p.getAttribute('data-project'));
    else if (c) openModal('cert', c.getAttribute('data-cert'));
  });
  mClose.addEventListener('click', closeModal);
  mPrev.addEventListener('click', function () { step(-1); });
  mNext.addEventListener('click', function () { step(1); });
  $('modalBackdrop').addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'Tab') {
      var f = Array.prototype.filter.call(modal.querySelectorAll('button, a[href]'), function (x) { return x.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------------------------------------------------------
     Navigation: mobile menu, scrolled state, scroll-spy
  --------------------------------------------------------- */
  var nav = $('navbar'), toggle = $('navToggle'), links = $('primaryNav');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));

  function setMenu(open) {
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setMenu(!links.classList.contains('is-open')); });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && links.classList.contains('is-open')) { setMenu(false); toggle.focus(); } });

  var sections = Array.prototype.slice.call(document.querySelectorAll('[data-section]'));
  // "process" has no nav link of its own; it belongs to the Projects group
  var spyMap = { process: 'projects' };
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = spyMap[en.target.id] || en.target.id;
        navLinks.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------------------------------------------------------
     Scroll progress, back to top
  --------------------------------------------------------- */
  var progress = $('progress'), toTop = $('backToTop'), ticking = false;
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
    nav.classList.toggle('is-scrolled', y > 12);
    toTop.classList.toggle('is-visible', y > 600);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

  /* ---------------------------------------------------------
     Init
  --------------------------------------------------------- */
  buildCards();
  buildFilters();
  buildCerts();

  Array.prototype.forEach.call(document.querySelectorAll('[data-project-count]'), function (n) {
    n.textContent = PROJECTS.length;
  });

  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (r) { r.classList.add('is-in'); });
    var pulses = document.querySelector('.pulses');
    if (reduceMotion && pulses && pulses.parentNode) pulses.parentNode.removeChild(pulses);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(function (r) { io.observe(r); });
  }

  onScroll();
})();
