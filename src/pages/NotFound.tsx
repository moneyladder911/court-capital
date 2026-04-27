import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <p className="font-sans text-[0.65rem] font-medium tracking-[0.35em] uppercase text-muted-foreground mb-6">
        404
      </p>
      <h1 className="font-display text-3xl md:text-5xl text-foreground mb-4 text-center">
        Page Not Found
      </h1>
      <p className="font-sans text-sm text-muted-foreground mb-10">
        This page doesn't exist.
      </p>
      <button onClick={() => navigate("/")} className="btn-outline">
        Return Home
      </button>
    </div>
  );
};

export default NotFound;
