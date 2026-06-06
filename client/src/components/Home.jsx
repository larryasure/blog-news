import { ArrowRight, Newspaper, ShieldCheck, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col justify-between selection:bg-blue-100">
      
      {/* Navigation Header */}
      <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 px-8 py-4 flex items-center justify-between max-w-7xl mx-auto left-0 right-0">
        <div className="flex items-center gap-2">
          <Newspaper className="text-sky-500 size-6" />
          <span className="font-bold text-xl tracking-wider text-gray-900">
            Micro<span className="text-sky-500">News</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            Log In
          </Link>
          <Link 
            to="/register" 
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-sky-100 transition-all active:scale-[0.98]"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center max-w-4xl mx-auto my-16">
        <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 text-xs font-semibold px-4 py-1.5 rounded-full border border-sky-100 mb-6 animate-fade-in">
          <Zap className="size-3.5 fill-sky-600" />
          <span>Real-time short-form updates</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Stay Informed with <br />
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            Bite-Sized News
          </span> Around the Globe.
        </h1>
        
        <p className="mt-6 text-base sm:text-lg text-gray-500 max-w-xl leading-relaxed">
          MicroNews delivers clear, crisp, and verified short-form headlines. No fluff, no endless scrolling—just the information you actually need.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link 
            to="/register" 
            className="w-full sm:w-auto px-8 h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-100 active:scale-[0.99]"
          >
            <span>Create Free Account</span>
            <ArrowRight className="size-4" />
          </Link>
          <Link 
            to="/login" 
            className="w-full sm:w-auto px-8 h-12 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            Explore Dashboard
          </Link>
        </div>

        {/* Feature Grid */}
        <section className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left">
          <div className="bg-white/80 border border-gray-100 rounded-2xl p-5 shadow-xl shadow-gray-100/50">
            <div className="p-2.5 bg-blue-50 text-blue-500 rounded-xl w-fit mb-4">
              <Zap className="size-5" />
            </div>
            <h4 className="font-semibold text-gray-900 text-base">Hyper Fast Updates</h4>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Get modern, ultra-short micro updates the minute events break out.
            </p>
          </div>

          <div className="bg-white/80 border border-gray-100 rounded-2xl p-5 shadow-xl shadow-gray-100/50">
            <div className="p-2.5 bg-green-50 text-green-500 rounded-xl w-fit mb-4">
              <ShieldCheck className="size-5" />
            </div>
            <h4 className="font-semibold text-gray-900 text-base">Verified Sources</h4>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Every headline goes through verification filters to avoid clickbait.
            </p>
          </div>

          <div className="bg-white/80 border border-gray-100 rounded-2xl p-5 shadow-xl shadow-gray-100/50">
            <div className="p-2.5 bg-purple-50 text-purple-500 rounded-xl w-fit mb-4">
              <Globe className="size-5" />
            </div>
            <h4 className="font-semibold text-gray-900 text-base">Global & Local</h4>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Customize feeds based on regional alerts or worldwide occurrences.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-100 bg-white px-8 py-6 text-center text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} MicroNews Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}

