import {
  Component,
  signal,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

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
  @ViewChild('educationCanvas') private educationCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('educationSection') private educationSection?: ElementRef<HTMLElement>;

  protected readonly icons = ICONS;
  protected readonly theme = signal<'light' | 'dark'>('light');

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
      year: '2021 – present',
      degree: 'BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY',
      school: 'University of Cebu – Banilad Campus'
    }
  ]);

  protected readonly trainings = signal([
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
    }
  ]);

  protected readonly achievements = signal<
    { title: string; detail: string }[]
  >([
    { title: 'Magna Cum Laude', detail: 'Undergraduate graduation honors.' },
    { title: 'Outstanding IT Graduate', detail: 'Program-level recognition.' },
    { title: 'IT Excellence Awardee', detail: 'Department distinction.' },
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

  protected readonly projects = signal([
    {
      num: '01',
      title: 'CONSTRACK',
      subtitle: 'Project Management App',
      description: "A comprehensive project management application for construction projects, focusing on employee handling, milestone tracking, task management, and manpower costing. Available on Android and Web.",
      tech: ['⚛️', '🟢', '🐍', '🎯', '🐳'],
      techNames: ['React', 'Node.js', 'Python', 'Kotlin', 'Docker'],
      mockupEmoji: ICONS.building,
      mockupBg: 'linear-gradient(135deg, #1a2818, #252e20)',
      alt: false
    },
    {
      num: '02',
      title: 'PSITS WEBSITE',
      subtitle: 'Organization Management',
      description: 'Automating student organization workflow including Membership management and Merchandise payments for the Philippine Society of Information Technology Students.',
      tech: ['⚛️', '🟢', '🗄️', '☁️'],
      techNames: ['React', 'Node.js', 'MySQL', 'GCP'],
      mockupEmoji: ICONS.graduation,
      mockupBg: 'linear-gradient(135deg, #1a1e18, #22261e)',
      alt: true
    },
    {
      num: '03',
      title: 'NTV360 CONTROL PANEL',
      subtitle: 'Feature Management Panel',
      description: 'A control panel tool for N-Compass TV that manages and controls the features of their enterprise applications, streamlining feature flag management and system configuration.',
      tech: ['🔺', '🟢', '🗄️', '🔥'],
      techNames: ['Angular', 'Node.js', 'MySQL', 'Firebase'],
      mockupEmoji: ICONS.tv,
      mockupBg: 'linear-gradient(135deg, #181c18, #202620)',
      alt: false
    },
    {
      num: '04',
      title: 'BUILDIT',
      subtitle: 'Mobile Application',
      description: 'A mobile application connecting construction workers with clients in the community. Users can find skilled workers for projects, and independent contractors can streamline their service offerings.',
      tech: ['🎯', '☕', '🔥', '🗄️'],
      techNames: ['Kotlin', 'Java', 'Firebase', 'MySQL'],
      mockupEmoji: ICONS.home,
      mockupBg: 'linear-gradient(135deg, #1c2018, #252822)',
      alt: true
    },
    {
      num: '05',
      title: 'BOOKING MANAGEMENT',
      subtitle: 'Reservation System',
      description: 'A non-commercial booking system tailored for enterprise use, streamlining business rules for room reservations and scheduling with Alliance Jumpstart Program.',
      tech: ['⚛️', '🟢', '🗄️'],
      techNames: ['React', 'Node.js', 'MySQL'],
      mockupEmoji: ICONS.calendar,
      mockupBg: 'linear-gradient(135deg, #181c18, #22281e)',
      alt: false
    }
  ]);

  protected readonly professionalSummary = signal(
    'Software engineer and frontend developer focused on Angular and Svelte with Tailwind CSS — shipping typed, maintainable UIs. Strong in JavaScript/TypeScript ecosystems, Node.js, and mobile (Kotlin/Java), with Firebase, GCP, and SQL/NoSQL data layers. Agile delivery and QA-minded delivery.'
  );

  private disposeEducationScene?: () => void;
  private educationParticleMat?: THREE.PointsMaterial;
  private educationWireMat?: THREE.MeshBasicMaterial;
  private educationScrollTriggers: ScrollTrigger[] = [];

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
    const t = stored === 'dark' || stored === 'light' ? stored : 'light';
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
      this.syncEducationThreeTheme();
      ScrollTrigger.refresh();
    });
  }

  ngAfterViewInit() {
    this.initParallax();
    this.initScrollAnimations();
    this.initMagneticHover();
    this.init3DTiltHover();
    this.initTimelineScroll();
    this.initEducationThree();
    this.initVhEducationMotion();
  }

  ngOnDestroy() {
    this.disposeEducationScene?.();
    this.educationScrollTriggers.forEach((t) => t.kill());
    this.educationScrollTriggers = [];
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

  /** Minimal Three.js: static buffers, GPU point rendering, resize + visibility + dispose. */
  private initEducationThree() {
    if (typeof window === 'undefined') return;

    const canvas = this.educationCanvas?.nativeElement;
    const section = this.educationSection?.nativeElement ?? canvas?.parentElement;
    if (!canvas || !section) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const n = 800;
    const positions = new Float32Array(n * 3);
    for (let i = 0; i < n * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 16;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x000000,
      size: 0.045,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
      sizeAttenuation: true
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const wireGeo = new THREE.TetrahedronGeometry(2.4, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
      transparent: true,
      opacity: 0.05
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    this.educationParticleMat = particleMat;
    this.educationWireMat = wireMat;
    this.syncEducationThreeTheme();

    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0, rootMargin: '100px' }
    );
    io.observe(section);

    const resize = () => {
      const w = section.clientWidth;
      const h = section.clientHeight;
      if (w < 1 || h < 1) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(section);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      particles.rotation.y += 0.00035;
      particles.rotation.x += 0.00012;
      wireMesh.rotation.y -= 0.0005;
      wireMesh.rotation.x += 0.00025;
      renderer.render(scene, camera);
    };

    resize();
    raf = requestAnimationFrame(tick);

    this.disposeEducationScene = () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      particleGeo.dispose();
      particleMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      renderer.dispose();
      this.educationParticleMat = undefined;
      this.educationWireMat = undefined;
    };
  }

  private syncEducationThreeTheme(): void {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    const hex = dark ? 0xffffff : 0x000000;
    if (this.educationParticleMat) {
      this.educationParticleMat.color.setHex(hex);
      this.educationParticleMat.opacity = dark ? 0.09 : 0.07;
    }
    if (this.educationWireMat) {
      this.educationWireMat.color.setHex(hex);
      this.educationWireMat.opacity = dark ? 0.055 : 0.045;
    }
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
    gsap.set('.edu-vh__chip', { opacity: 0, y: 20, scale: 0.92 });
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
        '.edu-vh__chip',
        { opacity: 1, y: 0, scale: 1, duration: 0.52, stagger: 0.09, ease: 'back.out(1.45)' },
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

  scrollTo(sectionId: string, event: Event) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

