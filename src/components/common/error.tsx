export const errorMessage = (error: any, type: string, message: string) => {
  return error === type && <p className="mb-2 text-error">{message}</p>;
};
