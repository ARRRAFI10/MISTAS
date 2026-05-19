export const DEPT_CFG = {
  CE:   { bg: 'bg-emerald-600', text: 'text-emerald-700', label: 'Civil Engineering' },
  CSE:  { bg: 'bg-violet-600',  text: 'text-violet-700',  label: 'Computer Science & Eng.' },
  EECE: { bg: 'bg-blue-600',    text: 'text-blue-700',    label: 'Electrical, Electronic & Comm.' },
  ME:   { bg: 'bg-orange-600',  text: 'text-orange-700',  label: 'Mechanical Engineering' },
  AE:   { bg: 'bg-sky-600',     text: 'text-sky-700',     label: 'Aeronautical Engineering' },
  PME:  { bg: 'bg-teal-600',    text: 'text-teal-700',    label: 'Petroleum & Mining Eng.' },
  EWCE: { bg: 'bg-cyan-600',    text: 'text-cyan-700',    label: 'Electronics, Web & Comm.' },
  IPE:  { bg: 'bg-amber-600',   text: 'text-amber-700',   label: 'Industrial & Production' },
  NAME: { bg: 'bg-indigo-600',  text: 'text-indigo-700',  label: 'Naval Architecture & Marine' },
  BME:  { bg: 'bg-rose-600',    text: 'text-rose-700',    label: 'Biomedical Engineering' },
  NSE:  { bg: 'bg-green-700',   text: 'text-green-700',   label: 'Nuclear Science & Eng.' },
  Arch: { bg: 'bg-pink-600',    text: 'text-pink-700',    label: 'Architecture' },
  URP:  { bg: 'bg-lime-600',    text: 'text-lime-700',    label: 'Urban & Regional Planning' },
  Math: { bg: 'bg-yellow-600',  text: 'text-yellow-700',  label: 'Mathematics' },
  Chem: { bg: 'bg-purple-600',  text: 'text-purple-700',  label: 'Chemistry' },
}
export const FALLBACK = { bg: 'bg-forest-600', text: 'text-forest-700', label: 'Engineering' }
export const cfg = d => DEPT_CFG[d] || FALLBACK

