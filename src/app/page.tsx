import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to{" "}
            <span className="text-blue-600 dark:text-blue-400">MoneyTracker</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Take control of your finances with our comprehensive money tracking solution. 
            Monitor your spending, track your income, and achieve your financial goals.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Link
              href="/auth"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Track Expenses
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Record and categorize all your spending to understand where your money goes. 
              Stay on top of your daily expenses with ease.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Monitor Income
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Keep track of all your income sources including salary, freelance work, 
              and passive income streams in one place.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Financial Review
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get detailed insights and reports on your financial habits. 
              Review your progress and make informed financial decisions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Set Goals
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Define savings goals and track your progress. Stay motivated 
              with visual progress indicators and milestone celebrations.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Easy to Use
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Simple and intuitive interface designed for everyone. 
              Manage your finances without any learning curve.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Secure & Private
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your financial data is encrypted and secure. We prioritize 
              your privacy and never share your personal information.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white dark:bg-gray-800 p-12 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of users who are already managing their money better with MoneyTracker.
          </p>
          <Link
            href="/auth"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors shadow-lg hover:shadow-xl inline-block"
          >
            Start Tracking Today
          </Link>
        </div>
      </div>
    </div>
  );
}
