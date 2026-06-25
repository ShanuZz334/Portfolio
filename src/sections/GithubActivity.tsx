import { motion } from 'framer-motion'
import { GitCommit, GitPullRequest, Star, Activity } from 'lucide-react'

const GithubActivity = () => {
  return (
    <section id="github" className="relative py-24 bg-graphite z-10">
      <div className="container px-6 mx-auto max-w-7xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-cyan w-8 h-8" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-electric-blue">Analytics</span>
            </h2>
          </div>
          <div className="w-20 h-1 rounded-full bg-cyan"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Stat Cards */}
          {[
            { icon: <GitCommit />, label: "Total Commits", value: "850+", color: "text-green-400" },
            { icon: <GitPullRequest />, label: "Pull Requests", value: "45+", color: "text-purple-400" },
            { icon: <Star />, label: "Stars Earned", value: "120+", color: "text-yellow-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-dark-bg border border-white/5 flex items-center justify-between group hover:border-cyan/30 transition-colors"
            >
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`p-4 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contribution Graph Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-dark-bg border border-white/5 overflow-x-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Contribution Activity</h3>
            <span className="text-xs font-mono text-gray-500">Last 365 Days</span>
          </div>
          
          <div className="min-w-[800px]">
            <div className="flex gap-1">
              {Array.from({ length: 52 }).map((_, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, rowIndex) => {
                    // Randomize intensity for the mockup
                    const intensity = Math.random();
                    let bgColor = 'bg-white/5'; // Level 0
                    if (intensity > 0.8) bgColor = 'bg-cyan'; // Level 4
                    else if (intensity > 0.6) bgColor = 'bg-cyan/80'; // Level 3
                    else if (intensity > 0.4) bgColor = 'bg-cyan/60'; // Level 2
                    else if (intensity > 0.2) bgColor = 'bg-cyan/40'; // Level 1
                    
                    return (
                      <div 
                        key={rowIndex} 
                        className={`w-3 h-3 rounded-sm ${bgColor} hover:ring-1 hover:ring-white transition-all cursor-pointer`}
                        title="Contributions"
                      ></div>
                    )
                  })}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default GithubActivity
