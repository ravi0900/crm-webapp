import { SetFieldError } from "@mantine/form/lib/types";
import { AxiosError } from "axios";

/**
 *
 * @param error - Cached error object
 * @param fallbackErrorMessage - Display a custom message if nonFieldError not found in response
 * @param setFieldError - This is a function that is used to set an error message for a specific field in a form.
 * By passing this function, all field's error messages can be displayed next to the relevant fields in the form,
 * providing a better user experience.
 *
 * @returns `void`
 */
export const handleCachedError = (
  error: AxiosError,
  fallbackErrorMessage?: string,
  setFieldError?: SetFieldError<Record<string, any>>
): void => {
  let errorMessage = fallbackErrorMessage || "Something went wrong";
  const responseData = error.response.data as Record<string, any>;
  const isErrorMessageExist =
    responseData && Object.keys(error.response.data).length > 0;
  if (!isErrorMessageExist) {
    return alert(errorMessage);
  }

  const errorFields = Object.keys(responseData);
  const isNonFieldError = errorFields.includes("nonFieldError");

  if (isNonFieldError) {
    return alert(responseData.nonFieldError);
  }

  if (setFieldError) {
    errorFields.forEach((errorField) => {
      setFieldError(errorField, responseData[errorField]);
    });
    return;
  }

  errorMessage += "\n";
  errorFields.forEach((errorField) => {
    errorMessage += `${errorField} : ${responseData[errorField]}\n`;
  });
  return alert(errorMessage);
};
