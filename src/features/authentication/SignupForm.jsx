import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {useForm} from "react-hook-form";
import {useSignup} from "./useSignup.js";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {register, formState, getValues, handleSubmit, reset} = useForm();
  const {errors} = formState;
  const {signup, isLoading} = useSignup();

  function onSubmit({fullName, email, password}) {
    console.log({fullName, email, password});
    signup({fullName, email, password}, {
      onSettled: () => reset()
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text"
               disabled={isLoading}
               id="fullName"
               {...register("fullName", {required: "This field is required"})}/>
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email"
               disabled={isLoading}
               id="email"
               {...register("email", {
                 required: "This field is required",
                 pattern: {
                   value: /\S+@\S+\.\S+/,
                   message: "Please provide a valid email address"
                 },
               })}/>
      </FormRow>

      <FormRow label="Password (min 8 characters)"
               error={errors?.password?.message}>
        <Input type="password"
               disabled={isLoading}
               id="password"
               {...register("password", {
                 required: "This field is required",
                 minLength: "Password needs a minimum of 8 characters",
               })}/>
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password"
               disabled={isLoading}
               id="passwordConfirm"
               {...register("passwordConfirm", {
                 required: "This field is required",
                 validate: (value) => getValues().password === value || "Password must match"
               })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
