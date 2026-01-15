const InfoCard = ({ icon, title, content }) => {
  return (
    <div className="  flex gap-4 p-4 rounded-xl border
      bg-gradient-to-br from-white to-slate-50
      hover:shadow-lg transition-all">
      <div className="w-9 h-9 rounded-full bg-white border flex items-center justify-center text-blue-600">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{title}</p>
        <div className="font-medium text-sm text-muted-foreground">{content}</div>
      </div>
    </div>
  );
};

export default InfoCard;
