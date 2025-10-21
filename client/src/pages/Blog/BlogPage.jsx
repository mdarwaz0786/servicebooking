import blog from "../../assets/blog.jpg";

const BlogPage = () => {
  const blogs = [
    {
      id: 1,
      image: blog,
      category: 'Chimney',
      title: 'Expert Chimney Cleaning & Services in Delhi by Green India Team – Safe, Affordable, and Professional',
      date: '28-Jul-2025 12:45',
      description:
        'Get expert chimney cleaning & services in Delhi with the Green India Team. Affordable, safe, and reliable solutions for a smoke-free kitchen.',
    },
    {
      id: 2,
      image: blog,
      category: 'Microwave',
      title: 'Best Microwave Service & Repair Delhi NCR | Reliable, Affordable',
      date: '26-Jul-2025 10:24',
      description:
        'Need fast microwave service & repair Delhi NCR Green India Team? Get expert doorstep repairs from certified technicians at affordable prices. Book your service today!',
    },
    {
      id: 3,
      image: blog,
      category: 'Refrigerator',
      title: 'Expert Refrigerator Repair and Service by Green India Team - Fast and Reliable',
      date: '24-Jul-2025 10:32',
      description:
        'Exception Services of Fridge repair & services by Green India Team. Quick, efficient and cheap refrigerator repair at home. Book now today service near me',
    },
    {
      id: 4,
      image: blog,
      category: 'Washing Machine',
      title: 'Washing Machine Repair in Delhi NCR – Quick and Affordable by Green India Team',
      date: '23-Jul-2025 14:10',
      description:
        'Book expert washing machine repair with Green India Team. Reliable home service for all brands with affordable pricing.',
    },
    {
      id: 5,
      image: blog,
      category: 'AC Services',
      title: 'Air Conditioner Servicing in Delhi – Trusted, Fast & Affordable',
      date: '22-Jul-2025 09:30',
      description:
        'Stay cool with our top-rated AC repair and maintenance services. Green India Team offers doorstep service with guaranteed satisfaction.',
    },
    {
      id: 6,
      image: blog,
      category: 'Geyser',
      title: 'Geyser Repair and Installation Services by Experts – Safe & Quick',
      date: '20-Jul-2025 16:20',
      description:
        'Get hassle-free geyser repair or installation services in Delhi NCR. Certified experts with same-day service and warranty.',
    },
    {
      id: 7,
      image: blog,
      category: 'TV Repair',
      title: 'LED & Smart TV Repair Services – Book Certified Technicians at Home',
      date: '19-Jul-2025 11:50',
      description:
        'Facing screen or audio issues in your TV? Green India Team offers fast home visits for TV repairs at great prices.',
    },
    {
      id: 8,
      image: blog,
      category: 'Water Purifier',
      title: 'RO Water Purifier Service and Repair – Clean Water, Always',
      date: '17-Jul-2025 10:15',
      description:
        'Maintain your RO water purifier with regular servicing. Book Green India Team for reliable and affordable maintenance.',
    },
    {
      id: 9,
      image: blog,
      category: 'Pest Control',
      title: 'Affordable Pest Control Services – Safe for Family & Pets',
      date: '15-Jul-2025 08:45',
      description:
        'Protect your home from pests with Green India Team. Safe, eco-friendly treatments with guaranteed results.',
    },
  ];

  return (
    <div className="container py-5">
      <h3 className="mb-4 fw-bold">Blogs</h3>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-4 mb-4" key={blog.id}>
            <div className="card h-100">
              <img src={blog.image} alt={blog.title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h6 className="text-muted mb-3">{blog.category}</h6>
                <h5 className="card-title">{blog.title}</h5>
                <small className="text-muted mb-2">{blog.date}</small>
                <p className="card-text">{blog.description}</p>
                <div className="mt-auto">
                  <button className="btn btn-dark btn-sm">View Details</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
