
import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by boundary:", error);
        console.error("Component details:", errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="m-6 rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                    <h2 className="text-xl font-bold text-red-600">
                        Something went wrong!
                    </h2>

                    <p className="mt-2 text-gray-600">
                        This section couldn't be displayed.
                        Please try refreshing the page.
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