export const ALUMNI = [
  {
    id: 1, name: 'Major General Md Hakimuzzaman, SGP, ndc, afwc, psc', batch: 'CE-02', dept: 'CE',
    role: 'Commandant', company: 'Military Institute of Science and Technology',
    location: 'Mirpur Cantonment', country: 'Bangladesh',
    image: '/CommandantMIST.jpeg',
    notable: true, award: '',
    bio: 'Major General Md Hakimuzzaman is the Commandant of the Military Institute of Science and Technology (MIST), one of Bangladesh\'s premier technical universities. A decorated officer holding the Shreshtha Gana Parishad (SGP), he has had a distinguished career spanning defence engineering, strategic leadership, and institutional development. Under his commandantship, MIST has strengthened its research programmes, international collaborations, and academic excellence.',
    education: [
      { degree: 'B.Sc. in Civil Engineering', institution: 'MIST, Dhaka', year: '1999' },
      // { degree: 'Armed Forces War Course (afwc)', institution: 'DSCSC, Mirpur', year: '2012' },
      // { degree: 'National Defence Course (ndc)', institution: 'National Defence College, Dhaka', year: '2018' },
    ],
    career: [
      // { role: 'Military Engineer & Field Commander', company: 'Bangladesh Army', period: '1999 – 2010', current: false },
      // { role: 'Senior Staff Officer', company: 'Army HQ, Dhaka', period: '2010 – 2018', current: false },
      // { role: 'General Officer', company: 'Bangladesh Army', period: '2018 – 2022', current: false },
      { role: 'Commandant', company: 'Military Institute of Science and Technology', period: '2026 – Present', current: true },
    ],
    skills: ['Strategic Leadership', 'Defence Engineering', 'Institutional Management', 'Civil Engineering', 'Policy & Governance'],
    linkedin: '#',
  },
  {
    id: 2, name: 'Maj Gen Towhidul Ahmed, ndc, afwc, psc', batch: 'CSE-03', dept: 'CSE',
    role: 'GOC', company: '11 Infantry Division',
    location: 'Dhaka', country: 'Bangladesh',
    image: '/Maj Gen Toufiq.jpeg',
    //bio: 'A decorated military engineer and policy leader, Brig Gen Al-Amin has spent two decades shaping Bangladesh\'s built environment. As Director General of the Bangladesh National Building Code, he leads national disaster-resilient construction standards for one of the world\'s most densely populated nations.',
    education: [
      { degree: 'B.Sc. in Computer Science & Engineering', institution: 'MIST, Dhaka', year: '2002'},
    ],
    notable: true,
    career: [
      { role: 'General Officer Commanding', company: '11 Infantry Division', period: '2025 – present', current: true },
      
    ],
    skills: ['Structural Engineering', 'Urban Planning', 'Building Code Policy', 'Project Management', 'Leadership'],
    linkedin: '#',
  },
  {
    id: 3, name: 'Nazmus Sakib', batch: 'CSE-12', dept: 'CSE',
    role: 'Senior Software Engineer', company: 'Facebook',
    location: 'London', country: 'UK',
    image:'/nazmussakib.png',
    notable: true,
    bio: 'Nazmus Sakib is a talented software engineer with expertise in developing scalable and efficient applications. He has contributed to various projects at Facebook, focusing on improving user experience and system performance.',
    education: [
      { degree: 'B.Sc. in Computer Science & Engineering', institution: 'MIST, Dhaka', year: '2012' },
    ],
    career: [
      { role: 'Senior Software Engineer', company: 'Facebook', period: '2016 – Present', current: true },
    ],
    skills: ['Software Development', 'Scalable Systems', 'Python', 'Product Development'],
    linkedin: '#',
  },
  {
    id: 4, name: 'Sadia Zahin Diya', batch: 'CSE-15', dept: 'CSE',
    role: 'Software Development Engineer II', company: 'Amazon',
    location: 'Seattle', country: 'USA',
    notable: true,
    image:'/Sadia.jpg',
    bio: 'Sadia is a software engineer at Amazon working on cloud infrastructure tools used by developers worldwide. After completing her computer science degree at MIST she has grown her expertise in distributed systems. She champions diversity in tech through mentoring programmes at Amazon.',
    education: [
      { degree: 'B.Sc. in Computer Science & Engineering', institution: 'MIST, Dhaka', year: '2015' },
      { degree: 'M.S. in Computer Science', institution: 'University of Michigan', year: '2018' },
    ],
    career: [
      { role: 'Software Development Engineer', company: 'Amazon', period: '2018 – 2021', current: false },
      { role: 'Software Development Engineer II', company: 'Amazon', period: '2021 – Present', current: true },
    ],
    skills: ['Java', 'AWS', 'Cloud Infrastructure', 'Distributed Systems', 'TypeScript'],
    linkedin: '#',
  },
  {
    id: 5, name: 'Kishwar Shafin', batch: 'CSE-10', dept: 'CSE',
    role: 'Research Scientist', company: 'Google',
    location: 'Mountain View', country: 'USA',
    image:'/Kiswar.png',
    notable: true,
    bio: 'Kishwar Shafin is a research scientist at Google and technical lead of DeepVariant, a revolutionary deep learning model for genetic variant calling. His work has transformed genomics research and is used by major research institutions worldwide.',
    education: [
      { degree: 'B.Sc. in Computer Science & Engineering', institution: 'MIST, Dhaka', year: '2010' },
    ],
    career: [
      { role: 'Research Scientist', company: 'Google', period: '2014 – Present', current: true },
    ],
    skills: ['Machine Learning', 'Deep Learning', 'Genomics', 'Research'],
    linkedin: '#',
  },
  {
    id: 6, name: 'Md Merajul Islam', batch: '', dept: 'CSE',
    role: 'Software Architect', company: 'IBM',
    location: 'New York', country: 'USA',
    image: '/Merajul.jpg',
    notable: false,
    bio: 'Md Merajul Islam is a software architect at IBM with extensive experience in enterprise software design and development.',
    education: [
      { degree: 'B.Sc. in Computer Science & Engineering', institution: 'MIST, Dhaka', year: '' },
    ],
    career: [
      { role: 'Software Architect', company: 'IBM', period: '2010 – Present', current: true },
    ],
    skills: ['Enterprise Architecture', 'Software Design', 'System Integration'],
    linkedin: '#',
  },
  {
    id: 7, name: 'Forhan Bin Emdad', batch: '', dept: '',
    role: 'Assistant Professor', company: 'Governors State University',
    location: 'Illinois', country: 'USA',
    notable: false,
    image: '/Forhan.jpg',
    bio: 'Forhan Bin Emdad is an Assistant Professor at Governors State University with expertise in engineering education and research.',
    education: [
      { degree: 'B.Sc. in Engineering', institution: 'MIST, Dhaka', year: '' },
    ],
    career: [
      { role: 'Assistant Professor', company: 'Governors State University', period: '2015 – Present', current: true },
    ],
    skills: ['Teaching', 'Research', 'Academic Leadership'],
    linkedin: '#',
  },
  {
    id: 8, name: 'Tanzim Hasan Fahim', batch: '', dept: '',
    role: 'Vice President & Head of Technology Department', company: 'NEXT Ventures',
    location: 'Dhaka', country: 'Bangladesh',
    notable: false,
    image:'/Tanzim.jfif',
    bio: 'Tanzim Hasan Fahim is the Vice President and Head of the Technology Department at NEXT Ventures, leading technology innovation and digital transformation initiatives.',
    education: [
      { degree: 'B.Sc. in Engineering', institution: 'MIST, Dhaka', year: '' },
    ],
    career: [
      { role: 'Vice President & Head of Technology Department', company: 'NEXT Ventures', period: '2015 – Present', current: true },
    ],
    skills: ['Technology Leadership', 'Digital Transformation', 'Innovation Management'],
    linkedin: '#',
  },
  {
    id: 9, name: 'Akhter Mahmud Nafi', batch: 'AE', dept: 'AE',
    role: 'Research Scientist', company: 'NASA',
    image:'/nafi.jpg',
    location: 'Washington', country: 'USA',
    notable: false,
    bio: 'Akhter Mahmud Nafi is a Research Scientist at NASA with expertise in aeronautical engineering and space research.',
    education: [
      { degree: 'B.Sc. in Aeronautical Engineering', institution: 'MIST, Dhaka', year: '' },
    ],
    career: [
      { role: 'Research Scientist', company: 'NASA', period: '2012 – Present', current: true },
    ],
    skills: ['Aerospace Engineering', 'Research', 'Space Technology'],
    linkedin: '#',
  },
  {
    id: 10, name: 'Suvessa Chakraborty', batch: 'AE', dept: 'AE',
    role: 'Senior Supplier Quality Engineer and Advanced Product Quality Planning (APQP)', company: 'Boeing Space & Defense',
    location: 'Seattle', country: 'USA',
    image:'/Suvessa.jpg',
    notable: false,
    bio: 'Suvessa Chakraborty is a Senior Supplier Quality Engineer at Boeing Space & Defense with expertise in product quality planning and supplier management.',
    education: [
      { degree: 'B.Sc. in Aeronautical Engineering', institution: 'MIST, Dhaka', year: '' },
    ],
    career: [
      { role: 'Senior Supplier Quality Engineer and APQP', company: 'Boeing Space & Defense', period: '2013 – Present', current: true },
    ],
    skills: ['Quality Engineering', 'APQP', 'Supplier Management', 'Aerospace'],
    linkedin: '#',
  },
  {
    id: 11, name: 'Sayantee Roy', batch: 'IPE', dept: 'IPE',
    role: 'Sr Module Engineer', company: 'Global Foundries',
    location: 'Menlo Park', country: 'USA',
    image:'/Sayantee.jpg',
    notable: false,
    bio: 'Sayantee Roy works on advanced semiconductor module engineering at Global Foundries\' facility, focusing on process development. She has filed patents for novel process optimisation methods.',
    education: [
      { degree: 'B.Sc. in Industrial & Production Engineering', institution: 'MIST, Dhaka', year: '' },
      { degree: 'M.S. in Electrical Engineering', institution: 'Georgia Institute of Technology', year: '2019' },
    ],
    career: [
      { role: 'Module Engineer', company: 'Global Foundries', period: '2019 – 2022', current: false },
      { role: 'Sr Module Engineer', company: 'Global Foundries', period: '2022 – Present', current: true },
    ],
    skills: ['Semiconductor Processes', 'Process Integration', 'Materials Science'],
    linkedin: '#',
  },
  {
    id: 13, name: 'Ashraful Chowdhury', batch: 'EECE', dept: 'EECE',
    role: 'Process Engineer', company: 'Intel',
    location: 'Santa Clara', country: 'USA',
    image: '/Ashraful.jpg',
    notable: false,
    bio: 'Ashraful Chowdhury is a Process Engineer at Intel specialising in advanced packaging and semiconductor manufacturing. He has contributed to next-generation chip packaging technologies.',
    education: [
      { degree: 'B.Sc. in Electrical, Electronic & Communication Engineering', institution: 'MIST, Dhaka', year: '' },
      { degree: 'M.S. in Engineering', institution: 'POSTECH, South Korea', year: '2017' },
    ],
    career: [
      { role: 'Process Engineer', company: 'Samsung Electronics', period: '2017 – 2021', current: false },
      { role: 'Process Engineer', company: 'Intel', period: '2021 – Present', current: true },
    ],
    skills: ['Advanced Packaging', 'Semiconductor Manufacturing', 'Thermal Management'],
    linkedin: '#',
  },
  {
    id: 12, name: 'Sharaf Sumaiya', batch: 'EECE', dept: 'EECE',
    role: 'Senior System Development Engineer', company: 'Dell Technologies',
    location: 'Round Rock', country: 'USA',
    image: '/Sharaf.jpg',
    notable: true,
    bio: 'Sharaf Sumaiya is a Senior System Development Engineer at Dell Technologies with expertise in system architecture and product development. She contributes to the design and development of enterprise solutions.',
    education: [
      { degree: 'B.Sc. in Electrical, Electronic & Communication Engineering', institution: 'MIST, Dhaka', year: '' },
    ],
    career: [
      { role: 'Senior System Development Engineer', company: 'Dell Technologies', period: '2015 – Present', current: true },
    ],
    skills: ['System Architecture', 'Product Development', 'Enterprise Solutions'],
    linkedin: '#',
  },


]
  
export const NOTABLE = ALUMNI.filter(a => a.notable)
