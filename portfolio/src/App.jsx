import { useState, useRef } from 'react'; // Added useRef for video control
import emailjs from 'emailjs-com';
import { Link } from 'react-scroll';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', description: '' });
  const videoRefs = useRef([]); // Refs for video elements

  const resumeUrl = 'https://example.com/veer-modi-resume.pdf'; // Replace with your resume link

  const projects = [
    {
      name: 'Vermio Play',
      video: 'https://res.cloudinary.com/dp5upogbb/video/upload/v1740981737/VerMio_Play_-_3_March_2025_lyf5d7.mp4',
      description: 'Vermio Play is a cloud gaming website where users can download games on the cloud.',
      githubLink: 'https://github.com/Veer-Modi/vermio_play',
      deployLink: 'https://vermio-play-1.onrender.com',
    },
    {
      name: 'Vermio Play Design',
      image: 'https://via.placeholder.com/300x200.png?text=Figma+Design',
      description: 'A sleek UI design for Vermio Play created in Figma, focusing on modern aesthetics and usability.',
      githubLink: null,
      figmaLink: 'https://www.figma.com/file/your-figma-file-id',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_USER_ID')
      .then(() => alert('Message sent successfully!'))
      .catch(() => alert('Failed to send. Please try again.'));
    setFormData({ name: '', email: '', description: '' });
  };

  // Video hover handlers
  const handleMouseEnter = (index) => {
    const video = videoRefs.current[index];
    if (video) video.play();
  };

  const handleMouseLeave = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0; // Reset to start
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-[rgba(0,0,0,0.8)] backdrop-blur-md z-50 py-4">
        <ul className="flex flex-col md:flex-row justify-center gap-6 md:gap-10 text-lg items-center">
          <li><Link to="hero" smooth duration={500} className="hover:text-neon-cyan transition cursor-pointer">Home</Link></li>
          <li><Link to="about" smooth duration={500} className="hover:text-neon-cyan transition cursor-pointer">About</Link></li>
          <li><Link to="skills" smooth duration={500} className="hover:text-neon-cyan transition cursor-pointer">Skills</Link></li>
          <li><Link to="projects" smooth duration={500} className="hover:text-neon-cyan transition cursor-pointer">Projects</Link></li>
          <li><Link to="connect" smooth duration={500} className="hover:text-neon-cyan transition cursor-pointer">Connect</Link></li>
          <li><Link to="contact" smooth duration={500} className="hover:text-neon-cyan transition cursor-pointer">Contact</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="h-screen flex flex-col md:flex-row bg-[linear-gradient(135deg,#1a0033,#001a33)] relative">
        <div className="flex-1 flex flex-col justify-center items-center md:items-start pl-4 md:pl-16 pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-extrabold text-neon-cyan [text-shadow:0_0_15px_#00ffff] mb-4 md:mb-6 animate-fadeIn text-center md:text-left">
            I’m Veer Modi
          </h1>
          <p className="text-xl md:text-3xl text-neon-purple [text-shadow:0_0_10px_#ff00ff] mb-4 md:mb-6 text-center md:text-left">
            Aspiring Full Stack Developer
          </p>
          <a
            href={resumeUrl}
            download="Veer_Modi_Resume.pdf"
            className="px-6 py-3 bg-gradient-to-r from-neon-green to-neon-cyan text-black rounded-lg hover:scale-105 transition-all duration-300 font-bold shadow-[0_0_15px_#00ff00]"
          >
            Download Resume
          </a>
        </div>
        <div className="flex-1 flex justify-center items-center md:items-start pt-8 md:pt-0">
          <img
            src="https://media.licdn.com/dms/image/v2/D4E03AQE7B-KFD_Fneg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1723474514364?e=1746662400&v=beta&t=Y9UtI-qgIrgDq4o3zua6K7UIMytJX53Y1bbT60JeSvs"
            alt="Veer Modi"
            className="w-3/4 md:w-[400px] h-auto object-contain rounded-lg filter grayscale"
          />
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="py-16 md:py-20 px-4 md:px-12 bg-[radial-gradient(circle,#1a1a1a,#000)]">
        <h2 className="text-4xl md:text-5xl font-bold text-neon-cyan text-center mb-8 [text-shadow:0_0_10px_#00ffff]">About Me</h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-center leading-relaxed">
          I’m Veer Modi, an aspiring full stack developer with a passion for crafting efficient, user-focused web applications. Skilled in React, Node.js, and modern design tools, I aim to blend creativity and technology to solve real-world challenges.
        </p>
      </section>

      {/* Skills */}
      <section id="skills" className="py-16 md:py-20 bg-[linear-gradient(to_bottom,#0f0f0f,#000)]">
        <h2 className="text-4xl md:text-5xl font-bold text-neon-purple text-center mb-8 md:mb-12 [text-shadow:0_0_10px_#ff00ff]">My Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-8 md:mt-12 max-w-5xl mx-auto text-center">
          {['React', 'Tailwind', 'Node.js', 'MongoDB', 'C++', 'JavaScript', 'Figma', 'UI/UX'].map((skill) => (
            <div
              key={skill}
              className="p-4 md:p-6 bg-[rgba(255,255,255,0.05)] rounded-xl hover:bg-gradient-to-br hover:from-neon-purple hover:to-neon-pink hover:scale-105 transition-all duration-300 text-lg md:text-xl shadow-[0_0_10px_rgba(255,0,255,0.5)]"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 md:py-20 px-4 md:px-12 bg-[linear-gradient(to_bottom,#0f0f0f,#000)]">
        <h2 className="text-4xl md:text-5xl font-bold text-neon-pink text-center mb-8 md:mb-12 [text-shadow:0_0_10px_#ff007f]">Projects</h2>
        <div className="space-y-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-[rgba(255,255,255,0.05)] rounded-2xl overflow-hidden transition-all duration-500 ease-in-out hover:h-auto h-20 md:h-24 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-semibold text-center md:text-left">{project.name}</h3>
                <div className="flex gap-4 mt-2 md:mt-0">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 md:px-4 py-2 bg-neon-cyan text-black rounded-lg hover:bg-neon-green transition shadow-[0_0_10px_#00ffff] text-sm md:text-base"
                    >
                      GitHub
                    </a>
                  )}
                  {project.deployLink && (
                    <a
                      href={project.deployLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 md:px-4 py-2 bg-neon-cyan text-black rounded-lg hover:bg-neon-green transition shadow-[0_0_10px_#00ffff] text-sm md:text-base"
                    >
                      Live
                    </a>
                  )}
                  {project.figmaLink && (
                    <a
                      href={project.figmaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 md:px-4 py-2 bg-neon-cyan text-black rounded-lg hover:bg-neon-green transition shadow-[0_0_10px_#00ffff] text-sm md:text-base"
                    >
                      Figma
                    </a>
                  )}
                </div>
              </div>
              <div className="hidden group-hover:block px-4 md:px-6 pb-6">
                {project.video ? (
                  <video
                    ref={(el) => (videoRefs.current[index] = el)} // Assign ref to video
                    src={project.video}
                    className="w-full h-auto max-h-[300px] object-contain rounded-lg"
                    muted
                    controls={false} // Disable controls since hover controls playback
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-auto max-h-[300px] object-contain rounded-lg"
                  />
                )}
                <p className="mt-4 text-base md:text-lg text-center md:text-left">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Links */}
      <section id="connect" className="py-16 md:py-20 bg-[linear-gradient(to_bottom,#0f0f0f,#000)] text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-neon-green [text-shadow:0_0_10px_#00ff00] mb-8">Connect</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10 text-xl md:text-2xl">
          <a href="YOUR_LINKEDIN" className="hover:text-neon-cyan transition">LinkedIn</a>
          <a href="YOUR_GITHUB" className="hover:text-neon-cyan transition">GitHub</a>
          <a href="YOUR_X" className="hover:text-neon-cyan transition">X</a>
        </div>
      </section>

      {/* Contact Me */}
      <section id="contact" className="py-16 md:py-20 px-4 md:px-12 bg-[radial-gradient(circle,#1a1a1a,#000)]">
        <h2 className="text-4xl md:text-5xl font-bold text-neon-yellow text-center mb-8 md:mb-12 [text-shadow:0_0_10px_#ffff00]">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-4 bg-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan shadow-[0_0_5px_rgba(0,255,255,0.5)]"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-4 bg-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan shadow-[0_0_5px_rgba(0,255,255,0.5)]"
            required
          />
          <textarea
            placeholder="Your Message"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-4 bg-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan shadow-[0_0_5px_rgba(0,255,255,0.5)]"
            rows="5"
            required
          />
          <button
            type="submit"
            className="w-full p-4 bg-gradient-to-r from-neon-green to-neon-cyan rounded-xl hover:scale-105 transition-all duration-300 text-black font-bold shadow-[0_0_15px_#00ff00]"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}

export default App;