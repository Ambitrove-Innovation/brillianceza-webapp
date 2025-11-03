const Header = () => {
  return (
    <>
      {/* Spacer for fixed nav */}
      <div className="h-24"></div>

      {/* Announcement Bar */}
      <div className="bg-gray-900 text-white text-center py-3 uppercase tracking-wider font-semibold text-sm">
        Free Delivery For Orders Over R500
      </div>
    </>
  );
};

export default Header;
