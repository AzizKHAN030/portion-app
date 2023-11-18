const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-1 h-full overflow-y-auto bg-[#1F1F1F]">
      {children}
    </main>
  );
};

export default PublicLayout;
