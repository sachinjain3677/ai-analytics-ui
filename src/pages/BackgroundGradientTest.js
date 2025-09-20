import React from 'react';
import { BackgroundGradient } from '../components/ui/background-gradient';
import { BackgroundGradientDemo } from '../components/ui/background-gradient-demo';
import { Star, Heart, Zap } from 'lucide-react';

const BackgroundGradientTest = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          BackgroundGradient Component Demo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Original Demo */}
          <BackgroundGradientDemo />
          
          {/* Custom Card 1 */}
          <BackgroundGradient className="rounded-[22px] max-w-sm p-6 bg-white dark:bg-zinc-900">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
              Lightning Fast
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Experience blazing fast performance with our optimized algorithms and cutting-edge technology.
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
              Learn More
            </button>
          </BackgroundGradient>

          {/* Custom Card 2 */}
          <BackgroundGradient className="rounded-[22px] max-w-sm p-6 bg-white dark:bg-zinc-900">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
              Made with Love
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Crafted with attention to detail and passion for creating amazing user experiences.
            </p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
              Get Started
            </button>
          </BackgroundGradient>

          {/* Custom Card 3 */}
          <BackgroundGradient className="rounded-[22px] max-w-sm p-6 bg-white dark:bg-zinc-900">
            <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
              Premium Quality
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Top-tier quality and reliability that exceeds expectations every single time.
            </p>
            <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors">
              Try Now
            </button>
          </BackgroundGradient>

          {/* Image Card */}
          <BackgroundGradient className="rounded-[22px] max-w-sm p-4 bg-white dark:bg-zinc-900">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center"
              alt="Office Setup"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
              Modern Workspace
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Create the perfect environment for productivity and creativity.
            </p>
          </BackgroundGradient>

          {/* Text Only Card */}
          <BackgroundGradient className="rounded-[22px] max-w-sm p-8 bg-white dark:bg-zinc-900">
            <blockquote className="text-lg italic text-black dark:text-white mb-4">
              "This component is absolutely amazing! The gradient animation is smooth and the design is beautiful."
            </blockquote>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></div>
              <div>
                <p className="font-semibold text-black dark:text-white">Sarah Johnson</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">UI/UX Designer</p>
              </div>
            </div>
          </BackgroundGradient>
        </div>

        <div className="mt-12 text-center">
          <BackgroundGradient className="inline-block rounded-full p-8 bg-white dark:bg-zinc-900">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Join thousands of developers using our components
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all">
              Get Started Today
            </button>
          </BackgroundGradient>
        </div>
      </div>
    </div>
  );
};

export default BackgroundGradientTest;
