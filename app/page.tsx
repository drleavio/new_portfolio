"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Code, ExternalLink, Github, Mail, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"


export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const [data,setData]=useState({
    name:"",
    email:"",
    subject:"",
    message:""
  })
  const handleChange=(e:any)=>{
    const {name,value}=e.target;
    setData({
      ...data,
      [name]:value,
    })
  }

  const sendMessage = async (e: any) => {
    e.preventDefault();
  
    const res = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // ✅ Convert object to JSON string
    });
  
    const response = await res.json(); // Optional: handle response
    console.log("Server response:", response);
  
    setData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    
  };
  
  
  // Smooth scroll function
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80 // Height of the fixed header plus some padding
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  // Add smooth scrolling behavior to the document
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-featured online store with cart functionality, user authentication, and payment processing.",
      tags: ["React", "Next.js", "Stripe", "Tailwind CSS"],
      image:
        "https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg",
      github: "https://github.com/drleavio/assignment",
      demo: "#",
    },
    {
      title: "Filmify",
      description: "A movie reviews and rating checker app",
      tags: ["React", "Firebase", "Framer Motion", "TypeScript"],
      image: "https://cdn.colorexpertsbd.com/wp-content/uploads/2018/05/011_1.jpg",
      github: "https://github.com/drleavio/FilmiFY-1",
      demo: "https://fluffy-gaufre-f5c528.netlify.app/",
    },
    {
      title: "Feedback and sentiment Analyser",
      description:
        "Utilized Next.js and TypeScript to build both frontend and backend components, demonstrating proficiency in",
      tags: ["React", "Chart.js", "OpenWeather API", "Styled Components"],
      image:
        "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1-1500x1000.jpg",
      github: "https://github.com/drleavio/grindaAIassesment",
      demo: "https://github.com/drleavio/grindaAIassesment",
    },
  ]

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "Node.js",
    "Git",
    "Figma",
    "Responsive Design",
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-40 border-b">
        <div className="container flex justify-between items-center h-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="text-xl font-bold">
              <span className="text-primary">Dev</span>Rahul
            </Link>
          </motion.div>
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-6"
          >
            {["Home", "About", "Skills", "Projects", "Contact"].map((item, index) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, item.toLowerCase())}
                className="relative text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              >
                {item}
              </Link>
            ))}
          </motion.nav>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Button variant="outline" size="sm" asChild>
              <Link href="https://drive.google.com/file/d/1g7yX4J0xo-DR7n9XBVFM2T8nByealEoi/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">
                Resume
              </Link>
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center pt-16">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
        </div>
        <div className="container">
          <motion.div
            style={{ opacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
            <ArrowDown className="animate-bounce" />
          </motion.div>

          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <span className="inline-block px-3 py-1 text-sm bg-primary/10 text-primary rounded-full mb-4">
                Frontend Developer
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Creating <span className="text-primary">engaging</span> web experiences
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8"
            >
              I build modern, interactive, and responsive websites with attention to detail and performance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg">
                <Link href="#projects" onClick={(e) => scrollToSection(e, "projects")}>
                  View My Work
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#contact" onClick={(e) => scrollToSection(e, "contact")}>
                  Get In Touch
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <User className="mr-2 text-primary" /> About Me
            </h2>

            <div className="grid md:grid-cols-[2fr_1fr] gap-8">
              <div className="space-y-4">
                <p>
                  Hello! I'm a passionate frontend developer with a keen eye for design and a love for creating smooth,
                  interactive user experiences. I specialize in building modern web applications using the latest
                  technologies and best practices.
                </p>
                <p>
                  With a background in both design and development, I bridge the gap between aesthetics and
                  functionality. I'm constantly learning and exploring new technologies to stay at the forefront of web
                  development.
                </p>
                <p>
                  When I'm not coding, you can find me exploring design trends, contributing to open-source projects, or
                  sharing my knowledge through blog posts and community events.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ margin: "-100px" }}
                className="bg-background rounded-lg p-6 shadow-lg border"
              >
                <h3 className="font-medium mb-4">Quick Info</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="font-medium min-w-24">Experience:</span>
                    <span>6+ Months</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium min-w-24">Location:</span>
                    <span>Noida, UP</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium min-w-24">Education:</span>
                    <span>B.Tech Computer Science</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium min-w-24">Languages:</span>
                    <span>English, Hindi</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <Code className="mr-2 text-primary" /> Skills & Technologies
            </h2>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ margin: "-100px" }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ margin: "-100px" }}
                >
                  <SkillBadge name={skill} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-12 flex items-center max-w-3xl mx-auto">
              <Github className="mr-2 text-primary" /> Featured Projects
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ margin: "-100px" }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ margin: "-100px" }}
              className="mt-12 text-center"
            >
              <Button variant="outline" asChild>
                <Link href="https://github.com/drleavio" className="flex items-center">
                  View All Projects <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20" ref={ref}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ margin: "-100px" }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <Mail className="mr-2 text-primary" /> Get In Touch
            </h2>

            <motion.form
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ margin: "-100px" }}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" value={data.name} name="name" placeholder="Your name" onChange={(e)=>handleChange(e)} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" value={data.email} name="email" type="email" placeholder="Your email" onChange={(e)=>handleChange(e)}/>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" value={data.subject} name="subject" placeholder="Subject" onChange={(e)=>handleChange(e)}/>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" value={data.message} name="message" placeholder="Your message" rows={5} onChange={(e)=>handleChange(e)}/>
              </div>

              <Button type="submit" className="w-full" onClick={(e)=>sendMessage(e)}>
                Send Message
              </Button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} DevPortfolio. All rights reserved.
              </p>
            </div>

            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com/drleavio" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://x.com/rahulsharm26242?s=11" aria-label="Twitter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://www.linkedin.com/in/rahul-sharma-6123a8201/" aria-label="LinkedIn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
