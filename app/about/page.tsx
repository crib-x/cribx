

import  TeamMembers  from '@/components/about/team' 

const team = [
  {
    name: "Hayley Fifer",
    role: "Property Manager",
    image: "/team/hayley.jpg",
    bio: "Experienced property manager dedicated to providing exceptional student housing solutions.",
    linkedin: "https://www.linkedin.com/in/hayley-fifer",
    email: "hayley@lakeshoremgmt.com"
  },
  {
    name: "Adeola Adeyemo",
    role: "Founder & CEO",
    image: "/team/adeola.jpg", 
    bio: "Tech entrepreneur passionate about revolutionizing student housing experiences.",
    linkedin: "https://www.linkedin.com/in/adeola-adeyemo",
    email: "adeola@cribx.net"
  }
]

export default function AboutPage() {
  return (
   <TeamMembers teamMembers={team} />
  )
}