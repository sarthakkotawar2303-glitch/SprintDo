
const ErrorTest = () => {
  throw new Error("Testing SprintDo Error Boundary");

  return <h2>This should not appear</h2>;
};

export default ErrorTest;
