
import { Cpu, Zap, Shield } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-purple-700">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Revolutionize IoT with</span>
                <span className="block text-purple-300">Neural Networks</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-purple-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Harness the power of artificial intelligence to create smarter, more efficient IoT solutions.
              </p>
             
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Intelligent IoT Solutions
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Leverage the power of neural networks to create smarter, more efficient IoT devices and systems.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                      <Cpu className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Advanced Processing</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Utilize neural networks for complex data processing and decision-making at the edge.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                      <Zap className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Real-time Analytics</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Get instant insights with real-time data analysis powered by neural networks.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                      <Shield className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Enhanced Security</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Implement advanced threat detection and prevention using neural network algorithms.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>

    
    </div>
  )
}

