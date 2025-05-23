#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');
const OpenAI = require('openai');

require('dotenv').config({ 
  path: path.join(__dirname, 'config', '.env.local')
});

if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY not found in scripts/config/.env.local file');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const JOB_TYPES = {
  'Electrician': {
    minValue: 28,
    maxValue: 36,
    experienceLevel: 'midLevel',
    category: 'Journeyman',
    team: 'Commercial',
    yearsExperience: '3-5',
    responsibilities: 'Install and maintain electrical systems in commercial buildings, troubleshoot and repair power distribution systems, ensure compliance with safety codes, implement lighting control systems, plan and execute electrical upgrades, manage materials and tools for projects, coordinate with other construction teams, inspect and test installations for quality assurance, document work progress and maintenance records, mentor apprentices and junior electricians, provide on-site technical expertise, support emergency power system installations, integrate energy-efficient solutions into designs',
    qualifications: 'Relevant electrical certification or licensure preferred, strong understanding of commercial electrical systems, ability to read and interpret blueprints and technical diagrams, hands-on experience with power tools and diagnostic equipment, solid troubleshooting and problem-solving skills, knowledge of safety protocols and building codes, ability to work both independently and as part of a team, good communication and organizational skills, physically capable of handling electrical tools and equipment',
    prompt: 'Create a job description for a Commercial Electrician focusing on electrical installations and maintenance in commercial buildings. Must understand power distribution systems, lighting controls, and troubleshooting. Experience with electrical upgrades, energy-efficient designs, and safety compliance required. Position involves planning and executing installations, ensuring quality assurance, and mentoring apprentices. Role includes maintaining documentation and coordinating with construction teams. Must have knowledge of safety codes and relevant certifications or licensure. Physical requirements include working at heights, using power tools, and handling materials.'
},
'Security Technician': {
    minValue: 20,
    maxValue: 28,
    experienceLevel: 'entryLevel',
    category: 'Security',
    team: 'Commercial',
    yearsExperience: '1-3',
    responsibilities: 'Install and configure security systems including cameras and access control, perform routine system maintenance and updates, troubleshoot and resolve technical issues, conduct site assessments for optimal equipment placement, manage system documentation and warranties, ensure compliance with security protocols, assist with network integration of security devices, provide training to end-users, coordinate with vendors for repairs or upgrades, participate in testing and commissioning of new systems, adhere to safety and installation standards, maintain inventory of equipment and materials',
    qualifications: 'Basic understanding of security systems and networks, ability to read and follow technical manuals, proficiency with basic hand and power tools, strong problem-solving skills, effective communication and teamwork abilities, attention to detail and organizational skills, willingness to learn and stay updated on emerging security technologies, physical ability to handle and install equipment',
    prompt: 'Create a job description for a Security Technician focusing on installing and maintaining security systems. Entry-level position involving hands-on installation, troubleshooting, and configuration of security devices. Must have basic understanding of security technologies and network integration. Experience with technical documentation and testing preferred but not required. Position involves ensuring compliance with safety standards, maintaining equipment inventory, and providing user training. Must be comfortable working with tools and in a variety of environments. Role offers growth opportunities and exposure to advanced security technologies.'
},
'Cable Installer': {
    minValue: 18,
    maxValue: 25,
    experienceLevel: 'entryLevel',
    category: 'Voice Data',
    team: 'Commercial',
    yearsExperience: '1-5',
    responsibilities: 'Install and route cabling for data, voice, and video systems, terminate and test cables for proper functionality, assist in setting up network and communication systems, follow project blueprints and technical diagrams, maintain inventory of cables and tools, collaborate with other team members and trades on site, ensure installations meet safety and quality standards, document work performed and test results, troubleshoot and resolve basic connectivity issues, support system upgrades and expansions as needed, assist in training new team members on installation techniques, adhere to company and project protocols',
    qualifications: 'High school diploma or equivalent, familiarity with cable installation techniques, ability to use hand and power tools, basic understanding of networking concepts, strong organizational and time-management skills, attention to detail, effective communication skills, physical ability to lift and handle cabling equipment, willingness to learn and grow in the field, reliable transportation and punctuality',
    prompt: 'Create a job description for a Cable Installer focusing on data, voice, and video system installations. Entry-level position involving hands-on cabling, testing, and troubleshooting. Must be familiar with installation techniques and networking concepts. Experience with tools and basic cable termination preferred but not required. Position involves following blueprints, documenting work, and collaborating with team members. Physical requirements include lifting and handling cables and equipment. Role offers training opportunities and exposure to advanced communication technologies.'
},
'Commercial Apprentice': {
    minValue: 18,
    maxValue: 22,
    experienceLevel: 'entryLevel',
    category: 'Apprentice',
    team: 'Commercial',
    yearsExperience: '0-3',
    responsibilities: 'Assist in electrical installations and upgrades, learn wiring methods and safety protocols, support team with material handling and logistics, observe and practice blueprint reading, help install conduit, panels, and devices, perform routine equipment checks under supervision, maintain a clean and safe worksite, document daily tasks and lessons learned, attend required training and apprenticeship classes, collaborate with team members and supervisors, develop skills in troubleshooting and problem resolution, participate in team meetings and safety briefings, provide support for system testing and commissioning',
    qualifications: 'High school diploma or equivalent, enrollment in an apprenticeship program preferred, basic understanding of electrical concepts, willingness to learn and follow instructions, good communication and teamwork skills, physical ability to handle tools and materials, attention to detail and safety awareness, reliable transportation and punctuality',
    prompt: 'Create a job description for a Commercial Electrical Apprentice focusing on learning and supporting electrical installations. Entry-level position involving training and hands-on work under licensed electricians. Must have basic understanding of electrical systems and safety protocols. Enrollment in an apprenticeship program preferred. Position includes assisting with wiring, conduit installation, and equipment setup. Role offers growth opportunities and exposure to commercial electrical projects. Must be physically capable of working in various environments and attending required classes for skill development.'
},
'Residential Electrician': {
    minValue: 18,
    maxValue: 27,
    experienceLevel: 'entryLevel',
    category: 'Apprentice',
    team: 'Residential',
    yearsExperience: '0-3',
    responsibilities: 'Assist in the installation of residential electrical systems, learn wiring techniques and safety protocols, support team with material handling and job site preparation, observe and practice interpreting electrical blueprints, assist in installing outlets, switches, lighting fixtures, and circuit breakers, maintain a clean and organized workspace, perform basic troubleshooting under supervision, document daily tasks and learning progress, attend required apprenticeship classes and training sessions, follow safety guidelines and regulations, participate in site inspections and testing procedures, coordinate with team members and supervisors on project tasks',
    qualifications: 'High school diploma or equivalent, enrollment in an apprenticeship program preferred, basic understanding of electrical concepts, willingness to learn and follow instructions, good communication and teamwork skills, physical ability to lift tools and materials, attention to detail and safety awareness, reliable transportation and punctuality, strong interest in residential electrical systems',
    prompt: 'Create a job description for a Residential Electrician Apprentice focusing on learning and supporting residential electrical installations. Entry-level position involving hands-on training under licensed electricians. Must have a basic understanding of electrical systems and safety protocols. Enrollment in an apprenticeship program preferred. Position includes assisting with wiring, installing fixtures, and troubleshooting residential electrical systems. Role offers growth opportunities and exposure to residential projects. Must be physically capable of working in various environments and attending required training.'
},

