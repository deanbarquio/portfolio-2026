import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../safe-html.pipe';
import { ICONS } from '../file-icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ExperienceTech {
  label: string;
  icon: string;
}

export interface ExperienceItem {
  id: string;
  num: string;
  role: string;
  org: string | null;
  date: string;
  summary: string;
  highlights: string[];
  tech: ExperienceTech[];
}

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: './experience-section.component.html',
  styleUrl: './experience-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceSectionComponent implements AfterViewInit, OnDestroy {
  protected readonly icons = ICONS;
  public readonly items = input.required<ExperienceItem[]>();

  @ViewChild('stepperRoot') private stepperRoot?: ElementRef<HTMLElement>;

  private scrollTriggers: ScrollTrigger[] = [];

  /**
   * @private
   * @description Initializes the vertical stepper GSAP reveal.
   * @returns void
   */
  private initStepperMotion(): void {
    if (!this.stepperRoot) return;

    const root = this.stepperRoot.nativeElement;
    const line = root.querySelector<HTMLElement>('.exp-stepper__line');
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.exp-stepper__card'));

    if (!line || cards.length === 0) return;

    gsap.set(line, { scaleY: 0 });
    gsap.set(cards, { opacity: 0, y: 16 });

    const st = ScrollTrigger.create({
      trigger: root,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap
          .timeline()
          .to(line, { scaleY: 1, duration: 0.9, ease: 'power3.out' })
          .to(cards, { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power2.out' }, '-=0.4');
      }
    });

    this.scrollTriggers.push(st);
  }

  /**
   * @private
   * @description Lifecycle hook to start animations after view init.
   * @returns void
   */
  ngAfterViewInit(): void {
    this.initStepperMotion();
  }

  /**
   * @private
   * @description Kills created ScrollTriggers.
   * @returns void
   */
  ngOnDestroy(): void {
    this.scrollTriggers.forEach((t) => t.kill());
    this.scrollTriggers = [];
  }
}

