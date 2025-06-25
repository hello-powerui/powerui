'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, BookOpen, Users, Lightbulb, TrendingUp, Award, Globe, Briefcase, Target, Code, Video, FileText, MessageSquare, ChevronRight, Clock, Calendar, ExternalLink, CheckCircle, Star } from 'lucide-react'

export default function BlogContent() {
  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <div className="mb-6 flex items-center gap-4 text-sm text-gray-500">
            <time className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              December 2024
            </time>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              18 min read
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Your Power BI Design Journey: Resources and Continuous Learning
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Congratulations on completing this comprehensive guide to Power BI dashboard design. Your journey is 
            just beginning. Discover essential resources, learning paths, and ways to contribute to the community 
            as you continue developing your skills.
          </p>

          <div className="flex flex-wrap gap-2">
            {['Resources', 'Learning Path', 'Power BI', 'Community', 'Portfolio', 'Career Growth'].map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 px-4 border-b">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              What You'll Learn
            </h2>
            <nav className="space-y-2">
              <a href="#accomplishments" className="block text-gray-600 hover:text-gray-900 transition-colors">
                What you've accomplished and next steps
              </a>
              <a href="#continuing-education" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Essential resources for continuous learning
              </a>
              <a href="#portfolio" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Building your design portfolio
              </a>
              <a href="#community" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Contributing to the Power BI community
              </a>
              <a href="#specialization" className="block text-gray-600 hover:text-gray-900 transition-colors">
                Advanced specialization paths
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          {/* Your Design Journey */}
          <section id="accomplishments" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Your Design Journey</h2>
            
            <p className="text-gray-700 mb-6">
              Congratulations on completing this comprehensive guide to Power BI dashboard design. You've learned 
              principles and techniques that will serve you throughout your career as a data professional. However, 
              this handbook represents the beginning of your design journey, not the end.
            </p>

            {/* What You've Accomplished */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-600" />
                What You've Accomplished
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">Core Skills Gained</h4>
                  <ul className="text-sm space-y-1">
                    <li>• User-centered design thinking</li>
                    <li>• Technical foundation skills</li>
                    <li>• Visual hierarchy principles</li>
                    <li>• Color theory knowledge</li>
                  </ul>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">Advanced Capabilities</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Clarity optimization techniques</li>
                    <li>• Advanced interaction capabilities</li>
                    <li>• Testing and deployment strategies</li>
                    <li>• Design system implementation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Applying Your Knowledge */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">Applying Your Knowledge</h3>
              
              <p className="text-gray-700 mb-4">
                The best way to master these skills is through consistent application. Each project you complete 
                will deepen your understanding and reveal new challenges.
              </p>
              
              <div className="bg-blue-50 rounded p-4">
                <h4 className="font-medium mb-3">Practical Next Steps:</h4>
                <ol className="space-y-2 text-sm">
                  <li>1. Choose one existing dashboard and apply three principles from this handbook</li>
                  <li>2. Document what works and what doesn't in your specific context</li>
                  <li>3. Seek feedback from actual users, not just colleagues</li>
                  <li>4. Iterate based on real usage patterns and business outcomes</li>
                  <li>5. Share your learnings with your team or broader community</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Continuing Education */}
          <section id="continuing-education" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Continuing Education Resources</h2>
            
            <p className="text-gray-700 mb-6">
              Dashboard design is an evolving field. New techniques, tools, and best practices emerge regularly. 
              Staying current requires ongoing learning and engagement with the broader design and data visualization 
              community.
            </p>

            {/* Essential Reading */}
            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                Essential Reading
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Data Visualization Books</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">📚</span>
                      <span>"The Visual Display of Quantitative Information" by Edward R. Tufte</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">📚</span>
                      <span>"Information Dashboard Design" by Stephen Few</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">📚</span>
                      <span>"Storytelling with Data" by Cole Nussbaumer Knaflic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">📚</span>
                      <span>"The Truthful Art" by Alberto Cairo</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Design Thinking Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">📖</span>
                      <span>"Design of Everyday Things" by Don Norman</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">📖</span>
                      <span>"About Face" by Alan Cooper</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">📖</span>
                      <span>"Universal Principles of Design" by William Lidwell</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Online Learning */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Video className="w-5 h-5 text-purple-600" />
                  Free Resources
                </h3>
                <ul className="text-sm space-y-2">
                  <li>• Power BI Community forums</li>
                  <li>• YouTube channels for Power BI design</li>
                  <li>• Microsoft Learn modules</li>
                  <li>• Power BI samples gallery</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Professional Development
                </h3>
                <ul className="text-sm space-y-2">
                  <li>• Microsoft certifications</li>
                  <li>• Data visualization conferences</li>
                  <li>• Design thinking workshops</li>
                  <li>• UX design courses</li>
                </ul>
              </div>
            </div>

            {/* Blogs and Websites */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Blogs and Websites to Follow</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2 text-purple-800">Data Visualization</h4>
                  <ul className="text-sm space-y-1">
                    <li>• FlowingData</li>
                    <li>• Information is Beautiful</li>
                    <li>• Storytelling with Data</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-blue-800">Power BI Design</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Power BI Tips</li>
                    <li>• SQLBI</li>
                    <li>• Enterprise DNA</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-green-800">General Design</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Material Design</li>
                    <li>• Design Systems</li>
                    <li>• A11y Resources</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Building Your Portfolio */}
          <section id="portfolio" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Building Your Portfolio</h2>
            
            <p className="text-gray-700 mb-6">
              As you develop your skills, create a portfolio that demonstrates your growth and capabilities. This 
              serves multiple purposes: it helps you reflect on your progress, provides examples for job applications 
              or promotions, and contributes to the broader community.
            </p>

            {/* Portfolio Components */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-green-600" />
                Portfolio Components
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">Before and After Comparisons</h4>
                  <p className="text-gray-700 text-sm">
                    Show how you've improved existing dashboards with specific design principles. Explain your 
                    decision-making process and the impact of changes.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">Process Documentation</h4>
                  <p className="text-gray-700 text-sm">
                    Document your design process from user research through final implementation. This demonstrates 
                    systematic thinking and professional approach.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">Diverse Examples</h4>
                  <p className="text-gray-700 text-sm">
                    Include dashboards for different industries, user types, and business contexts. This shows 
                    adaptability and broad skill application.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded p-4">
                  <h4 className="font-semibold mb-2">Technical Demonstrations</h4>
                  <p className="text-gray-700 text-sm">
                    Showcase advanced techniques like custom visuals, complex DAX measures, or sophisticated 
                    interactions.
                  </p>
                </div>
              </div>
            </div>

            {/* Sharing Your Work */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Sharing Your Work</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Internal Sharing</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Present improvements to colleagues</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Build design awareness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Lead to broader adoption</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">External Sharing</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <Globe className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Share on LinkedIn/Twitter</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Globe className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Participate in challenges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Globe className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Present at conferences</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Contributing to Community */}
          <section id="community" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Contributing to the Community</h2>
            
            <p className="text-gray-700 mb-6">
              The Power BI and data visualization communities thrive on shared knowledge and collaboration. Your 
              contributions, no matter how small, help others learn and improve.
            </p>

            {/* Ways to Contribute */}
            <div className="bg-purple-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-600" />
                Ways to Contribute
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-purple-600" />
                    Answer Questions
                  </h4>
                  <p className="text-sm text-gray-600">
                    Participate in community forums to help others solve design and technical challenges.
                  </p>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Share Templates
                  </h4>
                  <p className="text-sm text-gray-600">
                    Create and share dashboard templates that demonstrate good design principles.
                  </p>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4 text-green-600" />
                    Write Tutorials
                  </h4>
                  <p className="text-sm text-gray-600">
                    Document your solutions to common problems in blog posts or articles.
                  </p>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 text-orange-600" />
                    Provide Feedback
                  </h4>
                  <p className="text-sm text-gray-600">
                    Thoughtfully critique others' work with constructive suggestions for improvement.
                  </p>
                </div>
              </div>
            </div>

            {/* Building Reputation */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Building Your Reputation</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Consistency</p>
                    <p className="text-gray-600 text-sm">Regular, helpful contributions build recognition over time</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Quality over Quantity</p>
                    <p className="text-gray-600 text-sm">Focus on providing valuable, well-thought-out contributions</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Collaboration</p>
                    <p className="text-gray-600 text-sm">Work with others on projects that benefit the broader community</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Mentorship</p>
                    <p className="text-gray-600 text-sm">As you gain experience, help newcomers learn and develop their skills</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Staying Current */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Staying Current with Trends</h2>
            
            <p className="text-gray-700 mb-6">
              Design trends and best practices evolve constantly. Technology advances, user expectations change, 
              and new research emerges about effective visualization techniques.
            </p>

            {/* Trend Monitoring */}
            <div className="bg-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Trend Monitoring Strategies</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Active Learning</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Follow industry leaders</li>
                    <li>• Attend conferences</li>
                    <li>• Join professional organizations</li>
                    <li>• Experiment regularly</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Evaluation Criteria</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Does this solve a real problem?</li>
                    <li>• Is it sustainable?</li>
                    <li>• Does it align with goals?</li>
                    <li>• Can it be implemented reliably?</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Timeless Principles */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Balancing Trends with Fundamentals</h3>
              
              <p className="text-gray-700 mb-4">
                While it's important to stay current, remember that fundamental design principles remain relatively 
                stable. Focus on mastering core concepts before chasing the latest trends.
              </p>
              
              <div className="bg-gray-50 rounded p-4">
                <h4 className="font-medium mb-2">Timeless Principles:</h4>
                <ul className="text-sm space-y-1">
                  <li>• User needs always come first</li>
                  <li>• Clarity trumps creativity in business contexts</li>
                  <li>• Consistency builds trust and usability</li>
                  <li>• Testing validates assumptions</li>
                  <li>• Iteration leads to improvement</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Advanced Specialization */}
          <section id="specialization" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Advanced Specialization Paths</h2>
            
            <p className="text-gray-700 mb-6">
              As you develop expertise, you may want to specialize in particular aspects of dashboard design or 
              specific industries.
            </p>

            {/* Specialization Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Code className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold">Technical</h3>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Advanced DAX development</li>
                  <li>• Custom visual development</li>
                  <li>• Performance optimization</li>
                  <li>• Integration expertise</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                  <h3 className="font-semibold">Design</h3>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• UX research</li>
                  <li>• Accessibility expertise</li>
                  <li>• Visual design</li>
                  <li>• Information architecture</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-6 h-6 text-green-600" />
                  <h3 className="font-semibold">Industry</h3>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• Healthcare analytics</li>
                  <li>• Financial services</li>
                  <li>• Manufacturing</li>
                  <li>• Retail analytics</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Implementation Roadmap */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Implementation Roadmap</h2>
            
            <p className="text-gray-700 mb-6">
              Now that you've completed this handbook, create a structured plan for implementing what you've learned.
            </p>

            {/* Timeline */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-6">Your Learning Timeline</h3>
              
              <div className="space-y-6">
                <div className="bg-white/80 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 text-purple-800">30-Day Quick Wins</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="text-sm space-y-1">
                      <li><strong>Week 1:</strong> Apply typography and spacing principles</li>
                      <li><strong>Week 2:</strong> Implement improved color usage</li>
                    </ul>
                    <ul className="text-sm space-y-1">
                      <li><strong>Week 3:</strong> Optimize for clarity</li>
                      <li><strong>Week 4:</strong> Gather feedback and plan next steps</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white/80 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 text-blue-800">90-Day Skill Building</h4>
                  <div className="text-sm space-y-1">
                    <li><strong>Month 1:</strong> Focus on foundational skills - planning, typography, spacing, color</li>
                    <li><strong>Month 2:</strong> Develop advanced skills - interactions, performance, testing</li>
                    <li><strong>Month 3:</strong> System-level thinking - design systems, governance, maintenance</li>
                  </div>
                </div>
                
                <div className="bg-white/80 rounded-lg p-6">
                  <h4 className="font-semibold mb-3 text-green-800">Annual Goals</h4>
                  <div className="text-sm space-y-1">
                    <li><strong>Quarter 1:</strong> Master core principles through consistent application</li>
                    <li><strong>Quarter 2:</strong> Develop specialized expertise in your chosen area</li>
                    <li><strong>Quarter 3:</strong> Contribute to community and build professional network</li>
                    <li><strong>Quarter 4:</strong> Plan advanced learning and skill development</li>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final Thoughts */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Final Thoughts</h2>
            
            <p className="text-gray-700 mb-6">
              Effective dashboard design sits at the intersection of technology, psychology, and business strategy. 
              It requires technical skills to implement solutions, psychological understanding to create intuitive 
              experiences, and business acumen to focus on what matters most.
            </p>

            {/* Core Principles Reminder */}
            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Remember These Core Principles</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p><strong>Users first:</strong> Every design decision should serve user needs and business objectives.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p><strong>Clarity over cleverness:</strong> Simple, clear communication trumps sophisticated techniques that confuse users.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p><strong>Iteration improves everything:</strong> No dashboard is perfect on the first try. Plan for continuous improvement.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p><strong>Context matters:</strong> What works in one situation may not work in another. Adapt principles to your specific circumstances.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p><strong>Fundamentals scale:</strong> Master basic principles before pursuing advanced techniques.</p>
                </div>
              </div>
            </div>

            {/* Your Responsibility */}
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">Your Ongoing Responsibility</h3>
              
              <p className="text-gray-700 mb-4">
                As a dashboard designer, you have significant influence over how people understand and use data. 
                This responsibility extends beyond technical implementation to include:
              </p>
              
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Accuracy:</strong> Ensuring data is presented truthfully and without bias</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Accessibility:</strong> Making information available to users with diverse needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Efficiency:</strong> Respecting users' time and cognitive resources</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Trust:</strong> Building confidence in data-driven decision making</span>
                </li>
              </ul>
            </div>

            {/* Impact of Good Design */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">The Impact of Good Design</h3>
              <p className="text-blue-50">
                Well-designed dashboards do more than display data—they enable better decisions, save time, reduce 
                confusion, and build trust in data-driven processes. The principles and techniques in this handbook 
                can help you create tools that genuinely improve how organizations understand and act on their data.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-16">
            <div className="bg-black text-white rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Your Journey Continues</h2>
              <p className="text-lg mb-6 text-gray-300">
                Thank you for your commitment to improving how people understand and use data. The skills you've 
                developed will serve you well as you continue creating dashboards that inform, inspire, and enable 
                better decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/themes/studio"
                  className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  Start Creating with Power UI
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/docs"
                  className="border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
                >
                  Explore Documentation
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Closing Message */}
          <section>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-xl text-gray-700 mb-4">
                Your journey in dashboard design has just begun.
              </p>
              <p className="text-2xl font-bold text-gray-900">
                Make the most of it.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Author Bio */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold">Power UI Team</h3>
              <p className="text-gray-600 mb-2">
                Helping data professionals create beautiful, effective Power BI dashboards through better design.
              </p>
              <div className="flex gap-4 text-sm">
                <a href="#" className="text-gray-500 hover:text-gray-700">Twitter</a>
                <a href="#" className="text-gray-500 hover:text-gray-700">LinkedIn</a>
                <a href="#" className="text-gray-500 hover:text-gray-700">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}