'Industrial Electrician': {
    minValue: 22,
    maxValue: 31,
    experienceLevel: 'entryLevel',
    category: 'Apprentice',
    team: 'Industrial',
    yearsExperience: '0-3',
    responsibilities: 'Assist in the installation and maintenance of industrial electrical systems, learn to work with high-voltage equipment and machinery, support team with material preparation and organization, help install and troubleshoot motor controls, PLCs, and automation systems, observe and practice interpreting technical diagrams and schematics, assist with conduit bending, wiring, and panel assembly, maintain a clean and safe job site, document learning progress and daily tasks, attend required training and apprenticeship classes, follow safety guidelines and protocols, participate in system testing and inspections, collaborate with team members and supervisors on project tasks',
    qualifications: 'High school diploma or equivalent, enrollment in an apprenticeship program preferred, basic understanding of electrical concepts and safety protocols, willingness to learn and follow instructions, strong interest in industrial electrical systems, good communication and teamwork skills, physical ability to handle tools and materials, attention to detail and problem-solving mindset, reliable transportation and punctuality',
    prompt: 'Create a job description for an Industrial Electrician Apprentice focusing on learning and supporting the installation and maintenance of industrial electrical systems. Entry-level position involving hands-on training under licensed electricians. Must have a basic understanding of high-voltage equipment and safety protocols. Enrollment in an apprenticeship program preferred. Position includes assisting with wiring, troubleshooting motor controls, and working with PLCs and automation systems. Role offers growth opportunities and exposure to industrial projects. Must be physically capable of working in various environments and attending required training.'
},
'Electrician Helper': {
    minValue: 15,
    maxValue: 20,
    experienceLevel: 'entryLevel',
    category: 'Apprentice',
    team: 'Commercial',
    yearsExperience: '0-2',
    responsibilities: 'Assist electricians with installations and repairs, handle materials and tools on job sites, follow instructions to complete basic electrical tasks, prepare and clean work areas, support cable pulling and conduit installation, learn to read and interpret blueprints under supervision, maintain safety and organization of tools and equipment, document work activities as directed, assist in troubleshooting and resolving minor issues, ensure adherence to safety standards and protocols, participate in team meetings and safety briefings, provide support for testing and system commissioning, demonstrate a willingness to learn and grow in the trade',
    qualifications: 'High school diploma or equivalent preferred, basic understanding of electrical concepts, ability to use hand tools and follow instructions, strong work ethic and eagerness to learn, good communication and teamwork skills, attention to detail and safety awareness, physical ability to lift and carry tools and materials, reliable transportation and punctuality',
    prompt: 'Create a job description for an Electrician Helper focusing on supporting electricians with installations, repairs, and general tasks. Entry-level position involving hands-on work with tools and materials under supervision. Must have a basic understanding of electrical concepts and a strong work ethic. Position includes preparing work areas, assisting with conduit installation, and documenting tasks. Role offers opportunities for learning and advancement in the electrical trade. Must be physically capable of working in various environments and committed to safety standards.'
}
};

