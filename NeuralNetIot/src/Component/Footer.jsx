import React from 'react';
import { LinkedinIcon as LinkedIn, Github } from 'lucide-react'; // Import the icons

const teamMembers = [
  {
    name: "Shiya Mer",
    role: "AI Developer",
    linkedin: "https://www.linkedin.com/in/shiya-mer/",
    github: "https://github.com/ShiyaMer"
  },
  {
    name: "Ishan Sharma",
    role: "Full Stack Web Developer",
    linkedin: "https://www.linkedin.com/in/ishan-sharma1/",
    github: "https://github.com/ishansharma25"
  },
  {
    name: "Kanav Chauhan",
    role: "Data Expert",
    linkedin: "",
    github: "https://github.com/KanavChauhan/"
  },
  {
    name: "Subash Shah",
    role: "Frontend Developer",
    linkedin: "https://www.linkedin.com/in/subash-shah-75a217214/",
    github: "https://github.com/subashshah854"
  }
];

export function Footer() {
  return (
    <div className="border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Meet the Collaborators</h2>
          <p className="text-gray-600 dark:text-gray-400">Building amazing things together</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">{member.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{member.role}</p>
              <div className="flex justify-center space-x-2">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    <LinkedIn className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </div>
  );
}
