
import { Mail, Phone, MapPin, Linkedin, Github, MessageSquare, Calendar, Award, GraduationCap, Code, Database, Cloud, GitBranch, Brain, Users, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Index = () => {
  const experiences = [
    {
      title: "Python Backend Developer",
      company: "Tradebyte (Zalando Group)",
      location: "Ansbach, Germany",
      period: "06/2023 - Present",
      description: "Leading SaaS & Integration Platform for Global E-Commerce Growth",
      achievements: [
        "ASR Service: Designed and implemented the Article Status Report feature as part of a larger Amazon marketplace integration system",
        "Built an AWS Lambda service to collect article status updates via Amazon API and store them in DynamoDB",
        "Designed and implemented an irregular task hosted within AWS ECS, utilizing AWS SQS for inter-service communication",
        "EAN Lookup Service: Designed and developed a search service for looking up marketplace article details using European Article Number codes",
        "Error Pipeline Optimization: Redesigned the data pipeline for collecting and displaying product import errors"
      ]
    },
    {
      title: "Python Backend Developer", 
      company: "Zvuk (Sber Group)",
      location: "Moscow, Russia",
      period: "08/2022 - 06/2023",
      description: "Fastest-growing music and content streaming platform in Russia",
      achievements: [
        "Splitting legacy code: Actively contributed to splitting the billing integration's monolith into microservices",
        "BFF service: Developed a Backend for Frontend service using FastAPI, performed data aggregation within PyDantic",
        "Enhanced code reliability by reaching 90% unit test coverage"
      ]
    },
    {
      title: "Junior Backend Developer",
      company: "Croc",
      location: "Moscow, Russia",
      period: "10/2021 - 08/2022", 
      description: "The biggest B2B cloud platform in Russia",
      achievements: [
        "Compatibility: Ensured compatibility with the AWS API schema to enable seamless integration",
        "API: Developed APIs to meet project requirements, using Boto for interaction with K2 Cloud services",
        "Implemented the option to enable cloud maintenance mode without disrupting ongoing virtual machines"
      ]
    },
    {
      title: "Consultant",
      company: "Forvis Mazars",
      location: "Moscow, Russia", 
      period: "02/2021 - 10/2021",
      description: "Global leader in audit, tax, and advisory services",
      achievements: [
        "IT Consulting: collaborated closely with clients to design and implement digital solutions",
        "Worked with SOCAB Pernod Ricard and on internal projects",
        "Established the foundational methodology, CI/CD templates and codebase"
      ]
    }
  ];

  const education = [
    {
      degree: "Master's degree",
      institution: "Higher School of Economics University", 
      field: "System Programming (with Institute for System Programming RAS)",
      period: "2022 - 2023"
    },
    {
      degree: "Bachelor's degree",
      institution: "Financial University",
      field: "Data science in economics and finance",
      period: "2020 - 2022"
    },
    {
      degree: "Bachelor's degree", 
      institution: "Moscow State University",
      field: "Fundamental Mathematics",
      period: "2018 - 2020"
    }
  ];

  const techSkills = [
    "Python", "FastAPI", "Django", "Asyncio", "Docker", "CI/CD",
    "MySQL", "MongoDB", "SQLAlchemy", "Kubernetes", "PostgreSQL", 
    "AWS", "Grafana", "Prometheus", "Git", "Pytest", "GraphQL"
  ];

  const softSkills = [
    "Strong problem-solving and decision-making skills",
    "Smooth collaboration with cross-functional teams",
    "Effective communication at all organizational levels internally and externally", 
    "Defined focus on business impact of technology",
    "Adapting swiftly to new technologies and methods"
  ];

  const languages = [
    { language: "English", level: "Fluent" },
    { language: "Russian", level: "Native" }, 
    { language: "French", level: "Beginner" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),_inset_0_-2px_4px_rgba(0,0,0,0.1),_0_8px_32px_rgba(31,38,135,0.37)]">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-200 to-gray-300 shadow-[inset_0_4px_8px_rgba(255,255,255,0.7),_inset_0_-4px_8px_rgba(0,0,0,0.1)] flex items-center justify-center">
              <img src="/photo.png" alt="Profile Photo" className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-200 to-gray-300 shadow-[inset_0_4px_8px_rgba(255,255,255,0.7),_inset_0_-4px_8px_rgba(0,0,0,0.1)]" />            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl font-bold text-gray-800 mb-3">David Dzgoev</h1>
              <p className="text-2xl text-gray-600 mb-4">Looking for python backend senior (IC4) roles</p>
              <p className="text-xl text-gray-700 mb-6">Python | FastAPI | Django</p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>ddzgoev@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>+33640897948</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Germany, remote/hybrid</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Button className="bg-gradient-to-r from-gray-200 to-blue-200 text-gray-700 border-0 shadow-[0_4px_8px_rgba(0,0,0,0.1),_inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),_inset_0_1px_0_rgba(255,255,255,0.8)] transition-all">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button className="bg-gradient-to-r from-gray-200 to-blue-200 text-gray-700 border-0 shadow-[0_4px_8px_rgba(0,0,0,0.1),_inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),_inset_0_1px_0_rgba(255,255,255,0.8)] transition-all">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button className="bg-gradient-to-r from-gray-200 to-blue-200 text-gray-700 border-0 shadow-[0_4px_8px_rgba(0,0,0,0.1),_inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),_inset_0_1px_0_rgba(255,255,255,0.8)] transition-all">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Telegram
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8 p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),_inset_0_-2px_4px_rgba(0,0,0,0.1),_0_8px_32px_rgba(31,38,135,0.37)]">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Award className="w-8 h-8" />
            Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            I am a Python Backend Developer with 5+ years of experience building scalable, high-performance systems. Skilled in designing backend architectures, developing APIs, 
            and implementing microservices with modern Python frameworks. Experienced in cloud computing, containerization, and automation. I prioritize security, performance, and 
            agile best practices to deliver impactful results. I hold an university degree in Big Data and Machine Learning, with a strong focus on integrating AI-driven solutions to 
            enhance system intelligence and deliver data-driven insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),_inset_0_-2px_4px_rgba(0,0,0,0.1),_0_8px_32px_rgba(31,38,135,0.37)]">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <Calendar className="w-8 h-8" />
                Experience
              </h2>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-gradient-to-r from-white to-blue-50 shadow-[0_4px_16px_rgba(0,0,0,0.1),_inset_0_1px_0_rgba(255,255,255,0.9)] border border-gray-200/50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                          <span className="font-semibold">{exp.company}</span>
                          <span>•</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-blue-100 to-gray-100 text-gray-700 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),_0_1px_3px_rgba(0,0,0,0.1)] w-fit mt-2 md:mt-0">
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 italic">{exp.description}</p>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-700 flex items-start gap-3">
                          <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-gray-400 rounded-full mt-2 flex-shrink-0 shadow-sm"></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),_inset_0_-2px_4px_rgba(0,0,0,0.1),_0_8px_32px_rgba(31,38,135,0.37)]">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <GraduationCap className="w-8 h-8" />
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-gradient-to-r from-white to-blue-50 shadow-[0_4px_16px_rgba(0,0,0,0.1),_inset_0_1px_0_rgba(255,255,255,0.9)] border border-gray-200/50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                      <Badge className="bg-gradient-to-r from-blue-100 to-gray-100 text-gray-700 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),_0_1px_3px_rgba(0,0,0,0.1)] w-fit mt-1 md:mt-0">
                        {edu.period}
                      </Badge>
                    </div>
                    <p className="font-semibold text-gray-700 mb-1">{edu.institution}</p>
                    <p className="text-gray-600">{edu.field}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Technical Skills */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),_inset_0_-2px_4px_rgba(0,0,0,0.1),_0_8px_32px_rgba(31,38,135,0.37)]">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Code className="w-6 h-6" />
                Tech Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {techSkills.map((skill) => (
                  <Badge key={skill} className="bg-gradient-to-r from-blue-100 to-gray-100 text-gray-700 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),_0_1px_3px_rgba(0,0,0,0.1)] px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),_inset_0_-2px_4px_rgba(0,0,0,0.1),_0_8px_32px_rgba(31,38,135,0.37)]">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Brain className="w-6 h-6" />
                Soft Skills
              </h3>
              <ul className="space-y-3">
                {softSkills.map((skill, index) => (
                  <li key={index} className="text-gray-700 flex items-start gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-gray-400 rounded-full mt-2 flex-shrink-0 shadow-sm"></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),_inset_0_-2px_4px_rgba(0,0,0,0.1),_0_8px_32px_rgba(31,38,135,0.37)]">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Users className="w-6 h-6" />
                Languages
              </h3>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">{lang.language}</span>
                    <Badge className="bg-gradient-to-r from-blue-100 to-gray-100 text-gray-700 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),_0_1px_3px_rgba(0,0,0,0.1)]">
                      {lang.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Pet Projects */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),_inset_0_-2px_4px_rgba(0,0,0,0.1),_0_8px_32px_rgba(31,38,135,0.37)]">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <GitBranch className="w-6 h-6" />
                Pet Projects
              </h3>
              <div className="p-4 rounded-xl bg-gradient-to-r from-white to-blue-50 shadow-[0_2px_8px_rgba(0,0,0,0.1),_inset_0_1px_0_rgba(255,255,255,0.9)] border border-gray-200/50">
                <h4 className="font-bold text-gray-800 mb-2">judobase</h4>
                <p className="text-gray-600">async client for the Judobase API</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