const PROMPT_STYLES = {
  'conversational': 'Make this job description friendly and conversational, using casual language while maintaining professionalism. Use "you" and "we" to speak directly to the candidate.',
  'formal': 'Write this job description in a formal, traditional corporate style with clear sections and bullet points.',
  'detailed': 'Create a comprehensive and detailed job description with specific examples and clear expectations for each responsibility.',
  'concise': 'Write a clear and concise job description focusing on key requirements and essential responsibilities.',
  'engaging': 'Create an engaging and energetic job description that excites potential candidates while highlighting growth opportunities.'
};

const PROMPTS = [
  `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a COMPREHENSIVE job description (800+ words) for an experienced {jobTitle}. Write this as if you are a Senior {jobTitle} with 20 years of experience creating a job post for {company} in {city}, {state}.

## About Our {jobTitle} Team
Start with a detailed paragraph about working as a {jobTitle} at {company}, our reputation in {city}, and the types of projects our {jobTitle}s handle. Mention surrounding cities we work in.

## The {jobTitle} Position
Write a thorough overview of being a {jobTitle} on our team, focusing on:
- Day-to-day responsibilities of a {jobTitle}
- Types of projects and environments you'll work in
- Team structure and supervision
- Growth potential within {company}

## Core {jobTitle} Responsibilities
{responsibilities}
- Add 3-4 advanced technical duties specific to a {jobTitle}
- Include regional project specifics
- Detail safety protocols

## Required Experience & Skills
{qualifications}
- {experience} years minimum experience as a {jobTitle}
- List essential certifications
- Detail required technical knowledge

## Tools & Equipment
- List specific tools used daily by our {jobTitle}s
- Detail required personal tools
- Explain company-provided equipment

## Physical Requirements
- Detail lifting requirements for a {jobTitle}
- Explain working conditions
- List safety gear needed

## Training & Development
- Describe {jobTitle} mentorship program
- List available certifications
- Detail career advancement path

## Compensation Package
{benefits}
- Explain overtime policies
- Detail tool allowances
- List additional perks`,

  `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a PRACTICAL job description (400-500 words) that focuses on the daily work life of a {jobTitle}. Write it like a foreman explaining the {jobTitle} position to a potential hire at {company} in {city}, {state}.

## What You'll Do as a {jobTitle}
Quick overview of the {jobTitle} role and our current projects in {city}. Keep it real and straightforward about what a {jobTitle} does day-to-day.

## Your Daily Tasks as a {jobTitle}
{responsibilities}
- Add 2-3 common daily {jobTitle} activities
- Focus on practical work examples

## What You Need to Be a {jobTitle}
{qualifications}
- {experience} years in the field as a {jobTitle}
- List must-have skills
- Focus on hands-on abilities

## The Good Stuff
{benefits}
- Highlight key benefits for {jobTitle}s
- Mention training opportunities`,

  `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a QUICK job description (200-300 words). Write it like a busy project manager needs this {jobTitle} position filled ASAP at {company} in {city}, {state}.

## {jobTitle} Position Overview
One paragraph about what we need in a {jobTitle} and what you'll do.

## Must Haves for {jobTitle}
- {experience} years experience as a {jobTitle}
{qualifications}
- List top 3 requirements

## Key {jobTitle} Duties
{responsibilities}
- Focus on main tasks only

## What We Offer Our {jobTitle}s
{benefits}`,

  `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a BRIEF job description (200 words max) that's perfect for job boards. Seeking a {jobTitle} at {company} in {city}, {state}.

## Quick Facts
- Position: {jobTitle}
- Experience: {experience} years as a {jobTitle}
- Location: {city}, {state}

## Core {jobTitle} Skills
{qualifications}

## Main {jobTitle} Duties
{responsibilities}

## Benefits for Our {jobTitle}s
{benefits}`
];

