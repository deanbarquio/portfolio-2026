import {
  Component,
  signal,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnInit,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { ICONS } from './file-icons';
import { SafeHtmlPipe } from './safe-html.pipe';
import { ExperienceSectionComponent } from './experience-section/experience-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe, ExperienceSectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('educationSection') private educationSection?: ElementRef<HTMLElement>;

  protected readonly icons = ICONS;
  protected readonly theme = signal<'light' | 'dark'>('dark');
  protected readonly activeProject = signal<string | null>(null);
  protected readonly isMobileMenuOpen = signal(false);

  protected readonly name = signal('DEAN LOURENCE P. BARQUIO');
  protected readonly contact = signal({
    email: 'deanbarquio@gmail.com',
    phone: '+639480008380',
    location: 'Consolacion, Cebu, Philippines'
  });

  /** Served from /public — matches Dean Lourence P. Barquio résumé PDF */
  protected readonly resumePdfHref = '/resume-dean-barquio.pdf';

  /** Primary frontend stack labels (Angular, Svelte, Tailwind CSS) */
  protected readonly frontendStack = signal(['Angular', 'Svelte', 'Tailwind CSS']);

  /** College / university level only */
  protected readonly tertiaryEducation = signal([
    {
      year: '2021 – 2025',
      degree: 'BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY',
      school: 'University of Cebu – Banilad Campus'
    }
  ]);

  protected readonly trainings = signal([
    {
      year: '2025',
      title: 'DevFest Cebu 2025',
      description:
        'Theme: “Building Safe, Secure, and Scalable Solutions with AI and Cloud.” GDG community conference with Google Developer Experts and industry leaders — talks, workshops, and networking for practical skills and the latest in AI and cloud. Golden Peak Hotel & Suites, Mandaue.'
    },
    {
      year: '2024',
      title: 'Alliance Jumpstart Program',
      description:
        'Hands-on program for industry-level experience: real-world problems, project management, and high-quality outputs — with teamwork and leadership.'
    }
  ]);

  protected readonly professionalExperiences = signal<
    {
      id: string;
      num: string;
      role: string;
      org: string | null;
      date: string;
      summary: string;
      highlights: string[];
      tech: { label: string; icon: string }[];
    }[]
  >([
    {
      id: 'frontend-angular',
      num: '03',
      role: 'Software Engineer · Frontend Developer',
      org: null,
      date: 'July 2025 – Present',
      summary:
        'Angular 21+ UI with Lottie + libraries; Svelte support; realtime + file workflows.',
      highlights: [
        'Angular 21+ + Tailwind CSS (component architecture).',
        'Lottie micro-interactions for UI feedback.',
        'Component libraries + Svelte workflows.',
        'Sockets + Filestack for realtime + file handling.'
      ],
      tech: [
        { label: 'Angular 21+', icon: ICONS.triangle },
        { label: 'Tailwind CSS', icon: ICONS.tailwind },
        { label: 'Lottie', icon: ICONS.lottie },
        { label: 'Component Libraries', icon: ICONS.software },
        { label: 'Svelte', icon: ICONS.svelte },
        { label: 'Sockets', icon: ICONS.sockets },
        { label: 'Filestack', icon: ICONS.filestack }
      ]
    },
    {
      id: 'fullstack-control-panel',
      num: '02',
      role: 'Full-Stack Developer',
      org: null,
      date: 'Mar – May 2025',
      summary:
        'Built control panels end-to-end → extended HR inventory + manpower UX.',
      highlights: [
        'Next.js + Tailwind UI for feature management.',
        'Prisma + TypeScript Node API + ElasticSearch.',
        'Extended HR inventory & manpower handling.',
        'Frontend + backend ownership.'
      ],
      tech: [
        { label: 'Next.js', icon: ICONS.nextjs },
        { label: 'Tailwind CSS', icon: ICONS.tailwind },
        { label: 'Prisma', icon: ICONS.prisma },
        { label: 'TypeScript', icon: ICONS.code },
        { label: 'Node.js', icon: ICONS.node },
        { label: 'ElasticSearch', icon: ICONS.elastic },
        { label: 'Backend API', icon: ICONS.api }
      ]
    },
    {
      id: 'qa-intern',
      num: '01',
      role: 'Quality Assurance (Intern)',
      org: null,
      date: 'Jan – Mar 2025',
      summary:
        'Manual QA in Jira → user story validation → Selenium automation.',
      highlights: [
        'Manual testing (exploratory + regression).',
        'Jira bug tickets + improvement requests.',
        'User stories + acceptance criteria.',
        'Selenium automation for repeat checks.'
      ],
      tech: [
        { label: 'Jira', icon: ICONS.jira },
        { label: 'Manual Testing', icon: ICONS.checkCircle },
        { label: 'Bug Tickets', icon: ICONS.bug },
        { label: 'User Stories', icon: ICONS.software },
        { label: 'Acceptance Criteria', icon: ICONS.checkCircle },
        { label: 'Selenium', icon: ICONS.selenium }
      ]
    }
  ]);

  protected readonly achievements = signal<
    { title: string; detail: string }[]
  >([
    { title: 'Magna Cum Laude', detail: 'Graduation honors.' },
    { title: 'Outstanding IT Graduate', detail: 'University Department recognition.' },
    { title: 'IT Excellence Awardee', detail: 'Department distinction of Excellence.' },
    { title: "Dean's Lister", detail: 'Consistent academic term honors.' }
  ]);

  protected readonly techStack = signal([
    { name: 'Angular', icon: ICONS.triangle, size: 'xl' },
    { name: 'Svelte', icon: ICONS.svelte, size: 'xl' },
    { name: 'Tailwind', icon: ICONS.tailwind, size: 'xl' },
    { name: 'TypeScript', icon: ICONS.code, size: 'lg', isText: true },
    { name: 'React', icon: ICONS.frontend, size: 'lg' },
    { name: 'Node.js', icon: ICONS.node, size: 'lg' },
    { name: 'Java', icon: ICONS.coffee, size: 'lg' },
    { name: 'JavaScript', icon: ICONS.code, size: 'md', isText: true },
    { name: 'Kotlin', icon: ICONS.target, size: 'md' },
    { name: 'Python', icon: ICONS.python, size: 'md' },
    { name: 'Firebase', icon: ICONS.flame, size: 'md' },
    { name: 'Docker', icon: ICONS.server, size: 'md' },
    { name: 'MySQL', icon: ICONS.database, size: 'md' },
    { name: 'C#', icon: ICONS.code, size: 'md', isText: true },
    { name: 'GCP', icon: ICONS.cloud, size: 'md' },
    { name: 'GitHub', icon: ICONS.gitBranch, size: 'md' },
    { name: 'Android', icon: ICONS.smartphone, size: 'md' },
    { name: 'Figma', icon: ICONS.palette, size: 'sm' },
    { name: 'Postman', icon: ICONS.mail, size: 'sm' },
    { name: 'MongoDB', icon: ICONS.leaf, size: 'sm' },
  ]);

  protected readonly projects = signal<{
    num: string; title: string; subtitle: string; description: string;
    tech: string[]; techNames: string[]; mockupEmoji: string;
    mockupBg: string; alt: boolean;
    images: { src: string; alt: string; label: string; type: string }[];
  }[]>([
    {
      num: '01',
      title: 'COMPONENT PANTRY',
      subtitle: 'Component Library',
      description: 'An in-house component library deployed via Verdaccio, used across NTV360 projects. Installed via npm for consistent UI and rapid development.',
      tech: ['🔺', '🎨'],
      techNames: ['Angular', 'Tailwind CSS'],
      mockupEmoji: ICONS.software,
      mockupBg: 'linear-gradient(135deg, #182028, #1e2832)',
      alt: false,
      images: []
    },
    {
      num: '02',
      title: 'INVENTORY SYSTEM',
      subtitle: 'HR Management Tool',
      description: 'An internal tool built during my internship for the HR department to effectively track company inventory and manage employee records.',
      tech: ['⚛️', '📘', '🗄️'],
      techNames: ['Next.js', 'TypeScript', 'Prisma'],
      mockupEmoji: ICONS.database,
      mockupBg: 'linear-gradient(135deg, #181c28, #222632)',
      alt: true,
      images: []
    },
    {
      num: '03',
      title: 'CONSTRACK',
      subtitle: 'Project Management App',
      description: 'A comprehensive project management application for construction projects, focusing on employee handling, milestone tracking, task management, and manpower costing. Available on Android and Web.',
      tech: ['⚛️', '🟢', '🐍', '🎯', '🐳', '🧠'],
      techNames: ['React', 'Node.js', 'Python', 'Kotlin', 'Docker', 'Integrated Role Based Intelligence'],
      mockupEmoji: ICONS.building,
      mockupBg: 'linear-gradient(135deg, #1a2818, #252e20)',
      alt: false,
      images: [
        { src: '/constrack-web.png', alt: 'Constrack Web Dashboard', label: 'Web Dashboard', type: 'web' },
        { src: '/constrack-mobile.png', alt: 'Constrack Mobile App', label: 'Mobile App', type: 'mobile' }
      ]
    },
    {
      num: '04',
      title: 'PSITS WEBSITE',
      subtitle: 'Organization Management',
      description: 'Automating student organization workflow including Membership management and Merchandise payments for the Philippine Society of Information Technology Students.',
      tech: ['⚛️', '🟢', '🗄️', '☁️'],
      techNames: ['React', 'Node.js', 'MySQL', 'GCP'],
      mockupEmoji: ICONS.graduation,
      mockupBg: 'linear-gradient(135deg, #1a1e18, #22261e)',
      alt: true,
      images: [
        { src: '/psits_website.png', alt: 'PSITS Website Landing', label: 'Landing Page', type: 'web' },
        { src: '/psits_website_2.png', alt: 'PSITS Website Management', label: 'Management View', type: 'web' }
      ]
    },
    {
      num: '05',
      title: 'NTV360 CONTROL PANEL',
      subtitle: 'Feature Management Panel',
      description: 'A control panel tool for N-Compass TV that manages and controls the features of their enterprise applications, streamlining feature flag management and system configuration.',
      tech: ['🔺', '🟢', '🗄️', '🔥'],
      techNames: ['Angular', 'Node.js', 'MySQL', 'Firebase'],
      mockupEmoji: ICONS.tv,
      mockupBg: 'linear-gradient(135deg, #181c18, #202620)',
      alt: false,
      images: [
        { src: '/control_panel.png', alt: 'NTV360 Control Panel Interface', label: 'Control Panel', type: 'web' },
        { src: '/control_panel_2.png', alt: 'NTV360 Features management', label: 'Feature Flags', type: 'web' }
      ]
    },
    {
      num: '06',
      title: 'BUILDIT',
      subtitle: 'Mobile Application',
      description: 'A mobile application connecting construction workers with clients in the community. Users can find skilled workers for projects, and independent contractors can streamline their service offerings.',
      tech: ['🎯', '☕', '🔥', '🗄️'],
      techNames: ['Kotlin', 'Java', 'Firebase', 'MySQL'],
      mockupEmoji: ICONS.home,
      mockupBg: 'linear-gradient(135deg, #1c2018, #252822)',
      alt: true,
      images: [
        { src: '/buildIt_mobile.png', alt: 'BuildIt Mobile App Home', label: 'Home', type: 'mobile' },
        { src: '/buildIt_mobile_2.png', alt: 'BuildIt Mobile App Search', label: 'Search', type: 'mobile' },
        { src: '/buildIt_mobile_3.png', alt: 'BuildIt Mobile App Profile', label: 'Profile', type: 'mobile' },
        { src: '/buildIt_mobile_4.png', alt: 'BuildIt Mobile App History', label: 'History', type: 'mobile' }
      ]
    },
    {
      num: '07',
      title: 'BOOKING MANAGEMENT',
      subtitle: 'Reservation System',
      description: 'A non-commercial booking system tailored for enterprise use, streamlining business rules for room reservations and scheduling with Alliance Jumpstart Program.',
      tech: ['⚛️', '🟢', '🗄️'],
      techNames: ['React', 'Node.js', 'MySQL'],
      mockupEmoji: ICONS.calendar,
      mockupBg: 'linear-gradient(135deg, #181c18, #22281e)',
      alt: false,
      images: [
        { src: '/meeting_room1.png', alt: 'Booking Management — My Bookings and room tables', label: 'My Bookings', type: 'web' },
        { src: '/meeting_room2.png', alt: 'Booking Management — calendar and pending cancellations', label: 'Calendar', type: 'web' },
        { src: '/meeting_room3.png', alt: 'Booking Management — room style and availability', label: 'Room setup', type: 'web' },
        { src: '/meeting_room4.png', alt: 'Booking Management — new booking and scheduling', label: 'New booking', type: 'web' }
      ]
    }
  ]);

  protected readonly professionalSummary = signal(
    'Software Engineer & Frontend Developer with a strong background in Information Technology. Proficient in programming languages including Java, Python, and JavaScript, with experience developing responsive web and mobile applications using frameworks such as React, Node.js, and Kotlin. Familiar with cloud platforms like Firebase and Google Cloud, with hands-on experience in database systems like MySQL and MongoDB. Skilled in applying Agile methodologies to projects, collaborating effectively in team environments, and quickly adapting to new technologies. Dedicated to leveraging IT solutions to solve real-world problems and committed to continuously improving technical skills, particularly in quality assurance for every project.'
  );

  private educationScrollTriggers: ScrollTrigger[] = [];
  private accordionScrollTriggers: ScrollTrigger[] = [];
  private accordionRefreshCall?: gsap.core.Tween;
  private lastManualAccordionToggleAt = 0;
  private accordionIsAnimating = false;
  private accordionScrollCooldownUntil = 0;

  private static readonly THEME_KEY = 'portfolio-theme';

  ngOnInit(): void {
    const el = document.documentElement;
    const attr = el.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') {
      this.theme.set(attr);
      return;
    }
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(App.THEME_KEY);
    } catch {
      /* ignore */
    }
    const t = stored === 'dark' || stored === 'light' ? stored : 'dark';
    this.theme.set(t);
    el.setAttribute('data-theme', t);
  }

  toggleTheme(): void {
    const next = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(App.THEME_KEY, next);
    } catch {
      /* ignore */
    }
    queueMicrotask(() => {
      ScrollTrigger.refresh();
    });
  }

  toggleMobileMenu(): void {
    this.setMobileMenuState(!this.isMobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.setMobileMenuState(false);
  }

  onMobileMenuBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeMobileMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePressed(): void {
    if (this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 860 && this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  ngAfterViewInit() {
    // this.initParallax(); // Remove hero sliding parallax
    this.initScrollAnimations();
    this.initMagneticHover();
    this.init3DTiltHover();
    this.initTimelineScroll();
    this.initVhEducationMotion();
    this.initWorkAccordion();
  }

  ngOnDestroy() {
    this.unlockPageScroll();
    this.educationScrollTriggers.forEach((t) => t.kill());
    this.educationScrollTriggers = [];
    this.accordionScrollTriggers.forEach((t) => t.kill());
    this.accordionScrollTriggers = [];
    this.accordionRefreshCall?.kill();
  }

  private initParallax() {
    if (!this.heroSection) return;

    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;

      // Cleaned old parallax elements, optionally add new parallax effects here
    });
  }

  private setMobileMenuState(isOpen: boolean): void {
    this.isMobileMenuOpen.set(isOpen);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return;
    }
    this.unlockPageScroll();
  }

  private unlockPageScroll(): void {
    document.body.style.overflow = '';
  }

  /** Van Holtz–style scroll reveals, band chips, and scrubbed parallax on the education block */
  private initVhEducationMotion(): void {
    if (typeof window === 'undefined') return;
    const root = document.querySelector('.edu-vh');
    if (!root) return;

    const track = (st: ScrollTrigger | null | undefined) => {
      if (st) this.educationScrollTriggers.push(st);
    };

    gsap.set('.edu-vh__band-left', { opacity: 0, y: 28 });
    gsap.set('.edu-vh__stack-label', { opacity: 0, y: 12 });
    gsap.set('.edu-vh__item', { opacity: 0, y: 20, scale: 0.96 });
    gsap.set('.edu-vh__resume', { opacity: 0, x: 28 });
    gsap.set('.edu-vh__next-label', { opacity: 0, y: 22 });
    gsap.set('.edu-vh__mega-line', { opacity: 0, y: 64 });
    gsap.set('.edu-vh__col', { opacity: 0, y: 40 });

    const bandTl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    });
    bandTl
      .to('.edu-vh__band-left', { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' })
      .to('.edu-vh__stack-label', { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.5')
      .to(
        '.edu-vh__item',
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out' },
        '-=0.35'
      )
      .to('.edu-vh__resume', { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out' }, '-=0.55');
    track(bandTl.scrollTrigger);

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });
    heroTl
      .to('.edu-vh__next-label', { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' })
      .to(
        '.edu-vh__mega-line',
        { opacity: 1, y: 0, duration: 1.05, stagger: 0.1, ease: 'power4.out' },
        '-=0.35'
      );
    track(heroTl.scrollTrigger);

    const megaParallax = gsap.to('.edu-vh__mega', {
      xPercent: -3.5,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.15
      }
    });
    track(megaParallax.scrollTrigger);

    const colTween = gsap.to('.edu-vh__col', {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.edu-vh__columns',
        start: 'top 86%',
        toggleActions: 'play none none none'
      }
    });
    track(colTween.scrollTrigger);
  }

  private initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;

          if (el.classList.contains('gsap-reveal')) {
            gsap.fromTo(el,
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', overwrite: 'auto' }
            );
          } else if (el.classList.contains('gsap-reveal-stagger')) {
            const children = el.children;
            gsap.fromTo(children,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', overwrite: 'auto' }
            );
          }

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });

    // Identify targets and immediately hide them to prevent flashes
    if (typeof document !== 'undefined') {
      const targets = document.querySelectorAll('.gsap-reveal, .gsap-reveal-stagger');
      targets.forEach((el: any) => {
        if (el.closest('.edu-vh')) return;
        observer.observe(el);
        if (el.classList.contains('gsap-reveal')) {
          gsap.set(el, { opacity: 0 });
        } else {
          gsap.set(el.children, { opacity: 0 });
        }
      });
    }
  }

  private initMagneticHover() {
    if (typeof document === 'undefined') return;

    const magneticElements = document.querySelectorAll('.magnetic-wrap');

    magneticElements.forEach((el: any) => {
      el.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        // Calculate raw offset from the exact center of the bounding box
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
          x: x * 0.15, // Intensity of magnetic effect on X
          y: y * 0.15, // Intensity of magnetic effect on Y
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.4)', // Smooth snap-back bounce
          overwrite: 'auto'
        });
      });
    });
  }

  private init3DTiltHover() {
    if (typeof document === 'undefined') return;

    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach((card: any) => {
      const inner = card.querySelector('.tilt-inner');

      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 1000,
          overwrite: 'auto'
        });

        if (inner) {
          inner.style.setProperty('--x', `${x}px`);
          inner.style.setProperty('--y', `${y}px`);
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.4)',
          overwrite: 'auto'
        });
      });
    });
  }

  private initTimelineScroll() {
    if (typeof window === 'undefined') return;

    window.addEventListener('scroll', () => {
      const groups = document.querySelectorAll('.timeline-group');

      groups.forEach((group: any) => {
        const progressLine = group.querySelector('.timeline-line-progress');
        if (!progressLine) return;

        const rect = group.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Start line drawing when the container is partially visible in viewport
        const scrollPos = windowHeight - rect.top - (windowHeight * 0.2);
        const totalHeight = rect.height;

        let progress = scrollPos / totalHeight;
        progress = Math.max(0, Math.min(1, progress));

        gsap.to(progressLine, { height: `${progress * 100}%`, duration: 0.3, ease: 'power1.out', overwrite: 'auto' });
      });
    });
  }

  toggleProject(num: string, source: 'manual' | 'scroll' = 'manual'): void {
    if (source === 'manual') {
      this.lastManualAccordionToggleAt = Date.now();
    }

    if (source === 'scroll') {
      const now = Date.now();
      if (this.accordionIsAnimating || now < this.accordionScrollCooldownUntil) return;
    }

    const current = this.activeProject();

    if (current === num) {
      this.activeProject.set(null);
      this.closeAccordionPanel(num, 0.42);
      this.queueAccordionRefresh(0.24);
    } else {
      if (current) {
        this.closeAccordionPanel(current, 0.36);
      }

      this.activeProject.set(num);
      this.openAccordionPanel(num);
      if (source === 'scroll') {
        this.accordionScrollCooldownUntil = Date.now() + 220;
      }
      this.queueAccordionRefresh(0.26);
    }
  }

  private closeAccordionPanel(num: string, duration = 0.4): void {
    const panel = document.querySelector(`[data-project="${num}"] .work-acc-panel`) as HTMLElement | null;
    if (!panel) return;

    const inner = panel.querySelector('.work-acc-panel-inner') as HTMLElement | null;
    const frames = panel.querySelectorAll('.work-acc-img-frame');

    gsap.killTweensOf(panel);
    if (inner) gsap.killTweensOf(inner);
    if (frames.length) gsap.killTweensOf(frames);

    gsap.set(panel, { height: panel.scrollHeight });
    gsap.to(panel, { height: 0, duration, ease: 'power2.inOut', overwrite: true });
    if (inner) {
      gsap.to(inner, { opacity: 0, y: -10, duration: Math.max(0.2, duration - 0.14), ease: 'power1.out', overwrite: true });
    }
  }

  private openAccordionPanel(num: string): void {
    const panel = document.querySelector(`[data-project="${num}"] .work-acc-panel`) as HTMLElement | null;
    if (!panel) return;

    const inner = panel.querySelector('.work-acc-panel-inner') as HTMLElement | null;
    const frames = panel.querySelectorAll('.work-acc-img-frame');

    gsap.killTweensOf(panel);
    if (inner) gsap.killTweensOf(inner);
    if (frames.length) gsap.killTweensOf(frames);

    gsap.set(panel, { height: 'auto' });
    const targetHeight = panel.scrollHeight;
    this.accordionIsAnimating = true;

    gsap.fromTo(
      panel,
      { height: 0 },
      {
        height: targetHeight,
        duration: 0.56,
        ease: 'power2.out',
        overwrite: true,
        onComplete: () => {
          gsap.set(panel, { height: 'auto' });
          this.accordionIsAnimating = false;
        },
        onInterrupt: () => {
          this.accordionIsAnimating = false;
        }
      }
    );

    if (inner) {
      gsap.fromTo(
        inner,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.42, delay: 0.08, ease: 'power2.out', overwrite: true }
      );
    }

    if (frames.length) {
      gsap.fromTo(
        frames,
        { opacity: 0, y: 20, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.46, stagger: 0.08, delay: 0.14, ease: 'power2.out', overwrite: true }
      );
    }
  }

  private queueAccordionRefresh(delay = 0.24): void {
    this.accordionRefreshCall?.kill();
    this.accordionRefreshCall = gsap.delayedCall(delay, () => {
      void ScrollTrigger.refresh();
    });
  }

  private initWorkAccordion(): void {
    if (typeof window === 'undefined') return;
    gsap.set('.work-acc-panel', { height: 0, overflow: 'hidden' });

    const items = document.querySelectorAll('.work-acc-item');
    if (items.length) {
      gsap.set(items, { opacity: 0, y: 50 });
      gsap.to(items, {
        opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.work-accordion', start: 'top 82%', toggleActions: 'play none none none' },
        onComplete: () => {
          // Only create auto-open triggers after the stagger reveal finishes
          this.createAccordionScrollTriggers();
        }
      });
    }

    const header = document.querySelector('.work-header-row');
    if (header) {
      gsap.set(header, { opacity: 0, y: 40 });
      gsap.to(header, {
        opacity: 1, y: 0, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: '.work-section', start: 'top 80%', toggleActions: 'play none none none' }
      });
    }
  }

  private createAccordionScrollTriggers(): void {
    this.accordionScrollTriggers.forEach((t) => t.kill());
    this.accordionScrollTriggers = [];

    this.projects().forEach((project) => {
      const el = document.querySelector(`[data-project="${project.num}"]`);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 52%',
        end: 'bottom 42%',
        refreshPriority: Number(project.num),
        onEnter: (self) => {
          if (Math.abs(self.getVelocity()) > 2000) return;
          if (Date.now() - this.lastManualAccordionToggleAt < 900) return;
          if (this.activeProject() !== project.num) {
            this.toggleProject(project.num, 'scroll');
          }
        },
        onEnterBack: (self) => {
          if (Math.abs(self.getVelocity()) > 2000) return;
          if (Date.now() - this.lastManualAccordionToggleAt < 900) return;
          if (this.activeProject() !== project.num) {
            this.toggleProject(project.num, 'scroll');
          }
        }
      });

      this.accordionScrollTriggers.push(st);
    });
  }

  scrollTo(sectionId: string, event: Event) {
    event.preventDefault();
    this.closeMobileMenu(); // Close menu if open
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openGmailCompose(event?: Event): void {
    event?.preventDefault();
    this.closeMobileMenu();

    const gmailUrl = new URL('https://mail.google.com/mail/');
    gmailUrl.searchParams.set('view', 'cm');
    gmailUrl.searchParams.set('fs', '1');
    gmailUrl.searchParams.set('to', 'deanbarquio@gmail.com');
    gmailUrl.searchParams.set('su', 'Portfolio inquiry');
    gmailUrl.searchParams.set('body', "Hi Dean, I'd like to connect regarding your portfolio.");
    const gmailComposeUrl = gmailUrl.toString();

    const win = window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');
    if (!win) {
      window.location.assign(gmailComposeUrl);
    }
  }
}

