"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Project {
  title: string
  description: string
  tags: string[]
  image: string
  github: string
  demo: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative overflow-hidden aspect-video">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <CardContent className="flex flex-col flex-grow p-5">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 flex-grow">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link href={project.github} className="flex items-center justify-center">
                <Github className="mr-2 h-4 w-4" /> Code
              </Link>
            </Button>
            <Button size="sm" asChild className="flex-1">
              <Link href={project.demo} className="flex items-center justify-center">
                <ExternalLink className="mr-2 h-4 w-4" /> Demo
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
