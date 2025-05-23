import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { signUp, isLoading } = useSignUp();

  function onSubmit(data) {
    signUp(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required!" })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required!",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors.password}>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required!",
            minLength: {
              value: 8,
              message: "password needs a minimum of 8 characters",
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required!",
            validate: (value) =>
              value === getValues().password || "Password need to match",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
