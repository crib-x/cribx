'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Linkedin, Mail } from 'lucide-react';


interface TeamMember {
    name: string;
    role: string;
    image: string;
    bio: string;
    linkedin: string;
    email: string;
}

interface TeamMemberProps {
 teamMembers: TeamMember[]
}
export default function TeamMembers({teamMembers}: TeamMemberProps) {
    return (
        <div className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About cribX</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                We're on a mission to transform the student housing experience by connecting students with their perfect living spaces and building vibrant communities.
              </p>
            </motion.div>
          </div>
        </section>
  
        {/* Mission Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  At cribX, we believe that finding the right student housing should be simple, transparent, and stress-free. We're dedicated to:
                </p>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Simplifying the housing search process for students
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Creating meaningful connections between students and property managers
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Building vibrant student communities
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Providing transparent and reliable housing information
                  </li>
                </ul>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/about/mission.jpg"
                  alt="Student Community"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>
  
        {/* Team Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The passionate individuals behind cribX working to revolutionize student housing
              </p>
            </motion.div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-blue-600 mb-3">{member.role}</p>
                      <p className="text-gray-600 mb-4">{member.bio}</p>
                      <div className="flex gap-3 justify-center md:justify-start">
                        <Button variant="outline" size="icon" asChild>
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <a href={`mailto:${member.email}`}>
                            <Mail className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
}