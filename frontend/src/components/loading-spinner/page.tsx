// frontend/src/components/loading-spinner/page.tsx
import { HashLoader } from "react-spinners";
import "./loading.scss";

interface LoadingProps {
  loading?: boolean;
  loadingText?: string;
  size?: number;
  color?: string;
}

export default function Loading({
  loading = true,
  loadingText = "Loading Page",
  size = 50,
  color = "#75188f",
}: LoadingProps) {
  if (!loading) return null;

  return (
    <div className="loading-component">
      <HashLoader
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className="loading-text">
        <p>{loadingText}</p>
      </div>
    </div>
  );
}