const DESCRIPTION_LENGTHS = {
  'short': 500,
  'medium': 800,
  'long': 1000
};

const COMPANIES = {
  'Premier Electric': {
    name: 'Premier Electric',
    sameAs: 'https://www.premierelectricalstaffing.com/',
    logo: 'https://www.premierelectricalstaffing.com/wp-content/uploads/2020/05/Premier-Electrical-Staffing-logo.png'
  },
  'Rogers Electric': {
    name: 'Rogers Electric',
    sameAs: 'https://www.rogerselectric.com/',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbvt0RMRvj6bZdL81Q6HJeRVl_qflQIGgp9w&s'
  }
};

const LOCATIONS = [
  { city: 'Tempe', state: 'AZ', zipCode: '85281' },
{ city: 'Scottsdale', state: 'AZ', zipCode: '85251' },
{ city: 'Lakewood', state: 'CO', zipCode: '80226' },
{ city: 'Aurora', state: 'CO', zipCode: '80012' },
{ city: 'Hollywood', state: 'FL', zipCode: '33020' },
{ city: 'Pompano Beach', state: 'FL', zipCode: '33060' },
{ city: 'Kissimmee', state: 'FL', zipCode: '34741' },
{ city: 'Sanford', state: 'FL', zipCode: '32771' },
{ city: 'St. Petersburg', state: 'FL', zipCode: '33701' },
{ city: 'Clearwater', state: 'FL', zipCode: '33755' },
{ city: 'Arlington', state: 'VA', zipCode: '22201' },
{ city: 'Alexandria', state: 'VA', zipCode: '22314' },
{ city: 'Henrico', state: 'VA', zipCode: '23228' },
{ city: 'Chesterfield', state: 'VA', zipCode: '23832' },
{ city: 'Norfolk', state: 'VA', zipCode: '23510' },
{ city: 'Chesapeake', state: 'VA', zipCode: '23320' },
{ city: 'Leland', state: 'NC', zipCode: '28451' },
{ city: 'Carolina Beach', state: 'NC', zipCode: '28428' },
{ city: 'Cary', state: 'NC', zipCode: '27511' },
{ city: 'Durham', state: 'NC', zipCode: '27701' },
{ city: 'Spring Lake', state: 'NC', zipCode: '28390' },
{ city: 'Hope Mills', state: 'NC', zipCode: '28348' },
{ city: 'Concord', state: 'NC', zipCode: '28025' },
{ city: 'Gastonia', state: 'NC', zipCode: '28052' },
{ city: 'High Point', state: 'NC', zipCode: '27260' },
{ city: 'Winston-Salem', state: 'NC', zipCode: '27101' },
{ city: 'Mount Pleasant', state: 'SC', zipCode: '29464' },
{ city: 'North Charleston', state: 'SC', zipCode: '29405' },
{ city: 'Spartanburg', state: 'SC', zipCode: '29302' },
{ city: 'Anderson', state: 'SC', zipCode: '29621' },
{ city: 'Decatur', state: 'GA', zipCode: '30030' },
{ city: 'Sandy Springs', state: 'GA', zipCode: '30328' },
{ city: 'Franklin', state: 'TN', zipCode: '37064' },
{ city: 'Hendersonville', state: 'TN', zipCode: '37075' }
];

const STREET_TYPES = [
  'Main St.', 'Technology Dr.', 'Innovation Way', 'Corporate Blvd.', 
  'Commerce Dr.', 'Industrial Pkwy.', 'Enterprise Ave.', 'Business Center Dr.',
  'Professional Pkwy.', 'Executive Dr.', 'Tech Park Way', 'Trade Center Blvd.'
];

