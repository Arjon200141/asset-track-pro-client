const Notice = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-6 my-16">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Notice Board</h2>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Welcome to <span className="font-semibold">AsseTrack Pro</span>, Asset Management System</h3>
        <p className="mb-2">
          AssetTrack Pro is excited to introduce our new web application designed to help businesses manage their assets and products efficiently. Our software aims to simplify the process for HR Managers to track employee usage of company assets.
        </p>
        <h4 className="text-lg font-semibold mb-1">Types of Our Assets:</h4>
        <ul className="list-disc list-inside mb-2">
          <li>Returnable: Laptops, Keyboards, Mouse, Chairs, Desks, Cell Phones</li>
          <li>Non-returnable: Pens, Pencils, Paper, Diaries, Tissue Paper</li>
        </ul>
        <p className="mb-2">
          Companies can start using our application by purchasing a subscription, which provides full access to our asset tracking features. Our goal is to streamline asset management and ensure HR Managers have all the tools they need to monitor and control asset usage effectively.
        </p>
        <h4 className="text-lg font-semibold mb-1">We Are Hiring!</h4>
        <p>
        AssetTrack Pro is currently looking for a skilled MERN stack developer to join our team and help us build the best Asset Management System on the market. If you have the necessary skills and are passionate about creating innovative solutions, we'd love to hear from you!
        </p>
      </div>
    </div>
  );
};

export default Notice;
