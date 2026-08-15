import { ThumbsUp } from "lucide-react";
import { FormErrorMessageProps } from "./type";

export const FormSucessMessage = ({ message }: FormErrorMessageProps) => {
  return <p className=" text-background! capitalize px-2  bg-success flex items-center gap-3 rounded">
    <ThumbsUp />
    <span>
      {message}
    </span>
  </p>;
};
