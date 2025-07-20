import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView as useIntersectionObserver } from 'react-intersection-observer';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ExternalLink, 
  MapPin, 
  Calendar,
  Award,
  Code2,
  Database,
  Laptop,
  ChevronUp,
  Send,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ThemeToggle } from './ThemeToggle';
import { Navigation } from './Navigation';
import { Background3D } from './Background3D';
import { AnimatedCard } from './AnimatedCard';
import { ScrollAnimatedSection, ScrollAnimatedDiv } from './ScrollAnimatedSection';
import { PageTransition } from './PageTransition';
import profileAvatar from '../assets/profile-avatar.jpg';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } }
};

// Skill Progress Bar Component
const SkillBar = ({ skill, level, delay }: { skill: string, level: number, delay: number }) => {
  const [ref, inView] = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className="font-medium">{skill}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-progress"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

// Floating Label Input Component
const FloatingLabelInput = ({ label, type = "text", ...props }: any) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={type}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value !== '');
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== '');
          props.onChange?.(e);
        }}
        className="peer pt-6 pb-2 px-3 border-2 transition-all duration-200 focus:border-primary"
      />
      <label className={`floating-label ${focused || hasValue ? 'floating-label-active' : ''}`}>
        {label}
      </label>
    </div>
  );
};

const FloatingLabelTextarea = ({ label, ...props }: any) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <Textarea
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value !== '');
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== '');
          props.onChange?.(e);
        }}
        className="peer pt-6 pb-2 px-3 border-2 transition-all duration-200 focus:border-primary min-h-[120px]"
      />
      <label className={`floating-label ${focused || hasValue ? 'floating-label-active' : ''}`}>
        {label}
      </label>
    </div>
  );
};

