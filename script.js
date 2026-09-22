/* =========================================================
   Emmanuel Gonzales — AI Automation Portfolio
   script.js
========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     Data — Projects
  --------------------------------------------------------- */
  var PROJECTS = [
    {
      id: 'gmail-organizer',
      title: 'AI-Powered Gmail Attachment Organizer',
      platform: 'Make.com',
      image: 'assets/projects/make-gmail-automation.png',
      description: 'An automated email and file-management workflow that monitors Gmail messages, detects attachments, analyzes the files, generates appropriate filenames, uploads them to Google Drive, logs email information in Google Sheets, and sends an email notification.',
      problem: 'Incoming email attachments pile up with inconsistent names, making them hard to find and requiring manual sorting into Drive.',
      solution: 'A Make.com scenario watches Gmail for new attachments, uses AI to analyze and rename each file, uploads it to the correct Google Drive location, and logs the activity automatically.',
      tools: ['Make.com', 'Gmail', 'Google Drive', 'Google Sheets', 'AI'],
      features: [
        'Email monitoring',
        'Attachment detection',
        'AI-assisted file analysis',
        'Automated file naming',
        'Google Drive storage',
        'Email logging',
        'Automatic notifications'
      ]
    },
    {
      id: 'support-agent',
      title: 'AI Customer Support Knowledge Base Agent',
      platform: 'n8n',
      image: 'assets/projects/n8n-customer-support.png',
      description: 'An AI-powered customer support workflow that receives inquiries through a webhook, retrieves information from a Google Docs knowledge base, processes the request using an AI agent with conversation memory, and sends the generated response through an HTTP request.',
      problem: 'Repetitive support questions take time to answer manually, and answers need to be consistent with an approved knowledge base.',
      solution: 'An n8n workflow routes each inquiry to an AI agent that references a Google Docs knowledge base and keeps conversation memory. If an answer cannot be found in the knowledge base, the workflow is designed to route the inquiry to the business owner instead of inventing an unsupported response.',
      tools: ['n8n', 'Google Docs', 'Google Gemini', 'AI Agent', 'Webhook', 'HTTP Request', 'Chat Memory'],
      features: [
        'Knowledge-base retrieval',
        'AI-generated responses',
        'Conversation memory',
        'Webhook integration',
        'API communication',
        'Human handoff / no-answer path'
      ]
    },
    {
      id: 'resume-generation',
      title: 'AI Resume Generation Automation',
      platform: 'n8n',
      image: 'assets/projects/n8n-resume-automation.png',
      description: 'A multi-step workflow designed to receive requests through Slack, process information through APIs and AI, generate customized resume content, search and organize files, populate a resume template, update Google Docs, create a Gmail draft, and notify users through Slack.',
      problem: 'Building a tailored resume for each application is a slow, manual, multi-step process spread across several tools.',
      solution: 'A Slack-triggered n8n workflow generates structured resume content with AI, locates the right template in Drive, updates a Google Doc, drafts the email in Gmail, and confirms completion back in Slack.',
      tools: ['n8n', 'Slack', 'OpenAI', 'Google Drive', 'Google Docs', 'Gmail', 'HTTP APIs'],
      features: [
        'Slack-triggered requests',
        'AI content generation',
        'Structured output',
        'File search',
        'Resume template automation',
        'Google Docs updates',
        'Email draft creation',
        'Slack notifications'
      ]
    },
    {
      id: 'video-automation',
      title: 'Automated AI Video Generation & Publishing',
      platform: 'n8n',
      image: 'assets/projects/n8n-video-automation.png',
      description: 'An automated content workflow that generates prompts using AI, authenticates with external services using JWT, sends video-generation requests through APIs, waits for generation to complete, retrieves the generated video, converts the output into a usable file, and publishes content to social platforms.',
      problem: 'Producing and publishing short-form video content on a schedule is time-consuming when done manually across multiple platforms.',
      solution: 'A scheduled n8n workflow generates a prompt with AI, authenticates via JWT, requests video generation, polls for completion, converts the result to a file, and publishes it directly to social platforms.',
      tools: ['n8n', 'Google Gemini', 'JWT', 'HTTP APIs', 'Facebook Graph API', 'YouTube'],
      features: [
        'Scheduled automation',
        'AI prompt generation',
        'API authentication',
        'Video generation',
        'Status checking',
        'File conversion',
        'Automated social publishing'
      ]
    },
    {
      id: 'appointment-management',
      title: 'Appointment & Lead Management Automation',
      platform: 'n8n',
      image: 'assets/projects/n8n-appointment-automation.png',
      description: 'A multi-workflow appointment management system covering appointment creation, rescheduling, updates, cancellations, follow-ups, lead tracking, calendar management, and automated responses.',
      problem: 'Managing bookings, reschedules, cancellations, and lead follow-ups by hand is repetitive and error-prone as volume grows.',
      solution: 'A set of connected n8n workflows handles the full appointment lifecycle — checking availability, booking, updating, cancelling, and following up — while keeping lead and calendar data in sync.',
      tools: ['n8n', 'Webhooks', 'Airtable', 'Google Calendar', 'AI', 'APIs'],
      features: [
        'Appointment booking',
        'Availability checks',
        'Calendar integration',
        'Lead management',
        'Rescheduling',
        'Cancellation handling',
        'Automated responses'
      ]
    },
    {
      id: 'recruitment-screening',
      title: 'AI Recruitment & Applicant Screening System',
      platform: 'n8n',
      image: 'assets/projects/n8n-recruitment-automation.png',
      description: 'An end-to-end recruitment automation workflow that processes form submissions, stores applicant information, extracts resume data, evaluates applicants using AI, routes qualified and rejected candidates, generates interview questions, sends messages, schedules interviews, and updates candidate records.',
      problem: 'Screening applicants and moving them through recruitment stages manually is slow and hard to keep consistent across candidates.',
      solution: 'An n8n workflow captures form submissions, extracts resume data, evaluates each applicant with AI, routes them down a qualified or rejected path, generates interview questions, and schedules interviews automatically.',
      tools: ['n8n', 'Google Drive', 'Airtable', 'Gmail', 'Google Gemini', 'AI Agents'],
      features: [
        'Resume processing',
        'AI applicant evaluation',
        'Candidate routing',
        'Interview question generation',
        'Email automation',
        'Interview scheduling',
        'Applicant database updates'
      ]
    },
    {
      id: 'social-content',
      title: 'AI Social Media Content Automation',
      platform: 'Zapier',
      image: 'assets/projects/zapier-social-media.png',
      description: 'A content automation workflow that monitors files, filters content, uses AI to generate transcriptions and post copy, loops through selected content, routes posts based on conditions, and publishes content to Facebook Pages and LinkedIn.',
      problem: 'Turning raw content files into platform-ready posts and publishing them consistently takes repeated manual effort.',
      solution: 'A Zapier workflow watches for new files, filters and transcribes them with AI, generates post copy, loops through items, and routes each post to the right platform automatically.',
      tools: ['Zapier', 'AI by Zapier', 'Facebook Pages', 'LinkedIn', 'Looping', 'Paths', 'Filters'],
      features: [
        'File monitoring',
        'AI transcription',
        'AI-generated captions',
        'Conditional routing',
        'Multi-platform publishing',
        'Automated social media updates'
      ]
    },
    {
      id: 'sales-pipeline',
      title: 'Sales Pipeline Follow-Up Automation',
      platform: 'Zapier',
      image: 'assets/projects/zapier-sales-pipeline.png',
      description: 'A workflow connected to Asana that automatically responds to changes in sales pipeline stages using conditional paths. Depending on the stage, the workflow can create Google Drive folders, create Asana tasks, send follow-up emails, introduce delays, locate previous emails, generate PDF files, and send welcome or recommendation messages.',
      problem: 'Following up consistently at every sales pipeline stage is easy to miss when it relies on someone remembering to do it.',
      solution: 'A Zapier workflow watches Asana for pipeline stage changes and routes each update down a dedicated path — creating folders and tasks, sending timed follow-ups, and generating documents as needed.',
      tools: ['Zapier', 'Asana', 'Gmail', 'Google Drive', 'Paths', 'Filters', 'Delay'],
      features: [
        'Pipeline stage monitoring',
        'Conditional workflow routing',
        'Automated follow-ups',
        'Document generation',
        'Folder creation',
        'Task creation',
        'Customer communication'
      ]
    },
    {
      id: 'lead-enrichment',
      title: 'AI Lead Enrichment & Qualification',
      platform: 'Zapier',
      image: 'assets/projects/zapier-lead-enrichment.png',
      description: 'A lead-processing automation that receives incoming leads through webhooks, formats company URLs, enriches company information using Apollo, routes leads based on qualification conditions, stores qualified leads, alerts the sales team, and uses AI to generate email drafts.',
      problem: 'Qualifying new leads and getting the sales team the right context requires manual research on every submission.',
      solution: 'A Zapier workflow captures each lead via webhook, enriches company data through Apollo, routes leads by qualification level, alerts the sales team, and drafts a first-touch email with AI.',
      tools: ['Zapier', 'Apollo', 'Google Sheets', 'Slack', 'Gmail', 'AI by Zapier', 'Webhooks'],
      features: [
        'Lead capture',
        'Company enrichment',
        'Lead qualification',
        'Conditional routing',
        'Sales notifications',
        'AI email drafting'
      ]
    }
  ];

  /* ---------------------------------------------------------
     Data — Certifications
  --------------------------------------------------------- */
  var CERTS = [
    {
      id: 'n8n-cert',
      name: 'AI Automation with n8n',
      provider: 'Technical Virtual Assistants PH / Tara AI Community',
      date: 'August 27, 2026',
      thumb: 'assets/certificates/n8n-certificate-thumb.png',
      file: 'assets/certificates/n8n-certificate.pdf',
      details: 'Training includes AI agents, workflows, nodes, data handling, triggers, actions, filtering, branching, looping, APIs, MCP, and AI agents.'
    },
    {
      id: 'zapier-cert',
      name: 'No-Code Automation with Zapier',
      provider: 'Tara AI Community+',
      date: 'August 9, 2026',
      thumb: 'assets/certificates/zapier-certificate-thumb.png',
      file: 'assets/certificates/zapier-certificate.pdf',
      details: 'Training includes Zapier interface, triggers, Formatter, Delay, Filters, Paths, Looping, Sub-Zaps, Webhooks, and AI with human-in-the-loop workflows.'
    },
    {
      id: 'make-cert',
      name: 'No-Code Automation with Make.com',
      provider: 'Tara AI Community+',
      date: 'August 15, 2026',
      thumb: 'assets/certificates/make-certificate-thumb.png',
      file: 'assets/certificates/make-certificate.pdf',
      details: 'Training includes Make.com interface, scenario structure, filters, triggers, app connections, actions, data manipulation, advanced routing, HTTP requests, and AI agents.'
    },
    {
      id: 'ghl-cert',
      name: 'HighLevel CRM Full Training',
      provider: 'Tara AI Community+',
      date: 'September 3, 2026',
      thumb: 'assets/certificates/ghl-certificate-thumb.png',
      file: 'assets/certificates/ghl-certificate.pdf',
      details: 'Training includes CRM and pipeline management, sales funnels, website builder, surveys and forms, email marketing, booking and appointments, contacts, workflow automation, API integration, reputation management, tracking, analytics, communities, document signing, and AI agents.'
    },
    {
      id: 'prompt-cert',
      name: 'Prompt Engineering',
      provider: 'Tara AI Community+',
      date: 'August 27, 2026',
      thumb: 'assets/certificates/prompt-engineering-certificate-thumb.png',
      file: 'assets/certificates/prompt-engineering-certificate.pdf',
      details: 'Training includes prompt engineering fundamentals, anatomy of a good prompt, practical prompting techniques, real-world scenarios, tools, templates, prompt libraries, and workflow building.'
    }
  ];

  /* ---------------------------------------------------------
     Helpers
  --------------------------------------------------------- */
  function el(tag, className, html) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function tagsHTML(list) {
    return list.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('');
  }

  function listHTML(list) {
    return '<ul>' + list.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>';
  }

  /* ---------------------------------------------------------
     Render project cards
  --------------------------------------------------------- */
  var projectGrid = document.getElementById('projectGrid');

  PROJECTS.forEach(function (p) {
    var card = el('article', 'project-card reveal');
    card.innerHTML =
      '<div class="project-card__media">' +
        '<span class="project-card__platform">' + p.platform + '</span>' +
        '<img src="' + p.image + '" alt="' + p.title + ' workflow screenshot" loading="lazy">' +
      '</div>' +
      '<div class="project-card__body">' +
        '<h3>' + p.title + '</h3>' +
        '<p>' + p.description + '</p>' +
        '<div class="project-card__tools">' + tagsHTML(p.tools) + '</div>' +
        '<div class="project-card__footer">' +
          '<button class="link-btn" type="button" data-project="' + p.id + '">' +
            'View Workflow ' +
            '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>';
    projectGrid.appendChild(card);
  });

  /* ---------------------------------------------------------
     Render certification cards
  --------------------------------------------------------- */
  var certGrid = document.getElementById('certGrid');

  CERTS.forEach(function (c) {
    var card = el('article', 'cert-card reveal');
    card.innerHTML =
      '<div class="cert-card__thumb">' +
        '<img src="' + c.thumb + '" alt="' + c.name + ' certificate thumbnail" loading="lazy">' +
      '</div>' +
      '<div class="cert-card__body">' +
        '<h3>' + c.name + '</h3>' +
        '<span class="cert-card__provider">' + c.provider + '</span>' +
        '<span class="cert-card__date">' + c.date + '</span>' +
        '<button class="link-btn" type="button" data-cert="' + c.id + '">' +
          'View Certificate ' +
          '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
        '</button>' +
      '</div>';
    certGrid.appendChild(card);
  });

  /* ---------------------------------------------------------
     Modal
  --------------------------------------------------------- */
  var modal = document.getElementById('modal');
  var modalImage = document.getElementById('modalImage');
  var modalPlatform = document.getElementById('modalPlatform');
  var modalTitle = document.getElementById('modalTitle');
  var modalContent = document.getElementById('modalContent');
  var modalClose = document.getElementById('modalClose');
  var modalBackdrop = document.getElementById('modalBackdrop');
  var lastFocused = null;

  function openProjectModal(id) {
    var p = PROJECTS.filter(function (x) { return x.id === id; })[0];
    if (!p) return;

    modalImage.src = p.image;
    modalImage.alt = p.title + ' workflow screenshot';
    modalPlatform.textContent = p.platform;
    modalTitle.textContent = p.title;
    modalContent.innerHTML =
      '<div class="modal-section"><h4>Overview</h4><p>' + p.description + '</p></div>' +
      '<div class="modal-section"><h4>Problem</h4><p>' + p.problem + '</p></div>' +
      '<div class="modal-section"><h4>Solution</h4><p>' + p.solution + '</p></div>' +
      '<div class="modal-section"><h4>Tools Used</h4><div class="project-card__tools">' + tagsHTML(p.tools) + '</div></div>' +
      '<div class="modal-section"><h4>Key Workflow Features</h4>' + listHTML(p.features) + '</div>';

    openModal();
  }

  function openCertModal(id) {
    var c = CERTS.filter(function (x) { return x.id === id; })[0];
    if (!c) return;

    modalImage.src = c.thumb;
    modalImage.alt = c.name + ' certificate';
    modalPlatform.textContent = c.provider;
    modalTitle.textContent = c.name;
    modalContent.innerHTML =
      '<div class="modal-section"><h4>Issued</h4><p>' + c.date + '</p></div>' +
      '<div class="modal-section"><h4>Training Covered</h4><p>' + c.details + '</p></div>' +
      '<div class="modal-section"><a class="btn btn--ghost" href="' + c.file + '" target="_blank" rel="noopener">Open Full Certificate (PDF)</a></div>';

    openModal();
  }

  function openModal() {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener('click', function (e) {
    var projectBtn = e.target.closest('[data-project]');
    var certBtn = e.target.closest('[data-cert]');
    if (projectBtn) openProjectModal(projectBtn.getAttribute('data-project'));
    if (certBtn) openCertModal(certBtn.getAttribute('data-cert'));
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  /* ---------------------------------------------------------
     Navbar: scroll state, mobile menu, active link
  --------------------------------------------------------- */
  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));

  function toggleNav() {
    var open = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  navToggle.addEventListener('click', toggleNav);

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 12);
    backToTop.classList.toggle('visible', window.scrollY > 480);
  }

  /* ---------------------------------------------------------
     Active nav link via IntersectionObserver
  --------------------------------------------------------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));

  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(function (s) { navObserver.observe(s); });

  /* ---------------------------------------------------------
     Scroll reveal animations
  --------------------------------------------------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealEls.forEach(function (elm) { elm.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (elm) { revealObserver.observe(elm); });
  }

  /* ---------------------------------------------------------
     Back to top
  --------------------------------------------------------- */
  var backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

})();
