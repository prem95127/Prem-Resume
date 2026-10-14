// All portfolio content lives here. Edit this file to update the site.
const data = {
  name: 'Prem Kumar',
  roles: ['Learner', 'Gamer', 'Traveller', 'Coder', 'Photographer'],
  summary:
    "I'm from Royappanpatti, Theni. School at S.U.M Higher Secondary School, Royappan Patty. I completed my B.Sc. in Information Technology and Management at Arul Anandar College, Karumathur, Madurai. I have hands-on experience from academic projects and an internship, work well in a team, manage my time carefully, and I'm ready to start a career and contribute with commitment.",
  degree: 'B.Sc. IT & Management',
  contact: {
    city: 'Theni, Tamil Nadu',
    phone: '+91 7092442307',
    email: 'prem95127@gmail.com',
    address: 'South Ricemill Street, Royappanpatti, Theni – 625526',
  },
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/prem-kumar-8bb125340' },
    { label: 'Instagram', url: 'https://www.instagram.com/mask_of_kakashi_07' },
    { label: 'Facebook', url: 'https://www.facebook.com/share/1EbqYXU87P/' },
    { label: 'X', url: 'https://x.com/mask95127' },
  ],
  skills: {
    technical: [
      { name: 'HTML', level: 100 },
      { name: 'CSS', level: 90 },
      { name: 'MERN stack development', level: 60 },
      { name: 'MS Excel', level: 55 },
    ],
    soft: ['Time management', 'Attention to detail', 'Flexibility', 'Teamwork'],
  },
  education: [
    {
      title: 'B.Sc. Information Technology and Management',
      period: '2022 – 2025',
      place: 'Arul Anandar College, Madurai',
      note: 'Completed with 69.9%.',
    },
    {
      title: 'SSLC and HSC',
      period: '2020 – 2022',
      place: 'S.U.M Higher Secondary School, Royappanpatti',
      note: 'HSC 57.84% and SSLC 52.5%.',
    },
  ],
  experience: [
    {
      title: 'Project: Interactive Eyewear For Viewers',
      period: 'Dec 2024 – Jan 2025',
      place: 'Madurai',
      points: [
        'Built a PHP and MySQL e-commerce system covering purchase, sales, stock, payment and receipt.',
        'Used analytical and problem-solving skills to develop solutions for challenging situations.',
        'Worked with others in a friendly, collaborative way and helped wherever needed.',
      ],
    },
    {
      title: 'Internship, Manufacturing Company',
      period: 'Apr 2024 – May 2024',
      place: 'Cumbum, Theni',
      points: [
        'Developed marketing material: logos, brochures, infographics, presentations and advertisements.',
        'Managed up to 5 tasks at a time under pressure.',
        'Created 4+ design presentations and proposals a month for clients and account managers.',
      ],
    },
    {
      title: 'Project: Aura & Clothes',
      period: 'Feb 2026',
      place: 'Own Project',
      points: [
        'Working with NoSQL databases, designing document schemas, and performing CRUD (Create, Read, Update, Delete) operations.',
        ' Managing asynchronous event-driven server execution, handling database connectivity, and implementing user authentication.',
        'Worked with others in a friendly, collaborative way and helped wherever needed.',
      ],
    },
  ],
  projects: [
    {
      title: 'Interactive Eyewear For Viewers',
      stack: 'PHP and MySQL',
      date: 'December 2024',
      modules: ['Login', 'View supplier', 'New product', 'View product', 'Purchase', 'View purchase', 'Sales', 'Payment', 'Receipt'],
      description:
        'A system for buying and selling spectacles in an easy, user-friendly way. Purchase and sales invoices show the product image and price, and the administrator can add, edit and delete products and change prices on an invoice. Stock updates automatically after every purchase and sale, reports stay current, and payments and receipts adjust the outstanding balance so only the remaining amount is shown. The final stock position is shown with product images.',
      images: ['1.png', '2.png', '3.png', '4.png'],
    },
    {
      title: 'Aura & Clothes',
      stack: 'React JS, HTML, CSS and JavaScript',
      date: '',
      modules: ['user-login', 'admin-login', 'Sign in and sign up', 'Category-wise products', 'Size and colour options', 'Add to cart', 'Payment step', 'Testimonial slider'],
      description:
        'An online clothing store built with React JS. Visitors browse products by category (hoodies, shirts, pants, trousers and shorts), choose a size and colour, add items to the cart, sign in or sign up, and continue to a payment step. The home page also has a testimonial slider.Both customer login and Admin login pages',
      images: ['auraimage.png', 'auraimage1.png'],
    },
  ],
  certificates: [
    { title: 'Office Application', image: 'office application certificate.jpg' },
    { title: 'Robotics', image: 'Rbotics certificate.jpg' },
    { title: 'Internet of Things', image: 'IOT certificate .jpg' },
    { title: 'Artificial Intelligence', image: 'AI certificate.jpg' },
    { title: 'MERN Stack', image: 'Mernstak certificate.jpg' },
    { title: 'Project', image: 'Project certificate.jpg' },
  ],
};

export default data;
