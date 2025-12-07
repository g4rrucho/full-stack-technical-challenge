import React from "react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  title?: string;
  message?: string;
  onClick?: () => void;
};

const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Error",
  message = "Something went wrong! Please try again...",
  onClick,
}) => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      {onClick && (
        <div className="mt-4 flex justify-center">
          <Button onClick={onClick} variant="outline">
            Retry
          </Button>
        </div>
      )}
    </div>
  );
};

export default ErrorState;
