import { Calendar, ChefHat, Moon } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        {/* Left side: Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="bg-teal-500 text-white p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-utensils-crossed h-6 w-6 text-primary-foreground"
            >
              <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"></path>
              <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"></path>
              <path d="m2.1 21.8 6.4-6.3"></path>
              <path d="m19 5-7 7"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900">Menu Planner</h1>
            <p className="text-sm text-gray-500">AI-powered meal scheduling</p>
          </div>
        </div>

        {/* Right side: Navigation items */}
        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">Monthly Plan</span>
          </div>
          <div className="hidden sm:flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ChefHat className="w-4 h-4 mr-2" />
            <span className="text-sm">33 Recipes</span>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Moon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
