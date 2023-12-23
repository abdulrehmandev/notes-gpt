const HomeBanner = () => {
  return (
    <div className="bg-blue-500 text-white px-6 py-4 rounded-xl w-full">
      <p className="font-medium text-lg mb-2">NotesGPT 101</p>
      <div className="flex gap-6">
        <h3 className="font-serif text-4xl font-medium tracking-tight">
          Learn how to get started on Upwork
        </h3>
        <img className="w-64 h-64" src="/static/img-banner.svg" />
      </div>
    </div>
  );
};

export default HomeBanner;