function generateStreetAddress() {
  const number = Math.floor(Math.random() * (12000 - 1000) + 1000);
  const streetType = STREET_TYPES[Math.floor(Math.random() * STREET_TYPES.length)];
  return `${number} ${streetType}`;
}

function generateSalaryWithCents(baseMin, baseMax) {
  const extraDollars = Math.random() * (3 - 1) + 1;
  const minCents = Math.random();
  const maxCents = Math.random();
  
  return {
    minValue: Number((baseMin + extraDollars + minCents).toFixed(2)),
    maxValue: Number((baseMax + extraDollars + maxCents).toFixed(2))
  };
}

function generateRecentDate() {
  const now = new Date();
  const twoDaysAgo = new Date(now - (2 * 24 * 60 * 60 * 1000));
  const randomTime = twoDaysAgo.getTime() + Math.random() * (now.getTime() - twoDaysAgo.getTime());
  return new Date(randomTime).toISOString();
}

function generateValidThrough(datePosted) {
  const postedDate = new Date(datePosted);
  const daysToAdd = Math.floor(Math.random() * (45 - 31 + 1) + 31);
  const validThrough = new Date(postedDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
  return validThrough.toISOString();
}

function generateJobId(company, type) {
  return `${company.name.substring(0, 4).toUpperCase().replace(/\s+/g, '')}${Math.random().toString(36).substring(2, 8)}`;
}

function generateFilename(company, title, location, jobId) {
  return `${company.name.toLowerCase().replace(/\s+/g, '-')}-${title.toLowerCase().replace(/\s+/g, '-')}-${location.city.toLowerCase().replace(/\s+/g, '-')}-${jobId.toLowerCase()}.md`;
}

async function createJob(location, jobType, company) {
  const datePosted = generateRecentDate();
  const validThrough = generateValidThrough(datePosted);
  const jobInfo = JOB_TYPES[jobType];
  const jobId = generateJobId(company, jobType);
  
  const { minValue, maxValue } = generateSalaryWithCents(jobInfo.minValue, jobInfo.maxValue);

  // Select a random prompt
  const selectedPrompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)]
    .replace('{jobTitle}', jobType)
    .replace('{company}', company.name)
    .replace('{city}', location.city)
    .replace('{state}', location.state)
    .replace('{responsibilities}', jobInfo.responsibilities)
    .replace('{qualifications}', jobInfo.qualifications)
    .replace('{experience}', jobInfo.yearsExperience)
    .replace('{benefits}', `- Competitive salary range: $${minValue}-$${maxValue} per hour depending on experience
- Comprehensive medical, dental, and vision coverage
- Paid time off and holidays
- Career advancement opportunities
- Ongoing training and certifications`);

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ 
      role: "user", 
      content: selectedPrompt
    }],
    temperature: 0.7,
  });

  const fullDescription = completion.choices[0].message.content;

  const jobData = {
    position: jobType,
    description: fullDescription.substring(0, 500) + '...',
    location: `${location.city}, ${location.state}`,
    team: jobInfo.team,
    datePosted: datePosted,
    validThrough: validThrough,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      name: company.name,
      sameAs: company.sameAs,
      logo: company.logo
    },
    jobLocation: {
      streetAddress: generateStreetAddress(),
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zipCode,
      addressCountry: 'USA'
    },
    baseSalary: {
      currency: 'USD',
      value: Number(((minValue + maxValue) / 2).toFixed(2)),
      minValue: minValue,
      maxValue: maxValue,
      unitText: 'HOUR'
    },
    experienceRequirements: jobInfo.experienceLevel,
    occupationalCategory: jobInfo.category,
    identifier: {
      name: company.name,
      value: jobId
    },
    featured: Math.random() < 0.2,
    email: [
      'will@bestelectricianjobs.com',
      'Michael.Mckeaige@pes123.com',
      'Sarahann.Moody@pes123.com'
    ]
  };

  const frontmatter = matter.stringify('', jobData);
  const finalContent = `${frontmatter}\n\n${fullDescription}`;

  const filename = generateFilename(company, jobType, location, jobId);
  const filePath = path.join(__dirname, '..', 'src', 'content', 'jobs', filename);
  
  fs.writeFileSync(filePath, finalContent);
  console.log(`Created ${jobType} for ${company.name} in ${location.city}: ${filename}`);
}

async function createAllJobs() {
  const companies = Object.values(COMPANIES);
  const jobTypes = Object.keys(JOB_TYPES);
  
  for (const location of LOCATIONS) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
    
    await createJob(location, jobType, company);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

createAllJobs().catch(console.error); 
