import Error from "next/error";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  modalFallback: ReactNode;
  errorFallback: ReactNode;
}

interface State {
  hasError: boolean;
  axiosError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = {
      hasError: false,
      axiosError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    switch (error) {
      case "AxiosError":
        this.setState({ axiosError: true });
    }
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.state.axiosError) return this.props.modalFallback;

      return this.props.errorFallback;
    }

    // Return children components in case of no error
    return this.props.children;
  }
}
export default ErrorBoundary;