export const Portfolio = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const skills = [
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Python", level: 70 },
    { name: "Java", level: 75 },
    { name: "SQL", level: 80 },
    { name: "MongoDB", level: 70 },
    { name: "Git", level: 85 }
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and MongoDB",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "#",
      demo: "#"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management tool with real-time updates",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop&crop=center",
      tech: ["React", "Socket.io", "Express", "PostgreSQL"],
      github: "#",
      demo: "#"
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather app with location-based forecasts",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop&crop=center",
      tech: ["JavaScript", "API Integration", "Chart.js"],
      github: "#",
      demo: "#"
    }
  ];

  const internships = [
    {
      company: "Tech Solutions Inc.",
      role: "Frontend Developer Intern",
      period: "Jun 2023 - Aug 2023",
      achievements: [
        "Developed responsive UI components using React and Tailwind CSS",
        "Collaborated with senior developers on 3 client projects",
        "Improved page load times by 30% through optimization"
      ]
    },
    {
      company: "StartupXYZ",
      role: "Full Stack Developer Intern",
      period: "Jan 2023 - May 2023",
      achievements: [
        "Built RESTful APIs using Node.js and Express",
        "Implemented user authentication and authorization",
        "Participated in agile development processes"
      ]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "XYZ University",
      period: "2020 - 2024",
      gpa: "8.5/10"
    }
  ];

  const certificates = [
    { name: "React Developer Certification", issuer: "Meta", image: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=300&h=200&fit=crop" },
    { name: "AWS Cloud Practitioner", issuer: "Amazon", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop" },
    { name: "JavaScript Algorithms", issuer: "freeCodeCamp", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop" }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen performance-optimized">
        <Background3D />
        <Navigation />
        <ThemeToggle />
      
        {/* Hero Section */}
        <ScrollAnimatedSection 
          id="hero" 
          className="section-padding min-h-screen flex items-center justify-center relative overflow-hidden z-10"
          animation="fade"
        >
          <div className="container-custom text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <img
                src={profileAvatar}
                alt="Profile"
                className="w-48 h-48 rounded-full mx-auto shadow-2xl border-4 border-primary/20"
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl sm:text-7xl font-bold text-gradient">
              Alex Johnson
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Aspiring Full-Stack Developer
            </p>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Passionate about creating beautiful, functional web applications with modern technologies
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <Button 
              onClick={() => scrollToSection('projects')}
              className="hero-button-primary"
            >
              View Projects
            </Button>
            <Button 
              variant="outline" 
              className="hero-button-secondary"
              onClick={() => window.open('#', '_blank')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </motion.div>
          </div>
        </ScrollAnimatedSection>

        {/* About Section */}
        <ScrollAnimatedSection id="about" className="section-padding" stagger>
          <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-6 text-gradient">
              About Me
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
              I'm a passionate computer science graduate with a strong foundation in full-stack development. 
              My journey in tech began with curiosity about how websites work, and has evolved into a deep 
              appreciation for creating user-centric applications. I enjoy solving complex problems and 
              am always eager to learn new technologies that can help me build better solutions.
            </motion.p>
          </motion.div>
          </div>
        </ScrollAnimatedSection>

        {/* Experience & Education Section */}
        <ScrollAnimatedSection id="experience" className="section-padding glass-card/30" stagger>
          <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Internships */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h3 variants={fadeInUp} className="text-3xl font-bold mb-8 flex items-center">
                <Briefcase className="mr-3 text-primary" />
                Internships
              </motion.h3>
              <div className="space-y-6">
                {internships.map((internship, index) => (
                  <AnimatedCard key={index} delay={index * 0.1}>
                      <CardHeader>
                        <CardTitle className="text-xl">{internship.role}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <span className="font-medium text-primary">{internship.company}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {internship.period}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {internship.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                  </AnimatedCard>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h3 variants={fadeInUp} className="text-3xl font-bold mb-8 flex items-center">
                <GraduationCap className="mr-3 text-primary" />
                Education
              </motion.h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <AnimatedCard key={index} delay={index * 0.1}>
                      <CardHeader>
                        <CardTitle className="text-xl">{edu.degree}</CardTitle>
                        <CardDescription className="flex flex-col gap-2">
                          <span className="font-medium text-primary">{edu.institution}</span>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {edu.period}
                            </span>
                            <Badge variant="secondary">GPA: {edu.gpa}</Badge>
                          </div>
                        </CardDescription>
                      </CardHeader>
                  </AnimatedCard>
                ))}
              </div>
            </motion.div>
          </div>
          </div>
        </ScrollAnimatedSection>

        {/* Projects Section */}
        <ScrollAnimatedSection id="projects" className="section-padding" stagger>
          <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-6 text-gradient">
              Featured Projects
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for development
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <AnimatedCard key={index} delay={index * 0.15} className="overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <Badge key={i} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
              </AnimatedCard>
            ))}
          </motion.div>
          </div>
        </ScrollAnimatedSection>

        {/* Skills Section */}
        <ScrollAnimatedSection id="skills" className="section-padding glass-card/30" stagger>
          <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-6 text-gradient">
              Technical Skills
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical proficiencies and ongoing learning journey
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                skill={skill.name}
                level={skill.level}
                delay={index * 0.1}
              />
            ))}
          </div>
          </div>
        </ScrollAnimatedSection>

        {/* Certificates Section */}
        <ScrollAnimatedSection className="section-padding" stagger>
          <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-6 text-gradient">
              Certifications
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional certifications that validate my skills and commitment to continuous learning
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
          >
            {certificates.map((cert, index) => (
              <AnimatedCard key={index} delay={index * 0.1} className="flex-shrink-0 w-80 overflow-hidden">
                  <div className="relative">
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge className="absolute top-4 right-4">
                      <Award className="h-3 w-3 mr-1" />
                      Certified
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{cert.name}</CardTitle>
                    <CardDescription>Issued by {cert.issuer}</CardDescription>
                  </CardHeader>
              </AnimatedCard>
            ))}
          </motion.div>
          </div>
        </ScrollAnimatedSection>

        {/* Contact Section */}
        <ScrollAnimatedSection id="contact" className="section-padding glass-card/30" stagger>
          <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-6 text-gradient">
              Get In Touch
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and interesting projects
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="glass-card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <FloatingLabelInput
                    label="Your Name"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <FloatingLabelInput
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                  <FloatingLabelTextarea
                    label="Your Message"
                    value={formData.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                  <Button type="submit" className="w-full hero-button-primary">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="text-muted-foreground mb-8">
                  Feel free to reach out through any of these channels. I typically respond within 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:alex.johnson@email.com"
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary transition-colors group"
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">alex.johnson@email.com</p>
                  </div>
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary transition-colors group"
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Linkedin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">Connect with me professionally</p>
                  </div>
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary transition-colors group"
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Github className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-sm text-muted-foreground">Check out my code repositories</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
          </div>
        </ScrollAnimatedSection>

      {/* Footer */}
      <footer className="section-padding bg-background/80 backdrop-blur-md border-t border-border">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-center md:text-left">
              © 2024 Alex Johnson. All rights reserved.
            </p>
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="icon"
              className="hover:scale-110 transition-all duration-300"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};