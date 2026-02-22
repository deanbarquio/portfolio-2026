import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly name = signal('DEAN LOURENCE P. BARQUIO');
  protected readonly contact = signal({
    email: 'deanbarquio@gmail.com',
    phone: '+639480008380',
    location: 'Consolacion Cebu, Philippines'
  });

  protected readonly education = signal([
    {
      year: 'NOW',
      degree: 'INFORMATION TECHNOLOGY',
      school: 'University of Cebu Banilad'
    },
    {
      year: '2021',
      degree: 'Science, Technology, Engineering, and Mathematics',
      school: 'University of Cebu Banilad'
    },
    {
      year: '2019',
      degree: 'Junior High School',
      school: 'Academia de San Isidro Labrador'
    },
    {
      year: '2015',
      degree: 'Primary Education',
      school: 'Cabangahan Elementary School'
    }
  ]);

  protected readonly experiences = signal([
    {
      year: 'NOW',
      role: 'Finance Volunteer',
      org: 'Philippine Society of IT Students (PSITS)'
    },
    {
      year: '2024',
      role: 'Treasurer',
      org: 'Philippine Society of IT Students (PSITS)'
    },
    {
      year: '2024',
      role: 'Alliance Jumpstart Program',
      org: 'Alliance Cebu Philippines'
    },
    {
      year: '2023',
      role: 'Second Year Representative',
      org: 'Philippine Society of IT Students (PSITS)'
    }
  ]);

  protected readonly achievements = signal([
    'Magna Cum Laude',
    'Outstanding IT Graduate',
    'IT Excellence Awardee',
    "Dean's Lister"
  ]);

  // Tech bubbles: size = xl | lg | md | sm
  protected readonly techStack = signal([
    { name: 'Java', icon: '☕', size: 'xl' },
    { name: 'React', icon: '⚛️', size: 'xl' },
    { name: 'Node.js', icon: '🟢', size: 'lg' },
    { name: 'JavaScript', icon: 'JS', size: 'lg', isText: true },
    { name: 'Kotlin', icon: '🎯', size: 'lg' },
    { name: 'Python', icon: '🐍', size: 'lg' },
    { name: 'Firebase', icon: '🔥', size: 'md' },
    { name: 'Docker', icon: '🐳', size: 'md' },
    { name: 'MySQL', icon: '🗄️', size: 'md' },
    { name: 'Angular', icon: '🔺', size: 'md' },
    { name: 'C#', icon: 'C#', size: 'md', isText: true },
    { name: 'GCP', icon: '☁️', size: 'md' },
    { name: 'GitHub', icon: '🐙', size: 'md' },
    { name: 'Android', icon: '🤖', size: 'md' },
    { name: 'TypeScript', icon: 'TS', size: 'sm', isText: true },
    { name: 'Figma', icon: '🎨', size: 'sm' },
    { name: 'Postman', icon: '📮', size: 'sm' },
    { name: 'MongoDB', icon: '🍃', size: 'sm' },
  ]);

  // Projects with alternating layout (alt = true means text-left, mockup-right)
  protected readonly projects = signal([
    {
      num: '01',
      title: 'CONSTRACK',
      subtitle: 'Project Management App',
      description: "A comprehensive project management application for construction projects, focusing on employee handling, milestone tracking, task management, and manpower costing. Available on Android and Web.",
      tech: ['⚛️', '🟢', '🐍', '🎯', '🐳'],
      techNames: ['React', 'Node.js', 'Python', 'Kotlin', 'Docker'],
      mockupEmoji: '🏗️',
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
      mockupEmoji: '🎓',
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
      mockupEmoji: '📺',
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
      mockupEmoji: '🏠',
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
      mockupEmoji: '📅',
      mockupBg: 'linear-gradient(135deg, #181c18, #22281e)',
      alt: false
    }
  ]);

  protected readonly professionalSummary = signal(
    'Motivated and resourceful Information Technology student with a strong interest in project management. Proficient in Java, Python, and JavaScript, with experience in React, Node.js, and Kotlin. Familiar with Firebase, GCP, MySQL and MongoDB. Skilled in Agile methodologies.'
  );
}
