import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20'>
      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-600/20 rounded-full blur-3xl'></div>
      </div>

      <div className='container mx-auto px-6 py-16 relative z-10'>
        {/* Hero Section */}
        <div className='text-center mb-20'>
          <h1 className='text-5xl md:text-7xl font-semibold text-gray-900 mb-6 tracking-tight'>
            The future of{' '}
            <span className='text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text'>
              finance
            </span>{' '}
            is here
          </h1>
          <p className='text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed font-medium'>
            Experience the most intuitive and beautiful way to manage your
            money. Track expenses, monitor income, and achieve your financial
            goals with precision.
          </p>
          <div className='flex gap-6 justify-center flex-col sm:flex-row max-w-md mx-auto'>
            <Link
              href='/auth'
              className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105'
            >
              Get Started
            </Link>
            <Link
              href='#features'
              className='border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 backdrop-blur-sm bg-white/50'
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div
          id='features'
          className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'
        >
          {[
            {
              icon: '💰',
              title: 'Smart Expense Tracking',
              description:
                'Automatically categorize and track every dollar you spend with intelligent insights and beautiful visualizations.',
            },
            {
              icon: '📈',
              title: 'Income Management',
              description:
                'Monitor all your income streams including salary, investments, and side hustles in one elegant dashboard.',
            },
            {
              icon: '📊',
              title: 'Financial Analytics',
              description:
                'Get deep insights into your spending patterns with advanced analytics and personalized recommendations.',
            },
            {
              icon: '🎯',
              title: 'Goal Achievement',
              description:
                'Set and track financial goals with visual progress indicators and intelligent milestone celebrations.',
            },
            {
              icon: '📱',
              title: 'Intuitive Design',
              description:
                'Experience a beautifully crafted interface that makes financial management feel effortless and enjoyable.',
            },
            {
              icon: '🔒',
              title: 'Bank-Grade Security',
              description:
                'Your financial data is protected with enterprise-level encryption and world-class security protocols.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className='backdrop-blur-xl bg-white/80 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/50'
            >
              <div className='text-4xl mb-6'>{feature.icon}</div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4 tracking-tight'>
                {feature.title}
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className='text-center backdrop-blur-xl bg-white/80 p-12 rounded-3xl shadow-2xl border border-white/50'>
          <h2 className='text-4xl font-semibold text-gray-900 mb-4 tracking-tight'>
            Transform Your Financial Future
          </h2>
          <p className='text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed'>
            Join thousands of users who have already taken control of their
            finances with our beautifully designed platform.
          </p>
          <Link
            href='/auth'
            className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 inline-block'
          >
            Start Your Journey Today
          </Link>
        </div>
      </div>
    </div>
  );
}
